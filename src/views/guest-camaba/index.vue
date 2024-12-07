<script setup>
import { ref, onMounted, onBeforeMount } from 'vue';
import axios from 'axios';
import { API_URL } from '../../config/config';
import { getData } from '../../utiils/request';
import Swal from 'sweetalert2';

const periodePendaftarans = ref([]);
const berkasPendaftaran = ref([]);
const userGuide = ref([]);
const prodis = ref([]);
const sumbers = ref([]);
const camabas = ref([]);
const isJalurSelected = ref(false);
const isInfoComplete = ref(false);
const selectedPeriode = ref(null);

const id_periode_pendaftaran = ref(null);
const activeStep = ref(1);

//form
const selectedSumber = ref([]);
const nama_lengkap = ref('');
const tempat_lahir = ref('');
const tanggal_lahir = ref('');
const jenis_kelamin = ref('');
const nomor_hp = ref('');
const email = ref('');
const id_prodi_1 = ref('');
const id_prodi_2 = ref('');
const id__sumber = ref('');
const nama_sumber = ref('');

const getPeriodePendaftaran = async () => {
    const response = await axios.get(`${API_URL}/periode-pendaftaran-guest/periode-pendaftaran/dibuka/get`);

    const periode = response.data.data;
    periodePendaftarans.value = periode;

    console.log('data : ', periode);
};

const getUserGuide = async () => {
    const response = await axios.get(`${API_URL}/user-guide-pmb-guest/get-aktif`);

    const periode = response.data.data;
    userGuide.value = periode;

    console.log('data : ', periode);
};

const downloadFile = () => {
    if (userGuide.value.file) {
        const link = document.createElement('a');
        link.href = userGuide.value.file;
        link.download = ''; // Nama file akan mengikuti dari URL atau server
        link.target = '_blank'; // Opsi jika ingin membuka di tab baru
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        console.error('File URL not available');
    }
};

const pilihPeriode = async (id) => {
    isJalurSelected.value = true;

    try {
        // Panggil API untuk mendapatkan data periode berdasarkan ID
        const response = await axios.get(`${API_URL}/periode-pendaftaran-guest/${id}/get`);

        // Pastikan data dari respons disimpan di selectedPeriode
        selectedPeriode.value = response.data.data;
        berkasPendaftaran.value = response.data.berkas;

        // Pindah ke Step 2 setelah data berhasil diambil
        toggleStep(2);
    } catch (error) {
        console.error('Error saat mengambil data:', error);
    }
};

const registerNow = async (id) => {
    isInfoComplete.value = true;

    try {
        const response = await axios.get(`${API_URL}/periode-pendaftaran-guest/${id}/get`);

        selectedPeriode.value = response.data.data;
        berkasPendaftaran.value = response.data.berkas;

        // Simpan id_periode_pendaftaran dari response
        id_periode_pendaftaran.value = response.data.data.id;

        // Panggil getProdi dengan id_periode_pendaftaran
        await getProdi(id_periode_pendaftaran.value);
        await getSumber(id_periode_pendaftaran.value);

        toggleStep(3);
    } catch (error) {
        console.error('Error saat mengambil data:', error);
    }
};

const getProdi = async (id_periode_pendaftaran) => {
    try {
        const response = await axios.get(`${API_URL}/prodi-periode-pendaftaran-guest/periode-pendaftaran/${id_periode_pendaftaran}/get`);

        const data = response.data.data;

        prodis.value = data;
        console.log('object : ', data);

        toggleStep(3);
    } catch (error) {
        console.error('Error saat mengambil data:', error);
    }
};
const getSumber = async (id_periode_pendaftaran) => {
    try {
        const response = await axios.get(`${API_URL}/sumber-periode-pendaftaran-guest/periode-pendaftaran/${id_periode_pendaftaran}/get`);

        const data = response.data.data;

        sumbers.value = data;
        console.log('sumber : ', data);

        toggleStep(3);
    } catch (error) {
        console.error('Error saat mengambil data:', error);
    }
};

const create = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const sumber_periode_pendaftaran_payload = selectedSumber.value.map((id_sumber) => {
            // Temukan data sumber yang sesuai di `sumbers`
            const sumber = sumbers.value.find((s) => s.id_sumber === id_sumber);

            return {
                id: sumber?.id_sumber,
                nama_sumber: sumber?.Sumber?.nama_sumber || 'Nama sumber tidak tersedia'
            };
        });

        const payload = {
            nama_lengkap: nama_lengkap.value,
            tempat_lahir: tempat_lahir.value,
            tanggal_lahir: tanggal_lahir.value,
            jenis_kelamin: jenis_kelamin.value,
            nomor_hp: nomor_hp.value,
            email: email.value,
            prodi: [{ id_prodi: id_prodi_1.value }, { id_prodi: id_prodi_2.value }],
            sumber_periode_pendaftaran: sumber_periode_pendaftaran_payload
        };

        // Pastikan id_periode_pendaftaran.value adalah ID yang benar sebelum membuat request
        const response = await axios.post(`${API_URL}/camaba-guest/${id_periode_pendaftaran.value}/create`, payload);

        Swal.close();
        if (response.data && response.data.dataCamaba && response.data.dataCamaba.id) {
            const createdDataId = response.data.dataCamaba.id; // Retrieve the created ID
            Swal.fire('BERHASIL!', 'Data berhasil diperbarui.', 'success').then(() => {
                toggleStep(4, createdDataId); // Pass the created data ID to toggleStep
            });
        } else {
            console.error('ID not found in response:', response.data);
            Swal.fire('GAGAL', 'ID tidak ditemukan dalam respons.', 'error');
        }
    } catch (error) {
        Swal.close();
        console.error('Error create data:', error.response ? error.response.data : error.message);
        Swal.fire('GAGAL', `Gagal memperbarui data: ${error.response ? error.response.data.message : error.message}`, 'error');
    }
};

const toggleStep = (step, id = null) => {
    activeStep.value = step;
    // Periksa jika beralih ke Step 2 dan ID sudah dipilih
    if (step === 2 && selectedPeriode.value) {
    }
    if (step === 4 && id) {
        getCamaba(id); // Fetch the camaba data using the provided ID
    }
};

const getCamaba = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/camaba-guest/${id}/get`);
        camabas.value = response.data;
        console.log('Camaba data:', response.data);
        toggleStep(4);
    } catch (error) {
        console.error('Error fetching camaba data:', error.response ? error.response.data : error.message);
    }
};

const formatTanggal = (tanggal) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(tanggal).toLocaleDateString('id-ID', options);
};

const formatRupiah = (biaya) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(biaya);
};

onMounted(() => {
    getPeriodePendaftaran();
    getUserGuide();
    getProdi(id_periode_pendaftaran);
    getSumber(id_periode_pendaftaran);
});
</script>

<template>
    <div class="card">
        <div class="row">
            <div class="col-lg-8 col-md-6 col-sm-6">
                <div>
                    <router-link to="/" class="layout-topbar-logo">
                        <div class="text-container text-icon" style="display: flex; flex-direction: column; margin-left: 10px">
                            <span class="text-black subtitle" style="font-size: 1.5rem; font-weight: bold">JALUR PENERIMAAN MAHASISWA BARU</span>
                            <span class="text-black title" style="font-size: 1.3rem">Universitas Bakti Indonesia</span>
                        </div>
                    </router-link>
                </div>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-6" style="margin-top: 15px">
                <div class="flex justify-content-end gap-2">
                    <router-link to="/" class="btn btn-primary"> <i class="pi pi-import me-2"></i> Login PMB</router-link>
                    <button v-if="userGuide.file" @click="downloadFile" class="btn btn-secondary"><i class="pi pi-upload me-2"></i> Buku Panduan PMB</button>
                </div>
            </div>
        </div>
        <div class="row mt-6">
            <div class="col-lg-12 col-md-6 col-lg-6">
                <div class="alert alert-secondary text-center" role="alert">
                    <div class="d-flex justify-content-center align-items-center">
                        <!-- Step 1: Pilih Jalur Penerimaan -->
                        <button @click="toggleStep(1)" class="btn btn-danger me-3 p-3"><i class="pi pi-map me-2"></i> 1. Pilih Jalur Penerimaan</button>

                        <!-- Arrow -->
                        <i class="pi pi-arrow-right me-3" style="font-size: 2rem"></i>

                        <!-- Step 2: Informasi Jalur yang Dipilih -->
                        <button @click="toggleStep(2)" class="btn btn-danger me-3 p-3" :disabled="!isJalurSelected"><i class="pi pi-info-circle me-2"></i> 2. Informasi Jalur yang Dipilih</button>

                        <!-- Arrow -->
                        <i class="pi pi-arrow-right me-3" style="font-size: 2rem"></i>

                        <!-- Step 3: Mengisi Formulir Pendaftaran -->
                        <button @click="toggleStep(3)" class="btn btn-danger me-3 p-3" :disabled="!isInfoComplete"><i class="pi pi-pencil me-2"></i> 3. Mengisi Formulir Pendaftaran</button>

                        <!-- Arrow -->
                        <i class="pi pi-arrow-right me-3" style="font-size: 2rem"></i>

                        <!-- Step 4: Finalisasi -->
                        <button @click="toggleStep(4)" class="btn btn-danger p-3" :disabled="!isFormComplete"><i class="pi pi-check me-2"></i> 4. Finalisasi</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Conditional content based on active step -->

        <!-- isi konten dari Step 1: Pilih Jalur Penerimaan -->
        <div v-if="activeStep === 1" class="row mt-4">
            <div class="col-lg-12">
                <!-- Tampilkan pesan jika periodePendaftarans kosong -->
                <div v-if="periodePendaftarans.length === 0" class="alert alert-info text-center">
                    <h5>Tidak ada Jalur Pendaftaran yang dibuka</h5>
                    <p>Mohon untuk ditunggu informasi lebih lanjut</p>
                </div>

                <!-- Tampilkan daftar card jika periodePendaftarans tidak kosong -->
                <div v-else class="row">
                    <div v-for="periode in periodePendaftarans" :key="periode.id" class="col-sm-4 my-3">
                        <div class="card">
                            <div class="card-header">
                                <h6>
                                    <b>{{ periode.nama_periode_pendaftaran }}</b>
                                </h6>
                                <p>{{ formatTanggal(periode.tanggal_awal_pendaftaran) }} - {{ formatTanggal(periode.tanggal_akhir_pendaftaran) }}</p>
                            </div>
                            <div class="card-body">
                                <p><strong>Sistem Kuliah :</strong> {{ periode.SistemKuliah.nama_sk }}</p>
                                <p><strong>Jalur Seleksi :</strong> {{ periode.JalurMasuk.nama_jalur_masuk }}</p>
                                <p><strong>Semester :</strong> {{ periode.Semester.nama_semester }}</p>
                                <p><strong>Biaya Pendaftaran :</strong> {{ formatRupiah(periode.biaya_pendaftaran) }}</p>
                                <button class="btn btn-primary" @click="pilihPeriode(periode.id)">Pilih</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- isi konten dari Step 2: Informasi Jalur yang dipilih -->
        <div v-if="activeStep === 2 && selectedPeriode" class="row mt-4">
            <div class="col-lg-12">
                <div class="alert alert-info">
                    <div class="row">
                        <div class="col-md-12 mb-3">
                            <div class="card">
                                <div class="card-header">
                                    <div class="row">
                                        <div class="col-lg-3 col-md-6 col-sm-6 mb-3">
                                            <h6>
                                                <b>{{ selectedPeriode.nama_periode_pendaftaran }}</b>
                                            </h6>
                                            <p>{{ formatTanggal(selectedPeriode.tanggal_awal_pendaftaran) }} - {{ formatTanggal(selectedPeriode.tanggal_akhir_pendaftaran) }}</p>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 mb-3">
                                            <h6><b>Sistem Kuliah</b></h6>
                                            <p>{{ selectedPeriode.SistemKuliah?.nama_sk }}</p>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 mb-3">
                                            <h6><b>Jalur Seleksi</b></h6>
                                            <p>{{ selectedPeriode.JalurMasuk?.nama_jalur_masuk }}</p>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 mb-3">
                                            <h6><b>Semester</b></h6>
                                            <p>{{ selectedPeriode.Semester?.nama_semester }}</p>
                                        </div>
                                        <button @click="registerNow(selectedPeriode.id)" class="btn btn-primary">Daftar Sekarang</button>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-12 col-md-6 col-lg-12">
                                            <h6 class="text-dark">Syarat Pendaftaran Mahasiswa Baru :</h6>
                                            <p class="lh-1 text-small" v-if="berkasPendaftaran && berkasPendaftaran.length">
                                                <span v-for="(berkas, index) in berkasPendaftaran" :key="index">
                                                    {{ index + 1 }}. {{ berkas.JenisBerkas.nama_berkas }}
                                                    <br />
                                                </span>
                                            </p>
                                            <p v-else>Tidak ada berkas yang diperlukan.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- isi konten dari Step 3: Mengisi Formulir Pendaftaran -->
        <div v-if="activeStep === 3 && selectedPeriode" class="row mt-4">
            <div class="col-lg-12">
                <div class="alert alert-info">
                    <div class="row">
                        <div class="col-md-12 mb-3">
                            <div class="card">
                                <div class="card-header">
                                    <div class="row">
                                        <div class="col-lg-3 col-md-6 col-sm-6 mb-3">
                                            <h6>
                                                <b>{{ selectedPeriode.nama_periode_pendaftaran }}</b>
                                            </h6>
                                            <p>{{ formatTanggal(selectedPeriode.tanggal_awal_pendaftaran) }} - {{ formatTanggal(selectedPeriode.tanggal_akhir_pendaftaran) }}</p>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 mb-3">
                                            <h6><b>Sistem Kuliah</b></h6>
                                            <p>{{ selectedPeriode.SistemKuliah?.nama_sk }}</p>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 mb-3">
                                            <h6><b>Jalur Seleksi</b></h6>
                                            <p>{{ selectedPeriode.JalurMasuk?.nama_jalur_masuk }}</p>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 mb-3">
                                            <h6><b>Semester</b></h6>
                                            <p>{{ selectedPeriode.Semester?.nama_semester }}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body text-start">
                                    <div class="row d-flex mb-3">
                                        <div class="col-lg-8">
                                            <h5>Identitas Diri</h5>
                                        </div>
                                        <div class="col-lg-4 d-flex justify-content-end">
                                            <button @click="create" class="btn btn-primary me-2"><i class="pi pi-save mr-2"></i> Simpan</button>
                                        </div>
                                    </div>
                                    <div class="row d-flex mb-3">
                                        <div class="col-lg-2">
                                            <label for="exampleFormControlInput1" class="form-label">Nama Lengkap</label>
                                        </div>
                                        <div class="col-lg-4">
                                            <input type="text" class="form-control" v-model="nama_lengkap" />
                                        </div>
                                        <div class="col-lg-2">
                                            <label for="exampleFormControlInput1" class="form-label">Jenis Kelamin</label>
                                        </div>
                                        <div class="col-lg-4">
                                            <select class="form-select" aria-label="Default select example" v-model="jenis_kelamin">
                                                <option selected disabled hidden>-- Pilih Jenis Kelamin--</option>
                                                <option value="1">Laki-Laki</option>
                                                <option value="2">Perempuan</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row d-flex mb-3">
                                        <div class="col-lg-2">
                                            <label for="exampleFormControlInput1" class="form-label">Tempat Lahir</label>
                                        </div>
                                        <div class="col-lg-4">
                                            <input type="text" class="form-control" v-model="tempat_lahir" />
                                        </div>
                                        <div class="col-lg-2">
                                            <label for="exampleFormControlInput1" class="form-label">No. HP</label>
                                        </div>
                                        <div class="col-lg-4">
                                            <input type="text" class="form-control" v-model="nomor_hp" />
                                        </div>
                                    </div>
                                    <div class="row d-flex mb-3">
                                        <div class="col-lg-2">
                                            <label for="exampleFormControlInput1" class="form-label">Tanggal Lahir</label>
                                        </div>
                                        <div class="col-lg-4">
                                            <input type="date" class="form-control" v-model="tanggal_lahir" />
                                        </div>
                                        <div class="col-lg-2">
                                            <label for="exampleFormControlInput1" class="form-label">E-Mail</label>
                                        </div>
                                        <div class="col-lg-4">
                                            <input type="text" class="form-control" v-model="email" />
                                        </div>
                                    </div>
                                    <div class="row d-flex mt-6">
                                        <div class="col-lg-8">
                                            <h5>Pilihan Program Studi</h5>
                                        </div>
                                    </div>
                                    <div class="row d-flex mb-3">
                                        <div class="col-lg-2">
                                            <label for="exampleFormControlInput1" class="form-label">Pilihan 1</label>
                                        </div>
                                        <div class="col-lg-10">
                                            <select v-model="id_prodi_1" class="form-select" aria-label="Default select example">
                                                <option value="" selected disabled hidden>Pilih Program Studi</option>
                                                <option v-for="prodi in prodis" :key="prodi.id_prodi" :value="prodi.id_prodi">{{ prodi.Prodi.JenjangPendidikan.nama_jenjang_didik }} - {{ prodi.Prodi.nama_program_studi }}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row d-flex mb-3">
                                        <div class="col-lg-2">
                                            <label for="exampleFormControlInput1" class="form-label">Pilihan 2</label>
                                        </div>
                                        <div class="col-lg-10">
                                            <select v-model="id_prodi_2" class="form-select" aria-label="Default select example">
                                                <option value="" selected disabled hidden>Pilih Program Studi</option>
                                                <option v-for="prodi in prodis" :key="prodi.id_prodi" :value="prodi.id_prodi">{{ prodi.Prodi.JenjangPendidikan.nama_jenjang_didik }} - {{ prodi.Prodi.nama_program_studi }}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row d-flex mt-6">
                                        <div class="col-lg-8">
                                            <h5>Sumber</h5>
                                        </div>
                                    </div>
                                    <div class="row d-flex mb-3">
                                        <div class="col-lg-2">
                                            <label for="exampleFormControlInput1" class="form-label">Pilih Sumber</label>
                                        </div>
                                        <div class="col-lg-10">
                                            <div v-if="sumbers.length === 0">Sumber Tidak Tersedia</div>
                                            <div v-else>
                                                <div v-for="sumber in sumbers" :key="sumber.Sumber.id" class="form-check">
                                                    <input class="form-check-input" type="checkbox" :id="sumber.Sumber.nama_sumber" :value="sumber.id_sumber" v-model="selectedSumber" />
                                                    <label class="form-check-label" :for="sumber.Sumber.nama_sumber">
                                                        {{ sumber.Sumber.nama_sumber }}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- isi konten dari Step 4: Finalisasi -->
        <div v-if="activeStep === 4" class="row mt-4">
            <div class="col-lg-12">
                <div class="alert alert-info">
                    <div class="row">
                        <div class="col-md-12 mb-3">
                            <div class="card">
                                <div class="card-header">
                                    <div class="row">
                                        <div class="col-lg-3 col-md-6 col-sm-6 mb-3">
                                            <h6>
                                                <b>{{ camabas.data?.PeriodePendaftaran?.nama_periode_pendaftaran }}</b>
                                            </h6>
                                            <p>{{ formatTanggal(camabas.data?.PeriodePendaftaran?.tanggal_awal_pendaftaran) }} - {{ formatTanggal(camabas.data?.PeriodePendaftaran?.tanggal_akhir_pendaftaran) }}</p>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 mb-3">
                                            <h6><b>Sistem Kuliah</b></h6>
                                            <p>{{ camabas?.data?.PeriodePendaftaran?.SistemKuliah?.nama_sk }}</p>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 mb-3">
                                            <h6><b>Jalur Seleksi</b></h6>
                                            <p>{{ camabas.data?.PeriodePendaftaran?.JalurMasuk?.nama_jalur_masuk }}</p>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 mb-3">
                                            <h6><b>Semester</b></h6>
                                            <p>{{ camabas.data?.PeriodePendaftaran?.Semester.nama_semester }}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="alert alert-secondary" role="alert">
                                            <p>Lengkapi berkas Anda dengan melakukan Login menggunakan username dan password dibawah ini :</p>
                                            <h6>
                                                <strong>Username : {{ camabas.data.nomor_daftar }}</strong>
                                            </h6>
                                            <h6>
                                                <strong>Password : {{ camabas.data.hints }}</strong>
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class="row d-flex mb-3">
                                        <div class="col-lg-8">
                                            <h5>Identitas Diri</h5>
                                        </div>
                                        <div class="col-lg-4 d-flex justify-content-end">
                                            <router-link :to="`/pendaftaran-pmb/${camabas.data.id}/cetak-formulir`" class="btn btn-primary me-2"> <i class="pi pi-print mr-2"></i> Cetak Formulir</router-link>
                                        </div>
                                    </div>
                                    <div class="row d-flex mb-3">
                                        <div class="col-lg-2">
                                            <label for="exampleFormControlInput1" class="form-label">Nama Lengkap</label>
                                        </div>
                                        <div class="col-lg-4">
                                            <label class="form-label">: {{ camabas.data.nama_lengkap }}</label>
                                        </div>
                                        <div class="col-lg-2">
                                            <label for="exampleFormControlInput1" class="form-label">Jenis Kelamin</label>
                                        </div>
                                        <div class="col-lg-4">
                                            <label class="form-label">: {{ camabas.data.jenis_kelamin }}</label>
                                        </div>
                                    </div>
                                    <div class="row d-flex mb-3">
                                        <div class="col-lg-2">
                                            <label for="exampleFormControlInput1" class="form-label">Tempat Lahir</label>
                                        </div>
                                        <div class="col-lg-4">
                                            <label class="form-label">: {{ camabas.data.tempat_lahir }}</label>
                                        </div>
                                        <div class="col-lg-2">
                                            <label for="exampleFormControlInput1" class="form-label">No. HP</label>
                                        </div>
                                        <div class="col-lg-4">
                                            <label class="form-label">: {{ camabas.data.nomor_hp }}</label>
                                        </div>
                                    </div>
                                    <div class="row d-flex mb-3">
                                        <div class="col-lg-2">
                                            <label for="exampleFormControlInput1" class="form-label">Tanggal Lahir</label>
                                        </div>
                                        <div class="col-lg-4">
                                            <label class="form-label">: {{ formatTanggal(camabas.data.tanggal_lahir) }}</label>
                                        </div>
                                        <div class="col-lg-2">
                                            <label for="exampleFormControlInput1" class="form-label">E-Mail</label>
                                        </div>
                                        <div class="col-lg-4">
                                            <label class="form-label">: {{ camabas.data.email }}</label>
                                        </div>
                                    </div>
                                    <div class="row d-flex mt-6">
                                        <div class="col-lg-8">
                                            <h5>Pilihan Program Studi</h5>
                                        </div>
                                    </div>
                                    <div class="row d-flex mb-3">
                                        <div class="col-lg-2">
                                            <label for="exampleFormControlInput1" class="form-label">Pilihan 1</label>
                                        </div>
                                        <div class="col-lg-10">
                                            <label class="form-label">: {{ camabas.prodiCamaba[0].Prodi.JenjangPendidikan.nama_jenjang_didik }} - {{ camabas.prodiCamaba[0].Prodi.nama_program_studi }}</label>
                                        </div>
                                    </div>
                                    <div class="row d-flex mb-3">
                                        <div class="col-lg-2">
                                            <label for="exampleFormControlInput1" class="form-label">Pilihan 2</label>
                                        </div>
                                        <div class="col-lg-10">
                                            <label class="form-label">: {{ camabas.prodiCamaba[1].Prodi.JenjangPendidikan.nama_jenjang_didik }} - {{ camabas.prodiCamaba[1].Prodi.nama_program_studi }}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeStep: null, // To track which step is active
            isJalurSelected: false, // Check if step 1 is completed
            isInfoComplete: false, // Check if step 2 is completed
            isFormComplete: false // Check if step 3 is completed
        };
    },
    methods: {
        toggleStep(step) {
            this.activeStep = step; // Set the active step

            // Simulate step progress
            if (step === 2) {
                this.isJalurSelected = true;
            } else if (step === 3) {
                this.isInfoComplete = true;
            } else if (step === 4) {
                this.isFormComplete = true;
            }
        }
    }
};
</script>

<style scoped>
/* You can add custom styles if needed */
</style>


<style scoped>
.card-theme {
    background-color: rgba(154, 160, 172, 0.5);
}
</style>