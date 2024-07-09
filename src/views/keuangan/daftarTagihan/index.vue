<script setup>
import { ref, onBeforeMount } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import Swal from 'sweetalert2';
import { del, get } from '../../../utiils/request';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nim: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_mahasiswa: { value: null, matchMode: FilterMatchMode.EQUALS },
    periode_pelaporan: { value: null, matchMode: FilterMatchMode.EQUALS },
    jumlah_tagihan: { value: null, matchMode: FilterMatchMode.EQUALS },
    status_tagihan: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const tagihans = ref([]);
const first = ref(0);
const message = ref('');
const fetchTagihan = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await get('tagihan-mahasiswa');
        // console.log(response.data.data);
        tagihans.value = response.data.data;
        Swal.close();
    } catch (error) {
        console.error('Gagal mengambil data sistemKuliah:', error);
    }
};

const onPageChange = (event) => {
    first.value = event.first;
};

onBeforeMount(() => {
    fetchTagihan();
});

const deleteItem = async (id_tagihan_mahasiswa) => {
    try {
        const response = await del(`tagihan-mahasiswa/${id_tagihan_mahasiswa}/delete`);
        if (response.status === 200) {
            message.value = 'Data berhasil dihapus!';
            // Menghapus item dari array sistemKuliahs yang memiliki id_tagihan_mahasiswa yang sesuai
            // sistemKuliahs.value = sistemKuliahs.value.filter((data) => data.id_tagihan_mahasiswa !== id_tagihan_mahasiswa);
        } else {
            message.value = 'Terjadi kesalahan: ' + response.statusText;
        }
    } catch (error) {
        message.value = 'Terjadi kesalahan: ' + error.message;
    }
};

const confirmDelete = (id_tagihan_mahasiswa) => {
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
            deleteItem(id_tagihan_mahasiswa);
            Swal.fire('BERHASIL!', 'Data berhasil dihapus.', 'success');
            tagihans.value = tagihans.value.filter((data) => data.id_tagihan_mahasiswa !== id_tagihan_mahasiswa);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('BATAL', 'Data Anda Tidak Jadi Dihapus', 'error');
        }
    });
};
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>DAFTAR TAGIHAN</h5>
        <div class="card">
            <div class="row">
                <div class="col-lg-2 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Periode Tagihan</label>
                        <select class="form-select" aria-label="Default select example">
                            <option selected disabled hidden>Periode Tagihan</option>
                            <option value="1">2020/2021 Genap</option>
                            <option value="2">2020/2021 Ganjil</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Program Studi</label>
                        <select class="form-select" aria-label="Default select example">
                            <option selected disabled hidden>Program Studi</option>
                            <option value="1">S1 Teknik Informatika</option>
                            <option value="2">S1 Teknologi Basis Data</option>
                            <option value="3">S1 Perikanan</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Jenis Tagihan</label>
                        <select class="form-select" aria-label="Default select example">
                            <option selected disabled hidden>Jenis Tagihan</option>
                            <option value="1">KKN</option>
                            <option value="2">Wisuda</option>
                            <option value="3">MKI</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="">
                        <label for="exampleFormControlInput1" class="form-label">Status Pembayaran</label>
                        <select class="form-select" aria-label="Default select example">
                            <option selected disabled hidden>Status Pembayaran</option>
                            <option value="1">Lunas</option>
                            <option value="2">Belum Lunas</option>
                            <option value="3">Belum Bayar</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px">
                    <button class="btn btn-primary btn-block" style="width: 100%">Tampilkan</button>
                </div>
            </div>
        </div>
        <DataTable
            v-model:filters="filters"
            :globalFilterFields="['Mahasiswa.nim', 'Mahasiswa.nama_mahasiswa', 'Periode.periode_pelaporan', 'jumlah_tagihan', 'jenis-tagihan']"
            :value="tagihans"
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
                            <router-link to="/daftar-tagihan/create" class="btn btn-secondary"><i class="pi pi-plus me-2"></i> Tambah</router-link>
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
            <Column filterField="nim" header="NIM" style="min-width: 10rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span>{{ data.Mahasiswa.nim }}</span>
                    </div>
                </template>
            </Column>
            <Column filterField="nama_mahasiswa" header="Nama" style="min-width: 14rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span>{{ data.Mahasiswa.nama_mahasiswa }}</span>
                    </div>
                </template>
            </Column>
            <Column filterField="nama_jenis_tagihan" header="Jenis Tagihan" style="min-width: 10rem">
                <template #body="{ data }">
                    <div v-html="data.JenisTagihan.nama_jenis_tagihan"></div>
                </template>
            </Column>
            <Column filterField="periode_pelaporan" header="Periode" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ data.Periode.periode_pelaporan }}
                </template>
            </Column>
            <Column filterField="jumlah_tagihan" header="Nominal" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ data.jumlah_tagihan }}
                </template>
            </Column>
            <Column filterField="status_tagihan" header="Status Tagihan" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ data.status_tagihan }}
                </template>
            </Column>
            <Column header="Aksi" style="min-width: 10rem">
                <template #body="{ data }">
                    <div class="flex gap-2">
                        <router-link to="" class="btn btn-outline-primary">
                            <i class="pi pi-pencil"></i>
                            <!-- {{ console.log(data.id) }} -->
                        </router-link>
                        <button @click="confirmDelete(data.id_tagihan_mahasiswa)" class="btn btn-outline-danger">
                            <i class="pi pi-trash"></i>
                        </button>
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
