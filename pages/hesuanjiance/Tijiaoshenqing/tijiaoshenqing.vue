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
				<!-- 就诊人信息，如果ceshi中的患者姓名为空渲染这个div -->
				<div class="bg-white card-container" v-if="ceshi.name == null">
					<div style="display: flex; width: 100%;">
						<div class="shangceng">
							<div class="xingming">
								<span>{{ processingName(currentPatient.patientName) }}</span>
							</div>
							<div class="shouji">
								<span>{{ processingcardNumber(currentPatient.cardNumber) }}</span>
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
							<text>{{ currentPatient.patientSex }}</text>
							<text style="margin-left:5px;">/</text>
							<!-- <text style="margin-left:5px;">{{ currentPatient.age }}岁</text> -->
							<text style="margin-left:5px;">身份证：{{ processingcardID(currentPatient.patientCardId) }}</text>
						</div>
					</div>
					<!-- <div class="qiehuananniu">
						<button class="change-patient-name-btn" @click="switchPatient">
							切换就诊人
						</button>
					</div> -->
				</div>
				<!-- 就诊人信息，如果ceshi中的患者姓名不为空渲染这个div -->
				<div class="bg-white card-container" v-else>
					<div style="display: flex; width: 100%;">
						<div class="shangceng">
							<div class="xingming">
								<span>{{ processingName(ceshi.name) }}</span>
							</div>
							<div class="shouji">
								<span>{{ processingcardNumber(ceshi.shouji) }}</span>
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
							<text>{{ ceshi.sex }}</text>
							<text style="margin-left:5px;">/</text>
							<text style="margin-left:5px;">{{ ceshi.age }}岁</text>
							<text style="margin-left:5px;">身份证：{{ processingcardID(ceshi.shenfenID) }}</text>
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
				<!-- 如果如果ceshi中的患者姓名为空渲染这个div -->
				<div class="switch-patient-container bg-white" v-if="ceshi.name == null">
					<div class="switch-patient-title text-center border-bottom">
						切换就诊人
						<!-- <i class="el-icon-error" @click="showSwitchPatient = false"></i> -->
						<text class="iconfont icon-guanbi" @click="showSwitchPatient = false"></text>
					</div>
					<div class="border-bottom switch-patient-list" v-for="(item, index) in switchPatientList"
						v-bind:key="index" @click="onSwitchPatientBtn(item)">
						<div class="patient-name">{{processingName(item.patientName)  }}</div>
						<div class="visit-number" style="font-size: 14px;color: rgb(146, 146, 146);">
							身份证：{{ processingcardID(item.patientCardId )}}</div>
						<!-- <i class="el-icon-check" v-if="currentPatient.shenfenID === item.shenfenID"
							style="color: #008cfe"></i> -->
						<text class="iconfont icon-duihao" v-if="currentPatient.patientCardId === item.patientCardId"
							style="color: #008cfe"></text>
					</div>

					<view style="display: flex;padding: 10px 0;">
						<view style="width: 50%;" class="switch-patient-btn switch-patient-btn-l"
							@click.native="addPatient">
							添加就诊人</view>
						<view style="width: 50%;" class="switch-patient-btn" @click.native="managePatient">管理就诊人</view>
					</view>
				</div>

				<!-- 如果如果ceshi中的患者姓名不为空渲染这个div -->
				<div class="switch-patient-container bg-white" v-else>
					<div class="switch-patient-title text-center border-bottom">
						切换就诊人
						<!-- <i class="el-icon-error" @click="showSwitchPatient = false"></i> -->
						<text class="iconfont icon-guanbi" @click="showSwitchPatient = false"></text>
					</div>
					<div class="border-bottom switch-patient-list" v-for="item in switchPatientList"
						v-bind:key="item.cardId" @click="onSwitchPatientBtn(item)">
						<div class="patient-name">{{processingName(item.patientName)  }}</div>
						<div class="visit-number" style="font-size: 14px;color: rgb(146, 146, 146);">
							身份证：{{ processingcardID(item.shenfenID) }}</div>
						<!-- <i class="el-icon-check" v-if="ceshi.shenfenID === item.shenfenID" style="color: #008cfe"></i> -->
						<text class="iconfont icon-duihao" v-if="ceshi.shenfenID === item.shenfenID"
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
					<div class="xiangmu">
						<div class="zhong">
							<div class="zuo">
								<div class="biaoti">
									<div class="beijing"></div>
									<div class="wenzi">
										<span>检验</span>
									</div>
								</div>
								<div class="xiangmuname">
									<span>{{ xiangmuxinxi.name }}</span>
								</div>
								<div class="yuyueshijian">
									<span> 预约时间：{{ yuyueriqi.beginDay }} </span>
								</div>
							</div>
							<div class="you">
								<div class="jiner" style="color: #ffa500; line-height: 30px">
									<span style="font-size: 16px">￥{{ xiangmuxinxi.jiner | numFilter }}</span>
								</div>
								<div class="jiner" style="height: 20%; margin-top: 10px">
									<span style="font-size: 16px">￥{{ xiangmuxinxi.jiner | numFilter }}</span>
								</div>
								<div class="quedingshijian" style="font-size: 14px; text-align: center">
									<span> 全天 </span>
								</div>
							</div>
						</div>
					</div>
					<div class="hejijiner">
						<div class="zhanwei"></div>
						<div class="hesuanjiner">
							<span>合计：</span>
							<span style="color: #ffa500">￥{{ xiangmuxinxi.jiner | numFilter }}</span>
						</div>
					</div>
				</uni-card>
				<!-- <div class="anniu">
					<el-button type="primary" @click="tijiao()">确认提交</el-button>
				</div> -->
				<view class="anniu">
					<button type="primary" style="width: 100%;height: 100%;" @click="tijiao()">确认提交</button>
					<!-- 
						# 该样式以作废 预留
						<zg-button type="primary" @click="tijiao()" class="weixin" block
						style="width: 100%;height: 100%;font-size: 18px;font-weight: 600;">
						确认提交
						</zg-button> 
					-->
				</view>
			</div>
		</view>
	</view>
</template>

<script>
	// 引入vuex组件
	import store from "../../../store";
	// 引入scss组件
	import "./tijiaoshenqing.scss";
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
			},
			processingcardID(str) {
				return function(str) {
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
				}	
			},	
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
				title: "提交审核", // 页面标题
				shouye: "no", // 是否是首页，不是首页显示返回上一层箭头
				loading: true,

				xiangmuxinxi: {}, //存放项目信息的值
				yuyueriqi1: "", //存放预约日期的值

				//就诊人中的所有值
				showSwitchPatient: false, //切换就诊人的弹窗值，如果此值为true弹窗会打开
				currentPatient: {}, //data数组中索引位置为0的值
				switchPatientList: [], //data数组中所有的数据
				ceshi: {}, //存放患者信息的值
			}
		},
		methods: {
			...mapMutations(["Add_huanzhejibenxinxi"]),
			// 确认项目信息与就诊人的信息后触发方法跳转到支付页面
			tijiao() {
				let params = {
					patientNo:this.currentPatient.cardNumber,
					patientName:this.currentPatient.patientName,
					dateBegin:this.yuyueriqi.beginDay + ' 00:00:00',
					dateEnd:this.yuyueriqi1.beginDay + ' 23:59:59',
					type: this.xiangmu.type,
				};
				this.$myRequest({
					url: "/nat/reg",
					data: params
				}).then(data => {
					if(data.code==200){
						uni.navigateTo({
							url: '/pages/hesuanjiance/Zhifu/zhifu?data='+encodeURIComponent(JSON.stringify(data.data))
						});
					}
				}).catch(err => {
					this.loading = false;
				})

			},

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
				let _this = this;
				this.$myRequest({
					url: "/wechat/user/patientcard/info",
				}).then(data => {
					_this.switchPatientList = data.data;
					// 让currentPatient等于数组data中索引位置为0的信息
					_this.currentPatient = data.data[0];
					this.Add_huanzhejibenxinxi(_this.currentPatient);
					this.loading = false;
				}).catch(err => {
					this.loading = false;
				})
			},
			//切换就诊人，这个参数中包含就诊人信息
			onSwitchPatientBtn(item) {
				console.log('this.currentPatient', this.currentPatient)
				console.log('item', item)
				if (this.currentPatient.cardNumber === item.cardNumber) return
				this.currentPatient = item;
				// 通过vuex中的huanzhejibenxinxi方法，将参数item中的值传到vuex中，这个值中包含就诊人信息
				// store.commit("huanzhejibenxinxi", item);
				this.Add_huanzhejibenxinxi(item);
				// 让ceshi等于就诊人信息
				this.ceshi = item;
				console.log(item);
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
		},
		onLoad() {
			// 页面进行渲染后将vuex中xiangmu赋给xiangmuxinxi
			this.xiangmuxinxi = this.xiangmu;
			// 页面进行渲染后将vuex中yuyueriqi赋给yuyueriqi1
			this.yuyueriqi1 = this.yuyueriqi;
			// 页面进行渲染后将vuex中huanzhejibenxinxi赋给ceshi
			this.ceshi = this.huanzhejibenxinxi;
			//页面进行渲染后执行这两个方法
			this.getPatientInfo();
			console.log("刷新了")
			this.jiazai()
		},
		onShow() {
			// 页面进行渲染后将vuex中xiangmu赋给xiangmuxinxi
			this.xiangmuxinxi = this.xiangmu;
			// 页面进行渲染后将vuex中yuyueriqi赋给yuyueriqi1
			this.yuyueriqi1 = this.yuyueriqi;
			// 页面进行渲染后将vuex中huanzhejibenxinxi赋给ceshi
			this.ceshi = this.huanzhejibenxinxi;
			//页面进行渲染后执行这两个方法
			this.getPatientInfo();
			console.log("刷新了")
			this.jiazai()
		}
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

	.change-patient-name {
		text-align: right;
		width: 35%;
		height: 50rpx;
	}

	.change-patient-name-btn {
		width: 100%;
		height: 50rpx;
		font-size: 20rpx;
		line-height: 50rpx;
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

	.xiangmu {
		width: 100%;
		display: flex;
		height: 270rpx;
		border-bottom: 1px solid #ccc;
	}

	.hejijiner {
		width: 100%;
		height: 20%;
		display: flex;
	}

	.zhong {
		width: 100%;
		height: 100%;
		/* background-color: lawngreen; */
		margin: 0 auto;
		display: flex;
		/* margin-top: 20px; */
	}

	.zuo {
		width: 78%;
		height: 100%;
		/* text-align: center; */
		/* background-color: saddlebrown; */
	}

	.you {
		width: 22%;
		height: 100%;
		text-align: center;
		/* background-color: aquamarine; */
	}

	.biaoti,
	.jiner {
		height: 30%;
		text-align: center;
		/* margin-top: 5px; */
		/* background-color: khaki; */
	}

	.xiangmuname {
		height: 20%;
		margin-top: 5px;
	}

	.yuyueshijian,
	.quedingshijian {
		height: 25%;
		margin-top: 5px;
		/* background-color: navy; */
	}

	.biaoti {
		display: flex;
	}

	.wenzi {
		/* margin-top: 10px; */
		margin-left: 10px;
	}

	.wenzi>span {
		line-height: 30px;
		font-size: 14px;
		font-weight: 600;
	}

	.beijing {
		/* margin-top: 10px;
  margin-left: 10px; */
		width: 30px;
		height: 30px;
		background-size: 100% 100%;
		background-image: url(https://s1.ax1x.com/2022/09/09/vqqia6.jpg);
	}

	.yuyueshijian>span {
		text-align: left;
		font-size: 14px;
		margin-left: 10px;
	}

	.xiangmuname>span {
		/* line-height: 50px; */
		text-align: left;
		margin-left: 10px;
		font-size: 14px;
	}

	.zhanwei {
		width: 50%;
		height: 50%;
	}

	.hesuanjiner {
		text-align: center;
		margin-top: 20px;
		width: 50%;
		height: 50%;
		/* background: seagreen; */
	}

	.xiangmuname {
		margin-top: 10px;
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
</style>
