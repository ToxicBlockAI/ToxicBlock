export class SettingClass {
    constructor() {
        this.url = document.URL;
    }

    getObserverTarget(){
        let target = null;

        if(this.url.includes("https://www.youtube.com") || this.url.includes("https://studio.youtube.com")){
            if(this.url.includes("live_chat")){
                target = document.querySelector("#chat-messages");
            }else if(this.url.includes("watch") || this.url.includes("shorts")){
                target = document.querySelector("#page-manager");
            }
        }else if(this.url.includes("https://www.twitch.tv")){
            target = document.body;
        }else if(this.url.includes("https://twitter.com")){
            target = document.body;
        }

        return target;
    }

    getObserverConfig(){
        let config = null;

        if(this.url.includes("https://www.youtube.com") || this.url.includes("https://studio.youtube.com")){
            if(this.url.includes("live_chat") || this.url.includes("watch") || this.url.includes("shorts")){
                config = {
                    childList: true,
                    subtree: true
                };
            }
        }else if(this.url.includes("https://www.twitch.tv")){
            config = {
                attributes: true,
                attributeOldValue: true,
                attributeFilter: ["href"],
                childList: true,
                characterData: false,
                subtree: true
            };
        }else if(this.url.includes("https://twitter.com")){
            config = {
                attributes: true,
                attributeOldValue: true,
                attributeFilter: ["href"],
                childList: true,
                characterData: false,
                subtree: true
            };
        }

        return config;
    }
}
