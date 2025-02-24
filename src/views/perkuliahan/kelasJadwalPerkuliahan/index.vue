<script setup>
import { ref, onBeforeMount, watch } from 'vue';
import Modal from '../../../components/Modal.vue';
import { del, get } from '../../../utiils/request';
import Swal from 'sweetalert2';

const customer1 = ref([]);
const showModal1 = ref(false);
const showModal2 = ref(false);
const prodis = ref([]);
const semesters = ref([]);
const kurikulums = ref([]);
const kurikulumProdi = ref([]);
const selectedProdi = ref('');
const selectedPeriode = ref('');
const selectedKurikulum = ref('');
const selectedSemester = ref('');
const kelasjadwal = ref([]);
const dosenpengajar = ref([]);
const selectedKelasId = ref(null);
const selectedPesertaId = ref(null);
const pesertakelas = ref([]);
const message = ref('');

const adminProdi = ref(null);
const getAdminProdi = async () => {
    try {
        const response = await get('user/checking-admin-prodi-user');
        adminProdi.value = response.data.data; // Menyimpan data respons API

        if (adminProdi.value) {
            // Jika user adalah admin prodi, hanya masukkan prodi mereka
            prodis.value = Array.isArray(adminProdi.value) ? adminProdi.value : [adminProdi.value];
            selectedProdi.value = adminProdi.value?.id_prodi || null;
        } else {
            // Jika user bukan admin prodi, ambil semua prodi
            await getProdi(); // Pastikan fungsi fetchProdi sudah ada
        }

        console.log('admin', response.data); // Cek hasil respons
    } catch (error) {
        console.error('Gagal mengambil data admin prodi:', error);
        prodis.value = []; // Pastikan prodi kosong jika terjadi error
    }
};

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
        const response = await get('kurikulum/');
        kurikulums.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};
const getKurikulum = async () => {
    try {
        const response = await get('semester');
        semesters.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};

const getKurikulumProdi = async () => {
    if (selectedProdi.value) {
        try {
            const response = await get(`kurikulum/prodi/${selectedProdi.value}/get`);
            kurikulumProdi.value = response.data.data;
        } catch (error) {
            console.error('Gagal mengambil data kelas:', error);
        }
    }
};

const selectedFilter = async () => {
    // loading1.value = true;
    Swal.fire({
        title: 'Loading...',
        html: 'Sedang Memuat Data',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
    await Promise.all([fetchProdi(), fetchSemester(), getAdminProdi(), getKurikulum(), getKurikulumProdi()]);
    Swal.close();
};

watch(selectedProdi, getKurikulumProdi);

const filterData = async () => {
    const prodiId = selectedProdi.value;
    const periodeID = selectedPeriode.value;
    const kurikulumID = selectedKurikulum.value;
    const semester = selectedSemester.value;

    if (!prodiId || !periodeID || !kurikulumID) {
        // console.error('Prodi atau Angkatan Mahasiswa belum dipilih');
        Swal.fire('GAGAL!', 'Data Kelas Kuliah tidak ditemukan.', 'warning').then(() => {});
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
        const response = await get(`detail-kelas-kuliah/filtering/${prodiId}/${periodeID}/${kurikulumID}/${semester}/get`);
        const filterKelasJadwal = response.data.data;

        console.log('response :', filterKelasJadwal);
        kelasjadwal.value = filterKelasJadwal;
        Swal.close();
    } catch (error) {
        Swal.fire('GAGAL!', 'Data Kelas Kuliah tidak ditemukan.', 'warning').then(() => {});
    }
};

const showDosenPengajar = async (id_kelas_kuliah) => {
    selectedKelasId.value = id_kelas_kuliah;

    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await get(`dosen-pengajar-kelas-kuliah/${selectedKelasId.value}/get`);
        const pengajar = response.data.data;

        // Memastikan pengajar memiliki nilai sebelum diassign
        if (pengajar !== null && pengajar.length !== 0) {
            dosenpengajar.value = pengajar;
        } else {
            // Jika pengajar kosong, assign nilai default atau kosong
            dosenpengajar.value = []; // atau null, atau nilai default lainnya
        }

        showModal2.value = true;
        Swal.close();
    } catch (error) {
        Swal.fire('GAGAL!', 'Data Dosen Pengajar tidak ditemukan.', 'warning').then(() => {});
    }
};

const showPesertaKelas = async (id_kelas_kuliah) => {
    selectedPesertaId.value = id_kelas_kuliah;

    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await get(`peserta-kelas-kuliah/${selectedPesertaId.value}/get-nilai-kelas`);
        const peserta = response.data.data;
        console.log('data-2', peserta[0].KelasKuliah.Prodi.nama_program_studi);
        // Memastikan pengajar memiliki nilai sebelum diassign
        if (peserta !== null && peserta.length !== 0) {
            pesertakelas.value = peserta;
        } else {
            // Jika pengajar kosong, assign nilai default atau kosong
            pesertakelas.value = []; // atau null, atau nilai default lainnya
        }
        showModal1.value = true;
        Swal.close();
    } catch (error) {
        Swal.fire('GAGAL!', 'Data Peserta Kelas tidak ditemukan.', 'warning').then(() => {});
    }
};

const deleteItem = async (id_kelas_kuliah) => {
    try {
        const response = await del(`kelas-kuliah/${id_kelas_kuliah}/delete`);
        if (response.status === 200) {
            message.value = 'Data berhasil dihapus!';
            // Menghapus item dari array sistemKuliahs yang memiliki id yang sesuai
            // sistemKuliahs.value = sistemKuliahs.value.filter((data) => data.id !== id);
        } else {
            message.value = 'Terjadi kesalahan: ' + response.statusText;
        }
    } catch (error) {
        message.value = 'Terjadi kesalahan: ' + error.message;
    }
};

const confirmDelete = (id_kelas_kuliah) => {
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
            deleteItem(id_kelas_kuliah);
            Swal.fire('BERHASIL!', 'Data berhasil dihapus.', 'success');
            kelasjadwal.value = kelasjadwal.value.filter((data) => data.id_kelas_kuliah !== id_kelas_kuliah);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('BATAL', 'Data Anda Tidak Jadi Dihapus', 'error');
        }
    });
};

onBeforeMount(() => {
    selectedFilter();
});

function addDosen() {
    dosenpengajar.value.push({ nama: '', nilai: '', ipk: '', isEditing: true });
}

function editDosen(index) {
    dosenpengajar.value[index].isEditing = true;
}

function saveDosen(index) {
    dosenpengajar.value[index].isEditing = false;
}

function deleteDosen(index) {
    dosenpengajar.value.splice(index, 1);
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
                    <div v-if="adminProdi" class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Pilih Program Studi</label>
                        <select v-model="selectedProdi" class="form-select" aria-label="Default select example" disabled>
                            <option :value="adminProdi.id_prodi">
                                {{ adminProdi.Prodi?.nama_program_studi || 'Program Studi Tidak Ditemukan' }}
                            </option>
                        </select>
                    </div>

                    <!-- Jika user bukan admin prodi, tampilkan semua prodi -->
                    <div v-else class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Pilih Program Studi</label>
                        <select v-model="selectedProdi" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Program Studi</option>
                            <option v-for="prodi in prodis" :key="prodi.id_prodi" :value="prodi.id_prodi">
                                {{ prodi.nama_program_studi }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-5 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Periode</label>
                        <select v-model="selectedPeriode" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Periode</option>
                            <option v-for="semester in semesters" :key="semester.id_semester" :value="semester.id_semester">{{ semester.nama_semester }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-5 col-md-6 col-sm-6">
                    <!-- Dropdown untuk prodis jika adminProdi kosong -->
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Kurikulum</label>
                        <select v-model="selectedKurikulum" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Kurikulum</option>
                            <option v-for="kurikulum in kurikulumProdi" :key="kurikulum.id_kurikulum" :value="kurikulum.id_kurikulum">
                                {{ kurikulum.nama_kurikulum }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-5 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Semester</label>
                        <select v-model="selectedSemester" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Periode</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px;">
                    <button @click="filterData" class="btn btn-primary btn-block" style="width: 100%;">Tampilkan</button>
                </div>
                </div>
                <hr/>


            <table v-for="(kelas, index) in kelasjadwal" :key="index" class="table table-center table-hover mb-4">
                <thead class="table-primary align-middle">
                    <tr>
                        <th colspan="7">{{kelas.mataKuliah.nama_mata_kuliah}} [ {{kelas.mataKuliah.sks_mata_kuliah}} | {{kelas.mataKuliah.kode_mata_kuliah}}]</th>
                        <th class="text-end">
                            <!-- <button class="btn btn-secondary me-2"> 1 Kelas </button> -->
                            <router-link :to="`/kelas-jadwal-perkuliahan/create-kelas/${kelas.mataKuliah.id_matkul}/${selectedPeriode}`" class="btn btn-success" title="tambah kelas"><i class="pi pi-plus"></i></router-link>
                        </th>
                    </tr>
                </thead>
                <tbody class="align-middle">
                    <tr v-for="(detail, index) in kelas.details" :key="index">
                        <td>
                            <i class="pi pi-building">{{ detail.KelasKuliah.nama_kelas_kuliah }}</i>
                        </td>
                        <td>
                            <i class="pi pi-calendar">{{ detail.hari || '-' }}</i>
                        </td>
                        <td>
                            <i class="pi pi-time">{{ detail.jam_mulai || '00:00' }} - {{ detail.jam_selesai || '00:00' }}</i>
                        </td>
                        <td>
                            <i class="pi pi-map"> {{ detail.RuangPerkuliahan?.nama_ruang_perkuliahan || '-' }}</i>
                        </td>
                        <td>
                            <i class="pi pi-users">0/{{ detail.kapasitas || '0' }}</i>
                        </td>
                        <td>
                            <router-link class="btn me-2" :to="`/kelas-jadwal-perkuliahan/${detail?.id_detail_kelas_kuliah}/${detail?.id_kelas_kuliah}/dosen-pengajar`"  style="background-color: #E87E04; color: #fff;"> <i class="pi pi-users me-2"></i> Detail </router-link>
                            <span>{{detail.KelasKuliah?.Dosen?.nama_dosen || '-'}}</span>
                            
                            <!-- modal 2 -->
                        <!-- <Modal
                            v-if="showModal2"
                            :show="showModal2"
                            title="DOSEN PENGAJAR KELAS KULIAH"
                            @close="showModal2 = false"
                            >
                            <div class="card" style="border-radius: none !important">
                                   
                                        <div class="row">
                                        <div class="col-lg-2">Program Studi</div>
                                        <div class="col-lg-4"><span class="me-2">:</span> {{ dosenpengajar?.Prodi?.nama_program_studi || '-' }}</div>
                                        <div class="col-lg-2">Periode</div>
                                        <div class="col-lg-4"><span class="me-2">:</span> {{ dosenpengajar?.Semester?.nama_semester || '-' }}</div>
                                        </div>
                                        <hr>
                                        <div class="row">
                                        <div class="col-lg-2">Mata Kuliah</div>
                                        <div class="col-lg-4"><span class="me-2">:</span> {{ dosenpengajar.KelasKuliah?.MataKuliah?.nama_mata_kuliah || '-' }}</div>
                                        <div class="col-lg-2">Kelas</div>
                                        <div class="col-lg-4"><span class="me-2">:</span> {{ dosenpengajar.KelasKuliah?.nama_kelas_kuliah || '-' }}</div>
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
                                            
                                                <tr v-if="dosenpengajar">
                                                    <td v-if="!dosenpengajar.isEditing" class="text-center">{{ dosenpengajar.Dosen?.nama_dosen || "-" }}</td>
                                                    <td v-else><input type="text" class="form-control" v-model="dosenpengajar.Dosen.nama_dosen"></td>

                                                    <td v-if="!dosenpengajar.isEditing" class="text-center">{{ dosenpengajar?.rencana_minggu_pertemuan || "-"}}</td>
                                                    <td v-else><input type="text" class="form-control" v-model="dosenpengajar.rencana_minggu_pertemuan"></td>

                                                    <td v-if="!dosenpengajar.isEditing" class="text-center">{{ dosenpengajar.KelasKuliah?.sks || "-"}}</td>
                                                    <td v-else><input type="text" class="form-control" v-model="dosenpengajar.KelasKuliah.sks"></td>
                                                    
                                                    <td class="text-center">
                                                        <button class="btn btn-outline-secondary me-2" @click="saveDosen(index)" v-if="dosenpengajar.isEditing">
                                                            Save
                                                        </button>
                                                        <button class="btn btn-outline-warning me-2" @click="editDosen(index)" v-else>
                                                            <i class="pi pi-pencil"></i>
                                                        </button>
                                                        <button class="btn btn-outline-danger me-2" @click="deleteDosen(index)">
                                                            <i class="pi pi-trash"></i>
                                                        </button>
                                                        <button class="btn btn-primary me-2" v-if="!dosenpengajar.isEditing">
                                                            Set Ketua
                                                        </button>
                                                    </td>
                                                </tr>
    
                                            <tr v-else>
                                                <p>Data tidak ditemukan</p>
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
                        </Modal> -->

                        </td>
                        <td class="text-end">
                            <button  @click="showPesertaKelas(detail.KelasKuliah.id_kelas_kuliah)" class="btn btn-primary me-2"><i class="pi pi-users me-2"></i>Detail Peserta</button>
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
                                            <td>{{ pesertakelas[0].KelasKuliah?.Prodi?.nama_program_studi ||'-' }}</td>
                                            <td class="table-header">Periode</td>
                                            <td>{{pesertakelas[0].KelasKuliah.Semester.nama_semester}}</td>
                                        </tr>
                                        <tr>
                                            <td class="table-header">Matakuliah</td>
                                            <td>{{pesertakelas[0].KelasKuliah.MataKuliah.nama_mata_kuliah}} ({{pesertakelas[0].KelasKuliah.MataKuliah.sks_mata_kuliah}})</td>
                                            <td class="table-header">Kelas</td>
                                            <td>{{ pesertakelas[0].KelasKuliah.nama_kelas_kuliah }}</td>
                                        </tr>
                                        <!-- <tr>
                                            <td class="table-header">Jumlah Peserta</td>
                                            <td>1</td>
                                            <td class="table-header"></td>
                                            <td></td>
                                        </tr> -->
                                    </tbody>
                                </table>
                                <div style="overflow-x: auto;">
                                    <table class="table table-bordered text-center">
                                        <thead class="table-dark align-middle">
                                            <tr>
                                                <th rowspan="2">No</th>
                                                <th rowspan="2">NIM</th>
                                                <th rowspan="2">Nama Mahasiswa</th>
                                                <th rowspan="2">Angkatan</th>
                                                <th rowspan="2">Prodi</th>              
                                                <th colspan="3">Nilai</th>              
                                            </tr>
                                            <tr>
                                                <th>Angka</th>
                                                <th>Numerik</th>
                                                <th>Huruf</th>  
                                            </tr>
                                        </thead>
                                        <tbody >
                                            <tr v-for="(mahasiswaKelas, index) in pesertakelas" :key="index">
                                                <td>{{index + 1}}</td>
                                                <td>{{mahasiswaKelas?.Mahasiswa?.nim || '-'}}</td>
                                                <td>{{mahasiswaKelas?.Mahasiswa?.nama_mahasiswa}}</td>
                                                <td>{{mahasiswaKelas?.angkatan}}</td>
                                                <td>{{mahasiswaKelas?.KelasKuliah?.Prodi?.nama_program_studi || '-'}}</td>
                                                <td>{{mahasiswaKelas?.DetailNilaiPerkuliahanKelas?.nilai_angka || '0'}}</td>
                                                <td>{{mahasiswaKelas?.DetailNilaiPerkuliahanKelas?.nilai_indeks || '0'}}</td>
                                                <td>{{mahasiswaKelas?.DetailNilaiPerkuliahanKelas?.nilai_huruf || '-'}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    
                                </div>
                            </Modal>
                        </td>
                        <td class="text-end">
                            <router-link :to="`/kelas-jadwal-perkuliahan/${detail?.id_detail_kelas_kuliah}/${detail?.id_kelas_kuliah}/komponen-evaluasi`" class="btn  me-2 btn-primary" title="Komponen Evaluasi" > <i class="pi pi-box "></i> </router-link>
                            <router-link :to="`/kelas-jadwal-perkuliahan/update-kelas/${kelas.details[0].KelasKuliah.id_matkul}/${detail?.id_detail_kelas_kuliah}/${detail?.id_kelas_kuliah}`" class="btn  me-2 btn-warning" title="edit" > <i class="pi pi-pencil "></i> </router-link>
                            <button @click="confirmDelete(detail.KelasKuliah.id_kelas_kuliah)" class="btn  me-2 btn-danger" title="delete"> <i class="pi pi-trash "></i> </button>
                            <router-link :to="`/kelas-jadwal-perkuliahan/${detail?.id_detail_kelas_kuliah}/${detail?.id_kelas_kuliah}/create-peserta-kelas`" class="btn  me-2" style="background-color: #E87E04;" title="Tambah Peserta"><i class="pi pi-user-plus "></i> </router-link>
                            <!-- <button class="btn  me-2 btn-primary"> <i class="pi pi-print "></i> </button>
                            <button class="btn  me-2 btn-success"> <i class="pi pi-copy "></i> </button> -->
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
