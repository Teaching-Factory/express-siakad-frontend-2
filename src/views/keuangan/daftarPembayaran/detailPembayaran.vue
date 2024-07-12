<script setup>
import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';
import Modal from '../../../components/Modal.vue';
import { useRoute } from 'vue-router';
import { get } from '../../../utiils/request';

const route = useRoute();
const detailPembayaran = ref([]);
const id_tagihan_mahasiswa = route.params.id_tagihan_mahasiswa;
const first = ref(0);
const show = ref(false);
const modalImage = ref('');

const fetchDetailPembayaran = async (id_tagihan_mahasiswa) => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await get(`pembayaran-mahasiswa/tagihan-mahasiswa/${id_tagihan_mahasiswa}/get`);
        detailPembayaran.value = response.data.data;
        // console.log(response.data.data);
        Swal.close();
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};

const showModal = (imagePath) => {
    // Mengubah path dari C:\\xampp\\js-projects\\express-siakad-backend\\src\\storage\\bukti-tagihan-pembayaran menjadi /storage/bukti-tagihan-pembayaran/
    modalImage.value = imagePath.replace('C:\\xampp\\js-projects\\express-siakad-backend\\src\\storage\\bukti-tagihan-pembayaran', '/storage/bukti-tagihan-pembayaran');
    console.log('Path gambar:', modalImage.value); // Debug path gambar
    show.value = true;
};

const onPageChange = (event) => {
    first.value = event.first;
};

onMounted(() => {
    if (id_tagihan_mahasiswa) {
        fetchDetailPembayaran(id_tagihan_mahasiswa);
    } else {
        Swal.fire({
            title: 'Error',
            text: 'ID Tagihan Mahasiswa tidak tersedia',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
});
</script>

<template>
    <div class="card mt-3">
        <h5><i class="pi pi-user me-2"></i>DETAIL PEMBAYARAN</h5>
        <DataTable :value="detailPembayaran" :paginator="true" :rows="10" dataKey="id" :rowHover="true" showGridlines :first="first" @page="onPageChange">
            <template #header>
                <div class="row">
                    <div class="col-lg-6 d-flex justify-content-start">
                        <IconField iconPosition="left">
                            <InputIcon class="pi pi-search" />
                            <InputText placeholder="Cari disini" style="width: 100%" />
                        </IconField>
                    </div>
                </div>
            </template>

            <template #empty>
                <div class="text-center">Tidak ada data.</div>
            </template>
            <Column field="no" header="No" style="min-width: 5rem">
                <template #body="slotProps">
                    {{ first + slotProps.index + 1 }}
                </template>
            </Column>
            <Column header="ID Pembayaran" style="min-width: 8rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span>{{ data.id_pembayaran_mahasiswa }}</span>
                    </div>
                </template>
            </Column>
            <Column header="Bukti Pembayaran" style="min-width: 10rem">
                <template #body="{ data }">
                    <button @click="showModal(data.upload_bukti_tf)" class="btn btn-outline-primary me-2">
                        <i class="pi pi-eye"></i>
                    </button>
                </template>
            </Column>
            <Column header="Tanggal Bayar" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ data.tanggalbayar }}
                </template>
            </Column>
            <Column header="Status" style="min-width: 10rem">
                <template #body="{ data }">
                    <!-- {{ data.tanggalbayar }} -->
                    <select class="form-select" aria-label="Default select example">
                        <option selected disabled hidden>{{ data.status_pembayaran }}</option>
                        <option value="1">Dikonfirmasi</option>
                        <option value="2">Ditolak</option>
                    </select>
                </template>
            </Column>
            <Column header="Aksi" style="min-width: 10rem">
                <template #body="{}">
                    <router-link to="#" class="btn btn-outline-danger me-2"> <i class="pi pi-check"></i></router-link>
                </template>
            </Column>
        </DataTable>
        <Modal :show="show" @close="show = false" title="Bukti Pembayaran">
            <template #body>
                <img :src="modalImage" class="img-fluid" alt="Bukti Pembayaran" />
            </template>
            <template #footer>
                <button @click="show = false" class="btn btn-secondary">Close</button>
            </template>
        </Modal>
    </div>
</template>
<style scoped>
.card-theme {
    background-color: rgba(154, 160, 172, 0.5);
}
</style>