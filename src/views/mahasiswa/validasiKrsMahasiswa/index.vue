<script setup>
import { ref, onBeforeMount } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import Swal from 'sweetalert2';
import { get } from '../../../utiils/request';
import { getToken } from '../../../service/auth';
import { API_URL } from '../../../config/config';
import axios from 'axios';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nama_mahasiswa: { value: null, matchMode: FilterMatchMode.EQUALS },
    nim: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_program_studi: { value: null, matchMode: FilterMatchMode.EQUALS },
    total_sks: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_status_mahasiswa: { value: null, matchMode: FilterMatchMode.EQUALS },
    statusvalidasi: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const validasiKRS = ref([]);
const loading1 = ref(false);
const selectedValidasi = ref([]);

const fetchValidasi = async () => {
    try {
        const response = await get('krs-mahasiswa/get-mahasiswa-krs-tervalidasi');
        const validasi = response.data.data;
        validasiKRS.value = validasi;
    } catch (error) {
        console.error('Gagal mengambil data:', error);
    }
};
const updateValidasi = async () => {
    try {
        if (selectedValidasi.value.length === 0) {
            Swal.fire('PERINGATAN!', 'Tidak ada data KRS mahasiswa yang dipilih.', 'warning');
            return; // Hentikan eksekusi fungsi jika tidak ada data yang dipilih
        }

        const token = getToken();
        const url = `${API_URL}/krs-mahasiswa/validasi-krs`;

        // Persiapkan data untuk permintaan PUT
        const data = {
            mahasiswas: selectedValidasi.value.map((mahasiswa) => ({
                id_registrasi_mahasiswa: mahasiswa.id_registrasi_mahasiswa
            }))
        };

        const response = await axios.put(
            url,
            data, // Body permintaan
            {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json' // Tambahkan header Content-Type
                }
            }
        );

        Swal.fire('BERHASIL!', 'KRS Berhasil di Validasi.', 'success').then(() => {});
        console.log('Status berhasil diperbarui:', response.data);
    } catch (error) {
        console.error('Gagal memperbarui status:', error);
    }
};
onBeforeMount(() => {
    fetchValidasi();
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
    validasiKRS.value = validasiKRS.value.filter((item) => item.no !== no);
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
            <DataTable v-model:filters="filters" :globalFilterFields="['nama_mahasiswa', 'nim', 'Periode.Prodi.nama_program_studi', 'total_sks', 'nama_status_mahasiswa', 'statusvalidasi']"
                :value="validasiKRS"
                v-model:selection="selectedValidasi"
                :paginator="true"
                :rows="10"
                dataKey="id_registrasi_mahasiswa"
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
                                <button class="btn btn-primary" @click="updateValidasi"> <i class="pi pi-check me-2"></i> Proses Validasi</button>
                            </div>
                        </div>
                    </div>
                </template>

                <template #empty>
                    <div class="text-center">Tidak ada data.</div>
                </template>
                <Column selectionMode="multiple" headerStyle="width: 3em"></Column>
                <Column filterField="nim" header="NIM" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nim }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_mahasiswa" header="Nama Mahasiswa" style="min-width: 14rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nama_mahasiswa }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_program_studi" header="Program Studi" style="min-width: 15rem">
                    <template #body="{ data }">
                        {{ data.Periode.Prodi.nama_program_studi }}
                    </template>
                </Column>
                <Column filterField="total_sks" header="Jumlah SKS" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.total_sks }}
                    </template>
                </Column>
                <Column filterField="nama_status_mahasiswa" header="Status Mahasiswa" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.nama_status_mahasiswa }}
                    </template>
                </Column>
                <Column filterField="statusvalidasi" header="Status Validasi" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.statusvalidasi}}
                    </template>
                </Column>
                <Column header="Aksi" style="min-width: 10rem">
                    <template #body="{ data }">
                        <router-link :to="`/validasi-krs-mahasiswa/detailKRS/${data.id_registrasi_mahasiswa}`" class="btn btn-outline-primary me-2 py-1 px-2"> 
                            <i class="pi pi-pencil"></i>
                        </router-link>
                        
                        <button class="btn btn-outline-danger py-1 px-2" @click="confirmDelete(data.no)">
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
