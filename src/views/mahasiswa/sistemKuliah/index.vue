<script setup>
import { ref, onBeforeMount } from 'vue';
import { FilterMatchMode } from 'primevue/api';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.EQUALS },
    nim: { value: null, matchMode: FilterMatchMode.EQUALS },
    email: { value: null, matchMode: FilterMatchMode.EQUALS },
    jeniskelamin: { value: null, matchMode: FilterMatchMode.EQUALS },
    tanggallahir: { value: null, matchMode: FilterMatchMode.EQUALS },
    angkatan: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const customer1 = ref([]);
const loading1 = ref(false);
const selectedMhs = ref([]);

onBeforeMount(() => {
    customer1.value = [
        {
            name: 'John Doe',
            nim: '12345678',
            email: 'coba@gmail.com',
            angkatan: 2021,
            jeniskelamin: 'Perempuan',
            tanggallahir: '18/05/2002',
            namaibu: 'Supin'
        },
        {
            name: 'John Doe',
            nim: '87654321',
            email: 'coba@gmail.com',
            angkatan: 2021,
            jeniskelamin: 'Perempuan',
            tanggallahir: '18/05/2002',
            namaibu: 'Supin'
        }
        // Add more dummy data here
    ];
});
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>SET SISTEM KULIAH MAHASISWA</h5>
        <div class="card" style="padding: 0rem 1rem 0rem 1rem">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-12">
                    <h6 class="text-dark">Keterangan :</h6>
                    <p class="lh-1 text-small">
                        <ol>
                            <li>Pada pilihan sistem kuliah pilihan kosong akan keluar jika mahasiswa belum pernah di setting sistem kuliah.</li>
                            <li>Jika anda sudah melakukan setting sistem kuliah anda tidak dapat menghilangkan sistem kuliah mahasiswa.</li>
                            <li>Data yang akan diproses (ketika anda melakukan proses simpan) sesuai dengan data yang ditampilkan.</li>
                            <li>Jika anda ingin melakukan simpan banyak data sekaligus silahkan tampilkan lebih banyak data.</li>
                            <li>Sistem kuliah berfungsi untuk mengelompokkan mahasiswa sesuai dengan status mahasiswa di perguruan tinggi dan untuk menentukan nominal tagihan perkuliahan mahasiswa pada role admin keuangan</li>
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
                <div class="col-lg-2 col-md-6 col-sm-6">
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
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="">
                        <label for="exampleFormControlInput1" class="form-label">Sistem Kuliah</label>
                        <select class="form-select" aria-label="Default select example">
                            <option selected disabled hidden>Sistem Kuliah</option>
                            <option value="1">Reguler</option>
                            <option value="2">Karyawan</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px;">
                    <button class="btn btn-primary btn-block" style="width: 100%;">Tampilkan</button>
                </div>
                </div>
                <hr/>
            <DataTable v-model:filters="filters" :globalFilterFields="['name', 'nim', 'email', 'jeniskelamin', 'tanggallahir', 'angkatan']"
                :value="customer1"
                v-model:selection="selectedMhs"
                :paginator="true"
                :rows="10"
                dataKey="id"
                :rowHover="true"
                :loading="loading1"
                showGridlines
            >
                <template #header>
                    <div class="flex justify-content-between flex-column sm:flex-row">
                        <IconField iconPosition="left">
                            <InputIcon class="pi pi-search" />
                            <InputText placeholder="Cari disini" v-model="filters['global'].value" style="width: 100%" />
                        </IconField>
                    </div>
                </template>

                <template #empty>
                    <div class="text-center">Tidak ada data.</div>
                </template>
                <template #loading>
                    Loading customers data. Please wait.
                </template>
                <Column selectionMode="multiple" headerStyle="width: 3em"></Column>
                <Column filterField="name" header="Nama Mahasiswa" style="min-width: 14rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.name }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nim" header="NIM" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nim }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="email" header="Email" style="min-width: 15rem">
                    <template #body="{ data }">
                        {{ data.email }}
                    </template>
                </Column>
                <Column filterField="angkatan" header="Angkatan" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.angkatan }}
                    </template>
                </Column>
                <Column filterField="jeniskelamin" header="Jenis Kelamin" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.jeniskelamin }}
                    </template>
                </Column>
                <Column filterField="tanggallahir" header="Tanggal Lahir" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.tanggallahir }}
                    </template>
                </Column>
                <Column filterField="namaibu" header="Nama Ibu" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.namaibu }}
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
