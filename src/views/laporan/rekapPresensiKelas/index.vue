<script setup>
import { onMounted } from 'vue';
import { getData } from '../../../utiils/request';
import { ref } from 'vue';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

const router = useRouter();

const prodis = ref([]);
const semesters = ref([]);
const kelasKuliahOptions = ref([]);

const selectedSemester = ref('');
const selectedProdi = ref('');
const selectedKelasKuliah = ref('');
const tanggalPenandatanganan = ref('');
const format = ref('HTML');

const getProdi = async () => {
    try {
        const response = await getData('prodi');
        prodis.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data prodi:', error);
    }
};

const getSemester = async () => {
    try {
        const response = await getData('semester');
        semesters.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data semester:', error);
    }
};

const getKelasKuliahOptions = async () => {
    try {
        const response = await getData('kelas-kuliah');
        kelasKuliahOptions.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data kelas kuliah:', error);
    }
};

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
        id_semester: selectedSemester.value,
        id_prodi: selectedProdi.value,
        nama_kelas_kuliah: selectedKelasKuliah.value,
        tanggal_penandatanganan: tanggalPenandatanganan.value,
        format: format.value
    };

    try {
        Swal.close();
        const resolved = router.resolve({
            name: 'cetak-presensi-kelas',
            query: requestBody
        });
        window.open(resolved.href, '_blank');
    } catch (error) {
        console.error('Gagal mengirim data:', error);
    }
};

onMounted(async () => {
    await Promise.all([getProdi(), getSemester(), getKelasKuliahOptions()]);
});
</script>

<template>
    <div class="card">
        <div class="card-body">
            <h5><i class="pi pi-user me-2"></i>REKAP PRESENSI KELAS</h5>
            <hr />
            <hr />

            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Periode</label>
                </div>
                <div class="col-lg-6">
                    <select v-model="selectedSemester" class="form-select" aria-label="Default select example">
                        <option value="" selected disabled hidden>-- Pilih Periode --</option>
                        <option v-for="semester in semesters" :key="semester.id_semester" :value="semester.id_semester">{{ semester.nama_semester }}</option>
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
                    <label for="exampleFormControlInput1" class="form-label">Kelas / Mata Kuliah</label>
                </div>
                <div class="col-lg-6">
                    <input v-model="selectedKelasKuliah" type="text" class="form-control" id="nama_kelas_kuliah" placeholder="Ketikkan Nama Kelas Kuliah disini" />
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Format</label>
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
                    <label for="exampleFormControlInput1" class="form-label">Tanggal Penandatanganan</label>
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