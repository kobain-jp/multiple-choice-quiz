# multiple-choice-quiz easy

### 必要なファイルを作成する。

```
quize-easy
-index.html
-app.js
-app.css
```

### htmlでクイズを表示しよう

index.html

```
<body>
    <div id="question">桃太郎の家来でないのはどれ</div>
    <div id="choices">
        <input type="button" value="犬">
        <input type="button" value="きじ">
        <input type="button" value="さる">
        <input type="button" value="いのしし">
    </div>
    <script src="app.js"></script>
</body>

```

### クイズのデータからクイズを表示しよう

表示するクイズのデータを定義しよう

app.js
```
// current question
let question = "javascriptがjavaとついている理由は？";　　
let choices = ["javaのようにjvm上で動くため","javaのコードをそのままかいても動くため","javaがその時流行っていたから"];
let collectIdx = 2;　 
let commentary = "Java is to JavaScript as Car is to Carpetと言われていれるぐらいjavaとjavascriptは違います。";　
```

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array

クイズの本文を表示しよう

app.js　

```
const questionElement = document.getElementById("question");
questionElement.innerHTML = question;
```

クイズの選択肢を表示しよう 動的にHTMLを作ろう

app.js

```
const inputElement = document.createElement("input"); // elementを生成
inputElement.setAttribute("type", "button");　// elementにタイプを付与
inputElement.setAttribute("value", choices[0]);　// 
choicesElement.appendChild(inputElement); // 別のelementにappend

```
document.createElement　https://developer.mozilla.org/ja/docs/Web/API/Document/createElement

element.appendChild　https://developer.mozilla.org/ja/docs/Web/API/Node/appendChild

配列のforEachを使って、配列の分選択肢を表示しよう

app.js

```
choices.forEach(function (choice, idx) {

    const inputElement = document.createElement("input");
    inputElement.setAttribute("type", "button");
    inputElement.setAttribute("value", choices[idx]);
    choicesElement.appendChild(inputElement);

});

```

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach

### 選択肢クリック時の処理を実装しよう

app.js answer関数を作成し、動的に作成したinputのクリックにひもづけよう

```
choices.forEach(function (choice, idx) {

    const inputElement = document.createElement("input");
    inputElement.setAttribute("type", "button");
+   inputElement.setAttribute("value", choices[idx]);
    inputElement.addEventListener("click", answer);
    choicesElement.appendChild(inputElement);

});

function answer(e) {
    console.log(e.target);
    console.log(e.target.value);
}
```

判断ロジックを実装しよう

正解であれば、正解　->　解説とダイアログをだす
不正解であれば、選択肢を削除する 

app.js

```
function answer(e) {
    console.log(e.target);
    console.log(e.target.value);

    if (choices[collectIdx] === e.target.value) {
        alert('正解');
        alert(commentary);
    } else {
        e.target.remove();
    }

}

描画用ロジックをひとつの関数にまとめてリファクタリングしよう
```

// current question
let question = "javascriptがjavaとついている理由は？";　　
let choices = ["javaのようにjvm上で動くため","javaのコードをそのままかいても動くため","javaがその時流行っていたから"];
let collectIdx = 2;　 
let commentary = "Java is to JavaScript as Car is to Carpeと言われていれるぐらいjavaとjavascriptは違います。";　

// set html element to variables 
const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");

function answer(e) {
    console.log(e.target);
    console.log(e.target.value);

    if (choices[collectIdx] === e.target.value) {
        alert('正解');
        alert(commentary);
    } else {
        e.target.remove();
    }

}

// view
function render() {

    questionElement.innerHTML = question;

    choicesElement.innerHTML = ""
    choices.forEach(function (choice, idx) {

        const inputElement = document.createElement("input");
        inputElement.setAttribute("type", "button");
        inputElement.setAttribute("value", choices[idx]);
        inputElement.addEventListener("click", answer);
        choicesElement.appendChild(inputElement);

    });
}

render();

```

### 正解ならば次の問題を表示しよう

クイズのデータをセットして、renderを呼ぶ関数を作成しよう

app.js
```
function nextQuestion() {
    // dataをセット
    question = "background: linear-gradientはどのような効果？";
    choices = ["背景に線形グラデーションを表示する", "背景に反復線形グラデーションを表示する"];
    collectIdx = 0;
    commentary = "background: linear-gradient(45deg, #005BAC, #5EC2C6); -> あれ、どっかでみたことあるかも";

    // 描画
    render();

}


```

正解時に呼び出そう

```
function answer(e) {
    console.log(e.target);
    console.log(e.target.value);

    if (choices[collectIdx] === e.target.value) {
        alert('正解');
        alert(commentary);
+       nextQuestion();
    } else {
        e.target.remove();
    }

}

```

### ちょっとだけ画面をととのえよう

app.css

```
body{
    background: linear-gradient(45deg, #005BAC, #5EC2C6);
    color: white;
}

input[type="button"] {
   background-image: linear-gradient(0deg, #a7d9f5, #eaf6fd); 
   border: 1px solid #3c7fb1; /* 枠線 */
   border-radius: 0.3em;   
   min-width: 200px;
}

```

階段っぽくでてしまっている。。。

```
html{
    height: 100%;
}

body{
    background: linear-gradient(45deg, #005BAC, #5EC2C6);
    color: white;
    font-size: 30px;
}

```
html heightの初期値はautoなので、ブラウザのサイズのフィットするように100%指定する。

以下は次回以降

### クイズデータを配列にしよう
### data-プロパティで正誤判断をしよう
### クイズデータをfetch api でjsonファイルから読み込もう
### 解答をボタンからリストにして、縦に並べよう
### liをボタンにみえるようにcssをいじろう




