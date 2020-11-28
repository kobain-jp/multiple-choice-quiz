import { Quiz } from './quiz';

export const MOCK_QUIZ_LIST: Quiz[] = [{
    question: "バックトゥザフューチャーシリーズに出演していない人は誰？",
    choices: [
        "フリー(レッチリのベーシスト)",
        "イライジャ・ウッド(ロードオブザリングの主人公役)",
        "ドナルド・トランプ(元アメリカ大統領)"
    ],
    correctIdx: 2,
    commentary: "ビフのモデルはトランプ大統領だが、本人は出演していない。\nフリーはマーティの同級生のニードルス、イライジャは2のカフェ80で出演しています。"
}, {
    question: "中国語でLoginはどれ",
    choices: [
        "登录",
        "注册",
        "忘记密码"
    ],
    correctIdx: 0,
    commentary: "登录はSign upみたいですがLoginです。\nSign upは注册。\n忘记密码はログインページに必ずあるあれです。"
}]