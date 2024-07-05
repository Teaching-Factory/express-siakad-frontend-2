<script setup >
import axios from 'axios';
import { FilterMatchMode } from 'primevue/api';
import Swal from 'sweetalert2';
import { onBeforeMount, ref } from 'vue';
import { API_URL } from '../../../config/config';
import { del, get } from '../../../utiils/request';
import { getToken } from '../../../utiils/local_storage';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    kode_mata_Kuliah: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_mata_kuliah: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_kelas_kuliah: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_dosen: { value: null, matchMode: FilterMatchMode.EQUALS },
    sks: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const viewKRS = ref([]);
const selectedKHS = ref([]);
const message = ref('');

const fetchKRS = async () => {
    Swal.fire({
        title: 'Loading...',
        html: 'Sedang Memuat Data',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
    const response = await get('kelas-kuliah/get-kelas-kuliah-available');
    const krs = response.data.data;
    viewKRS.value = krs;
    Swal.close();
};

const createKrs = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        // Periksa apakah ada data KHS yang dipilih
        if (selectedKHS.value.length === 0) {
            Swal.fire('PERINGATAN!', 'Tidak ada data KRS mahasiswa yang dipilih.', 'warning');
            return; // Hentikan eksekusi fungsi jika tidak ada data yang dipilih
        }

        // Kumpulkan id_kelas_kuliah dari elemen yang dipilih
        const kelasKuliahs = selectedKHS.value.map((item) => ({
            id_kelas_kuliah: item.id_kelas_kuliah
        }));

        const token = getToken();
        const response = await axios.post(
            `${API_URL}/krs-mahasiswa/create-krs-mahasiswa-active`,
            {
                kelas_kuliahs: kelasKuliahs
            },
            {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json' // Tambahkan header Content-Type
                }
            }
        );

        Swal.close();
        Swal.fire('BERHASIL!', 'Berhasil Menambahkan KRS.', 'success').then(() => {
            window.location.href = '/profile-krs-mahasiswa';
        });
        console.log('Status berhasil diperbarui:', response.data);
    } catch (error) {
        console.error('Gagal memperbarui status:', error);
        Swal.fire('GAGAL!', 'Gagal Menambahkan KRS.', 'error');
    }
};



onBeforeMount(() => {
    fetchKRS();
});
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>KRS MAHASISWA - 2023/2024 GANJIL</h5>

        <div class="card">
            <p>Pembimbing Akademik : -</p>

            <DataTable
                :value="viewKRS"
                v-model:filters="filters"
                :globalFilterFields="['MataKuliah.kode_mata_Kuliah', 'MataKuliah.nama_mata_kuliah', 'nama_kelas_kuliah', 'Dosen.nama_dosen', 'sks']"
                :paginator="true"
                :rows="10"
                dataKey="id_kelas_kuliah"
                :rowHover="true"
                v-model:selection="selectedKHS"
                showGridlines
            >
                <template #header>
                    <div class="row">
                        <div class="col-lg-6 d-flex justify-content-start">
                            <IconField iconPosition="left">
                                <InputIcon class="pi pi-search" />
                                <InputText placeholder="Keyword Search" v-model="filters['global'].value" style="width: 100%" />
                            </IconField>
                        </div>
                        <div class="col-lg-6 d-flex justify-content-end">
                            <div class="flex justify-content-end gap-2">
                                <button @click="createKrs" type="submit" class="btn btn-primary me-2"><i class="pi pi-check me-2"></i> Simpan</button>
                            </div>
                        </div>
                    </div>
                </template>

                <template #empty>
                    <div class="text-center">Tidak ada data.</div>
                </template>
                <Column selectionMode="multiple" headerStyle="width: 3em"></Column>
                <Column filterField="kode_mata_kuliah" header="Kode Mata Kuliah" style="min-width: 15rem">
                    <template #body="{ data }">
                        {{ data.MataKuliah.kode_mata_kuliah }}
                    </template>
                </Column>
                <Column filterField="nama_mata_kuliah" header="Nama Mata Kuliah" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.MataKuliah.nama_mata_kuliah }}
                    </template>
                </Column>
                <Column filterField="nama_kelas_kuliah" header="Kelas" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nama_kelas_kuliah }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_dosen" header="Dosen Pengajar" style="min-width: 14rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.Dosen.nama_dosen }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="sks" header="SKS" style="min-width: 15rem">
                    <template #body="{ data }">
                        <div v-html="data.sks"></div>
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
