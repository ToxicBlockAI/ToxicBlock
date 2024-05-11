export class ProgramClass {
    constructor() {
        this.url = document.URL;
        this.form_url = "https://docs.google.com/forms/d/e/1FAIpQLSdDzM85vi4bWgseQczbnPCtdZ5ZzOsfQHc3v_o1B8buRAZsvw/viewform?usp=pp_url&entry.946143478=";
    }

    run(target) {
        if(this.url.includes("https://www.youtube.com") || this.url.includes("https://studio.youtube.com")){
            if(this.url.includes("live_chat")){
                for(const element of target.querySelectorAll('yt-live-chat-text-message-renderer.yt-live-chat-item-list-renderer:not([data-checked="true"])')){
                    this.searchYoutubeChat(element);
                }
                for(const element of target.querySelectorAll('yt-live-chat-paid-message-renderer.yt-live-chat-item-list-renderer:not([data-checked="true"])')){
                    this.searchYoutubeChat(element);
                }
                for(const element of target.querySelectorAll('yt-live-chat-membership-item-renderer.yt-live-chat-item-list-renderer:not([data-checked="true"])')){
                    this.searchYoutubeChat(element);
                }
            }else if(this.url.includes("watch") || this.url.includes("shorts")){
                for(const element of target.querySelectorAll('ytd-comment-thread-renderer.ytd-item-section-renderer:not([data-checked="true"])')){
                    this.searchYoutubeComment(element);
                }
            }
        }else if(this.url.includes("https://www.twitch.tv")){
            if(this.url.includes("videos") || this.url.includes("clip")){
                for(const element of target.querySelectorAll('div.video-chat__message:not([data-checked="true"])')){
                    this.searchTwitchChat(element);
                }
            }else{
                for(const element of target.querySelectorAll('div.chat-line__message:not([data-checked="true"])')){
                    this.searchTwitchChat(element);
                }
            }
        }else if(this.url.includes("https://twitter.com")){
            for(const element of target.querySelectorAll('div[data-testid="cellInnerDiv"]:not([data-checked="true"])')){
                this.searchTwitter(element);
            }
        }
    }

    async searchYoutubeChat(element){
        if(element.querySelector("#message") != null){
            var message = element.querySelector("#message");
            var text = message.innerText;

            if(text != ""){
                if(element.localName == "yt-live-chat-text-message-renderer"){
                    var deleted = element.querySelector("#deleted-state");
                    deleted.innerHTML = ` <a href="${this.form_url}${text}" target="_blank">報告</a>`;
                }else{
                    message.innerHTML = `${message.innerHTML} <a href="${this.form_url}${text}" target="_blank">報告</a>`;
                }
            }

            element.dataset.checked = "true";
        }
    }

    async searchYoutubeComment(element){
        if(element.querySelector("#content-text") != null){
            var content = element.querySelector("#content-text");
            var text = content.innerText;

            if(text != ""){
                content.innerHTML = `${content.innerHTML} <a href="${this.form_url}${text}" target="_blank">報告</a>`;
            }

            element.dataset.checked = "true";
        }
    }

    async searchTwitchChat(element){
        if(element.querySelector("span.text-fragment") != null){
            var fragment = element.querySelector("span.text-fragment");
            var text = fragment.innerText;

            if(text.trim() != ""){
                if(element.className == "chat-line__message"){
                    var chat_line = element.querySelector("div.chat-line__no-background");
                    chat_line.innerHTML = `${chat_line.innerHTML} <a href="${this.form_url}${text}" target="_blank">報告</a>`;
                }else{
                    element.innerHTML = `${element.innerHTML} <a href="${this.form_url}${text}" target="_blank">報告</a>`;
                }
            }

            element.dataset.checked = "true";
        }
    }

    async searchTwitter(element){
        if(element.querySelector('div[data-testid="tweetText"]') != null){
            var tweet = element.querySelector('div[data-testid="tweetText"]');
            var text = tweet.innerText;

            if(text != ""){
                tweet.innerHTML = `${tweet.innerHTML} <a href="${this.form_url}${text}" target="_blank">報告</a>`;
            }

            element.dataset.checked = "true";
        }
    }
}
