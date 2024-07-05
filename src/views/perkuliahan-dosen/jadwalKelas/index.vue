<script setup>
import { ref, onBeforeMount } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { get } from '../../../utiils/request';
import Swal from 'sweetalert2';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    prodi: { value: null, matchMode: FilterMatchMode.EQUALS },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    total: { value: null, matchMode: FilterMatchMode.EQUALS }
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
            <DataTable v-model:filters="filters" :globalFilterFields="['prodi', 'status', 'total']"
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
                <Column filterField="periode" header="Periode" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data?.kelasKuliah?.id_semester }}
                    </template>
                </Column>
                <Column filterField="prodi" header="Program Studi" style="min-width: 12rem">
                    <template #body="{ data }">
                        {{ data?.kelasKuliah?.id_prodi }}
                    </template>
                </Column>
                <Column filterField="matakuliah" header="Mata Kuliah" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data?.kelasKuliah?.id_matkul }}
                    </template>
                </Column>
                <Column filterField="ruang" header="Ruang" style="min-width: 5rem">
                    <template #body="{ data }">
                        {{ data.id_ruang_perkuliahan }}
                    </template>
                </Column>
                <Column filterField="hari" header="Hari" style="min-width: 5rem">
                    <template #body="{ data }">
                        {{ data.hari }}
                    </template>
                </Column>
                <Column filterField="waktu" header="Waktu" style="min-width: 8rem">
                    <template #body="{ data }">
                        {{ data.jam_mulai }} - {{ data.jam_selesai }}
                    </template>
                </Column>
                <Column filterField="aksi" field="aksi" header="Aksi" style="min-width: 10rem">
                    <template #body="{  }">
                        <router-link to="/nilai-perkuliahan/create" class="btn btn-primary me-2 border-0" style="background-color: #FFE500;"> 
                            <i style="color: #000;" class="pi pi-file-edit"></i>
                        </router-link>
                        <router-link to="/pertemuan-perkuliahan" class="btn btn-primary border-0" style="background-color: #000;"> 
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