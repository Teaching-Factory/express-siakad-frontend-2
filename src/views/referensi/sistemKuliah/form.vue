<script>
import { postData } from '../../../utiils/request'; // Perbaiki typo di 'utils'
import Swal from 'sweetalert2';
import StateMixin from '../../../mixins/StateMixin';

export default {
    data() {
        return {
            kode_sk: '' ?? this.state?.kode_sk,
            nama_sk: '' ?? this.state?.nama_sk,
            message: ''
        };
    },
    methods: {
        async create() {
            try {
                const response = await postData('sistem-kuliah/create', {
                    kode_sk: this.kode_sk,
                    nama_sk: this.nama_sk
                });
                const data = response.data;
                Swal.fire('BERHASIL!', 'Data berhasil ditambahkan.', 'success').then(() => {
                    this.$router.push('/sistem-kuliah').catch((err) => {
                        console.error('Redirect error:', err);
                    });
                });
            } catch (error) {
                Swal.fire('GAGAL', 'Gagal menambahkan data. Silakan coba lagi.', 'error');
            }
        }
    },
    mixins: [StateMixin],
    mounted() {
        console.log('State data:', this.routeState.data);
    }
};
</script>

<template>
    <div class="card">
        <form @submit.prevent="create">
            <div class="row">
                <div class="col-lg-4">
                    <h5><i class="pi pi-user me-2"></i>TAMBAH SISTEM KULIAH</h5>
                </div>
                <div class="col-lg-8 d-flex justify-content-end">
                    <router-link to="/sistem-kuliah" class="btn btn-dark me-2"><i class="pi pi-list me-2"></i> Kembali</router-link>
                    <button type="submit" class="btn btn-primary me-2"><i class="pi pi-check me-2"></i> Simpan</button>
                    <router-link to="/sistem-kuliah" class="btn btn-danger"><i class="pi pi-refresh me-2"></i> Batal</router-link>
                </div>
            </div>
            <hr />
            <div class="mb-3 row d-flex justify-content-center">
                <label for="kodeSK" class="col-sm-2 col-form-label">Kode</label>
                <div class="col-md-8">
                    <input type="text" class="form-control" id="kodeSK" v-model="kode_sk" />
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label for="namaSK" class="col-sm-2 col-form-label">Nama Sistem Kuliah</label>
                <div class="col-md-8">
                    <input type="text" class="form-control" id="namaSK" v-model="nama_sk" />
                </div>
            </div>
            <div v-if="message" class="alert alert-info" role="alert">
                {{ message }}
            </div>
        </form>
    </div>
</template>
