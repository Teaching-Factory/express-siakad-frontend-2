<script setup>
import { ref, onBeforeMount } from 'vue';
import { get } from '../../../utiils/request';
import { FilterMatchMode } from 'primevue/api';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nama_mahasiswa: { value: null, matchMode: FilterMatchMode.EQUALS },
    nim: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_status_mahasiswa: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const mahasiswas = ref([]);
const loading1 = ref(true);

const mahasiswa = async () => {
    try {
        const response = await get('mahasiswa'); // Memanggil fungsi get dengan endpoint 'mahasiswa'
        console.log(response.data.data);
        mahasiswas.value = response.data.data;
        loading1.value = false;
    } catch (error) {
        console.error('Gagal mengambil data mahasiswa:', error);
    }
};

onBeforeMount(() => {
    mahasiswa();
});
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>DAFTAR MAHASISWA</h5>
        <div class="card">
            <div class="row">
                <div class="col-lg-5 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Program Studi</label>
                        <select class="form-select" aria-label="Default select example">
                            <option selected disabled hidden>Program Studi</option>
                            <option value="1">Teknologi Ternak</option>
                            <option value="2">Teknologi Basis Data</option>
                            <option value="3">Perikanan</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Angkatan</label>
                        <select class="form-select" aria-label="Default select example">
                            <option selected disabled hidden>Angkatan</option>
                            <option value="1">2020</option>
                            <option value="2">2021</option>
                            <option value="3">2022</option>
                            <option value="4">2023</option>
                            <option value="5">2024</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="">
                        <label for="exampleFormControlInput1" class="form-label">Status Mahasiswa</label>
                        <select class="form-select" aria-label="Default select example">
                            <option selected disabled hidden>Status Mahasiswa</option>
                            <option value="1">Aktif</option>
                            <option value="2">Cuti</option>
                            <option value="3">DO</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px">
                    <button class="btn btn-primary btn-block" style="width: 100%">Tampilkan</button>
                </div>
            </div>
        </div>

        <DataTable v-model:filters="filters" :globalFilterFields="['nama_mahasiswa', 'nim', 'nama_status_mahasiswa']" :value="mahasiswas" :paginator="true" :rows="10" dataKey="id" :rowHover="true" :loading="loading1" showGridlines>
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
            <template #loading>Loading data. Please wait.</template>
            <Column header="No" headerStyle="width:3rem">
                <template #body="slotProps">
                    {{ slotProps.index + 1 }}
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
            <Column header="Program Studi" style="min-width: 15rem">
                <template #body="{ data }">
                    {{ data.id_periode }}
                </template>
            </Column>
            <Column filterField="nama_status_mahasiswa" header="Status" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ data.nama_status_mahasiswa }}
                </template>
            </Column>
            <Column field="angkatan" header="Angkatan" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.angkatan }}
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
