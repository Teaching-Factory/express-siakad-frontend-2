<script setup>
import { ref, onBeforeMount } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { get, getData } from '../../../utiils/request';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getToken } from '../../../service/auth';
import axios from 'axios';
import Swal from 'sweetalert2';
import { API_URL } from '../../../config/config';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    pertemuan: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_mahasiswa: { value: null, matchMode: FilterMatchMode.EQUALS },
    tanggal_pertemuan: { value: null, matchMode: FilterMatchMode.EQUALS },
    waktu: { value: null, matchMode: FilterMatchMode.EQUALS },
    waktu_presensi: { value: null, matchMode: FilterMatchMode.EQUALS },
    nim: { value: null, matchMode: FilterMatchMode.EQUALS },
    
});

const detailPresensi = ref([]);
const route = useRoute();
const id = route.params.id;

const getDetailPresensi = async (id) => {
    try {
        const response = await get(`presensi-perkuliahan/${id}/get`);
        detailPresensi.value = response.data.data;
        console.log('Response:', response.data)
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};

const update = async (id, statusPresensi) => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const dataToSubmit = {
            presensiMahasiswa: [{
                id: id,
                status_presensi: statusPresensi
            }]
        };

        const token = getToken(); 
        const pertemuanID = route.params.id;
        const response = await axios.put(`${API_URL}/presensi-perkuliahan/${pertemuanID}/update`, dataToSubmit, {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json'
            }
        });

        Swal.close();
        Swal.fire('BERHASIL!', 'Data berhasil Dikonfirmasi.', 'success').then(() => {
            window.location.href = ''; 
        });
    } catch (error) {
        console.error('Gagal menambahkan data:', error);
        Swal.fire('GAGAL!', 'Terjadi kesalahan saat memproses data.', 'error');
    }
};


const onStatusChange = (id, selectedStatus) => {
    update(id,selectedStatus);
};

onMounted(() => {
    
        getDetailPresensi(id);
    
});
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>ABSENSI PERKULIAHAN</h5>
        <div class="card">
            <DataTable
                v-model:filters="filters"
                :globalFilterFields="['PertemuanPerkuliahan.pertemuan','Mahasiswa.nama_mahasiswa', 'tanggal_pertemuan', 'waktu_presensi', 'Mahasiswa.nim']"
                :value="detailPresensi"
                :paginator="true"
                :rows="10"
                dataKey="id"
                :rowHover="true"
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
                                <!-- <button  type="submit" class="btn btn-primary me-2"><i class="pi pi-check me-2"></i> Update</button> -->
                            </div>
                        </div>
                    </div>
                </template>

                <template #empty>
                    <div class="text-center">Tidak ada data.</div>
                </template>
                <Column filterField="pertemuan" field="no" header="Pertemuan" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.PertemuanPerkuliahan.pertemuan }}
                    </template>
                </Column>
                <Column filterField="nim" header="NIM" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.Mahasiswa.nim }}
                    </template>
                </Column>
                <Column filterField="nama_mahasiswa" header="Nama Mahasiswa" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.Mahasiswa.nama_mahasiswa }}
                    </template>
                </Column>
                <Column filterField="tanggal_pertemuan" header="Tanggal Pertemuan" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.PertemuanPerkuliahan.tanggal_pertemuan }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="waktu" header="Waktu" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.PertemuanPerkuliahan.waktu_mulai }} - {{ data.PertemuanPerkuliahan.waktu_selesai }}</span>
                        </div>
                    </template>
                </Column>
                
                <Column filterField="waktu_presensi" header="Waktu Presensi" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.waktu_presensi }}
                    </template>
                </Column>
                
                <Column header="Status Presensi" style="min-width: 10rem">
        <template #body="{ data }">
            <select class="form-select" style="width: 100px;" @change="onStatusChange(data.id, $event.target.value)">
                <option :value="data.status_presensi">{{ data.status_presensi }}</option>
                <option value="Izin">Izin</option>
                <option value="Sakit">Sakit</option>
                <option value="Alfa">Alfa</option>
            </select>
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
