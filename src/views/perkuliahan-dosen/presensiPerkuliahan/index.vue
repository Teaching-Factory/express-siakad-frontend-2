<script setup>
import { ref, onBeforeMount } from 'vue';
import { FilterMatchMode } from 'primevue/api';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    pertemuan: { value: null, matchMode: FilterMatchMode.EQUALS },
    tanggalpertemuan: { value: null, matchMode: FilterMatchMode.EQUALS },
    waktu: { value: null, matchMode: FilterMatchMode.EQUALS },
    ruang: { value: null, matchMode: FilterMatchMode.EQUALS },
    dosen: { value: null, matchMode: FilterMatchMode.EQUALS },
    materi: { value: null, matchMode: FilterMatchMode.EQUALS },
    jumlah: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const customer1 = ref([]);
const loading1 = ref(false);

onBeforeMount(() => {
    customer1.value = [
        {
            pertemuan: '1',
            tanggalpertemuan: '14/06/2024',
            waktu: '09.10-10.10',
            ruang: 'B5.08',
            dosen: 'Sudarmono',
            materi: 'Kapita Selekta',
            jumlah: '30',
            aksi: ''
            
        }
        // Add more dummy data here
    ];
});

</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>PRESENSI KELAS PERKULIAHAN</h5>
        <hr>
        <div class="card" style="border-radius: none !important">
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
        
            <DataTable v-model:filters="filters" :globalFilterFields="['Pertemuan', 'tanggalpertemuan', 'waktu', 'ruang', 'dosen', 'materi','jumlah']"
                :value="customer1"
                :paginator="true"
                :rows="10"
                dataKey="id"
                :rowHover="true"
                :loading="loading1"
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
                            <div class="col-lg-6 d-flex justify-content-end">
                                <div class="flex justify-content-end gap-2">
                                    <router-link to="/pertemuan-perkuliahan/create" class="btn btn-secondary"> <i class="pi pi-plus me-2"></i> Tambah</router-link>
                                </div>
                            </div>
                        </div>
                    </template>

                <template #empty>
                    <div class="text-center">Tidak ada data.</div>
                </template>
                <template #loading>
                    Loading customers data. Please wait.
                </template>
                <Column filterField="pertemuan" header="Pertemuan" style="min-width: 5rem">
                    <template #body="{ data }">
                        {{ data.pertemuan }}
                    </template>
                </Column>
                <Column filterField="tangggalpertemuan" header="Tanggal Pertemuan" style="min-width: 13rem">
                    <template #body="{ data }">
                        {{ data.tanggalpertemuan }}
                    </template>
                </Column>
                <Column filterField="waktu" header="Waktu" style="min-width: 8rem">
                    <template #body="{ data }">
                        {{ data.waktu }}
                    </template>
                </Column>
                <Column filterField="ruangpertemuan" header="Ruang Pertemuan" style="min-width: 13rem">
                    <template #body="{ data }">
                        {{ data.ruangpertemuan }}
                    </template>
                </Column>
                <Column filterField="dosen" header="Dosen Pengajar" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.dosen }}
                    </template>
                </Column>
                <Column filterField="materi" header="Materi yang Diajarkan" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.materi }}
                    </template>
                </Column>
                <Column filterField="jumlah" header="Jumlah Mahasiswa Hadir" style="min-width: 5rem">
                    <template #body="{ data }">
                        {{ data.jumlah }}
                    </template>
                </Column>
                <Column header="Aksi" style="min-width: 10rem">
                    <template #body="{ data }">
                        <router-link to="/pertemuan-perkuliahan/create" class="btn btn-outline-primary me-2 py-1 px-2" title="edit"> 
                            <i class="pi pi-pencil"></i>
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

