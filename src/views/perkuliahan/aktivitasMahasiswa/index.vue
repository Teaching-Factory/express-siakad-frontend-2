<script setup>
import { ref, onBeforeMount } from 'vue';
import Swal from 'sweetalert2';
import { del, get } from '../../../utiils/request';
import { FilterMatchMode } from 'primevue/api';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nama_mahasiswa: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_semester: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_jenis_aktivitas_mahasiswa: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_program_studi: { value: null, matchMode: FilterMatchMode.EQUALS },
    judul: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const aktivitasMahasiswas = ref([]);
const message = ref('');
const first = ref(0);
const semesters = ref([]);
const prodis = ref([]);
const jenisAktifitas = ref([]);
const selctedSemester = ref('');
const selectedProdi = ref('');
const selectedJenisAktivitas = ref('');

const adminProdi = ref(null);
const getAdminProdi = async () => {
    try {
        const response = await get('user/checking-admin-prodi-user');
        adminProdi.value = response.data.data; // Menyimpan data respons API

        if (adminProdi.value) {
            // Jika user adalah admin prodi, hanya masukkan prodi mereka
            prodis.value = Array.isArray(adminProdi.value) ? adminProdi.value : [adminProdi.value];
            selectedProdi.value = adminProdi.value?.id_prodi || null;
        } else {
            // Jika user bukan admin prodi, ambil semua prodi
            await getProdi(); // Pastikan fungsi fetchProdi sudah ada
        }

        console.log('admin', response.data); // Cek hasil respons
    } catch (error) {
        console.error('Gagal mengambil data admin prodi:', error);
        prodis.value = []; // Pastikan prodi kosong jika terjadi error
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
const fetchProdi = async () => {
    try {
        const response = await get('prodi');
        prodis.value = response.data.data;
    } catch (error) {
        console.log('Gagal mengambil data', error);
    }
};
const fetchJenisAktivitas = async () => {
    try {
        const response = await get('jenis-aktivitas-mahasiswa');
        jenisAktifitas.value = response.data.data;
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
    await Promise.all([fetchProdi(), fetchJenisAktivitas(), fetchSemester(), getAdminProdi()]);
    Swal.close();
};

const filterData = async () => {
    const semesterId = selctedSemester.value;
    const prodiId = selectedProdi.value;
    const aktivitasId = selectedJenisAktivitas.value;

    if (!semesterId || !prodiId || !aktivitasId) {
        // console.error('Prodi atau Angkatan Mahasiswa belum dipilih');
        Swal.fire('Gagal', 'Data Mahasiswa tidak ditemukan.', 'warning').then(() => {});
        return;
    }

    // console.log('Prodi:', semesterId);
    // console.log('Angkatan:', prodiId);

    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await get(`anggota-aktivitas-mahasiswa/filter/${semesterId}/${prodiId}/${aktivitasId}/get`);
        const aktivitas = response.data.data;

        aktivitasMahasiswas.value = aktivitas;
        Swal.close();
    } catch (error) {
        // console.error('Gagal mengambil data mahasiswa:', error);
        Swal.fire('Gagal', 'Data Aktivitas Mahasiswa tidak ditemukan.', 'warning').then(() => {});
    }
};

const deleteItem = async (id_anggota) => {
    try {
        const response = await del(`anggota-aktivitas-mahasiswa/${id_anggota}/delete`);
        if (response.status === 200) {
            message.value = 'Data berhasil dihapus!';
            bobotPenilaians.value = bobotPenilaians.value.filter((data) => data.id_anggota !== id_anggota);
        } else {
            message.value = 'Terjadi kesalahan: ' + response.statusText;
        }
    } catch (error) {
        message.value = 'Terjadi kesalahan: ' + error.message;
    }
};

const confirmDelete = (id_anggota) => {
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
            deleteItem(id_anggota);
            Swal.fire('BERHASIL!', 'Data berhasil dihapus.', 'success');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('BATAL', 'Data Anda Tidak Jadi Dihapus', 'error');
        }
    });
};

const onPageChange = (event) => {
    first.value = event.first;
};

onBeforeMount(() => {
    selectedFilter();
});
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>DAFTAR AKTIVITAS MAHASISWA</h5>
        <div class="card">
            <div class="row">
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Semester</label>
                        <select v-model="selctedSemester" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Pilih Semester</option>
                            <option v-for="semester in semesters" :key="semester.id_semester" :value="semester.id_semester">{{ semester.nama_semester }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-6">
                    <div v-if="adminProdi" class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Pilih Program Studi</label>
                        <select v-model="selectedProdi" class="form-select" aria-label="Default select example" disabled>
                            <option :value="adminProdi.id_prodi">
                                {{ adminProdi.Prodi?.nama_program_studi || 'Program Studi Tidak Ditemukan' }}
                            </option>
                        </select>
                    </div>

                    <!-- Jika user bukan admin prodi, tampilkan semua prodi -->
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
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Jenis Aktivitas</label>
                        <select v-model="selectedJenisAktivitas" class="form-select" aria-label="Default select example">
                            <option value="" selected disabled hidden>Jenis Aktivitas</option>
                            <option v-for="jenisAktifitasMahasiswa in jenisAktifitas" :key="jenisAktifitasMahasiswa.id_jenis_aktivitas_mahasiswa" :value="jenisAktifitasMahasiswa.id_jenis_aktivitas_mahasiswa">
                                {{ jenisAktifitasMahasiswa.nama_jenis_aktivitas_mahasiswa }}
                            </option>
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
                :globalFilterFields="[
                    'Mahasiswa.nama_mahasiswa',
                    'AktivitasMahasiswa.Prodi.nama_program_studi',
                    'AktivitasMahasiswa.Semester.nama_semester',
                    'AktivitasMahasiswa.JenisAktivitasMahasiswa.nama_jenis_aktivitas_mahasiswa',
                    'AktivitasMahasiswa.judul'
                ]"
                :value="aktivitasMahasiswas"
                :first="first"
                @page="onPageChange"
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
                                <router-link to="/import-aktivitas-mahasiswa" class="btn btn-success"><i class="pi pi-download me-2"></i> Import Aktivitas</router-link>
                            </div>
                        </div>
                    </div>
                </template>

                <template #empty>
                    <div class="text-center">Tidak ada data.</div>
                </template>
                <!-- <template #loading> Loading customers data. Please wait. </template> -->
                <Column header="No" headerStyle="width:3rem">
                    <template #body="slotProps">
                        {{ first + slotProps.index + 1 }}
                    </template>
                </Column>

                <Column filterField="nama_mahasiswa" header="NIM/Nama" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.Mahasiswa.nim }} - {{ data.Mahasiswa.nama_mahasiswa }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_program_studi" header="Program Studi" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.AktivitasMahasiswa?.Prodi?.nama_program_studi || '-' }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_semester" header="Semester" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.AktivitasMahasiswa?.Semester?.nama_semester || '-' }}
                    </template>
                </Column>
                <Column filterField="nama_jenis_aktivitas_mahasiswa" header="Jenis" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.AktivitasMahasiswa?.JenisAktivitasMahasiswa?.nama_jenis_aktivitas_mahasiswa || '-' }}
                    </template>
                </Column>
                <Column filterField="judul" header="Judul" style="min-width: 30rem">
                    <template #body="{ data }">
                        {{ data.AktivitasMahasiswa.judul }}
                    </template>
                </Column>
                <Column header="Opsi" style="min-width: 15rem">
                    <template #body="{ data }">
                        <router-link to="#" class="btn btn-outline-primary me-2">
                            <i class="pi pi-eye"></i>
                        </router-link>
                        <button class="btn btn-outline-danger" @click="confirmDelete(data.id_anggota)">
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
