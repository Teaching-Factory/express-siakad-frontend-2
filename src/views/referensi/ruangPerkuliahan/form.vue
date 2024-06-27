<script>
import { get, postData } from '../../../utiils/request'; // Perbaiki typo di 'utils'
import Swal from 'sweetalert2';
import axios from 'axios';
import { getToken } from '../../../service/auth';
import { API_URL } from '../../../config/config';

export default {
    data() {
        return {
            id_ruang: '',
            nama_ruang_perkuliahan: '',
            lokasi: '',
            message: ''
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
                const response = await get(`ruang-perkuliahan/${id}/get`);
                const data = response.data.data;
                this.id_ruang = data.id_ruang;
                this.nama_ruang_perkuliahan = data.nama_ruang_perkuliahan;
                this.lokasi = data.lokasi;
            } catch (error) {
                Swal.fire('GAGAL', 'Gagal memuat data. Silakan coba lagi.', 'error');
            }
        },
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
        },
        async update() {
            try {
                const token = getToken();
                const response = await axios.put(
                    `${API_URL}/ruang-perkuliahan/${this.id}/update`,
                    {
                        id_ruang: this.id_ruang,
                        nama_ruang_perkuliahan: this.nama_ruang_perkuliahan,
                        lokasi: this.lokasi
                    },
                    {
                        headers: {
                            Authorization: token
                        }
                    }
                );
                const data = response.data;
                Swal.fire('BERHASIL!', 'Data berhasil diperbarui.', 'success').then(() => {
                    this.$router.push('/ruang-perkuliahan').catch((err) => {
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
        <form @submit.prevent="create">
            <div class="row">
                <div class="col-lg-4">
                    <h5><i class="pi pi-user me-2"></i>{{ isEdit ? 'EDIT' : 'TAMBAH' }} RUANG PERKULIAHAN</h5>
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