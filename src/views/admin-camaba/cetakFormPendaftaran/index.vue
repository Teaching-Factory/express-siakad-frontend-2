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

            
            <table class="table table-borderless mt-3">
                <tbody>
                    <tr>
                        <td style="width: 50%;">
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 15px;width: 110px;">
                                    Jalur Penerimaan
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                    {{ krsData?.mahasiswa?.nama_mahasiswa }}
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
                                    {{ krsData?.mahasiswa?.Prodi?.nama_program_studi }}
                                </div>
                            </div>
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 15px;width: 110px;">
                                    Sistem Kuliah
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                    {{ krsData?.mahasiswa?.Semester?.semester }}
                                </div>
                            </div>
                        </td>
                        <td style="width: 50%;">
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 15px;width: 130px;">
                                    Periode Pendaftaran
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                    {{ krsData?.mahasiswa?.nim }}
                                </div>
                            </div>
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 15px;width: 130px;">
                                    Jalur
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                    {{ krsData?.mahasiswa?.Semester?.nama_semester }}
                                </div>
                            </div>
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 15px;width: 130px;">
                                    Biaya Pendaftaran
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                    {{ krsData?.mahasiswa?.Semester?.nama_semester }}
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div style="overflow-x: auto;">
                <table class="table table-bordered">
                    <tbody class="align-middle">
                        <tr>
                            <th colspan="2">Identitas Diri</th>
                        </tr>
                        <tr>
                            <th>Nama Lengkap</th>
                            <th>Aida Andinar Maulidiana</th>
                        </tr>
                        <tr>
                            <th>Tempat Lahir</th>
                            <th>Banyuwangi</th>
                        </tr>
                        <tr>
                            <th>Tanggal Lahir</th>
                            <th>01 Januari 2001</th>
                        </tr>
                        <tr>
                            <th>Jenis Kelamin</th>
                            <th>Perempuan</th>
                        </tr>
                        <tr>
                            <th>HP</th>
                            <th>089765453356</th>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <th>coba@gmail.com</th>
                        </tr>
                    </tbody>
                    <tbody class="align-middle">
                        <tr>
                            <th colspan="2">Pilihan Program Studi</th>
                        </tr>
                        <tr>
                            <th>Pilihan 1</th>
                            <th>D4-TRPL</th>
                        </tr>
                        <tr>
                            <th>Pilihan 2</th>
                            <th>D4-Bisnis Digital</th>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="row">
                <div>
                    <p>Lengkapi berkas Anda dengan melakukan Login menggunakan username dan password dibawah ini :</p>
                    <h6><strong>Username :</strong></h6>
                    <h6><strong>Password :</strong></h6>
                </div>
            </div>
        </div>
    </div>
</template>