<script setup>
import { onMounted } from 'vue';
import { getData } from '../../../utiils/request';
import { ref } from 'vue';


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
                        <button class="btn btn-primary me-2"> <i class="pi pi-save mr-2"></i> Simpan</button>
                    </div>
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="col-lg-12 mb-4">
                    <label for="inputPassword" class="col-sm-4 col-form-label">Pilihan 1</label>
                    <select class="form-select" aria-label="Default select example">
                        <option selected disabled hidden>-- Pilih Program Studi--</option>
                        <option value="1">D4 - Teknologi Rekayasa Perangkat Lunak</option>
                        <option value="2">D4 - Bisnis Digital</option>
                    </select>
                </div>
                <div class="col-sm-12 mt-4">
                    <label for="inputPassword" class="col-sm-4 col-form-label">Pilihan 2</label>
                    <select class="form-select" aria-label="Default select example">
                        <option selected disabled hidden>-- Pilih Program Studi--</option>
                        <option value="1">D4 - Teknologi Rekayasa Perangkat Lunak</option>
                        <option value="2">D4 - Bisnis Digital</option>
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
