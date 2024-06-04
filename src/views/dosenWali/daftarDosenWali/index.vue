<script setup>
import { ref, onBeforeMount } from 'vue';
import { FilterMatchMode } from 'primevue/api';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    namadosen: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const customer1 = ref([]);
const loading1 = ref(false);

onBeforeMount(() => {
    customer1.value = [
        {
            no: '1',
            namadosen: 'Lukman Hakim',
            aksi: `<div class="actions gap-2">
                <router-link to="/import-mahasiswa" class="btn btn-outline-primary"> <i class="pi pi-eye"></i></router-link>
            </div>`
        },
        {
            no: '2',
            namadosen: 'Lukman Hakim',
            aksi: `<div class="actions gap-2">
                <router-link to="/import-mahasiswa" class="btn btn-outline-primary"> <i class="pi pi-eye"></i></router-link>
            </div>`
        }
        // Add more dummy data here
    ];
});
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>DAFTAR DOSEN WALI PERIODE 2022/2023 GENAP</h5>
        <div class="card">
            <DataTable v-model:filters="filters" :globalFilterFields="['namadosen']" :value="customer1" :paginator="true" :rows="10" dataKey="id" :rowHover="true" :loading="loading1" showGridlines>
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
                                <button class="btn btn-primary"><i class="pi pi-plus me-2"></i> Set Dosen Wali</button>
                            </div>
                        </div>
                    </div>
                </template>

                <template #empty>
                    <div class="text-center">Tidak ada data.</div>
                </template>
                <template #loading> Loading customers data. Please wait. </template>
                <Column field="no" header="No" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.no }}
                    </template>
                </Column>
                <Column filterField="namadosen" header="Nama Dosen" style="min-width: 30rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.namadosen }}</span>
                        </div>
                    </template>
                </Column>
                <Column header="Aksi" style="min-width: 5rem">
                    <template #body="{ data }">
                        <div v-html="data.aksi"></div>
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
