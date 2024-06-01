<script setup>
import { ref, onBeforeMount } from 'vue';
import { get } from '../../../utiils/request';
import { FilterMatchMode } from 'primevue/api';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    id_wilayah: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_wilayah: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const wilayahs = ref([]);
const loading1 = ref(true);

// Fungsi untuk mengambil data wilayah dari API
const wilayah = async () => {
    try {
        const response = await get('wilayah'); // Memanggil fungsi get dengan endpoint 'wilayah'
        console.log(response.data.data);
        wilayahs.value = response.data.data;
        loading1.value = false;
    } catch (error) {
        console.error('Gagal mengambil data wilayah:', error);
    }
};

onBeforeMount(() => {
    wilayah();
});
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>DAFTAR WILAYAH</h5>
        <div class="card">
            <DataTable v-model:filters="filters" :globalFilterFields="['id_wilayah', 'nama_wilayah']" :value="wilayahs" :paginator="true" :rows="10" dataKey="id" :rowHover="true" :loading="loading1" showGridlines>
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
                <Column header="No" headerStyle="width:15rem">
                    <template #body="slotProps">
                        {{ slotProps.index + 1 }}
                    </template>
                </Column>
                <Column filterField="" header="ID Wilayah" style="min-width: 15rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.id_wilayah }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_wilayah" header="Nama Wilayah" style="min-width: 15rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nama_wilayah }}</span>
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
