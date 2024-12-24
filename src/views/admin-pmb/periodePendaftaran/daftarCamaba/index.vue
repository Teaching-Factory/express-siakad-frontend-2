<script setup>
import { ref, onBeforeMount, watch } from 'vue';

import { FilterMatchMode } from 'primevue/api';
import Swal from 'sweetalert2';
import { useRoute } from 'vue-router';
import { getData } from '../../../../utiils/request';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nama_mahasiswa: { value: null, matchMode: FilterMatchMode.EQUALS },
    nim: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_status_mahasiswa: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_program_studi: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_periode_masuk: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const route = useRoute();
const first = ref(0);
const daftarPeriodeCamaba = ref([]);

const getDaftaPeriodeCamaba = async (id) => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        // Menggunakan axios untuk GET request dengan query parameters
        const response = await getData(`camaba/${id}/get-camaba`);

        const data = response.data.data;
        daftarPeriodeCamaba.value = data;

        Swal.close();
        console.log('object :', data);
    } catch (error) {
        console.error('Gagal mengambil data mahasiswa:', error);
        Swal.fire('Gagal', 'Data Mahasiswa tidak ditemukan.', 'warning').then(() => {});
    }
};

const onPageChange = (event) => {
    first.value = event.first;
};

onBeforeMount(() => {
    const id = route.params.id || route.query.id;
    if (id) {
        getDaftaPeriodeCamaba(id);
    }
});

const formatTanggal = (tanggal) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Intl.DateTimeFormat('id-ID', options).format(new Date(tanggal));
};
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>DAFTAR CALON MAHASISWA BARU || Periode {{ daftarPeriodeCamaba[0]?.PeriodePendaftaran?.nama_periode_pendaftaran }}</h5>

        <DataTable
            v-model:filters="filters"
            :globalFilterFields="['nama_mahasiswa', 'nim', 'nama_status_mahasiswa', 'Prodi.nama_program_studi', 'nama_periode_masuk']"
            :value="daftarPeriodeCamaba"
            :paginator="true"
            :rows="10"
            dataKey="id_registrasi_mahasiswa"
            :rowHover="true"
            showGridlines
            :first="first"
            @page="onPageChange"
        >
            <template #header>
                <div class="flex justify-content-between flex-column sm:flex-row">
                    <IconField iconPosition="left">
                        <InputIcon class="pi pi-search" />
                        <InputText placeholder="Keyword Search" v-model="filters['global'].value" style="width: 100%" />
                    </IconField>
                </div>
            </template>

            <template #empty>
                <div class="text-center">Tidak ada data.</div>
            </template>

            <!-- <template #loading>Loading data. Please wait.</template> -->
            <Column header="No" headerStyle="width:3rem">
                <template #body="slotProps">
                    {{ first + slotProps.index + 1 }}
                </template>
            </Column>
            <Column filterField="nomor_daftar" header="Nomor Daftar" style="min-width: 12rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span>{{ data.nomor_daftar }}</span>
                    </div>
                </template>
            </Column>
            <Column filterField="nama_lengkap" header="Nama Pendaftar" style="min-width: 14rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span>{{ data.nama_lengkap }}</span>
                    </div>
                </template>
            </Column>
            <Column filterField="nama_semester" header="Semester Pendaftaran" style="min-width: 14rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span>{{ data.PeriodePendaftaran.Semester.nama_semester }}</span>
                    </div>
                </template>
            </Column>
            <Column filterField="nama_program_studi" header="Pilihan Prodi 1" style="min-width: 15rem">
                <template #body="{ data }">
                    {{ data.Prodi?.nama_program_studi || '-' }}
                </template>
            </Column>
            <Column filterField="tanggal_pendaftaran" header="Tanggal Pendaftaran" style="min-width: 15rem">
                <template #body="{ data }">
                    {{ formatTanggal(data.tanggal_pendaftaran) }}
                </template>
            </Column>
            <Column filterField="finalisasi" header="Finalisasi" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.finalisasi ? 'Sudah' : 'Belum' }}
                </template>
            </Column>
            <Column filterField="status_berkas" header="Kelulusan Berkas" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.status_berkas ? 'Lulus' : 'Tidak Lulus' }}
                </template>
            </Column>
            <Column filterField="status_tes" header="Kelulusan Tes" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.status_tes ? 'Lulus' : 'Tidak Lulus' }}
                </template>
            </Column>
            <Column filterField="hints" header="Hints" style="min-width: 8rem">
                <template #body="{ data }">
                    {{ data.hints }}
                </template>
            </Column>
            <Column header="Aksi" style="min-width: 15rem">
                <template #body="{ data }">
                    <router-link :to="`/daftar-camaba-detail/${data.id}`" class="btn btn-outline-success me-2 py-1 px-2" title="status kelulusan">
                        <i class="pi pi-check-circle"></i>
                    </router-link>
                    <router-link :to="`/biodata-camaba/${data.id}/cetak`" class="btn btn-outline-primary me-2 py-1 px-2" title="cetak biodata">
                        <i class="pi pi-file"></i>
                    </router-link>
                    <router-link :to="`/kartu-ujian-camaba/${data.id}/cetak`" class="btn btn-outline-warning me-2 py-1 px-2" title="cetak kartu ujian">
                        <i class="pi pi-id-card"></i>
                    </router-link>
                    <button class="btn btn-outline-danger py-1 px-2" @click="confirmDelete(data.id)" title="delete">
                        <i class="pi pi-trash"></i>
                    </button>
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

