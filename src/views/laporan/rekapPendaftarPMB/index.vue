<script setup>
import { onMounted, watch } from 'vue';
import { getData } from '../../../utiils/request';
import { ref } from 'vue';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

const router = useRouter();

const prodis = ref([]);
const semesters = ref([]);
const periodePendaftarans = ref([]);

const selectedSemester = ref('');
const selectedProdi = ref('');
const selectedPeriodePendaftaran = ref('');
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

const fetchClasses = async () => {
    console.log('fungsi class terpangil');
    if (selectedSemester.value) {
        console.log('fungsi class terpangil 2');

        try {
            const response = await getData(`periode-pendaftaran/semester/${selectedSemester.value}/get`);
            periodePendaftarans.value = response.data.data; // Isi dropdown dengan data periode
            console.log(periodePendaftarans.value);
            console.log('fungsi class terpangil 3');
        } catch (error) {
            console.error('Gagal mengambil data periode pendaftaran:', error);
        }
    }
};
watch(selectedSemester, fetchClasses);

// Loading data setelah memilih semester
const selectedFilter = async () => {
    Swal.fire({
        title: 'Loading...',
        html: 'Sedang Memuat Data',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
    await Promise.all([getSemester(), fetchClasses()]);
    Swal.close();
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
        id_periode_pendaftaran: selectedPeriodePendaftaran.value,
        id_prodi_diterima: selectedProdi.value,
        tanggal_penandatanganan: tanggalPenandatanganan.value,
        format: format.value
    };

    try {
        Swal.close();
        router.push({
            name: 'cetak-rekap-pendaftar-pmb',
            query: requestBody
        });
    } catch (error) {
        console.error('Gagal mengirim data:', error);
    }
};

onMounted(async () => {
    await Promise.all([getProdi()]);
    selectedFilter();
});
</script>

<template>
    <div class="card">
        <div class="card-body">
            <h5><i class="pi pi-user me-2"></i>REKAPITULASI PENDAFTAR PMB</h5>
            <hr />
            <hr />

            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Semester Pendaftaran</label>
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
                    <label for="exampleFormControlInput1" class="form-label">Periode Pendaftaran</label>
                </div>
                <div class="col-lg-6">
                    <select v-model="selectedPeriodePendaftaran" class="form-select" aria-label="Default select example">
                        <option value="" selected disabled hidden>-- Pilih Periode Pendaftaran --</option>
                        <option v-for="periodePendaftaran in periodePendaftarans" :key="periodePendaftaran.id" :value="periodePendaftaran.id">{{ periodePendaftaran.nama_periode_pendaftaran }}</option>
                    </select>
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Program Studi Diterima</label>
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
                    <label for="exampleFormControlInput1" class="form-label">Tanggal Penandatanganan</label>
                </div>
                <div class="col-lg-6">
                    <input v-model="tanggalPenandatanganan" type="date" class="form-control" id="tanggalPenandatanganan" />
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
            <div class="row">
                <div class="col-lg-12 d-flex justify-content-center">
                    <button @click="filterData" class="btn btn-primary">Tampilkan</button>
                </div>
            </div>
        </div>
    </div>
</template>