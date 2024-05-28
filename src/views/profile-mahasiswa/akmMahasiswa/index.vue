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
            semester: '2020',
            status: 'Aktif',
            ips: '23',
            ipk: '23',
            skssemester: '23',
            skstotal: 'J56',
        
        },{
            no: '2',
            semester: '2020',
            status: 'Aktif',
            ips: '23',
            ipk: '23',
            skssemester: '23',
            skstotal: 'J56',
        }
        // Add more dummy data here
    ];
})
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>AKTIVITAS KULIAH MAHASISWA</h5>
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
                <Column field="no" header="No" style="min-width: 5rem">
                    <template #body="{ data }">
                        {{ data.no }}
                    </template>
                </Column>
                <Column header="Semester" style="min-width: 15rem">
                    <template #body="{ data }">
                        {{ data.semester }}
                    </template>
                </Column>
                <Column header="status" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.status }}
                    </template>
                </Column>
                <Column header="IPS" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.ips }}</span>
                        </div>
                    </template>
                </Column>
                <Column header="IPK" style="min-width: 14rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.ipk }}</span>
                        </div>
                    </template>
                </Column>
                <Column header="SKS Semester" style="min-width: 15rem">
                    <template #body="{ data }">
                        <div v-html="data.skssemester"></div>
                    </template>
                </Column>
                <Column header="SKS Total" style="min-width: 15rem">
                    <template #body="{ data }">
                        <div v-html="data.skstotal"></div>
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
