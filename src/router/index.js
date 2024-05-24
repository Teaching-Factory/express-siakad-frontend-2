import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/dashboard',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },
                //mahasiswa
                {
                    path: '/import-mahasiswa',
                    name: 'importmahasiswa',
                    component: () => import('../views/mahasiswa/importMahasiswa/index.vue')
                },
                {
                    path: '/daftar-mahasiswa',
                    name: 'daftarmahasiswa',
                    component: () => import('../views/mahasiswa/daftarMahasiswa/index.vue')
                },
                {
                    path: '/set-status-mahasiswa',
                    name: 'setstatusmahasiswa',
                    component: () => import('../views/mahasiswa/statusMahasiswa/index.vue')
                },

                {
                    path: '/set-sistem-kuliah-mahasiswa',
                    name: 'setsistemkuliahmahasiswa',
                    component: () => import('../views/mahasiswa/sistemKuliah/index.vue')
                },

                {
                    path: '/validasi-krs-mahasiswa',
                    name: 'validasikrsmahasiswa',
                    component: () => import('../views/mahasiswa/validasiKrsMahasiswa/index.vue')
                },

                {
                    path: '/import-aktivitas-mahasiswa',
                    name: 'importaktivitasmahasiswa',
                    component: () => import('../views/mahasiswa/importAktivitasMahasiswa/index.vue')
                },

                {
                    path: '/mahasiswa-belum-krs',
                    name: 'mahasiswabelumkrs',
                    component: () => import('../views/mahasiswa/mahasiswaBelumKrs/index.vue')
                },

                {
                    path: '/perhitungan-transkrip',
                    name: 'perhitungantranskrip',
                    component: () => import('../views/mahasiswa/perhitunganTranskrip/index.vue')
                },

                {
                    path: '/set-aktif-akm',
                    name: 'setaktifakm',
                    component: () => import('../views/mahasiswa/setAktifAkm/index.vue')
                },

                {
                    path: '/belum-set-sk',
                    name: 'belumsetsk',
                    component: () => import('../views/mahasiswa/mahasiswaBelumSetSK/index.vue')
                },
                //perkuliahan
                {
                    path: '/kelas-jadwal-perkuliahan',
                    name: 'kelasjadwalperkuliahan',
                    component: () => import('../views/perkuliahan/kelasJadwalPerkuliahan/index.vue')
                },

                {
                    path: '/nilai-perkuliahan',
                    name: 'nilaiperkuliahan',
                    component: () => import('../views/perkuliahan/nilaiPerkuliahan/index.vue')
                },

                {
                    path: '/presensi-perkuliahan',
                    name: 'presensiperkuliahan',
                    component: () => import('../views/perkuliahan/presensiPerkuliahan/index.vue')
                },

                {
                    path: '/aktivitas-mahasiswa',
                    name: 'aktivitasmahasiswa',
                    component: () => import('../views/perkuliahan/aktivitasMahasiswa/index.vue')
                },

                {
                    path: '/kelas-aktif',
                    name: 'kelasaktif',
                    component: () => import('../views/perkuliahan/kelasAktif/index.vue')
                },
                //dosenwali
                {
                    path: '/daftar-dosen-wali',
                    name: 'daftardosenwali',
                    component: () => import('../views/dosenWali/daftarDosenWali/index.vue')
                },

                {
                    path: '/manajemen-mahasiswa-wali',
                    name: 'manajemenmahasiswawali',
                    component: () => import('../views/dosenWali/manajemenMahasiswaWali/index.vue')
                },

                {
                    path: '/set-kolektif-dosenwali',
                    name: 'setkolektifdosenwali',
                    component: () => import('../views/dosenWali/setKolektifDosenWali/index.vue')
                },

                //referensi
                {
                    path: '/sistem-kuliah',
                    name: 'sistemkuliah',
                    component: () => import('../views/referensi/sistemKuliah/index.vue')
                },
                {
                    path: '/ruang-perkuliahan',
                    name: 'ruangperkuliahan',
                    component: () => import('../views/referensi/ruangPerkuliahan/index.vue')
                },
                {
                    path: '/unsur-penilaian',
                    name: 'unsurpenilaian',
                    component: () => import('../views/referensi/unsurPenilaian/index.vue')
                },
                {
                    path: '/bobot-penilaian',
                    name: 'bobotpenilaian',
                    component: () => import('../views/referensi/bobotPenilaian/index.vue')
                },
                {
                    path: '/daftar-jabatan',
                    name: 'daftarjabatan',
                    component: () => import('../views/referensi/daftarJabatan/index.vue')
                },
                {
                    path: '/unit-jabatan',
                    name: 'unitjabatan',
                    component: () => import('../views/referensi/unitJabatan/index.vue')
                },
                {
                    path: '/data-wilayah',
                    name: 'datawilayah',
                    component: () => import('../views/referensi/dataWilayah/index.vue')
                },
                //keuangan

                {
                    path: '/daftar-tagihan',
                    name: 'daftartagihan',
                    component: () => import('../views/keuangan/daftarTagihan/index.vue')
                },
                {
                    path: '/daftar-pembayaran',
                    name: 'daftarpembayaran',
                    component: () => import('../views/keuangan/daftarPembayaran/index.vue')
                },

                //berita
                {
                    path: '/daftar-berita',
                    name: 'daftarberita',
                    component: () => import('../views/berita/index.vue')
                },
                {
                    path: '/tambah-berita',
                    name: 'tambahberita',
                    component: () => import('../views/berita/tambahBerita.vue')
                },

                //laporan
                {
                    path: '/krs-mahasiswa',
                    name: 'krsmahasiswa',
                    component: () => import('../views/laporan/krsMahasiswa/index.vue')
                },
                {
                    path: '/khs-mahasiswa',
                    name: 'khsmahasiswa',
                    component: () => import('../views/laporan/khsMahasiswa/index.vue')
                },
                {
                    path: '/transkrip-mahasiswa',
                    name: 'transkripmahasiswa',
                    component: () => import('../views/laporan/transkripMahasiswa/index.vue')
                },
                {
                    path: '/rekap-nilai-kelas',
                    name: 'rekapnilaikelas',
                    component: () => import('../views/laporan/rekapNilaiKelas/index.vue')
                },
                {
                    path: '/rekap-presensi-kelas',
                    name: 'rekappresensikelas',
                    component: () => import('../views/laporan/rekapPresensiKelas/index.vue')
                },
                {
                    path: '/jadwal-kuliah',
                    name: 'jadwalkuliah',
                    component: () => import('../views/laporan/jadwalKuliah/index.vue')
                },
                {
                    path: '/daftar-belum-krs',
                    name: 'daftarbelumkrs',
                    component: () => import('../views/laporan/daftarBelumKRS/index.vue')
                },

                //setting
                //manajemen
                {
                    path: '/manajemen-role',
                    name: 'manajemenrole',
                    component: () => import('../views/manajemenSetting/manajemenRole/index.vue')
                },
                {
                    path: '/manajemen-user',
                    name: 'manajemenuser',
                    component: () => import('../views/manajemenSetting/manajemenUser/index.vue')
                },
                {
                    path: '/generate-user-mahasiswa',
                    name: 'generateusermahasiswa',
                    component: () => import('../views/manajemenSetting/generateUserMahasiswa/index.vue')
                },
                {
                    path: '/generate-user-dosen',
                    name: 'generateuserdosen',
                    component: () => import('../views/manajemenSetting/generateUserDosen/index.vue')
                },

                //setting global

                {
                    path: '/uikit/formlayout',
                    name: 'formlayout',
                    component: () => import('@/views/uikit/FormLayout.vue')
                },
                {
                    path: '/uikit/input',
                    name: 'input',
                    component: () => import('@/views/uikit/Input.vue')
                },
                {
                    path: '/uikit/floatlabel',
                    name: 'floatlabel',
                    component: () => import('@/views/uikit/FloatLabel.vue')
                },
                {
                    path: '/uikit/invalidstate',
                    name: 'invalidstate',
                    component: () => import('@/views/uikit/InvalidState.vue')
                },
                {
                    path: '/uikit/button',
                    name: 'button',
                    component: () => import('@/views/uikit/Button.vue')
                },
                {
                    path: '/uikit/table',
                    name: 'table',
                    component: () => import('@/views/uikit/Table.vue')
                },
                {
                    path: '/uikit/list',
                    name: 'list',
                    component: () => import('@/views/uikit/List.vue')
                },
                {
                    path: '/uikit/tree',
                    name: 'tree',
                    component: () => import('@/views/uikit/Tree.vue')
                },
                {
                    path: '/uikit/panel',
                    name: 'panel',
                    component: () => import('@/views/uikit/Panels.vue')
                },

                {
                    path: '/uikit/overlay',
                    name: 'overlay',
                    component: () => import('@/views/uikit/Overlay.vue')
                },
                {
                    path: '/uikit/media',
                    name: 'media',
                    component: () => import('@/views/uikit/Media.vue')
                },
                {
                    path: '/uikit/menu',
                    component: () => import('@/views/uikit/Menu.vue'),
                    children: [
                        {
                            path: '/uikit/menu',
                            component: () => import('@/views/uikit/menu/PersonalDemo.vue')
                        },
                        {
                            path: '/uikit/menu/seat',
                            component: () => import('@/views/uikit/menu/SeatDemo.vue')
                        },
                        {
                            path: '/uikit/menu/payment',
                            component: () => import('@/views/uikit/menu/PaymentDemo.vue')
                        },
                        {
                            path: '/uikit/menu/confirmation',
                            component: () => import('@/views/uikit/menu/ConfirmationDemo.vue')
                        }
                    ]
                },
                {
                    path: '/uikit/message',
                    name: 'message',
                    component: () => import('@/views/uikit/Messages.vue')
                },
                {
                    path: '/uikit/file',
                    name: 'file',
                    component: () => import('@/views/uikit/File.vue')
                },
                {
                    path: '/uikit/charts',
                    name: 'charts',
                    component: () => import('@/views/uikit/Chart.vue')
                },
                {
                    path: '/uikit/misc',
                    name: 'misc',
                    component: () => import('@/views/uikit/Misc.vue')
                },
                {
                    path: '/blocks',
                    name: 'blocks',
                    component: () => import('@/views/utilities/Blocks.vue')
                },
                {
                    path: '/utilities/icons',
                    name: 'icons',
                    component: () => import('@/views/utilities/Icons.vue')
                },
                {
                    path: '/pages/timeline',
                    name: 'timeline',
                    component: () => import('@/views/pages/Timeline.vue')
                },
                {
                    path: '/pages/empty',
                    name: 'empty',
                    component: () => import('@/views/pages/Empty.vue')
                },
                {
                    path: '/pages/crud',
                    name: 'crud',
                    component: () => import('@/views/pages/Crud.vue')
                },
                {
                    path: '/documentation',
                    name: 'documentation',
                    component: () => import('@/views/utilities/Documentation.vue')
                }
            ]
        },
        {
            path: '/landing',
            name: 'landing',
            component: () => import('@/views/pages/Landing.vue')
        },
        {
            path: '/pages/notfound',
            name: 'notfound',
            component: () => import('@/views/pages/NotFound.vue')
        },

        {
            path: '/auth/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/auth/access',
            name: 'accessDenied',
            component: () => import('@/views/pages/auth/Access.vue')
        },
        {
            path: '/auth/error',
            name: 'error',
            component: () => import('@/views/pages/auth/Error.vue')
        }
    ]
});

// Navigation Guard untuk memeriksa otentikasi
router.beforeEach((to, from, next) => {
    const publicPages = ['/auth/login', '/auth/access', '/auth/error', '/landing'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    if (authRequired && !loggedIn) {
        return next('/auth/login');
    }

    next();
});
export default router;
