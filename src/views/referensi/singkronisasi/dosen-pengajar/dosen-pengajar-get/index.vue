<script setup>
import axios from 'axios';
import { FilterMatchMode } from 'primevue/api';
import Swal from 'sweetalert2';
import { onBeforeMount, ref } from 'vue';
import { API_URL } from '../../../../../config/config';
import { getToken } from '../../../../../service/auth';
import { getData } from '../../../../../utiils/request';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nama_kelas_kuliah: { value: null, matchMode: FilterMatchMode.EQUALS },
    semester: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_mata_kuliah: { value: null, matchMode: FilterMatchMode.EQUALS },
    kode_mata_kuliah: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_program_studi: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const first = ref(0);
const selectedDosen = ref([]);
const matchingDosenPengajar = ref([]);
const dosenPengajar = ref([]);
const semesters = ref([]);
const selectedSemester = ref('');
const selectedStatus = ref('');

const getSemester = async () => {
    try {
        const response = await getData('semester/');
        semesters.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data semester:', error);
    }
};

const matchingDosen = async () => {
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
        const response = await getData(`sync-feeder/${id_semester}/matching-dosen-pengajar-kelas-kuliah`);

        const matching = response.data.message;
        matchingDosenPengajar.value = matching;
        Swal.fire('BERHASIL!', 'Data berhasil diMatching.', 'success').then(() => {});
        Swal.close();
        console.log('object :', matching);
    } catch (error) {
        console.error('Gagal mengambil data:', error);
        Swal.fire('Gagal', 'Data tidak ditemukan.', 'warning').then(() => {});
    }
};

const getDosen = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        // const jenis_singkron = selectedStatus.value;

        // console.log('jenis singkron :', jenis_singkron);
        // Menggunakan axios untuk GET request dengan query parameters
        const response = await getData(`dosen-pengajar-kelas-kuliah-sync/belum-singkron-get`);

        const dosen = response.data.data;
        dosenPengajar.value = dosen;

        Swal.close();
        console.log('object :', dosen);
    } catch (error) {
        console.error('Gagal mengambil data dosen:', error);
        Swal.fire('Gagal', 'Data Dosen tidak ditemukan.', 'warning').then(() => {});
    }
};

// const getDosenAll = async () => {
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
//         const response = await getData(`dosen-pengajar-kelas-kuliah-sync/belum-singkron`);

//         const dosen = response.data.data;
//         dosenPengajar.value = dosen;

//         Swal.close();

//         console.log('object :', dosen);
//     } catch (error) {
//         console.error('Gagal mengambil data Dosen:', error);
//         Swal.fire('Gagal', 'Data Dosen tidak ditemukan.', 'warning').then(() => {});
//     }
// };

const syncDosenPengajar = async () => {
    try {
        if (selectedDosen.value.length === 0) {
            Swal.fire('PERINGATAN!', 'Tidak ada data Dosen yang dipilih.', 'warning');
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
        const url = `${API_URL}/sync-feeder/sync-dosen-pengajar-kelas-kuliah`;
        const batchSize = 100; //

        const dosenPengajarSyncs = selectedDosen.value.map((dosenPengajar) => ({
            id: dosenPengajar.id
        }));

        for (let i = 0; i < dosenPengajarSyncs.length; i += batchSize) {
            const batch = dosenPengajarSyncs.slice(i, i + batchSize);

            // Data body dengan struktur yang sesuai
            const data = {
                dosen_pengajar_kelas_kuliah_syncs: batch
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
        Swal.fire('BERHASIL!', 'Sync Dosen Pengajar Berhasil.', 'success').then(() => {
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
    // getDosenAll();
    getSemester();
});
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>Pengambilan Data Dosen Pengajar Kelas Feeder ke Siakad</h5>
        <div class="card" style="padding: 0rem 1rem 0rem 1rem">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-12">
                    <h6 class="text-dark">Keterangan :</h6>
                    <p class="lh-1 text-small">
                        <ol>
                            <li>Fitur ini digunakan untuk melakukan matching data Dosen Pengajar lokal dengan Dosen Pengajar Feeder.</li>
                            <li>Memilih semester pada data yang ingin dicocokkan dengan feeder</li>
                            <li>Memilih jenis singkron Get untuk Menambahkan data Dosen Pengajar Terbaru dari Feeder</li>
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
                    <button @click="matchingDosen" class="btn btn-primary btn-block" style="width: 100%">Matching</button>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-10 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Pilih Jenis Sync</label>
                        <select class="form-select" aria-label="Default select example" disabled>
                            <option value="" selected  hidden>GET</option>
                            <option value="get">GET</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px">
                    <button @click="getDosen" class="btn btn-primary btn-block" style="width: 100%">Tampilkan</button>
                </div>
            </div>
            <hr />

            <DataTable v-model:filters="filters"
            :globalFilterFields="[]"
            :value="dosenPengajar" v-model:selection="selectedDosen" :paginator="true" :rows="20" dataKey="id" :rowHover="true" showGridlines :first="first" @page="onPageChange">
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
                                <button @click="syncDosenPengajar" class="btn btn-secondary"><i class="pi pi-spinner me-2"></i> Sync</button>
                            </div>
                        </div>
                    </div>
                </template>

                <template #empty>
                    <div class="text-center">Tidak ada data.</div>
                </template>
              
                <Column selectionMode="multiple" headerStyle="width: 3em"></Column>

                <Column filterField="nama_dosen" header="Nama Dosen" style="min-width: 14rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>
                                {{ data.DosenPengajarKelasKuliahFeeder[0]?.nama_dosen || '-' }}
                            </span>
                        </div>
                    </template>
                </Column>

                <Column filterField="nidn" header="NIDN" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.DosenPengajarKelasKuliahFeeder[0]?.nidn || '-'}}
                    </template>
                </Column>

                <Column filterField="nama_kelas_kuliah" header="Nama Kelas" style="min-width: 12rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>
                                {{data.DosenPengajarKelasKuliahFeeder[0]?.nama_kelas_kuliah || '-'}}
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
