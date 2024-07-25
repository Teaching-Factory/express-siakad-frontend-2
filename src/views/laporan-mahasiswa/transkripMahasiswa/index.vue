<script setup >
import axios from 'axios';
import { FilterMatchMode } from 'primevue/api';
import Swal from 'sweetalert2';
import { onBeforeMount, ref } from 'vue';
import { API_URL } from '../../../config/config';
import { del, get } from '../../../utiils/request';
import { getToken } from '../../../utiils/local_storage';

const selectedKHS = ref([]);
const dataMahasiswa = ref([])
const dataDosenWali =  ref([])
const dataTranskrip =  ref([])
const rekapNilaiTranskrip =  ref([])


const getMahasiswa = async () => {
   
    const response = await get('mahasiswa/get-mahasiswa-active');
    const krs = response.data.data;
    dataMahasiswa.value = krs;
    dataDosenWali.value = response.data.dosenWali;

    console.log('respons :', response.data.data);
};

const getTranskrip = async () => {
    try {
        Swal.fire({
        title: 'Loading...',
        html: 'Sedang Memuat Data',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
        const response = await get(`rekap-transkrip-nilai/get-rekap-transkrip-nilai-by-mahasiswa`);
        dataTranskrip.value = response.data;
        rekapNilaiTranskrip.value = response.data.dataRekapTranskripNilai;
        console.log('Response:', response.data)
        Swal.close()
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};

onBeforeMount(() => {
    getTranskrip();
    getMahasiswa()
});
</script>


<template>
    <div class="card">
        <div class="card-body">
            <h5><i class="pi pi-user me-2"></i>TRANSKRIP MAHASISWA</h5>
            <hr>
            <div class="card" style="border-radius: none !important">
                <div class="row">
                    <div class="col-lg-2">NIM</div>
                    <div class="col-lg-4"> <span class="me-2">:</span> {{dataMahasiswa?.nim}}</div>
                    <div class="col-lg-2">Jurusan</div>
                    <div class="col-lg-4"> <span class="me-2">:</span> {{dataMahasiswa?.Prodi?.nama_program_studi}}</div>
                </div>
                <hr style="border: 1px solid #000">
                <div class="row">
                    <div class="col-lg-2">Nama</div>
                    <div class="col-lg-4"> <span class="me-2">:</span> {{dataMahasiswa?.nama_mahasiswa}}</div>
                    <div class="col-lg-2">Jenis Kelamin</div>
                    <div class="col-lg-4"> <span class="me-2">:</span> {{dataMahasiswa?.jenis_kelamin}}</div>
                </div>
                <hr style="border: 1px solid #000">
                <div class="row">
                    <div class="col-lg-2">Status Mahasiswa</div>
                    <div class="col-lg-4"> <span class="me-2">:</span> {{dataMahasiswa?.nama_status_mahasiswa}}</div>
                    <div class="col-lg-2">Agama</div>
                    <div class="col-lg-4"> <span class="me-2">:</span> {{dataMahasiswa?.Agama?.nama_agama}}</div>
                </div>
            </div>
           
            <div style="overflow-x: auto;">
                <table class="table table-bordered text-center">
                    <thead class="table-dark align-middle">
                        <tr>
                            <th rowspan="2">No</th>
                            <th rowspan="2">Kode Mata Kuliah</th>
                            <th rowspan="2">Nama Mata Kuliah</th>
                            <th rowspan="2">SKS</th>
                            <th colspan="3">Nilai</th>
                            <th rowspan="2">SKS*Index</th>
                            
                        </tr>
                        <tr>
                            <th>Angka</th>
                            <th>Huruf</th>
                            <th>Index</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(transkrip, index) in rekapNilaiTranskrip" :key="index">
                            <td>{{index + 1}}</td>
                            <td>{{transkrip?.kode_mata_kuliah}}</td>
                            <td>{{transkrip?.nama_mata_kuliah}}</td>
                            <td>{{transkrip?.sks_mata_kuliah}}</td>
                            <td>{{transkrip?.nilai_angka || '0'}}</td>
                            <td>{{transkrip?.nilai_huruf}}</td>
                            <td>{{transkrip?.nilai_indeks}}</td>
                            <td>{{transkrip?.total_sks_indeks}}</td>
                            
                        </tr>
                        <tr>
                            <td  class="text-center" colspan="3">Total SKS</td>
                            <td  colspan="1">{{dataTranskrip?.total_sks}}</td>
                            <td  class="text-center" colspan="3"></td>
                            <td colspan="1">{{dataTranskrip?.total_sks_indeks}}</td>
                        </tr>
                        <tr >
                            <td class="text-center" colspan="7">IPK (Index Prestasi Kumulatif ) </td>
                            <td>{{dataTranskrip?.ipk}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>