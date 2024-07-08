<script setup>
import { ref, onBeforeMount, onMounted } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import Swal from 'sweetalert2';
import { useRoute } from 'vue-router';
import { del, get } from '../../../utiils/request';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    pertemuan: { value: null, matchMode: FilterMatchMode.EQUALS },
    tanggal_pertemuan: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_ruang_perkuliahan: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_ruang_perkuliahan: { value: null, matchMode: FilterMatchMode.EQUALS },
    nama_dosen: { value: null, matchMode: FilterMatchMode.EQUALS },
    materi: { value: null, matchMode: FilterMatchMode.EQUALS },
    jumlah_mahasiswa_hadir: { value: null, matchMode: FilterMatchMode.EQUALS },
    total: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const getPertemuanPerkuliahan = ref([]);
const getKelasKuliah = ref([]);
const message = ref('');
const route = useRoute();

const fetchKelasKuliah = async (id_kelas_kuliah) => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await get(`kelas-kuliah/${id_kelas_kuliah}/get`);
        getKelasKuliah.value = response.data.data;
        Swal.close();
    } catch (error) {
        console.error('Error fetching:', error);
    }
};
const fetchPertemuanPerkuliahan = async (id_kelas_kuliah) => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await get(`pertemuan-perkuliahan/kelas-kuliah/${id_kelas_kuliah}/get`);
        getPertemuanPerkuliahan.value = response.data.data;
        Swal.close();
    } catch (error) {
        console.error('Error fetching:', error);
    }
};

onMounted(() => {
    const id_kelas_kuliah = route.params.id_kelas_kuliah || route.query.id_kelas_kuliah;
    if (id_kelas_kuliah) {
        fetchPertemuanPerkuliahan(id_kelas_kuliah);
    }
    if (id_kelas_kuliah) {
        fetchKelasKuliah(id_kelas_kuliah);
    }
});
const deleteItem = async (id) => {
    try {
        const response = await del(`pertemuan-perkuliahan/${id}/delete`);
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
            getPertemuanPerkuliahan.value = getPertemuanPerkuliahan.value.filter((data) => data.id !== id);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('BATAL', 'Data Anda Tidak Jadi Dihapus', 'error');
        }
    });
};
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>LIST PERTEMUAN</h5>
        <hr />
        <div class="card" style="border-radius: none !important">
            <div class="row">
                <div class="col-lg-2">Program Studi</div>
                <div class="col-lg-4"><span class="me-2">:</span> {{ getKelasKuliah?.Prodi?.nama_program_studi }}</div>
                <div class="col-lg-2">Periode</div>
                <div class="col-lg-4"><span class="me-2">:</span> {{ getKelasKuliah.Semester?.nama_semester }}</div>
            </div>
            <hr />
            <div class="row">
                <div class="col-lg-2">Mata Kuliah</div>
                <div class="col-lg-4"><span class="me-2">:</span> {{ getKelasKuliah.MataKuliah?.nama_mata_kuliah }}</div>
                <div class="col-lg-2">Rencana Tatap Muka</div>
                <div class="col-lg-4"><span class="me-2">:</span> 16</div>
            </div>
            <hr />
            <div class="row">
                <div class="col-lg-2">Kelas</div>
                <div class="col-lg-4"><span class="me-2">:</span> {{ getKelasKuliah.nama_kelas_kuliah }}</div>
                <div class="col-lg-2">Jumlah Mahasiswa</div>
                <div class="col-lg-4"><span class="me-2">:</span> {{ getKelasKuliah.jumlah_mahasiswa }}</div>
            </div>
            <hr />
            <div class="row">
                <div class="col-lg-2">Tanggal Mulai Aktif</div>
                <div class="col-lg-4"><span class="me-2">:</span> -</div>
                <div class="col-lg-2">Tanggal Mulai Efektif</div>
                <div class="col-lg-4"><span class="me-2">:</span> -</div>
            </div>
            <hr />
            <div class="row">
                <div class="col-lg-2">Lingkup</div>
                <div class="col-lg-4"><span class="me-2">:</span> -</div>
                <div class="col-lg-2">Mode Kuliah</div>
                <div class="col-lg-4"><span class="me-2">:</span> -</div>
            </div>
        </div>

        <DataTable
            v-model:filters="filters"
            :globalFilterFields="['pertemuan', 'tanggal_pertemuan', 'RuangPerkuliahan.nama_ruang_perkuliahan', 'materi', 'jumlah_mahasiswa_hadir']"
            :value="getPertemuanPerkuliahan"
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
                        <div class="flex justify-content-end gap-2">
                            <router-link :to="`/pertemuan-perkuliahan/create/${getKelasKuliah.id_kelas_kuliah}`" class="btn btn-secondary"> <i class="pi pi-plus me-2"></i> Tambah</router-link>
                        </div>
                    </div>
                </div>
            </template>

            <template #empty>
                <div class="text-center">Tidak ada data.</div>
            </template>
            <Column filterField="pertemuan" header="Pertemuan" style="min-width: 5rem">
                <template #body="{ data }">
                    {{ data.pertemuan }}
                </template>
            </Column>
            <Column filterField="tanggal_pertemuan" header="Tanggal Pertemuan" style="min-width: 13rem">
                <template #body="{ data }">
                    {{ data.tanggal_pertemuan }}
                </template>
            </Column>
            <Column filterField="waktu_mulai" header="Waktu" style="min-width: 8rem">
                <template #body="{ data }"> {{ data.waktu_mulai }} - {{ data.waktu_selesai }} </template>
            </Column>
            <Column filterField="nama_ruang_perkuliahan" header="Ruang Pertemuan" style="min-width: 13rem">
                <template #body="{ data }">
                    {{ data.RuangPerkuliahan.nama_ruang_perkuliahan }}
                </template>
            </Column>
            <Column filterField="nama_dosen" header="Dosen Pengajar" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ data.KelasKuliah.id_dosen }}
                </template>
            </Column>
            <Column filterField="materi" header="Materi yang Diajarkan" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ data.materi }}
                </template>
            </Column>
            <Column filterField="jumlah_mahasiswa_hadir" header="Jumlah Mahasiswa Hadir" style="min-width: 5rem">
                <template #body="{ data }">
                    {{ data.jumlah_mahasiswa_hadir }}
                </template>
            </Column>
            <Column header="Aksi" style="min-width: 10rem">
                <template #body="{ data }">
                    <router-link :to="`/pertemuan-perkuliahan/update/${data.id}`" class="btn btn-outline-primary me-2 py-1 px-2">
                        <i class="pi pi-pencil"></i>
                    </router-link>

                    <button class="btn btn-outline-danger py-1 px-2" @click="confirmDelete(data.id)">
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

<!-- <template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-10 xl:col-6">
                    <h5><i class="pi pi-user me-2"></i>LIST PERTEMUAN</h5>
                </div>
                <div class="col-12 xl:col-6 d-flex justify-content-end">
                    <div class="flex justify-content-end gap-2">
                        <router-link to="/nilai-perkuliahan" class="btn btn-secondary me-2"> <i class="pi pi-plus mr-2"></i> Tambah</router-link>
                    </div>
                </div>
            </div>
            <hr>
            
            <div class="card" style="border-radius: none !important">
                <div class="row">
                    <div class="col-lg-2">Program Studi</div>
                    <div class="col-lg-4"> <span class="me-2">:</span> S1 Teknik Informatika</div>
                    <div class="col-lg-2">Periode</div>
                    <div class="col-lg-4"> <span class="me-2">:</span> 2020/2021 Genap</div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-lg-2">Mata Kuliah</div>
                    <div class="col-lg-4"> <span class="me-2">:</span> Kapita Selekta</div>
                    <div class="col-lg-2">Nama Kelas</div>
                    <div class="col-lg-4"> <span class="me-2">:</span> 2022</div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-lg-2">Dosen Pengajar</div>
                    <div class="col-lg-4"> <span class="me-2">:</span> Sudarmono</div>
                    <div class="col-lg-2">Ruang Perkuliahan</div>
                    <div class="col-lg-4"> <span class="me-2">:</span> -</div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-lg-2">Lokasi</div>
                    <div class="col-lg-4"> <span class="me-2">:</span> -</div>
                    <div class="col-lg-2">Waktu Perkuliahan</div>
                    <div class="col-lg-4"> <span class="me-2">:</span> -</div>
                </div>
            </div>
            <div style="overflow-x: auto;">
                <table class="table table-bordered">
                    <thead class="table-dark align-middle">
                        <tr>
                            <th>Pertemuan</th>
                            <th>Tanggal Pertemuan</th>
                            <th>Waktu</th>
                            <th>Ruang Pertemuan</th>
                            <th>Dosen Pengajar</th>
                            <th>Materi yang Diajarkan</th>
                            <th>Jumlah Mahasiswa Hadir</th>
                        </tr>

                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>325325</td>
                            <td>Aida Andinar</td>
                            <td>2020</td>
                            <td>
                                <input type="text" class="form-control" >
                            </td>
                            <td>
                                <input type="text" class="form-control" >
                            </td>
                            <td>
                                <input type="text" class="form-control" >
                            </td>
                            <td>
                                <input type="text" class="form-control" >
                            </td>
                            <td>
                                <input type="text" class="form-control" >
                            </td>
                            <td>
                                <select name="" class="form-select" id="">
                                    <option value="">AIDA</option>
                                    <option value="">ANDI</option>
                                    <option value="">NAR</option>
                                    <option value="">MAU</option>
                                    <option value="">LIDI</option>
                                    <option value="">ANA</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template> -->