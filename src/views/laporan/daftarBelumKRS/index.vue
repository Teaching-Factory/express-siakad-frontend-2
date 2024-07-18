<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
import { getData } from '../../../utiils/request.js'
import Swal from "sweetalert2";

const prodis = ref([]);
const angkatans = ref([]);

const selectedAngkatan = ref('');
const selectedProdi = ref('');
const format = ref('HTML');
const tanggalPenandatanganan = ref('');

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
        const response = await getData('angkatan');
        angkatans.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data angkatan mahasiswa:', error);
    }
};

const filter = () => {
    Swal.fire({
        title: 'Loading...',
        html: 'Sedang Memuat Data',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
    
    const requestBody = {
        id_angkatan: selectedAngkatan.value,
        id_prodi: selectedProdi.value,
        tanggal_penandatanganan: tanggalPenandatanganan.value,
        format: format.value,
    };

    console.log('req', requestBody);

    try {
        Swal.close();
        router.push({
            name: 'cetak-daftar-belum-krs',
            query: requestBody
        });
    } catch (error) {
        console.error('Gagal mengirim data:', error);
    }
}

onMounted(() => {
    fetchProdi();
    fetchAngkatan();
});

</script>

<template>
    <div class="card">
        <div class="card-body">
            <h5><i class="pi pi-user me-2"></i>EXPORT DATA MAHASISWA BELUM KRS</h5>
            <hr />
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Angkatan</label>
                </div>
                <div class="col-lg-6">
                    <select class="form-select" aria-label="Default select example" v-model="selectedAngkatan">
                        <option value="" selected disabled hidden>-- Pilih Angkatan  --</option>
                        <option v-for="angkatan in angkatans" :key="angkatan.id" :value="angkatan.id">{{ angkatan.tahun }}</option>
                    </select>
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Program Studi</label>
                </div>
                <div class="col-lg-6">
                    <select v-model="selectedProdi" class="form-select" aria-label="Default select example">
                        <option value="" selected disabled hidden>-- Pilih Program Studi --</option>
                        <option v-for="prodi in prodis" :key="prodi.id_prodi" :value="prodi.id_prodi">{{ prodi.nama_program_studi }}</option>
                    </select>
                </div>
            </div>
            
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Format</label>
                </div>
                <div class="col-lg-6">
                    <select class="form-select" v-model="format" aria-label="Default select example">
                        <option selected disabled hidden>-- Pilih Format--</option>
                        <option value="HTML">PDF</option>
                        <!-- <option value="EXCEL">EXCEL</option> -->
                    </select>
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label  for="exampleFormControlInput1" class="form-label">Tanggal Penandatanganan</label>
                </div>
                <div class="col-lg-6">
                    <input v-model="tanggalPenandatanganan" type="date" class="form-control">
                </div>
            </div>
            <div class="row ">
                <div class="col-lg-12 d-flex justify-content-center">
                    <button @click="filter" class="btn btn-primary">Tampilkan</button>
                </div>
            </div>
        </div>
    </div>
</template>