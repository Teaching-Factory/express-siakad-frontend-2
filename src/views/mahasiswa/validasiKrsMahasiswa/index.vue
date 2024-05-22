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
            <h5>VALIDASI KRS MAHASISWA - 2021/2022 GENAP</h5>
            <hr />

            <div class="card card-theme" style="padding: 0rem 1rem 0rem 1rem">
                <div class="card-body">
                    <div class="row">
                        <div class="col-12 col-md-6 col-lg-12">
                            <h6 class="text-dark">Keterangan :</h6>
                            <p class="lh-1 text-small">
                                <ol>
                                <li>Fitur ini menampilkan seluruh daftar mahasiswa yang telah melakukan KRS. </li>
                                <li>Disarankan Mahasiswa sudah di set Dosen Wali terlebih dahulu.</li>
                                <li>Untuk melakukan validasi KRS Online, centang pada mahasiswa yang akan divalidasi KRS Online tanpa melalui dosen wali terlebih dahulu. kemudian klik tombol "PROSES VALIDASI"</li>
                                <li>Untuk membatalkan validasi KRS Online, klik tombol hapus pada mahasiswa yang diinginkan.</li>
                                <li>Fitur ini hanya digunakan untuk membantu proses validasi oleh admin, proses validasi sebenarnya terdapat pada login dosen wali.</li>
                                <li>KRS Mahasiswa yang dapat divalidasi ialah Mahasiswa yang memiliki status aktivitas perkuliahan AKTIF.</li>
                                <li>Fitur pencarian bisa di lakukan berdasarkan NIM atau Nama Mahasiswa.</li>
                                <li>Tidak Ada Jenis Tagihan yang menjadi syarat KRS, bila ingin meng-set tagihan yang menjadi flag KRS hubungi admin keuangan.</li>
                            </ol>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card">
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
                    <Column header="Program Studi" filterField="prodi" dataType="date" style="min-width: 15rem">
                        <template #body="{ data }">
                            {{ formatDate(data.date) }}
                        </template>
                    </Column>
                    <Column header="Jumlah SKS" filterField="jumlahSks" dataType="numeric" style="min-width: 10rem">
                        <template #body="{ data }">
                            {{ formatCurrency(data.balance) }}
                        </template>
                    </Column>
                    <Column header="Detail KRS" filterField="detailkrs" dataType="numeric" style="min-width: 10rem">
                        <template #body="{ data }">
                            {{ formatCurrency(data.balance) }}
                        </template>
                    </Column>
                    <Column header="Status Mahasiswa" filterField="statusmahasiswa" dataType="numeric" style="min-width: 10rem">
                        <template #body="{ data }">
                            {{ formatCurrency(data.balance) }}
                        </template>
                    </Column>
                    <Column header="Status Validasi" filterField="statusvalidasi" dataType="numeric" style="min-width: 10rem">
                        <template #body="{ data }">
                            {{ formatCurrency(data.balance) }}
                        </template>
                    </Column>
                    <Column header="Aksi" filterField="aksi" dataType="numeric" style="min-width: 10rem">
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
