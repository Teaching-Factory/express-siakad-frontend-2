<script setup>
import { ref, onBeforeMount } from 'vue';
import Swal from 'sweetalert2';
import { FilterMatchMode } from 'primevue/api';
import { get } from '../../../utiils/request';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    kode_mata_kuliah: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_mata_kuliah: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_program_studi: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_kelas_kuliah: { value: null, matchMode: FilterMatchMode.EQUALS },
    sks: { value: null, matchMode: FilterMatchMode.EQUALS },
    semester: { value: null, matchMode: FilterMatchMode.EQUALS },
    jumlah_mahasiswa: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const customer1 = ref([]);
const selectedProdi = ref('');
const selectedSemester = ref('');
const prodis = ref([]);
const semesters = ref([]);
const daftarNilai = ref([]);
const first = ref(0);

const fetchProdi = async () => {
    try {
        const response = await get('prodi');
        prodis.value = response.data.data;
    } catch (error) {
        console.log('Gagal mengambil data', error);
    }
};
const fetchSemester = async () => {
    try {
        const response = await get('semester');
        semesters.value = response.data.data;
    } catch (error) {
        console.log('Gagal mengambil data', error);
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
    await Promise.all([fetchProdi(), fetchSemester()]);
    Swal.close();
};

const filterData = async () => {
    const prodiId = selectedProdi.value;
    const semesterId = selectedSemester.value;

    if (!prodiId || !semesterId) {
        // console.error('Prodi atau Angkatan Mahasiswa belum dipilih');
        Swal.fire('GAGAL!', 'Data Kelas Kuliah tidak ditemukan.', 'warning').then(() => {});
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
        const response = await get(`kelas-kuliah/filter/${prodiId}/${semesterId}/get`);
        const filterNilai = response.data.dataKelasKuliah;

        daftarNilai.value = filterNilai;
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
        <h5><i class="pi pi-user me-2"></i>DAFTAR NILAI PERKULIAHAN</h5>
        <div class="card">
            <div class="row">
                <div class="col-lg-5 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Program Studi</label>
                        <select v-model="selectedProdi" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Program Studi</option>
                            <option v-for="prodi in prodis" :key="prodi.id_prodi" :value="prodi.id_prodi">{{ prodi.nama_program_studi }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-5 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Periode</label>
                        <select v-model="selectedSemester" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Periode</option>
                            <option v-for="semester in semesters" :key="semester.id_semester" :value="semester.id_semester">{{ semester.nama_semester }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px">
                    <button @click="filterData" class="btn btn-primary btn-block" style="width: 100%">Tampilkan</button>
                </div>
            </div>
            <hr />
            <DataTable
                v-model:filters="filters"
                :globalFilterFields="['MataKuliah.kode_mata_kuliah', 'MataKuliah.nama_mata_kuliah', 'Prodi.nama_program_studi', 'nama_kelas_kuliah', 'sks', 'Semester.nama_semester', 'jumlah_mahasiswa']"
                :value="daftarNilai"
                :paginator="true"
                :rows="10"
                dataKey="id"
                :rowHover="true"
                :first="first"
                @page="onPageChange"
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
                            <div class="flex justify-content-end gap-2"></div>
                        </div>
                    </div>
                </template>

                <template #empty>
                    <div class="text-center">Tidak ada data.</div>
                </template>
                <Column header="No" headerStyle="width:3rem">
                    <template #body="slotProps">
                        {{ first + slotProps.index + 1 }}
                    </template>
                </Column>
                <Column filterField="kode_mata_kuliah" header="Kode MK" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.MataKuliah.kode_mata_kuliah }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_mata_kuliah" header="Nama MK" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.MataKuliah.nama_mata_kuliah }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_kelas_kuliah" header="Kelas" style="min-width: 5rem">
                    <template #body="{ data }">
                        {{ data.nama_kelas_kuliah }}
                    </template>
                </Column>
                <Column filterField="sks" header="SKS" style="min-width: 5rem">
                    <template #body="{ data }">
                        {{ data.sks }}
                    </template>
                </Column>
                <Column filterField="nama_semester" header="Periode" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.Semester.nama_semester }}
                    </template>
                </Column>
                <Column filterField="nama_program_studi" header="Program Studi" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.Prodi.nama_program_studi }}
                    </template>
                </Column>
                <Column filterField="jumlah_mahasiswa" header="Peserta" style="min-width: 5rem">
                    <template #body="{ data }">
                        {{ data.jumlah_mahasiswa }}
                    </template>
                </Column>
                <Column header="Aksi" style="min-width: 10rem">
                    <template #body="{ data }">
                        <router-link to="/nilai-perkuliahan/create" class="btn btn-outline-primary me-2">
                            <i class="pi pi-pencil"></i>
                        </router-link>
                        <button class="btn btn-outline-danger" @click="confirmDelete(data.no)">
                            <i class="pi pi-trash"></i>
                        </button>
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
