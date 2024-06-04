<script setup>
import { ref, onBeforeMount } from 'vue';
import { FilterMatchMode } from 'primevue/api';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nim: { value: null, matchMode: FilterMatchMode.EQUALS },
    name: { value: null, matchMode: FilterMatchMode.EQUALS },
    periode: { value: null, matchMode: FilterMatchMode.EQUALS },
    nominal: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const customer1 = ref([]);
const loading1 = ref(false);

onBeforeMount(() => {
    customer1.value = [
        {
            no: '1',
            nim: '12345678',
            name: 'John Doe',
            jenistagihan: `
            <div class="actions gap-2">
                <select class="form-select" id="sistemkuliahDropdown">
                    <option value="option1">--Pilih Jenis Tagihan</option>
                    <option value="option2">KKN</option>
                    <option value="option3">MKI</option>
                    <option value="option3">UKT</option>
                </select>
            </div>`,
            periode: '2020/2021 Genap',
            nominal: 'Rp. 2.400.000,-',
            statustagihan: `
            <div class="actions gap-2">
                <select class="form-select" id="sistemkuliahDropdown">
                    <option value="option1">--Pilih Status Tagihan</option>
                    <option value="option2">Lunas</option>
                    <option value="option3">Belum Lunas</option>
                    <option value="option3">Belum Bayar</option>
                </select>
            </div>`
        },
        {
            no: '2',
            nim: '12345678',
            name: 'John Doe',
            jenistagihan: `
            <div class="actions gap-2">
                <select class="form-select" id="sistemkuliahDropdown">
                    <option value="option1">--Pilih Jenis Tagihan</option>
                    <option value="option2">KKN</option>
                    <option value="option3">MKI</option>
                    <option value="option3">UKT</option>
                </select>
            </div>`,
            periode: '2020/2021 Genap',
            nominal: 'Rp. 2.400.000,-',
            statustagihan: `
            <div class="actions gap-2">
                <select class="form-select" id="sistemkuliahDropdown">
                    <option value="option1">--Pilih Status Tagihan</option>
                    <option value="option2">Lunas</option>
                    <option value="option3">Belum Lunas</option>
                    <option value="option3">Belum Bayar</option>
                </select>
            </div>`
        }
        // Add more dummy data here
    ];
});
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>DAFTAR TAGIHAN</h5>
        <div class="card">
            <div class="row">
                <div class="col-lg-2 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Periode Tagihan</label>
                        <select class="form-select" aria-label="Default select example">
                            <option selected disabled hidden>Periode Tagihan</option>
                            <option value="1">2020/2021 Genap</option>
                            <option value="2">2020/2021 Ganjil</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Program Studi</label>
                        <select class="form-select" aria-label="Default select example">
                            <option selected disabled hidden>Program Studi</option>
                            <option value="1">S1 Teknik Informatika</option>
                            <option value="2">S1 Teknologi Basis Data</option>
                            <option value="3">S1 Perikanan</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Jenis Tagihan</label>
                        <select class="form-select" aria-label="Default select example">
                            <option selected disabled hidden>Jenis Tagihan</option>
                            <option value="1">KKN</option>
                            <option value="2">Wisuda</option>
                            <option value="3">MKI</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="">
                        <label for="exampleFormControlInput1" class="form-label">Status Pembayaran</label>
                        <select class="form-select" aria-label="Default select example">
                            <option selected disabled hidden>Status Pembayaran</option>
                            <option value="1">Lunas</option>
                            <option value="2">Belum Lunas</option>
                            <option value="3">Belum Bayar</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px">
                    <button class="btn btn-primary btn-block" style="width: 100%">Tampilkan</button>
                </div>
            </div>
        </div>
        <DataTable v-model:filters="filters" :globalFilterFields="['nim', 'name', 'periode', 'nominal']" :value="customer1" :paginator="true" :rows="10" dataKey="id" :rowHover="true" :loading="loading1" showGridlines>
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
                            <button class="btn btn-secondary"><i class="pi pi-plus me-2"></i> Tambah</button>
                        </div>
                    </div>
                </div>
            </template>

            <template #empty>
                <div class="text-center">Tidak ada data.</div>
            </template>
            <template #loading> Loading customers data. Please wait. </template>
            <Column field="no" header="No" style="min-width: 5rem">
                <template #body="{ data }">
                    {{ data.no }}
                </template>
            </Column>
            <Column filterField="nim" header="NIM" style="min-width: 10rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span>{{ data.nim }}</span>
                    </div>
                </template>
            </Column>
            <Column filterField="name" header="Nama" style="min-width: 14rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span>{{ data.name }}</span>
                    </div>
                </template>
            </Column>
            <Column header="Jenis Tagihan" style="min-width: 10rem">
                <template #body="{ data }">
                    <div v-html="data.jenistagihan"></div>
                </template>
            </Column>
            <Column filterField="periode" header="Periode" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ data.periode }}
                </template>
            </Column>
            <Column filterField="nominal" header="Nominal" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ data.nominal }}
                </template>
            </Column>
            <Column header="Status Tagihan" style="min-width: 10rem">
                <template #body="{ data }">
                    <div v-html="data.statustagihan"></div>
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
