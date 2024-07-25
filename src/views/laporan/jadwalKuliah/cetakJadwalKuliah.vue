<script>
import { getData } from '../../../utiils/request.js'
import Swal from "sweetalert2";

export default {
    data() {
        return {
            rekapJadwal: null,
            getBelumKrs: []
        };
    },
    methods: {
        getDataBelumKrs: async function(req) {
            try {
                Swal.fire({
                    title: 'Loading...',
                    html: 'Sedang Memuat Data',
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });
                
                const response = await getData(`rekap-jadwal-kuliah/get-rekap-jadwal-kuliah-by-filter?id_prodi=${req.id_prodi}&id_kurikulum=${req.id_kurikulum}&id_semester=${req.id_semester}&semester=${req.semester}&tanggal_penandatanganan=${req.tanggal_penandatanganan}`);
                this.rekapJadwal = response.data.data;
                console.log('Response:', response.data)
            } catch (error) {
                console.error('Gagal mengirim data:', error);
            }
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
        handlePrint() {
            window.print();
        },
    },
    mounted() {
        this.getDataBelumKrs(this.$route.query)
    },
}
</script>

<template>
    <div class="card print border-0" style="width: 21cm; min-height: 29.7cm; height: auto; font-family: Arial, Helvetica, sans-serif" >
        <div class="card-body">
            <div class="heading-section" style="width: 100%;">
                <img src="../../../assets/images/kopSurat.png" alt="" style="width: 100%;">
            </div>
            <button @click="handlePrint" class="btn-print">Cetak</button>

            <h5 class="text-center mb-3"><b>JADWAL PERKULIAHAN</b></h5>
            <h5 class="text-center"><b>S1 TEKNIK INFORMATIKA</b></h5>
            <h5 class="text-center"><b>PERIODE  2023/2024 GENAP SEMESTER 1</b></h5>
            
            <table class="table-bordered" width="100%">
                <thead class="text-center">
                    <tr>
                        <th>No</th>
                        <th>Mata Kuliah</th>
                        <th>Hari</th>
                        <th>Waktu</th>
                        <th>Kelas</th>
                        <th>Ruang</th>
                        <th>Dosen</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(jadwal, index) in rekapJadwal" :key="index">
                        <td style="padding: 5px; font-size: 14px;">{{ index + 1 }}</td>
                        <td style="padding: 5px; font-size: 14px;">{{ jadwal.KelasKuliah?.MataKuliah?.nama_mata_kuliah ?? '-'}}</td>
                        <td style="padding: 5px; font-size: 14px;">{{ jadwal?.hari ?? '-'}}</td>
                        <td style="padding: 5px; font-size: 14px;">{{ jadwal?.jam_mulai ?? '-' }} - {{ jadwal?.jam_selesai ?? '-' }}</td>
                        <td style="padding: 5px; font-size: 14px;">{{ jadwal.KelasKuliah.nama_kelas_kuliah ?? '-' }}</td>
                        <td style="padding: 5px; font-size: 14px;">{{ jadwal.RuangPerkuliahan?.nama_ruang_perkuliahan ?? '-' }}</td>
                        <td style="padding: 5px; font-size: 14px;">{{ jadwal?.KelasKuliah?.Dosen?.nama_dosen ?? '-' }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>