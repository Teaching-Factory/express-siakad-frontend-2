<script setup>
import { ref, onBeforeMount } from 'vue';
import { get } from '../../../utiils/request';
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
const mahasiswas = ref([]);
const angkatans = ref([]);
const prodis = ref([]);

const selectedProdi = ref('');
const selectedAngkatan = ref('');
// const loading1 = ref(true);

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
        console.error('Gagal mengambil data prodi:', error);
    }
};
const fetchAngkatan = async () => {
    try {
        const response = await get('angkatan/');
        angkatans.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data angkatan mahasiswa:', error);
    }
};

const selectedFilter = async () => {
    // loading1.value = true;
    await Promise.all([fetchProdi(), fetchAngkatan(), getAdminProdi()]);
    // loading1.value = false;
};

const filterData = async () => {
    const prodiId = selectedProdi.value;
    const angkatanId = selectedAngkatan.value;

    if (!prodiId || !angkatanId) {
        // console.error('Prodi atau Angkatan Mahasiswa belum dipilih');
        Swal.fire('Gagal', 'Data Mahasiswa tidak ditemukan.', 'warning').then(() => {});
        return;
    }

    console.log('Prodi:', prodiId);
    console.log('Angkatan:', angkatanId);

    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await get(`mahasiswa/${prodiId}/${angkatanId}/get`);
        const filterMahasiswa = response.data.data;

        mahasiswas.value = filterMahasiswa;

        Swal.close();
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
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>DAFTAR MAHASISWA</h5>
        <div class="card">
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
                    <div class="">
                        <label for="exampleFormControlInput1" class="form-label">Pilih Angkatan</label>
                        <select v-model="selectedAngkatan" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Angkatan</option>
                            <option v-for="angkatan in angkatans" :key="angkatan.id" :value="angkatan.id">{{ angkatan.tahun }}</option>
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
            :value="mahasiswas"
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
            <Column filterField="nama_mahasiswa" header="Nama Mahasiswa" style="min-width: 14rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span>{{ data.nama_mahasiswa }}</span>
                    </div>
                </template>
            </Column>
            <Column filterField="nim" header="NIM" style="min-width: 12rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span>{{ data.nim }}</span>
                    </div>
                </template>
            </Column>
            <Column filterField="nama_program_studi" header="Program Studi" style="min-width: 15rem">
                <template #body="{ data }">
                    {{ data.Prodi?.nama_program_studi || '-' }}
                </template>
            </Column>
            <Column filterField="nama_status_mahasiswa" header="Status" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ data.nama_status_mahasiswa }}
                </template>
            </Column>
            <Column filterField="nama_periode_masuk" header="Angkatan" style="min-width: 12rem">
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

