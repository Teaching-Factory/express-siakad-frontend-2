<script setup>
import axios from 'axios';
import Swal from 'sweetalert2';
import { onMounted, ref, watch, watchEffect } from 'vue';
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';
import { API_URL } from '../config/config';
import { getToken } from '../service/auth';
import { getPermissions, getUser } from '../utiils/local_storage';
import { get } from '../utiils/request';

const user = ref([]);
const semesters = ref([]);
const matakuliah = ref([]);
const permissions = ref([]);
const presensi = ref([]);
const pertemuanPerkuliahan = ref([]);
const pertemuanAktif = ref([]);
const selectedSemester = ref('');
const selectedMataKuliah = ref('');
const selectedPertemuan = ref('');
const selectedPresensi = ref('');
const dosenPengampu = ref('-');
const semesterAktif = ref([]);
const hasPresensi = ref(false);

const fetchSemesterAktif = async () => {
    const response = await get('semester-aktif');
    semesterAktif.value = response.data.data;
};
const events = ref([
    {
        start: new Date(),
        end: new Date(new Date().getTime() + 3600 * 1000), // 1 hour later
        title: 'Sample Event 1'
    },
    {
        start: new Date(new Date().setDate(new Date().getDate() + 1)),
        end: new Date(new Date().setDate(new Date().getDate() + 1) + 3600 * 1000), // 1 hour later, next day
        title: 'Sample Event 2'
    }
]);

const getMataKuliah = async () => {
    try {
        const res = getData('mata-kuliah');
        if (res.status == 200) {
            matkul.value = res.data.data;
        }
    } catch (error) {
        throw error;
    }
};

const onEventClick = (event) => {
    alert(`Event: ${event.title}`);
};

const onCellClick = (date) => {
    alert(`Clicked on date: ${date}`);
};

const fetchSemester = async () => {
    try {
        const response = await get('semester');
        semesters.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};

const fetchMatakuliah = async () => {
    if (selectedSemester.value) {
        try {
            const response = await get(`detail-kelas-kuliah/${selectedSemester.value}/get-kelas-kuliah-dosen`);
            matakuliah.value = response.data.data;
        } catch (error) {
            console.error('Gagal mengambil data kelas:', error);
        }
    }
};
const fetchPertemuan = async () => {
    if (selectedMataKuliah.value) {
        try {
            const response = await get(`pertemuan-perkuliahan/kelas-kuliah/${selectedMataKuliah.value}/get`);
            pertemuanPerkuliahan.value = response.data.data;
        } catch (error) {
            console.error('Gagal mengambil data kelas:', error);
        }
    }
};
watch(selectedSemester, fetchMatakuliah);
watch(selectedMataKuliah, fetchPertemuan);

const openPertemuan = async () => {
    try {
        const token = getToken();
        const kelasKuliahId = selectedMataKuliah.value;
        const pertemuanID = selectedPertemuan.value;

        // Periksa apakah prodiId dan semesterId sudah dipilih
        if (!kelasKuliahId || !pertemuanID) {
            Swal.fire('PERINGATAN!', 'Mata Kuliah atau Pertemuan belum dipilih.', 'warning');
            return;
        }

        const url = `${API_URL}/pertemuan-perkuliahan/open-pertemuan-perkuliahan`;

        // Persiapkan data untuk permintaan PUT
        const data = {
            id_kelas_kuliah: kelasKuliahId,
            id_pertemuan_perkuliahan: pertemuanID
        };

        const response = await axios.put(
            url,
            data, // Body permintaan
            {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json' // Tambahkan header Content-Type
                }
            }
        );

        Swal.fire('BERHASIL!', 'KRS Berhasil di Validasi.', 'success').then(() => {
            window.location.href = '/dashboard';
        });
        console.log('Status berhasil diperbarui:', response.data);
    } catch (error) {
        console.error('Gagal memperbarui status:', error);
    }
};

const fetchPertemuanAktif = async () => {
    try {
        const response = await get('pertemuan-perkuliahan/get-pertemuan-perkuliahan-aktif-by-dosen');
        pertemuanAktif.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};

const fetchPresensiMahasiswa = async () => {
    try {
        const response = await get('pertemuan-perkuliahan/get-pertemuan-perkuliahan-aktif-by-mahasiswa');
        presensi.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};
const updateDosenPengampu = () => {
    const selected = presensi.value.find((absen) => absen.id === selectedPresensi.value);
    dosenPengampu.value = selected?.KelasKuliah?.Dosen?.nama_dosen || '-';
};
const checkPresensiStatus = () => {
    const selected = presensi.value.find((absen) => absen.id === selectedPresensi.value);
    hasPresensi.value = selected?.presensi_hadir || false; // Asumsikan ada properti 'isPresensi' untuk mengecek status presensi
};

const presensiSekarang = async () => {
    try {
        const token = getToken();

        const pertemuanID = selectedPresensi.value;

        // Periksa apakah pertemuanID sudah dipilih
        if (!pertemuanID) {
            Swal.fire('PERINGATAN!', 'Pertemuan belum dipilih.', 'warning');
            return;
        }

        const url = `${API_URL}/presensi-perkuliahan/${pertemuanID}/absen-sekarang`;

        const response = await axios.post(
            url,
            // Data yang dikirimkan harus berada di dalam objek 'data'
            {},
            {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json'
                }
            }
        );

        Swal.fire('BERHASIL!', 'Berhasil Melakukan Presensi.', 'success').then(() => {
            window.location.href = '/dashboard';
        });
        // Update status presensi setelah berhasil melakukan presensi
        hasPresensi.value = true;
        console.log('Status berhasil diperbarui:', response.data);
    } catch (error) {
        console.error('Gagal memperbarui status:', error);
        // Tampilkan pesan error menggunakan Swal atau pesan kustom lainnya
        Swal.fire('GAGAL!', 'Gagal melakukan presensi. Silakan coba lagi.', 'error');
    }
};

onMounted(() => {
    user.value = getUser();
    fetchSemester();
    fetchSemesterAktif();
    fetchPertemuanAktif();
    fetchPresensiMahasiswa();
    permissions.value = getPermissions();
});
watchEffect(() => {
    updateDosenPengampu();
    checkPresensiStatus();
});
</script>

<template>
    <div class="row">
        <div class="col-12 xl:col-4">
            <div class="card">
                <h5>Hi,{{ user ? user : 'Guest' }}</h5>
                <div class="mx-auto font-color mt-2">
                    <span>Saat ini kamu berada di semester 8 dan telah berhasil menempuh sks dari 144 sks. Tetap semangat belajar, ya!</span>
                </div>
                <div class="mt-4">
                    <span class="font-color">IPK Anda</span>
                    <h4>3.03</h4>
                </div>
            </div>
        </div>
        <div class="col-12 xl:col-8">
            <div class="row">
                <div class="col-8">
                    <span>Jadwal Hari Ini (Rabu, 06 Maret 2024)</span>
                </div>
                <div class="col-4 text-lg-right">
                    <span>Semester {{ semesterAktif[0]?.Semester?.nama_semester }}</span>
                </div>
            </div>
            <div class="card bg-theme">
                <div class="row">
                    <div class="col-12 xl:col-8 yl:col-8">
                        <div class="text-danger">
                            <span>Saat ini Anda tidak memiliki jadwal kuliah yang harus diikuti, tetaplah semangat belajar dan menghasilkan karya - karya yang bermanfaat bagi nusa dan bangsa.</span>
                        </div>
                        <div class="mt-3 text-danger">
                            <span>Atau Anda bisa akses halaman berikut : </span>
                        </div>
                    </div>
                    <div class="col-12 xl:col-4 d-flex justify-content-center align-items-center">
                        <img src="../assets/images/gambar.jpg" alt="Gambar" class="img-fluid custom-img" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-4">
            <div class="card">
                <!-- <template> -->
                <div id="cal">
                    <vue-cal class="vuecal--rounded-theme vuecal--blue-theme" hide-view-selector :time="false" active-view="month" xsmall :disable-views="['week']">
                        <template #arrow-prev>
                            <i class="pi pi-arrow-left"></i>
                        </template>
                        <template #arrow-next>
                            <i class="pi pi-arrow-right"></i>
                        </template>
                    </vue-cal>
                </div>
                <!-- </template> -->
            </div>
        </div>
        <div v-if="permissions.includes('daftar-pertemuan-aktif')" class="col-5">
            <div class="card" style="height: calc(78vh - 200px)">
                <span><b>KELAS YANG DIBUKA PRESENSI HARI INI</b></span>
                <hr />
                <DataTable :value="pertemuanAktif" :paginator="true" :rows="10" dataKey="id" :rowHover="true" showGridlines>
                    <template #empty>
                        <div class="text-center">Tidak ada data</div>
                    </template>
                    <!-- <template #loading> Loading data. Please wait. </template> -->
                    <Column header="Pertemuan" style="min-width: 5rem">
                        <template #body="{ data }">
                            <div class="flex align-items-center gap-2">
                                <span>{{ data.pertemuan }}</span>
                            </div>
                        </template>
                    </Column>

                    <Column header="Mata Kuliah" style="min-width: 7rem">
                        <template #body="{ data }">
                            <div class="flex align-items-center gap-2">
                                <span>{{ data.KelasKuliah.MataKuliah.nama_mata_kuliah }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column header="Kelas" style="min-width: 7rem">
                        <template #body="{ data }">
                            <div class="flex align-items-center gap-2">
                                <span>{{ data.KelasKuliah.nama_kelas_kuliah }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column header="Waktu" style="min-width: 7rem">
                        <template #body="{ data }">
                            <div class="flex align-items-center gap-2">
                                <span>{{ data.waktu_mulai }} - {{ data.waktu_selesai }}</span>
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
        <div v-if="permissions.includes('buka-presensi')" class="col-3">
            <div class="card">
                <span><b>BUKA PRESENSI KELAS</b></span>
                <hr />
                <div class="row">
                    <label for="exampleFormControlInput1" class="form-label">Semester</label>
                    <div class="col-sm-12">
                        <select v-model="selectedSemester" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Semester</option>
                            <option v-for="semester in semesters" :key="semester.id_semester" :value="semester.id_semester">{{ semester.nama_semester }}</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <label for="exampleFormControlInput1" class="form-label">Mata Kuliah</label>
                    <div class="col-sm-12">
                        <select v-model="selectedMataKuliah" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Mata Kuliah</option>
                            <option v-for="matkul in matakuliah" :key="matkul.id_kelas_kuliah" :value="matkul.id_kelas_kuliah">{{ matkul.KelasKuliah.nama_kelas_kuliah }}- {{ matkul.KelasKuliah.MataKuliah.nama_mata_kuliah }}</option>
                        </select>
                    </div>
                </div>
                <div class="row mt-2">
                    <label for="exampleFormControlInput1" class="form-label">Pertemuan ke-</label>
                    <div class="col-sm-12">
                        <select v-model="selectedPertemuan" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Pertemuan</option>
                            <option v-for="pertemuan in pertemuanPerkuliahan" :key="pertemuan.id" :value="pertemuan.id">{{ pertemuan.pertemuan }}</option>
                        </select>
                    </div>
                </div>
                <div class="row mt-3"></div>
                <div class="row mt-2">
                    <button @click="openPertemuan" class="btn btn-primary">Buka Presensi</button>
                </div>
            </div>
        </div>
        <div v-if="permissions.includes('jadwal-perkuliahan-aktif')" class="col-5">
            <div class="card" style="height: calc(60vh - 200px)">
                <span><b>JADWAL PERKULIAHAN HARI INI</b></span>
                <hr />
                <DataTable :value="presensi" :paginator="true" :rows="10" dataKey="id" :rowHover="true" showGridlines>
                    <template #empty>
                        <div class="text-center">Tidak ada data</div>
                    </template>
                    <!-- <template #loading> Loading data. Please wait. </template> -->
                    <Column header="Pertemuan" style="min-width: 5rem">
                        <template #body="{ data }">
                            <div class="flex align-items-center gap-2">
                                <span>{{ data.pertemuan }}</span>
                            </div>
                        </template>
                    </Column>

                    <Column header="Mata Kuliah" style="min-width: 7rem">
                        <template #body="{ data }">
                            <div class="flex align-items-center gap-2">
                                <span>{{ data.KelasKuliah?.MataKuliah?.nama_mata_kuliah }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column header="Kelas" style="min-width: 7rem">
                        <template #body="{ data }">
                            <div class="flex align-items-center gap-2">
                                <span>{{ data?.KelasKuliah?.nama_kelas_kuliah }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column header="Waktu" style="min-width: 7rem">
                        <template #body="{ data }">
                            <div class="flex align-items-center gap-2">
                                <span>{{ data.waktu_mulai }} - {{ data.waktu_selesai }}</span>
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
        <div v-if="permissions.includes('presensi-mahasiswa')" class="col-3">
            <div class="card">
                <span class="fw-bold">PRESENSI SEKARANG!</span>
                <hr style="border-color: grey; margin-top: 5px" />
                <div class="">
                    <label for="exampleFormControlInput1" class="form-label text-secondary">Mata Kuliah</label>
                    <div class="col-sm-12">
                        <select v-model="selectedPresensi" class="form-select text-secondary" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Mata Kuliah</option>
                            <option v-for="absen in presensi" :key="absen.id" :value="absen.id">{{ absen.KelasKuliah?.MataKuliah?.nama_mata_kuliah || '-' }}</option>
                        </select>
                    </div>
                </div>
                <div class="my-4">
                    <label for="" class="text-secondary">Dosen Pengampu</label>
                    <p class="fw-bold text-secondary">{{ dosenPengampu }}</p>
                </div>
                <div class="my-1">
                    <label for="" class="text-secondary">Status Anda</label>
                    <button @click="presensiSekarang" class="btn btn-primary w-100" :disabled="hasPresensi">
                        {{ hasPresensi ? 'Sudah Melakukan Presensi' : 'Presensi Disini' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <span><b>INFORMASI TERBARU</b></span>
                <hr />
                <div class="row bg-theme" style="border-radius: 10px">
                    <div class="col-12">
                        <div class="text-secondary text-center">
                            <small> Tidak ada berita baru</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.custom-img {
    max-width: 120%;
    height: auto;
    /* Atur ukuran maksimal jika diperlukan */
    max-height: 350px;
    /* Misalnya, untuk membatasi tinggi gambar */
}

.bg-theme {
    background-color: #fbefea;
}

@import '~vue-cal/dist/vuecal.css';
</style>
