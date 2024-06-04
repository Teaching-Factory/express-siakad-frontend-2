<script setup>
import { ref, onBeforeMount } from 'vue';
import { FilterMatchMode } from 'primevue/api';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    kelas: { value: null, matchMode: FilterMatchMode.EQUALS },
    hari: { value: null, matchMode: FilterMatchMode.EQUALS },
    waktu: { value: null, matchMode: FilterMatchMode.EQUALS },
    ruang: { value: null, matchMode: FilterMatchMode.EQUALS },
    dosen: { value: null, matchMode: FilterMatchMode.EQUALS },
    jumlahmhs: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const customer1 = ref([]);
const loading1 = ref(false);

onBeforeMount(() => {
    customer1.value = [
        {
            kelas: 'Kls_C',
            hari: 'Rabu',
            waktu: '10:20 - 12:00',
            ruang: 'Ruang B.204',
            jumlahmhs: '26/40',
            dosen: 'LUKMAN HAKIM',
            detail: ''
        }
        // Add more dummy data here
    ];
});
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>DAFTAR KELAS AKTIF PERKULIAHAN</h5>
            <div class="card" style="padding: 0rem 1rem 0rem 1rem">
                <div class="row">
                    <div class="col-12 col-md-6 col-lg-12">
                        <h6 class="text-dark">Keterangan :</h6>
                        <p class="lh-1 text-small">
                            <ol>
                                <li>Fitur ini diguanakan untuk menyimpan jadwal perkuliahan yang di buka, dosen pengajar, serta peserta kelas / KRS mahasiswa setiap periode</li>
                                <li>Sebelum memasukkan dosen mengajar, pastikan dosen tersebut sudah tercatat penugasannya pada tahun ajaran yang baru</li>
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
                            <label for="exampleFormControlInput1" class="form-label">Periode</label>
                            <select class="form-select" aria-label="Default select example">
                                <option selected disabled hidden>Periode</option>
                                <option value="1">2020/2021 Genap</option>
                                <option value="2">2020/2021 Ganjil</option>
                            </select>
                        </div>
                    </div>
                        <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px;">
                            <button class="btn btn-primary btn-block" style="width: 100%;">Tampilkan</button>
                        </div>
                    </div>
                    <hr/>
                    <DataTable  v-model:filters="filters"
                :globalFilterFields="['kelas', 'hari', 'waktu', 'ruang', 'dosen', 'jumlahmhs', ]"
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
                                <button class="btn btn-secondary"> <i class="pi pi-download me-2"></i> Import Aktivitas</button>
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
                <Column filterField="kelas" header="Kelas" style="min-width: 5rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.kelas }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="hari" header="Hari" style="min-width: 5rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.hari }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="waktu" header="Waktu" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.waktu }}
                    </template>
                </Column>
                <Column filterField="ruang" header="Ruang" style="min-width: 5rem">
                    <template #body="{ data }">
                        {{ data.ruang }}
                    </template>
                </Column>
                <Column filterField="jumlahmhs" header="Jumlah Mahasiswa" style="min-width: 15rem">
                    <template #body="{ data }">
                        {{ data.jumlahmhs }}
                    </template>
                </Column>
                <Column filterField="dosen" header="Dosen Pengampu" style="min-width: 15rem">
                    <template #body="{ data }">
                        {{ data.dosen }}
                    </template>
                </Column>
                <Column header="Detail Peserta" style="min-width: 15rem">
                    <template #body="{  }">
                        <div class="actions gap-2">
                            <router-link to="#" class="btn btn-outline-primary"> <i class="pi pi-eye"></i> Detail Peserta</router-link>
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
