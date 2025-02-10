<script setup>
import { ref, onBeforeMount, watch } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { get } from '../../../utiils/request';
import Swal from 'sweetalert2';
import vSelect from 'vue-select';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    pertemuan: { value: null, matchMode: FilterMatchMode.EQUALS },
    tanggal_pertemuan: { value: null, matchMode: FilterMatchMode.EQUALS },
    waktu_mulai: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_ruang_perkuliahan: { value: null, matchMode: FilterMatchMode.EQUALS },
    dosen: { value: null, matchMode: FilterMatchMode.EQUALS },
    materi: { value: null, matchMode: FilterMatchMode.EQUALS },
    jumlah_mahasiswa: { value: null, matchMode: FilterMatchMode.EQUALS },
    statuspresensi: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const pertemuanKelas = ref([]);
const semesters = ref([]);
const prodis = ref([]);
const kelas = ref([]);
const selectedProdi = ref('');
const selectedSemester = ref('');
const selectedKelas = ref('');

const adminProdi = ref(null);
const getAdminProdi = async () => {
    try {
        const response = await get('user/checking-admin-prodi-user');
        adminProdi.value = response.data.data; // Menyimpan data respons API

        // Jika data yang diterima adalah satu objek, ubah menjadi array
        prodis.value = Array.isArray(adminProdi.value) ? adminProdi.value : [adminProdi.value];

        selectedProdi.value = adminProdi.value?.id_prodi || null; // Memilih program studi secara default
        console.log('admin', response.data); // Cek hasil respons
    } catch (error) {
        console.error('Gagal mengambil data angkatan mahasiswa:', error);
        prodis.value = []; // Jika gagal, pastikan prodis kosong
    }
};

const fetchProdi = async () => {
    try {
        const response = await get('prodi');
        prodis.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};
const fetchSemester = async () => {
    try {
        const response = await get('semester');
        semesters.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};
const fetchClasses = async () => {
    if (selectedProdi.value && selectedSemester.value) {
        try {
            const response = await get(`detail-kelas-kuliah/filter/${selectedProdi.value}/${selectedSemester.value}/get`);
            kelas.value = response.data.data.flatMap((data) =>
                data.details.map((detail) => ({
                    id: detail.id_detail_kelas_kuliah,
                    id_kelas_kuliah: detail.id_kelas_kuliah,
                    label: `${detail.KelasKuliah.nama_kelas_kuliah} - ${detail.KelasKuliah.MataKuliah.nama_mata_kuliah}`
                }))
            );
        } catch (error) {
            console.error('Gagal mengambil data kelas:', error);
        }
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
    await Promise.all([fetchProdi(), fetchSemester(), fetchClasses(), getAdminProdi()]);
    Swal.close();
};

watch(selectedProdi, fetchClasses);
watch(selectedSemester, fetchClasses);

const filterData = async () => {
    const prodiId = selectedProdi.value;
    const semesterId = selectedSemester.value;
    const kelasKuliahId = selectedKelas.value?.id_kelas_kuliah;

    if (!prodiId || !semesterId || !kelasKuliahId) {
        // console.error('Prodi atau Angkatan Mahasiswa belum dipilih');
        Swal.fire('GAGAL!', 'Data  tidak ditemukan.', 'warning').then(() => {});
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
        const response = await get(`pertemuan-perkuliahan/filter/${semesterId}/${prodiId}/${kelasKuliahId}/get`);
        const filterPertemuan = response.data.data;

        pertemuanKelas.value = filterPertemuan;
        Swal.close();
    } catch (error) {
        Swal.fire('GAGAL!', 'Data Kelas Kuliah tidak ditemukan.', 'warning').then(() => {});
    }
};

onBeforeMount(() => {
    selectedFilter();
});
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>PRESENSI KELAS PERKULIAHAN</h5>
        <div class="card">
            <div class="row">
                <div class="col-lg-2 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Periode</label>
                        <select v-model="selectedSemester" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Semester</option>
                            <option v-for="semester in semesters" :key="semester.id_semester" :value="semester.id_semester">{{ semester.nama_semester }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div v-if="adminProdi && prodis.length > 0" class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Pilih Program Studi</label>
                        <select v-model="selectedProdi" class="form-select" aria-label="Default select example" :disabled="true">
                            <option value="" selected disabled hidden>Pilih Program Studi</option>
                            <option v-for="prodi in prodis" :key="prodi.id_prodi" :value="prodi.id_prodi">
                                {{ adminProdi.Prodi.nama_program_studi }}
                            </option>
                        </select>
                    </div>

                    <!-- Dropdown untuk prodis jika adminProdi kosong -->
                    <div v-else class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Pilih Program Studi</label>
                        <select v-model="selectedProdi" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Program Studi</option>
                            <option v-for="prodi in prodis" :key="prodi.id_prodi" :value="prodi.id_prodi">
                                {{ prodi.nama_program_studi }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-5 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Kelas</label>
                        <v-select v-model="selectedKelas" :options="kelas" label="label" placeholder="Ketikan Kelas / Mata Kuliah"></v-select>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px">
                    <button @click="filterData" class="btn btn-primary btn-block" style="width: 100%">Tampilkan</button>
                </div>
            </div>
            <hr />
            <DataTable
                v-model:filters="filters"
                :globalFilterFields="['pertemuan', 'tanggal_pertemuan', 'waktu_mulai', 'RuangPerkuliahan.nama_ruang_perkuliahan', 'dosen', 'materi', 'KelasKuliah.jumlah_mahasiswa', 'statuspresensi']"
                :value="pertemuanKelas"
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
                        <div class="col-lg-6 d-flex justify-content-end">
                            <div class="flex justify-content-end gap-2"></div>
                        </div>
                    </div>
                </template>

                <template #empty>
                    <div class="text-center">Tidak ada data.</div>
                </template>
                <Column filterField="pertemuan" field="no" header="Pertemuan" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.pertemuan }}
                    </template>
                </Column>
                <Column filterField="tanggal_pertemuan" header="Tanggal Pertemuan" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.tanggal_pertemuan }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="waktu_mulai" header="Waktu" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.waktu_mulai }} - {{ data.waktu_selesai }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_ruang_perkuliahan" header="Ruang" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.RuangPerkuliahan.nama_ruang_perkuliahan }}
                    </template>
                </Column>
                <Column filterField="dosen" header="Dosen" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.KelasKuliah.Dosen.nama_dosen }}
                    </template>
                </Column>
                <Column filterField="materi" header="Materi" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.materi }}
                    </template>
                </Column>
                <Column filterField="jumlah_mahasiswa" header="Jumlah Mahasiswa" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.KelasKuliah.jumlah_mahasiswa }}
                    </template>
                </Column>
                <Column filterField="statuspresensi" header="Status Presensi" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.statuspresensi }}
                    </template>
                </Column>
                <Column header="Aksi" style="min-width: 10rem">
                    <template #body="{ data }">
                        <router-link :to="`/presensi-perkuliahan/${data.id}/detail`" class="btn btn-outline-primary me-2" title="edit">
                            <i class="pi pi-pencil"></i>
                        </router-link>
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
