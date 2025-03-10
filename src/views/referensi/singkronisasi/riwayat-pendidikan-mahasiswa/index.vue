<script setup>
import axios from 'axios';
import { FilterMatchMode } from 'primevue/api';
import Swal from 'sweetalert2';
import { onBeforeMount, ref } from 'vue';
import { API_URL } from '../../../../config/config';
import { getToken } from '../../../../service/auth';
import { get, getData } from '../../../../utiils/request';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nama_kelas_kuliah: { value: null, matchMode: FilterMatchMode.EQUALS },
    semester: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_mata_kuliah: { value: null, matchMode: FilterMatchMode.EQUALS },
    kode_mata_kuliah: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_program_studi: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const first = ref(0);
const selectedRiwayatPendidikan = ref([]);
const matchingRiwayat = ref([]);
const riwayatMahasiswa = ref([]);
const semesters = ref([]);
const selectedSemester = ref('');
const selectedStatus = ref('');

const getSemester = async () => {
    try {
        const response = await get('semester/');
        semesters.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data semester:', error);
    }
};

const matchingRiwayatPendidikan = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const id_semester = selectedSemester.value;

        console.log('semester', id_semester);
        // Menggunakan axios untuk GET request dengan query parameters
        const response = await getData(`sync-feeder/${id_semester}/matching-riwayat-pendidikan-mahasiswa`);

        const matching = response.data.message;
        matchingRiwayat.value = matching;
        Swal.fire('BERHASIL!', 'Data berhasil diMatching.', 'success').then(() => {});
        Swal.close();
        console.log('object :', matching);
    } catch (error) {
        console.error('Gagal mengambil data:', error);
        Swal.fire('Gagal', 'Data tidak ditemukan.', 'warning').then(() => {});
    }
};

const getRiwayat = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const jenis_singkron = selectedStatus.value;

        console.log('jenis singkron :', jenis_singkron);
        // Menggunakan axios untuk GET request dengan query parameters
        const response = await getData(`riwayat-pendidikan-mahasiswa-sync/belum-singkron/by-filter?jenis_singkron=${jenis_singkron}`);

        const data = response.data.data;
        riwayatMahasiswa.value = data;

        Swal.close();
        console.log('object :', data);
    } catch (error) {
        console.error('Gagal mengambil data :', error);
        Swal.fire('Gagal', 'Data tidak ditemukan.', 'warning').then(() => {});
    }
};

// const getRiwayatAll = async () => {
//     try {
//         Swal.fire({
//             title: 'Loading...',
//             html: 'Sedang Memuat Data',
//             allowOutsideClick: false,
//             didOpen: () => {
//                 Swal.showLoading();
//             }
//         });

//         // const jenis_singkron = selectedStatus.value;

//         // console.log('jenis singkron :', jenis_singkron);
//         // Menggunakan axios untuk GET request dengan query parameters
//         const response = await getData(`kelas-kuliah-sync/belum-singkron`);

//         const kelas = response.data.data;
//         riwayatMahasiswa.value = kelas;

//         Swal.close();

//         console.log('object :', kelas);
//     } catch (error) {
//         console.error('Gagal mengambil data Kelas:', error);
//         Swal.fire('Gagal', 'Data Kelas tidak ditemukan.', 'warning').then(() => {});
//     }
// };

const syncRiwayatPendidikanMahasiswa = async () => {
    try {
        if (selectedRiwayatPendidikan.value.length === 0) {
            Swal.fire('PERINGATAN!', 'Tidak ada data yang dipilih.', 'warning');
            return; // Hentikan eksekusi fungsi jika tidak ada data yang dipilih
        }
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const token = getToken();
        console.log('object', token);
        const url = `${API_URL}/sync-feeder/sync-riwayat-pendidikan-mahasiswa`;
        const batchSize = 100; //

        const riwayatMahasiswaSyncs = selectedRiwayatPendidikan.value.map((riwayatMahasiswa) => ({
            id: riwayatMahasiswa.id
        }));

        for (let i = 0; i < riwayatMahasiswaSyncs.length; i += batchSize) {
            const batch = riwayatMahasiswaSyncs.slice(i, i + batchSize);

            // Data body dengan struktur yang sesuai
            const data = {
                riwayat_pendidikan_mahasiswa_syncs: batch
            };

            const response = await axios.post(
                url,
                data, // Body permintaan
                {
                    headers: {
                        Authorization: token,
                        'Content-Type': 'application/json' // Tambahkan header Content-Type
                    }
                }
            );

            console.log(`Batch ${i / batchSize + 1} berhasil diperbarui:`, response.data);
        }

        Swal.close();
        Swal.fire('BERHASIL!', 'Sync Riwayat Pendidikan Mahasiswa Berhasil.', 'success').then(() => {
            window.location.reload();
        });
    } catch (error) {
        console.error('Gagal memperbarui status:', error);
    }
};

const onPageChange = (event) => {
    first.value = event.first;
};

onBeforeMount(() => {
    // getRiwayatAll();
    getSemester();
});
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>Singkronisasi Riwayat Pendidikan Mahasiswa ke Feeder</h5>
        <div class="card" style="padding: 0rem 1rem 0rem 1rem">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-12">
                    <h6 class="text-dark">Keterangan :</h6>
                    <p class="lh-1 text-small">
                        <ol>
                            <li>Fitur ini digunakan untuk melakukan matching data Riwayat Pendidikan Mahasiswa lokal dengan Riwayat Pendidikan Mahasiswa Feeder.</li>
                            <li>Memilih Semester pada kelas yang ingin dicocokkan dengan feeder</li>
                            <li>Memilih jenis singkron untuk data Riwayat Pendidikan Mahasiswa </li>
                            <li>Memilih data yang hendak disinkron pada Feeder dan menekan tombol sync.</li>
                        </ol>
                    </p>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="row">
                <div class="col-lg-10 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Pilih Periode</label>
                        <select v-model="selectedSemester" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Semester</option>
                            <option v-for="semester in semesters" :key="semester.id_semester" :value="semester.id_semester">{{ semester.nama_semester }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px">
                    <button @click="matchingRiwayatPendidikan" class="btn btn-primary btn-block" style="width: 100%">Matching</button>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-10 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Pilih Jenis Sync</label>
                        <select v-model="selectedStatus" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>All</option>
                            <option value="create">Create</option>
                            <option value="update">Update</option>
                            <!-- <option value="delete">Delete</option> -->
                        </select>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px">
                    <button @click="getRiwayat" class="btn btn-primary btn-block" style="width: 100%">Tampilkan</button>
                </div>
            </div>
            <hr />

            <DataTable v-model:filters="filters"
            :globalFilterFields="['KelasKuliah.nama_mata_kuliah', 'KelasKuliah.Semester.nama_semester', 'KelasKuliah.MataKuliah.kode_mata_kuliah', 'KelasKuliah.Prodi.nama_program_studi', 'KelasKuliah.MataKuliah.nama_mata_kuliah']"
            :value="riwayatMahasiswa" v-model:selection="selectedRiwayatPendidikan" :paginator="true" :rows="20" dataKey="id" :rowHover="true" showGridlines :first="first" @page="onPageChange">
                <template #header>
                    <div class="row">
                        <div class="col-lg-6 d-flex justify-content-start">
                            <IconField iconPosition="left">
                                <InputIcon class="pi pi-search" />
                                <InputText placeholder="Cari disini" style="width: 100%" />
                            </IconField>
                        </div>
                        <div class="col-lg-6 d-flex justify-content-end">
                            <div class="flex justify-content-end gap-2">
                                <button @click="syncRiwayatPendidikanMahasiswa" class="btn btn-secondary"><i class="pi pi-spinner  me-2"></i> Sync</button>
                            </div>
                        </div>
                    </div>
                </template>

                <template #empty>
                    <div class="text-center">Tidak ada data.</div>
                </template>
              
                <Column selectionMode="multiple" headerStyle="width: 3em"></Column>

                <Column filterField="nim" header="NIM" style="min-width: 14rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>
                                {{ data.jenis_singkron === 'delete'
                                    ? data.RiwayatPendidikanMahasiswaFeeder[0]?.nim || '-'
                                    : data.RiwayatPendidikanMahasiswa?.Mahasiswa?.nim|| '-' }}
                            </span>
                        </div>
                    </template>
                </Column>

                <Column filterField="nama_mahasiswa" header="Nama Mahasiswa" style="min-width: 12rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>
                                {{ data.jenis_singkron === 'delete'
                                    ? data.RiwayatPendidikanMahasiswaFeeder[0]?.nama_mahasiswa || '-'
                                    : data.RiwayatPendidikanMahasiswa?.Mahasiswa?.nama_mahasiswa || '-' }}
                            </span>
                        </div>
                    </template>
                </Column>

                <Column filterField="nama_program_studi" header="Program Studi" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.jenis_singkron === 'delete'
                            ? data.RiwayatPendidikanMahasiswaFeeder[0]?.nama_program_studi || '-'
                            : data.RiwayatPendidikanMahasiswa?.Mahasiswa?.Prodi?.nama_program_studi || '-' }}
                    </template>
                </Column>

                <Column filterField="nama_periode_masuk" header="Tahun Masuk" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.jenis_singkron === 'delete'
                            ? data.RiwayatPendidikanMahasiswaFeeder[0]?.nama_periode_masuk || '-'
                            : data.RiwayatPendidikanMahasiswa?.Mahasiswa?.nama_periode_masuk || '-' }}
                    </template>
                </Column>

                <Column filterField="nama_ibu_kandung" header="nama Ibu Kandung" style="min-width: 15rem">
                    <template #body="{ data }">
                        {{ data.jenis_singkron === 'delete'
                            ? data.RiwayatPendidikanMahasiswaFeeder[0]?.nama_ibu_kandung || '-'
                            : data.RiwayatPendidikanMahasiswa?.nama_ibu_kandung || '-' }}
                    </template>
                </Column>

                <Column filterField="jenis_singkron" header="Jenis Singkron" style="min-width: 15rem">
                    <template #body="{ data }">
                        {{ data.jenis_singkron || '-' }}
                    </template>
                </Column>

            </DataTable>
        </div>
    </div>
</template>

<style scoped>
.card-theme {
    background-color: rgba(154, 160, 172, 0.5);
}
</style>
