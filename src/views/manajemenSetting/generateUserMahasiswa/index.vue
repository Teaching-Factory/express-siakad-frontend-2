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
        <h5><i class="pi pi-user me-2"></i>GENERATE USERNAME DAN PASSWORD MAHASISWA AKTIF</h5>
        <div class="card" style="padding: 0rem 1rem 0rem 1rem">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-12">
                    <h6 class="text-dark">Keterangan :</h6>
                    <p class="lh-1 text-small">
                        <ol>
                            <li>Fitur ini digunakan untuk melakukan generate Username & Password Mahasiswa di Go Feeder.</li>
                            <li>Default user yang di-generate untuk username : NIM & password : tanggal lahir dengan format yyyy-mm-dd (tanda '-' dihilangkan). Contoh : 1997-02-03 = 19970203.</li>
                            <li>Daftar mahasiswa yang sudah terdaftar di Forlap & berstatus AKTIF.</li>
                            <li>Untuk melihat daftar user klik disini.</li>
                        </ol>
                    </p>
                </div>
            </div>
        </div>

        <div class="car">
            <div class="row">
                <div class="col-lg-5 col-md-6 col-sm-6">
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
                <div class="col-lg-5 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Angkatan</label>
                        <select class="form-select" aria-label="Default select example">
                            <option selected disabled hidden>Angkatan</option>
                            <option value="1">2020</option>
                            <option value="2">2021</option>
                            <option value="3">2022</option>
                            <option value="4">2023</option>
                            <option value="5">2024</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px;">
                    <button class="btn btn-primary btn-block" style="width: 100%;">Tampilkan</button>
                </div>
                </div>
                <hr/>

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
                            <!-- <button class="btn btn-danger"> <i class="pi pi-refresh me-2"></i> Sinkronkan</button>-->
                            <button class="btn btn-secondary"> <i class="pi pi-check me-2"></i> Generate</button> 
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
    </div>
</template>

<style scoped>
.card-theme {
    background-color: rgba(154, 160, 172, 0.5);
}
</style>
