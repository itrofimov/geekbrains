(function($){  //обертка для jQuery
	$(function(){// onload
		//вешаем событие
		$('body').on('click','#jtabs li',function(){
			$('#jtabs > div').hide(); //прячем всех
			$('#jtabs > div').eq($(event.target).index()).toggle(); //показываем выбранный
			$('#jtabs > ul > li[class=active]').toggleClass('active'); //меняем класс для ранее выбранного заголовка
			$(this).toggleClass('active'); //меняем класс для выбранного заголовка
		});
		$('#jtabs > div').hide(); //при загрузке прячем всех
		$('#jtabs > div').eq(0).toggle(); //показываем первый
		$('#jtabs > ul > li').eq(0).toggleClass('active'); // ставим выбранным первый заголовок
	});
})(jQuery);
