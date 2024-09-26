<script setup>
import { ref, onBeforeMount } from 'vue';
import { getData } from '../../../utiils/request';
import { onMounted } from 'vue';
import Swal from 'sweetalert2';
import { getToken } from '../../../service/auth';
import axios from 'axios';
import { API_URL } from '../../../config/config';
const url_feeder = ref('');
const password_feeder = ref('');
const username_feeder = ref('');
const settingFeeder = ref([]);

const Feeder = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const res = await getData(`setting-ws-feeder/`);
        console.log('setting-ws-feeder', res.data.data);
        if (res.status === 200) {
            const data = res.data.data;
            settingFeeder.value = res.data.data;
            url_feeder.value = data[0].url_feeder;
            username_feeder.value = data[0].username_feeder;
            password_feeder.value = data[0].password_feeder;
        }
        Swal.close();
    } catch (error) {
        console.error('Error fetching Feeder:', error);
        Swal.close();
    }
};

const update = async () => {
    try {
        const token = getToken();
        await axios.put(
            `${API_URL}/setting-ws-feeder/update`,
            {
                url_feeder: url_feeder.value,
                username_feeder: username_feeder.value,
                password_feeder: password_feeder.value
            },
            {
                headers: {
                    Authorization: token
                }
            }
        );
        Swal.fire('BERHASIL!', 'Data berhasil diperbarui.', 'success').then(() => {});
    } catch (error) {
        Swal.fire('GAGAL', 'Gagal memperbarui data. Silakan coba lagi.', 'error');
    }
};

onMounted(() => {
    Feeder();
});
</script>

<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <h5><i class="pi pi-user me-2"></i>SETTING WS</h5>
            </div>
            <hr />
            <div class="row mt-3">
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="data-user" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">WS Feeder</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="data-wali" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">WS Sister</button>
                    </li>
                </ul>

                <!-- Tab content -->
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="data-user">
                        <!-- WS Feeder -->
                        <div class="row mt-4 mb-4">
                            <div class="col-lg-12 d-flex justify-content-end">
                                <div div class="flex justify-content-end gap-2">
                                    <button @click="update" class="btn btn-primary me-2"><i class="pi pi-save mr-2"></i> Simpan</button>
                                    <button class="btn btn-danger"><i class="pi pi-times mr-2"></i> Batal</button>
                                </div>
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="inputPassword" class="col-sm-4 col-form-label">URL Feeder</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="inputPassword" v-model="url_feeder" />
                            </div>
                        </div>
                        <div class="mb-4 row">
                            <label for="inputPassword" class="col-sm-4 col-form-label">Username Feeder</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="inputPassword" v-model="username_feeder" />
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="inputPassword" class="col-sm-4 col-form-label">Password Feeder</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="inputPassword" v-model="password_feeder" />
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="inputPassword" class="col-sm-4 col-form-label">Kapasitas Default Kelas Perkuliahan</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="inputPassword" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- WS Sister -->
                <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="data-wali">
                    <div class="row mt-4 mb-4">
                        <div class="col-lg-12 d-flex justify-content-end">
                            <div div class="flex justify-content-end gap-2">
                                <button class="btn btn-primary me-2"><i class="pi pi-save mr-2"></i> Simpan</button>
                                <button class="btn btn-danger"><i class="pi pi-times mr-2"></i> Batal</button>
                            </div>
                        </div>
                    </div>

                    <div class="mb-3 row">
                        <label for="inputPassword" class="col-sm-4 col-form-label">URL Sister</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="inputPassword" />
                        </div>
                    </div>
                    <div class="mb-4 row">
                        <label for="inputPassword" class="col-sm-4 col-form-label">Username Sister</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="inputPassword" />
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="inputPassword" class="col-sm-4 col-form-label">Password Sister</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="inputPassword" />
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="inputPassword" class="col-sm-4 col-form-label">ID Pengguna Sister</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="inputPassword" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>