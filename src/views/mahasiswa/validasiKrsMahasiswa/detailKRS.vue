<script setup>
import Swal from 'sweetalert2';
import { onBeforeMount, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { del, get } from '../../../utiils/request';

const route = useRoute();
const selectedPeriode = ref('');
const message = ref('');
const details = ref([]);

const detailKrs = async (id_registrasi_mahasiswa) => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',

            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await get(`krs-mahasiswa/mahasiswa/${id_registrasi_mahasiswa}/get`);
        const krs = response.data.data;
        // Memastikan pengajar memiliki nilai sebelum diassign
        if (krs !== null && krs.length !== 0) {
            details.value = krs;
        } else {
            // Jika pengajar kosong, assign nilai default atau kosong
            details.value = []; // atau null, atau nilai default lainnya
        }

        console.log(krs);
        Swal.close();
    } catch (error) {
        console.error('Gagal mengambil data:', error);
        // Berikan pesan error kepada pengguna jika diperlukan
        // Misalnya: Notify.error('Gagal mengambil data mata kuliah.');
    }
};

const deleteItem = async (id_krs) => {
    try {
        const response = await del(`krs-mahasiswa/${id_krs}/delete`);
        if (response.status === 200) {
            message.value = 'Data berhasil dihapus!';
        } else {
            message.value = 'Terjadi kesalahan: ' + response.statusText;
        }
    } catch (error) {
        message.value = 'Terjadi kesalahan: ' + error.message;
    }
};

const confirmDelete = (id_krs) => {
    Swal.fire({
        title: 'Apa Kamu Yakin?',
        text: 'Data ini akan dihapus',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, saya yakin!',
        cancelButtonText: 'Batal',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            deleteItem(id_krs);
            Swal.fire('BERHASIL!', 'Data berhasil dihapus.', 'success');
            details.value = details.value.filter((data) => data.id_krs !== id_krs);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('BATAL', 'Data Anda Tidak Jadi Dihapus', 'error');
        }
    });
};

onMounted(() => {
    const id_registrasi_mahasiswa = route.params.id_registrasi_mahasiswa;
    detailKrs(id_registrasi_mahasiswa);
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
                    <!-- <router-link to="/validasi-krs-mahasiswa/detailKRS/edit" class="btn btn-secondary"><i class="pi pi-plus me-2"></i>Tambah</router-link> -->
                </div>
            </div>

            <hr />
            <!-- <div class="row mt-3">
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
            </div> -->
            <div class="card" style="border-radius: none !important">
                <div class="row">
                    <div class="col-lg-2">NIM</div>
                    <div class="col-lg-4"><span class="me-2">:</span> {{ details[0]?.Mahasiswa?.nim || '' }}</div>
                    <div class="col-lg-2">Jurusan</div>
                    <div class="col-lg-4"><span class="me-2">:</span> {{ details[0]?.Prodi?.nama_program_studi ? details[0].Prodi.nama_program_studi : 'Data tidak tersedia' }}</div>
                </div>
                <hr />
                <div class="row">
                    <div class="col-lg-2">Nama</div>
                    <div class="col-lg-4"><span class="me-2">:</span> {{ details[0]?.Mahasiswa?.nama_mahasiswa || '' }}</div>
                    <div class="col-lg-2">Jenis Kelamin</div>
                    <div class="col-lg-4"><span class="me-2">:</span> {{ details[0]?.Mahasiswa?.jenis_kelamin || '' }}</div>
                </div>
                <hr />
                <div class="row">
                    <div class="col-lg-2">Status Mahasiswa</div>
                    <div class="col-lg-4"><span class="me-2">:</span> {{ details[0]?.Mahasiswa?.nama_status_mahasiswa || '' }}</div>
                    <div class="col-lg-2">IPS Semester Lalu</div>
                    <div class="col-lg-4"><span class="me-2">:</span> {{ details[0]?.Mahasiswa?.ipk || '-' }}</div>
                    <!-- Jika tidak ada data IPS Semester Lalu, sesuaikan dengan data yang ada -->
                </div>
                <hr />
                <!-- <div class="row">
                    <div class="col-lg-2">Dosen Wali</div>
                    <div class="col-lg-4"><span class="me-2">:</span> Susui Susilowati</div>
                    Ganti dengan data dosen wali yang sesuai
                </div> -->
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
                        <tr v-for="(krs, index) in details" :key="index">
                            <td>{{ index + 1 }}</td>
                            <td>{{ krs?.MataKuliah.nama_mata_kuliah || '' }}</td>
                            <td>{{ krs?.KelasKuliah?.nama_kelas_kuliah || '-' }}</td>
                            <td>{{ krs?.KelasKuliah?.Dosen?.nama_dosen || '-' }}</td>
                            <td>{{ krs?.KelasKuliah?.DetailKelasKuliahs?.RuangPerkuliahan?.nama_ruang_perkuliahan || '-' }}</td>
                            <td>{{ krs?.KelasKuliah?.DetailKelasKuliahs?.hari || '-' }}</td>
                            <td>{{ krs?.KelasKuliah?.DetailKelasKuliahs?.jam_mulai || '-' }}</td>
                            <td>{{ krs?.KelasKuliah?.DetailKelasKuliahs?.jam_selesai || '-' }}</td>
                            <td>{{ krs?.KelasKuliah?.sks }}</td>
                            <td>
                                <button @click="confirmDelete(krs.id_krs)" class="btn btn-outline-danger" title="Hapus Krs">
                                    <i class="pi pi-trash"></i>
                                </button>
                            </td>
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