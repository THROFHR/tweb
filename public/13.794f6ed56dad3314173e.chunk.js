(this.webpackJsonp=this.webpackJsonp||[]).push([[13],{38:function(t,s,e){"use strict";e.d(s,"a",(function(){return i}));class i{constructor(t){this._constructor(t)}_constructor(t=!1){this.reuseResults=t,this.listeners={},this.listenerResults={}}addEventListener(t,s,e){var i;this.listenerResults.hasOwnProperty(t)&&(s(...this.listenerResults[t]),e)||(null!==(i=this.listeners[t])&&void 0!==i?i:this.listeners[t]=[]).push({callback:s,once:e})}removeEventListener(t,s){this.listeners[t]&&this.listeners[t].findAndSplice(t=>t.callback===s)}dispatchEvent(t,...s){this.reuseResults&&(this.listenerResults[t]=s);const e=[],i=this.listeners[t];if(i){i.slice().forEach(n=>{-1!==i.findIndex(t=>t.callback===n.callback)&&(e.push(n.callback(...s)),n.once&&this.removeEventListener(t,n.callback))})}return e}cleanup(){this.listeners={},this.listenerResults={}}}},48:function(t,s,e){"use strict";const i={test:location.search.indexOf("test=1")>0,debug:location.search.indexOf("debug=1")>0,http:!1,ssl:!0,multipleConnections:!0,asServiceWorker:!1};s.a=i},8:function(t,s,e){"use strict";e.r(s);var i=e(38),n=e(9);class r extends i.a{constructor(){super(),this._overlayIsActive=!1,this.myId=0,this.idle={isIDLE:!0},this.connectionStatus={},this.broadcast=(t,s)=>{this.dispatchEvent(t,s)},this.on=(t,s,e)=>{super.addEventListener(t,s,e)},this.addEventListener=this.on,this.off=(t,s)=>{super.removeEventListener(t,s)},this.removeEventListener=this.off,this.on("user_auth",t=>{this.myId=t}),this.on("connection_status_change",t=>{const s=t;this.connectionStatus[t.name]=s})}get overlayIsActive(){return this._overlayIsActive}set overlayIsActive(t){this._overlayIsActive=t,this.broadcast("overlay_toggle",t)}}const c=new r;n.a.rootScope=c,s.default=c},9:function(t,s,e){"use strict";e.d(s,"a",(function(){return r}));const i=e(48).a.debug,n="undefined"!=typeof window?window:self,r=i?n:{};s.b=i,i||(n.sandpitTurtle=()=>{for(let t in r)n[t]=r[t]})}}]);