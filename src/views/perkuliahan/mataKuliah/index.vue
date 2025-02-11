<script setup>
import { ref, onBeforeMount } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { get, getData } from '../../../utiils/request';
import Swal from 'sweetalert2';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    kode_mata_kuliah: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_mata_kuliah: { value: null, matchMode: FilterMatchMode.EQUALS },
    sks_mata_kuliah: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_program_studi: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const mataKuliahs = ref([]);
const prodis = ref([]);
const selectedProdi = ref('');

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
const getProdi = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await get(`prodi/`);
        prodis.value = response.data.data;
        Swal.close();
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};

const getMataKuliah = async () => {
    try {
        const id_prodi = selectedProdi.value;
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await getData(`mata-kuliah/prodi/${id_prodi}/get`);
        console.log(response.data.data);
        mataKuliahs.value = response.data.data;
        Swal.close();
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};

onBeforeMount(() => {
    getProdi();
    getAdminProdi();
});
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>DAFTAR MATA KULIAH</h5>
        <div class="card" style="padding: 0rem 1rem 0rem 1rem"></div>
        <div class="card">
            <div class="row">
                <div class="col-lg-10 col-md-12 col-sm-12">
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
                <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px">
                    <button @click="getMataKuliah" class="btn btn-primary btn-block" style="width: 100%">Tampilkan</button>
                </div>
            </div>
            <hr />
            <DataTable
                v-model:filters="filters"
                :globalFilterFields="['kode_mata_kuliah', 'nama_mata_kuliah', 'sks_mata_kuliah', 'Prodi.nama_program_studi']"
                :value="mataKuliahs"
                :paginator="true"
                :rows="10"
                dataKey="id"
                :rowHover="true"
                showGridlines
            >
                <template #header>
                    <div class="row">
                        <div class="col-lg-6 d-flex justify-content-start">
                            <IconField iconPosition="left">
                                <InputIcon class="pi pi-search" />
                                <InputText placeholder="Cari disini" v-model="filters['global'].value" style="width: 100%" />
                            </IconField>
                        </div>
                    </div>
                </template>

                <template #empty>
                    <div class="text-center">Tidak ada data.</div>
                </template>
                <Column filterField="kode_mata_kuliah" header="Kode Mata Kuliah" style="min-width: 5rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.kode_mata_kuliah }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_mata_kuliah" header="Nama Mata Kuliah" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nama_mata_kuliah }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="sks_mata_kuliah" header="SKS" style="min-width: 5rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.sks_mata_kuliah }}</span>
                        </div></template
                    >
                </Column>
                <Column filterField="nama_program_studi" header="Program_studi" style="min-width: 5rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.Prodi.nama_program_studi }}</span>
                        </div>
                    </template>
                </Column>
                <Column header="Detail" style="min-width: 15rem">
                    <template #body="{ data }">
                        <div class="actions gap-2">
                            <router-link :to="`/rencana-evaluasi/${data.id_matkul}/mata-kuliah`" class="btn btn-outline-primary"> <i class="pi pi-eye"></i> Rencana Evaluasi</router-link>
                        </div>
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
