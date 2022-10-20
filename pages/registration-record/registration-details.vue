<template>
  <div style="padding-bottom: 1rem">
    <view class="payment-success-wrapper bg-white">
      <view style="display: flex;align-items: center;">
		  <view :span="5">
		    <img style="width: 1.5rem;height: 1.5rem;margin-right: .2rem;" src="../../static/icon-success.png">
		  </view>
		  <view :span="19">
		    <div class="payment-success">{{ '缴费成功' }}</div>
		    <div>{{ orderDetail.regDate | dateStr }}</div>
		  </view>
	  </view>
      <view :span="24" class="payment-tip">
        <span>预约挂号成功，请在预约当天提前15分钟前往医院挂号克式排队候诊</span>
      </view>
    </view>

    <div class="payment-ma-wrapper bg-white text-center">
      <p class="payment-ma-ping">就诊凭条（凭以下凭条进行就诊）</p>
      <img :src="baseUrl + '/hospt/getBarCode?body=' + orderDetail.outpatientId" class="doctor8-ma-img"/>
      <p class="payment-ma-num">{{ orderDetail.outpatientId | processingcardNumber}}</p>
    </div>

    <div class="payment-list-item bg-white">
      <div>就诊时间</div>												<!-- orderDetail.scheduleName -->
      <div class="text-right">{{ orderDetail.regDate | dateStr }}{{'[全天]'}}</div>
    </div>
    <div class="payment-list-item bg-white margin-top">
      <div :span="12">费用类型</div>
      <div :span="12" class="text-right">挂号缴费</div>
    </div>
    <div class="payment-list-item bg-white">
      <div :span="12">医院名称</div>
      <div :span="12" class="text-right">{{ '抚顺市眼病医院' }}</div>
    </div>
    <div class="payment-list-item bg-white">
      <div :span="12">就诊科室</div>
      <div :span="12" class="text-right">{{ orderDetail.deptName || '-' }}</div>
    </div>
    <div class="payment-list-item bg-white">
      <div :span="12">医生名称</div>
      <div :span="12" class="text-right">{{ orderDetail.doctorName || '-' }}</div>
    </div>
    <div class="payment-list-item bg-white">
      <div :span="12">医生职称</div>
      <div :span="12" class="text-right">{{ orderDetail.regLevelName || '-' }}</div>
    </div>
    <div class="payment-list-item bg-white margin-top">
      <div :span="12">就诊人</div>
      <div :span="12" class="text-right">{{ orderDetail.patientName | processingName }}</div>
    </div>
    <div class="payment-list-item bg-white" v-if="orderDetail.costType == 4010">
      <div :span="12">诊查费</div>
      <div :span="12" class="text-right">￥{{ orderDetail.regFee }}</div>
    </div>
    <!--    <div class="payment-list-item bg-white" v-if="orderDetail.costType != 4011">-->
    <!--      <div :span="12">工本费</div>-->
    <!--      <div :span="12" class="text-right">￥1.00</div>-->
    <!--    </div>-->
    <div class="payment-list-item bg-white">
      <div :span="12">合计金额</div>
      <div :span="12" class="text-right">￥{{ orderDetail.totalFee || 0 }}</div>
    </div>
  </div>
</template>

<script>
import {BASE_URL} from "../../http/api.js";
import '../payment-details/payment-details.scss'

export default {
  name: "registration-details",
  filters: {
	  processingName(str) {
	  	if (!str) {
	  		return '-';
	  	}
	  	if (null != str && str != undefined) {
	  		let star = '' //存放名字中间的*
	  		//名字是两位的就取姓名首位+*
	  		if (str.length <= 2) {
	  			return str.substring(0, 1) + "*";
	  		} else {
	  			// 长度减1是因为后面要保留1位
	  			for (var i = 0; i < str.length - 1; i++) {
	  				star = star + '*'
	  			}
	  			// substring()截取字符串， 第一个参数是开始截取的下标，第二个是结束的下标，第二个参数不填就从下标开始截取到最后一位
	  			return str.substring(0, 0) + star + str.substring(str.length - 1, str.length);
	  		}
	  	}
	  
	  },
	  processingcardNumber(str) {
	  	if (!str) {
	  		return '-';
	  	}
	  	let star = '' //存放就诊号中间的*
	  	// 长度减2是因为后面要保留两位
	  	for (var i = 0; i < str.length - 2; i++) {
	  		star = star + '*'
	  	}
	  	// substring()截取字符串， 第一个参数是开始截取的下标，第二个是结束的下标，第二个参数不填就从下标开始截取到最后一位
	  	return str.substring(0, 3) + star + str.substring(str.length - 2, str.length)
	  
	  },
    dateStr(val) {
      if (!val) {
        return '-'
      }
      return val.slice(0, 4) + '-' + val.slice(4, 6) + '-' + val.slice(6, 8)
    }
  },
  data() {
    return {
      orderDetail: '',
      baseUrl: BASE_URL,
    }
  },
  mounted() {
  	console.log(this.BASE_URL)
  },
  onLoad(query){
       console.log("接收参数",query);      // query 就是传递过来的参数
	  this.orderDetail = JSON.parse(query.orderDetail)
   },
}
</script>

<style scoped>

</style>
