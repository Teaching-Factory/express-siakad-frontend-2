<script setup>
import Swal from 'sweetalert2';
import { ref, onBeforeMount } from 'vue';
import { get, del } from '../../../utiils/request';
import { FilterMatchMode } from 'primevue/api';

const filters = ref({
    global: {
        value: null,
        matchMode: FilterMatchMode.CONTAINS
    },
    kode_sk: {
        value: null,
        matchMode: FilterMatchMode.EQUALS
    },
    nama_sk: {
        value: null,
        matchMode: FilterMatchMode.EQUALS
    }
});

const sistemKuliahs = ref([]);
const message = ref('');

const sistemKuliah = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await get('sistem-kuliah');
        console.log(response.data.data);
        sistemKuliahs.value = response.data.data;
        Swal.close();
    } catch (error) {
        console.error('Gagal mengambil data sistemKuliah:', error);
    }
};

const deleteItem = async (id) => {
    try {
        const response = await del(`sistem-kuliah/${id}/delete`);
        if (response.status === 200) {
            message.value = 'Data berhasil dihapus!';
            // Menghapus item dari array sistemKuliahs yang memiliki id yang sesuai
            // sistemKuliahs.value = sistemKuliahs.value.filter((data) => data.id !== id);
        } else {
            message.value = 'Terjadi kesalahan: ' + response.statusText;
        }
    } catch (error) {
        message.value = 'Terjadi kesalahan: ' + error.message;
    }
};

const confirmDelete = (id) => {
    Swal.fire({
        title: 'Apa Kamu Yakin?',
        text: 'Data ini akan dihapus',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, saya yakin!',
        cancelButtonText: 'Batal',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            deleteItem(id);
            Swal.fire('BERHASIL!', 'Data berhasil dihapus.', 'success');
            sistemKuliahs.value = sistemKuliahs.value.filter((data) => data.id !== id);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('BATAL', 'Data Anda Tidak Jadi Dihapus', 'error');
        }
    });
};

onBeforeMount(() => {
    sistemKuliah();
});
</script>

<template>
    <div class="card">
        <div class="row mb-4">
            <div class="col-12 text-center">
                <h3 class="fw-bold">Selamat Datang, AIDA ANDINAR MAULIDIANA!!</h3>
                <p>Lanjutkan proses pendaftaran dengan mengisi data diri Anda secara lengkap dan melakukan upload berkas.</p>
                <hr>
            </div>
        </div>
        <div class="row mb-4">
            <div class="col-12 d-flex justify-content-center">
                <div class="d-flex justify-content-between w-100" style="max-width: 600px;">
                    <div class="text-center">
                        <router-link to="/biodata-pendaftar" class="d-block">
                            <i class="pi pi-user" style="font-size: 24px;"></i>
                            <p>BIODATA PENDAFTAR</p>
                            <i class="pi pi-check-circle text-success"></i>
                        </router-link>
                    </div>

                    <div class="text-center">
                        <router-link to="/upload-foto" class="d-block">
                            <i class="pi pi-image" style="font-size: 24px;"></i>
                            <p>UPLOAD FOTO</p>
                            <i class="pi pi-check-circle text-success"></i>
                        </router-link>
                    </div>

                    <div class="text-center">
                        <router-link to="/pilihan-prodi" class="d-block">
                            <i class="pi pi-book" style="font-size: 24px;"></i>
                            <p>PROGRAM STUDI</p>
                            <i class="pi pi-check-circle text-success"></i>
                        </router-link>
                    </div>

                    <div class="text-center">
                        <router-link to="/upload-berkas" class="d-block">
                            <i class="pi pi-upload" style="font-size: 24px;"></i>
                            <p>UPLOAD BERKAS</p>
                            <i class="pi pi-check-circle text-success"></i>
                        </router-link>
                    </div>

                    <div class="text-center">
                        <router-link to="/finalisasi-data" class="d-block">
                            <i class="pi pi-file" style="font-size: 24px;"></i>
                            <p>FINALISASI</p>
                            <i class="pi pi-check-circle text-success"></i>
                        </router-link>
                    </div>

                </div>
            </div>
        </div>

        <div class="card">
            <div class="row d-flex">
                <div class="col-lg-2">
                <h6><b>IDENTITAS DIRI</b></h6>
                </div>
            </div>
            <div class="row d-flex mb-3">
                <div class="col-lg-2">
                    <label for="exampleFormControlInput1" class="form-label">Nomor Pendaftaran</label>
                </div>
                <div class="col-lg-4">
                    <label class="form-label">: 4353776787664</label>
                </div>
                <div class="col-lg-2">
                    <label for="exampleFormControlInput1" class="form-label">Nama Lengkap</label>
                </div>
                <div class="col-lg-4">
                    <label class="form-label">: Aida Andinar Maulidiana</label>
                </div>               
            </div>
            <div class="row d-flex mb-3">
                <div class="col-lg-2">
                    <label for="exampleFormControlInput1" class="form-label">Tanggal Daftar</label>
                </div>
                <div class="col-lg-4">
                    <label class="form-label">: 8 Januari 2024</label>
                </div>
                <div class="col-lg-2">
                    <label for="exampleFormControlInput1" class="form-label">Sistem Kuliah</label>
                </div>
                <div class="col-lg-4">
                    <label class="form-label">: Reguler (1)</label>
                </div> 
            </div>
            <div class="row d-flex mb-3">
                <div class="col-lg-2">
                    <label for="exampleFormControlInput1" class="form-label">Periode Pendaftaran</label>
                </div>
                <div class="col-lg-4">
                    <label class="form-label">: 2023/2024 Ganjil</label>
                </div>
                <div class="col-lg-2">
                    <label for="exampleFormControlInput1" class="form-label">Jalur</label>
                </div>
                <div class="col-lg-4">
                    <label class="form-label">: UMUM - Reguler</label>
                </div> 
            </div>
            <div class="row d-flex mb-3">
                <div class="col-lg-2">
                    <label for="exampleFormControlInput1" class="form-label">Pilihan 1</label>
                </div>
                <div class="col-lg-4">
                    <label class="form-label">: Teknologi Rekayasa Perangkat Lunak</label>
                </div>
                <div class="col-lg-2">
                    <label for="exampleFormControlInput1" class="form-label">Pilihan 2</label>
                </div>
                <div class="col-lg-4">
                    <label class="form-label">: Bisnis Digital</label>
                </div>
            </div>
            <div class="row d-flex">
                <div class="col-lg-2">
                <h6><b>LAINNYA</b></h6>
                </div>
            </div>
            <div class="row d-flex mb-3">
                <div class="col-lg-2">
                    <label for="exampleFormControlInput1" class="form-label">Status Pembayaran</label>
                </div>
                <div class="col-lg-10">
                    <label class="form-label">: Tidak ada biaya pembayaran</label>
                </div>               
            </div>
            <div class="row d-flex mb-3">
                <div class="col-lg-2">
                    <label for="exampleFormControlInput1" class="form-label">Seleksi Berkas</label>
                </div>
                <div class="col-lg-10">
                    <label class="form-label">: Anda lulus pada tahap ini</label>
                </div>               
            </div>
            <div class="row d-flex mb-3">
                <div class="col-lg-2">
                    <label for="exampleFormControlInput1" class="form-label">Seleksi Tes dan Kelulusan</label>
                </div>
                <div class="col-lg-10">
                    <label class="form-label">: Belum ditentukan</label>
                </div>               
            </div>
            <div class="row d-flex mb-3">
                <div class="col-lg-2">
                    <label for="exampleFormControlInput1" class="form-label">Diterima pada Program Studi</label>
                </div>
                <div class="col-lg-10">
                    <label class="form-label">: Belum ditentukan</label>
                </div>               
            </div>
            <div class="row d-flex mb-3">
                <div class="col-lg-2">
                    <label for="exampleFormControlInput1" class="form-label">Berkas Tidak Valid</label>
                </div>
                <div class="col-lg-10">
                    <label class="form-label">: 0 Berkas tidak lolos validasi</label>
                </div>               
            </div>
            
        </div>
        <div class="card">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-12">
                    <h6><b>TAGIHAN DAN PEMBAYARAN</b></h6>
                </div>
                <div class="mb-3 row">
                    <div class="col-lg-12 d-flex justify-content-end">
                        <table class="table">
                            <thead class="table-dark">
                                <tr>
                                    <th>No.</th>
                                    <th>Jenis Tagihan</th>
                                    <th>Periode Tagihan</th>
                                    <th>Jumlah Tagihan</th>
                                    <th>Tanggal Akhir Tagihan</th>
                                    <th>Tanggal Lunas</th>
                                    <th>Status Tagihan</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>         
                                    <td>-</td>         
                                    <td>-</td>         
                                    <td>-</td>         
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <hr>
                <table>
                    <tbody>
                        <tr>
                            <td width="30%">Info Tagihan Lunas</td>
                            <td width="10%">:</td>
                            <td width="50%">Rp. 0</td>
                        </tr>
                        <tr>
                            <td>Info Tagihan Belum Bayar</td>
                            <td>:</td>
                            <td>Rp. 0</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="card">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-12">
                    <h6><b>JADWAL DAN HASIL TES</b></h6>
                </div>
                <div class="mb-3 row">
                    <div class="col-lg-12 d-flex justify-content-end">
                        <table class="table">
                            <thead class="table-dark">
                                <tr>
                                    <th>Tahapan Tes</th>
                                    <th>Jenis Tes</th>
                                    <th>Tanggal Tes</th>
                                    <th>Keterangan Tes</th>
                                    <th>Status Kelulusan</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Tes TPA</td>
                                    <td>27 Juni 2022 - 27 Juni 2022</td>
                                    <td>-</td>         
                                    <td>Belum dilakukan penilaian</td>         
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Tes Buta Warna</td>
                                    <td>27 Juni 2022 - 27 Juni 2022</td>
                                    <td>-</td>         
                                    <td>Belum dilakukan penilaian</td>         
                                </tr>
                            </tbody>
                        </table>
                    </div>
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
