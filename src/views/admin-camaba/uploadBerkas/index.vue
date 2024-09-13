<script setup>
import Swal from 'sweetalert2';
import { ref, onBeforeMount } from 'vue';
import { get, del } from '../../../utiils/request';
import { FilterMatchMode } from 'primevue/api';

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

const deleteItem = async (id) => {
    try {
        const response = await del(`sistem-kuliah/${id}/delete`);
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
            sistemKuliahs.value = sistemKuliahs.value.filter((data) => data.id !== id);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('BATAL', 'Data Anda Tidak Jadi Dihapus', 'error');
        }
    });
};

onBeforeMount(() => {
    sistemKuliah();
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
                        
                    </ol>
                </div>
            </div>
            <DataTable v-model:filters="filters" :globalFilterFields="['kode_sk', 'nama_sk']" :value="sistemKuliahs" :paginator="true" :rows="10" dataKey="id" :rowHover="true" showGridlines>
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
                <Column filterField="kode_sk" header="Nama Berkas" style="min-width: 15rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.kode_sk }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_sk" header="Deskripsi" style="min-width: 20rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nama_sk }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_sk" header="Wajib" style="min-width: 5rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nama_sk }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_sk" header="File Berkas" style="min-width: 18rem">
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
                                <!-- {{ console.log(data.id) }} -->
                            </router-link>
                            <button @click="confirmDelete(data.id)" class="btn btn-outline-danger">
                                <i class="pi pi-trash"></i>
                            </button>
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>

        <div class="card">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-12">
                    <h6><b>DOKUMEN TAMBAHAN</b></h6>
                    <p class="text-dark">Upload disini untuk melampirkan data sertifikasi, prestasi, atau dokumen penting lainnya.</p>
                </div>
            </div>
            <DataTable v-model:filters="filters" :globalFilterFields="['kode_sk', 'nama_sk']" :value="sistemKuliahs" :paginator="true" :rows="10" dataKey="id" :rowHover="true" showGridlines>
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
                                <!-- {{ console.log(data.id) }} -->
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
