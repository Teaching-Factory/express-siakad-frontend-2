<script setup>
import { ref, onBeforeMount } from 'vue';
import Swal from 'sweetalert2';
import vSelect from 'vue-select';
import { FilterMatchMode } from 'primevue/api';
import { del, get } from '../../../utiils/request';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nim: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_mahasiswa: { value: null, matchMode: FilterMatchMode.EQUALS },
    prodi: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_status_mahasiswa: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_periode_masuk: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const message = ref('');
const dosens = ref([]);
const tahunAjaran = ref([]);
const dosenWali = ref([]);
const selectedDosen = ref('');
const selectedTahunAjaran = ref('');
const first = ref(0);

const fetchDosen = async () => {
    try {
        const response = await get('dosen');
        // Format respons dari API ke format yang sesuai dengan v-select
        dosens.value = response.data.data.map((dosen) => ({
            id: dosen.id_dosen, // Properti 'id' sesuai dengan library v-select
            nidn: dosen.nidn,
            nama_dosen: dosen.nama_dosen
        }));
    } catch (error) {
        console.error('Gagal mengambil data dosen:', error);
    }
};
const fetchTahunAjaran = async () => {
    try {
        const response = await get('tahun-ajaran');
        tahunAjaran.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};

const selectedFilter = async () => {
    Swal.fire({
        title: 'Loading...',
        html: 'Sedang Memuat Data',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
    await Promise.all([fetchDosen(), fetchTahunAjaran()]);
    Swal.close();
};

const filterData = async () => {
    const tahunAjaranId = selectedTahunAjaran.value;
    const dosenId = selectedDosen.value?.id;

    console.log('dosen :', dosenId);
    console.log('tahun :', tahunAjaranId);
    if (!tahunAjaranId || !dosenId) {
        Swal.fire('GAGAL!', 'Data tidak ditemukan.', 'warning').then(() => {});
        return;
    }

    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await get(`dosen-wali/${dosenId}/${tahunAjaranId}/get`);
        console.log('res', response);
        const filterDosenWali = response.data.data;
        console.log('Dosen : ', filterDosenWali);

        dosenWali.value = filterDosenWali;
        Swal.close();
    } catch (error) {
        Swal.fire('GAGAL!', 'Data Kelas Kuliah tidak ditemukan.', 'warning').then(() => {});
    }
};

onBeforeMount(() => {
    selectedFilter();
});
const onPageChange = (event) => {
    first.value = event.first;
};

const getOptionLabel = (option) => {
    return `${option.nidn} - ${option.nama_dosen}`;
};
const deleteItem = async (id) => {
    try {
        const response = await del(`dosen-wali/${id}/delete`);
        if (response.status === 200) {
            message.value = 'Data berhasil dihapus!';
            // Menghapus item dari array sistemKuliahs yang memiliki id yang sesuai
            // sistemKuliahs.value = sistemKuliahs.value.filter((data) => data.id !== id);
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
            dosenWali.value = dosenWali.value.filter((data) => data.id !== id);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('BATAL', 'Data Anda Tidak Jadi Dihapus', 'error');
        }
    });
};
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>MANAJEMEN MAHASISWA WALI</h5>
        <div class="card">
            <div class="row">
                <div class="col-lg-5 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">NIDN/Nama Dosen</label>
                        <v-select v-model="selectedDosen" :options="dosens" :get-option-label="getOptionLabel" placeholder="Pilih dosen"></v-select>
                    </div>
                </div>
                <div class="col-lg-5 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Semester KRS</label>
                        <select v-model="selectedTahunAjaran" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Tahun Ajaran</option>
                            <option v-for="tahun_ajaran in tahunAjaran" :key="tahun_ajaran.id_tahun_ajaran" :value="tahun_ajaran.id_tahun_ajaran">{{ tahun_ajaran.nama_tahun_ajaran }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px">
                    <button @click="filterData" class="btn btn-primary btn-block" style="width: 100%">Tampilkan</button>
                </div>
            </div>

            <div class="row mt-3 mb-3">
                <div class="col-lg-12 col-md-6 col-lg-6">
                    <div class="alert alert-secondary text-center" role="alert">
                        <h5 class="text-dark text-center">{{ dosenWali[0]?.Dosen?.nidn }} - {{ dosenWali[0]?.Dosen?.nama_dosen }} || Tahun Ajaran : {{ dosenWali[0]?.TahunAjaran?.nama_tahun_ajaran }}</h5>
                    </div>
                </div>
            </div>

            <DataTable
                v-model:filters="filters"
                :globalFilterFields="['Mahasiswa.nim', 'Mahasiswa.nama_mahasiswa', 'prodi', 'Mahasiswa.nama_status_mahasiswa', 'Mahasiswa.nama_periode_masuk']"
                :value="dosenWali"
                :paginator="true"
                :rows="10"
                dataKey="id"
                :rowHover="true"
                :first="first"
                @page="onPageChange"
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
                                <router-link to="/daftar-dosen-wali" class="btn btn-secondary"> <i class="pi pi-bars me-2"></i> Daftar Dosen Wali</router-link>
                                <router-link :to="`/set-kolektif-dosenwali/${dosenWali[0]?.id_dosen}`" class="btn btn-primary"> <i class="pi pi-plus me-2"></i> Set Mahasiswa Kolektif</router-link>
                            </div>
                        </div>
                    </div>
                </template>

                <template #empty>
                    <div class="text-center">Tidak ada data.</div>
                </template>
                <!-- <template #loading> Loading customers data. Please wait. </template> -->
                <Column field="no" header="No" style="min-width: 5rem">
                    <template #body="slotProps">
                        {{ first + slotProps.index + 1 }}
                    </template>
                </Column>
                <Column filterField="nim" header="NIM" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.Mahasiswa.nim }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_mahasiswa" header="Nama" style="min-width: 15rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.Mahasiswa.nama_mahasiswa }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="prodi" header="Program Studi" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.Mahasiswa.Prodi.nama_program_studi }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_status_mahasiswa" header="Status" style="min-width: 5rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.Mahasiswa.nama_status_mahasiswa }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_periode_masuk" header="Angkatan" style="min-width: 5rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.Mahasiswa.nama_periode_masuk }}</span>
                        </div>
                    </template>
                </Column>
                <Column header="Aksi" style="min-width: 5rem">
                    <template #body="{ data }">
                        <button class="btn btn-outline-danger" @click="confirmDelete(data.id)">
                            <i class="pi pi-trash"></i>
                        </button>
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
