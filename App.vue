
<script>
	import monitor from './utils/alipayLogger.js';
	export default {
		onLaunch: function(options) {
			
			monitor.init({
			  pid: "sw0ofef26ujt2l9epxxcva==",
			  options: options,
			  sample: 1,
			  autoReportApi: true,
			  autoReportPage: true,
			  // Http请求返回数据中状态码字段名称
			  code: ["code"],
			  // Http返回数据中的error message字段名称
			  msg: ["msg"],
			  miniVersion:'0.0.7'
			});
			console.log('App Launch', options)
			if (options && options.query && options.query.orderDetail) {
				my.setStorageSync({
					key: 'orderDetail',
					data: options.query.orderDetail
				})
			}
			
			if (options && options.query && options.query.id) {
				my.setStorageSync({
					key: 'deptId',
					data: options.query.id
				})
			}
			
			if (options && options.query && options.query.deptName) {
				my.setStorageSync({
					key: 'deptName',
					data: options.query.deptName
				})
			}
		},
		onShow: function() {
			console.log('App Show')
			const _this = this;
			
			my.getStorage({
				key: 'token',
				success: function(res) {
					console.log(res)
					if (!res.data) {
						uni.showLoading({
							title:'加载中'
						});
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

													_this.$isResolve()
													// this.isToken = true;

													// this.getDfltPtCardInfo();
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
											uni.hideLoading();
											_this.$isResolve()
											
										}
										
									})
							},
						});
					} else {
						
						_this.$isResolve()
					}
					
				}
			})
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style>
	/*每个页面公共css */
</style>
