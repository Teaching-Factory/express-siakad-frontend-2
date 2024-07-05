<script setup>
import { ref, onBeforeMount } from 'vue';
import { get, postData } from '../../../utiils/request';
import { FilterMatchMode } from 'primevue/api';
import Swal from 'sweetalert2';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nim: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_mahasiswa: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_program_studi: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_periode_masuk: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const belumSetSistemKuliahs = ref([]);
// const loading1 = ref(true);
const first = ref(0);
const sistemKuliahs = ref([]);
const selectedSistemKuliah = ref([]);

const belumSetSistemKuliah = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await get('sistem-kuliah-mahasiswa/mahasiswa/not-set-sk/get'); // Memanggil fungsi get dengan endpoint 'belumSetSistemKuliah'
        console.log(response.data.data);
        belumSetSistemKuliahs.value = response.data.data;
        Swal.close();
        // loading1.value = false;
    } catch (error) {
        console.error('Gagal mengambil data Unsur Penilaian:', error);
    }
};

const fetchSistemKuliah = async () => {
    try {
        const response = await get('sistem-kuliah');
        sistemKuliahs.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data prodi:', error);
    }
};
const setSistemKuliah = async () => {
    try {
        const dataToSubmit = {
            mahasiswas: Object.entries(selectedSistemKuliah.value).map(([id_registrasi_mahasiswa, id_sistem_kuliah]) => ({
                id_registrasi_mahasiswa,
                id_sistem_kuliah
            }))
        };

        const response = await postData('sistem-kuliah-mahasiswa/mahasiswa/not-set-sk/create', dataToSubmit);
        console.log('Berhasil menambahkan sistem kuliah:', response.data);
        // Refresh data
        Swal.fire('BERHASIL!', 'Data berhasil ditambahkan.', 'success').then(() => {
            window.location.href = '/belum-set-sk';
        });
    } catch (error) {
        console.error('Gagal menambahkan data:', error);
    }
};

const onPageChange = (event) => {
    first.value = event.first;
};

onBeforeMount(() => {
    belumSetSistemKuliah();
    fetchSistemKuliah();
});
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>MAHASISWA YANG BELUM SET SISTEM KULIAH</h5>
        <div class="card">
            <DataTable
                v-model:filters="filters"
                :globalFilterFields="['nim', 'nama_mahasiswa', 'Prodi.nama_program_studi', 'nama_periode_masuk']"
                :value="belumSetSistemKuliahs"
                :first="first"
                @page="onPageChange"
                :paginator="true"
                :rows="10"
                dataKey="id"
                :rowHover="true"
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
                                <button @click="setSistemKuliah" class="btn btn-secondary"><i class="pi pi-check me-2"></i> Set Sistem Kuliah</button>
                            </div>
                        </div>
                    </div>
                </template>

                <template #empty>
                    <div class="text-center">Tidak ada data.</div>
                </template>
                <!-- <template #loading> Loading data. Please wait. </template> -->
                <Column header="No" headerStyle="width:3rem">
                    <template #body="slotProps">
                        {{ first + slotProps.index + 1 }}
                    </template>
                </Column>
                <Column filterField="nama_program_studi" header="Program Studi" style="min-width: 15rem">
                    <template #body="{ data }">
                        {{ data.Prodi?.nama_program_studi || '-' }}
                    </template>
                </Column>
                <Column filterField="nama_periode_masuk" header="Angkatan" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.nama_periode_masuk }}
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
                <Column header="Sistem Kuliah" style="min-width: 15rem">
                    <template #body="{ data }">
                        <select class="form-select" v-model="selectedSistemKuliah[data.id_registrasi_mahasiswa]">
                            <option value="">--Pilih Sistem Kuliah</option>
                            <option v-for="sistemKuliah in sistemKuliahs" :key="sistemKuliah.id" :value="sistemKuliah.id">{{ sistemKuliah.nama_sk }}</option>
                        </select>
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
