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
    nim: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_mata_kuliah: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_mahasiswa: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_program_studi: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const first = ref(0);
const selectedPesertaKelas = ref([]);
const matchingPesertaKelas = ref([]);
const pesertaKelas = ref([]);
const angkatans = ref([]);
const selectedAngkatan = ref('');
const selectedStatus = ref('');

const getAngkatan = async () => {
    try {
        const response = await get('angkatan/');
        angkatans.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};

const matchingPeserta = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const id_angkatan = selectedAngkatan.value;

        console.log('semester', id_angkatan);
        // Menggunakan axios untuk GET request dengan query parameters
        const response = await getData(`sync-feeder/${id_angkatan}/matching-peserta-kelas-kuliah`);

        const matching = response.data.message;
        matchingPesertaKelas.value = matching;
        Swal.fire('BERHASIL!', 'Data berhasil diMatching.', 'success').then(() => {});
        Swal.close();
        console.log('object :', matching);
    } catch (error) {
        console.error('Gagal mengambil data:', error);
        Swal.fire('Gagal', 'Data tidak ditemukan.', 'warning').then(() => {});
    }
};

const getPesertaKelas = async () => {
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
        const response = await getData(`peserta-kelas-kuliah-sync/belum-singkron/by-filter?jenis_singkron=${jenis_singkron}`);

        const kelas = response.data.data;
        pesertaKelas.value = kelas;

        Swal.close();
        console.log('object :', kelas);
    } catch (error) {
        console.error('Gagal mengambil data kelas:', error);
        Swal.fire('Gagal', 'Data tidak ditemukan.', 'warning').then(() => {});
    }
};

// const getPesertaKelasAll = async () => {
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
//         const response = await getData(`kelas-pengajar-kelas-kuliah-sync/belum-singkron`);

//         const kelas = response.data.data;
//         pesertaKelas.value = kelas;

//         Swal.close();

//         console.log('object :', kelas);
//     } catch (error) {
//         console.error('Gagal mengambil data Dosen:', error);
//         Swal.fire('Gagal', 'Data Dosen tidak ditemukan.', 'warning').then(() => {});
//     }
// };

const syncPesertaKelas = async () => {
    try {
        if (selectedPesertaKelas.value.length === 0) {
            Swal.fire('PERINGATAN!', 'Tidak ada data Mahasiswa yang dipilih.', 'warning');
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
        const url = `${API_URL}/sync-feeder/sync-peserta-kelas-kuliah`;
        const batchSize = 100; //

        const pesertaKelasSyncs = selectedPesertaKelas.value.map((pesertaKelas) => ({
            id: pesertaKelas.id
        }));

        for (let i = 0; i < pesertaKelasSyncs.length; i += batchSize) {
            const batch = pesertaKelasSyncs.slice(i, i + batchSize);

            // Data body dengan struktur yang sesuai
            const data = {
                peserta_kelas_kuliah_syncs: batch
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
        Swal.fire('BERHASIL!', 'Sync Peserta Kelas Berhasil.', 'success').then(() => {
            window.location.href = '/sync-peserta-kelas';
        });
    } catch (error) {
        console.error('Gagal memperbarui status:', error);
    }
};

const onPageChange = (event) => {
    first.value = event.first;
};

onBeforeMount(() => {
    // getPesertaKelasAll();
    getAngkatan();
});
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>Singkronisasi Peserta Kelas Kuliah ke Feeder</h5>
        <div class="card" style="padding: 0rem 1rem 0rem 1rem">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-12">
                    <h6 class="text-dark">Keterangan :</h6>
                    <p class="lh-1 text-small">
                        <ol>
                            <li>Fitur ini digunakan untuk melakukan matching data peserta kelas kuliah lokal dengan peserta kelas kuliah Feeder.</li>
                            <li>Memilih Semester pada kelas yang ingin dicocokkan dengan feeder</li>
                            <li>Memilih jenis singkron untuk data peserta kelas kuliah </li>
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
                        <label for="exampleFormControlInput1" class="form-label">Pilih Angkatan</label>
                        <select v-model="selectedAngkatan" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Angkatan</option>
                            <option v-for="angkatan in angkatans" :key="angkatan.id" :value="angkatan.id">{{ angkatan.tahun }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px">
                    <button @click="matchingPeserta" class="btn btn-primary btn-block" style="width: 100%">Matching</button>
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
                    <button @click="getPesertaKelas" class="btn btn-primary btn-block" style="width: 100%">Tampilkan</button>
                </div>
            </div>
            <hr />

            <DataTable v-model:filters="filters"
            :globalFilterFields="['PesertaKelasKuliah.Mahasiswa.nim', 'PesertaKelasKuliah.Mahasiswa.nama_mahasiswa', 'PesertaKelasKuliah.KelasKuliah.nama_kelas_kuliah', 'PesertaKelasKuliah.KelasKuliah.MataKuliah.nama_mata_kuliah', 'PesertaKelasKuliah.Mahasiswa.Prodi.nama_program_studi']"
            :value="pesertaKelas" v-model:selection="selectedPesertaKelas" :paginator="true" :rows="20" dataKey="id" :rowHover="true" showGridlines :first="first" @page="onPageChange">
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
                                <button @click="syncPesertaKelas" class="btn btn-secondary"><i class="pi pi-spinner me-2"></i> Sync</button>
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
                            <span>
                                {{ data.jenis_singkron === 'delete'
                                    ? data.PesertaKelasKuliahFeeder[0]?.nim || '-'
                                    : data.PesertaKelasKuliah?.Mahasiswa?.nim || '-' }}
                            </span>
                        </div>
                    </template>
                </Column>

                <Column filterField="nama_mahasiswa" header="Nama Mahasiswa" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.jenis_singkron === 'delete'
                            ? data.PesertaKelasKuliahFeeder[0]?.nama_mahasiswa || '-'
                            : data.PesertaKelasKuliah?.Mahasiswa?.nama_mahasiswa || '-' }}
                    </template>
                </Column>

                <Column filterField="nama_kelas_kuliah" header="Nama Kelas" style="min-width: 12rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>
                                {{ data.jenis_singkron === 'delete'
                                    ? data.PesertaKelasKuliahFeeder[0]?.nama_kelas_kuliah || '-'
                                    : data.PesertaKelasKuliah?.KelasKuliah?.nama_kelas_kuliah || '-' }}
                            </span>
                        </div>
                    </template>
                </Column>

                <Column filterField="nama_mata_kuliah" header="Nama Mata Kuliah" style="min-width: 12rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>
                                {{ data.jenis_singkron === 'delete'
                                    ? data.PesertaKelasKuliahFeeder[0]?.nama_mata_kuliah || '-'
                                    : data.PesertaKelasKuliah?.KelasKuliah?.MataKuliah?.nama_mata_kuliah || '-' }}
                            </span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_program_studi" header="Program Studi" style="min-width: 12rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>
                                {{ data.jenis_singkron === 'delete'
                                    ? data.PesertaKelasKuliahFeeder[0]?.nama_program_studi || '-'
                                    : data.PesertaKelasKuliah?.KelasKuliah?.Prodi?.nama_program_studi || '-' }}
                            </span>
                        </div>
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
