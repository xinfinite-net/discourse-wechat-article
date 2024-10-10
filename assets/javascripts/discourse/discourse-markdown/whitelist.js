export function setup(helper) {
    if (!helper.markdownIt) { return; }
    helper.allowList(["p[data-*]"]);
    helper.allowList(["img[data-*]"]);
    helper.allowList(["h2[data-*]"]);
    helper.allowList(["h3[data-*]"]);
    helper.allowList(["h4[data-*]"]);
    helper.allowList(["h5[data-*]"]);
    helper.allowList(["h6[data-*]"]);
    helper.allowList(["a[data-*]"]);
}