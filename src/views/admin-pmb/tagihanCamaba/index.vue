<script setup>
import { ref, onBeforeMount } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import Swal from 'sweetalert2';
import { del, get, getData } from '../../../utiils/request';
import { getToken } from '../../../service/auth';
import { API_URL } from '../../../config/config';
import axios from 'axios';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nim: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_mahasiswa: { value: null, matchMode: FilterMatchMode.EQUALS },
    periode_pelaporan: { value: null, matchMode: FilterMatchMode.EQUALS },
    jumlah_tagihan: { value: null, matchMode: FilterMatchMode.EQUALS },
    status_tagihan: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const tagihans = ref([]);
const periodes = ref([]);
const prodis = ref([]);
const jenisTagihans = ref([]);
const statusPembayarans = ref([]);
const first = ref(0);
const message = ref('');
const selectedProdi = ref('');
const selectedPeriode = ref('');
const selectedJenisTagihan = ref('');
const selectedStatusPembayaran = ref('');

const getPeriode = async () => {
    try {
        const response = await get('periode');
        periodes.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data sistemKuliah:', error);
    }
};
const getProdi = async () => {
    try {
        const response = await get('prodi');
        prodis.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data sistemKuliah:', error);
    }
};
const getJenisTagihan = async () => {
    try {
        const response = await get('jenis-tagihan');
        jenisTagihans.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data sistemKuliah:', error);
    }
};
const filterData = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const id_periode = selectedPeriode.value;
        const id_prodi = selectedProdi.value;
        const id_jenis_tagihan = selectedJenisTagihan.value;
        const status_tagihan = selectedStatusPembayaran.value;

        // Menggunakan axios untuk GET request dengan query parameters
        const response = await getData(`tagihan-mahasiswa/get-tagihan-mahasiswa-by-filter?id_periode=${id_periode}&id_prodi=${id_prodi}&id_jenis_tagihan=${id_jenis_tagihan}&status_tagihan=${status_tagihan}`);

        const filterMahasiswa = response.data.data;
        tagihans.value = filterMahasiswa;

        Swal.close();
    } catch (error) {
        console.error('Gagal mengambil data mahasiswa:', error);
        Swal.fire('Gagal', 'Data Mahasiswa tidak ditemukan.', 'warning').then(() => {});
    }
};

// const fetchTagihan = async () => {
//     try {
//         Swal.fire({
//             title: 'Loading...',
//             html: 'Sedang Memuat Data',
//             allowOutsideClick: false,
//             didOpen: () => {
//                 Swal.showLoading();
//             }
//         });
//         const response = await get('tagihan-mahasiswa');
//         // console.log(response.data.data);
//         tagihans.value = response.data.data;
//         Swal.close();
//     } catch (error) {
//         console.error('Gagal mengambil data sistemKuliah:', error);
//     }
// };

const onPageChange = (event) => {
    first.value = event.first;
};

onBeforeMount(() => {
    // fetchTagihan();
    getPeriode();
    getProdi();
    getJenisTagihan();
});

const showModal = (imagePath) => {
    modalImage.value = imagePath;
    console.log('Path gambar:', modalImage.value); // Debug path gambar
    show.value = true;
};

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
        <h5><i class="pi pi-user me-2"></i>DAFTAR TAGIHAN CALON MAHASISWA BARU</h5>
        <div class="card">
            <div class="row">
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Semester</label>
                        <select v-model="selectedPeriode" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Semester</option>
                            <option v-for="periode in periodes" :key="periode.id_periode" :value="periode.id_periode">{{ periode.periode_pelaporan }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Periode Tagihan</label>
                        <select v-model="selectedPeriode" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Periode</option>
                            <option v-for="periode in periodes" :key="periode.id_periode" :value="periode.id_periode">{{ periode.periode_pelaporan }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="">
                        <label for="exampleFormControlInput1" class="form-label">Status Pembayaran</label>
                        <select v-model="selectedStatusPembayaran" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Status Pembayaran</option>
                            <option value="true">Lunas</option>
                            <option value="false">Belum Bayar</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px">
                    <button @click="filterData" class="btn btn-primary btn-block" style="width: 100%">Tampilkan</button>
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
                            <router-link to="/#" class="btn btn-secondary"><i class="pi pi-check me-2"></i> Disetujui</router-link>
                        </div>
                    </div>
                </div>
            </template>

            <template #empty>
                <div class="text-center">Tidak ada data.</div>
            </template>

            <!-- <Column header="No" headerStyle="width:3rem">
                <template #body="slotProps">
                    {{ first + slotProps.index + 1 }}
                </template>
            </Column> -->
            <Column selectionMode="multiple" headerStyle="width: 3em"></Column>
            <Column filterField="nim" header="Nomor Pendaftaran" style="min-width: 12rem">
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
            <Column filterField="jumlah_tagihan" header="Periode Tagihan" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ data.jumlah_tagihan }}
                </template>
            </Column>
            <Column filterField="status_tagihan" header="Jumlah Tagihan" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ data.status_tagihan }}
                </template>
            </Column>
            <Column filterField="status_tagihan" header="Tanggal Akhir Tagihan" style="min-width: 13rem">
                <template #body="{ data }">
                    {{ data.status_tagihan }}
                </template>
            </Column>
            <Column filterField="status_tagihan" header="Tanggal Lunas" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ data.status_tagihan }}
                </template>
            </Column>
            <Column filterField="status_tagihan" header="Status Tagihan" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ data.status_tagihan }}
                </template>
            </Column>
            <Column header="Bukti Pembayaran" style="min-width: 10rem">
                <template #body="{ data }">
                    <button @click="showModal(data.upload_bukti_tf)" class="btn btn-outline-primary me-2">
                        <i class="pi pi-eye"></i>
                    </button>
                </template>
            </Column>
            <!-- <Column header="Aksi" style="min-width: 10rem">
                <template #body="{ data }">
                    <div class="flex gap-2">
                        <router-link :to="`/detail-pembayaran/${data.id_tagihan_mahasiswa}`" class="btn btn-outline-secondary"> <i class="pi pi-eye"></i> </router-link>
                        <router-link :to="`/daftar-tagihan/${data.id_tagihan_mahasiswa}/update`" class="btn btn-outline-primary">
                            <i class="pi pi-pencil"></i>
                            
                        </router-link>
                        <button @click="confirmDelete(data.id_tagihan_mahasiswa)" class="btn btn-outline-danger">
                            <i class="pi pi-trash"></i>
                        </button>
                    </div>
                </template>
            </Column> -->
        </DataTable>
    </div>
</template>

<style scoped>
.card-theme {
    background-color: rgba(154, 160, 172, 0.5);
}
</style>
