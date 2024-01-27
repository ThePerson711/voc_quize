console.log('fsa');
console.log(window.innerWidth);
console.log(window.innerHeight);
console.table(vocabulary[0]);

let inp_s = '';
let uzb_s = '';
let s = '';
let list;
let let_leng = 120;
list = document.getElementById('main-panel');
let lang_dir = 'eng-to-uz';
//  lang_dir = 'uz-to-eng';

WordsList();


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
    document.getElementById('word-l').style = "display: none;"    
}

function WordList() {
    document.getElementById('search-l').style = "display: none;"
    document.getElementById('word-l').style = "display: flex;"    
}