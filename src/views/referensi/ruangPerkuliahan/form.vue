<script>
import { postData } from '../../../utiils/request'; // Perbaiki typo di 'utils'
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            id_ruang: '',
            nama_ruang_perkuliahan: '',
            lokasi: '',
            message: ''
        };
    },
    methods: {
        async create() {
            try {
                const response = await postData('ruang-perkuliahan/create', {
                    id_ruang: this.id_ruang,
                    nama_ruang_perkuliahan: this.nama_ruang_perkuliahan,
                    lokasi: this.lokasi
                });
                const data = response.data;
                Swal.fire('BERHASIL!', 'Data berhasil ditambahkan.', 'success').then(() => {
                    this.$router.push('/ruang-perkuliahan').catch((err) => {
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
        <form @submit.prevent="create">
            <div class="row">
                <div class="col-lg-4">
                    <h5><i class="pi pi-user me-2"></i>TAMBAH RUANG PERKULIAHAN</h5>
                </div>
                <div class="col-lg-8 d-flex justify-content-end">
                    <router-link to="/Ruang-perkuliahan" class="btn btn-dark me-2"><i class="pi pi-list me-2"></i> Kembali</router-link>
                    <button type="submit" class="btn btn-primary me-2"><i class="pi pi-check me-2"></i> Simpan</button>
                    <router-link to="/Ruang-perkuliahan" class="btn btn-danger"><i class="pi pi-refresh me-2"></i> Batal</router-link>
                </div>
            </div>
            <hr />
            <div class="mb-3 row d-flex justify-content-center">
                <label for="idRuang" class="col-sm-3 col-form-label">Kode</label>
                <div class="col-md-7">
                    <input type="text" class="form-control" id="idRuang" v-model="id_ruang" />
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label for="namaRuangPerkuliahan" class="col-sm-3 col-form-label">Nama Ruang Perkuliahan</label>
                <div class="col-md-7">
                    <input type="text" class="form-control" id="namaRuangPerkuliahan" v-model="nama_ruang_perkuliahan" />
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label for="lokasi" class="col-sm-3 col-form-label">Lokasi</label>
                <div class="col-md-7">
                    <input type="text" class="form-control" id="lokasi" v-model="lokasi" />
                </div>
            </div>
        </form>
    </div>
</template>