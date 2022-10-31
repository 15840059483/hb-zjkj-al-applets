<template>
	<view>
		<view class="zhuti">
			<div class="record-wrapper">
				<uni-card>
					<div class="patient-wrapper bg-white" v-if="!patientInfo.name">
						<div class="patient-wrapper-button" @click="openAddPatient">使用，请添写住院人</div>
					</div>
					<div v-if="patientInfo.name">
						<view class="patient-info-row" style="display: flex;padding:10px 0">
							<view style="width: 80%;font-size: .22rem">
								住院人：{{ patientInfo.name }}[{{ patientInfo.inpatientNo }}]</view>
							<view style="width: 20%;text-align: right;" class="text-right">
								<img style="width: .35rem;height: .35rem;"
									src="../../static/replacement.png" @click="openAddPatient" />
							</view>
						</view>
						<view class="patient-info-row" style="display: flex;padding:10px 0;font-size: .22rem">
							<view style="width: 40%;">科室：{{ patientInfo.deptName }}</view>
							<view style="width: 60%;">入院时间：{{ patientInfo.inDate.substr(0, 10) }}</view>
						</view>
						<view class="patient-info-row" style="display: flex;padding:10px 0;font-size: .22rem">
							<view style="width: 33%;text-align: left;">押金总额：<span
									style="color: #008cfe">{{ patientInfo.prepayCost }}元</span>
							</view>
							<view style="width: 33%;text-align: center;">费用总额：<span
									style="color: #008cfe">{{ patientInfo.totCost }}元</span>
							</view>
							<view style="width: 33%;text-align: right;">欠费：<span style="color: #008cfe">￥{{ patientInfo.freeCost }}</span>
							</view>
						</view>
					</div>
				</uni-card>
			</div>

			<uni-card>
				<div class="bg-white money-container">
					<div class="flex">
						<div>选择充值金额</div>
						<div class="text-right" style="font-size: .3rem;color: #8e8e8e">
							余额：
							<span style="color: #008cfe" v-if="patientInfo.freeCost">￥{{ patientInfo.freeCost }}</span>
							<span style="color: #008cfe" v-else>￥</span>
						</div>
					</div>
					<div class="money-num flex">
						<div :class="selectMoney === 500 ? 'bg-blue' : ''" @click="clickMoney(500)">500</div>
						<div :class="selectMoney === 1000 ? 'bg-blue' : ''" @click="clickMoney(1000)">1000元</div>
						<div :class="selectMoney === 2000 ? 'bg-blue' : ''" @click="clickMoney(2000)">2000元</div>
					</div>
					<view style="width: 90%;margin:0 auto;">
						<input type="number" style="width: 100%;border: #ccc 1px solid;" class="money-input"
							placeholder="请输入大于一千元的整百金额" @input="moneyChange()" v-model="moneyNum">
						</input>
					</view>
				</div>
			</uni-card>
			<div class="recharge">
				<button class="recharge-btn" @click="onRechargeBtn"
					:style="{background: patientInfo ? '#008cfe' : '#bfbfbf'}">充值
				</button>
			</div>

			<div v-if="showAddPatient" class="add-patient-bg">
				<div class="add-patient-container bg-white">
					<view class="add-patient-title" style="display: flex;">
						<view style="width: 80%;">住院人信息</view>
						<view style="width: 20%;text-align: right;" class="text-right">
							<!-- <i class="el-icon-close" @click="showAddPatient = false"></i> -->
							<text class="iconfont icon-guanbi" @click="showAddPatient = false"></text>
						</view>
					</view>
					<view class="add-patient-input">
						<view style="width: 25%;">姓名</view>
						<view style="width: 75%;">
							<uni-easyinput type="text" v-model="patient.name" placeholder="请输入姓名">
							</uni-easyinput>
							<!-- <input placeholder="请输入姓名" v-model="patient.name"></input> -->
						</view>
					</view>
					<view class="add-patient-input">
						<view style="width: 25%;">住院号</view>
						<view style="width: 75%;">
							<uni-easyinput type="number" v-model="patient.admissionNumber" placeholder="请输入住院号">
							</uni-easyinput>
							<!-- <input type="number" placeholder="请输入住院号" v-model="patient.admissionNumber"></input> -->
						</view>
					</view>
					<div class="confirm-btn">
						<button type="primary" @click="confirmBinding"
							:style="{background:patient.name && patient.admissionNumber ? '#008cfe' : '#b0d0f9',}">确认绑定</button>
						<!-- <button @click="confirmBinding" :style="{
			  background:
			    patient.name && patient.admissionNumber ? '#008cfe' : '#b0d0f9',
			}">
							确认绑定
						</button> -->
					</div>
				</div>
			</div>

		</view>
	</view>
</template>

<script>
	// 引入scss组件
	import './hospitalizationPayment.scss'
	export default {

		components: {

		},
		// 计算属性
		computed: {

		},
		data() {
			return {
				selectMoney: "",
				moneyNum: undefined,
				paymentMoney: 0,
				showAddPatient: false,
				patient: {
					name: '',
					admissionNumber: undefined
				},
				patientInfo: {},
			}
		},
		methods: {
			moneyChange() {
				if (this.moneyNum) {
					this.selectMoney = null
				}
			},
			clickMoney(num) {
				this.selectMoney = num
				this.moneyNum = null
			},
			onRechargeBtn() {
				if (!this.patientInfo.inpatientNo) {
					uni.showToast({
						title: '请绑定住院人',
						icon: 'none',
						duration: 2000
					});
					// this.$message.error('请绑定住院人')
					return
				}
				if (!this.moneyNum && !this.selectMoney) {
					uni.showToast({
						title: '请选择或输入充值金额',
						icon: 'none',
						duration: 2000
					});
					// this.$message.error('请选择或输入充值金额')
					return
				}
				if (this.moneyNum && (this.moneyNum < 1000 || this.moneyNum % 100 !== 0)) {
					uni.showToast({
						title: '请输入大于一千元的整百金额',
						icon: 'none',
						duration: 2000
					});
					// this.$message.error('请输入大于一千元的整百金额')
					return;
				}
				
				const params = {
				        deptId: this.patientInfo.deptCode,
				        deptName: this.patientInfo.deptName,
				        doctorName: this.patientInfo.chargeDocName,
				        patientName: this.patientInfo.name,
				        patientNo: this.patientInfo.patientNo,
				        patientSeq: this.patientInfo.inpatientNo,
				        payMount: this.moneyNum || this.selectMoney,
				        totCost:this.patientInfo.totCost,
						pay_type:'AL'
				      }
					  
				this.$myRequest({
					url: "/wechat/pay/hosp",
					data: params
				}).then(data => {
					if(data.code==0){
						my.tradePay({
						  // 调用统一收单交易创建接口（alipay.trade.create），获得返回字段支付宝交易号trade_no
						  tradeNO: data.data.tradeNO,
						  success: (res) => {
							  if (res.resultCode == '9000') {
							  	// this.$refs.popo.close();
							  	uni.navigateTo({
							  		url: '/pages/paymentPage/paymentPage?orderNo=' + data
							  			.data.orderNo
							  	});
							  } else {
							  	uni.showToast({
							  		title: '支付失败',
							  		icon: 'none',
							  		duration: 2000
							  	});
							  }
						  },
						  fail: (res) => {
						    my.alert({
						      content: '已取消支付',
						    });
						  }
						});
					}
				}).catch(err => {
					this.loading = false;
				})
			},
			openAddPatient() {
				this.showAddPatient = true;
				this.patient={
					name: '',
					admissionNumber: ''
				};
			},
		confirmBinding() {
				if (!this.patient.name || !this.patient.admissionNumber) {
					return;
				}
				this.loading = true;
				const params = {
					hosptName: this.patient.name,
					hosptId: this.patient.admissionNumber,
					code: "100011",
				};
				this.$myRequest({
					url: "/hospt/checkHosptInfo",
					data: params,
				}).then(data => {
					if (data.code !== 200) {
						uni.showToast({
							title: data.msg,
							icon: 'none',
							duration: 2000
						});
						// this.$message.warning(data.msg);
					} else {
						this.showAddPatient = false;
						this.getHosptList();
					}
					this.loading = false;
				}).catch(err => {
					this.loading = false;
				})
				
			},
			// 获取住院信息
			getHosptList() {
				const params = {
					code: "100011",
					hosptId: this.patient.admissionNumber,
				};
				this.$myRequest({
					url: "/hospt/getHosptList",
					data: params,
				}).then(data => {
					this.patientInfo = data && data.data ? data.data[0] : {};
					this.loading = false;
				}).catch(err => {
					this.loading = false;
				})
		
			},
		
		},
		mounted() {

		},
	};
</script>

<style scoped>
	.record-wrapper>>>.uni-card {
		padding: 0 !important;

	}

	.zhuti>>>.uni-card {
		padding: 0 !important;
	}
</style>
