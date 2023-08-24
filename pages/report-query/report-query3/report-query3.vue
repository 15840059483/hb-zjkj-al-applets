<zero-loading v-if="loading" type="pulse" mask></zero-loading>
<template>

	<view>
		<view class="zhuti">
			<template v-for="item in resultList">
				<div class="query3-infocon">
					<p>检验报告</p>
					<div class="query3-info">
						<div>
							<p>姓名</p>
							<p>{{item.patientname}}</p>
						</div>
						<div>
							<p>性别</p>
							<p>{{item.patientsex}}</p>
						</div>
						<div>
							<p>年龄</p>
							<p>{{item.patientage}}</p>
						</div>
					</div>
				</div>

				<div class="center doctor7-center" style="margin: 1rem 0;">
					<div>
						<div>开方医生</div>
						<div>{{item.doctorname}}</div>
					</div>
					<div>
						<div>开方科室</div>
						<div>{{item.deptname}}</div>
					</div>
					<div>
						<div>报告时间</div>
						<div>{{item.sampletime}}</div>
					</div>
					<div>
						<div>报告单号</div>
						<div>{{item.barcode}}</div>
					</div>
				</div>
			</template>
			<view class="liebiao">
				<uni-table class="query3-uni-table">
					<uni-tr class="query3-theader">
						<uni-td>检查项目</uni-td>
						<uni-td>结果</uni-td>
						<uni-td>参考值</uni-td>
					</uni-tr>
					<uni-tr v-for="(item,index) in sampleList" :key="index">
						<uni-td>{{item.itemname}}</uni-td>
						<uni-td v-if="item.Color=='blue'" >
							<span style="color: rgb(0,142,254)">{{item.reportvalue}}&nbsp{{item.resultflag}}</span>
						</uni-td>
						<uni-td v-if="item.Color=='red'">
							<span style="color: red">{{item.reportvalue}}&nbsp{{item.resultflag}}</span>
						</uni-td>
						<uni-td v-if="item.Color=='black'">{{item.reportvalue}}</uni-td>
						<uni-td>{{item.rangeinfo}}</uni-td>
					</uni-tr>

				</uni-table>
			</view>

		</view>
	</view>
	<!-- <view>
		<view class="zhuti">
			<template>
				<div class="query3-infocon">
					<p>检验报告</p>
					<div class="query3-info">
						<div>
							<p>姓名</p>
							<p>{{sampleList.patientName}}</p>
						</div>
						<div>
							<p>性别</p>
							<p>{{sampleList.patientSex}}</p>
						</div>
						<div>
							<p>年龄</p>
							<p>{{sampleList.patientAge}}</p>
						</div>
					</div>
				</div>
	
				<div class="center doctor7-center" style="margin: 1rem 0;">
					<div>
						<div>开方医生</div>
						<div>{{sampleList.doctorName}}</div>
					</div>
					<div>
						<div>开方科室</div>
						<div>{{sampleList.deptName}}</div>
					</div>
					<div>
						<div>报告时间</div>
						<div>{{sampleList.sampleTime}}</div>
					</div>
					<div>
						<div>报告单号</div>
						<div>{{sampleList.barCode}}</div>
					</div>
				</div>
			</template>
			<view class="liebiao">
				<uni-table class="query3-uni-table">
					<uni-tr class="query3-theader">
						<uni-td>检查项目</uni-td>
						<uni-td>结果</uni-td>
						<uni-td>参考值</uni-td>
					</uni-tr>
					<uni-tr v-for="(item,index) in resultList" :key="index">
						<uni-td>{{item.itemName}}</uni-td>
						<uni-td>{{item.rangeInfo}}</uni-td>
						<uni-td style="color: rgb(0,142,254)">
							{{item.reportValue}}
						</uni-td>
						<uni-td v-if="item.Color=='blue'" style="color: rgb(0,142,254)">
							{{item.reportValue}}&nbsp{{item.resultFlag}}
						</uni-td>
						<uni-td v-if="item.Color=='red'" :class="item.Color=='red'?red:black" style="color: red">{{item.reportvalue}}&nbsp{{item.resultflag}}</uni-td>
						<uni-td v-if="item.Color=='black'">{{item.reportValue}}</uni-td>
					</uni-tr>
				
				</uni-table>
			</view>
			
		</view>
	</view> -->
</template>

<script>
	import './report-query3.css'
	export default {
		// 调用头部组件
		components: {

		},
		data() {
			return {
				title: "挂号确认", // 页面标题
				shouye: "no", // 是否是首页，不是首页显示返回上一层箭头
				list: {},
				sampleList: {},
				resultList: [],
			}
		},
		methods: {
			jiazai() {
				this.loading = true;
				// 定时器，setTimeout只执行一次，setInterval执行多次
				setTimeout(() => {
					this.loading = false;
					console.log(this.loading);
				}, 500)
			},
			getSample() {
				let parans = {
					sampleId: this.sampleList.sampleId,
					machineId: this.sampleList.machineId,
					testDate: this.sampleList.testDate
				};
				this.$myRequest({
					url: "/zjkj/itemResult",
					method: "GET",
					data: parans,
				}).then(res => {
					console.log(res.data)
					this.jiazai();
					if (res && res.data && res.data.length > 0) {
						this.resultList = res.data;
						console.log(this.list)
					}
				}).catch(err => {
					this.loading = true;
				})
			}
		},
		// 这是uni的生命周期
		// 在uniapp中如果要使用路由传参必须使用onload(路由传参中的参数值)
		onLoad(e) {
			console.log('eeeeeeee', e);
			this.sampleList = JSON.parse(decodeURIComponent(e.sampleList));
			this.resultList = JSON.parse(decodeURIComponent(e.resultList));
			console.log(this.sampleList, this.resultList);
		},
		mounted() {
			//this.getSample()
		},
	};
</script>

<style scoped>

</style>
