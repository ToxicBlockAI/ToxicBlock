export class ProgramClass {
    constructor() {
        this.api_url = "https://www.toxicblock.com:4832/text_classification";
        this.form_url = "https://docs.google.com/forms/d/e/1FAIpQLSdDzM85vi4bWgseQczbnPCtdZ5ZzOsfQHc3v_o1B8buRAZsvw/viewform?usp=pp_url&entry.946143478=";
    }

    setConfig(config){
        this.config = config;

        this.textBlock = [
            this.config["textBlock1"],
            this.config["textBlock2"],
            this.config["textBlock3"],
            this.config["textBlock4"],
            this.config["textBlock5"],
            this.config["textBlock6"],
            this.config["textBlock7"],
            this.config["textBlock8"],
            this.config["textBlock9"],
            this.config["textBlock10"],
            this.config["textBlock11"],
            this.config["textBlock12"],
            this.config["textBlock13"],
            this.config["textBlock14"],
            this.config["textBlock15"]
        ];

        this.label = {
            "通常": 0,
            "アドバイス": 1,
            "指示": 2,
            "匂わせ": 3,
            "ネタバレ": 4,
            "自治行為": 5,
            "放送事故": 6,
            "杞憂": 7,
            "厄介行為": 8,
            "伝書鳩": 9,
            "荒らし": 10,
            "スパム": 11,
            "セクハラ": 12,
            "罵詈雑言": 13,
            "誹謗中傷": 14
        };
    }

    run(target) {
        let url = document.URL;

        if(url.includes("https://www.youtube.com") || url.includes("https://studio.youtube.com")){
            if(url.includes("live_chat") || url.includes("live_chat_replay")){
                if(this.config["youtube"]["chatEnabled"]){
                    for(const element of target.querySelectorAll('yt-live-chat-text-message-renderer:not([data-checked="true"])')){
                        this.searchYoutubeChat(element);
                    }
                }

                if(this.config["youtube"]["superchatEnabled"]){
                    for(const element of target.querySelectorAll('yt-live-chat-paid-message-renderer:not([data-checked="true"])')){
                        this.searchYoutubeChat(element);
                    }
                }

                if(this.config["youtube"]["memberchatEnabled"]){
                    for(const element of target.querySelectorAll('yt-live-chat-membership-item-renderer:not([data-checked="true"])')){
                        this.searchYoutubeChat(element);
                    }
                }
            }else if(url.includes("watch") || url.includes("shorts")){
                if(this.config["youtube"]["commentEnabled"]){
                    for(const element of target.querySelectorAll('ytd-comment-thread-renderer:not([data-checked="true"])')){
                        this.searchYoutubeComment(element);
                    }
                }
            }
        }else if(url.includes("https://www.twitch.tv")){
            if(url.includes("videos") || url.includes("clip")){
                for(const element of target.querySelectorAll('div.video-chat__message:not([data-checked="true"])')){
                    this.searchTwitchChat(element);
                }
            }else{
                for(const element of target.querySelectorAll('div.chat-line__message:not([data-checked="true"])')){
                    this.searchTwitchChat(element);
                }
            }
        }else if(url.includes("https://twitter.com") || url.includes("https://x.com")){
            for(const element of target.querySelectorAll('div[data-testid="cellInnerDiv"]:not([data-checked="true"])')){
                this.searchTwitter(element);
            }
        }
    }

    async searchYoutubeChat(element){
        if(element.localName == "yt-live-chat-text-message-renderer"){
            var message = element.querySelector("#message");
            if(message != null){
                var text = message.innerText;

                if(text != "" && this.config["youtube"]["reportEnabled"]){
                    var deleted = element.querySelector("#deleted-state");
                    deleted.innerHTML = ` <a href="${this.form_url}${text}" target="_blank">報告</a>`;
                }

                if(this.config["youtube"]["chatEnabled"]){
                    if(text != "" && !this.config["whiteList"].includes(text)){
                        if(this.config["youtube"]["blockEnabled"]){
                            var chat_badges = element.querySelector("#chat-badges").innerHTML;
                            var is_member = chat_badges.includes("member");
                            var is_moderator = chat_badges.includes("moderator");
                            var is_verified = chat_badges.includes("verified");

                            if(!is_member && !is_moderator && !is_verified){
                                this.requestAPI(element, text);
                            }else if(is_member && this.config["youtube"]["memberEnabled"]){
                                this.requestAPI(element, text);
                            }else if(is_moderator && this.config["youtube"]["moderatorEnabled"]){
                                this.requestAPI(element, text);
                            }else if(is_verified && this.config["youtube"]["verifiedEnabled"]){
                                this.requestAPI(element, text);
                            }
                        }
                    }
                }

                element.dataset.checked = "true";
            }
        }else if(element.localName == "yt-live-chat-paid-message-renderer"){
            var message = element.querySelector("#message");
            if(message != null){
                var text = message.innerText;

                if(text != "" && this.config["youtube"]["reportEnabled"]){
                    message.innerHTML = `${message.innerHTML} <a href="${this.form_url}${text}" target="_blank">報告</a>`;
                }

                if(this.config["youtube"]["superchatEnabled"]){
                    if(text != "" && !this.config["whiteList"].includes(text)){
                        if(this.config["youtube"]["blockEnabled"]){
                            this.requestAPI(element, text);
                        }
                    }
                }

                element.dataset.checked = "true";
            }
        }else if(element.localName == "yt-live-chat-membership-item-renderer"){
            var message = element.querySelector("#message");
            if(message != null){
                var text = message.innerText;

                if(text != "" && this.config["youtube"]["reportEnabled"]){
                    message.innerHTML = `${message.innerHTML} <a href="${this.form_url}${text}" target="_blank">報告</a>`;
                }

                if(this.config["youtube"]["memberchatEnabled"]){
                    if(text != "" && !this.config["whiteList"].includes(text)){
                        if(this.config["youtube"]["blockEnabled"]){
                            this.requestAPI(element, text);
                        }
                    }
                }

                element.dataset.checked = "true";
            }
        }
    }

    async searchYoutubeComment(element){
        if(element.localName == "ytd-comment-thread-renderer"){
            var content = element.querySelector("#content-text");
            if(content != null){
                var text = content.innerText;

                if(text != "" && this.config["youtube"]["reportEnabled"]){
                    content.innerHTML = `${content.innerHTML} <a href="${this.form_url}${text}" target="_blank">報告</a>`;
                }

                if(this.config["youtube"]["commentEnabled"]){
                    if(text != "" && !this.config["whiteList"].includes(text)){
                        if(this.config["youtube"]["blockEnabled"]){
                            this.requestAPI(element, text);
                        }
                    }
                }

                element.dataset.checked = "true";
            }
        }
    }

    async searchTwitchChat(element){
        if(element.localName == "div"){
            var fragment = element.querySelector("span.text-fragment");
            if(fragment != null){
                var text = fragment.innerText;

                if(text.trim() != "" && this.config["twitch"]["reportEnabled"]){
                    if(element.className == "chat-line__message"){
                        var chat_line = element.querySelector("div.chat-line__no-background");
                        chat_line.innerHTML = `${chat_line.innerHTML} <a href="${this.form_url}${text}" target="_blank">報告</a>`;
                    }else{
                        element.innerHTML = `${element.innerHTML} <a href="${this.form_url}${text}" target="_blank">報告</a>`;
                    }
                }

                if(text.trim() != "" && !this.config["whiteList"].includes(text.trim())){
                    if(this.config["twitch"]["blockEnabled"]){
                        var chat_badge = element.querySelector('button[data-a-target="chat-badge"]');
                        if(chat_badge != null){
                            var is_turbo = chat_badge.innerHTML.includes("Turbo");
                            var is_primegaming = chat_badge.innerHTML.includes("Prime Gaming");
                            var is_moderator = chat_badge.innerHTML.includes("Moderator") || chat_badge.innerHTML.includes("モデレーター");
                            var is_verified = chat_badge.innerHTML.includes("Verified") || chat_badge.innerHTML.includes("認証済み");

                            if(!is_turbo && !is_primegaming && !is_moderator && !is_verified){
                                this.requestAPI(element, text);
                            }else if(is_turbo && this.config["twitch"]["turboEnabled"]){
                                this.requestAPI(element, text);
                            }else if(is_primegaming && this.config["twitch"]["primegamingEnabled"]){
                                this.requestAPI(element, text);
                            }else if(is_moderator && this.config["twitch"]["moderatorEnabled"]){
                                this.requestAPI(element, text);
                            }else if(is_verified && this.config["twitch"]["verifiedEnabled"]){
                                this.requestAPI(element, text);
                            }
                        }else{
                            this.requestAPI(element, text);
                        }
                    }
                }

                element.dataset.checked = "true";
            }
        }
    }

    async searchTwitter(element){
        if(element.localName == "div"){
            var article = element.querySelector('article[data-testid="tweet"]');
            var tweet = element.querySelector('div[data-testid="tweetText"]')
            if(tweet != null){
                var text = tweet.innerText;

                if(text != "" && this.config["twitter"]["reportEnabled"]){
                    tweet.innerHTML = `${tweet.innerHTML} <a href="${this.form_url}${text}" target="_blank">報告</a>`;
                }

                if(text != "" && !this.config["whiteList"].includes(text)){
                    if(this.config["twitter"]["blockEnabled"]){
                        var username = element.querySelector('div[data-testid="User-Name"]');
                        if(username != null){
                            var is_bluebadge = username.innerHTML.includes("認証済みアカウント") && username.innerHTML.includes("r-1cvl2hr");
                            var is_goldbadge = username.innerHTML.includes("認証済みアカウント") && !username.innerHTML.includes("r-1cvl2hr");

                            if(!is_bluebadge && !is_goldbadge){
                                this.requestAPI(article, text);
                            }else if(is_bluebadge && this.config["twitter"]["blueEnabled"]){
                                this.requestAPI(article, text);
                            }else if(is_goldbadge && this.config["twitter"]["goldEnabled"]){
                                this.requestAPI(article, text);
                            }
                        }else{
                            this.requestAPI(article, text);
                        }
                    }
                }

                element.dataset.checked = "true";
            }
        }
    }

    requestAPI(element, text){
        let options = {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"text": text})
        };

        fetch(this.api_url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`ステータス: ${response.status}, テキスト: ${response.statusText}`);
                }

                return response.json();
            }).then(data => {
                if(data['score'] >= this.config["scoreThreshold"]){
                    if(this.textBlock[this.label[data["label"]]]){
                        element.remove();
                    }
                }
            }).catch(error => {
                this.config['debugMode'] ? console.log(`Debug: [${error}]`) : null;
            });
    }
}
