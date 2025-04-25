<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
import { getData } from '../../../utiils/request.js';
import Swal from 'sweetalert2';

const angkatans = ref([]);
const prodis = ref([]);
const semesters = ref([]);

const selectedAngkatan = ref('');
const selectedSemester = ref('');
const selectedProdi = ref('');
const selectedJenisCetak = ref('');
const nimMahasiswa = ref('');
const tanggalPenandatanganan = ref('');
const format = ref('HTML');

const fetchProdi = async () => {
    try {
        const response = await getData('prodi');
        prodis.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data prodi:', error);
    }
};

const fetchSemester = async () => {
    try {
        const response = await getData('semester');
        semesters.value = response.data.data;
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

const filterData = async () => {
    Swal.fire({
        title: 'Loading...',
        html: 'Sedang Memuat Data',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    const jenis_cetak = selectedJenisCetak.value;
    console.log('ini jenis cetak', jenis_cetak);
    let requestBody = {};

    try {
        if (jenis_cetak === 'Mahasiswa') {
            requestBody = {
                jenis_cetak,
                nim: nimMahasiswa.value,
                id_semester: selectedSemester.value,
                tanggal_penandatanganan: tanggalPenandatanganan.value,
                format: format.value
            };

            Swal.close();
            const resolved = router.resolve({
                name: 'cetak-krs-mahasiswa',
                query: requestBody
            });
            window.open(resolved.href, '_blank');
        } else if (jenis_cetak === 'Angkatan') {
            requestBody = {
                jenis_cetak,
                id_prodi: selectedProdi.value,
                id_angkatan: selectedAngkatan.value,
                id_semester: selectedSemester.value,
                tanggal_penandatanganan: tanggalPenandatanganan.value
            };

            Swal.close();
            const resolved = router.resolve({
                name: 'cetak-krs-mahasiswa-angkatan',
                query: requestBody
            });
            window.open(resolved.href, '_blank');
        } else {
            console.error('Invalid jenis_cetak:', jenis_cetak);
            Swal.close();
        }
    } catch (error) {
        console.error('Gagal mengirim data:', error);
        Swal.close();
    }
};

onMounted(() => {
    fetchProdi();
    fetchAngkatan();
    fetchSemester();
});
</script>


<template>
    <div class="card">
        <div class="card-body">
            <h5><i class="pi pi-user me-2"></i>KARTU RENCANA STUDI (KRS)</h5>
            <hr />
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Pilih Cetak KRS</label>
                </div>
                <div class="col-lg-6">
                    <select class="form-select" v-model="selectedJenisCetak" aria-label="Default select example">
                        <option value="" selected disabled hidden>-- Pilih Cetak --</option>
                        <option value="Mahasiswa">Mahasiswa</option>
                        <option value="Angkatan">Angkatan</option>
                    </select>
                </div>
            </div>

            <div v-if="selectedJenisCetak === 'Mahasiswa'">
                <div class="row d-flex justify-content-center mb-3">
                    <div class="col-lg-4">
                        <label for="nimMahasiswa" class="form-label">NIM Mahasiswa</label>
                    </div>
                    <div class="col-lg-6">
                        <input v-model="nimMahasiswa" type="text" class="form-control" id="nimMahasiswa" placeholder="Ketikkan NIM Mahasiswa disini" />
                    </div>
                </div>
            </div>

            <div v-if="selectedJenisCetak === 'Angkatan'">
                <div class="row d-flex justify-content-center mb-3">
                    <div class="col-lg-4">
                        <label for="selectedProdi" class="form-label">Program Studi</label>
                    </div>
                    <div class="col-lg-6">
                        <select v-model="selectedProdi" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Program Studi</option>
                            <option v-for="prodi in prodis" :key="prodi.id_prodi" :value="prodi.id_prodi">{{ prodi.nama_program_studi }}</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="selectedSemester" class="form-label">Periode</label>
                </div>
                <div class="col-lg-6">
                    <select v-model="selectedSemester" class="form-select" aria-label="Default select example">
                        <option value="" selected disabled hidden>Pilih Periode</option>
                        <option v-for="semester in semesters" :key="semester.id_semester" :value="semester.id_semester">{{ semester.nama_semester }}</option>
                    </select>
                </div>
            </div>

            <div v-if="selectedJenisCetak === 'Mahasiswa'">
                <div class="row d-flex justify-content-center mb-3">
                    <div class="col-lg-4">
                        <label for="format" class="form-label">Format</label>
                    </div>
                    <div class="col-lg-6">
                        <select v-model="format" class="form-select" aria-label="Default select example">
                            <option value="PDF">PDF</option>
                            <!-- <option value="Excel">Excel</option> -->
                        </select>
                    </div>
                </div>
            </div>

            <div v-if="selectedJenisCetak === 'Angkatan'">
                <div class="row d-flex justify-content-center mb-3">
                    <div class="col-lg-4">
                        <label for="selectedAngkatan" class="form-label">Angkatan</label>
                    </div>
                    <div class="col-lg-6">
                        <select v-model="selectedAngkatan" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Angkatan</option>
                            <option v-for="angkatan in angkatans" :key="angkatan.id" :value="angkatan.id">{{ angkatan.tahun }}</option>
                        </select>
                    </div>
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