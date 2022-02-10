class Die{
    value = 0;
    hold = false;
}

 let yatzyDie =[new Die(), new Die(), new Die(), new Die(), new Die()]
 let throwCount = 0;

function throwDice(){

    for(i = 0; i < 15; i++) {
        let item = document.getElementById('p'+(i+1))
        if(item.style.opacity != 0.2){
        item.disabled = false;
        }
    }

    for (const index in yatzyDie) {
        if(!yatzyDie[index].hold){
            yatzyDie[index].value = Math.floor(Math.random() * 6) + 1;
            updateImg(index)
        }
    }
    throwCount++;
    document.getElementById('turn').innerHTML = "TURN: "+throwCount;
    frequency()
    showResults()
    if(throwCount >= 3){
        document.getElementById('rollBtn').disabled = true;
        document.getElementById('rollBtn').style.opacity = 0.2;
    }
    
    
}

function updateImg(index){
    let i = parseInt(index) + 1
    let id = "img" + i
    document.getElementById(id).src = 'die'+yatzyDie[index].value+'.png'
}

function updateHold(event) {
    let i = parseInt(event.currentTarget.getAttribute('alt')) + 1
    yatzyDie[event.currentTarget.getAttribute('alt')].hold = event.currentTarget.checked;
    if(event.currentTarget.checked){
        document.getElementById('img' + i).style.border = '3px solid black'
    } else {
        document.getElementById('img' + i).style.border = 'none'
    }
}

//-------------------------------------------POINTS CALCULATION----------------------------------------
function results() {
    
    let resultss = []

    for (i = 0; i <= 5; i++) {
        resultss[i] = sameValuePoint(i + 1)
    }
    resultss[6] = onePairPoints()
    resultss[7] = twoPairPoints()
    resultss[8] = threeSamePoints()
    resultss[9] = fourSamePoints()
    resultss[10] = fullHousePoints()
    resultss[11] = smallStraightPoints()
    resultss[12] = largeStraightPoints()
    resultss[13] = chancePoints()
    resultss[14] = yatzyPoints()

    return resultss
}

let frequen = [0, 0, 0, 0, 0, 0, 0]

function frequency() { 

    let holding = false;
    for (const die of yatzyDie) {
        holding = die.hold;
    }

    if(!holding){frequen = [0, 0, 0, 0, 0, 0, 0]}


    for (i of yatzyDie) {
        for (j in frequen) {
            if (i.value == j) {
                frequen[j]++
            }
        }
    }
}




function sameValuePoint(dieFace) {
    
    roll = frequen[dieFace]
    return roll * dieFace

}

function onePairPoints() {
    
    roll = 0

    for (i in frequen) {
        if (frequen[i] >= 2) {
            roll = i * 2
        }
    }
    return roll
}

function twoPairPoints() {
    
    roll2 = 0
    roll3 = 0

    for (i in frequen) {
        if (frequen[i] >= 2 && roll3 == 0) {
            roll3 = i * 2
        } else if (frequen[i] >= 2) {
            roll2 = i * 2
        }
    }

    roll = roll2 + roll3

    if (roll2 == 0 || roll3 == 0) {
        roll = 0
    }

    return roll
}

function threeSamePoints() {
    roll = 0

    for (i in frequen) {
        if (frequen[i] >= 3) {
            roll = i * 3
        }
    }

    return roll
}

function fourSamePoints() {
    roll = 0

    for (i in frequen) {
        if (frequen[i] >= 4) {
            roll = i * 4
        }
    }

    return roll
}

function fullHousePoints() {
    roll2 = 0
    roll3 = 0

    for (i in frequen) {
        if (frequen[i] == 3) {
            roll3 = i * 3
        } else if (frequen[i] == 2) {
            roll2 = i * 2
        }
    }

    roll = roll2 + roll3

    if (roll2 == 0 || roll3 == 0) {
        roll = 0
    }

    return roll
}

function smallStraightPoints() {
    roll = 0

    for (i = 1; i < frequen.length - 1; i++) {
        if (frequen[i] == 1) {
            roll = roll + i
        } else {
            roll = 0
            break
        }
    }

    return roll
}

function largeStraightPoints() {
    roll = 0

    for (i = 2; i < frequen.length; i++) {
        if (frequen[i] == 1) {
            roll = roll + i
        } else {
            roll = 0
            break
        }
    }

    return roll
}

function chancePoints() {
    points = 0

    for (i of yatzyDie) {
        points += i.value
    }

    return points
}

function yatzyPoints() {
    roll = 0

    for (i in frequen) {
    
        if (frequen[i] == 5) {
            roll = 50
        }
    }

    return roll
}

function showResults() {

    let resultater = results()

    for(i = 0; i < resultater.length; i++) {
        let item = document.getElementById('p'+(i+1))
        if(item.style.opacity != 0.2){
            item.innerHTML = resultater[i]
        }
    }
}

//--------------------------------EVENTLISTENER'S------------------------------------------------

let checkedArray = document.querySelectorAll('.cb')

checkedArray.forEach(cb => {
    cb.addEventListener("click",(event) => updateHold(event))
})


let rollBtn = document.getElementById("rollBtn")
rollBtn.addEventListener("click", () => throwDice())


for(i = 0; i < 15; i++) {
    document.getElementById('p'+(i+1)).addEventListener('click', (event)=>{
        let total = parseInt(document.getElementById('p18').innerHTML)
        let add = parseInt(event.currentTarget.innerHTML);
        document.getElementById('p18').innerHTML = total+add;
        event.currentTarget.style.opacity = 0.2;
        for(i = 0; i < 15; i++) {
            document.getElementById('p'+(i+1)).disabled = true;
        }
    })

}

//-------------------------------------END GAME---------------------------------------


