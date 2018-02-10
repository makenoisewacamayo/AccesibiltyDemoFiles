var urlComments = "//comentarios.emol.com/Comments/Api";
var urlCacheComments = "//cache-comentarios.ecn.cl/Comments/Api";
var cmtData = {
	accessToken: getCookie("SSTES"),
	title: "",
	size: "10",
	order: 'TIME_DESC',
	isAdmin: false,
	authType: 'emol',
	page: '',
	urlHash : "",
	cVermas : 0,
	tym : 'undefined',
	aprtym : false,
	aprF : false,
	activeChat: 0,
	timestamp: 0,
	userChats: ""
};
var configPerfil = {
	commentsCount : 0,
	numComment : 2,
};
var CommentsApi = {	

	getFollowers: function (id) {
		if (mobilecheck()) {
			$('body').addClass('block_scroll');
		}
		$('.dashboard_comment_followers').empty();
		$.ajax({
			url: urlCacheComments,
			dataType: "json",
			data: {
				action: "getFollowers",
				accessToken: cmtData.accessToken,
				selectedUserId: id,
				format: "json",
				authType: cmtData.authType
			},
			method: "GET",
			cache: false
		}).done(function (response) {
			var htmlLastComment = $("<div>").html('').attr('class', 'dashboard_comment_follow_list');
			(response).forEach(function (entry) {
				var userId = getCookie("c_user_i");

				if (getCookie("c_user_f") != undefined && getCookie("c_user_f") != '') {
					var arrayF = JSON.parse(unescape(getCookie("c_user_f")));
					if (entry.id != userId) {
						try{
							entry.urlAvatar = entry.urlAvatar.replace(/http:/g,'https:')
						}catch(e){}
						if (!arrayF.includes(entry.id)) {
							//$('.perfil_seguir_'+data[0].creatorId).addClass('seguir_usuario').attr('onclick','CommentsApi.follow('+ data[0].creatorId +')').append('Seguir');
							htmlLastComment.append(
							$('<div>').attr('class', 'dashboard_comment_follow').append(
									$('<a>').attr('href', '//comentarista.emol.com/' + entry.id + '/'+ entry.nickname.removeAccents().replace(/ /g,'-')+'.html').append(
										$('<img>').attr('onclick', 'loadPerfil("' + entry.id + '")').attr('src', entry.urlAvatar).attr('width', 'auto').attr('height', 'auto').attr('class', 'dashboard_img_follow'),
										$('<div>').attr('class', 'dashboard_content_follow').append(
										$('<div>').attr('onclick', 'loadPerfil("' + entry.id + '")').attr('class', 'dashboard_title_follow').append(entry.nickname)
										)
									)
									,
									$('<div>').attr('id', 'button_follow_' + entry.id).attr('class', 'button_follow').attr('onclick', 'CommentsApi.follow(' + entry.id + ')').append(
									$('<i>').attr('class', 'fa fa-user-plus').attr('aria-hidden', 'true').append(),
									'Seguir'
									)
								
							)
							)
						} else {
							//$('.perfil_seguir_'+data[0].creatorId).addClass('seguir_usuario').attr('onclick','CommentsApi.unFollow('+ data[0].creatorId +')').append('Dejar de Seguir');
							htmlLastComment.append(
							$('<div>').attr('class', 'dashboard_comment_follow').append(
							$('<a>').attr('href', '//comentarista.emol.com/' + entry.id + '/'+ entry.nickname.removeAccents().replace(/ /g,'-')+'.html').append(
							$('<img>').attr('onclick', 'loadPerfil("' + entry.id + '")').attr('src', entry.urlAvatar).attr('width', 'auto').attr('height', 'auto').attr('class', 'dashboard_img_follow'),
							$('<div>').attr('class', 'dashboard_content_follow').append(
							$('<div>').attr('onclick', 'loadPerfil("' + entry.id + '")').attr('class', 'dashboard_title_follow').append(entry.nickname)
							)
							),

							$('<div>').attr('id', 'button_follow_' + entry.id).attr('class', 'button_follow bt_unfollow').attr('onclick', 'CommentsApi.unFollow(' + entry.id + ')').append(
							$('<i>').attr('class', 'fa fa-user-times').attr('aria-hidden', 'true').append(),
							'Dejar de Seguir'

							)
							)
							)
						}
					}
					else {
						//es el mismo usuario no va el boton                        
						htmlLastComment.append(
							$('<div>').attr('class', 'dashboard_comment_follow').append(
								$('<img>').attr('onclick', 'loadPerfil("' + entry.id + '")').attr('src', entry.urlAvatar).attr('width', 'auto').attr('height', 'auto').attr('class', 'dashboard_img_follow'),
								$('<div>').attr('class', 'dashboard_content_follow').append(
								$('<div>').attr('onclick', 'loadPerfil("' + entry.id + '")').attr('class', 'dashboard_title_follow').append(entry.nickname)
								)
							)
						)
					}
				}
				else {
					//usuario no está logueado
					htmlLastComment.append(
						$('<div>').attr('class', 'dashboard_comment_follow').append(
							$('<img>').attr('onclick', 'loadPerfil("' + entry.id + '")').attr('src', entry.urlAvatar).attr('width', 'auto').attr('height', 'auto').attr('class', 'dashboard_img_follow'),
							$('<div>').attr('class', 'dashboard_content_follow').append(
							$('<div>').attr('onclick', 'loadPerfil("' + entry.id + '")').attr('class', 'dashboard_title_follow').append(entry.nickname)
							)
						)
					)
				}

			});

			if (response.length === 0) {
				htmlLastComment.append(
				$('<div>').attr('class', 'dashboard_comment').append('Sin Seguidores')
				)
			}

			$('.dashboard_comment_followers').html(htmlLastComment);

		});
	},

	getFollowing: function (id) {
		if (mobilecheck()) {
			$('body').addClass('block_scroll');
		}
		$('.dashboard_comment_followings').empty();
		$.ajax({
			url: urlCacheComments,
			dataType: "json",
			data: {
				action: "getFollowing",
				accessToken: cmtData.accessToken,
				selectedUserId: id,
				format: "json",
				authType: cmtData.authType
			},
			method: "GET",
			cache: false
		}).done(function (response) {

			var htmlLastComment = $("<div>").html('').attr('class', 'dashboard_comment_follow_list');
			(response).forEach(function (entry) {
				var userId = getCookie("c_user_i");

				if (getCookie("c_user_f") != undefined && getCookie("c_user_f") != '') {
					var arrayF = JSON.parse(unescape(getCookie("c_user_f")));

					if (entry.id != userId) {
					
						try{
							entry.urlAvatar = entry.urlAvatar.replace(/http:/g,'https:')
						}catch(e){}
					
						if (!arrayF.includes(entry.id)) {
							htmlLastComment.append(
							$('<div>').attr('class', 'dashboard_comment_follow').append(
							$('<a>').attr('href', '//comentarista.emol.com/' + entry.id + '/'+ entry.nickname.removeAccents().replace(/ /g,'-')+'.html').append(
							$('<img>').attr('onclick', 'loadPerfil("' + entry.id + '")').attr('src', entry.urlAvatar).attr('width', 'auto').attr('height', 'auto').attr('class', 'dashboard_img_follow'),
							$('<div>').attr('class', 'dashboard_content_follow').append(
							$('<div>').attr('onclick', 'loadPerfil("' + entry.id + '")').attr('class', 'dashboard_title_follow').append(entry.nickname)
							)
							),

							$('<div>').attr('id', 'button_follow_' + entry.id).attr('class', 'button_follow').attr('onclick', 'CommentsApi.follow(' + entry.id + ')').append(
							$('<i>').attr('class', 'fa fa-user-plus').attr('aria-hidden', 'true').append(),
							'Seguir'
							)
							
							)
							)
						} else {
							htmlLastComment.append(
							$('<div>').attr('class', 'dashboard_comment_follow').append(
							$('<a>').attr('href', '//comentarista.emol.com/' + entry.id + '/'+ entry.nickname.removeAccents().replace(/ /g,'-')+'.html').append(
							$('<img>').attr('onclick', 'loadPerfil("' + entry.id + '")').attr('src', entry.urlAvatar).attr('width', 'auto').attr('height', 'auto').attr('class', 'dashboard_img_follow'),
							$('<div>').attr('class', 'dashboard_content_follow').append(
							$('<div>').attr('onclick', 'loadPerfil("' + entry.id + '")').attr('class', 'dashboard_title_follow').append(entry.nickname)
							)
							),

							$('<div>').attr('id', 'button_follow_' + entry.id).attr('class', 'button_follow bt_unfollow').attr('onclick', 'CommentsApi.unFollow(' + entry.id + ')').append(
							$('<i>').attr('class', 'fa fa-user-plus').attr('aria-hidden', 'true').append(),
							'Dejar de Seguir'

							)
							)
							)
						}
					}
					else {
						//es el mismo usuario no va el boton                        
						htmlLastComment.append(
						$('<div>').attr('class', 'dashboard_comment_follow').attr('onclick', 'loadPerfil("' + entry.id + '")').append(
						$('<img>').attr('src', entry.urlAvatar).attr('width', 'auto').attr('height', 'auto').attr('class', 'dashboard_img_follow'),
						$('<div>').attr('class', 'dashboard_content_follow').append(
						$('<div>').attr('class', 'dashboard_title_follow').append(entry.nickname)
						)
						)
						)
					}
				} else {
					//usuario no logueado, se muestra los seguidos sin botón
					htmlLastComment.append(
						$('<div>').attr('class', 'dashboard_comment_follow').attr('onclick', 'loadPerfil("' + entry.id + '")').append(
							$('<img>').attr('src', entry.urlAvatar).attr('width', 'auto').attr('height', 'auto').attr('class', 'dashboard_img_follow'),
							$('<div>').attr('class', 'dashboard_content_follow').append(
							$('<div>').attr('class', 'dashboard_title_follow').append(entry.nickname)
							)
						)
					)
				}
			});

			if (response.length === 0) {
				htmlLastComment.append(
				$('<div>').attr('class', 'dashboard_comment').append('No Sigue a nadie')
				)
			}

			$('.dashboard_comment_followings').html(htmlLastComment);

		});
	},

	getCommentsCountFromUser: function (id) {
		/*if (id != getCookie('c_user_i')){*/
			var site = 'emol,emoltv,emolespeciales';
		/*}else{
			var site = 'emol';
		}*/
		
		$.ajax({
			url: urlCacheComments,
			dataType: "json",
			data: {
				action: "getCommentsCountFromUser",
				selectedUserId: id,
				site: site,
				async: false,
				format: "json"
			},
			method: "GET",
			cache: false
		}).done(function (response) {
			countComments = response.count;
			$('#spNumComments').html(countComments);
			/*if(id != getCookie('c_user_i')){
				$('#spNumComments').html(countComments);
			}else{
				$('#spNumComments').html('&nbsp;');
			}*/
					
			if (response.count <= 300) {
				tipoUsuario ='#ComentaristaNuevo';
			} else {
				if ((response.count >= 301 && response.count <= 800)) {
					tipoUsuario = '#ComentaristaFrecuente';
				} else {
					if ((response.count >= 801 && response.count <= 1300)) {
						tipoUsuario = '#ComentaristaActivo';
					} else {
						if ((response.count >= 1301 && response.count <= 2300)) {
							tipoUsuario = '#ComentaristaPermanente';
						} else {
							tipoUsuario = '#ComentaristaEmol';
						}
					}
				}
			}
		})
			.fail(function (err) {
				console.log("Error al leer número de comentarios" + err);
			})
		;
	},

	setUrlAvatar: function (id, url) {
		$.ajax({
			url: urlComments,
			dataType: "json",
			data: {
				action: "setUrlAvatar",
				accessToken: cmtData.accessToken,
				id: id,
				urlAvatar: url,
				format: "json",
				authType: cmtData.authType
			},
			method: "GET",
			cache: false

		}).done(function (response) {
		});
	},

	setUrlPoster: function (id, url) {
		$.ajax({
			url: urlComments,
			dataType: "json",
			data: {
				action: "setUrlPoster",
				accessToken: cmtData.accessToken,
				id: id,
				urlPoster: url,
				format: "json",
				authType: cmtData.authType
			},
			method: "GET",
			cache: false

		}).done(function (response) {
		});
	},

	follow: function (idFollow) {
		$.ajax({
			url: urlComments,
			dataType: "json",
			data: {
				action: "follow",
				accessToken: cmtData.accessToken,
				id: getCookie("c_user_i"),
				selectedUserId: idFollow.toString(),
				format: "json",
				authType: cmtData.authType
			},
			method: "GET",
			cache: false
		}).done(function (response) {
			CommentsApi.setFollowing();
			$('.perfil_seguir_' + idFollow).html('').removeAttr('onclick');
			$('.perfil_seguir_' + idFollow).addClass('no_seguir_usuario').attr('onclick', 'CommentsApi.unFollow(' + idFollow + ')').append(
			$('<i>').attr('id', 'icono_follow').attr('class', 'fa fa-user-times').attr('aria-hidden', 'true')
			);
			$('#perfil_seguir').html('').removeAttr('onclick');
			$('#perfil_seguir').addClass('no_seguir_usuario').attr('onclick', 'CommentsApi.unFollow(' + idFollow + ')').append('Dejar de Seguir');

			$('#button_follow_' + idFollow).html('').removeAttr('onclick');
			$('#button_follow_' + idFollow).addClass('bt_unfollow').attr('onclick', 'CommentsApi.unFollow(' + idFollow + ')').append('Dejar de Seguir');

			$('#perfil_seguir_banner').html('').removeAttr('onclick');
			$('#perfil_seguir_banner').addClass('seguir_usuario button_follow no_seguir_usuario bt_unfollow').attr('onclick', 'CommentsApi.unFollow(' + idFollow + ')').append('Dejar de Seguir');

			//botones Ranking
			$('#ranFollowerSeguir_' + idFollow).html('').removeAttr('onclick');
			$('#ranFollowerSeguir_' + idFollow).addClass('no_seguir_usuario bt_unfollow').attr('onclick', 'CommentsApi.unFollow(' + idFollow + ')').append('Dejar de Seguir');
			$('#ranComenSeguir_' + idFollow).html('').removeAttr('onclick');
			$('#ranComenSeguir_' + idFollow).addClass('no_seguir_usuario bt_unfollow').attr('onclick', 'CommentsApi.unFollow(' + idFollow + ')').append('Dejar de Seguir');                			
			$('#ranLikeSeguir_' + idFollow).html('').removeAttr('onclick');
			$('#ranLikeSeguir_' + idFollow).addClass('no_seguir_usuario bt_unfollow').attr('onclick', 'CommentsApi.unFollow(' + idFollow + ')').append('Dejar de Seguir');	

			//botones cita comentarista
			$('#btnSeguirComentarista_' + idFollow).html('').removeAttr('onclick');
			$('#btnSeguirComentarista_' + idFollow).addClass('no_seguir_usuario').attr('onclick', 'CommentsApi.unFollow(' + idFollow + ')').append(
			$('<i>').attr('id', 'icono_follow').attr('class', 'fa fa-user-times').attr('aria-hidden', 'true')
			);			
			
		});
	},

	unFollow: function (idFollow) {
		$.ajax({
			url: urlComments,
			dataType: "json",
			data: {
				action: "unfollow",
				accessToken: cmtData.accessToken,
				id: getCookie("c_user_i"),
				selectedUserId: idFollow.toString(),
				format: "json",
				authType: cmtData.authType
			},
			method: "GET",
			cache: false
		}).done(function (response) {
			CommentsApi.setFollowing();
			$('.perfil_seguir_' + idFollow).html('').removeAttr('onclick');
			$('.perfil_seguir_' + idFollow).removeClass('no_seguir_usuario');
			$('.perfil_seguir_' + idFollow).addClass('seguir_usuario').attr('onclick', 'CommentsApi.follow(' + idFollow + ')').append(
			$('<i>').attr('id', 'icono_follow').attr('class', 'fa fa-user-plus').attr('aria-hidden', 'true')
			);
			$('#perfil_seguir').html('').removeAttr('onclick');
			$('#perfil_seguir').removeClass('no_seguir_usuario');
			$('#perfil_seguir').addClass('seguir_usuario').attr('onclick', 'CommentsApi.follow(' + idFollow + ')').append('Seguir');

			$('#button_follow_' + idFollow).html('').removeAttr('onclick');
			$('#button_follow_' + idFollow).removeClass('bt_unfollow');
			$('#button_follow_' + idFollow).addClass('button_follow').attr('onclick', 'CommentsApi.follow(' + idFollow + ')').append(
			$('<i>').attr('class', 'fa fa-user-plus').attr('aria-hidden', 'true').append(),
			'Seguir'
			);

			$('#perfil_seguir_banner').html('').removeAttr('onclick');
			$('#perfil_seguir_banner').removeClass('bt_unfollow');
			$('#perfil_seguir_banner').addClass('button_follow').attr('onclick', 'CommentsApi.follow(' + idFollow + ')').append(
			$('<i>').attr('class', 'fa fa-user-plus').attr('aria-hidden', 'true').append(),
			'Seguir'
			);
			//botones Ranking		

			$('#ranFollowerSeguir_' + idFollow).html('').removeAttr('onclick');
			$('#ranFollowerSeguir_' + idFollow).removeClass('no_seguir_usuario bt_unfollow');
			$('#ranFollowerSeguir_' + idFollow).addClass('seguir_usuario').attr('onclick', 'CommentsApi.follow(' + idFollow + ')').append(
			$('<i>').attr('id', 'icono_follow').attr('class', 'fa fa-user-plus').attr('aria-hidden', 'true').append(),
			' Seguir'
			);				
			$('#ranComenSeguir_' + idFollow).html('').removeAttr('onclick');
			$('#ranComenSeguir_' + idFollow).removeClass('no_seguir_usuario bt_unfollow');
			$('#ranComenSeguir_' + idFollow).addClass('seguir_usuario').attr('onclick', 'CommentsApi.follow(' + idFollow + ')').append(
			$('<i>').attr('id', 'icono_follow').attr('class', 'fa fa-user-plus').attr('aria-hidden', 'true').append(),
			' Seguir'
			);				
			$('#ranLikeSeguir_' + idFollow).html('').removeAttr('onclick');
			$('#ranLikeSeguir_' + idFollow).removeClass('no_seguir_usuario bt_unfollow');
			$('#ranLikeSeguir_' + idFollow).addClass('seguir_usuario').attr('onclick', 'CommentsApi.follow(' + idFollow + ')').append(
			$('<i>').attr('id', 'icono_follow').attr('class', 'fa fa-user-plus').attr('aria-hidden', 'true').append(),
			' Seguir'
			);	
			//botones cita comentarista
			$('#btnSeguirComentarista_' + idFollow).html('').removeAttr('onclick');
			$('#btnSeguirComentarista_' + idFollow).removeClass('no_seguir_usuario');
			$('#btnSeguirComentarista_' + idFollow).addClass('seguir_usuario').attr('onclick', 'CommentsApi.follow(' + idFollow + ')').append(
			$('<i>').attr('id', 'icono_follow').attr('class', 'fa fa-user-plus').attr('aria-hidden', 'true')
			);			
		});
	},

	setFollowing: function () {
		$.ajax({
			url: urlComments,
			dataType: "json",
			data: {
				action: "getFollowing",
				accessToken: cmtData.accessToken,
				id: getCookie("c_user_i"),
				format: "json",
				authType: cmtData.authType
			},
			method: "GET",
			cache: false
		}).done(function (response) {
			var followers = [];
			response.forEach(function (entry) {
				followers.push(entry.id);
			});
			var json_str = JSON.stringify(followers);
			setCookie('c_user_f', json_str, 60);
		});
	},

	perfil: function (idUsuario) {
		var idUsuario = parseInt(idUsuario);
		mensajeValida = "";
		var action = 'getCommentsFromUser';
		if(idUsuario != null){
			CommentsApi.getCommentsCountFromUser(idUsuario);
			if (idUsuario != getCookie('c_user_i')){
				$('#tabContEditarPerfil').remove();
				$('#contEditarPefil').remove();
				$('#dashboard_perfil').addClass('dashboard_profile_user');
				$('#dashboard_biography_area_edit').remove();
				$('.tabs_wall').remove();
				$('.dashboard_edit_banner').remove();
				$('.dashboard_edit_img').remove();
				try{
					if(getCookie("c_user_f") != undefined && getCookie("c_user_f") !=''){
						var arrayF = JSON.parse(unescape(getCookie("c_user_f")));	
						if(!arrayF.includes(idUsuario)){		
							$('#perfil_seguir_banner').html('').removeAttr('onclick');	
							$('#perfil_seguir_banner').removeClass('bt_unfollow');	
							$('#perfil_seguir_banner').addClass('seguir_usuario button_follow').attr('onclick','CommentsApi.follow('+ idUsuario+')').append(
							$('<i>').attr('id', 'icono_follow').attr('class', 'fa fa-user-plus').attr('aria-hidden', 'true'),'Seguir');
						}else{
							$('#perfil_seguir_banner').html('').removeAttr('onclick');	
							$('#perfil_seguir_banner').addClass('seguir_usuario button_follow bt_unfollow').attr('onclick','CommentsApi.unFollow('+idUsuario +')').html('Dejar de Seguir');
						}
					}else{							
						$('#perfil_seguir_banner').html('').removeAttr('onclick');
						$('#perfil_seguir_banner').removeClass('seguir_usuario');
					}
				}catch(e){console.log(e);}
			}else{
				$('#tabComments').attr('onclick','openTab("WallPublicUsers", "tabComments")');
				$('#dashboard_comment_title_last_comment').html('Por si te lo perdiste');
				$('#dashboard_comment_title_comment').html('&Uacute;ltimos Comentarios');
				$('#perfil_seguir_banner').remove();
				action = 'getUserWall';
			}
			$.ajax({
				url: urlCacheComments,
				dataType: "json",
				data: {
					action: action,
					accessToken: cmtData.accessToken,
					selectedUserId: idUsuario,
					site:"emol",
					approvedOnly: "true",
					order: "TIME_DESC",
					limit: cmtData.size,
					age: "160",
					format: "json",
					authType: cmtData.authType
				},
				method: "GET",
				cache: false
			}).done(function (response) {
			
				if(!response.validatedRut && action == 'getUserWall'){
					$('#message_area').show();
					$('#message_area').delay(370000).slideUp('slow');
				}

				cmtData.title = response.userNickname;

				if(typeof  cmtData.commentId === 'undefined' ){
					if(window.location.href.split("/")[4].split("#")[0] != response.userNickname.replace(/ /g,'-').removeAccents() + '.html'){
						history.pushState(null, null, response.userNickname.replace(/ /g,'-').removeAccents() + '.html');
					}
				}
				
				if(window.location.hash.indexOf("CHAT") > -1){
					openChat();
					setTimeout(function(){
						$("#art_"+window.location.hash.replace("#CHAT_","")).trigger('click');
					},1000);
				}
				
				if(response.userBio != '' && response.userBio != undefined && response.userBio != 'undefined'){
					try{
						$('#dashboard_biography').html(decodeURIComponent(response.userBio));
						$('#biography_text').val(decodeURIComponent(response.userBio));
					}catch(error){}
					$('#dashboard_biography_btn_add').hide();
					if(idUsuario != getCookie('c_user_i')){
						$('#dashboard_biography').addClass('another_user_bio');
						$('#dashboard_biography').removeAttr('onclick');
					}
				}else{
					$('#dashboard_biography').hide();
					if(idUsuario != getCookie('c_user_i')){
						$('#dashboard_biography_btn_add').hide();
					}
				}

				var imgAvatar = '//static.emol.cl/emol50/img/sin_image_comentarios.png';
				var imgBanner = '//static.emol.cl/emol50/img/banner_emol_social.jpg';

				try {
					imgAvatar = (response.userAvatar).replace('http:','https:');
				}catch (err) {
					imgAvatar = '//static.emol.cl/emol50/img/sin_image_comentarios.png';
				}

				try{
					if (typeof (response.userPoster) != "undefined") {
						imgBanner = (response.userPoster).replace('http:','https:');
					}
				}catch (err) {
					imgBanner = '//static.emol.cl/emol50/img/banner_emol_social.jpg';
				}
				
				try{
					if (typeof (response.email) != "undefined") {
						userEmail = response.email;
					}

					if (typeof (response.phone) != "undefined") {
						if (response.phone.includes('+')) {
							userFono = (response.phone).replace(/\+/g, " ").trim();
						}
						else {
							userFono = response.phone;
						}
					}

					var userAgno = 0;
					if (typeof (response.birthYear) != "undefined") {
						userAgno = response.birthYear;
					}

					agnos(userAgno);
					tipoDcto();

					var userGender = "";
					htmlGenero = "<option value=''>Seleccione género</option>";
					
					if (typeof (response.gender) != "undefined" && response.gender != '') {
						userGender = response.gender;

						if (userGender == "female") {
							htmlGenero = htmlGenero + "<option selected value='" + userGender + "'>Femenino</option><option value='male'>Masculino</option>";
						}
						else {
							htmlGenero = htmlGenero + "<option value='female'>Femenino</option><option selected value='" + userGender + "'>Masculino</option>";
						}
					}
					else {
						htmlGenero = htmlGenero + "<option value='female'>Femenino</option><option value='male'>Masculino</option>";
					}
					
				}catch(e){
					console.log(e);
				}

				if(idUsuario == getCookie('c_user_i')){
					
					CommentsApi.getActivityFromUserUserWall(idUsuario);
					
					if(!cmtData.perfil){
						$('#tabWall').removeClass('dashboard_cell_current');
						var idUserHeader = parseInt(getCookie('c_user_i'));
						var dataUserH = JSON.parse(getCookie('c_user_p'));
						var linkH = 'https://comentarista.emol.com/' +idUserHeader+ '/' +dataUserH.nick.removeAccents().split(' ').join('-')+".html";
						$('#tabWall').removeAttr('onclick');
						$('#tabWall').removeAttr('href');
						$('#tabWall').attr('onclick','javascript:location.href="'+linkH+'"');
						
					}
					
					try{			
						if((response.email == '' || typeof (response.email) == 'undefined') && (response.phone == '' || typeof (response.phone) == 'undefined')){				
							mensajeValida = '<div class="notification_emol_social notification_e_social_bg"><div class="noticiation_int_e_social"><span class="mensaje"><span class="iconoMensaje"><i class="fa fa-info-circle" aria-hidden="true"></i></span> Hola <b>' + response.userNickname + ' </b>¿deseas completar tus datos? </span><span class="botones"><input type="submit" value="SI" class="vex-dialog-button-primary vex-dialog-button vex-first" onclick="openTab(\'contEditarPefil\',\'tabContEditarPerfil\');"><div class="dashboard_exit" onclick="CloseNotification()"><i class="fa fa-times" aria-hidden="true"></i></div></span></div></div>';
						}else{
							if(userEmail != '' && response.validatedEmail == false){
								mensajeValida = '<div class="notification_emol_social notification_e_social_bg"><div class="noticiation_int_e_social"><span class="mensaje"><span class="iconoMensaje"><i class="fa fa-info-circle" aria-hidden="true"></i></span> Hola <b>' + response.userNickname + ' </b>&iquest;deseas validar tu e-mail? </span><span class="botones"><input type="submit" value="SI" class="vex-dialog-button-primary vex-dialog-button vex-first" onclick="CommentsApi.validateMail();"><div class="dashboard_exit" onclick="CloseNotification()"><i class="fa fa-times" aria-hidden="true"></i></div></span></div></div>';
							}else{
								if(userFono != '' && response.validatedPhone == false){
									mensajeValida = '<div class="notification_emol_social notification_e_social_bg"><div class="noticiation_int_e_social"><span class="mensaje"><span class="iconoMensaje"><i class="fa fa-info-circle" aria-hidden="true"></i></span> Hola <b>' + response.userNickname + ' </b>¿deseas validar tu teléfono? </span><span class="botones"><input type="submit" value="SI" class="vex-dialog-button-primary vex-dialog-button vex-first" onclick="CommentsApi.validateFono()"><div class="dashboard_exit" onclick="CloseNotification()"><i class="fa fa-times" aria-hidden="true"></i></div></span></div></div>';
								}else{  
									$(".user_activity_social").css({ 'top': '38%' }); 
								}
							}
						}
					}catch(e){
						console.log(e);
					}
					
				}
				
				if(idUsuario == getCookie('c_user_i')){
				
					if(!response.promoted){
						$( "#promoted" ).remove();
					}						
					
					var htmlLastComment = $('<div>').html('');
					try{
						if (response.activity.length > 0) {
							var dateNow = new Date();
							var dateWeek = new Date();
							dateWeek.setDate(dateWeek.getDate() - 7);
							var countEntry = 0;

							(response.activity).forEach(function (entry) {

								var date = new Date(entry.eventTime);
								var fecha;

								if (date >= dateWeek) {
									countEntry = countEntry + 1;

									if (((date.getMonth() + 1) == (dateNow.getMonth() + 1)) && (date.getDate() == dateNow.getDate()) && (date.getFullYear() == dateNow.getFullYear())) {
										fecha = ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
									} else {
										fecha = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear().toString().substr(-2);
									}

									var accion = "";
									var clase = "";
									var userID = "";
									var avatar = "";

									switch (entry.type) {
										case "FOLLOWED_USER_LIKED":
											accion = "A <span class='nombreAccion' onclick='loadPerfil(" + entry.followedUserId + ")'><a href='"+entry.pageUrl + "/" + entry.followedUserNickname.removeAccents().split(' ').join('-') + ".html'>" + entry.followedUserNickname + "</a></span> le gustó el comentario de <span class='nombreAccion'onclick='loadPerfil(" + entry.commentCreatorId + ")'><a href='"+entry.pageUrl + "/" + entry.commentCreatorNickname.removeAccents().split(' ').join('-') + ".html'>" + entry.commentCreatorNickname + "</a></span>";
											clase = "dashboard_like";
											userID = entry.followedUserId;
											avatar = entry.followedUserAvatar.replace(/http:/g,'https:');
											break;
										case "FOLLOWED_USER_COMMENTED":
											accion = "<span class='nombreAccion'onclick='loadPerfil(" + entry.commentCreatorId + ")'><a href='"+entry.pageUrl + "/" + entry.commentCreatorNickname.removeAccents().split(' ').join('-') + ".html'>" + entry.commentCreatorNickname + "</a></span> comentó ";
											clase = "dashboard_comments";
											userID = entry.commentCreatorId;
											avatar = entry.commentCreatorAvatar.replace(/http:/g,'https:');
											break;
										case "FOLLOWED_USER_DISLIKED":
											accion = "A <span class='nombreAccion' onclick='loadPerfil(" + entry.followedUserId + ")'><a href='"+entry.pageUrl + "/" + entry.followedUserNickname.removeAccents().split(' ').join('-') + ".html'>" + entry.followedUserNickname + "</a></span> no le gustó el comentario de <span class='nombreAccion' onclick='loadPerfil(" + entry.commentCreatorId + ")'><a href='"+entry.pageUrl + "/" + entry.commentCreatorNickname.removeAccents().split(' ').join('-') + ".html'>" + entry.commentCreatorNickname + "</a></span>";
											clase = "dashboard_dislike";
											userID = entry.followedUserId;
											avatar = entry.followedUserAvatar.replace(/http:/g,'https:');
											break;
										case "MENTIONED":
											accion = "<span class='nombreAccion' onclick='loadPerfil(" + entry.commentCreatorId + ")'><a href='"+entry.pageUrl + "/" + entry.commentCreatorNickname.removeAccents().split(' ').join('-') + ".html'>" + entry.commentCreatorNickname + "</a></span> te mencionó en su comentario ";
											clase = "dashboard_mencioned";
											userID = entry.commentCreatorId;
											avatar = entry.commentCreatorAvatar.replace(/http:/g,'https:');
											break;
										case "COMMENT_REPLIED":
											accion = "<span class='nombreAccion' onclick='loadPerfil(" + entry.commentCreatorId + ")'><a href='"+entry.pageUrl + "/" + entry.commentCreatorNickname.removeAccents().split(' ').join('-') + ".html'>" + entry.commentCreatorNickname + "</a></span> respondió a tu comentario ";
											clase = "dashboard_comments";
											userID = entry.commentCreatorId;
											avatar = entry.commentCreatorAvatar.replace(/http:/g,'https:');
											break;
										case "COMMENT_LIKED":
											accion = "A <span class='nombreAccion' onclick='loadPerfil(" + entry.followedUserId + ")'><a href='"+entry.pageUrl + "/" + entry.followedUserNickname.removeAccents().split(' ').join('-') + ".html'>" + entry.followedUserNickname + "</a></span> le gustó tu comentario ";
											clase = "dashboard_like";
											userID = entry.followedUserId;
											avatar = entry.followedUserAvatar.replace(/http:/g,'https:');
											break;
										case "COMMENT_DISLIKED":
											accion = "A <span class='nombreAccion' onclick='loadPerfil(" + entry.followedUserId + ")'><a href='"+entry.pageUrl + "/" + entry.followedUserNickname.removeAccents().split(' ').join('-') + ".html'>" + entry.followedUserNickname + "</a></span> no le gustó tu comentario ";
											clase = "dashboard_dislike";
											userID = entry.followedUserId;
											avatar = entry.followedUserAvatar.replace(/http:/g,'https:');
											break;
									}

									outDataPerfil();

									htmlLastComment.append(
										$('<div>').attr('class', 'dashboard_comment').append(
											$('<div>').attr('class', 'dashboard_hour_comment').append(
											$('<div>').attr('class', 'dashboard_img_wall').append(
											$('<img>').attr('onclick', 'loadPerfil("' + userID + '")').attr('src', avatar).attr('width', 'auto').attr('height', 'auto').attr('class', 'dashboard_img_follow'))
											),
											$('<div>').attr('class', 'dashboard_comment_cont').append(
											$('<span>').attr('class', 'dashboard_accion').append(accion + " en "),
											$('<a>').attr('class', 'dashboard_link').attr('href', entry.pageUrl+ "#comment_user_" + entry.commentId).append(
											$('<div>').attr('class', 'dashboard_title').append(entry.pageTitle)
											),
											$('<div>').attr('class', 'dashboard_text_comment').append(entry.commentText.revMotions()),
											$('<span>').attr('class', 'dashboard_time').append(fecha)
											),
											$('<div>').attr('class', 'dashboard_soc_status').append(
												$('<div>').attr('class', clase).append($('<span>').attr('class', 'dashboard_like_txt').append('ME GUSTA'))
											)
										)
									);
								}
							});

							if (countEntry == 0) {
								htmlLastComment.append($('<div>').attr('class', 'dashboard_comment').append('No existe actividad reciente'));
							}
						}
						else{
							htmlLastComment.append($('<div>').attr('class', 'dashboard_comment').append('No existe actividad reciente'));
						}
					}catch(e){
						console.log(e);
					}
					
					if(idUsuario == getCookie('c_user_i')){
						$('.dashboard_comment_comments').html(htmlLastComment);	
					}else{
						$('#div_content_wall').html(htmlLastComment);
					}	

				}else{

					if(!response.userPromoted){
						$( "#promoted" ).remove();
					}
				
					var htmlLastCommentUser = $("<div>").attr('class', 'dashboard_comment_list').html('');
					(response.comments).forEach(function (entry) {						
						var date = new Date(entry.time);
						var dateNow = new Date();
						var fecha;
						if (((date.getMonth() + 1) == (dateNow.getMonth() + 1)) && (date.getDate() == dateNow.getDate()) && (date.getFullYear() == dateNow.getFullYear())) {
							fecha = ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
						} else {
							fecha = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear().toString().substr(-2);
						}

						
						if((entry.page).indexOf('comentarista')!= -1){
							
							if(!((entry.page).indexOf(idUsuario) != -1)){
							
								if(entry.level == 0){
									htmlLastCommentUser.append(
										$('<div>').attr('class', 'dashboard_comment').append(
											$('<div>').attr('class', 'dashboard_hour_comment').append(
												$('<span>').attr('class', 'dashboard_time').append(fecha)
											),
											$('<div>').attr('class', 'dashboard_comment_cont').append(
												$('<a>').attr('class', 'dashboard_link').attr('href', entry.page + "/" + entry.pageTitle.replace(/ /g,'-').removeAccents() + ".html").append(
													$('<div>').attr('class', 'dashboard_title').append(entry.creator + ' realizó una publicación en el muro de ' + entry.pageTitle),
													$('<div>').attr('class', 'dashboard_text_comment').append(entry.text.revMotions())
												)
											),
											$('<div>').attr('class', 'dashboard_soc_status').append(
												$('<div>').attr('class', 'dashboard_like').append(
													$('<span>').attr('class', 'dashboard_like_txt').append('ME GUSTA'),
													$('<span>').attr('class', 'dashboard_like_number').append(entry.likes)
												),
												$('<div>').attr('class', 'dashboard_dislike').append(
														$('<span>').attr('class', 'dashboard_like_txt').append('NO ME GUSTA'),
														$('<span>').attr('class', 'dashboard_like_number').append(entry.dislikes)
												)
											)
										)						
									)
								}else{
								
									htmlLastCommentUser.append(
										$('<div>').attr('class', 'dashboard_comment').append(
											$('<div>').attr('class', 'dashboard_hour_comment').append(
												$('<span>').attr('class', 'dashboard_time').append(fecha)
											),
											$('<div>').attr('class', 'dashboard_comment_cont').append(
												$('<a>').attr('class', 'dashboard_link').attr('href', entry.page + "/" + entry.pageTitle.replace(/ /g,'-').removeAccents() + ".html").append(
													$('<div>').attr('class', 'dashboard_title').append(entry.creator + ' comentó la publicación de ' + entry.pageTitle),
													$('<div>').attr('class', 'dashboard_text_comment').append(entry.text.revMotions())
												)
											),
											$('<div>').attr('class', 'dashboard_soc_status').append(
												$('<div>').attr('class', 'dashboard_like').append(
													$('<span>').attr('class', 'dashboard_like_txt').append('ME GUSTA'),
													$('<span>').attr('class', 'dashboard_like_number').append(entry.likes)
												),
												$('<div>').attr('class', 'dashboard_dislike').append(
														$('<span>').attr('class', 'dashboard_like_txt').append('NO ME GUSTA'),
														$('<span>').attr('class', 'dashboard_like_number').append(entry.dislikes)
												)
											)
										)						
									)
								
								}
								
								
								
							}
						}else{
							htmlLastCommentUser.append(
								$('<div>').attr('class', 'dashboard_comment').append(
									$('<div>').attr('class', 'dashboard_hour_comment').append(
										$('<span>').attr('class', 'dashboard_time').append(fecha)
									),
									$('<div>').attr('class', 'dashboard_comment_cont').append(
										$('<a>').attr('class', 'dashboard_link').attr('href', entry.page + "#comment_user_" + entry.id).append(
											$('<div>').attr('class', 'dashboard_title').append(entry.pageTitle),
											$('<div>').attr('class', 'dashboard_text_comment').append(entry.text.revMotions())
										)
									),
									$('<div>').attr('class', 'dashboard_soc_status').append(
										$('<div>').attr('class', 'dashboard_like').append(
											$('<span>').attr('class', 'dashboard_like_txt').append('ME GUSTA'),
											$('<span>').attr('class', 'dashboard_like_number').append(entry.likes)
										),
										$('<div>').attr('class', 'dashboard_dislike').append(
											$('<span>').attr('class', 'dashboard_like_txt').append('NO ME GUSTA'),
											$('<span>').attr('class', 'dashboard_like_number').append(entry.dislikes)
										)
									)
								)				
							)
						}								
					});
	
					if (response.comments.length === 0) {
						htmlLastCommentUser.append(
						$('<div>').attr('class', 'dashboard_comment').append('No hay Comentarios'));
						$('#show_more_btn_comment_comments').remove();
					}
					
					if(idUsuario != getCookie('c_user_i')){
						$('.dashboard_comment_comments').html(htmlLastCommentUser);	
					}else{
						$('#div_content_wall').html(htmlLastCommentUser);
					}
					
				}
				
				try{
					if (typeof (response.location) != "undefined") {
						var icon = "<i class='fa fa-map-marker' aria-hidden='true'></i>";
						ubicacion = icon + response.location;
					}

					if (typeof (response.countryId) != "undefined") {
						if (response.countryId == "CHL") {
							ubicacion = ubicacion + ", " + response.country;
						}
						countryId = response.countryId;
					}

					if (typeof (response.stateId) != "undefined") {
						stateId = response.stateId;
					}

					if (typeof (response.cityId) != "undefined") {
						cityId = response.cityId;
					}

				}catch(err){
					ubicacion = '';
				}
				
				try{
					if(typeof (response.validatedRut) != "undefined" && response.validatedRut == true){
						userValido = true;
					}
					else {
						userValido = false;
					}
				}catch(err){
					userValido = false;
				}
				
				try{
					if (typeof (response.validatedEmail) != "undefined" && response.validatedEmail == true) {
						mailValido = true;
					}
					else {
						mailValido = false;
					}
				}catch (err) {
					mailValido = false;
				}
				
				try{
					if (typeof (response.userAcceptedTerms) != "undefined") {
					$('.checkTC').css({ 'display': 'none' });
					$('#checkTerminos').prop('checked', true);							
						if (response.validatedRut == true) { 
						$('#tabVerifica').css({ 'display': 'none' });                           
						}
						else{
						 $('#tabVerifica').css({ 'display': 'inline-block' });
						}					
					}
					else {
						$('.checkTC').css({ 'display': 'inline-block' });
						$('#tabVerifica').css({ 'display': 'none' });							
						
					}
				}catch(err){ }
				
				try{
					formatNombre(response.userFullName);
				}catch(e){
					console.log(e);
				}
					
				try{	
					var imgAvatarLarge = imgAvatar.replace(/http:/g,'https:');
					if (~imgAvatarLarge.indexOf("graph.facebook.com")){
						imgAvatarLarge = imgAvatar + "?type=large";
						imgAvatar = imgAvatar + "?width=150&height=150";
					}
					
					$('#dashboard_banner_img').attr('src', imgBanner);
					$('#dashboard_banner_img').attr('data', imgBanner);
					
					$('#dashboard_img').attr('src', imgAvatar);
					$('#dashboard_img').attr('data', imgAvatarLarge);
					$('#userNickname').html(response.userNickname);
					$('#real_name').html(nombreShow.toLowerCase());
					
					var idUserHeader = parseInt(getCookie('c_user_i'));
					var dataUserH = JSON.parse(getCookie('c_user_p'));
					var linkH = 'https://comentarista.emol.com/' +idUserHeader+ '/' +dataUserH.nick.removeAccents().split(' ').join('-')+".html";																							
					$('#img_header').attr('src', dataUserH.avatar.replace(/http:/g,'https:'));
					$('#img_header').attr('data', dataUserH.avatar.replace(/http:/g,'https:'));
					$('#img_headerMov').attr('src', dataUserH.avatar.replace(/http:/g,'https:'));
					$('#img_headerMov').attr('data', dataUserH.avatar.replace(/http:/g,'https:'));
					$('#nickNameHeader').html(dataUserH.nick);
					$('#nickNameHeader').attr('href', linkH);
					$('#linkUserHeader').attr('href', linkH);	
					$('#linkUserHeaderMov').attr('href', linkH);										

					if (ubicacion != '') {
						$('#userLocation').html(ubicacion);
						$('#userLocation').show();
					}
					else {
						$('#userLocation').hide();
					}

					$('#userType').html(tipoUsuario);

					$('#nombre').val(response.userNickname);
					$('#genero').html(htmlGenero);
					$('#agno').html(htmlAgnos);
					$('#telefono').val(userFono);
					$('#mail').val(response.email);
					$('#tipoDcto').html(htmlTipoDcto);
					$('#spNumComments').html(countComments);
					/*if(idUsuario != getCookie('c_user_i')){
						$('#spNumComments').html(countComments);
					}else{
						$('#spNumComments').html('&nbsp;');
					}*/
					
					$('#spNumFollowers').html(response.userTotalFollowers);
					$('#spNumFollowing').html(response.userTotalFollowing);

					$('#dashboard_notification').html(mensajeValida);
					$('#dashboard_notification .notification_emol_social').addClass('slidedown');
					$('#dashboard_notification .notification_emol_social').delay(15000).slideUp('slow');
				}catch(e){}
				
				try{
					if(mobilecheck() && getMobileOperatingSystem() == "Android"){
						$("#contFormPerfil input").click(function (e) {
							e.preventDefault();
							var nomb_scroll = $(this).attr('id');
							ScrollFormValMob("contFormPerfil", nomb_scroll);
						});

						$("#contFormVerificar input").click(function(e){
							e.preventDefault();
							var nomb_scrollVer = $(this).attr('id');
							ScrollFormValMob("contFormVerificar", nomb_scrollVer);
						});
					}
				}catch(e){}

				try{
					if (response.validatedRut == true || response.userValidated == true ) {						
						$('#ticValidado').css({ 'display': 'inline-block' });						
					}
					else {						
						$('#ticValidado').css({ 'display': 'none' });											
					}
				}catch(e){}

				try{
					botonActualizar();
				}catch(e){}

				$("#dashboard_perfil").toggle();
				$("#dashboard_loading_perfil").hide();

			}).complete(function(response){
				try{
					if(idUsuario == getCookie('c_user_i')){
						CommentsApi.getCountries();
						CommentsApi.getCommentsFromUser(idUsuario);
						$('.dashboard_banner_cont').attr("original-title", "Tamaño recomendado 840x185 px");
						$('.dashboard_banner_cont').tipsy({ gravity: 'n', fade: 'true' });
						$('#dashboard_img').tipsy({ gravity: 'n', fade: 'true' });

						$('#telefono').keypress(function (event) {
							if (event.which != 8 && isNaN(String.fromCharCode(event.which))) {
								event.preventDefault();
							}
						});
					}

					CommentsApi.getFollowing(idUsuario);
					CommentsApi.getFollowers(idUsuario);
					CheckFormEditProfile();
					
				}catch(e){}
				
				$(function (){
					$('#fileuploadPerfil').fileupload({
						url: '//ugc.ecn.cl/upload/',
						dataType: 'json',
						done: function (e, data) {
							$.each(data.result.files, function (index, file) {
								$('#dashboard_img').attr("src", file.url);
								CommentsApi.setUrlAvatar(idUsuario, file.url);
								$('<p/>').text(file.name).appendTo('#files');
							});
							mensajeValida = '<div class="notification_emol_social notification_e_social_ok"><div class="noticiation_int_e_social"><span class="mensaje"><span class="iconoMensaje"><i class="fa fa-check-circle" aria-hidden="true"></i></span> Tu imagen de perfil ha sido actualizada</span><span class="botones"><div class="dashboard_exit" onclick="CloseNotification()"><i class="fa fa-times" aria-hidden="true"></i></div></span></div></div>';
							$('#dashboard_notification').html(mensajeValida);
							$('#dashboard_notification .notification_emol_social').delay(5000).slideUp('slow');
							
						},
						fail: function (error) {
							mensajeValida = '<div class="notification_emol_social notification_e_social_error"><div class="noticiation_int_e_social"><span class="mensaje"><span class="iconoMensaje"><i class="fa fa-times-circle" aria-hidden="true"></i></span> Ha ocurrido un error, por favor, intentalo más tarde</span><span class="botones"><div class="dashboard_exit" onclick="CloseNotification()"><i class="fa fa-times" aria-hidden="true"></i></div></span></div></div>';
							$('#dashboard_notification').html(mensajeValida);
							$('#dashboard_notification .notification_emol_social').delay(5000).slideUp('slow');
						}
					}).prop('disabled', !$.support.fileInput)
					.parent().addClass($.support.fileInput ? undefined : 'disabled');
				});
				
				$(function () {
					$('#fileuploadBanner').fileupload({
						url: '//ugc.ecn.cl/upload/',
						dataType: 'json',
						done: function (e, data) {
							$.each(data.result.files, function (index, file) {
								$('#dashboard_banner_img').attr("src", file.url);
								CommentsApi.setUrlPoster(idUsuario, file.url);
								$('<p/>').text(file.name).appendTo('#files');
							});
							mensajeValida = '<div class="notification_emol_social notification_e_social_ok"><div class="noticiation_int_e_social"><span class="mensaje"><span class="iconoMensaje"><i class="fa fa-check-circle" aria-hidden="true"></i></span> Tu imagen de portada ha sido actualizada</span><span class="botones"><div class="dashboard_exit" onclick="CloseNotification()"><i class="fa fa-times" aria-hidden="true"></i></div></span></div></div>';
							$('#dashboard_notification').html(mensajeValida);
							$('#dashboard_notification .notification_emol_social').delay(5000).slideUp('slow');
						},
						fail: function (error) {
							mensajeValida = '<div class="notification_emol_social notification_e_social_error"><div class="noticiation_int_e_social"><span class="mensaje"><span class="iconoMensaje"><i class="fa fa-times-circle" aria-hidden="true"></i></span> Ha ocurrido un error, por favor, inténtalo más tarde</span><span class="botones"><div class="dashboard_exit" onclick="CloseNotification()"><i class="fa fa-times" aria-hidden="true"></i></div></span></div></div>';
							$('#dashboard_notification').html(mensajeValida);
							$('#dashboard_notification .notification_emol_social').delay(5000).slideUp('slow');
						}
					}).prop('disabled', !$.support.fileInput).parent().addClass($.support.fileInput ? undefined : 'disabled');
				});
			});
		}
	},

	getActivityFromUserUserWall: function (idUsuario){
		$.ajax({
			url: urlCacheComments,
			dataType: "json",
			data: {
				action: "getUserWall",
				accessToken: cmtData.accessToken,
				selectedUserId: idUsuario,
				approvedOnly: "true",
				order: "TIME_DESC",
				limit: "1600",
				age: "160",
				format: "json",
				site: "emolSocial",
				authType: cmtData.authType
			},
			method: "GET",
			cache: false
		}).done(function (response) {
			var htmlLastComment = $('<div>').html('');
				if (response.activity.length > 0) {
					var dateNow = new Date();
					var dateWeek = new Date();
					dateWeek.setDate(dateWeek.getDate() - 7);
					var countEntry = 0;

					(response.activity).forEach(function (entry) {

						var date = new Date(entry.eventTime);
						var fecha;
						if (true) {
						//if (date >= dateWeek) {
							countEntry = countEntry + 1;

							if (((date.getMonth() + 1) == (dateNow.getMonth() + 1)) && (date.getDate() == dateNow.getDate()) && (date.getFullYear() == dateNow.getFullYear())) {
								fecha = ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
							} else {
								fecha = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear().toString().substr(-2);
							}

							var accion = "";
							var clase = "";
							var userID = "";
							var avatar = "";
							var pageId = 0;
							var linkCreator = "";
							
							var reg = /^(http[s]?)\:\/\/[A-Za-z]{0,16}.([A-Za-z]{0,4}).([A-Za-z]{0,4})\/([0-9]+)/;
							
							var regEx = new RegExp(reg);
							if ((entry.pageUrl).match(regEx)) {
								pageId = (entry.pageUrl).match(regEx)[4];
							}

							
							switch (entry.type) {
								case "FOLLOWED_USER_LIKED":
									accion = "A <span class='nombreAccion' onclick='loadPerfil(" + entry.followedUserId + ")'><a href='"+entry.pageUrl + "/" + entry.followedUserNickname.removeAccents().split(' ').join('-') + ".html'>" + entry.followedUserNickname + "</a></span> le gustó el comentario de <span class='nombreAccion'onclick='loadPerfil(" + entry.commentCreatorId + ")'> " + entry.commentCreatorNickname + '</span>';
									clase = "dashboard_like";
									userID = entry.followedUserId;
									avatar = entry.followedUserAvatar.replace(/http:/g,'https:');
									linkCreator = entry.pageUrl + "/" + entry.commentId + "/" + entry.followedUserNickname.removeAccents().split(' ').join('-') + ".html";
									break;
								case "FOLLOWED_USER_COMMENTED":
										if( entry.commentCreatorId == pageId ){ 
											accion = "<span class='nombreAccion'onclick='loadPerfil(" + entry.commentCreatorId + ")'><a href='"+entry.pageUrl + "/" + entry.commentCreatorNickname.removeAccents().split(' ').join('-') + ".html'>" + entry.commentCreatorNickname + "</a></span> publicó en su muro";
										}else{
											if(pageId == idUsuario){
												accion = "<span class='nombreAccion'onclick='loadPerfil(" + entry.commentCreatorId + ")'><a href='"+entry.pageUrl+ "/" + entry.commentCreatorNickname.removeAccents().split(' ').join('-') + ".html'>" + entry.commentCreatorNickname + "</a></span> publicó en tu muro";
											}else{
												accion = "<span class='nombreAccion'onclick='loadPerfil(" + entry.commentCreatorId + ")'><a href='"+entry.pageUrl+ "/" + entry.commentCreatorNickname.removeAccents().split(' ').join('-') + ".html'>" +  entry.commentCreatorNickname + "</a></span> publicó en el muro de <a href='"+entry.pageUrl + "/" + entry.pageTitle.removeAccents().split(' ').join('-') + ".html'>" + entry.pageTitle + "</a>";
											}
										}
									clase = "dashboard_comments";
									userID = entry.commentCreatorId;
									avatar = entry.commentCreatorAvatar.replace(/http:/g,'https:');
									linkCreator = entry.pageUrl + "/" + entry.commentId + "/" +  entry.commentCreatorNickname.removeAccents().split(' ').join('-') + ".html";
									break;
								case "COMMENT_IN_WALL":
										if( entry.commentCreatorId == pageId ){ 
											accion = "<span class='nombreAccion'onclick='loadPerfil(" + entry.commentCreatorId + ")'><a href='"+entry.pageUrl+ "/" + entry.commentCreatorNickname.removeAccents().split(' ').join('-') + ".html'>" + entry.commentCreatorNickname + "</a></span> publicó en su muro";
										}else{
											if(pageId == idUsuario){
												accion = "<span class='nombreAccion'onclick='loadPerfil(" + entry.commentCreatorId + ")'><a href='"+entry.pageUrl+ "/" + entry.commentCreatorNickname.removeAccents().split(' ').join('-') + ".html'>" + entry.commentCreatorNickname + "</a></span> publicó en tu muro";
											}else{
												accion = "<span class='nombreAccion'onclick='loadPerfil(" + entry.commentCreatorId + ")'><a href='"+entry.pageUrl+ "/" + entry.commentCreatorNickname.removeAccents().split(' ').join('-') + ".html'>" + entry.commentCreatorNickname + "</a></span> publicó en el muro de <a href='"+entry.pageUrl + "/" + entry.pageTitle.removeAccents().split(' ').join('-') + ".html'>" + entry.pageTitle + "</a>";
											}
										}
										clase = "dashboard_comments";
										userID = entry.commentCreatorId;
										avatar = entry.commentCreatorAvatar.replace(/http:/g,'https:');
										linkCreator = entry.pageUrl + "/" + entry.commentId + "/" +  entry.commentCreatorNickname.removeAccents().split(' ').join('-') + ".html";
									break;
								case "FOLLOWED_USER_DISLIKED":
									accion = "A <span class='nombreAccion' onclick='loadPerfil(" + entry.followedUserId + ")'><a href='"+entry.pageUrl+ "/" + entry.followedUserNickname.removeAccents().split(' ').join('-') + ".html'>" + entry.followedUserNickname + "</a></span> no le gustó el comentario de <span class='nombreAccion' onclick='loadPerfil(" + entry.commentCreatorId + ")'>" + entry.commentCreatorNickname + "</span>";
									clase = "dashboard_dislike";
									userID = entry.followedUserId;
									avatar = entry.followedUserAvatar.replace(/http:/g,'https:');
									linkCreator = entry.pageUrl + "/" + entry.commentId + "/" +  entry.followedUserNickname.removeAccents().split(' ').join('-') + ".html";
									break;
								case "MENTIONED":
									accion = "<span class='nombreAccion' onclick='loadPerfil(" + entry.commentCreatorId + ")'><a href='"+entry.pageUrl+ "/" + entry.commentCreatorNickname.removeAccents().split(' ').join('-') + ".html'>" + entry.commentCreatorNickname + "</a></span> te mencionó en su comentario ";
									clase = "dashboard_mencioned";
									userID = entry.commentCreatorId;
									avatar = entry.commentCreatorAvatar.replace(/http:/g,'https:');
									linkCreator = entry.pageUrl + "/" + entry.commentId + "/" +  entry.commentCreatorNickname.removeAccents().split(' ').join('-') + ".html";
									break;
								case "COMMENT_REPLIED":
									accion = "<span class='nombreAccion' onclick='loadPerfil(" + entry.commentCreatorId + ")'><a href='"+entry.pageUrl+ "/" + entry.commentCreatorNickname.removeAccents().split(' ').join('-') + ".html'>" + entry.commentCreatorNickname + "</a></span> respondió a tu comentario ";
									clase = "dashboard_comments";
									userID = entry.commentCreatorId;
									avatar = entry.commentCreatorAvatar.replace(/http:/g,'https:');
									linkCreator = entry.pageUrl + "/" + entry.commentId + "/" +  entry.commentCreatorNickname.removeAccents().split(' ').join('-') + ".html";
									break;
								case "COMMENT_LIKED":
									if(entry.commentCreatorId == idUsuario){
										accion = "A <span class='nombreAccion' onclick='loadPerfil(" + entry.followedUserId + ")'><a href='"+entry.pageUrl+ "/" + entry.followedUserNickname.removeAccents().split(' ').join('-') + ".html'>" + entry.followedUserNickname + "</a></span> le gustó tu comentario ";
									}else{
										accion = "A <span class='nombreAccion' onclick='loadPerfil(" + entry.followedUserId + ")'><a href='"+entry.pageUrl+ "/" + entry.followedUserNickname.removeAccents().split(' ').join('-') + ".html'>" + entry.followedUserNickname + "</a></span> le gustó el comentario de <a href='"+entry.pageUrl + "/" + entry.commentCreatorNickname.removeAccents().split(' ').join('-') + ".html'>" + entry.commentCreatorNickname + "</a>";
									}
									
									clase = "dashboard_like";
									userID = entry.followedUserId;
									avatar = entry.followedUserAvatar.replace(/http:/g,'https:');
									linkCreator = entry.pageUrl + "/" + entry.commentId + "/" +  entry.followedUserNickname.removeAccents().split(' ').join('-') + ".html";
									break;
								case "COMMENT_DISLIKED":
									if(entry.commentCreatorId == idUsuario){
										accion = "A <span class='nombreAccion' onclick='loadPerfil(" + entry.followedUserId + ")'><a href='"+entry.pageUrl+ "/" + entry.followedUserNickname.removeAccents().split(' ').join('-') + ".html'>" + entry.followedUserNickname + "</a></span> no le gustó tu comentario ";
									}else{
										accion = "A <span class='nombreAccion' onclick='loadPerfil(" + entry.followedUserId + ")'><a href='"+entry.pageUrl+ "/" + entry.followedUserNickname.removeAccents().split(' ').join('-') + ".html'>" + entry.followedUserNickname + "</a></span> no le gustó el comentario de <a href='"+entry.pageUrl + "/" + entry.commentCreatorNickname.removeAccents().split(' ').join('-') + ".html'>" + entry.commentCreatorNickname + "</a>";
									}
									
									clase = "dashboard_dislike";
									userID = entry.followedUserId;
									avatar = entry.followedUserAvatar.replace(/http:/g,'https:');
									linkCreator = entry.pageUrl + "/" + entry.commentId + "/" +  entry.followedUserNickname.removeAccents().split(' ').join('-') + ".html";
									break;
									
								case "COMMENT_APPROVED":
										if( entry.commentCreatorId == pageId ){ 
											accion = "<span class='nombreAccion'onclick='loadPerfil(" + entry.commentCreatorId + ")'><a href='"+entry.pageUrl+ "/" + entry.commentCreatorNickname.removeAccents().split(' ').join('-') + ".html'>" + entry.commentCreatorNickname + "</a></span> publicó en su muro";
										}else{
											if(pageId == idUsuario){
												accion = "<span class='nombreAccion'onclick='loadPerfil(" + entry.commentCreatorId + ")'><a href='"+entry.pageUrl + "/" + entry.commentCreatorNickname.removeAccents().split(' ').join('-') + ".html'>" + entry.commentCreatorNickname + "</a></span> publicó en tu muro";
											}else{
												accion = "<span class='nombreAccion'onclick='loadPerfil(" + entry.commentCreatorId + ")'><a href='"+entry.pageUrl+ "/" + entry.commentCreatorNickname.removeAccents().split(' ').join('-') + ".html'>" + entry.commentCreatorNickname + "</a></span> publicó en el muro de <a href='"+entry.pageUrl + "/" + entry.pageTitle.removeAccents().split(' ').join('-') + ".html'>" + entry.pageTitle + "</a>";
											}
										}
									clase = "dashboard_comments";
									userID = entry.commentCreatorId;
									avatar = entry.commentCreatorAvatar.replace(/http:/g,'https:');
									linkCreator = entry.pageUrl + "/" + entry.commentId + "/" + entry.commentCreatorNickname.removeAccents().split(' ').join('-') + ".html";
									break;
							}

							outDataPerfil();
							
							var cssLeerMas = "";
							var buttonLeerMas;
							if(entry.commentText.length > 300){
								cssLeerMas = " cont_leer_mas ";
								buttonLeerMas = $('<div>').attr('id','btn_showfulltext_'+ entry.commentId).addClass('bt_leer_completo').html($('<a>').attr('href','#').attr('onclick','showFullText(' + entry.commentId + '); return false;').html('Leer completo'));
							}
							
							var commentTitle;
							if(typeof entry.commentTitle  !== "undefined" ){
								commentTitle = $('<div>').addClass('cm_title_data').html($('<a>').attr('href',linkCreator).html(entry.commentTitle));
							}else{
								commentTitle = "";
							}
							
							htmlLastComment.append(
								$('<div>').attr('class', 'dashboard_comment' + cssLeerMas).attr('id','cmt_txt_'+entry.commentId).append(
									$('<div>').attr('class', 'dashboard_hour_comment').append(
									$('<div>').attr('class', 'dashboard_img_wall').append(
									$('<img>').attr('onclick', 'loadPerfil("' + userID + '")').attr('src', avatar).attr('width', 'auto').attr('height', 'auto').attr('class', 'dashboard_img_follow'))
									),
									$('<div>').attr('class', 'dashboard_comment_cont').append(
									$('<span>').attr('class', 'dashboard_accion').append(accion),
									$('<div>').attr('class', 'dashboard_text_comment').append(
										commentTitle,
										$('<a>').attr('href',linkCreator).html( entry.commentText.revMotions())
									),
									$('<span>').attr('class', 'dashboard_time').append(buttonLeerMas, fecha)
									)
								)
							);
						}
					});

					if (countEntry == 0) {
						htmlLastComment.append($('<div>').attr('class', 'dashboard_comment').append('No existe actividad reciente'));
					}
				}
				else{
					htmlLastComment.append($('<div>').attr('class', 'dashboard_comment').append('No existe actividad reciente'));
				}

			
			if(idUsuario == getCookie('c_user_i')){
				$('#div_content_wall_we').html(htmlLastComment);	
			}else{
				$('#div_content_wall_we').html(htmlLastComment);
			}	
			
			
			//CHAT
			$('#imgEmisor').attr('src', response.userAvatar.replace(/http:/g,'https:'));
			$('#imgEmisor').attr('data', response.userAvatar.replace(/http:/g,'https:'));
			//$('#linkEmisor').attr('href', linkH);
						
			if(response.userPresence == "AVAILABLE"){
				$('#statusUser').attr('class', "status_conex conectado");
				$('#sp_status_user').text("Conectado");
				$('#sp_status_user').attr('class', "txt_conectado");
			}						
			else{
				$('#statusUser').attr('class', "status_conex nodisponible");
				$('#sp_status_user').text("No Disponible");
				$('#sp_status_user').attr('class', "txt_nodisponible");
			}
					
		});
	},

	getActivityFromUserComments: function (idUsuario){
		$.ajax({
			url: urlCacheComments,
			dataType: "json",
			data: {
				action: "getCommentsFromUser",
				accessToken: cmtData.accessToken,
				selectedUserId: idUsuario,
				approvedOnly: "true",
				limit: cmtData.size,
				order: "TIME_DESC",
				age: "160",
				format: "json",
				site: "emol",
				authType: cmtData.authType
			},
			method: "GET",
			cache: false
		}).done(function (response) {
			var htmlLastComment = $('<div>').html('');
			try{
				if (response.comments.length > 0) {
					var dateNow = new Date();
					var dateWeek = new Date();
					dateWeek.setDate(dateWeek.getDate() - 7);
					var countEntry = 0;

					(response.comments).forEach(function (entry) {

						var date = new Date(entry.eventTime);
						var fecha;

						if (date >= dateWeek) {
							countEntry = countEntry + 1;

							if (((date.getMonth() + 1) == (dateNow.getMonth() + 1)) && (date.getDate() == dateNow.getDate()) && (date.getFullYear() == dateNow.getFullYear())) {
								fecha = ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
							} else {
								fecha = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear().toString().substr(-2);
							}

							var accion = "";
							var clase = "";
							var userID = "";
							var avatar = "";

							switch (entry.type) {
								case "FOLLOWED_USER_LIKED":
									accion = "A <span class='nombreAccion' onclick='loadPerfil(" + entry.followedUserId + ")'>" + entry.followedUserNickname + "</span> le gustó el comentario de <span class='nombreAccion'onclick='loadPerfil(" + entry.commentCreatorId + ")'>" + entry.commentCreatorNickname + '</span>';
									clase = "dashboard_like";
									userID = entry.followedUserId;
									avatar = entry.followedUserAvatar.replace(/http:/g,'https:');
									break;
								case "FOLLOWED_USER_COMMENTED":
									accion = "<span class='nombreAccion'onclick='loadPerfil(" + entry.commentCreatorId + ")'>" + entry.commentCreatorNickname + "</span> comentó ";
									clase = "dashboard_comments";
									userID = entry.commentCreatorId;
									avatar = entry.commentCreatorAvatar.replace(/http:/g,'https:');
									break;
								case "FOLLOWED_USER_DISLIKED":
									accion = "A <span class='nombreAccion' onclick='loadPerfil(" + entry.followedUserId + ")'>" + entry.followedUserNickname + "</span> no le gustó el comentario de <span class='nombreAccion' onclick='loadPerfil(" + entry.commentCreatorId + ")'>" + entry.commentCreatorNickname + "</span>";
									clase = "dashboard_dislike";
									userID = entry.followedUserId;
									avatar = entry.followedUserAvatar.replace(/http:/g,'https:');
									break;
								case "MENTIONED":
									accion = "<span class='nombreAccion' onclick='loadPerfil(" + entry.commentCreatorId + ")'>" + entry.commentCreatorNickname + "</span> te mencionó en su comentario ";
									clase = "dashboard_mencioned";
									userID = entry.commentCreatorId;
									avatar = entry.commentCreatorAvatar.replace(/http:/g,'https:');
									break;
								case "COMMENT_REPLIED":
									accion = "<span class='nombreAccion' onclick='loadPerfil(" + entry.commentCreatorId + ")'>" + entry.commentCreatorNickname + "</span> respondió a tu comentario ";
									clase = "dashboard_comments";
									userID = entry.commentCreatorId;
									avatar = entry.commentCreatorAvatar.replace(/http:/g,'https:');
									break;
								case "COMMENT_LIKED":
									accion = "A <span class='nombreAccion' onclick='loadPerfil(" + entry.followedUserId + ")'>" + entry.followedUserNickname + "</span> le gustó tu comentario ";
									clase = "dashboard_like";
									userID = entry.followedUserId;
									avatar = entry.followedUserAvatar.replace(/http:/g,'https:');
									break;
								case "COMMENT_DISLIKED":
									accion = "A <span class='nombreAccion' onclick='loadPerfil(" + entry.followedUserId + ")'>" + entry.followedUserNickname + "</span> no le gustó tu comentario ";
									clase = "dashboard_dislike";
									userID = entry.followedUserId;
									avatar = entry.followedUserAvatar.replace(/http:/g,'https:');
									break;
							}

							outDataPerfil();

							htmlLastComment.append(
								$('<div>').attr('class', 'dashboard_comment').append(
									$('<div>').attr('class', 'dashboard_hour_comment').append(
									$('<div>').attr('class', 'dashboard_img_wall').append(
									$('<img>').attr('onclick', 'loadPerfil("' + userID + '")').attr('src', avatar).attr('width', 'auto').attr('height', 'auto').attr('class', 'dashboard_img_follow'))
									),
									$('<div>').attr('class', 'dashboard_comment_cont').append(
									$('<span>').attr('class', 'dashboard_accion').append(accion + " en "),
									$('<a>').attr('class', 'dashboard_link').attr('href', entry.pageUrl+ "#comment_user_" + entry.commentId).append(
									$('<div>').attr('class', 'dashboard_title').append(entry.pageTitle)
									),
									$('<div>').attr('class', 'dashboard_text_comment').append(entry.commentText.revMotions()),
									$('<span>').attr('class', 'dashboard_time').append(fecha)
									),
									$('<div>').attr('class', 'dashboard_soc_status').append(
										$('<div>').attr('class', clase).append($('<span>').attr('class', 'dashboard_like_txt').append('ME GUSTA'))
									)
								)
							);
						}
					});

					if (countEntry == 0) {
						htmlLastComment.append($('<div>').attr('class', 'dashboard_comment').append('No existe actividad reciente'));
					}
				}
				else{
					htmlLastComment.append($('<div>').attr('class', 'dashboard_comment').append('No existe actividad reciente'));
				}
			}catch(e){
				console.log(e);
			}
			
			 $('#div_content_wall').html(htmlLastComment);
					
		});
	},
				
	getCommentsFromUser: function (idUsuario) {
		
		if(idUsuario == null || idUsuario =='null'){
			idUsuario = getCookie("c_user_i");
		}
		
		if (idUsuario != null) {
			$.ajax({
				url: urlCacheComments,
				dataType: "json",
				data: {
					action: "getCommentsFromUser",
					accessToken: cmtData.accessToken,
					selectedUserId: idUsuario,
					approvedOnly: "true",
					order: "TIME_DESC",
					limit: parseInt($('#pag_dashboard_commen').html()),
					order: cmtData.order,
					age: "1600",
					format: "json",
					site: "emol",
					authType: cmtData.authType
				},
				method: "GET",
				cache: false
			}).done(function (response) {
			
				var htmlLastCommentUser = $("<div>").attr('class', 'dashboard_comment_list').html('');
				
				(response.comments).forEach(function (entry) {						
					var date = new Date(entry.time);
					var dateNow = new Date();
					var fecha;
					if (((date.getMonth() + 1) == (dateNow.getMonth() + 1)) && (date.getDate() == dateNow.getDate()) && (date.getFullYear() == dateNow.getFullYear())) {
						fecha = ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
					} else {
						fecha = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear().toString().substr(-2);
					}

					htmlLastCommentUser.append(
					$('<div>').attr('class', 'dashboard_comment').append(
					$('<div>').attr('class', 'dashboard_hour_comment').append(
					$('<span>').attr('class', 'dashboard_time').append(fecha)
					),
					$('<div>').attr('class', 'dashboard_comment_cont').append(
					$('<a>').attr('class', 'dashboard_link').attr('href', entry.page + "#comment_user_" + entry.id).append(
					$('<div>').attr('class', 'dashboard_title').append(entry.pageTitle),
					$('<div>').attr('class', 'dashboard_text_comment').append(entry.text.revMotions())
					)
					),
					$('<div>').attr('class', 'dashboard_soc_status').append(
					$('<div>').attr('class', 'dashboard_like').append(
					$('<span>').attr('class', 'dashboard_like_txt').append('ME GUSTA'),
					$('<span>').attr('class', 'dashboard_like_number').append(entry.likes)
					),
					$('<div>').attr('class', 'dashboard_dislike').append(
					$('<span>').attr('class', 'dashboard_like_txt').append('NO ME GUSTA'),
					$('<span>').attr('class', 'dashboard_like_number').append(entry.dislikes)
					)
					)
					)						
					)												
				});

				if (response.comments.length === 0) {
					htmlLastCommentUser.append($('<div>').attr('class', 'dashboard_comment').append('No hay Comentarios'));
					$('#show_more_btn_comment_comments').remove();
				}else{
					if(idUsuario != getCookie('c_user_i')){
						var showMoreBtn = $('#show_more_btn_comment_comments');
						$('#show_more_btn_comment').remove();
					}else{
						var showMoreBtn = $('#show_more_btn_comment');
						 $('#show_more_btn_comment_comments').remove();
														
					}
					var remainingCmts = countComments - parseInt($('#pag_dashboard_commen').html());
					if (remainingCmts > 10) {
						showMoreBtn.show();
						showMoreBtn.html('Cargar 10 Comentarios más');
					} else if (remainingCmts > 0) {
						showMoreBtn.html('Cargar ' + remainingCmts + ' Comentarios más');
						showMoreBtn.show();
					} else {
						showMoreBtn.hide();
					}
				}
				
				if(idUsuario != getCookie('c_user_i')){
					$('.dashboard_comment_comments').html(htmlLastCommentUser);	
				}else{
					$('#div_content_wall').html(htmlLastCommentUser);
				}
			});
		}
	},
	
	getWallFromUser:function (idUsuario) {
		if (idUsuario != null) {
			var estatus = true;
			if(idUsuario == getCookie('c_user_i')){ 
				estatus = true;
			}

			CommentsApi.getCommentsCountFromUser(idUsuario);
			
			$.ajax({
				url: urlCacheComments,
				dataType: "json",
				data: {
					action: "getComments",
					accessToken: cmtData.accessToken,
					url: cmtData.page.replace('comentaristalab','comentarista'),
					includePending: 'true',
					order: "TIME_DESC",
					limit: "10",
					age: "160",
					format: "json",
					site: "emol",
					authType: cmtData.authType
				},
				method: "GET",
				cache: false
			}).done(function (response) {		
			
				var htmlLastCommentUser = $("<div>").attr('class', 'dashboard_comment_list').html('');
				(response.comments).forEach(function (entry) {	

					var date = new Date(entry.time);
					var dateNow = new Date();
					var fecha;
					if (((date.getMonth() + 1) == (dateNow.getMonth() + 1)) && (date.getDate() == dateNow.getDate()) && (date.getFullYear() == dateNow.getFullYear())) {
						fecha = ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
					} else {
						fecha = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear().toString().substr(-2);
					}
					var texto = entry.text.revMotions();
					try{
						if (typeof(entry.embeds) !== 'undefined'){
							(entry.embeds).forEach(function (embed) {	
								texto = texto + ' ' + embed.embed;
							})
						}
					}catch(e){}
					
					var pending = '';
					var button_aprobar = null;
					var button_rechazar = null;
					if( entry.status != 'PENDING' || (entry.status == 'PENDING' && (idUsuario == getCookie('c_user_i') || getCookie('c_user_i') == entry.creatorId))){
						
						if(entry.status == 'PENDING' && idUsuario == getCookie('c_user_i')){
							pending = ' dashboard_comment_pending';
							button_aprobar = $('<div>').attr('onclick','CommentsApi.approveInMyWall('+ entry.id + ')' ).attr('class', 'dashboard_button_comment_pending').append('Aprobar');
							button_rechazar = $('<div>').attr('onclick','CommentsApi.deleteComment('+ entry.id + ')' ).attr('class', 'dashboard_button_comment_pending').append('Rechazar');
						}
						htmlLastCommentUser.append(
							$('<div>').attr('class', 'dashboard_comment dashboard_comment_wall comment_' + entry.id + pending).append(
								$('<div>').attr('class', 'dashboard_hour_comment').append(
									$('<span>').attr('class', 'dashboard_time').append(fecha)
								),
								$('<div>').attr('class', 'dashboard_comment_cont').append(
									$('<div>').attr('class', 'dashboard_text_comment').append(texto),
									button_aprobar,button_rechazar
								)
							)						
						)
					}
										
				});

				if (response.comments.length === 0) {
					htmlLastCommentUser.append(
					$('<div>').attr('class', 'dashboard_comment').append('No hay Comentarios')
					)
				}
				$('#div_content_wall').html(htmlLastCommentUser);					
			});
		}
	},

	approveInMyWall: function (idComentario) {
		$.ajax({
			url: urlCacheComments,
			dataType: "json",
			data: {
				id:idComentario,
				action: "approveInMyWall",
				accessToken: cmtData.accessToken,
				format: "json",
				site: "emol",
				title: encodeURIComponent(cmtData.title),
				authType: cmtData.authType
			},
			method: "GET"
		}).done(function (response) {

		})
		vex.dialog.alert('Aprobaste la publicación en tu muro. ');
		CommentsApi.getWallFromUser(getCookie('c_user_i'));
		setTimeout(CommentsApi.updateComments, 2000);
	},
	
	imgPerfil: function () {
		$.ajax({
			url: urlCacheComments,
			dataType: "json",
			data: {
				action: "getCommentsFromUser",
				accessToken: cmtData.accessToken,
				selectedUserId: getCookie("c_user_i"),
				approvedOnly: "true", 
				order: "TIME_DESC",
				limit: "1",
				age: "160",
				format: "json",
				authType: cmtData.authType
			},
			method: "GET",
			cache: false
		}).done(function (response) {
			$('#nick_input2').text(response.userNickname);
			if(response.userNickname == ''){
				$(".compPram").show().append("Para comentar debes completar tu perfil ",$("<b>").attr("onclick","loadPerfilConfig(getCookie(\"c_user_i\"));").append("acá"));
				hideReplyBox();
			}else{
				$('#user_info').fadeIn();
			}
			$('#link_nick_input2').attr('href','https://comentarista.emol.com/'+getCookie("c_user_i")+'/'+response.userNickname.removeAccents().split(' ').join('-')+'.html');
			$('#link_img_perfil').attr('href','https://comentarista.emol.com/'+getCookie("c_user_i")+'/'+response.userNickname.removeAccents().split(' ').join('-')+'.html');
			$('#editarPerfilCaja').attr('href','https://comentarista.emol.com/'+getCookie("c_user_i")+'/'+response.userNickname.removeAccents().split(' ').join('-')+'.html#EditarPefil');
			cmtData.tym = (response.userAcceptedTerms)?response.userAcceptedTerms:'undefined';
			try {
				$('#img_perfil').attr("src", response.userAvatar);
				setCookie('c_user_p',JSON.stringify({nick:response.userNickname,avatar:response.userAvatar.replace(/http:/g,'https:')}),60);
			} catch (err) {
				$('#img_perfil').attr("src", 'http://static.emol.cl/emol50/img/sin_image_comentarios.png');
				setCookie('c_user_p',JSON.stringify({nick:response.userNickname,avatar:'http://static.emol.cl/emol50/img/sin_image_comentarios.png'}),60);
			}
		});
	},

	userIdComments: function () {
		$.ajax({
			url: urlComments,
			dataType: "json",
			data: {
				action: "myId",
				accessToken: cmtData.accessToken,
				format: "json",
				authType: cmtData.authType
			},
			method: "GET",
			cache: false
		}).done(function (response) {
			setCookie('c_user_i', response.id, 360);
			setCookie('SSTES', response.token, 360);
			setCookie('c_user_l', response.originalAuth, 360);
			if(response.admin){
				cmtData.isAdmin = true;
				$('#moderation_link a').attr('href', '/comentarios/moderacion.aspx?page=' + encodeURIComponent(cmtData.page)).html('Herramienta de moderaci&oacute;n');
				$('#moderation_link').show();
			}
			
			try{
				if(response.originalAuth.toLowerCase() == 'fb'){
					$('.fb-login-button').show();
				}else{
					$('.btn_pram_logout').show();
					$('.fb-login-button').hide();
				}
			}catch(err){
				$('.fb-login-button').show();
				$('.btn_pram_logout').show();
			}
			
			if (typeof InitEncuesta === "function") {
				InitEncuesta();
			}
			CommentsApi.imgPerfil();
			CommentsApi.setFollowing();
		});
	},

	updateComments: function (cache) {
		if (cache === undefined) {
			cache = true;
		}
		var includePending = false;
		if(getCookie("c_user_i")  == window.location.href.split('/')[3] ){
			includePending = true;
		}
		$.ajax({
			url: urlComments,
			dataType: "json",
			data: {
				action: "getComments",
				
				url: cmtData.page.replace('comentaristalab','comentarista'),
				specificCommentId:cmtData.commentId,
				includePending: includePending,
				format: "json",
				limit: cmtData.size,
				order: cmtData.order
			},
			method: "GET",
			cache: cache
		}).done(setCommentsView);
	},
	
	getForbiddenWords: function () {
		$.ajax({
			url: urlComments,
			dataType: "json",
			data: {
				action: "getForbiddenWordz"
			},
			method: "GET",
			cache: true
		})
		.done(function (response) {
			if (response.hasOwnProperty('jbeqf') && response.jbeqf.length > 0) {
				blackListWords = response.jbeqf.replace(/[a-zA-Z]/g, function (c) { return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26); }).split(',');
			}
		})
		.fail(function (errjqXHR, status, error) {
			console.log('Error getForbiddenWords: ', errjqXHR, status, error)
		});
	},

	insertComment: function (id){
		var commentText;
		if (typeof id === 'undefined') {
			commentText = Mentions($('#comment_area').html());
		}
		else {

			commentText = Mentions($('#comment_area' + id).html());
		}
		var valida = 0;
		$('input[name^="file"]').each(function () {
			commentText += " " + $(this).val();
			valida = 1;
		});

		if (valida) {
			commentText = "&nbsp;" + commentText;
		}

		if (commentText !== "") {

			commentText = encodeURIComponent(commentText.trim());

			var isIE = /(MSIE 8)|(MSIE 9)/i.test(navigator.userAgent);
			var method = "POST";
			if (isIE) {
				method = "GET";
			}
			$.ajax({
				url: urlComments,
				method: method,
				dataType: "json",
				data: {
					action: "newComment",
					text: commentText,
					url: cmtData.page.replace('comentaristalab','comentarista'),
					accessToken: cmtData.accessToken,
					title: encodeURIComponent(cmtData.title),
					authType: cmtData.authType,
					id: id,
					isAdmin: cmtData.isAdmin ? 'Y' : 'N',
					acceptedConditions: (cmtData.aprtym)?'Y':'N'
				}
			}).done(function (response) {
				if (response.hasOwnProperty('error')) {
					vex.dialog.alert("Ha ocurrido un error, inténtelo nuevamente");
					enableInsertCommentButton(id);
					return;
				}
				if (response.hasOwnProperty('status') && response.status === 'PENDING') {
					vex.dialog.alert('Tu comentario será revisado por nuestros moderadores');
					if (typeof id !== 'undefined')
						showReply(id);
				} else {
					var el = document.querySelector('li[data-order="LIKES"]');
					vex.dialog.alert('Tu comentario ha sido enviado.');
					el.click();
				}
				//document.getElementById('comment_area').value = "";
				$('#comment_area').html("");
				$("#buttonPublicar").prop('disabled', true);
				enableInsertCommentButton(id);
				
				setTimeout(CommentsApi.updateComments, 1000);
				
			})
			.fail(function (err) {
				vex.dialog.alert("Ha ocurrido un error, inténtelo nuevamente", err);
			});
		}
	},
	
	editComment: function (id){
		
		var commentText;
		commentText = Mentions($('#comment_edit_area_'+id).html());
		
		if (commentText !== "") {
			
			commentText = encodeURIComponent(commentText.trim());
			var isIE = /(MSIE 8)|(MSIE 9)/i.test(navigator.userAgent);
			var method = "POST";
			if (isIE) {
				method = "GET";
			}
			
			$.ajax({
				url: urlComments,
				method: method,
				dataType: "json",
				data: {
					action: "editComment",
					text: commentText,
					url: cmtData.page.replace('comentaristalab','comentarista'),
					accessToken: cmtData.accessToken,
					commentTitle: $('#comment_edit_title_'+id).val(),
					authType: cmtData.authType,
					currentCommentId: id,
					id: id,
					isAdmin: cmtData.isAdmin ? 'Y' : 'N',
					acceptedConditions: (cmtData.aprtym)?'Y':'N'
				}
			}).done(function (response) {
				console.log(response);
				if (response.hasOwnProperty('error')) {
					vex.dialog.alert("Ha ocurrido un error, inténtelo nuevamente");
					enableInsertCommentButton(id);
					return;
				}
				if (response.hasOwnProperty('status') && response.status === 'PENDING') {
					vex.dialog.alert('Tu publicación será revisada por nuestros moderadores');
					if (typeof id !== 'undefined')
						showEdit(id);
				} else {
					var el = document.querySelector('li[data-order="LIKES"]');
					vex.dialog.alert('Tu publicación ha sido actualizada.');
					el.click();
				}
				//document.getElementById('comment_area').value = "";
				$('#comment_area').html("");
				$("#buttonPublicar").prop('disabled', true);
				enableInsertCommentButton(id);
				
				setTimeout(CommentsApi.updateComments, 1000);
				
			})
			.fail(function (err) {
				vex.dialog.alert("Ha ocurrido un error, inténtelo nuevamente", err);
			});
		}
	},

	insertCommentPerfil: function (id) {
		var commentText;
		var commentTitle;
		if (typeof id === 'undefined') {

			commentText = Mentions($('#comment_area').html());
		}
		else {

			commentText = Mentions($('#comment_area' + id).html());
		}
		if($('#comment_title').val() != ''){
			commentTitle = $('#comment_title').val();
		}
		var valida = 0;
		$('input[name^="file"]').each(function () {
			commentText += " " + $(this).val();
			valida = 1;
		});

		if (valida) {
			commentText = "&nbsp;" + commentText;
		}

		if (commentText !== "") {

			commentText = encodeURIComponent(commentText.trim());

			var isIE = /(MSIE 8)|(MSIE 9)/i.test(navigator.userAgent);
			var method = "POST";
			if (isIE) {
				method = "GET";
			}
			
			
			$.ajax({
				url: urlComments,
				method: method,
				dataType: "json",
				data: {
					action: "newComment",
					text: commentText,
					url: cmtData.page.replace('comentaristalab','comentarista'),
					accessToken: cmtData.accessToken,
					title: encodeURIComponent(cmtData.title),
					authType: cmtData.authType,
					id: id,
					commentTitle : commentTitle,
					isAdmin: cmtData.isAdmin ? 'Y' : 'N',
					acceptedConditions: (cmtData.aprtym)?'Y':'N'
				}
			}).done(function (response) {
				if (response.hasOwnProperty('error')) {
					vex.dialog.alert("Ha ocurrido un error, inténtelo nuevamente");
					enableInsertCommentButton(id);
					return;
				}
				if (response.hasOwnProperty('status') && response.status === 'PENDING') {
					if (typeof id === 'undefined') {
						vex.dialog.alert('Tu publicación debe ser aprobada para quedar visible en el muro');
					}else{
						vex.dialog.alert('Tu publicación se realizó con éxito');
					}
					if (typeof id !== 'undefined'){
						showReply(id);
					}
					
					
				} else {
					var el = document.querySelector('li[data-order="LIKES"]');
					vex.dialog.alert('Tu publicación se realizó con éxito');<!-- Comentario Enviado -->
					el.click();
				}
				//document.getElementById('comment_area').value = "";
				$('#comment_area').html("");
				$('#comment_title').val('');
				$("#buttonPublicar").prop('disabled', true);
				enableInsertCommentButton(id);
				
				setTimeout(CommentsApi.updateComments, 1000);
			})
			.fail(function (err) {
				vex.dialog.alert("Ha ocurrido un error, inténtelo nuevamente", err);
			});
		}
	},

	likeComment: function (id) {
		if (cmtData.accessToken !== 'undefined') {
			$.ajax({
				url: urlComments,
				dataType: "json",
				data: {
					action: "like",
					id: id,
					accessToken: cmtData.accessToken,
					authType: cmtData.authType
				},
				method: "GET"
			}).done(function (response) {
				if (response.hasOwnProperty('error')) {
					vex.dialog.alert("Debes iniciar sesión para hacer me gusta.");
					return;
				}
				if (response.hasOwnProperty('status') && response.status) {
					$("#cont_like_" + id)
					.tooltip({
						title: '¡Hemos registrado tu opinión!',
						delay: "1000"
					})
					.tooltip('show');
					$("#likes_txt_" + id).text(response.likes);
					$("#dislikes_txt_" + id).text(response.dislikes);
					setTimeout(function () { $("#cont_like_" + id).tooltip("destroy"); }, 1200);
				} else {
					$("#cont_like_" + id)
					.tooltip({
						title: 'Ya has hecho ME GUSTA!',
						delay: "1000"
					})
					.tooltip('show');
					setTimeout(function () { $("#cont_like_" + id).tooltip("destroy"); }, 1200);
				}
			});
		} else { vex.dialog.alert("Debes iniciar sesión para hacer me gusta."); }
	},

	dislikeComment: function (id) {
		if (cmtData.accessToken !== 'undefined') {
			$.ajax({
				url: urlComments,
				data: {
					action: "dislike",
					id: id,
					accessToken: cmtData.accessToken,
					authType: cmtData.authType
				},
				dataType: "json",
				method: "GET"
			}).done(function (response) {
				if (response.hasOwnProperty('error')) {
					vex.dialog.alert("Debes iniciar sesión para hacer no me gusta.");
					return;
				}
				if (response.hasOwnProperty('status') && response.status) {
					$("#cont_dislike_" + id)
					.tooltip({
						title: '¡Hemos registrado tu opinión!',
						delay: "1000"
					})
					.tooltip('show');
					$("#likes_txt_" + id).text(response.likes);
					$("#dislikes_txt_" + id).text(response.dislikes);
					setTimeout(function () { $("#cont_dislike_" + id).tooltip("destroy"); }, 1200);
				} else {
					$("#cont_dislike_" + id)
					.tooltip({
						title: 'Ya has hecho ME GUSTA!',
						delay: "1000"
					})
					.tooltip('show');
					setTimeout(function () { $("#cont_dislike_" + id).tooltip("destroy"); }, 1200);
				}
			});
		} else { vex.dialog.alert("Debes iniciar sesión para hacer me gusta."); }
	},

	deleteComment: function (id) {
		$.ajax({
			url: urlComments,
			data: {
				action: "hide",
				id: id,
				accessToken: cmtData.accessToken,
				isAdmin: cmtData.isAdmin ? 'Y' : 'N',
				authType: cmtData.authType
			},
			method: "GET"
		}).done(function () {
			setTimeout(CommentsApi.updateComments(false), 1000);
		});
	},

	reportComment: function (id) {
		$.ajax({
			url: urlComments,
			data: {
				action: "denounce",
				id: id,
				accessToken: cmtData.accessToken,
				authType: cmtData.authType
			},
			method: "GET"
		}).complete(CommentsApi.updateComments);
	},

	getTotalComments: function () {
		$.ajax({
			url: urlComments,
			dataType: "json",
			data: {
				action: "getTotalComments",
				url: cmtData.page
			},
			method: "GET",
			cache: false
		}).done(function (data) {
			document.getElementById('n_comentarios_txt').innerHTML = data.total + " Comentarios";
		});
	},

	boostComment: function (id) {
		$.ajax({
			url: urlComments,
			data: {
				action: "boost",
				id: id,
				accessToken: cmtData.accessToken,
				isAdmin: cmtData.isAdmin ? 'Y' : 'N',
				authType: cmtData.authType
			},
			method: "POST"
		}).done(function () {
			setTimeout(CommentsApi.updateComments, 1000);
		});
	},

	unboostComment: function (id) {
		$.ajax({
			url: urlComments,
			data: {
				action: "unboost",
				id: id,
				accessToken: cmtData.accessToken,
				isAdmin: cmtData.isAdmin ? 'Y' : 'N',
				authType: cmtData.authType
			},
			method: "POST"
		}).done(function () {
			setTimeout(CommentsApi.updateComments, 1000);
		});
	},

	banUser: function (userId, id) {
		$.ajax({
			url: urlComments,
			data: {
				action: "banUser",
				id: id,
				selectedUserId: userId,
				accessToken: cmtData.accessToken,
				isAdmin: cmtData.isAdmin ? 'Y' : 'N',
				authType: cmtData.authType
			},
			method: "POST"
		}).done(function (res) {
			setTimeout(CommentsApi.updateComments, 1000);
		});
	},

	unbanUser: function (userId, id) {
		$.ajax({
			url: urlComments,
			data: {
				action: "unbanUser",
				id: id,
				selectedUserId: userId,
				accessToken: cmtData.accessToken,
				isAdmin: cmtData.isAdmin ? 'Y' : 'N',
				authType: cmtData.authType
			},
			method: "POST"
		}).done(function (res) {
			setTimeout(CommentsApi.updateComments, 1000);
		});
	},

	approveComment: function (id) {
		$.ajax({
			url: urlComments,
			data: {
				action: "approve",
				id: id,
				accessToken: cmtData.accessToken,
				isAdmin: cmtData.isAdmin ? 'Y' : 'N',
				authType: cmtData.authType
			},
			method: "POST"
		}).done(function () {
			setTimeout(CommentsApi.updateComments, 1000);
		});
	},

	getCountries: function () {
		$.ajax({
			url: urlCacheComments,
			dataType: "json",
			data: {
				action: "getCountries"
			},
			method: "GET",
			cache: true
		}).done(function (data) {
			var countrys = [];
			countrys[0] = ['', 'Seleccione un país'];

			var count = 1;
			data.forEach(function (entry) {
				countrys[count] = [entry.id, entry.name];
				count++;
			});
			var htmlPais = "";
			for (var hi = 0; hi < countrys.length; hi++) {
				var pais = countrys[hi];

				if (pais[0] != countryId) {
					htmlPais = htmlPais + '<option value="' + pais[0] + '">' + pais[1] + '</option>';
				} else {
					htmlPais = htmlPais + '<option selected value="' + pais[0] + '">' + pais[1] + '</option>';
					if (countryId == 'CHL') {
						CommentsApi.getStates(countryId);
						$('#tit_region').addClass("active").show();
						$('#region').show();												
						CommentsApi.getCities(stateId);
						$('#tit_comuna').addClass("active").show();
						$('#comuna').show();
					}
				}
			}
			$('.sel_paises').html(htmlPais);
		});
	},

	getStates: function (id) {
		if (id != '') {
			$.ajax({
				url: urlCacheComments,
				dataType: "json",
				data: {
					action: "getStates",
					countryId: id
				},
				method: "GET",
				cache: true
			}).done(function (data) {
				var states = [];
				states[0] = ['', 'Seleccione una región'];
				var count = 1;
				data.forEach(function (entry) {
					states[count] = [entry.id, entry.name];
					count++;
				});
				var htmlReg = "";
				for (var hi = 0; hi < states.length; hi++) {
					var region = states[hi];
					if (region[0] != stateId) {
						htmlReg = htmlReg + '<option value="' + region[0] + '">' + region[1] + '</option>';
					} else {
						htmlReg = htmlReg + '<option selected value="' + region[0] + '">' + region[1] + '</option>';
					}
				}
				idPais = $('#pais :selected').text();
				if (idPais == 'Chile') {
					$('.sel_regiones').html(htmlReg);
					$('#tit_region').addClass("active").show();
					$('#region').show();
				}
				else {
					$('#tit_comuna').hide();
					$('#comuna').hide();
					$('#tit_region').hide();
					$('#region').hide();
				}

			});
		}
	},

	getCities: function (id) {
		if (id != '') {
			$.ajax({
				url: urlCacheComments,
				dataType: "json",
				data: {
					action: "getCities",
					stateId: id
				},
				method: "GET",
				cache: true
			}).done(function (data) {
				var citys = [];
				citys[0] = ['', 'Seleccione una comuna'];
				var count = 1;
				data.forEach(function (entry) {
					citys[count] = [entry.id, entry.name];
					count++;
				});
				var htmlCom = "";
				for (var hi = 0; hi < citys.length; hi++) {
					var comuna = citys[hi];
					if (comuna[0] != cityId) {
						htmlCom = htmlCom + '<option value="' + comuna[0] + '">' + comuna[1] + '</option>';
					} else {
						htmlCom = htmlCom + '<option selected value="' + comuna[0] + '">' + comuna[1] + '</option>';
					}

				}
				idPais = $('#pais :selected').text();
				if (idPais == 'Chile') {
					$('.sel_comunas').html(htmlCom);
					$('#tit_comuna').addClass("active").show();
					$('#comuna').show();
				}
				else {
					$('#tit_comuna').hide();
					$('#comuna').hide();
					$('#tit_region').hide();
					$('#region').hide();
				}

			});
		}
	},

	updateUserProfile: function () {			
		var nombre = $('#nombre').val();
		var mail = $('#mail').val();
		var fono = "+" + $('#telefono').val();
		var agno = $('#agno').val();
		var genero = $('#genero').val();

		var idpais = "";
		var idcomuna = "";
		var idregion = "";
		if (typeof ($('#pais :selected').val()) != "undefined") {
			if ($('#pais :selected').val() != "") {
				idpais = $('#pais :selected').val();
			}
		}
		if (typeof ($('#comuna :selected').val()) != "undefined") {
			if ($('#comuna :selected').val() != "") {
				idcomuna = $('#comuna :selected').val();
			}
		}

		if (typeof ($('#region :selected').val()) != "undefined") {
			if ($('#region :selected').val() != "") {
				idregion = $('#region :selected').val();
			}
		}

		var term = document.getElementById('checkTerminos').checked;
					
		if (nombre == '' || fono == '' || mail == '' || idpais == '' || fono.length < 11 || genero == '' || agno == '' || term == false) {

			if(term == false)
			{					
				mensajeValida = '<div class="notification_emol_social notification_e_social_error"><div class="noticiation_int_e_social"><span class="mensaje"><span class="iconoMensaje"><i class="fa fa-times-circle" aria-hidden="true"></i></span> Debes leer y aceptar los términos y condiciones</span><span class="botones"><div class="dashboard_exit" onclick="CloseNotification()"><i class="fa fa-times" aria-hidden="true"></i></div></span></div></div>';
				$('#dashboard_notification').html(mensajeValida);					
			}	
			else
			{
				validaInputs();
				mensajeValida = '<div class="notification_emol_social notification_e_social_error"><div class="noticiation_int_e_social"><span class="mensaje"><span class="iconoMensaje"><i class="fa fa-times-circle" aria-hidden="true"></i></span> Debes llenar todos los campos</span><span class="botones"><div class="dashboard_exit" onclick="CloseNotification()"><i class="fa fa-times" aria-hidden="true"></i></div></span></div></div>';
				$('#dashboard_notification').html(mensajeValida);
			}               
		}
		else {
			if (validaNombre()) {
				if (idpais == "CHL") {
					if (idregion == '' || idcomuna == '') {
						validaInputs();
						mensajeValida = '<div class="notification_emol_social notification_e_social_error"><div class="noticiation_int_e_social"><span class="mensaje"><span class="iconoMensaje"><i class="fa fa-times-circle" aria-hidden="true"></i></span> Debes llenar todos los campos</span><span class="botones"><div class="dashboard_exit" onclick="CloseNotification()"><i class="fa fa-times" aria-hidden="true"></i></div></span></div></div>';
						$('#dashboard_notification').html(mensajeValida);
					}
					else {
						$.ajax({
							url: urlComments,
							dataType: "json",
							data: {
								action: "updateUserProfile",
								name: nombre,
								email: mail,
								phone: "+" + fono,
								countryId: idpais,
								cityId: idcomuna,
								birthYear: agno,
								gender: genero,
						acceptedConditions:"y",
								accessToken: cmtData.accessToken,
								authType: cmtData.authType
							},
							method: "GET",
							cache: false
						}).done(function (data) {
							mensajeValida = '<div class="notification_emol_social notification_e_social_ok"><div class="noticiation_int_e_social"><span class="mensaje"><span class="iconoMensaje"><i class="fa fa-check-circle" aria-hidden="true"></i></span> Tus datos han sido actualizados</span><span class="botones"><div class="dashboard_exit" onclick="CloseNotification()"><i class="fa fa-times" aria-hidden="true"></i></div></span></div></div>';
							$('#dashboard_notification').html(mensajeValida);
							$('#dashboard_notification .notification_emol_social').delay(5000).slideUp('slow');
							if (userValido == true){
								openTab("Wall", "tabWall");
					}
					else
					{
						$('#tabVerifica').css({ 'display': 'inline-block' });
						openSubTab('contVerificar','tabVerifica');
					}
						});
					}
				}
				else {
					$.ajax({
						url: urlComments,
						dataType: "json",
						data: {
							action: "updateUserProfile",
							name: nombre,
							email: mail,
							phone: fono,
							countryId: idpais,
							birthYear: agno,
							gender: genero,
					acceptedConditions:"y",
							accessToken: cmtData.accessToken,
							authType: cmtData.authType
						},
						method: "GET",
						cache: false
					}).done(function (data) {
					
					if(mailValido == false)
					{								
						CommentsApi.validateMail();
					}
					else
					{								
						mensajeValida = '<div class="notification_emol_social notification_e_social_ok"><div class="noticiation_int_e_social"><span class="mensaje"><span class="iconoMensaje"><i class="fa fa-check-circle" aria-hidden="true"></i></span> Tus datos han sido actualizados</span><span class="botones"><div class="dashboard_exit" onclick="CloseNotification()"><i class="fa fa-times" aria-hidden="true"></i></div></span></div></div>';
					}
						
						$('#dashboard_notification').html(mensajeValida);
						$('#dashboard_notification .notification_emol_social').delay(5000).slideUp('slow');
				if (userValido == true){
						openTab("Wall", "tabWall");
				}
				else
				{
					$('#tabVerifica').css({ 'display': 'inline-block' });
					openSubTab('contVerificar','tabVerifica');
				}
					});
				}
			}
			else {
				mensajeValida = '<div class="notification_emol_social notification_e_social_error"><div class="noticiation_int_e_social"><span class="mensaje"><span class="iconoMensaje"><i class="fa fa-times-circle" aria-hidden="true"></i></span> El nombre ingresado no está disponible</span><span class="botones"><div class="dashboard_exit" onclick="CloseNotification()"><i class="fa fa-times" aria-hidden="true"></i></div></span></div></div>';
				$('#dashboard_notification').html(mensajeValida);
				$('#nombre').addClass('destacar_campo');
			}
		}

	},

	autoComplete: function (id) {
		var idComment = (typeof id !== 'undefined') ? id : '';
		$('#comment_area' + idComment).textcomplete([{
			match: /\B@(\w{3,}(?:\s*\w*)*)$/,
			search: function (term, callback) {
				$.getJSON(urlCacheComments, { action: "userAutoComplete", pattern: term, site: "emol" })
				.done(function (data) {
					var dataList = [];
					$.each(data, function (i, dtB) {
						dataList.push({ name: dtB.nickname, id: dtB.id, img: (typeof dtB.urlAvatar == "undefined") ? "//static.emol.cl/emol50/img/sin_image_comentarios.png" : dtB.urlAvatar }); //agregarID
					});
					callback(dataList);
				})
				.fail(function () { callback([]); });
			},
			cache: true,
			template: function (tem) {
				return '<div class="social_mencion_img"><img src="' + tem.img + '"></div><span class="social_mencion_nombre">' + tem.name + '</span>';
			},
			replace: function (mention) {
				var html = ' <mentions data-id="' + mention.id + '" data-name="' + mention.name + '"><a class="social_user_link" href="javascript:void(0)">' + mention.name + '</a><div class="eliminar_mencion" onclick="$(this).parent().remove();"><i class="fa fa-times" aria-hidden="true" ></i></div></mentions> '; //no borrar espacios
				return html;
			},
			index: 1
		}], { maxCount: (mobilecheck()) ? 5 : 10, noResultsMessage: '&nbsp; Usuario no encontrado.' });

		if (typeof id !== 'undefined') {

			$.getJSON(urlCacheComments, { action: "getCommentById", id: idComment }).done(function (d) {
				$('#comment_area' + idComment).html(
					'<mentions data-id="' + d.creatorId + '" data-name="' + d.creator + '"><a class="social_user_link" href="javascript:void(0)">' + d.creator + '</a><div class="eliminar_mencion" onclick="$(this).parent().remove();"><i class="fa fa-times" aria-hidden="true" ></i></div></mentions>&nbsp;'
				);
			});
		}
	},

	validateMail: function () {
		var campoMail = $('#mail').val();
		mensajeValida = "";
		$.ajax({
			url: urlComments,
			dataType: "json",
			data: {
				action: "validateEmail",
				accessToken: cmtData.accessToken,
				authType: cmtData.authType
			},
			method: "GET",
			cache: false
		}).done(function (data) {
						
			mensajeValida = '<div class="notification_emol_social notification_e_social_ok"><div class="noticiation_int_e_social"><span class="mensaje"><span class="iconoMensaje"><i class="fa fa-check-circle" aria-hidden="true"></i></span> Enviamos un E-mail a <b>' + campoMail + '</b> para completar la validación</span><span class="botones"><div class="dashboard_exit" onclick="CloseNotification()"><i class="fa fa-times" aria-hidden="true"></i></div><div class="cont_link_option_validate"><a id="noCoincide" onclick="destacar(\'mail\');openTab(\'contEditarPefil\',\'tabContEditarPerfil\');">Este no es mi e-mail</a></div></span></div></div>';
			$('#dashboard_notification').html(mensajeValida);
			$('#dashboard_notification .notification_emol_social').delay(5000).slideUp('slow');

		})
		.fail(function (err) {
			
		});
	},

	validateFono: function () {
		var mensajeValida = "";
		$.ajax({
			url: urlComments,
			dataType: "json",
			data: {
				action: "validatePhone",
				accessToken: cmtData.accessToken,
				authType: cmtData.authType
			},
			method: "GET",
			cache: false
		}).done(function (data) {
			
			var fono = userFono.substring(0, 7);
			mensajeValida = '<div class="notification_emol_social notification_e_social_bg"><div class="noticiation_int_e_social"><span class="mensaje"><span class="iconoMensaje"><i class="fa fa-info-circle" aria-hidden="true"></i></span> Enviamos un SMS al número <b>+' + fono + 'xxxxx </b> con el código para completar la validación</span><span class="botones"><input id="codigo" name="codigo" type="text" value=\"\"/><input type="submit" value="ENVIAR" class="vex-dialog-button-primary vex-dialog-button vex-first" onclick="CommentsApi.validateCodigo()"><div class="cont_link_option_validate"><a onclick="CommentsApi.validateCall()">No recibí el SMS, quiero que me llamen</a><a id="noCoincide" onclick="destacar(\'telefono\');openTab(\'contEditarPefil\',\'tabContEditarPerfil\');">Este no es mi número</a></div><div class="dashboard_exit" onclick="CloseNotification();"><i class="fa fa-times" aria-hidden="true"></i></div></span></div></div>';
			$('#dashboard_notification').html(mensajeValida);

		});

	},

	validateCall: function () {
		mensajeValida = "";
		$.ajax({
			url: urlComments,
			dataType: "json",
			data: {
				action: "validatePhone",
				accessToken: cmtData.accessToken,
				voice: '1',
				authType: cmtData.authType
			},
			method: "GET",
			cache: false
		}).done(function (data) {
			var fono = userFono.substring(0, 7);
			mensajeValida = '<div class="notification_emol_social notification_e_social_bg"><div class="noticiation_int_e_social"><span class="mensaje"><span class="iconoMensaje"><i class="fa fa-info-circle" aria-hidden="true"></i></span> Realizaremos un llamado al número <b>+' + fono + 'xxxxx </b> para indicarte el código y completar la validación</span><span class="botones"><input id="codigo" name="codigo" type="text" value=\"\"/><input type="submit" value="ENVIAR" class="vex-dialog-button-primary vex-dialog-button vex-first" onclick="CommentsApi.validateCodigo()"><div class="cont_link_option_validate"><a id="noCoincide" onclick="destacar(\'telefono\');openTab(\'contEditarPefil\',\'tabContEditarPerfil\');">Este no es mi número</a></div><div class="dashboard_exit" onclick="CloseNotification();"><i class="fa fa-times" aria-hidden="true"></i></div></span></div></div>';
			$('#dashboard_notification').html(mensajeValida);
		});
	},

	validateCodigo: function () {
		var cod = $('#codigo').val();
		
		mensajeValida = "";
		$.ajax({
			url: urlComments,
			dataType: "json",
			data: {
				action: "validateSmsCode",
				code: cod,
				accessToken: cmtData.accessToken,
				authType: cmtData.authType
			},
			method: "GET",
			cache: false
		}).done(function (data) {
			
			if (data.error) {
				mensajeValida = '<div class="notification_emol_social notification_e_social_error"><div class="noticiation_int_e_social"><span class="mensaje"><span class="iconoMensaje"><i class="fa fa-times-circle" aria-hidden="true"></i></span> Ha ocurrido un error en la validación, por favor, inténtalo más tarde</span><span class="botones"><div class="dashboard_exit" onclick="CloseNotification()"><i class="fa fa-times" aria-hidden="true"></i></div></span></div></div>';
				$('#dashboard_notification').html(mensajeValida);
				$('#dashboard_notification .notification_emol_social').delay(5000).slideUp('slow');
			}
			else {
				mensajeValida = '<div class="notification_emol_social notification_e_social_ok"><div class="noticiation_int_e_social"><span class="mensaje"><span class="iconoMensaje"><i class="fa fa-check-circle" aria-hidden="true"></i></span> Tu teléfono ha sido validado</span><span class="botones"><div class="dashboard_exit" onclick="CloseNotification()"><i class="fa fa-times" aria-hidden="true"></i></div></span></div></div>';
				$('#dashboard_notification').html(mensajeValida);
				$('#dashboard_notification .notification_emol_social').delay(5000).slideUp('slow');
			}

		})
		.fail(function (err) {
			mensajeValida = '<div class="notification_emol_social notification_e_social_ok"><div class="noticiation_int_e_social"><span class="mensaje"><span class="iconoMensaje"><i class="fa fa-times-circle" aria-hidden="true"></i></span> Ha ocurrido un error en la validación, por favor, inténtalo más tarde</span><span class="botones"><div class="dashboard_exit" onclick="CloseNotification()"><i class="fa fa-times" aria-hidden="true"></i></div></span></div></div>';
			$('#dashboard_notification').html(mensajeValida);
			$('#dashboard_notification .notification_emol_social').delay(5000).slideUp('slow');
			
		});
	},

	validateRut: function () {
		$('.load_verificar').css({ 'display': 'block' });
		
		var apellidos = $('#apellidos').val();
		var nombres = $('#nombres').val();
		var numDocumento = $('#numDcto').val();
		var run = $('#run').val();
		var tipoDocumento = "";

		if (typeof ($('#tipoDcto :selected').val()) != "undefined") {
			if ($('#tipoDcto :selected').val() != "") {
				tipoDocumento = $('#tipoDcto :selected').val();
			}
		}


		if (apellidos == '' || nombres == '' || numDocumento == '' || run == '' || tipoDocumento == '') {

			validaInputs();
			mensajeValida = '<div class="notification_emol_social notification_e_social_error"><div class="noticiation_int_e_social"><span class="mensaje"><span class="iconoMensaje"><i class="fa fa-times-circle" aria-hidden="true"></i></span> Debes llenar todos los campos</span><span class="botones"><div class="dashboard_exit" onclick="CloseNotification()"><i class="fa fa-times" aria-hidden="true"></i></div></span></div></div>';
			$('#dashboard_notification').html(mensajeValida);
			$('.load_verificar').css({ 'display': 'none' });

		}
		else {
			var nomValido = apellidos + "|" + nombres;
			$.ajax({
				url: urlComments,
				dataType: "json",
				data: {
					action: "validateRut",
					rut: run,
					fullName: nomValido,
					docType: tipoDocumento,
					docNumber: numDocumento,
					accessToken: cmtData.accessToken,
					authType: cmtData.authType
				},
				method: "GET",
				cache: false
			}).done(function (data) {
												
				if (data.status) {
					switch (data.status) {
						case 'error with RUT':
							mensajeValida = '<div class="notification_emol_social notification_e_social_error"><div class="noticiation_int_e_social"><span class="mensaje"><span class="iconoMensaje"><i class="fa fa-times-circle" aria-hidden="true"></i></span> Ha ocurrido un error en la validación, por favor, verifica la información ingresada en los campos destacados</span><span class="botones"><div class="dashboard_exit" onclick="CloseNotification()"><i class="fa fa-times" aria-hidden="true"></i></div></span></div></div>';
							$('#dashboard_notification').html(mensajeValida);
							$('#dashboard_notification .notification_emol_social').delay(15000).slideUp('slow');
							$('#run').addClass('destacar_campo');
							$('#numDcto').addClass('destacar_campo');
					$('.load_verificar').css({ 'display': 'none' });
							break;
						case 'Invalid name-rut':
							mensajeValida = '<div class="notification_emol_social notification_e_social_error"><div class="noticiation_int_e_social"><span class="mensaje"><span class="iconoMensaje"><i class="fa fa-times-circle" aria-hidden="true"></i></span> Por favor, verifica la información ingresada en los campos destacados</span><span class="botones"><div class="dashboard_exit" onclick="CloseNotification()"><i class="fa fa-times" aria-hidden="true"></i></div></span></div></div>';
							$('#dashboard_notification').html(mensajeValida);
							$('#dashboard_notification .notification_emol_social').delay(15000).slideUp('slow');
							$('#apellidos').addClass('destacar_campo');
							$('#nombres').addClass('destacar_campo');
							$('#run').addClass('destacar_campo');
					$('.load_verificar').css({ 'display': 'none' });
							break;
						case 'RUT ok':
							mensajeValida = '<div class="notification_emol_social notification_e_social_ok"><div class="noticiation_int_e_social"><span class="mensaje"><span class="iconoMensaje"><i class="fa fa-check-circle" aria-hidden="true"></i></span> Tu cuenta ha sido verificada</span><span class="botones"><div class="dashboard_exit" onclick="CloseNotification()"><i class="fa fa-times" aria-hidden="true"></i></div></span></div></div>';
							$('#dashboard_notification').html(mensajeValida);
							$('#dashboard_notification .notification_emol_social').delay(15000).slideUp('slow');
							formatNombre(nomValido);
							$('#real_name').html('(' + nombreShow + ')');
							$('#ticValidado').css({ 'display': 'inline-block' });
					$('.load_verificar').css({ 'display': 'none' });
							openTab("Wall", "tabWall");
							break;

					}
				}
			})
			.fail(function (err) {
				mensajeValida = '<div class="notification_emol_social notification_e_social_error"><div class="noticiation_int_e_social"><span class="mensaje"><span class="iconoMensaje"><i class="fa fa-times-circle" aria-hidden="true"></i></span> Ha ocurrido un error en la verificación, por favor, inténtalo más tarde</span><span class="botones"><div class="dashboard_exit" onclick="CloseNotification()"><i class="fa fa-times" aria-hidden="true"></i></div></span></div></div>';
				$('#dashboard_notification').html(mensajeValida);
				$('#dashboard_notification .notification_emol_social').delay(15000).slideUp('slow');
				
			});
		}
	},

	biographyUser: function (idUsuario) {
		$.ajax({
			url: urlCacheComments,
			dataType: "json",
			data: {
				action: "updateBio",
				accessToken: cmtData.accessToken,
				bio: encodeURI($('#biography_text').val()),
				format: "json",
				authType: cmtData.authType
			},
			method: "GET",
			cache: false
		}).done(function (response) {
			if($('#biography_text').val() != ''){
				
				$('#dashboard_biography').show();
				$('#dashboard_biography_btn_add').hide();
				$('#dashboard_biography_area').toggle();
				$('#dashboard_biography').html($('#biography_text').val());
			}else{
				$('#dashboard_biography_btn_add').show();
				$('#dashboard_biography').html($('#biography_text').val());
				$('#dashboard_biography_area').toggle();
			}
			
		});
	},
	
	promoteUser: function (userId, id) {
		$.ajax({
			url: "http://comentarios.emol.com/Comments/Api",
			dataType: "json",
			data: {
				action: "promoteUser",
				id: id,
				selectedUserId: userId,
				accessToken: cmtData.accessToken,
				isAdmin: cmtData.isAdmin ? 'Y' : 'N',
				authType: cmtData.authType
			},
			method: "POST"
		}).done(function (response) {
			if (response.hasOwnProperty('status') && response.status === 'PROMOTED') {
				vex.dialog.alert("Usuario Destacado con éxito");
			}
		});
	},

	unpromoteUser: function (userId, id) {
		$.ajax({
			url: "http://comentarios.emol.com/Comments/Api",
			dataType: "json",
			data: {
				action: "unpromoteUser",
				id: id,
				selectedUserId: userId,
				accessToken: cmtData.accessToken,
				isAdmin: cmtData.isAdmin ? 'Y' : 'N',
				authType: cmtData.authType
			},
			method: "POST"
		}).done(function (response) {
			if (response.hasOwnProperty('status') && response.status === 'UNPROMOTED') {
				vex.dialog.alert("Usuario No Destacado con éxito");
			}
		});
	},
	
	highlight : function(id){
		$.ajax({
			url: urlComments,
			data: {
				action: "highlight",
				id: id,
				accessToken: cmtData.accessToken,
				isAdmin: cmtData.isAdmin ? 'Y' : 'N',
				authType: cmtData.authType
			},
			method: "POST"
		}).done(function () {
			setTimeout(CommentsApi.updateComments, 1000);
		});
	},
	
	unhighlight : function(id){
		$.ajax({
			url: urlComments,
			data: {
				action: "unhighlight",
				id: id,
				accessToken: cmtData.accessToken,
				isAdmin: cmtData.isAdmin ? 'Y' : 'N',
				authType: cmtData.authType
			},
			method: "POST"
		}).done(function () {
			setTimeout(CommentsApi.updateComments, 1000);
		});
	},
	
	followPortada: function (idCaja,idFollow) {
		$.ajax({
			url: urlComments,
			dataType: "json",
			data: {
				action: "follow",
				accessToken: cmtData.accessToken,
				id: getCookie("c_user_i"),
				selectedUserId: idFollow.toString(),
				format: "json",
				authType: cmtData.authType
			},
			method: "GET",
			cache: false
		}).done(function (response) {
			CommentsApi.setFollowing();
			
			//botones Ranking
			$('#ranFollowerSeguir_' + idFollow).html('').removeAttr('onclick');
			$('#ranFollowerSeguir_' + idFollow).addClass('no_seguir_usuario bt_unfollow').attr('onclick', 'CommentsApi.unFollow(' + idFollow + ')').append('Dejar de Seguir');
			$('#ranComenSeguir_' + idFollow).html('').removeAttr('onclick');
			$('#ranComenSeguir_' + idFollow).addClass('no_seguir_usuario bt_unfollow').attr('onclick', 'CommentsApi.unFollow(' + idFollow + ')').append('Dejar de Seguir');                			
			$('#ranLikeSeguir_' + idFollow).html('').removeAttr('onclick');
			$('#ranLikeSeguir_' + idFollow).addClass('no_seguir_usuario bt_unfollow').attr('onclick', 'CommentsApi.unFollow(' + idFollow + ')').append('Dejar de Seguir');
			
			//cajas destacadas portada
			$('#' + idCaja).html('').removeAttr('onclick');
			$('#' + idCaja).addClass('no_seguir_usuario').attr('onclick', 'CommentsApi.unFollowPortada("' + idCaja + '",' + idFollow + ')').append(
			$('<i>').attr('id', 'icono_follow').attr('class', 'fa fa-user-times').attr('aria-hidden', 'true')
			);
									
		});
	},
	
	unFollowPortada: function (idCaja,idFollow) {
		$.ajax({
			url: urlComments,
			dataType: "json",
			data: {
				action: "unfollow",
				accessToken: cmtData.accessToken,
				id: getCookie("c_user_i"),
				selectedUserId: idFollow.toString(),
				format: "json",
				authType: cmtData.authType
			},
			method: "GET",
			cache: false
		}).done(function (response) {
			CommentsApi.setFollowing();
			
			//botones Ranking
			$('#ranFollowerSeguir_' + idFollow).html('').removeAttr('onclick');
			$('#ranFollowerSeguir_' + idFollow).removeClass('no_seguir_usuario bt_unfollow');
			$('#ranFollowerSeguir_' + idFollow).addClass('seguir_usuario').attr('onclick', 'CommentsApi.follow(' + idFollow + ')').append(
			$('<i>').attr('id', 'icono_follow').attr('class', 'fa fa-user-plus').attr('aria-hidden', 'true').append(),
			' Seguir'
			);				
			$('#ranComenSeguir_' + idFollow).html('').removeAttr('onclick');
			$('#ranComenSeguir_' + idFollow).removeClass('no_seguir_usuario bt_unfollow');
			$('#ranComenSeguir_' + idFollow).addClass('seguir_usuario').attr('onclick', 'CommentsApi.follow(' + idFollow + ')').append(
			$('<i>').attr('id', 'icono_follow').attr('class', 'fa fa-user-plus').attr('aria-hidden', 'true').append(),
			' Seguir'
			);				
			$('#ranLikeSeguir_' + idFollow).html('').removeAttr('onclick');
			$('#ranLikeSeguir_' + idFollow).removeClass('no_seguir_usuario bt_unfollow');
			$('#ranLikeSeguir_' + idFollow).addClass('seguir_usuario').attr('onclick', 'CommentsApi.follow(' + idFollow + ')').append(
			$('<i>').attr('id', 'icono_follow').attr('class', 'fa fa-user-plus').attr('aria-hidden', 'true').append(),
			' Seguir'
			);	
			
			//cajas destacadas portada						
			$('#' + idCaja).html('').removeAttr('onclick');
			$('#' + idCaja).removeClass('no_seguir_usuario');
			$('#' + idCaja).addClass('seguir_usuario').attr('onclick', 'CommentsApi.followPortada("' + idCaja + '",' + idFollow + ')').append(
			$('<i>').attr('id', 'icono_follow').attr('class', 'fa fa-user-plus').attr('aria-hidden', 'true')
			);
									
		});
	},

	commentLikedUsers: function (id) {
		//Id Comnentario  
		$.ajax({
			url: urlComments,
			dataType: "json",
			data: {
				action: "getCommentLikedUsers",
				id: id,
				format: "json",
			},
			method: "GET",
			cache: true
		}).done(function (response) {
			var ul = $('ul').addClass('list_Like_user');
			(response).forEach(function (entry) {
				//console.log(entry.nickname);
				ul.add($('li').html(entry.nickname));
			})
			//console.log(ul);				
		});
	},
	
	getChats : function (id) {
                               
		//$('#chat_list_user_left').empty();
		$.ajax({
			url: urlComments,
			dataType: "json",
			data: {
				action: "getChats",
				accessToken: cmtData.accessToken,
				selectedUserId: id,
				format: "json",
				authType: cmtData.authType
			},
			method: "GET",
			cache: false
		}).done(function (response) {
			
			var arrRev = response.reverse();
			var idsUsers = '';
			var htmlListChats = $('<div>').html('').attr('id', 'chat_list_users').attr('class', 'chat_list_user');
			(arrRev).forEach(function (entry) {                  
				
				var idUser, urlAvatarUser, nameUser,statusUser, statusChat, msjPending = '';
				var classActive = "";
				if(entry.user1.id != id)
				{					
					idUser = entry.user1.id;										
					urlAvatarUser = entry.user1.urlAvatar.replace(/http:/g,'https:');
					nameUser = entry.user1.nickname;	
					statusUser = entry.user1.presence;
					statusChat = entry.blocked2;
					if(entry.pending2 != 0){
						msjPending = "<span class='chat_last_mjs'>" + entry.pending2 + "</span>";
					}					
					
				}else{					
					idUser = entry.user2.id;
					urlAvatarUser = entry.user2.urlAvatar.replace(/http:/g,'https:');
					nameUser = entry.user2.nickname;
					statusUser = entry.user2.presence;					
					statusChat = entry.blocked1;					
					if(entry.pending1 != 0){
						msjPending = "<span class='chat_last_mjs'>" + entry.pending1 + "</span>";
					}					
				}								
				
				idsUsers = idUser + ',' + entry.id + ";" + idsUsers;
				
				if(entry.id == cmtData.activeChat){
					classActive = "chat_list_user_item activo";
					msjPending = "";
				}
				else{
					classActive = "chat_list_user_item";
				}
				
				htmlListChats.append(
				$('<article>').attr('id', 'art_'+ idUser).attr('class', classActive).attr('onclick', 'CommentsApi.getChatMessages(' + entry.id + ','+ idUser+ ',"' + nameUser + '","' + urlAvatarUser + '","' + statusUser + '",' + statusChat + ');').append(
					 $('<div>').attr('class','chat_list_user_item_img').append(
						 $('<img>').attr('src', urlAvatarUser)
						 ),
						 $('<div>').attr('class','chat_nom_user_txt').append(nameUser),
						 $('<div>').attr('id','chat_last_mjs').append(msjPending),                                             
					 )                                                                                                                           
				)

			});

			cmtData.userChats = idsUsers;
			
			if (response.length === 0) {
			htmlListChats.append(
			$('<div>').attr('class', 'dashboard_comment_chats').append('No hay conversaciones')
			)
			}

			$('#chat_list_users').replaceWith(htmlListChats);

		});
	},
                
             
	getChatMessages : function (idChat , idUser, nameUser, urlAvatarUser,statusUser, statusChat) {	
		
		chatActivo('art_'+ idUser);
		CloseToolsMessage('icons_gifs');
		closePrev();
		CloseGif();			
		
		if(mobilecheck()){			
			viewUserMob();			
		}
		$('#div_cont_txt_emoji').empty();
		$('#chat_messages_sc').empty();
		$('#chat_emol_inicio').hide();
		$('#chat_status_right').show();
		$('#chat_messages_sc').show();
		$('#art_' + idUser + ' #chat_last_mjs' ).empty();		
		
		$('#nombreUsuarioReceptor').text(nameUser);	
		$('#nombreUsuarioReceptor').attr("href","/" + idUser + "/" + nameUser + ".html" );	
		$('#imgReceptor').attr('src', urlAvatarUser);			
		$('#div_cont_txt_emoji').attr("onclick",'CommentsApi.markAllMessagesAsRead(' + idChat + ',' + getCookie("c_user_i") + ');');
								
		switch(statusUser){
			case "AWAY":
				$('#statusReceptor').attr('class', 'status_conex status_conex_right desconectado');	
				$('#txtStatusReceptor').text('Desconectado');
				break;
			case "AVAILABLE":
				$('#statusReceptor').attr('class', 'status_conex status_conex_right conectado');
				$('#txtStatusReceptor').text('Conectado') ;
				break;
			case "NOT_AVAILABLE":
				$('#statusReceptor').attr('class', 'status_conex status_conex_right nodisponible');
				$('#txtStatusReceptor').text('No disponible') ;	
				break;
		}		
		
		if(idChat != 0){
			$('#a_block_chat').attr('onclick','CommentsApi.blockChat(' + idChat + ');');
			$('#a_unblock_chat').attr('onclick','CommentsApi.unblockChat(' + idChat + ');');
			$('#a_denounce_user').attr('onclick','denunciarUsuario(' + idUser + ');');						
		
			if(statusChat == false){
				$('#sp_block_chat').show();
				$('#sp_unblock_chat').hide();
				$('#sp_denounce_user').hide();
			}else{
				$('#sp_block_chat').hide();
				$('#sp_unblock_chat').show();
				$('#sp_denounce_user').show();			
			}			
			
			$.ajax({
				url: urlCacheComments,
				dataType: "json",
				data: {
				action: "getChatMessages",
				accessToken: cmtData.accessToken,
				chatId: idChat,
				limit: 10,
				format: "json",
				authType: cmtData.authType
				},
				method: "GET",
				cache: false
			}).done(function (response) {
				//var htmlListMsgs = $('<div>').html('').attr('id', 'chat_messages_sc').attr('class', 'chat_messages');
				var htmlListMsgs = $('<div>').html('').attr('class', 'cont_galeria_emol');
				
				if(response.length > 0){
				
					var timestamp = response[0].time;
					cmtData.activeChat = idChat;
					cmtData.timestamp = timestamp;
					$('#bt_enviar_txt').html("<a href='javascript:void(0);' onclick='CommentsApi.sendMessage("+ idChat + "," + idUser + "," + timestamp +")'>Enviar</a>");
					$('#bt_enviar_img').html("<a href='javascript:void(0);' onclick='CommentsApi.sendMessageImagen("+ idChat + "," + idUser + "," + timestamp +")'>Enviar</a>");
					$('#a_bt_gif').attr("onclick","BusquedaGif('',"+ idChat + "," + idUser + "," + timestamp +")");
																			
					var arrRev = response.reverse();												
					(arrRev).forEach(function (entry) {                  

						var msgTxt = entry.message;				
						var msgClass = '';
						var	spClass = '';	
						
						if(entry.read == false){
							statusMsg = "status_messages";
						}else{
							statusMsg = "status_messages viewed";
						}										
						if(entry.fromId == getCookie("c_user_i")){
							msgClass = "chat_messages_you";	
							spClass	= "sp_messages_you";
							
							htmlListMsgs.append(
							$('<article>').attr('class', msgClass).append( 
								$('<div>').attr('class','msg').append(
									$('<div>').attr('class','msg_ex').append(
										entry.message,
										$('<span>').attr('class', spClass + " " + statusMsg).append(
										$('<i>').attr('class','fa fa-check').attr('aria-hidden','true'),
										$('<i>').attr('class','fa fa-check double_check').attr('aria-hidden','true')
										)
									)
								)						                                                                                                                       
							)										
							)
							
						}else{
							msgClass = "chat_messages_another_user";
							spClass	= "sp_messages_another";
							
							htmlListMsgs.append(
							$('<article>').attr('class', msgClass).append( 
								$('<div>').attr('class','msg').append(
									$('<div>').attr('class','msg_ex').append(
										entry.message,
										$('<span>').attr('class', spClass + " " + statusMsg).append(
										//$('<i>').attr('class','fa fa-check').attr('aria-hidden','true'),
										//$('<i>').attr('class','fa fa-check double_check').attr('aria-hidden','true')
										)
									)
								)						                                                                                                                       
							)										
						)
						}																												
						
					});										
					
					htmlListMsgs.append(
						$('<div>').attr('id', 'chat_new_messages')
					)
					
					$('#chat_messages_sc').append(htmlListMsgs);
					if(!mobilecheck()){
						new PerfectScrollbar('#chat_messages_sc');						
						setTimeout(function(){
							scrollToBottom('chat_messages_sc');
						},500);
					}
					CommentsApi.markAllMessagesAsRead(idChat, getCookie("c_user_i"));
					
				}else{
					htmlListMsgs.append(
						$('<div>').attr('id', 'chat_messages_sc').attr('class', 'chat_messages').append('Inicia la conversación')
					)
					
					$('#chat_messages_sc').append(htmlListMsgs);
				}
				
				GaleriaChatEmol();
			});
		}
		else
		{
			$('#sp_block_chat').hide();
			$('#sp_unblock_chat').hide();
			$('#sp_denounce_user').hide();						
			
			var timestamp = $.now();
			
			$('#bt_enviar_txt').html("<a href=\"javascript:void(0);\" onclick=\"CommentsApi.sendFirstMessage(0," + idUser + "," + timestamp + ",'" + nameUser + "','" + urlAvatarUser + "','" + statusUser + "');\">Enviar</a>");
			$('#bt_enviar_img').html("<a href='javascript:void(0);' onclick='CommentsApi.sendMessageImagen("+ idChat + "," + idUser + "," + timestamp +")'>Enviar</a>");
			$('#a_bt_gif').attr("onclick","BusquedaGif('',0," + idUser + "," + timestamp +")");
			
		}									
		
		$(function (){
			
			$('#fileuploadFotoChat').fileupload({
				url: '//ugc.ecn.cl/upload/',
				dataType: 'json',
				done: function (e, data) {
					
					$.each(data.result.files, function (index, file) {											
						openPrev(file.url);							
					});
										
				},
				fail: function (error) {
					
				}
			}).prop('disabled', !$.support.fileInput)
			.parent().addClass($.support.fileInput ? undefined : 'disabled');
						
		});
		
	},
	
	newChat : function (idUser, nameUser, urlAvatarUser,statusUser) {								  
		$('#chat_messages_sc').empty();
		$('#chat_emol_inicio').hide();
		$('#chat_status_right').show();
		$('#chat_messages_sc').show();				
		
		$('#sp_block_chat').hide();
		$('#sp_unblock_chat').hide();
		$('#sp_denounce_user').hide();			
		
		$('#nombreUsuarioReceptor').text(nameUser);	
		$('#nombreUsuarioReceptor').attr("href","/" + idUser + "/" + nameUser + ".html" );	
		$('#imgReceptor').attr('src', urlAvatarUser);					
			
		switch(statusUser){
			case "AWAY":
				$('#statusReceptor').attr('class', 'status_conex status_conex_right desconectado');	
				$('#txtStatusReceptor').text('Desconectado');
				break;
			case "AVAILABLE":
				$('#statusReceptor').attr('class', 'status_conex status_conex_right conectado');
				$('#txtStatusReceptor').text('Conectado') ;
				break;
			case "NOT_AVAILABLE":
				$('#statusReceptor').attr('class', 'status_conex status_conex_right nodisponible');
				$('#txtStatusReceptor').text('No disponible') ;	
				break;
		}
				
		var timestamp = $.now();
		var htmlListMsgs = $('<div>').html('').attr('id', 'chat_messages_sc').attr('class', 'chat_messages');
		
		htmlListMsgs.append(
			$('<div>').attr('id', 'new_chat_messages').attr('class', 'chat_messages').append('Inicia la conversación')
		)
		//CHAT ID 0 aún no existe ID
		$('#bt_enviar_txt').html("<a href=\"javascript:void(0);\" onclick=\"CommentsApi.sendFirstMessage(0," + idUser + "," + timestamp + ",'" + nameUser + "','" + urlAvatarUser + "','" + statusUser + "');\">Enviar</a>");
		$('#bt_enviar_img').html("<a href='javascript:void(0);' onclick='CommentsApi.sendMessageImagen("+ idChat + "," + idUser + "," + timestamp +")'>Enviar</a>");
		$('#a_bt_gif').attr("onclick","BusquedaGif('',0," + idUser + "," + timestamp +")");				
		
		$('#chat_messages_sc').replaceWith(htmlListMsgs);
		
		new PerfectScrollbar('#chat_messages_sc');
		scrollToBottom('chat_messages_sc');		
	},
	
	getNewChatMessages : function (idChat , idUser, lastTime) {								  
		
		$.ajax({
			url: urlCacheComments,
			dataType: "json",
			data: {
			action: "getChatMessages",
			accessToken: cmtData.accessToken,
			chatId: idChat,
			limit: 20,
			since: lastTime, 
			format: "json",
			authType: cmtData.authType
			},
			method: "GET",
			cache: false
		}).done(function (response) {
			if(response.length > 0){
				$('#chat_new_messages').empty();
				$('#new_chat_messages').hide();
				
				var timestamp = response[0].time;
				cmtData.activeChat = idChat;
				cmtData.timestamp = timestamp;
				var htmlNewMsg = $('<article>').html('').attr('id', 'chat_messages');	
				var arrRev = response.reverse();
			
				(arrRev).forEach(function (entry) {                  

					var msgTxt = entry.message;				
					var msgClass = '';
					var	spClass = '';				
							
					if(entry.read == false)
					{
						statusMsg = "status_messages";
					}else
					{
						statusMsg = "status_messages viewed";
					}
							
					if(entry.fromId == getCookie("c_user_i")){
						msgClass = "chat_messages_you";	
						spClass	= "sp_messages_you";
						
						htmlNewMsg.attr('class', msgClass).append(
						//$('<article>').attr('class', msgClass).append( 
							$('<div>').attr('class','msg').append(
								$('<div>').attr('class','msg_ex').append(
									$('<span>').append(entry.message),
									$('<span>').attr('class', spClass + " " + statusMsg).append(
									$('<i>').attr('class','fa fa-check').attr('aria-hidden','true'),
									$('<i>').attr('class','fa fa-check double_check').attr('aria-hidden','true')
									)
								)	
							)						                                                                                                                       
						//)										
						)
					}else{
						msgClass = "chat_messages_another_user";
						spClass	= "sp_messages_another";
						
						htmlNewMsg.attr('class', msgClass).append(
						//$('<article>').attr('class', msgClass).append( 
							$('<div>').attr('class','msg').append(
								$('<div>').attr('class','msg_ex').append(
									$('<span>').append(entry.message),
									$('<span>').attr('class', spClass + " " + statusMsg).append(
									//$('<i>').attr('class','fa fa-check').attr('aria-hidden','true'),
									//$('<i>').attr('class','fa fa-check double_check').attr('aria-hidden','true')
									)
								)
							)						                                                                                                                       
						//)										
					)
					}																													

				});							
								
				$('#chat_new_messages').replaceWith(htmlNewMsg);
				$('#chat_messages_sc').append(
					$('<div>').attr('id', 'chat_new_messages')
				)			
			
				$('#bt_enviar_txt').html("<a href='javascript:void(0);' onclick='CommentsApi.sendMessage("+ idChat + "," + idUser + "," + timestamp +")'>Enviar</a>");
				$('#bt_enviar_img').html("<a href='javascript:void(0);' onclick='CommentsApi.sendMessageImagen("+ idChat + "," + idUser + "," + timestamp +")'>Enviar</a>");
				$('#a_bt_gif').attr("onclick","BusquedaGif(''"+ idChat + "," + idUser + "," + timestamp +")");
				
				if(!mobilecheck()){				
					scrollToBottomAni('chat_messages_sc');
				}
				GaleriaChatEmol();
			}					
		});
	},
	
	sendMessage : function (idChat,idUser,lastTime) { 			
		urlify();
		
		var msg =  $('#div_cont_txt_emoji').html();
		$.ajax({
			url: urlCacheComments,
			dataType: "json",
			data: {
			action: "sendMessage",
			accessToken: cmtData.accessToken,
			selectedUserId: idUser,
			message: msg, 
			format: "json",
			authType: cmtData.authType
			},
			method: "GET",
			cache: false
		}).done(function (response) {	
			//OBTENER ID DEL CHAT y comparar con el que enviaron para ver si es distinto a 0
			var id_chat = response.chatId;
			
			$('#div_cont_txt_emoji').empty();	
			if(idChat == 0)
			{
				idChat = id_chat;			
			}
			CommentsApi.getNewChatMessages(id_chat,idUser,lastTime);
			
		});
	},
	
	sendMessageImagen : function (idChat,idUser,lastTime) {		
		
		closePrev();
		var newimage = new Image();		
		newimage.src = $('#imgGifP').attr('src');	
		var time_gif = $.now();
		//var textoImagen = $('#div_cont_txt_img').html();		
		var htmlImgGif = '<aside class="grid-item img_messages" itemprop="associatedMedia">';
		htmlImgGif = htmlImgGif + '<a itemprop="contentUrl" data-index="'+ time_gif +'" href="' + newimage.src + '">';
		htmlImgGif = htmlImgGif + '<div class="chat_cont_img">';
		htmlImgGif = htmlImgGif + '<img src="' + newimage.src + '" data-width="' + newimage.naturalWidth + '" data-height="' + newimage.naturalHeight + '" alt="IMG" itemprop="thumbnail" srcset="' + newimage.src + '">'; 
		htmlImgGif = htmlImgGif + '</div>';
		htmlImgGif = htmlImgGif + '</a>';
		htmlImgGif = htmlImgGif + '</aside>';
		
		urlifyImg();	
		
		var msg =  htmlImgGif + $('#div_cont_txt_img').html();
		
		$.ajax({
			url: urlCacheComments,
			dataType: "json",
			data: {
			action: "sendMessage",
			accessToken: cmtData.accessToken,
			selectedUserId: idUser,
			message: msg, 
			format: "json",
			authType: cmtData.authType
			},
			method: "GET",
			cache: false
		}).done(function (response) {	
			//OBTENER ID DEL CHAT y comparar con el que enviaron para ver si es distinto a 0
			var id_chat = response.chatId;
			
			$('#div_cont_txt_img').empty();	
			if(idChat == 0)
			{
				idChat = id_chat;			
			}
			CommentsApi.getNewChatMessages(id_chat,idUser,lastTime);
			$("#imgGifP").attr('src', '');
		});
	},
	
	sendFirstMessage : function (idChat,idUser,lastTime, nameUser, urlAvatarUser,statusUser) { 			
		var msg =  $('#div_cont_txt_emoji').html();
		
		$.ajax({
			url: urlCacheComments,
			dataType: "json",
			data: {
			action: "sendMessage",
			accessToken: cmtData.accessToken,
			selectedUserId: idUser,
			message: msg, 
			format: "json",
			authType: cmtData.authType
			},
			method: "GET",
			cache: false
		}).done(function (response) {	
			//OBTENER ID DEL CHAT y comparar con el que enviaron para ver si es distinto a 0
			var id_chat = response.chatId;
			//console.log(id_chat);
			$('#div_cont_txt_emoji').empty();	
			if(idChat == 0)
			{	
				idChat = id_chat;				
				$('#art_' + idUser).attr('class', 'chat_list_user_item activo').attr('onclick', 'CommentsApi.getChatMessages('+ id_chat + ',' + idUser+ ',"' + nameUser + '","' + urlAvatarUser + '","' + statusUser + '");')
			}
			//CommentsApi.getNewChatMessages(id_chat,idUser,lastTime);
			CommentsApi.getChatMessages(id_chat,idUser,nameUser,urlAvatarUser,statusUser,false);
			
		});
	},
	
	markAllMessagesAsRead : function (idChat, idUser) {                              
		
		$.ajax({
			url: urlCacheComments,
			dataType: "json",
			data: {
			action: "markAllMessagesAsRead",
			accessToken: cmtData.accessToken,			
			chatId: idChat,
			format: "json",
			authType: cmtData.authType
			},
			method: "GET",
			cache: false
		}).done(function (response) {				
				var i;		  
				var userId = getCookie("c_user_i");	
				if(userId == idUser)
				{
					var y = document.getElementsByClassName("sp_messages_another status_messages");				
					for (i = 0; i < y.length; i++) {
						y[i].classList.add("viewed");					
					}
				}
				else{
					var y = document.getElementsByClassName("sp_messages_you status_messages");				
					for (i = 0; i < y.length; i++) {
						y[i].classList.add("viewed");					
					}
				}
		        
				
		});
	},
	
	blockChat : function (idchat) {                              
		
		$.ajax({
			url: urlCacheComments,
			dataType: "json",
			data: {
			action: "blockChat",
			accessToken: cmtData.accessToken,			
			chatId: idchat,
			format: "json",
			authType: cmtData.authType
			},
			method: "GET",
			cache: false
		}).done(function (response) {
			//bloquear ventana de chat desabilitar campo texto
			$('#sp_block_chat').hide();
			$('#sp_unblock_chat').show();
			$('#sp_denounce_user').show();	
		});
	},
	
	unblockChat : function (idchat) {                              
		
		$.ajax({
			url: urlCacheComments,
			dataType: "json",
			data: {
			action: "unblockChat",
			accessToken: cmtData.accessToken,			
			chatId: idchat,
			format: "json",
			authType: cmtData.authType
			},
			method: "GET",
			cache: false
		}).done(function (response) {
			//bloquear ventana de chat desabilitar campo texto
			$('#sp_block_chat').show();
			$('#sp_unblock_chat').hide();
			$('#sp_denounce_user').hide();	
		});
	},
	
	chatAvailable : function () {                              
		
		$.ajax({
			url: urlCacheComments,
			dataType: "json",
			data: {
			action: "chatAvailable",
			accessToken: cmtData.accessToken,
			//selectedUserId: id,			
			format: "json",
			authType: cmtData.authType
			},
			method: "GET",
			cache: false
		}).done(function (response) {
			//cambiar icono usuario conectado			
			$('#sp_status_user').text("Conectado");
			$('#sp_status_user').attr('class', "txt_conectado");
			$('#statusUser').attr('class', "status_conex conectado");													
			
		});
	},
       
	chatNotAvailable : function () {                              
		
		$.ajax({
			url: urlCacheComments,
			dataType: "json",
			data: {
			action: "chatNotAvailable",
			accessToken: cmtData.accessToken,
			//selectedUserId: id,
			//chatId: idchat,
			format: "json",
			authType: cmtData.authType
			},
			method: "GET",
			cache: false
		}).done(function (response) {
			//cambiar icono usuario no conectado
			$('#sp_status_user').text("No Disponible");
			$('#sp_status_user').attr('class', "txt_nodisponible");
			$('#statusUser').attr('class', "status_conex nodisponible");
		});
	},
	
	denounceUser : function (id, denuncia) {                              
		
		$.ajax({
			url: urlCacheComments,
			dataType: "json",
			data: {
			action: "denounceUser",
			accessToken: cmtData.accessToken,
			selectedUserId: id,	
			reason: denuncia,
			format: "json",
			authType: cmtData.authType
			},
			method: "GET",
			cache: false
		}).done(function (response) {
			//denuncia despligue popup?

		});
	}	

};


function urlify() {	
	
	$('#div_cont_txt_emoji').each(function() {
		var replacedText, replacePattern1;
		var inputText = $(this).html();
		replacePattern1 = /(?!.*static.emol.cl)(\b((https?:\/\/)|(www\.))[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
		replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');
		$(this).html(replacedText);		
		
	});
};	

function urlifyImg() {	
	$('#div_cont_txt_img').each(function() {
		var replacedText, replacePattern1;
		var inputText = $(this).html();
		replacePattern1 = /(?!.*static.emol.cl)(\b((https?:\/\/)|(www\.))[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
		replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');		
		$(this).html(replacedText);	
	});
};

function denunciarUsuario(userId) {				
	var numOne = Math.floor((Math.random() * 10) + 1);
	var numTwo = Math.floor((Math.random() * 10) + 1);
	var operatorRnd = Math.floor((Math.random() * 3));
	var operators = ["+", "-", "x"];
	var denuncia = "";
	var dataUserH = JSON.parse(getCookie('c_user_p'));
	vex.dialog.open({				
		message: "Hola <b>" + dataUserH.nick + "</b> indicanos por qué deseas denunciar a este usuario: ",
		input: "<div class=\"cont_inp_motivo\"><input id=\"inpSpam\" type=\"radio\" name=\"reason\" value=\"spam\" checked/><label for=\"inpSpam\">Spam</label><input id=\"inpOffensive\" type=\"radio\" name=\"reason\" value=\"offensive\"/><label for=\"inpOffensive\">Comentario ofensivo</label></div><span class=\"texto_operacion\">Además resuelva esta operación matemática para confirmar que es humano:</span><div class=\"oper_mat\"><div>" + numOne + "</div><div class=\"signo_mate\">" + operators[operatorRnd] + "</div><div>" + numTwo + "</div></div><div class=\"input_resultado_oper\"><input name=\"result\" type=\"text\" value=\"\"/></div>",
		callback: function (value) {
			if (value.hasOwnProperty('result')) {
				if (mathOperation(operatorRnd, numOne, numTwo) == value.result) {
					vex.dialog.alert('Hola, hemos recibido tu denuncia, no recibirás más mensajes de este usuario. ¡Gracias!');
					if (inpSpam.checked == true)
					{
						denuncia = "spam";
					}
					else
					{
						denuncia = "mensaje ofensivo";
					}
					CommentsApi.denounceUser(userId, denuncia);
				} else {
					vex.dialog.open({
						message: "<b>" + dataUserH.nick + "</b> has cometido un error al solucionar la operación matemática, intentalo nuevamente:",
						input: "<div class=\"cont_inp_motivo\"><input id=\"inpSpam\" type=\"radio\" name=\"reason\" value=\"spam\" checked/><label for=\"inpSpam\">Spam</label><input id=\"inpOffensive\" type=\"radio\" name=\"reason\" value=\"offensive\"/><label for=\"inpOffensive\">Comentario ofensivo</label></div><span class=\"texto_operacion\">Además resuelva esta operación matemática para confirmar que es humano:</span><div class=\"oper_mat\"><div>" + numOne + "</div><div class=\"signo_mate\">" + operators[operatorRnd] + "</div><div>" + numTwo + "</div></div><div class=\"input_resultado_oper\"><input name=\"result\" type=\"text\" value=\"\"/></div>",
						callback: function (value) {
							if (value.hasOwnProperty('result')) {
								if (mathOperation(operatorRnd, numOne, numTwo) == value.result) {
									vex.dialog.alert('Hola, hemos recibido tu denuncia, no recibirás más mensajes de este usuario. ¡Gracias!');
									if (inpSpam.checked == true)
									{
										denuncia = "spam";
									}
									else
									{
										denuncia = "mensaje ofensivo";
									}
									denuncia = inpSpam.val();
									CommentsApi.denounceUser(userId, denuncia);
								} else {
									vex.dialog.alert('Respuesta errónea, tu denuncia no ha sido procesada.');
								}
							}
						},
						buttons: [
							 $.extend({}, vex.dialog.buttons.YES, {
								 text: 'OK'
							 }),
							 $.extend({}, vex.dialog.buttons.NO, {
								 text: 'SALIR'
							 })
						]
					});
				}
			}
		},
		buttons: [
			 $.extend({}, vex.dialog.buttons.YES, {
				 text: 'OK'
			 }),
			 $.extend({}, vex.dialog.buttons.NO, {
				 text: 'SALIR'
			 })
		]
	});
};					

function QueryElastic(IdUsuario, num){
	var query = urlComments + '?action=getCommentsFromUser&format=json&order=TIME_DESC&limit='+ num +'&selectedUserId=' + IdUsuario + '&age=400&approvedOnly=true&site=emol';
	return query;
};

function loadData(IdUsuario,Id){	
	if(!mobilecheck()){	
		listNewsAjax(QueryElastic(IdUsuario,configPerfil.numComment), function(data){
			if(!($.isEmptyObject(data))){
				Perfil(data,Id,IdUsuario);			
			}
		});
	}
};

function listNewsAjax(query, callback) {
	$.getJSON( query, function( data ) {
		if(!($.isEmptyObject(data))){
			callback(data);
			return true;
		}
	});
};

function Perfil(data, Id, IdUsuario){	
	var Followers = data.userTotalFollowers;
	var Following = data.userTotalFollowing;
	var commentsCounter = data.commentsCounter;	
	var ubicacionP = "";
	var Valido = data.userValidated;

	var nombreShow = "";
	// Nombre Completo usuario validado
	try
	{		
		if(typeof(data.userFullName != "undefined") && data.userFullName !='')
		{			
			var nombreFull = data.userFullName.split('|');							
			if(nombreFull.length > 1)
			{
				var apellidosV = nombreFull[0];
				var nombresV = nombreFull[1].split(' ');
				nombreShow = nombresV[0] + " " + apellidosV;
			}
			else
			{
				nombreShow = data.userFullName;
			}				
		}
	}
	catch (err) {
		nombreShow = '';
	}
		
	
	$('#perfil_nombre_'+Id).html(data.userNickname + ((data.userPromoted == true)? ' <i class="fa fa-star" aria-hidden="true"></i>' : ''));	
	$('#nombreRealFlotante_'+Id).html('('+nombreShow+')');
	
	if(Valido == true)
	{		
		$('#ticValidadoFlotante_'+Id).css({'display':'inline-block'});		
	}

	try {						
		if (typeof (data.location) != "undefined") {
			var icon = "<i class='fa fa-map-marker' aria-hidden='true'></i>";
			ubicacionP = icon + data.location;
		}
		
		if (typeof (data.countryId) != "undefined") {
			if(data.countryId == "CHL"){
				ubicacionP = ubicacionP + ", " + data.country;
			}							
			countryId = data.countryId;
		}	
		
		$('#perfil_ubicacion_'+Id).html(ubicacionP);		
		
	} catch (err) {
		ubicacionP = '';		
		$('#perfil_ubicacion_'+Id).hide();
	}

	try{
		if(data.userAvatar != undefined &&  data.userAvatar != 'undefined' && data.userAvatar != ''){
			$('#perfil_img_'+Id).html($('<span>').attr('class', 'perfil_img_back').append($('<img>').attr('src',data.userAvatar).attr('width','auto').attr('height','auto')));
		}else{
			$('#perfil_img_'+Id).html($('<img>').attr('src','//static.emol.cl/emol50/img/sin_image_comentarios.png').attr('width','auto').attr('height','auto'));
		}
	}catch(error){
		$('#perfil_img_'+Id).html($('<img>').attr('src','//static.emol.cl/emol50/img/sin_image_comentarios.png').attr('width','auto').attr('height','auto'));
	}
	
	data = data.comments;
	
	if(data.length > 0)
	{
		$('.actividades_recientes').show();

	
		var userId = getCookie("c_user_i");	
		$('.perfil_seguir_'+data[0].creatorId).html('');
	
		if(getCookie("c_user_f") != undefined && getCookie("c_user_f") !='')
		{
			var arrayF = JSON.parse(unescape(getCookie("c_user_f")));
			
			if(data[0].creatorId != userId)
			{
				//if(!arrayF.includes(data[0].creatorId)){
				if(jQuery.inArray(data[0].creatorId,arrayF) == -1){
					$('.perfil_seguir_'+data[0].creatorId).addClass('seguir_usuario').attr('onclick','CommentsApi.follow('+ data[0].creatorId +')').append(
					$('<i>').attr('id', 'icono_follow').attr('class', 'fa fa-user-plus').attr('aria-hidden', 'true')
					);
				}else{
					$('.perfil_seguir_'+data[0].creatorId).addClass('seguir_usuario').addClass('no_seguir_usuario').attr('onclick','CommentsApi.unFollow('+ data[0].creatorId +')').append(
					$('<i>').attr('id', 'icono_follow').attr('class', 'fa fa-user-times').attr('aria-hidden', 'true')
					);
				}
			}
			else
			{
				$('.perfil_seguir_'+ userId).html('');
			}
		}
		
	}
	else
	{
		$('.actividades_recientes').hide();
	}
	//if(data.length == 0){ $('.actividades_recientes').hide(); }
	$('#perfil_comentarios_'+Id).html('');
	
	for( i = 0 ; i < data.length; i++ ) {
		var date = new Date(data[i].time);
		var dateNow = new Date();
		var fecha;
		if(parseInt(Id) != parseInt(data[i].id)){
			
			if(((date.getMonth() + 1) == (dateNow.getMonth() + 1))&&(date.getDate()==dateNow.getDate())&&(date.getFullYear()==dateNow.getFullYear())){
				fecha = ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) ;
			}else{
				fecha = ('0' + date.getDate()).slice(-2)+ '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' +date.getFullYear().toString().substr(-2);
			}
			
			$('#perfil_comentarios_'+Id).append(
			$('<div>').attr('class','perfil_comentarios').append(
			$('<div>').attr('class','perfil_comentario_titulo').append( 
			$('<a>').attr('href',data[i].page).html( data[i].pageTitle )
			),
			$('<div>').attr('class','perfil_comentario_texto').append($('<div>').attr('class','perfil_comentario_fecha').append(fecha),data[i].text.revMotions().substr(0, 200))
			)
			);
		}
		
		if(i > configPerfil.numComment) 
		i =  data.length;
	}	
};
		