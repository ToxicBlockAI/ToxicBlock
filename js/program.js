export class ProgramClass {
    constructor() {
        this.api_url = "https://www.toxicblock.com/api/text_classification";
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
    }

    run(target) {
        let url = document.URL;

        if(url.includes("https://www.youtube.com") || url.includes("https://studio.youtube.com")){
            if(url.includes("live_chat")){
                for(const element of target.querySelectorAll('yt-live-chat-text-message-renderer:not([data-checked="true"])')){
                    this.searchYoutubeChat(element);
                }
                for(const element of target.querySelectorAll('yt-live-chat-paid-message-renderer:not([data-checked="true"])')){
                    this.searchYoutubeChat(element);
                }
                for(const element of target.querySelectorAll('yt-live-chat-membership-item-renderer:not([data-checked="true"])')){
                    this.searchYoutubeChat(element);
                }
            }else if(url.includes("watch") || url.includes("shorts")){
                for(const element of target.querySelectorAll('ytd-comment-thread-renderer:not([data-checked="true"])')){
                    this.searchYoutubeComment(element);
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
        if(element.querySelector("#message") != null){
            var message = element.querySelector("#message");
            var text = message.innerText;

            if(text != "" && !this.config["throughList"].includes(text)){
                if(this.config["youtubeFilter"]){
                    this.requestAPI(text)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`response.status = ${response.status}, response.statusText = ${response.statusText}`);
                            }

                            return response.json();
                        }).then(data => {
                            if(data['score'] >= this.config["scoreThreshold"]){
                                if(this.textBlock[data["label"]]){
                                    element.remove();
                                }
                            }
                        }).catch(err => {
                            if(element.localName == "yt-live-chat-text-message-renderer"){
                                var deleted = element.querySelector("#deleted-state");
                                deleted.innerHTML = ` <a href="${this.form_url}${text}" target="_blank">報告</a>`;
                            }else{
                                message.innerHTML = `${message.innerHTML} <a href="${this.form_url}${text}" target="_blank">報告</a>`;
                            }
                        });
                }else{
                    if(element.localName == "yt-live-chat-text-message-renderer"){
                        var deleted = element.querySelector("#deleted-state");
                        deleted.innerHTML = ` <a href="${this.form_url}${text}" target="_blank">報告</a>`;
                    }else{
                        message.innerHTML = `${message.innerHTML} <a href="${this.form_url}${text}" target="_blank">報告</a>`;
                    }
                }
            }

            element.dataset.checked = "true";
        }
    }

    async searchYoutubeComment(element){
        if(element.querySelector("#content-text") != null){
            var content = element.querySelector("#content-text");
            var text = content.innerText;

            if(text != "" && !this.config["throughList"].includes(text)){
                if(this.config["youtubeFilter"]){
                    this.requestAPI(text)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`response.status = ${response.status}, response.statusText = ${response.statusText}`);
                            }

                            return response.json();
                        }).then(data => {
                            if(data['score'] >= this.config["scoreThreshold"]){
                                if(this.textBlock[data["label"]]){
                                    element.remove();
                                }
                            }
                        }).catch(err => {
                            content.innerHTML = `${content.innerHTML} <a href="${this.form_url}${text}" target="_blank">報告</a>`;
                        });
                }else{
                    content.innerHTML = `${content.innerHTML} <a href="${this.form_url}${text}" target="_blank">報告</a>`;
                }
            }

            element.dataset.checked = "true";
        }
    }

    async searchTwitchChat(element){
        if(element.querySelector("span.text-fragment") != null){
            var fragment = element.querySelector("span.text-fragment");
            var text = fragment.innerText;

            if(text.trim() != "" && !this.config["throughList"].includes(text.trim())){
                if(this.config["twitchFilter"]){
                    this.requestAPI(text)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`response.status = ${response.status}, response.statusText = ${response.statusText}`);
                            }

                            return response.json();
                        }).then(data => {
                            if(data['score'] >= this.config["scoreThreshold"]){
                                if(this.textBlock[data["label"]]){
                                    element.remove();
                                }
                            }
                        }).catch(err => {
                            if(element.className == "chat-line__message"){
                                var chat_line = element.querySelector("div.chat-line__no-background");
                                chat_line.innerHTML = `${chat_line.innerHTML} <a href="${this.form_url}${text}" target="_blank">報告</a>`;
                            }else{
                                element.innerHTML = `${element.innerHTML} <a href="${this.form_url}${text}" target="_blank">報告</a>`;
                            }
                        });
                }else{
                    if(element.className == "chat-line__message"){
                        var chat_line = element.querySelector("div.chat-line__no-background");
                        chat_line.innerHTML = `${chat_line.innerHTML} <a href="${this.form_url}${text}" target="_blank">報告</a>`;
                    }else{
                        element.innerHTML = `${element.innerHTML} <a href="${this.form_url}${text}" target="_blank">報告</a>`;
                    }
                }
            }

            element.dataset.checked = "true";
        }
    }

    async searchTwitter(element){
        if(element.querySelector('div[data-testid="tweetText"]') != null){
            var tweet = element.querySelector('div[data-testid="tweetText"]');
            var text = tweet.innerText;

            if(text != "" && !this.config["throughList"].includes(text)){
                if(this.config["twitterFilter"]){
                    this.requestAPI(text)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`response.status = ${response.status}, response.statusText = ${response.statusText}`);
                            }

                            return response.json();
                        }).then(data => {
                            if(data['score'] >= this.config["scoreThreshold"]){
                                if(this.textBlock[data["label"]]){
                                    element.remove();
                                }
                            }
                        }).catch(err => {
                            tweet.innerHTML = `${tweet.innerHTML} <a href="${this.form_url}${text}" target="_blank">報告</a>`;
                        });
                }else{
                    tweet.innerHTML = `${tweet.innerHTML} <a href="${this.form_url}${text}" target="_blank">報告</a>`;
                }
            }

            element.dataset.checked = "true";
        }
    }

    requestAPI(text){
        let options = {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"text": text})
        };

        let response = fetch(this.api_url, options);
        return response;
    }
}
