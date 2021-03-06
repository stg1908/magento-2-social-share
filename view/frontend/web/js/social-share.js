/**
 * Copyright © 2016 Magento. All rights reserved.
 * See COPYING.txt for license details.
 */

define(["jquery"], function ($) {
    "use strict";
    return function socialShare (data) {
        var socialShare = {
            config: data.config,
            url: data.url,
            title: data.title,
            image: data.image,
            shareBlock: "#shareto .share-list",
            shareButton: "#shareto .button",
            itemClass: "share-icon",
            iconFont: "entypo",
            iconType: "square",
            width: 800,
            height: 600,

            /**
             * Initialize
             */
            init: function () {
                this.click();
                this.render(this.config, this.url);
                this.openPopup();
            },

            /**
             * TODO
             * Click action
             */
            click: function () {
                $(this.shareButton).on("click", function () {
                    $(this.shareBlock).toggle();
                }.bind(this));
            },

            /**
             * render share items
             * @param config
             * @param url
             */
            render: function (config, url) {
                var $this = this;
                var shareBlock = $(this.shareBlock);
                for (var key in config) {
                    if (config.hasOwnProperty(key) && config[key].enable === "1") {
                        var shareItem = $("<li>", {class: $this.itemClass + " " + $this.iconFont + "-" + key});
                        var shareLink = $("<a>");
                        var href = "";
                        switch (key) {
                        case "facebook":
                            href = config[key].link + "?t=" + $this.title + "&u=" + url;
                            break;
                        case "twitter":
                            href = config[key].link + "?text=" + $this.title + "&url=" + url;
                            break;
                        case "gplus":
                            href = config[key].link + "?url=" + url;
                            break;
                        case "pinterest":
                            href = config[key].link + "?description=" + $this.title + "&url=" + url + "&media=" + this.image;
                            break;
                        }

                        // render item
                        shareLink.attr("href", href);
                        shareItem.append(shareLink);
                        shareBlock.append(shareItem);
                    }
                }
            },

            /**
             * Open share page in new window
             */
            openPopup: function () {
                var $this = this;
                $(this.shareBlock).find("." + this.itemClass).click(function () {
                    var newWindow = window.open($(this).find("a").prop("href"), "", "height=" + $this.height + ",width=" + $this.width + "");
                    if (window.focus) {
                        newWindow.focus();
                    }
                    return false;
                });
            }
        };

        $(document).ready(function () {
            socialShare.init();
        });
    };
});
