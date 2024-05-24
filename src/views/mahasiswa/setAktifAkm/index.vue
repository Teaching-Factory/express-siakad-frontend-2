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
            no: 'checkbox',
            nim: '12345678',
            name: 'John Doe',
            prodi: 'S1 Teknik Informatika',
            semester: '2023/2024 Genap',
            statusakm: 'Aktif',
        },{
            no: 'checkbox',
            nim: '12345678',
            name: 'John Doe',
            prodi: 'S1 Teknik Informatika',
            semester: '2023/2024 Genap',
            statusakm: 'Aktif',
        }
        // Add more dummy data here
    ];
})
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>SET AKTIF AKTIVITAS KULIAH MAHASISWA PERIODE 2021/2022 GENAP</h5>
            <div class="card" style="padding: 0rem 1rem 0rem 1rem">
                <div class="row">
                    <div class="col-12 col-md-6 col-lg-12">
                        <h6 class="text-dark">Keterangan :</h6>
                        <p class="lh-1 text-small">
                            <ol>
                                <li>AKM dapat diset Aktif ketika sudah pernah ditambahkan / set status Non-aktif</li>
                                <li>Tidak Ada Jenis Tagihan yang menjadi syarat KRS, bila ingin meng-set tagihan yang menjadi flag KRS hubungi admin keuangan</li>
                                <li>Data mahasiswa di bawah adalah mahasiswa yang belum terdaftar sebagai mahasiswa Lulus / Drop Out</li>
                            </ol>
                        </p>
                    </div>
                </div>
            </div>
            <div class="card">
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
                                <button class="btn btn-primary"> <i class="pi pi-check me-2"></i> Set Aktif</button>
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
                <Column header="NIM" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nim }}</span>
                        </div>
                    </template>
                </Column>
                <Column header="Nama Mahasiswa" style="min-width: 14rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.name }}</span>
                        </div>
                    </template>
                </Column>
                <Column header="Program Studi" style="min-width: 15rem">
                    <template #body="{ data }">
                        {{ data.prodi }}
                    </template>
                </Column>
                <Column header="Semester" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.semester }}
                    </template>
                </Column>
                <Column header="Status AKM" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.statusakm }}
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
