import { withPluginApi } from "discourse/lib/plugin-api";

const PENDING_KEY = "wct_pending_article_link";
const WAITING_KEY = "wct_pending_article_link_waiting";

function showOpenTip(url) {
  const old = document.querySelector(".wct-article-link-open-tip");
  if (old) {
    old.remove();
  }

  const bar = document.createElement("div");
  bar.className = "wct-article-link-open-tip";
  bar.innerHTML = `
    <div class="wct-article-link-open-tip__inner">
      登录成功，<a href="${url}" target="_blank" rel="noopener">点这里打开原文</a>
    </div>
  `;

  document.body.appendChild(bar);

  setTimeout(() => {
    bar.remove();
  }, 10000);
}

export default {
  name: "wechat-gate-article-link",

  initialize() {
    withPluginApi("0.8.22", (api) => {
      api.decorateCookedElement(
        (elem) => {
          elem
            .querySelectorAll('a[data-wct-type="article-link"]')
            .forEach((link) => {
              if (link.dataset.wctArticleLinkBound === "1") {
                return;
              }

              link.dataset.wctArticleLinkBound = "1";

              link.addEventListener("click", (e) => {
                const currentUser = api.getCurrentUser();

                // 已登录：保持原有行为
                if (currentUser) {
                  return;
                }

                // 未登录：拦截并弹登录
                e.preventDefault();
                e.stopPropagation();

                try {
                  localStorage.setItem(PENDING_KEY, link.href);
                  localStorage.setItem(WAITING_KEY, "1");
                } catch (err) {
                  // ignore quota / privacy errors
                }

                try {
                  const appRoute = api.container.lookup("route:application");
                  if (appRoute && typeof appRoute.send === "function") {
                    appRoute.send("showLogin");
                    return;
                  }

                  const appController =
                    api.container.lookup("controller:application");
                  if (
                    appController &&
                    typeof appController.send === "function"
                  ) {
                    appController.send("showLogin");
                    return;
                  }
                } catch (err) {
                  // ignore lookup errors
                }

                // 兜底：直接跳到登录页
                window.location.href = "/login";
              });
            });
        },
        { id: "wechat-gate-article-link", onlyStream: true }
      );

      // 登录后自动尝试打开原文链接
      const currentUser = api.getCurrentUser();
      let pendingUrl = null;
      let waiting = false;

      try {
        pendingUrl = localStorage.getItem(PENDING_KEY);
        waiting = localStorage.getItem(WAITING_KEY) === "1";
      } catch (err) {
        // ignore storage errors
      }

      if (currentUser && pendingUrl && waiting) {
        try {
          localStorage.removeItem(PENDING_KEY);
          localStorage.removeItem(WAITING_KEY);
        } catch (err) {
          // ignore
        }

        const win = window.open(pendingUrl, "_blank", "noopener");
        if (!win) {
          showOpenTip(pendingUrl);
        }
      }
    });
  },
};

