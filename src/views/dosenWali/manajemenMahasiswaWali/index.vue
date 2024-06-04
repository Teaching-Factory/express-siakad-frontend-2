<script setup>
import { ref, onBeforeMount } from 'vue';
import Swal from 'sweetalert2';
import { FilterMatchMode } from 'primevue/api';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nim: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama: { value: null, matchMode: FilterMatchMode.EQUALS },
    prodi: { value: null, matchMode: FilterMatchMode.EQUALS },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    angkatan: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const customer1 = ref([]);
const loading1 = ref(false);

onBeforeMount(() => {
    customer1.value = [
        {
            no: '1',
            nim: '362055401012',
            nama: 'Aida Andinar Maulidiana',
            prodi: 'S1 Teknik Informatika',
            status: 'Aktif',
            angkatan: '2023/2024 Genap',
            aksi: ''
        },
        {
            no: '2',
            nim: '362055401012',
            nama: 'Aida Andinar Maulidiana',
            prodi: 'S1 Teknik Informatika',
            status: 'Aktif',
            angkatan: '2023/2024 Genap',
            aksi: ''
        }
        // Add more dummy data here
    ];
});
const confirmDelete = (no) => {
    Swal.fire({
        title: 'Apa Kamu yakin',
        text: 'Ini Aida Andinar Maulidiana',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, saya yakin!',
        cancelButtonText: 'Batal',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            deleteItem(no);
            Swal.fire('Berhasil!', 'Data berhasil dihapus.', 'success');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('Berhasil', 'Data Anda Tidak Jadi Dihapus', 'error');
        }
    });
};

const deleteItem = (no) => {
    customer1.value = customer1.value.filter((item) => item.no !== no);
};
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>MANAJEMEN MAHASISWA WALI</h5>
        <div class="card">
            <div class="row">
                <div class="col-lg-5 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">NIDN/Nama Dosen</label>
                        <select class="form-select" aria-label="Default select example">
                            <option selected disabled hidden>Ketikkan NIDN/Nama Dosen disini</option>
                            <option value="1">Teknologi Ternak</option>
                            <option value="2">Teknologi Basis Data</option>
                            <option value="3">Perikanan</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-5 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Semester KRS</label>
                        <select class="form-select" aria-label="Default select example">
                            <option selected disabled hidden>--Pilih Semester KRS--</option>
                            <option value="1">2020/2021 Genap</option>
                            <option value="2">2020/2021 Ganjil</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px">
                    <button class="btn btn-primary btn-block" style="width: 100%">Tampilkan</button>
                </div>
            </div>

            <div class="row mt-3 mb-3">
                <div class="col-lg-12 col-md-6 col-lg-6">
                    <div class="alert alert-secondary text-center" role="alert">
                        <h5 class="text-dark text-center">072563791037 - LUKMAN HAKIM | | SEMESTER : 2021/2022 GENAP</h5>
                    </div>
                </div>
            </div>

            <DataTable v-model:filters="filters" :globalFilterFields="['nim', 'nama', 'prodi', 'status', 'angkatan']" :value="customer1" :paginator="true" :rows="10" dataKey="id" :rowHover="true" :loading="loading1" showGridlines>
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
                                <router-link to="/daftar-dosen-wali" class="btn btn-secondary"> <i class="pi pi-bars me-2"></i> Daftar Dosen Wali</router-link>
                                <router-link to="/set-kolektif-dosenwali" class="btn btn-primary"> <i class="pi pi-plus me-2"></i> Set Mahasiswa Kolektif</router-link>
                            </div>
                        </div>
                    </div>
                </template>

                <template #empty>
                    <div class="text-center">Tidak ada data.</div>
                </template>
                <template #loading> Loading customers data. Please wait. </template>
                <Column field="no" header="No" style="min-width: 5rem">
                    <template #body="{ data }">
                        {{ data.no }}
                    </template>
                </Column>
                <Column filterField="nim" header="NIM" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nim }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama" header="Nama" style="min-width: 15rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nama }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="prodi" header="Program Studi" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.prodi }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="status" header="Status" style="min-width: 5rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.status }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="angkatan" header="Angkatan" style="min-width: 5rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.angkatan }}</span>
                        </div>
                    </template>
                </Column>
                <Column header="Aksi" style="min-width: 5rem">
                    <template #body="{ data }">
                        <button class="btn btn-outline-danger" @click="confirmDelete(data.no)">
                            <i class="pi pi-trash"></i>
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
