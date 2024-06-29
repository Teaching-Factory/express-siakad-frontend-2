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
                        <h5 class="text-center mb-3"><b>KARTU HASIL STUDI (KHS)</b></h5>
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
                            <th rowspan="2">Kode Mata Kuliah</th>
                            <th rowspan="2">Nama Mata Kuliah</th>
                            <th rowspan="2">SKS</th>
                            <th colspan="3">Nilai</th>
                            <th rowspan="2">SKS*Index</th>
                            
                        </tr>
                        <tr>
                            <th>Angka</th>
                            <th>Huruf</th>
                            <th>Index</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>325325</td>
                            <td>Kapita Selekta</td>
                            <td>2</td>
                            <td>4</td>
                            <td>A</td>
                            <td>4.0</td>
                            <td>8.0</td>
                            
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>325325</td>
                            <td>Kapita Selekta</td>
                            <td>2</td>
                            <td>4</td>
                            <td>A</td>
                            <td>4.0</td>
                            <td>8.0</td>
                            
                        </tr>
                        <tr>
                            <td  class="text-center" colspan="7">IPS (Index Prestasi Semester )</td>
                            <td>0</td>
                        </tr>
                        <tr >
                            <td class="text-center" colspan="7">IPK (Index Prestasi Kumulatif ) </td>
                            <td>12</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>