<script setup >
import axios from 'axios';
import { FilterMatchMode } from 'primevue/api';
import Swal from 'sweetalert2';
import { onBeforeMount, ref } from 'vue';
import { API_URL } from '../../../config/config';
import { del, get } from '../../../utiils/request';
import { getToken } from '../../../utiils/local_storage';

const viewKRS = ref([]);
const selectedKHS = ref([]);
const dataMahasiswa = ref([])
const dataDosenWali =  ref([])
const message = ref('');

const getKRS = async () => {
    Swal.fire({
        title: 'Loading...',
        html: 'Sedang Memuat Data',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
    const response = await get('kelas-kuliah/get-kelas-kuliah-available');
    const krs = response.data.data;
    viewKRS.value = krs;
    // console.log(response.data.data);
    Swal.close();
};
const getMahasiswa = async () => {
   
    const response = await get('mahasiswa/get-mahasiswa-active');
    const krs = response.data.data;
    dataMahasiswa.value = krs;
    dataDosenWali.value = response.data.dosenWali;
    console.log(response.data.data);
    Swal.close();
};

const createKrs = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        // Periksa apakah ada data KHS yang dipilih
        if (selectedKHS.value.length === 0) {
            Swal.fire('PERINGATAN!', 'Tidak ada data KRS mahasiswa yang dipilih.', 'warning');
            return; // Hentikan eksekusi fungsi jika tidak ada data yang dipilih
        }

        // Kumpulkan id_kelas_kuliah dari elemen yang dipilih
        const kelasKuliahs = selectedKHS.value.map((id) => ({
            id_kelas_kuliah: id
        }));

        const token = getToken();
        const response = await axios.post(
            `${API_URL}/krs-mahasiswa/create-krs-mahasiswa-active`,
            {
                kelas_kuliahs: kelasKuliahs
            },
            {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json' // Tambahkan header Content-Type
                }
            }
        );

        Swal.close();
        Swal.fire('BERHASIL!', 'Berhasil Menambahkan KRS.', 'success').then(() => {
            window.location.href = '/perkuliahan-krs-mahasiswa';
        });
        console.log('Status berhasil diperbarui:', response.data);
    } catch (error) {
        console.error('Gagal memperbarui status:', error);
        Swal.fire('GAGAL!', 'Gagal Menambahkan KRS.', 'error');
    }
};

onBeforeMount(() => {
    getKRS();
    getMahasiswa()
});
</script>

<template>
    <div class="card">
        <div class="card-body">
            <h5><i class="pi pi-user me-2"></i>KARTU RENCANA STUDI (KRS)</h5>
            <hr />

            <div class="row mt-3">
                <div class="col-lg-12">
                    <div class="alert alert-danger text-center" role="alert">Tidak bisa melakukan KRS. Status mahasiswa pada periode ini BELUM DI-SET. Silahkan menghubungi bagian akademik terkait.</div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-lg-12">
                    <div class="alert alert-warning text-center" role="alert">IPS (Semester Lalu) Anda belum dihitung, hubungi admin kampus Anda untuk meminta menghitung IPS Anda</div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-lg-12 d-flex justify-content-end">
                    <div class="flex justify-content-end gap-2">
                        <button @click="createKrs" type="submit" class="btn btn-primary me-2"><i class="pi pi-check me-2"></i> Simpan</button>
                    </div>
                </div>
            </div>
            <br />
            <div class="card" style="border-radius: none !important">
                <div class="row">
                    <div class="col-lg-2">NIM</div>
                    <div class="col-lg-4"><span class="me-2">:</span> {{dataMahasiswa?.nim }}</div>
                    <div class="col-lg-2">Jurusan</div>
                    <div class="col-lg-4"><span class="me-2">:</span>{{dataMahasiswa?.Prodi?.nama_program_studi}}</div>
                </div>
                <hr style="border: 1px solid #000" />
                <div class="row">
                    <div class="col-lg-2">Nama</div>
                    <div class="col-lg-4"><span class="me-2">:</span> {{dataMahasiswa?.nama_mahasiswa}}</div>
                    <div class="col-lg-2">Jenis Kelamin</div>
                    <div class="col-lg-4"><span class="me-2">:</span> {{dataMahasiswa?.jenis_kelamin}}</div>
                </div>
                <hr style="border: 1px solid #000" />
                <div class="row">
                    <div class="col-lg-2">Status Mahasiswa</div>
                    <div class="col-lg-4"><span class="me-2">:</span> {{dataMahasiswa?.nama_status_mahasiswa || 'Belum diSet'}}</div>
                    <div class="col-lg-2">IPS Semester Lalu</div>
                    <div class="col-lg-4"><span class="me-2">:</span> {{dataMahasiswa?.ipk || '-'}}</div>
                </div>
                <hr style="border: 1px solid #000" />
                <div class="row">
                    <div class="col-lg-2">Dosen Wali</div>
                    <div class="col-lg-4"><span class="me-2">:</span> {{dataDosenWali?.Dosen?.nama_dosen || 'Belum diSet'}}</div>
                    <!-- <div class="col-lg-2">IPS Semester Lalu</div>
                    <div class="col-lg-4"> <span class="me-2">:</span> -</div> -->
                </div>
                <hr style="border: 1px solid #000" />
            </div>
            <table class="table">
                <thead class="table-dark">
                    <tr>
                        <th>Aksi</th>
                        <th>Nama Mata Kuliah</th>
                        <th>Kelas</th>
                        <th>Dosen Pengajar</th>
                        <th>Ruang</th>
                        <th>Hari</th>
                        <th>Waktu Mulai</th>
                        <th>Waktu Selesai</th>
                        <th>SKS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(krsMahasiswa, index) in viewKRS" :key="index">
                        <td>
                            <div class="actions gap-2">
                                <input type="checkbox" id="actionCheckbox" name="actionCheckbox" class="form-check-input" :value="krsMahasiswa.id_kelas_kuliah" v-model="selectedKHS" />
                            </div>
                        </td>
                        <td>{{ krsMahasiswa.MataKuliah.nama_mata_kuliah }}</td>
                        <td>{{ krsMahasiswa.nama_kelas_kuliah }}</td>
                        <td>{{ krsMahasiswa.Dosen.nama_dosen }}</td>
                        <td>{{ krsMahasiswa?.DetailKelasKuliahs[0]?.RuangPerkuliahan?.nama_ruang_perkuliahan }}</td>
                        <td>{{ krsMahasiswa.DetailKelasKuliahs[0].hari }}</td>
                        <td>{{ krsMahasiswa.DetailKelasKuliahs[0].jam_mulai }}</td>
                        <td>{{ krsMahasiswa.DetailKelasKuliahs[0].jam_selesai }}</td>
                        <td>{{ krsMahasiswa.sks }}</td>
                    </tr>
                    <tr>
                        <td class="text-center" colspan="8">Total SKS</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td class="text-center" colspan="8">Batas SKS</td>
                        <td>24</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>