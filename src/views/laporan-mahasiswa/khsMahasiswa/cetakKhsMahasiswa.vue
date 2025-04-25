<script>
import { getData } from '../../../utiils/request.js';
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            krsData: null,
            getRekapKhsData: null,
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

                // Memanggil API dengan id_semester yang diperoleh
                const response = await getData(`rekap-khs-mahasiswa/${id_semester}/cetak-khs-mahasiswa`);

                // Mengisi data KRS
                this.krsData = response.data;
                this.getRekapKhsData = response.data.dataRekapKHSMahasiswa;

                console.log('Response:', response.data);
                console.log('Response2:', response.data.dataRekapKHSMahasiswa);

                Swal.close();
            } catch (error) {
                console.error('Gagal mengambil data:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Gagal mengambil data KHS'
                });
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
            const month = parseInt(parts[1], 10) - 1;
            const day = parts[2];

            const formattedDate = `${day} ${months[month]} ${year}`;
            return formattedDate;
        },
        getLogoUrl() {
            return `/layout/images/ubi.jpg`;
        }
    },
    mounted() {
        // Memanggil getDataKrs dengan query parameters dari URL
        this.getDataKrs(this.$route.query);
        this.getKopSurat();
    },
    computed: {
        totalSKS() {
            // Menghitung total SKS dari data rekapKrsData
            return this.krsData.reduce((total, matkul) => {
                return total + (Number(matkul.KelasKuliah?.sks) || 0);
            }, 0);
        }
    }
};
</script>

<template>
    <div class="card print border-0" style="width: 24cm; height: 29.7cm; font-family: Arial, Helvetica, sans-serif">
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

            <h5 class="text-center mb-3"><b>KARTU HASIL STUDI (KHS)</b></h5>
            <table class="table table-borderless mt-3">
                <tbody>
                    <tr>
                        <td style="width: 50%">
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 110px">Nama</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">
                                    {{ krsData?.mahasiswa?.nama_mahasiswa }}
                                </div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 110px">Program Studi</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">
                                    {{ krsData?.mahasiswa?.Prodi?.nama_program_studi }}
                                </div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 110px">Semester</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">
                                    {{ krsData?.semester?.semester }}
                                </div>
                            </div>
                        </td>
                        <td style="width: 50%">
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 110px">NIM</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">
                                    {{ krsData?.mahasiswa?.nim }}
                                </div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 110px">Periode</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">
                                    {{ krsData?.semester?.nama_semester }}
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
                            <th rowspan="2">No</th>
                            <th rowspan="3">Nama Mata Kuliah</th>
                            <th rowspan="2">SKS</th>
                            <th colspan="3">Nilai</th>
                            <th rowspan="2">SKS*Index</th>
                        </tr>
                        <tr>
                            <th>Angka</th>
                            <th>Huruf</th>
                            <th>Index</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(nilai, index) in getRekapKhsData" :key="index">
                            <td>{{ index + 1 }}</td>
                            <td>{{ nilai.MataKuliah.nama_mata_kuliah }}</td>
                            <td>{{ nilai?.MataKuliah.sks_mata_kuliah ? parseFloat(nilai?.MataKuliah.sks_mata_kuliah).toFixed(0) : '-' }}</td>
                            <td>{{ nilai.nilai_angka }}</td>
                            <td>{{ nilai.nilai_huruf }}</td>
                            <td>{{ nilai.nilai_indeks }}</td>
                            <td>{{ nilai?.sks_x_indeks ? parseFloat(nilai?.sks_x_indeks).toFixed(2) : '-' }}</td>
                        </tr>
                        <tr>
                            <td class="text-center" colspan="6">IPS (Index Prestasi Semester )</td>
                            <td>{{ krsData?.ips }}</td>
                        </tr>
                        <tr>
                            <td class="text-center" colspan="6">IPK (Index Prestasi Kumulatif )</td>
                            <td>{{ krsData?.ipk }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>