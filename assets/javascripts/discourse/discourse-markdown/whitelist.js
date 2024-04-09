export function setup(helper) {
    if (!helper.markdownIt) { return; }
    helper.whiteList(["p[data-*]"]);
    helper.whiteList(["img[data-*]"]);
    helper.whiteList(["video[data-*]"]);
}