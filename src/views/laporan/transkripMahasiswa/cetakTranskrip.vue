<script>
import { getData } from '../../../utiils/request.js'
import Swal from "sweetalert2";

export default {
    data() {
        return {
            data:[],
            dataNilai:[]
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

                const response = await getData(`rekap-transkrip-nilai/get-rekap-transkrip-nilai?nim=${req.nim}&format=${req.format}&tanggal_penandatanganan=${req.tanggal_penandatanganan}`);
                this.data = response.data;
                this.dataNilai = response.data.dataRekapTranskripNilai
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
    <div class="card print border-0" style="width: 21cm; height: 29.7cm; font-family: Arial, Helvetica, sans-serif" >
        <div class="card-body">
            <div class="heading-section" style="width: 100%;">
                <img src="../../../assets/images/kopSurat.png" alt="" style="width: 100%;">
            </div>
            <button @click="handlePrint" class="btn-print">Cetak</button>

            <table class="table table-borderless mt-3">
                <tbody>
                    <tr>
                        <h5 class="text-center mb-3"><b>TRANSKRIP MAHASISWA</b></h5>
                    </tr>
                    <tr>
                        <td style="width: 50%;">
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 15px;width: 130px;">
                                    NIM
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                    {{data?.mahasiswa?.nim}}
                                </div>
                            </div>
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 15px;width: 130px;">
                                    Nama
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                   {{data?.mahasiswa?.nama_mahasiswa}}
                                </div>
                            </div>
                            
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 15px;width: 130px;">
                                    Status Mahasiswa
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                    {{data?.mahasiswa?.nama_status_mahasiswa}}
                                </div>
                            </div>
                        </td>
                        <td style="width: 50%;">
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 15px;width: 130px;">
                                    Program Studi
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                   {{data?.mahasiswa?.Prodi?.nama_program_studi}}
                                </div>
                            </div>
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 15px;width: 130px;">
                                    Jenis Kelamin
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                    {{data?.mahasiswa?.jenis_kelamin}}
                                </div>
                            </div>
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 15px;width: 130px;">
                                    Agama
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                   {{data?.mahasiswa?.Agama?.nama_agama || '-'}}
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
                            <th rowspan="2">Kode Mata Kuliah</th>
                            <th rowspan="2">Nama Mata Kuliah</th>
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
                        <tr v-for="(nilai, index) in dataNilai" :key="index">
                            <td>{{index + 1}}</td>
                            <td>{{nilai?.kode_mata_kuliah}}</td>
                            <td>{{nilai?.nama_mata_kuliah}}</td>
                            <td>{{nilai?.sks_mata_kuliah}}</td>
                            <td>{{nilai?.nilai_angka}}</td>
                            <td>{{nilai?.nilai_huruf}}</td>
                            <td>{{nilai?.nilai_indeks}}</td>
                            <td>{{nilai?.total_sks_indeks}}</td>
                            
                        </tr>
                        <tr>
                            <td  class="text-center" colspan="3">Total SKS</td>
                            <td  class="text-center" colspan="1">{{data?.total_sks}}</td>
                            <td  class="text-center" colspan="3"></td>
                            <td  class="text-center" colspan="1">{{data?.total_sks_indeks}}</td>
                        </tr>
                        <tr >
                            <td class="text-center" colspan="7">IPK (Index Prestasi Kumulatif ) </td>
                            <td>{{data?.ipk}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>