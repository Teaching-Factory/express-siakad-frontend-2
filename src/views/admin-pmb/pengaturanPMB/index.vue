<script setup>
import { onMounted } from 'vue';
import { getData } from '../../../utiils/request';
import { ref } from 'vue';
import Swal from 'sweetalert2';
import { getToken } from '../../../service/auth';
import { API_URL } from '../../../config/config';
import axios from 'axios';

//laporanPMB
const jabatans = ref([]);
const laporanPmb = ref([]);
const namaPenandatangan1 = ref('');
const nomorIdentitas1 = ref('');
const namaPenandatangan2 = ref('');
const nomorIdentitas2 = ref('');
const selectedJabatan = ref('');

const getJabatan = async () => {
    try {
        const response = await getData('jabatan');
        jabatans.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data jabatan:', error);
    }
};

const getLaporanPmb = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await getData('laporan-pmb/');
        const data = response.data.data;
        laporanPmb.value = data;

        if (data.length > 0) {
            // Laporan Rekap Pendaftaran PMB
            selectedJabatan.value = data[0].id_jabatan;
            namaPenandatangan1.value = data[0].nama_penandatanganan;
            nomorIdentitas1.value = data[0].nomor_identitas;

            // Laporan Rekap Pembayaran PMB
            selectedJabatan.value = data[1].id_jabatan; // Jabatan bisa disesuaikan jika beda
            namaPenandatangan2.value = data[1].nama_penandatanganan;
            nomorIdentitas2.value = data[1].nomor_identitas;
        }

        Swal.close();
    } catch (error) {
        console.error('Gagal mengambil data :', error);
        Swal.fire('Error', 'Gagal mengambil data', 'error');
    }
};

const updateLaporanPmb = async () => {
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

        const payload = {
            laporan_pmbs: [
                {
                    id_laporanPmb: laporanPmb.value[0]?.id,
                    id_jabatan: selectedJabatan.value,
                    nama_penandatanganan: namaPenandatangan1.value,
                    nomor_identitas: nomorIdentitas1.value
                },
                {
                    id_laporanPmb: laporanPmb.value[1]?.id,
                    id_jabatan: selectedJabatan.value,
                    nama_penandatanganan: namaPenandatangan2.value,
                    nomor_identitas: nomorIdentitas2.value
                }
            ]
        };

        const response = await axios.put(`${API_URL}/laporan-pmb/update-kolektif`, payload, {
            headers: {
                Authorization: token
            }
        });

        Swal.close();
        Swal.fire('BERHASIL!', 'Data berhasil diperbarui.', 'success').then(() => {
            // window.location.href = '';
        });
    } catch (error) {
        Swal.close();
        console.error('Error updating data:', error.response ? error.response.data : error.message);
        Swal.fire('GAGAL', `Gagal memperbarui data: ${error.response ? error.response.data.message : error.message}`, 'error');
    }
};

//contact person
const contact = ref([]);
const nama_cp_pmb = ref('');
const no_wa_cp_pmb = ref('');

const getContact = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await getData('contact-person-pmb/get-cp-pmb-aktif');
        const data = response.data.data;
        contact.value = data;

        nama_cp_pmb.value = data.nama_cp_pmb;
        no_wa_cp_pmb.value = data.no_wa_cp_pmb;

        Swal.close();
    } catch (error) {
        console.error('Gagal mengambil data :', error);
        Swal.fire('Error', 'Gagal mengambil data', 'error');
    }
};

const updateContact = async () => {
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

        const payload = {
            nama_cp_pmb: nama_cp_pmb.value,
            no_wa_cp_pmb: no_wa_cp_pmb.value
        };

        const response = await axios.put(`${API_URL}/contact-person-pmb/update`, payload, {
            headers: {
                Authorization: token
            }
        });

        Swal.close();
        Swal.fire('BERHASIL!', 'Data berhasil diperbarui.', 'success').then(() => {
            // window.location.href = '';
        });
    } catch (error) {
        Swal.close();
        console.error('Error updating data:', error.response ? error.response.data : error.message);
        Swal.fire('GAGAL', `Gagal memperbarui data: ${error.response ? error.response.data.message : error.message}`, 'error');
    }
};

//pengaturan PMB
const pengaturanPmb = ref([]);
const upload_bukti_transfer = ref(false);
const nama_bank = ref('');
const nomor_rekening = ref('');
const nama_pemilik_rekening = ref('');

const getPengaturan = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await getData('pengaturan-pmb/get-pengaturan-pmb-aktif');
        const data = response.data.data;
        pengaturanPmb.value = data;

        upload_bukti_transfer.value = data.upload_bukti_transfer;
        nama_bank.value = data.nama_bank;
        nomor_rekening.value = data.nomor_rekening;
        nama_pemilik_rekening.value = data.nama_pemilik_rekening;

        Swal.close();
    } catch (error) {
        console.error('Gagal mengambil data :', error);
        Swal.fire('Error', 'Gagal mengambil data', 'error');
    }
};

const updatePengaturan = async () => {
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

        const payload = {
            upload_bukti_transfer: upload_bukti_transfer.value,
            nama_bank: nama_bank.value,
            nomor_rekening: nomor_rekening.value,
            nama_pemilik_rekening: nama_pemilik_rekening.value
        };

        const response = await axios.put(`${API_URL}/pengaturan-pmb/update-pengaturan-pmb-aktif`, payload, {
            headers: {
                Authorization: token
            }
        });

        Swal.close();
        Swal.fire('BERHASIL!', 'Data berhasil diperbarui.', 'success').then(() => {
            // window.location.href = '';
        });
    } catch (error) {
        Swal.close();
        console.error('Error updating data:', error.response ? error.response.data : error.message);
        Swal.fire('GAGAL', `Gagal memperbarui data: ${error.response ? error.response.data.message : error.message}`, 'error');
    }
};

onMounted(() => {
    getJabatan();
    getLaporanPmb();
    getContact();
    getPengaturan();
});
</script>

<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="data-user" data-bs-toggle="tab" data-bs-target="#laporanpmb" type="button" role="tab" aria-controls="home" aria-selected="true">Laporan PMB</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="data-wali" data-bs-toggle="tab" data-bs-target="#contactperson" type="button" role="tab" aria-controls="profile" aria-selected="false">Contact Person</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="data-wali" data-bs-toggle="tab" data-bs-target="#pembayaranpmb" type="button" role="tab" aria-controls="profile" aria-selected="false">Pembayaran PMB</button>
                        </li>
                    </ul>

                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="laporanpmb" role="tabpanel" aria-labelledby="data-user">
                            <!-- Laporan PMB -->
                            <div class="mb-3 mt-4 row">
                                <div class="col-lg-12 d-flex justify-content-end">
                                    <div class="flex justify-content-end gap-2">
                                        <button @click="updateLaporanPmb" class="btn btn-primary"><i class="pi pi-check me-2"></i> Simpan</button>
                                        <!-- <button class="btn btn-danger"><i class="pi pi-refresh me-2"></i> Reset</button> -->
                                    </div>
                                </div>
                                <p><b>Laporan Rekap Pendaftaran PMB</b></p>
                                <label for="status" class="col-sm-4 col-form-label">Jabatan</label>
                                <div class="col-md-8">
                                    <select v-model="selectedJabatan" class="form-select" aria-label="Default select example">
                                        <option value="" selected disabled hidden>Pilih Jabatan</option>
                                        <option v-for="jabatan in jabatans" :key="jabatan.id" :value="jabatan.id">{{ jabatan.nama_jabatan }}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="mb-3 mt-2 row">
                                <label for="namaPenandatangan1" class="col-sm-4 col-form-label">Nama Penandatangan</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" v-model="namaPenandatangan1" id="namaPenandatangan1" />
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="nomorIdentitas1" class="col-sm-4 col-form-label">NIDN / NIP</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" v-model="nomorIdentitas1" id="nomorIdentitas1" />
                                </div>
                            </div>

                            <div class="mb-3 mt-4 row">
                                <p><b>Laporan Rekap Pembayaran PMB</b></p>
                                <label for="status2" class="col-sm-4 col-form-label">Jabatan</label>
                                <div class="col-md-8">
                                    <select v-model="selectedJabatan" class="form-select" aria-label="Default select example">
                                        <option value="" selected disabled hidden>Pilih Jabatan</option>
                                        <option v-for="jabatan in jabatans" :key="jabatan.id" :value="jabatan.id">{{ jabatan.nama_jabatan }}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="mb-3 mt-2 row">
                                <label for="namaPenandatangan2" class="col-sm-4 col-form-label">Nama Penandatangan</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" v-model="namaPenandatangan2" id="namaPenandatangan2" />
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="nomorIdentitas2" class="col-sm-4 col-form-label">NIDN / NIP</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" v-model="nomorIdentitas2" id="nomorIdentitas2" />
                                </div>
                            </div>
                        </div>

                        <!-- contact person-->
                        <div class="tab-pane fade" id="contactperson" role="tabpanel" aria-labelledby="data-wali">
                            <div class="mb-3 mt-4 row">
                                <div class="col-lg-12 d-flex justify-content-end">
                                    <div class="flex justify-content-end gap-2">
                                        <button @click="updateContact" class="btn btn-primary"><i class="pi pi-check me-2"></i> Simpan</button>
                                        <!-- <button class="btn btn-danger"><i class="pi pi-refresh me-2"></i> Reset</button> -->
                                    </div>
                                </div>
                                <p><b>Contact Person PMB</b></p>
                                <label for="nama_cp_pmb" class="col-sm-4 col-form-label">Nama Contact Person PMB</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" v-model="nama_cp_pmb" id="nama_cp_pmb" placeholder="contoh : Andi (Telp : 08123456789)" />
                                </div>
                            </div>

                            <div class="mb-3 mt-2 row">
                                <label for="no_wa_cp_pmb" class="col-sm-4 col-form-label">Whatsapp Contact Person PMB</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" v-model="no_wa_cp_pmb" id="no_wa_cp_pmb" placeholder="contoh : 628123456789" />
                                </div>
                            </div>
                        </div>

                        <!-- pembayaran PMB-->
                        <div class="tab-pane fade" id="pembayaranpmb" role="tabpanel" aria-labelledby="data-wali">
                            <div class="mb-3 mt-4 row">
                                <div class="col-lg-12 d-flex justify-content-end">
                                    <div div class="flex justify-content-end gap-2">
                                        <button @click="updatePengaturan" class="btn btn-primary"><i class="pi pi-check me-2"></i> Simpan</button>
                                        <!-- <button class="btn btn-danger"><i class="pi pi-refresh me-2"></i> Reset</button> -->
                                    </div>
                                </div>
                                <p><b>Pembayaran PMB</b></p>
                                <label for="inputPassword" class="col-sm-4 col-form-label">Aktifkan Upload Bukti Transfer PMB</label>
                                <div class="col-sm-8">
                                    <input type="checkbox" v-model="upload_bukti_transfer" />
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-4 col-form-label">Nama BANK</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" v-model="nama_bank" id="inputPassword" placeholder="masukkan nama bank" />
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-4 col-form-label">Nomor Rekening</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" v-model="nomor_rekening" id="inputPassword" placeholder="contoh : 123456789" />
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-4 col-form-label">Nama Pemilik Rekening</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" v-model="nama_pemilik_rekening" id="inputPassword" placeholder="contoh : Andi" />
                                </div>
                            </div>
                        </div>
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
