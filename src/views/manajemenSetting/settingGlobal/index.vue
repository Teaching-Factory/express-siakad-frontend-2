<script setup>
import { ref, onBeforeMount } from 'vue';
import { getData } from '../../../utiils/request';
import { onMounted } from 'vue';
import Swal from 'sweetalert2';

const settingGlobal = ref([]);
const semesterAktif = ref([]);

const getSemesterAktif = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const res = await getData('setting-global-semester/get-setting-global-semester-active');
        console.log('setting-global-semester', res.data.data);
        if (res.status === 200) {
            semesterAktif.value = res.data.data;
        }
        Swal.close();
    } catch (error) {
        throw error;
    }
};

const getSettingGlobal = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const res = await getData('setting-global/');
        console.log('setting-global', res.data.data);
        if (res.status === 200) {
            settingGlobal.value = res.data.data;
        }
        Swal.close();
    } catch (error) {
        throw error;
    }
};

onMounted(() => {
    getSettingGlobal();
    getSemesterAktif();
});
</script>

<template>
    <div class="card">
        <div class="row">
            <div class="col-lg-6 d-flex justify-content-start">
                <h5><i class="pi pi-user me-2"></i>SETTING GLOBAL</h5>
            </div>
        </div>
        <div class="card" style="padding: 0rem 1rem 0rem 1rem">
            <div class="row mt-3">
                <div class="col-lg-3">Semester Berlaku (Aktif)</div>
                <div class="col-lg-3"><span class="me-2">:</span> {{ semesterAktif?.SemesterAktif?.nama_semester }}</div>
                <div class="col-lg-3">Semester KRS</div>
                <div class="col-lg-3"><span class="me-2">:</span> {{ semesterAktif?.SemesterKrs?.nama_semester }}</div>
            </div>
            <hr />
            <div class="row">
                <div class="col-lg-3">Semester Nilai</div>
                <div class="col-lg-3"><span class="me-2">:</span>{{ semesterAktif?.SemesterNilai?.nama_semester }}</div>
                <div class="col-lg-3">Batas SKSnya KRS untuk Sarjana dan Diploma</div>
                <div class="col-lg-3"><span class="me-2"> :</span> {{ semesterAktif?.batas_sks_krs }}</div>
            </div>
            <hr />
            <div class="row">
                <div class="col-lg-3">Label Dosen Wali</div>
                <div class="col-lg-3"><span class="me-2">:</span> {{ semesterAktif?.label_dosen_wali }}</div>
                <div class="col-lg-3">Wilayah Penandatanganan Laporan</div>
                <div class="col-lg-3"><span class="me-2"> :</span>{{ semesterAktif?.wilayah_penandatanganan }}</div>
            </div>
            <div class="row mt-3">
                <div class="col-lg-12 d-flex justify-content-end mb-3">
                    <router-link :to="`/setting-global/${semesterAktif?.id}/edit`" class="btn btn-secondary"> <i class="pi pi-pencil me-2"></i>Edit </router-link>
                </div>
            </div>
        </div>
        <div class="card">
            <DataTable :value="settingGlobal" :paginator="true" :rows="20" dataKey="id" :rowHover="true" showGridlines>
                <!-- <template #header>
                    <div class="row">
                        <div class="col-lg-6 d-flex justify-content-start">
                            <IconField iconPosition="left">
                                <InputIcon class="pi pi-search" />
                                <InputText placeholder="Cari disini" style="width: 100%" />
                            </IconField>
                        </div>
                    </div>
                </template> -->

                <template #empty>
                    <div class="text-center">Tidak ada data.</div>
                </template>

                <Column field="no" header="Kode Prodi" style="min-width: 5rem">
                    <template #body="{ data }">
                        {{ data.Prodi.kode_program_studi }}
                    </template>
                </Column>
                <Column header="Nama Program Studi" style="min-width: 15rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span> {{ data.Prodi.nama_program_studi }}</span>
                        </div>
                    </template>
                </Column>
                <Column header="Buka KRS" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <input type="checkbox" :checked="data.open_krs === true" />
                        </div>
                    </template>
                </Column>
                <Column header="Buka Penilaian" style="min-width: 10rem">
                    <template #body="{ data }">
                        <input type="checkbox" :checked="data.open_assessment === true" />
                    </template>
                </Column>
                <Column header="Buka KHS" style="min-width: 10rem">
                    <template #body="{ data }">
                        <input type="checkbox" :checked="data.open_khs === true" />
                    </template>
                </Column>
                <Column header="Buka Transkrip" style="min-width: 10rem">
                    <template #body="{ data }">
                        <input type="checkbox" :checked="data.open_transcript === true" />
                    </template>
                </Column>
                <Column header="Buka Quisioner" style="min-width: 10rem">
                    <template #body="{ data }">
                        <input type="checkbox" :checked="data.open_questionnaire === true" />
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
