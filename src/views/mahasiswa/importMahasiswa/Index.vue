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
                const response = await postData('mahasiswa/import-data-mahasiswa', formData);
                console.log(response);
                Swal.fire('BERHASIL!', 'Data berhasil ditambahkan.', 'success').then(() => {
                    this.$router.push('/import-mahasiswa').catch((err) => {
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
        <h5><i class="pi pi-user me-2"></i>IMPORT DATA MAHASISWA</h5>
        <div class="card">
            <div class="row mb-2">
                <div class="col-6 col-md-6 col-lg-6">
                    <span>Download Template</span>
                </div>
                <div class="col-6 col-md-8 col-lg-8">
                    <div class="text-info">
                        <router-link to="">
                            <span>template_mahasiswa.xls</span>
                        </router-link>
                    </div>
                </div>
            </div>
            <form @submit.prevent="create">
                <div class="row">
                    <div class="col-6 col-md-6 col-lg-6">
                        <span>Import Data</span>
                    </div>
                    <div class="col-6 col-md-6 col-lg-6">
                        <div class="input-group mb-3">
                            <input type="file" class="form-control" id="inputGroupFile02" @change="handleFileUpload" />
                            <label class="input-group-text" for="inputGroupFile02">Upload</label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-md-6 col-lg-12 text-end">
                        <button type="submit" class="btn btn-primary">Upload</button>
                    </div>
                </div>
            </form>
            <div class="row">
                <div class="col-12 col-md-6 col-lg-12">
                    <h6 class="text-dark">Langkah-Langkah :</h6>
                    <ol class="lh-2 text-small">
                        <li>Download Template data mahasiswa terlebih dahulu</li>
                        <li>Pastikan kodeprodi yang anda inputkan sesuai dengan daftar referensi program studi pada Feeder</li>
                        <li>Pastikan data yang anda inputkan sudah benar, dan semua terisi. (kecuali SKS diakui,Kode PT Asal,Kode Prodi Asal hanya di isi ketika jenis pendaftaran ialah pindahan)</li>
                        <li>Bila terjadi kesalahan import data, silahkan download error hasil import</li>
                        <li>Lakukan perbaikan lalu import lagi data tersebut</li>
                    </ol>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-md-6 col-lg-12">
                    <h6 class="text-dark">Catatan :</h6>
                    <ol class="lh-2 text-small">
                        <li>Bila ada kesalahan pada NIM, silahkan merubah pada aplikasi Feeder atau Pengajuan Pada Forlap</li>
                        <li>Maksimum pengiriman data ialah 50 data</li>
                        <li>File yang boleh diupload hanya file dengan ekstensi .xls</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
</template>
