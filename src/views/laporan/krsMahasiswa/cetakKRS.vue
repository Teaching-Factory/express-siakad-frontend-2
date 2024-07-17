
<script>
import { getData } from '../../../utiils/request.js'
import Swal from "sweetalert2";

export default {
    data() {
        return {
            krsData: null,
            rekapKrsData: []
        };
    },
    methods: {
        getDataKrs: async function(req) {
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
                console.log('Response:', response.data)
                console.log('Response 2:', response.data.dataRekapKRSByMahasiswa)
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
            const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

            const parts = date.split('-');
            const year = parts[0];
            const month = parseInt(parts[1], 10) - 1; // January is 0
            const day = parts[2];

            const formattedDate = `${days[new Date(date).getDay()]}, ${day} ${months[month]} ${year}`;
            return formattedDate;
        }
    },
    mounted() {
        this.getDataKrs(this.$route.query)
    },
    computed: {
        totalSKS() {
            return this.rekapKrsData.reduce((total, matkul) => {
                return total + (Number(matkul.KelasKuliah?.sks) || 0);
            }, 0);
        }
    }
}
</script>


<template>
    <div class="card print border-0" style="width: 21cm; min-height: 29.7cm; height: auto; font-family: Arial, Helvetica, sans-serif" >
        <div class="card-body">
            <div class="heading-section" style="width: 100%;">
                <img src="../../../assets/images/kopSurat.png" alt="" style="width: 100%;">
            </div>
            <button @click="handlePrint" class="btn-print">Cetak</button>

            <h5 class="text-center mb-3"><b>KARTU RENCANA STUDI (KRS)</b></h5>
            <table class="table table-borderless mt-3">
                <tbody>
                    <tr>
                        <td style="width: 50%;">
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 15px;width: 110px;">
                                    Nama
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                    {{ krsData?.mahasiswa.nama_mahasiswa }}
                                </div>
                            </div>
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 15px;width: 110px;">
                                    Program Studi
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                    {{ krsData?.mahasiswa.Prodi.nama_program_studi }}
                                </div>
                            </div>
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 15px;width: 110px;">
                                    Semester
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                    {{ krsData?.mahasiswa.Semester.semester }}
                                </div>
                            </div>
                        </td>
                        <td style="width: 50%;">
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 15px;width: 110px;">
                                    NIM
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                    {{ krsData?.mahasiswa.nim }}
                                </div>
                            </div>
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 15px;width: 110px;">
                                    Periode
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                    {{ krsData?.mahasiswa.Semester.nama_semester }}
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
                        <td>{{ matkul.KelasKuliah.MataKuliah.kode_mata_kuliah }}</td>
                        <td>{{ matkul.KelasKuliah.MataKuliah.nama_mata_kuliah }}</td>
                        <td>{{ matkul.KelasKuliah.Dosen.nama_dosen }}</td>
                        <td>{{ matkul.KelasKuliah.sks }}</td>
                        <td>{{ matkul.KelasKuliah.nama_kelas_kuliah }}</td>
                        <td>{{ matkul.KelasKuliah.DetailKelasKuliahs[0]?.RuangPerkuliahan?.nama_ruang_perkuliahan ?? '-' }}</td>
                        <td>{{ matkul.KelasKuliah.DetailKelasKuliahs[0]?.hari ?? '-' }}</td>
                        <td>{{ 
                            matkul.KelasKuliah.DetailKelasKuliahs.length > 0 ? 
                            `${formatTime(matkul.KelasKuliah.DetailKelasKuliahs[0]?.jam_mulai)} - ${formatTime(matkul.KelasKuliah.DetailKelasKuliahs[0]?.jam_selesai)}` : 
                            '-' 
                        }}</td>
                    </tr>
                    <tr>
                        <td class="text-center" colspan="4">Jumlah</td>
                        <td class="text-center" colspan="1">{{ totalSKS }}</td>
                        <td class="text-center" colspan="4"></td>
                    </tr>
                </tbody>
            </table>

            <div class="page-break"></div>
            <div class="" style="margin-left: 470px;">
                <p class="m-0">{{ formatDate(krsData?.tanggalPenandatanganan) }}</p>
                <p class="m-0">{{ krsData?.unitJabatan?.Jabatan?.nama_jabatan }}</p>
                <p style="height: 70px;"></p>
                <p class="m-0" style="text-transform: uppercase; text-decoration: underline; font-weight: bold;">{{ krsData?.unitJabatan?.nama_penandatanganan }}</p>
                <p class="m-0">NIP. {{ krsData?.unitJabatan?.Dosen?.nip ?? '-' }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.page-break {
    page-break-after: always;
}
</style>