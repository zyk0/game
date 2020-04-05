let overlay = document.querySelector('.overlay');
let modal = document.querySelector('.modal');
let speed = 700; //скорость движения фигуры

modal.addEventListener('click', function(event){

	if(event.target.classList.contains('button')){
		modal.style.display = 'none';
		overlay.style.display = 'none';
		startGame();
	}
	
})
/*
let game_over = document.querySelector('.game_over');
console.log('typeof game_over ', typeof game_over);
game_over.addEventListener('click', function(event){
	if(event.target.classList.contains('button')){
		game_over.style.display = 'none';
		overlay.style.display = 'none';
		startGame();
	}
})
*/

function startGame(){

	let tetris = document.createElement('div'); //делаем div
	tetris.classList.add('tetris'); //добавляем для <div class="tetris">

	// 180 ячеек
	for(let i=1; i<181; i++){
	  let excel = document.createElement('div');
	  excel.classList.add('excel'); // добавляем для <div class="excel">
	  tetris.appendChild(excel);
	}

	//let main = document.getElementsByClassName('main')[0];
	let main = document.getElementById('main');
	main.appendChild(tetris); //  к main присоединяем 180 ячеек

	let excel = document.getElementsByClassName('excel');
	let i = 0;

	// для нумерации проход циклом по ячейкам, каждая ячейка получает номер
	//  ось x: от 1 - до 10, ось y от 1 до 14 
	//  от 14 до 18  - скрыто
	for(let y = 18; y>0; y--){
		for(let x=1; x < 11; x++){
			excel[i].setAttribute('posX', x);
			excel[i].setAttribute('posY', y);
			i++;
		}
	}

	let x = 5, y = 15; // место появления фигуры. let x = 5, y = 10;

	// массив фугур
	let mainArr = [

	  //палка
	  [[0,1],[0,2],[0,3],
		
		//поворот на 90 градусов
		//поворот на 90 градусов
		[[-1,1],[0,0],[1,-1],[2,-2]],
		//180
		[[1,-1],[0,0],[-1,1],[-2,2]],
		//поворот на 270 градусов
		[[-1,1],[0,0],[1,-1],[2,-2]],
		//360
		[[1,-1],[0,0],[-1,1],[-2,2]],
		'#f9ca24'],
		
		
	  //квадрат
	  [[1,0],[0,1],[1,1],

		//поворот на 90 градусов
		[[0,0],[0,0],[0,0],[0,0]],
		//180
		[[0,0],[0,0],[0,0],[0,0]],
		//поворот на 270 градусов
		[[0,0],[0,0],[0,0],[0,0]],
		//360
		[[0,0],[0,0],[0,0],[0,0]],
		'#f0932b'],
		
		
	  //буква L
	  [[1,0],[0,1],[0,2],
	  
	  //поворот на 90 градусов
		[[0,0],[-1,1],[1,0],[2,-1]],
		//180
		[[1,-1],[1,-1],[-1,0],[-1,0]],
		//поворот на 270 градусов
		[[-1,0],[0,-1],[2,-2],[1,-1]],
		//360
		[[0,-1],[0,-1],[-2,0],[-2,0]],
		'#eb4d4b'],
		
		
	  //обратная L
	  [[1,0],[1,1],[1,2],
	  
		//поворот на 90 градусов
		[[0,0],[0,0],[1,-1],[-1,-1]],
		//180
		[[0,-1],[-1,0],[-2,1],[1,0]],
		//поворот на 270 градусов
		[[2,0],[0,0],[1,-1],[1,-1]],
		//360
		[[-2,0],[1,-1],[0,0],[-1,1]],
		'#6ab04c'],
	
	  //ступенька
	  [[1,0],[2,0],[1,1],
	  
		//поворот на 90 градусов
		[[1,-1],[0,0],[0,0],[0,0]],
		//180
		[[0,0],[-1,0],[-1,0],[1,-1]],
		//поворот на 270 градусов
		[[1,-1],[1,-1],[1,-1],[0,0]],
		//360
		[[-2,0],[0,-1],[0,-1],[-1,-1]],
		'#7ed6df'],
	  
	  
	  //Z
	  [[1,0],[1,1],[2,1],
	  
		//поворот на 90 градусов
		[[2,-1],[0,0],[1,-1],[-1,0]],
		//180
		[[-2,0],[0,-1],[-1,0],[1,-1]],
		//поворот на 270 градусов
		[[2,-1],[0,0],[1,-1],[-1,0]],
		//360
		[[-2,0],[0,-1],[-1,0],[1,-1]],
		'#e056fd'],
		
		
	  //обратная z
	  [[1,0],[-1,1],[0,1],
	  
		//поворот на 90 градусов
		[[0,-1],[-1,0],[2,-1],[1,0]],
		//180
		[[0,0],[1,-1],[-2,0],[-1,-1]],
		//поворот на 270 градусов
		[[0,-1],[-1,0],[2,-1],[1,0]],
		//360
		[[0,0],[1,-1],[-2,0],[-1,-1]],
		'#686de0']
		
	]

let currentFigure = 0;	// текущая фигура
let figureBody = 0;
let rotate = 1; // для отслеживания состояния поворота фигуры

function create(){
	function getRandom(){
		return Math.round(Math.random()*(mainArr.length-1));
		// Math.round(Math.random() - (1 или 0) * (7 - 1); 
	}

	rotate = 1;

	// figureBody - создание фигуры.
	currentFigure = getRandom();
	figureBody = [
		document.querySelector(`[posX = "${x}"][posY = "${y}"]`), //posX - 5,  posY - 10
		document.querySelector(`[posX = "${x + mainArr[currentFigure][0][0]}"][posY = "${y + mainArr[currentFigure][0][1]}"]`),
		document.querySelector(`[posX = "${x + mainArr[currentFigure][1][0]}"][posY = "${y + mainArr[currentFigure][1][1]}"]`),
		document.querySelector(`[posX = "${x + mainArr[currentFigure][2][0]}"][posY = "${y + mainArr[currentFigure][2][1]}"]`)
	]

	for(let i=0; i<figureBody.length; i++){
		figureBody[i].classList.add('figure');
	}
}

create();

let score = 0;

//let input = document.getElementsByTagName('input')[0];
//input.value = `Ваши очки: ${score}`;

let count_score = document.getElementById('count_score');
console.log('count_score: ', count_score);
//count_score = `Ваши очки: ${score}`;
console.log('count_score.value: ', count_score);
count_score.innerHTML = score;

function move(){
  let moveFlag = true; // true - деталь двигается false - остановилась
  let coordinates = [
    [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')], //координаты: 5 15
    [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')], //5 16
    [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')], //5 17
    [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')]  //5 18
  ];
	// coordinates[i][1] == 1 - нижний порог по оси Y 
  for(let i=0;i<coordinates.length; i++){
    if(coordinates[i][1] == 1 || document.querySelector(`[posX = "${coordinates[i][0]}"][posY = "${coordinates[i][1]-1}"]`).classList.contains('set')){
      moveFlag = false; // деталь остановилась
      break;
    }
  }  
  if(moveFlag == true){
    for(let i=0; i<figureBody.length; i++){
      figureBody[i].style.backgroundColor = null;
      figureBody[i].classList.remove('figure');
    }
    figureBody = [
      document.querySelector(`[posX = "${coordinates[0][0]}"][posY = "${coordinates[0][1]-1}"]`),
      document.querySelector(`[posX = "${coordinates[1][0]}"][posY = "${coordinates[1][1]-1}"]`),
      document.querySelector(`[posX = "${coordinates[2][0]}"][posY = "${coordinates[2][1]-1}"]`),
      document.querySelector(`[posX = "${coordinates[3][0]}"][posY = "${coordinates[3][1]-1}"]`)
    ]
    for(let i=0; i<figureBody.length; i++){
      figureBody[i].classList.add('figure');
      figureBody[i].style.backgroundColor = `${mainArr[currentFigure][7]}`;
    }
  }
  else{
    for(let i=0; i<figureBody.length; i++){
      figureBody[i].classList.remove('figure');
      figureBody[i].style.backgroundColor = null;
      figureBody[i].classList.add('set');
    }
    for(let i =1; i<15; i++){
      let count = 0;
      for(let k=1; k<11;k++){
        if(document.querySelector(`[posX="${k}"][posY="${i}"]`).classList.contains('set')){
          count++;
		  //  count == 10 - ряд(все 10 ячеек) полностью заполнен
		  // значит удаляем ряд .remove('set')
          if(count == 10){
            score += 10;
            //input.value = `Ваши очки: ${score}`;
			//count_score.innerHTML = `Ваши очки: ${score}`;
			//count_score.innerHTML = score;
			console.log('1. score: ', score); //score: 10
			console.log('count_score: ', count_score); //DOM el
			count_score.innerHTML = score;
			
            for(let m=1; m<11; m++){
              document.querySelector(`[posX="${m}"][posY="${i}"]`).classList.remove('set')
            }
            let set = document.querySelectorAll('.set');
            let newSet = []; // новый ряд, который замещает заполныенный ряд
            for(let s=0; s<set.length; s++){
              let setCoordinates = [set[s].getAttribute('posX'), set[s].getAttribute('posY')];
              if(setCoordinates[1]>i){
                set[s].classList.remove('set');
                newSet.push(document.querySelector(`[posX = "${setCoordinates[0]}"][posY = "${setCoordinates[1]-1}"]`));
              }
            }
            for(let a=0 ; a < newSet.length; a++){
              newSet[a].classList.add('set');
            }
            i--;
          }
        }
      }
    }
	//  окончание игры
	for(let n=1; n<11; n++){
		if(document.querySelector(`[posX="${n}"][posY="15"]`).classList.contains('set')){
			clearInterval(interval);
			//alert('GAME OVER');
			swal("GAME OVER!"); //sweet alert.js
			console.log('=== game over ===');
			console.log('SweetAlert score: ', score);
			//console.log('typeof score: ', typeof score) //>>number

			break;
		}
	}
	
    create();
  }
}

	let interval = setInterval(() => {
		move();
		}, speed);
	// 	проверка move() каждые speed (700мСек)

	let flag = true;
	// keydown - событие js
window.addEventListener('keydown', function(event){

  let coordinates1 = [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')];
  let coordinates2 = [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')];
  let coordinates3 = [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')];
  let coordinates4 = [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')];
	// getNewState() — положение фигуры
  function getNewState(a){

    flag = true;

    let figureNew = [
      document.querySelector(`[posX = "${+coordinates1[0] + a}"][posY = "${coordinates1[1]}"]`),
      document.querySelector(`[posX = "${+coordinates2[0] + a}"][posY = "${coordinates2[1]}"]`),
      document.querySelector(`[posX = "${+coordinates3[0] + a}"][posY = "${coordinates3[1]}"]`),
      document.querySelector(`[posX = "${+coordinates4[0] + a}"][posY = "${coordinates4[1]}"]`)
    ];

    for(let i=0; i<figureNew.length; i++){
      if(!figureNew[i] || figureNew[i].classList.contains('set')){
        flag = false;
      }
    }

    if (flag){
      for(let i=0; i<figureBody.length; i++){
        figureBody[i].style.backgroundColor = '#fff';
        figureBody[i].classList.remove('figure');
      }

      figureBody = figureNew;

      for(let i=0; i<figureBody.length; i++){
        figureBody[i].classList.add('figure');
        figureBody[i].style.backgroundColor = `${mainArr[currentFigure][7]}`;
      }
    }
  }

  function getRotate(){

    flag = true;
    let figureNew = [
      document.querySelector(`[posX = "${+coordinates1[0] + mainArr[currentFigure][rotate + 2][0][0]}"][posY = "${+coordinates1[1] + mainArr[currentFigure][rotate + 2][0][1]}"]`),
      document.querySelector(`[posX = "${+coordinates2[0] + mainArr[currentFigure][rotate + 2][1][0]}"][posY = "${+coordinates2[1] + mainArr[currentFigure][rotate + 2][1][1]}"]`),
      document.querySelector(`[posX = "${+coordinates3[0] + mainArr[currentFigure][rotate + 2][2][0]}"][posY = "${+coordinates3[1] + mainArr[currentFigure][rotate + 2][2][1]}"]`),
      document.querySelector(`[posX = "${+coordinates4[0] + mainArr[currentFigure][rotate + 2][3][0]}"][posY = "${+coordinates4[1] + mainArr[currentFigure][rotate + 2][3][1]}"]`)
    ];
    
    for(let i=0; i<figureNew.length; i++){
      if(!figureNew[i] || figureNew[i].classList.contains('set')){
        flag = false;
      }
    }

    if (flag == true){
      for(let i=0; i<figureBody.length; i++){
        figureBody[i].style.backgroundColor = '#fff';
        figureBody[i].classList.remove('figure');
      }

      figureBody = figureNew;

      for(let i=0; i<figureBody.length; i++){
        figureBody[i].classList.add('figure');
        figureBody[i].style.backgroundColor = `${mainArr[currentFigure][7]}`;
      }

      if(rotate<4){
        rotate++;
      }
      else{
        rotate = 1;
      }
    }
  }

	//события клавиатуры
	if(event.keyCode == 37){
		getNewState(-1);
	}
	else if(event.keyCode == 39){
		getNewState(1);
	}
	else if(event.keyCode == 40){
		move();
	}
	else if(event.keyCode == 38){
		getRotate();
	}

})
//window.addEventListener('keydown', function(event){console.log('1keyCode: ', event.keyCode);});
}

console.info("%c : github.com/zyk0", "background: #de5d83; color: #ffffff"); //my github