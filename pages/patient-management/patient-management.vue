<template>
	<view>
		<!-- 使用组件的时候首字母要大写！！！！ -->
		<!-- <view class="header" style="width: 100%;height: 150rpx;">
			<Header :title="title" :shouye="shouye"></Header>
		</view> -->
		<view class="zhuti">
			<!-- 线上(手机)开单告知书弹出框，设置点击空白不会退出 is_mask="true" maskFun="false"，无关闭按钮 is_close="false"-->
			<pop ref="pop" direction="center" :is_close="false" :is_mask="true" :width="80" height="fit-content"
				:maskFun="false">
				<view class="biaoti">
					修改就诊人信息
				</view>
				<view class="neirong-wai">
					<view class="patient-container-row"
						style="display: flex;border-bottom: solid 1px #C0C4CC;width: 100%;text-align: left;">
						<view class="nei-title" style="width: 30%;line-height: .7rem;">姓名：</view>
						<view class="nei-input" style="width: 70%;">
							<uni-easyinput class="uni-mt-5" trim="all" v-model="formData.patientName"
								placeholder="请输入就诊者姓名">
							</uni-easyinput>
							<!-- <el-input type="text" class="add-input" v-model="formData.patientName" placeholder="必填">
				</el-input> -->
						</view>
					</view>
					<view class="patient-container-row"
						style="display: flex;border-bottom: solid 1px #C0C4CC;width: 100%;text-align: left;">
						<view class="nei-title" style="width: 30%;line-height: .7rem;">年龄：</view>
						<view class="nei-input" style="width: 70%;">
							<uni-easyinput class="uni-mt-5" trim="all" v-model="formData.patientAge"
								placeholder="请输入就诊年龄">
							</uni-easyinput>
							<!-- <el-input type="text" class="add-input" v-model="formData.patientName" placeholder="必填">
						</el-input> -->
						</view>
					</view>
					<view class="patient-container-row"
						style="display: flex;border-bottom: solid 1px #C0C4CC;width: 100%;text-align: left;">
						<view class="nei-title" style="width: 30%;line-height: .7rem;">身份证号：</view>
						<view class="nei-input" style="width: 70%;">
							<uni-easyinput class="uni-mt-5" trim="all" @blur="idCardBlur"
								v-model="formData.patientCardId" placeholder="请输入就诊者身份证号">
							</uni-easyinput>
							<!-- <el-input type="text" class="add-input" @blur="idCardBlur" v-model="formData.patientCardId"
					placeholder="请输入就诊者身份证号"></el-input> -->
						</view>
					</view>
					<view class="patient-container-row"
						style="display: flex;border-bottom: solid 1px #C0C4CC;width: 100%;text-align: left;">
						<view class="nei-title" style="width: 30%;line-height: .7rem;">就诊卡号：</view>
						<view class="nei-input" style="width: 70%;">
							<uni-easyinput class="uni-mt-5" trim="all" v-model="formData.cardNumber"
								placeholder="请输入就诊卡号">
							</uni-easyinput>
							<!-- <el-input type="text" class="add-input" v-model="formData.cardNo" placeholder="请输入就诊卡号">
					</el-input> -->
						</view>
					</view>
					<view class="patient-container-row" style="display: flex;width: 100%;text-align: left;">
						<view class="nei-title" style="width: 35%;line-height: .7rem;">与就诊人关系：</view>
						<view class="nei-input"
							style="position: relative;width: 65%;text-align: left;line-height: .7rem;">
							<!-- 此处将原先的select/option修改为了picker底部弹出选择器
				   mode为选择器类型：selector 普通选择器，range为选择器内的选项，range-key为选择器内选项的是什么 -->
							<picker class="select2" mode="selector" :range="patientRelationshipList" range-key="label"
								@change="listPicker">
								<div class="font-div">
									<span
										v-if="formData.patientRelationship">{{formData.patientRelationship | patientRelationship}}</span>
									<span v-else style="color: #C0C4CC;font-size: 14px">请选择与就诊人关系</span>
								</div>
							</picker>
						</view>
					</view>
				</view>
				<view class="zizhuanniuanniu">
					<view class="wai">
						<view class="quxiao">
							<view style="font-size: 16px;font-weight: 800;" @click="quxiao()">取消</view>
						</view>
						<view class="queren">
							<view style="color: rgb(0, 147, 255);font-size: 16px;font-weight: 800;" @click="queren()">
								确定
							</view>
						</view>
					</view>
				</view>
			</pop>


			<view :span="12" class="change-patient-name">
				<button class="change-patient-name-btn" @click="addPatient">添加就诊人</button>
			</view>
			<view class="add-people-num">
				您已添加<span>{{patientList.length}}</span>人，还可添加<span>{{5 - patientList.length}}</span>人
			</view>
			<view class="bg-white patient-container" v-for="item in patientList" v-bind:key="item.cardId">
				<uni-card>
					<view class="patient-container-row">
						<view style="width: 30%;">姓名</view>
						<view style="width: 60%;text-align: right;">
							<view class="text-right" v-if="isShow.isShowName===false">
								{{item.patientName|processingName}}
							</view>
							<view class="text-right" v-else>
								{{item.patientName}}
							</view>
						</view>
						<view style="width: 10%;text-align: right;">
							<text class="iconfont icon-biyanjing" v-if="isShow.isShowName===false"
								style="color: #008cfe" @click="isShowNameClick()"></text>
							<text class="iconfont icon-icon-eye-open" v-if="isShow.isShowName===true"
								style="color: #008cfe" @click="isShowNameClick()"></text>
						</view>

					</view>
					<!-- <view class="patient-container-row">
						<view style="width: 30%;">年龄</view>
						<view style="width: 60%;text-align: right;">
							<view class="text-right">{{item.patientAge}}</view>
						</view>
						<view style="width: 10%;text-align: right;">

						</view>
					</view> -->
					<view class="patient-container-row">
						<view style="width: 30%;">身份证号</view>
						<view style="width: 60%;text-align: right;">
							<view class="text-right" v-if="isShow.isShowCardId===false">
								{{item.patientCardId|processingcardID}}
							</view>
							<view class="text-right" v-else>
								{{item.patientCardId}}
							</view>
						</view>
						<view style="width: 10%;text-align: right;">
							<text class="iconfont icon-biyanjing" v-if="isShow.isShowCardId===false"
								style="color: #008cfe" @click="isShowCardIdClick()"></text>
							<text class="iconfont icon-icon-eye-open" v-if="isShow.isShowCardId===true"
								style="color: #008cfe" @click="isShowCardIdClick()"></text>
						</view>

					</view>
					<view class="patient-container-row">
						<view style="width: 30%;">就诊卡号</view>
						<view style="width: 60%;text-align: right;">
							<view class="text-right" v-if="isShow.isShowNumber===false">
								{{item.cardNumber|processingcardNumber}}
							</view>
							<view class="text-right" v-else>
								{{item.cardNumber}}
							</view>
						</view>
						<view style="width: 10%;text-align: right;">
							<text class="iconfont icon-biyanjing" v-if="isShow.isShowNumber===false"
								style="color: #008cfe" @click="isShowNumberClick()"></text>
							<text class="iconfont icon-icon-eye-open" v-if="isShow.isShowNumber===true"
								style="color: #008cfe" @click="isShowNumberClick()"></text>
						</view>

					</view>
					<view class="patient-container-row">
						<view style="width: 30%;">与就诊者关系</view>
						<view style="width: 60%;text-align: right;">
							<view class="text-right">{{item.patientRelationship | patientRelationship}}</view>
						</view>
						<view style="width: 10%;text-align: right;">

						</view>
					</view>

					<view class="patient-radio-row" style="display: flex;justify-content: space-between;">
						<!-- <view> -->
						<view @click="selectPatient(item)" class="patient-radio-col-l">
							<view class="radio-container">
								<view class="radio-checked" v-if="item.patientId === currentSelectPatient.patientId">
								</view>
							</view>
							当前就诊人
						</view>

						<view class="text-right patient-radio-col-r" style="color: #F56C6C;padding: 0 10px;"
							@click="deletePatient(item)">
							删除
							<!-- <i class="el-icon-delete" ></i> -->
						</view>
						<!-- </view> -->

						<!-- <view style="width: 23%;margin-left: 2%;">
							<button
								style="background-color: #409EFF;color: #fff;border-radius:10%;height: 50rpx;font-size: .3rem;line-height: .4rem;"
								@click="Update(item)">修改</button>
						</view>

						<view style="width: 23%;margin-left: 2%;">
							<button
								style="background-color: #F56C6C;color: #fff;border-radius:10%;height: 50rpx;font-size: .3rem;line-height: .4rem;"
								@click="open()">删除</button>
						</view> -->
					</view>
				</uni-card>
			</view>

			<!-- 			<view name="el-fade-in-linear">
				<view class="confirm-del" v-if="isShowDelConfirm"></view>
			</view> -->
			<!-- 			<view name="el-fade-in-linear">
				<view class="del-container bg-white" v-if="isShowDelConfirm">
					<view class="del-container-row">
						<view class="text-center del-container-col">确定要删除该患者吗？</view>
					</view>
					<view>
						<view :span="12" class="text-center del-container-col del-container-cancel"
							@click.native="isShowDelConfirm=false">取消
						</view>
						<view :span="12" class="text-center del-container-col del-container-del"
							@click.native="confirmDel">删除</view>
					</view>
				</view>
			</view> -->
		</view>
	</view>
	</view>
</template>

<script>
	// 引入导航栏组件
	// import header from '@/components/header/header.vue'
	// 引入scss样式
	import './patient-management.scss'
	// import './add-patient/add-patient.scss'
	// 引入弹窗组件
	import pop from "@/components/ming-pop/ming-pop.vue";
	export default {
		// 注册使用导航栏组件
		components: {
			pop,
		},
		data() {
			return {
				title: "就诊者管理", // 页面标题
				shouye: "no", // 是否是首页，不是首页显示返回上一层箭头

				isShowDelConfirm: false,
				isShow: {
					isShowName: false,
					isShowCardId: false,
					isShowNumber: false
				},
				patientList: [],
				currentSelectPatient: {},
				currentDelSelectPatient: {},
				formData: {},
				patientRelationshipList: [{
						label: '本人',
						value: '1030'
					},
					{
						label: '家属',
						value: '1031'
					},
					{
						label: '同事',
						value: '1032'
					},
					{
						label: '其他',
						value: '1033'
					},
				],
			}
		},
		filters: {
			patientRelationship(val) {
				if (!val) return ''
				const arr = [{
						label: '本人',
						value: '1030'
					},
					{
						label: '家属',
						value: '1031'
					},
					{
						label: '同事',
						value: '1032'
					},
					{
						label: '其他',
						value: '1033'
					},
				]
				const obj = arr.filter(item => item.value === val)
				return obj[0].label
			},
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
			processingcardID(str) {
				if (!str) {
					return '-';
				}
				let star = '' //存放身份证中间的*
				// 长度减1是因为后面要保留1位
				for (var i = 0; i < str.length - 1; i++) {
					star = star + '*'
				}
				// substring()截取字符串， 第一个参数是开始截取的下标，第二个是结束的下标，第二个参数不填就从下标开始截取到最后一位
				return str.substring(0, 1) + star + str.substring(str.length - 1, str.length)
			
			},
		},
		methods: {
			// 提示框
			open() {
				let _this = this;
				uni.showModal({
					title: '提示',
					content: '确定要删除该患者吗?',
					success: function(res) {
						if (res.confirm) {
							this.confirmDel()
						} else if (res.cancel) {
							console.log("取消");
						}
					}
				});
			},

			// 打开弹窗
			Update(val) {
				this.$refs.pop.show();
				console.log(val);
				this.formData = val;
			},

			// 取消的方法，触发就会返回首页
			quxiao() {
				this.$refs.pop.close();
			},

			isShowNameClick() {
				if (this.isShow.isShowName === false) {
					this.isShow.isShowName = true;
				} else {
					this.isShow.isShowName = false;
				}
			},
			isShowCardIdClick() {
				if (this.isShow.isShowCardId === false) {
					this.isShow.isShowCardId = true;
				} else {
					this.isShow.isShowCardId = false;
				}
			},
			isShowNumberClick() {
				if (this.isShow.isShowNumber === false) {
					this.isShow.isShowNumber = true;
				} else {
					this.isShow.isShowNumber = false;
				}
			},

			queren() {
				this.$myRequest({
					url: "/wechat/user/dfltPtCard/info"
				}).then(data => {
					this.currentSelectPatient = data.data;
					this.loading = false;
				}).catch(err => {
					this.loading = false;
				})
				this.$refs.pop.close();
				console.log(this.formData)
			},

			// Picker选择器的方法
			listPicker(e) {
				this.formData.patientRelationship = this.patientRelationshipList[e.target.value].value
			},

			idCardBlur() {
				let _IDRe18 =
					/^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
				if (_IDRe18.test(this.formData.patientCardId)) {
					this.formData.patientBirthday = this.formData.patientCardId.slice(6, 10) + '-' + this.formData
						.patientCardId.slice(10, 12) + '-' + this.formData.patientCardId.slice(12, 14)
				} else {
					uni.showToast({
						title: '请输入正确的身份证号！',
						icon: 'none',
						duration: 2000
					});

				}
			},

			// 由于无接口，所以控制台报错关于无patientService的问题
			getDfltPtCardInfo() {
				this.$myRequest({
					url: "/wechat/user/dfltPtCard/info"
				}).then(data => {
					this.currentSelectPatient = data.data;
					this.loading = false;
				}).catch(err => {
					this.loading = false;
				})
			},
			getPatientInfo() {
				this.$myRequest({
					url: "/wechat/user/patientcard/info"
				}).then(data => {
					this.patientList = data.data;
					this.loading = false;
				}).catch(err => {
					this.loading = false;
				})
			},
			addPatient() {
				uni.navigateTo({
					url: '/pages/patient-management/add-patient/add-patient'
				})
			},
			selectPatient(item) {
				console.log(item)
				if (!item || !item.patientId) {
					return;
				}
				const params = {
					patientId: item.patientId
				}
				this.$myRequest({
					url: "/wechat/user/update/patientinfo",
					data: params
				}).then(data => {
					this.getDfltPtCardInfo();
					this.loading = false;
				}).catch(err => {
					this.loading = false;
				})
			},
			deletePatient(item) {
				if (!item.patientId) {
					return;
				}

				const _this = this

				uni.showModal({
					title: '提示',
					content: '确定要删除该患者吗?',
					success: function(res) {
						if (res.confirm) {
							_this.closeConfirm();
						} else if (res.cancel) {
							console.log("取消");
						}
					}
				});
				// this.isShowDelConfirm = true;
				this.currentDelSelectPatient = item;
			},
			closeConfirm() {
				this.$myRequest({
					url: "/wechat/user/deletePtCard/info",
					data: {
						patientId: this.currentDelSelectPatient.patientId
					}
				}).then(data => {
					uni.showToast({
						title: data.msg || '删除成功'
					})
					this.getDfltPtCardInfo()
					this.getPatientInfo()
					// this.isShowDelConfirm = false;
					this.loading = false;
				}).catch(err => {
					this.loading = false;
				})
			},
			confirmDel() {
				this.closeConfirm();
			}
		},
		onShow() {
			this.getDfltPtCardInfo()
			this.getPatientInfo()
		},
	}
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
	.biaoti {
		font-size: 18px;
		font-weight: 800;
		text-align: center;
		margin-bottom: 10px;

	}

	.neirong-wai {
		border-top: 1px solid rgb(212, 212, 212);
		border-bottom: 1px solid rgb(212, 212, 212);
	}

	.wai {
		width: 100%;
		height: 35px;
		margin-top: 10px;
		display: flex;
	}

	.quxiao,
	.queren {
		width: 50%;
		height: 30px;
	}

	.quxiao {
		border-right: 1px solid rgb(212, 212, 212);
	}

	.quxiao>view,
	.queren>view {
		width: 100%;
		height: 30px;
		line-height: 30px;
		text-align: center;
	}

	.quxiao>view {
		color: rgb(165, 165, 165) !important;
	}

	.confirm-btn button {
		height: 45px !important;
	}

	.nei-title {
		width: 42%;
		font-size: 14px;
	}

	.nei-input {
		width: 58%;
	}

	.nei-input>>>.is-input-border {
		border: none;
	}

	.nei-input>>>.uni-easyinput__content-input {
		font-size: 14px;
	}
</style>
