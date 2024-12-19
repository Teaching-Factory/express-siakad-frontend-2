<script>
import { getData } from '../../../utiils/request.js'
import Swal from "sweetalert2";

export default {
    data() {
        return {
            belumKrs: null,
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
                
                const response = await getData(`rekap-mahasiswa-belum-krs/get-rekap-mahasiswa-belum-krs?id_angkatan=${req.id_angkatan}&id_prodi=${req.id_prodi}&tanggal_penandatanganan=${req.tanggal_penandatanganan}&format=${req.format}`);
                this.belumKrs = response.data;
                this.getBelumKrs = response.data.dataRekapMahasiswaBelumKRS;
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
        getLogoUrl() {
            return `/layout/images/ubi.jpg`;
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
    <div class="card print border-0" style="width: 24cm; min-height: 29.7cm; height: auto; font-family: Arial, Helvetica, sans-serif" >
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

            <h5 class="text-center mb-3"><b>MAHASISWA BELUM MELAKUKAN KRS</b></h5>
            <table class="table table-borderless m-0">
                <tbody>
                    <tr>
                        <td style="width: 50%;">
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 15px;width: 110px;">
                                   Periode KRS
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                    {{ belumKrs?.semesterAktif?.Semester?.nama_semester }}
                                </div>
                            </div>
                        </td>
                        <td style="width: 50%;">
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 15px;width: 110px;">
                                    Tanggal Cetak
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                    {{ formatDate(belumKrs?.tanggal_penandatanganan)}}
                                </div>
                            </div>
                          
                        </td>
                    </tr>
                </tbody>
            </table>
            <table class="table-bordered" width="100%">
                <thead class="text-center">
                    <tr>
                        <th>No</th>
                        <th>NIM</th>
                        <th>Nama Mahasiswa</th>
                        <th>Program Studi</th>
                        <th>Dosen Wali</th>
                        <th>Angkatan</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(getBelumKrs, index) in getBelumKrs" :key="index">
                        <td style="padding: 5px;">{{ index + 1 }}</td>
                        <td style="padding: 5px;">{{ getBelumKrs.nim ?? '-'}}</td>
                        <td style="padding: 5px;">{{ getBelumKrs.nama_mahasiswa ?? '-'}}</td>
                        <td style="padding: 5px;">{{ getBelumKrs.Prodi.nama_program_studi ?? '-' }}</td>
                        <td style="padding: 5px;">{{ getBelumKrs.dosen_wali?.nama_dosen ?? '-' }}</td>
                        <td style="padding: 5px;">{{ belumKrs?.angkatan.tahun ?? '-' }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>