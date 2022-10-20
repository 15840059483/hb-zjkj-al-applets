<template>
	<view>
		<!-- loading加载动画，type默认值是原子，love爱心，mask属性是遮罩 -->
		<zero-loading v-if="loading" type="pulse" mask></zero-loading>
		<!-- 使用组件的时候首字母要大写！！！！ -->
		<!-- <view class="header" style="width: 100%;height: 150rpx;">
			<Header :title="title" :shouye="shouye"></Header>
		</view> -->
		<view class="zhuti">
			<uni-card class="bg-white patient-container">
				<view v-if="formData.patientRelationship === '1030'">
					<view class="patient-container-row">
						<view class="nei-title">姓名：</view>
						<view class="nei-input">
							<text>{{val.userName|processingName}}</text>
							<!-- <el-input type="text" class="add-input" v-model="formData.patientName" placeholder="必填">
							</el-input> -->
						</view>
					</view>
					<view class="patient-container-row">
						<view class="nei-title">身份证号：</view>
						<view class="nei-input">
							<text>{{val.certNo|processingcardID}}</text>
							<!-- <el-input type="text" class="add-input" @blur="idCardBlur" v-model="formData.patientCardId"
								placeholder="请输入就诊者身份证号"></el-input> -->
						</view>
					</view>
					<view class="patient-container-row">
						<view class="nei-title">与就诊人关系：</view>
						<view class="nei-input" style="position: relative">
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
					<view class="patient-container-row">
						<view class="nei-title">手机号码：</view>
						<view class="nei-input">
							<text>{{val.mobile|processingcardNumber}}</text>
							<!-- <el-input type="text" class="add-input" v-model="formData.patientPhone" placeholder="请输入手机号码">
							</el-input> -->
						</view>
					</view>
				</view>
				<view v-else>
					<view class="patient-container-row">
						<view class="nei-title">姓名：</view>
						<view class="nei-input">
							<uni-easyinput class="uni-mt-5" trim="all" v-model="formData.patientName" placeholder="必填">
							</uni-easyinput>
							<!-- <el-input type="text" class="add-input" v-model="formData.patientName" placeholder="必填">
							</el-input> -->
						</view>
					</view>
					<view class="patient-container-row">
						<view class="nei-title">身份证号：</view>
						<view class="nei-input">
							<uni-easyinput class="uni-mt-5" trim="all" @blur="idCardBlur" v-model="formData.patientCardId"
								placeholder="请输入就诊者身份证号">
							</uni-easyinput>
							<!-- <el-input type="text" class="add-input" @blur="idCardBlur" v-model="formData.patientCardId"
								placeholder="请输入就诊者身份证号"></el-input> -->
						</view>
					</view>
					<view class="patient-container-row">
						<view class="nei-title">与就诊人关系：</view>
						<view class="nei-input" style="position: relative">
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
					<view class="patient-container-row">
						<view class="nei-title">手机号码：</view>
						<view class="nei-input">
							<uni-easyinput class="uni-mt-5" trim="all" v-model="formData.patientPhone"
								placeholder="请输入手机号码">
							</uni-easyinput>
							<!-- <el-input type="text" class="add-input" v-model="formData.patientPhone" placeholder="请输入手机号码">
							</el-input> -->
						</view>
					</view>
				</view>
				<!--      <view class="patient-container-row">-->
				<!--        <view class="nei-title">性别：</view>-->
				<!--        <view class="nei-input">-->
				<!--          <el-radio v-model="formData.sex" label="1">男</el-radio>-->
				<!--          <el-radio v-model="formData.sex" label="2">女</el-radio>-->
				<!--        </view>-->
				<!--      </view>-->
			</uni-card>
			<div class="confirm-btn">
				<button @click="submitBtn">提交</button>
			</div>
		</view>
	</view>
</template>

<script>
	// 引入导航栏组件
	// import header from '@/components/header/header.vue'
	// 引入scss样式
	import '../patient-management.scss'
	import './add-patient.scss'
	export default {
		// 注册使用导航栏组件
		components: {
			// header,
		},
		data() {
			return {
				title: "添加就诊人", // 页面标题
				shouye: "no", // 是否是首页，不是首页显示返回上一层箭头

				loading: false,

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
				formData: {
					patientName: '',
					patientCardId: '',
					patientBirthday: '',
					patientRelationship: '1030',
					patientPhone: '',
					cardNo: '',
				},
				val: {}
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
		mounted(){
			let _this = this
			my.getAuthCode({
				scopes: 'auth_user',
				success: res => {
					console.log(res)
					_this.$myRequest({
							// url: `/al/auth/login?code=${res.code}`,
							url: `/al/auth/user?code=${res.authCode}`,
							method: 'get'
						})
						.then((data) => {
							_this.val = data.data
						})
				},
			});
			this.getAlUserInfo();
		},
		methods: {
			getAlUserInfo(){
				 my.getOpenUserInfo({
				    fail: (res) => {
				    },
				    success: (res) => {
				      let userInfo = JSON.parse(res.response).response // 以下方的报文格式解析两层 response
					  console.log(userInfo)
				    }
				  });
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

			submitBtn() {
				if (!this.formData.patientName && this.formData.patientRelationship!='1030') {
					uni.showToast({
						title: '请输入就诊人姓名！',
						icon: 'none',
						duration: 2000
					});

					return
				}
				if (!this.formData.patientCardId && this.formData.patientRelationship!='1030') {
					uni.showToast({
						title: '请输入就诊人身份证号！',
						icon: 'none',
						duration: 2000
					});

					return
				}
				if (!this.formData.patientRelationship && this.formData.patientRelationship!='1030') {
					uni.showToast({
						title: '请选择与就诊人关系！',
						icon: 'none',
						duration: 2000
					});

					return
				}
				if (!this.formData.patientPhone && this.formData.patientRelationship!='1030') {
					uni.showToast({
						title: '请输入就诊人手机号码！',
						icon: 'none',
						duration: 2000
					});

					return
				}
				this.loading = true
				const params = Object.assign(this.formData)
				const _this = this
				if (this.formData.cardNo == null || this.formData.cardNo == '') {
					uni.showModal({
						title: "提示",
						content: "是否添加就诊人?",
						success: function(res) {
							if (res.confirm) {
								_this.$myRequest({
									url: "/wechat/user/addPtCard/info",
									data: _this.formData,
									contentType: 'application/json;charset=UTF-8'
								}).then(data => {
									if (data.code === 200) {
										uni.showToast({
											title: '添加成功！',
											icon: 'none',
											duration: 2000
										});

										// loadingInstance.close();
										uni.navigateBack()
									}
									_this.loading = false;
								}).catch(err => {
									_this.loading = false;
								}).finally(f => {
									_this.loading = false;
								})
							} else {
								uni.showToast({
									title: '已取消添加就诊人！',
									icon: 'none',
									duration: 2000
								});
								_this.loading = false;
							}
						}
					});
				} else {
					this.$myRequest({
							url: '/wechat/user/addPtCard/info',
							data: this.formData
						}).then(data => {
							uni.showToast({
								title: '添加成功！',
								icon: 'none',
								duration: 2000
							});

							uni.navigateBack()
							_this.loading = false;
						})
						.catch(() => {
							_this.loading = false;
						}).finally(f => {
							_this.loading = false;
						})
				}

			}
		}
	}
</script>

<style scoped>
	/* 	.header {
		position: fixed;
		top: 0;
		z-index: 999;
	} */
	/* 
	.zhuti {
		margin-top: 150rpx;
	} */

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
