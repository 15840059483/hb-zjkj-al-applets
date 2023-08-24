
<script>
	import monitor from './utils/alipayLogger.js';
	export default {
		onLaunch: function(options) {
			
			monitor.init({
			  pid: "uljo8abfxlitwx4h9sd+wa==",
			  options: options,
			  sample: 1,
			  autoReportApi: true,
			  autoReportPage: true,
			  // Http请求返回数据中状态码字段名称
			  code: ["code"],
			  // Http返回数据中的error message字段名称
			  msg: ["msg"],
			  miniVersion:'0.0.1'
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
			
			const _this = this;
			
		},
		onShow: function(e) {
			console.log('App Show',e)

			if(e && e.query &&e.query.resultCode){
				my.setStorageSync({
					key: 'query',
					data: e.query
				})
			}
		},
		onHide: function(e) {
				console.log('App Hide',e)
			}
	}
</script>

<style>
	/*每个页面公共css */
</style>
