let current = 1;
let current_answer = -1;
let questions = [ // dinamisks jautājumu saraksts, viegli pievienot jaunus.
    {
        q: "Kāda ir Latvijas galvas pilsēta?",
        a: ["Rīga", "Jelgava", "Daugavpils", "Liepāja"],
        c: 1
    },
    {
        q: "Kura ir tuvākā planēta pie saules?",
        a: ["Zeme", "Venēra", "Merkūrs", "Mars"],
        c: 3
    },
    {
        q: "Kurā gadā notika pirmā cilvēka izkāpšana uz Mēness?",
        a: ["1984", "1969", "1975", "1956"],
        c: 2
    },
    {
        q: "Kura ir pasaulē mazākā valsts",
        a: ["Monako", "Nauru", "Vatikāns", "Tuvalu"],
        c: 3
    },
    {
        q: "Kura ir pasaulē lielākā valsts",
        a: ["Kanāda", "Krievija", "Ķīna", "ASV"],
        c: 2
    },

    {
        q: "Kurš ir cilvēka lielākais orgāns",
        a: ["Āda", "Akna", "Sirds", "Plaušas"],
        c: 1
    },

    {
        q: "Kas ir trešā planēta no saules",
        a: ["Mars", "Venēra", "Merkūrs", "Zeme"],
        c: 4
    },

    {
        q: "Kurš ir lielākais okeāns",
        a: ["Atlantijas", "Koraļu", "Indijas", "Klusais"],
        c: 4
    },

    {
        q: "Kurš ir lielākais kontinents",
        a: ["Eiropa", "Austrālija", "Āzija", "Ziemeļamerika"],
        c: 3
    },

    {
        q: "Kurš ir lielākais ezers pasaulē",
        a: ["Kaspijas", "Miklavs", "Ķīnas ezers", "Meksikas ezers"],
        c: 1
    }
]

let correct = 0;
let incorrect = 0;

// Inicalizēt skaitītāju
document.getElementById("counter").innerHTML = current + "/" + questions.length;

function loadQuestion(qn){
    document.getElementById("question").innerHTML = questions[qn-1].q;
    let btns = document.getElementsByClassName("answer")
    for(let i = 0; i < btns.length; i++){
        btns[i].innerHTML = questions[qn-1].a[i];
    }
    current_answer = questions[qn-1].c;
    current = qn;
}

loadQuestion(1);

let paused = false;
function answer(btnNum){
    if (paused)
        return;

    let a1 = document.getElementById("a1");
    let a2 = document.getElementById("a2");
    let a3 = document.getElementById("a3");
    let a4 = document.getElementById("a4");
    let aBtns = [a1, a2, a3, a4];

    for(let i = 0; i < aBtns.length; i++)
        aBtns[i].style.backgroundColor = "red";
    aBtns[current_answer-1].style.backgroundColor = "green";

    if(btnNum == current_answer)
        correct++;
    else
        incorrect++;
    paused = true;

    // completion percentage 
    let percentage = Math.floor((current/questions.length) * 100);
    document.getElementById("progress").style.width = percentage + "%";

    // delay for a second before going to the next question
    setTimeout(function(){
        paused = false;
        if(current < questions.length){
            loadQuestion(current+1);
            document.getElementById("counter").innerHTML = current + "/" + questions.length;
            for(let i = 0; i < aBtns.length; i++)
                aBtns[i].style.backgroundColor = "dodgerblue";
        } else {
            document.getElementById("results").style.visibility = "visible";
            document.getElementById("results-text").innerHTML = `Tu pabeidzi quizu, pareizi atbildēji uz ${correct} jautājumiem un nepareizi uz ${incorrect} jautājumiem.`;
        }
    }, 1000);
}

function restart(){
    incorrect = 0;
    correct = 0;
    current = 1;

    loadQuestion(1);

    document.getElementById("counter").innerHTML = current + "/" + questions.length;
    document.getElementById("results").style.visibility = "collapse";

    document.getElementById("progress").style.width = "10%";

    document.getElementById("a1").style.backgroundColor = "dodgerblue";
    document.getElementById("a2").style.backgroundColor = "dodgerblue";
    document.getElementById("a3").style.backgroundColor = "dodgerblue";
    document.getElementById("a4").style.backgroundColor = "dodgerblue";
}