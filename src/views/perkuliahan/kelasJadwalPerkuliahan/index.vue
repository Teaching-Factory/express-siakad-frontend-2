<script setup>
import { ref, onBeforeMount } from 'vue';
import Modal from '../../../components/Modal.vue';
import { get } from '../../../utiils/request';

const customer1 = ref([]);
const showModal1 = ref(false);
const showModal2 = ref(false);
const prodis = ref([]);
const kurikulums = ref([]);
const periodes = ref([]);
const semesters = ref([]);
const selectedProdi = ref('');
const selectedSemester = ref('');
const selectedKurikulum = ref('');
const selectedPeriode = ref('');

const fetchProdi = async () => {
    try {
        const response = await get('prodi');
        prodis.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};
const fetchSemester = async () => {
    try {
        const response = await get('semester');
        semesters.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};
const fetchKurikullum = async () => {
    try {
        const response = await get('kurikulum');
        kurikulums.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};
const fetchPeriode = async () => {
    try {
        const response = await get('periode');
        periodes.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};

const selectedFilter = async () => {
    // loading1.value = true;
    await Promise.all([fetchProdi(), fetchSemester(), fetchKurikullum(), fetchPeriode()]);
    // loading1.value = false;
};

onBeforeMount(() => {
    selectedFilter();
    customer1.value = [
        {
            pertemuan: '1',
            tanggal: '18/05/2024',
            waktu: '09.10 - 10.10',
            ruang: 'G4.08',
            dosen: 'Lukman Hakim',
            materi: 'Sitasi Ilmiah',
            jumlahmhs: '30',
            statuspresensi: 'Aktif',
            aksi: '-'
        },
        {
            pertemuan: '2',
            tanggal: '18/05/2024',
            waktu: '09.10 - 10.10',
            ruang: 'G4.08',
            dosen: 'Lukman Hakim',
            materi: 'Sitasi Ilmiah',
            jumlahmhs: '30',
            statuspresensi: 'Aktif',
            aksi: '-'
        }
        // Add more dummy data here
    ];
});

const dosens = ref([{ nama: 'SUDARMONO', nilai: '16', ipk: '2.00', isEditing: false }]);

function addDosen() {
    dosens.value.push({ nama: '', nilai: '', ipk: '', isEditing: true });
}

function editDosen(index) {
    dosens.value[index].isEditing = true;
}

function saveDosen(index) {
    dosens.value[index].isEditing = false;
}

function deleteDosen(index) {
    dosens.value.splice(index, 1);
}
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>KELAS DAN JADWAL PERKULIAHAN</h5>
            <div class="card" style="padding: 0rem 1rem 0rem 1rem">
                <div class="row">
                    <div class="col-12 col-md-6 col-lg-12">
                        <h6 class="text-dark">Keterangan :</h6>
                        <p class="lh-1 text-small">
                            <ol>
                                <li>Fitur ini di gunakan untuk menyimpan jadwal perkuliahan yang di buka, dosen pengajar, seta peserta kelas / KRS mahasiswa setiap periode</li>
                                <li>Sebelum memasukkan dosen mengajar, pastikan dosen tersebut sudah tercatat penugasannya pada tahun ajaran yang berlaku</li>
                                <li>Setting realisasi pertemuan dan dosen pengajar ada pada feeder</li>
                            </ol>
                        </p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-5 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Program Studi</label>
                        <select v-model="selectedProdi" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Program Studi</option>
                            <option v-for="prodi in prodis" :key="prodi.id_prodi" :value="prodi.id_prodi">{{ prodi.nama_program_studi }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-5 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Periode</label>
                        <select v-model="selectedPeriode" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Periode</option>
                            <option v-for="periode in periodes" :key="periode.id_periode" :value="periode.id_periode">{{ periode.periode_pelaporan }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-5 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Kurikulum</label>
                        <select v-model="selectedKurikulum" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Kurikulum</option>
                            <option v-for="kurikulum in kurikulums" :key="kurikulum.id_kurikulum" :value="kurikulum.id_kurikulum">{{ kurikulum.nama_kurikulum }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-5 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Semester</label>
                        <select v-model="selectedSemester" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Semester</option>
                            <option v-for="semester in semesters" :key="semester.id_semester" :value="semester.id_semester">{{ semester.nama_semester }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px;">
                    <button class="btn btn-primary btn-block" style="width: 100%;">Tampilkan</button>
                </div>
                </div>
                <hr/>
            <table class="table table-center table-hover mb-4">
                <thead class="table-primary align-middle">
                    <tr>
                        <th colspan="7">PEMROGRAMAN TERSTRUKTUR [ 2 SKS | TINF 110B]</th>
                        <th class="text-end">
                            <button class="btn btn-secondary me-2"> 1 Kelas </button>
                            <router-link to="/kelas-jadwal-perkuliahan/create-kelas" class="btn btn-success"><i class="pi pi-plus"></i></router-link>
                        </th>
                    </tr>
                </thead>
                <tbody class="align-middle">
                    <tr>
                        <td>
                            <i class="pi pi-building">A</i>
                        </td>
                        <td>
                            <i class="pi pi-calendar">Sabtu</i>
                        </td>
                        <td>
                            <i class="pi pi-time">07:00 - 08:00</i>
                        </td>
                        <td>
                            <i class="pi pi-map">Ruang A 102</i>
                        </td>
                        <td>
                            <i class="pi pi-users">1/40</i>
                        </td>
                        <td>
                            <button class="btn me-2" @click="showModal2=true"  style="background-color: #E87E04; color: #fff;"> <i class="pi pi-users me-2"></i> Detail </button>
                            <span>Suroto</span>
                            
                            <!-- modal 2 -->
                            <Modal
                            v-if="showModal2"
                            :show="showModal2"
                            title="DOSEN PENGAJAR KELAS KULIAH"
                            @close="showModal2 = false"
                            >
                            <div class="card" style="border-radius: none !important">
                                <div class="row">
                                    <div class="col-lg-2">Program Studi</div>
                                    <div class="col-lg-4"><span class="me-2">:</span> S1 Teknik Informatika</div>
                                    <div class="col-lg-2">Periode</div>
                                    <div class="col-lg-4"><span class="me-2">:</span> 2020/2021 Ganjil</div>
                                </div>
                                <hr>
                                <div class="row">
                                    <div class="col-lg-2">Mata Kuliah</div>
                                    <div class="col-lg-4"><span class="me-2">:</span> Pemrograman Terstruktur</div>
                                    <div class="col-lg-2">Kelas</div>
                                    <div class="col-lg-4"><span class="me-2">:</span> A</div>
                                </div>
                                <hr style="margin: 0;">

                                <div class="row mt-4">
                                    <table class="table">
                                        <thead class="table-dark">
                                            <tr>
                                                <th class="text-center">Nama Dosen Pengajar</th>
                                                <th class="text-center">Rencana Pertemuan</th>
                                                <th class="text-center">SKS</th>
                                                <th class="text-center">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(dosen, index) in dosens" :key="index">
                                                <td v-if="!dosen.isEditing" class="text-center">{{ dosen.nama }}</td>
                                                <td v-else><input type="text" class="form-control" v-model="dosen.nama"></td>

                                                <td v-if="!dosen.isEditing" class="text-center">{{ dosen.nilai }}</td>
                                                <td v-else><input type="text" class="form-control" v-model="dosen.pertemuan"></td>

                                                <td v-if="!dosen.isEditing" class="text-center">{{ dosen.ipk }}</td>
                                                <td v-else><input type="text" class="form-control" v-model="dosen.sks"></td>
                                                
                                                <td class="text-center">
                                                    <button class="btn btn-outline-secondary me-2" @click="saveDosen(index)" v-if="dosen.isEditing">
                                                        Save
                                                    </button>
                                                    <button class="btn btn-outline-warning me-2" @click="editDosen(index)" v-else>
                                                        <i class="pi pi-pencil"></i>
                                                    </button>
                                                    <button class="btn btn-outline-danger me-2" @click="deleteDosen(index)">
                                                        <i class="pi pi-trash"></i>
                                                    </button>
                                                    <button class="btn btn-primary me-2" v-if="!dosen.isEditing">
                                                        Set Ketua
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div class="row">
                                    <div class="col-lg-6">
                                        <button class="btn btn-secondary" @click="addDosen"><i class="pi pi-plus me-2"></i> Tambah Dosen
                                            Pengajar</button>
                                    </div>
                                </div>
                            </div>
                        </Modal>

                        </td>
                        <td class="text-end">
                            <button @click="showModal1=true" class="btn btn-primary me-2"><i class="pi pi-users me-2"></i>Detail Peserta</button>
                            <Modal
                            v-if="showModal1"
                            :show="showModal1"
                            title="PESERTA KELAS"
                            @close="showModal1 = false"
                            >
                            <table class="table table-bordered text-start">
                                <tbody>
                                    <tr>
                                        <td class="table-header">Program Studi</td>
                                        <td>S1 Teknik Informatika</td>
                                        <td class="table-header">Periode</td>
                                        <td>2023/2024 Ganjil</td>
                                    </tr>
                                    <tr>
                                        <td class="table-header">Matakuliah</td>
                                        <td>PEMROGRAMAN TERSTRUKTUR (2.00 sks)</td>
                                        <td class="table-header">Kelas</td>
                                        <td>A</td>
                                    </tr>
                                    <tr>
                                        <td class="table-header">Jumlah Peserta</td>
                                        <td>1</td>
                                        <td class="table-header"></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div style="overflow-x: auto;">
                                <table class="table table-bordered text-center">
                                    <thead class="table-dark align-middle">
                                        <tr>
                                            <th  rowspan="2">No</th>
                                            <th  rowspan="2">NIM</th>
                                            <th  rowspan="2">Nama Mahasiswa</th>
                                            <th  rowspan="2">Angkatan</th>
                                            <th  rowspan="2">Prodi</th>              
                                            <th  colspan="3">Nilai</th>              
                                        </tr>
                                        <tr>
                                            <th>Angka</th>
                                            <th>Numerik</th>
                                            <th>Huruf</th>  
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>325325</td>
                                            <td>Aida Andinar Maulidiana</td>
                                            <td>2020</td>
                                            <td>S1 Teknik Informatika</td>
                                            <td>85.0</td>
                                            <td>3.00</td>
                                            <td>B</td>
                                        </tr>
                                    </tbody>
                                </table>
                                
                            </div>
                        </Modal>
                        </td>
                        <td class="text-end">
                            <button class="btn  me-2 btn-warning"> <i class="pi pi-pencil "></i> </button>
                            <button class="btn  me-2 btn-danger"> <i class="pi pi-trash "></i> </button>
                            <router-link to="/kelas-jadwal-perkuliahan/create-pesertakelas" class="btn  me-2" style="background-color: #E87E04;"><i class="pi pi-user-plus "></i> </router-link>
                            <button class="btn  me-2 btn-primary"> <i class="pi pi-print "></i> </button>
                            <button class="btn  me-2 btn-success"> <i class="pi pi-copy "></i> </button>
                        </td>
                    </tr>
                </tbody>
            </table>
    </div>
</template>

<style scoped>
.card-theme {
    background-color: rgba(154, 160, 172, 0.5);
}
</style>
