<template>
	<view>
		<view class="zhuti">
			<view class="emp-Tips">
				<view class="a">
					授权登录
				</view>
				<view class="b">
					需要您授权登录后才可以继续操作～
				</view>
			</view>
			<view class="emp-Img">

			</view>
			<view class="emp-Button">
				<button type="primary" style="width: 100%;height: 100%;" @click="addUser">立即登录</button>
				<button type="primary"
					style="width: 100%;height: 100%;background-color: rgb(240, 240, 240);border:rgb(240, 240, 240);color: black;margin-top: 3%;"
					@click="noSrcode">暂不授权</button>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		// 调用头部组件
		components: {
			// header
		},
		data() {
			return {

			}
		},
		methods: {
			addUser(){
					uni.showLoading({
						title:'加载中'
					}); 
					const _this = this;
					// this.isToken = false
					my.getAuthCode({
						scopes: 'auth_user',
						success: res => {
							console.log(res)
							console.log(this)
							_this.$myRequest({
									url: `/al/auth/login?code=${res.authCode}`,
									method: 'get'
								})
								.then((data) => {
									// this.alUserInfo = data.data.aliUserInfo;
									my.setStorageSync({
										key: 'alUserInfo',
										data: data.data.aliUserInfo
									})
									my.setStorageSync({
										key: 'user_id',
										data: data.data.aliUserId
									})
									my.removeStorage({
										key: 'token'
									})
									console.log(data.data.reg)
									if (!data.data.reg) {
										console.log(this.alUserInfo)
										let aliUser = my.getStorageSync({
											key: 'alUserInfo'
										}).data
										console.log(aliUser)
										const params = {
											realname: aliUser.userName,
											//mobile: userInfo.mobile,
											mobile: aliUser.mobile,
											userIdCard: aliUser.certNo,
											/* 两个userid 从缓存中取 */
											aliUserId: my.getStorageSync({
												key: 'user_id'
											}).data,
											alipayUserId: '',
											/* M男 F女 */
											gender: Number(aliUser.certNo
													.substring(16, 17)) & 2 != 1 ?
												2 : 1,
											birthday: '2022-02-03',
										}
				
										_this.$myRequest({
											url: "/wechat/register/normal",
											data: params,
										}).then(data => {
											console.log(data)
											if (data.code !== 200) {
												uni.showToast({
													title: data.msg,
													icon: 'none',
													duration: 2000
												});
											} else {
												
												uni.showToast({
													title: '注册成功',
													icon: 'none',
													duration: 2000
												});
												my.setStorageSync({
													key: 'token',
													data: data.data
												})
												uni.navigateBack()
												
											}
											// this.loading = false;
										}).catch(err => {
											// this.loading = false;
										})
										uni.hideLoading();
									} else {
										my.setStorageSync({
											key: 'token',
											data: data.data.token
										})
										uni.navigateBack()
										uni.hideLoading();

									}
								})
						}
					});
			},
			noSrcode(){
				uni.navigateBack()
			}
		},
		mounted() {
			
		},
	};
</script>

<style lang="scss" scoped>
	.emp-Tips {
		width: 100%;
		margin-top: 15%;

		.a {
			text-align: center;
			font-size: .5rem;
			font-weight: 500;
		}

		.b {
			text-align: center;
			font-size: .3rem;
			font-weight: 500;
			padding-top: .2rem;
			color: #ccc;
		}
	}

	.emp-Button {
		width: 90%;
		height: 50px;
		margin: 0 auto;
		margin-top: 30px;
		// display: flex;
		/* background-color: aqua; */
	}
</style>
