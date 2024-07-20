<script setup>
import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';
import { get, getData } from '../../../utiils/request';

const periodes = ref([]);
const selectedPeriode = ref('');
const mahasiswa = ref([]);
const khsMahasiswa = ref([]);
const total = ref([]);

const getPeriode = async () => {
    try {
        const response = await get('semester');
        periodes.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};

const filterData = async () => {
    const periodeId = selectedPeriode.value;

    if (!periodeId) {
        // console.error('Prodi atau Angkatan Mahasiswa belum dipilih');
        Swal.fire('GAGAL!', 'Data tidak ditemukan.', 'warning').then(() => {});
        return;
    }
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await get(`rekap-khs-mahasiswa/${periodeId}/get-khs-mahasiswa`);
        mahasiswa.value = response.data.mahasiswa;
        khsMahasiswa.value = response.data.dataRekapKHSMahasiswa;
        total.value = response.data;

        console.log('mahasiswa', response.data.mahasiswa);
        console.log('khs', response.data.dataRekapKHSMahasiswa);
        Swal.close();
    } catch (error) {
        // console.error('Gagal mengambil data :', error);
        Swal.fire('Gagal mengambil data. Silakan coba lagi nanti.');
    }
};

onMounted(() => {
    getPeriode();
});
</script>

<template>
    <div class="card">
        <div class="card-body">
            <h5><i class="pi pi-user me-2"></i>KARTU HASIL STUDI (KHS)</h5>
            <hr />
            <div class="row mt-3">
                <div class="col-lg-10 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Periode</label>
                        <select v-model="selectedPeriode" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>--Pilih Periode--</option>
                            <option v-for="periode in periodes" :key="periode.id_semester" :value="periode.id_semester">{{ periode.nama_semester }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px">
                    <button @click="filterData" class="btn btn-primary btn-block" style="width: 100%">Tampilkan</button>
                </div>
            </div>
            <div class="card" style="border-radius: none !important">
                <div class="row">
                    <div class="col-lg-2">NIM</div>
                    <div class="col-lg-4"><span class="me-2">:</span> {{ mahasiswa?.nim || '-' }}</div>
                    <div class="col-lg-2">Jurusan</div>
                    <div class="col-lg-4"><span class="me-2">:</span> {{ mahasiswa?.Prodi?.nama_program_studi || '-' }}</div>
                </div>
                <hr style="border: 1px solid #000" />
                <div class="row">
                    <div class="col-lg-2">Nama</div>
                    <div class="col-lg-4"><span class="me-2">:</span> {{ mahasiswa?.nama_mahasiswa || '-' }}</div>
                    <div class="col-lg-2">Jenis Kelamin</div>
                    <div class="col-lg-4"><span class="me-2">:</span> {{ mahasiswa?.jenis_kelamin || '-' }}</div>
                </div>
                <hr style="border: 1px solid #000" />
                <div class="row">
                    <div class="col-lg-2">Status Mahasiswa</div>
                    <div class="col-lg-4"><span class="me-2">:</span>{{ mahasiswa?.nama_status_mahasiswa || '-' }}</div>
                    <div class="col-lg-2">Agama</div>
                    <div class="col-lg-4"><span class="me-2">:</span> {{ mahasiswa?.Agama?.nama_agama || '-' }}</div>
                </div>
            </div>

            <div style="overflow-x: auto">
                <table class="table table-bordered">
                    <thead class="table-dark align-middle">
                        <tr>
                            <th rowspan="2">No</th>
                            <th rowspan="2">Nama Mata Kuliah</th>
                            <th rowspan="2">SKS</th>
                            <th colspan="3">Nilai</th>
                            <th rowspan="2">SKS*Index</th>
                        </tr>
                        <tr>
                            <th>Angka</th>
                            <th>Huruf</th>
                            <th>Index</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(khs, index) in khsMahasiswa" :key="index">
                            <td>{{ index + 1 }}</td>
                            <td>{{ khs?.nama_mata_kuliah || '-' }}</td>
                            <td>{{ khs?.sks_mata_kuliah || '-' }}</td>
                            <td>{{ khs?.nilai_angka || '-' }}</td>
                            <td>{{ khs?.nilai_huruf || '-' }}</td>
                            <td>{{ khs?.nilai_indeks || '-' }}</td>
                            <td>{{ khs?.sks_x_indeks || '-' }}</td>
                        </tr>
                        <tr>
                            <td class="text-center" colspan="6">Total (Total SKS Indeks )</td>
                            <td>{{ total?.total_sks_indeks || '-' }}</td>
                        </tr>
                        <tr>
                            <td class="text-center" colspan="6">IPS (Index Prestasi Semester )</td>
                            <td>{{ total?.ips || '-' }}</td>
                        </tr>
                        <tr>
                            <td class="text-center" colspan="6">IPK (Index Prestasi Kumulatif )</td>
                            <td>{{ total?.ipk || '-' }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>