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
    nomor_urut: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_evaluasi: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_jenis_evaluasi: { value: null, matchMode: FilterMatchMode.EQUALS },
    deskripsi_indonesia: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const first = ref(0);
const selectedRencanaEvaluasi = ref([]);
const matchingRencanaEvaluasi = ref([]);
const rencanaEvaluasi = ref([]);
const prodis = ref([]);
const selectedProdi = ref('');
const selectedStatus = ref('');

const getProdi = async () => {
    try {
        const response = await getData('prodi/');
        prodis.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};

const matchingRencana = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const id_prodi = selectedProdi.value;

        console.log('semester', id_prodi);
        // Menggunakan axios untuk GET request dengan query parameters
        const response = await getData(`sync-feeder/${id_prodi}/matching-rencana-evaluasi`);

        const matching = response.data.message;
        matchingRencanaEvaluasi.value = matching;
        Swal.fire('BERHASIL!', 'Data berhasil diMatching.', 'success').then(() => {});
        Swal.close();
        console.log('object :', matching);
    } catch (error) {
        console.error('Gagal mengambil data:', error);
        Swal.fire('Gagal', 'Data tidak ditemukan.', 'warning').then(() => {});
    }
};

const getRencanaEvaluasi = async () => {
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
        const response = await getData(`rencana-evaluasi-sync/belum-singkron/by-filter?jenis_singkron=${jenis_singkron}`);

        const rencanaEvaluasis = response.data.data;
        rencanaEvaluasi.value = rencanaEvaluasis;

        Swal.close();
        console.log('object :', rencanaEvaluasis);
    } catch (error) {
        console.error('Gagal mengambil data Rencana Evaluasi:', error);
        Swal.fire('Gagal', 'Data tidak ditemukan.', 'warning').then(() => {});
    }
};

const syncRencanaEvaluasi = async () => {
    try {
        if (selectedRencanaEvaluasi.value.length === 0) {
            Swal.fire('PERINGATAN!', 'Tidak ada data Rencana yang dipilih.', 'warning');
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
        const url = `${API_URL}/sync-feeder/sync-rencana-evaluasi`;
        const batchSize = 100; //

        const rencanaEvaluasiSyncs = selectedRencanaEvaluasi.value.map((rencanaEvaluasi) => ({
            id: rencanaEvaluasi.id
        }));

        for (let i = 0; i < rencanaEvaluasiSyncs.length; i += batchSize) {
            const batch = rencanaEvaluasiSyncs.slice(i, i + batchSize);

            // Data body dengan struktur yang sesuai
            const data = {
                rencana_evaluasi_syncs: batch
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
        Swal.fire('BERHASIL!', 'Sync Rencana Evaluasi Berhasil.', 'success').then(() => {
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
    // getRencanaEvaluasiAll();
    getProdi();
});
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>Penghapusan Data Rencana Evaluasi Feeder ke Siakad</h5>
        <div class="card" style="padding: 0rem 1rem 0rem 1rem">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-12">
                    <h6 class="text-dark">Keterangan :</h6>
                    <p class="lh-1 text-small">
                        <ol>
                            <li>Fitur ini digunakan untuk melakukan matching data Rencana Evaluasi lokal dengan Rencana Evaluasi Feeder.</li>
                            <li>Memilih Prodi pada data yang ingin dicocokkan dengan feeder</li>
                            <li>Memilih jenis singkron delete untuk Menghapus data Rencana Evaluasi </li>
                        </ol>
                    </p>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="row">
                <div class="col-lg-10 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Pilih Program Studi</label>
                        <select v-model="selectedProdi" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Program Studi</option>
                            <option v-for="prodi in prodis" :key="prodi.id_prodi" :value="prodi.id_prodi">{{ prodi.nama_program_studi }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px">
                    <button @click="matchingRencana" class="btn btn-primary btn-block" style="width: 100%">Matching</button>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-10 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Pilih Jenis Sync</label>
                        <select v-model="selectedStatus" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>All</option>
                            <option value="delete">Delete</option>
                            <!-- <option value="delete">Delete</option> -->
                        </select>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px">
                    <button @click="getRencanaEvaluasi" class="btn btn-primary btn-block" style="width: 100%">Tampilkan</button>
                </div>
            </div>
            <hr />

            <DataTable v-model:filters="filters"
            :globalFilterFields="['RencanaEvaluasi.MataKuliah.nama_mata_kuliah','RencanaEvaluasi.nomor_urut', 'RencanaEvaluasi.nama_evaluasi', 'RencanaEvaluasi.deskripsi_indonesia', 'RencanaEvaluasi.JenisEvaluasi.nama_jenis_evaluasi']"
            :value="rencanaEvaluasi" v-model:selection="selectedRencanaEvaluasi" :paginator="true" :rows="20" dataKey="id" :rowHover="true" showGridlines :first="first" @page="onPageChange">
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
                                <button @click="syncRencanaEvaluasi" class="btn btn-secondary"><i class="pi pi-spinner me-2"></i> Sync</button>
                            </div>
                        </div>
                    </div>
                </template>

                <template #empty>
                    <div class="text-center">Tidak ada data.</div>
                </template>
              
                <Column selectionMode="multiple" headerStyle="width: 3em"></Column>

                <Column filterField="nama_mata_kuliah" header="Mata Kuliah" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>
                                {{ data.RencanaEvaluasi.MataKuliah.nama_mata_kuliah}}
                            </span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nomor_urut" header="No Urut" style="min-width: 5rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>
                                {{ data.RencanaEvaluasi.nomor_urut}}
                            </span>
                        </div>
                    </template>
                </Column>

                <Column filterField="nama_evaluasi" header="Nama Evaluasi" style="min-width: 10rem">
                    <template #body="{ data }">
                          <span>
                                {{ data?.RencanaEvaluasi?.nama_evaluasi || '-'}}
                            </span>
                    </template>
                </Column>

                <Column filterField="deskripsi_indonesia" header="Deskripsi Indonesia" style="min-width: 12rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>
                                {{ data?.RencanaEvaluasi?.deskripsi_indonesia || '-'}}
                            </span>
                        </div>
                    </template>
                </Column>

                <Column filterField="bobot_evaluasi" header="Bobot" style="min-width: 5rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>
                                {{ parseFloat(data?.RencanaEvaluasi?.bobot_evaluasi).toFixed(0) || '-'}}
                            </span>
                        </div>
                    </template>
                </Column>
                <Column filterField="jenis_evaluasi" header="Jenis Evaluasi" style="min-width: 12rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>
                                {{ data?.RencanaEvaluasi?.JenisEvaluasi?.nama_jenis_evaluasi || '-'}}
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
