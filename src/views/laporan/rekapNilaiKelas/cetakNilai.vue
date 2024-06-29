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
                        <h5 class="text-center mb-3"><b>REKAP NILAI KELAS PERKULIAHAN</b></h5>
                    </tr>
                    <tr>
                        <td style="width: 50%;">
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
                                    Dosen Pengajar
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                    Sudarmono
                                </div>
                            </div>
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 20px;width: 130px;">
                                    Lokasi
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                    Gedung A
                                </div>
                            </div>
                        </td>
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
                                    Nama Kelas
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
                                    Ruang Perkuliahan
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                     Ruang A 728
                                </div>
                            </div>
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 20px;width: 130px;">
                                    Waktu Perkuliahan
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                     01.00 - 02.30
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
                            <th rowspan="2">No</th>
                            <th rowspan="2">NIM</th>
                            <th rowspan="2">Nama Mahasiswa</th>
                            <th rowspan="2">Angkatan</th>
                            <th colspan="4">Nilai</th>
                            <th rowspan="2">Nilai Akhir</th>
                            <th rowspan="2">Nilai Huruf</th>
                            
                            
                        </tr>
                        <tr>
                            <th>Presensi</th>
                            <th>Tugas</th>
                            <th>UTS</th>
                            <th>UAS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>325325987</td>
                            <td>Aida Andinar</td>
                            <td>2020</td>
                            <td>85.00</td>
                            <td>90.00</td>
                            <td>95.00</td>
                            <td>98.00</td>
                            <td>99.00</td>
                            <td>A (4.00)</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>325325987</td>
                            <td>Aida Andinar</td>
                            <td>2020</td>
                            <td>85.00</td>
                            <td>90.00</td>
                            <td>95.00</td>
                            <td>98.00</td>
                            <td>99.00</td>
                            <td>A (4.00)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>