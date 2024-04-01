// import {loadScript, loadCSS} from "discourse/lib/load-script";
import {withPluginApi} from "discourse/lib/plugin-api";
import {ajax} from "discourse/lib/ajax";


export default {
    name: "wechat-load-css",

    initialize(container) {
        withPluginApi("0.8.22", api => {
            api.decorateCookedElement($elem => {
                const controller = Discourse.__container__.lookup("controller:topic")
                const externalId = controller.get("model.external_id")
                if (externalId) {

                    function loadCSS_wct(url) {
                        return new Promise(function (resolve) {

                            function ensureStyleWithId(id) {
                                let style = document.getElementById(id);
                                if (!style) {
                                    style = document.createElement('style');
                                    style.id = id;
                                    document.head.appendChild(style);
                                }
                                return style;
                            }

                            // 更新style标签的内容
                            function updateStyleContent(id, newContent) {
                                const style = ensureStyleWithId(id);
                                style.innerHTML = newContent;
                            }

                            const cb = function (data) {
                                ensureStyleWithId("wct-cr-css");
                                updateStyleContent("wct-cr-css", data);
                                resolve();
                            };

                            ajax({
                                url: url,
                                dataType: "text",
                            }).then(cb);
                        });
                    }

                    loadCSS_wct("http://xinfinite1.cedu.ac.cn/wct-cr-css/" + externalId + ".css").then(() => {
                        console.log("CSS loaded");
                    });
                }

            }, {
                onlyStream: true
            });
        });
    }

};