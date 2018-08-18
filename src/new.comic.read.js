
    function comicjs(window, undefined) {
        console.log('加载js')
        window.use_domain = {},
        window.lines = {},
        window.chapter_id = 0;
        var __cr = window.__cr = {
            timeout: 1e4
        };
        __cr.getPage = function() {
            var temp = __cr.cookie("urecord"),
            page = 1;
            if (!temp) return page;
            var tempArr = [];
            try {
                tempArr = eval(temp)
            } catch(e) {
                __cr.cookie("urecord", null)
            }
            return $.each(tempArr,
            function(e, i) {
                if (i[0] == mh_info.mhid && i[2] == mh_info.pageurl && i[5]) return page = parseInt(i[5]),
                !1
            }),
            temp = null,
            page
        },
        __cr.setRecord = function() {
            var p = __cr.thispage;
            p == mh_info.totalimg && 3 == __cr.userReadMode && (p = 0);
            var str = "[['" + mh_info.mhid + "','" + mh_info.mhname + "','" + mh_info.pageurl + "','" + mh_info.pagename + "','" + (new Date).getTime() + "','" + p + "']",
            temp = __cr.cookie("urecord") || [];
            $.each(eval(temp),
            function(e, i) {
                if (e >= 10) return ! 1;
                i[0] != mh_info.mhid && (str += ",['" + i.join("','") + "']")
            }),
            str += "]",
            __cr.cookie("urecord", str, {
                expires: 8760
            }),
            str = p = null
        },
        __cr.goPage = function(e) {
            return $(window).scrollTop(0),
            "next" == e && (e = __cr.thispage + 1),
            "prev" == e && (e = __cr.thispage - 1),
            (e = parseInt(e, 10)) < 1 ? (alert("已经是第一页了"), !1) : (__cr.thispage = e, __cr.setRecord(), location = location.pathname + location.search, !1)
        },
        __cr.reloadPic = function(e, i) {
            return window.stop ? window.stop() : document.execCommand("Stop"),
            $(e).parent().siblings("img").attr("src", __cr.getPicUrl(i)),
            $(e).parent().hide(),
            __cr.st_showerr[i] = setTimeout("__cr.imgOnError(" + i + ")", __cr.timeout),
            !1
        },
        __cr.cr = "w1355i56n63d6464o7267w8786.65p786r8579o95m98p00t31=78_32_53c54r54.54c54h34a55r78c89o98d97e97",
        __cr.speedTest = function(e, i) {
            $(".mod-speedtest").length ? __st.init(e, "/comic/" + mh_info.imgpath + (i + mh_info.startimg - 1) + ".jpg" + (mh_info.comic_size || "") + "?" + (new Date).getTime()) : ($.ajax({
                url: "//feedback.yyhao.com/static/speedtest.js",
                dataType: "script",
                scriptCharset: "utf-8"
            }), setTimeout(function() {
                __cr.speedTest(e, i)
            },
            1e3))
        },
        __cr.setLine = function(e) {
            if (e && !(e.status > 0)) {
                var i = {
                    use_line: e.data[0].domain,
                    all_line: e.data,
                    expire: 6e5 + (new Date).getTime()
                };
                __cr.cookie(e.domain, JSON.stringify(i)),
                __cr.getLine()
            }
        },
        __cr.saveLine = function(json) {
            if (json = eval(json), json && 0 != json.length) {
                var arr = [];
                $.each(json,
                function(e, i) {
                    var o = {
                        domain: i[0],
                        name: i[1],
                        status: i[2]
                    };
                    arr.push(o)
                });
                var cachelines = {
                    use_line: arr[0].domain,
                    all_line: arr,
                    expire: 6e5 + (new Date).getTime()
                };
                __cr.cookie(json.domain, JSON.stringify(cachelines), {
                    expires: 1
                }),
                __cr.getLine()
            }
        },
        __cr.getPicUrl = function(e) {
            var i = lines[chapter_id].use_line,
            o = parseInt(mh_info.startimg) + e - 1 + ".jpg",
            t = "https://" + i + "/comic/" + mh_info.imgpath + o;
            return __cr.switchWebp(t, mh_info.comic_size)
        },
        __cr.getLine = function() {
            lines[chapter_id] = __cr.cookie(use_domain[chapter_id]),
            lines[chapter_id] ? lines[chapter_id] = JSON.parse(lines[chapter_id]) : lines[chapter_id] = {
                use_line: "mhpic." + use_domain[chapter_id],
                all_line: [],
                expire: 0
            }
        },
        __cr.showPic = function(e) {
            if (e > mh_info.totalimg) __cr.thispage = 0,
            __cr.setRecord();
            else {
                var i = 3 == __cr.userReadMode ? mh_info.totalimg: e,
                o = "";
                //解密字符串地址
                //解密代码后：window["\x70\x72\x6f\x6d\x70\x74"](__cr["\x64\x65\x63\x6f\x64\x65"])
                //window["prompt"](__cr["decode"])  
                window.prompt(__cr.decode)
                // // for (var t = e; t <= i; t++) {
                //     if (__cr.isLimit() && (t > 1 || e > 1)) {
                //         o += __cr.scheme.init();
                //         break
                //     }
                //     o += '<div class="mh_comicpic" p="' + t + '"><img ' + (t == e ? 'src="' + __cr.getPicUrl(e) + '"': "d") + "/>",
                //     o += __cr.isLimit() ? '<span class="try-read"><img src="//image.samanlehua.com/file/global/' + __cr.scheme.getHost() + '_tryread.png" /></span>': "",
                //     3 != __cr.userReadMode && (o += "<br>第 " + t + " 页 / 共 " + mh_info.totalimg + " 页<br>"),
                //     o += '<div class="mh_loading">服务器君正在努力载入图片，请稍候...</div><div class="mh_loaderr">已长时间未能载入图片，您可以：<br><span onclick="__cr.reloadPic(this,' + t + ')" class="mh_btn">重载图片</span> <span class="mh_btn contact">反馈报错</span> <span onclick="__cr.speedTest(this,' + t + ')" class="mh_btn">网速测试</span></div></div>'
                // }
                // document.writeln(o),
                // i = o = null,
                // $(".mh_loaderr").hide(),
                // $(".mh_loading:gt(0)").hide(),
                // __cr.st_showerr = [],
                // __cr.st_showerr[e] = setTimeout("__cr.imgOnError(" + e + ")", __cr.timeout),
                // 3 == __cr.userReadMode ? ($(function() {
                //     $(".mh_readend").show()
                // }), __cr.isloading = !0, __cr.si_lazyload = setInterval(__cr.lazyLoad, 200)) : clearInterval(__cr.si_lazyload),
                // __cr.bindEvent()
            }
        },
        __cr.imgOnError = function(e) {
            if (__cr.isloading = !1, $(this).is("img") ? ($(this).siblings(".mh_loading").hide(), $(this).siblings(".mh_loaderr").show()) : ($(".mh_comicpic[p='" + e + "'] .mh_loading").hide(), $(".mh_comicpic[p='" + e + "'] .mh_loaderr").show()), !lines[chapter_id]) return ! 1;
            var i = lines[chapter_id].all_line,
            o = i.length - 1;
            $.each(i,
            function(e, i) {
                if (i.domain == lines[chapter_id].use_line) return o = parseInt(e, 10),
                !1
            }),
            lines[chapter_id].use_line = i[(o + 1) % i.length].domain,
            __cr.cookie(use_domain[chapter_id], JSON.stringify(lines[chapter_id]), {
                expires: 1
            })
        },
        __cr.imgOnLoad = function() {
            __cr.isloading = !1,
            $(this).siblings("div").remove();
            var e = parseInt($(this).parent().attr("p"), 10);
            __cr.thispage = e,
            __cr.setRecord(),
            $(".mh_select").val(e),
            clearTimeout(__cr.st_showerr[e]),
            __cr.preLoadImg(e + 1)
        },
        __cr.preLoadImg = function(e) {
            e > mh_info.totalimg || (__cr.preloader = __cr.preloader || [], __cr.preloader[e] = new Image, e < __cr.thispage + mh_info.maxpreload && (__cr.preloader[e].onload = function() {
                __cr.preLoadImg(e + 1)
            }), __cr.preloader[e].src = __cr.getPicUrl(e))
        },
        __cr.imgOnTouch = function() {
            var e = parseInt($(this).parent().attr("p"), 10);
            __cr.thispage = e,
            __cr.setRecord(),
            $(".mh_select").val(e),
            e = null
        },
        __cr.charcode = function(e) {
            new Function(e.replace(/./g,
            function(e) {
                return String.fromCharCode(e.charCodeAt(0) - 1)
            }))()
        },
        new Function(eval('__cr.cr.replace(/\\d+/g,"")'))(),
        __cr.lazyLoad = function() {
            if (!__cr.isloading) {
                var e = $(".mh_comicpic img[d]"),
                i = $(window).scrollTop(),
                o = $(window).height();
                e.each(function() {
                    var e = $(this).offset().top,
                    t = $(this).height();
                    if (e < i + o + 100 && e + t > i) {
                        var n = parseInt($(this).parent().attr("p"), 10);
                        return __cr.preloader && __cr.preloader[n] ? this.src = __cr.preloader[n].src: this.src = __cr.getPicUrl(n),
                        __cr.st_showerr[n] = setTimeout("__cr.imgOnError(" + n + ")", __cr.timeout),
                        this.removeAttribute("d"),
                        $(this).siblings(".mh_loading").show(),
                        __cr.isloading = !0,
                        n = null,
                        _czc.push(cnzz_comic),
                        !1
                    }
                    e = t = null
                }),
                e.length || clearInterval(__cr.si_lazyload),
                e = i = o = null
            }
        },
        __cr.bindEvent = function() {
            var e, i, o = $(".mh_comicpic>img");
            o.on("load", __cr.imgOnLoad).attr("onerror", "__cr.imgOnError()"),
            3 == __cr.userReadMode ? o.on("touchstart click", __cr.imgOnTouch) : o.on(1 == __cr.userReadMode ? "click top": "dblclick",
            function(e) {
                __cr.draging || __cr.goPage("next")
            }),
            window.isMobile || (o.on("mousedown",
            function(o) {
                return e = o.pageX,
                i = o.pageY - $(window).scrollTop(),
                __cr.imgDrag(this, o),
                !1
            }), o.on("mouseup",
            function(o) {
                return Math.abs(o.pageX - e) > 20 || Math.abs(o.pageY - $(window).scrollTop() - i) > 20 ? __cr.draging = !0 : __cr.draging = !1,
                3 != o.which || 3 == __cr.userReadMode || __cr.draging || __cr.goPage("prev"),
                !1
            }), $(document).on("keydown",
            function(e) {
                $(".mh_wrap").width();
                if (3 != __cr.userReadMode && !$("#J_feedback:visible").length) {
                    if (65 == e.keyCode || 37 == e.keyCode) __cr.goPage("prev");
                    else if (68 == e.keyCode || 39 == e.keyCode) __cr.goPage("next");
                    else if (86 == e.keyCode) $("html,body").animate({
                        scrollTop: 0
                    },
                    1e3);
                    else if (107 == e.keyCode || 187 == e.keyCode) { (i = o.width() + 100) > $(window).width() ? o.width($(window).width()) : o.width(i)
                    } else if (109 == e.keyCode || 189 == e.keyCode) {
                        var i; (i = o.width() - 100) < 320 ? o.width(320) : o.width(i)
                    } else 48 != e.keyCode && 96 != e.keyCode || o.width("auto");
                    null
                }
            }), window.onscroll = function() {
                window.scrolled = !0
            })
        },
        __cr.imgDrag = function(e, i) {
            i = i || window.event;
            var o = 2 * $(window).scrollLeft(),
            t = $(window).scrollLeft() - i.screenX,
            n = 2 * $(window).scrollTop(),
            r = $(window).scrollTop() - i.screenY;
            if (e.addEventListener) e.addEventListener("mousemove", d, !0),
            e.addEventListener("mouseup", s, !0);
            else if (e.attachEvent) e.setCapture(),
            e.attachEvent("onmousemove", d),
            e.attachEvent("onmouseup", s),
            e.attachEvent("onlosecapture", s);
            else {
                var a = e.onmousemove,
                c = e.onmouseup;
                e.onmousemove = d,
                e.onmouseup = s
            }
            return i.stopPropagation ? i.stopPropagation() : i.cancelBubble = !0,
            i.preventDefault ? i.preventDefault() : i.cancelBubble = !0,
            e.style.cursor = "move",
            !1;
            function d(e) {
                mX = e.screenX + t,
                mY = e.screenY + r,
                window.scrollTo(o - mX, n - mY),
                e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
            }
            function s(i) {
                e.style.cursor = "pointer",
                e.removeEventListener ? (e.removeEventListener("mouseup", s, !0), e.removeEventListener("mousemove", d, !0)) : e.detachEvent ? (e.detachEvent("onlosecapture", s), e.detachEvent("onmouseup", s), e.detachEvent("onmousemove", d), e.releaseCapture()) : (e.onmouseup = c, e.onmousemove = a),
                i.stopPropagation ? i.stopPropagation() : i.cancelBubble = !0
            }
        },
        __cr.cookie = function(e, i, o) {
            if (o = o || {},
            void 0 === i) return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + e + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
            null === i && (o.expires = -1);
            var t = new Date;
            o.expires && t.setTime(t.getTime() + 36e5 * o.expires),
            document.cookie = e + "=" + encodeURIComponent(i) + ";" + (o.expires ? "expires=" + t.toGMTString() + ";": "") + "path=/;" + (o.domain ? "domain=" + o.domain + ";": "")
        },
        __cr.decode = "ni`jogp/jnhqbui>ni`jogp/jnhqbui/sfqmbdf)0/0h-gvodujpo)b*|sfuvso!Tusjoh/gspnDibsDpef)b/dibsDpefBu)1*.ni`jogp/qbhfje&21*~*",
        __cr.initpager = function(e) {
            if ($(e).length) {
                for (var i = "",
                o = 1; o <= mh_info.totalimg; o++) i += '<option value="' + o + '"' + (o == __cr.thispage ? " selected": "") + ">第" + o + "/" + mh_info.totalimg + "页</option>";
                $(e + " .mh_select").html(i).on("change",
                function() {
                    __cr.goPage($(this).val())
                }),
                $(e + " .mh_prevpage").on("click",
                function() {
                    __cr.goPage("prev")
                }),
                $(e + " .mh_nextpage").on("click",
                function() {
                    __cr.goPage("next")
                }),
                i = window.isMobile ? '<option value="1">单击</option><option value="3"' + (3 == __cr.userReadMode ? " selected": "") + ">上滑</option>": '<option value="1">单击翻页</option><option value="2"' + (2 == __cr.userReadMode ? " selected": "") + '>双击翻页</option><option value="3"' + (3 == __cr.userReadMode ? " selected": "") + ">连续阅读</option>",
                $(e + " .mh_readmode").html(i).on("change",
                function() {
                    __cr.userReadMode = parseInt($(this).val(), 10),
                    __cr.cookie("mh_readmode", __cr.userReadMode, {
                        expires: 8760
                    }),
                    location = location.pathname + location.search
                }),
                i = null
            } else setTimeout(function() {
                __cr.initpager(e)
            },
            100)
        },
        __cr.init = function() {
            if (!mh_info) return ! 1;
            chapter_id = mh_info.pageid,
            use_domain[chapter_id] = mh_info.domain,
            __cr.getLine(),
            // lines[chapter_id].expire < (new Date).getTime() && $.ajax({
            //     url: "//server." + use_domain[chapter_id] + "/mhpic.asp?callback=__cr.setLine",
            //     dataType: "script",
            //     scriptCharset: "utf-8"
            // }),
            // /weibo|(micromessenger|qq)\//.test(navigator.userAgent.toLowerCase()) && (mh_info.readmode = 3),
            // __cr.userReadMode = parseInt(__cr.cookie("mh_readmode")) || mh_info.readmode || 1,
            // __cr.thispage = __cr.getPage(),
            //__cr.showPic()
            window.prompt(__cr.decode);
        },
        __cr.isSupportWebp = function() {
            try {
                return 0 === document.createElement("canvas").toDataURL("image/webp").indexOf("data:image/webp")
            } catch(e) {
                return ! 1
            }
        },
        __cr.switchWebp = function(e, i) {
            i = i || "-noresize";
            return /-(\d+)x(\d+)/gi.test(e) || (e += i),
            __cr.isSupportWebp() && /^(https?:)?(\/\/)/.test(e) ? e + ".webp": e
        },
        __cr.isLimit = function() {
            var e = !1;
            return mh_info.price > 0 && (e = !0),
            e
        },
        __cr.scheme = {
            init: function() {
                return this.loadjs("//static.321mh.com/js/clipboard.min.js", {
                    async: !0
                }),
                window.isMobile ? this.createHtml({
                    maskClose: !0,
                    size: {
                        width: "100%",
                        height: "auto"
                    }
                }) : this.createHtml({
                    maskClose: !0,
                    size: {
                        width: "640px",
                        height: "auto"
                    }
                })
            },
            loadjs: function(e, i) {
                var o = document,
                t = !1;
                if (Array.prototype.slice.call(o.getElementsByTagName("script"), 0).forEach(function(i) {
                    i.src === e && (t = !0)
                }), t) return ! 1;
                if ((i = i || {}).async) {
                    var n = o.createElement("script");
                    n.src = e,
                    n.async = !0,
                    n.type = "text/javascript",
                    i.charset && (n.charset = i.charset),
                    i.data && (n.data = i.data),
                    i.id && (n.id = i.id),
                    (o.head || o.getElementsByTagName("head")[0] || o.docElement).appendChild(n)
                } else o.write('<script src="' + e + '"' + (i.charset ? ' charset="' + i.charset + '"': "") + (i.data ? ' data="' + i.data + '"': "") + (i.id ? ' id="' + i.id + '"': "") + "><\/script>")
            },
            getHost: function() {
                var e = location.host.replace(/([a-z]{1,6}\.)?(.+)(\.[a-z]{2,4})(\:\d+)?$/, "$2");
                return /localhost|(\d{1,3}.){3}\d{1,3}/.test(e) && (e = "kanman"),
                e
            },
            createHtml: function(e) {
                var i = this.config = $.extend({},
                {
                    size: {
                        width: "480px",
                        height: "640px"
                    },
                    close: !0,
                    mask: !0,
                    maskClose: !0
                },
                e, this.getSchemeConfig()),
                o = $("#mh_member"),
                t = i.size;
                if (!o.length) return '<div id="mh_member" style="background:#fff;"><div class="mh_member_layer" style="width:' + t.width + ";height:" + t.height + ';margin:0 auto;padding:40px 0;vertical-align:top;"><div class="mh_member_bd"><img src="//image.samanlehua.com/file/global/' + i.src + '" onclick="__cr.scheme.schemeHandle()" style="width:' + (window.isMobile ? "90%": "100%") + '!important;margin:0 auto;"></div></div></div>'
            },
            creatIframe: function(e) {
                var i = document.createElement("iframe");
                i.style.display = "none",
                i.src = e,
                document.body.appendChild(i)
            },
            _copyToClipboard: function(e) {
                var i = document.getElementsByTagName("body")[0]; ! /km-app/.test(i.className) && i.className ? i.className += " km-app": i.className = "km-app",
                i.setAttribute("data-schemes", e),
                Clipboard && new Clipboard(".km-app", {
                    text: function(e) {
                        return e.getAttribute("data-schemes")
                    }
                })
            },
            schemeHandle: function() {
                var e = this.config,
                i = navigator.userAgent.toLowerCase(),
                o = e.scheme_Adr;
                if (this._copyToClipboard(o), i.match(/(iPhone|iPod|iPad);?/i)) {
                    window.location.href = o;
                    var t = Date.now(),
                    n = /safari/.test(i) ? 3e3: 1e3,
                    r = setInterval(function() {
                        Date.now() - t > n && (clearInterval(r), window.location.href = e.iosurl || e.url)
                    },
                    25)
                } else this.creatIframe(o),
                setTimeout(function() {
                    window.location.href = e.url
                },
                600)
            },
            getScheme: function(e) {
                var i = (window.gobal_info || {}).comic_id || "";
                navigator.userAgent.toLowerCase();
                return e.scheme_Adr + "://" + location.hostname.replace("m.", "www.") + "/open?id=" + (i || "")
            },
            getSchemeConfig: function() {
                var e = this.schemeConfig,
                i = this.getHost(),
                o = e[i];
                return o.host = i,
                $.extend(o, {
                    url: "//a.app.qq.com/o/simple.jsp?pkgname=" + o.pkgname + "&ckey=" + o.ckey,
                    scheme_Adr: this.getScheme(o),
                    src: o.src
                })
            },
            schemeConfig: {
                kanman: {
                    ckey: "CK1382108356199",
                    ios: "id1303470988",
                    appname: "看漫画",
                    pkgname: "com.wbxm.icartoon",
                    scheme_Adr: "tkanmanapp",
                    //src: isMobile ? "kanman_code.png": "kanman_code_pc.png"
                },
                iyouman: {
                    ckey: "CK1383325844989",
                    ios: "id1344658366",
                    appname: "爱优漫",
                    pkgname: "com.comic.iyouman",
                    scheme_Adr: "tiyoumanapp",
                    //src: isMobile ? "iyouman_code.png": "iyouman_code_pc.png"
                },
                shenmanhua: {
                    ckey: "CK1383322645544",
                    ios: "id1342099056",
                    appname: "神漫画",
                    pkgname: "com.comic.shenmanhua",
                    scheme_Adr: "tshenmanhuaapp",
                    //src: isMobile ? "shenmanhua_code.png": "shenmanhua_code_pc.png"
                },
                isaman: {
                    ckey: "CK1383328534446",
                    ios: "id1344659342",
                    appname: "爱飒漫画",
                    pkgname: "com.comic.isaman",
                    scheme_Adr: "tisamanapp",
                    //src: isMobile ? "isaman_code.png": "isaman_code_pc.png"
                },
                douluodalu3: {
                    ckey: "CK138297596322",
                    ios: "id1243372811",
                    appname: "漫画台",
                    pkgname: "com.comic.manhuatai",
                    scheme_Adr: "tmanhuataiapp",
                    //src: isMobile ? "samanlehua_code.png": "samanlehua_code_pc.png"
                },
                manhuatai: {
                    ckey: "CK138297596322",
                    ios: "id1243372811",
                    appname: "漫画台",
                    pkgname: "com.comic.manhuatai",
                    scheme_Adr: "tmanhuataiapp",
                    //src: isMobile ? "manhuatai_code.png": "manhuatai_code_pc.png"
                }
            }
        }
    }

    export default comicjs;