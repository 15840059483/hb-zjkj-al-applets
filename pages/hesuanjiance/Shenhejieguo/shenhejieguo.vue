<template>
	<view>
		<!-- loading加载动画，type默认值是原子，love爱心，mask属性是遮罩 -->
		<zero-loading v-if="loading" type="pulse" mask=true></zero-loading>
		<!-- 使用组件的时候首字母要大写！！！！ -->
		<!-- 	<view class="header" style="width: 100%;height: 150rpx;">
			<Header :title="title" :shouye="shouye"></Header>
		</view> -->
		<view class="zhuti">
			<uni-card class="xianzhi">
				<!-- 就诊人信息，如果huanzhexinxi中的患者姓名为空渲染这个div -->
				<div class="bg-white card-container" v-if="huanzhexinxi.name == null">
					<div style="display: flex; width: 100%;">
						<div class="shangceng">
							<div class="xingming">
								<span>{{ processingName(currentPatient.name) }}</span>
							</div>
							<div class="shouji">
								<span>{{ processingcardNumber(currentPatient.shouji)}}</span>
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
							<text>{{ currentPatient.sex }}</text>
							<text style="margin-left:5px;">/</text>
							<text style="margin-left:5px;">{{ currentPatient.age }}岁</text>
							<text style="margin-left:5px;">身份证：{{ processingcardNumber(currentPatient.shenfenID) }}</text>
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
								<span>{{ processingName(huanzhexinxi.name)}}</span>
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
							<text>{{ huanzhexinxi.sex }}</text>
							<text style="margin-left:5px;">/</text>
							<text style="margin-left:5px;">{{ huanzhexinxi.age }}岁</text>
							<text style="margin-left:5px;">身份证：{{ processingcardNumber(huanzhexinxi.shenfenID) }}</text>
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
			<uni-card>
				<div class="buju">
					<div class="quanbu" @click="quanbu()">
						<div class="beijing1"></div>
						<div class="wenzi1">
							<span class="ziti" :class="zitiyangshi1 == true ? 'lanseziti' : 'huiseziti'">全部</span>
						</div>
					</div>
					<div class="shenhezhong" @click="shenhezhong()">
						<div class="beijing2"></div>
						<div class="wenzi2">
							<span class="ziti" :class="zitiyangshi2 == true ? 'lanseziti' : 'huiseziti'">审核中</span>
						</div>
					</div>
					<div class="shenhetongguo" @click="shenhetongguo()">
						<div class="beijing3"></div>
						<div class="wenzi3">
							<span class="ziti" :class="zitiyangshi3 == true ? 'lanseziti' : 'huiseziti'">审核通过</span>
						</div>
					</div>
					<div class="shenheshibai" @click="shenheshibai()">
						<div class="beijing4"></div>
						<div class="wenzi4">
							<span class="ziti" :class="zitiyangshi4 == true ? 'lanseziti' : 'huiseziti'">审核失败</span>
						</div>
					</div>
				</div>
			</uni-card>
			<!-- 渲染shenhejieguo数组内所有信息，不进行过滤 -->
			<div v-if="zitiyangshi1 == true" style="margin-top: 20px">
				<!-- 通过shenhejieguo数组进行循环渲染 -->
				<div class="shenhejieguo" v-for="item in shenhejieguo" v-bind:key="item.id">
					<div class="zuo">
						<div class="shenheyisheng">
							<span>审核医生：{{ item.yisheng }}</span>
						</div>
						<div class="shenqingxiangmu">
							<span>申请项目：{{ item.xiangmu }}</span>
						</div>
						<div class="shenqingshijian">
							<span>申请时间：{{ item.shijian }}</span>
						</div>
					</div>
					<div class="you">
						<div class="shenhezhuangtaiwenzi">
							<!-- 通过v-bind动态绑定字体颜色属性 -->
							<span :style="{ color: color(item.zhuangtai)}">{{ item.zhuangtai }}<text
									class="iconfont icon-xiangyou1"></text></span>
						</div>
					</div>
				</div>
			</div>
			<!-- 渲染shenhejieguo数组内审核中的信息，进行过滤审核结果为审核中的信息 -->
			<div v-if="zitiyangshi2 == true" style="margin-top: 20px">
				<!-- 通过过滤后的qiehuanshenhezhong数组进行循环渲染 -->
				<div class="shenhejieguo" v-for="item in qiehuanshenhezhong" v-bind:key="item.id">
					<div class="zuo">
						<div class="shenheyisheng">
							<span>审核医生：{{ item.yisheng }}</span>
						</div>
						<div class="shenqingxiangmu">
							<span>申请项目：{{ item.xiangmu }}</span>
						</div>
						<div class="shenqingshijian">
							<span>申请时间：{{ item.shijian }}</span>
						</div>
					</div>
					<div class="you">
						<div class="shenhezhuangtaiwenzi">
							<!-- 通过v-bind动态绑定字体颜色属性 -->
							<span :style="{ color: color(item.zhuangtai)}">{{ item.zhuangtai }}<text
									class="iconfont icon-xiangyou1"></text></span>
						</div>
					</div>
				</div>
			</div>
			<!-- 渲染shenhejieguo数组内审核通过的信息，进行过滤审核结果为审核通过的信息 -->
			<div v-if="zitiyangshi3 == true" style="margin-top: 20px">
				<!-- 通过过滤后的qiehuanshenhetongguo数组进行循环渲染 -->
				<div class="shenhejieguo" v-for="item in qiehuanshenhetongguo" v-bind:key="item.id">
					<div class="zuo">
						<div class="shenheyisheng">
							<span>审核医生：{{ item.yisheng }}</span>
						</div>
						<div class="shenqingxiangmu">
							<span>申请项目：{{ item.xiangmu }}</span>
						</div>
						<div class="shenqingshijian">
							<span>申请时间：{{ item.shijian }}</span>
						</div>
					</div>
					<div class="you">
						<div class="shenhezhuangtaiwenzi">
							<!-- 通过v-bind动态绑定字体颜色属性 -->
							<span :style="{ color: color(item.zhuangtai)}">{{ item.zhuangtai }}<text
									class="iconfont icon-xiangyou1"></text></span>
						</div>
					</div>
				</div>
			</div>
			<!-- 渲染shenhejieguo数组内审核失败的信息，进行过滤审核结果为审核失败的信息 -->
			<div v-if="zitiyangshi4 == true" style="margin-top: 20px">
				<!-- 通过过滤后的qiehuanshenheshibai数组进行循环渲染 -->
				<div class="shenhejieguo" v-for="item in qiehuanshenheshibai" v-bind:key="item.id">
					<div class="zuo">
						<div class="shenheyisheng">
							<span>审核医生：{{ item.yisheng }}</span>
						</div>
						<div class="shenqingxiangmu">
							<span>申请项目：{{ item.xiangmu }}</span>
						</div>
						<div class="shenqingshijian">
							<span>申请时间：{{ item.shijian }}</span>
						</div>
					</div>
					<div class="you">
						<div class="shenhezhuangtaiwenzi">
							<!-- 通过v-bind动态绑定字体颜色属性 -->
							<span :style="{ color: color(item.zhuangtai)}">{{ item.zhuangtai }}<text
									class="iconfont icon-xiangyou1"></text></span>
						</div>
					</div>
				</div>
			</div>
		</view>
	</view>
</template>

<script>
	// 引入vuex组件
	import store from "../../../store";
	// 引入scss组件
	import "./shenhejieguo.scss";
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
		// 计算属性
		computed: {
			// 计算属性，辅助函数mapState与mapGetters必须在computed计算属性中定义，因为他们是属性
			// 括号内必须是数组
			...mapState(["xiangmu", "yuyueriqi", "huanzhejibenxinxi"]),
			qiehuanshenhezhong() {
				return this.shenhejieguo.filter(function(shenhejieguo) {
					//只返回审核结果中的审核状态为审核中的
					return shenhejieguo.zhuangtai === "审核中";
				});
			},
			qiehuanshenhetongguo() {
				return this.shenhejieguo.filter(function(shenhejieguo) {
					//只返回审核结果中的审核状态为审核通过的
					return shenhejieguo.zhuangtai === "审核通过";
				});
			},
			qiehuanshenheshibai() {
				return this.shenhejieguo.filter(function(shenhejieguo) {
					//只返回审核结果中的审核状态为审核失败的
					return shenhejieguo.zhuangtai === "审核失败";
				});
			},
			// 审核状态字体颜色的计算属性
			color() {
				// 传值必须以这种方式，否则报错
				return function(val) {
					console.log(val)
					let color = "";
					if (val == '审核通过') {
						color = 'RGB(133,206,97)';
					} else if (val == '审核中') {
						color = 'RGB(64,158,255)';
					} else if (val == '审核失败') {
						color = 'RGB(245,108,108)';
					}
					// 返回下列形式
					return color;
				};
			},
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
		data() {
			return {
				title: "提交审核", // 页面标题
				shouye: "no", // 是否是首页，不是首页显示返回上一层箭头
				loading: true,

				//就诊人中的所有值
				showSwitchPatient: false, //切换就诊人的弹窗值，如果此值为true弹窗会打开
				currentPatient: {}, //data数组中索引位置为0的值
				switchPatientList: [], //data数组中所有的数据

				huanzhexinxi: {}, //存放患者信息的值

				//切换审核状态
				zitiyangshi1: false, //审核状态为全部
				zitiyangshi2: false, //审核状态为审核中
				zitiyangshi3: false, //审核状态为通过
				zitiyangshi4: false, //审核状态为失败


				//项目信息以及审核状态
				shenhejieguo: [{
						id: 1,
						yisheng: "便民门诊",
						xiangmu: "新型冠状病毒核酸检测（单人）",
						shijian: "2020-07-06 20:09:10",
						zhuangtai: "审核通过",
					},
					{
						id: 2,
						yisheng: "便民门诊",
						xiangmu: "新型冠状病毒核酸检测（团体）",
						shijian: "2020-07-06 20:10:00",
						zhuangtai: "审核通过",
					},
					{
						id: 3,
						yisheng: "便民门诊",
						xiangmu: "新型冠状病毒核酸检测（团体）",
						shijian: "2020-07-06 20:21:10",
						zhuangtai: "审核中",
					},
					{
						id: 4,
						yisheng: "便民门诊",
						xiangmu: "血常规",
						shijian: "2020-07-06 20:20:13",
						zhuangtai: "审核失败",
					},
					{
						id: 5,
						yisheng: "便民门诊",
						xiangmu: "尿常规",
						shijian: "2020-07-06 20:20:13",
						zhuangtai: "审核中",
					},
					{
						id: 6,
						yisheng: "便民门诊",
						xiangmu: "血常规",
						shijian: "2020-07-06 20:20:13",
						zhuangtai: "审核通过",
					},
				],
			}
		},
		methods: {
			// ...mapMutations(["Add_huanzhejibenxinxi"]),

			// 加载框
			jiazai() {
				this.loading = true;
				// 定时器，setTimeout只执行一次，setInterval执行多次
				setTimeout(() => {
					this.loading = false;
					console.log(this.loading);
				}, 500)
			},

			// 切换状态为全部
			quanbu() {
				this.zitiyangshi1 = true;
				this.zitiyangshi2 = false;
				this.zitiyangshi3 = false;
				this.zitiyangshi4 = false;
			},
			// 切换状态为审核中
			shenhezhong() {
				this.zitiyangshi1 = false;
				this.zitiyangshi2 = true;
				this.zitiyangshi3 = false;
				this.zitiyangshi4 = false;
			},
			// 切换状态为审核通过
			shenhetongguo() {
				this.zitiyangshi1 = false;
				this.zitiyangshi2 = false;
				this.zitiyangshi3 = true;
				this.zitiyangshi4 = false;
			},
			// 切换状态为审核失败
			shenheshibai() {
				this.zitiyangshi1 = false;
				this.zitiyangshi2 = false;
				this.zitiyangshi3 = false;
				this.zitiyangshi4 = true;
			},

			// 就诊人中的全部方法
			//触发切换就诊人的弹窗
			switchPatient() {
				this.showSwitchPatient = true;
			},
			//就诊人信息的数据
			getPatientInfo() {
				let _this = this;
				let data = [{
						name: "张春花",
						shouji: '11111111111',
						sex: "女",
						age: 28,
						shenfenID: "11111111111111111X",
					},
					{
						name: "胡尔西代姆·阿卜拉",
						shouji: '17614245415',
						sex: "女",
						age: 22,
						shenfenID: "22222222222222222X",
					},
					{
						name: "测试同学2",
						shouji: '33333333333',
						sex: "女",
						age: 20,
						shenfenID: "210111111111",
					},
				];
				_this.switchPatientList = data;
				// 让currentPatient等于数组data中索引位置为0的信息
				_this.currentPatient = data[0];
			},
			//切换就诊人，这个参数中包含就诊人信息
			onSwitchPatientBtn(item) {
				this.currentPatient = item;
				// 通过vuex中的huanzhejibenxinxi方法，将参数item中的值传到vuex中，这个值中包含就诊人信息
				// store.commit("huanzhejibenxinxi", item);
				// this.Add_huanzhejibenxinxi(item);
				// 让huanzhexinxi等于就诊人信息
				this.huanzhexinxi = item;
				console.log(this.huanzhejibenxinxi);
			},
			// 添加就诊人
			addPatient() {},
			// 管理就诊人
			managePatient() {},
		},
		// 这是uni的生命周期
		onLoad() {
			this.jiazai()
		},
		onShow() {
			this.jiazai()
		},
		mounted() {
			//页面进行渲染后执行这两个方法
			this.getPatientInfo();
			// 页面进行渲染后将vuex中huanzhejibenxinxi赋给huanzhexinxi
			this.huanzhexinxi = this.huanzhejibenxinxi;
			// 页面进行渲染后将vuex中xiangmu赋给xiangmuxinxi
			this.xiangmuxinxi = this.xiangmu;
			//页面进行渲染后自动展示状态为全部的信息
			this.zitiyangshi1 = true;
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
	}
 */
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

	.jibenxinxi {
		width: 70%;
	}

	.qiehuananniu {
		width: 30%;
		text-align: right;
		line-height: 50px;
	}

	.shouji {
		width: 20%;
		margin-top: 1px;
		margin-left: 8px;
	}

	.xiaceng {
		margin-top: 5px;
	}

	.xingming>span {
		font-size: 16px;
		font-weight: 600;
	}

	.shouji>span {
		font-size: 16px;
		font-weight: 600;
	}

	.xiaceng>span {
		font-size: 14px;
		color: rgb(163, 163, 163);
	}

	.shenhezhuangtai {
		margin-top: 20px;
		width: 100%;
		height: 75px;
		display: flex;
		background-color: #fff;
	}

	.beijing1,
	.beijing2,
	.beijing3,
	.beijing4 {
		width: 35px;
		height: 35px;
		/* margin-top: 10px; */
		margin: 10px auto;
		/* margin-left: 15%; */
		/* background-color: saddlebrown; */
	}

	.buju {
		/* text-align: center; */
		/* margin: 0 auto; */
		display: flex;
		width: 100%;
		height: 100%;
	}

	.quanbu {
		width: 25%;
	}

	.shenhezhong {
		width: 25%;
	}

	.shenhetongguo {
		width: 25%;
	}

	.shenheshibai {
		width: 25%;
	}



	.beijing1 {
		background-size: 100% 100%;
		background-image: url(https://s1.ax1x.com/2022/09/02/vIrX7D.jpg);
	}

	.beijing2 {
		background-size: 100% 100%;
		background-image: url(https://s1.ax1x.com/2022/09/02/vIrH6x.jpg);
	}

	.beijing3 {
		background-size: 100% 100%;
		background-image: url(https://s1.ax1x.com/2022/09/02/vIrLnK.jpg);
	}

	.beijing4 {
		background-size: 100% 100%;
		background-image: url(https://s1.ax1x.com/2022/09/02/vIsCct.png);
	}

	.ziti {
		font-size: 14px;
	}

	.wenzi1,
	.wenzi2,
	.wenzi3,
	.wenzi4 {
		margin-top: 5px;
		text-align: center;
		/* width: 70px;
		height: 20%; */
		/* text-align: center; */
	}

	.lanseziti {
		font-weight: 600;
		color: rgb(81, 172, 247);
	}

	.huiseziti {
		font-weight: 600;
		color: #ccc;
	}

	.shenhejieguo {
		width: 100%;
		/* font-weight: 600; */
		height: 150px;
		background-color: #fff;
		/* margin-top: 20px; */
		border-top: 1px solid #ccc;
		border-bottom: 0.5px solid #ccc;
		display: flex;
	}

	.zuo {
		width: 75%;
		height: 100%;
		/* background-color: seagreen; */
	}

	.you {
		width: 25%;
		text-align: center;
		height: 100%;
		/* background: salmon; */
	}

	.shenhezhuangtaiwenzi {
		width: 100%;
		height: 20%;
		/* background: salmon; */
		/* margin-left: 5px;  */
		line-height: 48px;
		margin-top: 50px;
	}

	.shenheyisheng,
	.shenqingxiangmu,
	.shenqingshijian {
		width: 96%;
		height: 20%;
		/* background-color: seagreen; */
		/* text-align: center;  */
		margin-left: 10px;
		line-height: 30px;
		margin-top: 15px;
		font-size: 14px;
	}

	.wenzi1 {
		/* margin-left: 9px; */
		line-height: 18px;
	}

	.wenzi2 {
		/* margin-left: 19px; */
		line-height: 18px;
	}

	.wenzi3 {
		/* margin-left: 13px; */
		/* text-align: center; */
		line-height: 18px;
	}

	.wenzi4 {
		/* margin-left: 13px; */
		line-height: 18px;
	}
</style>
