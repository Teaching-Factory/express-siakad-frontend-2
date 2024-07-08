<script setup>
import { ref, onBeforeMount } from 'vue';
import { getData } from '../../../utiils/request';
import { onMounted } from 'vue';

const loading1 = ref(false)
const settingGlobal = ref([]);

const getSettingGlobal = async () => {
    try {
        const res = await getData('setting-global');
        console.log('setting-global', res.data.data);
        if(res.status === 200){
            settingGlobal.value = res.data.data;
        }
    } catch (error){
        throw error
    }
}


onMounted(() => {
    getSettingGlobal();
});
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>SETTING GLOBAL</h5>
            <div class="card" style="padding: 0rem 1rem 0rem 1rem">
                <div class="row">
                    <div class="col-12 col-md-6 col-lg-12">
                        <h6 class="text-dark">Keterangan :</h6>
                        <p class="lh-1 text-small">
                            <ol>
                                <li>AKM dapat diset Aktif ketika sudah pernah ditambahkan / set status Non-aktif</li>
                                <li>Tidak Ada Jenis Tagihan yang menjadi syarat KRS, bila ingin meng-set tagihan yang menjadi flag KRS hubungi admin keuangan</li>
                                <li>Data mahasiswa di bawah adalah mahasiswa yang belum terdaftar sebagai mahasiswa Lulus / Drop Out</li>
                            </ol>
                        </p>
                    </div>
                </div>
            </div>
            <div class="card">
                
                <DataTable
                    :value="settingGlobal"
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
                                <button class="btn btn-secondary"> <i class="pi pi-pencil me-2"></i> Edit</button>
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
                
                <Column field="no" header="Kode Prodi" style="min-width: 5rem">
                    <template #body="{ data }">
                        {{ data.Prodi.kode_program_studi }}
                    </template>
                </Column>
                <Column header="Nama Program Studi" style="min-width: 15rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>
                                {{ data.Prodi.nama_program_studi }}</span>
                        </div>
                    </template>
                </Column>
                <Column header="Buka KRS" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <input type="checkbox" :checked="data.open_khs">
                        </div>
                    </template>
                </Column>
                <Column header="Buka Penilaian" style="min-width: 10rem">
                    <template #body="{ data }">
                        <input type="checkbox" :checked="data.open_assessment">
                    </template>
                </Column>
                <Column header="Buka KHS" style="min-width: 10rem">
                    <template #body="{ data }">
                        <input type="checkbox" :checked="data.open_khs">
                    </template>
                </Column>
                <Column header="Buka Transkrip" style="min-width: 10rem">
                    <template #body="{ data }">
                        <input type="checkbox" :checked="data.open_transcript">
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
