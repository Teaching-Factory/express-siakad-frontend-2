<script setup>
import Swal from 'sweetalert2';
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getData } from '../../../../utiils/request';
import Modal from '../../../../components/Modal.vue';
import { getToken } from '../../../../service/auth';
import axios from 'axios';
import { API_URL } from '../../../../config/config';

const route = useRoute();

const detailKelas = ref([]);
const komponenEvaluasis = ref([]);
const show = ref(false);

const getDetailKelas = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const id_detail_kelas_kuliah = route.params.id_detail_kelas_kuliah;
        const response = await getData(`detail-kelas-kuliah/${id_detail_kelas_kuliah}/get`);
        const data = response.data.data;

        detailKelas.value = data;
        console.log('detail : ', data);
        Swal.close();
    } catch (error) {
        console.error('Gagal mengambil data mahasiswa:', error);
        Swal.fire('Gagal', 'Data Mahasiswa tidak ditemukan.', 'warning').then(() => {});
    }
};
const getKomponenEvaluasi = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const id_kelas_kuliah = route.params.id_kelas_kuliah;
        const response = await getData(`komponen-evaluasi-kelas/kelas-kuliah/${id_kelas_kuliah}/get`);
        const data = response.data.data;

        komponenEvaluasis.value = data;
        console.log('komponen : ', data);
        Swal.close();
    } catch (error) {
        console.error('Gagal mengambil data mahasiswa:', error);
        Swal.fire('Gagal', 'Data Mahasiswa tidak ditemukan.', 'warning').then(() => {});
    }
};

const create = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const token = getToken();
        const id_kelas_kuliah = route.params.id_kelas_kuliah || route.query.id_kelas_kuliah;

        if (!komponenEvaluasis.value || komponenEvaluasis.value.length === 0) {
            throw new Error('Data komponenEvaluasis kosong atau tidak tersedia.');
        }

        // Membentuk payload dengan data dari `komponenEvaluasis`
        const payload = {
            komponen_evaluasi_kelas: komponenEvaluasis.value.map((evaluasi) => ({
                nomor_urut: evaluasi.nomor_urut,
                id_jenis_evaluasi: evaluasi.JenisEvaluasi?.id_jenis_evaluasi || null,
                nama: evaluasi.nama_evaluasi || null,
                deskripsi_inggris: evaluasi.deskripsi_inggris || null,
                bobot_evaluasi: parseFloat(evaluasi.bobot_evaluasi) * 100 || 0
            }))
        };

        console.log('Payload:', JSON.stringify(payload, null, 2)); // Logging payload

        const response = await axios.post(`${API_URL}/komponen-evaluasi-kelas/kelas-kuliah/${id_kelas_kuliah}/create`, payload, {
            headers: {
                Authorization: token
            }
        });

        if (!response || !response.data) {
            throw new Error('Respons dari server tidak valid.');
        }

        Swal.close();
        Swal.fire('BERHASIL!', 'Data berhasil diperbarui.', 'success').then(() => {
            window.location.reload();
        });
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        Swal.fire('GAGAL', 'Gagal menambahkan data. Silakan coba lagi.', 'error');
    }
};
const tambahEvaluasi = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const token = getToken();
        const id_kelas_kuliah = route.params.id_kelas_kuliah || route.query.id_kelas_kuliah;

        // Membentuk payload dengan data dari `komponenEvaluasis`
        const payload = {
            komponen_evaluasi_kelas: [
                { nomor_urut: 2, id_jenis_evaluasi: 3, nama: null, bobot_evaluasi: 100, deskripsi_indonesia: '-', nama_inggris: '-' },
                { nomor_urut: 3, id_jenis_evaluasi: 4, nama: null, bobot_evaluasi: 0, deskripsi_indonesia: '-', nama_inggris: '-' },
                { nomor_urut: 4, id_jenis_evaluasi: 4, nama: null, bobot_evaluasi: 0, deskripsi_indonesia: '-', nama_inggris: '-' },
                { nomor_urut: 5, id_jenis_evaluasi: 4, nama: null, bobot_evaluasi: 0, deskripsi_indonesia: '-', nama_inggris: '-' },
                { nomor_urut: 6, id_jenis_evaluasi: 4, nama: null, bobot_evaluasi: 0, deskripsi_indonesia: '-', nama_inggris: '-' }
            ]
        };

        console.log('Payload:', JSON.stringify(payload, null, 2)); // Logging payload

        const response = await axios.post(`${API_URL}/komponen-evaluasi-kelas/kelas-kuliah/${id_kelas_kuliah}/create`, payload, {
            headers: {
                Authorization: token
            }
        });

        if (!response || !response.data) {
            throw new Error('Respons dari server tidak valid.');
        }

        Swal.close();
        Swal.fire('BERHASIL!', 'Data berhasil diperbarui.', 'success').then(() => {
            window.location.reload();
        });
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        Swal.fire('GAGAL', 'Gagal menambahkan data. Silakan coba lagi.', 'error');
    }
};

const copyEvaluasi = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const token = getToken(); // Ambil token dari localStorage atau Vuex
        if (!token) {
            throw new Error('Token tidak ditemukan! Pastikan Anda sudah login.');
        }
        const id_kelas_kuliah = route.params.id_kelas_kuliah || route.query.id_kelas_kuliah;

        console.log(token);

        const response = await axios.post(
            `${API_URL}/komponen-evaluasi-kelas/salin-komponen-evaluasi-kelas/${id_kelas_kuliah}/create`,
            {},
            {
                headers: {
                    Authorization: token
                }
            }
        );

        if (!response || !response.data) {
            throw new Error('Respons dari server tidak valid.');
        }

        Swal.close();
        Swal.fire('BERHASIL!', 'Data berhasil diperbarui.', 'success').then(() => {
            window.location.reload();
        });
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        Swal.fire('GAGAL', 'Gagal menambahkan data. Silakan coba lagi.', 'error');
    }
};

const showModal = () => {
    show.value = true;
};

onBeforeMount(() => {
    getDetailKelas();
    getKomponenEvaluasi();
});
</script>

<template>
    <div class="card" style="border-radius: none !important">
        <h5><i class="pi pi-user me-2"></i>SET KOMPONEN EVALUASI</h5>
        <div class="card">
            <div class="row">
                <div class="col-lg-2">Program Studi</div>
                <div class="col-lg-4"><span class="me-2">:</span> {{ detailKelas?.KelasKuliah?.Prodi?.nama_program_studi || '-' }}</div>
                <div class="col-lg-2">Periode</div>
                <div class="col-lg-4"><span class="me-2">:</span> {{ detailKelas?.KelasKuliah?.Semester?.nama_semester }}</div>
            </div>
            <hr />
            <div class="row">
                <div class="col-lg-2">Mata Kuliah</div>
                <div class="col-lg-4"><span class="me-2">:</span> {{ detailKelas?.KelasKuliah?.MataKuliah?.nama_mata_kuliah }}</div>
                <div class="col-lg-2">Nama Kelas</div>
                <div class="col-lg-4"><span class="me-2"> :</span> {{ detailKelas?.KelasKuliah?.nama_kelas_kuliah || '-' }}</div>
            </div>
            <hr />
            <div class="row">
                <div class="col-lg-2">Dosen Pengajar</div>
                <div class="col-lg-4"><span class="me-2">:</span> {{ detailKelas?.KelasKuliah?.Dosen?.nama_dosen || '-' }}</div>
                <div class="col-lg-2">Ruang dan Waktu Perkuliahan</div>
                <div class="col-lg-4"><span class="me-2"> :</span> {{ detailKelas?.RuangPerkuliahan?.nama_ruang_perkuliahan || '-' }} || {{ detailKelas?.jam_mulai || '-' }} - {{ detailKelas?.jam_selesai || '-' }}</div>
            </div>
            <hr />
            <div class="row">
                <div class="col-lg-2">Lokasi</div>
                <div class="col-lg-4"><span class="me-2">:</span> {{ detailKelas?.RuangPerkuliahan?.lokasi || '-' }}</div>
                <div class="col-lg-2">Kapasitas Peserta Kelas</div>
                <div class="col-lg-4"><span class="me-2"> :</span> {{ detailKelas?.kapasitas || '-' }}</div>
            </div>

            <div class="row mt-5">
                <div class="row mb-2">
                    <div class="col-lg-6">
                        <h5>Komponen Evaluasi</h5>
                    </div>
                    <div class="col-lg-6 text-end">
                        <button @click="showModal" class="btn btn-success"><i class="pi pi-pencil me-2"></i> Edit</button>
                    </div>
                </div>

                <div class="mb-3 row">
                    <div class="col-lg-12 d-flex justify-content-end">
                        <table class="table">
                            <thead class="table-dark">
                                <tr>
                                    <th>Nomor</th>
                                    <th>Basis Evaluasi</th>
                                    <th>Komponen Evaluasi</th>
                                    <th>Deskripsi</th>
                                    <th>Bobot(%)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(komponenEvaluasi, mIndex) in komponenEvaluasis" :key="mIndex">
                                    <td>{{ komponenEvaluasi.nomor_urut }}</td>
                                    <td>{{ komponenEvaluasi.JenisEvaluasi.nama_jenis_evaluasi }}</td>
                                    <td>{{ komponenEvaluasi.nama || '-' }}</td>
                                    <td>{{ komponenEvaluasi.nama_inggris || '-' }}</td>
                                    <td>{{ (parseFloat(komponenEvaluasi.bobot_evaluasi || 0) * 100).toFixed(0) }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Modal :show="show" @close="show = false" title="KOMPONEN EVALUASI">
                <div class="row mb-2">
                    <div class="col-lg-8">
                        <h5>Komponen Evaluasi</h5>
                    </div>

                    <div class="col-lg-4 text-end">
                        <tr v-if="!komponenEvaluasis || komponenEvaluasis.length === 1">
                            <td colspan="6">
                                <button @click="tambahEvaluasi" class="btn btn-success text-end me-2"><i class="pi pi-plus me-2"></i> Tambah Evaluasi</button>
                            </td>
                        </tr>
                        <button @click="create" class="btn btn-primary"><i class="pi pi-check me-2"></i> Simpan</button>
                    </div>
                </div>
                <div class="mb-3 mt-5 row">
                    <div class="col-lg-12 d-flex justify-content-end">
                        <table class="table">
                            <thead class="table-dark">
                                <tr>
                                    <th>Nomor</th>
                                    <th>Basis Evaluasi</th>
                                    <th>Komponen Evaluasi</th>
                                    <th>Deskripsi Inggris</th>

                                    <th>Bobot(%)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- Jika komponenEvaluasis kosong, tampilkan baris kosong untuk input -->
                                <tr v-if="!komponenEvaluasis || komponenEvaluasis.length === 0">
                                    <td colspan="6" class="text-center">
                                        <button class="btn btn-primary" @click="copyEvaluasi">Copy Evaluasi</button>
                                    </td>
                                </tr>

                                <!-- Jika komponenEvaluasis ada data, tampilkan tabel -->
                                <tr v-for="(evaluasi, index) in komponenEvaluasis" :key="index">
                                    <td>
                                        <input type="text" class="form-control" v-model="evaluasi.nomor_urut" style="width: 50px" disabled />
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" v-model="evaluasi.JenisEvaluasi.nama_jenis_evaluasi" disabled />
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" v-model="evaluasi.nama" />
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" v-model="evaluasi.nama_inggris" />
                                    </td>

                                    <input type="text" class="form-control" :value="(parseFloat(evaluasi.bobot_evaluasi || 0) * 100).toFixed(0)" @input="evaluasi.bobot_evaluasi = parseFloat($event.target.value) / 100 || 0" style="width: 80px" />
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Modal>
        </div>
    </div>
</template>

<style scoped>
.card-theme {
    background-color: rgba(154, 160, 172, 0.5);
}
</style>
