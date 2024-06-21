<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Beranda',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/dashboard' }]
    },
    {
        label: 'Akademik',
        items: [
            {
                label: 'Mahasiswa',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Import Data Mahasiswa',
                        to: '/import-mahasiswa'
                    },
                    {
                        label: 'Daftar Mahasiswa',
                        to: '/daftar-mahasiswa'
                    },
                    {
                        label: 'Set Status Mahasiswa',
                        to: '/set-status-mahasiswa'
                    },
                    {
                        label: 'Set Sistem Kuliah Mahasiswa',
                        to: '/set-sistem-kuliah-mahasiswa'
                    },
                    {
                        label: 'Validasi KRS Mahasiswa',
                        to: '/validasi-krs-mahasiswa'
                    },
                    {
                        label: 'Import Aktivitas Mahasiswa',
                        to: '/import-aktivitas-mahasiswa'
                    },
                    {
                        label: 'Data Mahasiswa Belum KRS',
                        to: '/mahasiswa-belum-krs'
                    },
                    {
                        label: 'Hitung Transkrip',
                        to: '/perhitungan-transkrip'
                    },
                    {
                        label: 'Set Aktif Aktivitas Kuliah Mahasiswa',
                        to: '/set-aktif-akm'
                    },
                    {
                        label: 'Cek Mahasiswa Belum Set Sistem Kuliah',
                        to: '/belum-set-sk'
                    }
                ]
            },
            {
                label: 'Perkuliahan',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Kelas dan Jadwal',
                        to: '/kelas-jadwal-perkuliahan'
                    },
                    {
                        label: 'Nilai Perkuliahan',
                        to: '/nilai-perkuliahan'
                    },
                    {
                        label: 'Presensi Perkuliahan',
                        to: '/presensi-perkuliahan'
                    },
                    {
                        label: 'Aktivitas Mahasiswa',
                        to: '/aktivitas-mahasiswa'
                    },
                    {
                        label: 'Daftar Kelas Aktif',
                        to: '/kelas-aktif'
                    }
                ]
            },
            {
                label: 'Dosen Wali',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Daftar Dosen Wali',
                        to: '/daftar-dosen-wali'
                    },
                    {
                        label: 'Manajemen Mahasiswa Wali',
                        to: '/manajemen-mahasiswa-wali'
                    },
                    {
                        label: 'Mahasiswa Wali (Kolektif)',
                        to: '/set-kolektif-dosenwali'
                    }
                ]
            }
        ]
    },
    {
        label: 'Data',
        items: [
            {
                label: 'Referensi',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Sistem Kuliah',
                        to: '/sistem-kuliah'
                    },
                    {
                        label: 'Ruang Perkuliahan',
                        to: '/ruang-perkuliahan'
                    },
                    {
                        label: 'Unsur Penilaian',
                        to: '/unsur-penilaian'
                    },
                    {
                        label: 'Bobot Penilaian',
                        to: '/bobot-penilaian'
                    },
                    {
                        label: 'Jabatan',
                        to: '/daftar-jabatan'
                    },
                    {
                        label: 'Unit Jabatan',
                        to: '/unit-jabatan'
                    },
                    {
                        label: 'Wilayah',
                        to: '/data-wilayah'
                    }
                ]
            },
            {
                label: 'Keuangan',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Daftar Tagihan',
                        to: '/daftar-tagihan'
                    },
                    {
                        label: 'Daftar Pembayaran',
                        to: '/daftar-pembayaran'
                    }
                ]
            },
            {
                label: 'Daftar Berita',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Membuat Berita',
                        to: '/daftar-berita'
                    }
                ]
            }
        ]
    },
    {
        label: 'Laporan',
        items: [
            {
                label: 'Mahasiswa',
                icon: '',
                items: [
                    {
                        label: 'KRS Mahasiswa',
                        to: '/krs-mahasiswa'
                    },
                    {
                        label: 'KHS Mahasiswa',
                        to: '/khs-mahasiswa'
                    },
                    {
                        label: 'Transkrip Mahasiswa',
                        to: '/transkrip-mahasiswa'
                    }
                ]
            },
            {
                label: 'Kelas Perkuliahan',
                icon: '',
                items: [
                    {
                        label: 'Rekap Nilai Kelas',
                        to: '/rekap-nilai-kelas'
                    },
                    {
                        label: 'Rekap Presensi Kelas',
                        to: '/rekap-presensi-kelas'
                    },
                    {
                        label: 'Jadwal Kuliah',
                        to: '/jadwal-kuliah'
                    }
                ]
            },
            {
                label: 'KRS',
                icon: '',
                items: [
                    {
                        label: 'Daftar Mahasiswa Belum KRS',
                        to: '/daftar-belum-krs'
                    }
                ]
            }
        ]
    },
    {
        label: 'Settings',
        items: [
            {
                label: 'Manajement',
                icon: '',
                items: [
                    {
                        label: 'Manajemen Role',
                        to: '/manajemen-role'
                    },
                    {
                        label: 'Manajemen User',
                        to: '/manajemen-user'
                    },
                    {
                        label: 'Generate User Mahasiswa',
                        to: '/generate-user-mahasiswa'
                    },
                    {
                        label: 'Generate User Dosen',
                        to: '/generate-user-dosen'
                    }
                ]
            },
            {
                label: 'Setting',
                icon: '',
                items: [
                    {
                        label: 'Setting Global',
                        to: '/setting-global'
                    },
                    {
                        label: 'Ubah Setting WS',
                        to: '/setting-ws'
                    },
                    {
                        label: 'Ubah Identititas PT',
                        to: '/setting-identitaspt'
                    }
                ]
            }
        ]
    },
    {
        label: 'TENTANG SAYA',
        items: [
            {
                label: 'Profile',
                icon: '',
                items: [
                    {
                        label: 'Data Mahasiswa',
                        to: '/profile-data-mahasiswa'
                    },
                    {
                        label: 'Kartu Rencana Studi',
                        to: '/profile-krs-mahasiswa'
                    },
                    {
                        label: 'Aktivitas Kuliah Mahasiswa',
                        to: '/profile-akm-mahasiswa'
                    },
                    {
                        label: 'Kartu Hasil Studi',
                        to: '/profile-khs-mahasiswa'
                    },
                    {
                        label: 'Tagihan dan Pembayaran',
                        to: '/profile-tagihan-pembayaran-mahasiswa'
                    }
                ]
            }
        ]
    },
    {
        label: 'KEGIATAN',
        items: [
            {
                label: 'Perkuliahan',
                icon: '',
                items: [
                    {
                        label: 'Kartu Rencana Studi Online',
                        to: '/perkuliahan-krs-mahasiswa'
                    },
                    {
                        label: 'Kartu Hasil Studi',
                        to: '/perkuliahan-khs-mahasiswa'
                    },
                    {
                        label: 'Jadwal Perkuliahan',
                        to: '/perkuliahan-jadwal-perkuliahan'
                    }
                ]
            },
            {
                label: 'Laporan',
                icon: '',
                items: [
                    {
                        label: 'Kartu Rencana Studi',
                        to: '/laporan-krs-mahasiswa'
                    },
                    {
                        label: 'Kartu Hasil Studi',
                        to: '/laporan-khs-mahasiswa'
                    },
                    {
                        label: 'Transkrip Nilai',
                        to: '/laporan-transkrip-mahasiswa'
                    }
                ]
            },
            {
                label: 'Pembayaran',
                icon: '',
                items: [
                    {
                        label: 'Tagihan',
                        to: '/'
                    }
                ]
            }
        ]
    },
    {
        label: 'AKADEMIK (DOSEN)',
        items: [
            {
                label: 'Perkuliahan',
                icon: '',
                items: [
                    {
                        label: 'Jadwal Kelas Perkuliahan',
                        to: '/jadwal-kelas-perkuliahan'
                    },
                    {
                        label: 'Presensi Perkuliahan',
                        to: '/presensi-perkuliahan'
                    }
                ]
            },
        ]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
