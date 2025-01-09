<script setup>
import Swal from 'sweetalert2';
import { onBeforeMount, ref } from 'vue';
import { get, getData } from '../../utiils/request';
import {
    getFeederAktivitasKuliahMahasiswa,
    getFeederDetailNilaiPerkuliahan,
    getFeederDetailPerkuliahanMahasiswa,
    getFeederKrsMahasiswa,
    getFeederPesertaKelasKuliah,
    getFeederRekapKhsMahasiswa,
    getFeederRekapKrsMahasiswa,
    getFeederRiwayatNilaiMahasiswa,
    getSeedAdminProdi,
    getSeedContactPerson,
    getSeedDataPelengkap,
    getSeedJabatan,
    getSeedJenisTagihan,
    getSeedLaporanPmb,
    getSeedPengaturanPmb,
    getSeedSettingGlobal,
    getSeedSiacloud,
    getSeedSistemKuliah,
    getSeedSumber,
    getSeedUserGuide,
    isAdminProdi,
    isAktivitasKuliahMahasiswa,
    isContactPerson,
    isDataPelengkap,
    isDetailNilaiPerkuliahan,
    isDetailPerkuliahanMahasiswa,
    isJabatan,
    isJenisTagihan,
    isKrsMahasiswa,
    isLaporanPmb,
    isPengaturanPmb,
    isPesertaKelasKuliah,
    isRekapKhsMahasiswa,
    isRekapKrsMahasiswa,
    isRiwayatNilaiMahasiswa,
    isSettingGlobal,
    isSiacloud,
    isSistemKuliah,
    isSumber,
    isUserGuide
} from '../../service/instalasiByFilter';
import { getSettingGlobal } from '../../utiils/local_storage';

const selectedAngkatan = ref('');
const angkatans = ref([]);

const getAngkatan = async () => {
    try {
        const response = await get('angkatan/');
        angkatans.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};
const isLoading = ref(false);

const installasi = async () => {
    if (!selectedAngkatan.value) {
        Swal.fire({
            icon: 'warning',
            title: 'Pilih Angkatan',
            text: 'Silakan pilih angkatan terlebih dahulu sebelum melanjutkan.'
        });
        return;
    }

    isLoading.value = true;
    const angkatan = selectedAngkatan.value;

    try {
        const fetchFunctions = [
            { name: 'Data Nilai Perkuliahan', data: () => getFeederDetailNilaiPerkuliahan(angkatan), status: isDetailNilaiPerkuliahan },
            { name: 'Data Riwayat Nilai Mahasiswa', data: () => getFeederRiwayatNilaiMahasiswa(angkatan), status: isRiwayatNilaiMahasiswa },
            { name: 'Data Peserta Kelas Kuliah', data: () => getFeederPesertaKelasKuliah(angkatan), status: isPesertaKelasKuliah },
            { name: 'Data Perkuliahan Mahasiswa', data: () => getFeederDetailPerkuliahanMahasiswa(angkatan), status: isDetailPerkuliahanMahasiswa },
            { name: 'Data KRS Mahasiswa', data: () => getFeederKrsMahasiswa(angkatan), status: isKrsMahasiswa },
            { name: 'Data Aktivitas Kuliah Mahasiswa', data: () => getFeederAktivitasKuliahMahasiswa(angkatan), status: isAktivitasKuliahMahasiswa },
            { name: 'Data Rekap KHS Mahasiswa', data: () => getFeederRekapKhsMahasiswa(angkatan), status: isRekapKhsMahasiswa },
            { name: 'Data Rekap KRS Mahasiswa', data: () => getFeederRekapKrsMahasiswa(angkatan), status: isRekapKrsMahasiswa },
            { name: 'Data Jabatan', data: getSeedJabatan, status: isJabatan },
            { name: 'Data Laporan PMB', data: getSeedLaporanPmb, status: isLaporanPmb },
            { name: 'Data Contact Person', data: getSeedContactPerson, status: isContactPerson },
            { name: 'Data Sumber', data: getSeedSumber, status: isSumber },
            { name: 'Data Sistem Kuliah', data: getSeedSistemKuliah, status: isSistemKuliah },
            { name: 'Data User Guide', data: getSeedUserGuide, status: isUserGuide },
            { name: 'Data Pengaturan PMB', data: getSeedPengaturanPmb, status: isPengaturanPmb },
            { name: 'Data Jenis Tagihan', data: getSeedJenisTagihan, status: isJenisTagihan },
            { name: 'Data Setting Global', data: getSeedSettingGlobal, status: isSettingGlobal },
            { name: 'Data Siacloud', data: getSeedSiacloud, status: isSiacloud },
            { name: 'Data Data Pelengkap', data: getSeedDataPelengkap, status: isDataPelengkap },
            { name: 'Data Admin Prodi', data: getSeedAdminProdi, status: isAdminProdi }
        ];

        const results = [];
        for (const fetchFunc of fetchFunctions) {
            if (fetchFunc.status.value) {
                console.log(`${fetchFunc.name} sudah berhasil diambil, melanjutkan ke berikutnya.`);
            } else {
                const response = await fetchFunc.data();
                if (response.status !== 200) {
                    throw new Error(`${fetchFunc.name} gagal dimuat`);
                }
                results.push(response.data);
            }
        }

        Swal.fire({
            icon: 'success',
            title: 'Berhasil',
            text: 'Semua data berhasil dimuat!'
        }).then(() => {
            window.location.href = '/setup-guest/get-started/register/settingws/install/next/setting-semester';
        });

        console.log('Hasil data:', results);
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Gagal',
            text: `Terjadi kesalahan: ${error.message}`
        });
    } finally {
        isLoading.value = false;
    }
};

onBeforeMount(() => {
    getAngkatan();
});
</script>

<template>
    <div class="bg-light">
        <div id="home" class="container-fluid landing-wrapper vh-100">
            <div v-if="isLoading" class="loading-overlay">
                <div class="spinner"></div>
            </div>
            <div
                id="hero"
                class="d-flex flex-column justify-content-center align-items-center px-4 px-lg-5 text-center"
                style="height: 100%; background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, rgb(238, 239, 175) 0%, rgb(195, 227, 250) 100%)"
            >
                <div class="row w-100">
                    <div class="col-lg-7 mx-auto">
                        <p class="display-6 fw-bold text-dark">Langkah Terakhir: Instalasi SIACLOUD</p>
                        <p class="fs-5 fw-normal text-muted mt-3">Selamat! Anda telah mencapai tahap terakhir dalam transformasi kampus Anda menjadi kampus digital modern.</p>
                        <div class="mt-5 mb-4">
                            <h5 class="fw-bold text-dark">💡 Apa yang Perlu Dilakukan?</h5>
                            <ul class="fs-5 text-muted mt-3 text-start">
                                <li>Unduh dan instal sistem SIACLOUD di server atau perangkat yang telah disiapkan.</li>
                                <li>Ikuti proses instalasi dengan baik untuk memastikan sistem terpasang dengan benar.</li>
                                <li>Pilih Angkatan yang akan dilakukan install.</li>
                                <li>Pastikan semua konfigurasi selesai untuk memulai sistem.</li>
                            </ul>
                            <p class="fs-5 mt-3">
                                <b>⚠️ Jangan Membatalkan Proses Instalasi!</b>
                            </p>
                            <p>Proses ini memerlukan waktu karena melibatkan pengambilan data dalam jumlah besar.</p>
                        </div>
                        <!-- Dropdown for selecting Angkatan -->
                        <div class="mb-4">
                            <label for="angkatan" class="form-label fw-bold text-dark">Pilih Angkatan:</label>
                            <select id="angkatan" class="form-select form-select-lg" v-model="selectedAngkatan">
                                <option value="" selected disabled hidden>Pilih Angkatan</option>
                                <option v-for="angkatan in angkatans" :key="angkatan.tahun" :value="angkatan.tahun">
                                    {{ angkatan.tahun }}
                                </option>
                            </select>
                        </div>
                        <button type="button" class="btn btn-outline-primary btn-lg mt-3" @click="installasi">🚀 INSTALL SEKARANG</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
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