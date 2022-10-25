<template>
	<view>
		<view class="energy_wrap">
			<image src="https://s1.ax1x.com/2022/10/13/xa5TWq.png"></image>{{ message || '能量发放成功' }}<span>{{energyNum}}g</span>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		props: {
			message: {
				type: String,
				default: ''
			},
			energyNum: {
				type: Number,
				default: 0
			}
		}
	}
</script>

<style scoped lang="scss">
	.energy_wrap {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: rgba(0, 0, 0, .7);
		padding: 0.01rem;
		font-size: .3rem;
		display: flex;
		align-items: center;
		z-index: 99;
		color: #fff;
		border-radius: .1rem;
		padding: .2rem .4rem;
		white-space: nowrap;

		image {
			width: 0.5rem;
			height: 0.5rem;
			margin-right: .2rem;
		}
		
		span {
			color: greenyellow;
			margin-left: .1rem;
		}
	}
</style>
