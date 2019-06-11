<template>
	<view>
		<view class="progess">
			{{start}}
			<view style="display: inline-block; width: 80%;">
				<slider :value='value' @changing="changing" @change="change"></slider>
			</view>
			{{total}}
		</view>
		<view style="height: 50upx; overflow: hidden; margin-top: 100upx; padding: 225upx 0;">
			<ul :style=" 'margin-top: -' + 50 * index + 'upx; text-align: center; transition: margin 1.5s;' ">
				<li class="lrc-li" :style="index === i && 'color: red'" v-for="(item, i) in lrcarr" :key="i">
					{{item.text}}
				</li>
			</ul>
		</view>
		<player></player>
	</view>
</template>

<script>
	import Vuex from 'vuex'
	import player from '@/components/player/player.vue'
	export default {
		components: {
			player
		},
		data() {
			return {
				start: '',
				total: '',
				value: 0,
				updatestate: true,
				lrcarr: [],
				// 用来记录当前是第几条歌词
				index: -1
			}
		},
		mounted() {
			var that = this
			uni.setNavigationBarTitle({
				title: this.detail.songs[0].name
			})
			
			this.audio.onTimeUpdate(this.jindu)
			
			this.getlrc()
			
			this.audio.onEnded(function(){
				uni.setNavigationBarTitle({
					title: that.detail.songs[0].name
				})
				that.getlrc()
				that.index = -1
			})
			
			this.audio.onPlay(function(){
				uni.setNavigationBarTitle({
					title: that.detail.songs[0].name
				})
				that.getlrc()
				that.index = -1
			})
		},
		methods: {
			...Vuex.mapMutations(['setlrc']),
			change(e) {
				// e.detail.value * this.audio.duration / 100
				this.audio.seek(e.detail.value * this.audio.duration / 100)
				this.updatestate = true
				
				let min = Math.floor(this.audio.currentTime / 60)
				min = min.toString().length === 1 ? ("0" + min) : min
				let sec = Math.round(this.audio.currentTime % 60)
				sec = sec.toString().length === 1 ? ("0" + sec) : sec
				let s = `${min}:${sec}`
				
				const self = this
				this.index = 0
				function d(){
					if(self.index < self.lrcarr.length - 1){
						if(s > self.lrcarr[self.index + 1].time) {
							self.index++
							d()
						}
					}					
				}
				d()
			},
			jindu() {
				let min = Math.floor(this.audio.currentTime / 60)
				min = min.toString().length === 1 ? ("0" + min) : min
				let sec = Math.round(this.audio.currentTime % 60)
				sec = sec.toString().length === 1 ? ("0" + sec) : sec
				
				let zmin = Math.floor(this.audio.duration / 60)
				zmin = zmin.toString().length === 1 ? ("0" + zmin) : zmin
				let zsec = Math.round(this.audio.duration % 60)
				zsec = zsec.toString().length === 1 ? ("0" + zsec) : zsec
				
				this.start = `${min}:${sec}`
				this.total = `${zmin}:${zsec}`
					
				if(this.updatestate){
					this.value = this.audio.currentTime / this.audio.duration * 100
				}					
				if(this.index < this.lrcarr.length - 1){
					if( this.start > this.lrcarr[this.index + 1].time ) {
						this.index++
					}
				}
			},
			changing() {
				this.updatestate = false
			},
			getlrc() {
				const arr = this.lrc.lrc.lyric.split('\n')
				var lrcarr = []
				for (var i = 0; i < arr.length; i++) {
					var temparr = arr[i].split("]")
					lrcarr.push({
						time: temparr[0].substring(1, temparr[0].length),
						text: temparr[1]
					})
				}
				this.lrcarr = lrcarr
			}
		},
		computed: {
			...Vuex.mapState(['detail', 'audio', 'lrc', 'mode', 'playindex','history'])
		}
	}
</script>

<style>
	.progess{
		padding: 20upx 10upx;
	}
	.lrc-li{
		height: 50upx;
		width: 100%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
