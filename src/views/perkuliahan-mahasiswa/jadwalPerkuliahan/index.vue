<script setup>
import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';
import { get, getData } from '../../../utiils/request';

const periodes = ref([]);
const selectedPeriode = ref('');
const mahasiswa = ref([]);
const jadwalKuliah = ref([]);
const dataMahasiswa = ref([]);
const total = ref([]);

const getPeriode = async () => {
    try {
        const response = await get('semester');
        periodes.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};

const getMahasiswa = async () => {
   
   const response = await get('mahasiswa/get-mahasiswa-active');
   const krs = response.data.data;
   dataMahasiswa.value = krs;
   console.log(response.data.data);
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
        })
        const response = await get(`rekap-jadwal-kuliah/${periodeId}/get-rekap-jadwal-kuliah-by-semester`);
        jadwalKuliah.value = response.data.data;
        total.value = response.data;
        console.log('jadwal', response.data.data);
        Swal.close();
    } catch (error) {
        // console.error('Gagal mengambil data :', error);
        Swal.fire('GAGAL!', 'Gagal mengambil data. Silakan coba lagi nanti.', 'warning');
    }
};

onMounted(() => {
    getPeriode();
    getMahasiswa()
});
</script>

<template>
    <div class="card">
        <div class="card-body">
            <h5><i class="pi pi-user me-2"></i>JADWAL PERKULIAHAN</h5>
            <hr>
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
                <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px;">
                    <button @click="filterData" class="btn btn-primary btn-block" style="width: 100%;">Tampilkan</button>
                </div>
            </div>
            <div class="card" style="border-radius: none !important">
                <div class="row">
                    <div class="col-lg-2">NIM</div>
                    <div class="col-lg-4"><span class="me-2">:</span> {{ dataMahasiswa?.nim || '-' }}</div>
                    <div class="col-lg-2">Jurusan</div>
                    <div class="col-lg-4"><span class="me-2">:</span> {{ dataMahasiswa?.Prodi?.nama_program_studi || '-' }}</div>
                </div>
                <hr style="border: 1px solid #000" />
                <div class="row">
                    <div class="col-lg-2">Nama</div>
                    <div class="col-lg-4"><span class="me-2">:</span> {{ dataMahasiswa?.nama_mahasiswa || '-' }}</div>
                    <div class="col-lg-2">Jenis Kelamin</div>
                    <div class="col-lg-4"><span class="me-2">:</span> {{ dataMahasiswa?.jenis_kelamin || '-' }}</div>
                </div>
                <hr style="border: 1px solid #000" />
                <div class="row">
                    <div class="col-lg-2">Status Mahasiswa</div>
                    <div class="col-lg-4"><span class="me-2">:</span>{{ dataMahasiswa?.nama_status_mahasiswa || '-' }}</div>
                    <div class="col-lg-2">Agama</div>
                    <div class="col-lg-4"><span class="me-2">:</span> {{ dataMahasiswa?.Agama?.nama_agama || '-' }}</div>
                </div>
            </div>
            <div style="overflow-x: auto;">
                <table class="table table-bordered text-center">
                    <thead class="table-dark align-middle">
                        <tr>
                            <th  rowspan="2">No</th>
                            <th  rowspan="2">Kode Mata Kuliah</th>
                            <th  rowspan="2">Nama Mata Kuliah</th>
                            <th  rowspan="2">SKS</th>
                            <th  rowspan="2">Kelas</th>              
                            <th  colspan="3">Jadwal Perkuliahan</th>              
                        </tr>
                        <tr>
                            <th>Ruang</th>
                            <th>Hari</th>
                            <th>Waktu</th>  
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>325325</td>
                            <td>Kapita Selekta</td>
                            <td>2</td>
                            <td>4</td>
                            <td>G8.98</td>
                            <td>Selasa</td>
                            <td>09.10-10.10</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>325325</td>
                            <td>Kapita Selekta</td>
                            <td>2</td>
                            <td>4</td>
                            <td>G8.98</td>
                            <td>Selasa</td>
                            <td>09.10-10.10</td>
                        </tr>
                        <tr>
                            <td  class="text-center" colspan="7">Total SKS</td>
                            <td>0</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>