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
</script>

<template>
    <div class="card">
        <div class="body">
            <div class="row">
                <div class="col-12 xl:col-8">
                    <h5>DAFTAR BOBOT PENILAIAN</h5>
                </div>
                <div class="col-12 xl:col-4 d-flex justify-content-end">
                    <Button label="Tambah" icon="pi pi-plus" />
                </div>
            </div>
            <hr />
            <div class="card">
                <div class="card-body">
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
                        <template #loading> Loading customers data. Please wait. </template>
                        <Column field="no" header="No" style="min-width: 5rem">
                            <template #body="{ data }">
                                {{ data.name }}
                            </template>
                        </Column>
                        <Column header="Nama Prodi" filterField="prodi.name" style="min-width: 12rem">
                            <template #body="{ data }">
                                <div class="flex align-items-center gap-2">
                                    <img alt="flag" src="" :class="`flag flag-${data.country.code}`" style="width: 24px" />
                                    <span>{{ data.country.name }}</span>
                                </div>
                            </template>
                        </Column>
                        <Column header="Nama Unsur Penilaian" filterField="representative" :showFilterMatchModes="false" :filterMenuStyle="{ width: '14rem' }" style="min-width: 14rem">
                            <template #body="{ data }">
                                <div class="flex align-items-center gap-2">
                                    <span>{{ data.representative.name }}</span>
                                </div>
                            </template>
                        </Column>
                        <Column header="Bobot Penilaian" filterField="representative" :showFilterMatchModes="false" :filterMenuStyle="{ width: '14rem' }" style="min-width: 14rem">
                            <template #body="{ data }">
                                <div class="flex align-items-center gap-2">
                                    <span>{{ data.representative.name }}</span>
                                </div>
                            </template>
                        </Column>
                        <Column field="angkatan" header="Aksi" :filterMenuStyle="{ width: '14rem' }" style="min-width: 12rem">
                            <template #body="{ data }">
                                <Tag :severity="getSeverity(data.status)">{{ data.status.toUpperCase() }} </Tag>
                            </template>
                        </Column>
                    </DataTable>
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
