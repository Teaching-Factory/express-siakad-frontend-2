
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
            <h5 class="text-center mb-3"><b>KARTU UJIAN</b></h5>
            <table class="table table-bordered">
                <tbody>
                    <tr>
                        <td width="65%" style="padding: 10px">
                            <div class="row d-flex">
                                <div class="col-lg-4">
                                    <label for="exampleFormControlInput1" class="form-label">Nomor Pendaftaran</label>
                                </div>
                                <div class="col-lg-8">
                                    <label class="form-label">: 4353776787664</label>
                                </div>          
                            </div>
                            <div class="row d-flex">
                                <div class="col-lg-4">
                                    <label for="exampleFormControlInput1" class="form-label">Nama </label>
                                </div>
                                <div class="col-lg-8">
                                    <label class="form-label">: Aida Andinar Maulidiana</label>
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
                        <td style="padding: 10px">
                            <div class="row d-flex">
                                <div class="col-lg-4">
                                    <label for="exampleFormControlInput1" class="form-label">Alamat</label>
                                </div>
                                <div class="col-lg-8">
                                    <p>: Banjar Dinas Sumberklampok 01 / 00 Banjar Dinas Sumberklampok Kec. Gerokgak - Kab. Buleleng - Prov. Bali - SUMBERKLAMPOK</p>
                                </div>
                            </div>
                            <div class="row d-flex">
                                <div class="col-lg-4">
                                    <label for="exampleFormControlInput1" class="form-label">Nomor Telepon</label>
                                </div>
                                <div class="col-lg-8">
                                    <label class="form-label">: 0863436564367</label>
                                </div>          
                            </div>
                        </td>
                        <td style="padding: 10px">
                            <div class="row d-flex">
                                <div class="col-lg-12">
                                    <div>
                                    <p><b>Lokasi Ujian:</b></p>
                                    <p>Universitas Bakti Indonesia</p>
                                </div>  
                                </div>
                                       
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" style="padding: 10px">
                            <div class="row d-flex">
                                <div class="col-lg-4">
                                    <div class="heading-section" style="width: 100%;">
                                        <img src="../../../assets/images/ttd.png" alt="" style="width: 100%;">
                                    </div>
                                </div>
                                <div class="col-lg-8 text-center">
                                    <table class="table">
                                        <thead class="table-dark">
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
                                                <td>Tes Buta Kesehatan</td>
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