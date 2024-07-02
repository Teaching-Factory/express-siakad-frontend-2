<script setup>
import { ref, onBeforeMount } from 'vue';
import { get } from '../../../utiils/request';
import Swal from 'sweetalert2';
import { FilterMatchMode } from 'primevue/api';
import { API_URL } from '../../../config/config';
import { getToken } from '../../../service/auth';
import axios from 'axios';

const dosens = ref([]);
const selectedDosen = ref([]);
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nama_dosen: { value: null, matchMode: FilterMatchMode.EQUALS },
    nidn: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_status_aktif: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const fetchDosen = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await get('user/get-dosen-dont-have-user');
        const dataDosen = response.data.data;
        dosens.value = dataDosen;
        Swal.close();
    } catch (error) {
        Swal.fire('GAGAL', 'Gagal memuat data. Silakan coba lagi.', 'error');
    }
};

const generateUserDosen = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        if (selectedDosen.value.length === 0) {
            Swal.fire('PERINGATAN!', 'Tidak ada data KRS mahasiswa yang dipilih.', 'warning');
            return; // Hentikan eksekusi fungsi jika tidak ada data yang dipilih
        }

        const token = getToken();
        const url = `${API_URL}/user/dosen/generate`;

        // Persiapkan data untuk permintaan PUT
        const data = {
            dosens: selectedDosen.value.map((dosen) => ({
                id_dosen: dosen.id_dosen
            }))
        };

        const response = await axios.post(
            url,
            data, // Body permintaan
            {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json' // Tambahkan header Content-Type
                }
            }
        );

        Swal.close();
        Swal.fire('BERHASIL!', 'Generate User Dosen Berhasil.', 'success').then(() => {
            window.location.href = '/generate-user-dosen';
        });
        console.log('Status berhasil diperbarui:', response.data);
    } catch (error) {
        console.error('Gagal memperbarui status:', error);
    }
};
onBeforeMount(() => {
    fetchDosen();
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
                            <li>Fitur ini digunakan untuk melakukan generate Username & Password Dosen di Go Feeder.</li>
                            <li>Default user yang di-generate untuk username : NIDN & password : tanggal lahir dengan format yyyy-mm-dd (tanda '-' dihilangkan). Contoh : 1997-02-03 = 19970203.</li>
                            <li>Daftar mahasiswa yang sudah terdaftar di Forlap & berstatus AKTIF.</li>
                            <li>Untuk melihat daftar user klik disini.</li>
                        </ol>
                    </p>
                </div>
            </div>
        </div>

        <div class="card">
                <hr/>

            <DataTable
            :value="dosens"
            v-model:filters="filters"
            :globalFilterFields="['nama_dosen', 'nidn', 'StatusKeaktifanPegawai.nama_status_aktif',]"
            v-model:selection="selectedDosen"
            :paginator="true"
            :rows="10"
            dataKey="id_dosen"
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
                            <button @click="generateUserDosen" class="btn btn-secondary"> <i class="pi pi-check me-2"></i> Generate</button> 
                        </div>
                    </div>
                </div>
            </template>

            <template #empty>
                <div class="text-center">Tidak ada data.</div>
            </template>
            <Column selectionMode="multiple" headerStyle="width: 3em"></Column>
            <Column filterField="nama_dosen" header="Nama" style="min-width: 14rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span>{{ data.nama_dosen }}</span>
                    </div>
                </template>
            </Column>
            <Column filterField="nidn" header="NIDN/NUP/NIDK" style="min-width: 10rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span>{{ data.nidn }}</span>
                    </div>
                </template>
            </Column>
            <Column filterField="nama_status_aktif" header="Status" style="min-width: 5rem">
                <template #body="{ data }">
                    {{ data.StatusKeaktifanPegawai.nama_status_aktif }}
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



<!-- <h6 class="text-dark">Keterangan :</h6>
                        <p class="lh-1 text-small">
                            <ol>
                                <li>Fitur ini digunakan untuk melakukan generate Username & Password Dosen di Go Feeder.</li>
                                <li>Default user yang di-generate untuk username : NIDN & password : tanggal lahir dengan format yyyy-mm-dd (tanda '-' dihilangkan). Contoh : 1997-02-03 = 19970203.</li>
                                <li>Daftar mahasiswa yang sudah terdaftar di Forlap & berstatus AKTIF.</li>
                                <li>Untuk melihat daftar user klik disini.</li>
                            </ol>
                        </p> -->