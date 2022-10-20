<template>
	<view>
		<!-- 使用组件的时候首字母要大写！！！！ -->
		<!-- <view class="header" style="width: 100%;height: 150rpx;">
			<Header :title="title" :shouye="shouye"></Header>
		</view> -->
		<view class="zhuti">
			<uni-card class="xianzhi">
				<!-- 就诊人信息，如果huanzhexinxi中的患者姓名为空渲染这个div -->
				<div class="bg-white card-container" v-if="huanzhexinxi.name == null">
					<div style="display: flex; width: 100%;">
						<div class="shangceng">

							<span>{{ processingName(currentPatient.patientName) }}</span>

						</div>
						<view :span="12" class="change-patient-name">
							<button class="change-patient-name-btn"
								style="transform: scale(1.0);line-height: .5rem;border-radius: 20px 20px;"
								@click="switchPatient">切换就诊人</button>
						</view>
					</div>

					<div style="width: 100%;">
						<div class="xiaceng">
							<text>就诊号</text>
							<text style="margin-left:5px;">：</text>
							<text style="margin-left:5px;">{{ processingcardNumber(currentPatient.cardNumber) }}</text>
						</div>
					</div>
					<!-- <div class="qiehuananniu">
						<button class="change-patient-name-btn" @click="switchPatient">
							切换就诊人
						</button>
					</div> -->
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
					<!-- <div class="qiehuananniu">
						<button class="change-patient-name-btn" @click="switchPatient">
							切换就诊人
						</button>
					</div> -->
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
						<div class="patient-name">{{processingName(item.patientName)  }}</div>
						<div class="visit-number" style="font-size: 14px;color: rgb(146, 146, 146);">
							就诊号：{{ processingcardNumber(item.cardNumber) }}</div>
						<!-- <i class="el-icon-check" v-if="currentPatient.shenfenID === item.shenfenID"
							style="color: #008cfe"></i> -->
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
							就诊号：{{ processingcardNumber(item.cardNumber )}}</div>
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
				<p>暂未获取到您的缴费信息</p>
			</div>
			<view class="neiwaibianju" v-if="paymentList.length > 0">
				<uni-card>
					<div v-if="paymentList.length > 0">
						<div class="bg-white payment-container" v-for="item in paymentList" v-bind:key="item.count">
							<uni-row class="payment-row">
								<view style="display: flex;">
									<view style="width: 5%;">
										<text class="iconfont icon-huaban24"
											style="color: #008cfe;font-size: 20px;"></text>
									</view>
									<view style="font-size: 16px;width: 64%;text-align: center;"
										@click.native="openList(item)">
										挂号科室：
										{{ item.regInfos.deptName }}({{ item.regInfos.regNo }})
									</view>
									<view style="font-size: 16px;width: 26%;text-align: right;"
										@click.native="openList(item)" class="text-right">
										{{ handRegDate(item.regInfos.regDate) }}
									</view>
									<view style="width: 5%;" @click.native="openList(item)" class="text-center">
										<text class="iconfont icon-xiajiantou" v-if="item.isOpen"
											style="color: #b7b7b7;font-size: 22px;"></text>
										<text class="iconfont icon-youjiantou" v-if="!item.isOpen"
											style="color: #b7b7b7;font-size: 22px;"></text>
									</view>
								</view>
							</uni-row>

							<div>
								<div class="prescription-container" v-show="item.isOpen"
									style="border-top: 1px solid rgb(230,230,230);padding: 5px; margin-top: 5px;"
									v-for="(outFee, index) in item.outFeeList" v-bind:key="index">
									<uni-row class="prescription-row">
										<view style="display: flex;">
											<view style="width: 10%;">
												<text :span="2">
													<text class="iconfont icon-huaban24" style="color: #008cfe"></text>
												</text>
											</view>
											<view style="width: 60%;">
												<text :span="16" style="color: #979797">处方号：{{ outFee.recipeNo }}</text>
											</view>
											<view style="text-align: right;width: 30%;">
												<text :span="5" class="text-right" style="color: #008cfe">
													<!--                  <span v-if="outFee.isPayment">已支付</span>-->
													<!--                  <span v-if="!outFee.isPayment">未支付</span>-->
													<text>已支付</text>
												</text>
											</view>
										</view>
									</uni-row>
									<uni-row class="prescription-row" v-for="(prescriptionItem, ind) in outFee.feeList"
										:key="ind">
										<!-- v-for="prescriptionItem in prescription.prescriptionItems" v-bind:key="prescriptionItem.id"-->
										<!-- <text :span="2">&nbsp;</text> -->

										<view style="display: flex;width: 90%;margin-left: 10%;">
											<view style="width: 60%;text-align: left;">
												<text :span="16" v-if="prescriptionItem.itemNum > 0">{{
													  prescriptionItem.itemName
													}}</text>
												<text :span="16" v-if="prescriptionItem.itemNum < 0"
													style="color: #ff4d51">
													{{ prescriptionItem.itemName }}
												</text>
											</view>
											<view style="width: 40%;text-align: right;">
												<text :span="5" class="text-right" style="color: #b8b8b8"
													v-if="prescriptionItem.itemNum > 0">
													{{ prescriptionItem.itemPrice }}*{{
													  prescriptionItem.itemNum
													}}
												</text>
												<text :span="5" class="text-right" style="color: #ff4d51"
													v-if="prescriptionItem.itemNum < 0">
													{{ prescriptionItem.itemPrice }}*{{
													  prescriptionItem.itemNum
													}}
												</text>
											</view>

										</view>


									</uni-row>
								</div>
							</div>

							<div class="payment-bot bg-white"
								style="border-top:1px solid rgb(230, 230, 230);margin-top: 10px;">

								<view style="margin-top: 10px;">
									<!--            <text :span="7" class="text-center pay-sel-all">-->
									<!--              <el-checkbox v-model="isSelectAll" @change="onSelectAllBtn" class="pay-check"></el-checkbox>-->
									<!--              全选-->
									<!--            </text>-->
									<text :span="17" style="padding: 0.4rem">
										总额：<text style="color: #ec6c25">￥{{ item.count }}</text>
									</text>
									<!--            <text :span="7" class="text-center" @click.native="goToPayment(item)">-->
									<!--              <div class="payment-btn">去缴费</div>-->
									<!--            </text>-->
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
	// 引入scss组件
	import "./queryOutFeeList.scss";
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
				//就诊人中的所有值
				showSwitchPatient: false, //切换就诊人的弹窗值，如果此值为true弹窗会打开
				huanzhexinxi: {}, //存放患者信息的值
				isSelectAll: false,
				paymentList: [],
				switchPatientList: [],
				currentPatient: {},
				selectPaymentList: [],
				selectPaymentMoOrderList: [],
				totalMoney: 0,
			}
		},
		methods: {
			// 就诊人中的全部方法
			//触发切换就诊人的弹窗
			switchPatient() {
				this.showSwitchPatient = true;
			},
			//就诊人信息的数据
			getPatientInfo() {
				this.$myRequest({
					url: "/wechat/user/patientcard/info",
				}).then(data => {
					this.switchPatientList = data.data;
					this.currentPatient = data.data[0];
					this.getOutPayList()
					this.loading = false;
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
				const params = {
					patientNo: this.currentPatient.cardNumber,
				};
				this.$myRequest({
					url: "/hospt/getOutBillList",
					data: params,
				}).then(data => {
					this.paymentList = data.data;
					this.loading = false;
				}).catch(err => {
					this.loading = false;
				})
				this.paymentList.forEach((item) => {
					item.isOpen = true;
					item.totalMoney = 0;
				});
			},
			openList(item) {
				this.$forceUpdate();
				this.$set(item, "isOpen", !item.isOpen);
			},
			isChecked(item) {
				let selectNum = 0;
				this.selectPaymentList.forEach((pay) => {
					if (pay.regNo === item.regInfos.regNo) {
						selectNum++;
					}
				});
				return selectNum === item.outFeeList.length;
			},
			paymentCheck(item) {
				if (
					this.selectPaymentList.length &&
					this.selectPaymentList[0].regNo != item.regInfos.regNo
				) {
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
					item.outFeeList.forEach((outFee) => {
						const recipe = this.selectPaymentList.map((list) => list.recipeNo);
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
					this.paymentList.forEach((item) => {
						item.outFeeList.forEach((outFee) => {
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
				this.paymentList.forEach((item) => {
					len += item.outFeeList.length;
				});
				this.isSelectAll = this.selectPaymentMoOrderList.length === len;
			},
			// 计算金额
			calculationTotalMoney(item) {
				let money = 0;
				this.selectPaymentList.forEach((item) => {
					item.feeList.forEach((outFee) => {
						money += Number((outFee.itemPrice * outFee.itemNum).toFixed(2));
					});
				});
				item.totalMoney = money;
			},
			handRegDate(str) {
				const date = str.substr(4, 2) + "月" + str.substr(6, 2) + "日";
				return date;
			},
			goToPage(url) {
				if (!url) {
					return;
				}
				this.$router.push(url);
			},
			goToPayment(item) {
				console.log(this.selectPaymentList[0].regNo);
				console.log(item.regInfos.regNo);
				if (
					this.selectPaymentMoOrderList.length === 0 ||
					this.selectPaymentList[0].regNo !== item.regInfos.regNo
				) {
					this.$message.info("请选择缴费项目");
					return;
				}
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
				};
				let loadingInstance = Loading.service({});

				this.$myRequest({
					url: "/wechat/pay/out",
					data: params
				}).then(res => {
					if (res && res.code === 0) {
						//TODO: 重新写支付宝支付
						const data = res.data;
						if (typeof WeixinJSBridge == "undefined") {
							if (document.addEventListener) {
								document.addEventListener(
									"WeixinJSBridgeReady",
									onBridgeReady,
									false
								);
							} else if (document.attachEvent) {
								document.attachEvent("WeixinJSBridgeReady", onBridgeReady);
								document.attachEvent("onWeixinJSBridgeReady", onBridgeReady);
							}
						} else {
							const _this = this;
							WeixinJSBridge.invoke(
								"getBrandWCPayRequest", {
									appId: data.appId, //公众号名称，由商户传入
									timeStamp: data.timeStamp, //时间戳，自1970年以来的秒数
									nonceStr: data.nonceStr, //随机串
									package: data.package,
									signType: data.signType, //微信签名方式：
									paySign: data.paySign, //微信签名
								},
								function(res) {
									if (res.err_msg == "get_brand_wcpay_request:ok") {
										// 使用以上方式判断前端返回,微信团队郑重提示：
										//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
										_this.$router.push("/paymentPage?orderNo=" + data.orderNo);
									}
								}
							);
						}
					}

					this.loading = false;
				}).catch(err => {
					this.loading = false;
				})
			},
		},
		mounted() {
			this.getPatientInfo();
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
