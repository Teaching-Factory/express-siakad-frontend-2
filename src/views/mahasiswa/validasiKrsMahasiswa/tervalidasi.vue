<script setup>
import axios from 'axios';
import { FilterMatchMode } from 'primevue/api';
import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { API_URL } from '../../../config/config';
import { getToken } from '../../../service/auth';
import { get } from '../../../utiils/request';

const first = ref(0);
const krsTervalidasi = ref([]);
const route = useRoute();
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nama_mahasiswa: { value: null, matchMode: FilterMatchMode.EQUALS },
    nim: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_program_studi: { value: null, matchMode: FilterMatchMode.EQUALS },
    total_sks: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_status_mahasiswa: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const fetchKrsTervalidasi = async () => {
    const id_prodi = route.params.id_prodi; // Ambil id_prodi dari URL
    const id_semester = route.params.id_semester; // Ambil id_semester dari URL

    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await get(`krs-mahasiswa/${id_prodi}/${id_semester}/get-mahasiswa-krs-tervalidasi`);
        krsTervalidasi.value = response.data.data;
        Swal.close();
    } catch (error) {
        console.error('Gagal mengambil data:', error);
        Swal.close();
    }
};

const batalkanValidasi = async (id_registrasi_mahasiswa) => {
    try {
        const token = getToken();
        const prodiId = route.params.id_prodi;
        const semesterId = route.params.id_semester;

        const url = `${API_URL}/krs-mahasiswa/${prodiId}/${semesterId}/${id_registrasi_mahasiswa}/batalkan-validasi-krs`;

        const response = await axios.put(
            url,
            {}, // Body permintaan
            {
                headers: {
                    Authorization: token
                }
            }
        );

        Swal.fire('BERHASIL!', 'KRS Berhasil di Batalkan.', 'success').then(() => {
            window.location.reload();
        });
        console.log('Status berhasil diperbarui:', response.data);
    } catch (error) {
        console.error('Gagal memperbarui status:', error);
    }
};

const onPageChange = (event) => {
    first.value = event.first;
};

// Panggil fetchKrsTervalidasi saat komponen dimuat
onMounted(() => {
    fetchKrsTervalidasi();
});
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>KRS MAHASISWA YANG TERVALIDASI</h5>
        <div class="card">
            <DataTable
                v-model:filters="filters"
                :globalFilterFields="['nama_mahasiswa', 'nim', 'Prodi.nama_program_studi', 'total_sks', 'nama_status_mahasiswa', 'statusvalidasi']"
                :value="krsTervalidasi"
                :paginator="true"
                :rows="10"
                dataKey="id_registrasi_mahasiswa"
                :rowHover="true"
                showGridlines
                :first="first"
                @page="onPageChange"
            >
                <template #header>
                    <div class="row">
                        <div class="col-lg-6 d-flex justify-content-start">
                            <IconField iconPosition="left">
                                <InputIcon class="pi pi-search" />
                                <InputText placeholder="Cari disini" v-model="filters['global'].value" style="width: 100%" />
                            </IconField>
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
                <Column filterField="nim" header="NIM" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nim }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_mahasiswa" header="Nama Mahasiswa" style="min-width: 14rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nama_mahasiswa }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_program_studi" header="Program Studi" style="min-width: 15rem">
                    <template #body="{ data }">
                        {{ data.Prodi.nama_program_studi }}
                    </template>
                </Column>
                <Column filterField="total_sks" header="Jumlah SKS" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.total_sks_mata_kuliah }}
                    </template>
                </Column>
                <Column filterField="nama_status_mahasiswa" header="Status Mahasiswa" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.nama_status_mahasiswa }}
                    </template>
                </Column>
                <Column header="Aksi" style="min-width: 10rem">
                    <template #body="{ data }">
                        <router-link :to="`/validasi-krs-mahasiswa/detailKRS/${data.id_registrasi_mahasiswa}`" class="btn btn-outline-primary me-2 py-1 px-2" title="Detai Krs">
                            <i class="pi pi-pencil"></i>
                        </router-link>
                        <button @click="batalkanValidasi(data.id_registrasi_mahasiswa)" class="btn btn-outline-danger py-1 px-2" title="Batalkan Krs">
                            <i class="pi pi-times"></i>
                        </button>
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
