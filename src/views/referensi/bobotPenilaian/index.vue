<script setup>
import { ref, onBeforeMount } from 'vue';
import { get, del } from '../../../utiils/request';
import { FilterMatchMode } from 'primevue/api';
import Swal from 'sweetalert2';

const bobotPenilaians = ref([]);
const currentPage = ref(0);
const rowsPerPage = ref(100);
const message = ref('');
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nama_program_studi: { value: null, matchMode: FilterMatchMode.IN },
    nama_unsur_penilaian: { value: null, matchMode: FilterMatchMode.EQUALS },
    bobot_penilaian: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const fetchBobotPenilaian = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await get('bobot-penilaian');
        bobotPenilaians.value = response.data.data;
        Swal.close();
    } catch (error) {
        console.error('Gagal mengambil data Bobot Penilaian:', error);
        bobotPenilaians.value = [];
    }
};

const deleteItem = async (id_bobot_penilaian) => {
    try {
        const response = await del(`bobot-penilaian/${id_bobot_penilaian}/delete`);
        if (response.status === 200) {
            message.value = 'Data berhasil dihapus!';
        } else {
            message.value = 'Terjadi kesalahan: ' + response.statusText;
        }
    } catch (error) {
        message.value = 'Terjadi kesalahan: ' + error.message;
    }
};

const confirmDelete = (id_bobot_penilaian) => {
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
            deleteItem(id_bobot_penilaian);
            Swal.fire('BERHASIL!', 'Data berhasil dihapus.', 'success');
            bobotPenilaians.value = bobotPenilaians.value.filter((data) => data.id_bobot_penilaian !== id_bobot_penilaian);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('BATAL', 'Data Anda Tidak Jadi Dihapus', 'error');
        }
    });
};

onBeforeMount(() => {
    fetchBobotPenilaian();
});
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>DAFTAR UNSUR & BOBOT PENILAIAN</h5>
        <div class="card">
            <DataTable
                v-model:filters="filters"
                :value="bobotPenilaians"
                :paginator="true"
                :rows="rowsPerPage"
                :first="currentPage * rowsPerPage"
                :totalRecords="bobotPenilaians.length"
                dataKey="id"
                :rowHover="true"
                :globalFilterFields="['Prodi.nama_program_studi', 'UnsurPenilaian.nama_unsur_penilaian', 'bobot_penilaian']"
                showGridlines
                @page="(e) => (currentPage.value = e.page)"
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
                                <router-link to="/bobot-penilaian/create" class="btn btn-primary"> <i class="pi pi-plus me-2"></i> Tambah</router-link>
                            </div>
                        </div>
                    </div>
                </template>

                <template #empty>
                    <div class="text-center">Tidak ada data.</div>
                </template>

                <Column header="No" headerStyle="width:3rem">
                    <template #body="slotProps">
                        {{ currentPage * rowsPerPage + slotProps.index + 1 }}
                    </template>
                </Column>

                <Column filterField="nama_program_studi" header="Program Studi" style="min-width: 10rem">
                    <template #body="slotProps">
                        <div class="flex align-items-center gap-2">
                            <span>{{ slotProps.data.Prodi.nama_program_studi }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_unsur_penilaian" header="Nama Unsur Penilaian" style="min-width: 20rem">
                    <template #body="slotProps">
                        <div class="flex align-items-center gap-2">
                            <span>{{ slotProps.data.UnsurPenilaian.nama_unsur_penilaian }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="bobot_penilaian" header="Bobot Penilaian" style="min-width: 10rem">
                    <template #body="slotProps">
                        <div class="flex align-items-center gap-2">
                            <span>{{ slotProps.data.bobot_penilaian }} %</span>
                        </div>
                    </template>
                </Column>
                <Column header="Aksi" style="min-width: 5rem">
                    <template #body="slotProps">
                        <div class="flex gap-2">
                            <router-link :to="`/bobot-penilaian/${slotProps.data.id_bobot_penilaian}/edit`" class="btn btn-outline-primary" title="edit">
                                <i class="pi pi-pencil"></i>
                            </router-link>
                            <button @click="confirmDelete(slotProps.data.id_bobot_penilaian)" class="btn btn-outline-danger" title="delete">
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
