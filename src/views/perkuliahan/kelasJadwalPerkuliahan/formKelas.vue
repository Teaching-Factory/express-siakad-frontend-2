<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { get, postData } from '../../../utiils/request';
import vSelect from 'vue-select';
import swal from 'sweetalert2';
import axios from 'axios';
import { getToken } from '../../../service/auth';
import { API_URL } from '../../../config/config';

// Vue.component('v-select', vSelect);
const matkul = ref([]);
const ruangKuliah = ref([]);
const route = useRoute();
// const selectedRuang = ref('');
const selectedDosen = ref('');
const dosens = ref([]);
const nama_kelas_kuliah = ref('');
const kapasitas_peserta_kelas = ref('');
const hari = ref('');
const id_ruang_perkuliahan = ref('');
const id_dosen = computed(() => (selectedDosen.value ? selectedDosen.value.id : ''));
const jam_mulai = ref('');
const jam_selesai = ref('');
const lingkup = ref('');
const mode_kuliah = ref('');
const tanggal_mulai_efektif = ref('');
const tanggal_akhir_efektif = ref('');

const errors = ref({
    nama_kelas_kuliah: '',
    kapasitas_peserta_kelas: '',
    hari: '',
    id_ruang_perkuliahan: '',
    id_dosen: '',
    jam_mulai: '',
    jam_selesai: '',
    lingkup: '',
    mode_kuliah: '',
    tanggal_mulai_efektif: '',
    tanggal_akhir_efektif: ''
});

const validateNamaKelas = () => {
    if (!nama_kelas_kuliah.value) {
        errors.value.nama_kelas_kuliah = 'Nama Kelas Wajib Diisi.';
    } else {
        errors.value.nama_kelas_kuliah = '';
    }
};
const validateKapasitasPeserta = () => {
    if (!kapasitas_peserta_kelas.value) {
        errors.value.kapasitas_peserta_kelas = 'Kapasitas Peserta Kelas Wajib Diisi.';
    } else {
        errors.value.kapasitas_peserta_kelas = '';
    }
};
const validateHari = () => {
    if (!hari.value) {
        errors.value.hari = 'Hari Wajib Diisi.';
    } else {
        errors.value.hari = '';
    }
};
const validateRuangPerkuliahan = () => {
    if (!id_ruang_perkuliahan.value) {
        errors.value.id_ruang_perkuliahan = 'Ruang Perkuliahan Wajib Diisi.';
    } else {
        errors.value.id_ruang_perkuliahan = '';
    }
};
const validateDosen = () => {
    if (!id_dosen.value) {
        errors.value.id_dosen = 'Dosen Wajib Diisi.';
    } else {
        errors.value.id_dosen = '';
    }
};
const validateJamMulai = () => {
    if (!jam_mulai.value) {
        errors.value.jam_mulai = 'Jam Mulai  Wajib Diisi.';
    } else {
        errors.value.jam_mulai = '';
    }
};
const validateJamSelesai = () => {
    if (!jam_selesai.value) {
        errors.value.jam_selesai = 'Jam Selesai Wajib Diisi.';
    } else {
        errors.value.jam_selesai = '';
    }
};
const validateModeKuliah = () => {
    if (!mode_kuliah.value) {
        errors.value.mode_kuliah = 'Mode Kuliah Wajib Diisi.';
    } else {
        errors.value.mode_kuliah = '';
    }
};
const validateTanggalMulai = () => {
    if (!tanggal_mulai_efektif.value) {
        errors.value.tanggal_mulai_efektif = 'Tanggal Mulai Efektif Wajib Diisi.';
    } else {
        errors.value.tanggal_mulai_efektif = '';
    }
};
const validateTanggalSelesai = () => {
    if (!tanggal_akhir_efektif.value) {
        errors.value.tanggal_akhir_efektif = 'Tanggal Selesai Efektif Wajib Diisi.';
    } else {
        errors.value.tanggal_akhir_efektif = '';
    }
};

const fetchMataKuliah = async (id_matkul) => {
    try {
        const response = await get(`mata-kuliah/${id_matkul}/get`);
        matkul.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data:', error);
        // Berikan pesan error kepada pengguna jika diperlukan
        // Misalnya: Notify.error('Gagal mengambil data mata kuliah.');
    }
};

const fetchRuangPerkuliahan = async () => {
    try {
        const response = await get('ruang-perkuliahan');
        ruangKuliah.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data:', error);
    }
};
const fetchDosen = async () => {
    try {
        const response = await get('dosen');
        // Format respons dari API ke format yang sesuai dengan v-select
        dosens.value = response.data.data.map((dosen) => ({
            id: dosen.id_dosen, // Properti 'id' atau 'value' sesuai dengan library v-select
            nama_dosen: dosen.nama_dosen // Properti 'label' untuk menampilkan nama dosen
        }));
    } catch (error) {
        console.error('Gagal mengambil data dosen:', error);
    }
};

const create = async () => {
    try {
        validateDosen();
        validateHari();
        validateJamMulai();
        validateJamSelesai();
        validateKapasitasPeserta();
        validateModeKuliah();
        validateNamaKelas();
        validateRuangPerkuliahan();
        validateTanggalMulai();
        validateTanggalSelesai();

        const token = getToken();
        const id_prodi = matkul.value.id_prodi; // Asumsikan id_prodi diambil dari data matkul yang sudah difetch
        const id_semester = route.params.id_semester;
        const id_matkul = route.params.id_matkul;

        const payload = {
            nama_kelas_kuliah: nama_kelas_kuliah.value,
            kapasitas_peserta_kelas: kapasitas_peserta_kelas.value,
            hari: hari.value,
            id_ruang_perkuliahan: id_ruang_perkuliahan.value,
            id_dosen: id_dosen.value,
            jam_mulai: jam_mulai.value,
            jam_selesai: jam_selesai.value,
            lingkup: lingkup.value,
            mode_kuliah: mode_kuliah.value,
            tanggal_mulai_efektif: tanggal_mulai_efektif.value,
            tanggal_akhir_efektif: tanggal_akhir_efektif.value // Perbaikan disini
        };

        console.log('Payload:', payload); // Log payload for debugging

        const response = await axios.post(`${API_URL}/kelas-kuliah/${id_prodi}/${id_semester}/${id_matkul}/create`, payload, {
            headers: {
                Authorization: token
            }
        });

        const data = response.data;
        swal.fire('BERHASIL!', 'Data berhasil ditambahkan.', 'success').then(() => {
            window.location.href = '/kelas-jadwal-perkuliahan';
        });
    } catch (error) {
        swal.fire('GAGAL', 'Gagal menambahkan data. Silakan coba lagi.', 'error');
        console.error('Error:', error.response.data); // Log error response for debugging
    }
};

onMounted(() => {
    const id_matkul = route.params.id_matkul;
    fetchMataKuliah(id_matkul);
    fetchRuangPerkuliahan();
    fetchDosen();
});
</script>

<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-lg-6">
                    <h5><i class="pi pi-user me-2"></i>DETAIL KELAS DAN JADWAL MINGGUAN</h5>
                </div>
                <div class="col-lg-6 text-end">
                    <button class="btn btn-secondary" @click="create"><i class="pi pi-check me-2"></i> Simpan</button>
                </div>
            </div>

            <hr />

            <div class="card" style="border-radius: none !important">
                <div class="row">
                    <div class="col-lg-2">Program Studi</div>
                    <div class="col-lg-4"><span class="me-2">:</span> {{ matkul?.Prodi?.nama_program_studi || '-' }}</div>
                </div>
                <hr />
                <div class="row">
                    <div class="col-lg-2">Mata Kuliah</div>
                    <div class="col-lg-4"><span class="me-2"> :</span>{{ matkul.nama_mata_kuliah }} ({{ matkul.sks_mata_kuliah }})</div>
                </div>
                <hr style="margin: 0" />
                <div class="row">
                    <div class="d-flex col-12 justify-content-center">
                        <p><strong>Jadwal Mingguan</strong></p>
                    </div>
                </div>
                <hr style="margin-top: -5px" />
                <div class="mb-3 mt-4 row">
                    <label for="input" class="col-sm-3 col-form-label">Kelas</label>
                    <div class="col-sm-3">
                        <input type="text" @blur="validateNamaKelas" class="form-control" id="nama_kelas_kuliah" v-model="nama_kelas_kuliah" />
                    </div>
                    <label for="input" class="col-sm-3 col-form-label">Kapasitas Peserta Kelas</label>
                    <div class="col-sm-3">
                        <input type="text" @blur="validateKapasitasPeserta" class="form-control" id="kapasitas_peserta_kelas" v-model="kapasitas_peserta_kelas" />
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="input" class="col-sm-3 col-form-label">Hari</label>
                    <div class="col-sm-3">
                        <select name="" class="form-select" @blur="validateHari" v-model="hari" id="hari">
                            <option value="" selected disabled hidden>Hari</option>
                            <option value="senin">Senin</option>
                            <option value="selasa">Selasa</option>
                            <option value="rabu">Rabu</option>
                            <option value="kamis">Kamis</option>
                            <option value="jum'at">Jumat</option>
                            <option value="sabtu">Sabtu</option>
                        </select>
                    </div>
                    <label for="input" class="col-sm-3 col-form-label">Ruang</label>
                    <div class="col-sm-3">
                        <select v-model="id_ruang_perkuliahan" @blur="validateRuangPerkuliahan" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Ruang</option>
                            <option v-for="ruang in ruangKuliah" :key="ruang.id" :value="ruang.id">{{ ruang.nama_ruang_perkuliahan }}</option>
                        </select>
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="input" class="col-sm-3 col-form-label">Jam Mulai</label>
                    <div class="col-sm-3">
                        <input type="time" class="form-control" @blur="validateJamMulai" v-model="jam_mulai" id="jam_mulai" />
                    </div>
                    <label for="input" class="col-sm-3 col-form-label">Jam Selesai</label>
                    <div class="col-sm-3">
                        <input type="time" class="form-control" @blur="validateJamSelesai" v-model="jam_selesai" id="jam_selesai" />
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="input" class="col-sm-3 col-form-label">Lingkup</label>
                    <div class="col-sm-3">
                        <select name="" class="form-select" v-model="lingkup" id="lingkup">
                            <option value="" selected disabled hidden>Lingkup</option>
                            <option value="1">Internal</option>
                            <option value="2">Eksternal</option>
                            <option value="3">Campuran</option>
                        </select>
                    </div>
                    <label for="inputPassword" class="col-sm-3 col-form-label">Mode Kuliah</label>
                    <div class="col-sm-3">
                        <select name="" class="form-select" @blur="validateModeKuliah" v-model="mode_kuliah" id="mode_kuliah">
                            <option value="" selected disabled hidden>Mode Kuliah</option>
                            <option value="O">Online</option>
                            <option value="F">Offline</option>
                            <option value="M">Campuran</option>
                        </select>
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="input" class="col-sm-3 col-form-label">Tanggal Mulai Efektif</label>
                    <div class="col-sm-3">
                        <input type="date" class="form-control" @blur="validateTanggalMulai" v-model="tanggal_mulai_efektif" id="tanggal_mulai_efektif" />
                    </div>
                    <label for="input" class="col-sm-3 col-form-label">Tanggal Akhir Efektif</label>
                    <div class="col-sm-3">
                        <input type="date" class="form-control" @blur="validateTanggalSelesai" v-model="tanggal_akhir_efektif" id="tanggal_akhir_efektif" />
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="input" class="col-sm-3 col-form-label">Dosen</label>
                    <div class="col-sm-9">
                        <v-select v-model="selectedDosen" :options="dosens" @blur="validateDosen" label="nama_dosen" placeholder="Pilih dosen"></v-select>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>