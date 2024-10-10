<script setup>
import { onMounted } from 'vue';
import { getData } from '../../../utiils/request';
import { ref } from 'vue';
import axios from 'axios';
import { API_URL } from '../../../config/config';
import { getToken } from '../../../service/auth';
import Swal from 'sweetalert2';

const prodis = ref([]);
const pilihProdi = ref([]);
const id_prodi_1 = ref('');
const id_prodi_2 = ref('');

const getProdi = async () => {
    try {
        const response = await getData('prodi');
        prodis.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data prodi:', error);
    }
};

const getPilihprodi = async () => {
    try {
        const res = await getData('prodi-camaba/get-prodi-camaba-aktif');
        if (res.status === 200) {
            const data = res.data.data;
            pilihProdi.value = data;

            if (data.length >= 2) {
                id_prodi_1.value = data[0].id_prodi;
                id_prodi_2.value = data[1].id_prodi;
            }
        }
    } catch (error) {
        console.error('Gagal mengambil prodi yang dipilih:', error);
    }
};

const updatePilihanProdi = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const token = getToken();

        const payload = {
            prodi: [
                {
                    id_prodi_camaba: pilihProdi.value[0]?.id,
                    id_prodi: id_prodi_1.value
                },
                {
                    id_prodi_camaba: pilihProdi.value[1]?.id,
                    id_prodi: id_prodi_2.value
                }
            ]
        };

        const response = await axios.put(`${API_URL}/prodi-camaba/camaba-aktif/update-prodi`, payload, {
            headers: {
                Authorization: token
            }
        });

        Swal.close();
        Swal.fire('BERHASIL!', 'Data berhasil diperbarui.', 'success').then(() => {
            window.location.href = '/pilihan-prodi';
        });
    } catch (error) {
        Swal.close();
        console.error('Error updating data:', error.response ? error.response.data : error.message);
        Swal.fire('GAGAL', `Gagal memperbarui data: ${error.response ? error.response.data.message : error.message}`, 'error');
    }
};

onMounted(() => {
    getProdi();
    getPilihprodi();
});
</script>

<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-10 xl:col-6">
                    <h5><i class="pi pi-user me-2"></i>PROGRAM STUDI YANG DIPILIH</h5>
                </div>
                <div class="col-12 xl:col-6 d-flex justify-content-end">
                    <div class="flex justify-content-end gap-2">
                        <button @click="updatePilihanProdi" class="btn btn-primary me-2"><i class="pi pi-save mr-2"></i> Simpan</button>
                    </div>
                </div>
            </div>
            <hr />
            <div class="row">
                <div class="col-lg-12 mb-2">
                    <label for="inputProdi" class="col-sm-4 col-form-label">Pilihan 1</label>
                    <select v-model="id_prodi_1" class="form-select" aria-label="Default select example">
                        <option value="" selected disabled hidden>Pilih Program Studi</option>
                        <option v-for="prodi in prodis" :key="prodi.id_prodi" :value="prodi.id_prodi">{{ prodi.nama_program_studi }}</option>
                    </select>
                </div>
                <div class="col-sm-12 mt-2">
                    <label for="inputProdi" class="col-sm-4 col-form-label">Pilihan 2</label>
                    <select v-model="id_prodi_2" class="form-select" aria-label="Default select example">
                        <option value="" selected disabled hidden>Pilih Program Studi</option>
                        <option v-for="prodi in prodis" :key="prodi.id_prodi" :value="prodi.id_prodi">{{ prodi.nama_program_studi }}</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card-theme {
    background-color: rgba(154, 160, 172, 0.5);
}
</style>
