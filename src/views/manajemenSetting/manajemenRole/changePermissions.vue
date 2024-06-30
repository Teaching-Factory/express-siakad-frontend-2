<script setup>
import { onMounted, ref } from 'vue';
import { get } from '../../../utiils/request';

const permissions = ref([]);

const fetchPermissions = async (id) => {
    try {
        const response = await get(`role-permission/permissions`);
        permissions.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data:', error);
    }
};
onMounted(() => {
    fetchPermissions();
});
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>SETTING HAK AKSES</h5>
        <hr />
        <div class="card-body">
            <div class="row">
                <!-- Perulangan untuk membuat kolom hak akses berdasarkan data permissions -->
                <div v-for="(permission, index) in permissions" :key="index" class="col-lg-3 mb-3">
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" :id="'permissionCheckbox' + index" />
                        <label class="form-check-label" :for="'permissionCheckbox' + index">
                            {{ permission.nama_permission }}
                        </label>
                    </div>
                </div>
            </div>
            <div class="text-end">
                <button class="btn btn-primary mt-3">Simpan</button>
            </div>
        </div>
    </div>
</template>