(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{"3d23":function(e,t,n){"use strict";n.r(t);var o=n("ee95");for(var i in o)"default"!==i&&function(e){n.d(t,e,function(){return o[e]})}(i);n("f5f1");var r,a,u=n("2877"),l=Object(u["a"])(o["default"],r,a,!1,null,null,null);t["default"]=l.exports},"81a6":function(e,t,n){},"84e7":function(e,t,n){"use strict";n("4f5f");var o=a(n("f3d3")),i=a(n("3d23")),r=a(n("d1c8"));function a(e){return e&&e.__esModule?e:{default:e}}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},o=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),o.forEach(function(t){l(e,t,n[t])})}return e}function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}o.default.config.productionTip=!1,i.default.mpType="app",o.default.prototype.$store=r.default;var c=new o.default(u({store:r.default},i.default));c.$mount()},cae3:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=i(n("2f62"));function i(e){return e&&e.__esModule?e:{default:e}}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},o=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),o.forEach(function(t){a(e,t,n[t])})}return e}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var u={computed:r({},o.default.mapState(["audio","mode","playindex","history"])),methods:r({},o.default.mapMutations(["setsrc","setdetail","setlrc","setplayindex","play"])),onLaunch:function(){var e=this;console.log("App Launch"),e.audio.onEnded(function(){if(1===e.mode)e.play();else if(2===e.mode)e.setplayindex(e.playindex+1),e.setsrc(e.history[e.playindex].src),e.setdetail(e.history[e.playindex].detail),e.setlrc(e.history[e.playindex].lrc);else if(3===e.mode){var t=e.history.length,n=Math.floor(Math.random()*t);e.setplayindex(n),e.setsrc(e.history[n].src),e.setdetail(e.history[n].detail),e.setlrc(e.history[n].lrc)}})},onShow:function(){console.log("App Show")},onHide:function(){console.log("App Hide")}};t.default=u},d1c8:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(n("f3d3")),i=r(n("2f62"));function r(e){return e&&e.__esModule?e:{default:e}}o.default.use(i.default);var a="https://api.wulv5.com/music",u=new i.default.Store({state:{audio:e.createInnerAudioContext(),detail:{},paused:!0,lrc:{},history:[],mode:1,playindex:0},mutations:{setsrc:function(e,t){e.audio.src=t,e.audio.play(),e.paused=!1},setdetail:function(e,t){e.detail=t},play:function(e){e.audio.play(),e.paused=!1},pause:function(e){e.audio.pause(),e.paused=!0},setlrc:function(e,t){e.lrc=t},sethistory:function(e,t){var n=e.history.findIndex(function(e){return e.id===t[3]});-1!==n&&e.history.splice(n,1),e.history.unshift({src:t[0],detail:t[1],lrc:t[2],id:t[3]})},setplayindex:function(e,t){e.playindex=t,e.playindex==e.history.length&&(e.playindex=0),-1==e.playindex&&(e.playindex=e.history.length-1)},setmode:function(e){e.mode++,4===e.mode&&(e.mode=1)}},actions:{getsrc:function(t,n){var o=t.commit;t.dispath;Promise.all([new Promise(function(t,i){e.request({url:a+"/song/url?id="+n.id,success:function(e){o("setsrc",e.data.data[0].url),t(e.data.data[0].url)}})}),new Promise(function(t,i){e.request({url:a+"/song/detail?ids="+n.id,success:function(e){o("setdetail",e.data),t(e.data)}})}),new Promise(function(t,i){e.request({url:a+"/lyric?id="+n.id,success:function(e){o("setlrc",e.data),t(e.data)}})})]).then(function(e){e[3]=e[1].songs[0].id,o("sethistory",e)})}}});t.default=u}).call(this,n("6e42")["default"])},ee95:function(e,t,n){"use strict";n.r(t);var o=n("cae3"),i=n.n(o);for(var r in o)"default"!==r&&function(e){n.d(t,e,function(){return o[e]})}(r);t["default"]=i.a},f5f1:function(e,t,n){"use strict";var o=n("81a6"),i=n.n(o);i.a}},[["84e7","common/runtime","common/vendor"]]]);