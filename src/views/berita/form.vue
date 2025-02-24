<script>
import Swal from 'sweetalert2';
import { postData } from '../../utiils/request';

export default {
    data() {
        return {
            judul_berita: '',
            deskripsi_pendek: '',
            kategori_berita: '',
            share_public: false,
            thumbnail: null,
            konten_berita: '',
            message: ''
        };
    },
    methods: {
        async create() {
            const formData = new FormData();
            formData.append('judul_berita', this.judul_berita);
            formData.append('deskripsi_pendek', this.deskripsi_pendek);
            formData.append('kategori_berita', this.kategori_berita);
            formData.append('share_public', this.share_public);
            formData.append('thumbnail', this.thumbnail);
            formData.append('konten_berita', this.konten_berita);

            try {
                const response = await postData('berita/create', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                const data = response.data;
                Swal.fire('BERHASIL!', 'Data berhasil ditambahkan.', 'success').then(() => {
                    this.$router.push('/daftar-berita').catch((err) => {
                        console.error('Redirect error:', err);
                    });
                });
            } catch (error) {
                Swal.fire('GAGAL', 'Gagal menambahkan data. Silakan coba lagi.', 'error');
            }
        },
        handleFileUpload(event) {
            this.thumbnail = event.target.files[0];
        }
    }
};
</script>


<template>
    <div class="card">
        <div class="card-body">
            <form @submit.prevent="create">
                <div class="row">
                    <div class="col-10 xl:col-6">
                        <h5><i class="pi pi-user me-2"></i>TAMBAH BERITA</h5>
                    </div>
                    <div class="col-12 xl:col-6 d-flex justify-content-end">
                        <div class="flex justify-content-end gap-2">
                            <router-link to="/daftar-berita" class="btn btn-secondary me-2"> <i class="pi pi-bars mr-2"></i> Kembali</router-link>
                            <button type="submit" class="btn btn-success me-2"><i class="pi pi-save mr-2"></i> Simpan</button>
                            <!-- <router-link to="#" class="btn btn-danger"> <i class="pi pi-times mr-2"></i> Batal</router-link> -->
                        </div>
                    </div>
                </div>
                <hr />

                <div class="row d-flex justify-content-center mb-3">
                    <div class="col-lg-4">
                        <label for="exampleFormControlInput1" class="form-label">Judul Berita <span class="text-danger">*</span></label>
                    </div>
                    <div class="col-lg-6">
                        <input type="text" class="form-control" placeholder="masukkan judul berita disini" v-model="judul_berita" />
                    </div>
                </div>
                <div class="row d-flex justify-content-center mb-3">
                    <div class="col-lg-4">
                        <label for="exampleFormControlInput1" class="form-label">Deskripsi Pendek <span class="text-danger">*</span></label>
                    </div>
                    <div class="col-lg-6">
                        <input type="text" class="form-control" placeholder="masukkan deskripsi berita disini" v-model="deskripsi_pendek" />
                    </div>
                </div>
                <div class="row d-flex justify-content-center mb-3">
                    <div class="col-lg-4">
                        <label for="exampleFormControlInput1" class="form-label">Kategori Berita <span class="text-danger">*</span></label>
                    </div>
                    <div class="col-lg-6">
                        <div class="actions gap-2">
                            <select class="form-select" id="kategor_berita" v-model="kategori_berita">
                                <option value="">Kategori Berita</option>
                                <option value="info">Info</option>
                                <option value="pengumuman">Pengumuman</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row d-flex justify-content-center mb-3">
                    <div class="col-lg-4">
                        <label for="exampleFormControlInput1" class="form-label">Share ke public</label>
                    </div>
                    <div class="col-lg-6">
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheckbox" v-model="share_public" />
                            <label class="form-check-label" for="exampleCheckbox">Tampilkan berita di dashboad mahasiswa</label>
                        </div>
                    </div>
                </div>
                <div class="row d-flex justify-content-center mb-3">
                    <div class="col-lg-4">
                        <label for="exampleFormControlInput1" class="form-label">Thumbnail</label>
                    </div>
                    <div class="col-lg-6">
                        <input type="file" class="form-control" @change="handleFileUpload" />
                    </div>
                </div>
                <div class="row d-flex justify-content-center mb-3">
                    <div class="col-lg-4">
                        <label for="exampleFormControlInput1" class="form-label">Konten Berita <span class="text-danger">*</span></label>
                    </div>
                    <div class="col-lg-6">
                        <textarea name="" id="" v-model="konten_berita" class="form-control" rows="10"></textarea>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>