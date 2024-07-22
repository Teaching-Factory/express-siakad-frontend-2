<script setup>
import Swal from 'sweetalert2';
import { onMounted, ref, computed } from 'vue';
import { get } from '../../../utiils/request';
import { useRoute } from 'vue-router'; 
import axios from 'axios';
import { API_URL } from '../../../config/config';
import { getToken } from '../../../service/auth';


const permissions = ref([]);
const listPermissions = ref([]);
const route = useRoute();

const getAllPermissions = async (id) => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await get(`role-permission/permissions`);
        permissions.value = response.data.data;
        await getListPermission(id);
        Swal.close();
    } catch (error) {
        Swal.close();
        console.error('Gagal mengambil data:', error);
    }
};

const getListPermission = async (id) => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await get(`role-permission/${id}/list-permissions`);
        listPermissions.value = response.data.data;
        Swal.close();
    } catch (error) {
        Swal.close();
        console.error('Gagal mengambil data:', error);
    }
};

const isChecked = (id) => {
    return listPermissions.value.some(permission => permission.id_permission === id);
};

const permissionsWithChecked = computed(() => {
    return permissions.value.map(permission => {
        return {
            ...permission,
            checked: isChecked(permission.id)
        };
    });
});

const manajemenPermissions = async (id) => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const token = getToken();

        const selectedPermissions = permissionsWithChecked.value
            .filter(permission => permission.checked)
            .map(permission => ({ id: permission.id, nama_permission: permission.nama_permission }));

        const response = await axios.post(`${API_URL}/role-permission/${id}/manage`, {
            permissions: selectedPermissions
        }, {
                    headers: {
                        Authorization: token,
                        'Content-Type': 'application/json' // Tambahkan header Content-Type
                    }
                });
        
        Swal.close();
        Swal.fire('BERHASIL!', 'Update Role Permissions Berhasil.', 'success').then(() => {
            window.location.href = '/manajemen-role';
        });
    } catch (error) {
        Swal.close();
        Swal.fire('Error', 'Failed to update permissions', 'error');
        console.error('Gagal mengirim data:', error);
    }
};

onMounted(() => {
    const roleId = route.params.id;
    if (roleId) {
        getAllPermissions(roleId);
    } else {
        console.error('ID role tidak ditemukan di URL');
    }
});
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>SETTING HAK AKSES</h5>
        <hr />
        <div class="card-body">
            <div class="row">
                <div v-for="(permission, index) in permissionsWithChecked" :key="index" class="col-lg-3 mb-3">
                    <div class="form-check">
                        <input 
                            type="checkbox" 
                            class="form-check-input" 
                            :id="'permissionCheckbox' + index" 
                            v-model="permission.checked"
                        />
                        <label class="form-check-label" :for="'permissionCheckbox' + index">
                            {{ permission.nama_permission }}
                        </label>
                    </div>
                </div>
            </div>
            <div class="text-end">
                <button class="btn btn-primary mt-3" @click="manajemenPermissions(route.params.id)">Simpan</button>
            </div>
        </div>
    </div>
</template>