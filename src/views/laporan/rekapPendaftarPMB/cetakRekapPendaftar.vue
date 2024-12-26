<script>
import { getData } from '../../../utiils/request.js';
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            rekapPendaftar: null,
            getCamaba: null,
            kopSurat: []
        };
    },
    methods: {
        getRekapPendaftar: async function (req) {
            try {
                Swal.fire({
                    title: 'Loading...',
                    html: 'Sedang Memuat Data',
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });

                const response = await getData(
                    `rekap-laporan-pmb/rekap/pendaftar-pmb/get?id_semester=${req.id_semester}&nim=${req.nim}&id_periode_pendaftaran=${req.id_periode_pendaftaran}&id_prodi_diterima=${req.id_prodi_diterima}&tanggal_penandatanganan=${req.tanggal_penandatanganan}&format=${req.format}`
                );
                this.rekapPendaftar = response.data;
                this.getCamaba = response.data.dataCamabas;
                console.log('Response:', response.data);
            } catch (error) {
                console.error('Gagal mengirim data:', error);
            }
        },
        formatTime(time) {
            if (!time) return '-';
            const [hour, minute] = time.split(':');
            return `${hour}:${minute}`;
        },
        handlePrint() {
            window.print();
        },
        formatDate(date) {
            if (!date) return '-';
            const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

            const parts = date.split('-');
            const year = parts[0];
            const month = parseInt(parts[1], 10) - 1;
            const day = parts[2];

            const formattedDate = `${day} ${months[month]} ${year}`;
            return formattedDate;
        },
        getKopSurat: async function (req) {
            try {
                const response = await getData(`perguruan-tinggi/get-data-kop-surat`);
                this.kopSurat = response.data;
                console.log('KopSurat:', response.data);
            } catch (error) {
                console.error('Gagal Mengambil data:', error);
            }
        },
        getLogoUrl() {
            return `/public/layout/images/logo.png`;
        }
    },
    mounted() {
        this.getRekapPendaftar(this.$route.query);
        this.getKopSurat();
    }
};
</script>

<template>
    <div class="card print border-0" style="height: 21cm; width: 29.7cm; font-family: Arial, Helvetica, sans-serif">
        <div class="card-body">
            <!-- <div class="heading-section" style="width: 100%">
                <img src="../../../assets/images/kopSurat.png" alt="" style="width: 100%" />
            </div> -->

            <table class="table table-borderless mt-3 text-center">
                <tbody>
                    <tr>
                        <td width="15%" class="header-logo">
                            <img :src="kopSurat?.data?.foto_profil_pt || getLogoUrl" alt="logo" width="80%" />
                        </td>
                        <td>
                            <p class="m-2 fw-bold" style="font-size: 20px">{{ kopSurat?.perguruanTinggi?.nama_perguruan_tinggi || 'NAMA PERGURUAN TINGGI' }}</p>
                            <p class="m-0">Alamat : {{ kopSurat?.data?.jalan || 'ALAMAT PERGURUAN TINGGI' }}</p>
                            <p class="m-0">Kodepos : {{ kopSurat?.data?.kode_pos || 'KODEPOS PT' }}, Telepon : {{ kopSurat?.data?.telepon || 'TELEPON PT' }}</p>
                            <p class="m-0">Website : {{ kopSurat?.data?.website || 'WEBSITE PT' }} | Email : {{ kopSurat?.data?.email || 'EMAIL PT' }} | Faximile : {{ kopSurat?.data?.telepon || 'TELEPON PT' }}</p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <hr style="border-color: black" />

            <button @click="handlePrint" class="btn-print">Cetak</button>

            <h5 class="text-center mb-3"><b>REKAPITULASI PENDAFTAR PMB</b></h5>
            <table class="table table-borderless mt-3">
                <tbody>
                    <tr>
                        <td style="width: 50%">
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 150px">Periode Pendaftaran</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">
                                    {{ rekapPendaftar?.dataPeriodePendaftaran?.nama_periode_pendaftaran }}
                                </div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 150px">Semester Pendaftaran</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">
                                    {{ rekapPendaftar?.dataPeriodePendaftaran?.Semester?.nama_semester }}
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div style="overflow-x: auto">
                <table class="table table-bordered text-center">
                    <thead class="align-middle">
                        <tr>
                            <th>No</th>
                            <th>No. Pendaftar</th>
                            <th>Nama</th>
                            <th>NIK</th>
                            <th>Periode Pendaftaran</th>
                            <th>Pilihan Prodi 1</th>
                            <th>Sudah Finalisasi</th>
                            <th>Kel. Berkas</th>
                            <th>Kel. Tes</th>
                            <th>NIM</th>
                            <th>Prodi Diterima</th>
                            <th>Sudah Menjadi Mahasiswa</th>
                            <th>Asal Sekolah</th>
                            <th>No. HP</th>
                            <th>Alamat</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(camaba, index) in getCamaba" :key="index">
                            <td>{{ index + 1 }}</td>
                            <td>{{ camaba?.nomor_daftar }}</td>
                            <td>{{ camaba?.nama_lengkap }}</td>
                            <td>{{ camaba?.BiodataCamaba?.nik }}</td>
                            <td>{{ camaba?.PeriodePendaftaran?.nama_periode_pendaftaran }}</td>
                            <td>{{ camaba?.prodiCamaba?.Prodi?.JenjangPendidikan.nama_jenjang_didik || '-' }} - {{ camaba?.prodiCamaba?.Prodi?.nama_program_studi || '-' }}</td>
                            <td>{{ camaba?.finalisasi ? 'Sudah' : 'Belum' }}</td>
                            <td>{{ camaba?.status_berkas ? 'Lulus' : 'Tidak Lulus' }}</td>
                            <td>{{ camaba?.status_tes ? 'Lulus' : 'Tidak Lulus' }}</td>
                            <td>{{ camaba?.nim }}</td>
                            <td>{{ camaba?.Prodi?.JenjangPendidikan.nama_jenjang_didik || '-' }} - {{ camaba?.Prodi?.nama_program_studi || '-' }}</td>
                            <td>{{ camaba?.status_export_mahasiswa ? 'Sudah' : 'Belum' }}</td>
                            <td>{{ camaba?.Sekolah?.sekolah }}</td>
                            <td>{{ camaba?.nomor_hp }}</td>
                            <td>Jalan {{ camaba?.BiodataCamaba?.jalan }}, Dusun {{ camaba?.BiodataCamaba?.dusun }}, RT/RW {{ camaba?.BiodataCamaba?.rt }}/{{ camaba?.BiodataCamaba?.rw }}, Kelurahan/Desa {{ camaba?.BiodataCamaba?.kelurahan }}</td>
                            <td>{{ camaba?.email }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <table class="table table-borderless mt-3">
                <tbody>
                    <tr>
                        <td style="width: 50%">
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 300px">Jumlah Pendaftar</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">
                                    {{ rekapPendaftar?.totalDataCamaba }}
                                </div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 300px">Jumlah Pendaftar Lulus Berkas</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">
                                    {{ rekapPendaftar?.jumlah_pendaftar_lulus_berkas }}
                                </div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 300px">Jumlah Pendaftar Lulus Tes</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">
                                    {{ rekapPendaftar?.jumlah_pendaftar_lulus_tes }}
                                </div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 300px">Jumlah Pendaftar Sudah Menjadi Mahasiswa</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">
                                    {{ rekapPendaftar?.jumlah_pendaftar_sudah_mahasiswa }}
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="col-lg-12 d-flex justify-content-end">
                <div class="flex justify-content-end gap-2">
                    <table class="table table-borderless" style="width: 100%">
                        <tbody class="" style="display: block; text-align: left">
                            <tr>
                                <td colspan="2">
                                    <p class="m-0">Banyuwangi, {{ formatDate(rekapPendaftar?.tanggalPenandatanganan) }}</p>
                                    <p style="height: 70px"></p>
                                    <p>--------------------------------------------</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>