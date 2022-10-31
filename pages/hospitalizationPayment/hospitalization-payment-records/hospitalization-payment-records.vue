<template>
	<view>
		<!-- loading加载动画，type默认值是原子，love爱心，mask属性是遮罩 -->
		<zero-loading v-if="loading" type="pulse" mask></zero-loading>
		<!-- 使用组件的时候首字母要大写！！！！ -->
		<!-- <view class="header" style="width: 100%;height: 150rpx;">
			<Header :title="title" :shouye="shouye"></Header>
		</view> -->
		<view class="zhuti">
			<div class="record-wrapper">
				<uni-card>
					<div class="patient-wrapper bg-white" v-if="showBox">

						<div v-if="!patientInfo.name">
							<div class="patient-wrapper-button" @click="openAddPatient">
								使用，请添写住院人
							</div>
						</div>
					</div>
					<view v-else>
						<view class="patient-info-row" style="display: flex;padding:10px 0">
							<view style="width: 80%;font-size: .22rem">
								住院人：{{ patient.name }}</view>
							<view style="width: 20%;text-align: right;" class="text-right">
								<img style="width: .35rem;height: .35rem;"
									src="../../../static/replacement.png" @click="openAddPatient" />
							</view>
						</view>
						<view class="patient-info-row" style="display: flex;padding:10px 0">
							<view style="width: 80%;font-size: .22rem">
								住院号：{{ patient.admissionNumber }}</view>
						</view>
					</view>
				</uni-card>
				<uni-card v-for="(item,index) in hospInfoList" :key="index">
					<div v-if="showHospInfo" class="bg-white record-item" style="padding: 0;"
						>
						<div class="record-item-item">
							<div>住院人</div>
							<div>{{ item.name }}[{{ item.inpatientNo }}]</div>
						</div>
						<div class="record-item-item">
							<div>科室</div>
							<div>{{ item.deptName }}</div>
						</div>
						<div class="record-item-item">
							<div>入院时间</div>
							<div>{{ item.inDate }}</div>
						</div>
						<div class="record-item-item">
							<div>押金总额</div>
							<div>{{ item.prepayCost }}</div>
						</div>
						<div class="record-item-item">
							<div>费用总额</div>
							<div>{{ item.totCost }}</div>
						</div>
						<div class="record-item-item">
							<div>欠费</div>
							<div>
								{{ item.freeCost >= 0 || item.inState == "O" ? item.freeCost : 0 }}
							</div>
						</div>
						<div class="record-item-item record-detail-item" @click="goToDetail(item)">
							<div>点击查看详情</div>
							<div><text class="iconfont icon-youjiantou"></text></div>
						</div>
					</div>
				</uni-card>
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
						<button @click="confirmBinding" :style="{background: patient.name && patient.admissionNumber ? '#008cfe' : '#b0d0f9'}">
							确认绑定
						</button>
					</div>
				</div>
			</div>
		</view>
	</view>
</template>

<script>
	// 引入导航栏组件
	// import header from '@/components/header/header.vue'
	// 引入scss文件
	import "./hospitalization-payment-records.scss";
	// 引入vuex辅助函数
	export default {
		// 调用头部组件
		components: {
			// header
		},
		data() {
			return {
				title: "缴费记录", // 页面标题
				shouye: "no", // 是否是首页，不是首页显示返回上一层箭头
				
				loading: false,

				patientInfo: {},
				patient: {
					name: "",
					admissionNumber: undefined
				},
				hospInfoList: [],
				showAddPatient: false,
				showBox: true,
				showHospInfo: false,
			}
		},
		methods: {
			goToDetail(item) {
				this.loading = true;
				let hosptFeeList = [];
				const params = {
					inpatientNo: this.hospInfoList[0].inpatientNo,
					inDate: this.hospInfoList[0].inDate,
				};
				this.$myRequest({
					url: "/hospt/getHosptFeeList",
					data: params,
				}).then(data => {
					hosptFeeList = data.data;
					uni.navigateTo({
						url: '/pages/hospitalizationPayment/inpatient-payment-details/inpatient-payment-details?hosptFeeList=' +
							JSON.stringify(hosptFeeList).replace(/%/g, '%25') +
							"&hosptInfo=" +
							JSON.stringify(item).replace(/%/g, '%25')
					});

					this.loading = false;
				}).catch(err => {
					this.loading = false;
				})

			},
			openAddPatient() {
				this.showAddPatient = true;
				this.patient={
					name: '',
					admissionNumber: ''
				}
			},
			confirmBinding() {
				if (!this.patient.name || !this.patient.admissionNumber) {
					return;
				}
				this.hospInfoList = [];
				
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
					this.hospInfoList = data.data;
					this.showBox =
						this.hospInfoList != "" &&
						this.hospInfoList != undefined &&
						this.hospInfoList != "" ?
						false :
						true;
					this.showHospInfo = true;
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
	/* .header {
		position: fixed;
		top: 0;
		z-index: 999;
	} */
	/* 
	.zhuti {
		margin-top: 190rpx;
	} */

	.record-wrapper>>>.uni-card {
		padding: 0 !important;

	}
</style>
