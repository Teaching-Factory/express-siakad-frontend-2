<script setup>
import { ref, computed } from 'vue';
import AppMenuItem from './AppMenuItem.vue';
import { getPermissions, getSettingGlobal } from '../utiils/local_storage';

const permissions = getPermissions();
const settingGlobal = getSettingGlobal();

const model = ref([
    {
        label: 'Beranda',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/dashboard' }],
        visible: computed(() => permissions.includes('dashboard'))
    },

    {
        label: 'Camaba',
        visible: computed(() => {
            return ['status-pendaftaran', 'biodata-pendaftar', 'foto-pendaftar', 'prodi-pendaftar', 'berkas-pendaftar', 'pembayaran-pendaftar', 'finalisasi-pendaftar', 'kartu-ujian-pendaftar', 'jadwal-seleksi-pendaftar', 'form-pendaftaran'].some(
                (permission) => permissions.includes(permission)
            );
        }),
        items: [
            {
                label: 'Status Pendaftaran',
                to: '/status-pendaftaran',
                visible: computed(() => permissions.includes('status-pendaftaran'))
            },
            {
                label: 'Biodata Pendaftar',
                to: '/biodata-pendaftar',
                visible: computed(() => permissions.includes('biodata-pendaftar'))
            },
            {
                label: 'Upload Foto',
                to: '/upload-foto',
                visible: computed(() => permissions.includes('foto-pendaftar'))
            },
            {
                label: 'Program Studi',
                to: '/pilihan-prodi',
                visible: computed(() => permissions.includes('prodi-pendaftar'))
            },
            {
                label: 'Upload Berkas',
                to: '/upload-berkas',
                visible: computed(() => permissions.includes('berkas-pendaftar'))
            },
            {
                label: 'Pembayaran Tagihan',
                to: '/pembayaran-tagihan',
                visible: computed(() => permissions.includes('pembayaran-pendaftar'))
            },
            {
                label: 'Finalisasi Data',
                to: '/finalisasi-data',
                visible: computed(() => permissions.includes('finalisasi-pendaftar'))
            },
            {
                label: 'Cetak Kartu Ujian',
                to: '/cetak-kartu-ujian',
                visible: computed(() => permissions.includes('kartu-ujian-pendaftar'))
            },
            {
                label: 'Jadwal Seleksi Tes',
                to: '/jadwal-seleksi-tes',
                visible: computed(() => permissions.includes('jadwal-seleksi-pendaftar'))
            },
            {
                label: 'Cetak Form Pendaftaran',
                to: '/cetak-form-pendaftaran',
                visible: computed(() => permissions.includes('form-pendaftaran'))
            }
        ]
        // visible: computed(() => permissions.includes('dashboard'))
    },
    {
        label: 'Akademik',
        visible: computed(() => {
            return [
                'import-mahasiswa',
                'daftar-mahasiswa',
                'set-status-mahasiswa',
                'set-sistem-kuliah-mahasiswa',
                'validasi-krs-mahasiswa',
                'import-aktivitas-mahasiswa',
                'mahasiswa-belum-krs',
                'perhitungan-transkrip',
                'set-aktif-akm',
                'belum-set-sk',
                'kelas-jadwal-perkuliahan',
                'nilai-perkuliahan',
                'presensi-perkuliahan',
                'aktivitas-mahasiswa',
                'kelas-aktif',
                'daftar-dosen-wali',
                'manajemen-mahasiswa-wali',
                'set-kolektif-dosenwali',
                'pengaturan-pmb',
                'jenis-tes',
                'jenis-berkas',
                'periode-pendaftaran-pmb',
                'tagihan-camaba',
                'daftar-camaba',
                'set-nim-camaba',
                'export-camaba',
                'user-guide',
                'kelulusan-mahasiswa',
                'yudisium-mahasiswa',
                'daftar-yudisium-mahasiswa'
            ].some((permission) => permissions.includes(permission));
        }),
        items: [
            {
                label: 'PMB',
                // icon: 'pi pi-fw pi-user',
                visible: computed(() => {
                    return ['pengaturan-pmb', 'jenis-tes', 'jenis-berkas', 'periode-pendaftaran-pmb', 'tagihan-camaba', 'daftar-camaba', 'set-nim-camaba', 'export-camaba', 'user-guide'].some((permission) => permissions.includes(permission));
                }),
                items: [
                    {
                        label: 'Pengaturan PMB',
                        to: '/pengaturan-pmb',
                        visible: computed(() => permissions.includes('pengaturan-pmb'))
                    },
                    {
                        label: 'Jenis Tes',
                        to: '/jenis-tes',
                        visible: computed(() => permissions.includes('jenis-tes'))
                    },
                    {
                        label: 'Jenis Berkas',
                        to: '/jenis-berkas',
                        visible: computed(() => permissions.includes('jenis-berkas'))
                    },
                    {
                        label: 'Periode Pendaftaran',
                        to: '/periode-pendaftaran',
                        visible: computed(() => permissions.includes('periode-pendaftaran-pmb'))
                    },
                    {
                        label: 'Tagihan Calon Mahasiswa Baru',
                        to: '/tagihan-camaba',
                        visible: computed(() => permissions.includes('tagihan-camaba'))
                    },
                    {
                        label: 'Daftar Calon Mahasiswa Baru',
                        to: '/daftar-camaba',
                        visible: computed(() => permissions.includes('daftar-camaba'))
                    },
                    {
                        label: 'Set NIM Pendaftar Kolektif',
                        to: '/set-nim-pendaftar-kolektif',
                        visible: computed(() => permissions.includes('set-nim-camaba'))
                    },
                    {
                        label: 'Export ke Daftar Mahasiswa',
                        to: '/export-daftar-mahasiswa',
                        visible: computed(() => permissions.includes('export-camaba'))
                    },
                    {
                        label: 'User Guide',
                        to: '/user-guide',
                        visible: computed(() => permissions.includes('user-guide'))
                    }
                ]
            },
            {
                label: 'Mahasiswa',
                // icon: 'pi pi-fw pi-user',
                visible: computed(() => {
                    return [
                        'import-mahasiswa',
                        'daftar-mahasiswa',
                        'set-status-mahasiswa',
                        'set-sistem-kuliah-mahasiswa',
                        'validasi-krs-mahasiswa',
                        'import-aktivitas-mahasiswa',
                        'mahasiswa-belum-krs',
                        'perhitungan-transkrip',
                        'set-aktif-akm',
                        'belum-set-sk'
                    ].some((permission) => permissions.includes(permission));
                }),
                items: [
                    {
                        label: 'Import Data Mahasiswa',
                        to: '/import-mahasiswa',
                        visible: computed(() => permissions.includes('import-mahasiswa'))
                    },
                    {
                        label: 'Daftar Mahasiswa',
                        to: '/daftar-mahasiswa',
                        visible: computed(() => permissions.includes('daftar-mahasiswa'))
                    },
                    {
                        label: 'Set Status Mahasiswa',
                        to: '/set-status-mahasiswa',
                        visible: computed(() => permissions.includes('set-status-mahasiswa'))
                    },
                    {
                        label: 'Set Sistem Kuliah Mahasiswa',
                        to: '/set-sistem-kuliah-mahasiswa',
                        visible: computed(() => permissions.includes('set-sistem-kuliah-mahasiswa'))
                    },
                    {
                        label: 'Validasi KRS Mahasiswa',
                        to: '/validasi-krs-mahasiswa',
                        visible: computed(() => permissions.includes('validasi-krs-mahasiswa'))
                    },
                    {
                        label: 'Import Aktivitas Mahasiswa',
                        to: '/import-aktivitas-mahasiswa',
                        visible: computed(() => permissions.includes('import-aktivitas-mahasiswa'))
                    },
                    {
                        label: 'Data Mahasiswa Belum KRS',
                        to: '/mahasiswa-belum-krs',
                        visible: computed(() => permissions.includes('mahasiswa-belum-krs'))
                    },
                    {
                        label: 'Hitung Transkrip',
                        to: '/perhitungan-transkrip',
                        visible: computed(() => permissions.includes('perhitungan-transkrip'))
                    },
                    {
                        label: 'Set Aktif Aktivitas Kuliah Mahasiswa',
                        to: '/set-aktif-akm',
                        visible: computed(() => permissions.includes('set-aktif-akm'))
                    },
                    {
                        label: 'Cek Mahasiswa Belum Set Sistem Kuliah',
                        to: '/belum-set-sk',
                        visible: computed(() => permissions.includes('belum-set-sk'))
                    }
                ]
            },
            {
                label: 'Perkuliahan',
                // icon: 'pi pi-fw pi-user',
                visible: computed(() => {
                    return ['kelas-jadwal-perkuliahan', 'jadwal-kelas-perkuliahan-dosen', 'nilai-perkuliahan', 'presensi-perkuliahan', 'aktivitas-mahasiswa', 'kelas-aktif'].some((permission) => permissions.includes(permission));
                }),
                items: [
                    {
                        label: 'Mata Kuliah',
                        to: '/mata-kuliah'
                        // visible: computed(() => permissions.includes('kelas-jadwal-perkuliahan'))
                    },
                    {
                        label: 'Kelas dan Jadwal',
                        to: '/kelas-jadwal-perkuliahan',
                        visible: computed(() => permissions.includes('kelas-jadwal-perkuliahan'))
                    },
                    {
                        label: 'Jadwal Kelas Perkuliahan',
                        to: '/jadwal-kelas-perkuliahan',
                        visible: computed(() => permissions.includes('jadwal-kelas-perkuliahan-dosen'))
                    },
                    {
                        label: 'Nilai Perkuliahan',
                        to: '/nilai-perkuliahan',
                        visible: computed(() => permissions.includes('nilai-perkuliahan'))
                    },
                    {
                        label: 'Presensi Perkuliahan',
                        to: '/presensi-perkuliahan',
                        visible: computed(() => permissions.includes('presensi-perkuliahan'))
                    },
                    {
                        label: 'Aktivitas Mahasiswa',
                        to: '/aktivitas-mahasiswa',
                        visible: computed(() => permissions.includes('aktivitas-mahasiswa'))
                    },
                    {
                        label: 'Daftar Kelas Aktif',
                        to: '/kelas-aktif',
                        visible: computed(() => permissions.includes('kelas-aktif'))
                    }
                ]
            },
            {
                label: 'Dosen Wali',
                // icon: 'pi pi-fw pi-user',
                visible: computed(() => {
                    return [, 'daftar-dosen-wali', 'manajemen-mahasiswa-wali', 'set-kolektif-dosenwali'].some((permission) => permissions.includes(permission));
                }),
                items: [
                    // {
                    //     label: 'Daftar Dosen Wali',
                    //     to: '/daftar-dosen-wali',
                    //     visible: computed(() => permissions.includes('daftar-dosen-wali'))
                    // },
                    {
                        label: 'Manajemen Mahasiswa Wali',
                        to: '/manajemen-mahasiswa-wali',
                        visible: computed(() => permissions.includes('manajemen-mahasiswa-wali'))
                    }
                    // {
                    //     label: 'Mahasiswa Wali (Kolektif)',
                    //     to: '/set-kolektif-dosenwali',
                    //     visible: computed(() => permissions.includes('set-kolektif-dosenwali'))
                    // }
                ]
            },
            {
                label: 'Kelulusan dan Yudisium',
                // icon: 'pi pi-fw pi-user',
                visible: computed(() => {
                    return [, 'kelulusan-mahasiswa', 'yudisium-mahasiswa', 'daftar-yudisium-mahasiswa'].some((permission) => permissions.includes(permission));
                }),
                items: [
                    {
                        label: 'Import Kelulusan Mahasiswa',
                        to: '/import-kelulusan-mahasiswa',
                        visible: computed(() => permissions.includes('kelulusan-mahasiswa'))
                    },
                    {
                        label: 'Setting Yudisium Mahasiswa',
                        to: '/setting-yudisium-mahasiswa',
                        visible: computed(() => permissions.includes('yudisium-mahasiswa'))
                    },
                    {
                        label: 'Daftar Mahasiswa Yudisium',
                        to: '/daftar-mahasiswa-yudisium',
                        visible: computed(() => permissions.includes('daftar-yudisium-mahasiswa'))
                    }
                ]
            }
        ]
    },
    {
        label: 'Data',
        visible: computed(() => {
            return [
                'sistem-kuliah',
                'ruang-perkuliahan',
                'unsur-penilaian',
                'bobot-penilaian',
                'daftar-jabatan',
                'unit-jabatan',
                'data-wilayah',
                'jenis-tagihan',
                'daftar-tagihan',
                'daftar-pembayaran',
                'daftar-berita',
                'kuisioner-aspek-penilaian',
                'kuisioner-skala-penilaian',
                'kuisioner-hasil-kuisioner-dosen',
                'kuisioner-hasil-kuisioner-kelas'
            ].some((permission) => permissions.includes(permission));
        }),
        items: [
            {
                label: 'Referensi',
                // icon: 'pi pi-fw pi-user',
                visible: computed(() => {
                    return ['sistem-kuliah', 'ruang-perkuliahan', 'unsur-penilaian', 'bobot-penilaian', 'daftar-jabatan', 'unit-jabatan', 'data-wilayah', 'daftar-tagihan', 'jenis-tagihan', 'daftar-pembayaran'].some((permission) =>
                        permissions.includes(permission)
                    );
                }),
                items: [
                    {
                        label: 'Sistem Kuliah',
                        to: '/sistem-kuliah',
                        visible: computed(() => permissions.includes('sistem-kuliah'))
                    },
                    {
                        label: 'Ruang Perkuliahan',
                        to: '/ruang-perkuliahan',
                        visible: computed(() => permissions.includes('ruang-perkuliahan'))
                    },
                    {
                        label: 'Profil Penilaian',
                        to: '/profil-penilaian'
                        // visible: computed(() => permissions.includes('ruang-perkuliahan'))
                    },
                    {
                        label: 'Unsur Penilaian',
                        to: '/unsur-penilaian',
                        visible: computed(() => permissions.includes('unsur-penilaian'))
                    },
                    {
                        label: 'Bobot Penilaian',
                        to: '/bobot-penilaian',
                        visible: computed(() => permissions.includes('bobot-penilaian'))
                    },
                    {
                        label: 'Jenis Tagihan',
                        to: '/jenis-tagihan',
                        visible: computed(() => permissions.includes('jenis-tagihan'))
                    },
                    {
                        label: 'Jabatan',
                        to: '/daftar-jabatan',
                        visible: computed(() => permissions.includes('daftar-jabatan'))
                    },
                    {
                        label: 'Unit Jabatan',
                        to: '/unit-jabatan',
                        visible: computed(() => permissions.includes('unit-jabatan'))
                    },
                    {
                        label: 'Wilayah',
                        to: '/data-wilayah',
                        visible: computed(() => permissions.includes('data-wilayah'))
                    }
                ]
            },
            {
                label: 'Kuesioner',
                // icon: 'pi pi-fw pi-user',
                visible: computed(() => {
                    return ['kuisioner-aspek-penilaian', 'kuisioner-skala-penilaian', 'kuisioner-hasil-kuisioner-dosen', 'kuisioner-hasil-kuisioner-kelas'].some((permission) => permissions.includes(permission));
                }),
                items: [
                    {
                        label: 'Aspek Penilaian Dosen',
                        to: '/aspek-penilaian-dosen',
                        visible: computed(() => permissions.includes('kuisioner-aspek-penilaian'))
                    },
                    {
                        label: 'Skala Penilaian Dosen',
                        to: '/skala-penilaian-dosen',
                        visible: computed(() => permissions.includes('kuisioner-skala-penilaian'))
                    },
                    {
                        label: 'Hasil Kuesioner Dosen',
                        to: '/hasil-kuesioner-dosen',
                        visible: computed(() => permissions.includes('kuisioner-hasil-kuisioner-dosen'))
                    },
                    {
                        label: 'Hasil Kuesioner Per Kelas',
                        to: '/hasil-kuesioner-perkelas',
                        visible: computed(() => permissions.includes('kuisioner-hasil-kuisioner-kelas'))
                    }
                ]
            },
            {
                label: 'Keuangan',
                // icon: 'pi pi-fw pi-user',
                visible: computed(() => {
                    return ['daftar-tagihan', 'daftar-pembayaran'].some((permission) => permissions.includes(permission));
                }),
                items: [
                    {
                        label: 'Daftar Tagihan',
                        to: '/daftar-tagihan',
                        visible: computed(() => permissions.includes('daftar-tagihan'))
                    },
                    {
                        label: 'Daftar Pembayaran',
                        to: '/daftar-pembayaran',
                        visible: computed(() => permissions.includes('daftar-pembayaran'))
                    }
                ]
            },
            {
                label: 'Daftar Berita',
                // icon: 'pi pi-fw pi-user',
                visible: computed(() => {
                    return ['daftar-berita'].some((permission) => permissions.includes(permission));
                }),
                items: [
                    {
                        label: 'Membuat Berita',
                        to: '/daftar-berita',
                        visible: computed(() => permissions.includes('daftar-berita'))
                    }
                ]
            },
            {
                label: 'Singkronisasi',
                // icon: 'pi pi-fw pi-user',
                //  visible: computed(() => {
                //     return ['daftar-berita'].some((permission) => permissions.includes(permission));
                // }),
                items: [
                    {
                        label: 'Sync Data',
                        to: '/singkron-data'
                        // visible: computed(() => permissions.includes('daftar-berita'))
                    },
                    {
                        label: 'Sync Kelas Kuliah',
                        to: '/sync-kelas-kuliah'
                        // visible: computed(() => permissions.includes('daftar-berita'))
                    },
                    {
                        label: 'Sync Dosen Pengajar Kelas',
                        to: '/sync-dosen-pengajar'
                        // visible: computed(() => permissions.includes('daftar-berita'))
                    },
                    {
                        label: 'Sync Biodata Mahasiswa',
                        to: '/sync-biodata-mahasiswa'
                        // visible: computed(() => permissions.includes('daftar-berita'))
                    },
                    {
                        label: 'Sync Riwayat Pendidikan Mahasiswa',
                        to: '/sync-riwayat-pendidikan-mahasiswa'
                        // visible: computed(() => permissions.includes('daftar-berita'))
                    },
                    {
                        label: 'Sync Peserta kelas',
                        to: '/sync-peserta-kelas'
                        // visible: computed(() => permissions.includes('daftar-berita'))
                    },
                    {
                        label: 'Sync Nilai Perkuliahan',
                        to: '/sync-detail-nilai'
                        // visible: computed(() => permissions.includes('daftar-berita'))
                    }
                ]
            }
        ]
    },
    {
        label: 'Laporan',
        visible: computed(() => {
            return [
                'cetak-KRS-mahasiswa',
                'cetak-KHS-mahasiswa',
                'cetak-transkrip-mahasiswa',
                'cetak-rekap-nilai-kelas',
                'cetak-rekap-presensi-kelas',
                'cetak-jadwal-kuliah',
                'cetak-daftar-belum-krs',
                'cetak-pendaftar-pmb',
                'cetak-pembayaran-pmb'
            ].some((permission) => permissions.includes(permission));
        }),
        items: [
            {
                label: 'Mahasiswa',
                icon: '',
                visible: computed(() => {
                    return ['cetak-KRS-mahasiswa', 'cetak-KHS-mahasiswa', 'cetak-transkrip-mahasiswa'].some((permission) => permissions.includes(permission));
                }),
                items: [
                    {
                        label: 'KRS Mahasiswa',
                        to: '/krs-mahasiswa',
                        visible: computed(() => permissions.includes('cetak-KRS-mahasiswa'))
                    },
                    {
                        label: 'KHS Mahasiswa',
                        to: '/khs-mahasiswa',
                        visible: computed(() => permissions.includes('cetak-KHS-mahasiswa'))
                    },
                    {
                        label: 'Transkrip Mahasiswa',
                        to: '/transkrip-mahasiswa',
                        visible: computed(() => permissions.includes('cetak-transkrip-mahasiswa'))
                    }
                ]
            },
            {
                label: 'Kelas Perkuliahan',
                icon: '',
                visible: computed(() => {
                    return ['cetak-rekap-nilai-kelas', 'cetak-rekap-presensi-kelas', 'cetak-jadwal-kuliah'].some((permission) => permissions.includes(permission));
                }),
                items: [
                    {
                        label: 'Rekap Nilai Kelas',
                        to: '/rekap-nilai-kelas',
                        visible: computed(() => permissions.includes('cetak-rekap-nilai-kelas'))
                    },
                    {
                        label: 'Rekap Presensi Kelas',
                        to: '/rekap-presensi-kelas',
                        visible: computed(() => permissions.includes('cetak-rekap-presensi-kelas'))
                    },
                    {
                        label: 'Jadwal Kuliah',
                        to: '/jadwal-kuliah',
                        visible: computed(() => permissions.includes('cetak-jadwal-kuliah'))
                    }
                ]
            },
            {
                label: 'KRS',
                // icon: 'pi pi-fw pi-print',
                visible: computed(() => {
                    return ['cetak-daftar-belum-krs'].some((permission) => permissions.includes(permission));
                }),
                items: [
                    {
                        label: 'Daftar Mahasiswa Belum KRS',
                        to: '/daftar-belum-krs',
                        visible: computed(() => permissions.includes('cetak-daftar-belum-krs'))
                    }
                ]
            },
            {
                label: 'PMB',
                // icon: 'pi pi-fw pi-print',
                visible: computed(() => {
                    return ['cetak-pendaftar-pmb', 'cetak-pembayaran-pmb'].some((permission) => permissions.includes(permission));
                }),
                items: [
                    {
                        label: 'Rekap Pendaftar PMB',
                        to: '/rekap-pendaftar-pmb',
                        visible: computed(() => permissions.includes('cetak-pendaftar-pmb'))
                    },
                    {
                        label: 'Rekap Pembayaran PMB',
                        to: '/rekap-pembayaran-pmb',
                        visible: computed(() => permissions.includes('cetak-pembayaran-pmb'))
                    }
                ]
            }
        ]
    },
    {
        label: 'Settings',
        visible: computed(() => {
            return ['manajemen-role', 'manajemen-user', 'generate-user-mahasiswa', 'generate-user-dosen', 'setting-global', 'setting-ws', 'identitas-pt'].some((permission) => permissions.includes(permission));
        }),
        items: [
            {
                label: 'Manajement',
                icon: '',
                visible: computed(() => {
                    return ['manajemen-role', 'manajemen-user', 'generate-user-mahasiswa', 'generate-user-dosen'].some((permission) => permissions.includes(permission));
                }),
                items: [
                    {
                        label: 'Manajemen Role',
                        to: '/manajemen-role',
                        visible: computed(() => permissions.includes('manajemen-role'))
                    },
                    {
                        label: 'Manajemen User',
                        to: '/manajemen-user',
                        visible: computed(() => permissions.includes('manajemen-user'))
                    },
                    {
                        label: 'Generate User Mahasiswa',
                        to: '/generate-user-mahasiswa',
                        visible: computed(() => permissions.includes('generate-user-mahasiswa'))
                    },
                    {
                        label: 'Generate User Dosen',
                        to: '/generate-user-dosen',
                        visible: computed(() => permissions.includes('generate-user-dosen'))
                    },
                    {
                        label: 'Generate User Admin Prodi',
                        to: '/generate-user-admin-prodi'
                        // visible: computed(() => permissions.includes('generate-user-dosen'))
                    }
                ]
            },
            {
                label: 'Setting',
                // icon: 'pi pi-fw pi-settings',
                visible: computed(() => {
                    return ['setting-global', 'setting-ws', 'identitas-pt'].some((permission) => permissions.includes(permission));
                }),
                items: [
                    {
                        label: 'Setting Global',
                        to: '/setting-global',
                        visible: computed(() => permissions.includes('setting-global'))
                    },
                    {
                        label: 'Ubah Setting WS',
                        to: '/setting-ws',
                        visible: computed(() => permissions.includes('setting-ws'))
                    },
                    {
                        label: 'Ubah Identititas PT',
                        to: '/setting-identitaspt',
                        visible: computed(() => permissions.includes('identitas-pt'))
                    }
                ]
            }
        ]
    },
    {
        label: 'TENTANG SAYA',
        visible: computed(() => {
            return ['profile-data-mahasiswa', 'profile-krs-mahasiswa', 'profile-akm-mahasiswa', 'profile-khs-mahasiswa'].some((permission) => permissions.includes(permission));
        }),
        items: [
            {
                label: 'Profile',
                icon: '',
                items: [
                    {
                        label: 'Data Mahasiswa',
                        to: '/profile-data-mahasiswa',
                        visible: computed(() => permissions.includes('profile-data-mahasiswa'))
                    },
                    {
                        label: 'Kartu Rencana Studi',
                        to: '/profile-krs-mahasiswa',
                        visible: computed(() => permissions.includes('profile-krs-mahasiswa'))
                    },
                    // {
                    //     label: 'Aktivitas Kuliah Mahasiswa',
                    //     to: '/profile-akm-mahasiswa',
                    //     visible: computed(() => permissions.includes('profile-akm-mahasiswa'))
                    // },
                    {
                        label: 'Kartu Hasil Studi',
                        to: '/profile-khs-mahasiswa',
                        visible: computed(() => permissions.includes('profile-khs-mahasiswa'))
                    }
                ]
            }
        ]
    },
    {
        label: 'KEGIATAN',
        visible: computed(() => {
            return ['perkuliahan-krs-mahasiswa', 'perkuliahan-khs-mahasiswa', 'perkuliahan-jadwal-perkuliahan', 'laporan-krs-mahasiswa', 'laporan-khs-mahasiswa', 'laporan-transkrip-mahasiswa', 'profile-tagihan-pembayaran-mahasiswa'].some(
                (permission) => permissions.includes(permission)
            );
        }),
        items: [
            {
                label: 'Perkuliahan',
                icon: '',
                visible: computed(() => {
                    return ['perkuliahan-krs-mahasiswa', 'perkuliahan-khs-mahasiswa', 'perkuliahan-jadwal-perkuliahan', 'kuesioner-penilaian-dosen-mahasiswa'].some((permission) => permissions.includes(permission));
                }),
                items: [
                    {
                        label: 'Kartu Rencana Studi Online',
                        to: '/perkuliahan-krs-mahasiswa',
                        visible: computed(() => settingGlobal.open_krs === true && permissions.includes('perkuliahan-krs-mahasiswa'))
                        // visible: computed(() => settingGlobal.includes('open_krs'))
                    },
                    {
                        label: 'Kartu Hasil Studi',
                        to: '/perkuliahan-khs-mahasiswa',
                        visible: computed(() => permissions.includes('perkuliahan-khs-mahasiswa'))
                    },
                    {
                        label: 'Jadwal Perkuliahan',
                        to: '/perkuliahan-jadwal-perkuliahan',
                        visible: computed(() => permissions.includes('perkuliahan-jadwal-perkuliahan'))
                    },
                    {
                        label: 'Kuesioner Penilaian Dosen',
                        to: '/kuesioner-penilaian-dosen',
                        visible: computed(() => permissions.includes('kuesioner-penilaian-dosen-mahasiswa'))
                    }
                ]
            },
            {
                label: 'Laporan',
                icon: '',
                visible: computed(() => {
                    return ['laporan-krs-mahasiswa', 'laporan-khs-mahasiswa', 'laporan-transkrip-mahasiswa'].some((permission) => permissions.includes(permission));
                }),
                items: [
                    {
                        label: 'Kartu Rencana Studi',
                        to: '/laporan-krs-mahasiswa',
                        visible: computed(() => permissions.includes('laporan-krs-mahasiswa'))
                    },
                    {
                        label: 'Kartu Hasil Studi',
                        to: '/laporan-khs-mahasiswa',
                        visible: computed(() => permissions.includes('laporan-khs-mahasiswa'))
                    },
                    {
                        label: 'Transkrip Nilai',
                        to: '/laporan-transkrip-mahasiswa',
                        visible: computed(() => permissions.includes('laporan-transkrip-mahasiswa'))
                    }
                ]
            },
            {
                label: 'Pembayaran',
                icon: '',
                visible: computed(() => {
                    return ['profile-tagihan-pembayaran-mahasiswa'].some((permission) => permissions.includes(permission));
                }),
                items: [
                    {
                        label: 'Tagihan',
                        to: '/tagihan-pembayaran-mahasiswa',
                        visible: computed(() => permissions.includes('profile-tagihan-pembayaran-mahasiswa'))
                    }
                ]
            }
        ]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator && item.items && item.items.length > 0" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
