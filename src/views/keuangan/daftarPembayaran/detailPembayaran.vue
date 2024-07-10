<template>
    <div class="card mt-3">
        <h5><i class="pi pi-user me-2"></i>DETAIL PEMBAYARAN</h5>
        <DataTable :paginator="true" :rows="10" dataKey="id" :rowHover="true" showGridlines>
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
                            <!-- <button class="btn btn-danger"> <i class="pi pi-print me-2"></i>Export</button> -->
                            <!-- <button class="btn btn-success"> <i class="pi pi-plus me-2"></i> Tambah</button> -->
                            <!-- <button class="btn btn-danger"> <i class="pi pi-refresh me-2"></i> Sinkronkan</button> -->
                            <!-- <button class="btn btn-secondary"> <i class="pi pi-plus me-2"></i> Tambah</button> -->
                        </div>
                    </div>
                </div>
            </template>

            <template #empty>
                <div class="text-center">Tidak ada data.</div>
            </template>
            <Column field="no" header="No" style="min-width: 5rem">
                <template #body="{ data }">
                    {{ data.no }}
                </template>
            </Column>
            <Column header="ID Pembayaran" style="min-width: 8rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span>{{ data.id }}</span>
                    </div>
                </template>
            </Column>
            <Column header="Bukti Pembayaran" style="min-width: 10rem">
                <template #body="{}">
                    <!-- <div v-html="data.metodepembayaran"></div> -->
                    <router-link to="/sistem-kuliah/create" class="btn btn-outline-primary me-2"> <i class="pi pi-eye"></i></router-link>
                </template>
            </Column>
            <Column header="Tanggal Bayar" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ data.tanggalbayar }}
                </template>
            </Column>
            <Column header="Status" style="min-width: 10rem">
                <template #body="{}">
                    <!-- {{ data.tanggalbayar }} -->
                    <select class="form-select" aria-label="Default select example">
                        <option selected disabled hidden>--Status Pembayaran --</option>
                        <option value="1">Diterima</option>
                        <option value="2">Ditolak Lunas</option>
                    </select>
                </template>
            </Column>
            <Column header="Aksi" style="min-width: 10rem">
                <template #body="{}">
                    <router-link to="#" class="btn btn-outline-danger me-2"> <i class="pi pi-check"></i></router-link>
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