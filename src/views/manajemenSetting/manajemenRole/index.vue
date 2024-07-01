<script setup>
import Swal from 'sweetalert2';
import { ref, onBeforeMount } from 'vue';
import { del, get } from '../../../utiils/request';

const roles = ref([]);
const message = ref('');

const role = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await get('role');
        roles.value = response.data.data;
        Swal.close()
    } catch (error) {
        console.error('Gagal mengambil data Unit Jabatan:', error);


        role.value = [];
    }
};

const deleteItem = async (id) => {
    try {
        const response = await del(`role/${id}/delete`);
        if (response.status === 200) {
            message.value = 'Data berhasil dihapus!';
            // Menghapus item dari array roles yang memiliki id yang sesuai
            // roles.value = roles.value.filter((data) => data.id !== id);
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
            roles.value = roles.value.filter((data) => data.id !== id);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('BATAL', 'Data Anda Tidak Jadi Dihapus', 'error');
        }
    });
};

onBeforeMount(() => {
    role();
});
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>MANAJEMEN ROLE</h5>
        <div class="card">
            <DataTable :value="roles" :paginator="true" :rows="10" dataKey="id" :rowHover="true" showGridlines>
                <template #header>
                    <div class="row">
                        <div class="col-lg-6 d-flex justify-content-start">
                            <IconField iconPosition="left">
                                <InputIcon class="pi pi-search" />
                                <InputText placeholder="Cari disini" style="width: 100%" />
                            </IconField>
                        </div>
                        <div class="col-lg-6 d-flex justify-content-end">
                            <div class="flex justify-content-end gap-2">
                                <!-- <button class="btn btn-outline-primary"> <i class="pi pi-print me-2"></i>Export</button>
                                <button class="btn btn-success"> <i class="pi pi-plus me-2"></i> Tambah</button> -->
                                <!-- <button class="btn btn-danger"> <i class="pi pi-refresh me-2"></i> Sinkronkan</button> -->
                                <router-link to="/manajemen-role/create" class="btn btn-primary"><i class="pi pi-plus me-2"></i> Tambah</router-link>
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
                <Column header="Nama Role" style="min-width: 20rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nama_role }}</span>
                        </div>
                    </template>
                </Column>
                <Column header="Aksi" style="min-width: 5rem">
                    <template #body="{ data }">
                        <div class="actions gap-2">
                            <router-link :to="`/setting-hak-akses/${data.id}`" class="btn btn-outline-warning me-2"> <i class="pi pi-shield"></i></router-link>
                            <router-link :to="`/manajemen-role/${data.id}/update`" class="btn btn-outline-primary me-2"> <i class="pi pi-pencil"></i></router-link>
                            <button @click="confirmDelete(data.id)" class="btn btn-outline-danger"><i class="pi pi-trash"></i></button>
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
