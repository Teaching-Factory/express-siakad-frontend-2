<script>
import { get, postData } from '../../../utiils/request'; // Perbaiki typo di 'utils'
import Swal from 'sweetalert2';
import axios from 'axios';
import { getToken } from '../../../service/auth';
import { API_URL } from '../../../config/config';

export default {
    data() {
        return {
            poin_skala_penilaian: '',
            keterangan_skala_penilaian: '',
            id_semester: '',
            semesters: [],
            message: ''
        };
    },
    async created() {
        await this.getSemester(); // Pastikan ini terpanggil
        this.id = this.$route.params.id;
        if (this.id) {
            this.isEdit = true;
            await this.fetchData(this.id);
        }
    },
    methods: {
        async getSemester() {
            try {
                const response = await get('semester/');
                this.semesters = response.data.data; // Simpan data semester ke dalam state
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
        async fetchData(id) {
            try {
                const response = await get(`skala-penilaian-dosen/${id}/get`);
                const data = response.data.data;
                this.poin_skala_penilaian = data.poin_skala_penilaian;
                this.keterangan_skala_penilaian = data.keterangan_skala_penilaian;
                this.id_semester = data.id_semester;
            } catch (error) {
                Swal.fire('GAGAL', 'Gagal memuat data. Silakan coba lagi.', 'error');
            }
        },
        async create() {
            try {
                const response = await postData('skala-penilaian-dosen/create', {
                    poin_skala_penilaian: this.poin_skala_penilaian,
                    keterangan_skala_penilaian: this.keterangan_skala_penilaian,
                    id_semester: this.id_semester
                });
                const data = response.data;
                Swal.fire('BERHASIL!', 'Data berhasil ditambahkan.', 'success').then(() => {
                    this.$router.push('/skala-penilaian-dosen').catch((err) => {
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
                    `${API_URL}/skala-penilaian-dosen/${this.id}/update`,
                    {
                        poin_skala_penilaian: this.poin_skala_penilaian,
                        keterangan_skala_penilaian: this.keterangan_skala_penilaian,
                        id_semester: this.id_semester
                    },
                    {
                        headers: {
                            Authorization: token
                        }
                    }
                );
                const data = response.data;
                Swal.fire('BERHASIL!', 'Data berhasil diperbarui.', 'success').then(() => {
                    this.$router.push('/skala-penilaian-dosen').catch((err) => {
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
                    <h5><i class="pi pi-user me-2"></i>{{ isEdit ? 'EDIT' : 'TAMBAH' }} DAFTAR SKALA PENILAIAN</h5>
                </div>
                <div class="col-lg-8 d-flex justify-content-end">
                    <router-link to="/skala-penilaian-dosen" class="btn btn-dark me-2"><i class="pi pi-list me-2"></i> Kembali</router-link>
                    <button type="submit" class="btn btn-primary me-2"><i class="pi pi-check me-2"></i> Simpan</button>
                    <router-link to="/skala-penilaian-dosen" class="btn btn-danger"><i class="pi pi-refresh me-2"></i> Batal</router-link>
                </div>
            </div>
            <hr />
            <div class="mb-3 row d-flex justify-content-center">
                <label for="poin_skala_penilaian" class="col-sm-3 col-form-label">Poin Skala Penilaian (Angka)</label>
                <div class="col-md-7">
                    <input type="text" class="form-control" placeholder="Masukkan poin skala penilaian dosen" id="poin_skala_penilaian" v-model="poin_skala_penilaian" />
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label for="id_semester" class="col-sm-3 col-form-label">Periode</label>
                <div class="col-md-7">
                    <select class="form-select" aria-label="Default select example" v-model="id_semester">
                        <option selected disabled hidden>-- Pilih Periode--</option>
                        <option v-for="periode in semesters" :key="periode.id_semester" :value="periode.id_semester">{{ periode.nama_semester }}</option>
                    </select>
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label for="keterangan_skala_penilaian" class="col-sm-3 col-form-label">Keterangan Skala Penilaian</label>
                <div class="col-md-7">
                    <input type="text" class="form-control" placeholder="keterangan skala penilaian dosen" id="keterangan_skala_penilaian" v-model="keterangan_skala_penilaian" />
                </div>
            </div>
        </form>
    </div>
</template>