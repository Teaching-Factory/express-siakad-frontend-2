<script setup>
import { ref, onBeforeMount } from 'vue';
import { FilterMatchMode } from 'primevue/api';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.EQUALS },
    nim: { value: null, matchMode: FilterMatchMode.EQUALS },
    prodi: { value: null, matchMode: FilterMatchMode.EQUALS },
    dosenwali: { value: null, matchMode: FilterMatchMode.EQUALS },
    angkatan: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const customer1 = ref([]);
const loading1 = ref(false);

onBeforeMount(() => {
    customer1.value = [
        {
            no: '1',
            nim: '12345678',
            name: 'John Doe',
            prodi: 'S1 Teknik Informatika',
            dosenwali: 'Lukman Hakim',
            angkatan: '2022'
        },
        {
            no: '2',
            nim: '87654321',
            name: 'John Doe',
            prodi: 'S1 Teknik Informatika',
            dosenwali: 'Lukman Hakim',
            angkatan: '2022'
        }
        // Add more dummy data here
    ];
});
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>MAHASISWA YANG BELUM KRS</h5>
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
                <div class="col-lg-5 col-md-6 col-sm-6">
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
                <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px">
                    <button class="btn btn-primary btn-block" style="width: 100%">Tampilkan</button>
                </div>
            </div>
        </div>
        <DataTable v-model:filters="filters" :globalFilterFields="['name', 'nim', 'prodi', 'dosenwali', 'angkatan ']" :value="customer1" :paginator="true" :rows="10" dataKey="id" :rowHover="true" :loading="loading1" showGridlines>
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
            <template #loading> Loading customers data. Please wait. </template>
            <Column field="no" header="No" style="min-width: 5rem">
                <template #body="{ data }">
                    {{ data.no }}
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
                        <span>{{ data.name }}</span>
                    </div>
                </template>
            </Column>
            <Column filterField="prodi" header="Program Studi" style="min-width: 15rem">
                <template #body="{ data }">
                    {{ data.prodi }}
                </template>
            </Column>
            <Column filterField="dosenwali" header="Dosen Wali" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ data.dosenwali }}
                </template>
            </Column>
            <Column filterField="angkatan" header="Angkatan" style="min-width: 10rem">
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
