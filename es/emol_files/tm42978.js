var nvg42978=window.nvg42978||new function(){this.version=7;this.url=false;this.tuple=false;this.domain=false;this.userId=false;this.userSync='';this.segmentKey=false;this.segmentValue=false;this.control=false;this.segmentKey=false;this.segmentValue=false;this.wantString=true;this.wantCustom=false;this.navdmp=false;this.qry=false;this.debug=false;this.hasloaded=false;this.cokCache={};this.coknm='navdmp';this.makeSync=true;this.hasAthena=false;this.parameter='/req?v='+this.version;this.schema='//';this.account=42978;this.wantCustom=true;this.wantString=false;this.coknm='nav'+this.account.toString();this.server=Array('usr.navdmp.com','cdn.navdmp.com');this.segments=Array('','gender','age','education','marital','income','prolook','connection','city','region','country','cluster','custom','brand','interest','product','career','industry','everybuyer');this.preLoad=function(){if(!window['nvg'+this.account])window['nvg'+this.account]=this;if(window.location.hostname.search(this.domain)==-1)this.domain='';if(!this.domain)this.domain=this.__getTLD();try{var n_schema=new URL(document.getElementById('navegg').src);if(n_schema.protocol=="https:")this.schema="https://";}catch(e){};this.navdmp=this.getCookie(this.coknm)||false;if(this.getParameter('navegg_debug')=='1')this.debug=true;if(this.navdmp){var arr=this.navdmp.split('_');this.userId=arr[0];if(this.userId.indexOf('|')>=0){this.userId=this.userId.split('|');this.userSync='|'+this.userId[1];this.userId=this.userId[0];};this.control=arr[1];if(typeof (window.localStorage)=="object"){localnav=window.localStorage.getItem(this.coknm);if(localnav){try{localnav=localnav.split('_');if(localnav.length==4&&localnav[1]==this.datestr()){this.segmentKey=localnav[2].split(':');this.segmentValue=localnav[3].split(':');}else{window.localStorage.removeItem(this.coknm);this.control=false;}}catch(e){};}else this.control=false;}if(!this.segmentKey){if(arr[2])this.segmentKey=arr[2].split(':');if(arr[3])this.segmentValue=arr[3].split(':');}this.__load_custom_fp();};if(this.tagCode)this.include('','script',this.tagCode);};this.load=function(){if(this.hasloaded)return false;this.hasloaded=true;if(!this.navdmp)this.preLoad();var url='/usr?v='+this.version;url+='&acc='+this.account;if(this.debug){url='http://debug.navdmp.com'+url;this.include(url,'script');}else if(!this.userId||this.tagManagerCode||this.control!=this.datestr()||!this.userSync){if((!this.control)||(this.control!=this.datestr())){url+='&upd=1';this.parameter+='&upd=1';}if(this.userId){url+='&id='+this.userId;if(!this.userSync)url+='&jds=1';}else{url+='&new=1';this.parameter+='&new=1';}if(!this.wantString)url+='&wst=0';if(this.wantCustom)url+='&wct=1';if(!this.makeSync)url+='&dsy=0';this.include(this.schema+this.server[0]+url,'script');};if(this.navdmp)if(!this.debug)this.saveRequest(this.userId);;if(typeof (this.tagSync)=="function")this.tagSync();};this.saveLSPersona=function(){var idx,data,col,cols,persona={};cols=this.getCollectionList();for(idx=0;idx<cols.length;idx++){col=cols[idx];data=this.getSegment(col).split('-');if(data.length==1&&data!='')persona[col]=data[0];else persona[col]=data;}window.localStorage.setItem('nvgpersona'+this.account,JSON.stringify(persona));return true;};this.start=function(id,keys,values){if(((this.userId!=id)||(this.control!=this.datestr()))&&id!=''){this.userId=id;document.cookie=this.coknm+'=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';this.setCookie(this.coknm,id+this.userSync+'_'+this.datestr());};if(keys&&values)this.tuple=keys+'_'+values;this.saveLocal(this.coknm,id+'_'+this.datestr()+'_'+(this.tuple||'_'));if(keys)this.segmentKey=keys.split(':');if(values)this.segmentValue=values.split(':');this.__load_custom_fp();if(this.wantCookie&&keys&&values)this.cokCustom(id+this.userSync);if(typeof (this.cokCustomOld)=="function")this.cokCustomOld(id);if(this.tagManagerCode)this.include('','script',this.tagManagerCode);if((!this.navdmp)&&!this.debug)this.saveRequest(id);if(typeof (this.dataCustom)=="function")this.dataCustom();if(typeof navegg_callback=="function"&&(this.control!=this.datestr()))try{navegg_callback();}catch(e){};this.saveLSPersona();};this.call_callbacks=function(){function callUserFunc(userFunc){if(typeof userFunc=="function")try{userFunc();}catch(e){};}function AsyncExecutor(pending){if(typeof pending!="undefined"&&pending.length)for(var i=0;i<pending.length;i++)callUserFunc(pending[i]);}AsyncExecutor.prototype.push=function(userFunc){callUserFunc(userFunc);};window.naveggReady=new AsyncExecutor(window.naveggReady);};this.__set_custom_fp=function(custom){var cus_n='nvgcus'+this.account;var cus_l=window.localStorage.getItem(cus_n);if(cus_l){cus_l=cus_l.split('-');if(cus_l.indexOf(custom.toString())==-1)cus_l.push(custom.toString());cus_l=cus_l.join('-');}else cus_l=custom;window.localStorage.setItem(cus_n,cus_l);this.__load_custom_fp();};this.__load_custom_fp=function(){var cus_n='nvgcus'+this.account;var cus_l=window.localStorage.getItem(cus_n);if(cus_l){cus_l=cus_l.split('-');var act_l=this.getSegment('custom');act_l=act_l.split('-');var nvg_x;if(act_l[0]=="")act_l=new Array();for(nvg_x=0;nvg_x<cus_l.length;nvg_x++)if(act_l.indexOf(cus_l[nvg_x])==-1)act_l.push(cus_l[nvg_x]);var pos_c=this.segments.indexOf('custom');this.segmentKey=this.segmentKey||[];this.segmentValue=this.segmentValue||[];var idx_c=this.segmentKey.indexOf(pos_c.toString());if(idx_c==-1){this.segmentKey.push(pos_c);this.segmentValue.push(act_l.join('-'));}else this.segmentValue[pos_c]=act_l.join('-');delete this.cokCache.custom;}};this.setCookie=function(fld,vle,ttl){var ltd='';if(this.domain)ltd=';domain='+this.domain;var d=new Date();if(ttl!=ttl||!ttl)ttl=365;d.setTime(d.getTime()+(ttl*24*60*60*1000));var ttl=d.toGMTString();document.cookie=fld+"="+vle+";expires="+ttl+";path=/"+ltd;};this.include=function(src,inctype,html,nvgasync){if(inctype==''||inctype==undefined)inctype="script";if(nvgasync===''||nvgasync===undefined)nvgasync=true;var c=document.createElement(inctype);if(inctype=='script')c.type="text/javascript";if(html)c.text=html;else c.src=src;c.async=nvgasync;var p=document.getElementsByTagName('script')[0];p.parentNode.insertBefore(c,p);};this.getCookie=function(name){var start=document.cookie.indexOf(name+"=");var len=start+name.length+1;if((!start)&&(name!=document.cookie.substring(0,name.length)))return null;if(start==-1)return null;var end=document.cookie.indexOf(";",len);if(end==-1)end=document.cookie.length;return unescape(document.cookie.substring(len,end));};this.__getTLD=function(){var tld,parts,parcial="",x,d,result,val,coknm;coknm='nvgTLD'+this.account;d=new Date();val=d.getTime();tld=window.localStorage.getItem('nvgTLD');if(tld)return tld;parts=window.location.hostname.split(".");for(x=parts.length-1;x>0;x--){parcial="."+parts[x]+parcial;d.setTime(d.getTime()+5*1000);document.cookie=coknm+'='+val+';expires='+(d.toGMTString())+';domain='+parcial;result=this.getCookie(coknm);if(result==val){window.localStorage.setItem('nvgTLD',parcial);d=new Date();document.cookie=coknm+'='+val+';expires='+(d.toGMTString())+';domain='+parcial;return parcial;}}return '.'+window.location.hostname;};this.doDebug=function(data){var list=data.split('|');for(var line=0;line<list.length;line++){var a;a=list[line].split('_');this.cokCache[a[0]]=a[1];}this.call_callbacks();if(typeof navegg_callback=="function")try{navegg_callback();}catch(e){};};this.getCollectionList=function(){var segs=this.segments.slice();segs=segs.filter(function(a){return a!='industry'&&a!='prolook'&&a!='';});segs[segs.indexOf('cluster')]='everyone';return segs;};this.getSegment=function(fld){if(fld=='everybuyer')fld='industry';else if(fld=='everyone')fld='cluster';if(fld in this.cokCache)return this.cokCache[fld]||'';var cpos=new Array(),segpa,segpb,rtn='',x=0;if(!this.segmentValue){var ckcnt;cpos[0]=0;cpos[1]=1;if(!(ckcnt=this.tuple)){cpos[0]=2;cpos[1]=3;if(!(ckcnt=this.navdmp))return '';;};ckcnt=ckcnt.split('_');try{this.segmentKey=ckcnt[cpos[0]].split(':');this.segmentValue=ckcnt[cpos[1]].split(':');}catch(e){return '';};};segpa=this.findOf(fld,this.segments);if(segpa)segpb=this.findOf(segpa.toString(),this.segmentKey);if(segpb>=0)rtn=this.segmentValue[segpb];if(rtn==undefined)return '';rtn=rtn.indexOf(';')>=0?rtn.split(';').join('-'):rtn;if(rtn.indexOf('-')>=0){rtnt=rtn.split('-');rtnf=new Array();for(x=0;x in rtnt;x++)if(rtnt[x]!=''&&rtnt[x]!='undefined')rtnf.push(rtnt[x]);rtn=rtnf.join('-');};this.cokCache[fld]=rtn;return rtn;};this.datestr=function(){var now=new Date();var start=new Date(now.getFullYear(),0,0);var diff=now-start;var oneDay=1000*60*60*24;return Math.ceil(diff/oneDay).toString();};this.getParameter=function(fld){if(!this.qry){this.qry={};prmstr=window.location.search.substr(1);prmarr=prmstr.split("&");for(var i=0;i<prmarr.length;i++){tmparr=prmarr[i].split("=");this.qry[tmparr[0]]=tmparr[1];};};return this.qry[fld]||'';};this.cokCustom=function(id){var ckc=':'+this.tag+':';var cok=new Array();cok[0]=new Array();cok[1]=new Array();var str,paA,paB,cokPos,y;str=paA=paB='';y=0;cokPos=this.HighGranularity?1:0;for(x=0;this.segmentKey[x];x++){if(ckc.search(':'+this.segments[this.segmentKey[x]]+':')==-1)continue;paA=this.segmentKey[x];paB=this.segmentValue[x]||'';if(paB=='')continue;cok[0][y]=paA;cok[1][y]=paB;if(paB.search('-')>=0||paB.search(';')>=0){if(paB.search(';')>0)paB=paB.split(';')[cokPos];var ncok=new Array();var nmac=paB.split('-');for(h=0;nmac[h]&&h<this.maxCriteria;h++)ncok[h]=nmac[h];cok[1][y]=ncok.join('-');};y++;};str=cok[0].join(':').replace(/;/g,'')+'_'+cok[1].join(':').replace(/;/g,'');this.setCookie(this.coknm,id+'_'+this.datestr()+'_'+str);};this.saveRequest=function(profile){var a;this.parameter+='&id='+profile+this.userSync;if(this.account)this.parameter+='&acc='+this.account;if(this.product)this.parameter+='&prd='+this.product;if(this.category)this.parameter+='&cat='+this.category;if(this.url)this.parameter+='&url='+escape(this.url);if(document.referrer)this.parameter+='&ref='+escape(document.referrer);this.parameter+='&tit='+escape(document.title);if(a=this.getCookie('__utmz'))this.parameter+='&utm='+escape(a);if(this.hasAthena)if(a=this.getH1())this.parameter+='&h1='+escape(a);this.include(this.schema+this.server[1]+this.parameter);if(typeof navegg_callback=="function"&&(this.control==this.datestr()))try{navegg_callback();}catch(e){};this.call_callbacks();};this.getH1=function(){function __get_children(element){if(element.children.length)return __get_children(element.children[0]);if(element.tagName=="IMG")return element.alt||'';return element.innerText;}var h1;h1=document.getElementsByTagName('h1');if(!h1.length)return '';return __get_children(h1[0]);};this.setCustom=function(custom){var toCus='/req';toCus+='?acc='+this.account;if(this.userId)toCus+='&id='+this.userId;toCus+='&cus='+custom;this.include(this.schema+this.server[1]+toCus);this.__set_custom_fp(custom);};this.doSync=function(version){var cok=this.getCookie(this.coknm)||'';cok=cok.split('_');if(cok[0].search(/\|/)>=0){cok[0]=cok[0].split('|');cok[0]=cok[0][0];};cok[0]+='|'+version;cok=cok.join('_');this.setCookie(this.coknm,cok);};this.saveLocal=function(id,data){window.localStorage.setItem(id,data);};this.findOf=function(val,ar){if(typeof ar!='object')return -1;for(x in ar)if(ar[x]==val)return x;return -1;};this.setCustomTargeting=function(rules,cusId){var nvg_pos_x,nvg_pos_y,nvg_or_arr,nvg_flag;for(nvg_pos_x=0;nvg_pos_x<rules.length;nvg_pos_x++){nvg_or_arr=rules[nvg_pos_x];nvg_flag=false;for(nvg_pos_y=0;nvg_pos_y<nvg_or_arr.length;nvg_pos_y++)if(window.location.href.search(nvg_or_arr[nvg_pos_y])>=0)nvg_flag=true;if(!nvg_flag)return false;}this.setCustom(cusId);return true;};}();function nvgGetSegment(f){return nvg42978.getSegment(f);};function ltgc(s){return nvg42978.getSegment(s);};nvg42978.load();