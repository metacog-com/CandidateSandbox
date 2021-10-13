<template>
        <canvas ref="chart" width="400" height="400"></canvas>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  props: ['data'],
  methods: {
    createChart(chartCtx, data) {
      const chartData = {
        datasets: [{
          label: 'Session',
          data: data,
          backgroundColor: 'rgb(255, 99, 132)'
        }],
      };
      new Chart(chartCtx, {
        type: 'scatter',
        data: chartData,
        options: {
          plugins: {
            title: {
              display: true,
              text: '# of Session Events vs Session Duration'
            }
          },
          responsive: true,
          maintainAspectRatio: false,
          // parsing: false,
          // normalized: true,
          scales: {
            x: {
              title: {
                color: 'red',
                display: true,
                text: 'Session Duration (seconds)'
              },
              // ticks: {
              //   sampleSize: 10,
              //   autoSkip: true,
              // },
            },
            y: {
              title: {
                color: 'red',
                display: true,
                text: '# of Session Events'
              },
            },
          },
        }
      });
    },
  },
  mounted() {
    this.createChart(this.$refs.chart, this.data);
  }
}
</script>
