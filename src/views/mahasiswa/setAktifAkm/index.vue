<script setup>
import { ref, onBeforeMount } from 'vue';
import { get } from '../../../utiils/request';
import { FilterMatchMode } from 'primevue/api';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nama_mahasiswa: { value: null, matchMode: FilterMatchMode.EQUALS },
    nim: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_program_studi: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_semester: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_status_mahasiswa: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const aktivitasKuliahMahasiswas = ref([]);
const loading1 = ref(true);
const selectedMhs = ref([]);

const aktivitasKuliahMahasiswa = async () => {
    try {
        const response = await get('aktivitas-kuliah-mahasiswa');
        aktivitasKuliahMahasiswas.value = response.data.data;
        loading1.value = false;
    } catch (error) {
        console.error('Gagal mengambil data Aktivitas Mahawiswa:', error);

        loading1.value = false;

        aktivitasKuliahMahasiswa.value = [];
    }
};

onBeforeMount(() => {
    aktivitasKuliahMahasiswa();
});
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
                    <DataTable v-model:filters="filters" :globalFilterFields="['Mahasiswa.nama_mahasiswa', 'Mahasiswa.nim', 'Prodi.nama_program_studi', 'Semester.nama_semester', 'StatusMahasiswa.nama_status_mahasiswa ']"
                :value="aktivitasKuliahMahasiswas"
                v-model:selection="selectedMhs"
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
                                <InputText placeholder="Cari disini" v-model="filters['global'].value" style="width: 100%" />
                            </IconField>
                        </div>
                        <div class="col-lg-6 d-flex justify-content-end">
                            <div class="flex justify-content-end gap-2">
                                <!-- <button class="btn btn-outline-primary"> <i class="pi pi-print me-2"></i>Export</button>
                                <button class="btn btn-success"> <i class="pi pi-plus me-2"></i> Tambah</button> -->
                                <!-- <button class="btn btn-danger"> <i class="pi pi-refresh me-2"></i> Sinkronkan</button> -->
                                <button class="btn btn-secondary"> <i class="pi pi-check me-2"></i> Set Aktif</button>
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
                <Column filterField="nim" header="NIM" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.Mahasiswa.nim }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_mahasiswa" header="Nama Mahasiswa" style="min-width: 14rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.Mahasiswa.nama_mahasiswa }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_program_studi" header="Program Studi" style="min-width: 15rem">
                    <template #body="{ data }">
                        {{ data.Prodi.nama_program_studi }}
                    </template>
                </Column>
                <Column filterField="nama_semester" header="Semester" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.Semester.nama_semester }}
                    </template>
                </Column>
                <Column filterField="nama_status_mahasiswa" header="Status AKM" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.StatusMahasiswa.nama_status_mahasiswa }}
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
