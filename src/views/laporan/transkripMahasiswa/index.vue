<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

import { getData, get } from '../../../utiils/request.js';
import Swal from 'sweetalert2';

const nimMahasiswa = ref('');
const tanggalPenandatanganan = ref('');
const format = ref('HTML');

const filterData = async () => {
    Swal.fire({
        title: 'Loading...',
        html: 'Sedang Memuat Data',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    let requestBody = {
        nim: nimMahasiswa.value,
        tanggal_penandatanganan: tanggalPenandatanganan.value,
        format: format.value
    };

    console.log('req', requestBody);
    try {
        Swal.close();

        const resolved = router.resolve({
            name: 'cetak-transkrip-mahasiswa',
            query: requestBody
        });
        window.open(resolved.href, '_blank');
    } catch (error) {
        console.error('Gagal mengirim data:', error);
    }
};

onMounted(() => {});
</script>

<template>
    <div class="card">
        <div class="card-body">
            <h5><i class="pi pi-user me-2"></i>TRANSKRIP MAHASISWA</h5>
            <hr />
            <hr />
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="nimMahasiswa" class="form-label">NIM Mahasiswa</label>
                </div>
                <div class="col-lg-6">
                    <input v-model="nimMahasiswa" type="text" class="form-control" id="nimMahasiswa" placeholder="Ketikkan NIM Mahasiswa disini" />
                </div>
            </div>

            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="format" class="form-label">Format</label>
                </div>
                <div class="col-lg-6">
                    <select v-model="format" class="form-select" aria-label="Default select example">
                        <option value="HTML">HTML</option>
                        <option value="Excel">Excel</option>
                    </select>
                </div>
            </div>

            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="tanggalPenandatanganan" class="form-label">Tanggal Penandatanganan</label>
                </div>
                <div class="col-lg-6">
                    <input v-model="tanggalPenandatanganan" type="date" class="form-control" id="tanggalPenandatanganan" />
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12 d-flex justify-content-center">
                    <button @click="filterData" class="btn btn-primary">Tampilkan</button>
                </div>
            </div>
        </div>
    </div>
</template>
