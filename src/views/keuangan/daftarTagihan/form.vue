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
            id: '987654567867564544',
            metodepembayaran: '',
            tanggalbayar: '12/12/2024',
            status: '',
            aksi: '',
            
        }
        // Add more dummy data here
    ];
})
</script>
<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-lg-4">
                    <h5><i class="pi pi-user me-2"></i>TAMBAH TAGIHAN</h5>
                </div>
            <div class="col-lg-8 d-flex justify-content-end">
                <router-link to="/daftar-tagihan" class="btn btn-dark me-2"><i class="pi pi-list me-2"></i> Kembali</router-link>
                <router-link to="/daftar-tagihan" class="btn btn-primary me-2"><i class="pi pi-check me-2"></i> Simpan</router-link>
                <router-link to="/daftar-tagihan" class="btn btn-danger"><i class="pi pi-refresh me-2"></i> Batal</router-link>
            </div>
        </div>
        <hr>
            <div class="row d-flex justify-content-center mb-3 mt-4">
                <div class="col-lg-2">
                    <label for="exampleFormControlInput1" class="form-label">Periode Tagihan</label>
                </div>
                <div class="col-lg-4">
                    <select class="form-select" aria-label="Default select example">
                        <option selected disabled hidden>--Periode Tagihan--</option>
                        <option value="1">2023</option>
                        <option value="2">2022</option>
                        <option value="3">2021</option>
                    </select>
                </div>
                <div class="col-lg-2">
                    <label for="exampleFormControlInput1" class="form-label">Tanggal Tagihan</label>
                </div>
                <div class="col-lg-4">
                    <input type="date" class="form-control" placeholder="Masukkan nim/nama mahasiswa disini">
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-2">
                    <label for="exampleFormControlInput1" class="form-label">NIM</label>
                </div>
                <div class="col-lg-4">
                    <input type="text" class="form-control" placeholder="Masukkan nim/nama mahasiswa disini">
                </div>
                <div class="col-lg-2">
                    <label for="exampleFormControlInput1" class="form-label">Jenis Tagihan </label>
                </div>
                <div class="col-lg-4">
                    <select class="form-select" aria-label="Default select example">
                        <option selected disabled hidden>--Jenis Tagihan --</option>
                        <option value="1">KKL</option>
                        <option value="2">Skripsi</option>
                        <option value="3">SPP</option>
                        <option value="3">Wisuda</option>
                    </select>
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-2">
                    <label for="exampleFormControlInput1" class="form-label">Jumlah Tagihan </label>
                </div>
                <div class="col-lg-4">
                    <input type="text" class="form-control" placeholder="Masukkan nominal disini">
                </div>
                <div class="col-lg-2">
                    <label for="exampleFormControlInput1" class="form-label">Status Pembayaran </label>
                </div>
                <div class="col-lg-4">
                    <select class="form-select" aria-label="Default select example">
                        <option selected disabled hidden>--Status Pembayaran --</option>
                        <option value="1">Belum Bayar</option>
                        <option value="2">Belum Lunas</option>
                        <option value="3">Lunas</option>
                        
                    </select>
                </div>
                
            </div>
        </div>
    </div>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>DETAIL PEMBAYARAN</h5>
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
                                <!-- <button class="btn btn-danger"> <i class="pi pi-print me-2"></i>Export</button> -->
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
                <Column header="ID Pembayaran" style="min-width: 8rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.id }}</span>
                        </div>
                    </template>
                </Column>
                <Column header="Bukti Pembayaran" style="min-width: 10rem">
                    <template #body="{ data }">
                        <!-- <div v-html="data.metodepembayaran"></div> -->
                        <router-link to="/sistem-kuliah/create" class="btn btn-outline-primary me-2"> <i class="pi pi-eye"></i></router-link>
                    </template>
                </Column>
                <Column header="Tanggal Bayar" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.tanggalbayar }}
                    </template>
                </Column>
                <Column header="Status" style="min-width: 10rem">
                    <template #body="{ data }">
                        <!-- {{ data.tanggalbayar }} -->
                        <select class="form-select" aria-label="Default select example">
                        <option selected disabled hidden>--Status Pembayaran --</option>
                        <option value="1">Diterima</option>
                        <option value="2">Ditolak Lunas</option>
                    </select>
                    </template>
                </Column>
                <Column header="Aksi" style="min-width: 10rem">
                    <template #body="{ data }">
                        <router-link to="#" class="btn btn-outline-danger me-2"> <i class="pi pi-check"></i></router-link>
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
