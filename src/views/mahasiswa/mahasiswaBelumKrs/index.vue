<script setup>
import { ref, onBeforeMount } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { get } from '../../../utiils/request';
import Swal from 'sweetalert2';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nama_mahasiswa: { value: null, matchMode: FilterMatchMode.EQUALS },
    nim: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_program_studi: { value: null, matchMode: FilterMatchMode.EQUALS },
    dosenwali: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_periode_masuk: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const first = ref(0);
const belumKrs = ref([]);
const selectedSemester = ref('');
const selectedProdi = ref('');
const semesters = ref([]);
const prodis = ref([]);

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

const selectedFilter = async () => {
    await Promise.all([fetchProdi(), fetchSemester(), getAdminProdi()]);
};

const filterData = async () => {
    const semesterId = selectedSemester.value;
    const prodiId = selectedProdi.value;

    console.log('Selected Periode:', semesterId);
    console.log('Selected Prodi:', prodiId);

    if (!semesterId || !prodiId) {
        // console.error('Prodi atau Angkatan Mahasiswa belum dipilih');
        Swal.fire('GAGAL!', 'Data tidak ditemukan.', 'warning').then(() => {});
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
        const response = await get(`krs-mahasiswa/${semesterId}/${prodiId}/get-mahasiswa-belum-krs`);
        const filterbelumkrs = response.data.data;

        belumKrs.value = filterbelumkrs;
        Swal.close();
    } catch (error) {
        Swal.fire('GAGAL!', 'Data Kelas Kuliah tidak ditemukan.', 'warning').then(() => {});
    }
};

const onPageChange = (event) => {
    first.value = event.first;
};

onBeforeMount(() => {
    // fetchBelumKrs();
    selectedFilter();
});
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>MAHASISWA YANG BELUM KRS</h5>
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
                        <label for="exampleFormControlInput1" class="form-label">Semester</label>
                        <select v-model="selectedSemester" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Semester</option>
                            <option v-for="semester in semesters" :key="semester.id_semester" :value="semester.id_semester">{{ semester.nama_semester }}</option>
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
            :globalFilterFields="['nama_mahasiswa', 'nim', 'Prodi.nama_program_studi', 'dosenwali', 'angkatan ']"
            :value="belumKrs"
            :paginator="true"
            :rows="10"
            dataKey="id"
            :rowHover="true"
            showGridlines
            :first="first"
            @page="onPageChange"
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
                        <div class="flex justify-content-end gap-2"></div>
                    </div>
                </div>
            </template>

            <template #empty>
                <div class="text-center">Tidak ada data.</div>
            </template>
            <!-- <template #loading> Loading customers data. Please wait. </template> -->
            <Column header="No" headerStyle="width:3rem">
                <template #body="slotProps">
                    {{ first + slotProps.index + 1 }}
                </template>
            </Column>
            <Column filterField="nim" header="NIM" style="min-width: 10rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span>{{ data.nim }}</span>
                    </div>
                </template>
            </Column>
            <Column filterField="name" header="Nama Mahasiswa" style="min-width: 14rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span>{{ data.nama_mahasiswa }}</span>
                    </div>
                </template>
            </Column>
            <Column filterField="nama_program_studi" header="Program Studi" style="min-width: 15rem">
                <template #body="{ data }">
                    {{ data.Prodi?.nama_program_studi || '-' }}
                </template>
            </Column>

            <Column filterField="dosenwali" header="Dosen Wali" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ data.dosenwali }}
                </template>
            </Column>
            <Column filterField="angkatan" header="Angkatan" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ data.nama_periode_masuk }}
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
