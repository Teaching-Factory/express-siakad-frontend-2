<script setup>
import swal from 'sweetalert2';
import { onBeforeMount, ref } from 'vue';
import { get, postData } from '../../../utiils/request';

const prodis = ref([]);
const id_prodi = ref('');
const id_unsur_penilaian = ref('');
const bobot_penilaian = ref('');
const penilaians = ref([]);

const fetchProdi = async () => {
    try {
        const response = await get('prodi');
        prodis.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data prodi:', error);
    }
};

const fetchPenilaian = async () => {
    try {
        const response = await get('unsur-penilaian');
        penilaians.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data unsur penilaian:', error);
    }
};

const create = async () => {
    try {
        const response = await postData('bobot-penilaian/create', {
            id_prodi: id_prodi.value,
            id_unsur_penilaian: id_unsur_penilaian.value,
            bobot_penilaian: bobot_penilaian.value
        });
        const data = response.data;
        swal.fire('BERHASIL!', 'Data berhasil ditambahkan.', 'success').then(() => {
            window.location.href = '/bobot-penilaian';
        });
    } catch (error) {
        swal.fire('GAGAL', 'Gagal menambahkan data. Silakan coba lagi.', 'error');
    }
};

onBeforeMount(() => {
    fetchPenilaian();
    fetchProdi();
});
</script>


<template>
    <div class="card">
        <form @submit.prevent="create">
            <div class="row">
                <div class="col-lg-5">
                    <h5><i class="pi pi-user me-2"></i>TAMBAH UNSUR & BOBOT PENILAIAN</h5>
                </div>
                <div class="col-lg-7 d-flex justify-content-end">
                    <router-link to="/bobot-penilaian" class="btn btn-dark me-2"><i class="pi pi-list me-2"></i> Kembali</router-link>
                    <button type="submit" class="btn btn-primary me-2"><i class="pi pi-check me-2"></i> Simpan</button>
                    <router-link to="/bobot-penilaian" class="btn btn-danger"><i class="pi pi-refresh me-2"></i> Batal</router-link>
                </div>
            </div>
            <hr />
            <div class="mb-3 row d-flex justify-content-center">
                <label for="exampleFormControlInput1" class="col-sm-3 col-form-label">Pilih Program Studi</label>
                <div class="col-md-7">
                    <select v-model="id_prodi" class="form-select" aria-label="Default select example">
                        <option value="" selected disabled hidden>Pilih Program Studi</option>
                        <option v-for="prodi in prodis" :key="prodi.id_prodi" :value="prodi.id_prodi">{{ prodi.nama_program_studi }}</option>
                    </select>
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label for="exampleFormControlInput1" class="col-sm-3 col-form-label">Pilih Unsur Penilaian</label>
                <div class="col-md-7">
                    <select v-model="id_unsur_penilaian" class="form-select" aria-label="Default select example">
                        <option value="" selected disabled hidden>Pilih Unsur Penilaian</option>
                        <option v-for="penilaian in penilaians" :key="penilaian.id_unsur_penilaian" :value="penilaian.id_unsur_penilaian">{{ penilaian.nama_unsur_penilaian }}</option>
                    </select>
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label for="bobotPenilaian" class="col-sm-3 col-form-label">Bobot Penilaian</label>
                <div class="col-md-7">
                    <input type="text" class="form-control" id="bobotPenilaian" v-model="bobot_penilaian" />
                </div>
            </div>
        </form>
    </div>
</template>