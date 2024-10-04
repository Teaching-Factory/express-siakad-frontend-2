<script setup>
import { ref, onBeforeMount } from 'vue';
import { get, del } from '../../../utiils/request';
import { FilterMatchMode } from 'primevue/api';
import Swal from 'sweetalert2';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nama_berkas: { value: null, matchMode: FilterMatchMode.EQUALS },
    keterangan_singkat: { value: null, matchMode: FilterMatchMode.EQUALS },
    wajib: { value: null, matchMode: FilterMatchMode.EQUALS },
    upload: { value: null, matchMode: FilterMatchMode.EQUALS },
    jumlah: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const jenis_berkas = ref([]);
const message = ref('');

const jenisBerkas = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await get('jenis-berkas/'); // Memanggil fungsi get dengan endpoint 'jenisBerkas'
        console.log(response.data.data);
        jenis_berkas.value = response.data.data;
        Swal.close();
    } catch (error) {
        console.error('Gagal mengambil data ruang Perkuliahan:', error);
    }
};

const deleteItem = async (id) => {
    try {
        const response = await del(`jenis-berkas/${id}/delete`);
        if (response.status === 200) {
            message.value = 'Data berhasil dihapus!';
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
            jenis_berkas.value = jenis_berkas.value.filter((data) => data.id !== id);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('BATAL', 'Data Anda Tidak Jadi Dihapus', 'error');
        }
    });
};

onBeforeMount(() => {
    jenisBerkas();
});
</script>

    <template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>JENIS BERKAS</h5>
        <div class="card">
            <DataTable v-model:filters="filters" :globalFilterFields="['nama_berkas', 'keterangan_singkat', 'jumlah', 'wajib', 'upload']" :value="jenis_berkas" :paginator="true" :rows="10" dataKey="id" :rowHover="true" showGridlines>
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
                                <router-link to="/jenis-berkas/create" class="btn btn-primary"> <i class="pi pi-plus me-2"></i> Tambah</router-link>
                            </div>
                        </div>
                    </div>
                </template>

                <template #empty>
                    <div class="text-center">Tidak ada data.</div>
                </template>
                <!-- <template #loading> Loading customers data. Please wait. </template> -->
                <Column header="No" headerStyle="width:3rem">
                    <template #body="slotProps">
                        {{ slotProps.index + 1 }}
                    </template>
                </Column>
                <Column filterField="nama_berkas" header="Nama Syarat" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nama_berkas }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="keterangan_singkat" header="Keterangan Singkat" style="min-width: 20`rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.keterangan_singkat }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="jumlah" header="Jumlah" style="min-width: 5rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.jumlah }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="wajib" header="Wajib" style="min-width: 5rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.wajib ? 'Wajib' : 'Tidak Wajib' }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="upload" header="Upload" style="min-width: 5rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.upload ? 'Wajib' : 'Tidak Wajib' }}</span>
                        </div>
                    </template>
                </Column>
                <Column header="Aksi" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex gap-2">
                            <router-link :to="`/jenis-berkas/${data.id}/edit`" class="btn btn-outline-primary">
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
