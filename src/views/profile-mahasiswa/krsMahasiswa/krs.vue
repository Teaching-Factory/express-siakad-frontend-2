<script setup>
import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';
import { get, getData } from '../../../utiils/request';

const periodes = ref([]);
const selectedPeriode = ref('');
const kelasKuliahs = ref([]);
const jadwalKuliah = ref([]);
const dataMahasiswa = ref([]);
const total = ref([]);
const semesterAktif = ref([]);

const fetchSemesterAktif = async () => {
    const response = await get('setting-global-semester');
    semesterAktif.value = response.data.data;
};

const getMahasiswa = async () => {
    const response = await getData('mahasiswa/get-mahasiswa-active');
    const krs = response.data.data;
    dataMahasiswa.value = krs;
    console.log('response', krs);
};

const getKrsMahasiswa = async () => {
    try {
        const response = await getData('mahasiswa/get-krs-mahasiswa-by-semester-active');
        const data = response.data.dataKRSMahasiswa; // Adjust based on actual response

        // Check if there's any data returned
        if (data && data.length > 0) {
            kelasKuliahs.value = data;
        } else {
            console.log('No KRS data available.');
        }

        console.log('Kelas Kuliah:', kelasKuliahs.value);
    } catch (error) {
        console.error('Gagal mengambil data Kelas Kuliah:', error);
    }
};

onMounted(() => {
    getMahasiswa();
    getKrsMahasiswa();
    fetchSemesterAktif();
});
</script>

<template>
    <div class="card">
        <div class="card-body">
            <h5><i class="pi pi-user me-2"></i>KARTU RENCANA STUDI - PERIODE {{ semesterAktif[0]?.SemesterAktif?.nama_semester }}</h5>
            <hr />
            <div class="card" style="border-radius: none !important">
                <div class="row">
                    <div class="col-lg-2">NIM</div>
                    <div class="col-lg-4"><span class="me-2">:</span> {{ dataMahasiswa?.nim || '-' }}</div>
                    <div class="col-lg-2">Jurusan</div>
                    <div class="col-lg-4"><span class="me-2">:</span> {{ dataMahasiswa?.Prodi?.nama_program_studi || '-' }}</div>
                </div>
                <hr style="border-color: black" />
                <div class="row">
                    <div class="col-lg-2">Nama</div>
                    <div class="col-lg-4"><span class="me-2">:</span> {{ dataMahasiswa?.nama_mahasiswa || '-' }}</div>
                    <div class="col-lg-2">Jenis Kelamin</div>
                    <div class="col-lg-4"><span class="me-2">:</span> {{ dataMahasiswa?.jenis_kelamin || '-' }}</div>
                </div>
                <hr style="border-color: black" />
                <div class="row">
                    <div class="col-lg-2">Status Mahasiswa</div>
                    <div class="col-lg-4"><span class="me-2">:</span>{{ dataMahasiswa?.nama_status_mahasiswa || '-' }}</div>
                    <div class="col-lg-2">Agama</div>
                    <div class="col-lg-4"><span class="me-2">:</span> {{ dataMahasiswa?.Agama?.nama_agama || '-' }}</div>
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-lg-12 d-flex justify-content-end">
                    <div class="flex justify-content-end gap-2">
                        <router-link to="/profile-krs-mahasiswa/krs" class="btn btn-secondary"><i class="pi pi-plus me-2"></i> Tambah</router-link>
                    </div>
                </div>
            </div>

            <div style="overflow-x: auto">
                <table class="table table-bordered text-center">
                    <thead class="table-dark align-middle">
                        <tr>
                            <th>No</th>
                            <th>Kode Mata Kuliah</th>
                            <th>Nama Mata Kuliah</th>
                            <th>SKS Kuliah</th>
                            <th>Kelas</th>
                            <th>Dosen Pengajar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(krsMahasiswa, index) in kelasKuliahs" :key="index">
                            <td>{{ index + 1 }}</td>
                            <td>{{ krsMahasiswa.KelasKuliah.MataKuliah.kode_mata_kuliah }}</td>
                            <td>{{ krsMahasiswa.KelasKuliah.MataKuliah.nama_mata_kuliah }}</td>
                            <td>{{ krsMahasiswa.KelasKuliah.MataKuliah.sks_mata_kuliah }}</td>
                            <td>{{ krsMahasiswa.KelasKuliah.nama_kelas_kuliah }}</td>
                            <td>{{ krsMahasiswa.KelasKuliah.Dosen.nama_dosen }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>