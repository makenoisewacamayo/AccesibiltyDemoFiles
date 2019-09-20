/*
var Dominio = '';
if(document.domain){
	Dominio = document.domain.toLowerCase().replace("www","").replace("apps","").replace("emol50.gen","");
}else{ Dominio = '.emol.com'; }

var template_thanks = ' \
		<div id="modal_poll_box"> \
		  <form id="modal_poll_form"> \
            <a class="close" href="#" onclick="closeModal(); return false;">&#215;</a> \
		    <div class="box title"> \
		      <h2>&iexcl;Gracias por tu ayuda!</h2> \
		      <p>Porque tu opini&oacute;n nos importa y queremos darte lo mejor en noticias</p> \
		    </div> \
		    <div class="box buttons"> \
		      <input type="button" value="CERRAR" onclick="closeModalCon(); return false;"/> \
		    </div> \
		  </form> \
		</div>';

var template_form = ' \
		<div id="modal_poll_box"> \
          <form id="modal_poll_form" action="#" method="GET"  > \
            <div id="top_Modal_ayuda"> \
              <div class="Logo_emol_ayuda"><img src="http://apps.emol.com/apps/modal_emol/Logo_emol_ayuda.jpg" alt="Emol" /></div> \
              <div class="Cerrar_modal_ayuda"><a href="#" onclick="closeModal(); return false;"><img src="http://apps.emol.com/apps/modal_emol/btn-cerrar.gif" alt="Cerrar" /></a></div> \
            </div> \
            <div id="Content_info_ayuda"> \
              <h1 class="title_info_ayuda">Necesitamos de tu ayuda</h1> \
              <p class="bajada_info_ayuda">Queremos mejorar y nos interesa tu opini&oacute;n, te tomar&aacute; s&oacute;lo un momento.</p> \
            </div> \
            <h2 class="pregunta_info_ayuda">&iquest;Cu&aacute;l es el tema que m&aacute;s te gusta leer en EMOL?</h2> \
            <div class="content_input_ayuda"> \
              <select name="section" class="select big" id="section" > \
                <option selected value="">Elige el &aacute;rea que m&aacute;s te interesa</option> \
                <option value="nacional">Noticias de Chile</option> \
                <option value="internacional">Noticias del mundo</option> \
                <option value="economia">Economia</option> \
                <option value="deportes">Deportes</option> \
                <option value="cultura">Cultura y Espect&aacute;culos</option> \
                <option value="tecnologia">Tecnolog&iacute;a</option> \
                <option value="tendencias">Tendencias y Vida Sana</option> \
                <option value="panoramas">Panoramas</option> \
              </select> \
            </div> \
            <h2 class="pregunta_info_ayuda">Cu&eacute;ntanos sobre ti</h2> \
            <div class="content_input_ayuda" style="border-right:none;"> \
              <p>Eres:</p> \
              <input type="radio" name="gender" id="gender_m" value="M" /> \
              <label for="gender_m">Hombre</label> \
              <input type="radio" name="gender" id="gender_f" value="F" /> \
              <label for="gender_f">Mujer</label> \
              <div class="cont_edad">\
              <p>Edad</p> \
              <input type="text" value="" name="age" id="age"/> \
              </div>\
            </div> \
            <div class="content_input_ayuda" style="border-right:none;"> \
              <p>Eres suscriptor de El Mercurio:</p> \
              <div class="cont_edad">\
              <input type="radio" name="suscriptor" id="suscriptor_y" value="Y" /> \
              <label for="suscriptor_y">Si</label> \
              <input type="radio" name="suscriptor" id="suscriptor_n" value="N" /> \
              <label for="suscriptor_n">No</label> \
              </div>\
            </div> \
            <div class="content_input_ayuda bts_enviar" style="border-right:none; margin-bottom:0px;"> \
              <input type="submit" value="Enviar" /> \
              <p class="saltar_encuestra"><a href="#" onclick="closeModal(); return false;">No gracias, no quiero participar en este momento</a></p> \
            </div> \
          </form> \
        </div>';


var COOKIE_NAME = 'survey_v1';
var COOKIE_NAME_B = 'cae_v1';

function closeModal() {
	var box = document.getElementById('poll_box');
	box.parentNode.removeChild(box);
	CookieSurvey.setItemSurvey(COOKIE_NAME, '1', 86400 * 30, '/', Dominio);
}

function closeModalCon() {
	var box = document.getElementById('poll_box');
	box.parentNode.removeChild(box);
	if(!CookieSurvey.getItemSurvey(COOKIE_NAME)){
		CookieSurvey.setItemSurvey(COOKIE_NAME, '1', 86400 * 30, '/', Dominio);
	}
}


function showModal() {
	CookieSurvey.setItemSurvey(COOKIE_NAME, '1', 86400 * 2, '/', Dominio);

	//style
	var sheet = document.createElement('link');
	sheet.rel = 'stylesheet';
	sheet.href = 'http://apps.emol.com/apps/modal_emol/poll_style.css';

	//modal
	var container = document.createElement('div');
	container.id = 'poll_box';
	container.innerHTML = template_form;

	//inject  
	document.getElementsByTagName('head')[0].appendChild(sheet);
	document.getElementsByTagName('body')[0].appendChild(container);


	//clicks on overlay area
	jQuery(container).bind('click', function(e) {
		if(e.target != container) return;
		closeModal();
		return false;
	})

	var pollForm = document.getElementById("modal_poll_form")
	  , section = document.getElementById("section")
	  , age = document.getElementById("age")
	  , gender = document.getElementsByName("gender")
	  , gender_container = document.getElementById("gender");

	pollForm.onsubmit = function() {
		//console.log("on submit");

		if( section.value != '') { }
		else { section.style.background = '#ffabab'; section.focus(); return false;}
			
		// Check gender
		var gender_value = false;
		if(document.getElementById('gender_m').checked) {
			gender_value = 'M';
		}

		if(document.getElementById('gender_f').checked) {
			gender_value = 'F';
		}
		
		if (!gender_value) {
		  gender_container.style.background = '#ffabab'; 
		  gender[0].focus(); return false; 
		}

		// Check suscriptor
		var suscriptor_value = false;
		if(document.getElementById('suscriptor_y').checked) {
			suscriptor_value = 'Y';
		}

		if(document.getElementById('suscriptor_n').checked) {
			suscriptor_value = 'N';
		}

		if (!suscriptor_value) {
			suscriptor_value='N';
		}

		// Check Age
		var age_value = 0;
		if (age != '' && /^[0-9]+$/.test(age.value) && parseInt(age.value) <= 125) {
			age_value = age.value;
		}else { 
			age.style.background = '#ffabab'; age.focus(); return false; 
		}

		var data = {
		 'section': section.value,
		 'gender': gender_value,
		 'age': age_value,
		 'subscriber': suscriptor_value
		};
		
		if(!CookieSurvey.getItemSurvey(COOKIE_NAME_B)){
			CookieSurvey.setItemSurvey(COOKIE_NAME_B, data.gender+'|'+data.age, 86400 * 365, '/', Dominio);
		}
		
		var request = $.getJSON("http://apps.emol.com/apps/modal_emol/save.php?v=2&callback=?", data, function(result) {
		  container.innerHTML = template_thanks;
		  var segundos = (86400 * 180);
		  CookieSurvey.setItemSurvey(COOKIE_NAME, '1',segundos, '/', Dominio);
		});

		return false;
	}
}

jQuery(window).bind('load', function() {
	if(CookieSurvey.getItemSurvey(COOKIE_NAME))
		return;

	// if(/emol.cl/.test(document.location.href))
		// return;  

	//var random = Math.round(Math.random() * 5)
	
	//if (random == 2) {  
	if (true) {  
		setTimeout(function() {
			try {
				localStorage.test = 2;
				showModal();
			} catch (e) {
				console.log('You are in Privacy Mode\nPlease deactivate Privacy Mode and then reload the page.');
			}
		}, 5000)
	}   
});

var CookieSurvey = {
    getItemSurvey: function (name) {
        var pattern = new RegExp(name + '=([^;]+)'),
            matches = document.cookie.match(pattern);
    
        return (matches !== null) ? matches[1] : false;        
    },    
    setItemSurvey: function (name, value, seconds, path, domain) {
        var params = [];
        expires = new Date();
        var setTiempoVal = (expires.getTime() + (seconds * 1000));
        expires.setTime( setTiempoVal );
        params.push(name + '=' + encodeURIComponent(value));
        params.push('expires=' + expires.toGMTString());
                
        if(path){
			params.push('path=' + path);
		}
		if(domain){
			params.push('domain=' + domain); 
		} 
        
        document.cookie = params.join('; ');
    }
};
*/