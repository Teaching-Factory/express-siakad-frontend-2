<script setup>
import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';
import { get, getData, postData } from '../../../utiils/request';
import { useRoute } from 'vue-router';

const route = useRoute();

const kelasKuliahs = ref([]);
const aspekPenilaian = ref([]);
const skalaPenilaian = ref([]);
const dataMahasiswa = ref([]);
const id_aspek_penilaian_dosen = ref('');
const id_skala_penilaian_dosen = ref('');

const getMahasiswa = async () => {
    Swal.fire({
        title: 'Loading...',
        html: 'Sedang Memuat Data',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
    const response = await getData('mahasiswa/get-mahasiswa-active');
    const krs = response.data.data;
    dataMahasiswa.value = krs;
    console.log('response', krs);
    Swal.close();
};

const getKuisioner = async (id_kelas_kuliah) => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await getData(`kuesioner/kelas-kuliah/${id_kelas_kuliah}/get`);
        const data = response.data;

        if (data.dataAspekPenilaian && data.dataAspekPenilaian.length > 0) {
            aspekPenilaian.value = data.dataAspekPenilaian;
        } else {
            console.error('Data Aspek Penilaian kosong');
        }

        skalaPenilaian.value = data.dataSkalaPenilaian;
    } catch (error) {
        console.error('Gagal mengambil data Kelas Kuliah:', error);
    } finally {
        Swal.close();
    }
};

const submitKuisioner = async () => {
    try {
        const kuesioner_answers = aspekPenilaian.value.map((kuisioner, index) => {
            const selectedSkala = document.querySelector(`input[name='row${index}']:checked`);

            return {
                id_aspek_penilaian_dosen: kuisioner.id,
                id_skala_penilaian_dosen: selectedSkala ? selectedSkala.value : null
            };
        });

        const validAnswers = kuesioner_answers.filter((item) => item.id_skala_penilaian_dosen !== null);

        if (validAnswers.length === 0) {
            throw new Error('No valid answers provided');
        }

        const id_kelas_kuliah = route.params.id_kelas_kuliah || route.query.id_kelas_kuliah;
        const payload = {
            kuesioner_answers: validAnswers
        };

        const response = await postData(`kuesioner/${id_kelas_kuliah}/create-kuesioner-by-mahasiswa-active`, payload);

        Swal.fire('BERHASIL!', 'Data berhasil diperbarui.', 'success').then(() => {
            window.location.href = '/kuesioner-penilaian-dosen';
        });
    } catch (error) {
        Swal.close();
        console.error('Error updating data:', error);
        Swal.fire('GAGAL', `Gagal memperbarui data: ${error.message}`, 'error');
    }
};

onMounted(() => {
    getMahasiswa();
    const id_kelas_kuliah = route.params.id_kelas_kuliah || route.query.id_kelas_kuliah;
    if (id_kelas_kuliah) {
        getKuisioner(id_kelas_kuliah);
    } else {
        console.error('id_kelas_kuliah tidak ditemukan di URL');
    }
});
</script>

<template>
    <div class="card">
        <div class="card-body">
            <div class="row mt-4 mb-4">
                <div class="col-lg-6 d-flex">
                    <h5><i class="pi pi-user me-2"></i>KUESIONER PENILAIAN DOSEN</h5>
                </div>
                <div class="col-lg-6 d-flex justify-content-end">
                    <div div class="flex justify-content-end gap-2">
                        <router-link to="/kuesioner-penilaian-dosen" class="btn btn-secondary"> <i class="pi pi-bars me-2"></i> Daftar</router-link>
                        <button @click="submitKuisioner" class="btn btn-primary"><i class="pi pi-check me-2"></i> Simpan</button>
                        <button class="btn btn-danger"><i class="pi pi-refresh me-2"></i> Batal</button>
                    </div>
                </div>
            </div>
            <hr />
            <div class="card" style="border-radius: none !important">
                <div class="row">
                    <div class="col-lg-2">Mahasiswa</div>
                    <div class="col-lg-4"><span class="me-2">:</span> {{ dataMahasiswa?.nim || '-' }}</div>
                    <div class="col-lg-2">Mata Kuliah</div>
                    <div class="col-lg-4"><span class="me-2">:</span> {{ dataMahasiswa?.Prodi?.nama_program_studi || '-' }}</div>
                </div>
                <hr style="border: 1px solid #000" />
                <div class="row">
                    <div class="col-lg-2">Program Studi</div>
                    <div class="col-lg-4"><span class="me-2">:</span> {{ dataMahasiswa?.nama_mahasiswa || '-' }}</div>
                    <div class="col-lg-2">Nama Dosen</div>
                    <div class="col-lg-4"><span class="me-2">:</span> {{ dataMahasiswa?.jenis_kelamin || '-' }}</div>
                </div>
                <hr style="border: 1px solid #000" />
                <div class="row">
                    <div class="col-lg-2">Status Mahasiswa</div>
                    <div class="col-lg-4"><span class="me-2">:</span>{{ dataMahasiswa?.nama_status_mahasiswa || '-' }}</div>
                    <div class="col-lg-2">Periode Perkuliahan</div>
                    <div class="col-lg-4"><span class="me-2">:</span> {{ dataMahasiswa?.Agama?.nama_agama || '-' }}</div>
                </div>
            </div>
            <div style="overflow-x: auto">
                <table class="table table-bordered text-center">
                    <thead class="table-dark align-middle">
                        <tr>
                            <th>No</th>
                            <th>Aspek Penilaian</th>
                            <th>Deskripsi</th>
                            <th colspan="4">Jawaban</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(kuisioner, index) in aspekPenilaian" :key="index">
                            <td>{{ index + 1 }}</td>
                            <td>{{ kuisioner.aspek_penilaian }}</td>
                            <td>{{ kuisioner.deskripsi_pendek }}</td>
                            <td v-for="(skala, skalaIndex) in skalaPenilaian" :key="skalaIndex">
                                {{ skala.keterangan_skala_penilaian }}
                                <input type="radio" :name="'row' + index" :value="skala.id" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>