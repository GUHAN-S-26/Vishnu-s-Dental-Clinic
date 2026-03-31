(function () {
    "use strict";

    var $ = typeof window.jQuery !== "undefined" ? window.jQuery : null;

    function initWow() {
        if (typeof WOW !== "undefined") {
            new WOW().init();
        }
    }

    function hidePreloaderFallback() {
        var loadingContainer = document.querySelector(".loading-container");
        var preloader = document.querySelector(".preloader");

        if (loadingContainer) {
            loadingContainer.style.display = "none";
        }
        if (preloader) {
            preloader.style.display = "none";
        }
    }

    function initPreloader() {
        var hasHidden = false;

        function hidePreloader() {
            if (hasHidden) {
                return;
            }

            hasHidden = true;

            if ($ && $.fn && $.fn.fadeOut) {
                $(".loading-container").fadeOut(400, function () {
                    $(".preloader").fadeOut(300);
                });
                return;
            }

            hidePreloaderFallback();
        }

        if (document.readyState === "complete") {
            hidePreloader();
            return;
        }

        if ($) {
            $(window).on("load", hidePreloader);
        } else {
            window.addEventListener("load", hidePreloader);
        }

        window.setTimeout(hidePreloader, 2500);
    }

    function initMobileMenu() {
        if ($ && $.fn && $.fn.slicknav) {
            $("#menu").slicknav({
                prependTo: ".responsive-menu",
                label: ""
            });
            return;
        }

        var menu = document.querySelector("#menu");
        var toggleHost = document.querySelector(".navbar-toggle");
        var responsiveHost = document.querySelector(".responsive-menu");

        if (!menu || !toggleHost || !responsiveHost) {
            return;
        }

        // Build a lightweight fallback menu so mobile nav works without jQuery plugins.
        var button = document.createElement("button");
        button.type = "button";
        button.className = "mobile-menu-btn";
        button.setAttribute("aria-expanded", "false");
        button.setAttribute("aria-label", "Toggle navigation menu");
        button.innerHTML = "<span></span><span></span><span></span>";

        var panel = document.createElement("div");
        panel.className = "fallback-mobile-menu";

        var menuClone = menu.cloneNode(true);
        menuClone.removeAttribute("id");
        panel.appendChild(menuClone);

        toggleHost.innerHTML = "";
        responsiveHost.innerHTML = "";
        toggleHost.appendChild(button);
        responsiveHost.appendChild(panel);

        button.addEventListener("click", function () {
            var isOpen = button.classList.toggle("is-open");
            responsiveHost.classList.toggle("is-open", isOpen);
            button.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });

        responsiveHost.addEventListener("click", function (event) {
            if (event.target.tagName === "A") {
                button.classList.remove("is-open");
                responsiveHost.classList.remove("is-open");
                button.setAttribute("aria-expanded", "false");
            }
        });

        window.addEventListener("resize", function () {
            if (window.innerWidth > 991) {
                button.classList.remove("is-open");
                responsiveHost.classList.remove("is-open");
                button.setAttribute("aria-expanded", "false");
            }
        });
    }

    function initGalleryPopup() {
        if ($ && $.fn && $.fn.magnificPopup) {
            $(".gallery-items").magnificPopup({
                delegate: "a",
                type: "image",
                gallery: { enabled: true }
            });
        }
    }

    function init() {
        initWow();
        initPreloader();
        initMobileMenu();
        initGalleryPopup();
    }

    if ($) {
        $(init);
    } else if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
}());
