
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
            <h5 class="text-center mb-5"><b>KARTU UJIAN CALON MAHASISWA BARU</b></h5>
            <table class="table table-bordered">
                <tbody>
                    <tr>
                        <td style="width: 60%;">
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 15px;width: 130px;">
                                    Nomor Pendaftaran
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                    987654356789876543
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
                                    Aida Andinar Maulidiana
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="row d-flex">
                                <div>
                                    <p><b>Pilihan Prodi:</b></p>
                                    <ol>
                                        <li>S1 - Kesehatan Masyarakat</li>
                                        <li>S1 - Ilmu Keperawatan</li>
                                    </ol>
                                </div>         
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="width: 60%;">
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 15px;width: 130px;">
                                    Alamat
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                    Kebaman - Srono
                                </div>
                            </div>
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 15px;width: 130px;">
                                    Nomor Telephon
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                    087544534376566
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="row d-flex">
                                <div>
                                    <p><b>Lokasi Ujian:</b></p>
                                    <p>Universitas Bakti Indonesia</p>
                                </div>         
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" style="padding: 10px">
                            <div class="row d-flex align-items-center">
                                <!-- Bagian untuk Gambar -->
                                <div class="col-lg-4 col-md-6 col-4 text-center">
                                    <div class="heading-section" style="width: 100%; display: flex; justify-content: center;">
                                        <img src="../../../assets/images/ttd.png" alt="Tanda Tangan" class="img-fluid" style="max-width: 100px; height: auto;">
                                    </div>
                                </div>

                                <!-- Bagian untuk Tabel -->
                                <div class="col-lg-8 col-md-6 col-8 text-center">
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Tahapan Tes</th>
                                                <th>Jenis Tes</th>
                                                <th>Tanggal Tes</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>Tes TPA</td>
                                                <td>27 Juni 2022 - 27 Juni 2022</td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>Tes Buta Warna</td>
                                                <td>27 Juni 2022 - 27 Juni 2022</td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>Tes Kesehatan</td>
                                                <td>27 Juni 2022 - 27 Juni 2022</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td colspan="2" style="padding: 10px">
                            <div class="row d-flex">
                                <div class="col-lg-12">
                                    <div>
                                    <p><b>Pernyataan</b></p>
                                    <p>Dengan ini saya menyatakan bahwa data yang saya isikan dalam borang pendaftaran adalah benar. Saya bersedia menerima sanksi pembatalan penerimaan di jurusan yang saya pilih apabila melanggar pernyataan ini</p>
                                    <p>Tanda Tangan Nama Peserta:.....................................</p>
                                </div>  
                                </div>
                                       
                            </div>
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