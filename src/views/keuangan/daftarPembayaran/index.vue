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
            nim: '12345678',
            name: 'John Doe',
            periodebayar: '2020/2021 Genap',
            metodepembayaran: '2020/2021 Genap',
            nominal: 'Rp. 2.400.000,-',
            tanggalbayar: '12/12/2024',
            
        },{
            no: '2',
            nim: '12345678',
            name: 'John Doe',
            periodebayar: '2020/2021 Genap',
            metodepembayaran: '2020/2021 Genap',
            nominal: 'Rp. 2.400.000,-',
            tanggalbayar: '12/12/2024',
        }
        // Add more dummy data here
    ];
})
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>DAFTAR PEMBAYARAN</h5>
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
                                <button class="btn btn-danger"> <i class="pi pi-print me-2"></i>Export</button>
                                <!-- <button class="btn btn-success"> <i class="pi pi-plus me-2"></i> Tambah</button> -->
                                <!-- <button class="btn btn-danger"> <i class="pi pi-refresh me-2"></i> Sinkronkan</button> -->
                                <!-- <button class="btn btn-secondary"> <i class="pi pi-plus me-2"></i> Tambah</button> -->
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
                <Column header="NIM" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nim }}</span>
                        </div>
                    </template>
                </Column>
                <Column header="Nama" style="min-width: 14rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.name }}</span>
                        </div>
                    </template>
                </Column>
                <Column header="Periode Bayar" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.periodebayar }}
                    </template>
                </Column>
                <Column header="Metode Pembayaran" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div v-html="data.metodepembayaran"></div>
                    </template>
                </Column>
                <Column header="Nominal" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.nominal }}
                    </template>
                </Column>
                <Column header="Tanggal Bayar" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.tanggalbayar }}
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
