<template>
	<view>
		<view class="energy_wrap">
			<image src="../../static/xa5TWq.png"></image>能量发放成功
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
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

		image {
			width: 0.5rem;
			height: 0.5rem;
			margin-right: .2rem;
		}
	}
</style>
