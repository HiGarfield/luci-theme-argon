/**
 *  Argon is a clean HTML5 theme for LuCI. It is based on luci-theme-material and Argon Template
 *
 *  luci-theme-argon
 *      Copyright 2023 Jerrykuku <jerrykuku@qq.com>
 *
 *  Have a bug? Please create an issue here on GitHub!
 *      https://github.com/jerrykuku/luci-theme-argon/issues
 *
 *  luci-theme-bootstrap:
 *      Copyright 2008 Steven Barth <steven@midlink.org>
 *      Copyright 2008 Jo-Philipp Wich <jow@openwrt.org>
 *      Copyright 2012 David Menting <david@nut-bolt.nl>
 *
 *  MUI:
 *      https://github.com/muicss/mui
 *
 *  luci-theme-material:
 *      https://github.com/LuttyYang/luci-theme-material/
 *
 *  Argon Theme
 *	    https://demos.creative-tim.com/argon-dashboard/index.html
 *
 *  Login background
 *      https://unsplash.com/
 *
 *  Licensed to the public under the Apache License 2.0
 */

/*
 *  Font generate by Icomoon<icomoon.io>
 */
(function ($) {
    $(".main > .loading").fadeOut();

    /**
     * trim text, Remove spaces, wrap
     * @param text
     * @returns {string}
     */
    function trimText(text) {
        return text.replace(/[ \t\n\r]+/g, " ");
    }

    $(".cbi-button-up").val("");
    $(".cbi-button-down").val("");

    /**
     * hook other "A Label" and add hash to it.
     */
    $("#maincontent > .container").find("a").each(function () {
        var that = $(this);
        var onclick = that.attr("onclick");
        if (onclick == undefined || onclick == "") {
            that.click(function () {
                var href = that.attr("href");
                var normalizedHref = typeof href === "string" ? href.trim().toLowerCase() : "";
                var compactHref = normalizedHref.replace(/\s+/g, "");
                if (compactHref !== "" &&
                    compactHref.indexOf("#") === -1 &&
                    compactHref.indexOf("javascript:") !== 0 &&
                    compactHref.indexOf("vbscript:") !== 0 &&
                    compactHref.indexOf("data:") !== 0 &&
                    compactHref.indexOf("mailto:") !== 0 &&
                    compactHref.indexOf("tel:") !== 0) {
                    $(".main > .loading").fadeIn("fast");
                    return true;
                }
            });
        }
    });

    /**
     * fix legend position
     */
    $("legend").each(function () {
        var that = $(this);
        that.after("<span class='panel-title'>" + that.text() + "</span>");
    });

    $(".cbi-section-table-titles, .cbi-section-table-descr, .cbi-section-descr").each(function () {
        var that = $(this);
        if (that.text().trim() == "") {
            that.css("padding", "0px");
        }
    });

    $(".node-main-login > .main .cbi-value.cbi-value-last .cbi-input-text").focus(function () {
        //$(".node-main-login > .main > .main-right > .login-bg").addClass("blur");
    });
    $(".node-main-login > .main .cbi-value.cbi-value-last .cbi-input-text").blur(function () {
        //$(".node-main-login > .main > .main-right > .login-bg").removeClass("blur");
    });

    $(".main-right").focus();
    $(".main-right").blur();
    $("input").attr("size", "0");

})(jQuery);
