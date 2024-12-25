<script>
import { get, postData } from '../../../utiils/request'; // Perbaiki typo di 'utils'
import Swal from 'sweetalert2';
import axios from 'axios';
import { getToken } from '../../../service/auth';
import { API_URL } from '../../../config/config';

export default {
    data() {
        return {
            nomor_urut_aspek: '',
            aspek_penilaian: '',
            tipe_aspek_penilaian: '',
            id_semester: '',
            semesters: [],
            deskripsi_pendek: '',
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
                const response = await get(`aspek-penilaian-dosen/${id}/get`);
                const data = response.data.data;
                this.nomor_urut_aspek = data.nomor_urut_aspek;
                this.aspek_penilaian = data.aspek_penilaian;
                this.tipe_aspek_penilaian = data.tipe_aspek_penilaian;
                this.id_semester = data.id_semester;
                this.deskripsi_pendek = data.deskripsi_pendek;
            } catch (error) {
                Swal.fire('GAGAL', 'Gagal memuat data. Silakan coba lagi.', 'error');
            }
        },
        async create() {
            try {
                const response = await postData('aspek-penilaian-dosen/create', {
                    nomor_urut_aspek: this.nomor_urut_aspek,
                    aspek_penilaian: this.aspek_penilaian,
                    tipe_aspek_penilaian: this.tipe_aspek_penilaian,
                    id_semester: this.id_semester,
                    deskripsi_pendek: this.deskripsi_pendek
                });
                const data = response.data;
                Swal.fire('BERHASIL!', 'Data berhasil ditambahkan.', 'success').then(() => {
                    this.$router.push('/aspek-penilaian-dosen').catch((err) => {
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
                    `${API_URL}/aspek-penilaian-dosen/${this.id}/update`,
                    {
                        nomor_urut_aspek: this.nomor_urut_aspek,
                        aspek_penilaian: this.aspek_penilaian,
                        tipe_aspek_penilaian: this.tipe_aspek_penilaian,
                        id_semester: this.id_semester,
                        deskripsi_pendek: this.deskripsi_pendek
                    },
                    {
                        headers: {
                            Authorization: token
                        }
                    }
                );
                const data = response.data;
                Swal.fire('BERHASIL!', 'Data berhasil diperbarui.', 'success').then(() => {
                    this.$router.push('/aspek-penilaian-dosen').catch((err) => {
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
                    <h5><i class="pi pi-user me-2"></i>{{ isEdit ? 'EDIT' : 'TAMBAH' }} DAFTAR ASPEK PENILAIAN</h5>
                </div>
                <div class="col-lg-8 d-flex justify-content-end">
                    <router-link to="/aspek-penilaian-dosen" class="btn btn-dark me-2"><i class="pi pi-list me-2"></i> Kembali</router-link>
                    <button type="submit" class="btn btn-success me-2"><i class="pi pi-check me-2"></i> Simpan</button>
                    <!-- <router-link to="/aspek-penilaian-dosen" class="btn btn-danger"><i class="pi pi-refresh me-2"></i> Batal</router-link> -->
                </div>
            </div>
            <hr />
            <div class="mb-3 row d-flex justify-content-center">
                <label for="nomor_urut_aspek" class="col-sm-3 col-form-label">Nomor Urut Aspek</label>
                <div class="col-md-7">
                    <input type="text" class="form-control" placeholder="Masukkan nomor urut aspek penilaian dosen" id="namaRuangPerkuliahan" v-model="nomor_urut_aspek" />
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label for="aspek_penilaian" class="col-sm-3 col-form-label">Aspek Penilaian</label>
                <div class="col-md-7">
                    <input type="text" class="form-control" placeholder="masukkan aspek penilaian dosen" id="namaRuangPerkuliahan" v-model="aspek_penilaian" />
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label for="tipe_aspek_penilaian" class="col-sm-3 col-form-label">Tipe Aspek Penilaian</label>
                <div class="col-md-7">
                    <select class="form-select" aria-label="Default select example" v-model="tipe_aspek_penilaian">
                        <option selected disabled hidden>-- Pilih--</option>
                        <option value="Pilihan Ganda">Pilihan Ganda</option>
                        <option value="Essay">Essay</option>
                    </select>
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
                <label for="deskripsi_pendek" class="col-sm-3 col-form-label">Deskripsi Pendek</label>
                <div class="col-md-7">
                    <input type="text" class="form-control" placeholder="Masukkan deskripsi pendek aspek penilaian" id="deskripsi_pendek" v-model="deskripsi_pendek" />
                </div>
            </div>
        </form>
    </div>
</template>