<script setup>
import axios from 'axios';
import swal from 'sweetalert2';
import { onBeforeMount, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { API_URL } from '../../../config/config';
import { getToken } from '../../../service/auth';
import { get, postData } from '../../../utiils/request';

const prodis = ref([]);
const id_prodi = ref('');
const id_unsur_penilaian = ref('');
const bobot_penilaian = ref('');
const penilaians = ref([]);
const errors = ref({
    id_prodi: '',
    id_unsur_penilaian: '',
    bobot_penilaian: ''
});
const isEdit = ref(false);
const id = ref(null);

const route = useRoute();
const router = useRouter();

const fetchData = async (id) => {
    try {
        const response = await get(`bobot-penilaian/${id}/get`);
        const data = response.data.data;
        id_prodi.value = data.id_prodi;
        id_unsur_penilaian.value = data.id_unsur_penilaian;
        bobot_penilaian.value = data.bobot_penilaian;
    } catch (error) {
        swal.fire('GAGAL', 'Gagal memuat data. Silakan coba lagi.', 'error');
    }
};

const fetchProdi = async () => {
    try {
        const response = await get('prodi');
        prodis.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data prodi:', error);
    }
};

const fetchPenilaian = async () => {
    try {
        const response = await get('unsur-penilaian');
        penilaians.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data unsur penilaian:', error);
    }
};

const validateProdi = () => {
    if (!id_prodi.value) {
        errors.value.id_prodi = 'Program Studi harus dipilih.';
    } else {
        errors.value.id_prodi = '';
    }
};

const validateUnsur = () => {
    if (!id_unsur_penilaian.value) {
        errors.value.id_unsur_penilaian = 'Unsur Penilaian harus dipilih.';
    } else {
        errors.value.id_unsur_penilaian = '';
    }
};
const validateBobot = () => {
    if (!bobot_penilaian.value) {
        errors.value.bobot_penilaian = 'Unsur Penilaian harus dipilih.';
    } else {
        errors.value.bobot_penilaian = '';
    }
};

const create = async () => {
    try {
        validateProdi();
        validateUnsur();
        if (errors.value.id_prodi || errors.value.id_unsur_penilaian || errors.value.bobot_penilaian) {
            swal.fire('GAGAL', 'Silakan periksa inputan Anda.', 'error');
            return;
        }
        const response = await postData('bobot-penilaian/create', {
            id_prodi: id_prodi.value,
            id_unsur_penilaian: id_unsur_penilaian.value,
            bobot_penilaian: bobot_penilaian.value
        });
        const data = response.data;
        swal.fire('BERHASIL!', 'Data berhasil ditambahkan.', 'success').then(() => {
            window.location.href = '/bobot-penilaian';
        });
    } catch (error) {
        swal.fire('GAGAL', `Gagal Menambahkan data: ${error.response ? error.response.data.message : error.message}`, 'error');
    }
};

const update = async () => {
    try {
        const token = getToken();
        await axios.put(
            `${API_URL}/bobot-penilaian/${id.value}/update`,
            {
                id_prodi: id_prodi.value,
                id_unsur_penilaian: id_unsur_penilaian.value,
                bobot_penilaian: bobot_penilaian.value
            },
            {
                headers: {
                    Authorization: token
                }
            }
        );
        swal.fire('BERHASIL!', 'Data berhasil diperbarui.', 'success').then(() => {
            router.push('/bobot-penilaian').catch((err) => {
                console.error('Redirect error:', err);
            });
        });
    } catch (error) {
        swal.fire('GAGAL',`Gagal memperbarui data: ${error.response ? error.response.data.message : error.message}`, 'error');
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
    fetchPenilaian();
    fetchProdi();
});

// onBeforeMount(() => {

// });
</script>


<template>
    <div class="card">
        <form @submit.prevent="submit">
            <div class="row">
                <div class="col-lg-5">
                    <h5><i class="pi pi-user me-2"></i>{{ isEdit ? 'EDIT' : 'TAMBAH' }} UNSUR & BOBOT PENILAIAN</h5>
                </div>
                <div class="col-lg-7 d-flex justify-content-end">
                    <router-link to="/bobot-penilaian" class="btn btn-dark me-2"><i class="pi pi-list me-2"></i> Kembali</router-link>
                    <button type="submit" class="btn btn-success me-2"><i class="pi pi-check me-2"></i> Simpan</button>
                    <!-- <router-link to="/bobot-penilaian" class="btn btn-danger"><i class="pi pi-refresh me-2"></i> Batal</router-link> -->
                </div>
            </div>
            <hr />
            <div class="mb-3 row d-flex justify-content-center">
                <label for="exampleFormControlInput1" class="col-sm-3 col-form-label">Pilih Program Studi</label>
                <div class="col-md-7">
                    <select v-model="id_prodi" @blur="validateProdi" class="form-select" aria-label="Default select example">
                        <option value="" selected disabled hidden>Pilih Program Studi</option>
                        <option v-for="prodi in prodis" :key="prodi.id_prodi" :value="prodi.id_prodi">{{ prodi.nama_program_studi }}</option>
                    </select>
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label for="exampleFormControlInput1" class="col-sm-3 col-form-label">Pilih Unsur Penilaian</label>
                <div class="col-md-7">
                    <select v-model="id_unsur_penilaian" @blur="validateUnsur" class="form-select" aria-label="Default select example">
                        <option value="" selected disabled hidden>Pilih Unsur Penilaian</option>
                        <option v-for="penilaian in penilaians" :key="penilaian.id_unsur_penilaian" :value="penilaian.id_unsur_penilaian">{{ penilaian.nama_unsur_penilaian }}</option>
                    </select>
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label for="bobotPenilaian" class="col-sm-3 col-form-label">Bobot Penilaian</label>
                <div class="col-md-7">
                    <input type="text" class="form-control" @blur="validateBobot" id="bobotPenilaian" v-model="bobot_penilaian" />
                </div>
            </div>
        </form>
    </div>
</template>