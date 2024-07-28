<script>
import { get, postData } from '../../../utiils/request'; // Perbaiki typo di 'utils'
import Swal from 'sweetalert2';
import { getToken } from '../../../service/auth';
import axios from 'axios';
import { API_URL } from '../../../config/config';

export default {
    data() {
        return {
            id_unsur: '',
            nama_unsur_penilaian: ''
        };
    },
    async created() {
        this.id = this.$route.params.id;
        if (this.id) {
            this.isEdit = true;
            await this.fetchData(this.id);
        }
    },
    methods: {
        async submit() {
            if (this.isEdit) {
                this.update();
            } else {
                this.create();
            }
        },
        async fetchData(id) {
            try {
                const response = await get(`unsur-penilaian/${id}/get`);
                const data = response.data.data;
                this.id_unsur = data.id_unsur;
                this.nama_unsur_penilaian = data.nama_unsur_penilaian;
            } catch (error) {
                Swal.fire('GAGAL', 'Gagal memuat data. Silakan coba lagi.', 'error');
            }
        },
        async create() {
            try {
                const response = await postData('unsur-penilaian/create', {
                    id_unsur: this.id_unsur,
                    nama_unsur_penilaian: this.nama_unsur_penilaian
                });
                const data = response.data;
                Swal.fire('BERHASIL!', 'Data berhasil ditambahkan.', 'success').then(() => {
                    this.$router.push('/unsur-penilaian').catch((err) => {
                        console.error('Redirect error:', err);
                    });
                });
            } catch (error) {
                Swal.fire('GAGAL', `Gagal menambahkan data: ${error.response ? error.response.data.message : error.message}`, 'error');
            }
        },
        async update() {
            try {
                const token = getToken();
                const response = await axios.put(
                    `${API_URL}/unsur-penilaian/${this.id}/update`,
                    {
                        id_unsur: this.id_unsur,
                        nama_unsur_penilaian: this.nama_unsur_penilaian
                    },
                    {
                        headers: {
                            Authorization: token
                        }
                    }
                );
                const data = response.data;
                Swal.fire('BERHASIL!', 'Data berhasil diperbarui.', 'success').then(() => {
                    this.$router.push('/unsur-penilaian').catch((err) => {
                        console.error('Redirect error:', err);
                    });
                });
            } catch (error) {
                Swal.fire('GAGAL',`Gagal memperbarui data: ${error.response ? error.response.data.message : error.message}`, 'error');
            }
        }
    }
};
</script>   

<template>
    <div class="card">
        <form @submit.prevent="submit">
            <div class="row">
                <div class="col-lg-4">
                    <h5><i class="pi pi-user me-2"></i>{{ isEdit ? 'EDIT' : 'TAMBAH' }} UNSUR PENILAIAN</h5>
                </div>
                <div class="col-lg-8 d-flex justify-content-end">
                    <router-link to="/unsur-penilaian" class="btn btn-dark me-2"><i class="pi pi-list me-2"></i> Kembali</router-link>
                    <button type="submit" class="btn btn-primary me-2"><i class="pi pi-check me-2"></i> Simpan</button>
                    <router-link to="/unsur-penilaian" class="btn btn-danger"><i class="pi pi-refresh me-2"></i> Batal</router-link>
                </div>
            </div>
            <hr />
            <div class="mb-3 row d-flex justify-content-center">
                <label for="idUnsur" class="col-sm-3 col-form-label">ID Unsur</label>
                <div class="col-md-7">
                    <input type="text" class="form-control" id="idUnsur" v-model="id_unsur" />
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label for="namaUnsurPenilaian" class="col-sm-3 col-form-label">Nama Unsur Penilaian</label>
                <div class="col-md-7">
                    <input type="text" class="form-control" id="namaUnsurPenilaian" v-model="nama_unsur_penilaian" />
                </div>
            </div>
        </form>
    </div>
</template>