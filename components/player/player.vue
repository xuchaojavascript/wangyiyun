<template>
	<view>
		<view @click="gotomusic" class="page-body" v-if="detail.songs">
			<view class="img">
				<img :src="detail.songs[0].al.picUrl + '?param=90y90'" alt="">
			</view>
			<view class="name">
				<!-- 歌曲名称 -->
				<p>{{ detail.songs[0].name }}</p>
				<!-- 歌手名称 -->
				<p>{{ detail.songs[0].ar[0].name }}</p>
			</view>
			<!-- 下一首 -->
			<view class="icon" @click.stop="next">
				<cmd-icon
				type="next" 
				size="30" 
				color="#654321">
				</cmd-icon>
			</view>
			<!-- 上一首 -->
			<view class="icon" @click.stop="prev">
				<cmd-icon
				type="prev" 
				size="30" 
				color="#654321">
				</cmd-icon>
			</view>			
			<!-- 下载按钮 -->
			<view class="icon" @click.stop="download">
				<cmd-icon
				type="download" 
				size="30" 
				color="#654321">
				</cmd-icon>
			</view>
			<!-- 播放模式 -->
			<view class="icon" @click.stop="setmode" >
				<cmd-icon
				:type="mode === 1 && 'reload' || mode === 2 && 'playlist' || mode === 3 && 'shuffle-play'" 
				size="30" 
				color="#654321">
				</cmd-icon>
			</view>
			<!-- 暂停开始 -->
			<view class="icon" @click.stop="paused ? play() : pause()" >
				<cmd-icon
				:type="paused ? 'play' : 'pause'" 
				size="30" 
				color="#654321">
				</cmd-icon>
			</view>	
		</view>
	</view>
</template>

<script>		
	import Vuex from 'vuex'
	import cmdIcon from "@/components/cmd-icon/cmd-icon.vue"
	export default {
		components: {
			cmdIcon
		},
		computed: {
			...Vuex.mapState(['detail', 'paused', 'mode', 'audio', 'playindex', 'history'])
		},
		methods: {
			...Vuex.mapMutations(['play', 'pause', 'setmode', 'setplayindex', 'setsrc', 'setdetail', 'setlrc']),				
			gotomusic() {
				uni.navigateTo({
					url: '/pages/music/music'
				})
			},
			download() {
				uni.downloadFile({
					url: this.audio.src,
					success: (res) => {
						/* 
						浏览器下载方式 
						var a = document.getElement('a');
						a.href = res.tempFilePath;
						a.download = this.detail.songs[0].name + '.mp3'
						a.click() 
						*/
						// 手机
						uni.saveFile({
							tempFilePath: res.tempFilePath
						})
					}
				})
			},
			prev() {
				this.setplayindex((this.playindex - 1))
				this.setsrc(this.history[this.playindex].src)
				this.setdetail(this.history[this.playindex].detail)
				this.setlrc(this.history[this.playindex].lrc)
			},
			next() {
				this.setplayindex((this.playindex + 1))
				this.setsrc(this.history[this.playindex].src)
				this.setdetail(this.history[this.playindex].detail)
				this.setlrc(this.history[this.playindex].lrc)
			}
		}
	}
</script>

<style>
	.page-body{
		position: fixed;
		bottom: 0;
		width: 100%;
		padding: 13upx 0upx;
		background-color: rgba(255, 255, 255, .9);
	}
	.page-body img{
		width: 90upx;
		height: 90upx;
		margin-left: 20upx;
		border-radius: 50%;
	}
	.page-body view{
		float: left;
	}
	.page-body .name{
		padding-left: 15upx;
	}
	.page-body .icon{
		float: right;
		padding: 20upx 20upx 0 0;
	}
</style>
