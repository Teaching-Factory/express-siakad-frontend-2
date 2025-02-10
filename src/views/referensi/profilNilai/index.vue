<script setup>
import { ref, onBeforeMount } from 'vue';
import { get, del } from '../../../utiils/request';
import { FilterMatchMode } from 'primevue/api';
import Swal from 'sweetalert2';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nilai_huruf: { value: null, matchMode: FilterMatchMode.EQUALS },
    nilai_indeks: { value: null, matchMode: FilterMatchMode.EQUALS },
    nilai_min: { value: null, matchMode: FilterMatchMode.EQUALS },
    nilai_max: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const profilNilai = ref([]);
const message = ref('');

const getProfilNilai = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await get('profil-penilaian/'); // Memanggil fungsi get dengan endpoint 'getProfilNilai'
        profilNilai.value = response.data.data;
        Swal.close();
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};

onBeforeMount(() => {
    getProfilNilai();
});
</script>

    <template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>DAFTAR RENTANG PENILAIAN</h5>
        <div class="card">
            <DataTable v-model:filters="filters" :globalFilterFields="['nilai_min', 'nilai_max', 'niilai_indeks', 'nilai_huruf']" :value="profilNilai" :paginator="true" :rows="10" dataKey="id" :rowHover="true" showGridlines>
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
                    <div class="text-center">Tidak ada data.</div>
                </template>
                <!-- <template #loading> Loading customers data. Please wait. </template> -->
                <Column header="No" headerStyle="width:3rem">
                    <template #body="slotProps">
                        {{ slotProps.index + 1 }}
                    </template>
                </Column>
                <Column filterField="nilai_min" header="Nilai Min" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nilai_min }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nilai_max" header="Nilai Max" style="min-width: 20rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nilai_max }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nilai_indeks" header="Nilai Index" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nilai_indeks }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nilai_huruf" header="Nilai Huruf" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nilai_huruf }}</span>
                        </div>
                    </template>
                </Column>
                <Column header="Aksi" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex gap-2">
                            <router-link :to="`/profil-penilaian/${data.id}/edit`" class="btn btn-outline-primary" title="edit">
                                <i class="pi pi-pencil"></i>
                            </router-link>
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
