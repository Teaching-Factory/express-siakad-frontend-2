<script setup>
import { ref, onBeforeMount } from 'vue';
import { get } from '../../../utiils/request'; // Sesuaikan path impor sesuai struktur proyek Anda

// State untuk menyimpan data jabatan
const jabatans = ref([]);
const filters1 = ref(null);
const loading1 = ref(true);

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
    initFilters1();
});

// Inisialisasi filter untuk DataTable
const initFilters1 = () => {
    filters1.value = {
        global: {
            value: null,
            matchMode: 'contains'
        },
        jabatan: {
            operator: 'and',
            constraints: [
                {
                    value: null,
                    matchMode: 'startsWith'
                }
            ]
        }
    };
};

// Fungsi untuk mendapatkan tingkat keparahan
const getSeverity = (status) => {
    switch (status) {
        case 'active':
            return 'success';
        case 'inactive':
            return 'danger';
        default:
            return 'warning';
    }
};
</script>

<template>
    <div class="card">
        <div class="body">
            <div class="row">
                <div class="col-12 xl:col-10">
                    <h5>DAFTAR JABATAN</h5>
                </div>
                <div class="col-12 xl:col-2 d-flex justify-content-end">
                    <button class="btn btn-primary"><i class="pi pi-plus mr-2"></i> Tambah</button>
                </div>
            </div>

            <DataTable :value="jabatans" :paginator="true" :rows="10" dataKey="id" :rowHover="true" v-model:filters="filters1" filterDisplay="menu" :loading="loading1" :filters="filters1" :globalFilterFields="['name', 'jabatan']" showGridlines>
                <template #header>
                    <div class="flex justify-content-between flex-column sm:flex-row">
                        <IconField iconPosition="left">
                            <InputIcon class="pi pi-search" />
                            <InputText v-model="filters1['global'].value" placeholder="Keyword Search" style="width: 100%" />
                        </IconField>
                    </div>
                </template>

                <template #empty>
                    <div class="text-center">Tidak ada data.</div>
                </template>
                <template #loading> Loading data. Please wait. </template>

                <Column field="no" header="No" style="min-width: 5rem">
                    <template #body="{ rowIndex }">
                        {{ rowIndex + 1 }}
                    </template>
                </Column>
                <Column field="name" header="Nama Jabatan" filterField="jabatan.name" style="min-width: 12rem">
                    <template #body="{ jabatans }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ jabatans.nama_jabatan }}</span>
                        </div>
                    </template>
                </Column>
                <Column field="status" header="Aksi" :filterMenuStyle="{ width: '14rem' }" style="min-width: 12rem">
                    <template #body="{ data }">
                        <Tag :severity="getSeverity(data.status)">{{ data.status.toUpperCase() }}</Tag>
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
