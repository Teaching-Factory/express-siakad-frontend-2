<script setup>
import { ref, onBeforeMount, watch } from 'vue';
import { get } from '../../../utiils/request';
import { FilterMatchMode } from 'primevue/api';
import Swal from 'sweetalert2';
import { getToken } from '../../../service/auth';
import axios from 'axios';
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
const mahasiswas = ref([]);
const angkatans = ref([]);
const prodis = ref([]);
const selectedProdi = ref('');
const selectedAngkatan = ref('');
// const loading1 = ref(true);
const periodePendaftarans = ref([]);
const exportCamaba = ref([]);
const semesters = ref([]);
const selectedPeriodePendaftaran = ref('');
const selectedSemester = ref('');

const getSemester = async () => {
    try {
        const response = await get('semester');
        semesters.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data semester:', error);
    }
};

// Ambil data periode pendaftaran berdasarkan semester yang dipilih
const fetchClasses = async () => {
    console.log('fungsi class terpangil');
    if (selectedSemester.value) {
        console.log('fungsi class terpangil 2');

        try {
            const response = await get(`periode-pendaftaran/semester/${selectedSemester.value}/get`);
            periodePendaftarans.value = response.data.data; // Isi dropdown dengan data periode
            console.log(periodePendaftarans.value);
            console.log('fungsi class terpangil 3');
        } catch (error) {
            console.error('Gagal mengambil data periode pendaftaran:', error);
        }
    }
};
watch(selectedSemester, fetchClasses);

const selectedFilter = async () => {
    // loading1.value = true;
    await Promise.all([getSemester()]);
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

const exportData = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const id_periode_pendaftaran = selectedPeriodePendaftaran.value;

        const token = getToken();
        // Perform GET request with response type set to blob
        const response = await axios.get(`${API_URL}/camaba/export-camaba-to-mahasiswa/${id_periode_pendaftaran}/get`, {
            responseType: 'blob', // Ensures the response is in binary form
            headers: {
                Authorization: token // Replace with the actual token if needed
            }
        });

        // Create a URL for the blob
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;

        // Set the file name (optional, you can customize this)
        link.setAttribute('download', `Data Camaba.xlsx`);

        // Append the link to the body and trigger the download
        document.body.appendChild(link);
        link.click();

        // Clean up the URL and remove the link element
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);

        Swal.close();
    } catch (error) {
        console.error('Gagal mengambil data Camaba:', error);
        Swal.fire('Gagal', 'Data Camaba tidak ditemukan.', 'warning');
    }
};

const onPageChange = (event) => {
    first.value = event.first;
};

onBeforeMount(() => {
    selectedFilter();
});
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>EXPORT KE DATA MAHASISWA</h5>
        <div class="card" style="padding: 0rem 1rem 0rem 1rem">
                <div class="row">
                    <div class="col-12 col-md-6 col-lg-12">
                        <h6 class="text-dark">Keterangan :</h6>
                        <p>Untuk bisa melakukan penerimaan data pendaftar menjadi data mahasiswa, data pendaftar harus memiliki kelengkapan :</p>
                        <p class="lh-1 text-small">
                            <ul>
                                <li>NIM calon mahasiswa baru harus diisi sebelumnya pada menu Set NIM Calon Mahasiswa Baru</li>
                                <li>Nama, NIK, Tempat Lahir, Tanggal Lahir, Jenis Kelamin, Agama, Kewarganegaraan, Kelurahan, Kecamatan, dan Nama Ibu Kandung calon mahasiswa baru tidak boleh kosong</li>
                                <li>Prodi yang Diterima pada masing-masing calon mahasiswa baru harus diisi sebelumnya pada menu Daftar Calon Mahasiswa Baru</li>
                                
                            </ul>
                        </p>
                    </div>
                </div>
            </div>
        <div class="card">
            <div class="row">
                <div class="col-lg-5 col-md-6 col-sm-6">
                    <div class="">
                        <label for="exampleFormControlInput1" class="form-label">Semester Pendaftaran</label>
                        <select v-model="selectedSemester" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Semester</option>
                            <option v-for="semester in semesters" :key="semester.id_semester" :value="semester.id_semester">{{ semester.nama_semester }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-5 col-md-6 col-sm-6">
                    <div class="">
                        <label for="exampleFormControlInput1" class="form-label">Periode Pendaftaran</label>
                        <select v-model="selectedPeriodePendaftaran" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Periode</option>
                            <option v-for="periodePendaftaran in periodePendaftarans" :key="periodePendaftaran.id" :value="periodePendaftaran.id">{{ periodePendaftaran.nama_periode_pendaftaran }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px">
                    <button  class="btn btn-primary btn-block" style="width: 100%">Tampilkan</button>
                </div>
            </div>
        </div>

        <DataTable
            v-model:filters="filters"
            :globalFilterFields="['nama_mahasiswa', 'nim', 'nama_status_mahasiswa', 'Prodi.nama_program_studi', 'nama_periode_masuk']"
            :value="mahasiswas"
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
                                <button class="btn btn-secondary" @click="exportData"> <i class="pi pi-check me-2"></i> Export Data</button>
                            </div>
                        </div>
                    </div>
            </template>

            <template #empty>
                <div class="text-center">Tidak ada data.</div>
            </template>
            
            <!-- <template #loading>Loading data. Please wait.</template> -->
            <Column selectionMode="multiple" headerStyle="width: 3em"></Column>
            <Column filterField="nim" header="Nomor Pendaftaran" style="min-width: 12rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span>{{ data.nim }}</span>
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
            <Column filterField="nama_mahasiswa" header="Nama" style="min-width: 14rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span>{{ data.nama_mahasiswa }}</span>
                    </div>
                </template>
            </Column>
            <Column filterField="nama_mahasiswa" header="Tempat Lahir" style="min-width: 14rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span>{{ data.nama_mahasiswa }}</span>
                    </div>
                </template>
            </Column>
            
            <Column filterField="nama_periode_masuk" header="Tanggal Lahir" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.nama_periode_masuk }}
                </template>
            </Column>
            <Column filterField="nama_periode_masuk" header="Jenis Kelamin" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.nama_periode_masuk }}
                </template>
            </Column>
            <Column filterField="nama_periode_masuk" header="Agama" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.nama_periode_masuk }}
                </template>
            </Column>
            <Column filterField="nama_periode_masuk" header="Nama Ibu Kandung" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.nama_periode_masuk }}
                </template>
            </Column>
            <Column filterField="nama_periode_masuk" header="Prodi Diterima" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ data.nama_periode_masuk }}
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

