<template>
	<view>
		<!-- loading加载动画，type默认值是原子，love爱心，mask属性是遮罩 -->
		<zero-loading v-if="loading" type="pulse" mask></zero-loading>
		<view class="zhuti">
			<uni-card class="xianzhi">
				<!-- 就诊人信息，如果huanzhexinxi中的患者姓名为空渲染这个div -->
				<div class="bg-white card-container" v-if="huanzhexinxi.name == null">
					<div style="display: flex; width: 100%;">
						<div class="shangceng">

							<span>{{ processingName(currentPatient.patientName) }}</span>

						</div>
						<view :span="12" class="change-patient-name" v-if="token&&currentPatient.cardNumber != null">
							<button class="change-patient-name-btn"
								style="transform: scale(1.0);line-height: .5rem;border-radius: 20px 20px;"
								@click="switchPatient">切换就诊人</button>
						</view>

						<view :span="12" class="change-patient-name" v-if="token&&currentPatient.cardNumber == null">
							<button class="change-patient-name-btn"
								style="transform: scale(1.0);line-height: .5rem;border-radius: 20px 20px;"
								@click="getPatientInfo()">点击注册</button>
						</view>
						<view :span="12" class="change-patient-name" v-if="!token&&currentPatient.cardNumber == null">
							<button class="change-patient-name-btn"
								style="transform: scale(1.0);line-height: .5rem;border-radius: 20px 20px;"
								@click="addUser()">点击授权</button>
						</view>
					</div>

					<div style="width: 100%;">
						<div class="xiaceng">
							<text>就诊号</text>
							<text style="margin-left:5px;">：</text>
							<text style="margin-left:5px;">{{ processingcardNumber(currentPatient.cardNumber) }}</text>
						</div>
					</div>
				</div>
				<!-- 就诊人信息，如果huanzhexinxi中的患者姓名不为空渲染这个div -->
				<div class="bg-white card-container" v-else>
					<div style="display: flex; width: 100%;">
						<div class="shangceng">
							<div class="xingming">
								<span>{{processingName( huanzhexinxi.patientName)}}</span>
							</div>
						</div>
						<view :span="12" class="change-patient-name">
							<button class="change-patient-name-btn" @click="switchPatient">切换就诊人</button>
						</view>
					</div>
					<div style="width: 100%;">
						<div class="xiaceng">
							<text>就诊号</text>
							<text style="margin-left:5px;">：</text>
							<text style="margin-left:5px;">{{ processingcardNumber(huanzhexinxi.cardNumber) }}</text>
						</div>
					</div>
				</div>
			</uni-card>
			<!-- 切换就诊人的弹出框 -->
			<div v-if="showSwitchPatient" class="switch-patient-bg">
				<!-- 如果如果huanzhexinxi中的患者姓名为空渲染这个div -->
				<div class="switch-patient-container bg-white" v-if="huanzhexinxi.name == null">
					<div class="switch-patient-title text-center border-bottom">
						切换就诊人
						<!-- <i class="el-icon-error" @click="showSwitchPatient = false"></i> -->
						<text class="iconfont icon-guanbi" @click="showSwitchPatient = false"></text>
					</div>
					<div class="border-bottom switch-patient-list" v-for="item in switchPatientList"
						v-bind:key="item.cardNumber" @click="onSwitchPatientBtn(item)">
						<div class="patient-name">{{processingName(item.patientName) }}</div>
						<div class="visit-number" style="font-size: 14px;color: rgb(146, 146, 146);">
							就诊号：{{ processingcardNumber(item.cardNumber )}}</div>
						<text class="iconfont icon-duihao" v-if="currentPatient.cardNumber === item.cardNumber"
							style="color: #008cfe"></text>
					</div>

					<view style="display: flex;padding: 10px 0;">
						<view style="width: 50%;" class="switch-patient-btn switch-patient-btn-l"
							@click.native="addPatient">
							添加就诊人</view>
						<view style="width: 50%;" class="switch-patient-btn" @click.native="managePatient">管理就诊人</view>
					</view>
				</div>

				<!-- 如果如果huanzhexinxi中的患者姓名不为空渲染这个div -->
				<div class="switch-patient-container bg-white" v-else>
					<div class="switch-patient-title text-center border-bottom">
						切换就诊人
						<!-- <i class="el-icon-error" @click="showSwitchPatient = false"></i> -->
						<text class="iconfont icon-guanbi" @click="showSwitchPatient = false"></text>
					</div>
					<div class="border-bottom switch-patient-list" v-for="item in switchPatientList"
						v-bind:key="item.cardNumber" @click="onSwitchPatientBtn(item)">
						<div class="patient-name">{{processingName(item.patientName) }}</div>
						<div class="visit-number" style="font-size: 14px;color: rgb(146, 146, 146);">
							就诊号：{{ processingcardNumber(item.cardNumber) }}</div>
						<!-- <i class="el-icon-check" v-if="huanzhexinxi.shenfenID === item.shenfenID" style="color: #008cfe"></i> -->
						<text class="iconfont icon-duihao" v-if="huanzhexinxi.cardNumber === item.cardNumber"
							style="color: #008cfe"></text>
					</div>

					<view style="display: flex;padding: 10px 0;">
						<view style="width: 50%;" class="switch-patient-btn switch-patient-btn-l"
							@click.native="addPatient">
							添加就诊人</view>
						<view style="width: 50%;" class="switch-patient-btn" @click.native="managePatient">管理就诊人</view>
					</view>
				</div>
			</div>

			<div class="no-list" v-if="paymentList.length === 0">
				<div>
					<img src="https://s1.ax1x.com/2022/09/28/xe6wLV.png" />
				</div>
				<p>暂未获取到您的代缴费信息</p>
			</div>


			<view class="neiwaibianju" v-if="paymentList.length > 0">
				<uni-card>
					<div v-if="paymentList.length > 0">
						<div class="bg-white payment-container" v-for="item in paymentList" v-bind:key="item.count">

							<view v-if="radio_value==='1'">
								<view class="payment-row" style="display: flex;padding: 10px 0;">
									<view style="width:75% ;" @click.native="openList(item)">
										挂号科室：{{ item.regInfos.deptName }}({{ item.regInfos.regNo }})
									</view>
									<view style="width: 20%;text-align: right;" @click.native="openList(item)"
										class="text-right">
										{{ handRegDate(item.regInfos.regDate) }}
									</view>
									<view style="width: 5%;" @click.native="openList(item)" class="text-center">
										<text class="iconfont icon-xiajiantou" v-if="item.isOpen"
											style="color: #b7b7b7"></text>
										<text class="iconfont icon-youjiantou" v-if="!item.isOpen"
											style="color: #b7b7b7"></text>
									</view>
								</view>

								<div>
									<div class="prescription-container" v-show="item.isOpen"
										v-for="(outFee, index) in item.outFeeList" v-bind:key="index"
										style="padding: 10px 0;border-top: 1px solid #b8b8b8;"
										@click="selectOutFee(item, outFee)">
										<view class="prescription-row" style="display: flex;"
											@click="selectOutFee(item, outFee)">
											<view style="width: 10%;text-align: center;">
												<text class="iconfont icon-circle-check" style="color: #b7b7b7"
													v-if="selectPaymentMoOrderList.indexOf(outFee.recipeNo) === -1"
													@click="selectOutFee(item, outFee)"></text>
												<text class="iconfont icon-circle-check" style="color: #008cfe"
													v-if="selectPaymentMoOrderList.indexOf(outFee.recipeNo) > -1"
													@click="selectOutFee(item, outFee)"></text>
											</view>
											<view style="color: #979797;width: 70%;">批次号：{{ outFee.recipeNo }}</view>
											<view class="text-right"
												style="color: #008cfe;width: 20%;text-align: right;">
												<!--                  <span v-if="outFee.isPayment">已支付</span>-->
												<!--                  <span v-if="!outFee.isPayment">未支付</span>-->
												<span>未支付</span>
											</view>
										</view>
										<view class="prescription-row" v-for="(prescriptionItem, ind) in outFee.feeList"
											:key="ind" style="display: flex;padding: 5px 0;">
											<view style="width: 5%;">&nbsp;</view>
											<view style="width: 70%;">{{ prescriptionItem.itemName }}</view>
											<view class="text-right"
												style="color: #b8b8b8;width: 25%;text-align: right;">
												{{ prescriptionItem.itemPrice }}*{{ prescriptionItem.itemNum }}
											</view>
										</view>
									</div>
								</div>
							</view>

							<view v-else>
								<view class="payment-row" style="display: flex;padding: 10px 0;">
									<view style="width: 10%;text-align: left;">
										<text class="iconfont icon-circle-check" style="color: #b7b7b7"
											v-if="!isChecked(item)" @click="paymentCheck(item)"></text>
										<text class="iconfont icon-circle-check" style="color: #008cfe"
											v-if="isChecked(item)" @click="paymentCheck(item)"></text>
									</view>
									<view style="width:65% ;" @click.native="openList(item)">
										挂号科室：{{ item.regInfos.deptName }}({{ item.regInfos.regNo }})
									</view>
									<view style="width: 20%;text-align: right;" @click.native="openList(item)"
										class="text-right">
										{{ handRegDate(item.regInfos.regDate) }}
									</view>
									<view style="width: 5%;" @click.native="openList(item)" class="text-center">
										<text class="iconfont icon-xiajiantou" v-if="item.isOpen"
											style="color: #b7b7b7"></text>
										<text class="iconfont icon-youjiantou" v-if="!item.isOpen"
											style="color: #b7b7b7"></text>
									</view>
								</view>

								<div>
									<div class="prescription-container" v-show="item.isOpen"
										v-for="(outFee, index) in item.outFeeList" v-bind:key="index"
										style="padding: 10px 0;border-top: 1px solid #b8b8b8;"
										@click="AllselectOutFee(item, outFee)">
										<view class="prescription-row" style="display: flex;"
											@click="AllselectOutFee(item, outFee)">
											<view style="width: 10%;text-align: center;">
												<text class="iconfont icon-circle-check" style="color: #b7b7b7"
													v-if="selectPaymentMoOrderList.indexOf(outFee.recipeNo) === -1"
													@click="AllselectOutFee(item, outFee)"></text>
												<text class="iconfont icon-circle-check" style="color: #008cfe"
													v-if="selectPaymentMoOrderList.indexOf(outFee.recipeNo) > -1"
													@click="AllselectOutFee(item, outFee)"></text>
											</view>
											<view style="color: #979797;width: 70%;">批次号：{{ outFee.recipeNo }}</view>
											<view class="text-right"
												style="color: #008cfe;width: 20%;text-align: right;">

												<span>未支付</span>
											</view>
										</view>
										<view class="prescription-row" v-for="(prescriptionItem, ind) in outFee.feeList"
											:key="ind" style="display: flex;padding: 5px 0;">
											<view style="width: 5%;">&nbsp;</view>
											<view style="width: 70%;">{{ prescriptionItem.itemName }}</view>
											<view class="text-right"
												style="color: #b8b8b8;width: 25%;text-align: right;">
												{{ prescriptionItem.itemPrice }}*{{ prescriptionItem.itemNum }}
											</view>
										</view>
									</div>
								</div>
							</view>

							<!-- 支付方式 -->
							<view class="payment-bot bg-white" style="border-top: 1px solid #b8b8b8;">
								<view style="display: flex; padding-top: .3rem;"
									@click.native="paymentMethod===true?paymentMethod=false:paymentMethod=true">
									<view style="padding-left: .3rem;">
										选择支付方式
									</view>
									<view style="width: 5%;text-align: right;" class="text-center">
										<text class="iconfont icon-xiajiantou" v-if="paymentMethod"
											style="color: #b7b7b7"></text>
										<text class="iconfont icon-youjiantou" v-if="!paymentMethod"
											style="color: #b7b7b7"></text>
									</view>
								</view>
								<view v-show="paymentMethod" style="padding: .2rem 0;width: 100%;">
									<radio-group @change="radioChange">
										<label class="radio" style="width: 50%;text-align: center;">
											<radio value="1" checked="true" />医保支付
										</label>
										<label class="radio" style="width: 50%;text-align: center;">
											<radio value="2" />支付宝支付
										</label>
									</radio-group>
								</view>
							</view>


							<div class="payment-bot bg-white">
								<view style="display: flex;">
									<!--            <view :span="7" class="text-center pay-sel-all">-->
									<!--              <el-checkbox v-model="isSelectAll" @change="onSelectAllBtn" class="pay-check"></el-checkbox>-->
									<!--              全选-->
									<!--            </view>-->
									<view style="padding:5px;width: 70%">
										总额：<span style="color: #ec6c25">￥{{ item.totalMoney }}</span>
									</view>
									<view style="width: 30%;" class="text-center" @click.native="goToPayment(item)">
										<button
											style="width: 100%;border-radius: 20px 20px;height: .7rem;line-height: .7rem;"
											class="mini-btn" type="primary">去缴费</button>
									</view>
								</view>
							</div>
						</div>
					</div>
				</uni-card>
			</view>
		</view>
	</view>
</template>

<script>
	// 引入导航栏组件
	// import header from '@/components/header/header.vue'
	// 引入scss组件
	import monitor from '../../utils/alipayLogger.js';
	import {
		reportCmPV
	} from '../../utils/cloudMonitorHelper';
	import "./outpatientPayment.scss";
	export default {
		// 调用头部组件
		components: {
			// header
		},
		// 计算属性
		computed: {
			processingName() {
				return function(str) {
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
				}
			},
			processingcardNumber() {
				return function(str) {
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
			zongjiner(xiangmujiner, xiangmucishu) {
				let chufangsum = xiangmujiner * xiangmucishu + chufangsum;
				return chufangsum;
			},
		},
		data() {
			return {
				title: "缴费列表", // 页面标题
				shouye: "no", // 是否是首页，不是首页显示返回上一层箭头
				token: '',
				//就诊人中的所有值
				showSwitchPatient: false, //切换就诊人的弹窗值，如果此值为true弹窗会打开
				huanzhexinxi: {}, //存放患者信息的值
				paymentList: [],
				switchPatientList: [],
				currentPatient: {},
				selectPaymentList: [],
				selectPaymentMoOrderList: [],
				isSelectAll: false,
				totalMoney: 0,
				loading: true,
				radio_value: "1",
				// 支付方式的选择
				data: {},
				paymentMethod: true,
			}
		},
		onLoad(e) {
			reportCmPV({
				title: '门诊缴费',
				e
			});
			monitor._lgPV({
				page: '门诊缴费',
				url: 'pages/outpatientPayment/outpatientPayment'
			})
			monitor.api({
				api: "门诊缴费",
				success: true,
				c1: "taSR_YL",
				time: 200
			})
		},
		methods: {
			addUser() {
				uni.navigateTo({
					url: '/pages/empower/empower'
				})
			},
			// 就诊人中的全部方法
			//触发切换就诊人的弹窗
			switchPatient() {
				this.showSwitchPatient = true;
			},
			//就诊人信息的数据
			getPatientInfo() {
				const _this = this
				this.$myRequest({
					url: "/wechat/user/patientcard/info",
				}).then(data => {
					if (data.data.length > 0 && data.data[0].cardNumber) {
						this.switchPatientList = data.data;
						this.currentPatient = data.data[0];

						_this.getOutPayList();
					}
					console.log(data.data.length > 0 && !data.data[0].cardNumber, "判断用户信息")
					if (data.data.length > 0 && !data.data[0].cardNumber) {
						uni.showModal({
							title: "提示",
							content: "是否添加就诊卡号?",
							success: function(res) {
								if (res.confirm) {
									_this.addCard(data)
								} else {
									uni.showToast({
										title: '已取消添加就诊卡号！',
										icon: 'none',
										duration: 2000
									});
								}
							}
						});
					}
					if (!data.data.length > 0) {
						this.loading = false;
						uni.showModal({
							title: "提示",
							content: "是否添加就诊人?",
							success: function(res) {
								if (res.confirm) {
									uni.navigateTo({
										url: '/pages/patient-management/add-patient/add-patient'
									})
								} else {
									uni.showToast({
										title: '已取消添加就诊人！',
										icon: 'none',
										duration: 2000
									});
								}
							}
						});
					}
					this.loading = false;
				}).catch(err => {
					this.loading = false;
				})
			},
			addCard(data) {
				const params = Object.assign(data.data[0], {
					cardNo: ''
				})
				console.log("开始了呀")
				this.$myRequest({
					url: "/wechat/user/addPtCard/info",
					contentType: 'application/json;charset=UTF-8',
					data: params
				}).then(data => {
					console.log("完成")
					this.loading = false;
					this.getPatientInfo()
				}).catch(err => {
					this.loading = false;
				})
			},
			//切换就诊人，这个参数中包含就诊人信息
			// onSwitchPatientBtn(item) {
			// 	this.currentPatient = item;
			// 	// 让huanzhexinxi等于就诊人信息
			// 	this.huanzhexinxi = item;
			// },
			// 切换就诊人
			onSwitchPatientBtn(item) {
				this.currentPatient = item;
				this.isSelectAll = false;
				this.selectPaymentList = [];
				this.selectPaymentMoOrderList = [];
				this.paymentList = [];
				this.getOutPayList();
				this.radio_value = '1';
				this.showSwitchPatient = false;
			},
			// 添加就诊人
			addPatient() {
				uni.navigateTo({
					url: '/pages/patient-management/add-patient/add-patient'
				})
			},
			// 管理就诊人
			managePatient() {
				uni.navigateTo({
					url: '/pages/patient-management/patient-management'
				})
			},

			// 获取缴费信息列表
			getOutPayList() {
				this.loading = true;
				const params = {
					patientNo: this.currentPatient.cardNumber
				}
				this.$myRequest({
					url: "/hospt/getOutPayList",
					data: params,

				}).then(data => {
					if (data.data) {
						this.paymentList = data.data;
						this.paymentList.forEach(item => {
							item.isOpen = true;
							item.totalMoney = 0
						});
						// 默认全选第一个挂号订单
						// this.paymentCheck(this.paymentList[0])
					}
					this.loading = false;
				}).catch(err => {
					this.loading = false;
				})
			},
			openList(item) {
				this.$forceUpdate();
				this.$set(item, "isOpen", !item.isOpen);
			},
			isChecked(item) {
				let selectNum = 0;
				this.selectPaymentList.forEach(pay => {
					if (pay.regNo === item.regInfos.regNo) {
						selectNum++;
					}
				})
				return selectNum === item.outFeeList.length;
			},

			paymentCheck(item) {
				if (this.selectPaymentList.length && this.selectPaymentList[0].regNo != item.regInfos.regNo) {
					this.selectPaymentList = [];
					this.selectPaymentMoOrderList = [];
				}
				if (this.isChecked(item)) {
					for (let i = this.selectPaymentList.length - 1; i >= 0; i--) {
						if (this.selectPaymentList[i].regNo === item.regInfos.regNo) {
							this.selectPaymentList.splice(i, 1);
							this.selectPaymentMoOrderList.splice(i, 1);
						}
					}
				} else {
					item.outFeeList.forEach(outFee => {
						const recipe = this.selectPaymentList.map(list => list.recipeNo)
						if (recipe.indexOf(outFee.recipeNo) === -1) {
							outFee.regNo = item.regInfos.regNo;
							this.selectPaymentList.push(outFee);
							this.selectPaymentMoOrderList.push(outFee.recipeNo);
						}
					});
				}
				this.calculationTotalMoney(item);
				// this.judgeWhetherSelectAll();
			},
			// 选择处方
			selectOutFee(item, outFee) {
				console.log("选中", item)
				console.log("选中", outFee)
				const index = this.selectPaymentMoOrderList.indexOf(outFee.recipeNo);
				if (index > -1) {
					this.selectPaymentList.splice(index, 1);
					this.selectPaymentMoOrderList.splice(index, 1);
				} else {
					if (this.selectPaymentList.length === 0 && this.selectPaymentMoOrderList.length === 0) {
						outFee.regNo = item.regInfos.regNo;
						outFee.totalMoney = outFee.count
						outFee.regInfos = item.regInfos

						outFee.regInfos.patientName = this.currentPatient.patientName
						outFee.regInfos.cardNo = this.currentPatient.cardNumber

						this.selectPaymentList.push(outFee);
						this.selectPaymentMoOrderList.push(outFee.recipeNo);
					} else {
						this.selectPaymentList.splice(index, 1);
						this.selectPaymentMoOrderList.splice(index, 1);
						outFee.regNo = item.regInfos.regNo;
						outFee.totalMoney = outFee.count
						outFee.regInfos = item.regInfos

						outFee.regInfos.patientName = this.currentPatient.patientName
						outFee.regInfos.cardNo = this.currentPatient.cardNumber

						this.selectPaymentList.push(outFee);
						this.selectPaymentMoOrderList.push(outFee.recipeNo);
					}
				}
				console.log("项目", this.selectPaymentList)
				this.calculationTotalMoney(item);

			},

			// 选择处方
			AllselectOutFee(item, outFee) {
				const index = this.selectPaymentMoOrderList.indexOf(outFee.recipeNo);
				if (index > -1) {
					this.selectPaymentList.splice(index, 1);
					this.selectPaymentMoOrderList.splice(index, 1);
				} else {
					outFee.regNo = item.regInfos.regNo;
					this.selectPaymentList.push(outFee);
					this.selectPaymentMoOrderList.push(outFee.recipeNo);
				}
				this.calculationTotalMoney(item);
				// this.judgeWhetherSelectAll();
			},

			// 全选
			onSelectAllBtn() {
				this.selectPaymentList = [];
				this.selectPaymentMoOrderList = [];
				if (this.isSelectAll) {
					this.paymentList.forEach(item => {
						item.outFeeList.forEach(outFee => {
							outFee.regNo = item.regInfos.regNo;
							this.selectPaymentList.push(outFee);
							this.selectPaymentMoOrderList.push(outFee.recipeNo);
						});
					});
				}
				this.calculationTotalMoney();
			},
			// 是否全选
			judgeWhetherSelectAll() {
				let len = 0;
				this.paymentList.forEach(item => {
					len += item.outFeeList.length;
				})
				this.isSelectAll = this.selectPaymentMoOrderList.length === len;
			},
			// 计算金额
			calculationTotalMoney(item) {
				let money = 0;
				this.selectPaymentList.forEach(item => {
					item.feeList.forEach(outFee => {
						money += Number((outFee.itemPrice * outFee.itemNum).toFixed(2));
					})
				});
				item.totalMoney = Number(money).toFixed(2);
			},
			handRegDate(str) {
				// const date = str.substr(4, 2) + '月' + str.substr(6, 2) + '日';
				// return date;
				let newDate = new Date(str)
				return `${newDate.getMonth()+1}月${newDate.getDate()}日`;
			},
			goToPage(url) {
				if (!url) {
					return;
				}
				this.$router.push(url);
			},
			encodeSearchKey(key) {
				const encodeArr = [{
					code: '%',
					encode: '%25'
				}, {
					code: '?',
					encode: '%3F'
				}, {
					code: '#',
					encode: '%23'
				}, {
					code: '&',
					encode: '%26'
				}, {
					code: '=',
					encode: '%3D'
				}];
				return key.replace(/[%?#&=]/g, ($, index, str) => {
					for (const k of encodeArr) {
						if (k.code === $) {
							return k.encode;
						}
					}
				});
			},
			goToPayment(item) {
				if (this.selectPaymentMoOrderList.length === 0 || this.selectPaymentList[0].regNo !== item.regInfos
					.regNo) {
					uni.showToast({
						title: '请选择缴费项目',
						icon: 'none',
						duration: 2000
					});
					// this.$message.info('请选择缴费项目')
					return
				}
				console.log(this.selectPaymentList)
				if (this.radio_value == '1') {
					let url =
						'alipays://platformapi/startapp?appId=2021003193615800&page=pages/outpatientPayment/outpatientPayment&query=' +
						encodeURIComponent('data=' + JSON.stringify(this.selectPaymentList).replace(/%/g, '%25'))
					let url_1 = '';
					my.getAuthCode({
						scopes: ['nhsamp', 'mcquery'],
						success: item => {
							if (item.authCode) {
								const params = {
									authCode: item.authCode,
									//mobile: userInfo.mobile,
									url: url,
								}
								this.$myRequest({
									url: "/al/auth/authinfo",
									data: params,
								}).then(data => {
									console.log(data)
									url_1 = data.data.data.authUrl
									console.log(data.data.data.authUrl)
									if (data.data.data && !data.data.data.payAuthNo) {
										my.ap.openURL({
											url: encodeURI(url_1), // 请将 url 替换为有效的页面地址
											success: (res) => {
												console.log('openURL success', res)
											},
											fail: (err) => {
												console.log('openURL success', err)
											}
										});
									} else if (data.data.data && data.data.data.payAuthNo) {

										console.log("授权完毕")
										uni.navigateTo({
											url: `/pages/outpatientPayment/order/order?query=${encodeURIComponent(JSON.stringify(this.selectPaymentList).replace(/%/g, '%25'))}`
										});
									}
								}).catch(err => {
									console.log(err)
									// this.loading = false;
								})
							}

						},
					});

					return
				} else if (this.radio_value == '2') {
					// uni.navigateTo({
					// 	url: `/pages/outpatientPayment/order/order?query=${encodeURIComponent(JSON.stringify(this.selectPaymentList).replace(/%/g, '%25'))}`
					// });

					let itemInfo = [];
					this.selectPaymentList.forEach(item => {
						item.feeList.forEach(items => {
							itemInfo.push(items);
						})
					})
					const params = {
						deptId: item.regInfos.deptId,
						deptName: item.regInfos.deptName,
						doctorName: item.regInfos.doctorName,
						regLevelName: item.regInfos.regLevelName,
						doctorTitleId: item.regInfos.regLevelId,
						patientName: item.regInfos.patientName,
						patientNo: item.regInfos.cardNo,
						patientSeq: item.regInfos.regNo,
						payMount: item.totalMoney,
						recipeNos: this.selectPaymentMoOrderList,
						pay_type: 'Al',
						itemInfo: JSON.stringify(itemInfo),
					}

					

					//let data = JSON.stringify(params)
					console.log(params)
						this.$myRequest({
							url: "/wechat/pay/out",
							data: params
						}).then(data => {
							if (data.code == 0) {
								monitor.api({
									api: "门诊缴费",
									success: true,
									c1: "taSR_YL",
									time: 200
								})
								my.tradePay({
									// 调用统一收单交易创建接口（alipay.trade.create），获得返回字段支付宝交易号trade_no
									tradeNO: data.data.tradeNO,
									success: (res) => {
										// 关闭弹窗
										if (res.resultCode == '9000') {

											uni.navigateTo({
												url: '/pages/paymentPage/paymentPage?orderNo=' +
													data.data.orderNo
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
					// this.$router.push('/paymentPage?orderNo');

				}
			},

			// 支付方式的单选
			radioChange(e) {
				//console.log(e)
				this.selectPaymentList = [];
				this.selectPaymentMoOrderList = [];
				this.paymentList.map(item => {
					return item.totalMoney = 0
				})
				this.radio_value = e.detail.value;

				console.log(this.selectPaymentList)
			},
		},
		onShow() {
			this.loading = true;
			// 定时器，setTimeout只执行一次，setInterval执行多次
			setTimeout(() => {
				this.loading = false;
				console.log(this.loading);

				this.token = my.getStorageSync({
					key: 'token'
				}).data
				// this.jiazai()
				if (this.token) {
					this.getPatientInfo();
				} else {
					this.loading = false;
				}
				this.data = my.getStorageSync({
					key: 'query'
				}).data;

				if (this.data != null && this.data.resultCode != null && this.data.resultCode != 'SUCCESS') {


					my.removeStorage({
						key: 'query'
					})
					uni.showToast({
						title: '授权失败！',
						icon: 'none',
						duration: 2000
					});
				} else if (this.data != null && this.data.resultCode != null && this.data.resultCode ==
					'SUCCESS') {
					console.log("授权返回" + this.data)
					my.removeStorage({
						key: 'query'
					})
					uni.showToast({
						title: '授权成功！',
						icon: 'none',
						duration: 2000
					});
					var str = JSON.stringify(this.data.data).replace(/%/g, '%25')
					uni.navigateTo({
						url: `/pages/outpatientPayment/order/order?query=${encodeURIComponent(JSON.parse(str))}`
					});
				}
				this.selectPaymentList = [];
				this.selectPaymentMoOrderList = [];
			}, 500)



		},
	};
</script>

<style scoped>
	/* 	.header {
		position: fixed;
		top: 0;
		z-index: 999;
	} */

	/* 	.zhuti {
		margin-top: 190rpx;
	} */

	.change-patient-name {
		text-align: right;
		width: 35%;
		height: 50rpx;
	}

	.change-patient-name-btn {
		width: 100%;
		height: 50rpx;
		font-size: 20rpx;
		border-radius: .4rem;
		background: no-repeat;
		border: 1px solid rgb(0, 142, 254);
		padding: 0 .4rem;
		color: rgb(0, 142, 254);
		outline: none;
		margin: 0;
	}

	.shangceng {
		width: 65%;
		display: flex;
	}



	.xiaceng {
		margin-top: 5px;
	}

	.xingming {
		width: 35%;
	}

	.shangceng>span {
		color: rgb(8, 8, 8);
		font-size: 16px;
		font-weight: bold;
	}

	.xiaceng>text {
		font-size: 12px;
		color: rgb(146, 146, 146);
		/* margin-left: 1px; */
	}

	.jibenxinxi {
		width: 70%;
	}

	.qiehuananniu {
		width: 30%;
		text-align: right;
		line-height: 50px;
	}

	.shangceng {
		width: 100%;

		display: flex;
	}

	.xiaceng {
		margin-top: 5px;
	}

	.xingming>span {
		font-size: 16px;
		font-weight: 600;
	}

	.xiaceng>span {
		font-size: 14px;
		color: rgb(163, 163, 163);
	}

	.neiwaibianju>>>.uni-card {
		/* margin: 5px !important; */
		padding: 0 !important;
		/* background-color: saddlebrown; */
		/* background-color: salmon; */
	}
</style>