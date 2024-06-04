<script setup>
import { ref, onBeforeMount } from 'vue';
import Swal from 'sweetalert2';
import { FilterMatchMode } from 'primevue/api';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    judul: { value: null, matchMode: FilterMatchMode.EQUALS },
    deskripsi: { value: null, matchMode: FilterMatchMode.EQUALS },
    penulis: { value: null, matchMode: FilterMatchMode.EQUALS },
    tanggalpembuatan: { value: null, matchMode: FilterMatchMode.EQUALS },
    kategori: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const customer1 = ref([]);
const loading1 = ref(false);

onBeforeMount(() => {
    customer1.value = [
        {
            no: '1',
            judul: 'Informasi MKI',
            deskripsi: 'Pelaksanakan MKI',
            penulis: 'Dosen',
            tanggalpembuatan: '12/09/2024',
            kategori: 'Pengumuman',
            aksi: ''
        },
        {
            no: '2',
            judul: 'Informasi MKI',
            deskripsi: 'Pelaksanakan MKI',
            penulis: 'Dosen',
            tanggalpembuatan: '12/09/2024',
            kategori: 'Pengumuman',
            aksi: ''
        }
        // Add more dummy data here
    ];
});
const confirmDelete = (no) => {
    Swal.fire({
        title: 'Apa Kamu Yakin?',
        text: 'Data ini akan dihapus',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, saya yakin!',
        cancelButtonText: 'Batal',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            deleteItem(no);
            Swal.fire('BERHASIL!', 'Data berhasil dihapus.', 'success');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('BATAL', 'Data Anda Tidak Jadi Dihapus', 'error');
        }
    });
};

const deleteItem = (no) => {
    customer1.value = customer1.value.filter((item) => item.no !== no);
};
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>DAFTAR BERITA</h5>
        <div class="card">
            <DataTable v-model:filters="filters" :globalFilterFields="['judul', 'deskripsi', 'penulis', 'tanggalpembuatan', 'kategori']" :value="customer1" :paginator="true" :rows="10" dataKey="id" :rowHover="true" :loading="loading1" showGridlines>
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
                                <router-link to="/daftar-berita/create" class="btn btn-primary"> <i class="pi pi-plus me-2"></i> Tambah</router-link>
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
                <Column filterField="judul" header="Judul" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.judul }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="deskripsi" header="Deskripsi Pendek" style="min-width: 15rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.deskripsi }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="penulis" header="Penulis" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.penulis }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="tanggalpembuatan" header="Tanggal Pembuatan" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.tanggalpembuatan }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="kategori" header="Kategori" style="min-width: 5rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.kategori }}</span>
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
