require(['dojo/dom', 'dojo/_base/unload', 'dojox/cometd', 'dojo/domReady!'],
function(dom, unloader, cometd){	
	var numMaq = Math.floor((Math.random() * 3) + 1);
	function _changeMachine(){
		switch(numMaq){
			case 1:
				numMaq = numMaq + 1;
				break;
			case 2:
				numMaq = numMaq + 1;
				break;
			case 3:
				numMaq = numMaq + 1;
				break;
			case 4:
				numMaq = 1;
				break;
			
		}
		cometd.configure({ url: 'http://cometd'+numMaq+'.ecn.cl' + config.contextPath + '/cometd', logLevel: 'info' });
	}
	
	function _connectionEstablished() {
		//console.log('CometD Connection Established');
	}

	function _connectionBroken() {
		//console.log('CometD Connection Broken');
	}

	function _connectionClosed() {
		//console.log('CometD Connection Closed');
	}
	
	var _connected = false;

	function _metaConnect(message) {
		if (cometd.isDisconnected()) {
			_connected = false;
			_connectionClosed();
			return;
		}

		var wasConnected = _connected;
		_connected = message.successful === true;
		if (!wasConnected && _connected) {
			_connectionEstablished();
		} else if (wasConnected && !_connected) {
			_connectionBroken();
		}
	}

	function _metaHandshake(message) {
		if (message.successful)	{
			if(typeof idRelato !== 'undefined' && idRelato.length > 0){
				for(var i = 0; idRelato.length > i; i++){ 
					var id_relato = idRelato[i];
					//GOLES
					cometd.subscribe('/relatos/'+id_relato+'/goles', {id_relato: id_relato}, function(obj,id_relato){
						var eqa = JSON.parse(obj.data.message).goles[0].ea;
						var eqb = JSON.parse(obj.data.message).goles[0].eb;
						golesOK(jQuery.parseJSON(obj.data.message),obj.data.channel.split('/')[2],eqa,eqb);
						golesOKMul(jQuery.parseJSON(obj.data.message),obj.data.channel.split('/')[2],eqa,eqb);
					});
					
					//INCIDENCIAS
					cometd.subscribe('/relatos/'+id_relato+'/ultimainc', {id_relato: id_relato}, function(obj,id_relato){
						incidenciasPortadaOK(jQuery.parseJSON(obj.data.message),obj.data.channel.split('/')[2]);						
					});
					
					//ESTADO
					cometd.subscribe('/relatos/'+id_relato+'/estado', {id_relato: id_relato}, function(obj,id_relato){
						estadoOK(jQuery.parseJSON(obj.data.message),obj.data.channel.split('/')[2]);
						estadoOKMul(jQuery.parseJSON(obj.data.message),obj.data.channel.split('/')[2]);
					});
					
					//PENALES
					cometd.subscribe('/relatos/'+id_relato+'/penales', {id_relato: id_relato}, function(obj,id_relato){
						penalesOk(jQuery.parseJSON(obj.data.message),obj.data.channel.split('/')[2]);
					});
					
					//Football
					cometd.subscribe('/relatos/'+id_relato+'/football',function(obj)
					{
						Marcador(JSON.parse(obj.data.message),obj.data.channel.split('/')[2]);
					});
					
					//Incidencia
					cometd.subscribe('/relatos/'+id_relato+'/incidencia',function(obj)
					{
						Incidencia(JSON.parse(obj.data.message),obj.data.channel.split('/')[2]);
					});				
				}
			}
			//NOTICIAS
			cometd.subscribe('/rt/emol', function(obj){
				try{
					procesarNoticias(obj.data.message);
				}catch(err){}
			});
			
			//NOTIFICACIONES
			var idU = parseInt(getCookie('c_user_i'));
			if(!isNaN(idU)){
			cometd.subscribe('/user/'+idU, function(obj){
				ultimosComentarios(jQuery.parseJSON(obj.data.message));
			});
			}
			
			//Elecciones
			if(!mobilecheck()){
			cometd.subscribe('/elecciones',function(obj)
			{
				resultadoPresidencial(json2xml(JSON.parse(obj.data.message)));
			});
			}			
		}else{
			_changeMachine();
		}
	}

	unloader.addOnUnload(function() {
		cometd.disconnect(true);
	});
	
	cometd.configure({
		url: 'http://cometd'+numMaq+'.ecn.cl' + config.contextPath + '/cometd',
		logLevel: 'info'
		//logLevel: 'debug'
	});
	
	//cometd.ackEnabled = true;
	
	cometd.addListener('/meta/handshake', _metaHandshake);
	cometd.addListener('/meta/connect', _metaConnect);
	
	cometd.handshake();
});