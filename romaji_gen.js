function generateRomaji() {
    const gojuon = [
        [["a","あ"],["i","い"],["u","う"],["e","え"],["o","お"]],
        [["ka","か"],["ki","き"],["ku","く"],["ke","け"],["ko","こ"]],
        [["sa","さ"],["shi","し"],["su","す"],["se","せ"],["so","そ"]],
        [["ta","た"],["chi","ち"],["tsu","つ"],["te","て"],["to","と"]],
        [["na","な"],["ni","に"],["nu","ぬ"],["ne","ね"],["no","の"]],
        [["ha","は"],["hi","ひ"],["fu","ふ"],["he","へ"],["ho","ほ"]],
        [["ma","ま"],["mi","み"],["mu","む"],["me","め"],["mo","も"]],
        [["ya","や"],["yu","ゆ"],["yo","よ"]],
        [["ra","ら"],["ri","り"],["ru","る"],["re","れ"],["ro","ろ"]],
        [["wa","わ"],["wo","を"]]
    ];

    var select = []; // store selected rows

    // Loop through checkboxes to find all the selected rows
    var checkboxes = document.getElementsByName("checkbox");
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            select.push(checkboxes[i].value);
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
    table.textContent = '';
    generateTable(table, selectedList);
    generateTableHead(table, ['romaji', 'hiragana']);
    
    // Hide so that you don't get to see the answer
    hideHiragana();
}

function hideHiragana() {
    var elements = document.getElementsByClassName("hiragana");
    for(var i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
    }
}

function showHiragana() {
    var elements = document.getElementsByClassName("hiragana");
    for(var i = 0; i < elements.length; i++) {
        elements[i].style.display = "block";
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
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}
  
function generateTable(table, data) {
    for (let element of data) {
        let row = table.insertRow();
        for (var i = 0; i < element.length; i++) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[i]);
            cell.appendChild(text);
            if(i == 0) cell.className = 'romaji';
            if(i == 1) cell.className = 'hiragana';
        }
    }
}