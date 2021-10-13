<template>
  <canvas ref="chart"></canvas>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  props: ['data'],
  methods: {
    createChart(chartCtx, data) {
      // https://www.chartjs.org/docs/latest/
      new Chart(chartCtx, {
        type: 'line',
        data: {
          labels: data.labels,
          datasets: [{
            label: '# of events in a session at 10-second intervals',
            data: data.data,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: .1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
                suggestedMin: 0
            }
        }
        },
      });
    },
  },
  mounted() {
    this.createChart(this.$refs.chart, this.data);
    
  }
}
</script>
