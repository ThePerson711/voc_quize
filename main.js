// -------------------------------------
// -------------------------------------
// -------------------------------------
// Const
//
const list_addword = document.getElementById("list_addword");
const list_listword = document.getElementById("list_listword");
const list_testword = document.getElementById("list_testword");
const find_list_div = document.getElementById("find_list_div");
const test_question = document.getElementById("test_question");
const test_answer = document.getElementById("test_answer");
const test_check_panel = document.getElementById("test_check_panel");
// -------------------------------------
// -------------------------------------
// -------------------------------------
// let
//
let CurentListNum = 2;
let ListOfWords = [];
if (localStorage.getItem("ListOfWordsInStorage") !== null) {
  ListOfWords = JSON.parse(localStorage.getItem("ListOfWordsInStorage"))
}
let searched_now = "eng_to_uzb";
let ListOfsearched = [];
let NumOfTests = 10;
let SolvedTests = 0;
let ArForTest = [];
let CurentInd = 0;

    // delete >>
    SearchForList("");
// -------------------------------------
// -------------------------------------
// -------------------------------------
// addEventListener
//
document.getElementById("menu_addword").addEventListener("click", () => {
  CurentListNum = 1;
  ChangeList();
});
document.getElementById("menu_listword").addEventListener("click", () => {
  CurentListNum = 2;
  ChangeList();
  SearchForList("");
});
document.getElementById("menu_testword").addEventListener("click", () => {
  CurentListNum = 3;
  ChangeList();
  StartTest("card", 738880);
});
//
document.getElementById("addword_btn_add").addEventListener("click", () => {
  if (document.getElementById("addword_inp_eng_text").value !== "" &&
  document.getElementById("addword_inp_uzb_text").value !== "") {
    AddNewWordToList(
      (document.getElementById("addword_inp_eng_text").value),
      (document.getElementById("addword_inp_uzb_text").value),
      (DetermineCurentData())
    )
  }
  console.table(ListOfWords);
});
//
document.getElementById("search_inp").addEventListener("input", () => {
  SearchForList(document.getElementById("search_inp").value);
});
//
document.getElementById("change_search_lang").addEventListener("click", () => {
  if (searched_now === "eng_to_uzb") {
    document.getElementById("change_search_lang").innerHTML = 
      "uzb >> eng";
    searched_now = "uzb_to_eng";
  } else {
    document.getElementById("change_search_lang").innerHTML = 
      "eng >> uzb";
      searched_now = "eng_to_uzb";
  }
  SearchForList(document.getElementById("search_inp").value);
});
//
document.getElementById("test_check_true").addEventListener("click", () => {
  TestCheched(true);
});
document.getElementById("test_check_false").addEventListener("click", () => {
  TestCheched(false);
});
//
test_question.addEventListener("click", () => {
  TestOcation("answer");
});


// -------------------------------------
// -------------------------------------
// -------------------------------------
// do function
//
ChangeList();

//
// functions 
//
function ChangeList() {
  list_addword.style = 
    `transform: translateX(${(-CurentListNum+1)*100-50}%);`;
  list_listword.style = 
    `transform: translateX(${(-CurentListNum+2)*100-50}%);`;
  list_testword.style = 
    `transform: translateX(${(-CurentListNum+3)*100-50}%);`;
}
//
function DetermineCurentData() {
  const currentDate = new Date();
  //console.log("year", currentDate);
  //console.log("year", currentDate.getFullYear());
  //console.log("month", currentDate.getMonth()+1);
  //console.log("day", currentDate.getDate());
  //console.log("week d", currentDate.getDay());
  CurentDate = ((currentDate.getFullYear())*365) + 
    ((currentDate.getMonth()+1)*31) +
    (currentDate.getDate());
  //console.log("C D", CurentDate);
  return CurentDate;
}
//
function AddNewWordToList(eng_, uzb_, date_) {
  ind_f_ = ListOfWords.length;
  ListOfWords.push({
    ind: ind_f_,
    eng: eng_,
    uzb: uzb_,
    date: date_,
    err: 0,
    tru: 0,
    e_t: 0,
    chec: 0
  });
  SetDataToLS();
}
//
function SetDataToLS() {
  localStorage.setItem("ListOfWordsInStorage", 
    JSON.stringify(ListOfWords));
}
//
function SearchForList(search_) {
  ListOfsearched = [];
  if (searched_now === "eng_to_uzb") {
    ListOfWords.forEach(element => {
      if(FilterStr(search_ ,element.eng)) {
        ListOfsearched.push(element);
      }
    });
  }
  if (searched_now === "uzb_to_eng") {
    ListOfWords.forEach(element => {
      if(FilterStr(search_ ,element.uzb)) {
        ListOfsearched.push(element);
      }
    });
  }
  find_list_div.innerHTML = "";
  ListOfsearched.forEach(element => {
    CreateDivInsideList(element);
  });
}
//
function FilterStr(s_to_, s_from_) {
  answer_ = false;
  if (s_to_ === "") {
    answer_ = true;
  } else {
    for (let ind_i = 0; ind_i < s_from_.length; ind_i++) {
      if (s_from_.substr(ind_i, s_to_.length) === s_to_) {
        answer_ = true;
      }
    }
  }
  return answer_;
}
//
function CreateDivInsideList(element_) {
  find_list_div.innerHTML+=
    `          <div class="find_inner_div">
    <p>${element_.eng} - ${element_.uzb}</p>
  </div>`;
}
//
function StartTest(type_, date_) {
  SolvedTests = 0;
  if (type_ === "card") {
    console.log(type_, date_);
    ArForTest = [];
    ListOfWords.forEach(element => {
      if (element.date === date_) {
        ArForTest.push(element);
      }
    });
    CardTestAsk();
  }
}
//
function CardTestAsk() {
  SolvedTests++;
  if (SolvedTests > NumOfTests) {
    console.log("end::");
    StartTest("card", 738880);
  } else {
    RanNum = Math.floor(Math.random() * ArForTest.length);
    elem = ArForTest[RanNum];
    CurentInd = elem.ind;
    test_question.innerHTML = elem.eng;
    test_answer.innerHTML = elem.uzb;
    TestOcation("question");
  }
}
//
function TestCheched(bool_) {
  if (bool_) {
    ListOfWords[CurentInd].tru++;
  } else {
    ListOfWords[CurentInd].err++;
  }
  console.log("id:",CurentInd, 
    "; err:",ListOfWords[CurentInd].err, 
    "; tru:",ListOfWords[CurentInd].tru)
  SetDataToLS();
  CardTestAsk();
}
//
function TestOcation(ocation_) {
  if (ocation_ === "answer") {
    test_answer.style = "position: relative;";
    test_question.style = "position: relative;";
    test_check_panel.style = `justify-content: space-between; background-color: aqua;`;

  } else {
    test_answer.style = "position: absolute;";
    test_question.style = "position: absolute;";
    test_check_panel.style = `justify-content: center; background-color: transparent;`;
  }
}



