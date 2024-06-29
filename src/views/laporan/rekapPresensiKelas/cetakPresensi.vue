<script setup>
const handlePrint = () => {
    window.print()
}
</script>
<template>
    <div class="card print border-0" style="width: 21cm; height: 29.7cm; font-family: Arial, Helvetica, sans-serif" >
        <div class="card-body">
            <div class="heading-section" style="width: 100%;">
                <img src="../../../assets/images/kopSurat.png" alt="" style="width: 100%;">
            </div>
            <button @click="handlePrint" class="btn-print">Cetak</button>

            <table class="table table-borderless mt-3">
                <tbody>
                    <tr>
                        <h5 class="text-center mb-3"><b>REKAP PRESENSI KELAS PERKULIAHAN</b></h5>
                    </tr>
                    <tr>
                        <td style="width: 50%;">
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 20px;width: 130px;">
                                    Periode
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                    2023/2024 Ganjil
                                </div>
                            </div>
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 20px;width: 130px;">
                                    Program Studi
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                    S1 Teknik Informatika
                                </div>
                            </div>
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 20px;width: 130px;">
                                    Mata Kuliah
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                    Kapita Selekta
                                </div>
                            </div>
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 20px;width: 130px;">
                                    Nama Dosen
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                    Sudarmono
                                </div>
                            </div>
                        </td>
                        <td style="width: 50%;">
                            
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 20px;width: 130px;">
                                    Kelas
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                    A
                                </div>
                            </div>
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 20px;width: 130px;">
                                    Jumlah Peserta
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                     17
                                </div>
                            </div>
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 20px;width: 130px;">
                                    Jumlah Pertemuan
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                     1
                                </div>
                            </div>
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 20px;width: 130px;">
                                    NIDN
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                     10098756789987
                                </div>
                            </div>
                        </td>
                    </tr>

                </tbody>
            </table>

            <div style="overflow-x: auto;">
                <table class="table table-bordered text-center">
                    <thead class="align-middle">
                        <tr>
                            <th>No</th>
                            <th>NIM</th>
                            <th>Nama Mahasiswa</th>
                            <th>Jumlah Hadir</th>
                            <th>Jumlah Izin</th>
                            <th>Jumlah Sakit</th>
                            <th>Jumlah Alfa</th>
                            <th>Presentase Kehadiran</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>325325987</td>
                            <td>Aida Andinar</td>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>325325987</td>
                            <td>Aida Andinar</td>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>