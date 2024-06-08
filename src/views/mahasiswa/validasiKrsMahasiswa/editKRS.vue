<script setup>
import { ref, onBeforeMount } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import Swal from 'sweetalert2';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    matkul: { value: null, matchMode: FilterMatchMode.EQUALS },
    kelas: { value: null, matchMode: FilterMatchMode.EQUALS },
    dosen: { value: null, matchMode: FilterMatchMode.EQUALS },
    sks: { value: null, matchMode: FilterMatchMode.EQUALS },
    ruang: { value: null, matchMode: FilterMatchMode.EQUALS },
    hari: { value: null, matchMode: FilterMatchMode.EQUALS },
    waktu: { value: null, matchMode: FilterMatchMode.EQUALS },
    kapasitaskelas: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const customer1 = ref([]);
const loading1 = ref(false);
const selectedMhs = ref([]);

onBeforeMount(() => {
    customer1.value = [
        {
            matkul: 'Pemrograman Web',
            kelas: '22A',
            dosen: 'Susi Susilowati',
            sks: '2',
            ruang: 'G2.08',
            hari: 'Senin',
            waktu: '09.10-10.10',
            kapasitaskelas: '20 Mahasiswa'
        },
        {
            matkul: 'Pemrograman Web',
            kelas: '22A',
            dosen: 'Susi Susilowati',
            sks: '2',
            ruang: 'G2.08',
            hari: 'Senin',
            waktu: '09.10-10.10',
            kapasitaskelas: '20 Mahasiswa'
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

const deleteItem = (no) => {
    customer1.value = customer1.value.filter((item) => item.no !== no);
};
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>KARTU RENCANA STUDI</h5>
            <div class="row mt-3">
                <div class="col-lg-12">
                    <div class="alert alert-warning" role="alert">
                        Jumlah SKS yang telah diambil : 8 SKS
                    </div>
                </div>
            </div>
            <DataTable v-model:filters="filters" :globalFilterFields="['matakuliah', 'kelas', 'dosen', 'sks', 'ruang', 'hari', 'waktu', 'kapasitaskelas']"
                :value="customer1"
                v-model:selection="selectedMhs"
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
                                <button class="btn btn-primary"> <i class="pi pi-save me-2"></i> Simpan</button>
                                <button class="btn btn-danger"> <i class="pi pi-times me-2"></i> Batal</button>
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
                <Column selectionMode="multiple" headerStyle="width: 3em"></Column>
                <Column filterField="matakuliah" header="Nama Mata Kuliah" style="min-width: 15rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.matkul }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="kelas" header="Nama Kelas" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.kelas }}</span>
                        </div>
                    </template>
                </Column>
                <Column filterField="dosen" header="Dosen" style="min-width: 15rem">
                    <template #body="{ data }">
                        {{ data.dosen }}
                    </template>
                </Column>
                <Column filterField="sks" header="SKS" style="min-width: 5rem">
                    <template #body="{ data }">
                        {{ data.sks }}
                    </template>
                </Column>
                <Column filterField="ruang" header="Ruang" style="min-width: 5rem">
                    <template #body="{ data }">
                        {{ data.ruang }}
                    </template>
                </Column>
                <Column filterField="hari" header="Hari" style="min-width: 5rem">
                    <template #body="{ data }">
                        {{ data.hari}}
                    </template>
                </Column>
                <Column filterField="waktu" header="Waktu" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.waktu}}
                    </template>
                </Column>
                <Column filterField="kapasitaskelas" header="Kapasitas Kelas" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.kapasitaskelas}}
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
