<script setup>
import axios from 'axios';
import { FilterMatchMode } from 'primevue/api';
import Swal from 'sweetalert2';
import { onBeforeMount, ref } from 'vue';
import { API_URL } from '../../../../config/config';
import { getToken } from '../../../../service/auth';
import { get, getData } from '../../../../utiils/request';

const angkatans = ref([]);
const prodis = ref([]);
const isLoading = ref(false);
const selectedAngkatan1 = ref('');
const selectedAngkatan2 = ref('');
const selectedAngkatan3 = ref('');
const selectedAngkatan4 = ref('');
const selectedAngkatan5 = ref('');
const selectedAngkatan6 = ref('');
const selectedAngkatan7 = ref('');
const selectedAngkatan8 = ref('');
const selectedAngkatan9 = ref('');
const selectedAngkatan10 = ref('');
const selectedProdi = ref('');

const getAngkatan = async () => {
    try {
        const response = await get('angkatan/');
        angkatans.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data angkatan:', error);
    }
};

const getProdi = async () => {
    try {
        const response = await get('prodi');
        prodis.value = response.data.data;
    } catch (error) {
        console.error('Gagal Mengambil Data Angkatan', error);
    }
};
const getDetaillNilaiPerkuliahan = async () => {
    isLoading.value = true;

    const id_angkatan1 = selectedAngkatan1.value;
    const id_angkatan2 = selectedAngkatan1.value;
    try {
        const response = await get(`api-feeder-update/update-detail-nilai-perkuliahan-kelas?angkatan=${id_angkatan1}&angkatan=${id_angkatan2}`);
        Swal.fire({
            title: 'Berhasil',
            text: 'Data Nilai Perkuliahan telah diperbarui',
            icon: 'success',
            confirmButtonText: 'OK'
        });
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    } finally {
        isLoading.value = false;
    }
};
const getRiwayatNilaiMahasiswa = async () => {
    isLoading.value = true;

    const id_angkatan1 = selectedAngkatan2.value;
    try {
        const response = await get(`api-feeder-update/update-riwayat-nilai-mahasiswa?angkatan=${id_angkatan1}`);
        Swal.fire({
            title: 'Berhasil',
            text: 'Data Nilai Mahasiswa telah diperbarui',
            icon: 'success',
            confirmButtonText: 'OK'
        });
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    } finally {
        isLoading.value = false;
    }
};

const getPesertaKelasKuliah = async () => {
    isLoading.value = true;
    const tahun_angkatan = selectedAngkatan3.value;
    try {
        const response = await get(`api-feeder-update/update-peserta-kelas-kuliah?angkatan=${tahun_angkatan}`);
        Swal.fire({
            title: 'Berhasil',
            text: 'Data Peserta Kelas Kuliah telah diperbarui',
            icon: 'success',
            confirmButtonText: 'OK'
        });
    } catch (error) {
        console.error('Gagal mengambil data :', error);
        Swal.fire({
            title: 'Gagal',
            text: 'Data Peserta Kelas Kuliah gagal diperbarui',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    } finally {
        isLoading.value = false;
    }
};
const getPerkuliahanMahasiswa = async () => {
    isLoading.value = true;
    const tahun_angkatan1 = selectedAngkatan4.value;
    const tahun_angkatan2 = selectedAngkatan4.value;
    try {
        const response = await get(`api-feeder-update/update-perkuliahan-mahasiswa?angkatan=${tahun_angkatan1}&angkatan=${tahun_angkatan2}`);
        Swal.fire({
            title: 'Berhasil',
            text: 'Data Perkuliahan Mahasiswa telah diperbarui',
            icon: 'success',
            confirmButtonText: 'OK'
        });
    } catch (error) {
        console.error('Gagal mengambil data :', error);
        Swal.fire({
            title: 'Gagal',
            text: 'Data Perkuliahan Mahasiswa gagal diperbarui',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    } finally {
        isLoading.value = false;
    }
};

const getDetailPerkuliahanMahasiswa = async () => {
    isLoading.value = true;
    const tahun_angkatan1 = selectedAngkatan5.value;
    const tahun_angkatan2 = selectedAngkatan5.value;
    try {
        const response = await get(`api-feeder-update/update-detail-perkuliahan-mahasiswa?angkatan=${tahun_angkatan1}&angkatan=${tahun_angkatan2}`);
        Swal.fire({
            title: 'Berhasil',
            text: 'Data Detail Perkuliahan Mahasiswa telah diperbarui',
            icon: 'success',
            confirmButtonText: 'OK'
        });
    } catch (error) {
        console.error('Gagal mengambil data :', error);
        Swal.fire({
            title: 'Gagal',
            text: 'Data Detail Perkuliahan Mahasiswa gagal diperbarui',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    } finally {
        isLoading.value = false;
    }
};

const getKrsMahasiswa = async () => {
    isLoading.value = true;
    const tahun_angkatan1 = selectedAngkatan6.value;
    const tahun_angkatan2 = selectedAngkatan6.value;
    try {
        const response = await get(`api-feeder-update/update-krs-mahasiswa?angkatan=${tahun_angkatan1}&angkatan=${tahun_angkatan2}`);
        Swal.fire({
            title: 'Berhasil',
            text: 'Data KRS Mahasiswa telah diperbarui',
            icon: 'success',
            confirmButtonText: 'OK'
        });
    } catch (error) {
        console.error('Gagal mengambil data :', error);
        Swal.fire({
            title: 'Gagal',
            text: 'Data KRS Mahasiswa gagal diperbarui',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    } finally {
        isLoading.value = false;
    }
};

const getAktivitasKulahMahasiswa = async () => {
    isLoading.value = true;
    const tahun_angkatan1 = selectedAngkatan7.value;
    const tahun_angkatan2 = selectedAngkatan7.value;
    try {
        const response = await get(`api-feeder-update/update-aktivitas-kuliah-mahasiswa?angkatan=${tahun_angkatan1}&angkatan=${tahun_angkatan2}`);
        Swal.fire({
            title: 'Berhasil',
            text: 'Data Aktivitas Kuliah Mahasiswa telah diperbarui',
            icon: 'success',
            confirmButtonText: 'OK'
        });
    } catch (error) {
        console.error('Gagal mengambil data :', error);
        Swal.fire({
            title: 'Gagal',
            text: 'Data Aktivitas Kuliah Mahasiswa gagal diperbarui',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    } finally {
        isLoading.value = false;
    }
};

const getRekapKhsMahasiswa = async () => {
    isLoading.value = true;
    const tahun_angkatan1 = selectedAngkatan8.value;
    const tahun_angkatan2 = selectedAngkatan8.value;
    try {
        const response = await get(`api-feeder-update/update-rekap-khs-mahasiswa?angkatan=${tahun_angkatan1}&angkatan=${tahun_angkatan2}`);
        Swal.fire({
            title: 'Berhasil',
            text: 'Data Rekap KHS Mahasiswa telah diperbarui',
            icon: 'success',
            confirmButtonText: 'OK'
        });
    } catch (error) {
        console.error('Gagal mengambil data :', error);
        Swal.fire({
            title: 'Gagal',
            text: 'Data Rekap KHS Mahasiswa gagal diperbarui',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    } finally {
        isLoading.value = false;
    }
};

const getRekapKrsMahasiswa = async () => {
    isLoading.value = true;
    const tahun_angkatan1 = selectedAngkatan9.value;
    const tahun_angkatan2 = selectedAngkatan9.value;
    try {
        const response = await get(`api-feeder-update/update-rekap-krs-mahasiswa?angkatan=${tahun_angkatan1}&angkatan=${tahun_angkatan2}`);
        Swal.fire({
            title: 'Berhasil',
            text: 'Data Rekap KRS Mahasiswa telah diperbarui',
            icon: 'success',
            confirmButtonText: 'OK'
        });
    } catch (error) {
        console.error('Gagal mengambil data :', error);
        Swal.fire({
            title: 'Gagal',
            text: 'Data Rekap KRS Mahasiswa gagal diperbarui',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    } finally {
        isLoading.value = false;
    }
};
const getJumlahMahasiswaKelas = async () => {
    isLoading.value = true;
    const tahun_angkatan1 = selectedAngkatan10.value;
    try {
        const response = await get(`api-feeder-update/update-jumlah-mahasiswa-kelas?angkatan=${tahun_angkatan1}`);
        Swal.fire({
            title: 'Berhasil',
            text: 'Data Jumlah Kuota Kealas telah diperbarui',
            icon: 'success',
            confirmButtonText: 'OK'
        });
    } catch (error) {
        console.error('Gagal mengambil data :', error);
        Swal.fire({
            title: 'Gagal',
            text: 'Data Jumlah Kuota Kelas gagal diperbarui',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    } finally {
        isLoading.value = false;
    }
};
const getMahasiswaLulusDO = async () => {
    isLoading.value = true;
    const id_prodi = selectedProdi.value;
    try {
        const response = await get(`api-feeder-update/update-mahasiswa-lulus-do/${id_prodi}`);
        Swal.fire({
            title: 'Berhasil',
            text: 'Data Mahasiswa Lulus/DO telah diperbarui',
            icon: 'success',
            confirmButtonText: 'OK'
        });
    } catch (error) {
        console.error('Gagal mengambil data :', error);
        Swal.fire({
            title: 'Gagal',
            text: 'Data Mahasiswa Lulus/do gagal diperbarui',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    } finally {
        isLoading.value = false;
    }
};

onBeforeMount(() => {
    getAngkatan();
    getProdi();
});
</script>

<template>
    <div class="card">
        <div v-if="isLoading" class="loading-overlay">
        <div class="spinner"></div>
      </div>
        <h5><i class="pi pi-user me-2"></i>Update Data Perkuliahan</h5>
        <div class="card" style="padding: 0rem 1rem 0rem 1rem">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-12">
                    <h6 class="text-dark">Keterangan :</h6>
                    <p class="lh-1 text-small">
                        <ol>
                            <li>Fitur ini digunakan untuk melakukan Update data Perkuliahan disemua angkatan dari Feeder ke Siakad.</li>
                            <li>Memilih Filter Angkatan </li>
                            <li>Melakukan Klik tombol update untuk memperoleh data yang terbaru</li>
                        </ol>
                    </p>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-12">
                    <h5 class="text-dark">Detail Nilai Perkuliahan</h5>
                </div>
                <div class="col-lg-10 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Pilih Angkatan</label>
                        <select v-model="selectedAngkatan1" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Angkatan</option>
                            <option v-for="angkatan in angkatans" :key="angkatan.tahun" :value="angkatan.tahun">{{ angkatan.tahun }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px">
                    <button @click="getDetaillNilaiPerkuliahan"  class="btn btn-primary btn-block" style="width: 100%">Update</button>
                </div>
            </div>
            <hr />
        </div>
        <div class="card">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-12">
                    <h5 class="text-dark">Riwayat Nilai Mahasiswa</h5>
                </div>
                <div class="col-lg-10 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Pilih Angkatan</label>
                        <select v-model="selectedAngkatan2" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Angkatan</option>
                            <option v-for="angkatan in angkatans" :key="angkatan.id" :value="angkatan.id">{{ angkatan.tahun }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px">
                    <button @click="getRiwayatNilaiMahasiswa"  class="btn btn-primary btn-block" style="width: 100%">Update</button>
                </div>
            </div>
            <hr />
        </div>
        <div class="card">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-12">
                    <h5 class="text-dark">Peserta Kelas Perkuliahan</h5>
                </div>
                <div class="col-lg-10 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Pilih Angkatan</label>
                        <select v-model="selectedAngkatan3" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Angkatan</option>
                            <option v-for="angkatan in angkatans" :key="angkatan.tahun" :value="angkatan.tahun">{{ angkatan.tahun }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px">
                    <button @click="getPesertaKelasKuliah" class="btn btn-primary btn-block" style="width: 100%">Update</button>
                </div>
            </div>
            <hr />
        </div>
        <div class="card">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-12">
                    <h5 class="text-dark">Perkuliahan Mahasiswa</h5>
                </div>
                <div class="col-lg-10 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Pilih Angkatan</label>
                        <select v-model="selectedAngkatan4" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Angkatan</option>
                            <option v-for="angkatan in angkatans" :key="angkatan.tahun" :value="angkatan.tahun">{{ angkatan.tahun }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px">
                    <button @click="getPerkuliahanMahasiswa" class="btn btn-primary btn-block" style="width: 100%">Update</button>
                </div>
            </div>
            <hr />
        </div>
        <div class="card">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-12">
                    <h5 class="text-dark">Detail Perkuliahan Mahasiswa</h5>
                </div>
                <div class="col-lg-10 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Pilih Angkatan</label>
                        <select v-model="selectedAngkatan5" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Angkatan</option>
                            <option v-for="angkatan in angkatans" :key="angkatan.tahun" :value="angkatan.tahun">{{ angkatan.tahun }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px">
                    <button @click="getDetailPerkuliahanMahasiswa" class="btn btn-primary btn-block" style="width: 100%">Update</button>
                </div>
            </div>
            <hr />
        </div>
        <div class="card">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-12">
                    <h5 class="text-dark">KRS Mahasiswa</h5>
                </div>
                <div class="col-lg-10 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Pilih Angkatan</label>
                        <select v-model="selectedAngkatan6" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Angkatan</option>
                            <option v-for="angkatan in angkatans" :key="angkatan.tahun" :value="angkatan.tahun">{{ angkatan.tahun }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px">
                    <button @click="getKrsMahasiswa"  class="btn btn-primary btn-block" style="width: 100%">Update</button>
                </div>
            </div>
            <hr />
        </div>
        <div class="card">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-12">
                    <h5 class="text-dark">Aktivitas Kuliah Mahasiswa</h5>
                </div>
                <div class="col-lg-10 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Pilih Angkatan</label>
                        <select v-model="selectedAngkatan7" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Angkatan</option>
                            <option v-for="angkatan in angkatans" :key="angkatan.tahun" :value="angkatan.tahun">{{ angkatan.tahun }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px">
                    <button @click="getAktivitasKulahMahasiswa" class="btn btn-primary btn-block" style="width: 100%">Update</button>
                </div>
            </div>
            <hr />
        </div>
        <div class="card">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-12">
                    <h5 class="text-dark">Rekap KHS Mahasiswa</h5>
                </div>
                <div class="col-lg-10 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Pilih Angkatan</label>
                        <select v-model="selectedAngkatan8" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Angkatan</option>
                            <option v-for="angkatan in angkatans" :key="angkatan.tahun" :value="angkatan.tahun">{{ angkatan.tahun }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px">
                    <button @click="getRekapKhsMahasiswa"  class="btn btn-primary btn-block" style="width: 100%">Update</button>
                </div>
            </div>
            <hr />
        </div>
        <div class="card">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-12">
                    <h5 class="text-dark">Rekap KRS Mahasiswa</h5>
                </div>
                <div class="col-lg-10 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Pilih Angkatan</label>
                        <select v-model="selectedAngkatan9" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Angkatan</option>
                            <option v-for="angkatan in angkatans" :key="angkatan.tahun" :value="angkatan.tahun">{{ angkatan.tahun }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px">
                    <button @click="getRekapKrsMahasiswa" class="btn btn-primary btn-block" style="width: 100%">Update</button>
                </div>
            </div>
            <hr />
        </div>
        <div class="card">
            <div class="row">
                <div class="col-12 col-md-12 col-lg-12">
                    <h5 class="text-dark">Jumlah Kuota Kelas</h5><span class="text-danger">(*cukup sekali pakai setelah instalasi)</span>
                </div>
                <div class="col-lg-10 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Pilih Angkatan</label>
                        <select v-model="selectedAngkatan10" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Angkatan</option>
                            <option v-for="angkatan in angkatans" :key="angkatan.tahun" :value="angkatan.tahun">{{ angkatan.tahun }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px">
                    <button @click="getJumlahMahasiswaKelas" class="btn btn-primary btn-block" style="width: 100%">Update</button>
                </div>
            </div>
            <hr />
        </div>
        <div class="card">
            <div class="row">
                <div class="col-12 col-md-12 col-lg-12">
                    <h5 class="text-dark">Mahasiswa Lulus/DO</h5>
                </div>
                <div class="col-lg-10 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Pilih Angkatan</label>
                        <select v-model="selectedProdi" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Angkatan</option>
                            <option v-for="prodi in prodis" :key="prodi.id_prodi" :value="prodi.id_prodi">{{ prodi.nama_program_studi }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px">
                    <button @click="getMahasiswaLulusDO" class="btn btn-primary btn-block" style="width: 100%">Update</button>
                </div>
            </div>
            <hr />
        </div>
    </div>
</template>

<style scoped>
.card-theme {
    background-color: rgba(154, 160, 172, 0.5);
}
.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.spinner {
    border: 8px solid #f3f3f3;
    border-top: 8px solid #3498db;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

.content {
    opacity: 1;
    transition: opacity 0.5s;
}
body[style*='pointer-events: none'] .content {
    opacity: 0.5;
}
</style>

<style scoped>
</style>
