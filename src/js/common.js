//应用扩展
var TKJ = {
    config: {
        NOTICEFREQUENCY: 30 * 1000,
        AVATARSIZE: {
            "small": 30,
            "normal": 45,
            "big": 90
        }
    },
    common: {
        copy: function(obj, txt, success) {
            var self = this;
            $(obj).each(function() {
                var content = txt;
                if (typeof ZeroClipboard == "undefined") return false;
                this.clip = null;
                if ($.isFunction(txt)) {
                    content = txt.call(this);
                }
                ZeroClipboard.setMoviePath(Cute.config.SCRIPTPATH + "ZeroClipboard.swf");
                this.clip = new ZeroClipboard.Client();
                this.clip.setHandCursor(true);
                this.clip.setText(content);
                this.clip.addEventListener('onComplete', success);
                $(window).resize(function() {
                    this.clip.reposition();
                }.bind(this));
                this.clip.glue(this);
                return this.clip;
            });
        },
        //ajax加载ajax/write里的页面，一样的内容，只会加载一次
        write: function(id, params, fn) {
            if (!id) return;
            if (arguments.length < 3) {
                cache = fn;
                fn = params;
                params = {};
            }
            var cachekey = "write" + id;
            if (params.cachekey) cachekey = params.cachekey; //设置cache的key值，默认为write + 文件ID
            if (!$(document).data(cachekey)) {
                Cute.api.get("write", $.extend({
                    id: id
                }, params || {}), function(html) {
                    if (html) {
                        $(document).data(cachekey, html);
                        fn(html);
                    }
                }, false, true);
            } else {
                fn($(document).data(cachekey));
            }
        },
        bgcolorAnimation: function(obj, color) {
            Do('animatecolors', function() {
                obj = $(obj);
                obj.stop(false, true).focus();
                var _o_bgcolor = obj.css("backgroundColor");
                obj.css({
                    backgroundColor: color || "#FFC8C8"
                }).animate({
                    backgroundColor: _o_bgcolor
                }, 1000, function() {
                    this.style.cssText = this.style.cssText.replace(/background\-color[^;]+;/i, '');
                });
            });
            return false;
        },
        showEmoji: function(obj, input, parentEl) {
            var obj = $(obj);
            if (obj[0].dialog) {
                obj[0].dialog.toggle();
            } else {
                Cute.api.get('common/get_emoji', {}, function(json) {
                    var html = "";
                    $.each(json.data, function(i, item) {
                        html += '<a rel="' + item[0] + '" href="javascript:;" title="' + item[0] + '"><span class="e e' + item[1] + '"></span></a>';
                    });
                    obj[0].dialog = new Cute.ui.dialog().tooltip("layer", "", {
                        content: '<div class="d_emoji d_content">' + html + '</div>',
                        className: "tooltip emoji_dialog",
                        parentEl: parentEl,
                        width: 326,
                        pos: {
                            "top": function() {
                                return (parentEl ? obj.position().top : obj.offset().top) + obj.outerHeight() + 2;
                            },
                            "left": function() {
                                return (parentEl ? obj.position().left : obj.offset().left) - 1;
                            }
                        }
                    });
                    var form = obj.closest("form");
                    $(".d_emoji a", obj[0].dialog.pannel).click(function(e) {
                        var _this = $(this);
                        Cute.common.insertSelection(form.find(input || "textarea[name=content]")[0], "[" + _this.attr("rel") + "]");
                        form.find(input || "textarea[name=content]").trigger("keyup").css("color", "#000").trigger("keyup");
                        obj[0].dialog.hide();
                        e.preventDefault();
                        e.stopPropagation();
                    });
                    form.out("click.emoji", function(e) {
                        if (!obj[0].dialog.pannel) {
                            form.unout("click.emoji");
                            return;
                        }
                        if ($(this).has(e.target).length == 0) {
                            obj[0].dialog.hide();
                        }
                    }, true);
                });
            }
            return false;
        },
        emoji: function(str) {
            if (window['jEmoji']) {
                if (!jEmoji.EXT_EMOJI_MAP) jEmoji.EXT_EMOJI_MAP = TKJ.config.EXT_EMOJI_MAP || {};
                return jEmoji.unifiedToHTML(jEmoji.softbankToUnified(jEmoji.googleToUnified(str)));
            } else {
                return str;
            }
        },
        blockSlide: function(options) {
            var self = this;
            var opt = $.extend(true, {
                width: 468, //宽度
                height: 80, //高度
                data: [], //广告列表，例：[{url:"",image:"",title:"",target:""}],
                random: false,
                showpage: true,
                interval: 5, //轮播间隔
                styleurl: "" //特殊样式URL
            }, options);
            var iframe = $('<iframe />', {
                frameborder: 0,
                width: opt.width,
                height: opt.height
            }).css("visibility", 'hidden').load(function() {
                var iDoc = iframe.contents();
                var _html = [];
                var _head = "<style>" +
                    "html{overflow:hidden}" +
                    "body{margin:0;padding:0;font-family:Arial;-webkit-text-size-adjust:none;overflow:hidden}" +
                    "img{border:0;}" +
                    ".ad_list,.ad_ids{margin:0;padding:0;list-style:none;}" +
                    ".ad_list li{ position:absolute;top:0;left:0;display:none;}" +
                    ".ad_ids{position:absolute;bottom:10px; right:10px;z-index:50;}" +
                    ".ad_ids li{float:left;margin-left:4px;}" +
                    ".ad_ids li a{display:inline-block;font-size:9px;padding:2px 4px; border:1px solid #ddd;background-color:#eee;text-decoration:none;color:#888;zoom:1;}" +
                    ".ad_ids li a:hover{text-decoration:none;}" +
                    ".ad_ids li a.curr{border-color:#242424;color:#fff;background-color:#242424;}" +
                    "</style>";
                if (opt.styleurl) _head += '<link type="text/css" rel="stylesheet" href="' + opt.styleurl + '" />';
                iDoc.find("head").html(_head);
                var content = iDoc.find("body");
                if (opt.data.length > 0) {
                    if (opt.random)
                        opt.data = Cute.Array.shuffle(opt.data);
                    $(this).css('visibility', 'visible');
                    _html.push('<ul class="ad_list">');
                    $.each(opt.data, function(i, item) {
                        _html.push('<li><a href="' + item.url + '" target="' + (item.target ? item.target : "_blank") + '"><img dynamic-src="' + item.image + '" alt="' + item.title + '" title="' + item.title + '" width="' + opt.width + '" height="' + opt.height + '" /></a></li>');
                    });
                    _html.push('</ul>');
                    if (opt.data.length > 1 && opt.showpage) {
                        _html.push('<ul class="ad_ids">');
                        $.each(opt.data, function(i, item) {
                            _html.push('<li><a href="javascript:void(0)">' + (i + 1) + '</a></li>');
                        });
                        _html.push('</ul>');
                    }
                    content.html(_html.join('')).find(".ad_ids a").click(function() {
                        setAdItem(parseInt($(this).text()) - 1);
                    });
                    setAdItem(0);
                }

                function setAdItem(num) {
                    if (num > opt.data.length - 1) {
                        num = 0;
                    }
                    var _ulList = iDoc.find(".ad_list");
                    var _ulIds = iDoc.find(".ad_ids");
                    _ulList.children("li").filter(":visible").stop(true, true).fadeOut(1000, function() {
                        $(this).css("z-index", 0);
                    }).end().eq(num).css("z-index", 1).stop(true, true).fadeIn(1000);
                    _ulList.find("img").filter(":eq(" + num + "),:eq(" + (num + 1 > opt.data.length - 1 ? 0 : (num + 1)) + ")").attr("src", function() {
                        var src = $(this).attr("dynamic-src");
                        $(this).removeAttr("dynamic-src");
                        return src;
                    });
                    if (opt.data.length > 1) {
                        _ulIds.find("a").removeClass().eq(num).addClass("curr");
                        clearTimeout(self.timer);
                        self.timer = setTimeout(function() {
                            setAdItem(num + 1);
                        }, opt.interval * 1000);
                    }
                }
            });
            return iframe;
        },
        makeLink: function(str) {
            // http://, https://, ftp://
            var urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;

            // www. sans http:// or https://
            var pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim;

            // Email addresses
            var emailAddressPattern = /([a-z0-9\-_\.]+?)@([{a-z0-9\/\-_+=.~!%@?#&;:$\|}]+)/gim;

            // if(!str)
            //     return '';
            return str
                .replace(urlPattern, function(s, t) {
                    return '<a href="' + s + '" target="_blank" title="' + s + '">' + Cute.String.cut(s, 50, '...') + '</a>';
                })
                .replace(pseudoUrlPattern, '$1<a href="http://$2" target="_blank" title="$2">$2</a>')
                .replace(emailAddressPattern, '<a href="mailto:$1@$2">$1@$2</a>');
        },
        editor: function(el, options) {
            return $(el)[0].editor = UE.getEditor($(el).attr('id'), $.extend({
                localDomain: [TKJ.config.SITEURL.replace('http://', '')],
                initialContent: '',
                contextMenu: [],
                autoClearinitialContent: false,
                wordCount: false,
                removeFormatTags:'a,b,big,code,del,dfn,em,font,i,section,blockquote,pre,fieldset,ins,kbd,q,samp,small,span,label,strike,strong,sub,sup,tt,u,var',
                removeFormatAttributes:'class,style,lang,width,accuse,height,align,hspace,valign,data-width,data-brushtype,opacity,border,title,placeholder',
                autoHeightEnabled: false,
                indentValue: '0em',
                autoClearEmptyNode: true,
                allowDivTransToP: true,
                initialFrameWidth: $(el).outerWidth(),
                initialFrameHeight:$(el).outerHeight(),
                minFrameHeight:400,
                // iframeCssUrl: 'https://res.wx.qq.com/mpres/htmledition/style/widget/ueditor_new/themes/iframe2e46c8.css',
                scaleEnabled: false,
                imageScaleEnabled: false,
                allHtmlEnabled: false,
                elementPathEnabled: false,
                catchRemoteImageEnable: true,
                serverUrl:'/api/common/editor_controller',

                zIndex: 1,
                listDefaultPaddingLeft: '30',
                maxListLevel: -1,
                enableContextMenu:true,
                autotypeset: {
                    mergeEmptyline: true,           //合并空行
                    removeClass: false,              //去掉冗余的class
                    removeEmptyline: false,         //去掉空行
                    textAlign:false, 
                    //textAlign:"left",               //段落的排版方式，可以是 left,right,center,justify 去掉这个属性表示不执行排版
                    imageBlockLine: false,       //图片的浮动方式，独占一行剧中,左右浮动，默认: center,left,right,none 去掉这个属性表示不执行排版
                    pasteFilter: false,             //根据规则过滤没事粘贴进来的内容
                    clearFontSize: false,           //去掉所有的内嵌字号，使用编辑器默认的字号
                    clearFontFamily: false,         //去掉所有的内嵌字体，使用编辑器默认的字体
                    removeEmptyNode: false,         // 去掉空节点
                    //可以去掉的标签
                    //removeTagNames: {标签名字:1},
                    indent: false,                  // 行首缩进
                    indentValue : '2em',            //行首缩进的大小
                    bdc2sb: false,
                    tobdc: false
                },
                fontfamily:[
                    { label:'',name:'yahei',val:'微软雅黑'}, // 微软雅黑,Microsoft YaHei
                    { label:'',name:'songti',val:'宋体,SimSun'},
                    { label:'',name:'kaiti',val:'楷体,楷体_GB2312,SimKai'},
                    { label:'',name:'heiti',val:'黑体,SimHei'},
                    { label:'',name:'lishu',val:'隶书,SimLi'},
                    { label:'',name:'arial',val:'arial,helvetica,sans-serif'}
                ],
                fontsize:[10,11,12,13,14,15,16,17,18,19,20,24,28,32,36],
                autoTransWordToList: true,
                insertorderedlist:{
                     'decimal' : '' ,         //'1,2,3...'
                     'lower-alpha' : '' ,    // 'a,b,c...'
                     'lower-roman' : '' ,    //'i,ii,iii...'
                     'upper-alpha' : '' , //lang   //'A,B,C'
                     'upper-roman' : '' ,     //'I,II,III...'
                     'cjk-ideographic' : '一、二、三、',
                     'lower-greek':'α,β,γ,δ'
                },
                insertunorderedlist:{
                    'circle' : '',  // '○ 小圆圈'
                    'disc' : '',    // '● 小圆点'
                    'square' : ''   //'■ 小方块'
                },
                toolbars: [
                    ['source', 'fullscreen', 'undo', 'redo', '|', 'bold', 'italic', 'underline', 'strikethrough', '|', 'justifyleft', 'justifycenter', 'justifyright', '|', 'insertorderedlist', 'insertunorderedlist', '|', 'link', 'unlink', '|','simpleupload', 'insertimage', 'insertvideo', 'map', 'wordimage', '|', 'horizontal', 'spechars', 'removeformat', '|', 'searchreplace', '|', 'preview']
                ],
                retainOnlyLabelPasted: false,
                pasteplain:false,
                // filterTxtRules: function(){
                //    function transP(node){
                //        node.tagName = 'p';
                //        node.setStyle();
                //    }
                //    return {
                //        //直接删除及其字节点内容
                //        '-' : 'script style object embed input select table',
                //        'p': {$:{}},
                //        'br':{$:{}},
                //        'div':transP,
                //        'li':{'$':{}},
                //        'caption':transP,
                //        'th':transP,
                //        'tr':transP,
                //        'hr':{$:{}},
                //        'h1':{'$':{}},'h2':{'$':{}},'h3':{'$':{}},'h4':{'$':{}},'h5':{'$':{}},'h6':{'$':{}},
                //        'td':function(node){
                //            //没有内容的td直接删掉
                //            var txt = !!node.innerText();
                //            if(txt){
                //                node.parentNode.insertAfter(UE.uNode.createText(' &nbsp; &nbsp;'),node);
                //            }
                //            node.parentNode.removeChild(node,node.innerText())
                //        }
                //    }
                // },
                // filterRules: {
                //     br: {},
                //     iframe:{},
                //     b: function(node) {
                //         node.tagName = 'strong'
                //     },
                //     strong: {
                //         $: {}
                //     },
                //     img: {
                //         $: {
                //             'id': 1,
                //             'width': 1,
                //             'height': 1,
                //             'word_img': 1,
                //             'src': 1,
                //             'class': 1,
                //             '_url': 1
                //         }
                //     },
                //     p: {
                //         'br': 1,
                //         'BR': 1,
                //         'img': 1,
                //         'IMG': 1,
                //         'embed': 1,
                //         'object': 1,
                //         $: {}
                //     },
                //     span: {
                //         $: {
                //             'class': 1
                //         }
                //     },
                //     strong: {
                //         $: {}
                //     },
                //     i: function(node) {
                //         node.tagName = 'em'
                //     },
                //     a: function(node) {
                //         var url = node.getAttr('href');
                //         var title = node.getAttr('title');
                //         if (url.indexOf('mafengwo') !== -1) {
                //             node.parentNode.removeChild(node, true);
                //             return 0;
                //         }
                //         node.setAttr();
                //         node.setAttr('href', url);
                //         node.setAttr('title', title);
                //         node.setAttr('target', '_blank');
                //         //a:{$:{'href': 1,'title': 1, 'target':1}},
                //     },
                //     object: 1,
                //     embed: 1,
                //     dl: function(node) {
                //         node.tagName = 'ul';
                //         node.setAttr()
                //     },
                //     dt: function(node) {
                //         node.tagName = 'li';
                //         node.setAttr()
                //     },
                //     dd: function(node) {
                //         node.tagName = 'li';
                //         node.setAttr()
                //     },
                //     li: function(node) {
                //         var className = node.getAttr('class');
                //         if (!className || !/list\-/.test(className)) {
                //             node.setAttr()
                //         }
                //         var tmpNodes = node.getNodesByTagName('ol ul');
                //         UE.utils.each(tmpNodes, function(n) {
                //             node.parentNode.insertAfter(n, node);
                //         })
                //     },
                //     div: function(node) {
                //         node.tagName = 'p';
                //         node.setAttr();
                //     },
                //     ol: {
                //         $: {}
                //     },
                //     ul: {
                //         $: {}
                //     },
                //     table: function(node) {
                //         UE.utils.each(node.getNodesByTagName('table'), function(t) {
                //             UE.utils.each(t.getNodesByTagName('tr'), function(tr) {
                //                 var p = UE.uNode.createElement('p'),
                //                     child, html = [];
                //                 while (child = tr.firstChild()) {
                //                     html.push(child.innerHTML());
                //                     tr.removeChild(child);
                //                 }
                //                 p.innerHTML(html.join('&nbsp;&nbsp;'));
                //                 t.parentNode.insertBefore(p, t);
                //             })
                //             t.parentNode.removeChild(t)
                //         });
                //         var val = node.getAttr('width');
                //         node.setAttr();
                //         if (val) {
                //             node.setAttr('width', val);
                //         }
                //     },
                //     tbody: {
                //         $: {}
                //     },
                //     caption: {
                //         $: {}
                //     },
                //     th: {
                //         $: {}
                //     },
                //     td: {
                //         $: {
                //             valign: 1,
                //             align: 1,
                //             rowspan: 1,
                //             colspan: 1,
                //             width: 1,
                //             height: 1
                //         }
                //     },
                //     tr: {
                //         $: {}
                //     },
                //     h3: {
                //         $: {}
                //     },
                //     h2: {
                //         $: {}
                //     },
                //     hr:{
                //         $: {}  
                //     }
                //     //'-': 'script style meta iframe select input button'
                // }
            }, options || {}));
        }
    },
    get_upload_url: function(url, size) {
        if(!url){
            return TKJ.config.UPLOAD + '/default/placeholder_png/' + size + '.png';
        }else{
            if (size !== undefined) {
                var regex = /^(.+)\.(jpg|jpeg|png|gif)$/gi;
                console.log(size);
                console.log(url);
                filename = url.replace(regex, '$1_$2/' + size + '.$2');
            }else{
                var filename = url;
            }
            return TKJ.config.UPLOAD + "/" + filename;
        }
    },
    validator_fun: function(msg, o, cssctl) {
        var parent = o.obj.closest('td,p,div');
        if (parent.find(".Validform_checktip").length > 0) {
            var obj = parent.find(".Validform_checktip").html(msg);
        } else {
            var obj = $('<span class="Validform_checktip">' + msg + '</span>').insertAfter(o.obj);
        }
        if (o.type != 2 || o.obj.attr('ajaxurl')) {
            cssctl(obj, o.type);
        } else {
            obj.remove();
        }
    },
    user: {
        auth: function() {
            if (!TKJ.user.info.user_id) {
                new Cute.ui.dialog().alert('还没有登录！<a href="/account/login">请先登录»</a>');
                return false;
            }
            return true;
        }
    },
    switch_sync: function(obj) {
        var that = $(obj);
        $(":checkbox", that).prop('checked', function() {
            if (this.checked) {
                new Cute.ui.dialog().suggest('已取消同步到' + that.attr('data-oauth-name'));
                that.addClass('unchecked');
            } else {
                new Cute.ui.dialog().suggest('已恢复同步到' + that.attr('data-oauth-name'));
                that.removeClass('unchecked');
            }
            return !this.checked;
        });
    },
    URLSafeBase64Encode: function($originalStr) {
        $find = array("+", "/");
        $replace = array("-", "_");
        return str_replace($find, $replace, Cute.string.base64_encode($originalStr));
    },
    get_base_city: function() {
        return Cute.api.get('', {}, function(json) {
            if (json && json.city) {
                Cute.Cookie.set(TKJ.config.COOKIEPRE + 'base_city', json.city);
            }
        }, false, true, {
            dataType: 'jsonp',
            url: 'http://ws.qunar.com/ips.jcp'
        });
    }
};