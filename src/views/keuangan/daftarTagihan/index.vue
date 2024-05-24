<script setup>
import { ref, onBeforeMount } from 'vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { CustomerService } from '@/service/CustomerService';
import { ProductService } from '@/service/ProductService';

const customer1 = ref(null);
const customer2 = ref(null);
const customer3 = ref(null);
const filters1 = ref(null);
const loading1 = ref(null);
const loading2 = ref(null);
const products = ref(null);

const customerService = new CustomerService();
const productService = new ProductService();
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
    productService.getProductsWithOrdersSmall().then((data) => (products.value = data));
    customerService.getCustomersLarge().then((data) => {
        customer1.value = data;
        loading1.value = false;
        customer1.value.forEach((customer) => (customer.date = new Date(customer.date)));
    });
    customerService.getCustomersLarge().then((data) => (customer2.value = data));
    customerService.getCustomersMedium().then((data) => (customer3.value = data));
    loading2.value = false;

    initFilters1();
});

const initFilters1 = () => {
    filters1.value = {
        global: {
            value: null,
            matchMode: FilterMatchMode.CONTAINS
        },
        name: {
            operator: FilterOperator.AND,
            constraints: [
                {
                    value: null,
                    matchMode: FilterMatchMode.STARTS_WITH
                }
            ]
        },
        'country.name': {
            operator: FilterOperator.AND,
            constraints: [
                {
                    value: null,
                    matchMode: FilterMatchMode.STARTS_WITH
                }
            ]
        },
        representative: {
            value: null,
            matchMode: FilterMatchMode.IN
        },
        date: {
            operator: FilterOperator.AND,
            constraints: [
                {
                    value: null,
                    matchMode: FilterMatchMode.DATE_IS
                }
            ]
        },
        balance: {
            operator: FilterOperator.AND,
            constraints: [
                {
                    value: null,
                    matchMode: FilterMatchMode.EQUALS
                }
            ]
        },
        status: {
            operator: FilterOperator.OR,
            constraints: [
                {
                    value: null,
                    matchMode: FilterMatchMode.EQUALS
                }
            ]
        },
        activity: {
            value: [0, 100],
            matchMode: FilterMatchMode.BETWEEN
        },
        verified: {
            value: null,
            matchMode: FilterMatchMode.EQUALS
        }
    };
};

// const clearFilter1 = () => {
//     initFilters1();
// };
const formatCurrency = (value) => {
    return value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    });
};

const formatDate = (value) => {
    return value.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};
</script>

<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-10 xl:col-10">
                    <h5>DAFTAR TAGIHAN</h5>
                </div>
                <div class="col-12 xl:col-2 d-flex justify-content-end">
                    <button class="btn btn-primary"> <i class="pi pi-plus mr-2"></i> Tambah</button>
                </div>
            </div>

            <div class="card">
                <div class="row">
                    <div class="col-lg-2 col-md-6 col-sm-6">
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Periode Tagihan</label>
                            <select class="form-select" aria-label="Default select example">
                                <option selected disabled hidden>Periode Tagihan</option>
                                <option value="1">2020/2021 Genap</option>
                                <option value="2">2020/2021 Ganjil</option>
                                <option value="3">2021/2022 Genap</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6">
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Program Studi</label>
                            <select class="form-select" aria-label="Default select example">
                                <option selected disabled hidden>Program Studi</option>
                                <option value="1">Teknologi Ternak</option>
                                <option value="2">Teknologi Basis Data</option>
                                <option value="3">Perikanan</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-6 col-sm-6">
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Jenis Tagihan</label>
                            <select class="form-select" aria-label="Default select example">
                                <option selected disabled hidden>Jenis Tagihan</option>
                                <option value="1">UKT</option>
                                <option value="2">Wisuda</option>
                                <option value="3">KKN</option>
                                <option value="4">Buku</option>
                                <option value="5">MKI</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6">
                        <div class="">
                            <label for="exampleFormControlInput1" class="form-label">Status Pembayaran</label>
                            <select class="form-select" aria-label="Default select example">
                                <option selected disabled hidden>Status</option>
                                <option value="1">Belum Lunas</option>
                                <option value="2">Lunas</option>
                                <option value="3">Belum Bayar</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px;">
                        <button class="btn btn-primary btn-block" style="width: 100%;">Filter</button>
                    </div>
                </div>
                <hr/>

                <DataTable
                    :value="customer1"
                    :paginator="true"
                    :rows="10"
                    dataKey="id"
                    :rowHover="true"
                    v-model:filters="filters1"
                    filterDisplay="menu"
                    :loading="loading1"
                    :filters="filters1"
                    :globalFilterFields="['name', 'country.name', 'representative.name', 'balance', 'status']"
                    showGridlines
                >
                    <template #header>
                        <div class="flex justify-content-between flex-column sm:flex-row">
                            <IconField iconPosition="left">
                                <InputIcon class="pi pi-search" />
                                <InputText v-model="filters1['global'].value" placeholder="Keyword Search" style="width: 100%" />
                            </IconField>
                        </div>
                    </template>

                    <template #empty> <div class="text-center">Tidak ada data.</div></template>
                    <template #loading> Loading data. Please wait. </template>
                    <Column field="no" header="No" style="min-width: 5rem">
                        <template #body="{ data }">
                            {{ data.name }}
                        </template>
                    </Column>
                    <Column header="NIM" filterField="nim.name" style="min-width: 12rem">
                        <template #body="{ data }">
                            <div class="flex align-items-center gap-2">
                                <img alt="flag" src="" :class="`flag flag-${data.country.code}`" style="width: 24px" />
                                <span>{{ data.country.name }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column header="Nama Mahasiswa" filterField="representative" :showFilterMatchModes="false" :filterMenuStyle="{ width: '14rem' }" style="min-width: 14rem">
                        <template #body="{ data }">
                            <div class="flex align-items-center gap-2">
                                <span>{{ data.representative.name }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column header="Jenis Tagihan" filterField="jenistagihan" dataType="date" style="min-width: 15rem">
                        <template #body="{ data }">
                            {{ formatDate(data.date) }}
                        </template>
                    </Column>
                    <Column header="Jumlah Tagihan" filterField="jumlahtagihan" dataType="numeric" style="min-width: 15rem">
                        <template #body="{ data }">
                            {{ formatCurrency(data.balance) }}
                        </template>
                    </Column>
                    <Column header="Nominal" filterField="nominal" dataType="numeric" style="min-width: 15rem">
                        <template #body="{ data }">
                            {{ formatCurrency(data.balance) }}
                        </template>
                    </Column>
                    <Column header="Status Tagihan" filterField="statustagihan" dataType="numeric" style="min-width: 10rem">
                        <template #body="{ data }">
                            {{ formatCurrency(data.balance) }}
                        </template>
                    </Column>
                    <!-- <Column field="angkatan" header="Angkatan" :filterMenuStyle="{ width: '14rem' }" style="min-width: 12rem">
                        <template #body="{ data }">
                            <Tag :severity="getSeverity(data.status)">{{ data.status.toUpperCase() }} </Tag>
                        </template>
                    </Column> -->
                </DataTable>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card-theme {
    background-color: rgba(154, 160, 172, 0.5);
}
</style>
