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
                        <h5 class="text-center mb-3"><b>KARTU RENCANA STUDI (KRS)</b></h5>
                    </tr>
                    <tr>
                        <td style="width: 50%;">
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 15px;width: 110px;">
                                    Nama
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                    Aida Andinar Maulidiana
                                </div>
                            </div>
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 15px;width: 110px;">
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
                                <div style="margin-left: 15px;width: 110px;">
                                    Semester
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                    3
                                </div>
                            </div>
                        </td>
                        <td style="width: 50%;">
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 15px;width: 110px;">
                                    NIM
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                    362055401012
                                </div>
                            </div>
                            <div style="display: flex; align-items: flex-start;">
                                <div style="margin-left: 15px;width: 110px;">
                                    Periode
                                </div>
                                <div style="margin-right: 6px;">
                                    :
                                </div>
                                <div style="margin-right: 10px;">
                                    2024/2025 Ganjil
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
                            <th rowspan="2">Kode MK</th>
                            <th rowspan="2">Nama MK</th>
                            <th rowspan="2">Dosen Pengajar</th>
                            <th rowspan="2">SKS</th>
                            <th rowspan="2">Kelas</th>
                            <th colspan="3">Jadwal Perkuliahan</th>
                            
                            
                        </tr>
                        <tr>
                            <th>Ruang</th>
                            <th>Hari</th>
                            <th>Waktu</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>325325</td>
                            <td>Kapita Selekta</td>
                            <td>Sudarmono</td>
                            <td>2</td>
                            <td>A</td>
                            <td>Ruang B 101</td>
                            <td>Jumat</td>
                            <td>09:00 - 11:30</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>325326</td>
                            <td>Pemrograman Web</td>
                            <td>Susi Susanti</td>
                            <td>3</td>
                            <td>A</td>
                            <td>Ruang B 102</td>
                            <td>Senin</td>
                            <td>09:00 - 11:30</td>
                        </tr>
                        <tr>
                            <td  class="text-center" colspan="4">Jumlah</td>
                            <td class="text-center" colspan="1">5</td>
                            <td class="text-center" colspan="4"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>