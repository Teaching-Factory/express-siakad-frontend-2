<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { get } from '../../../utiils/request';
import vSelect from 'vue-select';

// Vue.component('v-select', vSelect);
const matkul = ref([]);
const ruangKuliah = ref([]);
const route = useRoute();
const selectedRuang = ref('');
const selectedDosen = ref('');
const dosens = ref([]);

const fetchMataKuliah = async (id_matkul) => {
    try {
        const response = await get(`mata-kuliah/${id_matkul}/get`);
        matkul.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data:', error);
        // Berikan pesan error kepada pengguna jika diperlukan
        // Misalnya: Notify.error('Gagal mengambil data mata kuliah.');
    }
};

const fetchRuangPerkuliahan = async () => {
    try {
        const response = await get('ruang-perkuliahan');
        ruangKuliah.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data:', error);
    }
};
const fetchDosen = async () => {
    try {
        const response = await get('dosen');
        // Format respons dari API ke format yang sesuai dengan v-select
        dosens.value = response.data.data.map((dosen) => ({
            id: dosen.id_dosen, // Properti 'id' atau 'value' sesuai dengan library v-select
            nama_dosen: dosen.nama_dosen // Properti 'label' untuk menampilkan nama dosen
        }));
    } catch (error) {
        console.error('Gagal mengambil data dosen:', error);
    }
};

onMounted(() => {
    const id_matkul = route.params.id_matkul;
    fetchMataKuliah(id_matkul);
    fetchRuangPerkuliahan();
    fetchDosen();
});
</script>

<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-lg-6">
                    <h5><i class="pi pi-user me-2"></i>DETAIL KELAS DAN JADWAL MINGGUAN</h5>
                </div>
                <div class="col-lg-6 text-end">
                    <button class="btn btn-secondary"><i class="pi pi-check me-2"></i> Simpan</button>
                </div>
            </div>

            <hr />

            <div class="card" style="border-radius: none !important">
                <div class="row">
                    <div class="col-lg-2">Program Studi</div>
                    <div class="col-lg-4"><span class="me-2">:</span> {{ matkul?.Prodi?.nama_program_studi || '-' }}</div>
                </div>
                <hr />
                <div class="row">
                    <div class="col-lg-2">Semester</div>
                    <div class="col-lg-4"><span class="me-2">:</span> 2020/2021 Ganjil</div>
                </div>
                <hr />
                <div class="row">
                    <div class="col-lg-2">Kurikulum</div>
                    <div class="col-lg-4"><span class="me-2">:</span> S1 Teknik Informatika</div>
                </div>
                <hr />
                <div class="row">
                    <div class="col-lg-2">Mata Kuliah</div>
                    <div class="col-lg-4"><span class="me-2"> :</span>{{ matkul.nama_mata_kuliah }} ({{ matkul.sks_mata_kuliah }})</div>
                </div>
                <hr style="margin: 0" />
                <div class="row">
                    <div class="d-flex col-12 justify-content-center">
                        <p><strong>Jadwal Mingguan</strong></p>
                    </div>
                </div>
                <hr style="margin-top: -5px" />
                <div class="mb-3 mt-4 row">
                    <label for="inputPassword" class="col-sm-3 col-form-label">Kelas</label>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" id="inputPassword" />
                    </div>
                    <label for="inputPassword" class="col-sm-3 col-form-label">Kapasitas Peserta Kelas</label>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" id="inputPassword" />
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="inputPassword" class="col-sm-3 col-form-label">Hari</label>
                    <div class="col-sm-3">
                        <select name="" class="form-select" id="">
                            <option value="">Senin</option>
                            <option value="">Selasa</option>
                            <option value="">Rabu</option>
                            <option value="">Kamis</option>
                            <option value="">Jumat</option>
                            <option value="">Sabtu</option>
                        </select>
                    </div>
                    <label for="inputPassword" class="col-sm-3 col-form-label">Ruang</label>
                    <div class="col-sm-3">
                        <select v-model="selectedRuang" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Ruang</option>
                            <option v-for="ruang in ruangKuliah" :key="ruang.id" :value="ruang.id">{{ ruang.nama_ruang_perkuliahan }}</option>
                        </select>
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="inputPassword" class="col-sm-3 col-form-label">Jam Mulai</label>
                    <div class="col-sm-3">
                        <input type="time" class="form-control" id="inputPassword" />
                    </div>
                    <label for="inputPassword" class="col-sm-3 col-form-label">Jam Selesai</label>
                    <div class="col-sm-3">
                        <input type="time" class="form-control" id="inputPassword" />
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="inputPassword" class="col-sm-3 col-form-label">Lingkup</label>
                    <div class="col-sm-3">
                        <select name="" class="form-select" id="">
                            <option value="1">Internal</option>
                            <option value="2">Eksternal</option>
                            <option value="3">Campuran</option>
                        </select>
                    </div>
                    <label for="inputPassword" class="col-sm-3 col-form-label">Mode Kuliah</label>
                    <div class="col-sm-3">
                        <select name="" class="form-select" id="">
                            <option value="O">Online</option>
                            <option value="F">Offline</option>
                            <option value="M">Campuran</option>
                        </select>
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="inputPassword" class="col-sm-3 col-form-label">Tanggal Mulai Efektif</label>
                    <div class="col-sm-3">
                        <input type="date" class="form-control" id="inputPassword" />
                    </div>
                    <label for="inputPassword" class="col-sm-3 col-form-label">Tanggal Akhir Efektif</label>
                    <div class="col-sm-3">
                        <input type="date" class="form-control" id="inputPassword" />
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="inputPassword" class="col-sm-3 col-form-label">Dosen</label>
                    <div class="col-sm-9">
                        <v-select v-model="selectedDosen" :options="dosens" label="nama_dosen" placeholder="Pilih dosen"></v-select>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>