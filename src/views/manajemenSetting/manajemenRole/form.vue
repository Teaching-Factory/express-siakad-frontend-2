<script>
import { get, postData } from '../../../utiils/request'; // Perbaiki typo di 'utils'
import Swal from 'sweetalert2';
import axios from 'axios';
import { getToken } from '../../../service/auth';
import { API_URL } from '../../../config/config';

export default {
    data() {
        return {
            nama_role: '',
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
                const response = await get(`role/${id}/get`);
                const data = response.data.data;
                this.nama_role = data.nama_role;
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
                const response = await postData('role/create', {
                    nama_role: this.nama_role
                });
                const data = response.data;
                Swal.fire('BERHASIL!', 'Data berhasil ditambahkan.', 'success').then(() => {
                    this.$router.push('/manajemen-role').catch((err) => {
                        console.error('Redirect error:', err);
                    });
                });
            } catch (error) {
                Swal.fire('GAGAL', 'Gagal menambahkan data. Silakan coba lagi.', 'error');
            }
        },
        async update() {
            try {
                const token = getToken();
                const response = await axios.put(
                    `${API_URL}/role/${this.id}/update`,
                    {
                        nama_role: this.nama_role
                    },
                    {
                        headers: {
                            Authorization: token
                        }
                    }
                );
                const data = response.data;
                Swal.fire('BERHASIL!', 'Data berhasil diperbarui.', 'success').then(() => {
                    this.$router.push('/manajemen-role').catch((err) => {
                        console.error('Redirect error:', err);
                    });
                });
            } catch (error) {
                Swal.fire('GAGAL', 'Gagal memperbarui data. Silakan coba lagi.', 'error');
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
                    <h5><i class="pi pi-user me-2"></i>{{ isEdit ? 'EDIT' : 'TAMBAH' }} ROLE</h5>
                </div>
                <div class="col-lg-8 d-flex justify-content-end">
                    <router-link to="/manajemen-role" class="btn btn-dark me-2"><i class="pi pi-list me-2"></i> Kembali</router-link>
                    <button type="submit" class="btn btn-primary me-2"><i class="pi pi-check me-2"></i> Simpan</button>
                    <router-link to="/manajemen-role" class="btn btn-danger"><i class="pi pi-refresh me-2"></i> Batal</router-link>
                </div>
            </div>
            <hr />
            <div class="mb-3 row d-flex justify-content-center">
                <label for="namaRole" class="col-sm-3 col-form-label">Nama Role</label>
                <div class="col-md-7">
                    <input type="text" class="form-control" id="namaRole" v-model="nama_role" />
                </div>
            </div>
        </form>
    </div>
</template>