<template>
	<div>
		<div class="record-container">
			<div class="record-item" v-for="item in listData" @click="goToDetail(item)" v-if="show">
				<img class="icon-success" v-if="item.paymentstatusId == 3010" src="../../static/icon-success.png">
				<img class="icon-success" v-else src="../../static/yes-yi.png">
				<div class="record-right">
					<div>
						<div>{{ item.paymentstatusId == 3010 ? '缴费成功' : '缴费失败' }}</div>
						<div class="item-bot">{{ item.patientName || '-' }}</div>
					</div>
					<div style="text-align: right">
						<div style="color: #EB7C00">￥{{ item.payMount || 0 }}</div>
						<div class="item-bot">{{ item.paymentTime }}</div>
					</div>
				</div>
			</div>
			<div class="no-list" v-if="!show">
				<div>
					<img src="https://s1.ax1x.com/2022/09/28/xe6wLV.png">
				</div>
				<p>暂未获取到您的订单信息</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "payment-record",
		data() {
			return {
				listData: [],
				show:false,
			}
		},
		mounted() {
			this.getList()
		},
		methods: {
			getList() {
				this.$myRequest({
					url: '/hospt/getWechatOrderList',
				}).then(data => {
					if(data.data.length>0){
						this.listData = data.data
						this.loading = false;
						this.show=true;
					}
					
				}).catch(err => {
					this.loading = false;
				})
			},
			goToDetail(item) {
				uni.navigateTo({
					url: '/pages/register-success/register-success?orderDetail=' + JSON.stringify(item) +
						'&backGo=-1'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.no-list {
	  margin-top: 1rem;
	  div {
	    width: 2rem;
	    height: 2rem;
	    margin: 0 auto;
	    border-radius: 50%;
	    background-color: #b8b8b8;
	    text-align: center;
	    display: flex;
	    justify-content: space-around;
	    align-items: center;
	
	    img {
	      width: 60%;
		  height: 60%;
	    }
	  }
	
	  p {
	    text-align: center;
		margin-top: .2rem;
	    color: #4d4d4d;
	    font-size: .35rem;
	    letter-spacing: 1px;
	  }
	}
	.record-container {
		.record-item {
			background: #FFFFFF;
			border-bottom: 1px solid #E2E3E4;
			padding: .3rem .5rem;
			display: flex;
			align-items: center;

			.icon-success {
				width: 1rem;
				height: 1rem;
				margin-right: .5rem;
			}

			.record-right {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: .25srem;

				.item-bot {
					color: #DFE0E1;
					margin-top: .2rem;
				}
			}
		}
	}
</style>
