export function setup(helper) {
    if (!helper.markdownIt) { return; }
    helper.whiteList(["p[data-*]"]);
    helper.whiteList(["img[data-*]"]);
    helper.whiteList(["h2[data-*]"]);
    helper.whiteList(["h3[data-*]"]);
    helper.whiteList(["a[data-*]"]);
}