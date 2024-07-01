<script setup>
import { ref, onBeforeMount } from 'vue';
import { get, del } from '../../../utiils/request';
import { FilterMatchMode } from 'primevue/api';
import Swal from 'sweetalert2';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    id_unsur: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_unsur_penilaian: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const unsurPenilaians = ref([]);
const message = ref('');

const unsurPenilaian = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await get('unsur-penilaian'); // Memanggil fungsi get dengan endpoint 'unsurPenilaian'
        console.log(response.data.data);
        unsurPenilaians.value = response.data.data;
        Swal.close();
    } catch (error) {
        console.error('Gagal mengambil data Unsur Penilaian:', error);
    }
};

const deleteItem = async (id_unsur_penilaian) => {
    try {
        const response = await del(`unsur-penilaian/${id_unsur_penilaian}/delete`);
        if (response.status === 200) {
            message.value = 'Data berhasil dihapus!';
        } else {
            message.value = 'Terjadi kesalahan: ' + response.statusText;
        }
    } catch (error) {
        message.value = 'Terjadi kesalahan: ' + error.message;
    }
};

const confirmDelete = (id_unsur_penilaian) => {
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
            deleteItem(id_unsur_penilaian);
            Swal.fire('BERHASIL!', 'Data berhasil dihapus.', 'success');
            unsurPenilaians.value = unsurPenilaians.value.filter((data) => data.id_unsur_penilaian !== id_unsur_penilaian);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('BATAL', 'Data Anda Tidak Jadi Dihapus', 'error');
        }
    });
};

onBeforeMount(() => {
    unsurPenilaian();
});
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>DAFTAR UNSUR PENILAIAN</h5>
        <div class="card">
            <DataTable v-model:filters="filters" :globalFilterFields="['id_unsur', 'nama_unsur_penilaian']" :value="unsurPenilaians" :paginator="true" :rows="10" dataKey="id" :rowHover="true" showGridlines>
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
                                <router-link to="/unsur-penilaian/create" class="btn btn-primary"> <i class="pi pi-plus me-2"></i> Tambah</router-link>
                            </div>
                        </div>
                    </div>
                </template>

                <template #empty>
                    <div class="text-center">Tidak ada data.</div>
                </template>
                <!-- <template #loading> Loading customers data. Please wait. </template> -->
                <Column header="No" headerStyle="width:3rem">
                    <template #body="slotProps">
                        {{ slotProps.index + 1 }}
                    </template>
                </Column>
                <Column filterField="id_unsur" header="ID Unsur" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.id_unsur }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_unsur_penilaian" header="Nama Unsur Penilaian" style="min-width: 30rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nama_unsur_penilaian }}</span>
                        </div>
                    </template>
                </Column>
                <Column header="Aksi" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex gap-2">
                            <router-link :to="`/unsur-penilaian/${data.id_unsur_penilaian}/edit`" class="btn btn-outline-primary">
                                <i class="pi pi-pencil"></i>
                            </router-link>
                            <button @click="confirmDelete(data.id_unsur_penilaian)" class="btn btn-outline-danger">
                                <i class="pi pi-trash"></i>
                            </button>
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
