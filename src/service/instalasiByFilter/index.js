import { get, getData } from '../../utiils/request';

export let isDetailNilaiPerkuliahan = false;
export let isRiwayatNilaiMahasiswa = false;
export let isPesertaKelasKuliah = false;
export let isDetailPerkuliahanMahasiswa = false;
export let isKrsMahasiswa = false;
export let isAktivitasKuliahMahasiswa = false;
export let isRekapKhsMahasiswa = false;
export let isRekapKrsMahasiswa = false;
export let isJabatan = false;
export let isLaporanPmb = false;
export let isContactPerson = false;
export let isSumber = false;
export let isUserGuide = false;
export let isPengaturanPmb = false;
export let isJenisTagihan = false;
export let isSettingGlobal = false;
export let isSistemKuliah = false;
export let isSiacloud = false;
export let isDataPelengkap = false;
export let isAdminProdi = false;
export let isProfilPenilaian = false;

export const getFeederDetailNilaiPerkuliahan = async (angkatan) => {
    try {
        const res = await get(`api-feeder/get-detail-nilai-perkuliahan-kelas?angkatan=${angkatan}`);
        isDetailNilaiPerkuliahan = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederRiwayatNilaiMahasiswa = async (angkatan) => {
    try {
        const res = await get(`api-feeder/get-riwayat-nilai-mahasiswa?angkatan=${angkatan}`);
        isRiwayatNilaiMahasiswa = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederPesertaKelasKuliah = async (angkatan) => {
    try {
        const res = await get(`api-feeder/get-peserta-kelas-kuliah?angkatan=${angkatan}`);
        isPesertaKelasKuliah = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederDetailPerkuliahanMahasiswa = async (angkatan) => {
    try {
        const res = await get(`api-feeder/get-detail-perkuliahan-mahasiswa?angkatan=${angkatan}`);
        isDetailPerkuliahanMahasiswa = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederKrsMahasiswa = async (angkatan) => {
    try {
        const res = await get(`api-feeder/get-krs-mahasiswa?angkatan=${angkatan}`);
        isKrsMahasiswa = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederAktivitasKuliahMahasiswa = async (angkatan) => {
    try {
        const res = await get(`api-feeder/get-aktivitas-kuliah-mahasiswa?angkatan=${angkatan}`);
        isAktivitasKuliahMahasiswa = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederRekapKhsMahasiswa = async (angkatan) => {
    try {
        const res = await get(`api-feeder/get-rekap-khs-mahasiswa?angkatan=${angkatan}`);
        isRekapKhsMahasiswa = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getFeederRekapKrsMahasiswa = async (angkatan) => {
    try {
        const res = await get(`api-feeder/get-rekap-krs-mahasiswa?angkatan=${angkatan}`);
        isRekapKrsMahasiswa = true;
        return res;
    } catch (err) {
        throw err;
    }
};

export const getSeedJabatan = async () => {
    try {
        const res = await get(`setup-seed/get-seed-jabatan`);
        isJabatan = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getSeedLaporanPmb = async () => {
    try {
        const res = await get(`setup-seed/get-seed-laporan-pmb`);
        isLaporanPmb = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getSeedContactPerson = async () => {
    try {
        const res = await get(`setup-seed/get-seed-cp-pmb`);
        isContactPerson = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getSeedSumber = async () => {
    try {
        const res = await get(`setup-seed/get-seed-sumber`);
        isSumber = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getSeedSistemKuliah = async () => {
    try {
        const res = await get(`setup-seed/get-seed-sistem-kuliah`);
        isSistemKuliah = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getSeedUserGuide = async () => {
    try {
        const res = await get(`setup-seed/get-seed-user-guide-pmb`);
        isUserGuide = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getSeedPengaturanPmb = async () => {
    try {
        const res = await get(`setup-seed/get-seed-pengaturan-pmb`);
        isPengaturanPmb = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getSeedJenisTagihan = async () => {
    try {
        const res = await get(`setup-seed/get-seed-jenis-tagihan`);
        isJenisTagihan = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getSeedSettingGlobal = async () => {
    try {
        const res = await get(`setup-seed/get-seed-setting-global`);
        isSettingGlobal = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getSeedSiacloud = async () => {
    try {
        const res = await get(`setup-seed/is-siacloud-ubi`);
        isSiacloud = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getSeedDataPelengkap = async () => {
    try {
        const res = await get(`setup-seed/get-seed-data-pelengkap`);
        isDataPelengkap = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getSeedAdminProdi = async () => {
    try {
        const res = await get(`setup-seed/get-seed-admin-prodi`);
        isAdminProdi = true;
        return res;
    } catch (err) {
        throw err;
    }
};
export const getSeedProfilPenilaian = async () => {
    try {
        const res = await get(`setup-seed/get-seed-profil-penilaian`);
        isAdminProdi = true;
        return res;
    } catch (err) {
        throw err;
    }
};
