<script setup>
import { ref, onBeforeMount } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import Swal from 'sweetalert2';
import { get } from '../../../utiils/request';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nim: { value: null, matchMode: FilterMatchMode.EQUALS },
    name: { value: null, matchMode: FilterMatchMode.EQUALS },
    periodebayar: { value: null, matchMode: FilterMatchMode.EQUALS },
    nominal: { value: null, matchMode: FilterMatchMode.EQUALS },
    metodepembayaran: { value: null, matchMode: FilterMatchMode.EQUALS },
    tanggalbayar: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const pembayaran = ref([]);
const first = ref(0);

const fetchPembayaran = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await get('pembayaran-mahasiswa/get-pembayaran-dikonfirmasi');
        pembayaran.value = response.data.data;
        Swal.close();
    } catch (error) {
        console.error('Gagal mengambil data Unit Jabatan:', error);

        user.value = [];
    }
};
const onPageChange = (event) => {
    first.value = event.first;
};
onBeforeMount(() => {
    fetchPembayaran();
});
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>DAFTAR PEMBAYARAN</h5>
        <DataTable
            v-model:filters="filters"
            :globalFilterFields="['nim', 'name', 'periodepembayaran', 'nominal', 'metodepembayaran', 'tanggalbayar']"
            :value="pembayaran"
            :paginator="true"
            :rows="10"
            dataKey="id"
            :rowHover="true"
            showGridlines
            :first="first"
            @page="onPageChange"
        >
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
                            <button class="btn btn-danger"><i class="pi pi-print me-2"></i>Export</button>
                        </div>
                    </div>
                </div>
            </template>

            <template #empty>
                <div class="text-center">Tidak ada data.</div>
            </template>
            <Column field="no" header="No" style="min-width: 5rem">
                <template #body="slotProps">
                    {{ first + slotProps.index + 1 }}
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
            <Column filterField="periodebayar" header="Periode Bayar" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ data.periodebayar }}
                </template>
            </Column>
            <Column filterField="metodepembayaran" header="Metode Pembayaran" style="min-width: 10rem">
                <template #body="{ data }">
                    <div v-html="data.metodepembayaran"></div>
                </template>
            </Column>
            <Column filterField="jumlah_tagihan" header="Nominal" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ data.TagihanMahasiswa.jumlah_tagihan }}
                </template>
            </Column>
            <Column filterField="tanggalbayar" header="Tanggal Bayar" style="min-width: 10rem">
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
