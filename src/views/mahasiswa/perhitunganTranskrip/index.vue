<script setup>
import { ref, onBeforeMount } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { get } from '../../../utiils/request';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    prodi: { value: null, matchMode: FilterMatchMode.EQUALS },
    jumlahmhs: { value: null, matchMode: FilterMatchMode.EQUALS },
    perubahanterakhir: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const customer1 = ref([]);
const loading1 = ref(false);
const selectedAngkatan = ref('');
const angkatans = ref([]);
const fetchAngkatan = async () => {
    try {
        const response = await get('angkatan');
        angkatans.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};

onBeforeMount(() => {
    fetchAngkatan();
    customer1.value = [
        {
            no: '1',
            prodi: 'S1 Teknik Informatika',
            jumlahmhs: '24',
            perubahanterakhir: '2024-05-20 14:08:11',
            aksi: `
            <div class="actions gap-2">
                <input type="checkbox" id="actionCheckbox" name="actionCheckbox" class="form-check-input">
            </div>`
        },
        {
            no: '2',
            prodi: 'S1 Teknik Mesin',
            jumlahmhs: '24',
            perubahanterakhir: '2024-05-20 14:08:11',
            aksi: `
            <div class="actions gap-2">
                <input type="checkbox" id="actionCheckbox" name="actionCheckbox" class="form-check-input">
            </div>`
        }
        // Add more dummy data here
    ];
});
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>PERHITUNGAN TRANSKRIP</h5>
            <div class="card" style="padding: 0rem 1rem 0rem 1rem">
                <div class="row">
                    <div class="col-12 col-md-6 col-lg-12">
                        <h6 class="text-dark">Keterangan :</h6>
                        <p class="lh-1 text-small">
                            <ul>
                                <li>Data ini menunjukkan jumlah mahasiswa yang terdaftar setiap angkatan, baik yang sudah lulus/DO ataupun belum</li>
                                <li>Fitur ini di gunakan untuk menghitung nilai mahasiswa dan akan di simpan menjadi transkrip mahasiswa</li>
                                <li>Mahasiswa yang telah mengulang matakuliah, akan di hitungkan menjadi 1 matakuliah terbaik yang akan masuk ke dalam transkrip</li>
                                <li>Nilai yang dihitung pada halaman ini akan otomatis masuk kedalam perhitungan transkrip Feeder</li>
                                <li>Setting nilai terbaru atau tertinggi di Feeder dimenu Pengaturan -> Pengaturan Transkrip (NEW UPDATE!!)</li>
                            </ul>
                        </p>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="row">
                    <div class="col-lg-10 col-md-6 col-sm-6">
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Angkatan</label>
                            <select v-model="selectedAngkatan" class="form-select" aria-label="Default select example">
                                <option  value="" selected disabled hidden>Pilih Angkatan</option>
                                <option v-for="angkatan in angkatans" :key="angkatan.id" :value="angkatan.id">{{angkatan.tahun}}</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px;">
                        <button class="btn btn-primary btn-block" style="width: 100%;">Tampilkan</button>
                    </div>
                    </div>
                    <hr>

                    <DataTable v-model:filters="filters" :globalFilterFields="[ 'prodi', 'jumlahmhs', 'perubahanterakhir  ']"
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
                                <InputText placeholder="Cari disini" v-model="filters['global'].value" style="width: 100%" />
                            </IconField>
                        </div>
                        <div class="col-lg-6 d-flex justify-content-end">
                            <div class="flex justify-content-end gap-2">
                                <button class="btn btn-secondary"> <i class="pi pi-check me-2"></i> Hitung Transkrip Mahasiswa</button>
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
                <Column filterField="prodi" header="Program Studi" style="min-width: 15rem">
                    <template #body="{ data }">
                        {{ data.prodi }}
                    </template>
                </Column>
                <Column filterField="jumlahmhs" header="Jumlah Mahasiswa" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.jumlahmhs }}
                    </template>
                </Column>
                <Column filterField="perubahanterakhir" header="Perubahan Terakhir" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.perubahanterakhir }}
                    </template>
                </Column>
                <Column header="Aksi" style="min-width: 5rem">
                    <template #body="{ data }">
                        <div v-html="data.aksi"></div>
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
