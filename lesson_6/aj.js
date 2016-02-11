(function($){  //обертка для jQuery
	$(function(){// onload
		//вешаем событие
		$('#validate').on('click',function(){
			$('form span').empty();
			$('#response').text('Валидация...ждите...').css('color','black');;
			$.post('validator.php', $('form').children(), function(data){
				response=JSON.parse(data);
				if(response.result) $('#response').text('Валидация пройдена').css('color','green');
				else {
					$.each(response.error, function(name,value){
						$('form > [name="' + name.toLowerCase() + '"]').next('span').text(value);
						$('#response').text('Валидация не пройдена').css('color','red');
					});
				}
			})
		});
		$('form > input, form select').after('<span/>').next('span').css('color','red');
	});
})(jQuery);
