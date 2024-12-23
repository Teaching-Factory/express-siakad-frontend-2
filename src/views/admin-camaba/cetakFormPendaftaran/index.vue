<script setup>
import Swal from 'sweetalert2';
import { onBeforeMount, ref } from 'vue';
import { getData } from '../../../utiils/request';

const dataCamabas = ref([]);
const dataBiodataCamabas = ref([]);
const dataProdiCamabas = ref([]);
const dataUserCamabas = ref([]);
const fotoProfile = ref([]);

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
        const response = await getData('camaba/cetak-form-pendaftaran-camaba-aktif');
        const data = response.data;
        dataCamabas.value = data.dataCamaba;
        dataBiodataCamabas.value = data.dataBiodataCamaba;
        dataProdiCamabas.value = data.dataProdiCamaba;
        dataUserCamabas.value = data.dataUserCamaba;
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
const handlePrint = () => {
    window.print();
};
onBeforeMount(() => {
    getkartuUjian();
    getFotoProfile();
});
</script>

<template>
    <div class="card print border-0" style="width: 24cm; height: 29.7cm; font-family: Arial, Helvetica, sans-serif">
        <div class="card-body">
            <!-- <div class="heading-section" style="width: 100%">
                <img src="../../../assets/images/kopSurat.png" alt="" style="width: 100%" />
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

            <table class="table table-borderless mt-3">
                <tbody>
                    <tr>
                        <td style="width: 60%">
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 110px">Jalur Penerimaan</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ dataCamabas.PeriodePendaftaran?.JalurMasuk?.nama_jalur_masuk || '-' }}</div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 110px">Semester</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ dataCamabas.PeriodePendaftaran?.Semester?.nama_semester || '-' }}</div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 110px">Sistem Kuliah</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ dataCamabas.PeriodePendaftaran?.SistemKuliah?.nama_sk || '-' }}</div>
                            </div>
                        </td>
                        <td style="width: 40%">
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 130px">Periode Pendaftaran</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ formatTanggal(dataCamabas.PeriodePendaftaran?.tanggal_awal_pendaftaran || '-') }} - {{ formatTanggal(dataCamabas.PeriodePendaftaran?.tanggal_akhir_pendaftaran || '-') }}</div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 130px">Jalur</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">
                                    {{ dataCamabas.PeriodePendaftaran?.nama_periode_pendaftaran || '-' }}
                                </div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 130px">Biaya Pendaftaran</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">Rp. {{ dataCamabas.PeriodePendaftaran?.biaya_pendaftaran || '-' }}</div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div style="overflow-x: auto">
                <table class="table table-bordered">
                    <tbody class="align-middle">
                        <tr>
                            <th colspan="2">Identitas Diri</th>
                        </tr>
                        <tr>
                            <th>Nama Lengkap</th>
                            <th>{{ dataCamabas?.nama_lengkap || '-' }}</th>
                        </tr>
                        <tr>
                            <th>Tempat Lahir</th>
                            <th>{{ dataCamabas?.tempat_lahir || '-' }}</th>
                        </tr>
                        <tr>
                            <th>Tanggal Lahir</th>
                            <th>{{ formatTanggal(dataCamabas?.tanggal_lahir || '-') }}</th>
                        </tr>
                        <tr>
                            <th>Jenis Kelamin</th>
                            <th>{{ dataCamabas?.jenis_kelamin || '-' }}</th>
                        </tr>
                        <tr>
                            <th>HP</th>
                            <th>{{ dataCamabas?.nomor_hp || '-' }}</th>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <th>{{ dataCamabas?.email || '-' }}</th>
                        </tr>
                    </tbody>
                    <tbody class="align-middle">
                        <tr>
                            <th colspan="2">Pilihan Program Studi</th>
                        </tr>
                        <tr>
                            <th>Pilihan 1</th>
                            <th>{{ dataProdiCamabas[0].Prodi?.JenjangPendidikan?.nama_jenjang_didik || '-' }} {{ dataProdiCamabas[0].Prodi?.nama_program_studi || '-' }}</th>
                        </tr>
                        <tr>
                            <th>Pilihan 2</th>
                            <th>{{ dataProdiCamabas[1].Prodi?.JenjangPendidikan?.nama_jenjang_didik || '-' }} {{ dataProdiCamabas[1].Prodi?.nama_program_studi || '-' }}</th>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="row">
                <div>
                    <p>Lengkapi berkas Anda dengan melakukan Login menggunakan username dan password dibawah ini :</p>
                    <h6>
                        <strong>Username : {{ dataUserCamabas?.username || '-' }}</strong>
                    </h6>
                    <h6>
                        <strong>Password : {{ dataUserCamabas?.hints || '-' }}</strong>
                    </h6>
                </div>
            </div>
        </div>
    </div>
</template>