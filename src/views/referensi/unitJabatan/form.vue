<script setup>
import swal from 'sweetalert2';
import { onBeforeMount, ref } from 'vue';
import { get, postData } from '../../../utiils/request';

const jabatans = ref([]);
const id_jabatan = ref('');
const id_dosen = ref('');
const dosens = ref([]);

const fetchJabatan = async () => {
    try {
        const response = await get('jabatan');
        jabatans.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data jabatan:', error);
    }
};

const fetchDosen = async () => {
    try {
        const response = await get('dosen');
        dosens.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data Dosen:', error);
    }
};

const create = async () => {
    try {
        const response = await postData('unit-jabatan/create', {
            id_jabatan: id_jabatan.value,
            id_dosen: id_dosen.value
        });
        const data = response.data;
        swal.fire('BERHASIL!', 'Data berhasil ditambahkan.', 'success').then(() => {
            window.location.href = '/unit-jabatan';
        });
    } catch (error) {
        swal.fire('GAGAL', `Gagal menambahkan data: ${error.response ? error.response.data.message : error.message}`, 'error');
    }
};

onBeforeMount(() => {
    fetchDosen();
    fetchJabatan();
});
</script>

<template>
    <div class="card">
        <form @submit.prevent="create">
            <div class="row">
                <div class="col-lg-4">
                    <h5><i class="pi pi-user me-2"></i>TAMBAH UNIT JABATAN</h5>
                </div>
                <div class="col-lg-8 d-flex justify-content-end">
                    <router-link to="/unit-jabatan" class="btn btn-dark me-2"><i class="pi pi-list me-2"></i> Kembali</router-link>
                    <button type="submit" class="btn btn-success me-2"><i class="pi pi-check me-2"></i> Simpan</button>
                    <!-- <router-link to="/unit-jabatan" class="btn btn-danger"><i class="pi pi-refresh me-2"></i> Batal</router-link> -->
                </div>
            </div>
            <hr />
            <div class="mb-3 row d-flex justify-content-center">
                <label for="exampleFormControlInput1" class="col-sm-3 col-form-label">Pilih Jabatan <span class="text-danger">*</span></label>
                <div class="col-md-7">
                    <select v-model="id_jabatan" class="form-select" aria-label="Default select example">
                        <option value="" selected disabled hidden>Pilih Jabatan</option>
                        <option v-for="jabatan in jabatans" :key="jabatan.id" :value="jabatan.id">{{ jabatan.nama_jabatan }}</option>
                    </select>
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label for="exampleFormControlInput1" class="col-sm-3 col-form-label">Pilih Nama Penandatanganan <span class="text-danger">*</span></label>
                <div class="col-md-7">
                    <select v-model="id_dosen" class="form-select" aria-label="Default select example">
                        <option value="" selected disabled hidden>Pilih Nama Penandatanganan</option>
                        <option v-for="dosen in dosens" :key="dosen.id_dosen" :value="dosen.id_dosen">{{ dosen.nama_dosen }}</option>
                    </select>
                </div>
            </div>
        </form>
    </div>
</template>