<script setup>
import Swal from 'sweetalert2';
import { ref, onBeforeMount } from 'vue';
import { get, del } from '../../../utiils/request';
import { FilterMatchMode } from 'primevue/api';
import Modal from '../../../components/Modal.vue';

const filters = ref({
    global: {
        value: null,
        matchMode: FilterMatchMode.CONTAINS
    },
    kode_sk: {
        value: null,
        matchMode: FilterMatchMode.EQUALS
    },
    nama_sk: {
        value: null,
        matchMode: FilterMatchMode.EQUALS
    }
});
const profileCamaba = ref([]);
const pemberkasanCamaba = ref([]);
const tagihanCamaba = ref([]);
const tahapTes = ref([]);
const show = ref(false);
const modalFile = ref('');

const getCamaba = async () => {
    try {
        const res = await get('camaba/get-camaba-aktif');
        // console.log(res);
        if (res.status === 200) {
            const data = res.data.data;
            console.log('mhs', data);
            profileCamaba.value = res.data.data;
        }
    } catch (error) {
        throw error;
    }
};

const getPemberkasanCamaba = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const response = await get(`pemberkasan-camaba/get-pemberkasan-camaba-aktif`);
        const data = response.data.data;
        pemberkasanCamaba.value = data;
        // console.log('pemberkasan', data);
        Swal.close();
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};

const getTagihanCamaba = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const response = await get(`tagihan-camaba/get-tagihan-camaba-aktif`);
        // console.log(response.data.data);
        tagihanCamaba.value = response.data.data;
        Swal.close();
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};

const getTahapTes = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const response = await get(`tahap-tes-camaba/get-tahap-tes-camaba-aktif`);
        console.log(response.data.data);
        tahapTes.value = response.data.data;
        Swal.close();
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};

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

onBeforeMount(() => {
    getCamaba();
    getPemberkasanCamaba();
    getTagihanCamaba();
    getTahapTes();
});
</script>

<template>
    <div class="card">
        <div class="row mb-4">
            <div class="col-12 text-center">
                <h3 class="fw-bold">Selamat Datang, {{ profileCamaba?.nama_lengkap }}!!</h3>
                <p>Lanjutkan proses pendaftaran dengan mengisi data diri Anda secara lengkap dan melakukan upload berkas.</p>
                <hr />
            </div>
        </div>
        <div class="row mb-4">
            <div class="col-12 d-flex justify-content-center">
                <div class="d-flex justify-content-between w-100" style="max-width: 600px">
                    <div class="text-center">
                        <router-link to="/biodata-pendaftar" class="d-block">
                            <i class="pi pi-user" style="font-size: 24px"></i>
                            <p>BIODATA PENDAFTAR</p>
                            <i class="pi pi-check-circle text-success"></i>
                        </router-link>
                    </div>

                    <div class="text-center">
                        <router-link to="/upload-foto" class="d-block">
                            <i class="pi pi-image" style="font-size: 24px"></i>
                            <p>UPLOAD FOTO</p>
                            <i class="pi pi-check-circle text-success"></i>
                        </router-link>
                    </div>

                    <div class="text-center">
                        <router-link to="/pilihan-prodi" class="d-block">
                            <i class="pi pi-book" style="font-size: 24px"></i>
                            <p>PROGRAM STUDI</p>
                            <i class="pi pi-check-circle text-success"></i>
                        </router-link>
                    </div>

                    <div class="text-center">
                        <router-link to="/upload-berkas" class="d-block">
                            <i class="pi pi-upload" style="font-size: 24px"></i>
                            <p>UPLOAD BERKAS</p>
                            <i class="pi pi-check-circle text-success"></i>
                        </router-link>
                    </div>

                    <div class="text-center">
                        <router-link to="/finalisasi-data" class="d-block">
                            <i class="pi pi-file" style="font-size: 24px"></i>
                            <p>FINALISASI</p>
                            <i class="pi pi-check-circle text-success"></i>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="col-12 col-md-6 col-lg-12">
                <h6><b>BERKAS PENDAFTAR</b></h6>
            </div>
            <DataTable v-model:filters="filters" :globalFilterFields="['kode_sk', 'nama_sk']" :value="pemberkasanCamaba" :paginator="true" :rows="10" dataKey="id" :rowHover="true" showGridlines>
                <template #header>
                    <div class="row">
                        <div class="col-lg-6 d-flex justify-content-start">
                            <IconField iconPosition="left">
                                <InputIcon class="pi pi-search" />
                                <InputText placeholder="Cari disini" v-model="filters['global'].value" style="width: 100%" />
                            </IconField>
                        </div>
                    </div>
                </template>

                <template #empty>
                    <div class="text-center">Tidak ada data</div>
                </template>
                <Column header="No" headerStyle="width:3rem">
                    <template #body="slotProps">
                        {{ slotProps.index + 1 }}
                    </template>
                </Column>
                <Column filterField="kode_sk" header="Nama Berkas" style="min-width: 15rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.BerkasPeriodePendaftaran.JenisBerkas.nama_berkas }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_sk" header="File Berkas" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex gap-2">
                            <button @click="showModal(data.file_berkas)" class="btn btn-outline-primary me-2">
                                <i class="pi pi-eye"></i>
                            </button>
                        </div>
                    </template>
                </Column>
                <Column filterField="status_berkas" header="Status Validasi" style="min-width: 15rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.status_berkas ? 'Berkas Valid' : 'Berkas Tidak Valid' }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_sk" header="Keterangan Berkas" style="min-width: 15rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.komentar_berkas }}</span>
                        </div>
                    </template>
                </Column>

                <!-- Modal Component for Viewing Files -->
                <Modal :show="show" @close="show = false" title="File Pemberkasan">
                    <!-- Check if modalFile exists and is an image by looking at the extension -->
                    <template v-if="modalFile && (modalFile.endsWith('.jpg') || modalFile.endsWith('.png') || modalFile.endsWith('.jpeg') || modalFile.endsWith('.gif'))">
                        <img :src="modalFile" class="img-fluid" alt="File Pemberkasan" />
                    </template>

                    <!-- If modalFile exists and is a PDF, show an embedded PDF viewer or a download link -->
                    <template v-else-if="modalFile && modalFile.endsWith('.pdf')">
                        <iframe :src="modalFile" width="100%" height="500px"></iframe>
                    </template>

                    <!-- If modalFile is not supported or empty, show a placeholder or message -->
                    <template v-else-if="modalFile">
                        <a :href="modalFile" target="_blank" class="btn btn-primary">Download File</a>
                    </template>

                    <!-- If modalFile is empty or null -->
                    <template v-else>
                        <p class="text-muted">Tidak ada file yang tersedia untuk ditampilkan.</p>
                    </template>
                </Modal>
            </DataTable>
        </div>

        <div class="card">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-12">
                    <h6><b>TAGIHAN DAN PEMBAYARAN</b></h6>
                </div>
                <div class="mb-3 row">
                    <div class="col-lg-12 d-flex justify-content-end">
                        <table class="table">
                            <thead class="table-dark">
                                <tr>
                                    <th>Jenis Tagihan</th>
                                    <th>Periode Tagihan</th>
                                    <th>Jumlah Tagihan</th>
                                    <th>Tanggal Akhir Tagihan</th>
                                    <th>Tanggal Lunas</th>
                                    <th>Status Tagihan</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{{ tagihanCamaba.JenisTagihan?.nama_jenis_tagihan }}</td>
                                    <td>{{ tagihanCamaba.Semester?.nama_semester }}</td>
                                    <td>{{ formatRupiah(tagihanCamaba.jumlah_tagihan) }}</td>
                                    <td>{{ formatTanggal(tagihanCamaba.tanggal_tagihan) }}</td>
                                    <td>{{ formatTanggal(tagihanCamaba.tanggal_lunas) }}</td>
                                    <td>{{ tagihanCamaba.status_tagihan }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <hr />
                <table>
                    <tbody>
                        <tr>
                            <td width="30%">Info Tagihan Lunas</td>
                            <td width="10%">:</td>
                            <td width="50%">Rp. 0</td>
                        </tr>
                        <tr>
                            <td>Info Tagihan Belum Bayar</td>
                            <td>:</td>
                            <td>Rp. 0</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="card">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-12">
                    <h6><b>JADWAL DAN HASIL TES</b></h6>
                </div>
                <DataTable v-model:filters="filters" :globalFilterFields="['nama_berkas', 'nama_sk']" :value="tahapTes" :paginator="true" :rows="10" dataKey="id" :rowHover="true" showGridlines>
                    <template #header>
                        <div class="row">
                            <div class="col-lg-6 d-flex justify-content-start">
                                <IconField iconPosition="left">
                                    <InputIcon class="pi pi-search" />
                                    <InputText placeholder="Cari disini" v-model="filters['global'].value" style="width: 100%" />
                                </IconField>
                            </div>
                        </div>
                    </template>

                    <template #empty>
                        <div class="text-center">Tidak ada data</div>
                    </template>
                    <Column filterField="nama_berkas" header="Tahapan Tes" style="min-width: 10rem">
                        <template #body="{ data }">
                            <div class="flex align-items-center gap-2">
                                <span>{{ data.TahapTesPeriodePendaftaran.urutan_tes }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column filterField="kode_sk" header="Nama Tes" style="min-width: 10rem">
                        <template #body="{ data }">
                            <div class="flex align-items-center gap-2">
                                <span>{{ data.TahapTesPeriodePendaftaran.JenisTe.nama_tes }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column filterField="nama_sk" header="Keterangan Tes" style="min-width: 15rem">
                        <template #body="{ data }">
                            <div class="flex align-items-center gap-2">
                                <span>{{ data.JenisTe?.keterangan_singkat || '-' }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column filterField="nama_sk" header="Tanggal Tes" style="min-width: 10rem">
                        <template #body="{ data }">
                            <div class="flex align-items-center gap-2">
                                <span>{{ formatTanggal(data.TahapTesPeriodePendaftaran.tanggal_awal_tes) }} - {{ formatTanggal(data.TahapTesPeriodePendaftaran.tanggal_akhir_tes) }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column filterField="status_berkas" header="Kelulusan Tes" style="min-width: 15rem">
                        <template #body="{ data }">
                            <div class="flex align-items-center gap-2">
                                <span>{{ data.status || '-' }}</span>
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>

        <div class="card">
            <div class="row mb-4">
                <div class="col-12 text-center">
                    <h3 class="fw-bold">Selamat {{ profileCamaba?.nama_lengkap }}!!</h3>
                    <p>Lanjutkan proses pendaftaran dengan mengisi data diri Anda secara lengkap dan melakukan upload berkas.</p>
                    <hr />
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
