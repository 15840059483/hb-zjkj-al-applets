<template>
	<view>
		<!-- loading加载动画，type默认值是原子，love爱心，mask属性是遮罩 -->
		<zero-loading v-if="loading" type="pulse" mask></zero-loading>
		<!-- 使用组件的时候首字母要大写！！！！ -->
		<!-- <view class="header" style="width: 100%;height: 150rpx;">
			<Header :title="title" :shouye="shouye"></Header>
		</view> -->
		<view class="zhuti">
			<uni-card class="xianzhi">
				<!-- 就诊人信息，如果huanzhexinxi中的患者姓名为空渲染这个div -->
				<div class="bg-white card-container" v-if="huanzhexinxi.name == null">
					<!-- <div style="display: flex; width: 100%;">
						<div class="shangceng">
							<div class="xingming">
								<span>{{ processingName(currentPatient.name) }}</span>
							</div>
							<div class="shouji">
								<span>{{ processingcardNumber(currentPatient.shouji) }}</span>
							</div>
						</div>
						<view :span="12" class="change-patient-name">
							<button class="change-patient-name-btn"
								style="transform: scale(1.0);border-radius: 20px 20px;"
								@click="switchPatient">切换就诊人</button>
						</view>
					</div> -->

					<div style="width: 100%;">
						<div class="xiaceng">
							<text>{{ processingName(huanzhexinxi.patientName) }}</text>
							<text style="margin-left:5px;">/</text>
							<text style="margin-left:5px;">{{ huanzhexinxi.patientSex }}岁</text>
							<text style="margin-left:5px;">病历号：{{ processingcardNumber(huanzhexinxi.cardNumber) }}</text>
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
								<span>{{ processingName(huanzhexinxi.name) }}</span>
							</div>
							<div class="shouji">
								<span>{{ processingcardNumber(huanzhexinxi.shouji) }}</span>
							</div>
						</div>
						<view :span="12" class="change-patient-name">
							<button class="change-patient-name-btn"
								style="transform: scale(1.0);border-radius: 20px 20px;"
								@click="switchPatient">切换就诊人</button>
						</view>
					</div>
					<div style="width: 100%;">
						<div class="xiaceng">
							<text>{{ processingName(huanzhexinxi.patientName) }}</text>
							<text style="margin-left:5px;">/</text>
							<text style="margin-left:5px;">{{ huanzhexinxi.patientSex }}岁</text>
							<text style="margin-left:5px;">病历号：{{ processingcardNumber(huanzhexinxi.cardNumber) }}</text>
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
						v-bind:key="item.shenfenID" @click="onSwitchPatientBtn(item)">
						<div class="patient-name">*{{ item.name }}</div>
						<div class="visit-number" style="font-size: 14px;color: rgb(146, 146, 146);">
							身份证：{{ processingcardNumber(item.shenfenID) }}</div>
						<!-- <i class="el-icon-check" v-if="currentPatient.shenfenID === item.shenfenID"
							style="color: #008cfe"></i> -->
						<text class="iconfont icon-duihao" v-if="currentPatient.shenfenID === item.shenfenID"
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
						v-bind:key="item.shenfenID" @click="onSwitchPatientBtn(item)">
						<div class="patient-name">*{{ item.name }}</div>
						<div class="visit-number" style="font-size: 14px;color: rgb(146, 146, 146);">
							身份证：{{ processingcardNumber(item.shenfenID) }}</div>
						<!-- <i class="el-icon-check" v-if="huanzhexinxi.shenfenID === item.shenfenID" style="color: #008cfe"></i> -->
						<text class="iconfont icon-duihao" v-if="huanzhexinxi.shenfenID === item.shenfenID"
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

			<!-- 检验项目信息主体 -->
			<div class="xiangmuxinxikuang">
				<uni-card>
					<view class="waice" style="height: 330rpx;">
						<div class="guahaoliushuihao" @click="isChecked">
							<checkbox :checked="checkAll" color="#007aff"
								style="margin-top: 6px;transform: scale(0.7);" />
							挂号流水号：{{ xiangmuxinxi.regNo }}
						</div>
						<div class="chufanghao">
							<div class="chufanghaonei">
								<div class="chufanghao1"><span>处方号：{{xiangmuxinxi.recipeNo}}</span></div>
								<div class="xiangmuming">
									<!-- 通过循环allmodelType数组渲染列表，这个数组中包含的是项目名称， -->
									<view class="duoxuan" v-for="model in allmodelType" :key="model" @click="isChecked"
										style="font-size: 13px;font-weight: 600;">
										<checkbox style="margin-top: 6px;transform: scale(0.7);" color="#007aff"
											:checked="checkAll" />
										{{model.itemName}}
									</view>
								</div>
							</div>
							<div class="xiangmujiner">
								<span>￥{{ xiangmuxinxi.totalCost|numFilter }}</span>
							</div>
						</div>
						<div class="hejijiner">
							<div class="zhanwei"></div>
							<div class="hesuanjiner">
								<span>合计：</span>
								<!-- 判断多选框是否被选择，如果被选择就进行渲染这个span -->
								<span v-if="checkAll==true"
									style="color: #ffa500">￥{{ xiangmuxinxi.totalCost|numFilter }}</span>
							</div>
						</div>
					</view>
				</uni-card>
			</div>
			<view class="anniu">
				<button type="primary" style="width: 100%;height: 100%;" @click="zhifu()">支 付</button>
				<!-- <zg-button type="primary" @click="zhifu()" class="weixin" block
					style="width: 100%;height: 100%;font-size: 18px;font-weight: 600;">
					支付
				</zg-button> -->
			</view>
			</div>
		</view>
	</view>
</template>

<script>
	// 引入vuex组件
	import store from "../../../store";
	// 引入scss组件
	import "./zhifu.scss";
	// 引入导航栏组件
	// import header from '@/components/header/header.vue'
	// 引入vuex辅助函数
	import {
		mapMutations,
		mapState
	} from "vuex";
	export default {
		// 调用头部组件
		components: {
			// header
		},
		computed: {
			// 计算属性，辅助函数mapState与mapGetters必须在computed计算属性中定义，因为他们是属性
			// 括号内必须是数组
			...mapState(["xiangmu", "yuyueriqi", "huanzhejibenxinxi"]),
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
			}
		},
		filters: {
			//保留两位小数的过滤器
			numFilter(value) {
				let realVal = "";
				if (!isNaN(value) && value !== "") {
					// 截取当前数据到小数点后两位
					realVal = parseFloat(value).toFixed(2);
				} else {
					realVal = "-";
				}
				return realVal;
			},
		},
		data() {
			return {
				title: "申请记录", // 页面标题
				shouye: "no", // 是否是首页，不是首页显示返回上一层箭头
				loading: true,

				//就诊人中的所有值
				showSwitchPatient: false, //切换就诊人的弹窗值，如果此值为true弹窗会打开
				currentPatient: {}, //data数组中索引位置为0的值
				switchPatientList: [], //data数组中所有的数据

				huanzhexinxi: {}, //存放患者信息的值
				xiangmuxinxi: {}, //存放项目信息的值
				guahaoxinxi: [], //存放挂号信息的值
				guahaoxiangqing: {}, //存放挂号信息详情的值

				//多选框中的所有值，勾选全选
				checkAll: true, //多选框双向绑定的值，多选框是否被选中
				allmodelType: [], //多选框内部的值，这里存放的是项目名称
			}
		},
		methods: {
			...mapMutations(["Add_huanzhejibenxinxi"]),

			// 加载框
			jiazai() {
				this.loading = true;
				// 定时器，setTimeout只执行一次，setInterval执行多次
				setTimeout(() => {
					this.loading = false;
					console.log(this.loading);
				}, 500)
			},

			// 就诊人中的全部方法
			//触发切换就诊人的弹窗
			switchPatient() {
				this.showSwitchPatient = true;
			},
			//就诊人信息的数据
			getPatientInfo() {
				
			},
			//切换就诊人，这个参数中包含就诊人信息
			onSwitchPatientBtn(item) {

			},
			// 添加就诊人
			addPatient() {},
			// 管理就诊人
			managePatient() {},

			// 跳转支付的方法
			zhifu() {
				let params = {
					deptId: '1009',
					deptName: '核酸检测门诊',
					doctorName: '',
					regLevelName: '简易门诊',
					doctorTitleId: '',
					patientName: this.huanzhexinxi.patientName,
					patientNo: this.huanzhexinxi.cardNumber,
					patientSeq: this.xiangmuxinxi.regNo,
					payMount: this.xiangmuxinxi.totalCost,
					recipeNos: [this.xiangmuxinxi.recipeNo],
					type: this.xiangmu.type,
					pay_type:'AL'
				}
				if (this.checkAll === true) {
					this.$myRequest({
						url: "/wechat/pay/out",
						data: params
					}).then(data => {
						if(data.code==0){
							my.tradePay({
							  // 调用统一收单交易创建接口（alipay.trade.create），获得返回字段支付宝交易号trade_no
							  tradeNO: data.data.tradeNO,
							  success: (res) => {
								  if (!res.resultCode == '9000') {
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
							      content: JSON.stringify(res),
							    });
							  }
							});
						}
					}).catch(err => {
						this.loading = false;
					})
					
				} else {
					uni.showToast({
						title: '请选择支付的项目！',
						icon: 'none',
						duration: 2000
					});
				}
			},

			// 全选的方法
			isChecked(e) {
				if (this.checkAll == true) {
					this.checkAll = false;
				} else {
					this.checkAll = true;
				}
			},
		},
		// 这是uni的生命周期
		onLoad(e) {
			this.data = JSON.parse(e.data);
			this.jiazai()
		},
		onShow() {
			this.jiazai()
		},
		mounted() {
			this.getPatientInfo();
			this.huanzhexinxi = this.huanzhejibenxinxi;
			this.xiangmuxinxi = this.data;
			this.allmodelType.push(this.data);
			console.log(this.huanzhexinxi)
			this.jiazai()
		},
	};
</script>

<style scoped>
	/* .header {
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
		line-height: 50rpx;
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

	.shouji {
		width: 20%;
		margin-top: 1px;
		margin-left: 8px;
	}

	.xiaceng {
		margin-top: 5px;
	}

	.xingming {
		width: 35%;
		/*超出部分就隐藏*/

		overflow: hidden;

		/*不换行设定*/

		white-space: nowrap;

		/*超出部分的文字显示省略号*/

		text-overflow: ellipsis;
	}

	.xingming>span {
		color: rgb(8, 8, 8);
		font-size: 16px;
		font-weight: bold;
	}

	.shouji>span {
		color: rgb(8, 8, 8);
		font-size: 16px;
		font-weight: bold;
	}

	.xiaceng>text {
		font-size: 12px;
		color: rgb(146, 146, 146);
		/* margin-left: 1px; */
	}

	.xiangmuxinxikuang {
		margin: 0px auto;
		width: 90%;
		/* margin-top: 40px;
		border-radius: 15px;
		height: 215px; */
		/* background-color: #fff; */
	}

	.xiangmuxinxikuang>>>.uni-card {
		margin: 0 !important;
		padding: 0 !important;
		/* background-color: salmon; */
	}

	.anniu {
		width: 65%;
		height: 50px;
		margin: 0 auto;
		margin-top: 30px;
		display: flex;
		/* background-color: aqua; */
	}

	.guahaoliushuihao {
		width: 100%;
		height: 25%;
		/* background-color: salmon; */
	}

	.chufanghao {
		width: 100%;
		height: 45%;
		display: flex;
		/* background-color: slateblue; */
	}

	.hejijiner {
		width: 100%;
		height: 28%;
		display: flex;
		/* background-color: aqua; */
	}

	.zhanwei {
		width: 50%;
		height: 50%;
	}

	.hesuanjiner {
		text-align: center;
		margin-top: 10px;
		width: 50%;
		height: 50%;
		line-height: 40px;
		/* background: seagreen; */
	}

	.guahaoliushuihao,
	.chufanghao {
		border-bottom: 1px solid #ccc;
	}

	.chufanghao1>span {
		font-size: 14px;
	}

	.xiangmuming>span {
		font-size: 14px;
	}

	.chufanghaonei {
		width: 80%;
		height: 100%;
		/* margin-left: 15px; */
		/* background:saddlebrown; */
	}

	.xiangmujiner {
		width: 20%;
		height: 100%;
		/* margin-right: 15px; */
		/* background-color: skyblue;   */
	}

	.chufanghao1 {
		margin-top: 10px;
	}

	.chufanghao1>span {
		margin-left: 20px;
	}

	.xiangmujiner>span {
		line-height: 101px;
		font-size: 14px;
		font-weight: 600;
	}
</style>
