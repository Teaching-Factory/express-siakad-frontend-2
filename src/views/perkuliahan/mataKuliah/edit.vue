<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { get, getData, postData } from '../../../utiils/request';
import Modal from '../../../components/modal.vue';
import { getToken } from '../../../service/auth';
import { API_URL } from '../../../config/config';
import axios from 'axios';
import Swal from 'sweetalert2';

const rencanaEvaluasis = ref([]);
const prodis = ref([]);
const jenis_evaluasis = ref([]);
const show = ref(false);
const route = useRoute();

//matakuliah
const nama_mata_kuliah = ref('');
const kode_mata_kuliah = ref('');
const prodi = ref('');
const jenis_mk = ref('');
const kel_mk = ref('');
const sks_mata_kuliah = ref('');
const sks_tatap_muka = ref('');
const sks_praktek_lapangan = ref('');
const sks_simulasi = ref();
const metode_kuliah = ref('');
const tanggal_mulai_efektif = ref('');
const tanggal_selesai_efektif = ref('');

//rencana evaluasi
const id_jenis_evaluasi = ref('');
const nomor_urut = ref('');
const nama_evaluasi = ref('');
const bobot_evaluasi = ref('');
const deskripsi_indonesia = ref('');
const deskripsi_inggris = ref('');

const getProdi = async () => {
    try {
        const response = await getData('prodi');
        prodis.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data prodi:', error);
    }
};
const getJenisEvaluasi = async () => {
    try {
        const response = await getData('jenis-evaluasi/');
        prodis.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data:', error);
    }
};

const getRencanaEvaluasi = async (id_matkul) => {
    try {
        const response = await getData(`rencana-evaluasi/mata-kuliah/${id_matkul}/get`);
        const data = response.data.data;

        rencanaEvaluasis.value = data; // Simpan array evaluasi
        console.log('Rencana Evaluasi:', rencanaEvaluasis.value);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
const getMataKuliah = async (id_matkul) => {
    try {
        const response = await getData(`mata-kuliah/${id_matkul}/get`);
        const matkul = response.data.data;

        nama_mata_kuliah.value = matkul.nama_mata_kuliah;
        kode_mata_kuliah.value = matkul.kode_mata_kuliah;
        prodi.value = matkul.Prodi.nama_program_studi;
        jenis_mk.value = matkul.jenis_mk;
        kel_mk.value = matkul.kel_mk;
        sks_mata_kuliah.value = matkul.sks_mata_kuliah;
        sks_tatap_muka.value = matkul.sks_tatap_muka;
        sks_praktek_lapangan.value = matkul.sks_praktek_lapangan;
        sks_simulasi.value = matkul.sks_simulasi;
        metode_kuliah.value = matkul.metode_kuliah;
        tanggal_mulai_efektif.value = matkul.tanggal_mulai_efektif;
        tanggal_selesai_efektif.value = matkul.tanggal_selesai_efektif;
    } catch (error) {
        console.error('Error fetching data:', error);
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
        const id_matkul = route.params.id_matkul || route.query.id_matkul;

        if (!rencanaEvaluasis.value || rencanaEvaluasis.value.length === 0) {
            throw new Error('Data rencanaEvaluasis kosong atau tidak tersedia.');
        }

        // Membentuk payload dengan data dari `rencanaEvaluasis`
        const payload = {
            rencana_evaluasis: rencanaEvaluasis.value.map((evaluasi) => ({
                nomor_urut: evaluasi.nomor_urut,
                id_jenis_evaluasi: evaluasi.JenisEvaluasi?.id_jenis_evaluasi || null,
                nama_evaluasi: evaluasi.nama_evaluasi || null,
                bobot_evaluasi: parseFloat(evaluasi.bobot_evaluasi) || 0,
                deskripsi_indonesia: evaluasi.deskripsi_indonesia || null,
                deskripsi_inggris: evaluasi.deskripsi_inggris || null
            }))
        };

        console.log('Payload:', JSON.stringify(payload, null, 2)); // Logging payload

        const response = await axios.post(`${API_URL}/rencana-evaluasi/mata-kuliah/${id_matkul}/create`, payload, {
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
        const id_matkul = route.params.id_matkul || route.query.id_matkul;

        // Menggunakan payload statis
        const payload = {
            rencana_evaluasis: [
                { nomor_urut: 1, id_jenis_evaluasi: 2, nama_evaluasi: null, bobot_evaluasi: 100, deskripsi_indonesia: '-', deskripsi_inggris: null },
                { nomor_urut: 2, id_jenis_evaluasi: 3, nama_evaluasi: null, bobot_evaluasi: 0, deskripsi_indonesia: '-', deskripsi_inggris: null },
                { nomor_urut: 3, id_jenis_evaluasi: 4, nama_evaluasi: null, bobot_evaluasi: 0, deskripsi_indonesia: '-', deskripsi_inggris: null },
                { nomor_urut: 4, id_jenis_evaluasi: 4, nama_evaluasi: null, bobot_evaluasi: 0, deskripsi_indonesia: '-', deskripsi_inggris: null },
                { nomor_urut: 5, id_jenis_evaluasi: 4, nama_evaluasi: null, bobot_evaluasi: 0, deskripsi_indonesia: '-', deskripsi_inggris: null },
                { nomor_urut: 6, id_jenis_evaluasi: 4, nama_evaluasi: null, bobot_evaluasi: 0, deskripsi_indonesia: '-', deskripsi_inggris: null }
            ]
        };

        console.log('Payload:', JSON.stringify(payload, null, 2));

        const response = await axios.post(`${API_URL}/rencana-evaluasi/mata-kuliah/${id_matkul}/create`, payload, {
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

const showModal = () => {
    show.value = true;
};

onBeforeMount(() => {
    const route = useRoute();
    const id_matkul = route.params.id_matkul;
    if (id_matkul) {
        getRencanaEvaluasi(id_matkul);
        getMataKuliah(id_matkul);
    }
    getProdi();
    getJenisEvaluasi();
});
</script>

<template>
    <div class="card">
        <div class="card-body">
            <div class="row mb-2">
                <div class="col-lg-6">
                    <h5><i class="pi pi-user me-2"></i>MATA KULIAH</h5>
                </div>
                <div class="col-lg-6 text-end">
                    <router-link to="/mata-kuliah" class="btn btn-dark me-2"><i class="pi pi-list me-2"></i> Kembali</router-link>
                </div>
            </div>
            <hr />
            <div class="mb-3 row">
                <div class="col-lg-6 col-md-6 col-sm-6">
                    <label for="exampleFormControlInput1" class="form-label">Kode Mata Kuliah</label>
                    <input type="text" class="form-control" id="kode_mata_kuliah" v-model="kode_mata_kuliah" disabled />
                    <label for="exampleFormControlInput1" class="form-label">Program Studi Pengampu</label>
                    <input type="text" class="form-control" id="kode_mata_kuliah" v-model="prodi" disabled />
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6">
                    <label for="exampleFormControlInput1" class="form-label">Nama Mata Kuliah</label>
                    <input type="text" class="form-control" id="nama_mata_kuliah" v-model="nama_mata_kuliah" disabled />
                    <label for="exampleFormControlInput1" class="form-label">Jenis Mata Kuliah</label>
                    <input type="text" class="form-control" id="jenis_mk" v-model="jenis_mk" disabled />
                </div>
            </div>
            <div class="mb-3 row">
                <div class="col-lg-6 col-md-6 col-sm-6">
                    <label for="exampleFormControlInput1" class="form-label">Bobot Mata Kuliah</label>
                    <input type="text" class="form-control" id="sks_mata_kuliah" v-model="sks_mata_kuliah" disabled />
                    <label for="exampleFormControlInput1" class="form-label">Bobot Praktikum</label>
                    <input type="text" class="form-control" id="sks_praktikum" disabled />
                    <label for="exampleFormControlInput1" class="form-label">Bobot Simulasi</label>
                    <input type="text" class="form-control" id="sks_simulasi" v-model="sks_simulasi" disabled />
                    <label for="exampleFormControlInput1" class="form-label">Tanggal Mulai Efektif</label>
                    <input type="date" class="form-control" id="tanggal_mulai_efektif" v-model="tanggal_mulai_efektif" disabled />
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6">
                    <label for="exampleFormControlInput1" class="form-label">Bobot Tatap Muka</label>
                    <input type="text" class="form-control" id="sks_tatap_muka" v-model="sks_tatap_muka" disabled />
                    <label for="exampleFormControlInput1" class="form-label">Bobot Praktik Lapangan</label>
                    <input type="text" class="form-control" id="sks_praktik_lapangan" v-model="sks_praktek_lapangan" disabled />
                    <label for="exampleFormControlInput1" class="form-label">Metode Pembelajaran</label>
                    <input type="text" class="form-control" id="metode_kuliah" v-model="metode_kuliah" disabled />
                    <label for="exampleFormControlInput1" class="form-label">Tanggal Akhir Efektif</label>
                    <input type="date" class="form-control" id="tanggal_akhir_efektif" v-model="tanggal_selesai_efektif" disabled />
                </div>
            </div>
        </div>

        <hr style="margin: 0" />
        <div class="row">
            <div class="row mb-2">
                <div class="col-lg-6">
                    <h5><i class="pi pi-user me-2"></i>Rencana Evaluasi</h5>
                </div>
                <div class="col-lg-6 text-end">
                    <button @click="showModal" class="btn btn-success"><i class="pi pi-pencil me-2"></i> Edit</button>
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
                                <th>Deskripsi</th>
                                <th>Bobot(%)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(rencanaEvaluasi, mIndex) in rencanaEvaluasis" :key="mIndex">
                                <td>{{ rencanaEvaluasi.nomor_urut }}</td>
                                <td>{{ rencanaEvaluasi.JenisEvaluasi.nama_jenis_evaluasi }}</td>
                                <td>{{ rencanaEvaluasi.nama_evaluasi || '-' }}</td>
                                <td>{{ rencanaEvaluasi.deskripsi_indonesia || '-' }}</td>
                                <td>{{ parseFloat(rencanaEvaluasi?.bobot_evaluasi).toFixed(0) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <Modal :show="show" @close="show = false" title="RENCANA EVALUASI">
            <div class="row mb-2">
                <div class="col-lg-6">
                    <h5>Rencana Evaluasi</h5>
                </div>
                <div class="col-lg-6 text-end">
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
                                <th>Deskripsi Indonesia</th>
                                <th>Deskripsi Inggris</th>
                                <th>Bobot(%)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- Jika rencanaEvaluasis kosong, tampilkan baris kosong untuk input -->
                            <tr v-if="!rencanaEvaluasis || rencanaEvaluasis.length === 0">
                                <td colspan="6" class="text-center">
                                    <button class="btn btn-primary" @click="tambahEvaluasi">Tambah Evaluasi</button>
                                </td>
                            </tr>

                            <!-- Jika rencanaEvaluasis ada data, tampilkan tabel -->
                            <tr v-for="(evaluasi, index) in rencanaEvaluasis" :key="index">
                                <td>
                                    <input type="text" class="form-control" v-model="evaluasi.nomor_urut" style="width: 50px" disabled />
                                </td>
                                <td>
                                    <input type="text" class="form-control" v-model="evaluasi.JenisEvaluasi.nama_jenis_evaluasi" disabled />
                                </td>
                                <td>
                                    <input type="text" class="form-control" v-model="evaluasi.nama_evaluasi" required />
                                </td>
                                <td>
                                    <input type="text" class="form-control" v-model="evaluasi.deskripsi_indonesia" required />
                                </td>
                                <td>
                                    <input type="text" class="form-control" v-model="evaluasi.deskripsi_inggris" required />
                                </td>
                                <td>
                                    <input type="number" class="form-control" :value="parseFloat(evaluasi.bobot_evaluasi || 0).toFixed(0)" @input="handleBobotInput($event, evaluasi)" style="width: 80px" min="0" max="100" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Modal>
        <hr style="margin-top: -5px" />
    </div>
</template>