<script setup>
import { ref, onBeforeMount } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { get } from '../../../utiils/request';

const jabatans = ref([]);
const loading1 = ref(true);
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nama_jabatan: { value: null, matchMode: FilterMatchMode.EQUALS }
});

// Fungsi untuk mengambil data jabatan dari API
const jabatan = async () => {
    try {
        const response = await get('jabatan'); // Memanggil fungsi get dengan endpoint 'jabatan'
        console.log(response.data.data);
        jabatans.value = response.data.data;
        loading1.value = false;
    } catch (error) {
        console.error('Gagal mengambil data jabatan:', error);
    }
};

// Panggil jabatan sebelum komponen dipasang
onBeforeMount(() => {
    jabatan();
});
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>DAFTAR JABATAN</h5>
        <div class="card">
            <DataTable v-model:filters="filters" :value="jabatans" :paginator="true" :rows="10" dataKey="id" :rowHover="true" :loading="loading1" :globalFilterFields="['nama_jabatan']" showGridlines>
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
                                <button class="btn btn-primary"><i class="pi pi-plus me-2"></i> Tambah</button>
                            </div>
                        </div>
                    </div>
                </template>

                <template #empty>
                    <div class="text-center">Tidak ada data.</div>
                </template>
                <template #loading> Loading customers data. Please wait. </template>
                <Column header="No" headerStyle="width:3rem">
                    <template #body="slotProps">
                        {{ slotProps.index + 1 }}
                    </template>
                </Column>
                <Column filterField="nama_jabatan" header="Nama Jabatan" style="min-width: 30rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nama_jabatan }}</span>
                        </div>
                    </template>
                </Column>
                <Column header="Aksi" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex gap-2">
                            <router-link :to="`/edit-ruang/${data.idruang}`" class="btn btn-outline-primary">
                                <i class="pi pi-pencil"></i>
                            </router-link>
                            <button @click="deleteRuang(data.idruang)" class="btn btn-outline-danger">
                                <i class="pi pi-trash"></i>
                            </button>
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
