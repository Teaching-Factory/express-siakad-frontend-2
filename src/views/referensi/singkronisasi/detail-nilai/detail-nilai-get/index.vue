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
    nim: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_mata_kuliah: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_mahasiswa: { value: null, matchMode: FilterMatchMode.EQUALS },
    nilai_angka: { value: null, matchMode: FilterMatchMode.EQUALS },
    nilai_huruf: { value: null, matchMode: FilterMatchMode.EQUALS },
    nilai_indeks: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_program_studi: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const first = ref(0);
const selectedNilai = ref([]);
const matchingNilaiPerkuliahan = ref([]);
const nilaiPerkuliahan = ref([]);
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

const matchingNilai = async () => {
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
        const response = await getData(`sync-feeder/${id_semester}/matching-detail-nilai-perkuliahan-kelas`);

        const matching = response.data.message;
        matchingNilaiPerkuliahan.value = matching;
        Swal.fire('BERHASIL!', 'Data berhasil diMatching.', 'success').then(() => {});
        Swal.close();
        console.log('object :', matching);
    } catch (error) {
        console.error('Gagal mengambil data:', error);
        Swal.fire('Gagal', 'Data tidak ditemukan.', 'warning').then(() => {});
    }
};

const getNilaiPerkuliahan = async () => {
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
        const response = await getData(`detail-nilai-perkuliahan-kelas-sync/belum-singkron-get`);

        const nilai = response.data.data;
        nilaiPerkuliahan.value = nilai;

        Swal.close();
        console.log('object :', nilai);
    } catch (error) {
        console.error('Gagal mengambil data Nilai:', error);
        Swal.fire('Gagal', 'Data Dosen tidak ditemukan.', 'warning').then(() => {});
    }
};

const syncNilaiPerkuliahan = async () => {
    try {
        if (selectedNilai.value.length === 0) {
            Swal.fire('PERINGATAN!', 'Tidak ada data Nilai yang dipilih.', 'warning');
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
        const url = `${API_URL}/sync-feeder/sync-nilai-perkuliahan`;
        const batchSize = 100; //

        const nilaiPerkuliahanSyncs = selectedNilai.value.map((nilaiPerkuliahan) => ({
            id: nilaiPerkuliahan.id
        }));

        for (let i = 0; i < nilaiPerkuliahanSyncs.length; i += batchSize) {
            const batch = nilaiPerkuliahanSyncs.slice(i, i + batchSize);

            // Data body dengan struktur yang sesuai
            const data = {
                nilai_perkuliahans: batch
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
        Swal.fire('BERHASIL!', 'Sync Nilai Perkuliahan Berhasil.', 'success').then(() => {
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
    // getNilaiPerkuliahanAll();
    getSemester();
});
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>Pengambilan Data Nilai Perkuliahan Feeder ke Siakad</h5>
        <div class="card" style="padding: 0rem 1rem 0rem 1rem">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-12">
                    <h6 class="text-dark">Keterangan :</h6>
                    <p class="lh-1 text-small">
                        <ol>
                            <li>Fitur ini digunakan untuk melakukan matching data nilai perkuliahan lokal dengan nilai perkuliahan Feeder.</li>
                            <li>Memilih semester pada data yang ingin dicocokkan dengan feeder</li>
                            <li>Memilih jenis singkron Get untuk Menambahkan data Detail Nilai Terbaru dari Feeder</li>
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
                    <button @click="matchingNilai" class="btn btn-primary btn-block" style="width: 100%">Matching</button>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-10 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Pilih Jenis Sync</label>
                        <select class="form-select" aria-label="Default select example" disabled>
                            <option value="" selected disabled hidden>GET</option>
                            <option value="get">GET</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px">
                    <button @click="getNilaiPerkuliahan" class="btn btn-primary btn-block" style="width: 100%">Tampilkan</button>
                </div>
            </div>
            <hr />

            <DataTable v-model:filters="filters"
            :globalFilterFields="['DetailNilaiPerkuliahanKela.Mahasiswa.nim','DetailNilaiPerkuliahanKela.Mahasiswa.nama_mahasiswa', 'DetailNilaiPerkuliahanKela.KelasKuliah.nama_kelas_kuliah','DetailNilaiPerkuliahanKela.KelasKuliah.MataKuliah.nama_mata_kuliah','DetailNilaiPerkuliahanKela.nilai_angka', 'DetailNilaiPerkuliahanKela.nilai_huruf', 'DetailNilaiPerkuliahanKela.nilai_indeks']"
            :value="nilaiPerkuliahan" v-model:selection="selectedNilai" :paginator="true" :rows="20" dataKey="id" :rowHover="true" showGridlines :first="first" @page="onPageChange">
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
                                <button @click="syncNilaiPerkuliahan" class="btn btn-secondary"><i class="pi pi-spinner me-2"></i> Sync</button>
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
                                {{ data.DetailNilaiPerkuliahanKelaFeeder[0]?.nim || '-'
                                    }}
                            </span>
                        </div>
                    </template>
                </Column>

                <Column filterField="nama_mahasiswa" header="Nama Mahasiswa" style="min-width: 14rem">
                    <template #body="{ data }">
                        {{ data.DetailNilaiPerkuliahanKelaFeeder[0]?.nama_mahasiswa || '-'
                             }}
                    </template>
                </Column>

                <Column filterField="nama_kelas_kuliah" header="Kelas" style="min-width: 8rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>
                                {{ data.DetailNilaiPerkuliahanKelaFeeder[0]?.nama_kelas_kuliah || '-'
                                    }}
                            </span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_mata_kuliah" header="Mata Kuliah" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>
                                {{ data.DetailNilaiPerkuliahanKelaFeeder[0]?.nama_mata_kuliah || '-'
                                    }}
                            </span>
                        </div>
                    </template>
                </Column>
                 <Column filterField="nama_program_studi" header="Program Studi" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ 
                            data.DetailNilaiPerkuliahanKelaFeeder[0]?.nama_program_studi || '-'
                            }}
                    </template>
                </Column>
                <Column filterField="nilai_angka" header="Nilai Angka" style="min-width: 5rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>
                                {{ data.DetailNilaiPerkuliahanKelaFeeder[0]?.nilai_angka || '-'
                                    }}
                            </span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nilai_huruf" header="Nilai Huruf" style="min-width: 5rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>
                                {{ data.DetailNilaiPerkuliahanKelaFeeder[0]?.nilai_huruf || '-'
                                    }}
                            </span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nilai_indeks" header="Nilai Indeks" style="min-width: 5rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>
                                {{ data.DetailNilaiPerkuliahanKelaFeeder[0]?.nilai_indeks || '-'
                                    }}
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
