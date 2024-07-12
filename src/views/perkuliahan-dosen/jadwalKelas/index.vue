<script setup>
import { ref, onBeforeMount } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { get } from '../../../utiils/request';
import Swal from 'sweetalert2';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nama_program_studi: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_mata_kuliah: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_ruang_perkuliahan: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_semester: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_kelas_kuliah: { value: null, matchMode: FilterMatchMode.EQUALS },
    hari: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const semesters = ref([]);
const selectedSemester = ref('');
const kelasKuliah = ref([]);
const first = ref(0);

const fetchSemester = async () => {
    try {
        const response = await get('semester');
        semesters.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};
const selectedFilter = async () => {
    // loading1.value = true;
    await Promise.all([fetchSemester()]);
    // loading1.value = false;
};

const filterData = async () => {
    const semesterId = selectedSemester.value;

    if (!semesterId) {
        // console.error('Prodi atau Angkatan Mahasiswa belum dipilih');
        Swal.fire('Gagal', 'Data tidak ditemukan.', 'warning').then(() => {});
        return;
    }

    console.log('Semester:', semesterId);

    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await get(`detail-kelas-kuliah/${semesterId}/get-kelas-kuliah-dosen`);
        const filterKelas = response.data.data;

        kelasKuliah.value = filterKelas;

        Swal.close();
    } catch (error) {
        console.error('Gagal mengambil data mahasiswa:', error);
        Swal.fire('Gagal', 'Data tidak ditemukan.', 'warning').then(() => {});
    }
};

const onPageChange = (event) => {
    first.value = event.first;
};

onBeforeMount(() => {
    selectedFilter();
});
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>KELAS PERKULIAHAN</h5>
        <div class="card" style="padding: 0rem 1rem 0rem 1rem">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-12">
                    <h6 class="text-dark">Keterangan :</h6>
                    <p class="lh-1 text-small">
                        <ol>
                            <li>Pengisian Nilai hanya diisi jika dosen yang bersangkutan</li>
                            <li>Dosen Ketua (Jika team teaching)</li>
                            <li>Mengajar sendiri (tidak team teaching)</li>
                            <li>Periode Penilaian saat ini adalah 2020/2021 Ganjil</li>
                        </ol>
                    </p>
                </div>
            </div>
        </div>
        <div class="card" style="padding: 0rem 1rem 0rem 1rem">
            <div class="row mt-3">
                <div class="col-lg-10 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Semester</label>
                        <select v-model="selectedSemester" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Semester</option>
                            <option v-for="semester in semesters" :key="semester.id_semester" :value="semester.id_semester">{{ semester.nama_semester }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px;">
                    <button @click="filterData" class="btn btn-primary btn-block" style="width: 100%;">Tampilkan</button>
                </div>
            </div>
            <DataTable v-model:filters="filters" :globalFilterFields="['KelasKuliah.nama_kelas_kuliah','KelasKuliah.Prodi.nama_program_studi', 'KelasKuliah.MataKuliah.nama_mata_kuliah', 'KelasKuliah.Semester.nama_semester', 'RuangPerkuliahan.nama_ruang_perkuliahan', 'hari']"
                :value="kelasKuliah"
                :paginator="true"
                :rows="10"
                dataKey="id"
                :rowHover="true"
                :first="first"
                @page="onPageChange"
                showGridlines
            >
                <template #header>
                    <div class="flex justify-content-between flex-column sm:flex-row">
                        <IconField iconPosition="left">
                            <InputIcon class="pi pi-search" />
                            <InputText placeholder="Cari disini" v-model="filters['global'].value" style="width: 100%" />
                        </IconField>
                    </div>
                </template>

                <template #empty>
                    <div class="text-center">Tidak ada data.</div>
                </template>
                <Column field="no" header="No" style="min-width: 5rem">
                    <template #body="slotProps">
                        {{ first + slotProps.index + 1 }}
                    </template>
                </Column>
                <Column filterField="nama_semester" header="Periode" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.KelasKuliah.Semester.nama_semester }}
                    </template>
                </Column>
                <Column filterField="nama_program_studi" header="Program Studi" style="min-width: 12rem">
                    <template #body="{ data }">
                        {{ data.KelasKuliah.Prodi.nama_program_studi}}
                    </template>
                </Column>
                <Column filterField="nama_mata_kuliah" header="Mata Kuliah" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.KelasKuliah.MataKuliah.nama_mata_kuliah }}
                    </template>
                </Column>
                <Column filterField="nama_ruang_perkuliahan" header="Ruang" style="min-width: 5rem">
                    <template #body="{ data }">
                        {{ data?.RuangPerkuliahan?.nama_ruang_perkuliahan }}
                    </template>
                </Column>
                <Column filterField="nama_kelas_kuliah" header="Kelas" style="min-width: 5rem">
                    <template #body="{ data }">
                        {{ data.KelasKuliah.nama_kelas_kuliah }}
                    </template>
                </Column>
                <Column filterField="hari" header="Hari" style="min-width: 5rem">
                    <template #body="{ data }">
                        {{ data.hari }}
                    </template>
                </Column>
                <Column filterField="jam_mulai" header="Waktu" style="min-width: 8rem">
                    <template #body="{ data }">
                        {{ data.jam_mulai }} - {{ data.jam_selesai }}
                    </template>
                </Column>
                <Column filterField="aksi" field="aksi" header="Aksi" style="min-width: 10rem">
                    <template #body="{ data }">
                        <router-link :to="`/nilai-perkuliahan/form/${data.id_kelas_kuliah}/${data.KelasKuliah.id_prodi}`" class="btn btn-primary me-2 border-0" style="background-color: #FFE500;"> 
                            <i style="color: #000;" class="pi pi-file-edit"></i>
                        </router-link>
                        <router-link :to="`/pertemuan-perkuliahan/${data.id_kelas_kuliah}`" class="btn btn-primary border-0" style="background-color: #000;"> 
                            <i class="pi pi-user-edit"></i>
                        </router-link>
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