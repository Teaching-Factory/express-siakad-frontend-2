<script setup>
import Swal from 'sweetalert2';
import { ref, onBeforeMount } from 'vue';
import { get, del } from '../../../utiils/request';
import { FilterMatchMode } from 'primevue/api';
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

const pemberkasans = ref([]);
const message = ref('');
const file_berkas = ref(null);
const isUploadModalVisible = ref(false);
const selectedId = ref(null);

const pemberkasan = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await get('pemberkasan-camaba/get-pemberkasan-camaba-aktif');
        console.log(response.data.data);
        pemberkasans.value = response.data.data;
        Swal.close();
    } catch (error) {
        console.error('Gagal mengambil data pemberkasan:', error);
    }
};

const handleFileUpload = (event) => {
    file_berkas.value = event.target.files[0]; // Perbaikan: gunakan event.target.files
};

const showUploadModal = (id) => {
    selectedId.value = id; // Menyimpan ID berkas yang dipilih
    isUploadModalVisible.value = true;
};

const uploadBerkas = async (id) => {
    if (!file_berkas.value) {
        Swal.fire('GAGAL', 'Silakan pilih file untuk diupload.', 'error');
        return;
    }

    const formData = new FormData();
    formData.append('file_berkas', file_berkas.value); // Corrected key

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

        const response = await axios.put(`${API_URL}/pemberkasan-camaba/${id}/update-file-pemberkasan-camaba-aktif`, formData, {
            headers: {
                Authorization: token
            }
        });

        Swal.close();
        Swal.fire('BERHASIL!', 'Data berhasil ditambahkan.', 'success').then(() => {
            isUploadModalVisible.value = false;
            file_berkas.value = null;
            window.location.href = '/upload-berkas';
        });
    } catch (error) {
        Swal.fire('GAGAL', 'Gagal menambahkan data. Silakan coba lagi.', 'error');
    }
};

const showModal = (filePath) => {
    // Assuming the file path could be an image or a PDF, handle accordingly
    modalFile.value = filePath;
    show.value = true;
};

const show = ref(false);
const modalFile = ref('');

// const deleteItem = async (id) => {
//     try {
//         const response = await del(`sistem-kuliah/${id}/delete`);
//         if (response.status === 200) {
//             message.value = 'Data berhasil dihapus!';
//             // Menghapus item dari array pemberkasans yang memiliki id yang sesuai
//             // pemberkasans.value = pemberkasans.value.filter((data) => data.id !== id);
//         } else {
//             message.value = 'Terjadi kesalahan: ' + response.statusText;
//         }
//     } catch (error) {
//         message.value = 'Terjadi kesalahan: ' + error.message;
//     }
// };

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
            pemberkasans.value = pemberkasans.value.filter((data) => data.id !== id);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('BATAL', 'Data Anda Tidak Jadi Dihapus', 'error');
        }
    });
};

onBeforeMount(() => {
    pemberkasan();
});
</script>
    <template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>BERKAS PENDAFTARAN</h5>
        <div class="card">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-12">
                    <h6 class="text-dark">Keterangan :</h6>
                    <ol class="lh-2 text-small">
                        <li>Tipe File yang dibolehkan PDF, JPG, PNG, GIF</li>
                        <li>Maksimal ukuran setiap file adalah 5 MB</li>
                        <li>Dapat menambahkan dokumen tambahan pada form dibawahnya</li>
                    </ol>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-md-6 col-lg-12">
                    <h6><b>DOKUMEN YANG WAJIB DILAMPIRKAN</b></h6>
                </div>
            </div>
            <DataTable v-model:filters="filters" :globalFilterFields="['kode_sk', 'nama_sk']" :value="pemberkasans" :paginator="true" :rows="10" dataKey="id" :rowHover="true" showGridlines>
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
                <!-- <template #loading> Loading data. Please wait. </template> -->
                <Column header="No" headerStyle="width:3rem">
                    <template #body="slotProps">
                        {{ slotProps.index + 1 }}
                    </template>
                </Column>
                <Column filterField="nama_berkas" header="Nama Berkas" style="min-width: 15rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.BerkasPeriodePendaftaran.JenisBerkas.nama_berkas }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="keterangan_singkat" header="Deskripsi" style="min-width: 20rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.BerkasPeriodePendaftaran.JenisBerkas.keterangan_singkat }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_sk" header="Wajib" style="min-width: 5rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.BerkasPeriodePendaftaran.JenisBerkas.wajib ? 'Ya' : 'Tidak ' }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_sk" header="File Berkas" style="min-width: 10rem">
                    <template #body="{ data }">
                        <button @click="showModal(data.file_berkas)" class="btn btn-outline-primary me-2" :disabled="!data.file_berkas">
                            <i class="pi pi-eye"></i>
                        </button>
                    </template>
                </Column>
                <Column filterField="nama_sk" header="Status Validasi" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nama_sk }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_sk" header="Keterangan Validasi" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nama_sk }}</span>
                        </div>
                    </template>
                </Column>

                <Column header="Aksi" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex gap-2">
                            <label class="btn btn-outline-primary">
                                <i class="pi pi-upload"></i>
                                <button class="form-control d-none" @click="showUploadModal(data.id)"></button>
                            </label>
                            <button @click="confirmDelete(data.id)" class="btn btn-outline-danger">
                                <i class="pi pi-trash"></i>
                            </button>
                        </div>
                    </template>
                </Column>

                <Modal v-if="isUploadModalVisible" :show="isUploadModalVisible" title="Upload Berkas" size="md" @close="isUploadModalVisible = false">
                    <form @submit.prevent="uploadBerkas(selectedId)">
                        <div class="mb-3">
                            <label for="file" class="form-label">Upload Berkas Pendaftaran <span class="text-danger">*</span></label>
                            <input type="file" class="form-control" id="file" @change="handleFileUpload" />
                        </div>
                        <button type="submit" class="btn btn-primary">Upload</button>
                    </form>
                </Modal>

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
            </DataTable>
        </div>

        <div class="card">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-12">
                    <h6><b>DOKUMEN TAMBAHAN</b></h6>
                    <p class="text-dark">Upload disini untuk melampirkan data sertifikasi, prestasi, atau dokumen penting lainnya.</p>
                </div>
            </div>
            <DataTable v-model:filters="filters" :globalFilterFields="['kode_sk', 'nama_sk']" :value="pemberkasans" :paginator="true" :rows="10" dataKey="id" :rowHover="true" showGridlines>
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
                                <router-link to="/upload-berkas/create" class="btn btn-primary"> <i class="pi pi-plus me-2"></i> Tambah </router-link>
                            </div>
                        </div>
                    </div>
                </template>

                <template #empty>
                    <div class="text-center">Tidak ada data</div>
                </template>
                <!-- <template #loading> Loading data. Please wait. </template> -->
                <Column header="No" headerStyle="width:3rem">
                    <template #body="slotProps">
                        {{ slotProps.index + 1 }}
                    </template>
                </Column>
                <Column filterField="kode_sk" header="Nama Berkas" style="min-width: 15rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.kode_sk }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="kode_sk" header="File Berkas" style="min-width: 15rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.kode_sk }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_sk" header="Deskripsi Singkat" style="min-width: 20rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nama_sk }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_sk" header="Jenis Berkas" style="min-width: 18rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nama_sk }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_sk" header="Status Validasi" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nama_sk }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_sk" header="Keterangan Validasi" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nama_sk }}</span>
                        </div>
                    </template>
                </Column>

                <Column header="Aksi" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex gap-2">
                            <router-link :to="`/sistem-kuliah/edit/${data.id}`" class="btn btn-outline-primary">
                                <i class="pi pi-pencil"></i>
                            </router-link>
                            <button @click="confirmDelete(data.id)" class="btn btn-outline-danger">
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
