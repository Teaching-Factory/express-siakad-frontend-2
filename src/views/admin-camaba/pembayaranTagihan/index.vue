<!-- <script setup>
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
    },
});

const tagihanMahasiswa = ref([])

const fetchTagihanMahasiswa = async () => {
    try{
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await get('tagihan-mahasiswa/get-tagihan-by-mahasiswa-active')
        tagihanMahasiswa.value = response.data.data
        Swal.close()
    }catch(error){
        console.error('Gagal mengambil data :', error);
    }
}

onMounted(() => {
    fetchTagihanMahasiswa()
})
</script>

<template>
    <div class="card">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button"
                    role="tab" aria-controls="home" aria-selected="true">Info Tagihan</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button"
                    role="tab" aria-controls="profile" aria-selected="false">Info Pembayaran</button>
            </li>
        </ul>

        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <div class="mt-3">
                    <DataTable v-model:filters="filters" :globalFilterFields="['id_tagihan_mahasiswa', 'JenisTagihan.jenis_tagihan', 'Periode.periode_pelaporan','jumlah_tagihan', 'status_tagihan']" :value="tagihanMahasiswa" :paginator="true" :rows="10" dataKey="id" :rowHover="true"
                         showGridlines>
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
                                {{ data.id }}
                            </template>
                        </Column>
                        <Column filterField="jenis_tagihan" header="Jenis Tagihan" style="min-width: 13rem">
                            <template #body="{ data }">
                                {{ data.id }}
                            </template>
                        </Column>
                        <Column filterField="periode_pelaporan" header="Periode Tagihan" style="min-width: 10rem">
                            <template #body="{ data }">
                                {{ data.id }}
                            </template>
                        </Column>
                        <Column filterField="jumlah_tagihan" header="Jumlah Tagihan" style="min-width: 10rem">
                            <template #body="{ data }">
                                <div class="flex align-items-center gap-2">
                                    <span>Rp. {{ data.id }}</span>
                                </div>
                            </template>
                        </Column>
                        <Column filterField="status_tagihan" header="Status Tagihan" style="min-width: 14rem">
                            <template #body="{ data }">
                                <div class="flex align-items-center gap-2">
                                    <span>{{ data.id }}</span>
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

                    <hr>
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
            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
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
</template>

<style scoped>
.card-theme {
    background-color: rgba(154, 160, 172, 0.5);
}
</style>
 -->

 <script setup>
import { onMounted } from 'vue';
import { getData } from '../../../utiils/request';
import { ref } from 'vue';

</script>

<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="data-user" data-bs-toggle="tab"
                                data-bs-target="#home" type="button" role="tab" aria-controls="home"
                                aria-selected="true">Info Tagihan</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="data-wali" data-bs-toggle="tab"
                                data-bs-target="#profile" type="button" role="tab" aria-controls="profile"
                                aria-selected="false">Info Pembayaran</button>
                        </li>
                        
                    </ul>


                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="home" role="tabpanel"
                            aria-labelledby="data-user">

                            <!-- Info Tagihan -->
                            <div class="mb-3 mt-4 row">
                                <div class="col-lg-12 d-flex justify-content-end">
                                    <table class="table">
                                        <thead class="table-dark">
                                            <tr>
                                                <th>No.</th>
                                                <th>Jenis Tagihan</th>
                                                <th>Periode Tagihan</th>
                                                <th>Jumlah Tagihan</th>
                                                <th>Tanggal Akhir Tagihan</th>
                                                <th>Tanggal Lunas</th>
                                                <th>Status Tagihan</th>
                                                <th>Aksi</th>
                                                
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>         
                                                <td>-</td>         
                                                <td>-</td>         
                                                <td>-</td>         
                                                <td>-</td>         
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <hr>
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
                        

                        <!-- Info Pembayaran-->
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

