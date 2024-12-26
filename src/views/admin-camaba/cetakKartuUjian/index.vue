
<script setup>
import Swal from 'sweetalert2';
import { onBeforeMount, ref } from 'vue';
import { getData } from '../../../utiils/request';

const dataCamabas = ref([]);
const dataBiodataCamabas = ref([]);
const dataProdiCamabas = ref([]);
const dataTahapTest = ref([]);
const fotoProfile = ref([]);
const kopSurat = ref([]);

// Fungsi untuk mengkonversi tanggal
const formatTanggal = (tanggal) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Intl.DateTimeFormat('id-ID', options).format(new Date(tanggal));
};

const getkartuUjian = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await getData('camaba/cetak-kartu-ujian-camaba-aktif');
        const data = response.data;
        dataCamabas.value = data.dataCamaba;
        dataBiodataCamabas.value = data.dataBiodataCamaba;
        dataProdiCamabas.value = data.dataProdiCamaba;
        dataTahapTest.value = data.dataTahapTes;
        Swal.close();
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};
const getFotoProfile = async () => {
    try {
        const response = await getData('camaba/get-camaba-aktif');
        fotoProfile.value = response.data.data;

        console.log('Response:', response.data);
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};
const getKopSurat = async () => {
    try {
        const response = await getData(`perguruan-tinggi/get-data-kop-surat`);
        kopSurat.value = response.data;
        console.log('Response:', response.data);
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};

const getLogoUrl = computed(() => {
    return `/public/layout/images/logo.png`;
});

const handlePrint = () => {
    window.print();
};
onBeforeMount(() => {
    getkartuUjian();
    getFotoProfile();
    getKopSurat();
});
</script>


<template>
    <div class="card print border-0" style="width: 21cm; min-height: 29.7cm; height: auto; font-family: Arial, Helvetica, sans-serif">
        <div class="card-body">
            <table class="table table-borderless mt-3 text-center">
                <tbody>
                    <tr>
                        <td width="15%" class="header-logo">
                            <img :src="kopSurat?.data?.foto_profil_pt || getLogoUrl" alt="logo" width="80%" />
                        </td>
                        <td>
                            <p class="m-2 fw-bold" style="font-size: 20px">{{ kopSurat?.perguruanTinggi?.nama_perguruan_tinggi || 'NAMA PERGURUAN TINGGI' }}</p>
                            <p class="m-0">Alamat : {{ kopSurat?.data?.jalan || 'ALAMAT PERGURUAN TINGGI' }}</p>
                            <p class="m-0">Kodepos : {{ kopSurat?.data?.kode_pos || 'KODEPOS PT' }}, Telepon : {{ kopSurat?.data?.telepon || 'TELEPON PT' }}</p>
                            <p class="m-0">Website : {{ kopSurat?.data?.website || 'WEBSITE PT' }} | Email : {{ kopSurat?.data?.email || 'EMAIL PT' }} | Faximile : {{ kopSurat?.data?.telepon || 'TELEPON PT' }}</p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <hr style="border-color: black" />
            <button @click="handlePrint" class="btn-print">Cetak</button>
            <h5 class="text-center mb-5"><b>KARTU UJIAN CALON MAHASISWA BARU</b></h5>
            <table class="table table-bordered">
                <tbody>
                    <tr>
                        <td style="width: 60%">
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 130px">Nomor Pendaftaran</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ dataCamabas?.nomor_daftar || '-' }}</div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 130px">Nama</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ dataCamabas?.nama_lengkap || '-' }}</div>
                            </div>
                        </td>
                        <td>
                            <div class="row d-flex">
                                <div>
                                    <p><b>Pilihan Prodi:</b></p>
                                    <ol>
                                        <li>{{ dataProdiCamabas[0].Prodi?.JenjangPendidikan?.nama_jenjang_didik || '-' }} {{ dataProdiCamabas[0].Prodi?.nama_program_studi || '-' }}</li>
                                        <li>{{ dataProdiCamabas[1].Prodi?.JenjangPendidikan?.nama_jenjang_didik || '-' }} {{ dataProdiCamabas[1].Prodi?.nama_program_studi || '-' }}</li>
                                    </ol>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="width: 60%">
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 130px">Alamat</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ dataBiodataCamabas?.dusun }} - {{ dataBiodataCamabas?.kelurahan }}</div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 130px">Nomor Telephon</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ dataCamabas?.nomor_hp }}</div>
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
                                    <div class="heading-section" style="width: 100%; display: flex; justify-content: center">
                                        <img :src="`${fotoProfile?.foto_profil}`" alt="Tanda Tangan" class="img-fluid" style="max-width: 100px; height: auto" />
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
                                            <tr v-for="(tahapTes, index) in dataTahapTest" :key="index">
                                                <td>{{ index + 1 }}</td>
                                                <td>{{ tahapTes.JenisTe.nama_tes }}</td>
                                                <td>{{ formatTanggal(tahapTes.tanggal_awal_tes) }} - {{ formatTanggal(tahapTes.tanggal_akhir_tes) }}</td>
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
                                        <p>
                                            Dengan ini saya menyatakan bahwa data yang saya isikan dalam borang pendaftaran adalah benar. Saya bersedia menerima sanksi pembatalan penerimaan di jurusan yang saya pilih apabila melanggar pernyataan ini
                                        </p>
                                        <p>Tanda Tangan Nama Peserta : {{ dataCamabas?.nama_lengkap || '-' }}</p>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table class="table table-borderless">
                <tbody class="text-center">
                    <tr>
                        <td width="50%">
                            <p class="mb-4"></p>
                            <p class="m-0">Tanda Tangan Peserta</p>
                            <p style="height: 70px"></p>
                            <p class="m-0" style="text-transform: uppercase; text-decoration: underline; font-weight: bold">{{ dataCamabas?.nama_lengkap || '-' }}</p>
                            <p class="m-0"></p>
                        </td>
                        <td width="50%">
                            <p class="m-0">Banyuwangi,</p>
                            <p class="m-0">Petugas</p>
                            <p style="height: 70px"></p>
                            <p class="m-0" style="text-transform: uppercase; text-decoration: underline; font-weight: bold">-</p>
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