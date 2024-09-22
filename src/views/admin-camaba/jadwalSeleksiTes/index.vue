<script setup>
import { ref, onBeforeMount } from 'vue';
import { get } from '../../../utiils/request';
import { FilterMatchMode } from 'primevue/api';
import Swal from 'sweetalert2';

</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>JADWAL SELEKSI TES</h5>
        <div class="row">
            <div class="mb-3 row">
                <div class="col-lg-12 d-flex justify-content-end">
                    <table class="table">
                        <thead class="table-dark">
                            <tr>
                                <th>Tahapan Tes</th>
                                <th>Jenis Tes</th>
                                <th>Tanggal Tes</th>
                                <th>Keterangan Tes</th>
                                <th>Status Kelulusan</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Tes TPA</td>
                                <td>27 Juni 2022 - 27 Juni 2022</td>
                                <td>-</td>         
                                <td>Belum dilakukan penilaian</td>         
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Tes Buta Warna</td>
                                <td>27 Juni 2022 - 27 Juni 2022</td>
                                <td>-</td>         
                                <td>Belum dilakukan penilaian</td>         
                            </tr>
                        </tbody>
                    </table>
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

