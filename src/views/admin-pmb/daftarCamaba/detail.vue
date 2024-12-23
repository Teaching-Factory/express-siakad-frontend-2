<script setup>
import Swal from 'sweetalert2';
import { ref, onBeforeMount } from 'vue';
import { get, del } from '../../../utiils/request';
import { FilterMatchMode } from 'primevue/api';
import { useRoute } from 'vue-router';
import Modal from '../../../components/Modal.vue';
import { getToken } from '../../../service/auth';
import axios from 'axios';
import { API_URL } from '../../../config/config';

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

const pembiayaan = ref([]);
const camabas = ref([]);
const pemberkasanCamaba = ref([]);
const tagihanCamaba = ref([]);
const tahapTes = ref([]);
const prodiCamaba = ref([]);
const route = useRoute();
const show = ref(false);
const modalFile = ref('');

const message = ref('');
const selectedStatusBerkas = ref('');
const selectedPembiayaan = ref('');
const selectedBerkas = ref('');
const selectedTes = ref('');
const selectedProdi = ref('');
const status_finalisasi = ref(false);
const status_akun = ref(false);

const getPembiayaan = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await get('pembiayaan/');
        console.log(response.data.data);
        pembiayaan.value = response.data.data;
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
        const data = response.data.data;
        camabas.value = data;

        console.log('object', data);

        (selectedBerkas.value = data.status_berkas),
            (selectedTes.value = data.status_tes),
            (selectedProdi.value = data.id_prodi_diterima),
            (status_finalisasi.value = data.finalisasi),
            (status_akun.value = data.status_akun_pendaftar),
            (selectedPembiayaan.value = data.id_pembiayaan);

        Swal.close();
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};
const getProdiCamaba = async (id) => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const response = await get(`prodi-camaba/${id}/get-prodi-camaba`);
        console.log(response.data.data);
        prodiCamaba.value = response.data.data;
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
        const data = response.data.data;
        pemberkasanCamaba.value = data;
        Swal.close();
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};

const getTagihanCamaba = async (id) => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const response = await get(`tagihan-camaba/${id}/get-tagihan-camaba`);
        console.log(response.data.data);
        tagihanCamaba.value = response.data.data;
        Swal.close();
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};
const getTahapTes = async (id) => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const response = await get(`tahap-tes-periode-pendaftaran/${id}/get-tahap-tes-periode-pendaftaran-camaba`);
        console.log(response.data.data);
        tahapTes.value = response.data.data;
        Swal.close();
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};

const updatePemberkasan = async () => {
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
        const id = route.params.id;

        // Buat payload berdasarkan data pemberkasanCamaba
        const payload = {
            pemberkasan_camabas: pemberkasanCamaba.value.map((item) => ({
                id: item.id,
                status_berkas: item.status_berkas // Ambil status_berkas dari data item
            }))
        };

        const response = await axios.put(`${API_URL}/pemberkasan-camaba/${id}/validasi-pemberkasan-camaba`, payload, {
            headers: {
                Authorization: token
            }
        });

        Swal.close();
        Swal.fire('BERHASIL!', 'Data berhasil diperbarui.', 'success').then(() => {
            window.location.reload();
        });
    } catch (error) {
        Swal.close();
        console.error('Error update data:', error.response ? error.response.data : error.message);
        Swal.fire('GAGAL', `Gagal memperbarui data: ${error.response ? error.response.data.message : error.message}`, 'error');
    }
};

const updateKelulusanCamaba = async () => {
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
        const id = route.params.id;

        // Buat payload berdasarkan data pemberkasanCamaba
        const payload = {
            status_berkas: selectedBerkas.value,
            status_tes: selectedTes.value,
            id_prodi_diterima: selectedProdi.value,
            id_pembiayaan: selectedPembiayaan.value,
            finalisasi: status_finalisasi.value,
            status_akun_pendaftar: status_akun.value
        };

        const response = await axios.put(`${API_URL}/camaba/detail-camaba/${id}/update-status-kelulusan-pendaftar`, payload, {
            headers: {
                Authorization: token
            }
        });

        Swal.close();
        Swal.fire('BERHASIL!', 'Data berhasil diperbarui.', 'success').then(() => {
            window.location.reload();
        });
    } catch (error) {
        Swal.close();
        console.error('Error update data:', error.response ? error.response.data : error.message);
        Swal.fire('GAGAL', `Gagal memperbarui data: ${error.response ? error.response.data.message : error.message}`, 'error');
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
    getPembiayaan();

    const id = route.params.id || route.query.id;
    if (id) {
        getCamaba(id);
    }
    if (id) {
        getPemberkasanCamaba(id);
    }
    if (id) {
        getTagihanCamaba(id);
    }
    if (id) {
        getTahapTes(id);
    }
    if (id) {
        getProdiCamaba(id);
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
                                <button @click="updatePemberkasan" class="btn btn-primary"><i class="pi pi-save me-2"></i>Simpan</button>
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
                        <div>
                            <select v-model="data.status_berkas" class="form-select" id="status">
                                <option value="" disabled selected>Status Validasi</option>
                                <option value="true">Berkas Valid</option>
                                <option value="false">Berkas Tidak Valid</option>
                            </select>
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

        <!-- Validasi Hasil Tes Camaba -->
        <div class="card">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-12">
                    <h6><b>PENILAIAN TES PENDAFTAR</b></h6>
                </div>
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
                        <div class="col-lg-6 d-flex justify-content-end">
                            <div class="flex justify-content-end gap-2">
                                <router-link to="#" class="btn btn-primary"> <i class="pi pi-save me-2"></i> Simpan </router-link>
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
                            <span>{{ data.urutan_tes }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="kode_sk" header="Nama Tes" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.JenisTe.nama_tes }}</span>
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
                            <span>{{ formatTanggal(data.tanggal_awal_tes) }} - {{ formatTanggal(data.tanggal_akhir_tes) }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_sk" header="Kelulusan Tes" style="min-width: 15rem">
                    <template #body="{}">
                        <div class="flex align-items-center gap-2">
                            <!-- <span>{{ data.nama_sk }}</span> -->
                            <input type="input-text" placeholder="Masukkan nilai tes atau keterangan lain" />
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
                    <select v-model="selectedBerkas" class="form-select" id="status">
                        <option value="" disabled selected>Belum Ditentukan</option>
                        <option value="true">Lulus</option>
                        <option value="false">Tidak Lulus</option>
                    </select>
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label for="status" class="col-sm-3 col-form-label">Kelulusan Tes</label>
                <div class="col-md-7">
                    <select v-model="selectedTes" class="form-select" id="status">
                        <option value="" disabled selected>Belum Ditentukan</option>
                        <option value="true">Lulus</option>
                        <option value="false">Tidak Lulus</option>
                    </select>
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label for="status" class="col-sm-3 col-form-label">Program Studi Diterima</label>
                <div class="col-md-7">
                    <select v-model="selectedProdi" class="form-select" id="status">
                        <option value="" disabled selected>Pilih Program Studi</option>
                        <option v-for="prodi in prodiCamaba" :key="prodi.id_prodi" :value="prodi.id_prodi">{{ prodi.Prodi.JenjangPendidikan.nama_jenjang_didik }} - {{ prodi.Prodi.nama_program_studi }}</option>
                    </select>
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label for="status" class="col-sm-3 col-form-label">Jenis Pembiayaan</label>
                <div class="col-md-7">
                    <select v-model="selectedPembiayaan" class="form-select" id="status">
                        <option value="" disabled selected>Pilih Pembiayaan</option>
                        <option v-for="jenisPembiayaan in pembiayaan" :key="jenisPembiayaan.id_pembiayaan" :value="jenisPembiayaan.id_pembiayaan">
                            {{ jenisPembiayaan.nama_pembiayaan }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label class="col-sm-3 col-form-label">Status Finalisasi</label>
                <div class="col-md-7">
                    <input v-model="status_finalisasi" type="checkbox" title="Sudah melakukan finalisasi data" />
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label class="col-sm-3 col-form-label">Status Akun Pendaftar</label>
                <div class="col-md-7">
                    <input v-model="status_akun" type="checkbox" title="Pendaftar bisa login ke portal PMB" />
                </div>
            </div>
            <div class="mb-3 row d-flex">
                <div class="col-md-3 text-center">
                    <button @click="updateKelulusanCamaba" class="btn btn-success" type="button">Simpan</button>
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
