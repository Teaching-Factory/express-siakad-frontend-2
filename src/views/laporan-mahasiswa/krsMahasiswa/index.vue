<script setup>
import { ref } from 'vue';
import { getData } from '../../../utiils/request';
import { onMounted } from 'vue';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router'
const router = useRouter();

const semesters = ref([]);
const dataMahasiswa = ref({ nama_mahasiswa: '' });
const selectedSemester = ref('');

const getSemester = async () => {
    try {
        const response = await getData('semester');
        semesters.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data semester:', error);
    }
};



const getMahasiswa = async () => {
   const response = await getData('mahasiswa/get-mahasiswa-active');
   const krs = response.data.data;
   dataMahasiswa.value = krs;
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
    };

    try {
        Swal.close();
        router.push({
            name: 'cetak-krs',
            query: requestBody
        });
    } catch (error) {
        console.error('Gagal mengirim data:', error);
    }
};

onMounted(()=>{
    getSemester()
    getMahasiswa()
})


</script>

<template>
    <div class="card">
        <div class="card-body">
            <h5><i class="pi pi-user me-2"></i>KARTU Rencana STUDI (KRS)</h5>
            <hr />
            <hr>
            
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Nama Mahasiswa</label>
                </div>
                <div class="col-lg-6">
                    <input type="text" class="form-control" id="nama_kelas_kuliah" placeholder="Ketikkan Nama Mahasiswa disini" v-model="dataMahasiswa.nama_mahasiswa" readonly> 
                </div>
            </div>
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
            <div class="row ">
                <div class="col-lg-12 d-flex justify-content-center">
                    <button @click="filterData" class="btn btn-primary">Tampilkan</button>
                </div>
            </div>
        </div>
    </div>
</template>