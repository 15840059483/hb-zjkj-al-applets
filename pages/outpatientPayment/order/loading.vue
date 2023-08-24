<template>
	<view>
		<view class="zhuti">
			<view class="loadingbody">
				<view class="image">
					<view class="loadingImage">
						<image src="../../../static/loading@2x.gif" mode="aspectFit"></image>
					</view>
				</view>
				<view class="loadingText">
					请耐心等待不要离开页面
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {


			getOrderDetail() {
				setTimeout(() => {
					uni.redirectTo({
						url: '/pages/index/index'
					});
				}, 1000);
			},

		},
		onLoad(options) {

		},
		mounted() {
			this.getOrderDetail();
		},
	};
</script>

<style scoped>
	.loadingbody {
		padding-top: 240px;
		text-align: center;
	}

	.image {
		display: flex;
		justify-content: center;
	}

	.loadingImage {
		width: 164rpx;
		height: 164rpx;
	}

	.loadingImage image {
		width: 100%;
		height: 100%;
	}

	.loadingText {
		padding-top: 40rpx;
		color: #3b71e8;
		font-size: 32rpx;
		font-weight: 600;
	}
</style>