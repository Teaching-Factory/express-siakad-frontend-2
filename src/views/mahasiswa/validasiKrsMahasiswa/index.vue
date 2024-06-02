<script setup>
import { ref, onBeforeMount } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import Swal from 'sweetalert2';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.EQUALS },
    nim: { value: null, matchMode: FilterMatchMode.EQUALS },
    prodi: { value: null, matchMode: FilterMatchMode.EQUALS },
    jumlahsks: { value: null, matchMode: FilterMatchMode.EQUALS },
    detailkrs: { value: null, matchMode: FilterMatchMode.EQUALS },
    statusmhs: { value: null, matchMode: FilterMatchMode.EQUALS },
    statusvalidasi: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const customer1 = ref([]);
const loading1 = ref(false);
const selectedMhs = ref([]);

onBeforeMount(() => {
    customer1.value = [
        {
            nim: '12345678',
            name: 'John Doe',
            prodi: 'coba@gmail.com',
            jumlahsks: '24 sks',
            detailkrs: 'Lihat KRS',
            statusmhs: 'Aktif',
            statusvalidasi: 'Tervalidasi',
            aksi: `
            <div class="actions gap-2">
                <router-link to="/import-mahasiswa" class="btn btn-outline-primary"> <i class="pi pi-pencil"></i></router-link>
                <button type="button" class="btn btn-outline-danger"> <i class="pi pi-times"></i></button>
            </div>`
        },
        {
            nim: '87654321',
            name: 'John Doe',
            prodi: 'coba@gmail.com',
            jumlahsks: '24 sks',
            detailkrs: 'Lihat KRS',
            statusmhs: 'Aktif',
            statusvalidasi: 'Tervalidasi',
            aksi: `
            <div class="actions gap-2">
                <router-link to="/" class="btn btn-outline-primary"> <i class="pi pi-pencil"></i></router-link>
                <button type="button" class="btn btn-outline-danger"> <i class="pi pi-times"></i></button>
            </div>`
        }
        // Add more dummy data here
    ];
});
const confirmDelete = (no) => {
    Swal.fire({
        title: 'Apa Kamu yakin',
        text: 'Ini Aida Andinar Maulidiana',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, saya yakin!',
        cancelButtonText: 'Batal',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            deleteItem(no);
            Swal.fire('Berhasil!', 'Data berhasil dihapus.', 'success');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('Berhasil', 'Data Anda Tidak Jadi Dihapus', 'error');
        }
    });
};

const deleteItem = (no) => {
    customer1.value = customer1.value.filter((item) => item.no !== no);
};
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>VALIDASI KRS MAHASISWA - 2021/2022 GENAP</h5>
            <div class="card" style="padding: 0rem 1rem 0rem 1rem">
                <div class="row">
                    <div class="col-12 col-md-6 col-lg-12">
                        <h6 class="text-dark">Keterangan :</h6>
                        <p class="lh-1 text-small">
                            <ol>
                            <li>Fitur ini menampilkan seluruh daftar mahasiswa yang telah melakukan KRS. </li>
                            <li>Disarankan Mahasiswa sudah di set Dosen Wali terlebih dahulu.</li>
                            <li>Untuk melakukan validasi KRS Online, centang pada mahasiswa yang akan divalidasi KRS Online tanpa melalui dosen wali terlebih dahulu. kemudian klik tombol "PROSES VALIDASI"</li>
                            <li>Untuk membatalkan validasi KRS Online, klik tombol hapus pada mahasiswa yang diinginkan.</li>
                            <li>Fitur ini hanya digunakan untuk membantu proses validasi oleh admin, proses validasi sebenarnya terdapat pada login dosen wali.</li>
                            <li>KRS Mahasiswa yang dapat divalidasi ialah Mahasiswa yang memiliki status aktivitas perkuliahan AKTIF.</li>
                            <li>Fitur pencarian bisa di lakukan berdasarkan NIM atau Nama Mahasiswa.</li>
                            <li>Tidak Ada Jenis Tagihan yang menjadi syarat KRS, bila ingin meng-set tagihan yang menjadi flag KRS hubungi admin keuangan.</li>
                        </ol>
                        </p>
                    </div>
                </div>
            </div>
            <DataTable v-model:filters="filters" :globalFilterFields="['name', 'nim', 'prodi', 'jumlahsks', 'detailkrs ', 'statusmhs', 'statusvalidasi']"
                :value="customer1"
                v-model:selection="selectedMhs"
                :paginator="true"
                :rows="10"
                dataKey="id"
                :rowHover="true"
                :loading="loading1"
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
                        <div class="col-lg-6 d-flex justify-content-end">
                            <div class="flex justify-content-end gap-2">
                                <button class="btn btn-danger"> <i class="pi pi-refresh me-2"></i> Sinkronkan</button>
                                <button class="btn btn-primary"> <i class="pi pi-check me-2"></i> Proses Validasi</button>
                            </div>
                        </div>
                    </div>
                </template>

                <template #empty>
                    <div class="text-center">Tidak ada data.</div>
                </template>
                <template #loading>
                    Loading customers data. Please wait.
                </template>
                <Column selectionMode="multiple" headerStyle="width: 3em"></Column>
                <Column filterField="nim" header="NIM" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nim }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="name" header="Nama Mahasiswa" style="min-width: 14rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.name }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="prodi" header="Program Studi" style="min-width: 15rem">
                    <template #body="{ data }">
                        {{ data.prodi }}
                    </template>
                </Column>
                <Column filterField="jumlahsks" header="Jumlah SKS" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.jumlahsks }}
                    </template>
                </Column>
                <Column filterField="detailkrs" header="Detail KRS" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.detailkrs }}
                    </template>
                </Column>
                <Column filterField="statusmhs" header="Status Mahasiswa" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.statusmhs }}
                    </template>
                </Column>
                <Column filterField="statusvalidasi" header="Status Validasi" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.statusvalidasi}}
                    </template>
                </Column>
                <Column header="Aksi" style="min-width: 10rem">
                    <template #body="{ data }">
                        <router-link to="/import-mahasiswa" class="btn btn-outline-primary me-2"> 
                            <i class="pi pi-pencil"></i>
                        </router-link>
                        
                        <button class="btn btn-outline-danger" @click="confirmDelete(data.no)">
                            <i class="pi pi-trash"></i>
                        </button>
                    </template>
                </Column>
            </DataTable>
    </div>
</template>

<style scoped>
.card-theme {
    background-color: rgba(154, 160, 172, 0.5);
}
</style>
