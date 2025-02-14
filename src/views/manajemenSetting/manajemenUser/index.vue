<script setup>
import { FilterMatchMode } from 'primevue/api';
import Swal from 'sweetalert2';
import { ref, onBeforeMount } from 'vue';
import { del, get } from '../../../utiils/request';

const users = ref([]);
const message = ref('');
const selectedRole = ref('');
const roles = ref([]);
const first = ref(0);
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nama: { value: null, matchMode: FilterMatchMode.EQUALS },
    email: { value: null, matchMode: FilterMatchMode.EQUALS },
    username: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const getRole = async () => {
    try {
        const response = await get('role/');
        roles.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};
const getUser = async () => {
    const id = selectedRole.value;

    if (!id) {
        // console.error('Prodi atau Angkatan Mahasiswa belum dipilih');
        Swal.fire('Gagal', 'Data User tidak ditemukan.', 'warning').then(() => {});
        return;
    }

    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await get(`user/role/${id}/get`);
        const data = response.data.data;

        users.value = data;

        Swal.close();
    } catch (error) {
        Swal.fire('Gagal', 'Data User tidak ditemukan.', 'warning').then(() => {});
    }
};

const deleteItem = async (id) => {
    try {
        const response = await del(`user/${id}/delete`);
        if (response.status === 200) {
            message.value = 'Data berhasil dihapus!';
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
            users.value = users.value.filter((data) => data.id !== id);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('BATAL', 'Data Anda Tidak Jadi Dihapus', 'error');
        }
    });
};

const onPageChange = (event) => {
    first.value = event.first;
};

onBeforeMount(() => {
    getRole();
});
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>MANAJEMEN USER</h5>
        <div class="card">
            <div class="row">
                <div class="col-lg-10 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Pilih Role</label>
                        <select v-model="selectedRole" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Role</option>
                            <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.nama_role }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px">
                    <button @click="getUser" class="btn btn-primary btn-block" style="width: 100%">Tampilkan</button>
                </div>
            </div>
            <DataTable :value="users" :paginator="true" :rows="10" dataKey="id" :rowHover="true" :first="first" @page="onPageChange" v-model:filters="filters" :globalFilterFields="['nama', 'email', 'username']" showGridlines>
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
                                <router-link to="/manajemen-user/create" class="btn btn-primary"><i class="pi pi-plus me-2"></i> Tambah</router-link>
                            </div>
                        </div>
                    </div>
                </template>

                <template #empty>
                    <div class="text-center">Tidak ada data.</div>
                </template>
                <!-- <template #loading> Loading customers data. Please wait. </template> -->
                <Column field="no" header="No" style="min-width: 5rem">
                    <template #body="slotProps">
                        {{ first + slotProps.index + 1 }}
                    </template>
                </Column>
                <Column filterField="nama" header="Nama User" style="min-width: 15rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nama }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="email" header="Email" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.email }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="username" header="Username" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.username }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="hints" header="Hints" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.hints }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_role" header="Role" style="min-width: 5rem">
                    <template #body="{ data }">
                        <div v-html="data.UserRoles[0].Role.nama_role"></div>
                    </template>
                </Column>
                <!-- <Column header="Login As" style="min-width: 8rem">
                    <template #body="{}">
                        <button class="btn btn-outline-primary me-2">
                            <i class="pi pi-eye"></i>
                        </button>
                    </template>
                </Column> -->
                <Column header="Aksi" style="min-width: 8rem">
                    <template #body="{ data }">
                        <div class="actions gap-2">
                            <router-link :to="`/manajemen-user/${data.id}/update`" class="btn btn-outline-primary me-2" title="edit"> <i class="pi pi-pencil"></i></router-link>
                            <button @click="confirmDelete(data.id)" class="btn btn-outline-danger" title="delete"><i class="pi pi-trash"></i></button>
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
