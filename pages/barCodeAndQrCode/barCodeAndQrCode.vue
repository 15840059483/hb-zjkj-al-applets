<template>
	<view>
		<!-- loading加载动画，type默认值是原子，love爱心，mask属性是遮罩 -->
		<zero-loading v-if="loading" type="pulse" mask></zero-loading>
		<!-- 使用组件的时候首字母要大写！！！！ -->
		<!-- <view class="header" style="width: 100%;height: 150rpx;">
			<Header :title="title" :shouye="shouye"></Header>
		</view> -->
		<view class="zhuti">
			<uni-card class="payment-ma-wrapper bg-white text-center">
				<view class="payment-ma-ping" style="text-align: center;">就诊凭条（凭以下凭条进行就诊）</view>
				<image style="width: 100%;height: 240rpx;margin-top:10px;"
					:src="baseUrl + '/hospt/getBarCode?body=' + dfltPatientInfo.cardNumber" class="doctor8-ma-img" />
				<view class="payment-ma-num" style="display: flex;justify-content: center;align-items: center;">
					<view v-if="isShowCardNumber">{{ dfltPatientInfo.cardNumber }}</view>
					<view v-else>{{ dfltPatientInfo.cardNumber | processingcardNumber }}</view>
					<view style="width: 10%;text-align: right;">
						<text class="iconfont icon-biyanjing" v-if="!isShowCardNumber" style="color: #008cfe"
							@click="isShowCardNumber = true"></text>
						<text class="iconfont icon-icon-eye-open" v-if="isShowCardNumber"
							style="color: #008cfe" @click="isShowCardNumber = false"></text>
					</view>
				</view>
			</uni-card>
		</view>
	</view>
</template>

<script>
	// 引入导航栏组件
	// import header from '@/components/header/header.vue'
	import {
		BASE_URL
	} from "../../http/api.js";
	import '../register-success/register-success.scss'
	import '../payment-details/payment-details.scss'
	export default {
		// 注册使用导航栏组件
		components: {
			// header,
		},
		filters: {
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
						
			}
		},
		data() {
			return {
				title: "就诊码", // 页面标题
				shouye: "no", // 是否是首页，不是首页显示返回上一层箭头

				dfltPatientInfo: {},
				baseUrl: BASE_URL,
				loading: true, // 加载动画
				
				isShowCardNumber: false
			}
		},
		methods: {
			getDfltPtCardInfo() {
				this.$myRequest({
					url: "/wechat/user/dfltPtCard/info"
				}).then(data => {
					this.dfltPatientInfo = data.data || null;
					this.loading = false;
				}).catch(err => {
					this.loading = false;
				})
			}
		},
		mounted() {
			this.getDfltPtCardInfo()
		}
	}
</script>

<style scoped>
	/* .header {
		position: fixed;
		top: 0;
		z-index: 999;
	} */

	/* 	.zhuti {
		margin-top: 150rpx;
	} */
</style>
