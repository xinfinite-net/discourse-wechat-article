import {loadScript, loadCSS} from "discourse/lib/load-script";
import {withPluginApi} from "discourse/lib/plugin-api";

export default {
    name: "wechat-load-css",

    initialize(container) {
        withPluginApi("0.8.22", api => {
            api.decorateCookedElement($elem => {
                const controller = Discourse.__container__.lookup("controller:topic")
                const username = controller.get("model.details.created_by.username")
                const externalId = controller.get("model.external_id")
                if (externalId) {
                    loadCSS("http://xinfinite1.cedu.ac.cn/wct-cr-css/" + externalId + ".css").then(() => {
                        console.log("Mermaid loaded", $elem);
                        console.log("controller", controller);
                        console.log("username", username);
                        console.log("username", externalId);
                    });
                }

            }, {
                onlyStream: true
            });
        });
    }
};