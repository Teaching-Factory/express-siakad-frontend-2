

 <script setup>
import { onBeforeMount, onMounted } from 'vue';
import { get, getData } from '../../../utiils/request';
import { ref } from 'vue';
import Swal from 'sweetalert2';
import Modal from '../../../components/Modal.vue';
import { getToken } from '../../../service/auth';
import axios from 'axios';
import { API_URL } from '../../../config/config';

const tagihanCamabas = ref([]);
const show = ref(false);
const modalFile = ref('');
const upload_bukti = ref(null);

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
        const response = await get('tagihan-camaba/get-tagihan-camaba-aktif');
        console.log(response.data);
        tagihanCamabas.value = response.data;
        Swal.close();
    } catch (error) {
        console.error('Gagal mengambil data:', error);
    }
};
const showModal = (filePath) => {
    // Assuming the file path could be an image or a PDF, handle accordingly
    modalFile.value = filePath;
    show.value = true;
};

const handleFileUpload = (event) => {
    upload_bukti.value = event.target.files[0]; // Store the selected file in file_berkas
};

const uploadBuktiPembayaran = async () => {
    if (!upload_bukti.value) {
        Swal.fire('GAGAL', 'Silakan pilih file untuk diupload.', 'error');
        return;
    }

    const formData = new FormData();
    formData.append('upload_bukti', upload_bukti.value); // Corrected key

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

        const response = await axios.put(`${API_URL}/tagihan-camaba/upload-bukti-pembayaran-camaba-aktif`, formData, {
            headers: {
                Authorization: token
            }
        });

        Swal.close();
        Swal.fire('BERHASIL!', 'Data berhasil ditambahkan.', 'success').then(() => {
            window.location.href = '/pembayaran-tagihan';
        });
    } catch (error) {
        Swal.fire('GAGAL', 'Gagal menambahkan data. Silakan coba lagi.', 'error');
    }
};

const formatTanggal = (tanggal) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(tanggal).toLocaleDateString('id-ID', options);
};

const formatRupiah = (biaya) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(biaya);
};
onBeforeMount(() => {
    getTagihanCamaba();
});
</script>

<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="data-user" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Info Tagihan</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="data-wali" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Info Pembayaran</button>
                        </li>
                    </ul>

                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="data-user">
                            <!-- Info Tagihan -->
                            <div class="mb-3 mt-4 row">
                                <div class="col-lg-12 d-flex justify-content-end">
                                    <table class="table">
                                        <thead class="table-dark">
                                            <tr>
                                                <th>Jenis</th>
                                                <th>Periode</th>
                                                <th>Jumlah</th>
                                                <th>Tanggal Akhir</th>
                                                <th>Tanggal Lunas</th>
                                                <th>Status</th>
                                                <th>Bukti Pembayaran</th>
                                                <th>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <!-- Loop through tagihanCamabas and display the data -->
                                            <tr v-for="(tagihan, index) in tagihanCamabas" :key="index">
                                                <td>{{ tagihan.JenisTagihan?.nama_jenis_tagihan || '-' }}</td>
                                                <td>{{ tagihan.Semester?.nama_semester || '-' }}</td>
                                                <td>{{ formatRupiah(tagihan.jumlah_tagihan) }}</td>
                                                <td>{{ formatTanggal(tagihan.tanggal_tagihan) }}</td>
                                                <td>{{ formatTanggal(tagihan.tanggal_lunas || '-') }}</td>
                                                <td>{{ tagihan.status_tagihan }}</td>
                                                <td>
                                                    <!-- Show file upload button if there's no bukti -->
                                                    <label v-if="!tagihan.upload_bukti" class="btn btn-outline-warning me-2">
                                                        <i class="pi pi-upload"></i>
                                                        <input type="file" class="form-control d-none" id="profileImage" @change="handleFileUpload" accept=".png,.jpg,.jpeg" />
                                                    </label>
                                                    <!-- Show check button if bukti is uploaded -->
                                                    <button v-else class="btn btn-outline-primary me-2" @click="showModal(tagihan.upload_bukti)">
                                                        <i class="pi pi-eye"></i>
                                                    </button>
                                                </td>
                                                <td>
                                                    <button v-if="!tagihan.upload_bukti" @click="uploadBuktiPembayaran" class="btn btn-outline-success me-2">
                                                        <i class="pi pi-check"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                        <!-- Modal Component for Viewing Files -->
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

                        <!-- Info Pembayaran -->
                        <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="data-wali">
                            <div class="row mt-3">
                                <div class="col-lg-12">
                                    <h6 class="text-dark">Langkah-Langkah :</h6>
                                    <ol class="lh-2 text-small">
                                        <li>Silakan melakukan pembayaran pada bagian keuangan Perguruan Tinggi.</li>
                                        <li>Transfer ke Nomor Rekening Berikut : Bank BRI: (BRI) 171901000001305 a.n. Yayasan Puspa Dunia</li>
                                        <li>Jika sudah melakukan pembayaran, silahkan lakukan konfirmasi pada kontak PMB berikut: 087654654876</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
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

