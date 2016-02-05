(function($){  //обертка для jQuery
	$(function(){// onload
		//вешаем событие
		$('body').on('click','#validate',function(){
				$.post('validator.php', $('form').children(), function(data){
					$("#response").html((data == 'true') ? 'Валидация пройдена' : 'Валидация не пройдена')
				})
			});
	});
})(jQuery);
