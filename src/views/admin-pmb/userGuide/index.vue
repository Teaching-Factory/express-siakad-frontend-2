<script setup>
import { onMounted } from 'vue';
import { getData, postData } from '../../../utiils/request';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const router = useRouter();
const file = ref(null);

const handleFileUpload = (event) => {
    file.value = event.target.files[0];
};

// Fungsi untuk menangani proses create dan upload data
const create = async () => {
    if (!file.value) {
        Swal.fire('GAGAL', 'Silakan pilih file untuk diupload.', 'error');
        return;
    }

    const formData = new FormData();
    formData.append('file', file.value);
    formData.append('type', 'PDF'); // Add type as "PDF"
    formData.append('status', 'true'); // Add status as "true"

    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const response = await postData(`user-guide-pmb/create`, formData);
        console.log(response);
        Swal.close();
        Swal.fire('BERHASIL!', 'Data berhasil ditambahkan.', 'success').then(() => {
            router.push('/user-guide').catch((err) => {
                console.error('Redirect error:', err);
            });
        });
    } catch (error) {
        Swal.fire('GAGAL', 'Gagal menambahkan data. Silakan coba lagi.', 'error');
    }
};
</script>

<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-10 xl:col-6">
                    <h5><i class="pi pi-user me-2"></i>USER GUIDE PMB</h5>
                </div>
                <div class="col-12 xl:col-6 d-flex justify-content-end">
                    <div class="flex justify-content-end gap-2">
                        <button @click="create" class="btn btn-primary me-2"><i class="pi pi-save mr-2"></i> Simpan</button>
                    </div>
                </div>
            </div>
            <hr />
            <div class="row mb-3">
                <div class="col-2">
                    <label for="profileImage" class="form-label">File</label>
                </div>
                <div class="col-10">
                    <input type="file" class="form-control" id="profileImage" @change="handleFileUpload" accept=".pdf" />
                    <small class="text-danger d-block mt-1"> * File yang dapat diupload adalah pdf; dengan ukuran maksimal file sebesar 20MB. </small>
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
