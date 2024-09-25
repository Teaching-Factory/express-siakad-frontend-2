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
                Swal.fire('GAGAL', `Gagal menambahkan data: ${error.response ? error.response.data.message : error.message}`, 'error');
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
                Swal.fire('GAGAL', `Gagal memperbarui data: ${error.response ? error.response.data.message : error.message}`, 'error');
            }
        }
    }
};

// // Fungsi untuk mengubah status input biaya pendaftaran
// document.getElementById("berbayarCheckbox").addEventListener("change", function() {
//         var biayaInput = document.getElementById("biayaPendaftaran");
//         // Mengubah status input berdasarkan status checkbox
//         if (this.checked) {
//             biayaInput.removeAttribute("disabled");
//         } else {
//             biayaInput.setAttribute("disabled", "disabled");
//             biayaInput.value = ''; // Mengosongkan input ketika tidak dicentang
//         }
//     });
</script>

<template>
    <div class="card">
        <form @submit.prevent="create">
            <div class="row">
                <div class="col-lg-4">
                    <h5><i class="pi pi-user me-2"></i>{{ isEdit ? 'EDIT' : 'TAMBAH' }} PERIODE PENDAFTARAN</h5>
                </div>
                <div class="col-lg-8 d-flex justify-content-end">
                    <router-link to="/jenis-berkas" class="btn btn-dark me-2"><i class="pi pi-list me-2"></i> Kembali</router-link>
                    <button type="submit" class="btn btn-primary me-2"><i class="pi pi-check me-2"></i> Simpan</button>
                    <router-link to="/jenis-berkas" class="btn btn-danger"><i class="pi pi-refresh me-2"></i> Batal</router-link>
                </div>
            </div>
            <hr />
            <div class="mb-3 row d-flex justify-content-center">
                <label for="namaRuangPerkuliahan" class="col-sm-3 col-form-label">Nama Berkas</label>
                <div class="col-md-7">
                    <input type="text" class="form-control" placeholder="Nama Jenis Berkas" id="namaRuangPerkuliahan" v-model="nama_ruang_perkuliahan" />
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label for="status" class="col-sm-3 col-form-label">Periode</label>
                <div class="col-md-7">
                <select class="form-select" id="status" v-model="status">
                    <option value="true">Aktif</option>
                    <option value="false">Tidak Aktif</option>
                </select>
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label for="status" class="col-sm-3 col-form-label">Jalur Pendaftaran</label>
                <div class="col-md-7">
                <select class="form-select" id="status" v-model="status">
                    <option value="true">Aktif</option>
                    <option value="false">Tidak Aktif</option>
                </select>
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label for="status" class="col-sm-3 col-form-label">Sistem Kuliah</label>
                <div class="col-md-7">
                <select class="form-select" id="status" v-model="status">
                    <option value="true">Aktif</option>
                    <option value="false">Tidak Aktif</option>
                </select>
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label class="col-sm-3 col-form-label">Tanggal Awal Pendaftaran</label>
                <div class="col-md-7">
                    <input type="date" class="form-control" placeholder="Nama Jenis Berkas" />
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label class="col-sm-3 col-form-label">Tanggal Akhir Pendaftaran</label>
                <div class="col-md-7">
                    <input type="date" class="form-control" placeholder="Nama Jenis Berkas" />
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label class="col-sm-3 col-form-label">Dibuka?</label>
                <div class="col-md-7">
                    <input type="checkbox" />
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label class="col-sm-3 col-form-label">Berbayar?</label>
                <div class="col-md-7">
                    <input type="checkbox" id="berbayarCheckbox" />
                </div>
            </div>

            <div class="mb-3 row d-flex justify-content-center">
                <label class="col-sm-3 col-form-label">Biaya Pendaftaran</label>
                <div class="col-md-7">
                    <div class="input-group">
                        <span class="input-group-text">Rp</span>
                        <input type="text" class="form-control" id="biayaPendaftaran" placeholder="Masukkan Biaya Pendaftaran" disabled />
                    </div>
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label class="col-sm-3 col-form-label">Tanggal Akhir Pembayaran</label>
                <div class="col-md-7">
                    <input type="date" class="form-control" placeholder="Nama Jenis Berkas" />
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label for="status" class="col-sm-3 col-form-label">Jumlah Pilihan Prodi</label>
                <div class="col-md-7">
                <select class="form-select" id="status" v-model="status">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </select>
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label for="namaRuangPerkuliahan" class="col-sm-3 col-form-label">Deskripsi Singkat</label>
                <div class="col-md-7">
                    <input type="text" class="form-control" placeholder="Contoh : periode pendaftaran ini dikhususkan untuk kelas karyawan" />
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label class="col-sm-3 col-form-label">Prodi yang dibuka</label>
                <div class="col-md-7">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="agribisnis">
                        <label class="form-check-label" for="agribisnis">
                            Agribisnis
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="teknikSipil">
                        <label class="form-check-label" for="teknikSipil">
                            Teknik Sipil
                        </label>
                    </div>
                    <!-- Tambahkan lebih banyak checkbox sesuai kebutuhan -->
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label class="col-sm-3 col-form-label">Syarat Berkas</label>
                <div class="col-md-7">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="agribisnis">
                        <label class="form-check-label" for="agribisnis">
                            KTP
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="teknikSipil">
                        <label class="form-check-label" for="teknikSipil">
                            Kartu Keluarga
                        </label>
                    </div>
                    <!-- Tambahkan lebih banyak checkbox sesuai kebutuhan -->
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label class="col-sm-3 col-form-label">Tahap Tes</label>
                <div class="col-md-7">
                    <p><i>*Beri nomor urut tahapan tes. Pilih kosong bila bukan merupakan tahapan tes.</i></p>
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Urutan</th>
                                    <th>Jenis Tes</th>
                                    <th>Tanggal Awal</th>
                                    <th>Tanggal Akhir</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><select class="form-select">
                                        <option value=""></option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                    </select></td>
                                    <td>Test TPA</td>
                                    <td><input type="date" class="form-control datepicker"></td>
                                    <td><input type="date" class="form-control datepicker"></td>
                                </tr>
                                <tr>
                                    <td><select class="form-select">
                                        <option value=""></option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                    </select></td>
                                    <td>Test Kesehatan</td>
                                    <td><input type="date" class="form-control datepicker"></td>
                                    <td><input type="date" class="form-control datepicker"></td>
                                </tr>
                                <!-- Duplicate the <tr> for more entries -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
        </form>
    </div>
</template>