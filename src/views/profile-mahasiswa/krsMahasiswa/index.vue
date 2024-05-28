<script setup>
import { ref, onBeforeMount } from 'vue';

const customer1 = ref([]);
const loading1 = ref(false);
const selectedMhs = ref([]);

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
            kode: '98976',
            nama: 'Kapita Selekta',
            kelas: '2020',
            dosenpengajar: 'John Doe',
            sks: '2',
        },{
            no: '1',
            kode: '98976',
            nama: 'Kapita Selekta',
            kelas: '2020',
            dosenpengajar: 'John Doe',
            sks: '2',
        }
        // Add more dummy data here
    ];
})
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>KRS MAHASISWA - 2023/2024 GANJIL</h5>
            
            <div class="card">
                <p>Pembimbing Akademik : -</p>
                
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
                                <!-- <button class="btn btn-primary"> <i class="pi pi-check me-2"></i> Set Sistem Kuliah</button> -->
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
                <Column selectionMode="multiple" headerStyle="width: 3em"></Column>
                <Column header="Kode Mata Kuliah" style="min-width: 15rem">
                    <template #body="{ data }">
                        {{ data.kode }}
                    </template>
                </Column>
                <Column header="Nama Mata Kuliah" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.nama }}
                    </template>
                </Column>
                <Column header="Kelas" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.kelas }}</span>
                        </div>
                    </template>
                </Column>
                <Column header="Dosen Pengajar" style="min-width: 14rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.dosenpengajar }}</span>
                        </div>
                    </template>
                </Column>
                <Column header="SKS" style="min-width: 15rem">
                    <template #body="{ data }">
                        <div v-html="data.sks"></div>
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
