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
            no: 1,
            name: 'John Doe',
            nim: '12345678',
            prodi: 'Teknologi Basis Data',
            status: 'Aktif',
            angkatan: 2021,
        },
        {
            no: 2,
            name: 'Jane Smith',
            nim: '87654321',
            prodi: 'Perikanan',
            status: 'Cuti',
            angkatan: 2022,
        },
        // Add more dummy data here
    ];
});
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>SET STATUS MAHASISWA - PERIODE 2022/2023 GANJIL</h5>
        <div class="card" style="padding: 0rem 1rem 0rem 1rem">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-12">
                    <h6 class="text-dark">Keterangan :</h6>
                    <p class="lh-1 text-small">
                        <ol>
                            <li>Data dibawah menunjukkan jumlah mahasiswa yang belum terdaftar sebagai mahasiswa Lulus / Drop Out</li>
                            <li>Pastikan kodeprodi yang anda inputkan sesuai dengan daftar referensi program studi pada Feeder</li>
                            <li>Fitur ini membantu admin untuk meminimalisasi adanya mahasiswa yang tidak memiliki status di periode berlaku</li>
                            <li>Status mahasiswa akan berubah menjadi aktif ketika melakukan validasi pembayaran / KRS</li>
                            <li>Fitur ini hanya di gunakan di setiap awal periode semester</li>
                        </ol>
                    </p>
                </div>
            </div>
        </div>
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
                <div class="flex justify-content-between flex-column sm:flex-row">
                    <IconField iconPosition="left">
                        <InputIcon class="pi pi-search" />
                        <InputText placeholder="Cari disini" style="width: 100%" />
                    </IconField>
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
            <Column header="Nama Mahasiswa" style="min-width: 14rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span>{{ data.name }}</span>
                    </div>
                </template>
            </Column>
            <Column header="NIM" style="min-width: 10rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span>{{ data.nim }}</span>
                    </div>
                </template>
            </Column>
            <Column header="Program Studi" style="min-width: 15rem">
                <template #body="{ data }">
                    {{ data.prodi }}
                </template>
            </Column>
            <Column header="Status" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ data.status }}
                </template>
            </Column>
            <Column field="angkatan" header="Angkatan" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.angkatan }}
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
