<template>
	<view>
		<view class="uni-title">
			热门搜索
		</view>
		<view class="tag-view" @click="hots(item.first)" v-for="(item, index) in hot" :key="index">
			<uni-tag circle="true" :text="item.first"></uni-tag>
		</view>
		<view class="uni-title">
			搜索历史纪录
		</view>
		<view>
			<view class="tag-view" v-for="(item, index) in searchHistory" :key="index">
				<uni-tag circle="true" :text="item"></uni-tag>
			</view>
		</view>
		<view class="uni-title">
			搜索结果
		</view>
		<!-- 列表第一种 -->
		<!-- <view>
			<uni-list>
				<uni-list-item 
				v-for="(item, index) in searchList"
				:key="index"
				:title="item.name" 
				note="">
				</uni-list-item>
			</uni-list>
		</view> -->
		<!-- 列表第二种 -->
		<view class="uni-list">
			<view class="uni-list-cell" @click="getsrc(item)" v-for="(item, index) in searchList" :key="index">
				<view class="uni-media-list">
					<view class="uni-media-list-body">
						<view class="uni-media-list-body-top">{{ item.name }}</view>
						<view class="uni-media-list-body-bottom uni-ellipsis">{{ item.artists[0].name }}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniTag from "@/components/uni-tag/uni-tag.vue"
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import Vuex from 'vuex'
	export default {			
		components: {
			uniTag,
			uniList,
			uniListItem
		},
		data() {
			return {
				hot: [],
				searchList: [],
				searchHistory: []
			}
		},
		methods: {
			...Vuex.mapActions(['getsrc']),
			hots(text){
				uni.request({
					url: "https://api.wulv5.com/music/search?keywords=" + text,
					success: (res) => {
						this.searchList = res.data.result.songs
					}
				})
			}
		},
		mounted() {
			uni.request({
				url: "https://api.wulv5.com/music/search/hot",
				success: (res) => {
					this.hot = res.data.result.hots
				}
			})
		},
		// 按下回车键触发
		onNavigationBarSearchInputConfirmed(e) {			
			if(!e.text) return
			this.searchHistory.push(e.text)			
			this.hots(e.text)
		}
	}
</script>

<style>
	.tag-view{
		display: inline-block;
		margin: 10upx 20upx;
	}
</style>
