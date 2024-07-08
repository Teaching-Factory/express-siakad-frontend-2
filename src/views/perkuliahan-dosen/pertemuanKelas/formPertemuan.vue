<script setup>
import axios from 'axios';
import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { API_URL } from '../../../config/config';
import { getToken } from '../../../service/auth';
import { get } from '../../../utiils/request';

const getKelasKuliah = ref([]);
const route = useRoute();
const ruangKuliah = ref([]);
const pertemuan = ref('');
const tanggal_pertemuan = ref('');
const waktu_mulai = ref('');
const waktu_selesai = ref('');
const materi = ref('');
const id_ruang_perkuliahan = ref('');

const errors = ref({
    pertemuan: '',
    tanggal_pertemuan: '',
    waktu_mulai: '',
    waktu_selesai: '',
    materi: '',
    id_ruang_perkuliahan: ''
});

const fetchKelasKuliah = async (id_kelas_kuliah) => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await get(`kelas-kuliah/${id_kelas_kuliah}/get`);
        getKelasKuliah.value = response.data.data;
        Swal.close();
    } catch (error) {
        console.error('Error fetching:', error);
    }
};

const validatePertemuan = () => {
    if (!pertemuan.value) {
        errors.value.pertemuan = 'Pertemuan Wajib Diisi.';
    } else {
        errors.value.pertemuan = '';
    }
};
const validateTanggal = () => {
    if (!tanggal_pertemuan.value) {
        errors.value.tanggal_pertemuan = 'Tanggal Pertemuan Wajib Diisi.';
    } else {
        errors.value.tanggal_pertemuan = '';
    }
};
const validateWaktuMulai = () => {
    if (!waktu_mulai.value) {
        errors.value.waktu_mulai = 'Waktu Mulai Wajib Diisi.';
    } else {
        errors.value.waktu_mulai = '';
    }
};
const validateWaktuSelesai = () => {
    if (!waktu_selesai.value) {
        errors.value.waktu_selesai = 'Waktu Selesai Wajib Diisi.';
    } else {
        errors.value.waktu_selesai = '';
    }
};
const validateMateri = () => {
    if (!materi.value) {
        errors.value.materi = 'Materi Wajib Diisi.';
    } else {
        errors.value.materi = '';
    }
};

const validateRuangPerkuliahan = () => {
    if (!id_ruang_perkuliahan.value) {
        errors.value.id_ruang_perkuliahan = 'Ruang Perkuliahan Wajib Diisi.';
    } else {
        errors.value.id_ruang_perkuliahan = '';
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

        validatePertemuan();
        validateTanggal();
        validateWaktuMulai();
        validateWaktuSelesai();
        validateMateri();
        validateRuangPerkuliahan();

        const token = getToken();
        const id_kelas_kuliah = route.params.id_kelas_kuliah;

        const payload = {
            pertemuan: pertemuan.value,
            tanggal_pertemuan: tanggal_pertemuan.value,
            waktu_mulai: waktu_mulai.value,
            waktu_selesai: waktu_selesai.value,
            materi: materi.value,
            id_ruang_perkuliahan: id_ruang_perkuliahan.value
        };

        console.log('Payload:', payload); // Log payload for debugging

        const response = await axios.post(`${API_URL}/pertemuan-perkuliahan/${id_kelas_kuliah}/create`, payload, {
            headers: {
                Authorization: token
            }
        });

        const data = response.data;
        Swal.close();
        Swal.fire('BERHASIL!', 'Data berhasil ditambahkan.', 'success').then(() => {
            window.location.href = `/pertemuan-perkuliahan/${id_kelas_kuliah}`;
        });
    } catch (error) {
        swal.fire('GAGAL', 'Gagal menambahkan data. Silakan coba lagi.', 'error');
        console.error('Error:', error.response.data); // Log error response for debugging
    }
};

onMounted(() => {
    const id_kelas_kuliah = route.params.id_kelas_kuliah || route.query.id_kelas_kuliah;

    if (id_kelas_kuliah) {
        fetchKelasKuliah(id_kelas_kuliah);
    }
    fetchRuangPerkuliahan();
});
</script>

<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-lg-6">
                    <h5><i class="pi pi-user me-2"></i>TAMBAH PERTEMUAN BARU</h5>
                </div>
                <div class="col-lg-6 text-end">
                    <button @click="create" class="btn btn-primary"><i class="pi pi-save me-2"></i> Simpan</button>
                </div>
            </div>
            <hr />

            <div class="card" style="border-radius: none !important">
                <div class="row">
                    <div class="col-lg-2">Program Studi</div>
                    <div class="col-lg-4"><span class="me-2">:</span> {{ getKelasKuliah?.Prodi?.nama_program_studi }}</div>
                    <div class="col-lg-2">Semester</div>
                    <div class="col-lg-4"><span class="me-2">:</span>{{ getKelasKuliah.Semester?.nama_semester }}</div>
                </div>
                <hr />
                <div class="row">
                    <div class="col-lg-2">Mata Kuliah</div>
                    <div class="col-lg-4"><span class="me-2"> :</span> {{ getKelasKuliah.MataKuliah?.nama_mata_kuliah }} ({{ getKelasKuliah.MataKuliah?.sks_mata_kuliah }})</div>
                    <div class="col-lg-2">Kurikulum</div>
                    <div class="col-lg-4"><span class="me-2">:</span> S1 Teknik Informatika</div>
                </div>
            </div>

            <div class="card" style="border-radius: none !important">
                <hr style="margin-top: -5px" />

                <div class="mb-3 row">
                    <label for="inputPassword" class="col-sm-3 col-form-label">Pertemuan ke-</label>
                    <div class="col-sm-9">
                        <select name="" class="form-select" id="pertemuan" v-model="pertemuan" @blur="validatePertemuan">
                            <option value="" selected disabled hidden>Pilih Pertemuan</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                        </select>
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="tanggal" class="col-sm-3 col-form-label">tanggal</label>
                    <div class="col-sm-3">
                        <input type="date" class="form-control" id="tanggal" v-model="tanggal_pertemuan" @blur="validateTanggal" />
                    </div>
                    <label for="inputPassword" class="col-sm-3 col-form-label">Ruang</label>
                    <div class="col-sm-3">
                        <select v-model="id_ruang_perkuliahan" @blur="validateRuangPerkuliahan" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Ruang</option>
                            <option v-for="ruang in ruangKuliah" :key="ruang.id" :value="ruang.id">{{ ruang.nama_ruang_perkuliahan }}</option>
                        </select>
                    </div>
                </div>
                <div class="mb-3 mt-4 row">
                    <label for="inputPassword" class="col-sm-3 col-form-label">Jam Mulai</label>
                    <div class="col-sm-3">
                        <input type="time" class="form-control" id="waktu_mulai" v-model="waktu_mulai" @blur="validateWaktuMulai" />
                    </div>
                    <label for="inputPassword" class="col-sm-3 col-form-label">Jam Selesai</label>
                    <div class="col-sm-3">
                        <input type="time" class="form-control" id="waktu_selesai" v-model="waktu_selesai" @blur="validateWaktuSelesai" />
                    </div>
                </div>
                <div class="mb-3 mt-4 row">
                    <div class="col-lg-3">
                        <label for="exampleFormControlInput1" class="form-label">Materi</label>
                    </div>
                    <div class="col-lg-9">
                        <textarea name="" id="materi" v-model="materi" @blur="validateMateri" class="form-control" rows="10"></textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>