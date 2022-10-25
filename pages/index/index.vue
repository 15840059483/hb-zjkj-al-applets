<template>
	<view>
		<!-- loading加载动画，type默认值是原子，love爱心，mask属性是遮罩 -->
		<zero-loading v-if="loading" type="pulse" mask></zero-loading>
		<!-- 使用悬浮球组件 -->
		<Levitation></Levitation>
		<!-- 使用组件的时候首字母要大写！！！！ -->
		<!-- 顶部导航栏 -->
		<!-- <view class="header" style="width: 100%;height: 150rpx;">
			<Header :title="title" :shouye="shouye"></Header>
		</view> -->
		<div style="padding: .2rem;">

			<uni-card shadow="never" v-if="dfltPatientInfo.cardNumber">
				<view class="jiuzhenren">
					<view :span="12" class="patient-name">
						<span>{{ dfltPatientInfo.patientName | processingName }}</span>
					</view>
					<view :span="12" class="change-patient-name">
						<button class="change-patient-name-btn" style="border-radius: 20px 20px;"
							@click="switchPatient">切换就诊人</button>
					</view>
				</view>
				<uni-row class="card-row">
					<view class="visit-number">就诊号：{{ dfltPatientInfo.cardNumber | processingcardNumber }}</view>
				</uni-row>
				<view class="card-row card-row-border">
					<view :span="8" @click.native="goToPage('/pages/registration-record/registration-record')">挂号记录
					</view>
					<view :span="8" class="border-l-r"
						@click.native="goToPage('/pages/payment-record/payment-record', true)">
						缴费记录</view>
					<view :span="8" @click.native="goToPage('/pages/barCodeAndQrCode/barCodeAndQrCode', true)">
						<image src="https://s1.ax1x.com/2022/09/02/vIr5tJ.png"
							style="width: 10px;height: 10px;margin-right: 3px;">
							就诊码
					</view>
				</view>
			</uni-card>

			<uni-card shadow="never" v-else>
				<uni-row class="card-row">
					<div v-if="isToken" class="patient-wrapper-button" @click="addCardNumber">请点击注册卡号</div>
					<div v-if="!isToken" class="patient-wrapper-button" @click="onAuthBtn">请点击注册用户信息</div>
					<!-- <div v-if="!isToken" class="patient-wrapper-button" @click="onAuthBtn">点击授权</div> -->
				</uni-row>
			</uni-card>

			<div class="image-container">
				<image src="https://s1.ax1x.com/2022/09/02/vImkjK.jpg">
			</div>

			<uni-card shadow="never">
				<view class="card-row">
					<view class="card-title">快速办理</view>
				</view>
				<view class="card-row fast-row" v-for="item in menuList" v-bind:key="item.id"
					@click.native="goToPage(item.routLink,item.meta)"
					style="border-bottom: 1px solid rgb(224, 224, 224);">
					<view :span="4" style="position: relative;">
						<image :src="item.imageUrl" class="menu-image">
							<image v-if="item.energy" class="menu_icon" src="https://s1.ax1x.com/2022/10/11/xt5C6g.png">
							</image>
					</view>
					<view style="width: 78%;margin-left: 7%;height: 40px;">
						<div class="menu-title">
							{{ item.menuName }}
						</div>
						<div class="menu-title2">{{ item.twoTitle }}</div>
					</view>
					<view :span="3">
						<text class="iconfont icon-xiangyou1"></text>
					</view>
				</view>
			</uni-card>

			<uni-card shadow="never" style="margin-bottom: 10px;">
				<view class="card-row">
					<view class="card-title">常用功能</view>
				</view>
				<view class="card-row" style="width: 100%;float: left;">
					<view>
						<view class="always-title" style="font-size: 14px;">门诊功能</view>
					</view>
					<view style="float: left;width: 100%;">
						<view style="width: 24%;margin-left:1%;float: left;" v-for="item in outpatientFunctionList"
							v-bind:key="item.id" @click.native="goToPage(item.routLink,item.meta)">
							<div class="always-icon">
								<image :src="item.imageUrl">
							</div>
							<div class="always-item-title">{{ item.menuName }}</div>
						</view>
					</view>
				</view>
				<view class="card-row" style="margin-top:10px;width: 100%;float: left;">
					<view>
						<view class="always-title" style="font-size: 14px;">住院功能</view>
					</view>
					<view style="float: left;width: 100%;">
						<view style="width: 24%;margin-left:1%;float: left;" :span="6"
							v-for="item in inpatientFunctionList" v-bind:key="item.id"
							@click.native="goToPage(item.routLink,item.meta)">
							<div class="always-icon">
								<image :src="item.imageUrl">
							</div>
							<div class="always-item-title">{{ item.menuName }}</div>
						</view>
					</view>
				</view>
			</uni-card>
		</div>

		<div v-if="showAddPatient" class="add-patient-bg">
			<div class="add-patient-container bg-white">
				<uni-row class="add-patient-title">
					<uni-col :span="12">绑定就诊卡号</uni-col>
					<uni-col :span="12" class="text-right">
						<i class="el-icon-close" @click="showAddPatient = false"></i>
					</uni-col>
				</uni-row>
				<uni-row class="add-patient-input">
					<uni-col :span="7">就诊卡号</uni-col>
					<uni-col :span="17">
						<el-input type="text" placeholder="请输入就诊卡号" v-model="cardNo"></el-input>
					</uni-col>
				</uni-row>
				<div class="confirm-btn">
					<button @click="addCard(0)">暂无卡号，立即注册</button>
					<!-- <button @click="addCard(1)">确认绑定</button> -->
				</div>
			</div>
		</div>

		<!-- 底部导航栏 -->
		<!-- <view class="dacizinavtag">
			<dacizinavtag :current=item_index></dacizinavtag>
		</view> -->
	</view>
</template>

<script>
	// 引入顶部导航栏组件
	//import header from '@/components/header/header.vue
	// 引入悬浮球组件
	import levitation from '@/components/levitation/levitation.vue'
	// 引入底部导航栏组件
	// import dacizinavtag from '../../components/dacizi-navtag/dacizi-navtag.vue'
	export default {
		// 注册使用导航栏组件
		components: {
			// header,
			// dacizinav	tag,
			levitation
		},
		data() {
			return {
				title: "致嘉测试", // 页面标题
				shouye: "yes", // 是否是首页，不是首页显示返回上一层箭头
				item_index: 0, // 单页面id
				dfltPatientInfo: {},
				menuList: [],
				outpatientFunctionList: [],
				inpatientFunctionList: [],
				showAddPatient: false,
				cardNo: '',
				loading: false, // 加载动画
				alUserInfo: {},
				isToken: true,
			}
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
		methods: {
			// 加载框
			jiazai() {
				this.loading = true;
				// 定时器，setTimeout只执行一次，setInterval执行多次
				setTimeout(() => {
					this.loading = false;
					//console.log(this.loading);
				}, 500)
			},

			getDfltPtCardInfo() {
				this.$myRequest({
					url: "/wechat/user/dfltPtCard/info",
				}).then(data => {
					this.dfltPatientInfo = data.data || {};
					this.loading = false;
				}).catch(err => {
					this.loading = false;
				})

			},

			addCardNumber() {
				console.log(this.dfltPatientInfo)
				if (this.dfltPatientInfo) {
					const params = Object.assign(this.dfltPatientInfo, {
						cardNo: ''
					})

					this.$myRequest({
						url: "/wechat/user/addPtCard/info",
						contentType: 'application/json;charset=UTF-8',
						data: params
					}).then(data => {
						this.getDfltPtCardInfo()
						this.showAddPatient = false
						uni.showToast({
							title: '绑定成功！',
							icon: 'none',
							duration: 2000
						});
						this.loading = false;
					}).catch(err => {
						this.loading = false;
					})
				} else {
					uni.navigateTo({
						url: '/pages/patient-management/add-patient/add-patient'
					})
				}
			},
			addCard(value) {
				if (value && !/^[A-Za-z0-9]{10}$/.test(this.cardNo)) {
					uni.showToast({
						title: '请输入正确的就诊卡号！',
						icon: 'none',
						duration: 2000
					});
					return
				}


			},
			switchPatient() {
				// this.goToPage('/select-patient');
				this.goToPage('/pages/patient-management/patient-management');
			},
			goToPage(url, meta) {
				if (!url) {
					uni.showToast({
						title: '该功能正在开发中！',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				//console.log(meta)
				if (true) {
					uni.navigateTo({
						url: url
					})
					return;
				}
				if (this.dfltPatientInfo.cardNumber) {
					if (!this.dfltPatientInfo.cardNumber) {
						this.cardNo = ''
						this.showAddPatient = true
					} else {
						// this.$router.push(url);
						uni.navigateTo({
							url: url
						})
					}
				} else {
					// uni.navigateTo({
					// 	url: 'addPatient'
					// })
				}
			},
			getHostMenu() {
				const params = {
					hospId: '1'
				};
				this.$api.indexService.getHospMenu(params)
					.then((data) => {
						const menuList = data.data;
						this.menuList = menuList.hospMenu.menu1;
						menuList.hospMenu.menu2.forEach(item => {
							if (item.menuType === '1') {
								this.outpatientFunctionList.push(item);
							} else {
								this.inpatientFunctionList.push(item);
							}
						})
					})
			},
			onAuthBtn() {

			},
		},
		created() {
			this.item_index = 0; // 单页面id
		},
		// 这是uni的生命周期
		onLoad() {
			// this.jiazai()
		},
		async onShow() {
			await this.$onLaunched
			// this.jiazai()
			this.getDfltPtCardInfo();
		},
		mounted() {
			// const item = JSON.parse(JSON.stringify(localStorage.getItem('selectPatient')));
			// console.log(item);
			// if (item) {
			//   this.patientName = item.name;
			//   this.visitNumber = item.visitNumber;
			//   localStorage.setItem('selectPatient', '');
			// }

			this.menuList = [{
					id: 1,
					menuName: '预约挂号',
					twoTitle: '实时查看医生情况',
					routerUrl: '',
					imageUrl: ('https://s1.ax1x.com/2022/09/02/vIm4v6.jpg'),
					routLink: '/pages/departmentList/departmentList',
					meta: true,
					energy: true,
				},
				{
					id: 2,
					menuName: '门诊缴费',
					twoTitle: '快速缴费不排队',
					routerUrl: '',
					imageUrl: ('https://s1.ax1x.com/2022/09/02/vIr711.jpg'),
					routLink: '/pages/outpatientPayment/outpatientPayment',
					meta: true
				},
				{
					id: 3,
					menuName: '住院缴费',
					twoTitle: '快速查询不排队',
					routerUrl: '',
					imageUrl: ('https://s1.ax1x.com/2022/09/02/vIrX7D.jpg'),
					routLink: '/pages/hospitalizationPayment/hospitalizationPayment',
					meta: false
				},
				// {
				//   id: 4,
				//   menuName: '住院缴费记录',
				//   twoTitle: '快速查询不排队',
				//   routerUrl: '',
				//   imageUrl: '../../static/rili.png',
				//   routLink: '/hospitalizationPaymentRecords'
				// },
				{
					id: 5,
					menuName: '报告查询',
					twoTitle: '线上预约节省时间',
					routerUrl: '',
					imageUrl: ('https://s1.ax1x.com/2022/09/02/vIrvAe.jpg'),
					routLink: '/pages/report-query/report-query2/report-query2',
					meta: false,
					energy: true,
				},
				/*{
					id: 6,
					menuName: '智能导诊',
					twoTitle: 'AI智能服务就医',
					routerUrl: '',
					imageUrl: ('https://s1.ax1x.com/2022/09/02/vIrO0O.jpg'),
					//routLink: '/departmentIntroduction'
					routLink: '/pages/huanzhe/huanzhe',
					// meta: false
				},*/
				// {
				//   id: 7,
				//   menuName: '个人中心-9',
				//   twoTitle: '即时推送排队情况',
				//   routerUrl: '',
				//   imageUrl: '../../static/rili.png',
				//   routLink: '/registerSuccess'
				// },
				// {
				//   id: 8,
				//   menuName: '个人中心',
				//   twoTitle: '个人中心',
				//   routerUrl: '',
				//   imageUrl: '../../static/rili.png',
				//   routLink: '/patient-management'
				// },
				// {
				//   id: 9,
				//   menuName: '办理住院',
				//   twoTitle: '办理住院',
				//   routerUrl: '',
				//   imageUrl: '../../static/rili.png',
				//   routLink: '/addResidents'
				// },
				/*{
					id: 10,
					menuName: '自助打印',
					twoTitle: '自助打印',
					routerUrl: '',
					imageUrl: ('https://s1.ax1x.com/2022/09/02/vIsAHS.png'),
					routLink: '/pages/self-service-printing/self-service-printing'
				},
				{
					id: 11,
					menuName: '满意度调查问卷',
					twoTitle: '满意度调查问卷',
					routerUrl: '',
					imageUrl: ('https://s1.ax1x.com/2022/09/02/vIsAHS.png'),
					routLink: '/pages/satisfaction/satisfaction'
				},
				{
					id: 12,
					menuName: '排队查询',
					twoTitle: '排队查询',
					routerUrl: '',
					imageUrl: ('https://s1.ax1x.com/2022/09/02/vIrbX6.png'),
					//routLink: '/queuingQuery'
					routLink: '',
					meta: true
				},
				{
					id: 13,
					menuName: '疫情调查问卷',
					twoTitle: '疫情调查问卷',
					routerUrl: '',
					imageUrl: ('https://s1.ax1x.com/2022/09/02/vIsAHS.png'),
					routLink: '/pages/survey-new-coupons/survey-new-coupons'
				},*/
				{
					id: 14,
					menuName: '核酸检测',
					twoTitle: '自助快速的挂号核酸检测',
					routerUrl: '',
					imageUrl: ('https://s1.ax1x.com/2022/09/02/vIsCct.png'),
					routLink: '/pages/hesuanjiance/Zizhukaidan/zizhukaidan'
				},
				/*{
					id: 15,
					menuName: '预约信息',
					twoTitle: '查看核酸检测挂号预约信息',
					routerUrl: '',
					imageUrl: ('https://s1.ax1x.com/2022/09/02/vIsp9A.jpg'),
					routLink: '/pages/hesuanjiance/Shenhejieguo/shenhejieguo'
				},*/
				// {
				// 	id: 16,
				// 	menuName: '流程图',
				// 	twoTitle: '查看流程图',
				// 	routerUrl: '',
				// 	imageUrl: ('https://s1.ax1x.com/2022/09/02/vIsp9A.jpg'),
				// 	routLink: '/pages/liuchengtu/liuchengtu'
				// },
			]

			this.outpatientFunctionList = [
				/*{
					id: 1,
					menuName: '添加就诊人',
					twoTitle: '',
					routerUrl: '',
					imageUrl: ('https://s1.ax1x.com/2022/09/02/vIrH6x.jpg'),
					//routLink: '/addPatient',
					routLink: '',
					meta: true
				},*/
				{
					id: 2,
					menuName: '挂号记录',
					twoTitle: '快速缴费不排队',
					routerUrl: '',
					imageUrl: ('https://s1.ax1x.com/2022/09/02/vIrLnK.jpg'),
					routLink: '/pages/registration-record/registration-record',
					meta: true
				},
				{
					id: 5,
					menuName: '门诊缴费记录',
					twoTitle: '快速缴费不排队',
					routerUrl: '',
					imageUrl: ('https://s1.ax1x.com/2022/09/02/vIrxtH.jpg'),
					routLink: '/pages/outPatientQueryFeeList/queryOutFeeList',
					meta: true
				},
			]

			this.inpatientFunctionList = [
				// {
				// 	id: 3,
				// 	menuName: '住院缴费',
				// 	twoTitle: '快速查询不排队',
				// 	routerUrl: '',
				// 	imageUrl: ('https://s1.ax1x.com/2022/09/02/vIrzhd.jpg'),
				// 	//routLink: '/hospitalizationPayment',
				// 	routLink: '',
				// 	meta: false
				// },
				/*{
					id: 4,
					menuName: '预约住院',
					twoTitle: '快速查询不排队',
					routerUrl: '',
					imageUrl: ('https://s1.ax1x.com/2022/09/02/vIskB8.jpg'),
					//routLink: '/hospSubscribeHome',
					routLink: '',
					meta: false
				},
				{
					id: 7,
					menuName: '预约住院记录',
					twoTitle: '快速查询不排队',
					routerUrl: '',
					imageUrl: ('https://s1.ax1x.com/2022/09/02/vIs91I.jpg'),
					// routLink: '/hospSubscribeRecord',
					routLink: '',
					meta: false
				},*/
				{
					id: 8,
					menuName: '住院缴费记录',
					twoTitle: '快速查询不排队',
					routerUrl: '',
					imageUrl: ('https://s1.ax1x.com/2022/09/02/vIsAHS.png'),
					routLink: '/pages/hospitalizationPayment/hospitalization-payment-records/hospitalization-payment-records',
					meta: false
				},
				/*{
					id: 6,
					menuName: '住院一日清',
					twoTitle: 'AI智能服务就医',
					routerUrl: '',
					imageUrl: ('https://s1.ax1x.com/2022/09/02/vIsCct.png'),
					routLink: '',
					meta: false
				},*/
			]

			// .js
			// this.getHostMenu();
			// this.getDfltPtCardInfo();
			// this.jiazai();
		}
	}
</script>


<style scoped>
	.image-container {
		border-radius: 4px;
		overflow: hidden;
		margin-bottom: .5rem;
		height: 200rpx;
		width: 90%;
		margin: 0 auto;
	}

	.image-container image {
		width: 100%;
		height: 100%;
		vertical-align: middle;

	}

	.uni-card {
		margin-bottom: .5rem;
	}

	.card-row {
		padding: .2rem 0;
		text-align: left;
	}

	.patient-wrapper-button {
		width: 6rem;
		margin: 0 auto;
		border-radius: 5px;
		border: 1px solid #008cfe;
		color: #008cfe;
		font-size: .35rem;
		text-align: center;
		padding: .3rem 0;
		letter-spacing: 1px;
	}

	.el-message-box {
		position: absolute;
		width: 90%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.patient-name {
		text-align: left;
		color: rgb(8, 8, 8);
		display: flex;
		font-size: 16px;
		font-weight: bold;
		align-items: center;
		width: 65%;
	}

	.jiuzhenren {
		display: flex;
	}

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

	.visit-number {
		text-align: left;
		font-size: 12px;
		color: rgb(146, 146, 146);
	}

	.card-row-border {
		display: flex;
		border-top: 1px solid rgb(224, 224, 224);
		color: rgb(63, 63, 63);
		text-align: center;
	}

	.card-row-border>view {
		width: 33%;
	}

	.border-l-r {
		border-left: 1px solid rgb(224, 224, 224);
		border-right: 1px solid rgb(224, 224, 224);
	}

	.card-title {
		font-size: 20px;
		font-weight: bold;
	}

	.fast-row {
		padding: .2rem 0;
		display: flex;
		align-items: center;
	}

	.fast-row:not(:last-child) {
		border-bottom: 1px solid rgb(224, 224, 224);
	}

	.menu-image {
		width: 25px;
		height: 25px;
		margin-top: 5px;
		margin-left: 50%;
		transform: translate(-50%, 0);
	}

	.menu_icon {
		position: absolute;
		top: -.2rem;
		right: -80%;
		width: .7rem;
		height: .3rem;
	}

	.menu-title {
		font-weight: 500;
		font-size: 16px;
		margin-bottom: .1rem;
		display: flex;
		align-items: center;
	}

	.menu-title2 {
		font-size: 10px;
		color: rgb(146, 146, 146);
	}

	.menu-icon {
		font-size: .7rem;
	}

	.always-title {
		font-size: .4rem;
		border-left: 2px solid rgb(0, 142, 254);
		padding-left: .2rem;
	}

	.always-icon {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		overflow: hidden;
		/*border: 2px solid rgb(0, 142, 254);*/
		display: flex;
		align-items: center;
		justify-content: space-around;
		margin: .3rem auto;
	}

	.always-icon image {
		width: 100%;
		height: 100%;
	}

	.always-item-title {
		font-size: 10px;
		font-weight: bold;
		text-align: center;
	}
</style>
