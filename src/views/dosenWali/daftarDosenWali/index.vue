<script setup>
import { ref, onBeforeMount } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { get } from '../../../utiils/request';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    namadosen: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const loading1 = ref(false);
const dosenwalis = ref([]);
const tahunAjaran = ref([]);
const selectedTahunAjaran = ref('');
const first = ref(0);

const fetchTahunAjaran = async () => {
    try {
        const response = await get('tahun-ajaran');
        tahunAjaran.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};

const filterData = async () => {
    loading1.value = true;
    const tahunAjaranId = selectedTahunAjaran.value;

    if (!tahunAjaranId) {
        // console.error('Prodi atau Angkatan Mahasiswa belum dipilih');
        alert('Dosen Wali belum tersedia');
        return;
    }
    try {
        const response = await get(`dosen-wali/${tahunAjaranId}/get-dosen`);
        const tahun = response.data.data;

        dosenwalis.value = tahun;

        loading1.value = false;
    } catch (error) {
        console.error('Gagal mengambil data :', error);
        alert('Gagal mengambil data. Silakan coba lagi nanti.');
        loading1.value = false;
    }
};

const onPageChange = (event) => {
    first.value = event.first;
};

onBeforeMount(() => {
    fetchTahunAjaran();
});
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>DAFTAR DOSEN WALI PERIODE 2022/2023 GENAP</h5>
        <div class="card">
            <div class="row d-flex justify-content-between">
                <div class="col-lg-5 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Tahun Ajaran</label>
                        <select v-model="selectedTahunAjaran" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Tahun Ajaran</option>
                            <option v-for="tahun_ajaran in tahunAjaran" :key="tahun_ajaran.id_tahun_ajaran" :value="tahun_ajaran.id_tahun_ajaran">{{ tahun_ajaran.nama_tahun_ajaran }}</option>
                        </select>
                    </div>
                </div>

                <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px">
                    <button @click="filterData" class="btn btn-primary btn-block" style="width: 100%">Tampilkan</button>
                </div>
            </div>
        </div>
        <div class="card">
            <DataTable v-model:filters="filters" :globalFilterFields="['namadosen']" :value="dosenwalis" :paginator="true" :rows="10" dataKey="id" :rowHover="true" :loading="loading1" :first="first" @page="onPageChange" showGridlines>
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
                                <router-link to="/manajemen-mahasiswa-wali" class="btn btn-primary"><i class="pi pi-plus me-2"></i> Set Dosen Wali</router-link>
                            </div>
                        </div>
                    </div>
                </template>

                <template #empty>
                    <div class="text-center">Tidak ada data.</div>
                </template>
                <Column header="No" headerStyle="width:3rem">
                    <template #body="slotProps">
                        {{ first + slotProps.index + 1 }}
                    </template>
                </Column>
                <Column filterField="namadosen" header="Nama Dosen" style="min-width: 30rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nama_dosen }}</span>
                        </div>
                    </template>
                </Column>
                <Column header="Aksi" style="min-width: 5rem">
                    <template #body="{}">
                        <div class="actions gap-2">
                            <router-link to="/import-mahasiswa" class="btn btn-outline-primary"> <i class="pi pi-eye"></i></router-link>
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
