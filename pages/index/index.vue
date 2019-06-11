<template>
	<view class="content">
		<swiper style="text-align: center;" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item, index) in banner" :key="index">
				<view class="swiper-item">
					<image :src="item.imageUrl" alt="" mode="widthFix"></image>
				</view>
			</swiper-item>
		</swiper>
		<view class="uni-title">
			推荐歌单
		</view>
		<view class="uni-product-list">
			<view class="uni-product" v-for="(item, index) in list" :key="index">
				<view class="image-view">
					<image class="uni-product-image" :src="item.picUrl"></image>
				</view>
				<view class="uni-product-title">{{item.name}}</view>
			</view>
		</view>
		<view>
			<uni-drawer @close="closeDrawer" mode="left" :visible="visible">
				<uni-list>
					<uni-list-item title="历史纪录" note="" show-arrow="false" @click="gotohistory"></uni-list-item>
					<uni-list-item title="下载管理" note="" show-arrow="false" @click="gotodownload"></uni-list-item>
				</uni-list>
			</uni-drawer>
		</view>
		<player></player>
	</view>
</template>

<script>
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import uniDrawer from '@/components/uni-drawer/uni-drawer.vue'
	import player from '@/components/player/player.vue'
	export default {
		components: {
			uniList,
			uniListItem,
			uniDrawer,
			player
		},
		data() {
			return {
				banner: [],
				list: [],
				visible: false
			}
		},
		onLoad() {
			uni.request({
				url: 'https://api.wulv5.com/music/banner',
				success: (res) => {
					this.banner = res.data.banners
				}
			})
			uni.request({
				url: 'https://api.wulv5.com/music/personalized',
				success: (res) => {
					this.list = res.data.result
				}
			})
		},
		onNavigationBarButtonTap(e) {
			this[e.index]()
		},
		methods: {
			gotohistory() {
				uni.navigateTo({
					url: '/pages/history/history'
				})
			},
			gotodownload() {
				uni.navigateTo({
					url: '/pages/download/download'
				})
			},
			1() {
				uni.navigateTo({
					url: '/pages/search/search'
				})
			},
			0() {
				this.visible = true
			},
			closeDrawer() {
				this.visible = false
			}
		}
	}
</script>

<style>
	
</style>
