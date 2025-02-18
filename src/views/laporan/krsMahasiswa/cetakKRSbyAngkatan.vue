
<script>
import { getData } from '../../../utiils/request.js';
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            krsData: null,
            rekapKrsData: [],
            rekapSks: [],
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

                const response = await getData(
                    `rekap-krs-mahasiswa/get-rekap-krs-mahasiswa?jenis_cetak=${req.jenis_cetak}&id_prodi=${req.id_prodi}&id_angkatan=${req.id_angkatan}&id_semester=${req.id_semester}&tanggal_penandatanganan=${req.tanggal_penandatanganan}`
                );
                this.krsData = response.data;
                this.rekapKrsData = response.data.dataRekapKRSByMahasiswa;
                this.rekapSks = response.data.dataRekapKRSByMahasiswa.krs_mahasiswas;
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
        this.getDataKrs(this.$route.query);
        this.getKopSurat();
    },
    computed: {
        totalSKS() {
            // Pastikan rekapKrsData adalah array sebelum menggunakan reduce
            if (!Array.isArray(this.rekapKrsData)) return 0;

            return this.rekapKrsData.reduce((total, rekap) => {
                // Pastikan krs_mahasiswas adalah array sebelum reduce
                if (!Array.isArray(rekap?.krs_mahasiswas)) return total;

                return (
                    total +
                    rekap.krs_mahasiswas.reduce((subtotal, matkul) => {
                        // Mengambil nilai sks, hilangkan spasi dan konversi ke angka
                        const sks = parseFloat(matkul.KelasKuliah?.sks.trim());
                        if (!isNaN(sks)) {
                            return subtotal + sks;
                        }
                        return subtotal; // Jika sks tidak valid, lewati
                    }, 0)
                );
            }, 0);
        }
    }
};
</script>


<template>
    <div class="card print border-0" style="width: 24cm; min-height: 29.7cm; height: auto; font-family: Arial, Helvetica, sans-serif">
        <div class="card-body">
            <!-- <div class="heading-section" style="width: 100%;">
                <img src="../../../assets/images/kopSurat.png" alt="" style="width: 100%;">
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

            <h5 class="text-center mb-3"><b>KARTU RENCANA STUDI (KRS)</b></h5>

            <div v-for="(rekap, index) in rekapKrsData" :key="index">
                <table class="table table-borderless mt-3 mb-3">
                    <tbody>
                        <tr>
                            <td style="width: 50%">
                                <div style="display: flex; align-items: flex-start">
                                    <div style="margin-left: 15px; width: 110px">Nama</div>
                                    <div style="margin-right: 6px">:</div>
                                    <div style="margin-right: 10px">
                                        {{ rekap?.krs_mahasiswas[0]?.Mahasiswa?.nama_mahasiswa || '-' }}
                                    </div>
                                </div>
                                <div style="display: flex; align-items: flex-start">
                                    <div style="margin-left: 15px; width: 110px">Program Studi</div>
                                    <div style="margin-right: 6px">:</div>
                                    <div style="margin-right: 10px">
                                        {{ rekap?.krs_mahasiswas[0]?.KelasKuliah?.Prodi?.nama_program_studi || '-' }}
                                    </div>
                                </div>
                                <div style="display: flex; align-items: flex-start">
                                    <div style="margin-left: 15px; width: 110px">Semester</div>
                                    <div style="margin-right: 6px">:</div>
                                    <div style="margin-right: 10px">
                                        {{ rekap?.krs_mahasiswas[0]?.KelasKuliah?.Semester?.nama_semester || '-' }}
                                    </div>
                                </div>
                            </td>
                            <td style="width: 50%">
                                <div style="display: flex; align-items: flex-start">
                                    <div style="margin-left: 15px; width: 110px">NIM</div>
                                    <div style="margin-right: 6px">:</div>
                                    <div style="margin-right: 10px">
                                        {{ rekap?.krs_mahasiswas[0]?.Mahasiswa?.nim || '-' }}
                                    </div>
                                </div>
                                <div style="display: flex; align-items: flex-start">
                                    <div style="margin-left: 15px; width: 110px">Periode</div>
                                    <div style="margin-right: 6px">:</div>
                                    <div style="margin-right: 10px"><!-- {{ krsData?.mahasiswa.Semester.nama_semester }} -->{{ rekap?.krs_mahasiswas[0]?.KelasKuliah?.Semester?.nama_semester || '-' }}</div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <table class="table table-bordered text-center">
                    <thead class="align-middle">
                        <tr>
                            <th rowspan="2">No</th>
                            <th rowspan="2">Kode MK</th>
                            <th rowspan="2">Nama MK</th>
                            <th rowspan="2">Dosen Pengajar</th>
                            <th rowspan="2">SKS</th>
                            <th rowspan="2">Kelas</th>
                            <th colspan="3">Jadwal Perkuliahan</th>
                        </tr>
                        <tr>
                            <th>Ruang</th>
                            <th>Hari</th>
                            <th>Waktu</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(matkul, idx) in rekap?.krs_mahasiswas" :key="idx">
                            <td>{{ idx + 1 }}</td>
                            <td width="10%">{{ matkul.KelasKuliah.MataKuliah.kode_mata_kuliah }}</td>
                            <td>{{ matkul.KelasKuliah.MataKuliah.nama_mata_kuliah }}</td>
                            <td>{{ matkul.KelasKuliah.Dosen.nama_dosen }}</td>
                            <td>{{ matkul.KelasKuliah.sks }}</td>
                            <td>{{ matkul.KelasKuliah.nama_kelas_kuliah }}</td>
                            <td>{{ matkul.KelasKuliah.DetailKelasKuliahs[0]?.RuangPerkuliahan?.nama_ruang_perkuliahan ?? '-' }}</td>
                            <td>{{ matkul.KelasKuliah.DetailKelasKuliahs[0]?.hari ?? '-' }}</td>
                            <td>{{ matkul.KelasKuliah.DetailKelasKuliahs.length > 0 ? `${formatTime(matkul.KelasKuliah.DetailKelasKuliahs[0]?.jam_mulai)} - ${formatTime(matkul.KelasKuliah.DetailKelasKuliahs[0]?.jam_selesai)}` : '-' }}</td>
                        </tr>
                        <tr>
                            <td class="text-center" colspan="4">Jumlah</td>
                            <td class="text-center" colspan="1">{{ totalSKS }}</td>
                            <td class="text-center" colspan="4"></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- <div class="page-break"></div> -->
            <!-- <div class="printing" style="margin-left: 470px;">
                <p class="m-0">{{ formatDate(krsData?.tanggalPenandatanganan) }}</p>
                <p class="m-0">{{ krsData?.unitJabatan?.Jabatan?.nama_jabatan }}</p>
                <p style="height: 70px;"></p>
                <p class="m-0" style="text-transform: uppercase; text-decoration: underline; font-weight: bold;">{{ krsData?.unitJabatan?.nama_penandatanganan }}</p>
                <p class="m-0">NIP. {{ krsData?.unitJabatan?.Dosen?.nip ?? '-' }}</p>
            </div> -->
            <table class="table table-borderless">
                <tbody class="text-center">
                    <tr>
                        <td width="50%">
                            <p class="mb-4"></p>
                            <p class="m-0"></p>
                            <p style="height: 70px"></p>
                            <p class="m-0" style="text-transform: uppercase; text-decoration: underline; font-weight: bold"></p>
                            <p class="m-0"></p>
                        </td>
                        <td width="50%">
                            <p class="m-0">Banyuwangi, {{ formatDate(krsData?.tanggalPenandatanganan) }}</p>
                            <p class="m-0">Pembimbing Akademik</p>
                            <p style="height: 70px"></p>
                            <p class="m-0" style="text-transform: uppercase; text-decoration: underline; font-weight: bold">{{ krsData?.dosen_wali?.Dosen?.nama_dosen ?? '-' }}</p>
                            <p class="m-0">-</p>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <p class="m-0">{{ krsData?.unitJabatan?.Jabatan?.nama_jabatan ?? '-' }}</p>
                            <p style="height: 70px"></p>
                            <p class="m-0" style="text-transform: uppercase; text-decoration: underline; font-weight: bold">{{ krsData?.unitJabatan?.nama_penandatanganan ?? '-' }}</p>
                            <p class="m-0">{{ krsData?.unitJabatan?.Dosen?.nip ?? '-' }}</p>
                        </td>
                    </tr>
                </tbody>
            </table>
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