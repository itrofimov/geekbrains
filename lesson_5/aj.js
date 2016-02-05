(function($){  //обертка для jQuery
	$(function(){// onload
		//вешаем событие
		$('#validate').on('click',function(){
				$.post('validator.php', $('form').children(), function(data){
					$("#response").html((data == 'true') ? 'Валидация пройдена' : 'Валидация не пройдена')
				})
			});
	});
})(jQuery);
