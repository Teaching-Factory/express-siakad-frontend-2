<script setup>
import Swal from 'sweetalert2';
import { computed, onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getData } from '../../../../utiils/request';

const route = useRoute();
const dataCamabas = ref([]);
const dataBiodataCamabas = ref([]);
const dataProdiCamabas = ref([]);
const dataUserCamabas = ref([]);
const fotoProfile = ref([]);

// Fungsi untuk mengkonversi tanggal
const formatTanggal = (tanggal) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(tanggal).toLocaleDateString('id-ID', options);
};

const getBiodataMahasiswa = async (id) => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await getData(`biodata-camaba/${id}/cetak-biodata-camaba`);
        const data = response.data;
        dataCamabas.value = data.dataCamaba;
        dataBiodataCamabas.value = data.dataBiodataCamaba;
        dataProdiCamabas.value = data.dataProdiCamaba;
        dataUserCamabas.value = data.dataUserCamaba;
        Swal.close();
        console.log('object :', data);
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};
const getLogoUrl = computed(() => {
    return `/public/ubi.png`;
});
const handlePrint = () => {
    window.print();
};
onBeforeMount(() => {
    const id = route.params.id || route.query.id;
    getBiodataMahasiswa(id);
});
</script>


<template>
    <div class="card print border-0" style="width: 21cm; min-height: 29.7cm; height: auto; font-family: Arial, Helvetica, sans-serif">
        <div class="card-body">
            <table class="table table-borderless mt-3 text-center">
                <tbody>
                    <tr>
                        <td width="15%" class="header-logo">
                            <img :src="getLogoUrl" alt="logo" width="80%" />
                        </td>
                        <td>
                            <p class="m-2 fw-bold" style="font-size: 20px">NAMA PERGURUAN TINGGI</p>
                            <p class="m-0">Alamat : Kampus terpadu bumi cempokosari no 40 Cluring Banyuwangi</p>
                            <p class="m-0">Kodepos : 68482, Telepon : (0333) 3912341</p>
                            <p class="m-0">Website : https://www.ubibanyuwangi.ac.id/ | Email : office@ubibanyuwangi.ac.id | Faximile : (0333) 3912341</p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <hr style="border-color: black" />
            <button @click="handlePrint" class="btn-print">Cetak</button>
            <h5 class="text-center mb-3"><b>BIODATA DIRI MAHASISWA BARU</b></h5>
            <table class="table table-borderless mt-5">
                <tbody>
                    <tr>
                        <td style="width: 50%">
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 140px">Nomor Pendaftar</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ dataCamabas?.nomor_daftar }}</div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 140px">Nama</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ dataCamabas?.nama_lengkap }}</div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 140px">Status Finalisasi</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ dataCamabas?.finalisasi ? 'Lulus' : 'Tidak Lulus' }}</div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 140px">Status Berkas</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ dataCamabas?.status_berkas ? 'Lulus' : 'Tidak Lulus' }}</div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 140px">Status tes</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ dataCamabas?.status_tes ? 'Lulus' : 'Tidak Lulus' }}</div>
                            </div>
                        </td>
                        <td style="width: 50%">
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 150px">Periode Pendaftaran</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ dataCamabas?.PeriodePendaftaran?.nama_periode_pendaftaran }}</div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 150px">Semester Pendaftaran</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ dataCamabas?.PeriodePendaftaran?.Semester?.nama_semester }}</div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 150px">Jalur Pendaftaran</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ dataCamabas?.PeriodePendaftaran?.JalurMasuk?.nama_jalur_masuk }}</div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 150px">Sistem Kuliah</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ dataCamabas?.PeriodePendaftaran?.SistemKuliah?.nama_sk }}</div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 150px">Status Pembayaran</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ dataCamabas?.status_pembayaran ? 'Lunas' : 'Belum Bayar' }}</div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="width: 50%">
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 140px">Pilihan Prodi 1</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ dataProdiCamabas[0]?.Prodi?.JenjangPendidikan?.nama_jenjang_didik }} - {{ dataProdiCamabas[0]?.Prodi?.nama_program_studi }}</div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 140px">Pilihan Prodi 2</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ dataProdiCamabas[1]?.Prodi?.JenjangPendidikan?.nama_jenjang_didik }} - {{ dataProdiCamabas[1]?.Prodi?.nama_program_studi }}</div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 140px">Prodi Diterima</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ dataCamabas?.Prodi?.JenjangPendidikan?.nama_jenjang_didik }} - {{ dataCamabas?.Prodi?.nama_program_studi }}</div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- Biodata Diri -->
            <table class="table table-borderless mt-3">
                <tbody>
                    <p><b>Biodata Diri</b></p>
                    <tr>
                        <td style="width: 50%">
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 140px">Nomor Pendaftar</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ dataCamabas?.nomor_daftar }}</div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 140px">Nama Lengkap</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ dataCamabas?.nama_lengkap }}</div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 140px">Tempat Lahir</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ dataCamabas?.tempat_lahir }}</div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 140px">Tanggal Lahir</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ formatTanggal(dataCamabas?.tanggal_lahir) }}</div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 140px">NIK</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ dataBiodataCamabas?.nik }}</div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 140px">NISN</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ dataBiodataCamabas?.nisn }}</div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 140px">NPWP</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ dataBiodataCamabas?.npwp }}</div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 140px">Kewarganegaraan</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ dataBiodataCamabas?.kewarganegaraan }}</div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 140px">Jalan</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ dataBiodataCamabas?.jalan }}</div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 140px">Dusun</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ dataBiodataCamabas?.dusun }}</div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 140px">RT/RW</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ dataBiodataCamabas?.rt }}/{{ dataBiodataCamabas?.rw }}</div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 140px">Kelurahan</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ dataBiodataCamabas?.kelurahan }}</div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 140px">Kecamatan</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ dataBiodataCamabas?.Wilayah?.nama_wilayah }}</div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 140px">Kodepos</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ dataBiodataCamabas?.kode_pos }}</div>
                            </div>
                        </td>
                        <td style="width: 50%">
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 150px">Tanggal Pendaftaran</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ formatTanggal(dataCamabas?.tanggal_pendaftaran) }}</div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 150px">Jenis Kelamin</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ dataCamabas?.jenis_kelamin }}</div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 150px">Agama</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ dataBiodataCamabas?.Agama?.nama_agama }}</div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 150px">Email</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ dataBiodataCamabas?.email }}</div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 150px">Telephon</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ dataBiodataCamabas?.handphone }}</div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- Biodata Orang Tua -->
            <table class="table table-borderless mt-3">
                <tbody>
                    <p><b>Data Orang Tua</b></p>
                    <tr>
                        <td style="width: 50%">
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 140px">Nama Ayah</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ dataBiodataCamabas?.nama_ayah }}</div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 140px">Tanggal Lahir Ayah</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ formatTanggal(dataBiodataCamabas?.tanggal_lahir_ayah) }}</div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 140px">Pendidikan Ayah</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ dataBiodataCamabas?.PendidikanAyah?.nama_jenjang_didik }}</div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 140px">Pekerjaan Ayah</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ dataBiodataCamabas?.PekerjaanAyah?.nama_pekerjaan }}</div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 140px">Penghasilan Ayah</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ dataBiodataCamabas?.PenghasilanAyah?.nama_penghasilan }}</div>
                            </div>
                        </td>
                        <td style="width: 50%">
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 150px">Nama Ibu</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ dataBiodataCamabas?.nama_ibu_kandung }}</div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 150px">Tanggal Lahir Ibu</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ formatTanggal(dataBiodataCamabas?.tanggal_lahir_ibu) }}</div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 150px">Pendidikan Ibu</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ dataBiodataCamabas?.PendidikanIbu?.nama_jenjang_didik }}</div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 150px">Pekerjaan Ibu</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ dataBiodataCamabas?.PekerjaanIbu?.nama_pekerjaan }}</div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 150px">Penghasilan Ibu</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ dataBiodataCamabas?.PenghasilanIbu?.nama_penghasilan }}</div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table class="table table-borderless mt-3">
                <tbody>
                    <p><b>Data Wali</b></p>
                    <tr>
                        <td style="width: 50%">
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 140px">Nama Wali</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ dataBiodataCamabas?.nama_wali }}</div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 140px">Tanggal Lahir Wali</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ formatTanggal(dataBiodataCamabas?.tanggal_lahir_wali) }}</div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 140px">Pendidikan Wali</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ dataBiodataCamabas?.PendidikanWali?.nama_jenjang_didik }}</div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 140px">Pekerjaan Wali</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ dataBiodataCamabas?.PekerjaanWali?.nama_pekerjaan }}</div>
                            </div>
                            <div style="display: flex; align-items: flex-start">
                                <div style="margin-left: 15px; width: 140px">Penghasilan Ayah</div>
                                <div style="margin-right: 6px">:</div>
                                <div style="margin-right: 10px">{{ dataBiodataCamabas?.PenghasilanWali?.nama_penghasilan }}</div>
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