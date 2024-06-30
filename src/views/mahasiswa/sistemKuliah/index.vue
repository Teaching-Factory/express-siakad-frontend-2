<script setup>
import { ref, onBeforeMount } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { get } from '../../../utiils/request';
import Swal from 'sweetalert2';

const filters = ref({
    global: {
        value: null,
        matchMode: FilterMatchMode.CONTAINS
    },
    nama_mahasiswa: {
        value: null,
        matchMode: FilterMatchMode.EQUALS
    },
    nim: {
        value: null,
        matchMode: FilterMatchMode.EQUALS
    },
    email: {
        value: null,
        matchMode: FilterMatchMode.EQUALS
    },
    jenis_kelamin: {
        value: null,
        matchMode: FilterMatchMode.EQUALS
    },
    tanggal_lahir: {
        value: null,
        matchMode: FilterMatchMode.EQUALS
    },
    nama_periode_masuk: {
        value: null,
        matchMode: FilterMatchMode.EQUALS
    },
    nama_ibu_kandung: {
        value: null,
        matchMode: FilterMatchMode.EQUALS
    }
});

const sistemKuliahMahasiswa = ref([]);
const loading1 = ref(false);
const selectedMhs = ref([]);
const sistemKuliahs = ref([]);
const selectedProdi = ref('');
const selectedSistemKuliah = ref('');
const prodis = ref([]);

const fetchProdi = async () => {
    try {
        const response = await get('prodi');
        prodis.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};

const fetchSistemKuliah = async () => {
    try {
        const response = await get('sistem-kuliah');
        sistemKuliahs.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data prodi:', error);
    }
};
const filterData = async () => {
    const prodiId = selectedProdi.value;
    const sistemKuliahId = selectedSistemKuliah.value;

    if (!prodiId || !sistemKuliahId) {
        // console.error('Prodi atau Angkatan Mahasiswa belum dipilih');
        alert('Data belum tersedia');
        return;
    }

    console.log('Prodi:', prodiId);
    console.log('Semester:', sistemKuliahId);

    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await get(`sistem-kuliah/filter/${prodiId}/${sistemKuliahId}/get`);
        const sistem_kuliah = response.data.data;

        sistemKuliahMahasiswa.value = sistem_kuliah;
        Swal.close();
    } catch (error) {
        console.error('Gagal mengambil data:', error);
        Swal.fire('BERHASIL!', 'Data Dosen Pengajar tidak ditemukan.', 'info').then(() => {});
    }
};

const selectedFilter = async () => {
    await Promise.all([fetchProdi(), fetchSistemKuliah()]);
};

onBeforeMount(() => {
    selectedFilter();
});
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>SET SISTEM KULIAH MAHASISWA</h5>
        <div class="card" style="padding: 0rem 1rem 0rem 1rem">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-12">
                    <h6 class="text-dark">Keterangan :</h6>
                    <p class="lh-1 text-small">
                    <ol>
                        <li>Pada pilihan sistem kuliah pilihan kosong akan keluar jika mahasiswa belum pernah di setting
                            sistem kuliah.</li>
                        <li>Jika anda sudah melakukan setting sistem kuliah anda tidak dapat menghilangkan sistem kuliah
                            mahasiswa.</li>
                        <li>Data yang akan diproses (ketika anda melakukan proses simpan) sesuai dengan data yang
                            ditampilkan.</li>
                        <li>Jika anda ingin melakukan simpan banyak data sekaligus silahkan tampilkan lebih banyak data.
                        </li>
                        <li>Sistem kuliah berfungsi untuk mengelompokkan mahasiswa sesuai dengan status mahasiswa di
                            perguruan tinggi dan untuk menentukan nominal tagihan perkuliahan mahasiswa pada role admin
                            keuangan</li>
                    </ol>
                    </p>
                </div>
            </div>
        </div>
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
                    <div class="">
                        <label for="exampleFormControlInput1" class="form-label">Sistem Kuliah</label>
                        <select v-model="selectedSistemKuliah" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Sistem Kuliah</option>
                            <option v-for="sistemKuliah in sistemKuliahs" :key="sistemKuliah.id" :value="sistemKuliah.id">{{sistemKuliah.nama_sk}}</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px;">
                    <button @click="filterData" class="btn btn-primary btn-block" style="width: 100%;">Tampilkan</button>
                </div>
            </div>
            <hr />
            <DataTable v-model:filters="filters"
                :globalFilterFields="['nama_mahasiswa', 'nim', 'BiodataMahasiswa.email', 'jenis_kelamin', 'tanggal_lahir',
                    'nama_periode_masuk', 'BiodataMahasiswa.nama_ibu_kandung'
                ]"
                :value="sistemKuliahMahasiswa" v-model:selection="selectedMhs" :paginator="true" :rows="10"
                dataKey="id" :rowHover="true" showGridlines>
                <template #header>
                    <div class="row">
                        <div class="col-lg-6 d-flex justify-content-start">
                            <IconField iconPosition="left">
                                <InputIcon class="pi pi-search" />
                                <InputText placeholder="Cari disini" v-model="filters['global'].value"
                                    style="width: 100%" />
                            </IconField>
                        </div>
                        <div class="col-lg-6 d-flex justify-content-end">
                            <div class="flex justify-content-end gap-2">
                                <button type="submit" class="btn btn-primary"> <i class="pi pi-check me-2"></i>
                                    Simpan</button>
                            </div>
                        </div>
                    </div>
                </template>

                <template #empty>
                    <div class="text-center">Tidak ada data.</div>
                </template>
                <Column selectionMode="multiple" headerStyle="width: 3em"></Column>
                <Column filterField="nama_mahasiswa" header="Nama Mahasiswa" style="min-width: 14rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.Mahasiswa.nama_mahasiswa }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nim" header="NIM" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.Mahasiswa.nim }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="email" header="Email" style="min-width: 15rem">
                    <template #body="{ data }">
                        {{ data.Mahasiswa. BiodataMahasiswa . email }}
                    </template>
                </Column>
                <Column filterField="nama_periode_masuk" header="Angkatan" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.Mahasiswa.nama_periode_masuk }}
                    </template>
                </Column>
                <Column filterField="jenis_kelamin" header="Jenis Kelamin" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.Mahasiswa.jenis_kelamin }}
                    </template>
                </Column>
                <Column filterField="tanggal_lahir" header="Tanggal Lahir" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.Mahasiswa.tanggal_lahir }}
                    </template>
                </Column>
                <Column filterField="nama_ibu_kandung" header="Nama Ibu" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.Mahasiswa. BiodataMahasiswa . nama_ibu_kandung }}
                    </template>
                </Column>
                <Column header="Sistem Kuliah" style="min-width: 15rem">
                    <template #body="{}">
                        <select v-model="selectedSistemKuliah" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Sistem Kuliah</option>
                        <option v-for="sistemKuliah in sistemKuliahs" :key="sistemKuliah.id" :value="sistemKuliah.id">{{ sistemKuliah.nama_sk }}</option>
                        </select>
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
