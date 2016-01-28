/*Альтернативный вариант домашнего задания*/
window.onload = 
	function(){
		// переменные для сохранения стиля текущей позиции для шахматной доски. 
		// Пришлось вытащить сюда, иначе при повторном нажатии на кнопку шахматной доски создавался еще олин 
		// видимо инстанс функции или чего-то еще и на доске появлялся еще олин выделенный элемент 
		var selectedCell = 'A1';
		var selectedStyle;
		function getRandom(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
		}
		function getRandomLetter()
		{
			var alphabet = 'абвгдеёжзиклмнопрстуфхцчшщъыьэюя';
			var alphabetArray = alphabet.split(''); //сначала сделал строку, а потом прочитал, что нужен массив, поэтому так
			var letter_pos = getRandom(0, (alphabet.length) - 1);
		  	return alphabet.substring(letter_pos, letter_pos + 1);
		}
		function getRandomColor(){
			var r = getRandom(0, 255);
			var g = getRandom(0, 255);
			var b = getRandom(0, 255);
			return '#' + r.toString(16) + g.toString(16) + b.toString(16);
		}
		document.getElementById('createTableButton').onclick = function(){
			var n; // таблица n*m
			var m;
			var table = '';
			//Очищаем результат выполнения другой кнопки
			document.getElementById('content').innerHTML = '';
			n = prompt('Введите количество столбцов таблицы');
			m = prompt('Введите количество строк таблицы');
			//пусть будет 1*1 по умолчанию
			if(n <= 1){
				n = 1;
			}
			if(m <= 1){
				m = 1;
			}
			table = '<table>';
			for(var i = 1; i <= m; i++){
				table += '<tr>';
				for(var j = 1; j <= n; j++){
					table += '<td style="background-color:' + getRandomColor() + '">' + getRandomLetter() + '</td>';
				}
				table += '</tr>';
			}
			table += '</table>';
			document.getElementById('content').innerHTML = table;
		}
		document.getElementById('createChessBoard').onclick = function(){
			//если это повторное нажатие на кнопку шахмат, то создавть слушателя не надо
			//а удалить слушателя нажатия кнопки надо, а тозадублируется
			if(document.getElementById('chess') == null){
				window.addEventListener('keydown', eventHandler);
			}
			else {
				document.getElementById('chess').removeEventListener('click', eventHandler);
			}
			document.getElementById('content').innerHTML = '';
			var chessLetteresArray = 'ABCDEFGH'.split('');
			var divChess = document.getElementById('content').appendChild(document.createElement('div'));
			divChess.id = "chess";
			var divChessColHead = divChess.appendChild(document.createElement('div'));
			divChessColHead.className = 'ChessColHead';
			divChessColHead.appendChild(document.createElement('div')); // пустой див в верхнем левом углу
			//создаем строку с буквами
			for(var i = 1; i <= 8; i++){
				var div = divChessColHead.appendChild(document.createElement('div'));
				div.innerHTML = chessLetteresArray[i - 1];
			}
			//создаем строки от 1 до 8
			for(var j = 1; j <= 8; j++){
				var divChessRow = divChess.appendChild(document.createElement('div'));
				divChessRow.className = 'chessRow';
				var divChessRowHead = divChessRow.appendChild(document.createElement('div'));
				divChessRowHead.className = 'chessRowHead';
				divChessRowHead.innerHTML = j;
				for(var i = 1; i <= 8; i++){
					var divChessCell = divChessRow.appendChild(document.createElement('div'));
					divChessCell.id = chessLetteresArray[i - 1] + j;
					if((i + j) % 2 == 0){
						divChessCell.className = 'brown';
					}
				}
			}
			var currentCell = divChess.appendChild(document.createElement('div'));
			currentCell.id = 'currentCell';
			currentCell.innerHTML = 'Ячейка не выбрана.';

			divChess.addEventListener('click', eventHandler);
	
			function markCell(newCell){
				currentCell.innerHTML = 'Выбрана ячейка: ' + newCell.id;
		    	if(typeof selectedStyle !== 'undefined'){
		    		selectedCell.style.backgroundColor = selectedStyle;
		    	}
		    	selectedCell = newCell;
		    	selectedStyle = newCell.style.backgroundColor;
				newCell.style.backgroundColor = 'red';
			}

			function eventHandler(event){
				event = event || window.event;
				switch (event.type){
					case 'click':
					    if(event.target.id != '' && event.target.parentNode.className == 'chessRow'){
					    	markCell(event.target);
					    }
						break;
					case 'keydown':
					    if(typeof event.keyCode !== 'undefined'){
					    	//берем текущий индекс ячейки, чтобы посчитать куда его сдвинуть
					    	var newRow = selectedCell.id.substring(1);
					    	var newCol = selectedCell.id.substring(0, 1);
					    	var newIndex;
					    	var changeCellFlag = true;
					    	switch (event.keyCode){
					    		case 38: //вверх
					    			newRow = Number(newRow) - 1;
					    			if(newRow < 1){
					    				newRow = 8;
					    			}
					    			break;
					    		case 40: //вниз
					    			newRow = Number(newRow) + 1;
					    			if(newRow > 8){
					    				newRow = 1;
					    			}
					    			break;
					    		case 37: //влево
					    			newIndex = chessLetteresArray.indexOf(newCol) - 1;
					    			if(newIndex < 0){
					    				newIndex = 7;
					    			}
					    			newCol = chessLetteresArray[newIndex];
					    			break;
					    		case 39: //вправо
					    			newIndex = chessLetteresArray.indexOf(newCol) + 1;
					    			if(newIndex > 7){
					    				newIndex = 0;
					    			}
					    			newCol = chessLetteresArray[newIndex];
					    			break;
					    		default:
					    			changeCellFlag=false;
					    			break;
					    	}
					    	if(changeCellFlag){
					    		markCell(document.getElementById(newCol + newRow));
					    	}
					    }
						break;
				}
			}
		}
	};