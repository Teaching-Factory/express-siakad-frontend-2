<script>
import { getData } from '../../../utiils/request.js'
import Swal from "sweetalert2";

export default {
    data() {
        return {     
            dataPresensi: [],
            rekapPresensi:[]
        };
    },
    methods: {
        getDataNilai: async function(req) {
            try {
                Swal.fire({
                    title: 'Loading...',
                    html: 'Sedang Memuat Data',
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });
                
                const encodedNamaKelas = encodeURIComponent(req.nama_kelas_kuliah);

                const response = await getData(`rekap-presensi-kelas/get-rekap-presensi-kelas-by-filter?id_semester=${req.id_semester}&id_prodi=${req.id_prodi}&nama_kelas_kuliah=${encodedNamaKelas}&format=${req.format}&tanggal_penandatanganan=${req.tanggal_penandatanganan}`);
                this.dataPresensi = response.data;
                this.rekapPresensi = response.data.data;
               
                console.log('Response:', response.data)
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
            const months = [
                'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
                'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
            ];

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
        this.getDataNilai(this.$route.query)
    },
   
}
</script>
<template>
    <div class="card print border-0" style="width: 24cm; height: 29.7cm; font-family: Arial, Helvetica, sans-serif" >
        <div class="card-body">
            <!-- <div class="heading-section" style="width: 100%;">
                <img src="../../../assets/images/kopSurat.png" alt="" style="width: 100%;">
            </div> -->

            <table class="table table-borderless mt-3 text-center">
                <tbody>
                    <tr>
                        <td width="15%" class="header-logo">
                            <img :src="getLogoUrl()" alt="logo" width="100%" />
                        </td>
                        <td>
                            <p class="m-2 fw-bold" style="font-size: 20px;"> NAMA PERGURUAN TINGGI</p>
                            <p class="m-0">Alamat : Kampus terpadu bumi cempokosari no 40 Cluring Banyuwangi</p>
                            <p class="m-0">Kodepos : 68482, Telepon : (0333) 3912341</p>
                            <p class="m-0">Website : https://www.ubibanyuwangi.ac.id/ | Email : office@ubibanyuwangi.ac.id | Faximile : (0333) 3912341</p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <hr style="border-color: black;">

            <button @click="handlePrint" class="btn-print">Cetak</button>

            <h5 class="text-center mb-3"><b>REKAP PRESENSI KELAS PERKULIAHAN</b></h5>
            <table class="table table-borderless mt-3">
                <tbody>
                    <tr>
                        <td style="width: 50%;">
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 20px;width: 130px;">
                                    Periode
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                    {{dataPresensi?.kelas_kuliah?.Semester?.nama_semester}}
                                </div>
                            </div>
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 20px;width: 130px;">
                                    Program Studi
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                    {{dataPresensi?.kelas_kuliah?.Prodi?.nama_program_studi}}
                                </div>
                            </div>
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 20px;width: 130px;">
                                    Mata Kuliah
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                   {{dataPresensi?.kelas_kuliah?.MataKuliah?.nama_mata_kuliah}}
                                </div>
                            </div>
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 20px;width: 130px;">
                                    Nama Dosen
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                    {{dataPresensi?.kelas_kuliah?.Dosen?.nama_dosen}}
                                </div>
                            </div>
                        </td>
                        <td style="width: 50%;">
                            
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 20px;width: 130px;">
                                    Kelas
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                    {{dataPresensi?.kelas_kuliah?.nama_kelas_kuliah}}
                                </div>
                            </div>
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 20px;width: 130px;">
                                    Jumlah Peserta
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                     {{ dataPresensi?.jumlah_peserta }}
                                </div>
                            </div>
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 20px;width: 130px;">
                                    Jumlah Pertemuan
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                     {{ dataPresensi?.jumlah_pertemuan }}
                                </div>
                            </div>
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 20px;width: 130px;">
                                    NIDN
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                     {{dataPresensi?.kelas_kuliah?.Dosen?.nidn}}
                                </div>
                            </div>
                        </td>
                    </tr>

                </tbody>
            </table>

            <div style="overflow-x: auto;">
                <table class="table table-bordered text-center">
                    <thead class="align-middle">
                        <tr>
                            <th>No</th>
                            <th>NIM</th>
                            <th>Nama Mahasiswa</th>
                            <th>Jumlah Hadir</th>
                            <th>Jumlah Izin</th>
                            <th>Jumlah Sakit</th>
                            <th>Jumlah Alfa</th>
                            <th>Presentase Kehadiran</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(presensi, index) in rekapPresensi" :key="index">
                            <td>{{ index + 1 }}</td>
                            <td>{{presensi?.Mahasiswa?.nim}}</td>
                            <td>{{presensi?.Mahasiswa?.nama_mahasiswa}}</td>
                            <td>{{ presensi?.jumlah_kehadiran }}</td>
                            <td>{{ presensi?.jumlah_izin }}</td>
                            <td>{{ presensi?.jumlah_sakit }}</td>
                            <td> {{ presensi?.jumlah_alfa }}</td>
                            <td>{{ presensi?.presentase_kehadiran }} %</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>