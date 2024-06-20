import { SettingClass } from "./setting.js";
import { ProgramClass } from "./program.js";

function main(option){
    option['debugMode'] ? console.log(`Debug: [DOMツリー 読み込み完了]`) : null;

    let setting = new SettingClass();
    let target = setting.getObserverTarget();
    let config = setting.getObserverConfig();

    let program = new ProgramClass();
    program.setConfig(option);
    program.run(document);

    if(target != null && config != null){
        let observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                program.run(mutation.target);
            });
        });

        option['debugMode'] ? console.log(`Debug: [要素監視 開始]`) : null;
        observer.observe(target, config);
    }
}

chrome.storage.local.get("ToxicBlock", function(items){
    if(items.ToxicBlock != undefined){
        if(document.readyState === "loading"){
            document.addEventListener("DOMContentLoaded", function(){
                main(items.ToxicBlock);
            });
        }else{
            main(items.ToxicBlock);
        }
    }else{
        let items = {};
        items["debugMode"] = false;
        items["youtube"] = {};
        items["youtube"]["reportEnabled"] = false;
        items["youtube"]["blockEnabled"] = false;
        items["youtube"]["commentEnabled"] = false;
        items["youtube"]["chatEnabled"] = false;
        items["youtube"]["superchatEnabled"] = false;
        items["youtube"]["memberchatEnabled"] = false;
        items["youtube"]["memberEnabled"] = false;
        items["youtube"]["moderatorEnabled"] = false;
        items["youtube"]["verifiedEnabled"] = false;
        items["twitch"] = {};
        items["twitch"]["reportEnabled"] = false;
        items["twitch"]["blockEnabled"] = false;
        items["twitch"]["turboEnabled"] = false;
        items["twitch"]["primegamingEnabled"] = false;
        items["twitch"]["moderatorEnabled"] = false;
        items["twitch"]["verifiedEnabled"] = false;
        items["twitter"] = {};
        items["twitter"]["reportEnabled"] = false;
        items["twitter"]["blockEnabled"] = false;
        items["twitter"]["bluebadgeEnabled"] = false;
        items["twitter"]["goldbadgeEnabled"] = false;
        items["textBlock1"] = false;
        items["textBlock2"] = false;
        items["textBlock3"] = false;
        items["textBlock4"] = false;
        items["textBlock5"] = false;
        items["textBlock6"] = false;
        items["textBlock7"] = false;
        items["textBlock8"] = false;
        items["textBlock9"] = false;
        items["textBlock10"] = false;
        items["textBlock11"] = false;
        items["textBlock12"] = false;
        items["textBlock13"] = false;
        items["textBlock14"] = false;
        items["textBlock15"] = false;
        items["scoreThreshold"] = 0.8;

        let texts = [
            "草", "□", "かわいい", "lol", "LOL", "あっ", "あ", "LMAO", "おお", "いいね", "lmao",
            "うんうん", "！？", "ナイスゥ！", "gg", "わかる", "はーい", "え？", "nice", "なるほど",
            "ナイス", "おお！", "F", "ん？", "ないすぅ！", "お", "ww", "おかえり", "おおお", "nt",
            "ないす", "そうね", "yes", "GG", "ナイスゥ", "ナイス！", "ないすぅ", "そうだね", "お？",
            "え", "ないす！", "Lol", "ｗｗ", "うん", "きちゃ", "ほうほう", "w", "あー", "かわいいｗ",
            "ほう", "あら", "お疲れ様でした！", "おしい", "うまい", "1", "NICE", "きちゃ！", "はい",
            "それはそう", "いいねぇ", "？", "LMAOOO", "お！", "おおおお", "たしかに", "おおー", "Nice",
            "お疲れ様でした", "なんて？", "いいね！", "おつ", "あーあ", "こわ", "がんばれ", "ntnt",
            "おー", "えらい", "2", "cute", "YES", "てぇてぇ", "Lmao", "あｗ", "o7", "へー", "すごい",
            "あれ？", "がんばれ！", "はーい！", "Yes", "はい！はい！はい！はい！", "oof", "niceee",
            "たすかる", "可愛い", "いいよ", "nt nt", "LMAOOOO", "つ", "ｗ", "ないすー", "おめでとう",
            "がんばれー！", "おめでとう！", "そうそう", "？？？", "助かる", "yeah", "no", "LMAOO",
            "おかえりー", "こんばんは", "ありがとう", "wow", "oh no", "NT", "うま", "おおおおお",
            "あらら", "がんばれー", "www", "3", "は？", "やば", "あるある", "確かに", "ああ", "あああ",
            "かわいい！", "すご", "ｗｗｗ", "おおお！", "うまい！", "YABE", "かわいいw", "なるほどね",
            "こん", "こっわ", "かっこいい", "omg", "いてら", "せやな", "ないすー！", "niceeee",
            "そうなんだ", "えっ", "oh", "おかえり～", "OMG", "10", "ふむふむ", "???", "おおー！",
            "え！？", "nicee", "すげぇ", "待機", "大丈夫", "what", "ああああ", "楽しみ", "うっま",
            "lmaooo", "WHAT", "ナイスー", "yabe", "お疲れ様", "うわ", "やさしい", "NICEEE", "つっよ"
        ];

        items["whiteList"] = texts;

        chrome.storage.local.set({"ToxicBlock": items}, function () {
            main(items);
        });
    }
});
