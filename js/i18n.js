const i18n = {
    "en": {
        "generateRomaji": "Generate Romaji",
        "showHiragana": "Show Hiragana",
        "showKatakana": "Show Katakana",
    },
    "zh": {
        "generateRomaji": "乱序生成罗马音",
        "showHiragana": "显示平假名",
        "showKatakana": "显示片假名",
    }
}

function translate() {
    // detect language
    var lang = navigator.languages
        ? navigator.languages[0]
        : navigator.language;
    
    lang = lang.substr(0, 2);
    
    // get translation resource
    var translation = i18n[lang];

    // get all i18n fields
    var elements = document.getElementsByClassName("i18n");
    for(var i = 0; i < elements.length; i++) {
        elements[i].innerHTML = translation[elements[i].getAttribute("content")] || "Fix me!";
    }

}