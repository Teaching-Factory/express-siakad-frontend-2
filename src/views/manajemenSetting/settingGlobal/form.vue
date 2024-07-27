<script setup>
import { ref, onBeforeMount } from 'vue';
import { getData } from '../../../utiils/request';
import { onMounted } from 'vue';
import Swal from 'sweetalert2';
import { useRoute, useRouter } from 'vue-router';
import { getToken } from '../../../service/auth';
import axios from 'axios';
import { API_URL } from '../../../config/config';
const id_semester = ref('');
const semesterAktif = ref([]);
const semesters = ref([]);
const id = ref(null);
const route = useRoute();
const router = useRouter();

const getSemesterAktif = async (id) => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const res = await getData(`semester-aktif/${id}/get`);
        console.log('semester-aktif', res.data.data);
        if (res.status === 200) {
            const data = res.data.data
            semesterAktif.value = res.data.data;
            id_semester.value = data.id_semester; // Atur ID semester aktif di sini
        }
        Swal.close();
    } catch (error) {
        console.error('Error fetching active semester:', error);
        Swal.close();
    }
};

const getSemester = async () => {
    try {
        const response = await getData('semester');
        semesters.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data semester:', error);
    }
};

const update = async () => {
    try {
        const token = getToken();
        await axios.put(
            `${API_URL}/semester-aktif/update`,
            {
                id_semester: id_semester.value,
            },
            {
                headers: {
                    Authorization: token
                }
            }
        );
        Swal.fire('BERHASIL!', 'Data berhasil diperbarui.', 'success').then(() => {
            router.push('/setting-global').catch((err) => {
                console.error('Redirect error:', err);
            });
        });
    } catch (error) {
        Swal.fire('GAGAL', 'Gagal memperbarui data. Silakan coba lagi.', 'error');
    }
};

onMounted(() => {
    id.value = route.params.id;
    if (id.value) {
        getSemesterAktif(id.value);
    }
    getSemester();
});
</script>

<template>
    <div class="card">
        <div class="row">
            <div class="col-lg-5">
                <h5><i class="pi pi-user me-2"></i> EDIT SETTING GLOBAL</h5>
            </div>
            <div class="col-lg-7 d-flex justify-content-end">
                <router-link to="/setting-global" class="btn btn-dark me-2"><i class="pi pi-list me-2"></i> Kembali</router-link>
                <button @click="update" class="btn btn-primary me-2"><i class="pi pi-check me-2"></i> Simpan</button>
                <router-link to="/setting-global" class="btn btn-danger"><i class="pi pi-refresh me-2"></i> Reset</router-link>
            </div>
        </div>
        <hr />
        
        <div class="card" style="padding: 0rem 1rem 0rem 1rem">
            <div class="row d-flex justify-content-start mb-3 mt-4">
                <div class="col-lg-3">
                    <label for="exampleFormControlInput1" class="form-label">Semester Berlaku (Aktif)</label>
                </div>
                <div class="col-lg-9">
                    <select v-model="id_semester" class="form-select" aria-label="Default select example">
                        <option value="" selected disabled hidden>Pilih semester</option>
                        <option v-for="semester in semesters" :key="semester.id_semester" :value="semester.id_semester">
                        {{ semester.nama_semester }}
                        </option>
                    </select>
                </div>
                <!-- <div class="col-lg-3">
                    <label for="exampleFormControlInput1" class="form-label">Semester KRS</label>
                </div>
                <div class="col-lg-3">
                    <select  class="form-select" aria-label="Default select example">
                        <option value="" selected disabled hidden>2023/2024 Ganjil</option>
                        <option>2023/2024 Genap</option>
                        <option>2023/2024 Genap</option>
                        <option>2023/2024 Genap</option>
                    </select>
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-3">
                    <label for="exampleFormControlInput1" class="form-label">Semester Nilai</label>
                </div>
                <div class="col-lg-3">
                    <select  class="form-select" aria-label="Default select example">
                        <option value="" selected disabled hidden>2023/2024 Ganjil</option>
                        <option>2023/2024 Genap</option>
                        <option>2023/2024 Genap</option>
                        <option>2023/2024 Genap</option>
                    </select>
                </div>
                <div class="col-lg-3">
                    <label for="exampleFormControlInput1" class="form-label">Batas SKSnya KRS untuk Sarjana dan Diploma</label>
                </div>
                <div class="col-lg-3">
                    <select  class="form-select" aria-label="Default select example">
                        <option value="" selected disabled hidden>2023/2024 Ganjil</option>
                        <option>2023/2024 Genap</option>
                        <option>2023/2024 Genap</option>
                        <option>2023/2024 Genap</option>
                    </select>
                </div> -->
            </div>
            <!-- <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-3">
                    <label for="exampleFormControlInput1" class="form-label">Perhitungan Cetak Transkrip</label>
                </div>
                <div class="col-lg-3">
                    <select  class="form-select" aria-label="Default select example">
                        <option value="" selected disabled hidden>Nilai Tertinggi</option>
                        <option>Nilai Terbaru</option>
                    </select>
                </div>
                <div class="col-lg-3">
                    <label for="exampleFormControlInput1" class="form-label">Wilayah Penandatanganan Laporan</label>
                </div>
                <div class="col-lg-3">
                    <input type="text" class="form-control" id="inputPassword" placeholder="Banyuwangi">
                </div>
                
            </div>
            <div class="row d-flex justify-content-end mb-3">
                <div class="col-lg-3">
                    <label for="exampleFormControlInput1" class="form-label">Label Dosen Wali</label>
                </div>
                <div class="col-lg-3">
                    <select  class="form-select" aria-label="Default select example">
                        <option value="" selected disabled hidden>Pembimbing Akademik</option>
                        <option>Dosen Wali</option>
                    </select>
                </div>
            </div> -->
            <div class="row">
                <div class="col-12 col-md-6 col-lg-12">
                    <h6 class="text-dark">Keterangan :</h6>
                    <ol class="lh-2 text-small">
                        <li>Fitur ini digunakan untuk mengubah periode semester yang aktif.</li>
                        <li>Fitur ini digunakan untuk mengubah status pembukaan penilaian, KRS & KHS.</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card-theme {
    background-color: rgba(154, 160, 172, 0.5);
}
</style>
