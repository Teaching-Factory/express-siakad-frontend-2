<script setup>
import axios from 'axios';
import Swal from 'sweetalert2';
import { ref } from 'vue';
import { API_URL } from '../../../config/config';
import { getToken } from '../../../service/auth';

// Inisialisasi finalisasi dengan ref untuk reaktifitas
const finalisasi = ref(false); // Default false

const submitFinalisasi = async () => {
    if (!finalisasi.value) {
        Swal.fire('PERINGATAN', 'Anda harus menyetujui pernyataan sebelum melanjutkan!', 'warning');
        return;
    }

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
            finalisasi: true // Mengirimkan true sebagai payload
        };

        const response = await axios.put(`${API_URL}/camaba/camaba-aktif/finalisasi`, payload, {
            headers: {
                Authorization: token
            }
        });

        Swal.close();
        Swal.fire('BERHASIL!', 'Data berhasil diperbarui.', 'success').then(() => {
            window.location.href = '/cetak-kartu-ujian'; // Arahkan pengguna setelah sukses
        });
    } catch (error) {
        Swal.close();
        console.error('Error updating data:', error.response ? error.response.data : error.message);
        Swal.fire('GAGAL', `Gagal memperbarui data: ${error.response ? error.response.data.message : error.message}`, 'error');
    }
};
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>FINALISASI DATA PENDAFTAR</h5>
        <div class="card">
            <div class="row">
                <div class="col-md-12">
                    <p>Pastikan anda telah memeriksa kembali semua data yang telah anda masukkan sebelum melakukan finalisasi data</p>
                    <ul>
                        <li>Sebelum melakukan finalisasi data, mohon periksa kembali semua data yang telah Anda masukkan.</li>
                        <li>Setelah anda melakukan finalisasi data, semua data (Identitas, Pilihan Prodi, Foto dan Dokumen) tidak dapat diubah kembali dan dianggap sebagai data yang benar.</li>
                        <li>Apabila ditemukan ketidak sesuaian data yang telah Anda masukkan maka pendaftaran dapat dibatalkan sewaktu-waktu tanpa adanya pemberitahuan.</li>
                    </ul>

                    <div class="form-check my-4">
                        <!-- Gunakan finalisasi.value di v-model -->
                        <input type="checkbox" class="form-check-input" id="confirmCheck" v-model="finalisasi" />
                        <label class="form-check-label" for="confirmCheck"> Saya menyetujui dan menyatakan bahwa semua data yang telah saya isikan adalah BENAR dan dapat dipertanggungjawabkan. </label>
                    </div>
                    <button class="btn btn-primary" @click="submitFinalisasi">Setuju</button>
                </div>
            </div>
        </div>
    </div>
</template>
