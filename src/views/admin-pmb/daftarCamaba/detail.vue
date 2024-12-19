<script setup>
import Swal from 'sweetalert2';
import { ref, onBeforeMount } from 'vue';
import { get, del } from '../../../utiils/request';
import { FilterMatchMode } from 'primevue/api';
import { useRoute } from 'vue-router';
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

const sistemKuliahs = ref([]);
const camabas = ref([]);
const pemberkasanCamaba = ref([]);
const route = useRoute();
const show = ref(false);
const modalFile = ref('');
const message = ref('');

const sistemKuliah = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await get('sistem-kuliah');
        console.log(response.data.data);
        sistemKuliahs.value = response.data.data;
        Swal.close();
    } catch (error) {
        console.error('Gagal mengambil data sistemKuliah:', error);
    }
};
const getCamaba = async (id) => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const response = await get(`camaba/${id}/get`);
        console.log(response.data.data);
        camabas.value = response.data.data;
        Swal.close();
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};
const getPemberkasanCamaba = async (id) => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const response = await get(`pemberkasan-camaba/${id}/get-pemberkasan-camaba`);
        console.log(response.data.data);
        pemberkasanCamaba.value = response.data.data;
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

onBeforeMount(() => {
    sistemKuliah();

    const id = route.params.id || route.query.id;
    if (id) {
        getCamaba(id);
    }
    if (id) {
        getPemberkasanCamaba(id);
    }
});
</script>

<template>
    <div class="card">
        <div class="row">
            <div class="col-12 text-center">
                <h3 class="fw-bold">{{ camabas?.nama_lengkap || '-' }}!!</h3>
                <p>Berikan sebuah status kelulusan calon mahasiswa</p>
                <hr />
            </div>
        </div>

        <!-- Validasi Berkas-Berkas -->
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
                        <div class="col-lg-6 d-flex justify-content-end">
                            <div class="flex justify-content-end gap-2">
                                <router-link to="#" class="btn btn-primary"> <i class="pi pi-pencil me-2"></i>Validasi Dokumen</router-link>
                            </div>
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
                <Column filterField="nama_sk" header="File Berkas" style="min-width: 18rem">
                    <template #body="{ data }">
                        <div class="flex gap-2">
                            <button @click="showModal(data.file_berkas)" class="btn btn-outline-primary me-2">
                                <i class="pi pi-eye"></i>
                            </button>
                        </div>
                    </template>
                </Column>
                <Column filterField="status_berkas" header="Status Validasi" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.status_berkas ? 'Lulus' : 'Tidak Lulus' }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="keterangan_singkat" header="Keterangan Validasi" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.BerkasPeriodePendaftaran.JenisBerkas.keterangan_singkat }}</span>
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

        <!-- View Status Pembayaran Mahasiswa -->
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
                                    <th>No.</th>
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
                                    <td>1</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
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

        <!-- Validasi Hasil Tes Camaba -->
        <div class="card">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-12">
                    <h6><b>PENILAIAN TES PENDAFTAR</b></h6>
                </div>
            </div>
            <DataTable v-model:filters="filters" :globalFilterFields="['nama_berkas', 'nama_sk']" :value="sistemKuliahs" :paginator="true" :rows="10" dataKey="id" :rowHover="true" showGridlines>
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
                                <router-link to="#" class="btn btn-primary"> <i class="pi pi-pencil me-2"></i> Ubah Hasil Tes </router-link>
                            </div>
                        </div>
                    </div>
                </template>

                <template #empty>
                    <div class="text-center">Tidak ada data</div>
                </template>
                <Column filterField="nama_berkas" header="Tahapan Tes" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.status_berkas }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="kode_sk" header="Jenis Tes" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.kode_sk }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_sk" header="Tanggal Tes" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nama_sk }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_sk" header="Keterangan Tes" style="min-width: 15rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nama_sk }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_sk" header="Status Kelulusan" style="min-width: 15rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nama_sk }}</span>
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>

        <!-- STATUS KELULUSAN CALON MAHASISWA DISINI -->
        <div class="card">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-12">
                    <h6><b>STATUS KELULUSAN CALON MAHASISWA</b></h6>
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label for="status" class="col-sm-3 col-form-label">Kelulusan Berkas</label>
                <div class="col-md-7">
                    <select class="form-select" id="status">
                        <option value="" disabled selected>Belum Ditentukan</option>
                        <option value="1">Lulus</option>
                        <option value="2">Tidak Lulus</option>
                    </select>
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label for="status" class="col-sm-3 col-form-label">Kelulusan Tes</label>
                <div class="col-md-7">
                    <select class="form-select" id="status">
                        <option value="" disabled selected>Belum Ditentukan</option>
                        <option value="1">Lulus</option>
                        <option value="2">Tidak Lulus</option>
                    </select>
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label for="status" class="col-sm-3 col-form-label">Program Studi Diterima</label>
                <div class="col-md-7">
                    <select class="form-select" id="status">
                        <option value="" disabled selected>Pilih Program Studi</option>
                        <option value="1">Prodi 1</option>
                        <option value="2">Prodi 2</option>
                    </select>
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label class="col-sm-3 col-form-label">Status Finalisasi</label>
                <div class="col-md-7">
                    <input type="checkbox" title="Sudah melakukan finalisasi data" />
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label class="col-sm-3 col-form-label">Status Akun Pendaftar</label>
                <div class="col-md-7">
                    <input type="checkbox" title="Pendaftar bisa login ke portal PMB" />
                </div>
            </div>
            <div class="mb-3 row d-flex">
                <div class="col-md-3 text-center">
                    <button class="btn btn-success" type="button">Simpan</button>
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
