<script>
import { get, postData } from '../../../utiils/request'; // Perbaiki typo di 'utils'
import Swal from 'sweetalert2';
import axios from 'axios';
import { getToken } from '../../../service/auth';
import { API_URL } from '../../../config/config';

export default {
    data() {
        return {
            nama_berkas: '',
            keterangan_singkat: '',
            jumlah: '',
            wajib: false,
            upload: false,
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
        async submit() {
            if (this.isEdit) {
                this.update();
            } else {
                this.create();
            }
        },
        async fetchData(id) {
            try {
                const response = await get(`jenis-berkas/${id}/get`);
                const data = response.data.data;
                this.nama_berkas = data.nama_berkas;
                this.keterangan_singkat = data.keterangan_singkat;
                this.jumlah = data.jumlah;
                this.wajib = data.wajib;
                this.upload = data.upload;
            } catch (error) {
                Swal.fire('GAGAL', 'Gagal memuat data. Silakan coba lagi.', 'error');
            }
        },
        async create() {
            try {
                const response = await postData('jenis-berkas/create', {
                    nama_berkas: this.nama_berkas,
                    keterangan_singkat: this.keterangan_singkat,
                    jumlah: this.jumlah,
                    wajib: this.wajib,
                    upload: this.upload
                });
                Swal.fire('BERHASIL!', 'Data berhasil ditambahkan.', 'success').then(() => {
                    this.$router.push('/jenis-berkas').catch((err) => {
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
                await axios.put(
                    `${API_URL}/jenis-berkas/${this.id}/update`,
                    {
                        nama_berkas: this.nama_berkas,
                        keterangan_singkat: this.keterangan_singkat,
                        jumlah: this.jumlah,
                        wajib: this.wajib,
                        upload: this.upload
                    },
                    {
                        headers: {
                            Authorization: token
                        }
                    }
                );
                Swal.fire('BERHASIL!', 'Data berhasil diperbarui.', 'success').then(() => {
                    this.$router.push('/jenis-berkas').catch((err) => {
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
                    <h5><i class="pi pi-user me-2"></i>{{ isEdit ? 'EDIT' : 'TAMBAH' }} JENIS BERKAS</h5>
                </div>
                <div class="col-lg-8 d-flex justify-content-end">
                    <router-link to="/jenis-berkas" class="btn btn-dark me-2"><i class="pi pi-list me-2"></i> Kembali</router-link>
                    <button type="submit" class="btn btn-primary me-2"><i class="pi pi-check me-2"></i> Simpan</button>
                    <!-- <router-link to="/jenis-berkas" class="btn btn-danger"><i class="pi pi-refresh me-2"></i> Batal</router-link> -->
                </div>
            </div>
            <hr />
            <div class="mb-3 row d-flex justify-content-center">
                <label for="namaBerkas" class="col-sm-3 col-form-label">Nama Berkas</label>
                <div class="col-md-7">
                    <input type="text" class="form-control" placeholder="Nama Jenis Berkas" id="namaBerkas" v-model="nama_berkas" />
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label for="keteranganSingkat" class="col-sm-3 col-form-label">Keterangan Singkat</label>
                <div class="col-md-7">
                    <input type="text" class="form-control" placeholder="Keterangan Singkat Jenis Tes" id="keteranganSingkat" v-model="keterangan_singkat" />
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label for="jumlah" class="col-sm-3 col-form-label">Jumlah</label>
                <div class="col-md-7">
                    <input type="text" class="form-control" placeholder="Jumlah" id="jumlah" v-model="jumlah" />
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label class="col-sm-3 col-form-label">Wajib?</label>
                <div class="col-md-7">
                    <input type="checkbox" class="form-check-input" id="exampleCheckbox" v-model="wajib" />
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label class="col-sm-3 col-form-label">Upload?</label>
                <div class="col-md-7">
                    <input type="checkbox" class="form-check-input" id="exampleCheckbox" v-model="upload" />
                </div>
            </div>
        </form>
    </div>
</template>