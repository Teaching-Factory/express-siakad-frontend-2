<script setup>
import { ref, onBeforeMount } from 'vue';
import { get, getData } from '../../../utiils/request';
import { FilterMatchMode } from 'primevue/api';
import Swal from 'sweetalert2';

const sync = ref([]);

const syncDataDosen = async () => {
    // Menampilkan tampilan loading

    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        // Melakukan permintaan GET untuk mengambil data
        const response = await getData('sync-feeder/list-dosen');

        // Cek apakah respon tidak berhasil (misalnya, status selain 2xx)
        if (!response || response.status !== 200) {
            // Lempar error jika status bukan 200 (berhasil)
            throw new Error();
        }

        const data = response.data;

        // Menyimpan data yang diterima
        sync.value = data;
        console.log('message', data);

        // Menampilkan pesan berhasil setelah menutup loading
        Swal.close();
        Swal.fire('BERHASIL!', 'Data berhasil diperbarui.', 'success').then(() => {
            window.location.href = '/singkron-data'; // Arahkan pengguna setelah sukses
        });
    } catch (error) {
        // Menutup tampilan loading jika terjadi error
        Swal.close();

        // Menampilkan pesan error yang diterima
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
        <div class="row">
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
                                    <button class="btn btn-outline-warning" @click="syncDataDosen" style="width: 30%"><i class="fa fa-sync-alt"></i>Singkronkan</button>
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

