var scrollEfectuado = 0, scrollEfectuadoCer = 0, scrollEfectuadoDos = 0, scrollEfectuadoTre = 0, scrollEfectuadoCua = 0, scrollEfectuadoCin = 0;
$(window).scroll(function(){
	TrackingScrollCargaCajas();
});
function GetScrollPercentCajas(){
	var bottom = $(window).height() + $(window).scrollTop();
	var height = $(document).height();
	return Math.round(100*bottom/height);
};

function TrackingScrollCargaCajas(){
	var scrollPercent = GetScrollPercentCajas();
	if(scrollPercent>25 && scrollEfectuadoCer==0){
		scrollEfectuadoCer=1;
		$.ajax({
		  url: '/_portada/cajasecciones/cajamascomentados.aspx',
		  success: function(data) {
		   $('#MascomentadosCont').html(data); 
		   $(function(){
				var ids = [];
				$('#MascomentadosCont .cont_contador_comentarios').each(function(){
					var id = $(this).attr('data-id');		
					if(typeof id !== 'undefined'){
						ids.push(id);
					}
				});
				var strIds = ids.join(',');
				getCommentsNumbers(strIds);
			});
		  },
		  async: true
		});
		$.ajax({
		  url: '/_portada/cajasecciones/cajaultimominuto.aspx',
		  success: function(data) {
		   $('#cajaUltimoMinutoCont').html(data);
		  },
		  async: true
		});
	}
	if(scrollPercent>45 && scrollEfectuadoCin==0){
		scrollEfectuadoCin=1;
		$.ajax({
		  url: '/_portada/cajasecciones/cajarealtime.aspx',
		  success: function(data) {
		   $('#RealtimeCont').html(data);
		  },
		  async: true
		});
		$.ajax({
		  url: '/_portada/cajasecciones/cajablogs.aspx',
		  success: function(data) {
		   $('#cajaBlogsCont').html(data);
		  },
		  async: true
		});
		
	}	
	if(scrollPercent>52 && scrollEfectuado==0){
		scrollEfectuado=1;

		$.ajax({
		  url: '/_portada/cajasecciones/cajapanoramaespectaculos.aspx',
		  success: function(data) {
		   $('#Caja01').html(data); 
		   $(function(){
				var ids = [];
				$('#Caja01 .cont_contador_comentarios').each(function(){
					var id = $(this).attr('data-id');		
					if(typeof id !== 'undefined'){
						ids.push(id);
					}
				});
				var strIds = ids.join(',');
				getCommentsNumbers(strIds);
			});
		  },
		  async: true
		});
		
		/*$.ajax({
		  url: '/_portada/cajasecciones/cajaeconomicosderecha.aspx',
		  success: function(data) {
		   $('#EconomicosCont').html(data); 
		  },
		  async: true
		});*/
	}
	if(scrollPercent>60 && scrollEfectuadoDos==0){
		scrollEfectuadoDos=1;
		$.ajax({
		  url: '/_portada/cajasecciones/cajaEdicionesEspeciales.aspx',
		  success: function(data) {
		   $('#cajaEdiciones').html(data); 
		  },
		  async: true
		});		
		/*$.ajax({
		  url: '/_portada/cajasecciones/cajatendencias.aspx',
		  success: function(data) {
		   $('#Caja02').html(data);
			$(function(){
				var ids = [];
				$('#Caja02 .cont_contador_comentarios').each(function(){
					var id = $(this).attr('data-id');		
					if(typeof id !== 'undefined'){
						ids.push(id);
					}
				});
				var strIds = ids.join(',');
				getCommentsNumbers(strIds);
			});
		  },
		  async: true
		});*/
		
		$.ajax({
		  url: '/_portada/cajasecciones/cajadeportes.aspx',
		  success: function(data) {
		   $('#Caja03').html(data);
		   $(function(){
				var ids = [];
				$('#Caja03 .cont_contador_comentarios').each(function(){
					var id = $(this).attr('data-id');		
					if(typeof id !== 'undefined'){
						ids.push(id);
					}
				});
				var strIds = ids.join(',');
				getCommentsNumbers(strIds);
			});
		  },
		  async: true
		});		
		
		
		$.ajax({
		  url: '/_portada/cajasecciones/cajarestaurantes.aspx',
		  success: function(data) {
		   $('#RestaurantesCont').html(data); 
		  },
		  async: true
		});
		
		$.ajax({
		  url: '/_portada/cajasecciones/cajamapas.aspx',
		  success: function(data) {
		   $('#MapasCont').html(data); 
		  },
		  async: true
		});		
	}
	if(scrollPercent>65 && scrollEfectuadoTre==0){
		scrollEfectuadoTre=1;
		$.ajax({
		  url: '/_portada/cajasecciones/cajamundografico.aspx',
		  success: function(data) {
		   $('#Caja04').html(data);
		   $(function(){
				var ids = [];
				$('#Caja04 .cont_contador_comentarios').each(function(){
					var id = $(this).attr('data-id');		
					if(typeof id !== 'undefined'){
						ids.push(id);
					}
				});
				var strIds = ids.join(',');
				getCommentsNumbers(strIds);
			});
		  },
		  async: true
		});		
		
		/*$.ajax({
		  url: '/_portada/cajasecciones/cajaguioteca.aspx',
		  success: function(data) {
		   $('#GuiotecaCont').html(data); 
		  },
		  async: true
		});*/
		
		$.ajax({
		  url: '/_portada/cajasecciones/cajamultimedia.aspx',
		  success: function(data) {
		   $('#Caja05').html(data);
		   $(function(){
				var ids = [];
				$('#Caja05 .cont_contador_comentarios').each(function(){
					var id = $(this).attr('data-id');		
					if(typeof id !== 'undefined'){
						ids.push(id);
					}
				});
				var strIds = ids.join(',');
				getCommentsNumbers(strIds);
			});
		  },
		  async: true
		});
		
		$.ajax({
		  url: '/_portada/cajasecciones/cajaAutos.aspx',
		  success: function(data) {
		   $('#cajaAutos').html(data);
			$(function(){
				var ids = [];
				$('#cajaAutos .cont_contador_comentarios').each(function(){
					var id = $(this).attr('data-id');		
					if(typeof id !== 'undefined'){
						ids.push(id);
					}
				});
				var strIds = ids.join(',');
				getCommentsNumbers(strIds);
			});
		  },
		  async: true
		});
		
		$.ajax({
		  url: '/_portada/cajasecciones/cajamercurio.aspx',
		  success: function(data) {
		   $('#Caja06').html(data); 
		  },
		  async: true
		});
		
		$.ajax({
		  url: '/_portada/cajasecciones/cajaeconomicos.aspx',
		  success: function(data) {
		   $('#Caja08').html(data); 
		  },
		  async: true
		});
		
		$.ajax({
		  url: '/_portada/cajasecciones/cajalocastillo.aspx',
		  success: function(data) {
		   $('#LocastilloCont').html(data); 
		  },
		  async: true
		});
		
	}
	if(scrollPercent>76 && scrollEfectuadoCua==0){
		scrollEfectuadoCua=1;
		$.ajax({
		  url: '/_portada/cajasecciones/cajanoticiasinferiorderecha.aspx',
		  success: function(data) {
		   $('#NoticiasDerCont').html(data); 
		  },
		  async: true
		});
		
		$.ajax({
		  url: '/_portada/cajasecciones/cajaredessociales.aspx',
		  success: function(data) {
		   $('#RedesSocialesCont').html(data); 
		  },
		  async: true
		});
		
		$.ajax({
		  url: '/_portada/cajasecciones/cajaeducacion.aspx',
		  success: function(data) {
		   $('#EducacionCont').html(data); 
		  },
		  async: true
		});		
		
		$.ajax({
		  url: '/_portada/cajasecciones/cajafaroxclubvive.aspx',
		  success: function(data) {
		   $('#Caja09').html(data); 
		  },
		  async: true
		});
		
		$.ajax({
		  url: '/_portada/cajasecciones/cajaservicios.aspx',
		  success: function(data) {
		   $('#Caja07').html(data); 
		  },
		  async: true
		});
		
		$.ajax({
		  url: '/_portada/cajasecciones/cajajuegos.aspx',
		  success: function(data) {
		   $('#JuegosCont').html(data); 
		  },
		  async: true
		});
		
		$.ajax({
		  url: '/_portada/cajasecciones/cajaotrosservicios.aspx',
		  success: function(data) {
		   $('#OtrosServiciosCont').html(data); 
		  },
		  async: true
		});				
	}
};