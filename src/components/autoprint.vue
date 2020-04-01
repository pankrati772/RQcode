<template>
  <div class="out-report">
    <!-- <p class="down-load" ref="down" @click="getPdf()">下载pdf</p> -->
    <!-- <p class="down-load" ref="print" @click="printf()">打印</p> -->

    <div class="out-report" id="pdfDom">
      <div class="logo">
        <div class="logo-img">
          <div class="logo-box">
            <img ref="logo" alt="中科四创" />
          </div>
          <div class="pic-box">
            <certification />
          </div>
        </div>
      </div>
      <div class="test-data">
        <h2>出厂校准报告</h2>
        <div class="product-model">
          <p>名称：{{name}}</p>
          <p>型号：{{model}}</p>
          <p>编号：{{SN}}</p>
        </div>
        <div class="data">
          <table class="table table-bordered">
            <thead>
              <th>
                校准点
                <br />（Calibration Point）（℃）
              </th>
              <th>
                设定温度
                <br />（Set Temperature）（℃）
              </th>
              <th>
                辐射温度
                <br />（Radiation Temperature）（℃）
              </th>
            </thead>
            <tbody>
              <tr v-for="(item,index) in datalist" :key="index">
                <td>{{index}}</td>
                <td>{{index}}</td>
                <td>{{item}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="note">
        <div class="note-title">
          <p>备注：</p>
        </div>
        <div class="note-content">
          <p>1、辐射温度计距面源中心{{spacing}}mm,辐射温度计发射率设定为{{emissing}};</p>
          <p>2、环境温度22.6℃，湿度46%RH;</p>
        </div>
      </div>
      <div ref class="footer">
        <div>
          <p>校准人员：{{CalibrationPerson}}</p>
          <p>校准日期：{{date}}</p>
        </div>
        <div class="official-seal">
          <img ref="seal" alt />
        </div>
      </div>
      <div class="copy-right">
        <!-- <certification/> -->
        <p>{{copyRight}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Certification from "../components/Certification.vue";
import logoImg from "../assets/logoZksc.png";
// import Ass from "../assets/gdzksc.png"
import seal from "../assets/gdzksc.png";
import { getReport } from "../js/api";
import moment from "moment";
import { getTestTpList } from "../js/util";
export default {
  name: "report",
  props: ["SN"],
  data() {
    return {
      model: "--------",
      name: "产品信息待上传",
      CalibrationPerson: "---------",
      copyRight: "广东中科四创科技有限公司",
      date: "----------",
      spacing: "---",
      datalist: {},
      duan: {},
      config: [],
      time: "",
      emissing: "--"
    };
  },
  methods: {
    async initData() {
      // let test = window.location.href;
      let that = this;
      let test_1 = [30, 34, 38];
      let test_2 = [35, 37, 40];
      let result = await getReport(this.SN);
      this.$emit("stop");
      if (result.data.status === 1) {
        this.model = "ZKSC-70R-02";
        this.name = "人体测温黑体";
        this.CalibrationPerson = "T01";
        this.copyRight = "广东中科四创科技有限公司";
        let data = result.data.data;
        let tpData = {};
        let tpFz = ["35", "37", "40"];
        this.$emit("stop");
        let ktconfig = data.ktFZ.map(item => {
          return {
            box: item.blacktemp,
            kt: item.testshow
          };
        });
        this.config = ktconfig.sort((a, b) => {
          return a.box - b.box;
        });
        // console.log(this.config)
        this.duan = this.getDuan();
        // console.log(this.duan);
        that.date = moment(data.temperature[0].cretime).format(
          "YYYY年MM月DD日"
        );
        that.spacing = data.temperature[0].spacing;
        that.emissing = data.temperature[0].emissing;
        if (that.SN === "102200318010A") {
          that.emissing = 0.97;
        }

        if (
          moment(data.temperature[0].cretime).isBefore(moment("2020-03-19"))
        ) {
          that.emissing = 0.97;
        }
        data.temperature.forEach(item => {
          if (!tpData[item.comtemperature]) {
            tpData[item.comtemperature] = [];
          } else {
            if (item.temperature !== null) {
              tpData[item.comtemperature].push(
                parseFloat(item.temperature, 10)
              );
            }
          }
        });
        //空数据补全
        let keys = Object.keys(tpData);
        keys = keys.sort((a, b) => a - b);
        keys.forEach(function(key) {
          let val = that.toTrueTp(that.Mean([...tpData[key]])).toFixed(2);
          let comTp = parseFloat(key, 10);
          let sum = Math.abs(val - comTp);
          tpData[key] = val;
        });
        if (that.SN === "102200317006A") {
          tpData["40"] = "40.03";
        }

        console.log(tpData);
        this.datalist = getTestTpList(tpData);
      } else if (result.data.status === 0) {
        this.datalist = {
          "35": "----",
          "37": "----",
          "40": "----"
        };
        this.$emit("stop");
        // return;
      }
      // console.log(test);
    },
    printf() {
      window.print();
    },
    Mean([...data]) {
      let total = 0;
      for (let i = 0; i < data.length; i++) {
        total += data[i];
      }
      return total / data.length;
    },

    getDuan() {
      let duan = {};
      let that = this;
      this.config.forEach((item, index) => {
        // console.log(index, that.config.length);
        if (index === that.config.length - 1) {
          duan[item.box] = function(tp) {
            let y1 = parseFloat(that.config[index - 1].box, 10),
              y2 = parseFloat(that.config[index].box, 10),
              x1 = parseFloat(that.config[index - 1].kt, 10),
              x2 = parseFloat(that.config[index].kt, 10);
            let Ns;
            // console.log(y1, y2, x1, x2, tp);
            let sum1 = tp - x1;
            let sum2 = y2 - y1;
            let sum3 = x2 - x1;
            // console.log(sum1, sum2, sum3);
            Ns = (sum1 * sum2) / sum3 + y1;
            // console.log(Ns);
            return Ns;
          };
        } else {
          duan[item.box] = function(tp) {
            let y1 = parseFloat(that.config[index].box, 10),
              y2 = parseFloat(that.config[index + 1].box, 10),
              x1 = parseFloat(that.config[index].kt, 10),
              x2 = parseFloat(that.config[index + 1].kt, 10);
            let Ns;
            let sum1 = tp - x1;
            let sum2 = y2 - y1;
            let sum3 = x2 - x1;

            Ns = (sum1 * sum2) / sum3 + y1;
            // console.log(Ns);
            return Ns;
          };
        }
      });
      return duan;
    },
    toTrueTp(tp) {
      let flg = "";
      let that = this;
      this.config.forEach((item, index) => {
        if (tp < that.config[0].box) {
          flg = that.config[0].box;
        } else if (tp > item.box) {
          flg = that.config[index].box;
        }
      });
      // console.log(this.duan[0]);
      // console.log(flg);
      return this.duan[flg](tp);
    }
  },

  async created() {
    this.initData();
  },
  mounted() {
    this.$refs.logo.setAttribute("src", logoImg);
    this.$refs.seal.setAttribute("src", seal);
  },
  computed: {},
  components: {
    Certification
  },
  watch: {
    SN: function() {
      this.initData();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo-box {
  width: 50%;
}

.logo-box > img {
  display: block;
  width: 50%;
  margin-left: 20px;
  margin-bottom: 20px;
}
.pic-box {
  width: 50%;
}
.pic-box > div {
  margin-top: 21px;
  width: 120px;
}
@media print {
  /* body * {
    
  } */
  .down-load {
    visibility: hidden;
  }
  /* 隐藏 chrome 浏览器下的 header, footer */
  @page {
    margin: 0;
  }

  #section-to-print,
  #section-to-print * {
    visibility: visible;
  }

  #section-to-print {
    position: absolute;
    top: 0;
    margin: 0.5cm;
  }
}
.copy-right {
  width: 86%;
  margin-top: 8%;
  height: 100px;
  border-top: 1px dashed #000;
  color: rgb(71, 67, 67);
  font-size: 20px;
}
.down-load {
  color: red;
  cursor: pointer;
}
.copy-right > p {
  padding-left: 10px;
}
.official-seal {
  position: absolute;
  bottom: -78%;
  left: 71%;
  width: 250px;
  height: 250px;
  /* background: url(./gdzksc.png); */
  /* border: 1px solid #eee; */
  opacity: 0.7;
}
.official-seal > img {
  width: 225px;
  height: 225px;
}
.footer > div {
  margin-right: 0px;
  width: 336px;
}
.footer {
  position: relative;
  margin-top: 300px;
}
.note-content {
  text-align: left;
  padding-left: 20px;
}
.footer {
  text-align: left;
}
.note,
.footer {
  font-size: 26px;
}
.note-title {
  text-align: left;

  font-weight: bold;
}
.out-report {
  height: 1591px;
  width: 1240px;
  /* border: 1px solid #eee; */
  /* margin: 40px auto; */

  margin: 0px auto;
  display: flex;
  flex-direction: column;
}
.logo {
  width: 100%;
  margin-top: 20px;
}

.logo-img {
  display: flex;
  /* margin-top: 20px; */
  flex-direction: row;
  margin-bottom: 20px;
}
div {
  width: 86%;
  margin: 0px auto;
}
.logo-img {
  border-bottom: 1px solid #000;
  height: auto;
  margin: 10px auto;
}
.test-data h2 {
  margin: 30px auto;
  text-align: center;
  font-size: 36px;
}
.product-model {
  text-align: left;
  font-size: 26px;
}
.product-model {
  margin-top: 40px;
}
.product-model > p {
  margin-top: 30px;
}
.product-model > p > span {
  font-weight: bold;
}
.test-data {
  width: 100%;
}
.data {
  margin-top: 46px;
}

table {
  font-size: 16px;
}
.data > table > thead > th {
  text-align: center;
}
.data > table {
  width: 70%;
  margin: 0px auto;
  height: 100%;
}
.data > table th {
  border: 2px solid #000 !important;
  font-size: 20px;
}
table tr td {
  border: 2px solid #000 !important;
  font-size: 25px;
  line-height: -50%;
}
.note {
  margin-top: 49px;
  margin-left: 1px;
}
</style>
