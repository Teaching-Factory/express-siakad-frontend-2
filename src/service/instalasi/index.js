import { getData } from '../../utiils/request';

let flex = true;
export const getFeederAgama = async () => {
    try {
        const res = await getData(`api-feeder/get-agama`);

        return res;
    } catch (err) {
        throw err;
    }
};

export const getFeederNegara = async () => {
    try {
        const res = await getData(`api-feeder/get-negara`);

        return res;
    } catch (err) {
        throw err;
    }
};

export const getFeederWilayah = async () => {
    try {
        const res = await getData(`api-feeder/get-wilayah`);

        return res;
    } catch (err) {
        throw err;
    }
};

export const getFeederPerguruanTinggi = async () => {
    try {
        const res = await getData(`api-feeder/get-all-pt`);

        return res;
    } catch (err) {
        throw err;
    }
};

export const getFeederProfilePT = async () => {
    try {
        const res = await getData(`api-feeder/get-profil-pt`);

        return res;
    } catch (err) {
        throw err;
    }
};

export const getFeederJalurMasuk = async () => {
    try {
        const res = await getData(`api-feeder/get-jalur-masuk`);

        return res;
    } catch (err) {
        throw err;
    }
};

export const getFeederJenisPendaftaran = async () => {
    try {
        const res = await getData(`api-feeder/get-jenis-pendaftaran`);

        return res;
    } catch (err) {
        throw err;
    }
};

export const getFeederJenisTinggal = async () => {
    try {
        const res = await getData(`api-feeder/get-jenis-tinggal`);

        return res;
    } catch (err) {
        throw err;
    }
};

export const getFeederAlatTransportasi = async () => {
    try {
        const res = await getData(`api-feeder/get-alat-transportasi`);

        return res;
    } catch (err) {
        throw err;
    }
};

export const getFeederStatusMahasiswa = async () => {
    try {
        const res = await getData(`api-feeder/get-status-mahasiswa`);

        return res;
    } catch (err) {
        throw err;
    }
};

export const getFeederKebutuhanKhusus = async () => {
    try {
        const res = await getData(`api-feeder/get-kebutuhan-khusus`);

        return res;
    } catch (err) {
        throw err;
    }
};

export const getFeederPenghasilan = async () => {
    try {
        const res = await getData(`api-feeder/get-penghasilan`);

        return res;
    } catch (err) {
        throw err;
    }
};

export const getFeederJenisSms = async () => {
    try {
        const res = await getData(`api-feeder/get-jenis-sms`);

        return res;
    } catch (err) {
        throw err;
    }
};

export const getFeederLembagaPengangkatan = async () => {
    try {
        const res = await getData(`api-feeder/get-lembaga-pengangkatan`);

        return res;
    } catch (err) {
        throw err;
    }
};

export const getFeederStatusKeaktifanPegawai = async () => {
    try {
        const res = await getData(`api-feeder/get-status-keaktifan-pegawai`);

        return res;
    } catch (err) {
        throw err;
    }
};

export const getFeederPangkatGolongan = async () => {
    try {
        const res = await getData(`api-feeder/get-pangkat-golongan`);

        return res;
    } catch (err) {
        throw err;
    }
};

export const getFeederPekerjaan = async () => {
    try {
        const res = await getData(`api-feeder/get-pekerjaan`);

        return res;
    } catch (err) {
        throw err;
    }
};

export const getFeederDosen = async () => {
    try {
        const res = await getData(`api-feeder/get-dosen`);

        return res;
    } catch (err) {
        throw err;
    }
};

export const getFeederBiodataDosen = async () => {
    try {
        const res = await getData(`api-feeder/get-biodata-dosen`);

        return res;
    } catch (err) {
        throw err;
    }
};

export const getFeederJenjangPendidikan = async () => {
    try {
        const res = await getData(`api-feeder/get-jenjang-pendidikan`);

        return res;
    } catch (err) {
        throw err;
    }
};

export const getFeederProgramStudi = async () => {
    try {
        const res = await getData(`api-feeder/get-prodi`);

        return res;
    } catch (err) {
        throw err;
    }
};

export const getFeederPeriode = async () => {
    try {
        const res = await getData(`api-feeder/get-periode`);

        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederJenisSubtansi = async () => {
    try {
        const res = await getData(`api-feeder/get-jenis-substansi`);

        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederSubtansi = async () => {
    try {
        const res = await getData(`api-feeder/get-substansi`);

        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederSubtansiKuliah = async () => {
    try {
        const res = await getData(`api-feeder/get-substansi-kuliah`);

        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederMataKuliah = async () => {
    try {
        const res = await getData(`api-feeder/get-mata-kuliah`);

        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederTahunAjaran = async () => {
    try {
        const res = await getData(`api-feeder/get-tahun-ajaran`);

        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederFakultas = async () => {
    try {
        const res = await getData(`api-feeder/get-fakultas`);

        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederSemester = async () => {
    try {
        const res = await getData(`api-feeder/get-semester`);

        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederKurikulum = async () => {
    try {
        const res = await getData(`api-feeder/get-kurikulum`);

        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederDetailKurikulum = async () => {
    try {
        const res = await getData(`api-feeder/get-detail-kurikulum`);

        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederPenugasanDosen = async () => {
    try {
        const res = await getData(`api-feeder/get-penugasan-dosen`);

        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederMataKuliahKurikulum = async () => {
    try {
        const res = await getData(`api-feeder/get-matkul-kurikulum`);

        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederKelasKuliah = async () => {
    try {
        const res = await getData(`api-feeder/get-kelas-kuliah`);

        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederDetailKelasKuliah = async () => {
    try {
        const res = await getData(`api-feeder/get-detail-kelas-kuliah`);

        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederPerhitunganSKS = async () => {
    try {
        const res = await getData(`api-feeder/get-perhitungan-sks`);

        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederBiodataMahasiswa = async () => {
    try {
        const res = await getData(`api-feeder/get-biodata-mahasiswa`);

        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederMahasiswa = async () => {
    try {
        const res = await getData(`api-feeder/get-mahasiswa`);

        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederJenisKeluar = async () => {
    try {
        const res = await getData(`api-feeder/get-jenis-keluar`);

        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederPembiayaan = async () => {
    try {
        const res = await getData(`api-feeder/get-pembiayaan`);

        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederBidangMinat = async () => {
    try {
        const res = await getData(`api-feeder/get-bidang-minat`);

        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederRiwayatPendidikanMahasiswa = async () => {
    try {
        const res = await getData(`api-feeder/get-riwayat-pendidikan-mahasiswa`);

        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederSkalaNilaiProdi = async () => {
    try {
        const res = await getData(`api-feeder/get-skala-nilai-prodi`);

        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederPeriodePerkuliahan = async () => {
    try {
        const res = await getData(`api-feeder/get-periode-perkuliahan`);

        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederDetailPeriodePerkuliahan = async () => {
    try {
        const res = await getData(`api-feeder/get-detail-periode-perkuliahan`);

        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederJenisAktivitasMahasiswa = async () => {
    try {
        const res = await getData(`api-feeder/get-jenis-aktivitas-mahasiswa`);

        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederDataLengkapMahasiswaProdi = async () => {
    try {
        const res = await getData(`api-feeder/get-data-lengkap-mahasiswa-prodi`);

        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederAktivitasMahasiswa = async () => {
    try {
        const res = await getData(`api-feeder/get-aktivitas-mahasiswa`);

        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederAnggotaAktivitasMahasiswa = async () => {
    try {
        const res = await getData(`api-feeder/get-anggota-aktivitas-mahasiswa`);

        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederKonversiKampusMerdeka = async () => {
    try {
        const res = await getData(`api-feeder/get-konversi-kampus-merdeka`);

        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederRekapJumlahMahasiswa = async () => {
    try {
        const res = await getData(`api-feeder/get-rekap-jumlah-mahasiswa`);

        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederJenisEvaluasi = async () => {
    try {
        const res = await getData(`api-feeder/get-jenis-evaluasi`);

        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederDosenPengajar = async () => {
    try {
        const res = await getData(`api-feeder/get-dosen-pengajar-kelas-kuliah`);

        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederKategoriKegiatan = async () => {
    try {
        const res = await getData(`api-feeder/get-kategori-kegiatan`);

        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederMahasiswaBimbinganDosen = async () => {
    try {
        const res = await getData(`api-feeder/get-mahasiswa-bimbingan-dosen`);

        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederUjiMahasiswa = async () => {
    try {
        const res = await getData(`api-feeder/get-uji-mahasiswa`);

        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederSekolahSMK = async () => {
    try {
        const res = await getData(`api-external/sekolah/smk/get`);

        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederSekolahSMA = async () => {
    try {
        const res = await getData(`api-external/sekolah/sma/get`);

        return res;
    } catch (err) {
        throw err;
    }
};
