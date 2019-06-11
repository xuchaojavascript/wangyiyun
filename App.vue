<script>
	import Vuex from 'vuex'
	export default {
		computed: {
			...Vuex.mapState(['audio','mode','playindex','history'])
		},
		methods: {
			...Vuex.mapMutations(['setsrc','setdetail','setlrc','setplayindex','play'])
		},
		onLaunch: function () {
			var that = this
			console.log('App Launch')
			that.audio.onEnded(function(){
				if(that.mode === 1){
					that.play()
				}else if(that.mode === 2){
					that.setplayindex((that.playindex + 1))
					that.setsrc(that.history[that.playindex].src)
					that.setdetail(that.history[that.playindex].detail)
					that.setlrc(that.history[that.playindex].lrc)
				}else if(that.mode === 3){
					var lang = that.history.length
					var index = Math.floor(Math.random() * lang)
					that.setplayindex(index)
					that.setsrc(that.history[index].src)
					that.setdetail(that.history[index].detail)
					that.setlrc(that.history[index].lrc)
				}
			})
		},
		onShow: function () {
			console.log('App Show')
		},
		onHide: function () {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import './common/uni.css';
	.uni-title{
		font-weight: bold;
		font-size: 35upx;
		padding-left: 20upx;
	}
	ul{
		list-style-type: none;
		padding: 0;
	}
</style>
