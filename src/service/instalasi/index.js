import { getData } from '../../utiils/request';

export let isAgama = false;
export let isNegara = false;
export let isWilayah = false;
export let isPerguruanTinggi = false;
export let isJalurMasuk = false;
export let isJenisPendaftaran = false;
export let isJenisTinggal = false;
export let isAlatTransportasi = false;
export let isProfilePT = false;
export let isStatusMahasiswa = false;
export let isKebutuhanKhusus = false;
export let isPenghasilan = false;
export let isJenisSms = false;
export let isLembagaPengangkatan = false;
export let isStatusKeaktifanPegawai = false;
export let isPangkatGolongan = false;
export let isPekerjaan = false;
export let isDosen = false;
export let isBiodataDosen = false;
export let isJenjangPendidikan = false;
export let isProgramStudi = false;
export let isPeriode = false;
export let isJenisSubtansi = false;
export let isSubtansi = false;
export let isSubtansiKuliah = false;
export let isMataKuliah = false;
export let isTahunAjaran = false;
export let isFakultas = false;
export let isSemester = false;
export let isKurikulum = false;
export let isDetailKurikulum = false;
export let isPenugasanDosen = false;
export let isMatakuliahKurikulum = false;
export let isKelasKuliah = false;
export let isDetailKelasKuliah = false;
export let isPerhitunganSKS = false;
export let isBiodataMahasiswa = false;
export let isMahasiswa = false;
export let isJenisKeluar = false;
export let isPembiayaan = false;
export let isBidangMinat = false;
export let isRiwayatPendidikanMahasiswa = false;
export let isSkalaNilaiProdi = false;
export let isPeriodePerkuliahan = false;
export let isDetailPeriodePerkuliahan = false;
export let isJenisAktivitasMahasiswa = false;
export let isDataLengkapMahasiswaProdi = false;
export let isAktivitasMahasiswa = false;
export let isAnggotaAktivitasMahasiswa = false;
export let isKonversiKampusMerdeka = false;
export let isRekapJumlahMahasiswa = false;
export let isJenisEvaluasi = false;
export let isDosenPengajar = false;
export let isKategoriKegiatan = false;
export let isMahasiswaBimbinganDosen = false;
export let isUjiMahasiswa = false;
export let isSekolahSMK = false;
export let isSekolahSMA = false;

export const getFeederAgama = async () => {
    try {
        const res = await getData(`api-feeder/get-agama`);
        isAgama = true;
        return res;
    } catch (err) {
        throw err;
    }
};

export const getFeederNegara = async () => {
    try {
        const res = await getData(`api-feeder/get-negara`);
        isNegara = true;
        return res;
    } catch (err) {
        throw err;
    }
};

export const getFeederWilayah = async () => {
    try {
        const res = await getData(`api-feeder/get-wilayah`);
        isWilayah = true;
        return res;
    } catch (err) {
        throw err;
    }
};

export const getFeederPerguruanTinggi = async () => {
    try {
        const res = await getData(`api-feeder/get-all-pt`);
        isPerguruanTinggi = true;
        return res;
    } catch (err) {
        throw err;
    }
};

export const getFeederProfilePT = async () => {
    try {
        const res = await getData(`api-feeder/get-profil-pt`);
        isProfilePT = true;
        return res;
    } catch (err) {
        throw err;
    }
};

export const getFeederJalurMasuk = async () => {
    try {
        const res = await getData(`api-feeder/get-jalur-masuk`);
        isJalurMasuk = true;
        return res;
    } catch (err) {
        throw err;
    }
};

export const getFeederJenisPendaftaran = async () => {
    try {
        const res = await getData(`api-feeder/get-jenis-pendaftaran`);
        isJenisPendaftaran = true;
        return res;
    } catch (err) {
        throw err;
    }
};

export const getFeederJenisTinggal = async () => {
    try {
        const res = await getData(`api-feeder/get-jenis-tinggal`);
        isJenisTinggal = true;
        return res;
    } catch (err) {
        throw err;
    }
};

export const getFeederAlatTransportasi = async () => {
    try {
        const res = await getData(`api-feeder/get-alat-transportasi`);
        isAlatTransportasi = true;
        return res;
    } catch (err) {
        throw err;
    }
};

export const getFeederStatusMahasiswa = async () => {
    try {
        const res = await getData(`api-feeder/get-status-mahasiswa`);
        isStatusMahasiswa = true;
        return res;
    } catch (err) {
        throw err;
    }
};

export const getFeederKebutuhanKhusus = async () => {
    try {
        const res = await getData(`api-feeder/get-kebutuhan-khusus`);
        isKebutuhanKhusus = true;
        return res;
    } catch (err) {
        throw err;
    }
};

export const getFeederPenghasilan = async () => {
    try {
        const res = await getData(`api-feeder/get-penghasilan`);
        isPenghasilan = true;
        return res;
    } catch (err) {
        throw err;
    }
};

export const getFeederJenisSms = async () => {
    try {
        const res = await getData(`api-feeder/get-jenis-sms`);
        isJenisSms = true;
        return res;
    } catch (err) {
        throw err;
    }
};

export const getFeederLembagaPengangkatan = async () => {
    try {
        const res = await getData(`api-feeder/get-lembaga-pengangkatan`);
        isLembagaPengangkatan = true;
        return res;
    } catch (err) {
        throw err;
    }
};

export const getFeederStatusKeaktifanPegawai = async () => {
    try {
        const res = await getData(`api-feeder/get-status-keaktifan-pegawai`);
        isStatusKeaktifanPegawai = true;
        return res;
    } catch (err) {
        throw err;
    }
};

export const getFeederPangkatGolongan = async () => {
    try {
        const res = await getData(`api-feeder/get-pangkat-golongan`);
        isPangkatGolongan = true;
        return res;
    } catch (err) {
        throw err;
    }
};

export const getFeederPekerjaan = async () => {
    try {
        const res = await getData(`api-feeder/get-pekerjaan`);
        isPekerjaan = true;
        return res;
    } catch (err) {
        throw err;
    }
};

export const getFeederDosen = async () => {
    try {
        const res = await getData(`api-feeder/get-dosen`);
        isDosen = true;
        return res;
    } catch (err) {
        throw err;
    }
};

export const getFeederBiodataDosen = async () => {
    try {
        const res = await getData(`api-feeder/get-biodata-dosen`);
        isBiodataDosen = true;
        return res;
    } catch (err) {
        throw err;
    }
};

export const getFeederJenjangPendidikan = async () => {
    try {
        const res = await getData(`api-feeder/get-jenjang-pendidikan`);
        isJenjangPendidikan = true;
        return res;
    } catch (err) {
        throw err;
    }
};

export const getFeederProgramStudi = async () => {
    try {
        const res = await getData(`api-feeder/get-prodi`);
        isProgramStudi = true;
        return res;
    } catch (err) {
        throw err;
    }
};

export const getFeederPeriode = async () => {
    try {
        const res = await getData(`api-feeder/get-periode`);
        isPeriode = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederJenisSubtansi = async () => {
    try {
        const res = await getData(`api-feeder/get-jenis-substansi`);
        isJenisSubtansi = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederSubtansi = async () => {
    try {
        const res = await getData(`api-feeder/get-substansi`);
        isSubtansi = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederSubtansiKuliah = async () => {
    try {
        const res = await getData(`api-feeder/get-substansi-kuliah`);
        isSubtansiKuliah = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederMataKuliah = async () => {
    try {
        const res = await getData(`api-feeder/get-mata-kuliah`);
        isMataKuliah = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederTahunAjaran = async () => {
    try {
        const res = await getData(`api-feeder/get-tahun-ajaran`);
        isTahunAjaran = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederFakultas = async () => {
    try {
        const res = await getData(`api-feeder/get-fakultas`);
        isFakultas = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederSemester = async () => {
    try {
        const res = await getData(`api-feeder/get-semester`);
        isSemester = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederKurikulum = async () => {
    try {
        const res = await getData(`api-feeder/get-kurikulum`);
        isKurikulum = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederDetailKurikulum = async () => {
    try {
        const res = await getData(`api-feeder/get-detail-kurikulum`);
        isDetailKurikulum = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederPenugasanDosen = async () => {
    try {
        const res = await getData(`api-feeder/get-penugasan-dosen`);
        isPenugasanDosen = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederMataKuliahKurikulum = async () => {
    try {
        const res = await getData(`api-feeder/get-matkul-kurikulum`);
        isMatakuliahKurikulum = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederKelasKuliah = async () => {
    try {
        const res = await getData(`api-feeder/get-kelas-kuliah`);
        isKelasKuliah = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederDetailKelasKuliah = async () => {
    try {
        const res = await getData(`api-feeder/get-detail-kelas-kuliah`);
        isDetailKelasKuliah = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederPerhitunganSKS = async () => {
    try {
        const res = await getData(`api-feeder/get-perhitungan-sks`);
        isPerhitunganSKS = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederBiodataMahasiswa = async () => {
    try {
        const res = await getData(`api-feeder/get-biodata-mahasiswa`);
        isBiodataMahasiswa = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederMahasiswa = async () => {
    try {
        const res = await getData(`api-feeder/get-mahasiswa`);
        isMahasiswa = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederJenisKeluar = async () => {
    try {
        const res = await getData(`api-feeder/get-jenis-keluar`);
        isJenisKeluar = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederPembiayaan = async () => {
    try {
        const res = await getData(`api-feeder/get-pembiayaan`);
        isPembiayaan = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederBidangMinat = async () => {
    try {
        const res = await getData(`api-feeder/get-bidang-minat`);
        isBidangMinat = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederRiwayatPendidikanMahasiswa = async () => {
    try {
        const res = await getData(`api-feeder/get-riwayat-pendidikan-mahasiswa`);
        isRiwayatPendidikanMahasiswa = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederSkalaNilaiProdi = async () => {
    try {
        const res = await getData(`api-feeder/get-skala-nilai-prodi`);
        isSkalaNilaiProdi = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederPeriodePerkuliahan = async () => {
    try {
        const res = await getData(`api-feeder/get-periode-perkuliahan`);
        isPeriodePerkuliahan = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederDetailPeriodePerkuliahan = async () => {
    try {
        const res = await getData(`api-feeder/get-detail-periode-perkuliahan`);
        isDetailPeriodePerkuliahan = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederJenisAktivitasMahasiswa = async () => {
    try {
        const res = await getData(`api-feeder/get-jenis-aktivitas-mahasiswa`);
        isJenisAktivitasMahasiswa = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederDataLengkapMahasiswaProdi = async () => {
    try {
        const res = await getData(`api-feeder/get-data-lengkap-mahasiswa-prodi`);
        isDataLengkapMahasiswaProdi = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederAktivitasMahasiswa = async () => {
    try {
        const res = await getData(`api-feeder/get-aktivitas-mahasiswa`);
        isAktivitasMahasiswa = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederAnggotaAktivitasMahasiswa = async () => {
    try {
        const res = await getData(`api-feeder/get-anggota-aktivitas-mahasiswa`);
        isAnggotaAktivitasMahasiswa = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederKonversiKampusMerdeka = async () => {
    try {
        const res = await getData(`api-feeder/get-konversi-kampus-merdeka`);
        isKonversiKampusMerdeka = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederRekapJumlahMahasiswa = async () => {
    try {
        const res = await getData(`api-feeder/get-rekap-jumlah-mahasiswa`);
        isRekapJumlahMahasiswa = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederJenisEvaluasi = async () => {
    try {
        const res = await getData(`api-feeder/get-jenis-evaluasi`);
        isJenisEvaluasi = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederDosenPengajar = async () => {
    try {
        const res = await getData(`api-feeder/get-dosen-pengajar-kelas-kuliah`);
        isDosenPengajar = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederKategoriKegiatan = async () => {
    try {
        const res = await getData(`api-feeder/get-kategori-kegiatan`);
        isKategoriKegiatan = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederMahasiswaBimbinganDosen = async () => {
    try {
        const res = await getData(`api-feeder/get-mahasiswa-bimbingan-dosen`);
        isMahasiswaBimbinganDosen = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederUjiMahasiswa = async () => {
    try {
        const res = await getData(`api-feeder/get-uji-mahasiswa`);
        isUjiMahasiswa = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederSekolahSMK = async () => {
    try {
        const res = await getData(`api-external/sekolah/smk/get`);
        isSekolahSMK = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederSekolahSMA = async () => {
    try {
        const res = await getData(`api-external/sekolah/sma/get`);
        isSekolahSMA = true;
        return res;
    } catch (err) {
        throw err;
    }
};
