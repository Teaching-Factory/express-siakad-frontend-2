<script setup>
import { ref, onBeforeMount, computed } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import Swal from 'sweetalert2';
import { get } from '../../../utiils/request';
import { getToken } from '../../../service/auth';
import { API_URL } from '../../../config/config';
import axios from 'axios';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nama_mahasiswa: { value: null, matchMode: FilterMatchMode.EQUALS },
    nim: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_program_studi: { value: null, matchMode: FilterMatchMode.EQUALS },
    total_sks: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_status_mahasiswa: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const validasiKRS = ref([]);
const loading1 = ref(false);
const selectedValidasi = ref([]);
const prodis = ref([]);
const semesters = ref([]);
const selectedProdi = ref('');
const selectedSemester = ref('');
const message = ref('');

const fetchProdi = async () => {
    try {
        const response = await get('prodi');
        prodis.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};
const fetchSemester = async () => {
    try {
        const response = await get('semester');
        semesters.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};

const selectedFilter = async () => {
    // loading1.value = true;
    Swal.fire({
        title: 'Loading...',
        html: 'Sedang Memuat Data',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
    await Promise.all([fetchProdi(), fetchSemester()]);
    Swal.close();
};

const filterData = async () => {
    const prodiId = selectedProdi.value;
    const semesterId = selectedSemester.value;

    if (!prodiId || !semesterId) {
        // console.error('Prodi atau Angkatan Mahasiswa belum dipilih');
        Swal.fire('GAGAL!', 'Data tidak ditemukan.', 'warning').then(() => {});
        return;
    }

    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await get(`krs-mahasiswa/${prodiId}/${semesterId}/get-mahasiswa-krs-belum-tervalidasi`);

        validasiKRS.value = response.data.data;
        Swal.close();
    } catch (error) {
        Swal.fire('GAGAL!', 'Data Kelas Kuliah tidak ditemukan.', 'warning').then(() => {});
    }
};
const updateValidasi = async () => {
    try {
        if (selectedValidasi.value.length === 0) {
            Swal.fire('PERINGATAN!', 'Tidak ada data KRS mahasiswa yang dipilih.', 'warning');
            return; // Hentikan eksekusi fungsi jika tidak ada data yang dipilih
        }

        const token = getToken();
        const prodiId = selectedProdi.value;
        const semesterId = selectedSemester.value;

        // Periksa apakah prodiId dan semesterId sudah dipilih
        if (!prodiId || !semesterId) {
            Swal.fire('PERINGATAN!', 'Prodi atau Semester belum dipilih.', 'warning');
            return;
        }

        const url = `${API_URL}/krs-mahasiswa/${prodiId}/${semesterId}/validasi-krs`;

        // Persiapkan data untuk permintaan PUT
        const data = {
            mahasiswas: selectedValidasi.value.map((mahasiswa) => ({
                id_registrasi_mahasiswa: mahasiswa.id_registrasi_mahasiswa
            }))
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
            window.location.href = '/validasi-krs-mahasiswa';
        });
        console.log('Status berhasil diperbarui:', response.data);
    } catch (error) {
        console.error('Gagal memperbarui status:', error);
    }
};

const deleteItem = async (id_registrasi_mahasiswa) => {
    try {
        const response = await del(`krs-mahasiswa/${id_registrasi_mahasiswa}/delete`);
        if (response.status === 200) {
            message.value = 'Data berhasil dihapus!';
            // Menghapus item dari array validasiKRS yang memiliki id yang sesuai
            // validasiKRS.value = validasiKRS.value.filter((data) => data.id !== id);
        } else {
            message.value = 'Terjadi kesalahan: ' + response.statusText;
        }
    } catch (error) {
        message.value = 'Terjadi kesalahan: ' + error.message;
    }
};

const confirmDelete = (id_registrasi_mahasiswa) => {
    Swal.fire({
        title: 'Apa Kamu Yakin?',
        text: 'Data ini akan dihapus',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, saya yakin!',
        cancelButtonText: 'Batal',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            deleteItem(id_registrasi_mahasiswa);
            Swal.fire('BERHASIL!', 'Data berhasil dihapus.', 'success');
            validasiKRS.value = validasiKRS.value.filter((data) => data.id_registrasi_mahasiswa !== id_registrasi_mahasiswa);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('BATAL', 'Data Anda Tidak Jadi Dihapus', 'error');
        }
    });
};
const validasiUrl = computed(() => {
    const id_prodi = selectedProdi.value;
    const id_semester = selectedSemester.value;
    if (!id_prodi || !id_semester) {
        return '';
    }
    return `/validasi-krs-mahasiswa/${id_prodi}/${id_semester}/tervalidasi`;
});
onBeforeMount(() => {
    selectedFilter();
});
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>VALIDASI KRS MAHASISWA - 2021/2022 GENAP</h5>
            <div class="card" style="padding: 0rem 1rem 0rem 1rem">
                <div class="row">
                    <div class="col-12 col-md-6 col-lg-12">
                        <h6 class="text-dark">Keterangan :</h6>
                        <p class="lh-1 text-small">
                            <ol>
                            <li>Fitur ini menampilkan seluruh daftar mahasiswa yang telah melakukan KRS. </li>
                            <li>Disarankan Mahasiswa sudah di set Dosen Wali terlebih dahulu.</li>
                            <li>Untuk melakukan validasi KRS Online, centang pada mahasiswa yang akan divalidasi KRS Online tanpa melalui dosen wali terlebih dahulu. kemudian klik tombol "PROSES VALIDASI"</li>
                            <li>Dapat melihat status krs mahasiswa yang sudah tervalidasi pada button tervalidasi</li>
                            <li>Untuk membatalkan validasi KRS Online, klik tombol hapus pada mahasiswa yang diinginkan.</li>
                            <li>Fitur ini hanya digunakan untuk membantu proses validasi oleh admin, proses validasi sebenarnya terdapat pada login dosen wali.</li>
                            <li>KRS Mahasiswa yang dapat divalidasi ialah Mahasiswa yang memiliki status aktivitas perkuliahan AKTIF.</li>
                            <li>Fitur pencarian bisa di lakukan berdasarkan NIM atau Nama Mahasiswa.</li>
                            <li>Tidak Ada Jenis Tagihan yang menjadi syarat KRS, bila ingin meng-set tagihan yang menjadi flag KRS hubungi admin keuangan.</li>
                        </ol>
                        </p>
                    </div>
                    <div class="col-lg-5 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Program Studi</label>
                        <select v-model="selectedProdi" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Program Studi</option>
                            <option v-for="prodi in prodis" :key="prodi.id_prodi" :value="prodi.id_prodi">{{ prodi.nama_program_studi }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-5 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Semester</label>
                        <select v-model="selectedSemester" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Semester</option>
                            <option v-for="semester in semesters" :key="semester.id_semester" :value="semester.id_semester">{{ semester.nama_semester }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px;">
                    <button @click="filterData" class="btn btn-primary btn-block" style="width: 100%;">Tampilkan</button>
                </div>
                <hr/>
                </div>
               
            </div>
            <DataTable v-model:filters="filters" :globalFilterFields="['nama_mahasiswa', 'nim', 'Prodi.nama_program_studi', 'total_sks', 'nama_status_mahasiswa', 'statusvalidasi']"
                :value="validasiKRS"
                v-model:selection="selectedValidasi"
                :paginator="true"
                :rows="10"
                dataKey="id_registrasi_mahasiswa"
                :rowHover="true"
                showGridlines
            >
                <template #header>
                    <div class="row">
                        <div class="col-lg-6 d-flex justify-content-start">
                            <IconField iconPosition="left">
                                <InputIcon class="pi pi-search" />
                                <InputText placeholder="Cari disini" v-model="filters['global'].value" style="width: 100%" />
                            </IconField>
                        </div>
                        <div class="col-lg-6 d-flex justify-content-end">
                            <div class="flex justify-content-end gap-2">
                                <router-link :to="validasiUrl" class="btn btn-primary"> <i class="pi pi-eye me-2"></i> Tervalidasi</router-link>
                                <button class="btn btn-danger"> <i class="pi pi-refresh me-2"></i> Sinkronkan</button>
                                <button class="btn btn-primary" @click="updateValidasi"> <i class="pi pi-check me-2"></i> Proses Validasi</button>
                            </div>
                        </div>
                    </div>
                </template>

                <template #empty>
                    <div class="text-center">Tidak ada data.</div>
                </template>
                <Column selectionMode="multiple" headerStyle="width: 3em"></Column>
                <Column filterField="nim" header="NIM" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nim }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_mahasiswa" header="Nama Mahasiswa" style="min-width: 14rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nama_mahasiswa }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_program_studi" header="Program Studi" style="min-width: 15rem">
                    <template #body="{ data }">
                        {{ data.Prodi.nama_program_studi }}
                    </template>
                </Column>
                <Column filterField="total_sks" header="Jumlah SKS" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.total_sks }}
                    </template>
                </Column>
                <Column filterField="nama_status_mahasiswa" header="Status Mahasiswa" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.nama_status_mahasiswa }}
                    </template>
                </Column>
                <Column header="Aksi" style="min-width: 10rem">
                    <template #body="{ data }">
                        <router-link :to="`/validasi-krs-mahasiswa/detailKRS/${data.id_registrasi_mahasiswa}`" class="btn btn-outline-primary me-2 py-1 px-2"> 
                            <i class="pi pi-pencil"></i>
                        </router-link>
                        
                        <button class="btn btn-outline-danger py-1 px-2" @click="confirmDelete(data.id_registrasi_mahasiswa)">
                            <i class="pi pi-trash"></i>
                        </button>
                    </template>
                </Column>
            </DataTable>
    </div>
</template>

<style scoped>
.card-theme {
    background-color: rgba(154, 160, 172, 0.5);
}
</style>
