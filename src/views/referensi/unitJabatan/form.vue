<script setup>
import swal from 'sweetalert2';
import { computed, onBeforeMount, ref } from 'vue';
import { get, postData } from '../../../utiils/request';
import vSelect from 'vue-select';

const jabatans = ref([]);
const id_jabatan = ref('');
const selectedDosen = ref('');
const id_prodi = ref('');
const nama_penandatanganan = ref('');
const id_dosen = computed(() => (selectedDosen.value ? selectedDosen.value.id : ''));
const dosens = ref([]);
const prodis = ref([]);

const fetchJabatan = async () => {
    try {
        const response = await get('jabatan');
        jabatans.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data jabatan:', error);
    }
};
const getProdi = async () => {
    try {
        const response = await get('prodi/');
        prodis.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data jabatan:', error);
    }
};

const fetchDosen = async () => {
    try {
        const response = await get('dosen');
        // Format respons dari API ke format yang sesuai dengan v-select
        dosens.value = response.data.data.map((dosen) => ({
            id: dosen.id_dosen, // Properti 'id' atau 'value' sesuai dengan library v-select
            nama_dosen: dosen.nama_dosen // Properti 'label' untuk menampilkan nama dosen
        }));
    } catch (error) {
        console.error('Gagal mengambil data dosen:', error);
    }
};

const create = async () => {
    try {
        const response = await postData('unit-jabatan/create', {
            nama_penandatanganan: nama_penandatanganan.value,
            id_jabatan: id_jabatan.value,
            id_dosen: id_dosen.value,
            id_prodi: id_prodi.value
        });
        const data = response.data;
        swal.fire('BERHASIL!', 'Data berhasil ditambahkan.', 'success').then(() => {
            window.location.href = '/unit-jabatan';
        });
    } catch (error) {
        swal.fire('GAGAL', `Gagal menambahkan data: ${error.response ? error.response.data.message : error.message}`, 'error');
    }
};

onBeforeMount(() => {
    fetchDosen();
    fetchJabatan();
    getProdi();
});
</script>

<template>
    <div class="card">
        <form @submit.prevent="create">
            <div class="row">
                <div class="col-lg-4">
                    <h5><i class="pi pi-user me-2"></i>TAMBAH UNIT JABATAN</h5>
                </div>
                <div class="col-lg-8 d-flex justify-content-end">
                    <router-link to="/unit-jabatan" class="btn btn-dark me-2"><i class="pi pi-list me-2"></i> Kembali</router-link>
                    <button type="submit" class="btn btn-success me-2"><i class="pi pi-check me-2"></i> Simpan</button>
                    <!-- <router-link to="/unit-jabatan" class="btn btn-danger"><i class="pi pi-refresh me-2"></i> Batal</router-link> -->
                </div>
            </div>
            <hr />
            <div class="mb-3 row d-flex justify-content-center">
                <label for="nama_penandatanganan" class="col-sm-3 col-form-label">Nama Penandatanganan <span class="text-danger">*</span></label>
                <div class="col-md-7">
                    <input type="text" class="form-control" id="nama_penandatanganan" v-model="nama_penandatanganan" />
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label for="exampleFormControlInput1" class="col-sm-3 col-form-label">Pilih Jabatan <span class="text-danger">*</span></label>
                <div class="col-md-7">
                    <select v-model="id_jabatan" class="form-select" aria-label="Default select example">
                        <option value="" selected disabled hidden>Pilih Jabatan</option>
                        <option v-for="jabatan in jabatans" :key="jabatan.id" :value="jabatan.id">{{ jabatan.nama_jabatan }}</option>
                    </select>
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label for="exampleFormControlInput1" class="col-sm-3 col-form-label">Pilih Dosen <span class="text-danger">*</span></label>
                <div class="col-md-7">
                    <v-select v-model="selectedDosen" :options="dosens" @blur="validateDosen" label="nama_dosen" placeholder="Pilih dosen" required></v-select>
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label for="exampleFormControlInput1" class="col-sm-3 col-form-label">Pilih Program Studi <span class="text-danger">*</span></label>
                <div class="col-md-7">
                    <select v-model="id_prodi" class="form-select" aria-label="Default select example">
                        <option value="" selected disabled hidden>Pilih Program Studi</option>
                        <option v-for="prodi in prodis" :key="prodi.id_prodi" :value="prodi.id_prodi">
                            {{ prodi.nama_program_studi }}
                        </option>
                    </select>
                </div>
            </div>
        </form>
    </div>
</template>