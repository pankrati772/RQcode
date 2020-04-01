<template>
  <div class="cer-box">
    <div>
      <img class="ce" ref="ce" />
      <img class="ffc" ref="fcc" />
      <img class="pse" ref="pse" />
      <img class="rohs" ref="rohs" />
    </div>
  </div>
</template>
<script>
import ce from "../assets/ce.png";
import fcc from "../assets/FCC.png";
import pse from "../assets/pse.png";
import rohs from "../assets/RoHs2.png";
export default {
  name: "Certification",
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.initLogo();
  },
  methods: {
    initLogo() {
      console.log(this.$refs.ce);
      this.$refs.ce.setAttribute("src", ce);
      this.$refs.fcc.setAttribute("src", fcc);
      this.$refs.pse.setAttribute("src", pse);
      this.$refs.rohs.setAttribute("src", rohs);
    }
  }
};
</script>
<style lang="">
.cer-box > div {
  display: flex;
  flex-direction: row;
  height: 33px;
  width: 194px;
  margin-bottom: 0px;
}

.ce,
.ffc,
.pse,
.rohs {
  display: block;
  margin-left: 10px;
}
.pse {
  height: 42.5px;
}
.ce,
.ffc {
  width: 52.5px;
  height: 37.5px;
}
.rohs {
    /* width: 100px; */
    height: 44.5px;
}
</style>