<script setup>
import { ref, onBeforeMount, watch } from 'vue';
import { get, getData } from '../../../utiils/request';
import { FilterMatchMode } from 'primevue/api';
import Swal from 'sweetalert2';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nama_mahasiswa: { value: null, matchMode: FilterMatchMode.EQUALS },
    nim: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_status_mahasiswa: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_program_studi: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_periode_masuk: { value: null, matchMode: FilterMatchMode.EQUALS }
});
const first = ref(0);
const camabas = ref([]);
const semesters = ref([]);
const periodePendaftarans = ref([]); // Data untuk dropdown periode pendaftaran
const selectedSemester = ref(''); // Semester yang dipilih
const selectedPeriodePendaftaran = ref(''); // Periode pendaftaran yang dipilih
const selectedBerkas = ref(''); // Periode pendaftaran yang dipilih
const selectedTes = ref(''); // Periode pendaftaran yang dipilih

// Ambil data semester
const getSemester = async () => {
    try {
        const response = await get('semester');
        semesters.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data semester:', error);
    }
};

// Ambil data periode pendaftaran berdasarkan semester yang dipilih
const fetchClasses = async () => {
    console.log('fungsi class terpangil');
    if (selectedSemester.value) {
        console.log('fungsi class terpangil 2');

        try {
            const response = await get(`periode-pendaftaran/semester/${selectedSemester.value}/get`);
            periodePendaftarans.value = response.data.data; // Isi dropdown dengan data periode
            console.log(periodePendaftarans.value);
            console.log('fungsi class terpangil 3');
        } catch (error) {
            console.error('Gagal mengambil data periode pendaftaran:', error);
        }
    }
};
watch(selectedSemester, fetchClasses);

// Loading data setelah memilih semester
const selectedFilter = async () => {
    Swal.fire({
        title: 'Loading...',
        html: 'Sedang Memuat Data',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
    await Promise.all([getSemester(), fetchClasses()]);
    Swal.close();
};

const filterData = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const id_periode_pendaftaran = selectedPeriodePendaftaran.value;
        const status_berkas = selectedBerkas.value;
        const status_tes = selectedTes.value;

        // Menggunakan axios untuk GET request dengan query parameters
        const response = await getData(`camaba/get-camaba-by-filter?id_periode_pendaftaran=${id_periode_pendaftaran}&status_berkas=${status_berkas}&status_tes=${status_tes}`);

        const filterCamaba = response.data.data;
        camabas.value = filterCamaba;

        Swal.close();
        console.log('object :', filterCamaba);
    } catch (error) {
        console.error('Gagal mengambil data mahasiswa:', error);
        Swal.fire('Gagal', 'Data Mahasiswa tidak ditemukan.', 'warning').then(() => {});
    }
};

const onPageChange = (event) => {
    first.value = event.first;
};

onBeforeMount(() => {
    selectedFilter();
});

const formatTanggal = (tanggal) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Intl.DateTimeFormat('id-ID', options).format(new Date(tanggal));
};
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>DAFTAR PENDAFTAR</h5>
        <div class="card">
            <div class="row">
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="">
                        <label for="exampleFormControlInput1" class="form-label">Semester Pendaftaran</label>
                        <select v-model="selectedSemester" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Semester</option>
                            <option v-for="semester in semesters" :key="semester.id_semester" :value="semester.id_semester">{{ semester.nama_semester }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="">
                        <label for="exampleFormControlInput1" class="form-label">Periode Pendaftaran</label>
                        <select v-model="selectedPeriodePendaftaran" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Periode</option>
                            <option v-for="periodePendaftaran in periodePendaftarans" :key="periodePendaftaran.id" :value="periodePendaftaran.id">{{ periodePendaftaran.nama_periode_pendaftaran }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-6">
                    <div class="">
                        <label for="exampleFormControlInput1" class="form-label">Kelulusan Berkas</label>
                        <select v-model="selectedBerkas" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>All</option>
                            <option value="true">Lulus</option>
                            <option value="false">Tidak Lulus</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-6">
                    <div class="">
                        <label for="exampleFormControlInput1" class="form-label">Kelulusan Tes</label>
                        <select v-model="selectedTes" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>All</option>
                            <option value="true">Lulus</option>
                            <option value="false">Tidak Lulus</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px">
                    <button @click="filterData" class="btn btn-primary btn-block" style="width: 100%">Tampilkan</button>
                </div>
            </div>
        </div>

        <DataTable
            v-model:filters="filters"
            :globalFilterFields="['nama_mahasiswa', 'nim', 'nama_status_mahasiswa', 'Prodi.nama_program_studi', 'nama_periode_masuk']"
            :value="camabas"
            :paginator="true"
            :rows="10"
            dataKey="id_registrasi_mahasiswa"
            :rowHover="true"
            showGridlines
            :first="first"
            @page="onPageChange"
        >
            <template #header>
                <div class="flex justify-content-between flex-column sm:flex-row">
                    <IconField iconPosition="left">
                        <InputIcon class="pi pi-search" />
                        <InputText placeholder="Keyword Search" v-model="filters['global'].value" style="width: 100%" />
                    </IconField>
                </div>
            </template>

            <template #empty>
                <div class="text-center">Tidak ada data.</div>
            </template>

            <!-- <template #loading>Loading data. Please wait.</template> -->
            <Column header="No" headerStyle="width:3rem">
                <template #body="slotProps">
                    {{ first + slotProps.index + 1 }}
                </template>
            </Column>
            <Column filterField="nomor_daftar" header="Nomor Daftar" style="min-width: 12rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span>{{ data.nomor_daftar }}</span>
                    </div>
                </template>
            </Column>
            <Column filterField="nama_lengkap" header="Nama Pendaftar" style="min-width: 14rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span>{{ data.nama_lengkap }}</span>
                    </div>
                </template>
            </Column>
            <Column filterField="nama_semester" header="Semester Pendaftaran" style="min-width: 14rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span>{{ data.PeriodePendaftaran.Semester.nama_semester }}</span>
                    </div>
                </template>
            </Column>
            <Column filterField="nama_program_studi" header="Pilihan Prodi 1" style="min-width: 15rem">
                <template #body="{ data }">
                    {{ data.Prodi?.nama_program_studi || '-' }}
                </template>
            </Column>
            <Column filterField="tanggal_pendaftaran" header="Tanggal Pendaftaran" style="min-width: 15rem">
                <template #body="{ data }">
                    {{ formatTanggal(data.tanggal_pendaftaran) }}
                </template>
            </Column>
            <Column filterField="finalisasi" header="Finalisasi" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.finalisasi ? 'Sudah' : 'Belum' }}
                </template>
            </Column>
            <Column filterField="status_berkas" header="Kelulusan Berkas" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.status_berkas ? 'Lulus' : 'Tidak Lulus' }}
                </template>
            </Column>
            <Column filterField="status_tes" header="Kelulusan Tes" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.status_tes ? 'Lulus' : 'Tidak Lulus' }}
                </template>
            </Column>
            <Column filterField="hints" header="Hints" style="min-width: 8rem">
                <template #body="{ data }">
                    {{ data.hints }}
                </template>
            </Column>
            <Column header="Aksi" style="min-width: 15rem">
                <template #body="{ data }">
                    <router-link :to="`/daftar-camaba-detail/${data.id}`" class="btn btn-outline-secondary me-2 py-1 px-2" title="Detail Camaba">
                        <i class="pi pi-pencil"></i>
                    </router-link>
                    <router-link :to="`/validasi-krs-mahasiswa/detailKRS/${data.id}`" class="btn btn-outline-primary me-2 py-1 px-2" title="Cetak Biodata">
                        <i class="pi pi-print"></i>
                    </router-link>
                    <router-link :to="`/validasi-krs-mahasiswa/detailKRS/${data.id}`" class="btn btn-outline-warning me-2 py-1 px-2" title="Cetak Kartu Ujian">
                        <i class="pi pi-print"></i>
                    </router-link>

                    <button class="btn btn-outline-danger py-1 px-2" @click="confirmDelete(data.id)" title="Hapus">
                        <i class="pi pi-trash"></i>
                    </button>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<style scoped>
.card-theme {
    background-color: rgba(154, 160, 172, 0.5);
}
</style>

