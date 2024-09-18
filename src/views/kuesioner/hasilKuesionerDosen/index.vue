<script setup>
import { ref, onBeforeMount } from 'vue';
import Swal from 'sweetalert2';
import vSelect from 'vue-select';
import { FilterMatchMode } from 'primevue/api';
import { del, get } from '../../../utiils/request';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nim: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_mahasiswa: { value: null, matchMode: FilterMatchMode.EQUALS },
    prodi: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_status_mahasiswa: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_periode_masuk: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const message = ref('');
const dosens = ref([]);
const tahunAjaran = ref([]);
const dosenWali = ref([]);
const selectedDosen = ref('');
const selectedTahunAjaran = ref('');
const first = ref(0);

const fetchDosen = async () => {
    try {
        const response = await get('dosen');
        // Format respons dari API ke format yang sesuai dengan v-select
        dosens.value = response.data.data.map((dosen) => ({
            id: dosen.id_dosen, // Properti 'id' sesuai dengan library v-select
            nidn: dosen.nidn,
            nama_dosen: dosen.nama_dosen
        }));
    } catch (error) {
        console.error('Gagal mengambil data dosen:', error);
    }
};
const fetchTahunAjaran = async () => {
    try {
        const response = await get('tahun-ajaran');
        tahunAjaran.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};

const selectedFilter = async () => {
    Swal.fire({
        title: 'Loading...',
        html: 'Sedang Memuat Data',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
    await Promise.all([fetchDosen(), fetchTahunAjaran()]);
    Swal.close();
};

const filterData = async () => {
    const tahunAjaranId = selectedTahunAjaran.value;
    const dosenId = selectedDosen.value?.id;

    console.log('dosen :', dosenId);
    console.log('tahun :', tahunAjaranId);
    if (!tahunAjaranId || !dosenId) {
        Swal.fire('GAGAL!', 'Data tidak ditemukan.', 'warning').then(() => {});
        return;
    }

    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await get(`dosen-wali/${dosenId}/${tahunAjaranId}/get`);
        console.log('res', response);
        const filterDosenWali = response.data.data;
        console.log('Dosen : ', filterDosenWali);

        dosenWali.value = filterDosenWali;
        Swal.close();
    } catch (error) {
        Swal.fire('GAGAL!', 'Data Kelas Kuliah tidak ditemukan.', 'warning').then(() => {});
    }
};

onBeforeMount(() => {
    selectedFilter();
});
const onPageChange = (event) => {
    first.value = event.first;
};

const getOptionLabel = (option) => {
    return `${option.nidn} - ${option.nama_dosen}`;
};
const deleteItem = async (id) => {
    try {
        const response = await del(`dosen-wali/${id}/delete`);
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
            dosenWali.value = dosenWali.value.filter((data) => data.id !== id);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('BATAL', 'Data Anda Tidak Jadi Dihapus', 'error');
        }
    });
};
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>HASIL PENILAIAN DOSEN</h5>
        <div class="card">
            <div class="row">
                <div class="col-lg-5 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">NIDN/Nama Dosen</label>
                        <v-select v-model="selectedDosen" :options="dosens" :get-option-label="getOptionLabel" placeholder="Pilih dosen"></v-select>
                    </div>
                </div>
                <div class="col-lg-5 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Periode Kuesioner Penilaian Dosen</label>
                        <select v-model="selectedTahunAjaran" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Tahun Ajaran</option>
                            <option v-for="tahun_ajaran in tahunAjaran" :key="tahun_ajaran.id_tahun_ajaran" :value="tahun_ajaran.id_tahun_ajaran">{{ tahun_ajaran.nama_tahun_ajaran }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px">
                    <button @click="filterData" class="btn btn-primary btn-block" style="width: 100%">Tampilkan</button>
                </div>
            </div>

            <div class="row mt-3 mb-3">
                <div class="col-lg-12 col-md-6 col-lg-6">
                    <div class="alert alert-secondary text-center" role="alert">
                        <h5 class="text-dark text-center">{{ dosenWali[0]?.Dosen?.nidn }} - {{ dosenWali[0]?.Dosen?.nama_dosen }} || Semester : {{ dosenWali[0]?.TahunAjaran?.nama_tahun_ajaran }}</h5>
                    </div>
                </div>
            </div>

            <h5>Hasil Kuesioner Pilihan Ganda</h5>
            <table class="table">
                <thead class="table-dark">
                    <tr>
                        <th>No.</th>
                        <th>Aspek Penilaian</th>
                        <th>Deskripsi</th>
                        <th>Skala/Skor</th>
                        <th>Jumlah Koresponden</th>
                        <th>Nilai AKhir</th>
                        
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
                    </tr>
                    <tr>
                        <td class="text-end" colspan="5">Rata-rata Nilai Akhir</td>
                        <td>0.00</td>
                    </tr>
                    
                </tbody>
            </table>

            <h5>Hasil Kuesioner Essay</h5>
            <table class="table">
                <thead class="table-dark">
                    <tr>
                        <th>No.</th>
                        <th>Aspek Penilaian</th>
                        <th>Deskripsi</th>
                        <th>Jumlah Koresponden</th>
                        
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>         
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
.card-theme {
    background-color: rgba(154, 160, 172, 0.5);
}
</style>
