<script>
import Swal from 'sweetalert2';
import axios from 'axios';
import { API_URL } from '../../../config/config';
import { getToken } from '../../../service/auth';

export default {
    data() {
        return {
            profile: null
        };
    },
    methods: {
        handleFileUpload(event) {
            const file = event.target.files[0];
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
            const maxSize = 1 * 1024 * 1024; // 1MB in bytes

            if (!validTypes.includes(file.type)) {
                Swal.fire('GAGAL', 'File harus berjenis jpg, jpeg, atau png.', 'error');
                this.profile = null;
                return;
            }

            if (file.size > maxSize) {
                Swal.fire('GAGAL', 'Ukuran file tidak boleh lebih dari 1MB.', 'error');
                this.profile = null;
                return;
            }

            this.profile = file;
        },
        async update() {
            if (!this.profile) {
                Swal.fire('GAGAL', 'Silakan pilih file untuk diupload.', 'error');
                return;
            }

            const formData = new FormData();
            formData.append('profile', this.profile); // Append the file with the correct key

            const token = getToken();
            try {
                Swal.fire({
                    title: 'Loading...',
                    html: 'Sedang Memuat Data',
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });
                const response = await axios.put(`${API_URL}/camaba/camaba-aktif/update-profile`, formData, {
                    headers: {
                        Authorization: token
                    }
                });
                console.log(response);
                Swal.close();
                Swal.fire('BERHASIL!', 'Data berhasil ditambahkan.', 'success').then(() => {
                    this.$router.push('/upload-foto').catch((err) => {
                        console.error('Redirect error:', err);
                    });
                });
            } catch (error) {
                Swal.fire('GAGAL', 'Gagal menambahkan data. Silakan coba lagi.', 'error');
            }
        }
    }
};
</script>

<template>
    <div class="card">
        <div class="card-body">
            <form @submit.prevent="update">
                <div class="row">
                    <div class="col-10 xl:col-6">
                        <h5><i class="pi pi-user me-2"></i>UPLOAD FOTO PROFIL</h5>
                    </div>
                    <div class="col-12 xl:col-6 d-flex justify-content-end">
                        <div class="flex justify-content-end gap-2">
                            <button class="btn btn-primary me-2"><i class="pi pi-save mr-2"></i> Simpan</button>
                        </div>
                    </div>
                </div>
                <hr />
                <div class="row mb-3">
                    <div class="col-12">
                        <label for="profileImage" class="form-label">Gambar <span class="text-danger">*</span></label>
                        <input type="file" class="form-control" id="profileImage" @change="handleFileUpload" accept=".png,.jpg,.jpeg" />
                        <small class="text-danger d-block mt-1"> * File yang dapat diupload adalah .png, .jpg, dan .jpeg; dengan ukuran maksimal file sebesar 1MB. </small>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
.card-theme {
    background-color: rgba(154, 160, 172, 0.5);
}
</style>
