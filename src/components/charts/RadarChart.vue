<template>
    <canvas id="RadarChart" width="400" height="400"></canvas>
</template>

<script>
import Chart from 'chart.js/auto'
import { h } from 'vue'

export default {
    name: "RadarChart",
    data() {
        return {
            chart: Chart,
        }
    },
    props: ["radarData"],
    async mounted() {
        const ctx = document.getElementById('RadarChart').getContext('2d');
        this.chart = new Chart(ctx, {
            type: "radar",
            data: {
                labels: ["健康", "人間関係", "環境", "言語", "表現"],
                datasets: [{
                    label: "",
                    data: [this.radarData[0], this.radarData[1], this.radarData[2], this.radarData[3], this.radarData[4]],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgb(54, 162, 235)',
                    pointBackgroundColor: 'rgb(54, 162, 235)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(54, 162, 235)',
                    borderWidth: 1,
                }]
            },
            options: {
                scales: {
                    r: {
                        min: 0,
                        max: 1000,
                        ticks: {
                            count: 5,
                            // stepSize: 30
                        },
                    },
                },
                plugins: {
                    legend: {
                        display: false,
                    }
                }
            }
        })
        this.chart;
    }
}

</script>

<style>
#RadarChart {
    border-color: white;
}
</style>