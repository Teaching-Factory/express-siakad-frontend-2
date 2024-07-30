<script setup>
import axios from 'axios';
import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { API_URL } from '../../../config/config';
import { getToken } from '../../../service/auth';
import { get, postData } from '../../../utiils/request';
import Modal from '../../../components/Modal.vue';

const bobotPenilaian = ref([]);
const getNilai = ref([]);
const dataMahasiswa = ref([]);
const getKelasKuliah = ref([]);
const nilaiMahasiswa = ref([]);
const file = ref(null);
const route = useRoute();

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

        dataMahasiswa.value = response.data.data.map((mahasiswa) => {
            // Initialize nilai_bobot with empty values
            const nilai_bobot = bobotPenilaian.value.map((bobot) => ({
                id_bobot_penilaian: bobot.id_bobot_penilaian,
                nilai: ''
            }));

            // Fill nilai_bobot with actual values from detailNilaiPerkuliahanKelas
            mahasiswa?.detailNilaiPerkuliahanKelas?.NilaiPerkuliahans.forEach((nilaiPerkuliahan) => {
                const index = bobotPenilaian.value.findIndex((bobot) => bobot.id_unsur_penilaian === nilaiPerkuliahan.id_unsur_penilaian);
                if (index !== -1) {
                    nilai_bobot[index].nilai = nilaiPerkuliahan.nilai;
                }
            });

            return {
                ...mahasiswa,
                nilai_bobot,
                nilai_angka: mahasiswa?.detailNilaiPerkuliahanKelas?.nilai_angka || '',
                nilai_huruf: mahasiswa?.detailNilaiPerkuliahanKelas?.nilai_huruf || ''
            };
        });

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

const isUploadModalVisible = ref(false);

const handleFileUpload = (event) => {
    file.value = event.target.files[0];
};

const showUploadModal = () => {
    isUploadModalVisible.value = true;
};

const id_kelas_kuliah = route.params.id_kelas_kuliah || route.query.id_kelas_kuliah;
const uploadNilai = async (id_kelas_kuliah) => {
    if (!file.value) {
        Swal.fire('GAGAL', 'Silakan pilih file untuk diupload.', 'error');
        return;
    }

    const formData = new FormData();
    formData.append('file', file.value);

    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const response = await postData(`nilai-perkuliahan/${id_kelas_kuliah}/import-nilai-perkuliahan`, formData);
        console.log(response);

        Swal.close();
        Swal.fire('BERHASIL!', 'Data berhasil ditambahkan.', 'success').then(() => {
            // Tindakan tambahan setelah unggah berhasil jika diperlukan
            isUploadModalVisible.value = false;
        });
    } catch (error) {
        Swal.fire('GAGAL', 'Gagal menambahkan data. Silakan coba lagi.', 'error');
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
    if (id_kelas_kuliah) {
        fetchKelasKuliah(id_kelas_kuliah);
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
                        <button @click="showUploadModal" class="btn btn-success me-2"><i class="pi pi-upload mr-2"></i> Upload Excel</button>
                        <button @click="create" class="btn btn-primary me-2"><i class="pi pi-save mr-2"></i> Simpan</button>
                        <button class="btn btn-danger"><i class="pi pi-times mr-2"></i> Batal</button>
                    </div>
                </div>
            </div>
            <Modal v-if="isUploadModalVisible" :show="isUploadModalVisible" title="Upload Excel" size="md" @close="isUploadModalVisible = false">
                <form @submit.prevent="uploadNilai(id_kelas_kuliah)">
                    <p>Silahkan unduh template <a href="../../../../public/file/template_nilai.xlsx" download target="_blank">Disini</a></p>
                    <div class="mb-3">
                        <label for="file" class="form-label">Upload File Excel</label>
                        <input type="file" class="form-control" id="file" @change="handleFileUpload" />
                    </div>
                    <button type="submit" class="btn btn-primary">Upload</button>
                </form>
            </Modal>

            <hr />

            <div class="card" style="border-radius: none !important">
                <div class="row">
                    <div class="col-lg-2">Program Studi</div>
                    <div class="col-lg-4"><span class="me-2">:</span> {{ getKelasKuliah?.Prodi?.nama_program_studi || '-' }}</div>
                    <div class="col-lg-2">Periode</div>
                    <div class="col-lg-4"><span class="me-2">:</span>{{ getKelasKuliah?.Semester?.nama_semester || '-' }}</div>
                </div>
                <hr />
                <div class="row">
                    <div class="col-lg-2">Mata Kuliah</div>
                    <div class="col-lg-4"><span class="me-2">:</span>{{ getKelasKuliah?.MataKuliah?.nama_mata_kuliah || '-' }}</div>
                    <div class="col-lg-2">Nama Kelas</div>
                    <div class="col-lg-4"><span class="me-2">:</span> {{ getNilai?.KelasKuliah?.nama_kelas_kuliah }}</div>
                </div>
                <hr />
                <div class="row">
                    <div class="col-lg-2">Dosen Pengajar</div>
                    <div class="col-lg-4"><span class="me-2">:</span> {{ getKelasKuliah?.Dosen?.nama_dosen || '-' }}</div>
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
                                <input type="number" class="form-control" v-model="mahasiswa.nilai_bobot[bIndex].nilai" />
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