<script>
import { getData } from '../../../utiils/request.js'
import Swal from "sweetalert2";

export default {
    data() {
        return {
            dataNilai: null,
            rekapDataNilai: [],
            bobotNilai:[],
            data:[]
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

                const response = await getData(`nilai-perkuliahan/get-nilai-perkuliahan-by-filter?id_semester=${req.id_semester}&id_prodi=${req.id_prodi}&nama_kelas_kuliah=${encodedNamaKelas}&format=${req.format}&tanggal_penandatanganan=${req.tanggal_penandatanganan}`);
                this.data = response.data;
                this.dataNilai = response.data.kelas_kuliah;
                this.bobotNilai = response.data.bobot_penilaian_prodi;
                this.rekapDataNilai = response.data.dataRekapNilaiPerkuliahan;
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
        },

        findNilaiByIdUnsurPenilaian(data, idUnsurPenilaian) {
        const nilai = data.find(item => item.id_unsur_penilaian === idUnsurPenilaian);
        return nilai ? nilai.nilai : '-';
    }
    },
    mounted() {
        this.getDataNilai(this.$route.query)
    },
    // computed: {
    //     totalSKS() {
    //         return this.rekapDataNilai.reduce((total, matkul) => {
    //             return total + (Number(matkul.KelasKuliah?.sks) || 0);
    //         }, 0);
    //     }
    // }
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

            <h5 class="text-center mb-3"><b>REKAP NILAI KELAS PERKULIAHAN</b></h5>
            <table class="table table-borderless mt-3">
                <tbody>
                    <tr>
                        <td style="width: 50%;">
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 20px;width: 130px;">
                                    Program Studi
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                    {{dataNilai?.Prodi?.nama_program_studi}}
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
                                    {{dataNilai?.MataKuliah?.nama_mata_kuliah}}
                                </div>
                            </div>
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 20px;width: 130px;">
                                    Dosen Pengajar
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                    {{dataNilai?.Dosen?.nama_dosen}}
                                </div>
                            </div>
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 20px;width: 130px;">
                                    Lokasi
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                    {{dataNilai?.DetailKelasKuliahs[0]?.RuangPerkuliahan?.lokasi || '-'}}
                                </div>
                            </div>
                        </td>
                        <td style="width: 50%;">
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 20px;width: 130px;">
                                    Periode
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                    {{dataNilai?.Semester?.nama_semester}}
                                </div>
                            </div>
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 20px;width: 130px;">
                                    Nama Kelas
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                   {{dataNilai?.nama_kelas_kuliah}}
                                </div>
                            </div>
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 20px;width: 130px;">
                                    Ruang Perkuliahan
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                    {{dataNilai?.DetailKelasKuliahs[0]?.RuangPerkuliahan?.nama_ruang_perkuliahan || '-'}}
                                </div>
                            </div>
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 20px;width: 130px;">
                                    Waktu Perkuliahan
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                    {{dataNilai?.DetailKelasKuliahs[0]?.jam_mulai || '00:00'}} -  {{dataNilai?.DetailKelasKuliahs[0]?.jam_selesai || '00:00'}}
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
                            <th rowspan="2">No</th>
                            <th rowspan="2">NIM</th>
                            <th rowspan="2">Nama Mahasiswa</th>
                            <th rowspan="2">Angkatan</th>
                            <th colspan="4">Nilai</th>
                            <th rowspan="2">Nilai Akhir</th>
                            <th rowspan="2">Nilai Huruf</th>
                            
                            
                        </tr>
                        <tr>
                            <th v-for="(bobot, index) in bobotNilai" :key="index">{{ bobot?.UnsurPenilaian?.nama_unsur_penilaian }}</th>
                            <!-- <th>Presensi</th>
                            <th>Tugas</th>
                            <th>UTS</th>
                            <th>UAS</th> -->
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(rekapNilai, index) in rekapDataNilai" :key="index">
                            <td>{{index + 1}}</td>
                            <td>{{rekapNilai?.Mahasiswa?.nim}}</td>
                            <td>{{rekapNilai?.Mahasiswa?.nama_mahasiswa}}</td>
                            <td>{{rekapNilai?.angkatan}}</td>
                            <td v-for="(bobot, index) in bobotNilai" :key="index">
                                {{ findNilaiByIdUnsurPenilaian(rekapNilai.NilaiPerkuliahans, bobot.id_unsur_penilaian) || '-' }}
                            </td>
                            <td>{{rekapNilai?.nilai_angka || '0'}}</td>
                            <td>{{rekapNilai?.nilai_huruf || '-'}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="col-lg-12 d-flex justify-content-end">
                <div class="flex justify-content-end gap-2">
                    <table class="table table-borderless" style="width: 100%;">
                        <tbody class="" style="display: block; text-align: left;">
                            <tr>
                                <td colspan="2">
                                    <p class="m-0">Banyuwangi, {{ formatDate(data?.tanggalPenandatanganan) }}</p>
                                    <p class="m-0">Dosen Pengajar</p>
                                    <p style="height: 70px;"></p>
                                    <p class="m-0" style="text-transform: uppercase; text-decoration: underline; font-weight: bold;">{{ dataNilai?.Dosen?.nama_dosen ?? '-' }}</p>
                                    <p class="m-0">nidn.{{ dataNilai?.Dosen?.nidn ?? '-' }}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>