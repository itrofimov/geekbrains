window.onload = function(){
	//Пункт первый. Найти все элементы h1, являющиеся потомками div и заменить их содержимое на произвольное.
	$('div > h1').html('Заменили');
	//Пункт второй. Установить всем input type="text" произвольное содержимое. Содержимое второго инпута должно отличаться от первого.
	$(':text[name="fname"]').val('Имя');
	$(':text[name="lname"]').val('Фамилия');
	//Пункт третий. Выведите значение option с value=2
	$('select').after('<br />Ответ: ' + $('select option[value=2]').html())
	//Пункт четвертый. Обернуть текст во втором li тегом b:
	$('ul > li').eq(1).wrapInner('<b>');
	//Пункт пятый. Извлеките последний li из предыдущего примера.	
	$('p').last().after($('ul > li').last().html())
	// импровизация
	$('p').css('color','green');
}