<script setup>
import { ref, onBeforeMount } from 'vue';
import Swal from 'sweetalert2';
import { get } from '../../../utiils/request';
import { FilterMatchMode } from 'primevue/api';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nim: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_semester: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_jenis_aktivitas_mahasiswa: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_program_studi: { value: null, matchMode: FilterMatchMode.EQUALS },
    judul: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const aktivitasMahasiswas = ref([]);
const loading1 = ref(true);

const aktivitasMahasiswa = async () => {
    try {
        const response = await get('aktivitas-mahasiswa');
        aktivitasMahasiswas.value = response.data.data;
        loading1.value = false;
    } catch (error) {
        console.error('Gagal mengambil data Aktivitas Mahawiswa:', error);

        loading1.value = false;

        aktivitasMahasiswa.value = [];
    }
};

onBeforeMount(() => {
    aktivitasMahasiswa();
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
    aktivitasMahasiswas.value = aktivitasMahasiswas.value.filter((item) => item.no !== no);
};
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>DAFTAR AKTIVITAS MAHASISWA</h5>
        <div class="card">
            <div class="row">
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Semester</label>
                        <select class="form-select" aria-label="Default select example">
                            <option selected disabled hidden>Semester</option>
                            <option value="1">2021/2022 Genap</option>
                            <option value="2">2021/2022 Ganjil</option>
                            <option value="3">2021/2022 Genap</option>
                            <option value="4">2021/2022 Ganjil</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Program Studi</label>
                        <select class="form-select" aria-label="Default select example">
                            <option selected disabled hidden>Program Studi</option>
                            <option value="1">Teknologi Ternak</option>
                            <option value="2">Teknologi Basis Data</option>
                            <option value="3">Perikanan</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Jenis Aktivitas</label>
                        <select class="form-select" aria-label="Default select example">
                            <option selected disabled hidden>Jenis Aktivitas</option>
                            <option value="1">KKN</option>
                            <option value="2">MKI</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px">
                    <button class="btn btn-primary btn-block" style="width: 100%">Tampilkan</button>
                </div>
            </div>
            <hr />
            <DataTable
                v-model:filters="filters"
                :globalFilterFields="['nim', 'Semester.nama_semester', 'JenisAktivitasMahasiswa.nama_jenis_aktivitas_mahasiswa', 'Prodi.nama_program_studi', 'judul']"
                :value="aktivitasMahasiswas"
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
                                <button class="btn btn-secondary"><i class="pi pi-download me-2"></i> Import Aktivitas</button>
                            </div>
                        </div>
                    </div>
                </template>

                <template #empty>
                    <div class="text-center">Tidak ada data.</div>
                </template>
                <template #loading> Loading customers data. Please wait. </template>
                <Column header="No" headerStyle="width:3rem">
                    <template #body="slotProps">
                        {{ slotProps.index + 1 }}
                    </template>
                </Column>
                <Column filterField="nim" header="NIM/Nama" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nim }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_program_studi" header="Program Studi" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.Prodi.nama_program_studi }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_semester" header="Semester" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.Semester.nama_semester }}
                    </template>
                </Column>
                <Column filterField="nama_jenis_aktivitas_mahasiswa" header="Jenis" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.JenisAktivitasMahasiswa.nama_jenis_aktivitas_mahasiswa }}
                    </template>
                </Column>
                <Column filterField="judul" header="Judul" style="min-width: 30rem">
                    <template #body="{ data }">
                        {{ data.judul }}
                    </template>
                </Column>
                <Column header="Opsi" style="min-width: 15rem">
                    <template #body="{ data }">
                        <router-link to="#" class="btn btn-outline-primary me-2">
                            <i class="pi pi-eye"></i>
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
