<script>
import { getData } from '../../../utiils/request.js'
import Swal from "sweetalert2";

export default {
    data() {
        return {
            krsData: null,
            getRekapKhsData: null,
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
                
                const response = await getData(`rekap-khs-mahasiswa/get-rekap-khs-mahasiswa?jenis_cetak=${req.jenis_cetak}&nim=${req.nim}&id_semester=${req.id_semester}&tanggal_penandatanganan=${req.tanggal_penandatanganan}&format=${req.format}`);
                this.krsData = response.data;
                this.getRekapKhsData = response.data.dataRekapKHSMahasiswaMahasiswa;
                console.log('Response:', response.data)
                console.log('Response2:', response.data.dataRekapKHSMahasiswaMahasiswa)
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
            const month = parseInt(parts[1], 10) - 1;
            const day = parts[2];

            const formattedDate = `${day} ${months[month]} ${year}`;
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
    <div class="card print border-0" style="width: 21cm; height: 29.7cm; font-family: Arial, Helvetica, sans-serif" >
        <div class="card-body">
            <div class="heading-section" style="width: 100%;">
                <img src="../../../assets/images/kopSurat.png" alt="" style="width: 100%;">
            </div>
            <button @click="handlePrint" class="btn-print">Cetak</button>

            <h5 class="text-center mb-3"><b>REKAPITULASI PENDAFTAR PMB</b></h5>
            <table class="table table-borderless mt-3">
                <tbody>
                    <tr>
                        <td style="width: 50%;">
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 15px;width: 150px;">
                                    Periode Pendaftaran
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                    {{ krsData?.mahasiswa?.nama_mahasiswa }}
                                </div>
                            </div>
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 15px;width: 150px;">
                                    Semester Pendaftaran
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                    {{ krsData?.mahasiswa?.Prodi?.nama_program_studi }}
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
                            <th>Nomor Pendaftar</th>
                            <th>Nama Pendaftar</th>
                            <th>NIK</th>
                            <th>Periode Pendaftaran</th>
                            <th>Pilihan Prodi 1</th>
                            <th>Sudah Finalisasi</th>
                            <th>Kelulusan Berkas</th>
                            <th>Kelulusan Tes</th>
                            <th>NIM</th>
                            <th>Prodi Diterima</th>
                            <th>Sudah Menjadi Mahasiswa</th>
                            <th>Asal Sekolah</th>
                            <th>No. Handphone</th>
                            <th>Alamat</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(nilai, index) in getRekapKhsData" :key="index">
                            <td>{{ index + 1 }}</td>
                            <td>{{ nilai.nama_mata_kuliah }}</td>
                            <td>{{ nilai.sks_mata_kuliah }}</td>
                            <td>{{ nilai.nilai_angka }}</td>
                            <td>{{ nilai.nilai_huruf }}</td>
                            <td>{{ nilai.nilai_indeks }}</td>
                            <td>{{ nilai.sks_x_indeks }}</td>     
                            <td>{{ nilai.nama_mata_kuliah }}</td>
                            <td>{{ nilai.sks_mata_kuliah }}</td>
                            <td>{{ nilai.nilai_angka }}</td>
                            <td>{{ nilai.nilai_huruf }}</td>
                            <td>{{ nilai.nilai_indeks }}</td>
                            <td>{{ nilai.sks_x_indeks }}</td>   
                        </tr>
                    </tbody>
                </table>
            </div>
            <table class="table table-borderless mt-3">
                <tbody>
                    <tr>
                        <td style="width: 50%;">
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 15px;width: 300px;">
                                    Jumlah Pendaftar
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                    {{ krsData?.mahasiswa?.nama_mahasiswa }}
                                </div>
                            </div>
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 15px;width: 300px;">
                                    Jumlah Pendaftar Lulus Berkas
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                    {{ krsData?.mahasiswa?.Prodi?.nama_program_studi }}
                                </div>
                            </div>
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 15px;width: 300px;">
                                    Jumlah Pendaftar Lulus Tes
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                    {{ krsData?.mahasiswa?.nama_mahasiswa }}
                                </div>
                            </div>
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 15px;width: 300px;">
                                    Jumlah Pendaftar Sudah Menjadi Mahasiswa
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                    {{ krsData?.mahasiswa?.Prodi?.nama_program_studi }}
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="col-lg-12 d-flex justify-content-end">
                <div class="flex justify-content-end gap-2">
                    <table class="table table-borderless" style="width: 100%;">
                        <tbody class="" style="display: block; text-align: left;">
                            <tr>
                                <td colspan="2">
                                    <p class="m-0">Banyuwangi, {{ formatDate(data?.tanggalPenandatanganan) }}</p>
                                    <p class="m-0">Rektor</p>
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