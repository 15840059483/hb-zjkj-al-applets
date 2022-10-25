<template>
	<view>
		<!-- loading加载动画，type默认值是原子，love爱心，mask属性是遮罩 -->
		<zero-loading v-if="loading" type="pulse" mask></zero-loading>
		<!-- 使用组件的时候首字母要大写！！！！ -->
		<!-- <view class="header" style="width: 100%;height: 150rpx;">
			<Header :title="title" :shouye="shouye"></Header>
		</view> -->
		<view class="zhuti">
			<uni-card>
				<div class="bg-white card-container">
					<view class="card-row" style="display: flex;padding: 10px 0;">
						<view style="width: 50%;text-align: left;" class="patient-name">
							<span>{{ patient.name | processingName }}</span>
						</view>
						<view style="width: 50%;text-align: right;" class="change-patient-name">
							<!-- <button class="change-patient-name-btn" @click="openAddPatient">点击填写档案信息</button> -->
							<button class="change-patient-name-btn" style="border-radius: 20px 20px;"
								@click="openAddPatient">点击填写档案信息</button>
						</view>
					</view>
					<view class="card-row">
						<view class="visit-number" v-if="patient.admissionNumber">
							病例号/手机号/身份证号：{{ patient.admissionNumber | processingcardNumber }}</view>
						<view class="visit-number" v-else>病例号/手机号/身份证号：</view>
					</view>
				</div>
			</uni-card>
			<div class="payment3-center">
				<div class="payment3-option" v-for="item1 in list"
					@click="goToInspectionReport(item1.resultList,item1.sampleList)">
					<template v-for="item2 in item1.sampleList" >
						<div class="payment3-option-font" style="width: 80%;">
							<div>{{item2.hisItemNameList}}</div>
							<div>{{item2.sampletime}}</div>
						</div>
						<div class="query2-right" v-if="item2.reportState=='1'" style="width: 20%;">
							<div style="color: rgb(0,142,254)">已发布</div>
							<text class="iconfont icon-youjiantou"></text>
						</div>
						<div class="query2-right" v-if="item2.reportState=='0'" style="width: 20%;">
							<div style="color: rgb(0,142,254)">未发布</div>
							<text class="iconfont icon-youjiantou"></text>
						</div>
						<div class="query2-right" v-if="!item2.reportState" style="width: 20%;">
							<div style="color: rgb(0,142,254)">已发布</div>
							<text class="iconfont icon-youjiantou"></text>
						</div>
					</template>

				</div>
			</div>
			<!-- <div class="payment3-center">
				<div class="payment3-option" v-for="item1 in list"
					@click="goToInspectionReport(item1,item1)">
						<div class="payment3-option-font" style="width: 80%;">
							<div>{{item1.hisitemName}}</div>
							<div>{{item2.sampleTime}}</div>
						</div>
						<div class="query2-right" style="width: 20%;">
							<div style="color: rgb(0,142,254)">已发布</div>
							<text class="iconfont icon-youjiantou"></text>
						</div>
				</div>
			</div> -->
			<div class="no-list" v-if="list.length === 0">
				<div>
					<img src="https://s1.ax1x.com/2022/09/28/xe6wLV.png">
				</div>
				<p>暂未获取到您的检查项目</p>
			</div>
			<div v-if="showSwitchPatient" class="switch-patient-bg">
				<div class="switch-patient-container bg-white">
					<div class="switch-patient-title text-center border-bottom">
						切换就诊人
						<i class="el-icon-error" @click="showSwitchPatient = false"></i>
					</div>
					<div class="border-bottom switch-patient-list" v-for="item in switchPatientList"
						v-bind:key="item.patientId" @click="onSwitchPatientBtn(item)">
						<div class="patient-name">*{{ item.patientName }}</div>
						<div class="visit-number">就诊号：{{ item.cardNumber }}</div>
						<i class="el-icon-check" v-if="currentPatient.patientId === item.patientId"
							style="color: #008cfe"></i>
					</div>
					<view>
						<view :span="12" class="switch-patient-btn switch-patient-btn-l" @click.native="addPatient">
							添加就诊人</view>
						<view :span="12" class="switch-patient-btn" @click.native="managePatient">管理就诊人</view>
					</view>
				</div>
			</div>

			<div v-if="showAddPatient" class="add-patient-bg">
				<div class="add-patient-container bg-white">
					<view class="add-patient-title" style="display: flex;">
						<view style="width: 80%;">个人信息</view>
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
						<view style="width: 25%;">号码</view>
						<view style="width: 75%;">
							<uni-easyinput type="number" v-model="patient.admissionNumber" placeholder="病例号/手机号/身份证号">
							</uni-easyinput>
							<!-- <input type="number" placeholder="请输入住院号" v-model="patient.admissionNumber"></input> -->
						</view>
					</view>
					<div class="confirm-btn">
						<button type="primary" @click="getZjkjList"
							:style="{background:patient.name && patient.admissionNumber ? '#008cfe' : '#b0d0f9',}">确认</button>
						<!-- <button @click="confirmBinding" :style="{
			  background:
			    patient.name && patient.admissionNumber ? '#008cfe' : '#b0d0f9',
			}">
							确认绑定
						</button> -->
					</div>
				</div>
			</div>


			<!-- <div v-if="showAddPatient" class="add-patient-bg">
				<div class="add-patient-container bg-white">
					<view class="add-patient-title">
						<view :span="12">个人信息</view>
						<view :span="12" class="text-right">
							<i class="el-icon-close" @click="showAddPatient = false"></i>
						</view>
					</view>
					<view class="add-patient-input">
						<view :span="7">姓名</view>
						<view :span="17">
							<el-input placeholder="请输入姓名" v-model="patient.name"></el-input>
						</view>
					</view>
					<view class="add-patient-input">
						<view :span="7">号码</view>
						<view :span="17">
							<el-input type="number" placeholder="病例号/手机号/身份证号" v-model="patient.admissionNumber">
							</el-input>
						</view>
					</view>
					<div class="confirm-btn">
						<button @click="getZjkjList"
							:style="{background: (patient.name && patient.admissionNumber) ? '#008cfe' : '#b0d0f9'}">确认
						</button>
					</div>
				</div>
			</div> -->
		</view>
		<energy-success v-if="showToast" :message="toastMessage" :energy-num="energyNum"></energy-success>
	</view>
	
</template>

<script>
	import monitor from '../../../utils/alipayLogger.js';
	import { reportCmPV } from '../../../utils/cloudMonitorHelper';
	import './report-query2.css'
	import './outpatientPayment.scss'
	import './hospitalizationPayment.scss'
	export default {
		// 调用头部组件
		components: {

		},
		computed: {

		},
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
		},
		data() {
			return {
				toastMessage:'',
				showToast:false,
				energyNum:0,
				title: "提交审核", // 页面标题
				shouye: "no", // 是否是首页，不是首页显示返回上一层箭头
				loading: false,

				reportList: [{
					name: '血常规',
					date: '2019-07-23 09:09:09'
				}],
				currentPatient: {},
				showSwitchPatient: false,
				list: [],
				showAddPatient: false,
				patient: {
					name: '',
					admissionNumber: undefined
				},
			}
		},
		onLoad(e){
			// this.toastMessage = '本次挂号得到能量为'
			// this.energyNum = Number(1)
			// this.showToast = true
			
			// setTimeout(() => {
			// 	this.showToast = false
			// }, 3000000)
			reportCmPV({ title: '报告查询', e });
			monitor._lgPV({page: '报告查询', url:'pages/report-query/report-query2/report-query2'})

		},
		methods: {
			// 加载框
			jiazai() {
				this.loading = true;
				// 定时器，setTimeout只执行一次，setInterval执行多次
				setTimeout(() => {
					this.loading = false;
					console.log(this.loading);
				}, 500)
			},

			openAddPatient() {
				this.showAddPatient = true;
				this.patient = {
					// name: '',
					// admissionNumber: undefined
					name: '卫恒政',
					admissionNumber: '0800039862'
				};
			},
			// 添加就诊人
			addPatient() {},
			// 管理就诊人
			managePatient() {},
			goToInspectionReport(list1, list2) {
				uni.navigateTo({
					url: '/pages/report-query/report-query3/report-query3?sampleList=' + encodeURIComponent(JSON
						.stringify(list1).replace(/%/g, '%25')) + '&resultList=' + encodeURIComponent(JSON.stringify(list2).replace(/%/g, '%25'))
				});

				// this.$router.push({
				// 	name: 'reportQuery3',
				// 	query: {
				// 		sampleList: encodeURIComponent(JSON.stringify(list2)),
				// 		resultList: encodeURIComponent(JSON.stringify(list1))
				// 	}
				// })
			},
			switchPatient() {
				this.showSwitchPatient = true;
			},
			// 获取就诊人信息
			getPatientInfo() {
				
				let _this = this;
				let data = [{
						patientName: "冷夜",
						patientId: 1,
						cardNumber: "124151231"
					},
					{
						patientName: "小狐狸",
						patientId: 2,
						cardNumber: "124124121"
					},
					{
						patientName: "张力",
						patientId: 3,
						cardNumber: "124146554"
					},
				];
				_this.switchPatientList = data;
				// 让currentPatient等于数组data中索引位置为0的信息
				_this.currentPatient = data[0];
			},
			getZjkjList(item) {
				let parans = {
					name: this.patient.name,
					patientId: this.patient.admissionNumber
				}
				this.jiazai();
				this.$myRequest({
					url: "/zjkj/list",
					method: "POST",
					data: parans,
				}).then(res => {
					monitor.api({api:"报告查询",success:true,c1:"taSR_YL",time:200})
					console.log(res.data)
					this.jiazai();
					if (res && res.data && res.data.length > 0&&res.data[0].resultList) {
						this.list = res.data;
						my.getAuthCode({
						  scopes: 'mfrstre',
						  success: item => {
							  if(item.authCode){
								  let datas = {
								  	code: item.authCode,
								  	scene: 'hoinquire'
								    }
								    
								  this.$myRequest({
								  	url: "/al/auth/al/sendCity",
								  	method: "GET",
								  	data: datas,
								  }).then(data => {
								  	this.toastMessage = '本次查询报告得到能量为'
								  	this.energyNum = Number(data.data.totalEnergy)
								  	this.showToast = true
								  	
								  	setTimeout(() => {
								  		this.showToast = false
								  	}, 3000)
									
								  });
							  }
						    
						  },
						});
						
						console.log(this.list)
					}
					this.showAddPatient = false;
				}).catch(err => {
					this.loading = true;
				})
				

				

				// this.$api.outpatientDepartmentService.getZjkjList(parans)
				// 	.then((data) => {
				// 		if (data && data.data && data.data && data.data.length > 0) {
				// 			this.list = data.data
				// 			this.showAddPatient = false;
				// 			console.log(this.list)
				// 		}
				// 		// loadingInstance.close();
				// 	}).catch(() => {
				// 		// loadingInstance.close();
				// 	})
			}
		},
	};
</script>

<style scoped>
	.zhuti>>>.uni-card {
		padding: 0 !important;
	}

	.change-patient-name-btn {
		width: 80%;
		height: 0.6rem;
		line-height: 0.6rem;
		font-size: 0.22rem;
		border-radius: 0.4rem;
		background: no-repeat;
		border: 1px solid rgb(0, 142, 254);
		padding: 0 0.4rem;
		color: rgb(0, 142, 254);
		outline: none;
		margin: 0 auto;
	}
</style>
