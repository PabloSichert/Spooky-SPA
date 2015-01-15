/**
 * Main JS file for Spooky SPA behaviours
 */

/* globals jQuery, window, document */
(function ($, window, document) {
    "use strict";

    var $document = $(document);
    var $body = $('body');
    var overlayStack = [];

    $document
        .on('click', '.post-title>a, .read-more', function(event) {
            var link = this;
            var $link = $(link);
        
            if (link.host == window.location.host) { // Test if link is internal

                var $postWrap = $link.closest('.post-wrap');
                var $postContainer = $postWrap.find('.post-container');
                var $postExcerpt = $postContainer.find('.post');
                var postRect = $postWrap[0].getBoundingClientRect();
                var $placeholder = $('<div>')
                    .prop({class: 'post-wrap'})
                    .css({
                        width: '100%',
                        height: postRect.height
                    })
                ;
                var $fullPost = $();

                var overlayIndex = overlayStack.push({
                    $postWrap: $postWrap,
                    $postContainer: $postContainer,
                    $postExcerpt: $postExcerpt,
                    $placeholder: $placeholder,
                    $fullPost: $fullPost
                });
                
                $.ajax({
                    url: link.href,
                    success: function(data) {
                        var $data = $(data);
                        var $fullPost = overlayStack[overlayIndex - 1].$fullPost = $data.find('article.post');
                        
                        $postContainer.append($fullPost);

                        $fullPost
                            .css({
                                position: 'absolute',
                                top: 0,
                                width: '100%',
                                opacity: 0
                            })
                            .snabbt({
                                opacity: 1,
                                callback: function() {
                                    $postExcerpt.css({
                                        display: 'none',
                                        opacity: 0
                                    });
                                    $fullPost.css({
                                        position: ''
                                    });
                                }
                            })
                        ;
                    }
                });

                $postWrap
                    .before($placeholder)
                    .css({
                        position: 'fixed',
                        width: '100%',
                        top: 0,
                        backgroundColor: 'white',
                        zIndex: 123
                    })
                    .snabbt({
                        duration: 400,
                        easing: function(value) {
                            return 1 - Math.pow(1-value, 2);
                        },
                        fromPosition: [
                            0,
                            postRect.top,
                            0
                        ],
                        position: [
                            0,
                            0,
                            0
                        ],
                        fromHeight: postRect.height,
                        height: window.innerHeight,
                        callback: function() {
                            $body.css({
                                overflowY: 'hidden'
                            });
                            $postWrap
                                .css({
                                    overflowY: 'scroll'
                                })
                            ;   
                        }
                    })
                ;
                
                $postContainer
                    .snabbt({
                        duration: 200,
                        easing: function(value) {
                            return 1 - Math.pow(1-value, 2);
                        },
                        position: [
                            0,
                            150,
                            0
                        ]
                    })
                ;

                return false;
            } else {
                return true; // Follow external link
            }
        })
        .on('click', '.back-button', function(event) {
            var link = this;
            var $link = $(link);

            if (link.host == window.location.host) { // Test if link is internal

                var overlay = overlayStack.pop();console.log(overlay);
                var placeholderRect = overlay.$placeholder[0].getBoundingClientRect();

                $body.css({
                    overflowY: ''
                });

                overlay.$postWrap
                    .css({
                        overflowY: ''
                    })
                    .snabbt({
                        duration: 200,
                        position: [
                            0,
                            placeholderRect.top,
                            0
                        ],
                        height: placeholderRect.height,
                        callback: function() {

                            overlay.$placeholder.remove();

                            overlay.$postWrap
                                .removeAttr('style');
                            ;
                        }
                    })
                ;

                overlay.$postContainer
                    .snabbt({
                        duration: 200,
                        position: [
                            0,
                            0,
                            0
                        ]
                    })
                ;

                overlay.$fullPost.remove(); console.log(overlay.$fullPost);
                overlay.$postExcerpt.css({display: '', opacity: ''});

                return false;
            } else {
                return true; // Follow external link
            }
        })
    ;

})(jQuery, window, document);
