<script setup>
import { ref, onBeforeMount } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { get } from '../../../utiils/request';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nama_kelas_kuliah: { value: null, matchMode: FilterMatchMode.EQUALS },
    hari: { value: null, matchMode: FilterMatchMode.EQUALS },
    jam_mulai: { value: null, matchMode: FilterMatchMode.EQUALS },
    ruang: { value: null, matchMode: FilterMatchMode.EQUALS },
    dosen: { value: null, matchMode: FilterMatchMode.EQUALS },
    jumlah_mahasiswa: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const kelasAktif = ref([]);
const loading1 = ref(true);

const fetchKelasAktif = async () => {
    try {
        const response = await get('detail-kelas-kuliah');
        console.log(response.data.data);
        kelasAktif.value = response.data.data;
        loading1.value = false;
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};

onBeforeMount(() => {
    fetchKelasAktif();
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
                :globalFilterFields="['KelasKuliah.nama_kelas_kuliah', 'hari', 'jam_mulai', 'ruang', 'dosen', 'KelasKuliah.jumlah_mahasiswa', ]"
                :value="kelasAktif"
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
                        <!-- <div class="col-lg-6 d-flex justify-content-end">
                            <div class="flex justify-content-end gap-2">
                                <button class="btn btn-secondary"> <i class="pi pi-download me-2"></i> Import Aktivitas</button>
                            </div>
                        </div> -->
                    </div>
                </template>

                <template #empty>
                    <div class="text-center">Tidak ada data.</div>
                </template>
                <Column filterField="nama_kelas_kuliah" header="Kelas" style="min-width: 5rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.KelasKuliah.nama_kelas_kuliah }}</span>
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
                <Column filterField="jam_mulai" header="Waktu" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.jam_mulai }} - {{ data.jam_selesai }}
                    </template>
                </Column>
                <Column filterField="ruang" header="Ruang" style="min-width: 5rem">
                    <template #body="{ data }">
                        {{ data.ruang }}
                    </template>
                </Column>
                <Column filterField="jumlah_mahasiswa" header="Jumlah Mahasiswa"  style="min-width: 15rem">
                    <template #body="{ data }">
                        {{ data.KelasKuliah.jumlah_mahasiswa }}
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
