<template>
	<view>
		<!-- loading加载动画，type默认值是原子，love爱心，mask属性是遮罩 -->
		<zero-loading v-if="loading" type="pulse" mask></zero-loading>
		<!-- 使用组件的时候首字母要大写！！！！ -->
		<!-- <view class="header" style="width: 100%;height: 150rpx;">
			<Header :title="title" :shouye="shouye"></Header>
		</view> -->
		<view class="zhuti">
			<!-- 搜索框 -->
			<!-- <view class="input-view"> -->
			<!-- 搜索框 -->
			<!-- <div class="sousuo">
					<mSearch @search="search($event,0)" button="inside"></mSearch>
				</div> -->
			<!-- </view> -->

			<!-- 预约检查时间的弹出框，设置点击空白不会退出 is_mask="true" maskFun="false"，无关闭按钮 is_close="false" -->
			<pop ref="popo" direction="center" :is_close="false" :is_mask="true" :width="80" height="fit-content"
				:maskFun="false">
				<view class="biaoti">
					预约检查/检验时间
				</view>
				<!-- 选择预约的日期 -->
				<view class="riqi" style="border-top: 1px solid rgb(212, 212, 212);">
					<view class="data-container">
						<!-- 展示当前时间的年月日 -->
						<uni-row style="padding: 0.3rem 0.5rem;" class="bg-white">
							<view :span="10" class="data-change-btn" style="margin:5px 0 5px 0;">
								<view style="color: rgb(145, 145, 145)">
									{{
				              today.getFullYear() +
				              "-" +
				              (today.getMonth() + 1) +
				              "-" +
				              today.getDate()
				            }}
								</view>
							</view>
						</uni-row>
						<!-- 日历内部框 -->

						<view v-show="isShowDate" class="bg-white">
							<!-- 星期，展示当前日期是星期几以及今天后的6天 -->
							<uni-row type="flex" justify="space-around">
								<view v-for="week in weeks" v-bind:key="week" class="text-center date-week">
									{{ week }}
								</view>
							</uni-row>
							<uni-row type="flex" justify="space-around">
								<view v-for="(day, index) in days" v-bind:key="day.day" class="text-center"
									style=" width: 14.2%;height: 100%;">
									<view :class="selectDay == day.day ? 'select-date' : ''" class="date-day"
										@click="onSelectDayBtn(day, index)">
										<view style="line-height: 70rpx;">{{ day.day }}</view>
									</view>
								</view>
							</uni-row>
						</view>

					</view>
				</view>

				<!-- 剩余号数 -->
				<view class="yuhao">
					<view class="yuehaoshijian"><span>全天</span></view>
					<view class="shengyuhao"><span></span></view>
					<view class="yuhaoanniu">
						<radio checked color="#409EFF" style="transform: scale(0.7);"></radio>
					</view>
				</view>
				<view class="zizhuanniuanniu">
					<view class="wai">
						<view class="quxiao">
							<view style="font-size: 16px;font-weight: 800;" @click="quxiao()">取消</view>
						</view>
						<view class="queren">
							<view style="color: rgb(0, 147, 255);font-size: 16px;font-weight: 800;" @click="guanbi2()">
								确定
							</view>
						</view>
					</view>
				</view>
			</pop>

			<!-- 线上(手机)开单告知书弹出框，设置点击空白不会退出 is_mask="true" maskFun="false"，无关闭按钮 is_close="false"-->
			<pop ref="pop" direction="center" :is_close="false" :is_mask="true" :width="80" height="fit-content"
				:maskFun="false">
				<view class="biaoti">
					线上(手机)开单告知书
				</view>
				<view class="neirong-wai">
					<view class="neirong">
						1.核酸项目预约成功且审核后可在线直接缴费
					</view>
					<view class="neirong">
						2.采集点分布
					</view>
					<view class="neirong">住院患者及陪护家属，到*号楼*层*侧采样点进行核酸采集</view>
					<view class="neirong">其他人员，到*号楼*层*侧采样点进行核酸采集</view>
					<view class="neirong">3.核酸采样后,6~12小时可以查看检测结果,具体时间请详见采样点公示或支付宝小程序进行查询。</view>
					<view style="padding-bottom: 10px;" class="neirong">4.可以通过自助机打印或支付宝小程序查看报告结果</view>
				</view>
				<view class="zizhuanniu">
					<view @click="guanbi()">同意并阅读</view>
				</view>
			</pop>

			<view class="qiehuan">
				<!-- 切换检验或检查的状态 -->
				<view class="jianyan-shang">
					<view :class="gaibian == true ? 'jianyan' : 'jianyan-none'" @click="gai()">
						<p class="jianyan-p">检验</p>
					</view>
					<view :class="gaibian == false ? 'jiancha-none' : 'jiancha '" @click="gai2()">
						<p class="jiancha-p">检查</p>
					</view>
				</view>
				<radio-group>
					<!-- 通过循环jianyanxiangmu数组渲染view，循环的主键是jianyanxiangmu中的name属性 -->
					<view v-for="item in jianyanxiangmu" v-bind:key="item.name">
						<!-- 设置判断，如果gaibian的值为真，渲染这个view ，
			         如果这个view进行渲染，就让其带有点击事件，事件中的参数为jianyanxiangmu数组-->
						<view class="jianyan-xia-1" v-if="gaibian == true" @click="ceshi(item)">
							<view class="jianyan-xia-1-1">
								<p>{{ item.name }}</p>
								<!-- 使用过滤器 -->
								<span class="jianyan-xia-1-1-span">￥{{ item.jiner|numFilter }}</span><span>/次</span>
							</view>
							<view class="jianyan-xia-1-2">
								<!-- checked 默认选项，这里用了三目运算，如果choose_a中的name等于item（循环数据）中的name就让其为默认选中 -->
								<radio :checked="choose_a.name===item.name?true:false" value="item" @click="ceshi(item)"
									color="#409EFF" style="transform: scale(0.7);" />
							</view>
						</view>
					</view>
				</radio-group>
				<!-- 设置判断，如果gaibian的值为假，渲染这个view -->
				<view class="jianyan-xia-2" v-if="gaibian == false"></view>

				<view class="anniu">
					<button type="primary" style="width: 100%;height: 100%;" @click="tiaozhuan()">确 定</button>
					<!-- <zg-button type="primary" @click="tiaozhuan()" class="weixin" block
						style="width: 100%;height: 100%;font-size: 18px;font-weight: 600;">
						确定
					</zg-button> -->
				</view>
			</view>
		</view>
	</view>
	</view>
	</view>
</template>

<script>
	// 引入导航栏组件
	// import header from '@/components/header/header.vue'
	// 引入弹窗组件
	import pop from "@/components/ming-pop/ming-pop.vue";
	// 引入vuex辅助函数
	import {
		mapMutations,
	} from "vuex";
	// 引入scss组件
	import "./zizhukaidan.scss";
	// 引入搜索栏组件
	import mSearch from '@/components/mehaotian-search/mehaotian-search.vue';
	export default {
		// 注册使用导航栏组件，弹窗组件
		components: {
			// header,
			pop,
			mSearch
		},
		filters: {
			//保留两位小数的过滤器
			numFilter(value) {
				let realVal = ''
				if (!isNaN(value) && value !== '') {
					// 截取当前数据到小数点后两位
					realVal = parseFloat(value).toFixed(2)
				} else {
					realVal = '-'
				}
				return realVal
			}
		},
		data() {
			return {
				title: "自助开单", // 页面标题
				shouye: "no", // 是否是首页，不是首页显示返回上一层箭头
				loading: true,

				yuhaoanniu: "", //约号按钮的值
				choose_a: "", //element单选按钮双向绑定的值，这个值中包含项目信息，包括项目名称，项目金额
				yuyueriqi: "", //预约的日期
				dialogVisible: false, //线上(手机)开单告知书的弹出框双向绑定的值，当这个值变为true的时候弹出框打开
				searchText: "", //搜索框双向绑定的值
				gaibian: true, //检验与检查的改变初始值
				dialogVisible2: false, //预约检查时间的弹出框双向绑定的值，当这个值变为true的时候弹出框打开

				//预约日期中日历功能的所有值
				isShowDate: true,
				today: new Date(),
				selectDay: 0,
				selectDayInfo: {},
				selectDayIndex: 0,
				weeks: [],
				days: [],

				//检验项目的信息
				jianyanxiangmu: [{
						name: "新型冠状病毒核酸检测（单检）",
						jiner: 16.00,
						type: 1
					},
					{
						name: "新型冠状病毒核酸检测（混检）",
						jiner: 3.20,
						type: 2
					},
				],
			}
		},

		methods: {
			// 使用辅助函数，辅助函数mapMutations与mapActions必须在methods中定义，因为他们是方法
			// 括号内必须是数组
			...mapMutations(["Add_xiangmuxinxi", "Add_yuyueriqi"]),

			// 加载框
			jiazai() {
				this.loading = true;
				// 定时器，setTimeout只执行一次，setInterval执行多次
				setTimeout(() => {
					this.loading = false;
					console.log(this.loading);
				}, 500)
			},

			//搜索栏调用的组件方法
			search(e, val) {
				console.log(e, val);
				this['val' + val] = e
			},

			// 关闭弹窗自助开单弹窗，打开选择日期弹窗
			guanbi() {
				this.$refs.pop.close();
				this.$refs.popo.show();
			},

			// 关闭选择日期弹窗
			guanbi2() {
				this.$refs.popo.close();
			},

			/* 
				//加载动画的方法
				jiazai() {
					let loadingInstance = Loading.service({});
					loadingInstance.close();
				 this.dialogVisible2 = false
				},
			*/
			// 取消的方法，触发就会返回首页
			quxiao() {
				this.$refs.popo.close();
				// this.$router.push("/index");
				uni.reLaunch({
					url: "/pages/index/index"
				})
			},
			// 确定挂号的方法，触发会跳转到/tijiaoshenhe页面
			tiaozhuan() {
				this.Add_xiangmuxinxi(this.choose_a)
				// this.$router.push("/tijiaoshenhe");
				// setTimeout(() => {
					uni.navigateTo({
						url: '/pages/hesuanjiance/Tijiaoshenqing/tijiaoshenqing'
					});
				// }, 500)
				// 通过vuex中的xiangmuxinxi方法，将choose_a中的值传到vuex中，这个值中包含项目信息
				// store.commit("xiangmuxinxi", this.choose_a);

			},
			//切换就诊项目的方法，这参数包含切换的项目信息
			ceshi(name) {
				//  让choose_a的值等于参数name
				this.choose_a = name;
				//console.log(this.choose_a);
			},
			//选择预约项目的首选项
			shouxuan() {
				//  让choose_a的值等于jianyanxiangmu数组索引位置0中的项目信息
				this.choose_a = this.jianyanxiangmu[0];
				//console.log(this.choose_a);
			},
			// 切换弹出框的方法，触发此方法线上（手机）开单告知书的弹窗会关闭，预约检查的弹出会开启
			qiehuan() {
				this.dialogVisible = false;
				this.dialogVisible2 = true;
			},
			//改变选择检验还是检查的状态
			gai() {
				this.gaibian = true;
				// this.jiazai();
			},
			//改变选择检验还是检查的状态
			gai2() {
				uni.showToast({
					title: '暂不可以预约检查哟！QAQ',
					icon: 'none',
					duration: 2000
				});
				return;
				this.gaibian = false;
				// this.jiazai()
			},

			//预约日期中日历功能的所有方法
			getDetDoctorInfo() {
				this.doctors = [];
				this.testDay =
					this.today.getFullYear() +
					"-" +
					(this.today.getMonth() < 10 ?
						"0" + (this.today.getMonth() + 1) :
						this.today.getMonth() + 1) +
					"-" +
					this.selectDay;
				const params = {
					beginDay: this.selectDayInfo.year +
						"-" +
						(this.selectDayInfo.month < 10 ?
							"0" + this.selectDayInfo.month :
							this.selectDayInfo.month) +
						"-" +
						this.selectDayInfo.day,
					// deptId: this.$route.query.id,
				};
				this.Add_yuyueriqi(params)
				// store.commit("yuyueriqi", params);
				console.log(params);
			},
			onSelectDayBtn(day, index) {
				uni.showToast({
					title: '暂不可预约哟！QAQ',
					icon: 'none',
					duration: 2000
				});
				return
				if ((this.selectDay = this.today.getDay())) {
					this.showSwitchPatient = true;
				} else {
					false;
				}
				this.selectDay = day.day;
				this.selectDayInfo = day;
				this.selectDayIndex = index;
				this.getDetDoctorInfo();
			},
			getDays(day, month) {
				let currentDay = day;

				for (let i = 0; i < 7; i++) {
					let date = new Date();
					date.setDate(date.getDate() + i);
					let info = {
						day: date.getDate(),
						month: date.getMonth() + 1,
						year: date.getFullYear(),
					};
					this.days.push(info);
					this.selectDay = this.days[0].day;
					this.selectDayInfo = this.days[0];
					console.log(date.getDate());
				}
			},
			getWeeks(week) {
				let currentWeek = week;
				for (let i = 0; i < 7; i++) {
					this.weeks.push(this.processingWeekDisplay(currentWeek));
					currentWeek++;
					if (currentWeek === 8) {
						currentWeek = 1;
					}
				}
			},
			// 星期方法
			processingWeekDisplay(num) {
				switch (num) {
					case 1:
						return "一";
					case 2:
						return "二";
					case 3:
						return "三";
					case 4:
						return "四";
					case 5:
						return "五";
					case 6:
						return "六";
					case 7:
						return "日";
				}
			},
		},
		// 这是uni的生命周期
		onLoad() {
			this.jiazai()
		},
		onShow() {
			this.jiazai()
		},
		mounted() {
			// 让一加载页面就将法线上（手机）开单告知书的弹窗开启
			// this.dialogVisible = true;
			this.$refs.pop.show();
			//加载页面就会执行预约日期中日历功能的所有方法
			this.getDays(this.today.getDate(), this.today.getMonth());
			this.getWeeks(this.today.getDay());
			this.getDetDoctorInfo();
			//加载页面就会执行选择预约项目的首选项
			this.shouxuan();
			this.jiazai()
		},
	}
</script>

<style scoped>
	/* .header {
		position: fixed;
		top: 0;
		z-index: 999;
	} */

	/* .zhuti {
		margin-top: 160rpx;
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

	.neirong {
		margin-top: 5px;
	}

	.zizhuanniu {
		color: rgb(0, 147, 255);
		padding: 0;
		margin-top: 10px;
		text-align: center;
		width: 100%;
		font-size: 16px;
		font-weight: 800;
	}

	.jianyan-p,
	.jiancha-p {
		width: 50px;
		height: 20px;
		line-height: 40px;
		margin: 0 auto;
	}

	.jiancha-none {
		border-left: 0.5px solid #ccc;
		border-bottom: 1px solid #409eff;
		color: #409eff;
	}

	.jianyan-none {
		border-bottom: 1px solid #ccc;
	}

	.jianyan {
		border-bottom: 1px solid #409eff;
		color: #409eff;
	}

	.jiancha {
		border-left: 0.5px solid #ccc;
		border-bottom: 1px solid #ccc;
	}

	.jianyan-xia-1-1>p {
		margin: 0;
		margin-top: 10px;
		font-size: 14px;
		margin-left: 25px;
	}

	.jianyan-xia-1-1-span {
		color: #ffa500;
		font-size: 18;
		margin-top: 10px;
		margin-left: 20px;
	}

	.jianyan-xia-1-2 {
		width: 20%;
		height: 30px;
		/* background-color: sandybrown; */
		margin-top: 25px;
		margin-left: 10px;
	}

	.anniu {
		width: 65%;
		height: 50px;
		margin: 0 auto;
		margin-top: 30px;
		display: flex;
		/* background-color: aqua; */
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

	.yuhao {
		width: 100%;
		height: 100px;
		display: flex;
		/* background-color: aqua;  */
		border-top: 1px solid rgb(212, 212, 212);
		border-bottom: 1px solid rgb(212, 212, 212);
	}

	.yuehaoshijian>span,
	.shengyuhao>span {
		font-weight: 500;
		font-size: 14px;
		/* margin-left: 25px; */
	}

	.shengyuhao>span {
		margin-left: 0;
	}

	.yuehaoshijian,
	.shengyuhao {
		margin-top: 10px;
		/* margin-left: 25px; */
	}

	.yuehaoshijian {
		width: 20%;
	}

	.shengyuha {
		width: 30%;
	}

	.shengyuhao {
		width: 60%;
	}

	.yuhaoanniu {
		width: 10%;
		margin-top: 10px;
		/* margin-left: 20px; */
	}

	.el-radio__label {
		padding: 0;
	}

	.yuehaoshijian {
		margin-left: 15px;
	}

	.shengyuhao {
		margin-left: 5px;
	}

	.input-view {
		padding: .3rem;
	}

	.el-input__inner {
		color: #b4b4b4;
	}

	.el-icon-search:before {
		color: rgb(58, 167, 255);
		font-weight: 600;
		font-size: 18px;
		/* margin-right: px; */
	}

	.qiehuan {
		width: 100%;
		height: 119px;
		background-color: #fff;
	}
</style>
