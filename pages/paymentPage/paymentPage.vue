<template>
	<view>
		<!-- 使用组件的时候首字母要大写！！！！ -->
		<!-- view class="header" style="width: 100%;height: 150rpx;">
			<Header :title="title" :shouye="shouye"></Header>
		</view> -->
		<view class="zhuti">
			<div class="wait text-center" v-if="!isShowResult">
				<p>请耐心等待不要离开页面</p>
				<div class="wait-second">{{ second }}s</div>
				<!--      <div class="wait-btn" :style="{'background': second === 0 ? '#008cfe' : '#b4b4b4'}" @click="clickToView">-->
				<!--        点击查看-->
				<!--      </div>-->
			</div>
			<div class="result text-center" v-if="isShowResult">
				<div v-if="isSuccess" style="text-align: center;">
					<img src="https://s1.ax1x.com/2022/09/13/vjYNLt.png" />
					<p>缴费成功</p>
				</div>
				<div v-if="!isSuccess" style="text-align: center;">
					<img src="https://s1.ax1x.com/2022/09/13/vjYtsI.png" />
					<p>缴费失败</p>
					<p>立即返回待缴费页面</p>
				</div>
			</div>
		</view>
	</view>
</template>

<script>
	// 引入导航栏组件
	// import header from '@/components/header/header.vue'
	export default {
		// 调用头部组件
		components: {
			// header
		},
		data() {
			return {
				title: "缴费页面", // 页面标题
				shouye: "no", // 是否是首页，不是首页显示返回上一层箭头
				authCode:'',
				orderNo: "",
				second: 10,
				isSuccess: true,
				isShowResult: false,
				time: null,
				isTime: true,
			}
		},
		methods: {
			clickToView() {
				this.isShowResult = true;
			},

			getOrderDetail() {
				this.isShowResult = false;
				this.isSuccess = false;
				clearInterval(this.time);
				const params = {
						  orderNo: this.orderNo
						}
				this.$myRequest({
					url: "/hospt/getWechatOrderList",
					data: params,
				}).then(res => {
					if (res.data.length === 0) {
						this.isShowResult = false;
						this.isSuccess = false
						clearInterval(this.time);
					} else {
						const paymentstatusId = res.data[0].paymentstatusId
						if (paymentstatusId == 3010) {
							this.isShowResult = true;
							this.isSuccess = true
							clearInterval(this.time);
							console.log(this.authCode,"判断缴费")
							if(this.authCode){
								setTimeout(() => {
									uni.navigateTo({url: '/pages/register-success/register-success?type=门诊' + '&orderDetail='+JSON.stringify(
										res.data[0])+'&authCode='+'1'})
								}, 1000)
								return
							}
							setTimeout(() => {
								uni.navigateTo({url: '/pages/register-success/register-success?type=门诊' + '&orderDetail='+JSON.stringify(
									res.data[0])})
							}, 1000)
							
						} else if (paymentstatusId == 3011 && !this.isTime) {
							this.isShowResult = true;
							this.isSuccess = false
						} else if (paymentstatusId == 3011) {
							setTimeout(() => {
								this.getOrderDetail();
							}, 1000)
						} else if (paymentstatusId == 3014) {
							this.isShowResult = true;
							this.isSuccess = false
							clearInterval(this.time);
						}
					}
				}).catch(err => {
					this.loading = false;
				})
			},

		},
		onLoad(e) {
			this.orderNo = e.orderNo;
			this.authCode = e.authCode;
			console.log(this.orderNo);
		},
		mounted() {
			this.getOrderDetail()
			this.time = setInterval(() => {
				this.second--;
				if (this.second === 0) {
					this.isTime = false;
					this.getOrderDetail();
					clearInterval(this.time);
				}
			}, 1000);
		},
	};
</script>

<style lang="scss" scoped>
	// .header {
	// 	position: fixed;
	// 	top: 0;
	// 	z-index: 999;
	// }

	// .zhuti {
	// 	margin-top: 170rpx;
	// }

	.wait {
		padding: 16px 0;
		text-align: center;

		p {
			font-size: 20px;
			color: #888787;
		}

		.wait-second {
			width: 100px;
			height: 100px;
			line-height: 100px;
			border-radius: 50%;
			margin: 30px auto;
			background-color: #008cfe;
			color: #ffffff;
		}

		.wait-btn {
			width: 60%;
			margin: 0 auto;
			border-radius: 5px;
			padding: 0.3rem 0;
			color: #ffffff;
		}
	}

	.result {
		color: #008cfe;

		img {
			margin-top: 1rem;
			width: 160px;
			height: 130px;
		}

		p {
			letter-spacing: 3px;
			text-align: center;
			margin-top: 10px;
		}
	}
</style>
