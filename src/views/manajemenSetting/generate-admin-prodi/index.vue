<script setup>
import { ref, onBeforeMount } from 'vue';
import { del, get, postData } from '../../../utiils/request';
import Swal from 'sweetalert2';
import { FilterMatchMode } from 'primevue/api';

const first = ref(0);
const adminProdis = ref([]);
const prodis = ref([]);
const users = ref([]);
const selectedProdi = ref('');
const selectedUser = ref('');

const message = ref('');

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nama: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_program_studi: { value: null, matchMode: FilterMatchMode.EQUALS },
    hints: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const getAdminProdi = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await get('admin-prodi/');
        const data = response.data.data;
        adminProdis.value = data;
        Swal.close();
    } catch (error) {
        Swal.fire('GAGAL', ' Data Tidak tersedia.', 'error');
    }
};

const getProdi = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await get('prodi/');
        const data = response.data.data;
        prodis.value = data;
        Swal.close();
    } catch (error) {
        Swal.fire('GAGAL', ' Data Tidak tersedia.', 'error');
    }
};

const getUserAdmin = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await get('user/get-user-admin-prodi-not-registered');
        const data = response.data.data;
        users.value = data;
        Swal.close();
    } catch (error) {
        Swal.fire('GAGAL', ' Data Tidak tersedia.', 'error');
    }
};

const createUserAdminProdi = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const payload = {
            id_user: selectedUser.value,
            id_prodi: selectedProdi.value
        };

        const response = await postData('admin-prodi/create', payload);

        Swal.close();
        Swal.fire('BERHASIL!', 'Generate User Admin Prodi Berhasil.', 'success').then(() => {
            window.location.reload();
        });
        console.log('Status berhasil diperbarui:', response.data);
    } catch (error) {
        console.error('Gagal memperbarui status:', error);
    }
};

const deleteItem = async (id) => {
    try {
        const response = await del(`admin-prodi/${id}/delete`);
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
            adminProdis.value = adminProdis.value.filter((data) => data.id !== id);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('BATAL', 'Data Anda Tidak Jadi Dihapus', 'error');
        }
    });
};

const onPageChange = (event) => {
    first.value = event.first;
};
onBeforeMount(() => {
    getAdminProdi();
    getProdi();
    getUserAdmin();
});
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>GENERATE USERNAME DAN PASSWORD DOSEN</h5>
        <div class="card" style="padding: 0rem 1rem 0rem 1rem">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-12">
                    <h6 class="text-dark">Keterangan :</h6>
                    <p class="lh-1 text-small">
                        <ol>
                            <li>Fitur ini digunakan untuk melakukan generate Username & Password Dosen</li>
                            <li>Default user yang di-generate untuk username menggunakan NIDN (1234567890) dan password menggunakan tanggal lahir (19980203)</li>
                            <li>Pilih beberapa data Dosen untuk di Generate secara bersamaan.</li>
                        </ol>
                    </p>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="row">
                <div class="col-lg-5 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Pilih Program Studi</label>
                        <select v-model="selectedProdi" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Program Studi</option>
                            <option v-for="prodi in prodis" :key="prodi.id_prodi" :value="prodi.id_prodi">{{ prodi.nama_program_studi }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-5 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Pilih User</label>
                        <select v-model="selectedUser" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih User</option>
                            <option v-for="user in users" :key="user.id_user" :value="user.id_user">{{ user.User.nama }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px">
                    <button @click="createUserAdminProdi" class="btn btn-primary btn-block" style="width: 100%">Generate</button>
                </div>
                </div>
                <hr/>

            <DataTable
            :value="adminProdis"
            v-model:filters="filters"
            :globalFilterFields="['User.nama','User.email', 'Prodi.nama_program_studi', 'User.hints',]"
            :paginator="true"
            :rows="10"
            dataKey="id_dosen"
            :rowHover="true"
            showGridlines :first="first"
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
            <Column filterField="nama" header="Nama" style="min-width: 14rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span>{{ data.User.nama }}</span>
                    </div>
                </template>
            </Column>
            <Column filterField="email" header="Email" style="min-width: 14rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span>{{ data.User.email }}</span>
                    </div>
                </template>
            </Column>
            <Column filterField="nama_program_studi" header="Program Studi" style="min-width: 10rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span>{{ data.Prodi.nama_program_studi }}</span>
                    </div>
                </template>
            </Column>
            <Column filterField="hints" header="Hints" style="min-width: 5rem">
                <template #body="{ data }">
                    {{ data.User.hints }}
                </template>
            </Column>
            <Column header="Aksi" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex gap-2">
                            <button @click="confirmDelete(data.id)" class="btn btn-outline-danger" title="delete">
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


