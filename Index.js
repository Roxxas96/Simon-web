const Pannels = document.querySelectorAll('.Pannel');
const ScoreText = document.querySelector('.right');

var Sequence = [Pannels[Math.floor(Math.random() * Math.floor(4))]];
var SequenceToGess = [...Sequence];
var score = 0;
var delay = 1000;

const Flash = (Pannel) => {
    return new Promise((resolve, reject) => {
        Pannel.classList.add('active');
        setTimeout(() => {
            Pannel.classList.remove('active');

            setTimeout(() => {
                resolve();
            }, delay/4)
        }, delay)
    })
}

let CanClick = false;
const pannelClicked = (Pannel) => {
    if(!CanClick) return;
    const PannelToGess = SequenceToGess.shift();
    if(Pannel == PannelToGess){
        if(SequenceToGess.length == 0){
            score += 1;
            ScoreText.innerHTML = "Score : " + score;
            delay /= 1.1;
            Sequence.push(Pannels[Math.floor(Math.random() * Math.floor(4))])
            SequenceToGess = [...Sequence]
            main();
        }
    }else {
        alert('Game Over');
        document.location.reload();
    }
}

const main = async () => {
    CanClick = false;

    for(const Pannel of Sequence) {
        await Flash(Pannel);
    }

    CanClick = true;
}

const PlayButtonClicked = (Button) => {
    Button.classList.forEach(style => {
        Button.classList.toggle(style);
    })
    main();
}