<template>
	<view class="huanzhe">
		<!-- loading加载动画，type默认值是原子，love爱心，mask属性是遮罩 -->
		<zero-loading v-if="loading" type="pulse" mask=true></zero-loading>
		<!-- 使用组件的时候首字母要大写！！！！ -->
		<!-- <view class="header" style="width: 100%;height: 150rpx;">
			<Header :title="title" :shouye="shouye"></Header>
		</view> -->
		<div class="sousuoqiehaun" style="margin-top: 20rpx;">
			<!-- 搜索框 -->
			<div class="sousuo">
				<mSearch @search="search($event,0)" button="inside"></mSearch>
			</div>
		</div>
		<!-- 改变选中效果 -->
		<div class="qiehuan">
			<div :class="qiehuanzhuangtai == false ? 'zuolan' : 'zuohui'" @click="qiehuan()">
				<div class="rentitu"><span>人体图</span></div>
			</div>
			<div :class="qiehuanzhuangtai == true ? 'youlan' : 'youhui'" @click="qiehuan2()">
				<div class="zhengzhuang"><span>症状列表</span></div>
			</div>
		</div>
		</div>
		<div class="demo-collapse" v-if="qiehuanzhuangtai == true">
		</div>

		<!-- 蓝色网格线条背景  -->
		<div class="grid_line" v-if="qiehuanzhuangtai == false">
			<!-- 转身按钮 -->
			<div class="zhuanshenwai">
				<div class="zhuanshen" @click="zhuanshen()"></div>
			</div>
			<!-- 根据if条件切换显示的人体图状态 -->
			<div class="beijing-nan-zheng"
				style="background-image: url(https://s1.ax1x.com/2022/09/01/v5dFr4.png);background-size: 100% 100%;"
				v-if="xingbie === '男' && zhuangtai === '正'">
				<div class="toubu">
					<div class="toubu_1"></div>
					<div class="toubu_2" @click="toubu"></div>
					<div class="toubu_3"></div>
				</div>
				<!-- 颈部框架 -->
				<div class="jingbu">
					<div class="jingbu_1"></div>
					<div class="jingbu_2" @click="jingbu"></div>
					<div class="jingbu_3"></div>
				</div>
				<!-- 肩膀以及胸部 -->
				<div class="jianbangxiongbu">
					<div class="kong"></div>
					<div class="zuojian" @click="jianbang"></div>
					<div class="xiongbu" @click="xiongbu"></div>
					<div class="youjian" @click="jianbang"></div>
					<div class="kong"></div>
				</div>
				<!-- 躯干框架 -->
				<div class="qugan">
					<div class="zuobi" @click="gebo"></div>
					<div class="shenti">
						<div class="fubu" @click="fubu"></div>
						<div class="xiabu" @click="xiabu"></div>
					</div>
					<div class="youbi" @click="gebo"></div>
				</div>
				<!-- 腿部框架 -->
				<div class="tuibu">
					<div class="zuotui" @click="tuibu"></div>
					<div class="youtui" @click="tuibu"></div>
				</div>
			</div>
			<div class="beijing-nan-bei" style="background-image: url(https://s1.ax1x.com/2022/09/01/v5aObj.png);
		background-size: 100% 100%;" v-if="xingbie === '男' && zhuangtai === '背'">
				<div class="toubu">
					<div class="toubu_1"></div>
					<div class="toubu_2" @click="toubu"></div>
					<div class="toubu_3"></div>
				</div>
				<!-- 颈部框架 -->
				<div class="jingbu">
					<div class="jingbu_1"></div>
					<div class="jingbu_2" @click="jingbu"></div>
					<div class="jingbu_3"></div>
				</div>
				<!-- 肩膀以及胸部 -->
				<div class="jianbangxiongbu">
					<div class="kong"></div>
					<div class="zuojian" @click="jianbang"></div>
					<div class="xiongbu" @click="beibu"></div>
					<div class="youjian" @click="jianbang"></div>
					<div class="kong"></div>
				</div>
				<!-- 躯干框架 -->
				<div class="qugan">
					<div class="zuobi" @click="gebo"></div>
					<div class="shenti">
						<div class="fubu" @click="beibu"></div>
						<div class="xiabu" @click="tunbu"></div>
					</div>
					<div class="youbi" @click="gebo"></div>
				</div>
				<!-- 腿部框架 -->
				<div class="tuibu">
					<div class="zuotui" @click="tuibu"></div>
					<div class="youtui" @click="tuibu"></div>
				</div>
			</div>
			<div class="beijing-nv-zheng" style="background-image: url(https://s1.ax1x.com/2022/09/01/v5dToR.png);
		background-size: 100% 100%;" v-if="xingbie === '女' && zhuangtai === '正'">
				<div class="toubu-nv">
					<div class="toubu-nv_1"></div>
					<div class="toubu-nv_2" @click="toubu"></div>
					<div class="toubu-nv_3"></div>
				</div>
				<!-- 颈部框架 -->
				<div class="jingbu-nv">
					<div class="jingbu-nv_1"></div>
					<div class="jingbu-nv_2" @click="jingbu"></div>
					<div class="jingbu-nv_3"></div>
				</div>
				<!-- 肩膀以及胸部 -->
				<div class="jianbangxiongbu-nv">
					<div class="kong-nv"></div>
					<div class="zuojian-nv" @click="jianbang"></div>
					<div class="xiongbu-nv" @click="xiongbu"></div>
					<div class="youjian-nv" @click="jianbang"></div>
					<div class="kong-nv"></div>
				</div>
				<!-- 躯干框架 -->
				<div class="qugan-nv">
					<div class="zuobi-nv" @click="gebo"></div>
					<div class="shenti-nv">
						<div class="fubu-nv" @click="fubu"></div>
						<div class="xiabu-nv" @click="xiabu"></div>
					</div>
					<div class="youbi-nv" @click="gebo"></div>
				</div>
				<!-- 腿部框架 -->
				<div class="tuibu-nv">
					<div class="zuotui-nv" @click="tuibu"></div>
					<div class="youtui-nv" @click="tuibu"></div>
				</div>
			</div>
			<div class="beijing-nv-bei" style="background-image: url(https://s1.ax1x.com/2022/09/01/v5dOSK.png);
		background-size: 100% 100%;" v-if="xingbie === '女' && zhuangtai === '背'">
				<div class="toubu-nv">
					<div class="toubu-nv_1"></div>
					<div class="toubu-nv_2" @click="toubu"></div>
					<div class="toubu-nv_3"></div>
				</div>
				<!-- 颈部框架 -->
				<div class="jingbu-nv">
					<div class="jingbu-nv_1"></div>
					<div class="jingbu-nv_2" @click="jingbu"></div>
					<div class="jingbu-nv_3"></div>
				</div>
				<!-- 肩膀以及胸部 -->
				<div class="jianbangxiongbu-nv">
					<div class="kong-nv"></div>
					<div class="zuojian-nv" @click="jianbang"></div>
					<div class="xiongbu-nv" @click="beibu"></div>
					<div class="youjian-nv" @click="jianbang"></div>
					<div class="kong-nv"></div>
				</div>
				<!-- 躯干框架 -->
				<div class="qugan-nv">
					<div class="zuobi-nv" @click="gebo"></div>
					<div class="shenti-nv">
						<div class="fubu-nv" @click="beibu"></div>
						<div class="xiabu-nv" @click="tunbu"></div>
					</div>
					<div class="youbi-nv" @click="gebo"></div>
				</div>
				<!-- 腿部框架 -->
				<div class="tuibu-nv">
					<div class="zuotui-nv" @click="tuibu"></div>
					<div class="youtui-nv" @click="tuibu"></div>
				</div>
			</div>
			<div class="beijing-tong-zheng" v-if="xingbie === '童' && zhuangtai === '正'">
				<div class="toubu-tong">
					<div class="toubu-tong_1"></div>
					<div class="toubu-tong_2" @click="toubu"></div>
					<div class="toubu-tong_3"></div>
				</div>
				<!-- 颈部框架 -->
				<div class="jingbu-tong">
					<div class="jingbu-tong_1"></div>
					<div class="jingbu-tong_2" @click="jingbu"></div>
					<div class="jingbu-tong_3"></div>
				</div>
				<!-- 肩膀以及胸部 -->
				<div class="jianbangxiongbu-tong">
					<div class="kong-tong"></div>
					<div class="zuojian-tong" @click="jianbang"></div>
					<div class="xiongbu-tong" @click="xiongbu"></div>
					<div class="youjian-tong" @click="jianbang"></div>
					<div class="kong-tong"></div>
				</div>
				<!-- 躯干框架 -->
				<div class="qugan-tong">
					<div class="zuobi-tong" @click="gebo"></div>
					<div class="shenti-tong">
						<div class="fubu-tong" @click="fubu"></div>
						<div class="xiabu-tong" @click="xiabu"></div>
					</div>
					<div class="youbi-tong" @click="gebo"></div>
				</div>
				<!-- 腿部框架 -->
				<div class="tuibu-tong">
					<div class="zuotui-tong" @click="tuibu"></div>
					<div class="youtui-tong" @click="tuibu"></div>
				</div>
			</div>
			<div class="beijing-tong-bei" v-if="xingbie === '童' && zhuangtai === '背'">
				<div class="toubu-tong">
					<div class="toubu-tong_1"></div>
					<div class="toubu-tong_2" @click="toubu"></div>
					<div class="toubu-tong_3"></div>
				</div>
				<!-- 颈部框架 -->
				<div class="jingbu-tong">
					<div class="jingbu-tong_1"></div>
					<div class="jingbu-tong_2" @click="jingbu"></div>
					<div class="jingbu-tong_3"></div>
				</div>
				<!-- 肩膀以及胸部 -->
				<div class="jianbangxiongbu-tong">
					<div class="kong-tong"></div>
					<div class="zuojian-tong" @click="jianbang"></div>
					<div class="xiongbu-tong" @click="beibu"></div>
					<div class="youjian-tong" @click="jianbang"></div>
					<div class="kong-tong"></div>
				</div>
				<!-- 躯干框架 -->
				<div class="qugan-tong">
					<div class="zuobi-tong" @click="gebo"></div>
					<div class="shenti-tong">
						<div class="fubu-tong" @click="beibu"></div>
						<div class="xiabu-tong" @click="tunbu"></div>
					</div>
					<div class="youbi-tong" @click="gebo"></div>
				</div>
				<!-- 腿部框架 -->
				<div class="tuibu-tong">
					<div class="zuotui-tong" @click="tuibu"></div>
					<div class="youtui-tong" @click="tuibu"></div>
				</div>
			</div>
			<!-- 切换就诊人选择的性别 -->
			<div class="qiehuanxingbiewai">
				<div class="nan" @click="zhuangtaiqiehuannan()"></div>
				<div class="nv" @click="zhuangtaiqiehuannv()"></div>
				<div class="tong" @click="zhuangtaiqiehuantong()"></div>
			</div>
		</div>
		</div>
	</view>
</template>

<script>
	// 引入导航栏组件
	// import header from '@/components/header/header.vue'
	// 引入搜索栏组件
	import mSearch from '@/components/mehaotian-search/mehaotian-search.vue';
	export default {
		// 注册使用导航栏组件
		components: {
			// header,
			mSearch
		},
		data() {
			return {
				title: "智能导诊", // 页面标题
				shouye: "no", // 是否是首页，不是首页显示返回上一层箭头
				loading: true,

				qiehuanzhuangtai: false, //切换性别儿童的状态
				xingbie: "男", //性别
				zhuangtai: "正", //状态
				zhengzhuangliebiao: [], // 症状列表

			}
		},
		methods: {
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
				this.sousuo(e);
			},
			// 利用正则表达式判断搜索框中输入的症状是属于什么科室
			sousuo(val) {
				var groupName = val;
				var toubu = RegExp(/(?=头|鼻|嘴|眼|发|耳|唇|脸|脑|烧|热)/);
				var jingbu = RegExp(/(?=脖|喉|气管|咽|颈)/);
				var jianbang = RegExp(/(?=肩|膀)/);
				var xiongbu = RegExp(/(?=胸|乳|心)/);
				var gebo = RegExp(/(?=胳膊|臂|手|肘|指|腕|掌)/);
				var fubu = RegExp(/(?=肚|肝|脾|肺|肾|肠|肋骨|拉肚|便秘|腹|胃|膀胱)/);
				var xiabu = RegExp(/(?=下|阴)/);
				var tuibu = RegExp(/(?=腿|膝|脚|足|崴)/);
				var beibu = RegExp(/(?=背)/);
				var tunbu = RegExp(/(?=屁股|臀|肛)/);
				var pifu = RegExp(/(?=皮|肤|疹|斑)/);
				var ertong = RegExp(/(?=儿|孩)/);
				if (toubu.exec(groupName) != null) {
					this.toubu();
				} else if (jingbu.exec(groupName) != null) {
					this.jingbu();
				} else if (jianbang.exec(groupName) != null) {
					this.jianbang();
				} else if (xiongbu.exec(groupName) != null) {
					this.xiongbu();
				} else if (gebo.exec(groupName) != null) {
					this.gebo();
				} else if (fubu.exec(groupName) != null) {
					this.fubu();
				} else if (xiabu.exec(groupName) != null) {
					this.xiabu();
				} else if (tuibu.exec(groupName) != null) {
					this.tuibu();
				} else if (beibu.exec(groupName) != null) {
					this.beibu();
				} else if (tunbu.exec(groupName) != null) {
					this.tunbu();
				} else if (pifu.exec(groupName) != null) {
					this.pifu();
				} else if (ertong.exec(groupName) != null) {
					this.ertong();
				} else {
					uni.showToast({
						title: '未检测到您输入的症状',
						icon: 'none',
						duration: 2000
					});
				}
			},
			// 根据点击的部位跳转到对应的推荐科室
			toubu() {
				uni.navigateTo({
					url: '/pages/huanzhe/symptom/toubu/toubukeshi'
				});
				console.log("头部");
			},
			jingbu() {
				uni.navigateTo({
					url: '/pages/huanzhe/symptom/jingbu/jingbu'
				});
				console.log("这是颈部");
			},
			jianbang() {
				uni.navigateTo({
					url: '/pages/huanzhe/symptom/jianbang/jianbang'
				});
				console.log("这是肩膀");
			},
			xiongbu() {
				uni.navigateTo({
					url: '/pages/huanzhe/symptom/xiongbu/xiongbu'
				});
				console.log("这是胸部");
			},
			gebo() {
				uni.navigateTo({
					url: '/pages/huanzhe/symptom/gebo/gebo'
				});
				console.log("这是胳膊");
			},
			fubu() {
				uni.navigateTo({
					url: '/pages/huanzhe/symptom/fubu/fubu'
				});
				console.log("这是腹部");
			},
			xiabu() {
				uni.navigateTo({
					url: '/pages/huanzhe/symptom/xiabu/xiabu'
				});
				console.log("这是下部");
			},
			tuibu() {
				uni.navigateTo({
					url: '/pages/huanzhe/symptom/tuibu/tuibu'
				});
				console.log("这是腿部");
			},
			beibu() {
				uni.navigateTo({
					url: '/pages/huanzhe/symptom/beibu/beibu'
				});
				console.log("这是背部");
			},
			tunbu() {
				uni.navigateTo({
					url: '/pages/huanzhe/symptom/tunbu/tunbu'
				});
				console.log("这是臀部");
			},
			pifu() {

			},
			ertong() {

			},
			// 判断转身规则的方法
			zhuanshen() {
				if (this.xingbie === "男") {
					if (this.zhuangtai === "正") {
						this.zhuangtai = "背";
					} else {
						this.zhuangtai = "正";
					}
				} else if (this.xingbie === "女") {
					if (this.zhuangtai === "正") {
						this.zhuangtai = "背";
					} else {
						this.zhuangtai = "正";
					}
				} else {
					if (this.zhuangtai === "正") {
						this.zhuangtai = "背";
					} else {
						this.zhuangtai = "正";
					}
				}
				console.log(this.xingbie, this.zhuangtai);
			},
			// 状态切换的方法，通过点击实现改变人体图的背景
			zhuangtaiqiehuannan() {
				this.xingbie = "男";
				console.log(this.xingbie);

			},
			zhuangtaiqiehuannv() {
				this.xingbie = "女";
				console.log(this.xingbie);

			},
			zhuangtaiqiehuantong() {
				this.xingbie = "童";
				console.log(this.xingbie);

			},
			// 通过点击更改qiehuanzhuangtai的值判断人体图与症状列表哪个是被选中的
			qiehuan() {
				this.qiehuanzhuangtai = false;

			},
			qiehuan2() {
				this.qiehuanzhuangtai = true;
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
			// 让刚进入页面的时候切换状态为false
			this.qiehuanzhuangtai = false;
			console.log(this.xingbie, this.zhuangtai);
			//刚进入此页面就展示加载动画
			this.jiazai()
			// this.mohuchaxun();
		},
	}
</script>

<style scoped>
	.sousuo {
		margin-top: 10rpx;
		margin-bottom: 10rpx;
	}

	.grid_line {
		display: flex;
		width: 100%;
		height: 720px;
		text-align: center;
		box-sizing: border-box;
		border: 1px solid #ccc;
		background: -webkit-linear-gradient(top,
				transparent 5px,
				rgb(150, 227, 244) 0),
			-webkit-linear-gradient(left, transparent 5px, rgb(150, 227, 244) 0);
		background-size: 6px 6px;
	}

	.qiehuan {
		width: 100%;
		height: 43px;
		display: flex;
	}

	.zuolan,
	.youhui,
	.zuohui,
	.youlan {
		width: 50%;
		height: 100%;
	}

	.zuolan,
	.youlan {
		border-bottom: 1px solid rgb(2, 152, 252);
	}

	.youhui,
	.zuohui {
		border-bottom: 1px solid rgb(212, 212, 212);
	}

	.zuolan>>>span {
		font-size: 17px;
		font-weight: 600;
		color: rgb(2, 152, 252);
	}

	.youlan>>>span {
		font-size: 17px;
		font-weight: 600;
		color: rgb(2, 152, 252);
	}

	.zuohui>>>span {
		font-size: 17px;
		font-weight: 600;
		color: #ccc;
	}

	.youhui>>>span {
		font-size: 17px;
		font-weight: 600;
		color: #ccc;
	}

	.rentitu,
	.zhengzhuang {
		width: 100%;
		height: 25px;
		margin-top: 10px;
		text-align: center;
	}

	.rentitu {
		border-right: 1px solid rgb(212, 212, 212);
	}

	.zhuanshenwai {
		width: 20%;
		margin-top: 50px;
		height: 100px;
		position: absolute;
		left: 0;
	}

	.qiehuanxingbiewai {
		position: absolute;
		right: 0;
		width: 20%;
		margin-top: 48px;
		height: 122px;
		right: 0;
	}

	.zhuanshen {
		width: 35px;
		height: 35px;
		margin-top: 55px;
		margin-left: 30px;
		background-image: url(https://s1.ax1x.com/2022/09/01/v5wSwd.png);
		background-size: 100% 100%;
	}

	.qiehuanxingbie {
		width: 30px;
		height: 100px;
	}

	.beijing-nan-zheng,
	.beijing-nan-bei,
	.beijing-nv-zheng,
	.beijing-nv-bei,
	[class^="beijing"] {
		width: 210px;
		height: 640px;
		margin: 0 auto;
		margin-top: 35px;
	}


	.beijing-tong-zheng {
		width: 175px;
		height: 500px;
		margin: 0 auto;
		margin-top: 125px;
		background-image: url(https://s1.ax1x.com/2022/09/01/v5wCFI.png);
		background-size: 100% 100%;
	}

	.beijing-tong-bei {
		width: 175px;
		height: 500px;
		margin: 0 auto;
		margin-top: 125px;
		background-image: url(https://s1.ax1x.com/2022/09/01/v5wifP.png);
		background-size: 100% 100%;
	}

	.nan,
	.nv,
	.tong {
		width: 35px;
		height: 35px;
		margin-left: 15px;
		margin-top: 12px;
	}

	.nan {
		background-image: url(https://s1.ax1x.com/2022/09/01/v5w3lT.png);
		background-size: 100% 100%;
	}

	.nv {
		background-image: url(https://s1.ax1x.com/2022/09/01/v5wGXF.png);
		background-size: 100% 100%;
	}

	.tong {
		background-image: url(https://s1.ax1x.com/2022/09/01/v5wYm4.png);
		background-size: 100% 100%;
	}

	/* 男性的样式布局 */
	.toubu {
		width: 100%;
		height: 57px;
		margin-top: 5px;
		display: flex;
	}

	.toubu_2 {
		width: 74.5px !important;
	}

	.toubu_1,
	.toubu_2,
	.toubu_3 {
		width: 130px;
		height: 100%;
	}

	.jingbu {
		width: 100%;
		height: 30px;
		margin-top: 8px;
		display: flex;
	}

	.jingbu_1,
	.jingbu_2,
	.jingbu_3 {
		width: 141px;
		height: 100%;
	}

	.jingbu_2 {
		width: 55px !important;
	}

	.jianbangxiongbu {
		width: 100%;
		height: 90px;
		margin-top: 8px;
		display: flex;
	}

	.kong {
		width: 42.5px;
	}

	.zuojian,
	.youjian {
		width: 45px !important;
		height: 70px !important;
		margin-top: 10px !important;
	}

	.xiongbu {
		width: 162px !important;
		height: 85px !important;
		margin-top: 5px !important;
	}

	.qugan {
		width: 100%;
		height: 175px;
		margin-top: 6px;
		display: flex;
	}

	.zuobi {
		width: 34px !important;
		height: 100% !important;
		margin-left: 8px;
	}

	.shenti {
		width: 120px !important;
		height: 100% !important;
	}

	.youbi {
		width: 34px !important;
		height: 100% !important;
		margin-left: 4px;
	}

	.fubu {
		width: 85px;
		height: 75px;
		margin-left: 20px;
	}

	.xiabu {
		width: 103px;
		height: 73px;
		margin-left: 11px;
		margin-top: 5px;
	}

	.tuibu {
		width: 100%;
		margin-top: 8px;
		height: 243px;
		display: flex;
	}

	.zuotui,
	.youtui {
		width: 42px;
		height: 100%;
	}

	.zuotui {
		margin-left: 52.5px;
	}

	.youtui {
		margin-left: 19.5px;
	}

	/* 女性的样式布局 */
	.toubu-nv {
		width: 100%;
		height: 57px;
		margin-top: 5px;
		display: flex;
	}

	.toubu-nv_2 {
		width: 74.5px !important;
	}

	.toubu-nv_1,
	.toubu-nv_2,
	.toubu-nv_3 {
		width: 130px;
		height: 100%;
	}

	.jingbu-nv {
		width: 100%;
		height: 30px;
		margin-top: 8px;
		display: flex;
	}

	.jingbu-nv_1,
	.jingbu-nv_2,
	.jingbu-nv_3 {
		width: 141px;
		height: 100%;
	}

	.jingbu-nv_2 {
		width: 55px !important;
	}

	.jianbangxiongbu-nv {
		width: 100%;
		height: 90px;
		margin-top: 8px;
		display: flex;
	}

	.kong-nv {
		width: 42.5px;
	}

	.zuojian-nv,
	.youjian-nv {
		width: 45px !important;
		height: 50px !important;
		margin-top: 18px !important;
	}

	.xiongbu-nv {
		width: 162px !important;
		height: 85px !important;
		margin-top: 5px !important;
	}

	.qugan-nv {
		width: 100%;
		height: 157px;
		margin-top: 6px;
		display: flex;
	}

	.zuobi-nv {
		width: 27px !important;
		height: 100% !important;
		margin-left: 18px;
	}

	.shenti-nv {
		width: 120px !important;
		height: 100% !important;
	}

	.youbi-nv {
		width: 27px !important;
		height: 100% !important;
	}

	.fubu-nv {
		width: 85px;
		height: 75px;
		margin-left: 17px;
		margin-top: 4px;
	}

	.xiabu-nv {
		width: 98px;
		height: 50px;
		margin-left: 11px;
		margin-top: 8px;
	}

	.tuibu-nv {
		width: 100%;
		margin-top: 3px;
		height: 262px;
		display: flex;
	}

	.zuotui-nv,
	.youtui-nv {
		width: 42px;
		height: 100%;
	}

	.zuotui-nv {
		margin-left: 59.5px;
	}

	.youtui-nv {
		margin-left: 5.5px;
	}

	/* 儿童的样式布局 */
	.toubu-tong {
		width: 100%;
		height: 75px;
		margin-top: 10px;
		display: flex;
	}

	.toubu-tong_2 {
		width: 120px !important;
	}

	.toubu-tong_1,
	.toubu-tong_2,
	.toubu-tong_3 {
		width: 120px;
		height: 100%;
	}

	.jingbu-tong {
		width: 100%;
		height: 20px;
		margin-top: 5px;
		display: flex;
	}

	.jingbu-tong_1,
	.jingbu-tong_2,
	.jingbu-tong_3{
		width: 141px;
		height: 100%;
	}

	.jingbu-tong_2 {
		width: 55px !important;
	}

	.jianbangxiongbu-tong {
		width: 100%;
		height: 50px;
		display: flex;
	}

	.kong-tong {
		width: 42.5px;
	}

	.zuojian-tong,
	.youjian-tong {
		width: 45px !important;
		height: 30px !important;
		margin-top: 3px !important;
	}

	.xiongbu-tong {
		width: 162px !important;
		height: 50px !important;
		margin-top: 3px !important;
	}

	.qugan-tong {
		width: 100%;
		height: 135px;
		display: flex;
	}

	.zuobi-tong {
		width: 27px !important;
		height: 100% !important;
		margin-left: 3px;
	}

	.shenti-tong {
		width: 120px !important;
		height: 100% !important;
	}

	.youbi-tong {
		width: 27px !important;
		height: 100% !important;
	}

	.fubu-tong {
		width: 85px;
		height: 60px;
		margin-left: 15px;
		margin-top: 10px;
	}

	.xiabu-tong {
		width: 92px;
		height: 45px;
		margin-left: 12px;
		margin-top: 8px;
	}

	.tuibu-tong {
		width: 100%;
		margin-top: 3px;
		height: 185px;
		display: flex;
	}

	.zuotui-tong,
	.youtui-tong {
		width: 38px;
		height: 100%;
	}

	.zuotui-tong {
		margin-left: 45.5px;
	}

	.youtui-tong {
		margin-left: 9.5px;
	}

	.biaoti {
		width: 100%;
		height: 35px;
		background-color: #fff;
		text-align: center;
		font-size: 18px;
		font-weight: 600;
		line-height: 35px;
		color: rgb(120, 120, 120);
	}

	.keshi {
		display: flex;
		width: 100%;
		height: 50px;
		padding: 0;
		margin: 0;
		/* margin-top: 10px; */
		border-top: 1px solid #ccc;
	}

	.keshi>span {
		line-height: 50px;
		padding-left: 20px;
		font-size: 16px;
		color: rgb(120, 120, 120);
	}

	.juli {
		width: 50px;
		height: 50px;
		line-height: 50px;
		margin: 0 0 0 auto;
		/* background: sandybrown; */
		text-align: center;
	}
</style>
