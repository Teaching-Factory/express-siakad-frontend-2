<script setup>
import { ref, onBeforeMount } from 'vue';
import { get, getData } from '../../../utiils/request';
import { FilterMatchMode } from 'primevue/api';
import Swal from 'sweetalert2';

const syncDosen = ref([]);

const syncDataDosen = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const response = await getData('sync-feeder/list-dosen');

        if (!response || response.status !== 200) {
            throw new Error();
        }

        const data = response.data;

        syncDosen.value = data;

        Swal.fire('BERHASIL!', 'Data Dosen berhasil disingkron.', 'success').then(() => {
            window.location.href = '/singkron-data';
        });
        Swal.close();
    } catch (error) {
        Swal.close();

        Swal.fire({
            icon: 'error',
            title: 'Gagal!',
            text: 'Gagal mengambil data : ' + (error.message || 'Terjadi Kesalahan '),
            confirmButtonText: 'OK'
        });
    }
};

const syncDataTahunAjaran = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const response = await getData('sync-feeder/tahun-ajaran/');

        if (!response || response.status !== 200) {
            throw new Error();
        }

        // const data = response.data;

        // syncDosen.value = data;

        Swal.fire('BERHASIL!', 'Data Tahun Ajaran berhasil disingkron.', 'success').then(() => {
            window.location.href = '/singkron-data';
        });
        Swal.close();
    } catch (error) {
        Swal.close();

        Swal.fire({
            icon: 'error',
            title: 'Gagal!',
            text: 'Gagal mengambil data : ' + (error.message || 'Terjadi Kesalahan '),
            confirmButtonText: 'OK'
        });
    }
};

const syncDataProdi = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const response = await getData('sync-feeder/prodi/');

        if (!response || response.status !== 200) {
            throw new Error();
        }

        // const data = response.data;

        // syncDosen.value = data;

        Swal.fire('BERHASIL!', 'Data Program Studi berhasil disingkron.', 'success').then(() => {
            window.location.href = '/singkron-data';
        });
        Swal.close();
    } catch (error) {
        Swal.close();

        Swal.fire({
            icon: 'error',
            title: 'Gagal!',
            text: 'Gagal mengambil data : ' + (error.message || 'Terjadi Kesalahan '),
            confirmButtonText: 'OK'
        });
    }
};

const syncDataSubtansi = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const response = await getData('sync-feeder/substansi/');

        if (!response || response.status !== 200) {
            throw new Error();
        }

        // const data = response.data;

        // syncDosen.value = data;

        Swal.fire('BERHASIL!', 'Data Subtansi berhasil disingkron.', 'success').then(() => {
            window.location.href = '/singkron-data';
        });
        Swal.close();
    } catch (error) {
        Swal.close();

        Swal.fire({
            icon: 'error',
            title: 'Gagal!',
            text: 'Gagal mengambil data : ' + (error.message || 'Terjadi Kesalahan '),
            confirmButtonText: 'OK'
        });
    }
};

const syncDataMatakuliah = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const response = await getData('sync-feeder/list-mata-kuliah');

        if (!response || response.status !== 200) {
            throw new Error();
        }

        // const data = response.data;

        // syncDosen.value = data;

        Swal.fire('BERHASIL!', 'Data Matakuliah berhasil disingkron.', 'success').then(() => {
            window.location.href = '/singkron-data';
        });
        Swal.close();
    } catch (error) {
        Swal.close();

        Swal.fire({
            icon: 'error',
            title: 'Gagal!',
            text: 'Gagal mengambil data : ' + (error.message || 'Terjadi Kesalahan '),
            confirmButtonText: 'OK'
        });
    }
};

const syncDataSemester = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const response = await getData('sync-feeder/semester/');

        if (!response || response.status !== 200) {
            throw new Error();
        }

        // const data = response.data;

        // syncDosen.value = data;

        Swal.fire('BERHASIL!', 'Data Semester berhasil disingkron.', 'success').then(() => {
            window.location.href = '/singkron-data';
        });
        Swal.close();
    } catch (error) {
        Swal.close();

        Swal.fire({
            icon: 'error',
            title: 'Gagal!',
            text: 'Gagal mengambil data : ' + (error.message || 'Terjadi Kesalahan '),
            confirmButtonText: 'OK'
        });
    }
};

const syncDataKurikulum = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const response = await getData('sync-feeder/kurikulum/');

        if (!response || response.status !== 200) {
            throw new Error();
        }

        // const data = response.data;

        // syncDosen.value = data;

        Swal.fire('BERHASIL!', 'Data Kurikulum berhasil disingkron.', 'success').then(() => {
            window.location.href = '/singkron-data';
        });
        Swal.close();
    } catch (error) {
        Swal.close();

        Swal.fire({
            icon: 'error',
            title: 'Gagal!',
            text: 'Gagal mengambil data : ' + (error.message || 'Terjadi Kesalahan '),
            confirmButtonText: 'OK'
        });
    }
};
const syncSekolah = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const response = await getData('sync-feeder/sync-sekolah/');

        if (!response || response.status !== 200) {
            throw new Error();
        }

        // const data = response.data;

        // syncDosen.value = data;

        Swal.fire('BERHASIL!', 'Data Sekolah berhasil disingkron.', 'success').then(() => {
            window.location.href = '/singkron-data';
        });
        Swal.close();
    } catch (error) {
        Swal.close();

        Swal.fire({
            icon: 'error',
            title: 'Gagal!',
            text: 'Gagal mengambil data : ' + (error.message || 'Terjadi Kesalahan '),
            confirmButtonText: 'OK'
        });
    }
};
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>SINGKRONISASI DATA</h5>
        <div class="col-lg-12 d-flex justify-content-end">
            <div class="flex justify-content-end gap-2">
                <router-link to="/singkron-data-angkatan" class="btn btn-primary"> Update Data Angkatan </router-link>
            </div>
        </div>
        <div class="row mt-3">
            <div class="mb-3 row">
                <div class="col-lg-12 d-flex justify-content-end">
                    <table class="table">
                        <thead class="table-dark">
                            <tr>
                                <th>No</th>
                                <th>Fitur</th>
                                <th width="50%">Aksi</th>
                                <!-- <th>Upload Data</th> -->
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Dosen</td>
                                <!-- <td>
                                    <button class="btn btn-outline-primary btn-block" style="width: 30%">Get Data</button>
                                </td> -->
                                <td>
                                    <button class="btn btn-outline-primary" @click="syncDataDosen" style="width: 30%"><i class="fa fa-sync-alt"></i>Singkronkan</button>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Tahun Ajaran</td>
                                <!-- <td>
                                    <button class="btn btn-outline-primary btn-block" style="width: 30%">Get Data</button>
                                </td> -->
                                <td>
                                    <button class="btn btn-outline-primary" @click="syncDataTahunAjaran" style="width: 30%"><i class="fa fa-sync-alt"></i>Singkronkan</button>
                                </td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Program Studi</td>
                                <!-- <td>
                                    <button class="btn btn-outline-primary btn-block" style="width: 30%">Get Data</button>
                                </td> -->
                                <td>
                                    <button class="btn btn-outline-primary" @click="syncDataProdi" style="width: 30%"><i class="fa fa-sync-alt"></i>Singkronkan</button>
                                </td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>Subtansi</td>
                                <!-- <td>
                                    <button class="btn btn-outline-primary btn-block" style="width: 30%">Get Data</button>
                                </td> -->
                                <td>
                                    <button class="btn btn-outline-primary" @click="syncDataSubtansi" style="width: 30%"><i class="fa fa-sync-alt"></i>Singkronkan</button>
                                </td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>Matakuliah</td>
                                <!-- <td>
                                    <button class="btn btn-outline-primary btn-block" style="width: 30%">Get Data</button>
                                </td> -->
                                <td>
                                    <button class="btn btn-outline-primary" @click="syncDataMatakuliah" style="width: 30%"><i class="fa fa-sync-alt"></i>Singkronkan</button>
                                </td>
                            </tr>
                            <tr>
                                <td>6</td>
                                <td>Semester</td>
                                <!-- <td>
                                    <button class="btn btn-outline-primary btn-block" style="width: 30%">Get Data</button>
                                </td> -->
                                <td>
                                    <button class="btn btn-outline-primary" @click="syncDataSemester" style="width: 30%"><i class="fa fa-sync-alt"></i>Singkronkan</button>
                                </td>
                            </tr>
                            <tr>
                                <td>7</td>
                                <td>Kurikulum</td>
                                <!-- <td>
                                    <button class="btn btn-outline-primary btn-block" style="width: 30%">Get Data</button>
                                </td> -->
                                <td>
                                    <button class="btn btn-outline-primary" @click="syncDataKurikulum" style="width: 30%"><i class="fa fa-sync-alt"></i>Singkronkan</button>
                                </td>
                            </tr>
                            <tr>
                                <td>8</td>
                                <td>Sekolah</td>
                                <!-- <td>
                                    <button class="btn btn-outline-primary btn-block" style="width: 30%">Get Data</button>
                                </td> -->
                                <td>
                                    <button class="btn btn-outline-primary" @click="syncSekolah" style="width: 30%"><i class="fa fa-sync-alt"></i>Singkronkan</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card-theme {
    background-color: rgba(154, 160, 172, 0.5);
}
</style>

