<script>
import Swal from 'sweetalert2';
import axios from 'axios';
import { getToken } from '../../../service/auth';
import { get, postData } from '../../../utiils/request';
import { API_URL } from '../../../config/config';

export default {
    data() {
        return {
            kode_sk: '',
            nama_sk: '',
            message: '',
            isEdit: false,
            id: null
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
        async fetchData(id) {
            try {
                const response = await get(`sistem-kuliah/${id}/get`);
                const data = response.data.data;
                this.kode_sk = data.kode_sk;
                this.nama_sk = data.nama_sk;
            } catch (error) {
                Swal.fire('GAGAL', 'Gagal memuat data. Silakan coba lagi.', 'error');
            }
        },
        async submit() {
            if (this.isEdit) {
                this.update();
            } else {
                this.create();
            }
        },
        async create() {
            try {
                const response = await postData('sistem-kuliah/create', {
                    kode_sk: this.kode_sk,
                    nama_sk: this.nama_sk
                });
                const data = response.data.data;
                Swal.fire('BERHASIL!', 'Data berhasil ditambahkan.', 'success').then(() => {
                    this.$router.push('/sistem-kuliah').catch((err) => {
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
                    `${API_URL}/sistem-kuliah/${this.id}/update`,
                    {
                        kode_sk: this.kode_sk,
                        nama_sk: this.nama_sk
                    },
                    {
                        headers: {
                            Authorization: token
                        }
                    }
                );
                const data = response.data;
                Swal.fire('BERHASIL!', 'Data berhasil diperbarui.', 'success').then(() => {
                    this.$router.push('/sistem-kuliah').catch((err) => {
                        console.error('Redirect error:', err);
                    });
                });
            } catch (error) {
                Swal.fire('GAGAL', `Gagal memperbarui data: ${error.response ? error.response.data.message : error.message}`, 'error');
            }
        },
        async handleFocus() {
            if (this.isEdit && !this.kode_sk && !this.nama_sk) {
                await this.fetchData(this.id);
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
                    <h5><i class="pi pi-user me-2"></i>{{ isEdit ? 'EDIT' : 'TAMBAH' }} SISTEM KULIAH</h5>
                </div>
                <div class="col-lg-8 d-flex justify-content-end">
                    <router-link to="/sistem-kuliah" class="btn btn-dark me-2"><i class="pi pi-list me-2"></i> Kembali</router-link>
                    <button type="submit" class="btn btn-success me-2"><i class="pi pi-check me-2"></i> Simpan</button>
                </div>
            </div>
            <hr />
            <div class="mb-3 row d-flex justify-content-center">
                <label for="kodeSK" class="col-sm-2 col-form-label">Kode <span class="text-danger">*</span></label>
                <div class="col-md-8">
                    <input type="text" class="form-control" id="kodeSK" v-model="kode_sk" @focus="handleFocus" />
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label for="namaSK" class="col-sm-2 col-form-label">Nama Sistem Kuliah <span class="text-danger">*</span></label>
                <div class="col-md-8">
                    <input type="text" class="form-control" id="namaSK" v-model="nama_sk" @focus="handleFocus" />
                </div>
            </div>
            <div v-if="message" class="alert alert-info" role="alert">
                {{ message }}
            </div>
        </form>
    </div>
</template>
