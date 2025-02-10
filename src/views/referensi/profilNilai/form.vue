<script>
import { get, postData } from '../../../utiils/request'; // Perbaiki typo di 'utils'
import Swal from 'sweetalert2';
import axios from 'axios';
import { getToken } from '../../../service/auth';
import { API_URL } from '../../../config/config';

export default {
    data() {
        return {
            nilai_min: '',
            nilai_max: '',
            nilai_indeks: '',
            nilai_huruf: '',
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
                const response = await get(`profil-penilaian/${id}/get`);
                const data = response.data.data;
                this.nilai_min = data.nilai_min;
                this.nilai_max = data.nilai_max;
                this.nilai_indeks = data.nilai_indeks;
                this.nilai_huruf = data.nilai_huruf;
            } catch (error) {
                Swal.fire('GAGAL', 'Gagal memuat data. Silakan coba lagi.', 'error');
            }
        },
        async update() {
            try {
                const token = getToken();
                const response = await axios.put(
                    `${API_URL}/profil-penilaian/${this.id}/update`,
                    {
                        nilai_min: this.nilai_min,
                        nilai_max: this.nilai_max,
                        nilai_indeks: this.nilai_indeks,
                        nilai_huruf: this.nilai_huruf
                    },
                    {
                        headers: {
                            Authorization: token
                        }
                    }
                );
                const data = response.data;
                Swal.fire('BERHASIL!', 'Data berhasil diperbarui.', 'success').then(() => {
                    this.$router.push('/profil-penilaian').catch((err) => {
                        console.error('Redirect error:', err);
                    });
                });
            } catch (error) {
                Swal.fire('GAGAL', `Gagal memperbarui data: ${error.response ? error.response.data.message : error.message}`, 'error');
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
                    <h5><i class="pi pi-user me-2"></i>{{ isEdit ? 'EDIT' : 'TAMBAH' }} RENTANG PENILAIAN</h5>
                </div>
                <div class="col-lg-8 d-flex justify-content-end">
                    <router-link to="/profil-penilaian" class="btn btn-dark me-2"><i class="pi pi-list me-2"></i> Kembali</router-link>
                    <button type="submit" class="btn btn-success me-2"><i class="pi pi-check me-2"></i> Simpan</button>
                </div>
            </div>
            <hr />
            <div class="mb-3 row d-flex justify-content-center">
                <label for="nilai_min" class="col-sm-3 col-form-label">Nilai Minimum</label>
                <div class="col-md-7">
                    <input type="text" class="form-control" id="nilai_min" v-model="nilai_min" />
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label for="nilai_max" class="col-sm-3 col-form-label">Nilai Maximum</label>
                <div class="col-md-7">
                    <input type="text" class="form-control" id="nilai_max" v-model="nilai_max" />
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label for="nilai_indeks" class="col-sm-3 col-form-label">Nilai Indeks</label>
                <div class="col-md-7">
                    <input type="text" class="form-control" id="nilai_indeks" v-model="nilai_indeks" />
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label for="nilai_huruf" class="col-sm-3 col-form-label">Nilai Huruf</label>
                <div class="col-md-7">
                    <input type="text" class="form-control" id="nilai_huruf" v-model="nilai_huruf" />
                </div>
            </div>
        </form>
    </div>
</template>