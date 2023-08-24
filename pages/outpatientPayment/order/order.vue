<template>
	
	<view class="zhuti" v-if="loading">
		<view class="loadingbody">
			<view class="image">
				<view class="loadingImage">
					<image src="../../../static/loading@2x.gif" mode="aspectFit"></image>
				</view>
			</view>
			<view class="loadingText">
				请耐心等待不要离开页面
			</view>
		</view>
	</view>
	
	<view class="body" v-else>
		<!-- loading加载动画，type默认值是原子，love爱心，mask属性是遮罩 -->
		<!-- <zero-loading v-if="loading" type="pulse" mask></zero-loading> -->
		<view :class="showSwitchPatient?'overflow':''">
			<!-- 顶部 -->
			<view class="top">
				<view class="table">
					<view class="left">
						<view class="payment">
							付款给
						</view>
						<view class="hospital">
							南宫市第一人民医院
						</view>
					</view>
					<view class="right">
						<image src="/static/yibao.png" class="menu-image">
					</view>
				</view>

			</view>

			<!-- 卡片内部 -->
			<view class="card">
				<view class="card_top">
					<view class="card_top_title">
						费用总额
					</view>
					<view class="card_top_content">
						{{switchList.outPay.feeSumamt}}元
					</view>
				</view>
				<view class="card_content">
					<view class="paymentDetails">
						<view class="card_content_top">
							<view class="card_top_title">
								医保基金支付
							</view>
							<view class="card_top_content">
								{{switchList.outPay.fundPay}}元
							</view>
						</view>
						<view class="card_content_top">
							<view class="card_top_title">
								个人账户支付
							</view>
							<view class="card_top_content">
								{{switchList.outPay.psnAcctPay}}元
							</view>
						</view>
						<view class="card_content_top">
							<view class="card_top_title">
								其他抵扣金额
							</view>
							<view class="card_top_content">
								0.00元
							</view>
						</view>
					</view>
					<view class="cash">
						<view class="card_top_title">
							现金支付
						</view>
						<view class="card_top_content">
							{{switchList.outPay.ownPayAmt}}元
						</view>
					</view>
				</view>
				<view class="card_bottom" @click.native="showSwitchPatient=true">
					查看明细
				</view>
			</view>

			<!-- 支付选项 -->
			<view class="paymentSelection">
				<text style="color: #666666;font-size: 28rpx;display: block;">个人账户支付</text>
				<view class="option">
					<view class="option_box" :class="individualAccount===true?'option_box_click':''"
						style="margin: 0 30rpx 0 0;" @click="switchPayment(true,'1')">
						使用
					</view>
					<view class="option_box" :class="individualAccount===false?'option_box_click':''" @click="
				switchPayment(false,'0')">
						不使用
					</view>
				</view>
			</view>

			<!-- 底部 -->
			<view class="body_bottom">
				<view class="Tips">
					<image src="/static/yibaohunhe.png" class="Tips-image">
						医保移动支付
				</view>
				<view class="bottom">
					<view class="bottom_span">
						您还需支付:
						<text style="font-size: 44rpx;color: #3b71e8;">￥{{switchList.outPay.ownPayAmt}}</text>
					</view>
					<view class="botton">
						<button
							style="width: 240rpx;height: 100rpx;border-radius: 50rpx;background-color: #3b71e8;color: #fff;font-size: 36rpx;"
							class="mini-btn" type="primary" @click.native="pay()">去支付</button>
					</view>
				</view>
			</view>
		</view>


		<!-- 明细弹窗 -->
		<view v-if="showSwitchPatient" class="switch-patient-bg">
			<view class="switch-patient-container bg-white" style="border-radius: 40rpx 40rpx 0 0;max-height: 98vh;">
				<view class="switch-patient-title text-center border-bottom">
					<view class="switch-Title">
						处方明细
					</view>
					<view class="switch-Image-Wai">
						<view class="switch-Image">
							<image class="switchImage" src="../../../static/guanbi.png" mode="aspectFit"
								@click="showSwitchPatient = false"></image>
						</view>
					</view>
				</view>
				<view class="overFlow">
					<!-- 弹窗内部卡片 -->
					<view class="switch-Card">
						<view class="title">
							就诊信息
						</view>
						<view class="card-content">
							<view class="card-content-List">
								<view class="card-content-left">
									门诊类别
								</view>
								<view class="card-content-right">
									普通
								</view>
							</view>
							<view class="card-content-List">
								<view class="card-content-left">
									门诊科室
								</view>
								<view class="card-content-right">
									{{switchList.outInfo.deptName}}
								</view>
							</view>
							<view class="card-content-List">
								<view class="card-content-left">
									医生姓名
								</view>
								<view class="card-content-right">
									{{switchList.regInfo[0].diseDorName}}
								</view>
							</view>
							<view class="card-content-List">
								<view class="card-content-left">
									处方时间
								</view>
								<view class="card-content-right">
									{{switchList.regInfo[0].diagTime}}
								</view>
							</view>
							<view class="card-content-List">
								<view class="card-content-left">
									费用总额
								</view>
								<view class="card-content-right" style="color: #3b71e8;font-size: 28rpx;">
									{{switchList.outPay.feeSumamt}}元
								</view>
							</view>
						</view>
					</view>

					<!-- 弹窗内部卡片 -->
					<view class="switch-Card">
						<view class="title">
							诊断信息
						</view>
						<view class="card-content">
							<view class="card-content-List">
								<view class="card-content-left">
									诊断名称
								</view>
								<view class="card-content-right">
									{{switchList.regInfo[0].diagName}}
								</view>
							</view>
							<view class="card-content-List">
								<view class="card-content-left">
									诊断编号
								</view>
								<view class="card-content-right">
									{{switchList.regInfo[0].diagCode}}
								</view>
							</view>
						</view>
					</view>

					<!-- 弹窗内部卡片 -->
					<!-- 	<view class="switch-Card">
						<view class="title">
							特殊信息
						</view>
						<view class="card-content">
							<view class="card-content-List">
								<view class="card-content-left">
									病情名称
								</view>
								<view class="card-content-right">
									高血压
								</view>
							</view>
							<view class="card-content-List">
								<view class="card-content-left">
									病情编号
								</view>
								<view class="card-content-right">
									2220003495858
								</view>
							</view>
						</view>
					</view> -->

					<!-- 弹窗内部卡片 -->
					<view class="switch-Card">
						<view class="title">
							费用信息
						</view>
						<view class="card-content">
							<view class="card-content-List costList" v-for="item in selectPaymentList[0].feeList"
								v-bind:key="idnex">
								<view class="card-content-left">
									<text style="display: block;margin-bottom: 10rpx;">{{item.itemName}}</text>
									<text
										style="display: block;color: #989ba0;">{{item.itemSpec}}*{{item.itemNum}}</text>
								</view>
								<view class="card-content-right">
									{{item.itemPrice}}
								</view>
							</view>
						</view>
					</view>

					<!-- 弹窗内部卡片 -->
					<!-- 	<view class="switch-Card">
						<view class="title">
							其他抵扣金额
						</view>
						<view class="card-content">
							<view class="card-content-List">
								<view class="card-content-left">
									住院押金抵扣
								</view>
								<view class="card-content-right">
									50.00元
								</view>
							</view>
							<view class="card-content-List">
								<view class="card-content-left">
									医院负担金额抵扣
								</view>
								<view class="card-content-right">
									50.00元
								</view>
							</view>
						</view>
					</view> -->

				</view>

			</view>
		</view>
	</view>
</template>

<script>
	// 引入scss组件
	import "../outpatientPayment.scss";
	export default {
		data() {
			return {
				// 支付订单详情
				selectPaymentList: {},
				// 是否使用个人账户支付
				individualAccount: true,
				// 是否展开明细弹窗
				showSwitchPatient: false,
				// 明细列表
				switchList: {},
				loading:true,
				body:'',
				orderNo:'',
			}
		},
		methods: {
			/** 
			 * 拆分时间
			 * @param {string} str 时间字符串
			 */
			handRegDate(str) {
				const date = str.substr(4, 2) + '月' + str.substr(6, 2) + '日';
				return date;
			},

			/**
			 * 切换支付方式
			 * @param {Blob} val 选择等支付方式
			 */
			switchPayment(val,acctUsedFlag) {
				this.individualAccount = val
				this.payment(acctUsedFlag)
			},
			
			pay(){
				my.tradePay({
				  orderStr: this.body,
					success: (res) => {
					// 		my.alert({
					// 	   content: JSON.stringify(res),
					// 	 });
					if (res.resultCode == '9000') {
						
						uni.navigateTo({
							url: '/pages/paymentPage/paymentPage?orderNo=' + this.orderNo
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
				   content: JSON.stringify(res),
				 });
				  }
				});
			},

			/**
			 * 获取支付信息
			 */
			payment(acctUsedFlag) {
				this.loading = true;
				my.getAuthCode({
					scopes: ['nhsamp', 'auth_user', 'mcquery'],
					success: item => {
						if (item.authCode) {
							const params = {
								deptName: this.selectPaymentList[0].regInfos.deptName,
								patientName: this.selectPaymentList[0].regInfos.patientName,
								patientNo: this.selectPaymentList[0].regInfos.cardNo,
								patientSeq: this.selectPaymentList[0].regInfos.regNo,
								payMount: this.selectPaymentList[0].totalMoney,
								recipeNos: [this.selectPaymentList[0].recipeNo],
								pay_type:'Al',
								authCode: item.authCode,
								url: "",
								regNo:this.selectPaymentList[0].regNo,
								recipeNo:this.selectPaymentList[0].recipeNo,
								acctUsedFlag:acctUsedFlag
							}
							
							console.log(params)
							this.$myRequest({
								url: "/al/auth/outPay",
								data: params,
							}).then(data => {
								//this.switchList = data.data;
								console.log("明细列表", this.switchList)
								console.log(data.data)
								if (data.data && data.data.body) {
									this.switchList = data.data
									this.body = data.data.body
									this.orderNo = data.data.orderNo
									
								}else{
									uni.navigateTo({
										url: `/pages/outpatientPayment/outpatientPayment`
									});
								}
								this.loading = false
							}).catch(err => {
								console.log(err)
								this.loading = false;
							})
						}

					},
				});

			},
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad(options) {
			/** 
			 * JSON.parse（需要转为对象的参数）将JSON字符串转为对象
			 * decodeURIComponent（需要解码的参数）解析URL编码
			 */
			this.selectPaymentList = JSON.parse(decodeURIComponent(options.query))
			console.log("传递", this.selectPaymentList)
			this.payment(1);
		},
		onShow() {
			
		}

	};
</script>

<style scoped>
	.overflow{
		overflow: hidden;
	}
	
	.top {
		width: 100%;
		height: 350rpx;
		background-color: #3B71E8;
		border-radius: 0 0 46rpx 46rpx;
	}

	.table {
		width: 100%;
		display: flex;
	}

	.left {
		width: 70%;
		margin: 50rpx 0 50rpx 60rpx;
		color: #fff;
	}

	.payment {
		font-size: 28rpx;
		color: #a6c1ff;
	}

	.hospital {
		font-size: 36rpx;
		color: #ffffff;
		padding-top: 10rpx;
	}

	.right {
		width: 30%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding-right: 60rpx;
	}

	.card {
		box-shadow: 0 0 -16px rgba(0, 0, 0, 0.05);
		margin: 0 40rpx;
		padding: 0 40rpx;
		background-color: #fff;
		border: 2rpx #e6e6e6 solid;
		border-radius: 16rpx;
		transform: translateY(-170rpx);
	}

	.menu-image {
		width: 80rpx;
		height: 80rpx;
	}

	.body_bottom {
		position: fixed;
		bottom: 0;
		width: 100%;
	}

	.Tips {
		width: 100%;
		font-size: 28rpx;
		color: #666666;
		padding-bottom: 40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.Tips-image {
		width: 80rpx;
		height: 24rpx;
		margin-right: 12rpx;

	}

	.bottom {
		width: 100%;
		height: 158rpx;
		display: flex;
		border-top: #f5f5f5 2rpx solid;
		background-color: #ffffff;
	}


	.bottom_span {
		width: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		color: #666666;
	}

	.botton {
		width: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.card_content_top {
		display: flex;
		width: 100%;
		font-size: 28rpx;
		color: #909399;
		margin-bottom: 20rpx;
	}


	.paymentDetails>>>.card_content_top:last-child {
		margin-bottom: 0;
	}

	.cash {
		display: flex;
		width: 100%;
		color: #3b71e8;
		font-size: 32rpx;
		font-weight: 600;
		margin: 44rpx 0;
	}

	.card_top {
		font-weight: bold;
		display: flex;
		width: 100%;
		font-size: 36rpx;
		color: #606266;
		padding: 40rpx 0;
		border-bottom: #eff0f4 2rpx dashed;
		margin-bottom: 44rpx;
	}

	.card_top_title {
		width: 70%;
		text-align: left;
	}

	.card_top_content {
		width: 70%;
		text-align: right;
	}

	.card_bottom {
		width: 100%;
		height: 108rpx;
		border-top: #eff0f4 2rpx dashed;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		color: #606266;
	}

	.detailList {
		border-top: #e5e5e5 1px solid;
	}

	.paymentSelection {
		margin: 0 44rpx;
		transform: translateY(-120rpx);
	}

	.option {
		width: 100%;
		display: flex;
		margin-top: 30rpx;
	}

	.option_box {
		width: 50%;
		height: 72rpx;
		background-color: #f8f9fa;
		border: 2rpx #cccccc solid;
		color: #606266;
		font-size: 26rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 8rpx;
	}

	.option_box_click {
		background-color: #f6f9ff;
		border: 2rpx #3b71e8 solid;
		color: #3b71e8;
	}

	.switch-patient-title {
		display: flex;
		align-items: center;
		padding: 50rpx 0 30rpx 0 !important;
		border-bottom: none !important;
	}

	.switch-Title {
		width: 70%;
		text-align: left;
		margin-left: 40rpx;
		color: #303133;
		font-size: 40rpx;
	}

	.switch-Image-Wai {
		width: 30%;
		display: flex;
		justify-content: flex-end;
		margin-right: 28rpx;
	}

	.switch-Image {
		width: 80rpx;
		height: 80rpx;
	}

	.switchImage {
		width: 100%;
		height: 100%;
	}

	.switch-Card {
		margin: 0 30rpx 30rpx 30rpx;
		background-color: #fff;
		border: 2rpx #e6e6e6 solid;
		border-radius: 12rpx;
	}

	.title {
		width: 100%;
		height: 130rpx;
		color: #303133;
		font-weight: 600;
		font-size: 34rpx;
		border-bottom: 2rpx #e6e6e6 solid;
		display: flex;
		align-items: center;
	}

	.title::before {
		content: "";
		width: 8rpx;
		height: 32rpx;
		background-color: #3b71e8;
		margin-left: 10rpx;
		margin-right: 24rpx;
	}

	.card-content {
		margin: 40rpx;
	}

	.card-content-List {
		display: flex;
		margin-bottom: 24rpx;
	}

	.card-content>>>.card-content-List:last-child {
		margin-bottom: 0;
	}

	.card-content-left,
	.card-content-right {
		color: #606266;
		font-size: 28rpx;
	}

	.card-content-left {
		width: 40%;
		text-align: left;
	}

	.card-content-right {
		width: 60%;
		text-align: right;
	}

	.overFlow {
		width: 100%;
		max-height: calc(100vh - 200rpx);
		overflow: auto;
	}

	.costList::before {
		content: "";
		width: 10rpx;
		height: 10rpx;
		border: 2rpx solid #9fa2a7;
		border-radius: 15rpx;
		background-color: transparent;
		margin-right: 10rpx;
		margin-top: 10rpx;
	}
	
	.zhuti{
		width: 100%;
		height: 100vh;
		background-color: #fff;
	}
	
	.loadingbody {
		padding-top: 240px;
		text-align: center;
	}
	
	.image {
		display: flex;
		justify-content: center;
	}
	
	.loadingImage {
		width: 164rpx;
		height: 164rpx;
	}
	
	.loadingImage image {
		width: 100%;
		height: 100%;
	}
	
	.loadingText {
		padding-top: 40rpx;
		color: #3b71e8;
		font-size: 32rpx;
		font-weight: 600;
	}
</style>
