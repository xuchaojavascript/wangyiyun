<template>
	<view>
		<uni-list>
			<uni-list-item 
			v-for="(item, index) in history" 
			:title="item.detail.songs[0].name" 
			note=""
			:key="index"
			@click="play(item)"></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import Vuex from 'vuex'
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	export default {
		components: {
			uniList,
			uniListItem
		},
		computed: {
			...Vuex.mapState(['history'])
		},
		methods: {
			...Vuex.mapMutations(['setsrc', 'setdetail', 'setlrc']),
			play(data) {
				this.setsrc(data.src)
				this.setdetail(data.detail)
				this.setlrc(data.lrc)
			}
		}
// 		mounted() {
// 			console.log(this.history)
// 		}
	}
</script>

<style>
</style>
