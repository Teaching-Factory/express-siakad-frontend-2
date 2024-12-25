<script setup>
import Swal from 'sweetalert2';
import { getJenisTagihan } from '../../../service/jenisTagihan';
import { onMounted, ref } from 'vue';
import { delData } from '../../../utiils/request';

const isLoading = ref(false);
const jenisTagihans = ref([]);
const message = ref('');
const filters = ref({ global: { value: '' } });

const fetchJenisTagihan = async () => {
    const response = await getJenisTagihan();
    if(response.status === 200) {
        jenisTagihans.value = response.data.data;
    }
}

const confirmDelete = (id_jenis_tagihan) => {
    Swal.fire({
        title: "Apakah anda yakin?",
        text: "Data jenis tagihan akan dihapus!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Hapus!"
    }).then(async (result) => {
        if (result.isConfirmed) {
            const res = await delData(`jenis-tagihan/${id_jenis_tagihan}/delete`);
            if (res.status === 200) {
                Swal.fire('Terhapus', 'Jenis tagihan berhasil dihapus', 'success');
                fetchJenisTagihan();
            } else {
                throw new Error('Gagal menghapus data');
            }
        }
    });
}

onMounted(() => {
    fetchJenisTagihan();
});
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>DAFTAR JENIS TAGIHAN</h5>
        <div class="card">
            <DataTable 
            v-model:filters="filters" 
            :globalFilterFields="['nama_jenis_tagihan']" 
            :value="jenisTagihans" 
            :paginator="true" 
            :rows="10" 
            dataKey="id_jenis_tagihan" 
            :rowHover="true" 
            showGridlines
            :loading="isLoading">
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
                                <router-link to="/jenis-tagihan/create" class="btn btn-primary"> <i class="pi pi-plus me-2"></i> Tambah </router-link>
                            </div>
                        </div>
                    </div>
                </template>

                <template #loading>
                    <div class="text-center">
                        <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" />
                        <p>Memuat Data....</p>
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
                <Column filterField="nama_jenis_tagihan" header="Nama Jenis Tagihan" style="min-width: 20rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nama_jenis_tagihan }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="status" header="Status" style="min-width: 20rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <Badge :type="data.status ? 'badge-success' : 'badge-danger' " class="ml-2">{{ data.status ? 'Aktif' : 'Tidak Aktif' }}</Badge>
                        </div>
                    </template>
                </Column>
            
                <Column header="Aksi" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex gap-2">
                            <router-link :to=" `/jenis-tagihan/edit/${data.id_jenis_tagihan}` " class="btn btn-outline-primary" title="edit">
                                <i class="pi pi-pencil"></i>
                            </router-link>
                            <button @click="confirmDelete(data.id_jenis_tagihan)" btn="submit" class="btn btn-outline-danger" title="delete">
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
