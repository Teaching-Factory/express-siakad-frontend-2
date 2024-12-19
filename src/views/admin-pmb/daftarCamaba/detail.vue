<script setup>
import Swal from 'sweetalert2';
import { ref, onBeforeMount } from 'vue';
import { get, del } from '../../../utiils/request';
import { FilterMatchMode } from 'primevue/api';

const filters = ref({
    global: {
        value: null,
        matchMode: FilterMatchMode.CONTAINS
    },
    kode_sk: {
        value: null,
        matchMode: FilterMatchMode.EQUALS
    },
    nama_sk: {
        value: null,
        matchMode: FilterMatchMode.EQUALS
    }
});

const sistemKuliahs = ref([]);
const message = ref('');

const sistemKuliah = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await get('sistem-kuliah');
        console.log(response.data.data);
        sistemKuliahs.value = response.data.data;
        Swal.close();
    } catch (error) {
        console.error('Gagal mengambil data sistemKuliah:', error);
    }
};

const deleteItem = async (id) => {
    try {
        const response = await del(`sistem-kuliah/${id}/delete`);
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
            sistemKuliahs.value = sistemKuliahs.value.filter((data) => data.id !== id);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('BATAL', 'Data Anda Tidak Jadi Dihapus', 'error');
        }
    });
};

onBeforeMount(() => {
    sistemKuliah();
});
</script>

<template>
    <div class="card">
        <div class="row">
            <div class="col-12 text-center">
                <h3 class="fw-bold">AIDA ANDINAR MAULIDIANA!!</h3>
                <p>Berikan sebuah status kelulusan calon mahasiswa </p>
                <hr />
            </div>
        </div>

        <!-- Validasi Berkas-Berkas -->
        <div class="card">
            <div class="col-12 col-md-6 col-lg-12">
                <h6><b>BERKAS PENDAFTAR</b></h6>
            </div>
            <DataTable v-model:filters="filters" :globalFilterFields="['kode_sk', 'nama_sk']" :value="sistemKuliahs" :paginator="true" :rows="10" dataKey="id" :rowHover="true" showGridlines>
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
                                <router-link to="#" class="btn btn-primary"> <i class="pi pi-pencil me-2"></i>Validasi Dokumen</router-link>
                            </div>
                        </div>
                    </div>
                </template>

                <template #empty>
                    <div class="text-center">Tidak ada data</div>
                </template>
                <Column header="No" headerStyle="width:3rem">
                    <template #body="slotProps">
                        {{ slotProps.index + 1 }}
                    </template>
                </Column>
                <Column filterField="kode_sk" header="Nama Berkas" style="min-width: 15rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.kode_sk }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_sk" header="File Berkas" style="min-width: 18rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nama_sk }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_sk" header="Status Validasi" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nama_sk }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_sk" header="Keterangan Validasi" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nama_sk }}</span>
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>

        <!-- View Status Pembayaran Mahasiswa -->
        <div class="card">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-12">
                    <h6><b>TAGIHAN DAN PEMBAYARAN</b></h6>
                </div>
                <div class="mb-3 row">
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
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <hr />
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

        <!-- Validasi Hasil Tes Camaba -->
        <div class="card">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-12">
                    <h6><b>PENILAIAN TES PENDAFTAR</b></h6>
                </div>
            </div>
            <DataTable v-model:filters="filters" :globalFilterFields="['kode_sk', 'nama_sk']" :value="sistemKuliahs" :paginator="true" :rows="10" dataKey="id" :rowHover="true" showGridlines>
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
                                <router-link to="#" class="btn btn-primary"> <i class="pi pi-pencil me-2"></i> Ubah Hasil Tes </router-link>
                            </div>
                        </div>
                    </div>
                </template>

                <template #empty>
                    <div class="text-center">Tidak ada data</div>
                </template>
                <Column filterField="kode_sk" header="Tahapan Tes" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.kode_sk }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="kode_sk" header="Jenis Tes" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.kode_sk }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_sk" header="Tanggal Tes" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nama_sk }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_sk" header="Keterangan Tes" style="min-width: 15rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nama_sk }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="nama_sk" header="Status Kelulusan" style="min-width: 15rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.nama_sk }}</span>
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>

        <!-- STATUS KELULUSAN CALON MAHASISWA DISINI -->
        <div class="card">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-12">
                    <h6><b>STATUS KELULUSAN CALON MAHASISWA</b></h6>
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label for="status" class="col-sm-3 col-form-label">Kelulusan Berkas</label>
                <div class="col-md-7">
                    <select class="form-select" id="status">
                        <option value="" disabled selected>Belum Ditentukan</option>
                        <option value="1">Lulus</option>
                        <option value="2">Tidak Lulus</option>
                    </select>
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label for="status" class="col-sm-3 col-form-label">Kelulusan Tes</label>
                <div class="col-md-7">
                    <select class="form-select" id="status">
                        <option value="" disabled selected>Belum Ditentukan</option>
                        <option value="1">Lulus</option>
                        <option value="2">Tidak Lulus</option>
                    </select>
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label for="status" class="col-sm-3 col-form-label">Program Studi Diterima</label>
                <div class="col-md-7">
                    <select class="form-select" id="status">
                        <option value="" disabled selected>Pilih Program Studi</option>
                        <option value="1">Prodi 1</option>
                        <option value="2">Prodi 2</option>
                    </select>
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label class="col-sm-3 col-form-label">Status Finalisasi</label>
                <div class="col-md-7">
                    <input type="checkbox" title="Sudah melakukan finalisasi data"/>
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label class="col-sm-3 col-form-label">Status Akun Pendaftar</label>
                <div class="col-md-7">
                    <input type="checkbox" title="Pendaftar bisa login ke portal PMB"/>
                </div>
            </div>
            <div class="mb-3 row d-flex">
                <div class="col-md-3 text-center">
                <button class="btn btn-success" type="button">Simpan</button>
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
