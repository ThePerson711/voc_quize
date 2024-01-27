console.log('fsa');
console.log(window.innerWidth);
console.log(window.innerHeight);
console.table(vocabulary[0]);

let inp_s = '';
let uzb_s = '';
let s = '';
let list;
let list1;
let let_leng = 120;
list = document.getElementById('main-panel');
list1 = document.getElementById('main-panel-1');
let lang_dir = 'eng-to-uz';
let tested = 0;
//  lang_dir = 'uz-to-eng';

WordList();
WordChoise('all');

function WordsList() {
    inp_s = document.getElementById('search-input').value;
    list.innerHTML='';
    vocabulary.forEach(element => {
        if (inp_s === '') {
            uzb_s = '';
            element.uzb.forEach(elem => {
                uzb_s += (elem + ', ');
            });
            if (uzb_s.length <= let_leng) {
                s = uzb_s;
            } else {
                s = uzb_s.substr(0,let_leng) + '...';
            }
            list.innerHTML +=`
            <div class="lines">
                <p>${element.eng}-${s}</p>
            </div>
            `;
        } else {
            if (lang_dir === 'eng-to-uz') {
                if ( (element.eng).substr(0,inp_s.length) === inp_s) {
                    list.innerHTML +=`<div class="lines">
                       <p><u>${(element.eng).substr(0,inp_s.length)}</u>${element.eng.substr(inp_s.length)}
                        - ${element.uzb}       </p>
                    </div>`;
                }
            } else if (lang_dir === 'uz-to-eng') {
                (element.uzb).forEach(elem => {
                    if ( (elem).substr(0,inp_s.length) === inp_s) {
                        list.innerHTML +=`<div class="lines">

                        <p>${element.eng} - <u>${elem.substr(0,inp_s.length)}</u>${elem.substr(inp_s.length)}
                        </p>
                        </div>`;

                        //                            ${element.eng} - ${element.uzb}

                    }
                });
            }
        }
    });
}

function SearchList() {
    document.getElementById('search-l').style = "display: flex;"
    document.getElementById('search-panel').style = "display: flex;"
    document.getElementById('word-l').style = "display: none;" 
    document.getElementById('quize-l').style = "display: none;" 
    WordsList();   
}

function WordList() {
    document.getElementById('search-l').style = "display: none;"
    document.getElementById('search-panel').style = "display: none;"
    document.getElementById('quize-l').style = "display: none;" 
    document.getElementById('word-l').style = "display: flex;"    
    Words();
}

function Words() {
    list1.innerHTML=``;
    list1.innerHTML+=`<div class="lines" onclick="WordChoise('all');">All</div>`;
    list1.innerHTML+=`<div class="lines" onclick="WordChoise('today');">Today</div>`;
    list1.innerHTML+=`<div class="lines" onclick="WordChoise('yesterday');">Yesterday</div>`;
    list1.innerHTML+=`<div class="lines" onclick="WordChoise('special');">Special</div>`;
}

function WordChoise(choise_) {
    document.getElementById('word-l').style = "display: none;"
    document.getElementById('quize-l').style = "display: flex;"    
    tested = 0;
    Test();
}

function Test() {

    tested++;
    if (tested <= 10) {
        RanNum = Math.floor(Math.random() * vocabulary.length);
        document.getElementById('eng-word').innerHTML = vocabulary[RanNum].eng;
        RightAnswer = Math.floor(Math.random() * 4) + 1;
        RanNum_1 = RanNum;
        RanNum_2 = RanNum;
        RanNum_3 = RanNum;
        RanNum_4 = RanNum;
        while (RanNum === RanNum_1) {
            RanNum_1 = Math.floor(Math.random() * vocabulary.length);
        }
        while (RanNum === RanNum_2 || RanNum_1 === RanNum_2) {
            RanNum_2 = Math.floor(Math.random() * vocabulary.length);
        }
        while (RanNum === RanNum_3 || RanNum_1 === RanNum_3 
                || RanNum_2 === RanNum_3) {
            RanNum_3 = Math.floor(Math.random() * vocabulary.length);
        }
        while (RanNum === RanNum_4 || RanNum_1 === RanNum_4 
                || RanNum_2 === RanNum_4 || RanNum_3 === RanNum_4) {
            RanNum_4 = Math.floor(Math.random() * vocabulary.length);
        }
            
        if (RightAnswer === 1) {
            RanNum_1 = RanNum;
        } else if (RightAnswer === 2) {
            RanNum_2 = RanNum;
        }
        else if (RightAnswer === 3) {
            RanNum_3 = RanNum;
        }
        else if (RightAnswer === 4) {
            RanNum_4 = RanNum;
        }


        document.getElementById(`option_1`).innerHTML = vocabulary[RanNum_1].uzb;    
        document.getElementById(`option_2`).innerHTML = vocabulary[RanNum_2].uzb;    
        document.getElementById(`option_3`).innerHTML = vocabulary[RanNum_3].uzb;    
        document.getElementById(`option_4`).innerHTML = vocabulary[RanNum_4].uzb;    
    } else {
        alert('fucj');
        WordList();
    }
}


function Selected(num_) {
    if (num_ === RightAnswer) {
        document.getElementById(`option_${num_}`).style = "background-color: green;";
    } else {
        document.getElementById(`option_${num_}`).style = "background-color: red;";
    }
    id = setInterval( () => {
        document.getElementById(`option_${num_}`).style = "background-color: violet;";
        Test();
        clearInterval(id);
    },1000)
}