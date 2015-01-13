/**
 * Main JS file for Spooky SPA behaviours
 */

/* globals jQuery, window, document */
(function ($, window, document) {
    "use strict";

    var $document = $(document);
    var $body = $('body');

    $document
        .on('click', 'a, .post-title>a, .read-more', function(event) {
            var link = this;
            var $link = $(link);
        
            if (link.host == window.location.host) { // Test if link is internal

                var $postWrap = $link.closest('.post-wrap');
                var $postContainer = $postWrap.find('.post-container');
                var $postExcerpt = $postContainer.find('.post');
                var postRect = $postWrap[0].getBoundingClientRect();
                
                $.ajax({
                    url: link.href,
                    success: function(data) {
                        var $data = $(data);
                        var $post = $data.find('article.post');
                        
                        $postContainer.append(
                            $post
                                .css({
                                    position: 'absolute',
                                    top: 0,
                                    width: '100%',
                                    opacity: 0
                                })
                                .velocity({
                                        opacity: 1
                                    }, {
                                        complete: function() {
                                            $postExcerpt.css({
                                                display: 'none',
                                                opacity: 0
                                            });
                                            $post.css({
                                                position: ''
                                            });
                                        }
                                })
                        );
                    }
                });

                var placeholder = $('<div>')
                    .prop({class: 'post-wrap'})
                    .css({
                        width: '100%',
                        height: postRect.height
                    })
                ;

                $postWrap
                    .before(placeholder)
                    .css({
                        position: 'fixed',
                        width: '100%',
                        top: 0,
                        backgroundColor: 'white',
                        zIndex: 123
                    })
                    .velocity({
                        paddingTop: 150
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
                
                return false;
            } else {
                return true; // Follow external link
            }
        })
    ;

})(jQuery, window, document);
