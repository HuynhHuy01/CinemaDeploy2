var Autocomplete = function () {
    "use strict";

    function t(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function e(t, e) {
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
        }
    }

    function n(t, e, n) {
        return e in t ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = n, t
    }

    var i = function (t, e) {
        return t.matches ? t.matches(e) : t.msMatchesSelector ? t.msMatchesSelector(e) : t.webkitMatchesSelector ? t.webkitMatchesSelector(e) : null
    }, o = function (t, e) {
        return t.closest ? t.closest(e) : function (t, e) {
            for (var n = t; n && 1 === n.nodeType;) {
                if (i(n, e)) return n;
                n = n.parentNode
            }
            return null
        }(t, e)
    }, s = function (t) {
        return Boolean(t && "function" == typeof t.then)
    }, u = function e() {
        var i = this, u = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, l = u.search,
            r = u.autoSelect, a = void 0 !== r && r, c = u.setValue, d = void 0 === c ? function () {
            } : c, h = u.setAttribute, p = void 0 === h ? function () {
            } : h, f = u.onUpdate, v = void 0 === f ? function () {
            } : f, b = u.onSubmit, L = void 0 === b ? function () {
            } : b, y = u.onShow, m = void 0 === y ? function () {
            } : y, g = u.autocorrect, w = void 0 !== g && g, S = u.onHide, R = void 0 === S ? function () {
            } : S, x = u.onLoading, A = void 0 === x ? function () {
            } : x, k = u.onLoaded, I = void 0 === k ? function () {
            } : k;
        t(this, e), n(this, "value", ""), n(this, "searchCounter", 0), n(this, "results", []), n(this, "selectedIndex", -1), n(this, "destroy", (function () {
            i.search = null, i.setValue = null, i.setAttribute = null, i.onUpdate = null, i.onSubmit = null, i.autocorrect = null, i.onShow = null, i.onHide = null, i.onLoading = null, i.onLoaded = null
        })), n(this, "handleInput", (function (t) {
            var e = t.target.value;
            i.updateResults(e), i.value = e
        })), n(this, "handleKeyDown", (function (t) {
            var e = t.key;
            switch (e) {
                case"Up":
                case"Down":
                case"ArrowUp":
                case"ArrowDown":
                    var n = "ArrowUp" === e || "Up" === e ? i.selectedIndex - 1 : i.selectedIndex + 1;
                    t.preventDefault(), i.handleArrows(n);
                    break;
                case"Tab":
                    i.selectResult();
                    break;
                case"Enter":
                    var o = i.results[i.selectedIndex];
                    i.selectResult(), i.onSubmit(o);
                    break;
                case"Esc":
                case"Escape":
                    i.hideResults(), i.setValue();
                    break;
                default:
                    return
            }
        })), n(this, "handleFocus", (function (t) {
            var e = t.target.value;
            i.updateResults(e), i.value = e
        })), n(this, "handleBlur", (function () {
            i.hideResults()
        })), n(this, "handleResultMouseDown", (function (t) {
            t.preventDefault()
        })), n(this, "handleResultClick", (function (t) {
            var e = t.target, n = o(e, "[data-result-index]");
            if (n) {
                i.selectedIndex = parseInt(n.dataset.resultIndex, 10);
                var s = i.results[i.selectedIndex];
                i.selectResult(), i.onSubmit(s)
            }
        })), n(this, "handleArrows", (function (t) {
            var e = i.results.length;
            i.selectedIndex = (t % e + e) % e, i.onUpdate(i.results, i.selectedIndex)
        })), n(this, "selectResult", (function () {
            var t = i.results[i.selectedIndex];
            t && i.setValue(t), i.hideResults()
        })), n(this, "updateResults", (function (t) {
            var e = ++i.searchCounter;
            i.onLoading(), i.search(t).then((function (t) {
                e === i.searchCounter && (i.results = t, i.onLoaded(), 0 !== i.results.length ? (i.selectedIndex = i.autoSelect ? 0 : -1, i.onUpdate(i.results, i.selectedIndex), i.showResults()) : i.hideResults())
            }))
        })), n(this, "showResults", (function () {
            i.setAttribute("aria-expanded", !0), i.onShow()
        })), n(this, "hideResults", (function () {
            i.selectedIndex = -1, i.results = [], i.setAttribute("aria-expanded", !1), i.setAttribute("aria-activedescendant", ""), i.onUpdate(i.results, i.selectedIndex), i.onHide()
        })), n(this, "checkSelectedResultVisible", (function (t) {
            var e = t.querySelector('[data-result-index="'.concat(i.selectedIndex, '"]'));
            if (e) {
                var n = t.getBoundingClientRect(), o = e.getBoundingClientRect();
                o.top < n.top ? t.scrollTop -= n.top - o.top : o.bottom > n.bottom && (t.scrollTop += o.bottom - n.bottom)
            }
        })), this.search = s(l) ? l : function (t) {
            return Promise.resolve(l(t))
        }, this.autoSelect = a, this.setValue = d, this.setAttribute = p, this.onUpdate = v, this.onSubmit = L, this.autocorrect = w, this.onShow = m, this.onHide = R, this.onLoading = A, this.onLoaded = I
    }, l = 0, r = function () {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        return "".concat(t).concat(++l)
    }, a = function (t, e) {
        var n = t.getBoundingClientRect(), i = e.getBoundingClientRect();
        return n.bottom + i.height > window.innerHeight && window.innerHeight - n.bottom < n.top && window.pageYOffset + n.top - i.height > 0 ? "above" : "below"
    }, c = function (t, e, n) {
        var i;
        return function () {
            var o = this, s = arguments, u = function () {
                i = null, n || t.apply(o, s)
            }, l = n && !i;
            clearTimeout(i), i = setTimeout(u, e), l && t.apply(o, s)
        }
    }, d = function () {
        function n(e, i, o) {
            t(this, n), this.id = "".concat(o, "-result-").concat(e), this.class = "".concat(o, "-result"), this["data-result-index"] = e, this.role = "option", e === i && (this["aria-selected"] = "true")
        }

        var i, o, s;
        return i = n, (o = [{
            key: "toString", value: function () {
                var t = this;
                return Object.keys(this).reduce((function (e, n) {
                    return "".concat(e, " ").concat(n, '="').concat(t[n], '"')
                }), "")
            }
        }]) && e(i.prototype, o), s && e(i, s), n
    }();
    return function e(i) {
        var o = this, s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, l = s.search,
            h = s.onSubmit, p = void 0 === h ? function () {
            } : h, f = s.onUpdate, v = void 0 === f ? function () {
            } : f, b = s.baseClass, L = void 0 === b ? "autocomplete" : b, y = s.autocorrect, m = void 0 !== y && y,
            g = s.autoSelect, w = s.getResultValue, S = void 0 === w ? function (t) {
                return t
            } : w, R = s.renderResult, x = s.debounceTime, A = void 0 === x ? 0 : x;
        t(this, e), n(this, "expanded", !1), n(this, "loading", !1), n(this, "position", {}), n(this, "resetPosition", !0), n(this, "initialize", (function () {
            o.root.style.position = "relative", o.input.setAttribute("role", "combobox"), o.input.setAttribute("autocomplete", "off"), o.input.setAttribute("autocapitalize", "off"), o.autocorrect && o.input.setAttribute("autocorrect", "on"), o.input.setAttribute("spellcheck", "false"), o.input.setAttribute("aria-autocomplete", "list"), o.input.setAttribute("aria-haspopup", "listbox"), o.input.setAttribute("aria-expanded", "false"), o.resultList.setAttribute("role", "listbox"), o.resultList.style.position = "absolute", o.resultList.style.zIndex = "1", o.resultList.style.width = "100%", o.resultList.style.boxSizing = "border-box", o.resultList.id || (o.resultList.id = r("".concat(o.baseClass, "-result-list-"))), o.input.setAttribute("aria-owns", o.resultList.id), document.body.addEventListener("click", o.handleDocumentClick), o.input.addEventListener("input", o.core.handleInput), o.input.addEventListener("keydown", o.core.handleKeyDown), o.input.addEventListener("focus", o.core.handleFocus), o.input.addEventListener("blur", o.core.handleBlur), o.resultList.addEventListener("mousedown", o.core.handleResultMouseDown), o.resultList.addEventListener("click", o.core.handleResultClick), o.updateStyle()
        })), n(this, "destroy", (function () {
            document.body.removeEventListener("click", o.handleDocumentClick), o.input.removeEventListener("input", o.core.handleInput), o.input.removeEventListener("keydown", o.core.handleKeyDown), o.input.removeEventListener("focus", o.core.handleFocus), o.input.removeEventListener("blur", o.core.handleBlur), o.resultList.removeEventListener("mousedown", o.core.handleResultMouseDown), o.resultList.removeEventListener("click", o.core.handleResultClick), o.root = null, o.input = null, o.resultList = null, o.getResultValue = null, o.onUpdate = null, o.renderResult = null, o.core.destroy(), o.core = null
        })), n(this, "setAttribute", (function (t, e) {
            o.input.setAttribute(t, e)
        })), n(this, "setValue", (function (t) {
            o.input.value = t ? o.getResultValue(t) : ""
        })), n(this, "renderResult", (function (t, e) {
            return "<li ".concat(e, ">").concat(o.getResultValue(t), "</li>")
        })), n(this, "handleUpdate", (function (t, e) {
            o.resultList.innerHTML = "", t.forEach((function (t, n) {
                var i = new d(n, e, o.baseClass), s = o.renderResult(t, i);
                "string" == typeof s ? o.resultList.insertAdjacentHTML("beforeend", s) : o.resultList.insertAdjacentElement("beforeend", s)
            })), o.input.setAttribute("aria-activedescendant", e > -1 ? "".concat(o.baseClass, "-result-").concat(e) : ""), o.resetPosition && (o.resetPosition = !1, o.position = a(o.input, o.resultList), o.updateStyle()), o.core.checkSelectedResultVisible(o.resultList), o.onUpdate(t, e)
        })), n(this, "handleShow", (function () {
            o.expanded = !0, o.updateStyle()
        })), n(this, "handleHide", (function () {
            o.expanded = !1, o.resetPosition = !0, o.updateStyle()
        })), n(this, "handleLoading", (function () {
            o.loading = !0, o.updateStyle()
        })), n(this, "handleLoaded", (function () {
            o.loading = !1, o.updateStyle()
        })), n(this, "handleDocumentClick", (function (t) {
            o.root.contains(t.target) || o.core.hideResults()
        })), n(this, "updateStyle", (function () {
            o.root.dataset.expanded = o.expanded, o.root.dataset.loading = o.loading, o.root.dataset.position = o.position, o.resultList.style.visibility = o.expanded ? "visible" : "hidden", o.resultList.style.pointerEvents = o.expanded ? "auto" : "none", "below" === o.position ? (o.resultList.style.bottom = null, o.resultList.style.top = "100%") : (o.resultList.style.top = null, o.resultList.style.bottom = "100%")
        })), this.root = "string" == typeof i ? document.querySelector(i) : i, this.input = this.root.querySelector("input"), this.resultList = this.root.querySelector("ul"), this.baseClass = L, this.autocorrect = m, this.getResultValue = S, this.onUpdate = v, "function" == typeof R && (this.renderResult = R);
        var k = new u({
            search: l,
            autoSelect: g,
            setValue: this.setValue,
            setAttribute: this.setAttribute,
            onUpdate: this.handleUpdate,
            autocorrect: this.autocorrect,
            onSubmit: p,
            onShow: this.handleShow,
            onHide: this.handleHide,
            onLoading: this.handleLoading,
            onLoaded: this.handleLoaded
        });
        A > 0 && (k.handleInput = c(k.handleInput, A)), this.core = k, this.initialize()
    }
}();


function name_taker(data) {
    let names = []
    data.forEach(function (name_link) {
        names.push(name_link.split('@')[0])
    })
    return names
}

function url_taker(data) {
    let urls = []
    data.forEach(function (name_link) {
        urls.push(name_link.split('@')[1])
    })
    return urls
}

// new Autocomplete('#autocomplete', {
//     urls: [],
//     search: input => {
//         this.url = '/search/?movie=' + input
//         return new Promise(resolve => {
//             fetch(url)
//                 .then(response => response.json())
//                 .then(data => {
//                     resolve(url_taker(data.data))
//                 })
//         })
//     },
//     onSubmit: result => {
//         window.open(result)
//     }
// })
