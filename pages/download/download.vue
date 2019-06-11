<template>
	<view>
		<uni-list>
			<uni-list-item 
			v-for="(item, index) in list"
			:key="index"
			:title="item.filePath" 
			note="">
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	export default {
		components: {
			uniList,
			uniListItem
		},
		data(){
			return {
				list: []
			}
		},
		mounted() {
			uni.getSavedFileList({
				success: (res) => {
					// console.log(JSON.stringify(res));
					this.list = res.fileList
				}
			})
		}
	}
</script>

<style>
</style>
