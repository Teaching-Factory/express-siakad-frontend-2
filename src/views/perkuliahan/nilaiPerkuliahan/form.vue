<script setup>
import axios from 'axios';
import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { API_URL } from '../../../config/config';
import { getToken } from '../../../service/auth';
import { get } from '../../../utiils/request';

const bobotPenilaian = ref([]);
const getNilai = ref([]);
const dataMahasiswa = ref([]);
const nilaiMahasiswa = ref([]);
const route = useRoute();

const fetchBobotPenilaian = async (id_prodi) => {
    console.log('Fetching bobot penilaian for id_prodi:', id_prodi);
    try {
        const response = await get(`bobot-penilaian/prodi/${id_prodi}/get`);
        bobotPenilaian.value = response.data.data;
        // Inisialisasi nilai_bobot pada setiap mahasiswa
        dataMahasiswa.value.forEach((mahasiswa) => {
            mahasiswa.nilai_bobot = bobotPenilaian.value.map(() => ({ nilai: '' }));
        });
        console.log('Response data:', response.data.data);
    } catch (error) {
        console.error('Error fetching bobot penilaian:', error);
    }
};

const fetchGetNilai = async (id_kelas_kuliah) => {
    try {
        const response = await get(`nilai-perkuliahan/${id_kelas_kuliah}/get-peserta-kelas`);
        getNilai.value = response.data.dataKelasKuliah;
        dataMahasiswa.value = response.data.data.map((mahasiswa) => ({
            ...mahasiswa,
            nilai_bobot: bobotPenilaian.value.map((bobot) => ({
                id_bobot_penilaian: bobot.id_bobot_penilaian,
                nilai: ''
            })),
            nilai_angka: mahasiswa?.detailNilaiPerkuliahanKelas?.nilai_angka || '',
            nilai_huruf: mahasiswa?.detailNilaiPerkuliahanKelas?.nilai_huruf || ''
        }));
        console.log('Response data:', response.data.data);
    } catch (error) {
        console.error('Error fetching:', error);
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

        const token = getToken();
        const id_kelas_kuliah = route.params.id_kelas_kuliah || route.query.id_kelas_kuliah;

        const payload = {
            penilaians: dataMahasiswa.value.map((mahasiswa) => ({
                id_registrasi_mahasiswa: mahasiswa.id_registrasi_mahasiswa,
                nilai_bobot: mahasiswa.nilai_bobot.map((nilai, index) => {
                    const bobot = bobotPenilaian.value[index];
                    if (!bobot) {
                        throw new Error(`Bobot Penilaian at index ${index} not found`);
                    }
                    return {
                        id_bobot: bobot.id_bobot_penilaian,
                        nilai: nilai.nilai
                    };
                })
            }))
        };

        console.log('Payload:', JSON.stringify(payload, null, 2)); // Logging payload

        const response = await axios.post(`${API_URL}/nilai-perkuliahan/${id_kelas_kuliah}/penilaian-detail-perkuliahan-kelas`, payload, {
            headers: {
                Authorization: token
            }
        });

        nilaiMahasiswa.value = response.data.data;
        Swal.close();
        Swal.fire('BERHASIL!', 'Data berhasil ditambahkan.', 'success').then(async () => {
            await fetchGetNilai(id_kelas_kuliah); // Panggil fetchGetNilai setelah berhasil menambahkan data
            //   window.location.href = `/nilai-perkuliahan/form/${id_kelas_kuliah}/${id_prodi}`;
        });
    } catch (error) {
        Swal.fire('GAGAL', 'Gagal menambahkan data. Silakan coba lagi.', 'error');
        console.error('Error:', error.response.data);
    }
};

onMounted(() => {
    const id_prodi = route.params.id_prodi || route.query.id_prodi;
    const id_kelas_kuliah = route.params.id_kelas_kuliah || route.query.id_kelas_kuliah;
    if (id_prodi) {
        fetchBobotPenilaian(id_prodi);
    }
    if (id_kelas_kuliah) {
        fetchGetNilai(id_kelas_kuliah);
    }
});
</script>

<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-10 xl:col-6">
                    <h5><i class="pi pi-user me-2"></i>DETAIL NILAI PERKULIAHAN</h5>
                </div>
                <div class="col-12 xl:col-6 d-flex justify-content-end">
                    <div class="flex justify-content-end gap-2">
                        <router-link to="/nilai-perkuliahan" class="btn btn-secondary me-2"> <i class="pi pi-bars mr-2"></i> Daftar</router-link>
                        <button class="btn btn-success me-2"><i class="pi pi-upload mr-2"></i> Upload Excel</button>
                        <button @click="create" class="btn btn-primary me-2"><i class="pi pi-save mr-2"></i> Simpan</button>
                        <button class="btn btn-danger"><i class="pi pi-times mr-2"></i> Batal</button>
                    </div>
                </div>
            </div>
            <hr />

            <div class="card" style="border-radius: none !important">
                <div class="row">
                    <div class="col-lg-2">Program Studi</div>
                    <div class="col-lg-4"><span class="me-2">:</span> {{ getNilai.KelasKuliah?.Prodi?.nama_program_studi || '-' }}</div>
                    <div class="col-lg-2">Periode</div>
                    <div class="col-lg-4"><span class="me-2">:</span>{{ getNilai.KelasKuliah?.Semester?.nama_semester || '-' }}</div>
                </div>
                <hr />
                <div class="row">
                    <div class="col-lg-2">Mata Kuliah</div>
                    <div class="col-lg-4"><span class="me-2">:</span>{{ getNilai.KelasKuliah?.MataKuliah?.nama_mata_kuliah || '-' }}</div>
                    <div class="col-lg-2">Nama Kelas</div>
                    <div class="col-lg-4"><span class="me-2">:</span> {{ getNilai?.KelasKuliah?.nama_kelas_kuliah }}</div>
                </div>
                <hr />
                <div class="row">
                    <div class="col-lg-2">Dosen Pengajar</div>
                    <div class="col-lg-4"><span class="me-2">:</span> {{ getNilai.KelasKuliah?.Dosen?.nama_dosen || '-' }}</div>
                    <div class="col-lg-2">Ruang Perkuliahan</div>
                    <div class="col-lg-4"><span class="me-2">:</span> -</div>
                </div>
                <hr />
                <div class="row">
                    <div class="col-lg-2">Lokasi</div>
                    <div class="col-lg-4"><span class="me-2">:</span> -</div>
                    <div class="col-lg-2">Waktu Perkuliahan</div>
                    <div class="col-lg-4"><span class="me-2">:</span> -</div>
                </div>
            </div>
            <div style="overflow-x: auto">
                <table class="table table-bordered">
                    <thead class="table-dark align-middle">
                        <tr>
                            <th rowspan="3">No</th>
                            <th rowspan="3">NIM</th>
                            <th rowspan="3">Nama Mahasiswa</th>
                            <th rowspan="3">Angkatan</th>
                            <th class="text-center" colspan="4">Nilai</th>
                            <th rowspan="3">Nilai AKhir</th>
                            <th rowspan="3">Nilai Huruf</th>
                        </tr>

                        <tr>
                            <th v-for="(penilaian, index) in bobotPenilaian" :key="index">{{ penilaian.UnsurPenilaian.nama_unsur_penilaian }}</th>
                        </tr>
                        <!-- <tr>
                            <th>Presensi</th>
                            <th>Tugas</th>
                            <th>Ujian Tengah Semester</th>
                            <th>Ujian Akhir Semester</th>
                        </tr> -->
                        <tr>
                            <th v-for="(bobot, index) in bobotPenilaian" :key="index">{{ bobot.bobot_penilaian }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(mahasiswa, mIndex) in dataMahasiswa" :key="mIndex">
                            <td>{{ mIndex + 1 }}</td>
                            <td>{{ mahasiswa?.Mahasiswa?.nim }}</td>
                            <td>{{ mahasiswa?.Mahasiswa?.nama_mahasiswa }}</td>
                            <td>{{ mahasiswa?.angkatan }}</td>
                            <td v-for="(bobot, bIndex) in bobotPenilaian" :key="bIndex">
                                <input type="text" class="form-control" v-model="mahasiswa.nilai_bobot[bIndex].nilai" />
                            </td>
                            <td>
                                <input type="text" class="form-control" v-model="mahasiswa.nilai_angka" disabled />
                            </td>
                            <td>
                                <input type="text" class="form-control" v-model="mahasiswa.nilai_huruf" disabled />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>