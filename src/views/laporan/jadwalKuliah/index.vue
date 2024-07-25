<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter();

import { getData, get } from '../../../utiils/request.js'
import Swal from "sweetalert2";

const prodis = ref([]);
const semesters = ref([]);
const kurikulums = ref([]);


const selectedKurikulum = ref('');
const selectedProdi = ref('');
const selectedSemester = ref('Pilih Semester');
const selectedPeriode = ref('');
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

const getKurikulum = async () => {
    try {
        const response = await getData('kurikulum');
        kurikulums.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data :', error);
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
        id_prodi: selectedProdi.value,
        id_kurikulum: selectedKurikulum.value,
        id_semester: selectedPeriode.value,
        semester: selectedSemester.value,
        tanggal_penandatanganan: tanggalPenandatanganan.value,
    };
    
    try {
        Swal.close();
        router.push({
            name: 'cetak-jadwal-kuliah',
            query: requestBody
        });
    } catch (error) {
        console.error('Gagal mengirim data:', error);
    }
};


onMounted(() => {
    fetchProdi();
    getKurikulum();
    fetchSemester();
});

</script>

<template>
    <div class="card">
        <div class="card-body">
            <h5><i class="pi pi-user me-2"></i>LAPORAN JADWAL PERKULIAHAN</h5>
            <hr />
            <hr>
            
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Program Studi</label>
                </div>
                <div class="col-lg-6">
                        <select v-model="selectedProdi" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Program Studi</option>
                            <option v-for="prodi in prodis" :key="prodi.id_prodi" :value="prodi.id_prodi">{{ prodi.nama_program_studi }}</option>
                        </select>
                    </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Kurikulum</label>
                </div>
                <div class="col-lg-6">
                    <select v-model="selectedKurikulum" class="form-select" aria-label="Default select example">
                        <option value="" selected disabled hidden>Pilih Kurikulum</option>
                        <option v-for="kurikulum in kurikulums" :key="kurikulum.id_kurikulum" :value="kurikulum.id_kurikulum">{{ kurikulum.nama_kurikulum }}</option>
                    </select>
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Periode</label>
                </div>
                <div class="col-lg-6">
                    <select v-model="selectedPeriode" class="form-select" aria-label="Default select example">
                        <option value="" selected disabled hidden>Pilih Periode</option>
                        <option v-for="semester in semesters" :key="semester.id_semester" :value="semester.id_semester">{{ semester.nama_semester }}</option>
                    </select>
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Semester</label>
                </div>
                <div class="col-lg-6">
                    <select v-model="selectedSemester" class="form-select" aria-label="Default select example">
                        <option selected disabled hidden>-- Pilih Periode--</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                    </select>
                </div>
            </div>
            
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Tanggal Penandatanganan</label>
                </div>
                <div class="col-lg-6">
                    <input v-model="tanggalPenandatanganan" type="date" class="form-control">
                </div>
            </div>
            <div class="row ">
                <div class="col-lg-12 d-flex justify-content-center">
                    <button @click="filterData" class="btn btn-primary">Tampilkan</button>
                </div>
            </div>
        </div>
    </div>
</template>
<!-- <template>
    <div class="card">
        <div class="card-body">
            <h5>KARTU RENCANA STUDI (KRS)</h5>
            <hr />
            <hr>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Pilih Cetak KRS</label>
                </div>
                <div class="col-lg-6">
                    <select class="form-select" aria-label="Default select example">
                        <option selected disabled hidden>Angkatan</option>
                        <option value="1">2023</option>
                        <option value="2">2022</option>
                        <option value="3">2021</option>
                    </select>
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Pilih Cetak KRS</label>
                </div>
                <div class="col-lg-6">
                    <select class="form-select" aria-label="Default select example">
                        <option selected disabled hidden>Angkatan</option>
                        <option value="1">2023</option>
                        <option value="2">2022</option>
                        <option value="3">2021</option>
                    </select>
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Pilih Cetak KRS</label>
                </div>
                <div class="col-lg-6">
                    <select class="form-select" aria-label="Default select example">
                        <option selected disabled hidden>Angkatan</option>
                        <option value="1">2023</option>
                        <option value="2">2022</option>
                        <option value="3">2021</option>
                    </select>
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Pilih Cetak KRS</label>
                </div>
                <div class="col-lg-6">
                    <select class="form-select" aria-label="Default select example">
                        <option selected disabled hidden>Angkatan</option>
                        <option value="1">2023</option>
                        <option value="2">2022</option>
                        <option value="3">2021</option>
                    </select>
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Aida Andinar</label>
                </div>
                <div class="col-lg-6">
                    <input type="date" class="form-control" placeholder="yytr">
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Aida Andinar</label>
                </div>
                <div class="col-lg-6">
                    <textarea name="" id="" class="form-control" rows="10"></textarea>
                    
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">  
                    <label for="exampleFormControlInput1" class="form-label">Aida Andinar</label>
                </div>
                <div class="col-lg-6">
                <input type="file" class="form-control">
                    
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Share ke public</label>
                </div>
                <div class="col-lg-6">
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheckbox">
                        <label class="form-check-label" for="exampleCheckbox">Tampilkan berita di dashboad mahasiswa</label>
                     </div>
                </div>
            </div>
            <div class="row ">
                <div class="col-lg-12 d-flex justify-content-center">
                    <button class="btn btn-primary">Tampilkan</button>
                </div>
            </div>
        </div>
    </div>
</template> -->