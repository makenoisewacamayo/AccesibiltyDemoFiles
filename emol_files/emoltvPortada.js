if (typeof console == "undefined") { var console = {log: function() {}}; };
var TvArray = {};
var cartfourVideo = [];
var htmlCaja2 = "";

var Config_h5 = {
	'categoriasPortadas' : 'http://cache-elastic-pandora.ecn.cl/emoltv/channels/_search',
	'seccion' : 'portada',
	'cacheElas' : 'http://cache-elastic-pandora.ecn.cl/',
	'imgVideo' : 'http://img.tv.ecn.cl/',
	'staticVAST' : 'http://static.emol.cl/emol50',
	'rutaPubl' : 'rvv.emol.com',
	'rutaTv' : 'http://tv.emol.com',
	'OriginRut' :  'http://11dd1.http.dal05.cdn.softlayer.net/emoltv/',
	'rutaRtra' : 'rtracker.emol.com',
	'envivoPlay' : false,
	'URL_ELASTIC' : 'http://cache-elastic-pandora.ecn.cl/'
};

function emolTVPortada(){
	var htmlEmoltvPortada = "";
	//VideoCar.sort(sortFunction).shift();
	for(g = 0; VideoCar.length > g; g++){
		if(VideoCar[g].idV !== undefined && VideoCar[g].idV !== '' && g == 0){
			creaVideo(VideoCar[g].idV, g, VideoCar[g].text, VideoCar[g].img, VideoCar[g].tag);
		}else if(VideoCar[g].idV !== undefined && VideoCar[g].idV !== ''){
			var fourVideo = {};
			fourVideo.idV = VideoCar[g].idV;
			fourVideo.pos = g;
			fourVideo.tit = VideoCar[g].text;
			fourVideo.tag = VideoCar[g].tag;
			cartfourVideo[cartfourVideo.length] = fourVideo;
		}
	}
	var cantVideos = cartfourVideo.length;
	switch(cantVideos){
		case 2:
			creaVideoMasCuatro(cartfourVideo);
			break;
		case 3:
			cartfourVideo.pop();
			creaVideoMasCuatro(cartfourVideo);
			break;
		case 4:
			creaVideoMasCuatro(cartfourVideo);
			break;
	}
	menuProgramas();
};

function creaVideo(idVideo, pos, tit, img, tag){
	if(typeof tag !== 'undefined'){
		$.ajax({
			type: "GET",
			url: Config_h5.URL_ELASTIC+"emol/noticia/_search?q=id:"+idVideo,
			cache: true,
			dataType: "json",
			async: false
		}).done(function(data){
			var source = data.hits.hits[0]._source;
			var permalink = source.permalink;
			var tablas = source.tablas.tablaMedios;
			var medio360 = "";
			for(var i = 0; tablas.length > i; i++){
				if(tablas[i].IdTipoMedio == 23){
					medio360 = tablas[i].Url;
					break;
				}
			}
			if(medio360 != ""){
				var htmlEmoltvENVIVO = '';
				var imgFoto = '';
						
				TvArray.cat = '360';
				TvArray.sub = '360';
				TvArray.idV = idVideo;
				
				imgFoto = img;
				htmlEmoltvENVIVO = '<video id="videoPrin_PORTADA_'+pos+'" class="video-js vjs-default-skin vjs-big-play-centered" poster="'+imgFoto+'" crossorigin="anonymous" controls><source src="'+medio360+'.mp4" type="video/mp4" ></video>';

				$("#videoprin").append(htmlEmoltvENVIVO);
				$("#videoprin").append('<div id="textoenvivo"><a href="'+permalink+'" onclick="analyticsMer(this,"Caja_Emoltv","Portada","Zona1");return false;" target="_blank">'+tit+'</a></div></div>');
				
				videojs('videoPrin_PORTADA_'+pos+'',
				{
					controls : true,
					techOrder: ["html5"],
					fluid : true,
					height: 175,
					poster: imgFoto,
					preload: 'auto'
				},function(){
					var player = videojs('videoPrin_PORTADA_'+pos+'');
					player.volume(1);
					player.panorama({
						clickAndDrag: true,
						clickToToggle: true,
						autoMobileOrientation: true,
						initFov: 100,
						VREnable: true,
						NoticeMessage: "Click para comenzar, usa el ratón para desplazarte.",
						callback: function(){ 
							// if(!detectmob()){ 
								// player.play();
							// } 
						}
					});
					player.on('play',function(){
						videopub = player.id_;
						marcaGA(player.id_,"play", player.currentTime());
					});
					player.on('pause',function(){
						marcaGA(player.id_,"pause", player.currentTime());
					});
				});
				
				fuente = "VR";
				TvArray.tit = tit;
				TvArray.per = permalink;
				TvArray.fue = 'VR';
				TvArray.Tag = 'videoPrin_PORTADA_'+pos;
				TvArray.Mar = 0;
				VideosTv[VideosTv.length] = TvArray;
				
			}
		});
	}else{
	//COMIENZO
	$.ajax({
		type: "GET",
		url: Config_h5.cacheElas+"emoltv/media/"+idVideo,
		cache: true,
		dataType: "json",
		async: false
	}).done(
		function(data){
			if(data){
				var shortData = '';
				var htmlEmoltvENVIVO = '';
				var imgFoto = '';
				
				if(data.hasOwnProperty('_source')){
					shortData = data._source;
				} else {
					shortData = data;
				}
				
				TvArray.cat = shortData.category;
				TvArray.sub = shortData.subcategory;
				TvArray.idV = shortData.name;
				
				switch(shortData.video_type)
				{
					case "m3u8":
						Config_h5.envivoPlay = true;
						imgFoto = Config_h5.imgVideo+shortData.files.poster;
						htmlEmoltvENVIVO = '<video id="videoPrin_PORTADA_'+pos+'" class="video-js vjs-default-skin vjs-big-play-centered" poster="'+imgFoto+'"><source src="'+shortData.files.video.replace('_%DSP%','_lo/index')+'" type="application/x-mpegURL"></video>';
						$("#videoprin").append(htmlEmoltvENVIVO);
						$("#videoprin").append('<div id="textoenvivo"><a href="'+Config_h5.rutaTv+shortData.permalink+'" onclick="analyticsMer(this,"Caja_Emoltv","Portada","Zona1");return false;" target="_blank">'+tit+'</a></div></div>');
						$("#logo_emol_tv").hide().width(59);
						$("#logo_emol_tv img").attr("src",GlobalHost+"/img/logo-animado-emoltv.gif");
						$("#logo_emol_tv img").width(59);
						$("#logo_emol_tv").show();						
						
						videojs('videoPrin_PORTADA_'+pos,
						{
							controls : true,
							techOrder: ["html5"],
							fluid : true,
							height: '175',
							poster: imgFoto,
							preload: 'auto',
							autoplay: true
						},function(){
							var player = videojs('videoPrin_PORTADA_'+pos+'');
							player.volume(1);
							player.muted(true);							
							marcaGA(player.id_,"play", player.currentTime());
							marcaGAautoplay(player.id_,"autoplay");
							player.on('play',function(){
								marcaGA(player.id_,"play", player.currentTime());
								marcaGAautoplay(player.id_,"autoplay");
							});
							player.on('pause',function(){
								marcaGA(player.id_,"pause", player.currentTime());
							});
							player.on('volumechange',function(){
								for(i = 0; i < VideosTv.length; i++){
									if(VideosTv[i].Tag == player.id_){
										if(!player.muted() && VideosTv[i].Mut == 0 ){
											marcaGATrack(player.id_,"startplay");
											analyticsMerLive(this,"Caja_Emoltv","Portada","Zona1");
										}
									}
								}
							});
						});
						fuente = "propio";
						TvArray.tit = shortData.title;
						TvArray.per = shortData.permalink;
						TvArray.fue = fuente;
						TvArray.Tag = 'videoPrin_PORTADA_'+pos;
						TvArray.Mar = 0;
						TvArray.Mut = 0;
						$("body").attr("onload","");
						setTimeout(function(){ CargaFechaModificacionHomePage(); }, 900000);	
						break;
					case "mp4":
						var cdn = "";
						var VideoData = {};
						var cart = [];
						if(shortData.files.cdn){
							cdn = shortData.files.cdn;
							try{
							if(cdn.mp4_480p){
								VideoData = {};
								VideoData.src = cdn.mp4_480p.cdnUri;//.replace("http://videosetv.ecn.cl/",Config_h5.OriginRut);
								VideoData.type = "video/mp4";
								VideoData.label = "480p";
								cart[cart.length] = VideoData;
							}
							}catch(err){}
							try{
							if(cdn.mp4_360p){
								VideoData = {};
								VideoData.src = cdn.mp4_360p.cdnUri;//.replace("http://videosetv.ecn.cl/",Config_h5.OriginRut);
								VideoData.type = "video/mp4";
								VideoData.label = "360p";
								cart[cart.length] = VideoData;
							}
							}catch(err){}
							try{
							if(cdn.mp4_240p){
								VideoData = {};
								VideoData.src = cdn.mp4_240p.cdnUri;//.replace("http://videosetv.ecn.cl/",Config_h5.OriginRut);
								VideoData.type = "video/mp4";
								VideoData.label = "240p";
								cart[cart.length] = VideoData;
							}
							}catch(err){}
							
							if(cart.length >= 1){
							imgFoto = Config_h5.imgVideo+shortData.files.poster;
							htmlEmoltvENVIVO = '<video id="videoPrin_PORTADA_'+pos+'" class="video-js vjs-default-skin vjs-big-play-centered" poster="'+imgFoto+'"><source type="application/x-mpegURL"></video>';
							cat = shortData.category;
							sub = shortData.subcategory;
							idV = shortData.name;
							$("#videoprin").append(htmlEmoltvENVIVO);
							$("#videoprin").append('<div id="textoenvivo"><a href="'+Config_h5.rutaTv+shortData.permalink+'" onclick="analyticsMer(this,"Caja_Emoltv","Portada","Zona1");return false;" target="_blank">'+tit+'</a></div></div>');
							
							videojs('videoPrin_PORTADA_'+pos+'',
							{
								controls : true,
								techOrder: ["html5"],
								fluid : true,
								height: '175',
								poster: imgFoto,
								preload: 'auto',
								autoplay: false,
								sources: cart,
								plugins: {
									videoJsResolutionSwitcher: {
										default: 'high',
										dynamicLabel: true
									},
									vastClient: {
										adTagXML: requestVASTXML,
										playAdAlways: true,
										adCancelTimeout: 5000,
										adsEnabled: !!true,
										autoResize : false
									}
								}
							},function(){
								var player = videojs('videoPrin_PORTADA_'+pos+'');
								player.volume(1);
								player.on('play',function(){
									videopub = player.id_;
									marcaGA(player.id_,"play", player.currentTime());
									Config_h5.envivoPlay = true;
									TvFlo.followmeTV();
								});
								player.on('pause',function(){
									marcaGA(player.id_,"pause", player.currentTime());
								});
								player.on("ended", function(){
									if(typeof pubCar == "undefined" || pubCar == null){
										player.load();
									}				
									pubCar = null;			
								});
								player.on("vast.adStart", function(){
									pubCar = 1;
								});
								player.on("vast.adSkip", function(){
									pubCar = null;
								});
							});
							}
							fuente = "propio";
							TvArray.tit = shortData.title;
							TvArray.per = shortData.permalink;
							TvArray.fue = fuente;
							TvArray.Tag = 'videoPrin_PORTADA_'+pos;
							TvArray.Mar = 0;
						}else if(shortData.files.video.indexOf(".espn.") > -1){
							imgFoto = Config_h5.imgVideo+shortData.files.poster;
							htmlEmoltvENVIVO = '<video id="videoPrin_PORTADA_'+pos+'" class="video-js vjs-default-skin vjs-big-play-centered" poster="'+imgFoto+'"><source type="application/x-mpegURL"></video>';
							$("#videoprin").append(htmlEmoltvENVIVO);
							$("#videoprin").append('<div id="textoenvivo"><a href="'+Config_h5.rutaTv+shortData.permalink+'" onclick="analyticsMer(this,"Caja_Emoltv","Portada","Zona1");return false;" target="_blank">'+tit+'</a></div></div>');
							
							VideoData.src = shortData.files.video;
							VideoData.type = "video/"+shortData.video_type;
							cart[cart.length] = VideoData;
							
							videojs('videoPrin_PORTADA_'+pos+'',{
								controls: true,
								preload : 'auto',
								techOrder: ["html5"],
								poster: imgFoto,
								sources: cart,
								fluid : true,
								height: '175',
								autoplay: false,
								plugins: {
									vastClient: {
										adTagXML: requestVASTXML,
										playAdAlways: true,
										adCancelTimeout: 5000,
										adsEnabled: !!true,
										autoResize : false
									}
								}
							},function(opts){
								var player = videojs('videoPrin_PORTADA_'+pos+'');
								player.on('play',function(){
									videopub = player.id_;
									marcaGA(player.id_,"play", player.currentTime());
									Config_h5.envivoPlay = true;
									TvFlo.followmeTV();
								});
								player.on('pause',function(){
									marcaGA(player.id_,"pause", player.currentTime());
								});
							});
							fuente = "espn";
							TvArray.tit = shortData.title;
							TvArray.per = shortData.permalink;
							TvArray.fue = fuente;
							TvArray.Tag = 'videoPrin_PORTADA_'+pos;
							TvArray.Mar = 0;
						}else{
							htmlEmoltvENVIVO = '<div id="destacado_principal"><a href="'+Config_h5.rutaTv+shortData.permalink+'" target="_blank" onclick="analyticsMer(this,"Caja_Emoltv","Portada","Zona1");return false;" target="_blank"><div class="play_video_desta_principal"><img src="http://static.emol.cl/emol50/img/play_g.png" border="0"></div><div class="id_programa">'+shortData.subcategory+'</div><div class="hover-info_pr" style="display: block; opacity: 0.0170722;"><b>'+tit+'</b><br><br>'+shortData.description+'</div><img src="'+Config_h5.imgVideo+shortData.files.poster+'" width="100%" height="175" border="0"></a><div class="titulo_destacado_emoltv_p" style="display: none;">'+tit+'</div></div>';
							$("#videoprin").append(htmlEmoltvENVIVO);
							$("#videoprin").append('<div id="textoenvivo"><a href="'+Config_h5.rutaTv+shortData.permalink+'" onclick="analyticsMer(this,"Caja_Emoltv","Portada","Zona1");return false;" target="_blank">'+shortData.title+'</a></div></div>');
						}
						break;
					case "youtube":
						var cdn = "";
						var VideoData = {};
						var cart = [];
						imgFoto = Config_h5.imgVideo+shortData.files.poster;
						htmlEmoltvENVIVO = '<video id="videoPrin_PORTADA_'+pos+'" class="video-js vjs-default-skin vjs-big-play-centered" poster="'+imgFoto+'"><source type="video/youtube"></video>';
						$("#videoprin").append(htmlEmoltvENVIVO);
						$("#videoprin").append('<div id="textoenvivo"><a href="'+Config_h5.rutaTv+shortData.permalink+'" target="_blank">'+shortData.title+'</a></div></div>');
						
						VideoData.src = shortData.files.video;
						VideoData.type = "video/"+shortData.video_type;
						cart[cart.length] = VideoData;
						
						videojs('videoPrin_PORTADA_'+pos+'',{
							controls: true,
							autoplay: false,
							preload : 'auto',
							techOrder: ["youtube","html5"],
							sources: cart,
							youtube: { ytControls : 0},
							poster: imgFoto,
							fluid : true,
							height: '175',
							//width: '100%',
						},function(){
							var player = videojs('videoPrin_PORTADA_'+pos+'');
							player.on('play',function(){
								marcaGA(player.id_,"play", player.currentTime());
								Config_h5.envivoPlay = true;
								TvFlo.followmeTV();
							});
							player.on('pause',function(){
								marcaGA(player.id_,"pause", player.currentTime());
							});
						});
						fuente = "youtube";
						TvArray.tit = shortData.title;
						TvArray.per = shortData.permalink;
						TvArray.fue = fuente;
						TvArray.Tag = 'videoPrin_PORTADA_'+pos;
						TvArray.Mar = 0;
						break;
				}
				VideosTv[VideosTv.length] = TvArray;
			}
		});
		//FIN
	}
};

function creaVideoMasCuatro(cartfourVideo){
	var videoName = '';
	if(cartfourVideo.length > 0){
		for(i = 0; cartfourVideo.length > i; i++){
			if(typeof cartfourVideo[i].tag === 'undefined'){
				if((i+1) != cartfourVideo.length){
					videoName = videoName + 'name:'+cartfourVideo[i].idV+'+OR+';
				}else{
					videoName = videoName + 'name:'+cartfourVideo[i].idV;
				}
			}
		}
		
		$.ajax({
			async: false,
			type: "GET",
			url: Config_h5.cacheElas+"emoltv/media/_search?q=("+videoName+")+AND+status:published",
			cache: true,
			dataType: "json",
			success : function(data){
						if(data){
							for(j=0; data.hits.hits.length > j; j++){
								var htmlEmoltv = '';
								var shortData = '';
								var zonaCont = (j + 1);
								for(k=0; data.hits.hits.length > k; k++){
									if(data.hits.hits[k]._source.name == cartfourVideo[j].idV){
										shortData = data.hits.hits[k]._source;
										break;
									}
								}
								if(shortData != ''){								
									var imgData = "";
									try{
										imgData = shortData.files.thumbnail;
										if(typeof imgData === 'undefined'){
											imgData = 'http://static.tv.ecn.cl/images/emoltv_default.jpg';
										}else{
											imgData = "http://img.tv.ecn.cl/" + imgData;
										}					
									}catch(err){
										imgData = 'http://static.tv.ecn.cl/images/emoltv_default.jpg';
									}
									
									if (cartfourVideo[j].pos % 2 == 1){										
										htmlEmoltv = htmlEmoltv + "<div class=\"destacado_secundario_izq\"><a href=\"http://tv.emol.com"+shortData.permalink+"\"  onclick=\"analyticsMer(this,'Caja_Emoltv','Portada','Zona"+zonaCont+"');return false;\" target=\"_blank\">";
										if (shortData.subcategory == "En Vivo"){
											htmlEmoltv = htmlEmoltv + "<div class=\"id_programa\" style=\"background-color: red;\">"+shortData.subcategory+"</div>";
										}else{
											if(!shortData.advance){
												htmlEmoltv = htmlEmoltv + "<div class=\"id_programa\">"+shortData.subcategory+"</div>";
											}else{
												htmlEmoltv = htmlEmoltv + "<div class=\"id_programa\" style=\"background-color: purple !important\">Avance</div>";
											}
										}
										htmlEmoltv = htmlEmoltv + "<div class=\"hover-info\">"+cartfourVideo[j].tit+"</div><div class=\"cont_img_etv_thumb\"><img src=\""+imgData+"\" width=\"100%\" alt=\""+cartfourVideo[j].tit+"\" border=\"0\" /><div class=\"titulo_destacado_emoltv_s\">"+cartfourVideo[j].tit+"</div></div></a></div>";
										$("#videomascuatro").html($("#videomascuatro").html() + htmlEmoltv);
									}else{
										htmlEmoltv = htmlEmoltv + "<div class=\"destacado_secundario_der\"><a href=\"http://tv.emol.com"+shortData.permalink+"\" onclick=\"analyticsMer(this,'Caja_Emoltv','Portada','Zona"+zonaCont+"');return false;\" target=\"_blank\">";
										if (shortData.subcategory == "En Vivo"){
											htmlEmoltv = htmlEmoltv + "<div class=\"id_programa\" style=\"background-color: red;\">"+shortData.subcategory+"</div>";
										}else{
											if(!shortData.advance){
												htmlEmoltv = htmlEmoltv + "<div class=\"id_programa\">"+shortData.subcategory+"</div>";
											}else{
												htmlEmoltv = htmlEmoltv + "<div class=\"id_programa\" style=\"background-color: purple !important\">Avance</div>";
											}
										}
										htmlEmoltv = htmlEmoltv + "<div class=\"hover-info\">"+cartfourVideo[j].tit+"</div><div class=\"cont_img_etv_thumb\"><img src=\""+imgData+"\" width=\"100%\" alt=\""+cartfourVideo[j].tit+"\" border=\"0\" /><div class=\"titulo_destacado_emoltv_s\">"+cartfourVideo[j].tit+"</div></div></a></div>";
										$("#videomascuatro").html($("#videomascuatro").html() + htmlEmoltv);
									}
								}
							}
						}
					}
				});
				
	}
};

function analyticsMer(link, category, action, label){	 
	try{
		_gaq.push(['u._setAccount', 'UA-27345792-14']);
		_gaq.push(['u._setDomainName', '.emol.com']);
		_gaq.push(['u._trackEvent',category,action,label,1,true]);
		setTimeout( window.open(link.href), 200);
	}catch(err){}
};

function analyticsMerLive(link, category, action, label){	 
	var zlabel = ($("#videoprin").hasClass('flotaTV'))? "Zona6" : label;
	try{
		_gaq.push(['u._setAccount', 'UA-27345792-14']);
		_gaq.push(['u._setDomainName', '.emol.com']);
		_gaq.push(['u._trackEvent',category,action,zlabel,1,true]);
	}catch(err){}
};

function menuProgramas(){
	var htmlEmoltvCategory = "";
	/*$.ajax({
	type: "GET",
		url: Config_h5.categoriasPortadas,
		cache: true,
		dataType: "json",
	}).done(function (data) {
		if(data){
			for(var j=0; data.hits.hits.length > j; j++){
				var shortData = data.hits.hits[j]._source;
				htmlEmoltvCategory = htmlEmoltvCategory + "<div class=\"programas\"><ul><li><div class=\"categoria\"><a href=\"http://tv.emol.com/channel/"+shortData.slug+"\" target=\"_blank\">"+shortData.name+"</a></div>";
				for(var k=0; shortData.shows.length > k; k++){
					if(!shortData.shows[k].fe_hidden){
						htmlEmoltvCategory = htmlEmoltvCategory + "<li><a href=\"http://tv.emol.com/"+shortData.slug+"/show/"+shortData.shows[k].slug+"\" target=\"_blank\">"+shortData.shows[k].name+"</a></li>";
					}
				}
				htmlEmoltvCategory = htmlEmoltvCategory + "</ul></div>";
			}
			$(".contenido_programas2").html(htmlEmoltvCategory);
			$("#menu_programas2").click(function(){
				$(".contenido_programas2").slideToggle();
			});
		}
	}).fail(function() { console.log("Error de lectura en Json..."); });*/
	htmlEmoltvCategory = '<div class="programas"><ul><li><a href="http://tv.emol.com/channel/tecnologia">Tecnología</a></li><li><a href="http://tv.emol.com/channel/entretenimiento">Entretenimiento</a></li><li><a href="http://tv.emol.com/channel/virales">Virales</a></li><li><a href="http://tv.emol.com/channel/actualidad">Actualidad</a></li><li><a href="http://tv.emol.com/channel/tendecias">Tendencias</a></li><li><a href="http://tv.emol.com/channel/deportes">Deportes</a></li></ul></div>';
	$(".contenido_programas2").html(htmlEmoltvCategory);
	$("#menu_programas2").click(function(){
		$(".contenido_programas2").slideToggle();
	});
};

function normalize(str) {
	var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
		to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
		mapping = {};
	for(var i = 0, j = from.length; i < j; i++ ){
		mapping[ from.charAt( i ) ] = to.charAt( i );
	}
	
	var ret = [];
	for( var i = 0, j = str.length; i < j; i++ ) {
		var c = str.charAt( i );
		if( mapping.hasOwnProperty( str.charAt( i ) ) )
			ret.push( mapping[ c ] );
		else
			ret.push( c );
	}
	return ret.join('').replace( /(\d+(?:\.\d*)?)F\b|[^-A-Za-z0-9]+/g, '-' ).toLowerCase();
};

function detectmob() { 
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    return true;
  }
 else {
    return false;
  }
};

function requestVASTXML(callback) {
	setTimeout(function(){
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				callback(null, xhttp.response);
			}
		};
		
		if(videopub != ""){
			for(i = 0; i < VideosTv.length; i++){
				if(VideosTv[i].Tag == videopub){
					xhttp.open("GET", "http://"+Config_h5.rutaPubl+"/www/delivery/fc.php?script=bannerTypeHtml:vastInlineBannerTypeHtml:vastInlineHtml&zones=pre-roll0-0%3D302&nz=1&source=&r=R0.023106331005692482&block=1&format=vast&charset=UTF-8&category="+VideosTv[i].cat+"&subcategory="+VideosTv[i].sub+"&idVideo="+VideosTv[i].idV, true);
					break;
				}
			}
		}
		
		xhttp.send();
	}, 0);
};

function marcaGA(idTag,evento,tiempo){
	if(VideosTv.length >= 1){
		for(i = 0; i < VideosTv.length; i++){
			if(VideosTv[i].Tag == idTag && VideosTv[i].Mar == 0){
				
				var area = VideosTv[i].per.replace("/detail/","/video/");
				var tagAnl = (area.indexOf('/noticias/360/') > -1) ?  'UA-27345792-18' : 'UA-27345792-14';
				
				_gaq.push(['_setAccount', tagAnl]);
				//_gaq.push(['_setAccount', 'UA-27345792-18']); 360noticia
				_gaq.push(['_setDomainName', '.emol.com']);
				_gaq.push(['_set', 'title', VideosTv[i].tit]);
				_gaq.push(['_trackPageview', area]);

				_gaq.push(['v._setAccount', 'UA-8908154-1']);
				_gaq.push(['v._setDomainName', '.emol.com']);
				_gaq.push(['v._set', 'title', VideosTv[i].tit]);
				_gaq.push(['v._trackPageview', area]);
				
				_paq.push(['setCustomUrl', area]);
				_paq.push(['setCookieDomain', '*.emol.com']);
				_paq.push(['setDomains', '*.emol.com']);
				_paq.push(['trackPageView']);
				_paq.push(['enableLinkTracking']);
				
				if(area.indexOf('/noticias/360/') == -1){
					$.get("http://etvstats.ecn.cl/log/"+VideosTv[i].idV,function(data){});
				}
				
				VideosTv[i].Mar = 1;
			}
			try{
				eventTv(evento,VideosTv[i].idV,tiempo,VideosTv[i].fue,VideosTv[i].tit,VideosTv[i].per);
			}catch(erro){console.log(erro.message);}
		}
	}
};

function marcaGATrack(idTag,evt){
	if(VideosTv.length >= 1){
		for(i = 0; i < VideosTv.length; i++){
			if(VideosTv[i].Tag == idTag && VideosTv[i].Mut == 0){
				var categoriaVideo = (detectmob())?"periodisticoM":"periodisticoE";
				_gaq.push(['_trackEvent',categoriaVideo, evt, VideosTv[i].cat+","+VideosTv[i].sub+","+buscaFuente(VideosTv[i].fue)+","+VideosTv[i].tit, 1, true]);
				VideosTv[i].Mut = 1;
			}
		}
	}
};

function marcaGAautoplay(idTag,evt){
	if(VideosTv.length >= 1 && !detectmob()){
		for(i = 0; i < VideosTv.length; i++){
			if(VideosTv[i].Tag == idTag && VideosTv[i].Mut == 0){
				var categoriaVideo = (detectmob())?"periodisticoM":"periodisticoE";
				_gaq.push(['_trackEvent',categoriaVideo, evt, VideosTv[i].cat+","+VideosTv[i].sub+","+buscaFuente(VideosTv[i].fue)+","+VideosTv[i].tit, 1, true]);
			}
		}
	}
};
		
function eventTv(e,id,t,f,ti,p){
	switch(e){
		case "play":
			$.ajax({
			type: "POST",
			dataType: "json",
			url: "http://"+Config_h5.rutaRtra+"/tv/play",
			data: { idvideo: id, time: t, evento:e, fuente: f, title: ti, link: p},
			success: function(){}
			});
			break;
		case "pause":
			$.ajax({
			type: "POST",
			dataType: "json",
			url: "http://"+Config_h5.rutaRtra+"/tv/pause",
			data: { idvideo: id, time: t, evento: e, fuente: f, title: ti, link: p},
			success: function(){}
			});
			break;
		case "stop":
			$.ajax({
			type: "POST",
			dataType: "json",
			url: "http://"+Config_h5.rutaRtra+"/tv/stop",
			data: { idvideo: id, time: t, evento: e, fuente: f, title: ti, link: p},
			success: function(){}
			});
			break;
	}
};

function buscaFuente(str){
	switch(str){
		case "propio":
			return "emoltv";
		case "espn":
			return "externo-espn";
		case "youtube":
			return "externo-youtube";
		default:
			return "emoltv";
	}
};

function sortFunction(a, b) {
    if (a.ord === b.ord) { return 0; }
    else { return (a.ord < b.ord) ? -1 : 1; }
};