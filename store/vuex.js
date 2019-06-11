import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex)
const apiurl = 'https://api.wulv5.com/music'
export default new Vuex.Store({
	// 全局变量
	state: {
		audio: uni.createInnerAudioContext(),
		detail: {},
		// 是否为暂停状态 true代表暂停 false为播放
		paused: true,
		lrc: {},
		history: [],
		mode: 1,
		playindex: 0
	},
	// 用来修改state里所定义的变量
	mutations: {
		setsrc(state, src) {
			state.audio.src = src
			state.audio.play()
			state.paused = false
		},
		setdetail(state, detail) {
			state.detail = detail
		},
		play(state) {
			state.audio.play()
			state.paused = false
		},
		pause(state) {
			state.audio.pause()
			state.paused = true
		},
		setlrc(state, lrc) {
			state.lrc = lrc
		},
		sethistory(state, data) {
			var index = state.history.findIndex(item => {
				return item.id === data[3]
			});
			if(index !== -1){
				state.history.splice(index, 1)
			}
			state.history.unshift({
				src: data[0],
				detail: data[1],
				lrc: data[2],
				id: data[3]
			})
		},			
		setplayindex(state, index) {
			state.playindex = index
			if(state.playindex == state.history.length){
				state.playindex = 0
			}
			if(state.playindex == -1){
				state.playindex = state.history.length - 1
			}
		},
		setmode(state) {
			state.mode++
			if(state.mode === 4){
				state.mode = 1
			}
		}
	},
	// 全局函数
	actions: {
		getsrc({commit, dispath}, item) {
			// commit 用来执行 mutations 里面函数的方法
			// dispath 用来执行 actions 里面其他函数的方法
			Promise.all([
				new Promise((next, err) => {
					// 获取音乐的url
					uni.request({
						url: apiurl + "/song/url?id=" + item.id,
						success: (res) => {
							commit('setsrc', res.data.data[0].url)
							next(res.data.data[0].url)
						}
					})
				}),
				new Promise((next, err) => {
					// 获取音乐的详情
					uni.request({
						url: apiurl + "/song/detail?ids=" + item.id,
						success: (res) => {
							commit('setdetail', res.data)
							next(res.data)
						}
					})
				}),
				new Promise((next, err) => {
					// 获取歌词
					uni.request({
						url: apiurl + "/lyric?id=" + item.id,
						success: (res) => {
							commit('setlrc', res.data)
							next(res.data)
						}
					})
				})
			]).then(function(data) {
				data[3] = data[1].songs[0].id
				commit('sethistory', data)
			})
		}
	}
})