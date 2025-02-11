<script setup>
import { ref, onBeforeMount } from 'vue';
import { get } from '../../../utiils/request';
import { FilterMatchMode } from 'primevue/api';
import Swal from 'sweetalert2';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nama_mahasiswa: { value: null, matchMode: FilterMatchMode.EQUALS },
    nim: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_program_studi: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_semester: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_status_mahasiswa: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const aktivitasKuliahMahasiswas = ref([]);
const selectedMhs = ref();
const selectedAngkatan = ref('');
const selectedProdi = ref('');
const prodis = ref([]);
const angkatans = ref([]);
const semesterAktif = ref([]);
const first = ref(0);

const adminProdi = ref(null);
const getAdminProdi = async () => {
    try {
        const response = await get('user/checking-admin-prodi-user');
        adminProdi.value = response.data.data; // Menyimpan data respons API

        // Jika data yang diterima adalah satu objek, ubah menjadi array
        prodis.value = Array.isArray(adminProdi.value) ? adminProdi.value : [adminProdi.value];

        selectedProdi.value = adminProdi.value?.id_prodi || null; // Memilih program studi secara default
        console.log('admin', response.data); // Cek hasil respons
    } catch (error) {
        console.error('Gagal mengambil data angkatan mahasiswa:', error);
        prodis.value = []; // Jika gagal, pastikan prodis kosong
    }
};

const fetchSemesterAktif = async () => {
    const response = await get('semester-aktif');
    semesterAktif.value = response.data.data;
};

const aktivitasKuliahMahasiswa = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await get('aktivitas-kuliah-mahasiswa');
        aktivitasKuliahMahasiswas.value = response.data.data;

        Swal.close();
    } catch (error) {
        console.error('Gagal mengambil data Aktivitas Mahawiswa:', error);
        aktivitasKuliahMahasiswa.value = [];
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
const fetchAngkatan = async () => {
    try {
        const response = await get('angkatan');
        angkatans.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};

const selectedFilter = async () => {
    Swal.fire({
        title: 'Loading...',
        html: 'Sedang Memuat Data',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
    await Promise.all([fetchProdi(), fetchAngkatan(), getAdminProdi()]);
    Swal.close();
};

const onPageChange = (event) => {
    first.value = event.first;
};

onBeforeMount(() => {
    aktivitasKuliahMahasiswa();
    selectedFilter();
    fetchSemesterAktif();
});
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>SET AKTIF AKTIVITAS KULIAH MAHASISWA PERIODE {{semesterAktif[0]?.Semester?.nama_semester}}</h5>
            <div class="card" style="padding: 0rem 1rem 0rem 1rem">
                <div class="row">
                    <div class="col-12 col-md-6 col-lg-12">
                        <h6 class="text-dark">Keterangan :</h6>
                        <p class="lh-1 text-small">
                            <ol>
                                <li>AKM dapat diset Aktif ketika sudah pernah ditambahkan / set status Non-aktif</li>
                                <li>Tidak Ada Jenis Tagihan yang menjadi syarat KRS, bila ingin meng-set tagihan yang menjadi flag KRS hubungi admin keuangan</li>
                                <li>Data mahasiswa di bawah adalah mahasiswa yang belum terdaftar sebagai mahasiswa Lulus / Drop Out</li>
                            </ol>
                        </p>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="row">
                        <div class="col-lg-5 col-md-6 col-sm-6">
                            <div v-if="adminProdi && prodis.length > 0" class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Pilih Program Studi</label>
                                <select v-model="selectedProdi" class="form-select" aria-label="Default select example" :disabled="true">
                                    <option value="" selected disabled hidden>Pilih Program Studi</option>
                                    <option v-for="prodi in prodis" :key="prodi.id_prodi" :value="prodi.id_prodi">
                                        {{ adminProdi.Prodi.nama_program_studi }}
                                    </option>
                                </select>
                        </div>

                    <!-- Dropdown untuk prodis jika adminProdi kosong -->
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
                                <label for="exampleFormControlInput1" class="form-label">Angkatan</label>
                                <select v-model="selectedAngkatan" class="form-select" aria-label="Default select example">
                                    <option value="" selected disabled hidden>Pilih Angkatan</option>
                                    <option v-for="angkatan in angkatans" :key="angkatan.id" :value="angkatan.id">{{ angkatan.tahun }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px;">
                            <button class="btn btn-primary btn-block" style="width: 100%;">Filter</button>
                        </div>
                    </div>
                    <hr/>
                    <DataTable v-model:filters="filters" :globalFilterFields="['Mahasiswa.nama_mahasiswa', 'Mahasiswa.nim', 'Prodi.nama_program_studi', 'Semester.nama_semester', 'StatusMahasiswa.nama_status_mahasiswa ']"
                :value="aktivitasKuliahMahasiswas"
                v-model:selection="selectedMhs"
                :paginator="true"
                :rows="10"
                dataKey="id_aktivitas_kuliah_mahasiswa"
                :rowHover="true"
                showGridlines
                :first="first" @page="onPageChange"
            >
                <template #header>
                    <div class="row">
                        <div class="col-lg-6 d-flex justify-content-start">
                            <IconField iconPosition="left">
                                <InputIcon class="pi pi-search" />
                                <InputText placeholder="Cari disini" v-model="filters['global'].value" style="width: 100%" />
                            </IconField>
                        </div>
                        <div class="col-lg-6 d-flex justify-content-end">
                            <div class="flex justify-content-end gap-2">
                                <!-- <button class="btn btn-outline-primary"> <i class="pi pi-print me-2"></i>Export</button>
                                <button class="btn btn-success"> <i class="pi pi-plus me-2"></i> Tambah</button> -->
                                <!-- <button class="btn btn-danger"> <i class="pi pi-refresh me-2"></i> Sinkronkan</button> -->
                                <!-- <button class="btn btn-secondary"> <i class="pi pi-check me-2"></i> Set Aktif</button> -->
                            </div>
                        </div>
                    </div>
                </template>

                <template #empty>
                    <div class="text-center">Tidak ada data.</div>
                </template>
                <!-- <template #loading>
                    Loading customers data. Please wait.
                </template> -->
                <!-- <Column selectionMode="multiple" headerStyle="width: 3em"></Column> -->
                <Column field="no" header="No" style="min-width: 5rem">
                    <template #body="slotProps">
                        {{ first + slotProps.index + 1 }}
                    </template>
                </Column>
                <Column filterField="nim" header="NIM" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.Mahasiswa.nim }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_mahasiswa" header="Nama Mahasiswa" style="min-width: 14rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.Mahasiswa.nama_mahasiswa }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_program_studi" header="Program Studi" style="min-width: 15rem">
                    <template #body="{ data }">
                        {{ data.Prodi.nama_program_studi }}
                    </template>
                </Column>
                <Column filterField="nama_semester" header="Semester" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.Semester.nama_semester }}
                    </template>
                </Column>
                <Column filterField="nama_status_mahasiswa" header="Status AKM" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.StatusMahasiswa.nama_status_mahasiswa }}
                    </template>
                </Column>
            </DataTable>
            </div>
    </div>
</template>

<style scoped>
.card-theme {
    background-color: rgba(154, 160, 172, 0.5);
}
</style>
