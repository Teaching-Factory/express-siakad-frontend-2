<script setup>
import { ref, onBeforeMount } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { get } from '../../../utiils/request';
import Swal from 'sweetalert2';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nama_prodi: { value: null, matchMode: FilterMatchMode.EQUALS },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    jumlahMahasiswa: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const first = ref(0);
const statusMahasiswa = ref([]);
const semesterAktif = ref([]);

const fetchSemesterAktif = async () => {
    const response = await get('semester-aktif/get-semester-aktif-now');
    semesterAktif.value = response.data.data;
};

const fetchStatusMahasiswa = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await get('status-mahasiswa/get-prodi-with-mahasiswa-belum-sk');
        statusMahasiswa.value = response.data.data;
        console.log(response.data.data);
        Swal.close();
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};

const onPageChange = (event) => {
    first.value = event.first;
};

onBeforeMount(() => {
    fetchStatusMahasiswa();
    fetchSemesterAktif();
});
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>SET STATUS MAHASISWA - PERIODE {{semesterAktif[0]?.Semester?.nama_semester}}</h5>
        <div class="card" style="padding: 0rem 1rem 0rem 1rem">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-12">
                    <h6 class="text-dark">Keterangan :</h6>
                    <p class="lh-1 text-small">
                        <ol>
                            <li>Data dibawah menunjukkan jumlah mahasiswa yang belum terdaftar sebagai mahasiswa Lulus / Drop Out</li>
                            <li>Pastikan kodeprodi yang anda inputkan sesuai dengan daftar referensi program studi pada Feeder</li>
                            <li>Fitur ini membantu admin untuk meminimalisasi adanya mahasiswa yang tidak memiliki status di periode berlaku</li>
                            <li>Status mahasiswa akan berubah menjadi aktif ketika melakukan validasi pembayaran / KRS</li>
                            <li>Fitur ini hanya di gunakan di setiap awal periode semester</li>
                        </ol>
                    </p>
                </div>
            </div>
        </div>
        <DataTable v-model:filters="filters" :globalFilterFields="['nama_prodi', 'status', 'jumlahMahasiswa']"
            :value="statusMahasiswa"
            :paginator="true"
            :rows="10"
            dataKey="id"
            :rowHover="true"
            showGridlines
            :first="first" @page="onPageChange"
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
            <Column header="No" headerStyle="width:3rem">
                <template #body="slotProps">
                    {{ first + slotProps.index + 1 }}
                </template>
            </Column>
            <Column filterField="nama_prodi" header="Program Studi" style="min-width: 20rem">
                <template #body="{ data }">
                    {{ data.nama_prodi }}
                </template>
            </Column>
            <Column filterField="status" header="Status Prodi" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ data.status }}
                </template>
            </Column>
            <Column filterField="jumlahMahasiswa" header="Total Mahasiswa Belum di SET" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ data.jumlahMahasiswa }}
                </template>
            </Column>
            <Column filterField="aksi" field="aksi" header="Aksi" style="min-width: 12rem">
                <template #body="{ data }">
                        <router-link :to="`/status-mahasiswa/${data.id_prodi}`" class="btn btn-primary rounded-3"> 
                            <p style="font-size: small;">
                                <i class="pi pi-pencil me-2"></i>
                                Set Status
                            </p>
                        </router-link>
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
