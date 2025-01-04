
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
        getDataKrs: async function (query) {
            try {
                Swal.fire({
                    title: 'Loading...',
                    html: 'Sedang Memuat Data',
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });

                // Mengambil id_semester dari query parameter
                const id_semester = query.id_semester;
                const response = await getData(`rekap-krs-mahasiswa/${id_semester}/cetak-krs-mahasiswa`);
                this.krsData = response.data;
                this.rekapKrsData = response.data.dataRekapKRSMahasiswa;
                console.log('Response:', response.data);
            } catch (error) {
                console.error('Gagal mengirim data:', error);
            }
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
        getLogoUrl() {
            return `/layout/images/ubi.jpg`;
        }
    },
    mounted() {
        this.getDataKrs(this.$route.query);
        this.getKopSurat();
    }
};
</script>


<template>
    <div class="card print border-0" style="width: 24cm; min-height: 29.7cm; height: auto; font-family: Arial, Helvetica, sans-serif">
        <div class="card-body">
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
            <table class="table table-borderless mt-3">
                <tbody>
                    <tr>
                        <td style="width: 50%">
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 110px">Nama</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">
                                    {{ krsData?.mahasiswa.nama_mahasiswa }}
                                </div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 110px">Program Studi</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">
                                    {{ krsData?.mahasiswa.Prodi.nama_program_studi }}
                                </div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 110px">Semester</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">
                                    {{ krsData?.mahasiswa?.Semester?.semester }}
                                </div>
                            </div>
                        </td>
                        <td style="width: 50%">
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 110px">NIM</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">
                                    {{ krsData?.mahasiswa.nim }}
                                </div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 110px">Periode</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">
                                    {{ krsData?.mahasiswa?.Semester?.nama_semester }}
                                </div>
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
                    <tr v-for="(matkul, index) in rekapKrsData" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td width="10%">{{ matkul.kode_mata_kuliah }}</td>
                        <td>{{ matkul.nama_mata_kuliah }}</td>
                        <td>{{ matkul?.nama_dosen }}</td>
                        <td>{{ matkul?.sks_mata_kuliah }}</td>
                        <td>{{ matkul?.nama_kelas_kuliah }}</td>
                        <td>{{ matkul?.KelasKuliah?.DetailKelasKuliahs[0]?.RuangPerkuliahan?.nama_ruang_perkuliahan ?? '-' }}</td>
                        <td>{{ matkul?.KelasKuliah?.DetailKelasKuliahs[0]?.hari ?? '-' }}</td>
                        <td>{{ matkul?.KelasKuliah?.DetailKelasKuliahs?.length > 0 ? `${formatTime(matkul?.KelasKuliah?.DetailKelasKuliahs[0]?.jam_mulai)} - ${formatTime(matkul?.KelasKuliah?.DetailKelasKuliahs[0]?.jam_selesai)}` : '-' }}</td>
                    </tr>
                    <tr>
                        <td class="text-center" colspan="4">Jumlah</td>
                        <td class="text-center" colspan="1">{{}}</td>
                        <td class="text-center" colspan="4"></td>
                    </tr>
                </tbody>
            </table>

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
                            <p class="m-0">Mahasiswa</p>
                            <p style="height: 70px"></p>
                            <p class="m-0" style="text-transform: uppercase; text-decoration: underline; font-weight: bold">{{ krsData?.mahasiswa?.nama_mahasiswa ?? '-' }}</p>
                            <p class="m-0">{{ krsData?.mahasiswa?.nim ?? '-' }}</p>
                        </td>
                        <td width="50%">
                            <p class="m-0">Banyuwangi, {{ formatDate(krsData?.tanggal_penandatanganan) }}</p>
                            <p class="m-0">Pembimbing Akademik</p>
                            <p style="height: 70px"></p>
                            <p class="m-0" style="text-transform: uppercase; text-decoration: underline; font-weight: bold">{{ krsData?.dosen_wali?.Dosen?.nama_dosen ?? '-' }}</p>
                            <p class="m-0">08976768757</p>
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