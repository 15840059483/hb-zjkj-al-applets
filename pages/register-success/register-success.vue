<template>
	<view>
		<!-- 使用组件的时候首字母要大写！！！！ -->
		<!-- 	<view class="header" style="width: 100%;height: 150rpx;">
			<Header :title="title" :shouye="shouye"></Header>
		</view> -->
		<view class="zhuti">
			<uni-card>
				<view class="payment-success-wrapper bg-white" style="padding: 10px 0.5rem;">
					<view style="width: 100%; display: flex;">
						<view style="width: 25%;text-align: center;">
							<img style="width: 70px;height: 70px;" src="https://s1.ax1x.com/2022/09/23/xkliHH.png" />
						</view>
						<view style="width: 75%;padding: 9px .3rem 9px .3rem;">
							<div style="font-size: 16px;" class="payment-success">{{ "缴费成功" }}</div>
							<div>{{ formatDate("YY-MM-DD hh:mm:ss") }}</div>
						</view>
					</view>

					<view style="width: 100%;text-align: left;font-size: 14px;line-height: 1rem;margin-top: 10px;"
						class="payment-tip">
						<span>缴费成功，请在当天提前15分钟前往医院候诊</span>
					</view>
				</view>
				<div class="payment-list-item bg-white">
					<div :span="12">就诊时间</div>
					<div :span="12" class="text-right register-yellow">
						<div>{{ formatDate("YY-MM-DD hh:mm:ss") }}</div>
					</div>
				</div>
			</uni-card>
			<uni-card>
				<div class="payment-list-item bg-white margin-top biankuang">
					<div :span="12">费用类型</div>
					<div :span="12" class="text-right">{{ orderDetail.costName }}</div>
				</div>
				<div class="payment-list-item bg-white biankuang">
					<div :span="12">医院名称</div>
					<div :span="12" class="text-right">{{ orderDetail.hospitalName || '-' }}</div>
				</div>
				<div class="payment-list-item bg-white biankuang">
					<div :span="12">就诊科室</div>
					<div :span="12" class="text-right">{{ orderDetail.deptName || '-' }}</div>
				</div>
				<div class="payment-list-item bg-white biankuang">
					<div :span="12">科室位置</div>
					<div :span="12" class="text-right">{{ orderDetail.hospitalName || '-' }}</div>
				</div>
				<div class="payment-list-item bg-white biankuang">
					<div :span="12">医生名称</div>
					<div :span="12" class="text-right">{{ orderDetail.deptlocation || '-' }}</div>
				</div>
				<div class="payment-list-item bg-white biankuang">
					<div :span="12">医生职称</div>
					<div :span="12" class="text-right">{{ orderDetail.doctorName || '-' }}</div>
				</div>
			</uni-card>
			<uni-card>
				<div class="payment-list-item bg-white margin-top biankuang">
					<div :span="12">就诊人</div>
					<div :span="12" class="text-right">{{ orderDetail.patientName || '-' }}</div>
				</div>
				<div class="payment-list-item bg-white biankuang" style="color: #3a8ee6">
					<div :span="12">平台单号</div>
					<div :span="12" class="text-right">{{ orderDetail.orderNo || '-' }}</div>
				</div>
				<div class="payment-list-item bg-white biankuang" style="color: #5daf34">
					<div :span="12">发票号</div>
					<div :span="12" class="text-right">{{ orderDetail.invoiceNo || '-' }}</div>
				</div>
				<div class="payment-list-item bg-white biankuang">
					<div :span="12">支付流水号</div>
					<div :span="12" class="text-right">{{ orderDetail.patientSeq || '-' }}</div>
				</div>
				<div class="payment-list-item bg-white biankuang" style="color: #ff4d51">
					<div :span="12">诊查费</div>
					<div :span="12" class="text-right">￥{{ orderDetail.payMount }}</div>
				</div>
				<!--    <div class="payment-list-item bg-white" v-if="orderDetail.costType != 4011">-->
				<!--      <div :span="12">工本费</div>-->
				<!--      <div :span="12" class="text-right">￥1.00</div>-->
				<!--    </div>-->
				<div class="payment-list-item bg-white biankuang" style="color: #ff4d51">
					<div :span="12">合计金额</div>
					<div :span="12" class="text-right">￥{{ orderDetail.balanceFee || 0 }}</div>
				</div>
				<div class="payment-list-item bg-white biankuang" style="color: #ff4d51">
					<div :span="12">总金额</div>
					<div :span="12" class="text-right">￥{{ orderDetail.payMount || 0 }}</div>
				</div>
				<div class="payment-list-item bg-white biankuang" style="color: #ff4d51">
					<div :span="12">退费金额</div>
					<div :span="12" class="text-right">￥{{ orderDetail.refundFee || 0 }}</div>
				</div>
				<div class="payment-list-item bg-white biankuang"
					style="flex-wrap: wrap; height: auto;margin-bottom: 30px;">
					<div>备注</div>
					<!--      <div :span="12" :style="{color: orderDetail.description === '缴费正常' ? 'green' : 'red', 'font-size': '.4rem'}">-->
					<!--        {{ orderDetail.description | description }}-->
					<!--      </div>-->
					<!--      <div class="text-right" style="color: red;font-size: .4rem">{{ orderDetail.description | descriptionError }}</div>-->
					
					<div v-if="!orderDetail.description || orderDetail.description === '缴费正常'" style="color: green">{{ orderDetail.description || '-' }}
					</div>
					<div v-else v-for="(value, key) in JSON.parse(orderDetail.description)"
						style="width: 100%;display: flex;justify-content: space-between;margin-top: .2rem;">
						<span style="color: red;font-size: .4rem">{{ key }}</span>
						<span style="color: red;font-size: .4rem">{{ value }}</span>
					</div>
				</div>
			</uni-card>

		</view>

		<view class="nav_tab" v-if="home===true">
			<view class="buttom_height"></view>
			<view class="tab_button" @click="zhuye()">
				<view style="width: 100%;text-align: center;line-height: 110rpx;font-size: 20px;">
					返回主页
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import "./register-success.scss";
	import "../payment-details/payment-details.scss";
	export default {
		filters: {
			dateStr(val) {
				if (!val) {
					return "-";
				}
				return val.slice(0, 10);
			},
			description(val) {
				const obj = JSON.parse(val);
				let str = "";
				for (const key in obj) {
					str += "、" + key;
				}
				return str ? str.slice(1) : "-";
			},
			descriptionError(val) {
				const obj = JSON.parse(val);
				let str = "";
				for (const key in obj) {
					str = obj[key];
				}
				return str || "-";
			},
		},
		data() {
			return {
				title: "订单详情 ", // 页面标题
				shouye: "no", // 是否是首页，不是首页显示返回上一层箭头
				orderDetail:{},
				// backGo: this.$route.query.backGo ? Number(this.$route.query.backGo) : -2,
				home: false, // 底部返回主页栏的显示与隐藏
			}
		},
		// 这是uni的生命周期
		// 在uniapp中如果要使用路由传参必须使用onload(路由传参中的参数值)
		onLoad(e) {
			console.log(e, 'regiser-success');
			clearTimeout(this.timer); //清除延迟执行
			this.orderDetail = JSON.parse(e.orderDetail)
			console.log(this.orderDetail)
			console.log(e.authCode,"regiser-success")
			if(e.authCode){
				my.getAuthCode({
				  scopes: 'mfrstre',
				  success: item => {
					  if(item.authCode){
						  let datas = {
						  	code: item.authCode,
						  	scene: 'horegister'
						    }
						    
						  this.$myRequest({
						  	url: "/al/auth/al/sendCity",
						  	method: "GET",
						  	data: datas,
						  }).then(data => {
						  	console.log(data)
						  	my.alert({
						  	  content: '本次挂号得到能量为'+data.data.totalEnergy,
						  	});
						  });
					  }
				    
				  },
				});
			}
			this.timer = setTimeout(() => {
				//设置延迟10秒执行弹出提示框
				this.open();
			}, 10000);
		},
		onShow() {
			clearTimeout(this.timer); //清除延迟执行
			

			this.timer = setTimeout(() => {
				//设置延迟10秒执行弹出提示框
				this.open();
			}, 10000);
		},
		methods: {
			// 返回主页
			zhuye() {
				uni.reLaunch({
					url: '/pages/index/index'
				});
			},
			// 提示框
			open() {
				let _this = this;
				uni.showModal({
					title: '提示',
					content: '是否返回主页?',
					success: function(res) {
						if (res.confirm) {
							uni.reLaunch({
								url: '/pages/index/index'
							});
						} else if (res.cancel) {
							console.log("取消");
							_this.home = true;
							console.log(_this.home)
						}
					}
				});


				// this.$confirm("是否返回主页?", "提示", {
				// 		confirmButtonText: "确定",
				// 		cancelButtonText: "取消",
				// 		iconClass: "el-icon-s-home",
				// 	})
				// 	.then(() => {
				// 		this.$router.push("/index");
				// 	})
				// 	.catch(() => {
				// 		console.log("取消");
				// 		this.home = true;
				// 	});
			},

			formatDate(fmt) {
				const date = new Date();
				const o = {
					"Y+": date.getFullYear(),
					"M+": date.getMonth() + 1, // 月
					"D+": date.getDate(), // 日
					"h+": date.getHours(), // 时
					"m+": date.getMinutes(), // 分
					"s+": date.getSeconds(), // 秒
					W: date.getDay(), // 周
				};
				for (let k in o) {
					if (new RegExp("(" + k + ")").test(fmt)) {
						fmt = fmt.replace(RegExp.$1, () => {
							if (k === "W") {
								// 星期几
								const week = ["日", "一", "二", "三", "四", "五", "六"];
								return week[o[k]];
							} else if (k === "Y+" || RegExp.$1.length === 1) {
								// 年份 or 小于10不加0
								return o[k];
							} else {
								return ("00" + o[k]).substr(("" + o[k]).length); // 小于10补位0
							}
						});
					}
				}
				return fmt;
			},
		},
		mounted() {

		},
	};
</script>

<style scoped>
	/* 	.header {
		position: fixed;
		top: 0;
		z-index: 999;
	} */

	/* .zhuti {
		margin-top: 170rpx;
	} */

	.zhuti>>>.uni-card {
		padding: 0 !important;
	}

	.biankuang {
		border-bottom: 1px solid rgb(210, 210, 210);
		margin: 0 !important;
		/* padding: .6rem .5rem .6rem .5rem; */
	}
</style>
