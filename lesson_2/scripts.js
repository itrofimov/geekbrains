/*Альтернативный вариант домашнего задания*/
//Класс шахматной доски
function ChessBoard(containerId)
{
	// Сюда пишется индекс выбранной ячейки
	var currentCell;
	//	Объект где хранится текущая ячейка
	var selectedNode = new Object({
		getCol:function(){
			return this.selectedCell.dataset.id.substring(0,1);
		},
		getRow:function(){
			return this.selectedCell.dataset.id.substring(1);
		},
	});
	var chessLetteresArray = 'ABCDEFGH'.split('');
	
	//Элемент куда пишется доска
	var contentNode;

	//метод создания вложенного div с параметрами	
	var createCell = function(parentNode, className, content){
		 var cell = parentNode.appendChild(document.createElement('div'));
		 if(className !== null && className !== undefined){
		 	cell.className = className;
		 }
		 if(content !== null && content !== undefined){
		 	cell.innerHTML = content;
		 }
		 return cell;
	}
//меняем фон ячейки, предварительно сохраняя ее исходный стиль
	var markCell = function(newCell){
		currentCell.innerHTML = 'Выбрана ячейка: ' + newCell.dataset.id;
    selectedNode.selectedCell.style = selectedNode.cellStyle;
    selectedNode.cellStyle = newCell.style;
    selectedNode.selectedCell=newCell;
		newCell.style.backgroundColor = 'red';
	}
	//поиск номера по порядку элемента в ноде
	var getElementIndex = function(element){
		    var i = 0;
		    while (element = element.previousSibling) {
		        element.nodeType == 1 && i++;
		    }
		    return i;
	}
	//обработка клика с запоминанием текущей доски при помощи установки фокуса
	var click = function(target){
    if(target.parentNode.className == 'chessRow'){
    	contentNode.setAttribute('tabindex','1');
    	contentNode.focus();
    	markCell(target);
    }
	}
	//обработка нажатия кнопки
	var move = function(keyCode){
  	var changeCellFlag = true;
  	var col = selectedNode.getCol();
  	var row = selectedNode.getRow();
  	var newCell;
  	switch (keyCode){
  		case 38: //вверх
  			if(row == 1){
  				newCell = selectedNode.selectedCell.parentNode.parentNode.lastChild.previousSibling.childNodes[getElementIndex(selectedNode.selectedCell)];
  			}
  			else{
  				newCell = selectedNode.selectedCell.parentNode.previousSibling.childNodes[getElementIndex(selectedNode.selectedCell)];
  			}
  			break;
  		case 40: //вниз
  			if(row == 8){
  				newCell = selectedNode.selectedCell.parentNode.parentNode.firstChild.nextSibling.childNodes[getElementIndex(selectedNode.selectedCell)];
  			}
  			else{
  				newCell = selectedNode.selectedCell.parentNode.nextSibling.childNodes[getElementIndex(selectedNode.selectedCell)];
  			}
  			break;
  		case 37: //влево
  			if(chessLetteresArray.indexOf(col) === 0){
  				newCell = selectedNode.selectedCell.parentNode.lastChild;
  			}
  			else{
  				newCell = selectedNode.selectedCell.previousSibling;
  			}
  			break;
  		case 39: //вправо
  			if(chessLetteresArray.indexOf(col) == 7){
  				newCell = selectedNode.selectedCell.parentNode.firstChild.nextSibling;
  			}
  			else{
  				newCell = selectedNode.selectedCell.nextSibling;
  			}
  			break;
  		default:
  			changeCellFlag=false;
  			break;
  	}
  	if(changeCellFlag){
  		markCell(newCell);
  	}
	}
	//обработчик событий с проверкой текущей доски для кнопок
	this.eventHandler = function(event){
		event = event || window.event;
		target = event.target || event.srcElement;
		switch (event.type){
			case 'click':
				click(target);
				break;
			case 'keydown':
		    if(typeof event.keyCode !== 'undefined' && 
		    		event.keyCode >= 37 && 
		    		event.keyCode <= 40 && 
		    		document.activeElement.id == contentNode.id){
		    	move(event.keyCode);
		    }
			break;
		}
	}
	//метод создания доски
	this.create = function(){
		//Элемент куда вставляется доска
		contentNode=document.getElementById(containerId);
		contentNode.innerHTML='';
		var divChess = createCell(contentNode);
		var divChessColHead = createCell(divChess, 'ChessColHead');
		createCell(divChessColHead); // пустой див в верхнем левом углу
		for(var i = 1; i <= 8; i++){
			createCell(divChessColHead, null, chessLetteresArray[i - 1]);
		}
		//создаем строки от 1 до 8
		for(var j = 1; j <= 8; j++){
			var divChessRow = createCell(divChess, 'chessRow');
			var divChessRowHead = createCell(divChessRow, 'chessRowHead', j);
			for(var i = 1; i <= 8; i++){
				if((i + j) % 2 == 0){
					var divChessCellClassName = 'brown';
				}
				else {
					var divChessCellClassName = '';
				}
				var divChessCell = createCell(divChessRow, divChessCellClassName);
				divChessCell.dataset.id=chessLetteresArray[i - 1] + j; //прописываем в тек data-id индекс ячейки
			}
		}
		//выбираем по умолчанию текущей ячейку A1, но без выделения
		selectedNode.selectedCell = divChess.childNodes[1].childNodes[1];
		selectedNode.cellStyle=divChess.childNodes[1].childNodes[1].style;
		currentCell = createCell(divChess, 'currentCell', 'Ячейка не выбрана.');
		//вешаем слушателей событий
		window.addEventListener('keydown', this.eventHandler);
		divChess.addEventListener('click', this.eventHandler);
	};
}

//второй пункт задания
String.prototype.addToElement = function(elementName,className){
	elementName = elementName || 'div';
	if(typeof className !== 'undefined'){
		classHtml=' class="' + className + '"';
	}
	else {
		classHtml = '';
	}
	return '<' + elementName + classHtml + '>' + this + '</' + elementName + '>';
};
//третий пункт задания
function MyHtml(){
	this.value = new String();
	this.addText = function(str){
		this.value += str;
	}
	this.addH = function(str, N){
		if(N < 1 || N > 6){
			return '';
		}
		this.value += '<h' + N + '>' + str + '</h' + N + '>';
	}
	this.showHtml = function(){
		return this.value;
	}
}

window.onload = function(){
		var chessBoard = new ChessBoard('content1');
		chessBoard.create();
		var chessBoard1 = new ChessBoard('content2');
		chessBoard1.create();
		
		var str = "Привет, мир!";
		document.getElementById('string').innerHTML=str + ' ' + str.addToElement('div', 'red') + 'Здравствуй, друг'.addToElement('span', 'brown');
		var myhtml = new MyHtml();
		myhtml.addText('Привет, ');
		myhtml.addText('дорогой ');
		myhtml.addH('Друг!!!',4);
		document.getElementById('myhtml').innerHTML = myhtml.showHtml();
};
