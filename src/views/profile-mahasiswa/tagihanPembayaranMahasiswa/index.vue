<script setup>
import { ref, onBeforeMount } from 'vue';
import { get } from '../../../utiils/request';
import Swal from 'sweetalert2';
import { onMounted } from 'vue';
import { FilterMatchMode } from 'primevue/api';

const filters = ref({
    global: {
        value: null,
        matchMode: FilterMatchMode.CONTAINS
    },
    id_tagihan_mahasiswa: {
        value: null,
        matchMode: FilterMatchMode.EQUALS
    },
    jumlah_tagihan: {
        value: null,
        matchMode: FilterMatchMode.EQUALS
    },
    periode_pelaporan: {
        value: null,
        matchMode: FilterMatchMode.EQUALS
    },
    nama_jenis_tagihan: {
        value: null,
        matchMode: FilterMatchMode.EQUALS
    },
    status_tagihan: {
        value: null,
        matchMode: FilterMatchMode.EQUALS
    }
});

const tagihanMahasiswa = ref([]);

const fetchTagihanMahasiswa = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await get('tagihan-mahasiswa/get-tagihan-by-mahasiswa-active');
        tagihanMahasiswa.value = response.data.data;
        Swal.close();
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};

const formatTanggal = (tanggal) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(tanggal).toLocaleDateString('id-ID', options);
};

const formatRupiah = (biaya) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(biaya);
};

onMounted(() => {
    fetchTagihanMahasiswa();
});
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>DAFTAR TAGIHAN MAHASISWA</h5>
        <div class="card">
            <div class="row">
                <DataTable
                        v-model:filters="filters"
                        :globalFilterFields="['id_tagihan_mahasiswa', 'JenisTagihan.jenis_tagihan', 'Periode.periode_pelaporan', 'jumlah_tagihan', 'status_tagihan']"
                        :value="tagihanMahasiswa"
                        :paginator="true"
                        :rows="10"
                        dataKey="id"
                        :rowHover="true"
                        showGridlines
                    >
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
                        <Column filterField="id_tagihan_mahasiswa" header="ID Pembayaran" style="min-width: 20rem">
                            <template #body="{ data }">
                                {{ data.id_tagihan_mahasiswa }}
                            </template>
                        </Column>
                        <Column filterField="jenis_tagihan" header="Jenis Tagihan" style="min-width: 13rem">
                            <template #body="{ data }">
                                {{ data.JenisTagihan.nama_jenis_tagihan }}
                            </template>
                        </Column>
                        <Column filterField="periode_pelaporan" header="Periode Tagihan" style="min-width: 10rem">
                            <template #body="{ data }">
                                {{ data.Periode.periode_pelaporan }}
                            </template>
                        </Column>
                        <Column filterField="jumlah_tagihan" header="Jumlah Tagihan" style="min-width: 10rem">
                            <template #body="{ data }">
                                <div class="flex align-items-center gap-2">
                                    <span>{{ formatRupiah(data.jumlah_tagihan) }}</span>
                                </div>
                            </template>
                        </Column>
                        <Column filterField="status_tagihan" header="Status Tagihan" style="min-width: 14rem">
                            <template #body="{ data }">
                                <div class="flex align-items-center gap-2">
                                    <span>{{ data.status_tagihan }}</span>
                                </div>
                            </template>
                        </Column>
                        <Column header="Aksi" style="min-width: 5rem">
                            <template #body="{ data }">
                                <router-link :to="`/detail-pembayaran-mahasiswa/${data.id_tagihan_mahasiswa}`" class="btn btn-outline-primary me-2">
                                    <i class="pi pi-eye"></i>
                                </router-link>
                            </template>
                        </Column>
                    </DataTable>

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
    </div>
</template>

<style scoped>
.card-theme {
    background-color: rgba(154, 160, 172, 0.5);
}
</style>
