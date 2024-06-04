<script setup>
import { ref, onBeforeMount } from 'vue';
import Swal from 'sweetalert2';
import { FilterMatchMode } from 'primevue/api';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    kodemk: { value: null, matchMode: FilterMatchMode.EQUALS },
    namamk: { value: null, matchMode: FilterMatchMode.EQUALS },
    prodi: { value: null, matchMode: FilterMatchMode.EQUALS },
    kelas: { value: null, matchMode: FilterMatchMode.EQUALS },
    sks: { value: null, matchMode: FilterMatchMode.EQUALS },
    periode: { value: null, matchMode: FilterMatchMode.EQUALS },
    peserta: { value: null, matchMode: FilterMatchMode.EQUALS },
    kuncinilai: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const customer1 = ref([]);
const loading1 = ref(false);

onBeforeMount(() => {
    customer1.value = [
        {
            no: '1',
            kodemk: '9876545678',
            namamk: 'Kapita Selekta',
            kelas: '2020',
            sks: '2',
            periode: '2023/2024  Genap',
            prodi: '3S1 Teknik Informatika',
            peserta: '30',
            kuncinilai: '-',
            aksi: ''
        },
        {
            no: '2',
            kodemk: '9876545678',
            namamk: 'Kapita Selekta',
            kelas: '2020',
            sks: '2',
            periode: '2023/2024  Genap',
            prodi: '3S1 Teknik Informatika',
            peserta: '30',
            kuncinilai: '-',
            aksi: ''
        }
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
                        <select class="form-select" aria-label="Default select example">
                            <option selected disabled hidden>Program Studi</option>
                            <option value="1">Teknologi Ternak</option>
                            <option value="2">Teknologi Basis Data</option>
                            <option value="3">Perikanan</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-5 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Periode</label>
                        <select class="form-select" aria-label="Default select example">
                            <option selected disabled hidden>Periode</option>
                            <option value="1">2021/2022 Genap</option>
                            <option value="2">2021/2022 Ganjil</option>
                            <option value="3">2021/2022 Genap</option>
                            <option value="4">2021/2022 Ganjil</option>
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
                :globalFilterFields="['kodemk', 'namamk', 'prodi', 'kelas', 'sks', 'periode', 'peserta', 'kuncinilai']"
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
                            <div class="flex justify-content-end gap-2"></div>
                        </div>
                    </div>
                </template>

                <template #empty>
                    <div class="text-center">Tidak ada data.</div>
                </template>
                <template #loading> Loading customers data. Please wait. </template>
                <Column field="no" header="No" style="min-width: 5rem">
                    <template #body="{ data }">
                        {{ data.no }}
                    </template>
                </Column>
                <Column filterField="kodemk" header="Kode MK" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.kodemk }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="namamk" header="Nama MK" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.namamk }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="kelas" header="Kelas" style="min-width: 5rem">
                    <template #body="{ data }">
                        {{ data.kelas }}
                    </template>
                </Column>
                <Column filterField="sks" header="SKS" style="min-width: 5rem">
                    <template #body="{ data }">
                        {{ data.sks }}
                    </template>
                </Column>
                <Column filterField="periode" header="Periode" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.periode }}
                    </template>
                </Column>
                <Column filterField="prodi" header="Program Studi" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.prodi }}
                    </template>
                </Column>
                <Column filterField="peserta" header="Peserta" style="min-width: 5rem">
                    <template #body="{ data }">
                        {{ data.peserta }}
                    </template>
                </Column>
                <Column filterField="kuncinilai" header="Kunci Nilai" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.kuncinilai }}
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
