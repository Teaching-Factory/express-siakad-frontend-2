<script setup>
import { ref, onBeforeMount } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import Swal from 'sweetalert2';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    prodi: { value: null, matchMode: FilterMatchMode.EQUALS },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    total: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const customer1 = ref([]);
const loading1 = ref(false);

onBeforeMount(() => {
    customer1.value = [
        {
            pertemuan: '1',
            tanggalpertemuan: '14/06/2024',
            waktu: '09.10-10.10',
            ruang: 'B5.08',
            dosen: 'Sudarmono',
            materi: 'Kapita Selekta',
            jumlah: '30',
            aksi: ''
            
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

</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>LIST PERTEMUAN</h5>
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
                <div class="col-lg-2">Rencana Tatap Muka</div>
                <div class="col-lg-4"> <span class="me-2">:</span> 16</div>
            </div>
            <hr>
            <div class="row">
                <div class="col-lg-2">Kelas</div>
                <div class="col-lg-4"> <span class="me-2">:</span> A</div>
                <div class="col-lg-2">Jumlah Mahasiswa</div>
                <div class="col-lg-4"> <span class="me-2">:</span> 30</div>
            </div>
            <hr>
            <div class="row">
                <div class="col-lg-2">Tanggal Mulai Aktif</div>
                <div class="col-lg-4"> <span class="me-2">:</span> -</div>
                <div class="col-lg-2">Tanggal Mulai Efektif</div>
                <div class="col-lg-4"> <span class="me-2">:</span> -</div>
            </div>
            <hr>
            <div class="row">
                <div class="col-lg-2">Lingkup</div>
                <div class="col-lg-4"> <span class="me-2">:</span> -</div>
                <div class="col-lg-2">Mode Kuliah</div>
                <div class="col-lg-4"> <span class="me-2">:</span> -</div>
            </div>
        </div>
        
        <DataTable v-model:filters="filters" :globalFilterFields="['prodi', 'status', 'total']"
            :value="customer1"
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
                                <router-link to="/pertemuan-perkuliahan/create" class="btn btn-secondary"> <i class="pi pi-plus me-2"></i> Tambah</router-link>
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
            <Column filterField="pertemuan" header="Pertemuan" style="min-width: 5rem">
                <template #body="{ data }">
                    {{ data.pertemuan }}
                </template>
            </Column>
            <Column filterField="tangggalpertemuan" header="Tanggal Pertemuan" style="min-width: 13rem">
                <template #body="{ data }">
                    {{ data.tanggalpertemuan }}
                </template>
            </Column>
            <Column filterField="waktu" header="Waktu" style="min-width: 8rem">
                <template #body="{ data }">
                    {{ data.waktu }}
                </template>
            </Column>
            <Column filterField="ruangpertemuan" header="Ruang Pertemuan" style="min-width: 13rem">
                <template #body="{ data }">
                    {{ data.ruangpertemuan }}
                </template>
            </Column>
            <Column filterField="dosen" header="Dosen Pengajar" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ data.dosen }}
                </template>
            </Column>
            <Column filterField="materi" header="Materi yang Diajarkan" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ data.materi }}
                </template>
            </Column>
            <Column filterField="jumlah" header="Jumlah Mahasiswa Hadir" style="min-width: 5rem">
                <template #body="{ data }">
                    {{ data.jumlah }}
                </template>
            </Column>
            <Column header="Aksi" style="min-width: 10rem">
                <template #body="{ data }">
                    <router-link to="/pertemuan-perkuliahan/create" class="btn btn-outline-primary me-2 py-1 px-2"> 
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