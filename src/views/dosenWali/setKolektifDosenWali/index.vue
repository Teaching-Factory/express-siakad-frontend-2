<script setup>
import { ref, onBeforeMount, onMounted } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { get } from '../../../utiils/request';
import { useRoute } from 'vue-router';
import Swal from 'sweetalert2';
import { API_URL } from '../../../config/config';
import axios from 'axios';
import { getToken } from '../../../service/auth';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nim: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_mahasiswa: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_program_studi: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_status_mahasiswa: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_periode_masuk: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const route = useRoute();
const mahasiswas = ref([]);
const angkatans = ref([]);
const prodis = ref([]);
const selectedProdi = ref('');
const selectedAngkatan = ref('');
const selectedMhs = ref([]);
const dataDosen = ref([]);

const fetchDataDosen = async (id_dosen) => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await get(`dosen-wali/${id_dosen}/get-mahasiswa`);
        dataDosen.value = response.data.data;
        Swal.close();
    } catch (error) {
        console.error('Gagal mengambil data:', error);
    }
};

const fetchProdi = async () => {
    try {
        const response = await get('prodi');
        prodis.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data prodi:', error);
    }
};
const fetchAngkatan = async () => {
    try {
        const response = await get('angkatan');
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
        const response = await get(`mahasiswa/${prodiId}/${angkatanId}/get`);
        const filterMahasiswa = response.data.data;

        mahasiswas.value = filterMahasiswa;

        Swal.close();
    } catch (error) {
        console.error('Gagal mengambil data mahasiswa:', error);
        Swal.fire('Gagal', 'Data Mahasiswa tidak ditemukan.', 'warning').then(() => {});
    }
};

const createMahasiswaWali = async (id_dosen) => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        if (selectedMhs.value.length === 0) {
            Swal.fire('PERINGATAN!', 'Tidak ada data mahasiswa yang dipilih.', 'warning');
            return; // Hentikan eksekusi fungsi jika tidak ada data yang dipilih
        }

        const token = getToken();
        const url = `${API_URL}/dosen-wali/${id_dosen}/tambah-mahasiswa-wali-kolektif`;
        const batchSize = 100; //

        const mahasiswas = selectedMhs.value.map((mahasiswa) => ({
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
        Swal.fire('BERHASIL!', 'Generate User Mahasiswa Berhasil.', 'success').then(() => {
            window.location.href = '/manajemen-mahasiswa-wali';
        });
    } catch (error) {
        console.error('Gagal memperbarui status:', error);
    }
};

onMounted(() => {
    const id_dosen = route.params.id_dosen;
    fetchDataDosen(id_dosen);
    selectedFilter();
});
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>SET KOLEKTIF DOSEN WALI</h5>
        <div class="card">
            <div class="row mb-3">
                <div class="col-lg-12 col-md-6 col-lg-6">
                    <div class="alert alert-secondary text-center" role="alert">
                        <h5 class="text-dark text-center">{{ dataDosen[0]?.Dosen?.nidn }} - {{ dataDosen[0]?.Dosen?.nama_dosen }} || Tahun Ajaran : {{ dataDosen[0]?.TahunAjaran?.nama_tahun_ajaran }}</h5>
                    </div>
                </div>
            </div>
            <div class="row">
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
                        <label for="exampleFormControlInput1" class="form-label">Angkatan</label>
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

            <DataTable
                v-model:filters="filters"
                :globalFilterFields="['nim', 'nama_mahasiswa', 'Prodi.nama_program_studi', 'nama_status_mahasiswa', 'nama_periode_masuk']"
                v-model:selection="selectedMhs"
                :value="mahasiswas"
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
                                <button @click="createMahasiswaWali(dataDosen[0].id_dosen)" class="btn btn-secondary"><i class="pi pi-check me-2"></i> Simpan</button>
                            </div>
                        </div>
                    </div>
                </template>

                <template #empty>
                    <div class="text-center">Tidak ada data.</div>
                </template>
                <Column selectionMode="multiple" headerStyle="width: 3em"></Column>
                <Column header="NIM" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nim }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_mahasiswa" header="Nama" style="min-width: 15rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nama_mahasiswa }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_program_studi" header="Program Studi" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.Prodi.nama_program_studi }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_status_mahasiswa" header="Status" style="min-width: 5rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nama_status_mahasiswa }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_periode_masuk" header="Angkatan" style="min-width: 5rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nama_periode_masuk }}</span>
                        </div>
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
