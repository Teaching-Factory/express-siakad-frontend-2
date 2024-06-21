<script setup>
import { ref, onBeforeMount } from 'vue';
import { FilterMatchMode } from 'primevue/api';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    prodi: { value: null, matchMode: FilterMatchMode.EQUALS },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    total: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const customer1 = ref([]);
const loading1 = ref(false);

onBeforeMount(() => {
    customer1.value = [
        {
            no: 1,
            periode: '2023/2024 Ganjil',
            prodi: 'S1 Teknik Informasi',
            matakuliah: 'Kapita Selekta',
            ruang: 'B5.08',
            hari: 'Senin',
            waktu: '09.10 - 10.10',
        }
        // Add more dummy data here
    ];
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
                        <label for="exampleFormControlInput1" class="form-label">Periode</label>
                        <select class="form-select" aria-label="Default select example">
                            <option selected disabled hidden>Periode</option>
                            <option value="1">2020</option>
                            <option value="2">2021</option>
                            <option value="3">2022</option>
                            <option value="4">2023</option>
                            <option value="5">2024</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px;">
                    <button class="btn btn-primary btn-block" style="width: 100%;">Tampilkan</button>
                </div>
            </div>
            <DataTable v-model:filters="filters" :globalFilterFields="['prodi', 'status', 'total']"
                :value="customer1"
                :paginator="true"
                :rows="10"
                dataKey="id"
                :rowHover="true"
                :loading="loading1"
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
                <template #loading>
                    Loading customers data. Please wait.
                </template>
                <Column field="no" header="No" style="min-width: 5rem">
                    <template #body="{ data }">
                        {{ data.no }}
                    </template>
                </Column>
                <Column filterField="periode" header="Periode" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.periode }}
                    </template>
                </Column>
                <Column filterField="prodi" header="Program Studi" style="min-width: 12rem">
                    <template #body="{ data }">
                        {{ data.prodi }}
                    </template>
                </Column>
                <Column filterField="matakuliah" header="Mata Kuliah" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.matakuliah }}
                    </template>
                </Column>
                <Column filterField="ruang" header="Ruang" style="min-width: 5rem">
                    <template #body="{ data }">
                        {{ data.ruang }}
                    </template>
                </Column>
                <Column filterField="hari" header="Hari" style="min-width: 5rem">
                    <template #body="{ data }">
                        {{ data.hari }}
                    </template>
                </Column>
                <Column filterField="waktu" header="Waktu" style="min-width: 8rem">
                    <template #body="{ data }">
                        {{ data.waktu }}
                    </template>
                </Column>
                <Column filterField="aksi" field="aksi" header="Aksi" style="min-width: 10rem">
                    <template #body="{ data }">
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