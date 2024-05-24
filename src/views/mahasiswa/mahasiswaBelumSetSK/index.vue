<script setup>
import { ref, onBeforeMount } from 'vue';
const customer1 = ref([]);
const loading1 = ref(false);
const getSeverity = (status) => {
    switch (status) {
        case 'unqualified':
            return 'danger';

        case 'qualified':
            return 'success';
            
        case 'new':
            return 'info';

        case 'negotiation':
            return 'warning';

        case 'renewal':
            return null;
    }
};

onBeforeMount(() => {
    customer1.value = [
        {
            no: '1',
            prodi: 'S1 Teknik Informatika',
            angkatan: '2009',
            nim: '12345678',
            name: 'John Doe',
            sistemkuliah: `
            <div class="actions gap-2">
                <select class="form-select" id="sistemkuliahDropdown">
                    <option value="option1">--Pilih Sistem Kuliah</option>
                    <option value="option2">Karyawan</option>
                    <option value="option3">Reguler</option>
                </select>
            </div>`,
        },{
            no: '2',
            prodi: 'S1 Teknik Informatika',
            angkatan: '2009',
            nim: '12345678',
            name: 'John Doe',
            sistemkuliah: `
            <div class="actions gap-2">
                <select class="form-select" id="sistemkuliahDropdown">
                    <option value="option1">--Pilih Sistem Kuliah</option>
                    <option value="option2">Karyawan</option>
                    <option value="option3">Reguler</option>
                </select>
            </div>`,
        }
        // Add more dummy data here
    ];
})
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>MAHASISWA YANG BELUM SET SISTEM KULIAH</h5>
            <div class="card">
                <DataTable
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
                                <InputText placeholder="Cari disini" style="width: 100%" />
                            </IconField>
                        </div>
                        <div class="col-lg-6 d-flex justify-content-end">
                            <div class="flex justify-content-end gap-2">
                                <!-- <button class="btn btn-outline-primary"> <i class="pi pi-print me-2"></i>Export</button>
                                <button class="btn btn-success"> <i class="pi pi-plus me-2"></i> Tambah</button> -->
                                <!-- <button class="btn btn-danger"> <i class="pi pi-refresh me-2"></i> Sinkronkan</button> -->
                                <button class="btn btn-primary"> <i class="pi pi-check me-2"></i> Set Sistem Kuliah</button>
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
                <Column field="no" header="No" style="min-width: 5rem">
                    <template #body="{ data }">
                        {{ data.no }}
                    </template>
                </Column>
                <Column header="Program Studi" style="min-width: 15rem">
                    <template #body="{ data }">
                        {{ data.prodi }}
                    </template>
                </Column>
                <Column header="Angkatan" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.angkatan }}
                    </template>
                </Column>
                <Column header="NIM" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nim }}</span>
                        </div>
                    </template>
                </Column>
                <Column header="Nama Mahasiswa" style="min-width: 14rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.name }}</span>
                        </div>
                    </template>
                </Column>
                <Column header="Sistem Kuliah" style="min-width: 15rem">
                    <template #body="{ data }">
                        <div v-html="data.sistemkuliah"></div>
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
