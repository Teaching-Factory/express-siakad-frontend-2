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
            path: '/pendaftaran-pmb',
            name: 'pendaftaran-pmb',
            component: () => import('../views/guest-camaba/index.vue')
        },
        {
            path: '/pendaftaran-pmb/:id/cetak-formulir',
            name: 'pendaftaran-pmb-cetak-formulir',
            component: () => import('../views/guest-camaba/cetakFormulir.vue')
        },
        {
            path: '/setup-guest/get-started',
            name: 'setuo-guest-get-started',
            component: () => import('../views/setup-guest/index.vue')
        },
        {
            path: '/setup-guest/get-started/register',
            name: 'setuo-guest-get-started-register',
            component: () => import('../views/setup-guest/register.vue')
        },
        {
            path: '/setup-guest/get-started/register/settingws',
            name: 'setuo-guest-get-started-register-settingws',
            component: () => import('../views/setup-guest/settingWS.vue')
        },
        {
            path: '/setup-guest/get-started/register/settingws/install',
            name: 'setuo-guest-get-started-register-settingws-install',
            component: () => import('../views/setup-guest/install.vue')
        },
        {
            path: '/setup-guest/get-started/register/settingws/install/next',
            name: 'setuo-guest-get-started-register-settingws-install-next',
            component: () => import('../views/setup-guest/install2.vue')
        },
        {
            path: '/setup-guest/get-started/register/settingws/install/next/setting-semester',
            name: 'setuo-guest-get-started-register-settingws-install-next-setting-semester',
            component: () => import('../views/setup-guest/settingSemester.vue')
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

                //penerimaan mahasiswa baru
                {
                    path: '/pengaturan-pmb',
                    name: 'pengaturan-pmb',
                    component: () => import('../views/admin-pmb/pengaturanPMB/index.vue')
                    // meta: { requiredPermissions: ['import-mahasiswa'] }
                },
                {
                    path: '/jenis-tes',
                    name: 'jenis-tes',
                    component: () => import('../views/admin-pmb/jenisTes/index.vue')
                    // meta: { requiredPermissions: ['import-mahasiswa'] }
                },
                {
                    path: '/jenis-tes/create',
                    name: 'jenis-tes-create',
                    component: () => import('../views/admin-pmb/jenisTes/form.vue')
                    // meta: { requiredPermissions: ['import-mahasiswa'] }
                },
                {
                    path: '/jenis-tes/:id/edit',
                    name: 'jenis-tes-edit',
                    component: () => import('../views/admin-pmb/jenisTes/form.vue')
                    // meta: { requiredPermissions: ['import-mahasiswa'] }
                },
                {
                    path: '/jenis-berkas',
                    name: 'jenis-berkas',
                    component: () => import('../views/admin-pmb/jenisBerkas/index.vue')
                    // meta: { requiredPermissions: ['import-mahasiswa'] }
                },
                {
                    path: '/jenis-berkas/create',
                    name: 'jenis-berkas-create',
                    component: () => import('../views/admin-pmb/jenisBerkas/form.vue')
                    // meta: { requiredPermissions: ['import-mahasiswa'] }
                },
                {
                    path: '/jenis-berkas/:id/edit',
                    name: 'jenis-berkas-edit',
                    component: () => import('../views/admin-pmb/jenisBerkas/form.vue')
                    // meta: { requiredPermissions: ['import-mahasiswa'] }
                },
                {
                    path: '/periode-pendaftaran',
                    name: 'periode-pendaftaran',
                    component: () => import('../views/admin-pmb/periodePendaftaran/index.vue')
                    // meta: { requiredPermissions: ['import-mahasiswa'] }
                },
                {
                    path: '/periode-pendaftaran-create',
                    name: 'periode-pendaftaran-create',
                    component: () => import('../views/admin-pmb/periodePendaftaran/form.vue')
                    // meta: { requiredPermissions: ['import-mahasiswa'] }
                },
                {
                    path: '/periode-pendaftaran-edit/:id',
                    name: 'periode-pendaftaran-edit',
                    component: () => import('../views/admin-pmb/periodePendaftaran/form.vue')
                    // meta: { requiredPermissions: ['import-mahasiswa'] }
                },
                {
                    path: '/periode-pendaftaran/:id/daftar-camaba',
                    name: 'periode-pendaftaran-daftar-camaba',
                    component: () => import('../views/admin-pmb/periodePendaftaran/daftarCamaba/index.vue')
                    // meta: { requiredPermissions: ['import-mahasiswa'] }
                },

                //tagihanCamaba
                {
                    path: '/tagihan-camaba',
                    name: 'tagihan-camaba',
                    component: () => import('../views/admin-pmb/tagihanCamaba/index.vue')
                    // meta: { requiredPermissions: ['import-mahasiswa'] }
                },
                {
                    path: '/daftar-camaba',
                    name: 'daftar-camaba',
                    component: () => import('../views/admin-pmb/daftarCamaba/index.vue')
                    // meta: { requiredPermissions: ['import-mahasiswa'] }
                },
                {
                    path: '/daftar-camaba-detail/:id',
                    name: 'daftar-camaba-detail',
                    component: () => import('../views/admin-pmb/daftarCamaba/detail.vue')
                    // meta: { requiredPermissions: ['import-mahasiswa'] }
                },
                {
                    path: '/set-nim-pendaftar-kolektif',
                    name: 'set-nim-pendaftar-kolektif',
                    component: () => import('../views/admin-pmb/setNimPendaftarKolektif/index.vue')
                    // meta: { requiredPermissions: ['import-mahasiswa'] }
                },
                {
                    path: '/export-daftar-mahasiswa',
                    name: 'export-daftar-mahasiswa',
                    component: () => import('../views/admin-pmb/exportDaftarMahasiswa/index.vue')
                    // meta: { requiredPermissions: ['import-mahasiswa'] }
                },
                {
                    path: '/user-guide',
                    name: 'user-guide',
                    component: () => import('../views/admin-pmb/userGuide/index.vue')
                    // meta: { requiredPermissions: ['import-mahasiswa'] }
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
                    component: () => import('../views/mahasiswa/statusMahasiswa/index.vue')
                    // meta: { requiredPermissions: ['set-status-mahasiswa'] }
                },
                {
                    path: '/set-status-admin-prodi',
                    name: 'set-status-admin-prodi',
                    component: () => import('../views/mahasiswa/statusMahasiswa/adminProdi/index.vue')
                    // meta: { requiredPermissions: ['set-status-admin-prodi'] }
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
                    path: '/mata-kuliah',
                    name: 'mata-kuliah',
                    component: () => import('../views/perkuliahan/mataKuliah/index.vue')
                    // meta: { requiredPermissions: ['kelas-jadwal-perkuliahan'] }
                },
                {
                    path: '/rencana-evaluasi/:id_matkul/mata-kuliah',
                    name: 'rencana-evaluasi-mata-kuliah',
                    component: () => import('../views/perkuliahan/mataKuliah/edit.vue')
                    // meta: { requiredPermissions: ['kelas-jadwal-perkuliahan'] }
                },
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
                    path: '/kelas-jadwal-perkuliahan/update-kelas/:id_matkul/:id_detail_kelas_kuliah/:id_kelas_kuliah',
                    name: 'kelas-jadwal-perkuliahan-update-kelas',
                    component: () => import('../views/perkuliahan/kelasJadwalPerkuliahan/formKelas.vue')
                },
                {
                    path: '/kelas-jadwal-perkuliahan/:id_detail_kelas_kuliah/:id_kelas_kuliah/create-peserta-kelas',
                    name: 'kelas-jadwal-perkuliahan-create-peserta-kelas',
                    component: () => import('../views/perkuliahan/kelasJadwalPerkuliahan/formPesertaKelas.vue')
                },
                {
                    path: '/kelas-jadwal-perkuliahan/:id_detail_kelas_kuliah/:id_kelas_kuliah/komponen-evaluasi',
                    name: 'kelas-jadwal-perkuliahan-komponen-evaluasi',
                    component: () => import('../views/perkuliahan/kelasJadwalPerkuliahan/komponen-evaluasi/index.vue')
                },
                {
                    path: '/kelas-jadwal-perkuliahan/:id_detail_kelas_kuliah/:id_kelas_kuliah/dosen-pengajar',
                    name: 'kelas-jadwal-perkuliahan-dosen-pengajar',
                    component: () => import('../views/perkuliahan/kelasJadwalPerkuliahan/formDosen.vue')
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

                //Kelulusan dan Yudisium
                {
                    path: '/import-kelulusan-mahasiswa',
                    name: 'import-kelulusan-mahasiswa',
                    component: () => import('../views/kelulusanYudisium/importKelulusan/index.vue')
                    // meta: { requiredPermissions: ['set-kolektif-dosenwali'] }
                },
                {
                    path: '/setting-yudisium-mahasiswa',
                    name: 'setting-yudisium-mahasiswa',
                    component: () => import('../views/kelulusanYudisium/settingYudisium/index.vue')
                    // meta: { requiredPermissions: ['set-kolektif-dosenwali'] }
                },
                {
                    path: '/daftar-mahasiswa-yudisium',
                    name: 'daftar-mahasiswa-yudisium',
                    component: () => import('../views/kelulusanYudisium/daftarMahasiswaYudisium/index.vue')
                    // meta: { requiredPermissions: ['set-kolektif-dosenwali'] }
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

                //profil nilai
                {
                    path: '/profil-penilaian',
                    name: 'profil-penilaian',
                    component: () => import('../views/referensi/profilNilai/index.vue')
                },
                {
                    path: '/profil-penilaian/:id/edit',
                    name: 'profil-penilaian-edit',
                    component: () => import('../views/referensi/profilNilai/form.vue')
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

                //kuesioner dosen
                {
                    path: '/aspek-penilaian-dosen',
                    name: 'aspek-penilaian-dosen',
                    component: () => import('../views/kuesioner/aspekPenilaianDosen/index.vue')
                    // meta: { requiredPermissions: ['unit-jabatan'] }
                },
                {
                    path: '/aspek-penilaian-dosen/create',
                    name: 'aspek-penilaian-dosen-create',
                    component: () => import('../views/kuesioner/aspekPenilaianDosen/form.vue')
                    // meta: { requiredPermissions: ['unit-jabatan'] }
                },
                {
                    path: '/aspek-penilaian-dosen/:id/edit',
                    name: 'aspek-penilaian-dosen-edit',
                    component: () => import('../views/kuesioner/aspekPenilaianDosen/form.vue')
                    // meta: { requiredPermissions: ['unit-jabatan'] }
                },
                {
                    path: '/skala-penilaian-dosen',
                    name: 'skala-penilaian-dosen',
                    component: () => import('../views/kuesioner/skalaPenilaianDosen/index.vue')
                    // meta: { requiredPermissions: ['data-wilayah'] }
                },
                {
                    path: '/skala-penilaian-dosen/create',
                    name: 'skala-penilaian-dosen-create',
                    component: () => import('../views/kuesioner/skalaPenilaianDosen/form.vue')
                    // meta: { requiredPermissions: ['unit-jabatan'] }
                },
                {
                    path: '/skala-penilaian-dosen/:id/edit',
                    name: 'skala-penilaian-dosen-edit',
                    component: () => import('../views/kuesioner/skalaPenilaianDosen/form.vue')
                    // meta: { requiredPermissions: ['unit-jabatan'] }
                },
                {
                    path: '/hasil-kuesioner-dosen',
                    name: 'hasil-kuesioner-dosen',
                    component: () => import('../views/kuesioner/hasilKuesionerDosen/index.vue'),
                    meta: { requiredPermissions: ['data-wilayah'] }
                },
                {
                    path: '/hasil-kuesioner-perkelas',
                    name: 'hasil-kuesioner-perkelas',
                    component: () => import('../views/kuesioner/hasilKuesionerPerKelas/index.vue')
                    // meta: { requiredPermissions: ['data-wilayah'] }
                },
                {
                    path: '/hasil-kuesioner-perkelas-detail',
                    name: 'hasil-kuesioner-perkelas-detail',
                    component: () => import('../views/kuesioner/hasilKuesionerPerKelas/detailKuesioner.vue')
                    // meta: { requiredPermissions: ['data-wilayah'] }
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
                    path: '/daftar-tagihan/:id_tagihan_mahasiswa/update',
                    name: 'daftar-tagihan-update',
                    component: () => import('../views/keuangan/daftarTagihan/update.vue')
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
                    path: '/cetak-krs-mahasiswa-angkatan',
                    name: 'cetak-krs-mahasiswa-angkatan',
                    component: () => import('../views/laporan/krsMahasiswa/cetakKRSbyAngkatan.vue')
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
                {
                    path: '/rekap-pendaftar-pmb',
                    name: 'rekap-pendaftar-pmb',
                    component: () => import('../views/laporan/rekapPendaftarPMB/index.vue')
                    // meta: { requiredPermissions: ['cetak-daftar-belum-krs'] }
                },
                {
                    path: '/cetak-rekap-pendaftar-pmb',
                    name: 'cetak-rekap-pendaftar-pmb',
                    component: () => import('../views/laporan/rekapPendaftarPMB/cetakRekapPendaftar.vue')
                    // meta: { requiredPermissions: ['cetak-daftar-belum-krs'] }
                },
                {
                    path: '/rekap-pembayaran-pmb',
                    name: 'rekap-pembayaran-pmb',
                    component: () => import('../views/laporan/rekapPembayaranPMB/index.vue')
                    // meta: { requiredPermissions: ['cetak-daftar-belum-krs'] }
                },
                {
                    path: '/cetak-rekap-pembayaran-pmb',
                    name: 'cetak-rekap-pembayaran-pmb',
                    component: () => import('../views/laporan/rekapPembayaranPMB/cetakRekapPembayaran.vue')
                    // meta: { requiredPermissions: ['cetak-daftar-belum-krs'] }
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
                {
                    path: '/generate-user-admin-prodi',
                    name: 'generate-user-admin-prodi',
                    component: () => import('../views/manajemenSetting/generate-admin-prodi/index.vue')
                    // meta: { requiredPermissions: ['generate-user-dosen'] }
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
                    component: () => import('../views/profile-mahasiswa/krsMahasiswa/krs.vue'),
                    meta: { requiredPermissions: ['profile-krs-mahasiswa'] }
                },
                {
                    path: '/profile-krs-mahasiswa/krs',
                    name: 'profile-krs-mahasiswa-krs',
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
                {
                    path: '/kuesioner-penilaian-dosen',
                    name: 'kuesioner-penilaian-dosen',
                    component: () => import('../views/perkuliahan-mahasiswa/kuesionerPenilaianDosen/index.vue')
                    // meta: { requiredPermissions: ['kuesioner-penilaian-dosen'] }
                },
                {
                    path: '/kuesioner-penilaian-dosen/:id_kelas_kuliah/kuesioner',
                    name: 'kuesioner-penilaian-dosen-kuesioner',
                    component: () => import('../views/perkuliahan-mahasiswa/kuesionerPenilaianDosen/formKuesioner.vue')
                    // meta: { requiredPermissions: ['kuesioner-penilaian-dosen'] }
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
                    path: '/pertemuan-perkuliahan/:id/:id_kelas_kuliah/update',
                    name: 'pertemuan-perkuliahan-update',
                    component: () => import('../views/perkuliahan-dosen/pertemuanKelas/formPertemuan.vue')
                },

                //--------------admin camaba-----------------
                {
                    path: '/status-pendaftaran',
                    name: 'status-pendaftaran',
                    component: () => import('../views/admin-camaba/statusPendaftaran/index.vue')
                    // meta: { requiredPermissions: ['jadwal-kelas-perkuliahan-dosen'] }
                },
                {
                    path: '/biodata-pendaftar',
                    name: 'biodata-pendaftar',
                    component: () => import('../views/admin-camaba/biodataPendaftar/index.vue')
                    // meta: { requiredPermissions: ['jadwal-kelas-perkuliahan-dosen'] }
                },
                {
                    path: '/biodata-pendaftar-cetak',
                    name: 'biodata-pendaftar-cetak',
                    component: () => import('../views/admin-camaba/biodataPendaftar/cetakBiodata.vue')
                    // meta: { requiredPermissions: ['jadwal-kelas-perkuliahan-dosen'] }
                },
                {
                    path: '/upload-foto',
                    name: 'upload-foto',
                    component: () => import('../views/admin-camaba/uploadFoto/index.vue')
                    // meta: { requiredPermissions: ['jadwal-kelas-perkuliahan-dosen'] }
                },
                {
                    path: '/pilihan-prodi',
                    name: 'pilihan-prodi',
                    component: () => import('../views/admin-camaba/pilihanProdi/index.vue')
                    // meta: { requiredPermissions: ['jadwal-kelas-perkuliahan-dosen'] }
                },

                {
                    path: '/upload-berkas',
                    name: 'upload-berkas',
                    component: () => import('../views/admin-camaba/uploadBerkas/index.vue')
                    // meta: { requiredPermissions: ['jadwal-kelas-perkuliahan-dosen'] }
                },
                {
                    path: '/upload-berkas/create',
                    name: 'upload-berkas-create',
                    component: () => import('../views/admin-camaba/uploadBerkas/form.vue')
                    // meta: { requiredPermissions: ['jadwal-kelas-perkuliahan-dosen'] }
                },
                {
                    path: '/pembayaran-tagihan',
                    name: 'pembayaran-tagihan',
                    component: () => import('../views/admin-camaba/pembayaranTagihan/index.vue')
                    // meta: { requiredPermissions: ['jadwal-kelas-perkuliahan-dosen'] }
                },
                {
                    path: '/finalisasi-data',
                    name: 'finalisasi-data',
                    component: () => import('../views/admin-camaba/finalisasiData/index.vue')
                    // meta: { requiredPermissions: ['jadwal-kelas-perkuliahan-dosen'] }
                },
                {
                    path: '/cetak-kartu-ujian',
                    name: 'cetak-kartu-ujian',
                    component: () => import('../views/admin-camaba/cetakKartuUjian/index.vue')
                    // meta: { requiredPermissions: ['jadwal-kelas-perkuliahan-dosen'] }
                },
                {
                    path: '/jadwal-seleksi-tes',
                    name: 'jadwal-seleksi-tes',
                    component: () => import('../views/admin-camaba/jadwalSeleksiTes/index.vue')
                    // meta: { requiredPermissions: ['jadwal-kelas-perkuliahan-dosen'] }
                },
                {
                    path: '/cetak-form-pendaftaran',
                    name: 'cetak-form-pendaftaran',
                    component: () => import('../views/admin-camaba/cetakFormPendaftaran/index.vue')
                    // meta: { requiredPermissions: ['jadwal-kelas-perkuliahan-dosen'] }
                },

                {
                    path: '/singkron-data',
                    name: 'singkron-data',
                    component: () => import('../views/referensi/singkronisasi/index.vue')
                    // meta: { requiredPermissions: ['jadwal-kelas-perkuliahan-dosen'] }
                },
                {
                    path: '/singkron-data-angkatan',
                    name: 'singkron-data-angkatan',
                    component: () => import('../views/referensi/singkronisasi/update-data/index.vue')
                },
                {
                    path: '/singkron-rencana-evaluasi',
                    name: 'singkron-rencana-evaluasi',
                    component: () => import('../views/referensi/singkronisasi/rencana-evaluasi/index.vue')
                    // meta: { requiredPermissions: ['jadwal-kelas-perkuliahan-dosen'] }
                },
                {
                    path: '/singkron-komponen-evaluasi',
                    name: 'singkron-komponen-evaluasi',
                    component: () => import('../views/referensi/singkronisasi/komponen-evaluasi/index.vue')
                    // meta: { requiredPermissions: ['jadwal-kelas-perkuliahan-dosen'] }
                },
                {
                    path: '/sync-kelas-kuliah',
                    name: 'sync-kelas-kuliah',
                    component: () => import('../views/referensi/singkronisasi/kelas-kuliah/index.vue')
                    // meta: { requiredPermissions: ['jadwal-kelas-perkuliahan-dosen'] }
                },
                {
                    path: '/sync-dosen-pengajar',
                    name: 'sync-dosen-pengajar',
                    component: () => import('../views/referensi/singkronisasi/dosen-pengajar/index.vue')
                    // meta: { requiredPermissions: ['jadwal-kelas-perkuliahan-dosen'] }
                },
                {
                    path: '/sync-biodata-mahasiswa',
                    name: 'sync-biodata-mahasiswa',
                    component: () => import('../views/referensi/singkronisasi/biodata-mahasiswa/index.vue')
                    // meta: { requiredPermissions: ['jadwal-kelas-perkuliahan-dosen'] }
                },
                {
                    path: '/sync-riwayat-pendidikan-mahasiswa',
                    name: 'sync-riwayat-pendidikan-mahasiswa',
                    component: () => import('../views/referensi/singkronisasi/riwayat-pendidikan-mahasiswa/index.vue')
                    // meta: { requiredPermissions: ['jadwal-kelas-perkuliahan-dosen'] }
                },
                {
                    path: '/sync-peserta-kelas',
                    name: 'sync-peserta-kelas',
                    component: () => import('../views/referensi/singkronisasi/peserta-kelas/index.vue')
                    // meta: { requiredPermissions: ['jadwal-kelas-perkuliahan-dosen'] }
                },
                {
                    path: '/sync-detail-nilai',
                    name: 'sync-detail-nilai',
                    component: () => import('../views/referensi/singkronisasi/detail-nilai/index.vue')
                    // meta: { requiredPermissions: ['jadwal-kelas-perkuliahan-dosen'] }
                },

                //cetak
                {
                    path: '/biodata-camaba/:id/cetak',
                    name: 'biodata-camaba-cetak',
                    component: () => import('../views/admin-pmb/daftarCamaba/cetakBiodata/index.vue')
                    // meta: { requiredPermissions: ['jadwal-kelas-perkuliahan-dosen'] }
                },
                {
                    path: '/kartu-ujian-camaba/:id/cetak',
                    name: 'kartu-ujian-camaba-cetak',
                    component: () => import('../views/admin-pmb/daftarCamaba/cetakKartuUjian/index.vue')
                    // meta: { requiredPermissions: ['jadwal-kelas-perkuliahan-dosen'] }
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
    const publicPages = [
        '/',
        '/pendaftaran-pmb',
        '/pendaftaran-pmb/:id/cetak-formulir',
        '/setup-guest/get-started',
        '/setup-guest/get-started/register',
        '/setup-guest/get-started/register/settingws',
        '/setup-guest/get-started/register/settingws/install',
        '/setup-guest/get-started/register/settingws/install/next',
        '/setup-guest/get-started/register/settingws/install/next/setting-semester'
    ];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('token');
    const userIN = localStorage.getItem('user-data');
    const requiredPermissions = to.meta.requiredPermissions || [];
    const userPermissions = JSON.parse(localStorage.getItem('permissions')) || [];

    const hasPermission = requiredPermissions.every((permission) => userPermissions.includes(permission));
    if (requiredPermissions.length && !hasPermission) {
        next({ name: 'NotFound' });
    }

    const cetakFormulirPathRegex = /^\/pendaftaran-pmb\/[^/]+\/cetak-formulir$/;

    // Jika pengguna sudah login dan mencoba mengakses halaman pendaftaran-pmb atau cetak-formulir, arahkan ke dashboard
    if (loggedIn && userIN && (to.path === '/pendaftaran-pmb' || cetakFormulirPathRegex.test(to.path))) {
        return next('/dashboard');
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
