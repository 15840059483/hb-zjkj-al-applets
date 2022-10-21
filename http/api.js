// 封装的request

const BASE_URL = "https://fscrzhyyh.natapp4.cc"
// export const BASE_URL = "http://192.168.1.6:8088"
 //http://fscrzhyyht.natapp1.cc
// const BASE_URL = "http://192.168.1.7:9088"

export const myRequest = (options) => {
	let token = ''
	console.log("开始")
	var res = my.getStorageSync({
		key: 'token'
	});

	console.log(res)

	if (res.data) {
		token = res.data;
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || 'POST',
			data: options.data || {},
			header: {
				// 'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODA1NjkzNTQsInVzZXJhY2NvdW50IjoiMTg4NDAwNjk0ODMifQ.0goK06Q3ST3k_amC_Lwq3uL83BsHCTJXBKL_Kzfr7DM',
				'Authorization': token,
				'Content-Type': options.contentType || 'application/x-www-form-urlencoded'
				// 'Content-Type': options.contentType || 'application/json;charset=UTF-8'
			},
			success: (res) => {
				switch (res.data.code) {
					case 0:
					case 200:
						resolve(res.data)
						break;
					default:
						uni.showToast({
							title: res.data.msg || '请求失败'
						})
						reject(res.data)
						break;
				}
			},
			fail: (err) => {
				uni.showToast({
					title: "请求接口失败"
				})
				reject(err)
			}
		})
	})
}
