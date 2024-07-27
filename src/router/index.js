import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'login',
            component: () => import('../views/pages/auth/Login.vue')
        },
        {
            path: '/',
            component: AppLayout,
            meta: { requiresAuth: true },
            children: [
                {
                    path: '/dashboard',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue'),
                    meta: { requiredPermissions: ['dashboard'] }
                },
                //mahasiswa
                {
                    path: '/import-mahasiswa',
                    name: 'import-mahasiswa',
                    component: () => import('../views/mahasiswa/importMahasiswa/index.vue'),
                    meta: { requiredPermissions: ['import-mahasiswa'] }
                },
                {
                    path: '/daftar-mahasiswa',
                    name: 'daftar-mahasiswa',
                    component: () => import('../views/mahasiswa/daftarMahasiswa/index.vue'),
                    meta: { requiredPermissions: ['daftar-mahasiswa'] }
                },
                {
                    path: '/set-status-mahasiswa',
                    name: 'setstatusmahasiswa',
                    component: () => import('../views/mahasiswa/statusMahasiswa/index.vue'),
                    meta: { requiredPermissions: ['set-status-mahasiswa'] }
                },
                {
                    path: '/status-mahasiswa/:id_prodi',
                    name: 'set-status-mahasiswa-create',
                    component: () => import('../views/mahasiswa/statusMahasiswa/setStatus.vue')
                },

                {
                    path: '/set-sistem-kuliah-mahasiswa',
                    name: 'set-sistem-kuliah-hmahasiswa',
                    component: () => import('../views/mahasiswa/sistemKuliah/index.vue'),
                    meta: { requiredPermissions: ['set-sistem-kuliah-mahasiswa'] }
                },

                {
                    path: '/validasi-krs-mahasiswa',
                    name: 'validasi-krs-mahasiswa',
                    component: () => import('../views/mahasiswa/validasiKrsMahasiswa/index.vue'),
                    meta: { requiredPermissions: ['validasi-krs-mahasiswa'] }
                },
                {
                    path: '/validasi-krs-mahasiswa/detailKRS/:id_registrasi_mahasiswa',
                    name: 'validasi-krs-mahasiswa-detail',
                    component: () => import('../views/mahasiswa/validasiKrsMahasiswa/detailKRS.vue')
                },
                {
                    path: '/validasi-krs-mahasiswa/detailKRS/edit',
                    name: 'validasi-krs-mahasiswa-detail-edit',
                    component: () => import('../views/mahasiswa/validasiKrsMahasiswa/editKRS.vue')
                },
                {
                    path: '/validasi-krs-mahasiswa/:id_prodi/:id_semester/tervalidasi',
                    name: 'validasi-krs-mahasiswa-tervalidasi',
                    component: () => import('../views/mahasiswa/validasiKrsMahasiswa/tervalidasi.vue'),
                    props: true
                },

                {
                    path: '/import-aktivitas-mahasiswa',
                    name: 'import-aktivitas-mahasiswa',
                    component: () => import('../views/mahasiswa/importAktivitasMahasiswa/index.vue'),
                    meta: { requiredPermissions: ['import-aktivitas-mahasiswa'] }
                },

                {
                    path: '/mahasiswa-belum-krs',
                    name: 'mahasiswa-belum-krs',
                    component: () => import('../views/mahasiswa/mahasiswaBelumKrs/index.vue'),
                    meta: { requiredPermissions: ['mahasiswa-belum-krs'] }
                },

                {
                    path: '/perhitungan-transkrip',
                    name: 'perhitungan-transkrip',
                    component: () => import('../views/mahasiswa/perhitunganTranskrip/index.vue'),
                    meta: { requiredPermissions: ['perhitungan-transkrip'] }
                },

                {
                    path: '/set-aktif-akm',
                    name: 'set-aktif-akm',
                    component: () => import('../views/mahasiswa/setAktifAkm/index.vue'),
                    meta: { requiredPermissions: ['set-aktif-akm'] }
                },

                {
                    path: '/belum-set-sk',
                    name: 'belum-set-sk',
                    component: () => import('../views/mahasiswa/mahasiswaBelumSetSK/index.vue'),
                    meta: { requiredPermissions: ['belum-set-sk'] }
                },
                //perkuliahan
                {
                    path: '/kelas-jadwal-perkuliahan',
                    name: 'kelas-jadwal-perkuliahan',
                    component: () => import('../views/perkuliahan/kelasJadwalPerkuliahan/index.vue'),
                    meta: { requiredPermissions: ['kelas-jadwal-perkuliahan'] }
                },
                {
                    path: '/kelas-jadwal-perkuliahan/create-kelas/:id_matkul/:id_semester',
                    name: 'kelas-jadwal-perkuliahan-create-kelas',
                    component: () => import('../views/perkuliahan/kelasJadwalPerkuliahan/formKelas.vue')
                },
                {
                    path: '/kelas-jadwal-perkuliahan/create-pesertakelas',
                    name: 'kelas-jadwal-perkuliahan-create-peserta-kelas',
                    component: () => import('../views/perkuliahan/kelasJadwalPerkuliahan/formPesertaKelas.vue')
                },
                {
                    path: '/nilai-perkuliahan',
                    name: 'nilai-perkuliahan',
                    component: () => import('../views/perkuliahan/nilaiPerkuliahan/index.vue'),
                    meta: { requiredPermissions: ['nilai-perkuliahan'] }
                },

                {
                    path: '/nilai-perkuliahan/form/:id_kelas_kuliah/:id_prodi',
                    name: 'create-nilai-perkuliahan',
                    component: () => import('../views/perkuliahan/nilaiPerkuliahan/form.vue')
                    // meta: { requiredPermissions: ['create-nilai-perkuliahan'] }
                },

                {
                    path: '/presensi-perkuliahan',
                    name: 'presensi-perkuliahan',
                    component: () => import('../views/perkuliahan/presensiPerkuliahan/index.vue'),
                    meta: { requiredPermissions: ['presensi-perkuliahan'] }
                },
                {
                    path: '/presensi-perkuliahan/:id/detail',
                    name: 'presensi-perkuliahan-detail',
                    component: () => import('../views/perkuliahan/presensiPerkuliahan/detail.vue')
                },

                {
                    path: '/aktivitas-mahasiswa',
                    name: 'aktivitas-mahasiswa',
                    component: () => import('../views/perkuliahan/aktivitasMahasiswa/index.vue'),
                    meta: { requiredPermissions: ['aktivitas-mahasiswa'] }
                },

                {
                    path: '/kelas-aktif',
                    name: 'kelas-aktif',
                    component: () => import('../views/perkuliahan/kelasAktif/index.vue'),
                    meta: { requiredPermissions: ['kelas-aktif'] }
                },
                //dosenwali
                {
                    path: '/daftar-dosen-wali',
                    name: 'daftar-dosen-wali',
                    component: () => import('../views/dosenWali/daftarDosenWali/index.vue'),
                    meta: { requiredPermissions: ['daftar-dosen-wali'] }
                },

                {
                    path: '/manajemen-mahasiswa-wali',
                    name: 'manajeme-nmahasiswa-wali',
                    component: () => import('../views/dosenWali/manajemenMahasiswaWali/index.vue'),
                    meta: { requiredPermissions: ['manajemen-mahasiswa-wali'] }
                },

                {
                    path: '/set-kolektif-dosenwali/:id_dosen',
                    name: 'set-kolektif-dosenwali',
                    component: () => import('../views/dosenWali/setKolektifDosenWali/index.vue'),
                    meta: { requiredPermissions: ['set-kolektif-dosenwali'] }
                },

                //referensi
                //sistem kuliah
                {
                    path: '/jenis-tagihan',
                    name: 'jenis-tagihan',
                    component: () => import('../views/referensi/jenisTagihan/index.vue')
                    // meta: { requiredPermissions: ['sistem-kuliah'] }
                },
                {
                    path: '/jenis-tagihan/create',
                    name: 'jenis-tagihan-create',
                    component: () => import('../views/referensi/jenisTagihan/form.vue')
                    // meta: { requiredPermissions: ['sistem-kuliah'] }
                },
                {
                    path: '/jenis-tagihan/edit/:id',
                    name: 'jenis-tagihan-update',
                    component: () => import('../views/referensi/jenisTagihan/form.vue')
                    // meta: { requiredPermissions: ['sistem-kuliah'] }
                },
                {
                    path: '/sistem-kuliah',
                    name: 'sistem-kuliah',
                    component: () => import('../views/referensi/sistemKuliah/index.vue'),
                    meta: { requiredPermissions: ['sistem-kuliah'] }
                },
                {
                    path: '/sistem-kuliah/create',
                    name: 'sistem-kuliah-create',
                    component: () => import('../views/referensi/sistemKuliah/form.vue')
                },
                {
                    path: '/sistem-kuliah/edit/:id',
                    name: 'sistem-kuliah-edit',
                    component: () => import('../views/referensi/sistemKuliah/form.vue')
                },

                //ruang perkuliahan
                {
                    path: '/ruang-perkuliahan',
                    name: 'ruang-perkuliahan',
                    component: () => import('../views/referensi/ruangPerkuliahan/index.vue'),
                    meta: { requiredPermissions: ['ruang-perkuliahan'] }
                },
                {
                    path: '/ruang-perkuliahan/create',
                    name: 'ruang-perkuliahan-create',
                    component: () => import('../views/referensi/ruangPerkuliahan/form.vue')
                },
                {
                    path: '/ruang-perkuliahan/:id/edit',
                    name: 'ruang-perkuliahan-edit',
                    component: () => import('../views/referensi/ruangPerkuliahan/form.vue')
                },

                //unsur perkuliahan
                {
                    path: '/unsur-penilaian',
                    name: 'unsur-penilaian',
                    component: () => import('../views/referensi/unsurPenilaian/index.vue'),
                    meta: { requiredPermissions: ['unsur-penilaian'] }
                },
                {
                    path: '/unsur-penilaian/create',
                    name: 'unsur-penilaian-create',
                    component: () => import('../views/referensi/unsurPenilaian/form.vue')
                },
                {
                    path: '/unsur-penilaian/:id/edit',
                    name: 'unsur-penilaian-edit',
                    component: () => import('../views/referensi/unsurPenilaian/form.vue')
                },

                //bobot penilaian
                {
                    path: '/bobot-penilaian',
                    name: 'bobot-penilaian',
                    component: () => import('../views/referensi/bobotPenilaian/index.vue'),
                    meta: { requiredPermissions: ['bobot-penilaian'] }
                },
                {
                    path: '/bobot-penilaian/create',
                    name: 'bobot-penilaian-create',
                    component: () => import('../views/referensi/bobotPenilaian/form.vue')
                },
                {
                    path: '/bobot-penilaian/:id/edit',
                    name: 'bobot-penilaian-edit',
                    component: () => import('../views/referensi/bobotPenilaian/form.vue')
                },

                //daftar jabatan
                {
                    path: '/daftar-jabatan',
                    name: 'daftar-jabatan',
                    component: () => import('../views/referensi/daftarJabatan/index.vue'),
                    meta: { requiredPermissions: ['daftar-jabatan'] }
                },
                {
                    path: '/daftar-jabatan/create',
                    name: 'daftar-jabatan-create',
                    component: () => import('../views/referensi/daftarJabatan/form.vue')
                },
                {
                    path: '/daftar-jabatan/:id/edit',
                    name: 'daftar-jabatan-edit',
                    component: () => import('../views/referensi/daftarJabatan/form.vue')
                },

                //unit jabatan
                {
                    path: '/unit-jabatan',
                    name: 'unit-jabatan',
                    component: () => import('../views/referensi/unitJabatan/index.vue'),
                    meta: { requiredPermissions: ['unit-jabatan'] }
                },
                {
                    path: '/unit-jabatan/create',
                    name: 'unit-jabatan-create',
                    component: () => import('../views/referensi/unitJabatan/form.vue')
                },
                {
                    path: '/data-wilayah',
                    name: 'data-wilayah',
                    component: () => import('../views/referensi/dataWilayah/index.vue'),
                    meta: { requiredPermissions: ['data-wilayah'] }
                },

                //keuangan

                {
                    path: '/daftar-tagihan',
                    name: 'daftar-tagihan',
                    component: () => import('../views/keuangan/daftarTagihan/index.vue'),
                    meta: { requiredPermissions: ['daftar-tagihan'] }
                },
                {
                    path: '/daftar-tagihan/create',
                    name: 'daftar-tagihan-create',
                    component: () => import('../views/keuangan/daftarTagihan/form.vue')
                },
                
                {
                    path: '/daftar-pembayaran',
                    name: 'daftar-pembayaran',
                    component: () => import('../views/keuangan/daftarPembayaran/index.vue'),
                    meta: { requiredPermissions: ['daftar-pembayaran'] }
                },
                {
                    path: '/detail-pembayaran/:id_tagihan_mahasiswa',
                    name: 'detail-pembayaran',
                    component: () => import('../views/keuangan/daftarPembayaran/detailPembayaran.vue')
                    // meta: { requiredPermissions: ['daftar-pembayaran'] }
                },

                //berita
                {
                    path: '/daftar-berita',
                    name: 'daftar-berita',
                    component: () => import('../views/berita/index.vue'),
                    meta: { requiredPermissions: ['daftar-berita'] }
                },
                {
                    path: '/daftar-berita/create',
                    name: 'daftar-berita-create',
                    component: () => import('../views/berita/form.vue')
                },

                //laporan
                {
                    path: '/krs-mahasiswa',
                    name: 'krs-mahasiswa',
                    component: () => import('../views/laporan/krsMahasiswa/index.vue'),
                    meta: { requiredPermissions: ['cetak-KRS-mahasiswa'] }
                },
                {
                    path: '/cetak-krs-mahasiswa',
                    name: 'cetak-krs-mahasiswa',
                    component: () => import('../views/laporan/krsMahasiswa/cetakKRS.vue')
                },
                {
                    path: '/khs-mahasiswa',
                    name: 'khs-mahasiswa',
                    component: () => import('../views/laporan/khsMahasiswa/index.vue'),
                    meta: { requiredPermissions: ['cetak-KHS-mahasiswa'] }
                },
                {
                    path: '/cetak-khs-mahasiswa',
                    name: 'cetak-khs-mahasiswa',
                    component: () => import('../views/laporan/khsMahasiswa/cetakKHS.vue')
                },
                {
                    path: '/transkrip-mahasiswa',
                    name: 'transkrip-mahasiswa',
                    component: () => import('../views/laporan/transkripMahasiswa/index.vue'),
                    meta: { requiredPermissions: ['cetak-transkrip-mahasiswa'] }
                },
                {
                    path: '/cetak-transkrip-mahasiswa',
                    name: 'cetak-transkrip-mahasiswa',
                    component: () => import('../views/laporan/transkripMahasiswa/cetakTranskrip.vue')
                },
                {
                    path: '/rekap-nilai-kelas',
                    name: 'rekap-nilai-kelas',
                    component: () => import('../views/laporan/rekapNilaiKelas/index.vue'),
                    meta: { requiredPermissions: ['cetak-rekap-nilai-kelas'] }
                },
                {
                    path: '/cetak-nilai-kelas',
                    name: 'cetak-nilai-kelas',
                    component: () => import('../views/laporan/rekapNilaiKelas/cetakNilai.vue')
                },
                {
                    path: '/rekap-presensi-kelas',
                    name: 'rekap-presensi-kelas',
                    component: () => import('../views/laporan/rekapPresensiKelas/index.vue'),
                    meta: { requiredPermissions: ['cetak-rekap-presensi-kelas'] }
                },
                {
                    path: '/cetak-presensi-kelas',
                    name: 'cetak-presensi-kelas',
                    component: () => import('../views/laporan/rekapPresensiKelas/cetakPresensi.vue')
                },
                {
                    path: '/jadwal-kuliah',
                    name: 'jadwal-kuliah',
                    component: () => import('../views/laporan/jadwalKuliah/index.vue'),
                    meta: { requiredPermissions: ['cetak-jadwal-kuliah'] }
                },
                {
                    path: '/cetak-jadwal-kuliah',
                    name: 'cetak-jadwal-kuliah',
                    component: () => import('../views/laporan/jadwalKuliah/cetakJadwalKuliah.vue'),
                    meta: { requiredPermissions: ['cetak-jadwal-kuliah'] }
                },
                {
                    path: '/daftar-belum-krs',
                    name: 'daftar-belum-krs',
                    component: () => import('../views/laporan/daftarBelumKRS/index.vue'),
                    meta: { requiredPermissions: ['cetak-daftar-belum-krs'] }
                },
                {
                    path: '/cetak-daftar-belum-krs',
                    name: 'cetak-daftar-belum-krs',
                    component: () => import('../views/laporan/daftarBelumKRS/cetakBelumKrs.vue'),
                    meta: { requiredPermissions: ['cetak-daftar-belum-krs'] }
                },

                //setting
                //manajemen
                {
                    path: '/manajemen-role',
                    name: 'manajemen-role',
                    component: () => import('../views/manajemenSetting/manajemenRole/index.vue'),
                    meta: { requiredPermissions: ['manajemen-role'] }
                },
                {
                    path: '/manajemen-role/create',
                    name: 'manajemen-role-create',
                    component: () => import('../views/manajemenSetting/manajemenRole/form.vue')
                },
                {
                    path: '/manajemen-role/:id/update',
                    name: 'manajemen-role-update',
                    component: () => import('../views/manajemenSetting/manajemenRole/form.vue')
                },
                {
                    path: '/setting-hak-akses/:id',
                    name: 'setting-hak-akses',
                    component: () => import('../views/manajemenSetting/manajemenRole/changePermissions.vue')
                },
                {
                    path: '/manajemen-user',
                    name: 'manajemen-user',
                    component: () => import('../views/manajemenSetting/manajemenUser/index.vue'),
                    meta: { requiredPermissions: ['manajemen-user'] }
                },
                {
                    path: '/manajemen-user/create',
                    name: 'manajemen-user-create',
                    component: () => import('../views/manajemenSetting/manajemenUser/form.vue')
                },
                {
                    path: '/manajemen-user/:id/update',
                    name: 'manajemen-user-update',
                    component: () => import('../views/manajemenSetting/manajemenUser/form.vue')
                },
                {
                    path: '/generate-user-mahasiswa',
                    name: 'generate-user-mahasiswa',
                    component: () => import('../views/manajemenSetting/generateUserMahasiswa/index.vue'),
                    meta: { requiredPermissions: ['generate-user-mahasiswa'] }
                },
                {
                    path: '/generate-user-dosen',
                    name: 'generate-user-dosen',
                    component: () => import('../views/manajemenSetting/generateUserDosen/index.vue'),
                    meta: { requiredPermissions: ['generate-user-dosen'] }
                },

                //setting global

                {
                    path: '/setting-global',
                    name: 'setting-lobal',
                    component: () => import('../views/manajemenSetting/settingGlobal/index.vue'),
                    meta: { requiredPermissions: ['setting-global'] }
                },
                {
                    path: '/setting-global/:id/edit',
                    name: 'setting-global-edit',
                    component: () => import('../views/manajemenSetting/settingGlobal/form.vue')
                    // meta: { requiredPermissions: ['setting-global'] }
                },
                {
                    path: '/setting-ws',
                    name: 'setting-ws',
                    component: () => import('../views/manajemenSetting/settingWs/index.vue'),
                    meta: { requiredPermissions: ['setting-ws'] }
                },
                {
                    path: '/setting-identitaspt',
                    name: 'setting-identitas-pt',
                    component: () => import('../views/manajemenSetting/settingIdentitasPT/index.vue'),
                    meta: { requiredPermissions: ['identitas-pt'] }
                },

                //-----------role mahasiswa-------------------
                //tentang saya

                {
                    path: '/profile-data-mahasiswa',
                    name: 'profile-data-mahasiswa',
                    component: () => import('../views/profile-mahasiswa/dataMahasiswa/index.vue'),
                    meta: { requiredPermissions: ['profile-data-mahasiswa'] }
                },
                {
                    path: '/profile-krs-mahasiswa',
                    name: 'profile-krs-mahasiswa',
                    component: () => import('../views/profile-mahasiswa/krsMahasiswa/index.vue'),
                    meta: { requiredPermissions: ['profile-krs-mahasiswa'] }
                },
                {
                    path: '/profile-akm-mahasiswa',
                    name: 'profile-akm-mahasiswa',
                    component: () => import('../views/profile-mahasiswa/akmMahasiswa/index.vue'),
                    meta: { requiredPermissions: ['profile-akm-mahasiswa'] }
                },
                {
                    path: '/profile-khs-mahasiswa',
                    name: 'profile-khs-mahasiswa',
                    component: () => import('../views/profile-mahasiswa/khsMahasiswa/index.vue'),
                    meta: { requiredPermissions: ['profile-khs-mahasiswa'] }
                },
                {
                    path: '/cetak-khs',
                    name: 'cetak-khs',
                    component: () => import('../views/laporan-mahasiswa/khsMahasiswa/cetakKhsMahasiswa.vue')
                },
                {
                    path: '/cetak-krs',
                    name: 'cetak-krs',
                    component: () => import('../views/laporan-mahasiswa/krsMahasiswa/cetakKrsMahasiswa.vue')
                },

                //kegiatan
                //perkuliahan
                {
                    path: '/perkuliahan-krs-mahasiswa',
                    name: 'perkuliahan-krs-mahasiswa',
                    component: () => import('../views/perkuliahan-mahasiswa/krsMahasiswa/index.vue'),
                    meta: { requiredPermissions: ['perkuliahan-krs-mahasiswa'] }
                },
                {
                    path: '/perkuliahan-khs-mahasiswa',
                    name: 'perkuliahan-khs-mahasiswa',
                    component: () => import('../views/perkuliahan-mahasiswa/khsMahasiswa/index.vue'),
                    meta: { requiredPermissions: ['perkuliahan-khs-mahasiswa'] }
                },
                {
                    path: '/perkuliahan-jadwal-perkuliahan',
                    name: 'perkuliahan-jadwal-perkuliahan',
                    component: () => import('../views/perkuliahan-mahasiswa/jadwalPerkuliahan/index.vue'),
                    meta: { requiredPermissions: ['perkuliahan-jadwal-perkuliahan'] }
                },

                //laporan
                {
                    path: '/laporan-krs-mahasiswa',
                    name: 'laporan-krs-mahasiswa',
                    component: () => import('../views/laporan-mahasiswa/krsMahasiswa/index.vue'),
                    meta: { requiredPermissions: ['laporan-krs-mahasiswa'] }
                },
                {
                    path: '/laporan-khs-mahasiswa',
                    name: 'laporan-khs-mahasiswa',
                    component: () => import('../views/laporan-mahasiswa/khsMahasiswa/index.vue'),
                    meta: { requiredPermissions: ['laporan-khs-mahasiswa'] }
                },
                {
                    path: '/laporan-transkrip-mahasiswa',
                    name: 'laporan-transkrip-mahasiswa',
                    component: () => import('../views/laporan-mahasiswa/transkripMahasiswa/index.vue'),
                    meta: { requiredPermissions: ['laporan-transkrip-mahasiswa'] }
                },

                //pembayaran
                {
                    path: '/tagihan-pembayaran-mahasiswa',
                    name: 'tagihan-pembayaran-mahasiswa',
                    component: () => import('../views/profile-mahasiswa/tagihanPembayaranMahasiswa/index.vue'),
                    meta: { requiredPermissions: ['profile-tagihan-pembayaran-mahasiswa'] }
                },
                {
                    path: '/detail-pembayaran-mahasiswa/:id_tagihan_mahasiswa',
                    name: 'detail-pembayaran-mahasiswa',
                    component: () => import('../views/profile-mahasiswa/tagihanPembayaranMahasiswa/detailPembayaran.vue'),
                    meta: { requiredPermissions: ['profile-tagihan-pembayaran-mahasiswa'] }
                },

                // -----------batas fitur mahasiswa------------------

                //role dosen dibawah sini ya
                {
                    path: '/jadwal-kelas-perkuliahan',
                    name: 'jadwal-kelas-perkuliahan',
                    component: () => import('../views/perkuliahan-dosen/jadwalKelas/index.vue'),
                    meta: { requiredPermissions: ['jadwal-kelas-perkuliahan-dosen'] }
                },
                {
                    path: '/pertemuan-perkuliahan/:id_kelas_kuliah',
                    name: 'pertemuan-perkuliahan',
                    component: () => import('../views/perkuliahan-dosen/pertemuanKelas/index.vue')
                },
                {
                    path: '/pertemuan-perkuliahan/create/:id_kelas_kuliah',
                    name: 'pertemuan-perkuliahan-create',
                    component: () => import('../views/perkuliahan-dosen/pertemuanKelas/formPertemuan.vue')
                },
                {
                    path: '/pertemuan-perkuliahan/update/:id',
                    name: 'pertemuan-perkuliahan-update',
                    component: () => import('../views/perkuliahan-dosen/pertemuanKelas/formPertemuan.vue')
                }
            ]
        },
        //notfound
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: () => import('../views/pages/NotFound.vue')
        }
    ]
});

// Navigation Guard untuk memeriksa otentikasi
router.beforeEach((to, from, next) => {
    const publicPages = ['/'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('token');
    const userIN = localStorage.getItem('user-data');
    const requiredPermissions = to.meta.requiredPermissions || [];
    const userPermissions = JSON.parse(localStorage.getItem('permissions')) || [];

    const hasPermission = requiredPermissions.every((permission) => userPermissions.includes(permission));
    if (requiredPermissions.length && !hasPermission) {
        next({ name: 'NotFound' });
    }

    if (authRequired && !loggedIn && !userIN) {
        return next('/');
    }

    // Jika pengguna mencoba mengakses halaman login saat sudah login, arahkan mereka ke halaman beranda
    if (to.path === '/' && loggedIn && userIN) {
        return next('/dashboard');
    }

    next();
});

export default router;
