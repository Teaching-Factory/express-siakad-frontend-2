<script setup>
import { onMounted } from 'vue';
import { getData } from '../../../utiils/request';
import { ref } from 'vue';

const prodis = ref([]);
const selectedProdi = ref('');

const getProdi = async () => {
    try {
        const response = await getData('prodi');
        prodis.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data prodi:', error);
    }
};

onMounted(() => {
    getProdi();
});
</script>

<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-10 xl:col-6">
                    <h5><i class="pi pi-user me-2"></i>PROGRAM STUDI YANG DIPILIH</h5>
                </div>
                <div class="col-12 xl:col-6 d-flex justify-content-end">
                    <div class="flex justify-content-end gap-2">
                        <button class="btn btn-primary me-2"><i class="pi pi-save mr-2"></i> Simpan</button>
                    </div>
                </div>
            </div>
            <hr />
            <div class="row">
                <div class="col-lg-12 mb-2">
                    <label for="inputProdi" class="col-sm-4 col-form-label">Pilihan 1</label>
                    <select v-model="selectedProdi" class="form-select" aria-label="Default select example">
                        <option value="" selected disabled hidden>Pilih Program Studi</option>
                        <option v-for="prodi in prodis" :key="prodi.id_prodi" :value="prodi.id_prodi">{{ prodi.nama_program_studi }}</option>
                    </select>
                </div>
                <div class="col-sm-12 mt-2">
                    <label for="inputProdi" class="col-sm-4 col-form-label">Pilihan 2</label>
                    <select v-model="selectedProdi" class="form-select" aria-label="Default select example">
                        <option value="" selected disabled hidden>Pilih Program Studi</option>
                        <option v-for="prodi in prodis" :key="prodi.id_prodi" :value="prodi.id_prodi">{{ prodi.nama_program_studi }}</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card-theme {
    background-color: rgba(154, 160, 172, 0.5);
}
</style>
