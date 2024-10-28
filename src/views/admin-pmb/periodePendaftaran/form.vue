<script setup>
import { get, getData, postData } from '../../../utiils/request'; // Perbaiki typo di 'utils'
import { computed, onBeforeMount, onMounted, ref } from 'vue';
import Swal from 'sweetalert2';

const semesters = ref([]);
const jalurPendaftarans = ref([]);
const sistemKulias = ref([]);
const prodis = ref([]);
const sumbers = ref([]);
const berkass = ref([]);
const tahapTes = ref([]);
const selectedJalur = ref('');
const selectedPeriode = ref('');
const selectedSistemKuliah = ref('');
const selectedProdi = ref([]); // array to hold selected prodi
const selectedBerkas = ref([]); // array to hold selected berkas
const selectedSumber = ref([]); // array to hold selected sumber
const nama_periode_pendaftaran = ref('');
const tanggal_awal_pendaftaran = ref('');
const tanggal_akhir_pendaftaran = ref('');
const dibuka = ref(false);
const berbayar = ref(false);
const biaya_pendaftaran = ref('');
const batas_akhir_pembayaran = ref('');
const jumlah_pilihan_prodi = ref('');
const deskripsi_singkat = ref('');
const konten_informasi = ref('');
const sumber_informasi = ref(false);
const urutan_tes = ref('');
const tanggal_awal_tes = ref('');
const tanggal_akhir_tes = ref('');

const getSemester = async () => {
    try {
        const response = await getData('semester/');
        semesters.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};

const getJalurPendaftaran = async () => {
    try {
        const response = await getData('jalur-masuk/');
        jalurPendaftarans.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};

const getSistemKuliah = async () => {
    try {
        const response = await getData('sistem-kuliah/');
        sistemKulias.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};

const getProdi = async () => {
    try {
        const response = await getData('prodi/');
        prodis.value = response.data.data;

        // Mengisi selectedProdi dengan semua ID prodi yang diambil
        selectedProdi.value = prodis.value.map((prodi) => prodi.id_prodi);
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};

const getSumber = async () => {
    try {
        const response = await getData('sumber/');
        sumbers.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};

const getBerkas = async () => {
    try {
        const response = await getData('jenis-berkas/');
        berkass.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};

const getTahapTes = async () => {
    try {
        const response = await getData('jenis-tes/');
        tahapTes.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};

// Computed property untuk memeriksa apakah sumber harus ditampilkan
const showSumber = computed(() => {
    return sumber_informasi.value === '1'; // Jika "Ya" (1) dipilih, tampilkan sumber
});
const selectAllProdi = () => {
    selectedProdi.value = prodis.value.map((prodi) => prodi.id_prodi);
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

        const tahapTesPayload = tahapTes.value.map((tahap) => ({
            id_jenis_tes: tahap.id, // Mengambil ID jenis tes
            urutan_tes: tahap.urutan_tes,
            tanggal_awal_tes: tahap.tanggal_awal_tes,
            tanggal_akhir_tes: tahap.tanggal_akhir_tes
        }));

        const payload = {
            nama_periode_pendaftaran: nama_periode_pendaftaran.value,
            id_semester: selectedPeriode.value,
            id_jalur_masuk: selectedJalur.value,
            id_sistem_kuliah: selectedSistemKuliah.value,
            tanggal_awal_pendaftaran: tanggal_awal_pendaftaran.value,
            tanggal_akhir_pendaftaran: tanggal_akhir_pendaftaran.value,
            dibuka: dibuka.value,
            berbayar: berbayar.value,
            biaya_pendaftaran: biaya_pendaftaran.value,
            batas_akhir_pembayaran: batas_akhir_pembayaran.value,
            jumlah_pilihan_prodi: jumlah_pilihan_prodi.value,
            deskripsi_singkat: deskripsi_singkat.value,
            konten_informasi: konten_informasi.value,
            sumber_informasi: sumber_informasi.value,
            prodi: selectedProdi.value.map((id) => ({ id_prodi: id })), // map selected prodi
            berkas: selectedBerkas.value.map((id) => ({ id_jenis_berkas: id })), // map selected berkas
            sumber: selectedSumber.value.map((id) => ({ id_sumber: id })),
            tahap_tes: tahapTesPayload // menggunakan payload tahap tes
        };

        const response = await postData(`periode-pendaftaran/create`, payload);

        Swal.close();
        Swal.fire('BERHASIL!', 'Data berhasil diperbarui.', 'success').then(() => {
            window.location.href = '/periode-pendaftaran';
        });
    } catch (error) {
        Swal.close();
        console.error('Error create data:', error.response ? error.response.data : error.message);
        Swal.fire('GAGAL', `Gagal memperbarui data: ${error.response ? error.response.data.message : error.message}`, 'error');
    }
};

onBeforeMount(() => {
    getTahapTes();
    getSumber();
    getSumber();
    getBerkas();
    getProdi();
    getJalurPendaftaran();
    getSistemKuliah();
    getSemester();
    selectAllProdi();
});
</script>

<template>
    <div class="card">
        <form @submit.prevent="create">
            <div class="row">
                <div class="col-lg-4">
                    <h5><i class="pi pi-user me-2"></i> PERIODE PENDAFTARAN</h5>
                </div>
                <div class="col-lg-8 d-flex justify-content-end">
                    <router-link to="/periode-pendaftaran" class="btn btn-dark me-2"><i class="pi pi-list me-2"></i> Kembali</router-link>
                    <button type="submit" class="btn btn-primary me-2"><i class="pi pi-check me-2"></i> Simpan</button>
                    <router-link to="/periode-pendaftaran" class="btn btn-danger"><i class="pi pi-refresh me-2"></i> Batal</router-link>
                </div>
            </div>
            <hr />
            <div class="mb-3 row d-flex justify-content-center">
                <label for="nama" class="col-sm-3 col-form-label">Nama</label>
                <div class="col-md-7">
                    <input type="text" class="form-control" placeholder="Nama Periode Pendaftaran" id="nama" v-model="nama_periode_pendaftaran" />
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label for="status" class="col-sm-3 col-form-label">Periode</label>
                <div class="col-md-7">
                    <select v-model="selectedPeriode" class="form-select" aria-label="Default select example">
                        <option value="" selected disabled hidden>Pilih Periode</option>
                        <option v-for="semester in semesters" :key="semester.id_semester" :value="semester.id_semester">
                            {{ semester.nama_semester }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label for="status" class="col-sm-3 col-form-label">Jalur Pendaftaran</label>
                <div class="col-md-7">
                    <select v-model="selectedJalur" class="form-select" aria-label="Default select example">
                        <option value="" selected disabled hidden>Pilih Periode</option>
                        <option v-for="jalurMasuk in jalurPendaftarans" :key="jalurMasuk.id_jalur_masuk" :value="jalurMasuk.id_jalur_masuk">{{ jalurMasuk.nama_jalur_masuk }}</option>
                    </select>
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label for="status" class="col-sm-3 col-form-label">Sistem Kuliah</label>
                <div class="col-md-7">
                    <select v-model="selectedSistemKuliah" class="form-select" aria-label="Default select example">
                        <option value="" selected disabled hidden>Pilih Sistem Kuliah</option>
                        <option v-for="sistemKuliah in sistemKulias" :key="sistemKuliah.id" :value="sistemKuliah.id">{{ sistemKuliah.nama_sk }}</option>
                    </select>
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label class="col-sm-3 col-form-label">Tanggal Awal Pendaftaran</label>
                <div class="col-md-7">
                    <input type="date" class="form-control" v-model="tanggal_awal_pendaftaran" />
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label class="col-sm-3 col-form-label">Tanggal Akhir Pendaftaran</label>
                <div class="col-md-7">
                    <input type="date" class="form-control" v-model="tanggal_akhir_pendaftaran" />
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label class="col-sm-3 col-form-label">Dibuka?</label>
                <div class="col-md-7">
                    <input type="checkbox" v-model="dibuka" />
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label class="col-sm-3 col-form-label">Berbayar?</label>
                <div class="col-md-7">
                    <input type="checkbox" id="berbayarCheckbox" v-model="berbayar" />
                </div>
            </div>

            <div class="mb-3 row d-flex justify-content-center">
                <label class="col-sm-3 col-form-label">Biaya Pendaftaran</label>
                <div class="col-md-7">
                    <div class="input-group">
                        <span class="input-group-text">Rp</span>
                        <input type="text" class="form-control" id="biayaPendaftaran" placeholder="Masukkan Biaya Pendaftaran" v-model="biaya_pendaftaran" />
                    </div>
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label class="col-sm-3 col-form-label">Tanggal Akhir Pembayaran</label>
                <div class="col-md-7">
                    <input type="date" class="form-control" v-model="batas_akhir_pembayaran" />
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label for="status" class="col-sm-3 col-form-label">Jumlah Pilihan Prodi</label>
                <div class="col-md-7">
                    <select class="form-select" id="status" v-model="jumlah_pilihan_prodi">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
            </div>

            <div class="mb-3 row d-flex justify-content-center">
                <label class="col-sm-3 col-form-label">Prodi yang dibuka</label>
                <div class="col-md-7">
                    <div v-for="prodi in prodis" :key="prodi.id_prodi" class="form-check">
                        <input class="form-check-input" type="checkbox" :id="prodi.nama_program_studi" :value="prodi.id_prodi" v-model="selectedProdi" />
                        <label class="form-check-label" :for="prodi.nama_program_studi">
                            {{ prodi.nama_program_studi }}
                        </label>
                    </div>

                    <!-- Tambahkan lebih banyak checkbox sesuai kebutuhan -->
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label class="col-sm-3 col-form-label">Syarat Berkas</label>
                <div class="col-md-7">
                    <div v-for="berkas in berkass" :key="berkas.id" class="form-check">
                        <input class="form-check-input" type="checkbox" :id="berkas.nama_berkas" :value="berkas.id" v-model="selectedBerkas" />
                        <label class="form-check-label" :for="berkas.nama_berkas">
                            {{ berkas.nama_berkas }}
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
                                <tr v-for="(tahap, index) in tahapTes" :key="index">
                                    <td>
                                        <select class="form-select" v-model="tahap.urutan_tes">
                                            <option value=""></option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    </td>
                                    <td>{{ tahap.nama_tes }}</td>
                                    <td><input type="date" class="form-control datepicker" v-model="tahap.tanggal_awal_tes" /></td>
                                    <td><input type="date" class="form-control datepicker" v-model="tahap.tanggal_akhir_tes" /></td>
                                </tr>
                                <!-- Duplicate the <tr> for more entries -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label for="dedskripsi" class="col-sm-3 col-form-label">Deskripsi Singkat</label>
                <div class="col-md-7">
                    <input type="text" class="form-control" placeholder="Contoh : periode pendaftaran ini dikhususkan untuk kelas karyawan" v-model="deskripsi_singkat" />
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label for="status" class="col-sm-3 col-form-label">Sumber Informasi</label>
                <div class="col-md-7">
                    <select class="form-select" id="status" v-model="sumber_informasi">
                        <option value="0">Tidak</option>
                        <option value="1">Ya</option>
                    </select>
                </div>
            </div>

            <div class="mb-3 row d-flex justify-content-center" v-if="showSumber">
                <!-- Tampilkan hanya jika showSumber true -->
                <label class="col-sm-3 col-form-label">Sumber</label>
                <div class="col-md-7">
                    <div v-for="sumber in sumbers" :key="sumber.id" class="form-check">
                        <input class="form-check-input" type="checkbox" :id="sumber.nama_sumber" :value="sumber.id" v-model="selectedSumber" />
                        <label class="form-check-label" :for="sumber.nama_sumber">
                            {{ sumber.nama_sumber }}
                        </label>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>