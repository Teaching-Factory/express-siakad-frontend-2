
<script>
import { getData } from '../../../utiils/request.js';
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            krsData: null,
            rekapKrsData: [],
            kopSurat: []
        };
    },
    methods: {
        getDataKrs: async function (req) {
            try {
                Swal.fire({
                    title: 'Loading...',
                    html: 'Sedang Memuat Data',
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });

                const response = await getData(`rekap-krs-mahasiswa/get-rekap-krs-mahasiswa?jenis_cetak=${req.jenis_cetak}&nim=${req.nim}&id_semester=${req.id_semester}&tanggal_penandatanganan=${req.tanggal_penandatanganan}&format=${req.format}`);
                this.krsData = response.data;
                this.rekapKrsData = response.data.dataRekapKRSByMahasiswa;
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
            const month = parseInt(parts[1], 10) - 1; // January is 0
            const day = parts[2];

            const formattedDate = `${day} ${months[month]} ${year}`;
            return formattedDate;
        },
        getKopSurat: async function () {
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
        this.getDataKrs(this.$route.query);
        this.getKopSurat();
    },

    computed: {
        totalSKS() {
            return this.rekapKrsData.reduce((total, matkul) => {
                return total + (Number(matkul.KelasKuliah?.sks) || 0);
            }, 0);
        }
    }
};

// const logoUrl = computed(() => {
//     return `/public/ubi.png`;
// });
</script>


<template>
    <div class="card print border-0" style="height: 21cm; width: 29.7cm; height: auto; font-family: Arial, Helvetica, sans-serif">
        <div class="card-body">
            <!-- <div class="heading-section" style="width: 100%;">
                <img src="../../../assets/images/kopSurat.png" alt="" style="width: 100%;">
            </div>
            <button @click="handlePrint" class="btn-print">Cetak</button> -->

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
            <h5 class="text-center mt-5 mb-5"><b>LAPORAN REKAP PEMBAYARAN PMB</b></h5>
            <table class="table table-borderless mt-3">
                <tbody>
                    <tr>
                        <td style="width: 50%">
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 110px">Periode</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">17 Desember 2024 s/d 20 Desember 2024</div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table class="table table-bordered">
                <thead class="align-middle">
                    <tr>
                        <th rowspan="2">No</th>
                        <th rowspan="2">Tanggal Pembayaran</th>
                        <th rowspan="2">No Pendaftaran</th>
                        <th rowspan="2">Nama Calon Mahasiswa</th>
                        <th rowspan="2">Prodi Diterima</th>
                        <th rowspan="2">Jumlah Pembayaran</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td width="10%">10.10.2024</td>
                        <td>987654434567897654</td>
                        <td>Aida Andinar</td>
                        <td>Teknik Informatika</td>
                        <td>70.000</td>
                    </tr>
                    <tr>
                        <td class="text-center" colspan="5">Total</td>
                        <td>70.000</td>
                    </tr>
                </tbody>
            </table>
            <div class="col-lg-12 d-flex justify-content-end">
                <div class="flex justify-content-end gap-2">
                    <table class="table table-borderless" style="width: 100%">
                        <tbody class="" style="display: block; text-align: left">
                            <tr>
                                <td colspan="2">
                                    <p class="m-0">Banyuwangi, {{ formatDate(data?.tanggalPenandatanganan) }}</p>
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

<!-- <style scoped>
@media print {
    .printing {
        margin-top: 2cm;
    }
}
.page-break {
    page-break-after: always;
}
</style> -->