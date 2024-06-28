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
            id: '9876567',
            jenistagihan: 'UKT',
            periodetagihan: '2024',
            jumlahtagihan: 'RP.2.400.000,-',
            statustagihan: 'Lunas',
        }, {
            id: '20987566',
            jenistagihan: 'MKI',
            periodetagihan: '2024',
            jumlahtagihan: 'RP.2.000.000,-',
            statustagihan: 'Belum Lunas',
        }
        // Add more dummy data here
    ];
})
</script>

<template>
    <div class="card">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button"
                    role="tab" aria-controls="home" aria-selected="true">Info Tagihan</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button"
                    role="tab" aria-controls="profile" aria-selected="false">Info Pembayaran</button>
            </li>
        </ul>

        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <div class="mt-3">
                    <DataTable :value="customer1" :paginator="true" :rows="10" dataKey="id" :rowHover="true"
                        :loading="loading1" showGridlines>
                        <template #header>
                            <div class="row">
                                <div class="col-lg-6 d-flex justify-content-start">
                                    <IconField iconPosition="left">
                                        <InputIcon class="pi pi-search" />
                                        <InputText placeholder="Cari disini" style="width: 100%" />
                                    </IconField>
                                </div>
                            </div>
                        </template>

                        <template #empty>
                            <div class="text-center">Tidak ada data.</div>
                        </template>
                        <template #loading>
                            Loading cus
                            
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Info Tagihan Lunas</td>
                                        <td>:</td>
                                        <td>Rp. 0</td>
                                    </tr>
                                    <tr>
                                        <td>Info Tagihan Lunas</td>
                                        <td>:</td>
                                        <td>Rp. 0</td>
                                    </tr>
                                </tbody>
                            </table>tomers data. Please wait.
                        </template>
                        <Column field="id" header="ID Pembayaran" style="min-width: 8rem">
                            <template #body="{ data }">
                                {{ data.id }}
                            </template>
                        </Column>
                        <Column header="Jenis Tagihan" style="min-width: 15rem">
                            <template #body="{ data }">
                                {{ data.jenistagihan }}
                            </template>
                        </Column>
                        <Column header="Periode Tagihan" style="min-width: 10rem">
                            <template #body="{ data }">
                                {{ data.periodetagihan }}
                            </template>
                        </Column>
                        <Column header="Jumlah Tagihan" style="min-width: 10rem">
                            <template #body="{ data }">
                                <div class="flex align-items-center gap-2">
                                    <span>{{ data.jumlahtagihan }}</span>
                                </div>
                            </template>
                        </Column>
                        <Column header="Status Tagihan" style="min-width: 14rem">
                            <template #body="{ data }">
                                <div class="flex align-items-center gap-2">
                                    <span>{{ data.statustagihan }}</span>
                                </div>
                            </template>
                        </Column>
                        <Column header="Aksi" style="min-width: 15rem">
                            <template #body="{ data }">
                                <router-link to="/detail-pembayaran-mahasiswa" class="btn btn-outline-primary me-2">
                                    <i class="pi pi-eye"></i>
                                </router-link>
                            </template>
                        </Column>
                    </DataTable>

                    <hr>
                    <table>
                        <tbody>
                            <tr>
                                <td width="30%">Info Tagihan Lunas</td>
                                <td width="10%">:</td>
                                <td width="50%">Rp. 0</td>
                            </tr>
                            <tr>
                                <td>Info Tagihan Belum Bayar</td>
                                <td>:</td>
                                <td>Rp. 0</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                <div class="row mt-3">
                    <div class="col-lg-12">
                        <div class="alert alert-danger text-center" role="alert">
                            Anda memiliki piutang sebesar <strong>Rp. 10.000.000</strong> Segera lengkapi sebelum anda
                            dikeluarkan
                            dari kampus!!
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card-theme {
    background-color: rgba(154, 160, 172, 0.5);
}
</style>
