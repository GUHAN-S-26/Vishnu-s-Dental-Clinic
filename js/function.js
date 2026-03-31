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
        }
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
