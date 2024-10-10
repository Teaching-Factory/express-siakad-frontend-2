<script setup>
import { ref, onBeforeMount } from 'vue';
import { get, del } from '../../../utiils/request';
import { FilterMatchMode } from 'primevue/api';
import Swal from 'sweetalert2';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    id_ruang: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_ruang_perkuliahan: { value: null, matchMode: FilterMatchMode.EQUALS },
    lokasi: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const skalaPenilaians = ref([]);
const message = ref('');

const skalaPenilaian = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await get('skala-penilaian-dosen/'); // Memanggil fungsi get dengan endpoint 'skalaPenilaian'
        console.log(response.data.data);
        skalaPenilaians.value = response.data.data;
        Swal.close();
    } catch (error) {
        console.error('Gagal mengambil data ruang Perkuliahan:', error);
    }
};

const deleteItem = async (id) => {
    try {
        const response = await del(`skala-penilaian-dosen/${id}/delete`);
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
            skalaPenilaians.value = skalaPenilaians.value.filter((data) => data.id !== id);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('BATAL', 'Data Anda Tidak Jadi Dihapus', 'error');
        }
    });
};

onBeforeMount(() => {
    skalaPenilaian();
});
</script>

    <template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>DAFTAR SKALA PENILAIAN</h5>
        <div class="card">
            <DataTable v-model:filters="filters" :globalFilterFields="['id_ruang', 'nama_ruang_perkuliahan', 'lokasi']" :value="skalaPenilaians" :paginator="true" :rows="10" dataKey="id" :rowHover="true" showGridlines>
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
                                <router-link to="/skala-penilaian-dosen/create" class="btn btn-primary"> <i class="pi pi-plus me-2"></i> Tambah</router-link>
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
                <Column filterField="keterangan_skala_penilaian" header="Skala Penilaian" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.keterangan_skala_penilaian }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="poin_skala_penilaian" header="Poin Penilaian" style="min-width: 15rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.poin_skala_penilaian }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_semester" header="Periode" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.Semester.nama_semester }}</span>
                        </div>
                    </template>
                </Column>
                <!-- <Column filterField="nama_ruang_perkuliahan" header="Tanggal Pembuatan" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nama_ruang_perkuliahan }}</span>
                        </div>
                    </template>
                </Column> -->
                <Column header="Aksi" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex gap-2">
                            <router-link :to="`/skala-penilaian-dosen/${data.id}/edit`" class="btn btn-outline-primary">
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
