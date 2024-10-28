<script setup>
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount } from 'vue';
import { ProductService } from '@/service/ProductService';
import { useToast } from 'primevue/usetoast';
import { getData } from '../../utiils/request';
import axios from 'axios';
import { API_URL } from '../../config/config';

const periodePendaftarans = ref([]);

const getPeriodePendaftaran = async () => {
    const response = await axios.get(`${API_URL}/periode-pendaftaran-guest/periode-pendaftaran/dibuka/get`);

    const periode = response.data.data;
    periodePendaftarans.value = periode;

    console.log('data : ', periode);
};

`const formatTanggal = (tanggal) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(tanggal).toLocaleDateString('id-ID', options);
};

const formatRupiah = (biaya) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(biaya);
}`;

onMounted(() => {
    getPeriodePendaftaran();
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
                    <router-link class="btn btn-primary"> <i class="pi pi-import me-2"></i> Login PMB</router-link>
                    <router-link class="btn btn-secondary"> <i class="pi pi-upload me-2"></i> Buku Panduan PMB</router-link>
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
                        <button @click="toggleStep(2)" class="btn btn-secondary me-3 p-3" :disabled="!isJalurSelected"><i class="pi pi-info-circle me-2"></i> 2. Informasi Jalur yang Dipilih</button>

                        <!-- Arrow -->
                        <i class="pi pi-arrow-right me-3" style="font-size: 2rem"></i>

                        <!-- Step 3: Mengisi Formulir Pendaftaran -->
                        <button @click="toggleStep(3)" class="btn btn-secondary me-3 p-3" :disabled="!isInfoComplete"><i class="pi pi-pencil me-2"></i> 3. Mengisi Formulir Pendaftaran</button>

                        <!-- Arrow -->
                        <i class="pi pi-arrow-right me-3" style="font-size: 2rem"></i>

                        <!-- Step 4: Finalisasi -->
                        <button @click="toggleStep(4)" class="btn btn-secondary p-3" :disabled="!isFormComplete"><i class="pi pi-check me-2"></i> 4. Finalisasi</button>
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
                                <button class="btn btn-primary">Pilih</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- isi konten dari Step 2: Informasi Jalur yang dipilih -->
        <div v-if="activeStep === 2" class="row mt-4">
            <div class="col-lg-12">
                <div class="alert alert-info">
                    <div class="row">
                        <div class="col-md-12 mb-3">
                            <div class="card">
                                <div class="card-header">
                                    <div class="row">
                                        <div class="col-lg-3 col-md-6 col-sm-6 mb-3">
                                            <h6><b>Gelombang Mandiri</b></h6>
                                            <p>31 Januari 2024 - 3 Maret 2024</p>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 mb-3">
                                            <h6><b>Sistem Kuliah</b></h6>
                                            <p>Reguler</p>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 mb-3">
                                            <h6><b>Jalur Seleksi</b></h6>
                                            <p>31 Seleksi Mandiri</p>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 mb-3">
                                            <h6><b>Semester</b></h6>
                                            <p>2023/2024 Ganjil</p>
                                        </div>
                                        <button class="btn btn-primary">Daftar Sekarang</button>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-12 col-md-6 col-lg-12">
                                            <h6 class="text-dark">Syarat Pendaftaran Mahasiswa Baru :</h6>
                                            <p class="lh-1 text-small">
                                                1. Upload Foto ukuran 3x6 dengan background merah
                                                <br />2. Upload Ijazah SMA <br />3. Upload SKHUN <br />4. Upload Biodata Diri <br />5. Upload Sertifikat Prestasi (jika ada)
                                            </p>
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
        <div v-if="activeStep === 3" class="row mt-4">
            <div class="col-lg-12">
                <div class="alert alert-info">
                    <div class="row">
                        <div class="col-md-12 mb-3">
                            <div class="card">
                                <div class="card-header">
                                    <div class="row">
                                        <div class="col-lg-3 col-md-6 col-sm-6 mb-3">
                                            <h6><b>Gelombang Mandiri</b></h6>
                                            <p>31 Januari 2024 - 3 Maret 2024</p>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 mb-3">
                                            <h6><b>Sistem Kuliah</b></h6>
                                            <p>Reguler</p>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 mb-3">
                                            <h6><b>Jalur Seleksi</b></h6>
                                            <p>31 Seleksi Mandiri</p>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 mb-3">
                                            <h6><b>Semester</b></h6>
                                            <p>2023/2024 Ganjil</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body text-start">
                                    <div class="row d-flex mb-3">
                                        <div class="col-lg-8">
                                            <h5>Identitas Diri</h5>
                                        </div>
                                        <div class="col-lg-4 d-flex justify-content-end">
                                            <button class="btn btn-primary me-2"><i class="pi pi-save mr-2"></i> Simpan</button>
                                        </div>
                                    </div>
                                    <div class="row d-flex mb-3">
                                        <div class="col-lg-2">
                                            <label for="exampleFormControlInput1" class="form-label">Nama Lengkap</label>
                                        </div>
                                        <div class="col-lg-4">
                                            <input type="text" class="form-control" />
                                        </div>
                                        <div class="col-lg-2">
                                            <label for="exampleFormControlInput1" class="form-label">Jenis Kelamin</label>
                                        </div>
                                        <div class="col-lg-4">
                                            <select class="form-select" aria-label="Default select example">
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
                                            <input type="text" class="form-control" />
                                        </div>
                                        <div class="col-lg-2">
                                            <label for="exampleFormControlInput1" class="form-label">No. HP</label>
                                        </div>
                                        <div class="col-lg-4">
                                            <input type="text" class="form-control" />
                                        </div>
                                    </div>
                                    <div class="row d-flex mb-3">
                                        <div class="col-lg-2">
                                            <label for="exampleFormControlInput1" class="form-label">Tanggal Lahir</label>
                                        </div>
                                        <div class="col-lg-4">
                                            <input type="date" class="form-control" />
                                        </div>
                                        <div class="col-lg-2">
                                            <label for="exampleFormControlInput1" class="form-label">E-Mail</label>
                                        </div>
                                        <div class="col-lg-4">
                                            <input type="text" class="form-control" />
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
                                            <select class="form-select" aria-label="Default select example">
                                                <option selected disabled hidden>-- Pilih Program Studi--</option>
                                                <option value="1">D4 - Teknologi Rekayasa Perangkat Lunak</option>
                                                <option value="2">D4 - Bisnis Digital</option>
                                            </select>
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
                                            <h6><b>Gelombang Mandiri</b></h6>
                                            <p>31 Januari 2024 - 3 Maret 2024</p>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 mb-3">
                                            <h6><b>Sistem Kuliah</b></h6>
                                            <p>Reguler</p>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 mb-3">
                                            <h6><b>Jalur Seleksi</b></h6>
                                            <p>31 Seleksi Mandiri</p>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 mb-3">
                                            <h6><b>Semester</b></h6>
                                            <p>2023/2024 Ganjil</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="alert alert-secondary" role="alert">
                                            <p>Lengkapi berkas Anda dengan melakukan Login menggunakan username dan password dibawah ini :</p>
                                            <h6><strong>Username :</strong></h6>
                                            <h6><strong>Password :</strong></h6>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class="row d-flex mb-3">
                                        <div class="col-lg-8">
                                            <h5>Identitas Diri</h5>
                                        </div>
                                        <div class="col-lg-4 d-flex justify-content-end">
                                            <router-link to="/pendaftaran-pmb/cetak-formulir" class="btn btn-primary me-2"> <i class="pi pi-print mr-2"></i> Cetak Formulir</router-link>
                                        </div>
                                    </div>
                                    <div class="row d-flex mb-3">
                                        <div class="col-lg-2">
                                            <label for="exampleFormControlInput1" class="form-label">Nama Lengkap</label>
                                        </div>
                                        <div class="col-lg-4">
                                            <label class="form-label">: Aida Andinar Maulidiana</label>
                                        </div>
                                        <div class="col-lg-2">
                                            <label for="exampleFormControlInput1" class="form-label">Jenis Kelamin</label>
                                        </div>
                                        <div class="col-lg-4">
                                            <label class="form-label">: Perempuan</label>
                                        </div>
                                    </div>
                                    <div class="row d-flex mb-3">
                                        <div class="col-lg-2">
                                            <label for="exampleFormControlInput1" class="form-label">Tempat Lahir</label>
                                        </div>
                                        <div class="col-lg-4">
                                            <label class="form-label">: Banyuwangi</label>
                                        </div>
                                        <div class="col-lg-2">
                                            <label for="exampleFormControlInput1" class="form-label">No. HP</label>
                                        </div>
                                        <div class="col-lg-4">
                                            <label class="form-label">: 08987763456776</label>
                                        </div>
                                    </div>
                                    <div class="row d-flex mb-3">
                                        <div class="col-lg-2">
                                            <label for="exampleFormControlInput1" class="form-label">Tanggal Lahir</label>
                                        </div>
                                        <div class="col-lg-4">
                                            <label class="form-label">: 1 Januari 2001</label>
                                        </div>
                                        <div class="col-lg-2">
                                            <label for="exampleFormControlInput1" class="form-label">E-Mail</label>
                                        </div>
                                        <div class="col-lg-4">
                                            <label class="form-label">: coba@gmail.com</label>
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
                                            <label class="form-label">: D4 - Bisnis Digital</label>
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
            if (step === 1) {
                this.isJalurSelected = true;
            } else if (step === 2) {
                this.isInfoComplete = true;
            } else if (step === 3) {
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