<script setup>
import { ref, onBeforeMount } from 'vue';

const customer1 = ref([]);
const loading1 = ref(false);
const selectedMhs = ref([]);

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
            nim: '362055401012',
            nama: 'Aida Andinar Maulidiana',
            prodi: 'S1 Teknik Informatika',
            status: 'Aktif',
            angkatan: '2023/2024 Genap',
            aksi: '-',
        },{
            no: 'checkbox',
            nim: '362055401012',
            nama: 'Aida Andinar Maulidiana',
            prodi: 'S1 Teknik Informatika',
            status: 'Aktif',
            angkatan: '2023/2024 Genap',
            aksi: '-',
        }
        // Add more dummy data here
    ];
})
</script>

<template>
    <div class="card" style="border-radius: none !important">
        <h5><i class="pi pi-user me-2"></i>SET KOLEKTIF MAHASISWA PESERTA KELAS</h5>
            <div class="card">
                <div class="row">
                    <div class="col-lg-2">Program Studi</div>
                    <div class="col-lg-4"> <span class="me-2">:</span> S1 Teknik Informatika</div>
                    <div class="col-lg-2">Periode</div>
                    <div class="col-lg-4"> <span class="me-2">:</span> 2020/2021 Ganjil</div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-lg-2">Mata Kuliah</div>
                    <div class="col-lg-4"> <span class="me-2">:</span> Pemrograman Terstruktur</div>
                    <div class="col-lg-2">Nama Kelas</div>
                    <div class="col-lg-4"> <span class="me-2"> :</span> A</div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-lg-2">Dosen Pengajar</div>
                    <div class="col-lg-4"> <span class="me-2">:</span> Sudarmono</div>
                    <div class="col-lg-2">Ruang dan Waktu Perkuliahan</div>
                    <div class="col-lg-4"> <span class="me-2"> :</span> Ruang G01 09.10 - 10.10</div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-lg-2">Lokasi</div>
                    <div class="col-lg-4"> <span class="me-2">:</span> Gedung G</div>
                    <div class="col-lg-2">Kapasitas Peserta Kelas</div>
                    <div class="col-lg-4"> <span class="me-2"> :</span> 40</div>
                    
                </div>

                <div class="card mt-4">
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
                                    <option value="1">2020/2021 Genap</option>
                                    <option value="2">2020/2021 Ganjil</option>
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
                                <!-- <button class="btn btn-secondary"> <i class="pi pi-bars me-2"></i> Daftar Dosen Wali</button> -->
                                <button class="btn btn-secondary"> <i class="pi pi-check me-2"></i> Simpan</button>
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
                <Column selectionMode="multiple" headerStyle="width: 3em"></Column>
                <Column header="NIM" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nim }}</span>
                        </div>
                    </template>
                </Column>
                <Column header="Nama" style="min-width: 15rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nama }}</span>
                        </div>
                    </template>
                </Column>
                <Column header="Program Studi" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.prodi }}</span>
                        </div>
                    </template>
                </Column>
                <Column header="Status" style="min-width: 5rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.status }}</span>
                        </div>
                    </template>
                </Column>
                <Column header="Angkatan" style="min-width: 5rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.angkatan }}</span>
                        </div>
                    </template>
                </Column>
                <Column header="Aksi" style="min-width: 5rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.aksi }}</span>
                        </div>
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
