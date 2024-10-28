<script setup>
import { ref, onBeforeMount } from 'vue';
import { get, del } from '../../../utiils/request';
import { FilterMatchMode } from 'primevue/api';
import Swal from 'sweetalert2';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    id_ruang: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_ruang_perkuliahan: { value: null, matchMode: FilterMatchMode.EQUALS },
});

const periodePendaftarans = ref([]);
const message = ref('');

const periodePendaftaran = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await get('periode-pendaftaran/'); // Memanggil fungsi get dengan endpoint 'periodePendaftarans'
        console.log(response.data.data);
        periodePendaftarans.value = response.data.data;
        Swal.close();
    } catch (error) {
        console.error('Gagal mengambil data ruang Perkuliahan:', error);
    }
};

const deleteItem = async (id) => {
    try {
        const response = await del(`periode-pendaftaran/${id}/delete`);
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
            periodePendaftarans.value = periodePendaftarans.value.filter((data) => data.id !== id);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('BATAL', 'Data Anda Tidak Jadi Dihapus', 'error');
        }
    });
};

const formatTanggal = (tanggal) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(tanggal).toLocaleDateString('id-ID', options);
};

const formatRupiah = (biaya) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(biaya);
}

onBeforeMount(() => {
    periodePendaftaran();
});
</script>

    <template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>PERIODE PENDAFTARAN</h5>
        <div class="card">
            <DataTable v-model:filters="filters" :globalFilterFields="['id_ruang', 'nama_ruang_perkuliahan']" :value="periodePendaftarans" :paginator="true" :rows="10" dataKey="id" :rowHover="true" showGridlines>
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
                                <router-link to="/periode-pendaftaran-create" class="btn btn-primary"> <i class="pi pi-plus me-2"></i> Tambah</router-link>
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
                <Column filterField="nama_periode_pendaftaran" header="Nama Periode Pendaftaran" style="min-width: 20rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nama_periode_pendaftaran }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="tanggal_awal_pendaftaran" header="Periode Dibuka" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ formatTanggal(data.tanggal_awal_pendaftaran) }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="JalurMasuk.nama_jalur_masuk" header="Jalur Pendaftaran" style="min-width: 15rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.JalurMasuk.nama_jalur_masuk }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="SistemKuliah.nama_sk" header="Sistem Kuliah" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.SistemKuliah.nama_sk }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="tanggal_awal_pendaftaran" header="Tanggal Pendaftaran" style="min-width: 15rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ formatTanggal(data.tanggal_awal_pendaftaran) }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="berbayar" header="Berbayar" style="min-width: 8rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.berbayar ? 'Wajib' : 'Tidak Wajib' }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="dibuka" header="Dibuka" style="min-width: 8rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.dibuka ? 'Wajib' : 'Tidak Wajib' }}</span>
                        </div>
                    </template>
                </Column>
                <Column header="Aksi" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex gap-2">
                            <router-link :to="`/periode-pendaftaran-create/${data.id}/edit`" class="btn btn-outline-secondary">
                                <i class="pi pi-list"></i>
                            </router-link>
                            <router-link :to="`/periode-pendaftaran-create/${data.id}/edit`" class="btn btn-outline-warning">
                                <i class="pi pi-eye"></i>
                            </router-link>
                            <router-link :to="`/periode-pendaftaran-create/${data.id}/edit`" class="btn btn-outline-primary">
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
