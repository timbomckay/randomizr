(function(e){function t(t){for(var o,s,a=t[0],u=t[1],c=t[2],l=0,f=[];l<a.length;l++)s=a[l],r[s]&&f.push(r[s][0]),r[s]=0;for(o in u)Object.prototype.hasOwnProperty.call(u,o)&&(e[o]=u[o]);m&&m(t);while(f.length)f.shift()();return i.push.apply(i,c||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],o=!0,s=1;s<n.length;s++){var u=n[s];0!==r[u]&&(o=!1)}o&&(i.splice(t--,1),e=a(a.s=n[0]))}return e}var o={},r={app:0},i=[];function s(e){return a.p+"js/"+({about:"about"}[e]||e)+"."+{about:"ec1e39f7"}[e]+".js"}function a(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.e=function(e){var t=[],n=r[e];if(0!==n)if(n)t.push(n[2]);else{var o=new Promise(function(t,o){n=r[e]=[t,o]});t.push(n[2]=o);var i,u=document.getElementsByTagName("head")[0],c=document.createElement("script");c.charset="utf-8",c.timeout=120,a.nc&&c.setAttribute("nonce",a.nc),c.src=s(e),i=function(t){c.onerror=c.onload=null,clearTimeout(l);var n=r[e];if(0!==n){if(n){var o=t&&("load"===t.type?"missing":t.type),i=t&&t.target&&t.target.src,s=new Error("Loading chunk "+e+" failed.\n("+o+": "+i+")");s.type=o,s.request=i,n[1](s)}r[e]=void 0}};var l=setTimeout(function(){i({type:"timeout",target:c})},12e4);c.onerror=c.onload=i,u.appendChild(c)}return Promise.all(t)},a.m=e,a.c=o,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)a.d(n,o,function(t){return e[t]}.bind(null,o));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/randomizr/",a.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],c=u.push.bind(u);u.push=t,u=u.slice();for(var l=0;l<u.length;l++)t(u[l]);var m=c;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"21bb":function(e,t,n){"use strict";var o=n("bcc9"),r=n.n(o);r.a},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("097d");var o=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"randomizr",attrs:{id:"app"}},[n("div",{attrs:{id:"nav"}},[n("router-link",{attrs:{to:"/"}},[e._v("Home")]),e._v(" |\n    "),n("router-link",{attrs:{to:"/about"}},[e._v("About")])],1),n("router-view")],1)},i=[],s=(n("5c0b"),n("2877")),a={},u=Object(s["a"])(a,r,i,!1,null,null,null);u.options.__file="App.vue";var c=u.exports,l=n("8c4f"),m=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.presenting?e.presenting?n("section",{staticClass:"presentation",on:{click:e.next}},[e.bowl.length?n("div",[n("h1",[e._v(e._s(e.list[e.bowl[0]].name))]),e.list[e.bowl[0]]&&e.list[e.bowl[0]].count?n("h3",[e._v(e._s(e.list[e.bowl[0]].count)+" Gifts Remaining")]):n("h3",[e._v("Last One, Make It Count")])]):n("div",[n("h1",[e._v("Merry Christmas")]),n("h3",[e._v("The End")])])]):e._e():n("section",{staticClass:"edit-list"},[e._m(0),n("div",{class:e.listClasses},e._l(e.list,function(t,o){return n("div",{key:o,staticClass:"list-item"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.count,expression:"item.count"}],staticClass:"list-qty",attrs:{type:"number",name:"quantity",min:"1",max:"99",placeholder:"1"},domProps:{value:t.count},on:{input:function(n){n.target.composing||e.$set(t,"count",n.target.value)}}}),n("span",{staticClass:"list-name"},[e._v(e._s(t.name))]),n("button",{staticClass:"list-item--remove",on:{click:function(t){e.removeName(o)}}},[n("svg",{staticClass:"icon"},[n("use",{attrs:{"xlink:href":"#close"}})])])])})),n("form",{staticClass:"form-addName",on:{submit:function(t){return t.preventDefault(),e.addName(t)}}},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.newName.count,expression:"newName.count"}],staticClass:"form-qty",attrs:{type:"number",name:"quantity",min:"1",max:"99",placeholder:"1"},domProps:{value:e.newName.count},on:{input:function(t){t.target.composing||e.$set(e.newName,"count",t.target.value)}}}),n("input",{directives:[{name:"model",rawName:"v-model",value:e.newName.name,expression:"newName.name"}],staticClass:"form-name",attrs:{type:"text",placeholder:"Name"},domProps:{value:e.newName.name},on:{input:function(t){t.target.composing||e.$set(e.newName,"name",t.target.value)}}}),n("input",{staticClass:"btn",attrs:{type:"submit",value:"Add Name"}})]),n("button",{staticClass:"btn btn-start",on:{click:e.startPresentation}},[e._v("Start")])])},f=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("header",{staticClass:"header"},[n("h1",[e._v("Gifts Randomizr")])])}],d=(n("ac6a"),n("7f7f"),n("6b54"),{fetch:function(){return JSON.parse(localStorage.getItem("randomizr"))||[]},save:function(e){localStorage.setItem("randomizr",JSON.stringify(e))}}),p={name:"home",components:{},data:function(){return{newName:{name:"",count:1},list:d.fetch(),bowl:[],previous:[],presenting:!1}},computed:{listClasses:function(){return["list",this.list.length<4?"list-cols".concat(this.list.length):""]}},watch:{list:{handler:function(e){d.save(e)},deep:!0}},methods:{guid:function(){function e(e,t){for(t=e="";e++<4;t+=51*e&52?(15^e?8^Math.random()*(20^e?16:4):4).toString(16):"");return t}var t=e();while(this.list[t])t=e();return t},shuffle:function(e){var t,n,o=e.length;while(o)n=Math.floor(Math.random()*o--),t=e[o],e[o]=e[n],e[n]=t;return e},launchFullscreen:function(e){e.requestFullscreen?e.requestFullscreen():e.mozRequestFullScreen?e.mozRequestFullScreen():e.webkitRequestFullscreen?e.webkitRequestFullscreen():e.msRequestFullscreen&&e.msRequestFullscreen()},addName:function(){this.newName.name.trim()&&(this.list.push({id:this.guid(),name:this.newName.name,count:this.newName.count}),this.resetForm())},removeName:function(e){this.list.splice(e,1)},resetForm:function(){this.newName.name="",this.newName.count=1},startPresentation:function(){var e=[];this.list.forEach(function(t,n){for(var o=0;o<t.count;o+=1)e.push(n)}),this.bowl=this.shuffle(e),this.presenting=!0,this.list[this.bowl[0]].count-=1,this.launchFullscreen(document.documentElement)},next:function(){var e=this.bowl.shift();if(this.previous.push(e),this.bowl.length){var t=this.bowl[0];this.list[t].count-=1}}}},h=p,v=(n("21bb"),Object(s["a"])(h,m,f,!1,null,null,null));v.options.__file="Home.vue";var b=v.exports;o["a"].use(l["a"]);var g=new l["a"]({mode:"history",base:"/randomizr/",routes:[{path:"/",name:"home",component:b},{path:"/about",name:"about",component:function(){return n.e("about").then(n.bind(null,"f820"))}}]}),w=n("2f62");o["a"].use(w["a"]);var y=new w["a"].Store({state:{},mutations:{},actions:{}}),_=n("9483");Object(_["a"])("".concat("/randomizr/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}}),o["a"].config.productionTip=!1,new o["a"]({router:g,store:y,render:function(e){return e(c)}}).$mount("#app")},"5c0b":function(e,t,n){"use strict";var o=n("5e27"),r=n.n(o);r.a},"5e27":function(e,t,n){},bcc9:function(e,t,n){}});
//# sourceMappingURL=app.5630e044.js.map