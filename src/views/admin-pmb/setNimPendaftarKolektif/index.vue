<script setup>
import { ref, onBeforeMount, watch } from 'vue';
import { get, getData, postData } from '../../../utiils/request';
import { FilterMatchMode } from 'primevue/api';
import Swal from 'sweetalert2';
import axios from 'axios';
import { API_URL } from '../../../config/config';
import { getToken } from '../../../service/auth';
import { useRouter } from 'vue-router';

const periodePendaftarans = ref([]);
const exportCamaba = ref([]);
const semesters = ref([]);
const selectedPeriodePendaftaran = ref('');
const selectedSemester = ref('');
// const loading1 = ref(true);

// State untuk menyimpan file yang diupload
const file = ref(null);

// Mendapatkan router untuk melakukan redirect
const router = useRouter();

// Ambil data semester
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
        const response = await axios.get(`${API_URL}/camaba/export/${id_periode_pendaftaran}/get`, {
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
        link.setAttribute('download', `Daftar Camaba Camaba.xlsx`);

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

// Fungsi untuk menangani upload file
const handleFileUpload = (event) => {
    file.value = event.target.files[0];
};

// Fungsi untuk menangani proses create dan upload data
const create = async () => {
    if (!file.value) {
        Swal.fire('GAGAL', 'Silakan pilih file untuk diupload.', 'error');
        return;
    }

    const formData = new FormData();
    formData.append('file', file.value);

    const id_periode_pendaftaran = selectedPeriodePendaftaran.value;
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const response = await postData(`camaba/${id_periode_pendaftaran}/import`, formData);
        console.log(response);
        Swal.close();
        Swal.fire('BERHASIL!', 'Data berhasil ditambahkan.', 'success').then(() => {
            router.push('/set-nim-pendaftar-kolektif').catch((err) => {
                console.error('Redirect error:', err);
            });
        });
    } catch (error) {
        Swal.fire('GAGAL', 'Gagal menambahkan data. Silakan coba lagi.', 'error');
    }
};

onBeforeMount(() => {
    selectedFilter();
});
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>SET NIM PENDAFTAR KOLEKTIF</h5>
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
                    <button @click="exportData" class="btn btn-primary btn-block" style="width: 100%">Export Camaba</button>
                </div>
            </div>
        </div>
        <div class="card">
            <form @submit.prevent="create">
                <div class="row">
                    <div class="col-3 col-md-6 col-lg-6">
                        <span>Import Data</span>
                    </div>
                    <div class="col-6 col-md-6 col-lg-6">
                        <div class="input-group mb-3">
                            <input type="file" class="form-control" id="inputGroupFile02" @change="handleFileUpload" />
                        </div>
                    </div>
                    <div class="col-3 col-md-6 col-lg-12">
                        <button type="submit" class="btn btn-primary">Upload</button>
                    </div>
                </div>
            </form>
            <div class="row">
                <div class="col-12 col-md-6 col-lg-12">
                    <h6 class="text-dark">Langkah-Langkah :</h6>
                    <ol class="lh-2 text-small">
                        <li>Pilih Semester dan Periode Pendaftaran</li>
                        <li>Lakukan export data untuk mendownload file excel yang berisikan data camaba</li>
                        <li>Isikan nim camaba secara manual pada file excel</li>
                        <li>Import data camaba dengan melakukan pilih semester dan periode pendaftaran dahulu</li>
                        <li>Bila terjadi kesalahan import data, silahkan download error hasil import</li>
                        <li>Lakukan perbaikan lalu import lagi data tersebut</li>
                    </ol>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-md-6 col-lg-12">
                    <h6 class="text-dark">Catatan :</h6>
                    <ol class="lh-2 text-small">
                        <li>Bila ada kesalahan pada NIM, silahkan merubah pada aplikasi Feeder atau Pengajuan Pada Forlap</li>
                        <li>Maksimum pengiriman data ialah 50 data</li>
                        <li>File yang boleh diupload hanya file dengan ekstensi .xls</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card-theme {
    background-color: rgba(154, 160, 172, 0.5);
}
</style>

