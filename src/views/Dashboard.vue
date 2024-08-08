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
import excel from '../assets/images/excel.png';
import calendar from '../assets/images/calendar.png';
import list from '../assets/images/list.png';
import pay from '../assets/images/pay.png';
import cek from '../assets/images/cek.png';
import mhs from '../assets/images/mhs.png';
import print from '../assets/images/print.png';
import point from '../assets/images/point.png';
import VueApexCharts from 'vue3-apexcharts';

const user = ref([]);
const semesters = ref([]);
const matakuliah = ref([]);
const permissions = ref([]);
const presensi = ref([]);
const pertemuanPerkuliahan = ref([]);
const pertemuanAktif = ref([]);
const ipsSemester = ref([]);
const selectedSemester = ref('');
const selectedMataKuliah = ref('');
const selectedPertemuan = ref('');
const selectedPresensi = ref('');
const dosenPengampu = ref('-');
const semesterAktif = ref([]);
const hasPresensi = ref(false);

const fetchSemesterAktif = async () => {
    const response = await get('semester-aktif/get-semester-aktif-now');
    semesterAktif.value = response.data.data;
    console.log('res', response.data.data);
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

        Swal.fire('BERHASIL!', 'Pertemuan Berhasil Dibuka.', 'success').then(() => {
            window.location.href = '/dashboard';
        });
        console.log('Status berhasil diperbarui:', response.data);
    } catch (error) {
        console.error('Gagal memperbarui status:', error);
    }
};

const closePertemuan = async (id) => {
    try {
        const token = getToken();

        const url = `${API_URL}/pertemuan-perkuliahan/${id}/close-pertemuan-perkuliahan`;

        const response = await axios.put(
            url,
            {},
            {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json' // Tambahkan header Content-Type
                }
            }
        );

        Swal.fire('BERHASIL!', 'Pertemuan Berhasil Ditutup.', 'success').then(() => {
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
    } catch (error) {
        console.error('Gagal memperbarui status:', error);
        // Tampilkan pesan error menggunakan Swal atau pesan kustom lainnya
        Swal.fire('GAGAL!', 'Gagal melakukan presensi. Silakan coba lagi.', 'error');
    }
};

const series = ref([
    {
        name: 'Semester IPK',
        type: 'column',
        data: []
    }
]);

const chartOptions = ref({
    chart: {
        height: 350,
        type: 'line'
    },
    stroke: {
        width: [0, 4]
    },
    title: {
        text: 'IPK PER SEMESTER'
    },
    dataLabels: {
        enabled: true,
        enabledOnSeries: [2]
    },
    labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8'],
    colors: ['#F7EA06']
});

const getIPSSemester = async () => {
    try {
        const response = await get('mahasiswa/get-ips-mahasiswa-active');
        const ipsSemester = response.data.daftar_ips;

        // Clear existing data (optional, depending on your logic)
        series.value[0].data = [];

        // Loop through ipsSemester and push each value to series
        ipsSemester.forEach((ipsValue) => {
            series.value[0].data.push(ipsValue);
        });
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};

onMounted(() => {
    user.value = getUser();
    fetchSemester();
    fetchSemesterAktif();
    fetchPertemuanAktif();
    fetchPresensiMahasiswa();
    getIPSSemester();
    permissions.value = getPermissions();
});
watchEffect(() => {
    updateDosenPengampu();
    checkPresensiStatus();
});
</script>

<script>
import VueApexCharts from 'vue3-apexcharts';

export default {
    components: {
        apexchart: VueApexCharts
    }
};
</script>

<template>
    <!-- role super admin dan admin prodi (belum dipermission) -->
    <!-- <div v-if="permissions.includes('alur-menu-admin')" class="row"> -->
    <div v-if="permissions.includes('dashboard-admin')" class="row">
        <div class="col-md-3 col-sm-3 mb-3">
            <div class="card mb-0 p-3 position-relative">
                <p class="top-right-number">1</p>
                <div class="d-flex align-items-center justify-content-center">
                    <div class="flex align-items-center justify-content-center bg-red-50 border-round" style="width: 4rem; height: 4rem">
                        <img :src="excel" style="width: 60%" alt="-" />
                    </div>
                </div>
                <router-link to="/import-mahasiswa" target="_blank">
                    <p class="text-dark mt-3 text-center text-db font-medium">Import Data Kolektif Mahasiswa</p>
                </router-link>
            </div>
        </div>
        <div class="col-md-3 col-sm-3 mb-3">
            <div class="card mb-0 p-3 position-relative">
                <p class="top-right-number">2</p>
                <div class="d-flex align-items-center justify-content-center">
                    <div class="flex align-items-center justify-content-center bg-red-50 border-round" style="width: 4rem; height: 4rem">
                        <img :src="calendar" style="width: 60%" alt="-" />
                    </div>
                </div>
                <router-link to="/kelas-jadwal-perkuliahan" target="_blank">
                    <p class="text-dark mt-3 text-center text-db font-medium">Kelas Ditawarkan</p>
                </router-link>
            </div>
        </div>
        <div class="col-md-3 col-sm-3 mb-3">
            <div class="card mb-0 p-3 position-relative">
                <p class="top-right-number">3</p>
                <div class="d-flex align-items-center justify-content-center">
                    <div class="flex align-items-center justify-content-center bg-red-50 border-round" style="width: 4rem; height: 4rem">
                        <img :src="list" style="width: 60%" alt="-" />
                    </div>
                </div>
                <router-link to="/set-status-mahasiswa" target="_blank">
                    <p class="text-dark mt-3 text-center text-db font-medium">Set Status mahasiswa</p>
                </router-link>
            </div>
        </div>
        <div class="col-md-3 col-sm-3 mb-3">
            <div class="card mb-0 p-3 position-relative">
                <p class="top-right-number">4</p>
                <div class="d-flex align-items-center justify-content-center">
                    <div class="flex align-items-center justify-content-center bg-red-50 border-round" style="width: 4rem; height: 4rem">
                        <img :src="pay" style="width: 60%" alt="-" />
                    </div>
                </div>
                <router-link to="/daftar-pembayaran" target="_blank">
                    <p class="text-dark mt-3 text-center text-db font-medium">Pembayaran Mahasiswa</p>
                </router-link>
            </div>
        </div>
        <div class="col-md-3 col-sm-3 mb-3">
            <div class="card mb-0 p-3 position-relative">
                <p class="top-right-number">5</p>
                <div class="d-flex align-items-center justify-content-center">
                    <div class="flex align-items-center justify-content-center bg-red-50 border-round" style="width: 4rem; height: 4rem">
                        <img :src="print" style="width: 60%" alt="-" />
                    </div>
                </div>
                <router-link to="/krs-mahasiswa" target="_blank">
                    <p class="text-dark mt-3 text-center text-db font-medium">Print KRS</p>
                </router-link>
            </div>
        </div>
        <div class="col-md-3 col-sm-3 mb-3">
            <div class="card mb-0 p-3 position-relative">
                <p class="top-right-number">6</p>
                <div class="d-flex align-items-center justify-content-center">
                    <div class="flex align-items-center justify-content-center bg-red-50 border-round" style="width: 4rem; height: 4rem">
                        <img :src="cek" style="width: 60%" alt="-" />
                    </div>
                </div>
                <router-link to="/validasi-krs-mahasiswa" target="_blank">
                    <p class="text-dark mt-3 text-center text-db font-medium">Validasi KRS</p>
                </router-link>
            </div>
        </div>
        <div class="col-md-3 col-sm-3 mb-3">
            <div class="card mb-0 p-3 position-relative">
                <p class="top-right-number">7</p>
                <div class="d-flex align-items-center justify-content-center">
                    <div class="flex align-items-center justify-content-center bg-red-50 border-round" style="width: 4rem; height: 4rem">
                        <img :src="point" style="width: 60%" alt="-" />
                    </div>
                </div>
                <router-link to="/nilai-perkuliahan" target="_blank">
                    <p class="text-dark mt-3 text-center text-db font-medium">Penilaian</p>
                </router-link>
            </div>
        </div>
        <div class="col-md-3 col-sm-3 mb-3">
            <div class="card mb-0 p-3 position-relative">
                <p class="top-right-number">8</p>
                <div class="d-flex align-items-center justify-content-center">
                    <div class="flex align-items-center justify-content-center bg-red-50 border-round" style="width: 4rem; height: 4rem">
                        <img :src="print" style="width: 60%" alt="-" />
                    </div>
                </div>
                <router-link to="/khs-mahasiswa" target="_blank">
                    <p class="text-dark mt-3 text-center text-db font-medium">Print KHS</p>
                </router-link>
            </div>
        </div>
    </div>

    <div class="row mt-3">
        <!-- role mahasiswa dan dosen (belum dipermission) -->
        <!-- <div v-if="permissions.includes('informasi-dosen-mahasiswa')" class="col-lg-8 col-md-8"> -->
        <div v-if="permissions.includes('dashboard-info')" class="col-lg-8 col-md-8">
            <div class="d-flex justify-content-between">
                <div class="d-flex justify-content-start">
                    <h5>Hi,{{ user ? user : 'Guest' }}</h5>
                </div>
                <div class="d-flex justify-content-end">
                    <span>Semester {{ semesterAktif?.Semester?.nama_semester }}</span>
                </div>
            </div>
            <div class="card bg-theme">
                <div class="text-danger">
                    <span>Selamat Datang!!! tetaplah semangat belajar dan menghasilkan karya - karya yang bermanfaat bagi nusa dan bangsa.</span>
                </div>
                <div class="mt-3 text-danger">
                    <span>Jangan lupa untuk melakukan penugasan dibawah ini: </span>
                </div>

                <!-- role mahasiswa -->
                <div v-if="permissions.includes('dashboard-mahasiswa')">
                    <router-link to="/profile-data-mahasiswa" target="_blank">
                        <li class="text-dark mt-3 font-medium">Profile Mahasiswa</li>
                    </router-link>
                    <router-link to="/tagihan-pembayaran-mahasiswa" target="_blank">
                        <li class="text-dark mt-3 font-medium">Pembayaran Mahasiswa</li>
                    </router-link>
                    <router-link to="/perkuliahan-krs-mahasiswa" target="_blank">
                        <li class="text-dark mt-3 font-medium">KRS Online Mahasiswa</li>
                    </router-link>
                </div>

                <!-- role dosen -->
                <div v-if="permissions.includes('dashboard-dosen')">
                    <router-link to="/pertemuan-perkuliahan/:id_kelas_kuliah" target="_blank">
                        <li class="text-dark mt-3 font-medium">Pertemuan Kelas</li>
                    </router-link>
                    <router-link to="/presensi-perkuliahan" target="_blank">
                        <li class="text-dark mt-3 font-medium">Presensi Kelas</li>
                    </router-link>
                </div>
            </div>
        </div>

        <!-- all role -->
        <div class="col-lg-4 col-md-4 col-sm-12">
            <div class="card">
                <div id="cal">
                    <vue-cal class="vuecal--rounded-theme vuecal--green-theme" xsmall hide-view-selector :time="false" active-view="month" :disable-views="['week']">
                        <template #arrow-prev>
                            <i class="pi pi-arrow-left"></i>
                        </template>
                        <template #arrow-next>
                            <i class="pi pi-arrow-right"></i>
                        </template>
                    </vue-cal>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="row mt-3">
            <div v-if="permissions.includes('daftar-pertemuan-aktif')" class="col-lg-8 col-md-8">
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
                        <Column header="Tutup Kelas" style="min-width: 10rem">
                            <template #body="{ data }">
                                <button @click="closePertemuan(data.id)" class="btn btn-outline-danger me-2"><i class="pi pi-check"></i></button>
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </div>
            <div v-if="permissions.includes('buka-presensi')" class="col-lg-4 col-md-4 col-sm-12">
                <div class="card">
                    <span><b>BUKA PRESENSI KELAS</b></span>
                    <hr style="border-color: grey; margin-top: 5px" />
                    <div class="row">
                        <label for="exampleFormControlInput1" class="form-label text-secondary">Semester</label>
                        <div class="col-sm-12">
                            <select v-model="selectedSemester" class="form-select" aria-label="Default select example">
                                <option value="" selected disabled hidden>Pilih Semester</option>
                                <option v-for="semester in semesters" :key="semester.id_semester" :value="semester.id_semester">{{ semester.nama_semester }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="row my-4">
                        <label for="exampleFormControlInput1" class="form-label text-secondary">Mata Kuliah</label>
                        <div class="col-sm-12">
                            <select v-model="selectedMataKuliah" class="form-select" aria-label="Default select example">
                                <option value="" selected disabled hidden>Pilih Mata Kuliah</option>
                                <option v-for="matkul in matakuliah" :key="matkul.id_kelas_kuliah" :value="matkul.id_kelas_kuliah">{{ matkul.KelasKuliah.nama_kelas_kuliah }}- {{ matkul.KelasKuliah.MataKuliah.nama_mata_kuliah }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <label for="exampleFormControlInput1" class="form-label text-secondary">Pertemuan ke-</label>
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
        </div>

        <div v-if="permissions.includes('jadwal-perkuliahan-aktif')" class="col-lg-8 col-md-8">
            <div class="card">
                <span><b>JADWAL PERKULIAHAN HARI INI</b></span>
                <hr />
                <div class="card-body">
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
        </div>
        <div v-if="permissions.includes('presensi-mahasiswa')" class="col-lg-4 col-md-4 col-sm-12">
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

    <!-- role mahasiswa (belum di permission) -->
    <div class="row mt-3">
        <!-- <div v-if="permissions.includes('diagram-ipk-mahasiswa')" class="col-lg-8"> -->
        <div v-if="permissions.includes('dashboard-mahasiswa')" class="col-lg-8">
            <div class="card">
                <div class="card-body">
                    <apexchart width="100%" type="line" :options="chartOptions" :series="series"></apexchart>
                </div>
            </div>
        </div>

        <!-- all role -->
        <div class="col-lg-4">
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

.text-db:hover {
    color: #747474 !important;
    cursor: pointer;
}

.top-right-number {
    position: absolute;
    top: 10px;
    left: 20px;
    margin: 0;
    font-size: 1.5rem;
    color: rgb(0, 102, 39);
}

@import '~vue-cal/dist/vuecal.css';
</style>
