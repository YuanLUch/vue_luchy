<template>
  <div class="echart" ref="mychart" id="mychart" :style="myChartStyle"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: 'sql',
  data() {
    return {
      xData: ["table", "view", "trigger"],
      //xData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], //横坐标
      yData: [10, 20, 30], //数据
      myChartStyle: { float: "center", width: "100%", height: "400px" } //图表样式
    };
  },
  mounted() {
    this.initEcharts();
  },
  methods: {
    initEcharts() {
      // 基本柱状图
      const option = {
        xAxis: {
          data: this.xData
        },
        yAxis: {},
        series: [
          {
            type: "bar", //形状为柱状图
            data: this.yData,
            barMaxWidth: '20%'
          }
        ]
      };
      const myChart = echarts.init(document.getElementById("mychart"));
      // const myChart = echarts.init(this.$ref.chart)
      myChart.setOption(option);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    }
  }
};
</script>
