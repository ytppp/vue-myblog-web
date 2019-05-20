<template>
  <div class="e-pie" ref="e_pie"></div>
</template>

<script>
import echarts from 'echarts'

export default {
  props: {
    pieObj: {
      type: Object,
      default: () => {
        return {
          seriesData: [
            {
              value: 1,
              name: '数据项'
            }
          ],
          legendData: [
            '数据项'
          ]
        }
      }
    }
  },
  data () {
    return {
      pieChart: null
    }
  },
  watch: {
    // 监测到数据变化时重绘图
    'pieObj.seriesData' (val) {
      this.drawPie()
    }
  },
  methods: {
    resize () {
      this.pieChart.resize()
    },
    drawPie () {
      this.pieChart = echarts.init(this.$refs.e_pie)

      let options = {
        legend: {
          orient: 'vertical',
          x: 'right',
          y: 'bottom',
          textStyle: {
            color: '#999',
            fontSize: 12
          },
          data: this.pieObj.legendData
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/> {c} ({d}%)'
        },
        color: this.pieObj.legendData.length === 3 ? ['#f45250', '#cbcc48', '#458fc9'] : [
          '#f45250',
          '#cbcc48',
          '#458fc9',
          '#d48265',
          '#91c7ae',
          '#749f83',
          '#ca8622'
        ],
        series: [
          {
            type: 'pie',
            center: ['40%', '50%'],
            avoidLabelOverlap: false,
            emphasis: {
              label: {
                show: true,
                normal: {
                  textStyle: {
                    color: '#999',
                    fontWeight: 'bold'
                  }
                },
                fontSize: 10
              }
            },
            data: this.pieObj.seriesData
          }
        ]
      }
      this.pieChart.setOption(options)
    },
    rigiestEvent () {
      window.addEventListener('resize', () => {
        this.resize()
      })
    }
  },
  mounted () {
    this.drawPie()
    this.rigiestEvent()
  }
}
</script>

<style scoped>
.e-pie {
  height: 100%;
  width: 100%;
}
</style>
