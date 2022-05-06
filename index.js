const cardList = document.querySelector('.cardList');
const content = document.getElementsByClassName('content');
const scoreTag = document.getElementById('score');

let board = [];
board = buildBoard();

let score = 0;

let interval = setInterval(function() {
    addCard('right')
}, 2000);

cardList.addEventListener('click', function(e){
    let target = e.target
    console.log(target);
    if(target.matches('.cardList')){
        return
    }
    if(target.classList.contains('active')){
        score += 1;

        scoreTag.innerHTML = `${score}`;
        e.target.classList.remove('active');
        e.target.classList.add('inactive');

        return
    }
    else{
        target.innerHTML = target.value;
        if(target.value === 'normal'){
            score += 2;
        }else if(target.value === 'poison'){
            score -= 3;
        }else{
            score += 5;
        }
        scoreTag.innerHTML = `${score}`;
        if(target.value === 'poison'){
            setTimeout(function(){
                target.remove();
            }, 3000);
        }
    }
    e.target.remove();
    let children = cardList.children;
    if(children.length<1){
        clearInterval(interval);
    }

})

function addCard(isNum){
    let value;
    let card = document.createElement('div');
    let random = Math.ceil(Math.random()*12);
    if(random < 9){
        value = 'normal';
    }else if(random < 12){
        value = 'poison';
    }else{
        value = 'golden';
    }
    card.value = value;
    card.classList.add('card');
    card.classList.add('active');
    if(isNum === 'wrong'){
        card.innerHTML = 'starter';
    }else{
        let num = cardList.children.length;
        card.innerHTML = `${num}`;
    }

    cardList.appendChild(card);
}

function buildBoard(){
    let board = [];
    for(let i=0;i<12;i++){
        let newCard = addCard('wrong');
        board.push(newCard);
    }
}