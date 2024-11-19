<script setup>
import { ref, onBeforeMount } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import Swal from 'sweetalert2';
import { del, get, getData } from '../../../utiils/request';
import Modal from '../../../components/Modal.vue';
import axios from 'axios';
import { getToken } from '../../../service/auth';
import { API_URL } from '../../../config/config';

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
const jenisTagihans = ref([]);
const modalFile = ref('');
const show = ref(false);
const first = ref(0);
const message = ref('');
const selectedPeriode = ref('');
const selectedJenisTagihan = ref('');
const selectedStatusPembayaran = ref('');
const selectedValidasi = ref([]);

const getPeriode = async () => {
    const response = await get('semester/');
    periodes.value = response.data.data;
};
const getJenisTagihan = async () => {
    const response = await get('periode-pendaftaran/');
    jenisTagihans.value = response.data.data;
};

const filterData = async () => {
    Swal.fire({
        title: 'Loading...',
        html: 'Sedang Memuat Data',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    const id_periode = selectedPeriode.value;
    const id_jenis_tagihan = selectedJenisTagihan.value;
    const status_tagihan = selectedStatusPembayaran.value;

    // Menggunakan axios untuk GET request dengan query parameters
    const response = await getData(`tagihan-camaba/${id_periode}/${id_jenis_tagihan}/get?status_tagihan=${status_tagihan}`);

    const filterMahasiswa = response.data.data;
    tagihans.value = filterMahasiswa;

    Swal.close();
};

const updateValidasi = async () => {
    if (selectedValidasi.value.length === 0) {
        Swal.fire('PERINGATAN!', 'Tidak ada data KRS mahasiswa yang dipilih.', 'warning');
        return; // Hentikan eksekusi fungsi jika tidak ada data yang dipilih
    }

    const token = getToken();

    const url = `${API_URL}/tagihan-camaba/validasi-tagihan-camaba-kolektif`;

    // Persiapkan data untuk permintaan PUT
    const data = {
        tagihan_camabas: selectedValidasi.value.map((tagihan) => ({
            id: tagihan.id
        }))
    };

    const response = await axios.put(
        url,
        data, // Body permintaan
        {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json' // Tambahkan header Content-Type
            }
        }
    );

    Swal.fire('BERHASIL!', 'Pembayaran Berhasil di Validasi.', 'success').then(() => {
        window.location.href = '/tagihan-camaba';
    });
};

const onPageChange = (event) => {
    first.value = event.first;
};

onBeforeMount(() => {
    // fetchTagihan();
    getPeriode();
    getJenisTagihan();
});

const showModal = (filePath) => {
    // Assuming the file path could be an image or a PDF, handle accordingly
    modalFile.value = filePath;
    show.value = true;
};

const formatTanggal = (tanggal) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(tanggal).toLocaleDateString('id-ID', options);
};

const formatRupiah = (biaya) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(biaya);
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
                            <option v-for="periode in periodes" :key="periode.id_semester" :value="periode.id_semester">{{ periode.nama_semester }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Periode Tagihan</label>
                        <select v-model="selectedJenisTagihan" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Periode Pendaftaran</option>
                            <option v-for="tagihan in jenisTagihans" :key="tagihan.id" :value="tagihan.id">{{ tagihan.nama_periode_pendaftaran }}</option>
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
        <DataTable v-model:filters="filters" :globalFilterFields="[]" v-model:selection="selectedValidasi" :value="tagihans" :paginator="true" :rows="10" dataKey="id" :rowHover="true" showGridlines :first="first" @page="onPageChange">
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
                            <button @click="updateValidasi" class="btn btn-secondary"><i class="pi pi-check me-2"></i> Disetujui</button>
                        </div>
                    </div>
                </div>
            </template>

            <template #empty>
                <div class="text-center">Tidak ada data.</div>
            </template>
            <Column selectionMode="multiple" headerStyle="width: 3em"></Column>
            <Column filterField="nim" header="Nomor Pendaftaran" style="min-width: 12rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span>{{ data.Camaba.nomor_daftar }}</span>
                    </div>
                </template>
            </Column>
            <Column filterField="nama_mahasiswa" header="Nama" style="min-width: 14rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span>{{ data.Camaba.nama_lengkap }}</span>
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
                    {{ formatRupiah(data.jumlah_tagihan) }}
                </template>
            </Column>
            <Column filterField="status_tagihan" header="Tanggal Akhir Tagihan" style="min-width: 13rem">
                <template #body="{ data }">
                    {{ formatTanggal(data.tanggal_tagihan) }}
                </template>
            </Column>
            <Column filterField="status_tagihan" header="Tanggal Lunas" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ formatTanggal(data.tanggal_lunas) }}
                </template>
            </Column>
            <Column filterField="status_tagihan" header="Status Tagihan" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ data.status_tagihan }}
                </template>
            </Column>
            <Column header="Bukti Pembayaran" style="min-width: 10rem">
                <template #body="{ data }">
                    <button @click="showModal(data.upload_bukti)" class="btn btn-outline-primary me-2">
                        <i class="pi pi-eye"></i>
                    </button>
                </template>
            </Column>
            <Modal :show="show" @close="show = false" title="File Pemberkasan">
                <!-- Check if the file is an image by looking at the extension -->
                <template v-if="modalFile.endsWith('.jpg') || modalFile.endsWith('.png') || modalFile.endsWith('.jpeg') || modalFile.endsWith('.gif')">
                    <img :src="modalFile" class="img-fluid" alt="File Pemberkasan" />
                </template>

                <!-- If the file is a PDF, show an embedded PDF viewer or a download link -->
                <template v-else-if="modalFile.endsWith('.pdf')">
                    <iframe :src="modalFile" width="100%" height="500px"></iframe>
                </template>

                <!-- If the file type is not supported, show a download link -->
                <template v-else>
                    <a :href="modalFile" target="_blank" class="btn btn-primary">Download File</a>
                </template>
            </Modal>
        </DataTable>
    </div>
</template>

<style scoped>
.card-theme {
    background-color: rgba(154, 160, 172, 0.5);
}
</style>
