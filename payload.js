var __hcaptchaInitParameters = {
    responses: {
        lastSolution: null
    },
    params: {
        lastParams: null
    },
    challenges: {}
};
(function() {
    var e = {};
    if (document.currentScript && document.currentScript.dataset && document.currentScript.dataset["parameters"]) {
        try {
            e = JSON.parse(document.currentScript.dataset["parameters"])
        } catch (a) {}
    }
    if (e.originalHcaptchaApiUrl && e.currentHcaptchaApiUrl && e.originalHcaptchaApiUrl !== e.currentHcaptchaApiUrl) {
        var a = document.getElementsByTagName("script");
        for (var t in a) {
            if (a[t].src === e.originalHcaptchaApiUrl) {
                a[t].src = e.currentHcaptchaApiUrl;
                break
            }
        }
    } else {}
    var r = e.currentOnloadMethodName;
    var n = e.originalOnloadMethodName;
    if (r) {
        function c() {
            var a;
            if (typeof window[r] === "function") {
                a = window[r]
            }
            window[r] = function() {
                var n = hcaptcha.render;
                var t = hcaptcha.execute;
                var e = hcaptcha.getRespKey;
                hcaptcha.render = function(a, e) {
                    if (e && typeof e.callback == "function") {
                        var t = e.callback;
                        e.callback = function() {
                            t.apply(this, arguments)
                        }
                    }
                    var r = n.apply(this, arguments);
                    __hcaptchaInitParameters.params.lastParams = e;
                    __hcaptchaInitParameters.params[r] = e;
                    return r
                };
                var r = hcaptcha.getResponse;
                hcaptcha.getResponse = function(a) {
                    if (typeof __hcaptchaInitParameters["responses"][a] !== "undefined") {
                        return __hcaptchaInitParameters["responses"][a]
                    } else if (__hcaptchaInitParameters["responses"]["lastSolution"]) {
                        return __hcaptchaInitParameters["responses"]["lastSolution"]
                    } else if (typeof r === "function") {
                        var e = r.apply(this, arguments);
                        return e
                    }
                };
                hcaptcha.execute = function(a) {
                    var e = t.apply(this, arguments);
                    return e
                };
                hcaptcha.getRespKey = function() {
                    var a = e.apply(this, arguments);
                    return a
                };
                if (typeof a === "function") {
                    a.apply(this, arguments)
                }
            }
        }
        if (!n || typeof window[r] !== "undefined") {
            c()
        } else {
            var i = setInterval(function() {
                if (typeof window[r] === "undefined") {
                    return
                }
                clearInterval(i);
                c()
            }, 1)
        }
    }
//    window.addEventListener("message", function(a) {
//        if (!a.data || typeof a.data.receiver == "undefined" || a.data.receiver !== "hcaptchaObjectInterceptor") {
//            return
//        }
//        var e = a.data;
//        if (e.type === "hcaptchaTaskSolution") {
//            __hcaptchaInitParameters["responses"][e.widgetID] = e.taskSolution;
//            __hcaptchaInitParameters["responses"]["lastSolution"] = e.taskSolution;
//            s(e.widgetID)
//        } else if (e.type === "hcaptchaChallengeShown") {
//            __hcaptchaInitParameters.challenges[e.widgetID] = true;
//            s(e.widgetID)
//        }
//    });
    window.addEventListener("message", function(a) {
        if (!a.data || typeof a.data !== "string") {
            return
        }
        var e = null;
        try {
            e = JSON.parse(a.data)
        } catch (a) {}
        if (!e) {
            return
        }
        if (e.source !== "hcaptcha") {
            return
        }
        if (e.label === "challenge-ready") {
            __hcaptchaInitParameters.challenges[e.id] = true;
            window["HcaptchaCallback"] = __hcaptchaInitParameters.params[e.id].callback;
            console.log("Passed...")
        }
    });

//    function s(a) {
//        if (!e.runExplicitInvisibleHcaptchaCallbackWhenChallengeShown || !__hcaptchaInitParameters.params[a] || !__hcaptchaInitParameters.params[a].size || __hcaptchaInitParameters.params[a].size !== "invisible" || __hcaptchaInitParameters.challenges[a]) {
//            p(a)
//        }
//    }

//    function p(a) {
//        h(a);
//        if (a && __hcaptchaInitParameters.responses[a] && __hcaptchaInitParameters.params[a] && __hcaptchaInitParameters.params[a].callback) {
//            var e = __hcaptchaInitParameters.params[a].callback;
//            var t = __hcaptchaInitParameters.responses[a];
//            if (typeof e === "function") {
//                e(t)
//            } else if (typeof e === "string" && typeof window[e] === "function") {
//                window[e](t)
//            }
//        }
//    }

//    function h(a) {
//        if (a && __hcaptchaInitParameters.responses[a]) {
//            var e = document.getElementById("g-recaptcha-response-" + a);
//            var t = document.getElementById("h-captcha-response-" + a);
//            if (e) {
//                e.value = __hcaptchaInitParameters.responses[a]
//            }
//            if (t) {
//                t.value = __hcaptchaInitParameters.responses[a]
//            }
//        }
//    }
})();
