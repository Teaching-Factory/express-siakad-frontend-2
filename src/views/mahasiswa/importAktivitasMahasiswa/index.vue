<script>
import Swal from 'sweetalert2';
import { postData } from '../../../utiils/request';

export default {
    data() {
        return {
            file: null
        };
    },
    methods: {
        handleFileUpload(event) {
            this.file = event.target.files[0];
        },
        async create() {
            if (!this.file) {
                Swal.fire('GAGAL', 'Silakan pilih file untuk diupload.', 'error');
                return;
            }

            const formData = new FormData();
            formData.append('file', this.file);

            try {
                const response = await postData('aktivitas-mahasiswa/import-data-aktivitas-mahasiswa', formData);
                console.log(response);
                Swal.fire('BERHASIL!', 'Data berhasil ditambahkan.', 'success').then(() => {
                    this.$router.push('/aktivitas-mahasiswa').catch((err) => {
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
        <h5><i class="pi pi-user me-2"></i>IMPORT DATA AKTIVITAS MAHASISWA</h5>
        <div class="card">
            <div class="row">
                <div class="col-3 col-md-6 col-lg-6">
                    <span>Download Template</span>
                </div>
                <div class="col-6 col-md-6 col-lg-6">
                    <div class="text-info">
                        <a href="../../../../public/file/template aktivitas-mahasiswa.xlsx" download>
                            <span>template_aktivitas_mhs.xls</span>
                        </a>
                    </div>
                </div>
            </div>
            <form @submit.prevent="create">
                <div class="row">
                    <div class="col-3 col-md-6 col-lg-6">
                        <span>Import Data</span>
                    </div>
                    <div class="col-6 col-md-6 col-lg-6">
                        <div class="input-group mb-3">
                            <input type="file" class="form-control" id="inputGroupFile02" @change="handleFileUpload" />
                        </div>
                    </div>
                    <div class="col-3 col-md-6 col-lg-12">
                        <button type="submit" class="btn btn-primary">Upload</button>
                    </div>
                </div>
            </form>
            <div class="row">
                <div class="col-12 col-md-6 col-lg-12">
                    <h6 class="text-dark">Langkah-Langkah :</h6>
                    <p class="lh-1 text-small">
                        1. Download Template data aktivitas Mahasiswa terlebih dahulu
                        <br />2. Pastikan kodeprodi yang anda inputkan sesuai dengan daftar referensi program studi pada feeeder <br />3. Pastikan data yang anda inputkan sudah benar, Data Mahasiswa sudah terdaftar <br />4. Bila terjadi kesalahan
                        import data, silahkan download error hasil import <br />5. Lakukan perbaikan lalu import lagi data tersebut
                    </p>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-md-6 col-lg-12">
                    <h6 class="text-dark">Catatan :</h6>
                    <p class="lh-1 text-small">1. Halaman import aktivitas mahasiswa hanya digunakan untuk menambah aktivitas baru mahasiswa dan tidak digunakan untuk update aktivitas mahasiswa.</p>
                </div>
            </div>
        </div>
    </div>
</template>
