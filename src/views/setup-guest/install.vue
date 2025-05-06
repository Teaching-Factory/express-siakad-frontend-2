<script setup>
import Swal from 'sweetalert2';
import { computed, ref } from 'vue';
import {
    getFeederAgama,
    getFeederAktivitasMahasiswa,
    getFeederAlatTransportasi,
    getFeederAnggotaAktivitasMahasiswa,
    getFeederBidangMinat,
    getFeederBiodataDosen,
    getFeederBiodataMahasiswa,
    getFeederDataLengkapMahasiswaProdi,
    getFeederDetailKelasKuliah,
    getFeederDetailKurikulum,
    getFeederDetailPeriodePerkuliahan,
    getFeederDosen,
    getFeederDosenPengajar,
    getFeederFakultas,
    getFeederJalurMasuk,
    getFeederJenisAktivitasMahasiswa,
    getFeederJenisEvaluasi,
    getFeederJenisKeluar,
    getFeederJenisPendaftaran,
    getFeederJenisSms,
    getFeederJenisSubtansi,
    getFeederJenisTinggal,
    getFeederJenjangPendidikan,
    getFeederKategoriKegiatan,
    getFeederKebutuhanKhusus,
    getFeederKelasKuliah,
    getFeederKomponenEvaluasi,
    getFeederKonversiKampusMerdeka,
    getFeederKurikulum,
    getFeederLembagaPengangkatan,
    getFeederMahasiswa,
    getFeederMahasiswaBimbinganDosen,
    getFeederMataKuliah,
    getFeederMataKuliahKurikulum,
    getFeederNegara,
    getFeederPangkatGolongan,
    getFeederPekerjaan,
    getFeederPembiayaan,
    getFeederPenghasilan,
    getFeederPenugasanDosen,
    getFeederPerguruanTinggi,
    getFeederPerhitunganSKS,
    getFeederPeriode,
    getFeederPeriodePerkuliahan,
    getFeederProfilePT,
    getFeederProgramStudi,
    getFeederRekapJumlahMahasiswa,
    getFeederRencanaEvaluasi,
    getFeederRiwayatPendidikanMahasiswa,
    getFeederSekolahSMA,
    getFeederSekolahSMK,
    getFeederSemester,
    getFeederSkalaNilaiProdi,
    getFeederStatusKeaktifanPegawai,
    getFeederStatusMahasiswa,
    getFeederSubtansi,
    getFeederSubtansiKuliah,
    getFeederTahunAjaran,
    getFeederUjiMahasiswa,
    getFeederWilayah,
    getFeederMahasiswaLulusDO,
    isAgama,
    isAktivitasMahasiswa,
    isAlatTransportasi,
    isAnggotaAktivitasMahasiswa,
    isBidangMinat,
    isBiodataDosen,
    isBiodataMahasiswa,
    isDataLengkapMahasiswaProdi,
    isDetailKelasKuliah,
    isDetailKurikulum,
    isDetailPeriodePerkuliahan,
    isDosen,
    isDosenPengajar,
    isFakultas,
    isJalurMasuk,
    isJenisAktivitasMahasiswa,
    isJenisEvaluasi,
    isJenisKeluar,
    isJenisPendaftaran,
    isJenisSms,
    isJenisSubtansi,
    isJenisTinggal,
    isJenjangPendidikan,
    isKategoriKegiatan,
    isKebutuhanKhusus,
    isKelasKuliah,
    isKomponenEvaluasi,
    isKonversiKampusMerdeka,
    isKurikulum,
    isLembagaPengangkatan,
    isMahasiswa,
    isMahasiswaBimbinganDosen,
    isMataKuliah,
    isMatakuliahKurikulum,
    isNegara,
    isPangkatGolongan,
    isPekerjaan,
    isPembiayaan,
    isPenghasilan,
    isPenugasanDosen,
    isPerguruanTinggi,
    isPerhitunganSKS,
    isPeriode,
    isPeriodePerkuliahan,
    isProfilePT,
    isProgramStudi,
    isRekapJumlahMahasiswa,
    isRencanaEvaluasi,
    isRiwayatPendidikanMahasiswa,
    isSekolahSMA,
    isSekolahSMK,
    isSemester,
    isSkalaNilaiProdi,
    isStatusKeaktifanPegawai,
    isStatusMahasiswa,
    isSubtansi,
    isSubtansiKuliah,
    isTahunAjaran,
    isUjiMahasiswa,
    isWilayah,
    isMahaiswaLulusDO
} from '../../service/instalasi';

const isLoading = ref(false);
const Installasi = async () => {
    // Swal.fire({
    //     title: 'Loading...',
    //     html: 'Sedang Memuat Data',
    //     allowOutsideClick: false,
    //     didOpen: () => {
    //         Swal.showLoading();
    //     }
    // });

    // document.body.style.pointerEvents = 'none';
    isLoading.value = true;

    try {
        const fetchFunctions = [
            { name: 'Data Agama', data: getFeederAgama, status: () => isAgama },
            { name: 'Data Negara', data: getFeederNegara, status: () => isNegara },
            { name: 'Data Wilayah', data: getFeederWilayah, status: () => isWilayah },
            { name: 'Data Perguruan Tinggi', data: getFeederPerguruanTinggi, status: () => isPerguruanTinggi },
            { name: 'Data Profile PT', data: getFeederProfilePT, status: () => isProfilePT },
            { name: 'Data Jalur Masuk', data: getFeederJalurMasuk, status: () => isJalurMasuk },
            { name: 'Data Jenis Pendaftaran', data: getFeederJenisPendaftaran, status: () => isJenisPendaftaran },
            { name: 'Data Jenis Tinggal', data: getFeederJenisTinggal, status: () => isJenisTinggal },
            { name: 'Data Alat Transportasi', data: getFeederAlatTransportasi, status: () => isAlatTransportasi },
            { name: 'Data Status Mahasiswa', data: getFeederStatusMahasiswa, status: () => isStatusMahasiswa },
            { name: 'Data Kebutuhan Khusus', data: getFeederKebutuhanKhusus, status: () => isKebutuhanKhusus },
            { name: 'Data Penghasilan', data: getFeederPenghasilan, status: () => isPenghasilan },
            { name: 'Data Jenis SMS', data: getFeederJenisSms, status: () => isJenisSms },
            { name: 'Data Lembaga Pengangkatan', data: getFeederLembagaPengangkatan, status: () => isLembagaPengangkatan },
            { name: 'Data Status Keaktifan Pegawai', data: getFeederStatusKeaktifanPegawai, status: () => isStatusKeaktifanPegawai },
            { name: 'Data Pangkat Golongan', data: getFeederPangkatGolongan, status: () => isPangkatGolongan },
            { name: 'Data Pekerjaan', data: getFeederPekerjaan, status: () => isPekerjaan },
            { name: 'Data Dosen', data: getFeederDosen, status: () => isDosen },
            { name: 'Data Biodata Dosen', data: getFeederBiodataDosen, status: () => isBiodataDosen },
            { name: 'Data Jenjang Pendidikan', data: getFeederJenjangPendidikan, status: () => isJenjangPendidikan },
            { name: 'Data Program Studi', data: getFeederProgramStudi, status: () => isProgramStudi },
            { name: 'Data Periode', data: getFeederPeriode, status: () => isPeriode },
            { name: 'Data Jenis Subtansi', data: getFeederJenisSubtansi, status: () => isJenisSubtansi },
            { name: 'Data Subtansi', data: getFeederSubtansi, status: () => isSubtansi },
            { name: 'Data Subtansi Kuliah', data: getFeederSubtansiKuliah, status: () => isSubtansiKuliah },
            { name: 'Data Mata Kuliah', data: getFeederMataKuliah, status: () => isMataKuliah },
            { name: 'Data Tahun Ajaran', data: getFeederTahunAjaran, status: () => isTahunAjaran },
            { name: 'Data Fakultas', data: getFeederFakultas, status: () => isFakultas },
            { name: 'Data Semester', data: getFeederSemester, status: () => isSemester },
            { name: 'Data Kurikulum', data: getFeederKurikulum, status: () => isKurikulum },
            { name: 'Data Detail Kurikulum', data: getFeederDetailKurikulum, status: () => isDetailKurikulum },
            { name: 'Data Penugasan Dosen', data: getFeederPenugasanDosen, status: () => isPenugasanDosen },
            { name: 'Data Matakuliah Kurikulum', data: getFeederMataKuliahKurikulum, status: () => isMatakuliahKurikulum },
            { name: 'Data Kelas Kuliah', data: getFeederKelasKuliah, status: () => isKelasKuliah },
            { name: 'Data Detail Kelas Kuliah', data: getFeederDetailKelasKuliah, status: () => isDetailKelasKuliah },
            { name: 'Data Perhitungan SKS', data: getFeederPerhitunganSKS, status: () => isPerhitunganSKS },
            { name: 'Data Biodata Mahasiswa', data: getFeederBiodataMahasiswa, status: () => isBiodataMahasiswa },
            { name: 'Data Mahasiswa', data: getFeederMahasiswa, status: () => isMahasiswa },
            { name: 'Data Jenis Keluar', data: getFeederJenisKeluar, status: () => isJenisKeluar },
            { name: 'Data Pembiayaan', data: getFeederPembiayaan, status: () => isPembiayaan },
            { name: 'Data Bidang Minat', data: getFeederBidangMinat, status: () => isBidangMinat },
            { name: 'Data Riwayat Pendidikan Mahasiswa', data: getFeederRiwayatPendidikanMahasiswa, status: () => isRiwayatPendidikanMahasiswa },
            { name: 'Data Skala Nilai Prodi', data: getFeederSkalaNilaiProdi, status: () => isSkalaNilaiProdi },
            { name: 'Data Periode Perkuliahan', data: getFeederPeriodePerkuliahan, status: () => isPeriodePerkuliahan },
            { name: 'Data Detail Periode Perkuliahan', data: getFeederDetailPeriodePerkuliahan, status: () => isDetailPeriodePerkuliahan },
            { name: 'Data Jenis Aktivitas Mahasiswa', data: getFeederJenisAktivitasMahasiswa, status: () => isJenisAktivitasMahasiswa },
            { name: 'Data Lengkap Mahasiswa Prodi', data: getFeederDataLengkapMahasiswaProdi, status: () => isDataLengkapMahasiswaProdi },
            { name: 'Data Aktivitas Mahasiswa', data: getFeederAktivitasMahasiswa, status: () => isAktivitasMahasiswa },
            { name: 'Data Anggota Aktivitas Mahasiswa', data: getFeederAnggotaAktivitasMahasiswa, status: () => isAnggotaAktivitasMahasiswa },
            { name: 'Data konversi Kampus Merdeka', data: getFeederKonversiKampusMerdeka, status: () => isKonversiKampusMerdeka },
            { name: 'Data Rekap Jumlah Mahasiswa', data: getFeederRekapJumlahMahasiswa, status: () => isRekapJumlahMahasiswa },
            { name: 'Data Jenis Evaluasi', data: getFeederJenisEvaluasi, status: () => isJenisEvaluasi },
            { name: 'Data Dosen Pengajar', data: getFeederDosenPengajar, status: () => isDosenPengajar },
            { name: 'Data Kategori Kegiatan', data: getFeederKategoriKegiatan, status: () => isKategoriKegiatan },
            { name: 'Data Mahasiswa Bimbingan', data: getFeederMahasiswaBimbinganDosen, status: () => isMahasiswaBimbinganDosen },
            { name: 'Data Uji Mahasiswa', data: getFeederUjiMahasiswa, status: () => isUjiMahasiswa },
            { name: 'Data Sekolah SMK', data: getFeederSekolahSMK, status: () => isSekolahSMK },
            { name: 'Data Sekolah SMA', data: getFeederSekolahSMA, status: () => isSekolahSMA },
            { name: 'Data Rencana Evaluasi', data: getFeederRencanaEvaluasi, status: () => isRencanaEvaluasi },
            { name: 'Data Komponen Evaluasi', data: getFeederKomponenEvaluasi, status: () => isKomponenEvaluasi },
            { name: 'Data Mahasiswa Lulus/DO', data: getFeederMahasiswaLulusDO, status: () => isMahaiswaLulusDO }
        ];

        const results = [];
        for (const fetchFunc of fetchFunctions) {
            // Swal.update({
            //     html: `Sedang Memuat ${fetchFunc.name}...`
            // });

            if (fetchFunc.status()) {
                console.log;
                `${fetchFunc.name} sudah berhasil diambl, melanjutkan ke berikutnya.`;
            } else {
                const response = await fetchFunc.data();

                if (response.status !== 200) {
                    throw new Error(`${fetchFunc.name} gagal dimuat`);
                }

                results.push(response.data);
            }
        }

        // Swal.close();

        Swal.fire({
            icon: 'success',
            title: 'Berhasil',
            text: 'Semua data berhasil dimuat!'
        }).then(() => {
            // Redirect ke halaman berikutnya
            window.location.href = '/setup-guest/get-started/register/settingws/install/next'; // Ganti dengan URL halaman tujuan Anda
        });

        console.log(results);
    } catch (error) {
        Swal.close();
        Swal.fire({
            icon: 'error',
            title: 'Gagal',
            text: `Terjadi kesalahan: ${error.message}`
        });
    } finally {
        isLoading.value = false;
    }
};
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
            <p class="display-6 fw-bold text-dark">
              Langkah Terakhir: Instalasi SIACLOUD
            </p>
            <p class="fs-5 fw-normal text-muted mt-3">
              Selamat! Anda telah mencapai tahap terakhir dalam transformasi
              kampus Anda menjadi kampus digital modern.
            </p>
            <div class="mt-5 mb-4">
              <h5 class="fw-bold text-dark">💡 Apa yang Perlu Dilakukan?</h5>
              <ul class="fs-5 text-muted mt-3 text-start">
                <li>
                  Unduh dan instal sistem SIACLOUD di server atau perangkat yang telah disiapkan.
                </li>
                <li>
                  Ikuti proses instalasi dengan baik untuk memastikan sistem terpasang dengan benar.
                </li>
                <li>
                  Pastikan semua konfigurasi selesai untuk memulai sistem.
                </li>
              </ul>
              <p class="fs-5 mt-3">
                  <b>
                      ⚠️ Jangan Membatalkan Proses Instalasi!
                  </b>
                  <p>
                      Proses ini memerlukan waktu karena melibatkan pengambilan data dalam jumlah besar.
                  </p>
              </p>
            </div>
            <button @click="Installasi" type="button" class="btn btn-outline-primary btn-lg mt-3">
              🚀 INSTALL SEKARANG
            </button>
            
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