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
                    <h5><i class="pi pi-user me-2"></i>UPLOAD FOTO PROFIL</h5>
                </div>
                <div class="col-12 xl:col-6 d-flex justify-content-end">
                    <div class="flex justify-content-end gap-2">
                        <button class="btn btn-primary me-2"> <i class="pi pi-save mr-2"></i> Simpan</button>
                    </div>
                </div>
            </div>
            <hr>
            <div class="row mb-3">
                <div class="col-12">
                    <label for="profileImage" class="form-label">Gambar</label>
                    <input type="file" class="form-control" id="profileImage" @change="previewImage" accept=".png,.jpg,.jpeg">
                    <small class="text-danger d-block mt-1">
                        * File yang dapat diupload adalah .png, .jpg, dan .jpeg; dengan ukuran maksimal file sebesar 1MB.
                    </small>
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
