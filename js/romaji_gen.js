const gojuon = [
    [["a","あ","ア"],["i","い","イ"],["u","う","ウ"],["e","え","エ"],["o","お","オ"]],
    [["ka","か","カ"],["ki","き","キ"],["ku","く","ク"],["ke","け","ケ"],["ko","こ","コ"]],
    [["sa","さ","サ"],["shi","し","シ"],["su","す","ス"],["se","せ","セ"],["so","そ","ソ"]],
    [["ta","た","タ"],["chi","ち","チ"],["tsu","つ","ツ"],["te","て","テ"],["to","と","ト"]],
    [["na","な","ナ"],["ni","に","ニ"],["nu","ぬ","ヌ"],["ne","ね","ネ"],["no","の","ノ"]],
    [["ha","は","ハ"],["hi","ひ","ヒ"],["fu","ふ","フ"],["he","へ","ヘ"],["ho","ほ","ホ"]],
    [["ma","ま","マ"],["mi","み","ミ"],["mu","む","ム"],["me","め","メ"],["mo","も","モ"]],
    [["ya","や","ヤ"],["yu","ゆ","ユ"],["yo","よ","ヨ"]],
    [["ra","ら","ラ"],["ri","り","リ"],["ru","る","ル"],["re","れ","レ"],["ro","ろ","ロ"]],
    [["wa","わ","ワ"],["wo","を","ヲ"]],
    [["n", "ん","ン"]]
];

const i18n = {
    "en": {
        "gojuonPractice": "Gojuon Practice",
        "generateRomaji": "Generate Romaji",
        "showHiragana": "Show Hiragana",
        "showKatakana": "Show Katakana",
        "romaji": "Romaji",
        "hiragana": "Hiragana",
        "katakana": "Katakana"
    },
    "zh": {
        "gojuonPractice": "五十音图练习",
        "generateRomaji": "生成罗马音",
        "showHiragana": "显示平假名",
        "showKatakana": "显示片假名",
        "romaji": "罗马音",
        "hiragana": "平假名",
        "katakana": "片假名"
    }
}

function generateRomaji() {
    var select = []; // store selected rows

    // Loop through checkboxes to find all the selected rows
    var checkboxStatus = getCheckboxStatus();
    
    for (var i = 0; i < checkboxStatus.length; i++) {
        if (checkboxStatus[i] == 1) {
            select.push(i + 1);
        }
    }

    var selectedList = [];
    var romaji = [];
    var hiragana = [];
    
    // Grab all selected romaji from gojuon
    for(i = 0; i < select.length; i++) {
        for(j = 0; j < gojuon[select[i] - 1].length; j++) {
            selectedList.push(gojuon[select[i] - 1][j]);
        }
    }

    // Perform in-place shuffle
    shuffleArray(selectedList);

    // Split romaji and hiragana
    for(i = 0; i < selectedList.length; i++) {
        romaji.push(selectedList[i][0]);
        hiragana.push(selectedList[i][1]);
    }

    // Generate table
    var table = document.querySelector("table");
    table.textContent = "";
    generateTable(table, selectedList);
    generateTableHead(table,
        [
            ["romaji", "romaji"],
            ["hiragana", "hiragana"],
            ["katakana", "katakana"],
        ]
    );

    
    // Hide so that you don't get to see the answer
    hideCol("hiragana");
    hideCol("katakana");
}

function hideCol(className) {
    var elements = document.getElementsByClassName(className);
    for(var i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
    }
}

function showCol(className) {
    var elements = document.getElementsByClassName(className);
    for(var i = 0; i < elements.length; i++) {
        elements[i].style.display = "";
    }
}

function getCheckboxStatus() {
    var status = [];
    var checkboxes = document.getElementsByName("checkbox");
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            status.push(1);
        }
        else {
            status.push(0);
        }
    }
    return status;
}

function setCheckboxStatus(checkboxStatus) {
    var checkboxes = document.getElementsByName("checkbox");
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxStatus[i] == 1) {
            checkboxes[i].checked = true;
        }
    }
}

function saveCheckboxVal() {
    var checkboxStatus = getCheckboxStatus();
    setCookie("checkboxStatus", JSON.stringify(checkboxStatus), 1000);
    console.log("saveCheckboxVal()", checkboxStatus)
}

function loadCheckboxVal() {
    var res = getCookie("checkboxStatus");
    if (res != "") {
        var checkboxStatus = JSON.parse(res);
        setCheckboxStatus(checkboxStatus);
        console.log("loadCheckboxVal()", checkboxStatus)
    }
}

// Durstenfeld shuffle (in-place)
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


// Table Generator
// https://www.valentinog.com/blog/html-table/
function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(translate(key[0]));
        th.appendChild(text);
        th.className = key[1];
        row.appendChild(th);
    }
}
  
function generateTable(table, data) {
    for (var i = 0; i < data.length; i++) {
        let row = table.insertRow();
        for (var j = 0; j < data[i].length; j++) {
            let cell = row.insertCell();
            let text = document.createTextNode(data[i][j]);
            cell.appendChild(text);
            if(j == 0) cell.className = "romaji";
            else if(j == 1) cell.className = "hiragana";
            else if(j == 2) cell.className = "katakana";
            if (i % 10 > 4) cell.classList.add("grey");
        }
    }
}

// Cookie setter and getter
// https://www.w3schools.com/js/js_cookies.asp
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function detectLanguge() {
    var lang = navigator.languages
        ? navigator.languages[0]
        : navigator.language;
    
    lang = lang.substr(0, 2);
    return lang in i18n ? lang : "en";
}

function translateAll() {
    var lang = detectLanguge();
    
    // get translation resource
    var translation = i18n[lang];

    // get all i18n fields
    var elements = document.getElementsByClassName("i18n")
    for(var i = 0; i < elements.length; i++) {
        elements[i].innerHTML = translation[elements[i].getAttribute("content")] || "Fix me!";
        console.log(elements[i].innerHTML);
    }
}

function translate(content) {
    var lang = detectLanguge();
    return i18n[lang][content];
}