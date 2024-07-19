<script setup>
import { ref, onBeforeMount, watch, computed, onMounted } from 'vue';
import { get } from '../../../utiils/request';
import vSelect from 'vue-select';
import Swal from 'sweetalert2';
import { getToken } from '../../../service/auth';
import axios from 'axios';
import { API_URL } from '../../../config/config';

const periodes = ref([]);
const prodis = ref([]);
const angkatans = ref([]);
const mahasiswas = ref([]);
const jenisTagihans = ref([]);
const selectedProdi = ref('');
const selectedAngkatan = ref('');
const selectedMahasiswa = ref([]);
const jumlah_tagihan = ref('');
const tanggal_tagihan = ref('');
const deadline_tagihan = ref('');
const status_tagihan = ref('');
const id_periode = ref('');
const id_jenis_tagihan = ref('');
const errors = ref({
    jumlah_tagihan: '',
    tanggal_tagihan: '',
    deadline_tagihan: '',
    status_tagihan: '',
    id_periode: '',
    id_registrasi_mahasiswa: '',
    id_jenis_tagihan: ''
});

const fetchPeriode = async () => {
    try {
        const response = await get('periode');
        periodes.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};

const fetchProdi = async () => {
    try {
        const response = await get('prodi');
        prodis.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};

const fetchAngkatan = async () => {
    try {
        const response = await get('angkatan');
        angkatans.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};

const fetchJenisTagihan = async () => {
    try {
        const response = await get('jenis-tagihan');
        jenisTagihans.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};

const fetchClasses = async () => {
    if (selectedProdi.value && selectedAngkatan.value) {
        try {
            const response = await get(`mahasiswa/${selectedProdi.value}/${selectedAngkatan.value}/get`);
            mahasiswas.value = response.data.data.map((mahasiswa) => ({
                id: mahasiswa.id_registrasi_mahasiswa,
                nama_mahasiswa: mahasiswa.nama_mahasiswa,
                label: `${mahasiswa.nim} - ${mahasiswa.nama_mahasiswa}`
            }));
        } catch (error) {
            console.error('Gagal mengambil data :', error);
        }
    }
};

watch(selectedProdi, fetchClasses);
watch(selectedAngkatan, fetchClasses);

const validateJumlahTagihan = () => {
    if (!jumlah_tagihan.value) {
        errors.value.jumlah_tagihan = 'Jumlah tagihan Wajib Diisi.';
    } else {
        errors.value.jumlah_tagihan = '';
    }
};

const validateTanggalTagihan = () => {
    if (!tanggal_tagihan.value) {
        errors.value.tanggal_tagihan = 'Tanggal tagihan wajib Diisi.';
    } else {
        errors.value.tanggal_tagihan = '';
    }
};

const validateDeadlineTagihan = () => {
    if (!deadline_tagihan.value) {
        errors.value.deadline_tagihan = 'Deadline Tagihan Wajib Diisi.';
    } else {
        errors.value.deadline_tagihan = '';
    }
};

const validateStatusTagihan = () => {
    if (!status_tagihan.value) {
        errors.value.status_tagihan = 'Status Tagihan Wajib Diisi.';
    } else {
        errors.value.status_tagihan = '';
    }
};

const validatePeriode = () => {
    if (!id_periode.value) {
        errors.value.id_periode = 'Periode Wajib Diisi.';
    } else {
        errors.value.id_periode = '';
    }
};

const validateMahasiswa = () => {
    if (selectedMahasiswa.value.length === 0) {
        errors.value.id_registrasi_mahasiswa = 'Mahasiswa Wajib Diisi.';
    } else {
        errors.value.id_registrasi_mahasiswa = '';
    }
};

const validateJenisTagihan = () => {
    if (!id_jenis_tagihan.value) {
        errors.value.id_jenis_tagihan = 'Jenis Tagihan Wajib Diisi.';
    } else {
        errors.value.id_jenis_tagihan = '';
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

        validateJumlahTagihan();
        validateDeadlineTagihan();
        validateJenisTagihan();
        validateMahasiswa();
        validatePeriode();
        validateStatusTagihan();
        validateTanggalTagihan();

        const token = getToken();

        const payload = {
            jumlah_tagihan: jumlah_tagihan.value,
            tanggal_tagihan: tanggal_tagihan.value,
            deadline_tagihan: deadline_tagihan.value,
            id_periode: id_periode.value,
            id_jenis_tagihan: id_jenis_tagihan.value,
            status_tagihan: status_tagihan.value,
            mahasiswas: selectedMahasiswa.value.map((mahasiswa) => ({
                id_registrasi_mahasiswa: mahasiswa.id
            }))
        };

        console.log('Payload:', payload);

        const response = await axios.post(`${API_URL}/tagihan-mahasiswa/create-tagihan-mahasiswa-kolektif`, payload, {
            headers: {
                Authorization: token
            }
        });

        Swal.close();
        Swal.fire('BERHASIL!', 'Data berhasil ditambahkan.', 'success').then(() => {
            window.location.href = '/daftar-tagihan';
        });
    } catch (error) {
        Swal.fire('GAGAL', 'Gagal menambahkan data. Silakan coba lagi.', 'error');
        console.error('Error:', error.response.data);
    }
};

onMounted(() => {
    fetchPeriode();
    fetchAngkatan();
    fetchProdi();
    fetchJenisTagihan();
});
</script>

<template>
    <form @submit.prevent="create">
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-lg-4">
                        <h5><i class="pi pi-user me-2"></i>TAMBAH TAGIHAN</h5>
                    </div>
                    <div class="col-lg-8 d-flex justify-content-end">
                        <router-link to="/daftar-tagihan" class="btn btn-dark me-2"><i class="pi pi-list me-2"></i> Kembali</router-link>
                        <button type="submit" class="btn btn-primary me-2"><i class="pi pi-check me-2"></i> Simpan</button>
                        <button type="reset" class="btn btn-danger"><i class="pi pi-refresh me-2"></i> Reset</button>
                    </div>
                </div>
                <hr />
                <div class="row d-flex justify-content-center mb-3 mt-4">
                    <div class="col-lg-2">
                        <label for="exampleFormControlInput1" class="form-label">Periode Tagihan</label>
                    </div>
                    <div class="col-lg-4">
                        <select v-model="id_periode" @blur="validatePeriode" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>--Pilih Periode--</option>
                            <option v-for="periode in periodes" :key="periode.id_periode" :value="periode.id_periode">{{ periode.periode_pelaporan }}</option>
                        </select>
                    </div>
                    <div class="col-lg-2">
                        <label for="exampleFormControlInput1" class="form-label">Jumlah Tagihan </label>
                    </div>
                    <div class="col-lg-4">
                        <input type="text" class="form-control" placeholder="Masukkan nominal disini" v-model="jumlah_tagihan" @blur="validateJumlahTagihan" />
                    </div>
                </div>
                <div class="row d-flex justify-content-end mb-3">
                    <div class="col-lg-2">
                        <label for="exampleFormControlInput1" class="form-label">Prodi </label>
                    </div>
                    <div class="col-lg-4">
                        <select v-model="selectedProdi" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>--Pilih Program Studi--</option>
                            <option v-for="prodi in prodis" :key="prodi.id_prodi" :value="prodi.id_prodi">{{ prodi.nama_program_studi }}</option>
                        </select>
                    </div>
                    <div class="col-lg-2">
                        <label for="exampleFormControlInput1" class="form-label">Jenis Tagihan </label>
                    </div>
                    <div class="col-lg-4">
                        <select v-model="id_jenis_tagihan" @blur="validateJenisTagihan" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>--Pilih Tagihan--</option>
                            <option v-for="jenisTagihan in jenisTagihans" :key="jenisTagihan.id_jenis_tagihan" :value="jenisTagihan.id_jenis_tagihan">{{ jenisTagihan.nama_jenis_tagihan }}</option>
                        </select>
                    </div>
                </div>
                <div class="row d-flex justify-content-end mb-3">
                    <div class="col-lg-2">
                        <label for="exampleFormControlInput1" class="form-label">Angkatan </label>
                    </div>
                    <div class="col-lg-4">
                        <select v-model="selectedAngkatan" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>--Pilih Angkatan--</option>
                            <option v-for="angkatan in angkatans" :key="angkatan.id" :value="angkatan.id">{{ angkatan.tahun }}</option>
                        </select>
                    </div>
                    <div class="col-lg-2">
                        <label for="exampleFormControlInput1" class="form-label">Tanggal Tagihan</label>
                    </div>
                    <div class="col-lg-4">
                        <input type="date" class="form-control" v-model="tanggal_tagihan" @blur="validateTanggalTagihan" />
                    </div>
                </div>
                <div class="row d-flex justify-content-center mb-3">
                    <div class="col-lg-2">
                        <label for="exampleFormControlInput1" class="form-label">NIM</label>
                    </div>
                    <div class="col-lg-4">
                        <v-select multiple v-model="selectedMahasiswa" :options="mahasiswas" @blur="validateMahasiswa" label="label" placeholder="Ketikan Nim / Nama Mahasiswa"></v-select>
                    </div>
                    <div class="col-lg-2">
                        <label for="exampleFormControlInput1" class="form-label">Deadline Tagihan</label>
                    </div>
                    <div class="col-lg-4">
                        <input type="date" class="form-control" v-model="deadline_tagihan" @blur="validateDeadlineTagihan" />
                    </div>
                </div>
                <div class="row d-flex justify-content-start mb-3">
                    <div class="col-lg-2">
                        <label for="exampleFormControlInput1" class="form-label">Status Pembayaran </label>
                    </div>
                    <div class="col-lg-4">
                        <select class="form-select" v-model="status_tagihan" @blur="validateStatusTagihan" aria-label="Default select example">
                            <option selected disabled hidden>--Status Pembayaran --</option>
                            <option value="Belum Bayar">Belum Bayar</option>
                            <option value="Belum Lunas">Belum Lunas</option>
                            <option value="Lunas">Lunas</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>
<style scoped>
.card-theme {
    background-color: rgba(154, 160, 172, 0.5);
}
</style>
