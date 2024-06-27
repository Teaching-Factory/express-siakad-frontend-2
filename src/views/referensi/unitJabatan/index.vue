<script setup>
import { ref, onBeforeMount } from 'vue';
import { get } from '../../../utiils/request';
import { FilterMatchMode } from 'primevue/api';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nama_habatan: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_dosen: { value: null, matchMode: FilterMatchMode.EQUALS },
    nip: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const unitJabatans = ref([]);
const loading1 = ref(true);

const unitJabatan = async () => {
    try {
        const response = await get('unit-jabatan');
        unitJabatans.value = response.data.data;
        loading1.value = false;
    } catch (error) {
        console.error('Gagal mengambil data Unit Jabatan:', error);

        loading1.value = false;

        unitJabatan.value = [];
    }
};

onBeforeMount(() => {
    unitJabatan();
});
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>DAFTAR UNIT JABATAN</h5>

        <DataTable v-model:filters="filters" :globalFilterFields="['Jabatan.nama_habatan', 'Dosen.nama_dosen', 'Dosen.nip']" :value="unitJabatans" :paginator="true" :rows="10" dataKey="id" :rowHover="true" :loading="loading1" showGridlines>
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
                            <router-link to="/unit-jabatan/create" class="btn btn-primary"> <i class="pi pi-plus me-2"></i> Tambah</router-link>
                        </div>
                    </div>
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
            <Column filterField="nama_jabatan" header="Daftar Jabatan" style="min-width: 15rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span>{{ data.Jabatan.nama_jabatan }}</span>
                    </div>
                </template>
            </Column>
            <Column filterField="nama_dosen" header="Nama Penandatangan" style="min-width: 20rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span>{{ data.Dosen.nama_dosen }}</span>
                    </div>
                </template>
            </Column>
            <Column filterField="nip" header="NIP" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ data.Dosen.nip }}
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
