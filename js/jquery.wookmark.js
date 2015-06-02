/*!
  jQuery Wookmark plugin
  @name jquery.wookmark.js
  @author Christoph Ono (chri@sto.ph or @gbks)
  @author Sebastian Helzle (sebastian@helzle.net or @sebobo)
  @version 1.4.7
  @date 05/18/2013
  @category jQuery plugin
  @copyright (c) 2009-2014 Christoph Ono (www.wookmark.com)
  @license Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
*/
(function(a){if(typeof define==="function"&&define.amd){define(["jquery"],a)}else{a(jQuery)}}(function(g){var a,c,d;d=function(i,j){return function(){return i.apply(j,arguments)}};c={align:"center",autoResize:false,comparator:null,container:g("body"),direction:undefined,ignoreInactiveItems:true,itemWidth:0,fillEmptySpace:false,flexibleWidth:0,offset:2,outerOffset:0,onLayoutChanged:undefined,possibleFilters:[],resizeDelay:50,verticalOffset:undefined};var f=window.requestAnimationFrame||function(i){i()},h=g(window);function b(i){f(function(){var j,k;for(j=0;j<i.length;j++){k=i[j];k.obj.css(k.css)}})}function e(i){return g.trim(i).toLowerCase()}a=(function(){function i(k,j){this.handler=k;this.columns=this.containerWidth=this.resizeTimer=null;this.activeItemCount=0;this.itemHeightsDirty=true;this.placeholders=[];g.extend(true,this,c,j);this.verticalOffset=this.verticalOffset||this.offset;this.update=d(this.update,this);this.onResize=d(this.onResize,this);this.onRefresh=d(this.onRefresh,this);this.getItemWidth=d(this.getItemWidth,this);this.layout=d(this.layout,this);this.layoutFull=d(this.layoutFull,this);this.layoutColumns=d(this.layoutColumns,this);this.filter=d(this.filter,this);this.clear=d(this.clear,this);this.getActiveItems=d(this.getActiveItems,this);this.refreshPlaceholders=d(this.refreshPlaceholders,this);this.sortElements=d(this.sortElements,this);this.updateFilterClasses=d(this.updateFilterClasses,this);this.updateFilterClasses();if(this.autoResize){h.bind("resize.wookmark",this.onResize)}this.container.bind("refreshWookmark",this.onRefresh)}i.prototype.updateFilterClasses=function(){var o=0,n=0,m=0,p={},r,s,l,t=this.possibleFilters,q;for(;o<this.handler.length;o++){s=this.handler.eq(o);r=s.data("filterClass");if(typeof r=="object"&&r.length>0){for(n=0;n<r.length;n++){l=e(r[n]);if(typeof(p[l])==="undefined"){p[l]=[]}p[l].push(s[0])}}}for(;m<t.length;m++){q=e(t[m]);if(!(q in p)){p[q]=[]}}this.filterClasses=p};i.prototype.update=function(j){this.itemHeightsDirty=true;g.extend(true,this,j)};i.prototype.onResize=function(){clearTimeout(this.resizeTimer);this.itemHeightsDirty=this.flexibleWidth!==0;this.resizeTimer=setTimeout(this.layout,this.resizeDelay)};i.prototype.onRefresh=function(){this.itemHeightsDirty=true;this.layout()};i.prototype.filter=function(o,w,x){var p=[],z,l=g(),u,s,r,n;o=o||[];w=w||"or";x=x||false;if(o.length){for(u=0;u<o.length;u++){n=e(o[u]);if(n in this.filterClasses){p.push(this.filterClasses[n])}}z=p.length;if(w=="or"||z==1){for(u=0;u<z;u++){l=l.add(p[u])}}else{if(w=="and"){var q=p[0],v=true,m,y,t;for(u=1;u<z;u++){if(p[u].length<q.length){q=p[u]}}q=q||[];for(u=0;u<q.length;u++){y=q[u];v=true;for(s=0;s<p.length&&v;s++){t=p[s];if(q==t){continue}for(r=0,m=false;r<t.length&&!m;r++){m=t[r]==y}v&=m}if(v){l.push(q[u])}}}}if(!x){this.handler.not(l).addClass("inactive")}}else{l=this.handler}if(!x){l.removeClass("inactive");this.columns=null;this.layout()}return l};i.prototype.refreshPlaceholders=function(k,l){var n=this.placeholders.length,p,s,j=this.columns.length,m,r,q,o,t=this.container.innerHeight();for(;n<j;n++){p=g('<div class="wookmark-placeholder"/>').appendTo(this.container);this.placeholders.push(p)}o=this.offset+parseInt(this.placeholders[0].css("borderLeftWidth"),10)*2;for(n=0;n<this.placeholders.length;n++){p=this.placeholders[n];m=this.columns[n];if(n>=j||!m[m.length-1]){p.css("display","none")}else{s=m[m.length-1];if(!s){continue}q=s.data("wookmark-top")+s.data("wookmark-height")+this.verticalOffset;r=t-q-o;p.css({position:"absolute",display:r>0?"block":"none",left:n*k+l,top:q,width:k-o,height:r})}}};i.prototype.getActiveItems=function(){return this.ignoreInactiveItems?this.handler.not(".inactive"):this.handler};i.prototype.getItemWidth=function(){var m=this.itemWidth,p=this.container.width()-2*this.outerOffset,o=this.handler.eq(0),r=this.flexibleWidth;if(this.itemWidth===undefined||this.itemWidth===0&&!this.flexibleWidth){m=o.outerWidth()}else{if(typeof this.itemWidth=="string"&&this.itemWidth.indexOf("%")>=0){m=parseFloat(this.itemWidth)/100*p}}if(r){if(typeof r=="string"&&r.indexOf("%")>=0){r=parseFloat(r)/100*p}var k=(p+this.offset),n=~~(0.5+k/(r+this.offset)),q=~~(k/(m+this.offset)),l=Math.max(n,q),j=Math.min(r,~~((p-(l-1)*this.offset)/l));m=Math.max(m,j);this.handler.css("width",m)}return m};i.prototype.layout=function(k){if(!this.container.is(":visible")){return}var l=this.getItemWidth()+this.offset,r=this.container.width(),q=r-2*this.outerOffset,m=~~((q+this.offset)/l),n=0,t=0,o=0,j=this.getActiveItems(),p=j.length,s;if(this.itemHeightsDirty||!this.container.data("itemHeightsInitialized")){for(;o<p;o++){s=j.eq(o);s.data("wookmark-height",s.outerHeight())}this.itemHeightsDirty=false;this.container.data("itemHeightsInitialized",true)}m=Math.max(1,Math.min(m,p));n=this.outerOffset;if(this.align=="center"){n+=~~(0.5+(q-(m*l-this.offset))>>1)}this.direction=this.direction||(this.align=="right"?"right":"left");if(!k&&this.columns!==null&&this.columns.length==m&&this.activeItemCount==p){t=this.layoutColumns(l,n)}else{t=this.layoutFull(l,m,n)}this.activeItemCount=p;this.container.css("height",t);if(this.fillEmptySpace){this.refreshPlaceholders(l,n)}if(this.onLayoutChanged!==undefined&&typeof this.onLayoutChanged==="function"){this.onLayoutChanged()}};i.prototype.sortElements=function(j){return typeof(this.comparator)==="function"?j.sort(this.comparator):j};i.prototype.layoutFull=function(n,p,r){var x,s=0,q=0,j=g.makeArray(this.getActiveItems()),o=j.length,u=null,l=null,m,w=[],v=[],t=this.align=="left"?true:false;this.columns=[];j=this.sortElements(j);while(w.length<p){w.push(this.outerOffset);this.columns.push([])}for(;s<o;s++){x=g(j[s]);u=w[0];l=0;for(q=0;q<p;q++){if(w[q]<u){u=w[q];l=q}}x.data("wookmark-top",u);m=r;if(l>0||!t){m+=l*n}(v[s]={obj:x,css:{position:"absolute",top:u}}).css[this.direction]=m;w[l]+=x.data("wookmark-height")+this.verticalOffset;this.columns[l].push(x)}b(v);return Math.max.apply(Math,w)};i.prototype.layoutColumns=function(m,r){var u=[],v=[],t=0,q=0,s=0,n,o,w,p,l;for(;t<this.columns.length;t++){u.push(this.outerOffset);o=this.columns[t];l=t*m+r;n=u[t];for(q=0;q<o.length;q++,s++){w=o[q].data("wookmark-top",n);(v[s]={obj:w,css:{top:n}}).css[this.direction]=l;n+=w.data("wookmark-height")+this.verticalOffset}u[t]=n}b(v);return Math.max.apply(Math,u)};i.prototype.clear=function(){clearTimeout(this.resizeTimer);h.unbind("resize.wookmark",this.onResize);this.container.unbind("refreshWookmark",this.onRefresh);this.handler.wookmarkInstance=null};return i})();g.fn.wookmark=function(i){if(!this.wookmarkInstance){this.wookmarkInstance=new a(this,i||{})}else{this.wookmarkInstance.update(i||{})}this.wookmarkInstance.layout(true);return this.show()}}));