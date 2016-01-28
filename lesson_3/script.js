window.onload = function(){

	$('div > h1').html('Заменили');
	$(':text[name="fname"]').val('Имя');
	$(':text[name="lname"]').val('Фамилия');
	$('select').after('<br />Ответ: ' + $('select option[value=2]').html())
	$('ul > li').eq(1).wrapInner('<b>');
	// импровизация
	$('p').css('color','green');
}