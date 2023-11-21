<template>
  <el-row>
    <el-col :span="8" style="padding-right:10px">
      <el-card class="box-card">
        <div class="user">
          <img src="../assets/images/user.png" alt="" />
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登陆时间 <span>2021-07-19</span></p>
          <p>上次登陆地点 <span>武汉</span></p>
        </div>
      </el-card>
      <el-card style="height: 460px; margin-top: 20px">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            v-for="(val, key) in tableLable"
            :prop="key"
            :label="val"
            :key="key"
          >
          </el-table-column>
          <!-- <el-table-column prop="todayBuy" label="今日购买"> </el-table-column>
          <el-table-column prop="monthBuy" label="本月购买"> </el-table-column>
          <el-table-column prop="totalBuy" label="总购买"> </el-table-column> -->
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="padding-left:10px">
      <div class="num">
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          >
          </i>
          <div class="detail">
            <p class="price">￥{{ item.value }}</p>
            <p class="desc">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height:280px">
        <!-- 折线图 -->
        <div ref="echarts1" style="height:280px"></div>
      </el-card>
      <div class="graph">
        <el-card></el-card>
        <el-card></el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from "../api";
import * as echarts from 'echarts';
export default {
  name: "home",
  data() {
    return {
      tableData: [],
      tableLable: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
    };
  },
  mounted() {
    getData().then(({ data }) => {
      const { tableData } = data.data;
      this.tableData = tableData;

      // 折线图
      //基于准备好的dom，初始化echarts实例
      const echarts1 = echarts.init(this.$refs.echarts1)
       var lineOption = {}
      //处理数据xAxis
      const { orderData } = data.data
      console.log(orderData)
      const legendData = Object.keys(orderData.data[0])
        lineOption.xAxis = {
          data: orderData.date.map(item =>item.substr(0,4) + '-' + item.substr(6,4) + '-' + item.substr(6,8))
        }
        lineOption.yAxis = {}
        lineOption.legend = {
        data: legendData 
      }   

        //指定图表的配置项和数据
        lineOption.series = []
        legendData.forEach(key => {
          lineOption.series.push({
            name:key,
            data:orderData.data.map(item =>item[key]),
            type:'line',
          })
        })
        echarts1.setOption(lineOption)
    });
  },
};
</script>

<style lang="less" scoped>
.user {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  img {
    margin-right: 40px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  .userinfo {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .access {
      color: #999999;
    }
  }
}
.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999999;
    span {
      color: #666666;
      margin-left: 60px;
    }
  }
}
.num {
  display: flex;
  flex-wrap: wrap;//拆行
  justify-content: space-between;
  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }
  .detail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 15px;
    .price {
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 30px;
      height: 30px;
    }
    .desc {
      font-size: 14px;
      color: #999;
      text-align: center;
    }
  }
  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
}
.graph {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .el-card {
    width: 48%;
    height: 260px;
  }
}
</style>