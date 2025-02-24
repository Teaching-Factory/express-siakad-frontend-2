<script setup>
import axios from 'axios';
import Swal from 'sweetalert2';
import swal from 'sweetalert2';
import { onBeforeMount, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { API_URL } from '../../../config/config';
import { getToken } from '../../../service/auth';
import { get, postData } from '../../../utiils/request';

const roles = ref([]);
const id_role = ref('');
const nama = ref('');
const username = ref('');
const password = ref('');
const hints = ref('');
const email = ref('');
const status = ref(false);

const errors = ref({
    nama: '',
    username: '',
    password: '',
    email: '',
    id_role: ''
});
const isEdit = ref(false);
const id = ref(null);

const route = useRoute();
const router = useRouter();

const fetchData = async (id) => {
    try {
        const response = await get(`user/${id}/get`);
        console.log(response); // Tambahkan ini untuk memeriksa respon API
        const data = response.data.data;
        console.log(data); // Tambahkan ini untuk memeriksa data yang diterima
        // id_prodi.value = data.id_prodi; // Jika ini tidak digunakan, hapus atau tambahkan deklarasi ref
        nama.value = data.nama;
        username.value = data.username;
        hints.value = data.hints;
        email.value = data.email;
        status.value = data.status;
    } catch (error) {
        console.error('Error fetching data:', error); // Tambahkan ini untuk memeriksa error
        swal.fire('GAGAL', 'Gagal memuat data. Silakan coba lagi.', 'error');
    }
};

const fetchRole = async () => {
    try {
        const response = await get('role');
        roles.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data prodi:', error);
    }
};

const validateRole = () => {
    if (!id_role.value) {
        errors.value.id_role = 'Role harus dipilih.';
    } else {
        errors.value.id_role = '';
    }
};

const validateNama = () => {
    if (!nama.value) {
        errors.value.nama = 'Nama Wajib di Isi.';
    } else {
        errors.value.nama = '';
    }
};
const validateUsername = () => {
    if (!username.value) {
        errors.value.username = 'Username Wajib di Isi';
    } else {
        errors.value.username = '';
    }
};
const validatePassword = () => {
    if (!password.value && !isEdit.value) {
        errors.value.password = 'Password Wajib di Isi.';
    } else {
        errors.value.password = '';
    }
};
const validateEmail = () => {
    if (!email.value) {
        errors.value.email = 'Email Wajib di Isi.';
    } else {
        errors.value.email = '';
    }
};

const create = async () => {
    try {
        const token = getToken();
        validateNama();
        validateUsername();
        validatePassword();
        validateEmail();
        validateRole();
        if (errors.value.nama || errors.value.username || errors.value.password || errors.value.email || errors.value.id_role) {
            swal.fire('GAGAL', 'Silakan periksa inputan Anda.', 'error');
            return;
        }
        const response = await axios.post(
            `${API_URL}/user/create`,
            {
                nama: nama.value,
                username: username.value,
                password: password.value,
                email: email.value,
                status: status.value,
                id_role: id_role.value
            },
            {
                headers: {
                    Authorization: token
                }
            }
        );
        const data = response.data;
        swal.fire('BERHASIL!', 'Data berhasil ditambahkan.', 'success').then(() => {
            window.location.href = '/manajemen-user';
        });
    } catch (error) {
        swal.fire('GAGAL', 'Gagal menambahkan data. Silakan coba lagi.', 'error');
    }
};

const update = async () => {
    try {
        const token = getToken();
        const dataToUpdate = {
            id_role: id_role.value,
            nama: nama.value,
            username: username.value,
            email: email.value,
            status: status.value
        };
        if (password.value) {
            dataToUpdate.password = password.value; // Only include password if it's being updated
        }
        await axios.put(`${API_URL}/user/${id.value}/update`, dataToUpdate, {
            headers: {
                Authorization: token
            }
        });
        swal.fire('BERHASIL!', 'Data berhasil diperbarui.', 'success').then(() => {
            router.push('/manajemen-user').catch((err) => {
                console.error('Redirect error:', err);
            });
        });
    } catch (error) {
        swal.fire('GAGAL', 'Gagal memperbarui data. Silakan coba lagi.', 'error');
    }
};

const submit = async () => {
    if (isEdit.value) {
        update();
    } else {
        create();
    }
};

onMounted(async () => {
    id.value = route.params.id;
    if (id.value) {
        isEdit.value = true;
        await fetchData(id.value);
    }
    fetchRole();
});

// onBeforeMount(() => {

// });
</script>


<template>
    <div class="card">
        <form @submit.prevent="submit">
            <div class="row">
                <div class="col-lg-5">
                    <h5><i class="pi pi-user me-2"></i>{{ isEdit ? 'EDIT' : 'TAMBAH' }} USER</h5>
                </div>
                <div class="col-lg-7 d-flex justify-content-end">
                    <router-link to="/manajemen-user" class="btn btn-dark me-2"><i class="pi pi-list me-2"></i> Kembali</router-link>
                    <button type="submit" class="btn btn-success me-2"><i class="pi pi-check me-2"></i> Simpan</button>
                    <!-- <router-link to="/manajemen-user" class="btn btn-danger"><i class="pi pi-refresh me-2"></i> Batal</router-link> -->
                </div>
            </div>
            <hr />

            <div class="mb-3 row d-flex justify-content-center">
                <label for="nama" class="col-sm-3 col-form-label">Nama <span class="text-danger">*</span></label>
                <div class="col-md-7">
                    <input type="text" class="form-control" @blur="validateNama" id="nama" v-model="nama" />
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label for="username" class="col-sm-3 col-form-label">Username <span class="text-danger">*</span></label>
                <div class="col-md-7">
                    <input type="text" class="form-control" @blur="validateUsername" id="username" v-model="username" />
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label for="password" class="col-sm-3 col-form-label">Password <span class="text-danger">*</span></label>
                <div class="col-md-7">
                    <input type="text" class="form-control" @blur="validatePassword" id="password" v-model="password" />
                    <!-- <small v-if="isEdit && hints">{{ hints }}</small> -->
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label for="email" class="col-sm-3 col-form-label">Email <span class="text-danger">*</span></label>
                <div class="col-md-7">
                    <input type="text" class="form-control" @blur="validateEmail" id="email" v-model="email" />
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-3">
                    <label for="exampleFormControlInput1" class="form-label">Status <span class="text-danger">*</span></label>
                </div>
                <div class="col-lg-7">
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheckbox" v-model="status" />
                        <label class="form-check-label" for="exampleCheckbox">Aktif</label>
                    </div>
                </div>
            </div>

            <div class="mb-3 row d-flex justify-content-center">
                <label for="exampleFormControlInput1" class="col-sm-3 col-form-label">Pilih Role <span class="text-danger">*</span></label>
                <div class="col-md-7">
                    <select v-model="id_role" @blur="validateRole" class="form-select" aria-label="Default select example">
                        <option value="" selected disabled hidden>Pilih Role</option>
                        <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.nama_role }}</option>
                    </select>
                </div>
            </div>
        </form>
    </div>
</template>