<script setup>
import { onBeforeMount, ref } from 'vue';
import { get } from '../../../utiils/request';

const periodes = ref([]);
const selectedPeriode = ref('');

const fetchPeriode = async () => {
    try {
        const response = await get('periode');
        periodes.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};

onBeforeMount(() => {
    fetchPeriode();
});
</script>
<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-md-6">
                    <h5><i class="pi pi-user me-2"></i>KARTU RENCANA STUDI</h5>
                </div>
                <div class="col-md-6 text-end">
                    <router-link to="/validasi-krs-mahasiswa/detailKRS/edit" class="btn btn-secondary"><i class="pi pi-plus me-2"></i>Tambah</router-link>
                </div>
            </div>

            <hr />
            <div class="row mt-3">
                <div class="col-lg-10 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Periode</label>
                        <select v-model="selectedPeriode" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Periode</option>
                            <option v-for="periode in periodes" :key="periode.id_periode" :value="periode.id_periode">{{ periode.periode_pelaporan }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px">
                    <button class="btn btn-primary btn-block" style="width: 100%">Tampilkan</button>
                </div>
            </div>
            <div class="card" style="border-radius: none !important">
                <div class="row">
                    <div class="col-lg-2">NIM</div>
                    <div class="col-lg-4"><span class="me-2">:</span> 362055401012</div>
                    <div class="col-lg-2">Jurusan</div>
                    <div class="col-lg-4"><span class="me-2">:</span> S1 Teknik Informatika</div>
                </div>
                <hr />
                <div class="row">
                    <div class="col-lg-2">Nama</div>
                    <div class="col-lg-4"><span class="me-2">:</span> Aida Andinar Maulidiana</div>
                    <div class="col-lg-2">Jenis Kelamin</div>
                    <div class="col-lg-4"><span class="me-2">:</span> Perempuan</div>
                </div>
                <hr />
                <div class="row">
                    <div class="col-lg-2">Status Mahasiswa</div>
                    <div class="col-lg-4"><span class="me-2">:</span> Aktif</div>
                    <div class="col-lg-2">IPS Semester Lalu</div>
                    <div class="col-lg-4"><span class="me-2">:</span> 3.88</div>
                </div>
                <hr />
                <div class="row">
                    <div class="col-lg-2">Dosen Wali</div>
                    <div class="col-lg-4"><span class="me-2">:</span> Susui Susilowati</div>
                </div>
            </div>
            <div style="overflow-x: auto">
                <table class="table table-bordered text-center">
                    <thead class="table-dark align-middle">
                        <tr>
                            <th>No</th>
                            <th>Nama Mata Kuliah</th>
                            <th>Kelas</th>
                            <th>Dosen Pengajar</th>
                            <th>Ruang</th>
                            <th>Hari</th>
                            <th>Waktu Mulai</th>
                            <th>Waktu Selesai</th>
                            <th>SKS</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Pengembangan Aplikasi</td>
                            <td>22A</td>
                            <td>Suroto</td>
                            <td>G1.01</td>
                            <td>Senin</td>
                            <td>09.10</td>
                            <td>10.10</td>
                            <td>2</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Pengembangan Aplikasi</td>
                            <td>22A</td>
                            <td>Suroto</td>
                            <td>G1.01</td>
                            <td>Senin</td>
                            <td>09.10</td>
                            <td>10.10</td>
                            <td>2</td>
                            <td>-</td>
                        </tr>

                        <tr>
                            <td colspan="8">Total SKS</td>
                            <td colspan="1">4</td>
                            <td colspan="1"></td>
                        </tr>
                        <tr>
                            <td colspan="8">Batas SKS</td>
                            <td colspan="1">24</td>
                            <td colspan="1"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- <table class="table">
                <thead class="table-dark">
                    <tr>
                        <th>No</th>
                        <th>Kode Mata Kuliah</th>
                        <th>Nama Mata Kuliah</th>
                        <th>SKS</th>
                        <th>Nilai Angka</th>
                        <th>Nilai Huruf</th>
                        <th>Nilai Index</th>                
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>325325</td>
                        <td>Kapita Selekta</td>
                        <td>2</td>
                        <td>4</td>
                        <td>A</td>
                        <td>4.0</td>  
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>325325</td>
                        <td>Kapita Selekta</td>
                        <td>2</td>
                        <td>4</td>
                        <td>A</td>
                        <td>4.0</td>
                    </tr>
                    <tr>
                        <td  class="text-center" colspan="3">Total SKS</td>
                        <td  colspan="1">0</td>
                        <td  class="text-center" colspan="3">0</td>
                    </tr>
                    <tr >
                        <td class="text-center" colspan="6">IPS (Index Prestasi Semester) </td>
                        <td>00.00</td>
                    </tr>
                    <tr >
                        <td class="text-center" colspan="6">IPK (Index Prestasi Kumulatif) </td>
                        <td>00.00</td>
                    </tr>
                </tbody>
            </table> -->
        </div>
    </div>
</template>