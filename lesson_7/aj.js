(function($){  //обертка для jQuery
	$(function(){// onload
		//Объект содержащий все поля формы, которые пердаются на валидацию
		var inputs = $('form > input, form select').not('[type=button]');
		$('[name=birth]').datepicker({
				dayNamesMin: [ 'Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб' ],
				firstDay: 1,
				monthNames: [ 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь' ],
				nextText: 'След.',
				prevText: 'Пред.',
				changeMonth: true,
				changeYear: true,
				yearRange: '-120:+0'
			});
		$('[name=birth]').datepicker('option', 'dateFormat', 'yy-mm-dd' );
		//Создаем прогрессбар
		$('form > [type=button]').before('<div/>').prev('div').attr('id','bar');
		$('#bar').css({'width': '350px', 'height': '20px'}).progressbar({
			max: inputs.size()
		});
		//функция проверки заполненности формы
		function progress(inputs){
			$('#bar').progressbar('value', 0);
			$.each(inputs, function(index, element){
				if($(element).val() !== ''){
					$('#bar').progressbar('value', $('#bar').progressbar('value') + 1);
				}
			});
		}
		progress(inputs);
		$(inputs).on('change', function(){
			progress(inputs);
		});
		//вешаем событие на кнопку
		$('#validate').on('click', function(){
			$('#response').text('Валидация...ждите...').css('color', 'black');
			inputs.css('borderColor', 'black');
			$.post('validator.php', inputs, function(data){
				response = JSON.parse(data);
				if($('#dialog').dialog('instance') !== undefined){
					$('#dialog').dialog('destroy').empty();
				}
				if(response.result){
					$('#response').text('Валидация пройдена').css('color', 'green');
				}
				else {
					$.each(response.error, function(name, value){
						$('#dialog').append(value + '<br/>');
						$('form > [name="' + name.toLowerCase() + '"]').effect('shake', {direction: 'right', distance: 10}, 'slow').css('borderColor', 'red');
						$('#response').text('Валидация не пройдена').css('color', 'red');
						$('#dialog').dialog({
							width: 500,
						  buttons: [{
						    text: 'Ok',
						    click: function() {
						      $(this).dialog('close');
						    }
						   }]
						});
					});
				}
			})
			event.preventDefault();
		});
	});
})(jQuery);