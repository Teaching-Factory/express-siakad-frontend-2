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
            id: 1,
            no: 1,
            daftarjabatan: 'Rektor',
            nama: 'Sukadi',
            nip: '09876545678987',
        },
        {
            id: 2,
            no: 2,
            daftarjabatan: 'Dosen',
            nama: 'Lukman Hakim',
            nip: '09876545678987',
        },
    ];
});
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>DAFTAR UNIT JABATAN</h5>
        <div class="card">
            <div class="row">
                <div class="col-lg-10 col-md-6 col-sm-6">
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
                <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px;">
                    <button class="btn btn-primary btn-block" style="width: 100%;">Tampilkan</button>
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
                                <button class="btn btn-secondary"> <i class="pi pi-pencil me-2"></i> Edit</button>
                            </div>
                        </div>
                    </div>
                </template>


            <template #empty>
                <div class="text-center">Tidak ada data.</div>
            </template>
            <template #loading>Loading data. Please wait.</template>
            <Column field="no" header="No" style="min-width: 5rem">
                <template #body="{ data }">
                    {{ data.no }}
                </template>
            </Column>
            <Column header="Daftar Jabatan" style="min-width: 15rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span>{{ data.daftarjabatan }}</span>
                    </div>
                </template>
            </Column>
            <Column header="Nama Penandatangan" style="min-width: 20rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span>{{ data.nama}}</span>
                    </div>
                </template>
            </Column>
            <Column header="NIP" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ data.nip }}
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
