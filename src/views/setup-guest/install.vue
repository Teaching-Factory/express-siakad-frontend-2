<script setup>
import Swal from 'sweetalert2';
import { ref } from 'vue';
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
    getFeederWilayah
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
            { name: 'Data Agama', data: getFeederAgama },
            { name: 'Data Negara', data: getFeederNegara },
            { name: 'Data Wilayah', data: getFeederWilayah },
            { name: 'Data Perguruan Tinggi', data: getFeederPerguruanTinggi },
            { name: 'Data Profile PT', data: getFeederProfilePT },
            { name: 'Data Jalur Masuk', data: getFeederJalurMasuk },
            { name: 'Data Jenis Pendaftaran', data: getFeederJenisPendaftaran },
            { name: 'Data Jenis Tinggal', data: getFeederJenisTinggal },
            { name: 'Data Alat Transportasi', data: getFeederAlatTransportasi },
            { name: 'Data Status Mahasiswa', data: getFeederStatusMahasiswa },
            { name: 'Data Kebutuhan Khusus', data: getFeederKebutuhanKhusus },
            { name: 'Data Penghasilan', data: getFeederPenghasilan },
            { name: 'Data Jenis SMS', data: getFeederJenisSms },
            { name: 'Data Lembaga Pengangkatan', data: getFeederLembagaPengangkatan },
            { name: 'Data Status Keaktifan Pegawai', data: getFeederStatusKeaktifanPegawai },
            { name: 'Data Pangkat Golongan', data: getFeederPangkatGolongan },
            { name: 'Data Pekerjaan', data: getFeederPekerjaan },
            { name: 'Data Dosen', data: getFeederDosen },
            { name: 'Data Biodata Dosen', data: getFeederBiodataDosen },
            { name: 'Data Jenjang Pendidikan', data: getFeederJenjangPendidikan },
            { name: 'Data Program Studi', data: getFeederProgramStudi },
            { name: 'Data Periode', data: getFeederPeriode },
            { name: 'Data Jenis Subtansi', data: getFeederJenisSubtansi },
            { name: 'Data Subtansi', data: getFeederSubtansi },
            { name: 'Data Subtansi Kuliah', data: getFeederSubtansiKuliah },
            { name: 'Data Mata Kuliah', data: getFeederMataKuliah },
            { name: 'Data Tahun Ajaran', data: getFeederTahunAjaran },
            { name: 'Data Fakultas', data: getFeederFakultas },
            { name: 'Data Semester', data: getFeederSemester },
            { name: 'Data Kurikulum', data: getFeederKurikulum },
            { name: 'Data Detail Kurikulum', data: getFeederDetailKurikulum },
            { name: 'Data Penugasan Dosen', data: getFeederPenugasanDosen },
            { name: 'Data Matakuliah Kurikulum', data: getFeederMataKuliahKurikulum },
            { name: 'Data Matakuliah Kurikulum', data: getFeederMataKuliahKurikulum },
            { name: 'Data Kelas Kuliah', data: getFeederKelasKuliah },
            { name: 'Data Detail Kelas Kuliah', data: getFeederDetailKelasKuliah },
            { name: 'Data Perhitungan SKS', data: getFeederPerhitunganSKS },
            { name: 'Data Biodata Mahasiswa', data: getFeederBiodataMahasiswa },
            { name: 'Data Mahasiswa', data: getFeederMahasiswa },
            { name: 'Data Jenis Keluar', data: getFeederJenisKeluar },
            { name: 'Data Pembiayaan', data: getFeederPembiayaan },
            { name: 'Data Bidang Minat', data: getFeederBidangMinat },
            { name: 'Data Riwayat Pendidikan Mahasiswa', data: getFeederRiwayatPendidikanMahasiswa },
            { name: 'Data Skala Nilai Prodi', data: getFeederSkalaNilaiProdi },
            { name: 'Data Periode Perkuliahan', data: getFeederPeriodePerkuliahan },
            { name: 'Data Detail Periode Perkuliahan', data: getFeederDetailPeriodePerkuliahan },
            { name: 'Data Jenis Aktivitas Mahasiswa', data: getFeederJenisAktivitasMahasiswa },
            { name: 'Data Lengkap Mahasiswa Prodi', data: getFeederDataLengkapMahasiswaProdi },
            { name: 'Data Aktivitas Mahasiswa', data: getFeederAktivitasMahasiswa },
            { name: 'Data Anggota Aktivitas Mahasiswa', data: getFeederAnggotaAktivitasMahasiswa },
            { name: 'Data konversi Kampus Merdeka', data: getFeederKonversiKampusMerdeka },
            { name: 'Data Rekap Jumlah Mahasiswa', data: getFeederRekapJumlahMahasiswa },
            { name: 'Data Jenis Evaluasi', data: getFeederJenisEvaluasi },
            { name: 'Data Dosen Pengajar', data: getFeederDosenPengajar },
            { name: 'Data Kategori Kegiatan', data: getFeederKategoriKegiatan },
            { name: 'Data Mahasiswa Bimbingan', data: getFeederMahasiswaBimbinganDosen },
            { name: 'Data Uji Mahasiswa', data: getFeederUjiMahasiswa },
            { name: 'Data Sekolah SMK', data: getFeederSekolahSMK },
            { name: 'Data Sekolah SMA', data: getFeederSekolahSMA }
        ];

        const results = [];
        for (const fetchFunc of fetchFunctions) {
            // Swal.update({
            //     html: `Sedang Memuat ${fetchFunc.name}...`
            // });

            const response = await fetchFunc.data();

            if (response.status !== 200) {
                throw new Error(`${fetchFunc.name} gagal dimuat`);
            }

            results.push(response.data);
        }

        // Swal.close();

        Swal.fire({
            icon: 'success',
            title: 'Berhasil',
            text: 'Semua data berhasil dimuat!'
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