import loadScript from "discourse/lib/load-script";
import {withPluginApi} from "discourse/lib/plugin-api";
import {ajax} from "discourse/lib/ajax";


export default {
    name: "wechat-load-css",

    initialize(container) {
        withPluginApi("0.8.22", (api) => {
            let isLoading = false; // 锁变量
            const styleCache = {}; // 缓存 externalId 及对应的样式内容
            let lastUpdatedExternalId = null; // 追踪上一次更新的 externalId

            api.decorateCookedElement(
                ($elem) => {
                    $elem = $($elem)
                    const controller = Discourse.__container__.lookup("controller:topic");
                    const externalId = controller.get("model.external_id");
                    if (!externalId) return;

                    const dataExternalId = $elem.attr("data-external-id");

                    function ensureStyleWithId(id) {
                        let style = document.getElementById(id);
                        if (!style) {
                            style = document.createElement("style");
                            style.id = id;
                            document.head.appendChild(style);
                        }
                        return style;
                    }

                    // 复用的更新 style 内容的函数
                    function updateStyleContent(id, newContent) {
                        const style = ensureStyleWithId(id);
                        style.innerHTML = newContent;
                    }

                    function loadCSS_wct(url) {
                        return new Promise(function (resolve) {
                            const cb = function (data) {
                                // 复用 updateStyleContent 来更新样式
                                updateStyleContent("wct-cr-css", data);
                                resolve(data); // 返回样式内容用于缓存
                            };

                            ajax({
                                url: url,
                                dataType: "text",
                            }).then(cb);
                        });
                    }

                    // 检查 externalId 和 data-external-id 的状态
                    if (externalId !== dataExternalId || !dataExternalId) {
                        if (!styleCache[externalId] && !isLoading) {
                            // 加锁，防止重复请求
                            isLoading = true;

                            loadCSS_wct("//css.xinfinite.net/wct-cr-css/" + externalId + ".css").then((data) => {
                                console.log("CSS loaded for externalId: " + externalId);
                                styleCache[externalId] = data; // 缓存该 externalId 对应的 CSS 内容
                                $elem.attr("data-external-id", externalId); // 更新 data-external-id
                                lastUpdatedExternalId = externalId; // 更新 lastUpdatedExternalId
                                isLoading = false; // 解锁
                            }).catch(() => {
                                isLoading = false; // 请求失败时也要解锁
                            });
                        } else if (styleCache[externalId]  && externalId !== lastUpdatedExternalId) {
                            // externalId 未变化且已缓存，复用 updateStyleContent 更新 style 标签内容
                            console.log("Updating style content for cached externalId: " + externalId);
                            updateStyleContent("wct-cr-css", styleCache[externalId]); // 从缓存中更新 CSS
                            $elem.attr("data-external-id", externalId); // 更新 data-external-id
                            lastUpdatedExternalId = externalId; // 记录此次更新的 externalId

                        }
                    }

                    loadScript("/plugins/discourse-wechat-article/stylesheets/common-v10.css", {css: true}).then(() => {
                        console.log("common CSS loaded");
                    });
                },
                {
                    onlyStream: true,
                }
            );
        });
    },

};