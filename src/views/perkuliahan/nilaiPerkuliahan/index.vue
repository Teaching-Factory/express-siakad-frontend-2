<script setup>
import { ref, onBeforeMount } from 'vue';
const customer1 = ref([]);
const loading1 = ref(false);
const getSeverity = (status) => {
    switch (status) {
        case 'unqualified':
            return 'danger';

        case 'qualified':
            return 'success';
            
        case 'new':
            return 'info';

        case 'negotiation':
            return 'warning';

        case 'renewal':
            return null;
    }
};

onBeforeMount(() => {
    customer1.value = [
        {
            no: '1',
            kodemk: '9876545678 bisa diklik menuju ke halaman detail nilai perkuliahan',
            namamk: 'Kapita Selekta',
            kelas: '2020',
            sks: '2',
            periode: '2023/2024  Genap',
            prodi: '3S1 Teknik Informatika',
            peserta: '30',
            kuncinilai: '-',
        },{
            no: '2',
            kodemk: '9876545678 bisa diklik',
            namamk: 'Kapita Selekta',
            kelas: '2020',
            sks: '2',
            periode: '2023/2024  Genap',
            prodi: '3S1 Teknik Informatika',
            peserta: '30',
            kuncinilai: '-',
        }
        // Add more dummy data here
    ];
})
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
                    <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px;">
                        <button class="btn btn-primary btn-block" style="width: 100%;">Tampilkan</button>
                    </div>
                </div>
                <hr/>
                <DataTable
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
                                <InputText placeholder="Cari disini" style="width: 100%" />
                            </IconField>
                        </div>
                        <div class="col-lg-6 d-flex justify-content-end">
                            <div class="flex justify-content-end gap-2">
                                <!-- <button class="btn btn-outline-primary"> <i class="pi pi-print me-2"></i>Export</button>
                                <button class="btn btn-success"> <i class="pi pi-plus me-2"></i> Tambah</button> -->
                                <!-- <button class="btn btn-danger"> <i class="pi pi-refresh me-2"></i> Sinkronkan</button> -->
                                <!-- <button class="btn btn-primary"> <i class="pi pi-check me-2"></i> Set Aktif</button> -->
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
                <Column field="no" header="No" style="min-width: 5rem">
                    <template #body="{ data }">
                        {{ data.no }}
                    </template>
                </Column>
                <Column header="Kode MK" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.kodemk }}</span>
                        </div>
                    </template>
                </Column>
                <Column header="Nama MK" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.namamk }}</span>
                        </div>
                    </template>
                </Column>
                <Column header="Kelas" style="min-width: 5rem">
                    <template #body="{ data }">
                        {{ data.kelas }}
                    </template>
                </Column>
                <Column header="SKS" style="min-width: 5rem">
                    <template #body="{ data }">
                        {{ data.sks }}
                    </template>
                </Column>
                <Column header="Periode" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.periode }}
                    </template>
                </Column>
                <Column header="Program Studi" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.prodi }}
                    </template>
                </Column>
                <Column header="Peserta" style="min-width: 5rem">
                    <template #body="{ data }">
                        {{ data.peserta }}
                    </template>
                </Column>
                <Column header="Kunci Nilai" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.kuncinilai }}
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
