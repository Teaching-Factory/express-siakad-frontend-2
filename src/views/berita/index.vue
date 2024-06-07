<script setup>
import { ref, onBeforeMount } from 'vue';
import Swal from 'sweetalert2';
import { FilterMatchMode } from 'primevue/api';
import { del, get } from '../../utiils/request';

const beritas = ref([]);
const currentPage = ref(0);
const rowsPerPage = ref(10);
const loading1 = ref(false);
const message = ref('');

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    judul_berita: { value: null, matchMode: FilterMatchMode.EQUALS },
    deskripsi_pendek: { value: null, matchMode: FilterMatchMode.EQUALS },
    penulis: { value: null, matchMode: FilterMatchMode.EQUALS },
    createdAt: { value: null, matchMode: FilterMatchMode.EQUALS },
    kategori_berita: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const fetchBerita = async () => {
    try {
        const response = await get(`berita`);
        beritas.value = response.data.data;
        loading1.value = false;
    } catch (error) {
        console.error('Gagal mengambil data :', error);
        loading1.value = false;
        beritas.value = [];
    }
};

const deleteItem = async (id) => {
    try {
        const response = await del(`berita/${id}/delete`);
        if (response.status === 200) {
            message.value = 'Data berhasil dihapus!';
            beritas.value = beritas.value.filter((data) => data.id !== id);
        } else {
            message.value = 'Terjadi kesalahan: ' + response.statusText;
        }
    } catch (error) {
        message.value = 'Terjadi kesalahan: ' + error.message;
    }
};

const confirmDelete = (id) => {
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
            deleteItem(id);
            Swal.fire('BERHASIL!', 'Data berhasil dihapus.', 'success');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('BATAL', 'Data Anda Tidak Jadi Dihapus', 'error');
        }
    });
};

onBeforeMount(() => {
    fetchBerita();
});
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>DAFTAR BERITA</h5>
        <div class="card">
            <DataTable
                v-model:filters="filters"
                :globalFilterFields="['judul_berita', 'deskripsi_pendek', 'penulis', 'createdAt', 'kategori_berita']"
                :value="beritas"
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
                                <router-link to="/daftar-berita/create" class="btn btn-primary"> <i class="pi pi-plus me-2"></i> Tambah</router-link>
                            </div>
                        </div>
                    </div>
                </template>

                <template #empty>
                    <div class="text-center">Tidak ada data.</div>
                </template>
                <Column header="No" headerStyle="width:3rem">
                    <template #body="slotProps">
                        {{ currentPage * rowsPerPage + slotProps.index + 1 }}
                    </template>
                </Column>
                <Column filterField="judul_berita" header="Judul" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.judul_berita }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="deskripsi_pendek" header="Deskripsi Pendek" style="min-width: 15rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.deskripsi_pendek }}</span>
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
                <Column filterField="createdAt" header="Tanggal Pembuatan" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.createdAt }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="kategori_berita" header="Kategori" style="min-width: 5rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.kategori_berita }}</span>
                        </div>
                    </template>
                </Column>
                <Column header="Aksi" style="min-width: 5rem">
                    <template #body="{ data }">
                        <button class="btn btn-outline-danger" @click="confirmDelete(data.id)">
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
