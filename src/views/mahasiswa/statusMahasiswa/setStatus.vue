<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { get } from '../../../utiils/request';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { getToken } from '../../../service/auth';
import Swal from 'sweetalert2';
import { API_URL } from '../../../config/config';

const route = useRoute(); // Inisialisasi useRoute untuk mendapatkan akses ke route saat ini

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    tahun: { value: null, matchMode: FilterMatchMode.EQUALS },
    jumlahMahasiswa: { value: null, matchMode: FilterMatchMode.EQUALS },
    jumlahMahasiswaBelumSetSK: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const first = ref(0);
const setStatus = ref([]);
const selectedIds = ref([]);
const id_prodi = route.params.id_prodi; // Variable to store the id_prodi

const fetchSetStatusMahasiswa = async (id_prodi) => {
    console.log(id_prodi);
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await get(`status-mahasiswa/${id_prodi}/get-periode-with-count-mahasiswa`);
        setStatus.value = response.data.data;
        console.log(response.data.data);
        Swal.close();
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};
const updateStatus = async (id_prodi, id_angkatan) => {
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
        const url = `${API_URL}/status-mahasiswa/filter/${id_prodi}/${id_angkatan}/set-status-nonaktif`;
        console.log('PUT URL:', url); // Tambahkan log untuk URL endpoint
        const response = await axios.put(
            url,
            {},
            {
                headers: {
                    Authorization: token
                }
            }
        );

        console.log(`Status untuk id_angkatan ${id_angkatan} berhasil diperbarui:`, response.data);
        Swal.close();
    } catch (error) {
        console.error('Gagal memperbarui status:', error);
    }
};

// Function to set mahasiswa status to non-aktif
const setNonAktif = async () => {
    for (const id_angkatan of selectedIds.value) {
        await updateStatus(id_prodi, id_angkatan);
    }
    Swal.fire('BERHASIL!', 'Data berhasil diUpdate.', 'success').then(() => {
        window.location.href = `/status-mahasiswa/${id_prodi}`;
    });
};

const onPageChange = (event) => {
    first.value = event.first;
};

onMounted(() => {
    /// Mengambil id_prodi dari route parameters
    fetchSetStatusMahasiswa(id_prodi);
});
</script>


<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>SET STATUS AWAL PERIODE MAHASISWA</h5>
        <DataTable
            v-model:filters="filters"
            :globalFilterFields="['tahun', 'jumlahMahasiswa', 'jumlahMahasiswaBelumSetSK']"
            :value="setStatus"
            :paginator="true"
            :rows="10"
            dataKey="id"
            :rowHover="true"
            showGridlines
            :first="first"
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
                    <div class="col-lg-6 d-flex justify-content-end">
                        <div class="flex justify-content-end gap-2">
                            <button class="btn btn-secondary" @click="setNonAktif"><i class="pi pi-check me-2"></i> Set Non Aktif</button>
                        </div>
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
            <Column filterField="tahun" header="Angkatan" style="min-width: 15rem">
                <template #body="{ data }">
                    {{ data.tahun }}
                </template>
            </Column>
            <Column filterField="jumlahMahasiswa" header="Jumlah Mahasiswa" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ data.jumlahMahasiswa }}
                </template>
            </Column>
            <Column filterField="jumlahMahasiswaBelumSetSK" header="Jumlah Mahasiswa Belum di SET" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ data.jumlahMahasiswaBelumSetSK }}
                </template>
            </Column>
            <Column filterField="aksi" header="Aksi" style="min-width: 10rem">
                <template #body="{ data }">
                    <div class="actions gap-2">
                        <input type="checkbox" id="actionCheckbox" name="actionCheckbox" class="form-check-input" :value="data.id_angkatan" v-model="selectedIds" />
                    </div>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<style scoped>
.card-theme {
    background-color: rgba(154, 160, 172, 0.5);
}
</style>
