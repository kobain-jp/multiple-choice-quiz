### 前回までのあらすじ

選択肢クイズをつくったが、一問表示して、クリックすると正解、不正解がでるところまで

ファイル構成

```
mcquiz-easy
- index.html
- app.js
- app.css
```

index.html

```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>quiz</title>
    <link rel="stylesheet" href="app.css">
</head>

<body>

    <div id="question"></div>
    <div id="choices"></div>

    <script src="app.js"></script>
</body>

</html>
```

app.js

```
var question = "javascriptがjavaとついている理由は？";
var choices = [
  "jvmで動くから",
  "javaと全く同じ構文で動くから",
  "当時Javaが流行っていたから",
];
var correctIdx = 2;
var commentary =
  "Java is to JavaScript as Car is to Carpetと言われていれるぐらいjavaとjavascriptは違います。";

const questionElement = document.getElementById("question");
questionElement.innerHTML = question;

const choicesElement = document.getElementById("choices");

choices.forEach(function (choice) {
  var inputElement = document.createElement("input");
  inputElement.setAttribute("type", "button");
  inputElement.setAttribute("value", choice);
  inputElement.addEventListener("click", answer);

  choicesElement.appendChild(inputElement);
});

function answer(e) {
  if (choices[correctIdx] === e.target.value) {
    alert("OK");
    alert(commentary);
  } else {
    alert("NG");
    e.target.remove();
  }
}

```

app.css

```
html{
    height: 100%;
}

body{
    background: linear-gradient(45deg, #005BAC, #5EC2C6); color: white;
 }

```

### 描画ロジックをまとめてメソッド抽出しよう

html をデータなどから作成、更新するメソッドは renderXXX と命名します。

app.js

```
// view logic
function render() {
  // 問題分
  questionElement.innerHTML = question;
  // 選択肢
  choices.forEach(function (choice) {
    var inputElement = document.createElement("input");
    inputElement.setAttribute("type", "button");
    inputElement.setAttribute("value", choice);
    inputElement.addEventListener("click", answer);

    choicesElement.appendChild(inputElement);
  });
}

```

### 正解した次の問題へロジック実装しよう

次の問題へのロジックの流れは（新しい問題のデータをセットする -> 描画ロジックを呼ぶ）

app.js

```
function nextQuestion() {
  // 新しい問題のデータをセットする
  question = "Nirvanaのカートコバーンのコバーンの正しい発音に近いのはどれ";
  choices = ["コベイン", "ケバーン", "コバン", "コバーン"];
  correctIdx = 0;
  commentary = "本人のインタビューでクゥアートコベインと言っていました。";

  // 描画ロジックを呼ぶ
  render();
}

```

F12 でコンソールから nextQuestion 読んでみる

選択肢が重複してしまうので、render ロジックにクリアロジックを入れる
app.js

```
function render() {
  questionElement.innerHTML = question;
+ choicesElement.textContent = "";
  choices.forEach(function (choice) {
    var inputElement = document.createElement("input");
    inputElement.setAttribute("type", "button");
    inputElement.setAttribute("value", choice);
    inputElement.addEventListener("click", answer);

    choicesElement.appendChild(inputElement);
  });
}

```

innerHTML = "" よりも　 textContent = "" の方が高速

ちなみに
innerHTML = ”XXX”よりも　 insertAdjacentHTML("beforebegin","XXXX") の方が高速

https://qiita.com/amamamaou/items/624c22adec32515e863b

正解したら次のロジックを呼び出そう

app.js

```
// controller logic
function answer(e) {
  if (choices[correctIdx] === e.target.value) {
    alert("OK");
    alert(commentary);
 +  nextQuestion();
  } else {
    alert("NG");
    e.target.remove();
  }
}
```

### 複数問題にしよう

今回読み込む data.json ファイルを app.js と同じ階層に作成しよう

data.json

```
[
    {
        "question": "バックトゥザフューチャーシリーズに出演していない人は誰？",
        "choices": [
            "フリー(レッチリのベーシスト)",
            "イライジャ・ウッド(ロードオブザリングの主人公役)",
            "ドナルド・トランプ(元アメリカ大統領)"
        ],
        "correctIdx": 2,
        "commentary": "ビフのモデルはトランプ大統領だが、本人は出演していない。\nフリーはマーティの同級生のニードルス、イライジャは2のカフェ80で出演しています。"
    },
    {
        "question": "中国語でLoginはどれ",
        "choices": [
            "登录",
            "注册",
            "忘记密码"
        ],
        "correctIdx": 0,
        "commentary": "登录はSign upみたいですがLoginです。\nSign upは注册。\n忘记密码はログインページに必ずあるあれです。"
    },
    {
        "question": "栃木県宇都宮市と関係ないものはどれ？",
        "choices": [
            "餃子",
            "焼きそば",
            "干し芋",
            "レモン牛乳",
            "大谷石地下採掘場跡"
        ],
        "correctIdx": 2,
        "commentary": "餃子は正嗣、焼きそばは石田屋がおすすめです。\n運動会の思い出はレモン牛乳です。\n大谷石地下採掘場跡はまるでドラクエの洞窟"
    }
]
```

### クイズを配列にしよう

app.js

```
//問題リスト
var quizList = [
  {
    question: "javascriptがjavaとついている理由は？",
    choices: [
      "jvmで動くから",
      "javaと全く同じ構文で動くから",
      "当時Javaが流行っていたから",
    ],
    correctIdx: 2,
    commentary:
      "Java is to JavaScript as Car is to Carpetと言われていれるぐらいjavaとjavascriptは違います。",
  },
  {
    question: "javascriptがjavaとついている理由は？2",
    choices: [
      "jvmで動くから2",
      "javaと全く同じ構文で動くから2",
      "当時Javaが流行っていたから2",
    ],
    correctIdx: 2,
    commentary:
      "Java is to JavaScript as Car is to Carpetと言われていれるぐらいjavaとjavascriptは違います。2",
  },
];

// 最初に入れていたものを初期化
var question = "";
var choices = [];
var correctIdx = -1;
var commentary = "";

```

次の問題を配列からとろう

app.js

```
function nextQuestion() {
  var quiz = quizList.shift();
  // setdata
  question = quiz.question;
  choices = quiz.choices;
  correctIdx = quiz.correctIdx;
  commentary = quiz.commentary;

  // render
  render();
}

//初期化時に呼ぶ
nextQuestion();
```

### データをロードするメソッドを作成しよう

ajax ロジックを簡単にやるために、jQuery を include しよう。
ちなみに最近の流行りは axios や fetchapi ですが。。。。

index.html

```

  <script src="https://code.jquery.com/jquery-3.5.1.js"
        integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>
　<script src="app.js"></script>

```

app.js

```

jQuery
  .ajax({
    url: "./data.json",
    type: "GET",
    dataType: "json",
  })
  .done((data) => {
    quizList = data;
    nextQuestion(); // 初期化時のnextQuestionを移動
  });

```

データロードと描画を分けよう少しリファクタリングしよう

app.js

```

function loadQuizList(onSuccessCallback) {
  jQuery
    .ajax({
      url: "./data.json",
      type: "GET",
      dataType: "json",
    })
    .done(function(data){
      quizList = data;
      onSuccessCallback();
    });
}

loadQuizList(nextQuestion);

```

非同期ロジックを体験しよう

```

function loadQuizList(onSuccessCallback) {
  jQuery
    .ajax({
      url: "./data.json",
      type: "GET",
      dataType: "json",
    })
    .done(function(data){
      quizList = data;
      onSuccessCallback();
      console.log("A");
    });
    console.log("B");
}

loadQuizList(nextQuestion);
console.log("C");

```

さぁ、どう表示されるでしょうか？いつもの感覚だと ABC かな？

正解はコンソールで確かめましょう。ajax は非同期ロジックなので、処理は先にいってしまいます。
なので、BCA!!

callback を引数にわたさずに＄ Defferd を使った書き方

```
function loadQuizList() {
  var deferred = new $.Deferred();
  jQuery
    .ajax({
      url: "./data.json",
      type: "GET",
      dataType: "json",
    })
    .done((data) => {
      quizList = data;
      deferred.resolve();
      console.log("A");
    });
  console.log("B");
  return deferred.promise();
}

loadQuizList().done(nextQuestion);

```

プロダクトコードのときは fail も実装してくださいね。

### 問題がなければおしまいと出して、リロードする。

app.js
```
// controller 
function nextQuestion(){

    if(quizList.length === 0){
        alert("おしまい");
        window.location.reload();
    }

    // 新しい問題のデータをセットする
    var quiz = quizList.shift();
    // setCurrentData
    question = quiz.question;
    choices = quiz.choices;
    correctIdx = quiz.correctIdx;
    commentary = quiz.commentary;

    //　描画ロジックを呼ぶ
    render();
}
```

完成！！
