<script setup>
import { ref, onBeforeMount } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { getData } from '../../../utiils/request';
import Swal from 'sweetalert2';
import axios from 'axios';
import { getToken } from '../../../service/auth';
import { useRoute } from 'vue-router';
import { API_URL } from '../../../config/config';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nama_mahasiswa: { value: null, matchMode: FilterMatchMode.EQUALS },
    nim: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_status_mahasiswa: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_program_studi: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_periode_masuk: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const first = ref(0);
const route = useRoute();
const mahasiswas = ref([]);
const detailKelas = ref([]);
const angkatans = ref([]);
const prodis = ref([]);
const selectedProdi = ref('');
const selectedAngkatan = ref('');
const selectedMahasiswa = ref([]);
// const loading1 = ref(true);

const fetchProdi = async () => {
    try {
        const response = await getData('prodi');
        prodis.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data prodi:', error);
    }
};
const fetchAngkatan = async () => {
    try {
        const response = await getData('angkatan/');
        angkatans.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data angkatan mahasiswa:', error);
    }
};

const selectedFilter = async () => {
    // loading1.value = true;
    await Promise.all([fetchProdi(), fetchAngkatan()]);
    // loading1.value = false;
};

const filterData = async () => {
    const prodiId = selectedProdi.value;
    const angkatanId = selectedAngkatan.value;
    const id_kelas_kuliah = route.params.id_kelas_kuliah;

    if (!prodiId || !angkatanId) {
        // console.error('Prodi atau Angkatan Mahasiswa belum dipilih');
        Swal.fire('Gagal', 'Data Mahasiswa tidak ditemukan.', 'warning').then(() => {});
        return;
    }

    console.log('Prodi:', prodiId);
    console.log('Angkatan:', angkatanId);

    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await getData(`peserta-kelas-kuliah/${prodiId}/${angkatanId}/${id_kelas_kuliah}/get-mahasiswa-belum-terdaftar`);
        const filterMahasiswa = response.data.data;

        mahasiswas.value = filterMahasiswa;

        Swal.close();
    } catch (error) {
        console.error('Gagal mengambil data mahasiswa:', error);
        Swal.fire('Gagal', 'Data Mahasiswa tidak ditemukan.', 'warning').then(() => {});
    }
};
const getDetailKelas = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const id_detail_kelas_kuliah = route.params.id_detail_kelas_kuliah;
        const response = await getData(`detail-kelas-kuliah/${id_detail_kelas_kuliah}/get`);
        const data = response.data.data;

        detailKelas.value = data;
        console.log('detail : ', data);
        Swal.close();
    } catch (error) {
        console.error('Gagal mengambil data mahasiswa:', error);
        Swal.fire('Gagal', 'Data Mahasiswa tidak ditemukan.', 'warning').then(() => {});
    }
};

const createPesertaKelas = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        if (selectedMahasiswa.value.length === 0) {
            Swal.fire('PERINGATAN!', 'Tidak ada data mahasiswa yang dipilih.', 'warning');
            return; // Hentikan eksekusi fungsi jika tidak ada data yang dipilih
        }
        const id_kelas_kuliah = route.params.id_kelas_kuliah;
        const id_angkatan = selectedAngkatan.value;

        const token = getToken();
        const url = `${API_URL}/peserta-kelas-kuliah/${id_kelas_kuliah}/${id_angkatan}/create`;
        const batchSize = 100; //

        const mahasiswas = selectedMahasiswa.value.map((mahasiswa) => ({
            id_registrasi_mahasiswa: mahasiswa.id_registrasi_mahasiswa
        }));

        for (let i = 0; i < mahasiswas.length; i += batchSize) {
            const batch = mahasiswas.slice(i, i + batchSize);
            const data = { mahasiswas: batch };

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
        Swal.fire('BERHASIL!', 'Tambah Peserta Kelas Berhasil.', 'success').then(() => {
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
    getDetailKelas();
    selectedFilter();
});
</script>

<template>
    <div class="card" style="border-radius: none !important">
        <h5><i class="pi pi-user me-2"></i>SET KOLEKTIF MAHASISWA PESERTA KELAS</h5>
        <div class="card">
            <div class="row">
                <div class="col-lg-2">Program Studi</div>
                <div class="col-lg-4"><span class="me-2">:</span> {{ detailKelas?.KelasKuliah?.Prodi?.nama_program_studi || '-' }}</div>
                <div class="col-lg-2">Periode</div>
                <div class="col-lg-4"><span class="me-2">:</span> {{ detailKelas?.KelasKuliah?.Semester?.nama_semester }}</div>
            </div>
            <hr />
            <div class="row">
                <div class="col-lg-2">Mata Kuliah</div>
                <div class="col-lg-4"><span class="me-2">:</span> {{ detailKelas?.KelasKuliah?.MataKuliah?.nama_mata_kuliah }}</div>
                <div class="col-lg-2">Nama Kelas</div>
                <div class="col-lg-4"><span class="me-2"> :</span> {{ detailKelas?.KelasKuliah?.nama_kelas_kuliah || '-' }}</div>
            </div>
            <hr />
            <div class="row">
                <div class="col-lg-2">Dosen Pengajar</div>
                <div class="col-lg-4"><span class="me-2">:</span> {{ detailKelas?.KelasKuliah?.Dosen?.nama_dosen || '-' }}</div>
                <div class="col-lg-2">Ruang dan Waktu Perkuliahan</div>
                <div class="col-lg-4"><span class="me-2"> :</span> {{ detailKelas?.RuangPerkuliahan?.nama_ruang_perkuliahan || '-' }} || {{ detailKelas?.jam_mulai || '-' }} - {{ detailKelas?.jam_selesai || '-' }}</div>
            </div>
            <hr />
            <div class="row">
                <div class="col-lg-2">Lokasi</div>
                <div class="col-lg-4"><span class="me-2">:</span> {{ detailKelas?.RuangPerkuliahan?.lokasi || '-' }}</div>
                <div class="col-lg-2">Kapasitas Peserta Kelas</div>
                <div class="col-lg-4"><span class="me-2"> :</span> {{ detailKelas?.kapasitas || '-' }}</div>
            </div>

            <div class="card mt-4">
                <div class="row">
                    <div class="col-lg-5 col-md-6 col-sm-6">
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Pilih Program Studi</label>
                            <select v-model="selectedProdi" class="form-select" aria-label="Default select example">
                                <option value="" selected disabled hidden>Pilih Program Studi</option>
                                <option v-for="prodi in prodis" :key="prodi.id_prodi" :value="prodi.id_prodi">{{ prodi.nama_program_studi }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-lg-5 col-md-6 col-sm-6">
                        <div class="">
                            <label for="exampleFormControlInput1" class="form-label">Pilih Angkatan</label>
                            <select v-model="selectedAngkatan" class="form-select" aria-label="Default select example">
                                <option value="" selected disabled hidden>Pilih Angkatan</option>
                                <option v-for="angkatan in angkatans" :key="angkatan.id" :value="angkatan.id">{{ angkatan.tahun }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px">
                        <button @click="filterData" class="btn btn-primary btn-block" style="width: 100%">Tampilkan</button>
                    </div>
                </div>
            </div>

            <DataTable
                v-model:filters="filters"
                :globalFilterFields="['nama_mahasiswa', 'nim', 'nama_status_mahasiswa', 'Prodi.nama_program_studi', 'nama_periode_masuk']"
                :value="mahasiswas"
                v-model:selection="selectedMahasiswa"
                :paginator="true"
                :rows="10"
                dataKey="id_registrasi_mahasiswa"
                :rowHover="true"
                showGridlines
                :first="first"
                @page="onPageChange"
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
                                <button @click="createPesertaKelas" class="btn btn-success"><i class="pi pi-check me-2"></i> Simpan</button>
                            </div>
                        </div>
                    </div>
                </template>

                <template #empty>
                    <div class="text-center">Tidak ada data.</div>
                </template>
                <template #loading> Loading customers data. Please wait. </template>
                <Column selectionMode="multiple" headerStyle="width: 3em"></Column>
                <Column filterField="nama_mahasiswa" header="Nama Mahasiswa" style="min-width: 14rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nama_mahasiswa }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nim" header="NIM" style="min-width: 12rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nim }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_program_studi" header="Program Studi" style="min-width: 15rem">
                    <template #body="{ data }">
                        {{ data.Prodi?.nama_program_studi || '-' }}
                    </template>
                </Column>
                <Column filterField="nama_status_mahasiswa" header="Status" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.nama_status_mahasiswa }}
                    </template>
                </Column>
                <Column filterField="nama_periode_masuk" header="Angkatan" style="min-width: 12rem">
                    <template #body="{ data }">
                        {{ data.nama_periode_masuk }}
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
