document.addEventListener("DOMContentLoaded", function(){
	document.getElementById("thresholdLabel").innerText = document.getElementById("thresholdSlider").value;

	chrome.storage.local.get("ToxicBlock", function (items) {
		if(items.ToxicBlock != undefined){
			document.getElementById("debugmodeSwitch").checked = items.ToxicBlock["debugMode"];
			document.getElementById("youtubeCheck").checked = items.ToxicBlock["youtubeFilter"];
			document.getElementById("twitchCheck").checked = items.ToxicBlock["twitchFilter"];
			document.getElementById("twitterCheck").checked = items.ToxicBlock["twitterFilter"];
			document.getElementById("blockCheck1").checked = items.ToxicBlock["textBlock1"];
			document.getElementById("blockCheck2").checked = items.ToxicBlock["textBlock2"];
			document.getElementById("blockCheck3").checked = items.ToxicBlock["textBlock3"];
			document.getElementById("blockCheck4").checked = items.ToxicBlock["textBlock4"];
			document.getElementById("blockCheck5").checked = items.ToxicBlock["textBlock5"];
			document.getElementById("blockCheck6").checked = items.ToxicBlock["textBlock6"];
			document.getElementById("blockCheck7").checked = items.ToxicBlock["textBlock7"];
			document.getElementById("blockCheck8").checked = items.ToxicBlock["textBlock8"];
			document.getElementById("blockCheck9").checked = items.ToxicBlock["textBlock9"];
			document.getElementById("blockCheck10").checked = items.ToxicBlock["textBlock10"];
			document.getElementById("blockCheck11").checked = items.ToxicBlock["textBlock11"];
			document.getElementById("blockCheck12").checked = items.ToxicBlock["textBlock12"];
			document.getElementById("blockCheck13").checked = items.ToxicBlock["textBlock13"];
			document.getElementById("blockCheck14").checked = items.ToxicBlock["textBlock14"];
			document.getElementById("blockCheck15").checked = items.ToxicBlock["textBlock15"];
			document.getElementById("thresholdSlider").value = items.ToxicBlock["scoreThreshold"]*100;
			document.getElementById("thresholdLabel").innerText = items.ToxicBlock["scoreThreshold"]*100;

			let select = document.getElementById("throughSelect");
			for(const text of items.ToxicBlock["throughList"]){
				let option = document.createElement("option");
				option.text = text;
				option.value = text;
				select.appendChild(option);
			}
		}
	});
});

document.getElementById("addButton").addEventListener("click", function(){
	let input = document.getElementById("textInput").value;
	let select = document.getElementById("throughSelect");

	let is_unique = true;
	for(const option of select){
		if(option.value == input){
			is_unique = false;
		}
	}

	if(is_unique){
		let option = document.createElement("option");
		option.text = input;
		option.value = input;
		select.appendChild(option);
	}else{
		document.getElementById("noticeModalLabel").innerText = "エラー";
		document.getElementById("noticeModalText").innerText = "そのテキストは既に追加されています。";
		let noticeModal = new bootstrap.Modal(document.getElementById('noticeModal'));
		noticeModal.show();
	}
});

document.getElementById("deleteButton").addEventListener("click", function(){
	let select = document.getElementById("throughSelect");
	let options = select.options;

	for (var i=options.length-1; i >= 0; i--) {
		if(options[i].selected){
			select.remove(i);
		}
	}
});

document.getElementById("resetButton").addEventListener("click", function(){
	document.getElementById("debugmodeSwitch").checked = false;
	document.getElementById("youtubeCheck").checked = false;
	document.getElementById("twitchCheck").checked = false;
	document.getElementById("twitterCheck").checked = false;
	document.getElementById("blockCheck1").checked = false;
	document.getElementById("blockCheck2").checked = false;
	document.getElementById("blockCheck3").checked = false;
	document.getElementById("blockCheck4").checked = false;
	document.getElementById("blockCheck5").checked = false;
	document.getElementById("blockCheck6").checked = false;
	document.getElementById("blockCheck7").checked = false;
	document.getElementById("blockCheck8").checked = false;
	document.getElementById("blockCheck9").checked = false;
	document.getElementById("blockCheck10").checked = false;
	document.getElementById("blockCheck11").checked = false;
	document.getElementById("blockCheck12").checked = false;
	document.getElementById("blockCheck13").checked = false;
	document.getElementById("blockCheck14").checked = false;
	document.getElementById("blockCheck15").checked = false;
	document.getElementById("thresholdSlider").value = 80;
	document.getElementById("thresholdLabel").innerText = 80;

	let options = document.getElementById("throughSelect").options;
	for(const option of options){
		option.remove();
	}

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

	let select = document.getElementById("throughSelect");
	for(const text of texts){
		let option = document.createElement("option");
		option.text = text;
		option.value = text;
		select.appendChild(option);
	}
});

document.getElementById("saveButton").addEventListener("click", function(){
	let items = {};
	items["debugMode"] = document.getElementById("debugmodeSwitch").checked;
	items["youtubeFilter"] = document.getElementById("youtubeCheck").checked;
	items["twitchFilter"] = document.getElementById("twitchCheck").checked;
	items["twitterFilter"] = document.getElementById("twitterCheck").checked;
	items["textBlock1"] = document.getElementById("blockCheck1").checked;
	items["textBlock2"] = document.getElementById("blockCheck2").checked;
	items["textBlock3"] = document.getElementById("blockCheck3").checked;
	items["textBlock4"] = document.getElementById("blockCheck4").checked;
	items["textBlock5"] = document.getElementById("blockCheck5").checked;
	items["textBlock6"] = document.getElementById("blockCheck6").checked;
	items["textBlock7"] = document.getElementById("blockCheck7").checked;
	items["textBlock8"] = document.getElementById("blockCheck8").checked;
	items["textBlock9"] = document.getElementById("blockCheck9").checked;
	items["textBlock10"] = document.getElementById("blockCheck10").checked;
	items["textBlock11"] = document.getElementById("blockCheck11").checked;
	items["textBlock12"] = document.getElementById("blockCheck12").checked;
	items["textBlock13"] = document.getElementById("blockCheck13").checked;
	items["textBlock14"] = document.getElementById("blockCheck14").checked;
	items["textBlock15"] = document.getElementById("blockCheck15").checked;
	items["scoreThreshold"] = document.getElementById("thresholdSlider").value/100;

	let throughlist = [];
	let options = document.getElementById("throughSelect").options;
	for(const option of options){
		throughlist.push(option.value);
	}
	items["throughList"] = throughlist;

	chrome.storage.local.set({"ToxicBlock": items}, function () {
		document.getElementById("noticeModalLabel").innerText = "システムメッセージ";
		document.getElementById("noticeModalText").innerText = "ストレージに設定ファイルを保存しました。";
		let noticeModal = new bootstrap.Modal(document.getElementById('noticeModal'));
		noticeModal.show();
	});
});

document.getElementById("thresholdSlider").addEventListener("input", function(){
	document.getElementById("thresholdLabel").innerText = document.getElementById("thresholdSlider").value;
});
