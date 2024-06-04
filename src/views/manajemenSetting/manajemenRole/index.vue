<script setup>
import { ref, onBeforeMount } from 'vue';
import { get } from '../../../utiils/request';

const roles = ref([]);
const loading1 = ref(true);

const role = async () => {
    try {
        const response = await get('role');
        roles.value = response.data.data;
        loading1.value = false;
    } catch (error) {
        console.error('Gagal mengambil data Unit Jabatan:', error);

        loading1.value = false;

        role.value = [];
    }
};

onBeforeMount(() => {
    role();
});
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>MANAJEMEN ROLE</h5>
        <div class="card">
            <DataTable :value="roles" :paginator="true" :rows="10" dataKey="id" :rowHover="true" :loading="loading1" showGridlines>
                <template #header>
                    <div class="row">
                        <div class="col-lg-6 d-flex justify-content-start">
                            <IconField iconPosition="left">
                                <InputIcon class="pi pi-search" />
                                <InputText placeholder="Cari disini" style="width: 100%" />
                            </IconField>
                        </div>
                        <div class="col-lg-6 d-flex justify-content-end">
                            <div class="flex justify-content-end gap-2">
                                <!-- <button class="btn btn-outline-primary"> <i class="pi pi-print me-2"></i>Export</button>
                                <button class="btn btn-success"> <i class="pi pi-plus me-2"></i> Tambah</button> -->
                                <!-- <button class="btn btn-danger"> <i class="pi pi-refresh me-2"></i> Sinkronkan</button> -->
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
                <Column header="Nama Role" style="min-width: 20rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nama_role }}</span>
                        </div>
                    </template>
                </Column>
                <Column header="Aksi" style="min-width: 5rem">
                    <template #body="{}">
                        <div class="actions gap-2">
                            <router-link to="/import-mahasiswa" class="btn btn-outline-primary"> <i class="pi pi-pencil"></i></router-link>
                            <router-link to="/import-mahasiswa" class="btn btn-outline-danger"> <i class="pi pi-trash"></i></router-link>
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
