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
let voc = [];
let day_for_now = 0;
//  lang_dir = 'uz-to-eng';
let date_;
let year_;
let month_;
let day_;
let day_week_;
let answer = {
    correct: 0,
    incorrect: 0,
    unselect: 0
};
let col = {
    r: 0,
    g: 0,
    b: 0
};

//SearchList();
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
    document.getElementById('search-l').style = "display: flex;";
    document.getElementById('search-panel').style = "display: flex;";
    document.getElementById('word-l').style = "display: none;"; 
    document.getElementById('quize-l').style = "display: none;";
    document.getElementById('test-indicator').style = "display: none;";
    WordsList();   
}

function WordList() {
    document.getElementById('search-l').style = "display: none;"
    document.getElementById('search-panel').style = "display: none;"
    document.getElementById('quize-l').style = "display: none;" 
    document.getElementById('word-l').style = "display: flex;"   
    document.getElementById('test-indicator').style = "display: flex;"   
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
    if (choise_ === 'all') {
        voc = [];
        for (let i = 0; i < vocabulary.length; i++) {
            voc.push({
                eng: vocabulary[i].eng,
                uzb: vocabulary[i].uzb,
              });
        }
    } {
        voc = [];
        for (let i = 0; i < vocabulary.length; i++) {
            if (vocabulary[i].data === day_for_ch(choise_)) {
                voc.push({
                    eng: vocabulary[i].eng,
                    uzb: vocabulary[i].uzb,
                  });
            }
        }
    }
    answer.correct = 0;
    answer.incorrect = 0;
    answer.unselect = 0;
    Test();
}

function Timer_Start() {
    timer_time = 50;
    id_ = setInterval( () => {
        timer_time--;
        if (timer_time <= 0 ) {
            Selected(0);
            clearInterval(id_);
            document.getElementById('timer-line').style = 
            `width: 100%;`;
        }
        col.b = 0;
        col.r = 255 - (timer_time * 4);
        col.g = timer_time * 4 + 5;
        document.getElementById('timer-line').style = 
        `width: calc(1vw*${60*timer_time/50});
        background-color: rgb(${col.r}, ${col.g}, ${col.b});
        `;
    },100)
}

function Test() {
    Timer_Start();
    tested++;
    num_of_t = 10;
    if (tested <= num_of_t) {
        RanNum = Math.floor(Math.random() * voc.length);
        document.getElementById('eng-word').innerHTML = voc[RanNum].eng;
        RightAnswer = Math.floor(Math.random() * 4) + 1;
        RanNum_1 = RanNum;
        RanNum_2 = RanNum;
        RanNum_3 = RanNum;
        RanNum_4 = RanNum;
        while (RanNum === RanNum_1) {
            RanNum_1 = Math.floor(Math.random() * voc.length);
        }
        while (RanNum === RanNum_2 || RanNum_1 === RanNum_2) {
            RanNum_2 = Math.floor(Math.random() * voc.length);
        }
        while (RanNum === RanNum_3 || RanNum_1 === RanNum_3 
                || RanNum_2 === RanNum_3) {
            RanNum_3 = Math.floor(Math.random() * voc.length);
        }
        while (RanNum === RanNum_4 || RanNum_1 === RanNum_4 
                || RanNum_2 === RanNum_4 || RanNum_3 === RanNum_4) {
            RanNum_4 = Math.floor(Math.random() * voc.length);
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


        document.getElementById(`option_1`).innerHTML = ArrToStr(voc[RanNum_1].uzb);    
        document.getElementById(`option_2`).innerHTML = ArrToStr(voc[RanNum_2].uzb); 
        document.getElementById(`option_3`).innerHTML = ArrToStr(voc[RanNum_3].uzb);    
        document.getElementById(`option_4`).innerHTML = ArrToStr(voc[RanNum_4].uzb);    
    } else {
        alert(`Correct: ${answer.correct}\nIn-correct: ${answer.incorrect}\nUn-selected: ${answer.unselect}`);
        WordList();
    }
}

// 
function ArrToStr(obj_) {
    str_ = '';
    for (let i = 0; i < obj_.length; i++) {
        str_ += obj_[i];

        if (i !== obj_.length - 1) {
            str_ += ', ';
        }
    }   
    return str_;
}

function Selected(num_) {
    clearInterval(id_);
    if (num_ === RightAnswer) {
        document.getElementById(`option_${num_}`).style = "background-color: green;";
        answer.correct++;
    } else if (num_ !== RightAnswer && num_ !== 0) {
        document.getElementById(`option_${num_}`).style = "background-color: red;";
        document.getElementById(`option_${RightAnswer}`).style = "background-color: green;";
        answer.incorrect++;
    } else if (num_ === 0) {
        document.getElementById(`option_${RightAnswer}`).style = "background-color: green;";
        answer.unselect++;
    }
    id = setInterval( () => {
        if (num_ !== 0) {
            document.getElementById(`option_${num_}`).style = "background-color: violet;";
        }
        document.getElementById(`option_${RightAnswer}`).style = "background-color: violet;";
        Test();
        clearInterval(id);
    },750)
}

function day_for_ch(str_) {
    DetectDate();
    day_for_now = 0;
    day_for_now += day_;
    if (month_ === 1) {
        day_for_now += 31;
    } else if (month_ === 2) {
        day_for_now += 60;
    }
    if (str_ === 'today') {
        day_for_now = day_for_now;
    } else if (str_ === 'yesterday') {
        day_for_now--;
    }
    console.log('--'+day_for_now);

    return day_for_now;
}

function DetectDate() {
    date_ = new Date();
    year_ = date_.getFullYear();
    month_ = date_.getMonth();
    day_ = date_.getDate();
    day_week_ = date_.getDay();
}

console.log(day_for_ch('today'));