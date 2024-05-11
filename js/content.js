import { SettingClass } from "./setting.js";
import { ProgramClass } from "./program.js";

function main(){
    let setting = new SettingClass();
    let target = setting.getObserverTarget();
    let config = setting.getObserverConfig();

    let program = new ProgramClass();
    program.run(document);

    if(target != null && config != null){
        let observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                program.run(mutation.target);
            });
        });

        observer.observe(target, config);
    }
}

if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", function(){
        main();
    });
}else{
    main();
}
