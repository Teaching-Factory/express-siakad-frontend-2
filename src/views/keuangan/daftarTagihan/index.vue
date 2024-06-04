<script setup>
import { ref, onBeforeMount } from 'vue';
import Swal from 'sweetalert2';
const customer1 = ref([]);
const loading1 = ref(false);

onBeforeMount(() => {
    customer1.value = [
        {
            no: '1',
            id: '098765456789876',
            nim: '12345678',
            name: 'John Doe',
            jenistagihan: 'SPP',
            periode: '2020/2021 Genap',
            nominal: 'Rp. 2.400.000,-',
            statustagihan: '',
            aksi: '',
        }
        // Add more dummy data here
    ];
})
const confirmDelete = (no) => {
    Swal.fire({
        title: 'Apa Kamu Yakin?',
        text: 'Data ini akan dihapus',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, saya yakin!',
        cancelButtonText: 'Batal',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            deleteItem(no);
            Swal.fire(
                'BERHASIL!',
                'Data berhasil dihapus.',
                'success'
            );
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            Swal.fire(
                'BATAL',
                'Data Anda Tidak Jadi Dihapus',
                'error'
            );
        }
    });
};

const deleteItem = (no) => {
    customer1.value = customer1.value.filter(item => item.no !== no);
};
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
                                <router-link to="/daftar-tagihan/create" class="btn btn-secondary"> <i class="pi pi-plus me-2"></i> Tambah </router-link>
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
                <Column field="no" header="ID Tagihan" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.id }}
                    </template>
                </Column>
                <Column header="NIM" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nim }}</span>
                        </div>
                    </template>
                </Column>
                <Column header="Nama" style="min-width: 10rem">
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
                <Column header="Periode" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.periode }}
                    </template>
                </Column>
                <Column header="Nominal" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.nominal }}
                    </template>
                </Column>
                <Column header="Status Tagihan" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="actions gap-2">
                            <button class="btn btn-primary">Belum Lunas</button>
                        </div>
                    </template>
                </Column>
                <Column header="Aksi" style="min-width: 10rem">
                    <template #body="{ data }">
                        <router-link to="/daftar-tagihan/create" class="btn btn-outline-primary me-2"> <i class="pi pi-pencil"></i></router-link>
                        <button class="btn btn-outline-danger" @click="confirmDelete(data.no)">
                            <i class="pi pi-trash"></i>
                        </button>
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
