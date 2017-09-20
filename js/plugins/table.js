/*!
 * froala_editor v2.7.0 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2017 Froala Labs
 */

! function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function(b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)), a(c)
    } : a(window.jQuery)
}(function(a) {
    a.extend(a.FE.POPUP_TEMPLATES, {
        "table.insert": "[_BUTTONS_][_ROWS_COLUMNS_]",
        "table.edit": "[_BUTTONS_]",
        "table.colors": "[_BUTTONS_][_COLORS_]"
    }), a.extend(a.FE.DEFAULTS, {
        tableInsertMaxSize: 10,
        tableEditButtons: ["tableHeader", "tableRemove", "|", "tableRows", "tableColumns", "tableStyle", "-", "tableCells", "tableCellBackground", "tableCellVerticalAlign", "tableCellHorizontalAlign", "tableCellStyle"],
        tableInsertButtons: ["tableBack", "|"],
        tableResizer: !0,
        tableResizerOffset: 5,
        tableResizingLimit: 30,
        tableColorsButtons: ["tableBack", "|"],
        tableColors: ["#61BD6D", "#1ABC9C", "#54ACD2", "#2C82C9", "#9365B8", "#475577", "#CCCCCC", "#41A85F", "#00A885", "#3D8EB9", "#2969B0", "#553982", "#28324E", "#000000", "#F7DA64", "#FBA026", "#EB6B56", "#E25041", "#A38F84", "#EFEFEF", "#FFFFFF", "#FAC51C", "#F37934", "#D14841", "#B8312F", "#7C706B", "#D1D5D8", "REMOVE"],
        tableColorsStep: 7,
        tableCellStyles: {
            "fr-highlighted": "Highlighted",
            "fr-thick": "Thick"
        },
        tableStyles: {
            "fr-dashed-borders": "Dashed Borders",
            "fr-alternate-rows": "Alternate Rows"
        },
        tableCellMultipleStyles: !0,
        tableMultipleStyles: !0,
        tableInsertHelper: !0,
        tableInsertHelperOffset: 15
    }), a.FE.PLUGINS.table = function(b) {
        function c() {
            var a = b.$tb.find('.fr-command[data-cmd="insertTable"]'),
                c = b.popups.get("table.insert");
            if (c || (c = g()), !c.hasClass("fr-active")) {
                b.popups.refresh("table.insert"), b.popups.setContainer("table.insert", b.$tb);
                var d = a.offset().left + a.outerWidth() / 2,
                    e = a.offset().top + (b.opts.toolbarBottom ? 10 : a.outerHeight() - 10);
                b.popups.show("table.insert", d, e, a.outerHeight())
            }
        }

        function d() {
            var a = I();
            if (a) {
                var c = b.popups.get("table.edit");
                c || (c = k()), b.popups.setContainer("table.edit", b.$sc);
                var d = Q(a),
                    e = (d.left + d.right) / 2,
                    f = d.bottom;
                b.popups.show("table.edit", e, f, d.bottom - d.top), b.edit.isDisabled() && (b.toolbar.disable(), b.$el.removeClass("fr-no-selection"), b.edit.on(), b.button.bulkRefresh(), b.selection.setAtEnd(b.$el.find(".fr-selected-cell:last").get(0)), b.selection.restore())
            }
        }

        function e() {
            var a = I();
            if (a) {
                var c = b.popups.get("table.colors");
                c || (c = l()), b.popups.setContainer("table.colors", b.$sc);
                var d = Q(a),
                    e = (d.left + d.right) / 2,
                    f = d.bottom;
                o(), b.popups.show("table.colors", e, f, d.bottom - d.top)
            }
        }

        function f() {
            0 === sa().length && b.toolbar.enable()
        }

        function g(c) {
            if (c) return b.popups.onHide("table.insert", function() {
                b.popups.get("table.insert").find('.fr-table-size .fr-select-table-size > span[data-row="1"][data-col="1"]').trigger("mouseenter")
            }), !0;
            var d = "";
            b.opts.tableInsertButtons.length > 0 && (d = '<div class="fr-buttons">' + b.button.buildList(b.opts.tableInsertButtons) + "</div>");
            var e = {
                    buttons: d,
                    rows_columns: i()
                },
                f = b.popups.create("table.insert", e);
            return b.events.$on(f, "mouseenter", ".fr-table-size .fr-select-table-size .fr-table-cell", function(b) {
                h(a(b.currentTarget))
            }, !0), j(f), f
        }

        function h(a) {
            var c = a.data("row"),
                d = a.data("col"),
                e = a.parent();
            e.siblings(".fr-table-size-info").html(c + " &times; " + d), e.find("> span").removeClass("hover fr-active-item");
            for (var f = 1; f <= b.opts.tableInsertMaxSize; f++)
                for (var g = 0; g <= b.opts.tableInsertMaxSize; g++) {
                    var h = e.find('> span[data-row="' + f + '"][data-col="' + g + '"]');
                    f <= c && g <= d ? h.addClass("hover") : f <= c + 1 || f <= 2 && !b.helpers.isMobile() ? h.css("display", "inline-block") : f > 2 && !b.helpers.isMobile() && h.css("display", "none")
                }
            a.addClass("fr-active-item")
        }

        function i() {
            for (var a = '<div class="fr-table-size"><div class="fr-table-size-info">1 &times; 1</div><div class="fr-select-table-size">', c = 1; c <= b.opts.tableInsertMaxSize; c++) {
                for (var d = 1; d <= b.opts.tableInsertMaxSize; d++) {
                    var e = "inline-block";
                    c > 2 && !b.helpers.isMobile() && (e = "none");
                    var f = "fr-table-cell ";
                    1 == c && 1 == d && (f += " hover"), a += '<span class="fr-command ' + f + '" tabIndex="-1" data-cmd="tableInsert" data-row="' + c + '" data-col="' + d + '" data-param1="' + c + '" data-param2="' + d + '" style="display: ' + e + ';" role="button"><span></span><span class="fr-sr-only">' + c + " &times; " + d + "&nbsp;&nbsp;&nbsp;</span></span>"
                }
                a += '<div class="new-line"></div>'
            }
            return a += "</div></div>"
        }

        function j(c) {
            b.events.$on(c, "focus", "[tabIndex]", function(b) {
                h(a(b.currentTarget))
            }), b.events.on("popup.tab", function(c) {
                var d = a(c.currentTarget);
                if (!b.popups.isVisible("table.insert") || !d.is("span, a")) return !0;
                var e, f = c.which;
                if (a.FE.KEYCODE.ARROW_UP == f || a.FE.KEYCODE.ARROW_DOWN == f || a.FE.KEYCODE.ARROW_LEFT == f || a.FE.KEYCODE.ARROW_RIGHT == f) {
                    if (d.is("span.fr-table-cell")) {
                        var g = d.parent().find("span.fr-table-cell"),
                            i = g.index(d),
                            j = b.opts.tableInsertMaxSize,
                            k = i % j,
                            l = Math.floor(i / j);
                        a.FE.KEYCODE.ARROW_UP == f ? l = Math.max(0, l - 1) : a.FE.KEYCODE.ARROW_DOWN == f ? l = Math.min(b.opts.tableInsertMaxSize - 1, l + 1) : a.FE.KEYCODE.ARROW_LEFT == f ? k = Math.max(0, k - 1) : a.FE.KEYCODE.ARROW_RIGHT == f && (k = Math.min(b.opts.tableInsertMaxSize - 1, k + 1));
                        var m = l * j + k,
                            n = a(g.get(m));
                        h(n), b.events.disableBlur(), n.focus(), e = !1
                    }
                } else a.FE.KEYCODE.ENTER == f && (b.button.exec(d), e = !1);
                return !1 === e && (c.preventDefault(), c.stopPropagation()), e
            }, !0)
        }

        function k(a) {
            if (a) return b.popups.onHide("table.edit", f), !0;
            var c = "";
            b.opts.tableEditButtons.length > 0 && (c = '<div class="fr-buttons">' + b.button.buildList(b.opts.tableEditButtons) + "</div>");
            var e = {
                    buttons: c
                },
                g = b.popups.create("table.edit", e);
            return b.events.$on(b.$wp, "scroll.table-edit", function() {
                b.popups.isVisible("table.edit") && d()
            }), g
        }

        function l() {
            var a = "";
            b.opts.tableColorsButtons.length > 0 && (a = '<div class="fr-buttons fr-table-colors-buttons">' + b.button.buildList(b.opts.tableColorsButtons) + "</div>");
            var c = {
                    buttons: a,
                    colors: m()
                },
                d = b.popups.create("table.colors", c);
            return b.events.$on(b.$wp, "scroll.table-colors", function() {
                b.popups.isVisible("table.colors") && e()
            }), n(d), d
        }

        function m() {
            for (var a = '<div class="fr-table-colors">', c = 0; c < b.opts.tableColors.length; c++) 0 !== c && c % b.opts.tableColorsStep == 0 && (a += "<br>"), "REMOVE" != b.opts.tableColors[c] ? a += '<span class="fr-command" style="background: ' + b.opts.tableColors[c] + ';" tabIndex="-1" role="button" data-cmd="tableCellBackgroundColor" data-param1="' + b.opts.tableColors[c] + '"><span class="fr-sr-only">' + b.language.translate("Color") + " " + b.opts.tableColors[c] + "&nbsp;&nbsp;&nbsp;</span></span>" : a += '<span class="fr-command" data-cmd="tableCellBackgroundColor" tabIndex="-1" role="button" data-param1="REMOVE" title="' + b.language.translate("Clear Formatting") + '">' + b.icon.create("tableColorRemove") + '<span class="fr-sr-only">' + b.language.translate("Clear Formatting") + "</span></span>";
            return a += "</div>"
        }

        function n(c) {
            b.events.on("popup.tab", function(d) {
                var e = a(d.currentTarget);
                if (!b.popups.isVisible("table.colors") || !e.is("span")) return !0;
                var f = d.which,
                    g = !0;
                if (a.FE.KEYCODE.TAB == f) {
                    var h = c.find(".fr-buttons");
                    g = !b.accessibility.focusToolbar(h, !!d.shiftKey)
                } else if (a.FE.KEYCODE.ARROW_UP == f || a.FE.KEYCODE.ARROW_DOWN == f || a.FE.KEYCODE.ARROW_LEFT == f || a.FE.KEYCODE.ARROW_RIGHT == f) {
                    var i = e.parent().find("span.fr-command"),
                        j = i.index(e),
                        k = b.opts.colorsStep,
                        l = Math.floor(i.length / k),
                        m = j % k,
                        n = Math.floor(j / k),
                        o = n * k + m,
                        p = l * k;
                    a.FE.KEYCODE.ARROW_UP == f ? o = ((o - k) % p + p) % p : a.FE.KEYCODE.ARROW_DOWN == f ? o = (o + k) % p : a.FE.KEYCODE.ARROW_LEFT == f ? o = ((o - 1) % p + p) % p : a.FE.KEYCODE.ARROW_RIGHT == f && (o = (o + 1) % p);
                    var q = a(i.get(o));
                    b.events.disableBlur(), q.focus(), g = !1
                } else a.FE.KEYCODE.ENTER == f && (b.button.exec(e), g = !1);
                return !1 === g && (d.preventDefault(), d.stopPropagation()), g
            }, !0)
        }

        function o() {
            var a = b.popups.get("table.colors"),
                c = b.$el.find(".fr-selected-cell:first");
            a.find(".fr-selected-color").removeClass("fr-selected-color fr-active-item"), a.find('span[data-param1="' + b.helpers.RGBToHex(c.css("background-color")) + '"]').addClass("fr-selected-color fr-active-item")
        }

        function p(c, d) {
            var e, f, g = '<table style="width: 100%;" class="fr-inserted-table"><tbody>',
                h = 100 / d;
            for (e = 0; e < c; e++) {
                for (g += "<tr>", f = 0; f < d; f++) g += '<td style="width: ' + h.toFixed(4) + '%;">', 0 === e && 0 === f && (g += a.FE.MARKERS), g += "<br></td>";
                g += "</tr>"
            }
            g += "</tbody></table>", b.html.insert(g), b.selection.restore();
            var i = b.$el.find(".fr-inserted-table");
            i.removeClass("fr-inserted-table"), b.events.trigger("table.inserted", [i.get(0)])
        }

        function q() {
            if (sa().length > 0) {
                var a = ta();
                b.selection.setBefore(a.get(0)) || b.selection.setAfter(a.get(0)), b.selection.restore(), b.popups.hide("table.edit"), a.remove(), b.toolbar.enable()
            }
        }

        function r() {
            var b = ta();
            if (b.length > 0 && 0 === b.find("th").length) {
                var c, e = "<thead><tr>",
                    f = 0;
                for (b.find("tr:first > td").each(function() {
                        var b = a(this);
                        f += parseInt(b.attr("colspan"), 10) || 1
                    }), c = 0; c < f; c++) e += "<th><br></th>";
                e += "</tr></thead>", b.prepend(e), d()
            }
        }

        function s() {
            var a = ta(),
                c = a.find("thead");
            if (c.length > 0)
                if (0 === a.find("tbody tr").length) q();
                else if (c.remove(), sa().length > 0) d();
            else {
                b.popups.hide("table.edit");
                var e = a.find("tbody tr:first td:first").get(0);
                e && (b.selection.setAtEnd(e), b.selection.restore())
            }
        }

        function t(c) {
            var e = ta();
            if (e.length > 0) {
                if (b.$el.find("th.fr-selected-cell").length > 0 && "above" == c) return;
                var f, g, h, i = I(),
                    j = O(i);
                g = "above" == c ? j.min_i : j.max_i;
                var k = "<tr>";
                for (f = 0; f < i[g].length; f++)
                    if ("below" == c && g < i.length - 1 && i[g][f] == i[g + 1][f] || "above" == c && g > 0 && i[g][f] == i[g - 1][f]) {
                        if (0 === f || f > 0 && i[g][f] != i[g][f - 1]) {
                            var l = a(i[g][f]);
                            l.attr("rowspan", parseInt(l.attr("rowspan"), 10) + 1)
                        }
                    } else k += "<td><br></td>";
                k += "</tr>", h = a(b.$el.find("th.fr-selected-cell").length > 0 && "below" == c ? e.find("tbody").not(e.find("table tbody")) : e.find("tr").not(e.find("table tr")).get(g)), "below" == c ? "TBODY" == h.prop("tagName") ? h.prepend(k) : h.after(k) : "above" == c && (h.before(k), b.popups.isVisible("table.edit") && d())
            }
        }

        function u() {
            var c = ta();
            if (c.length > 0) {
                var d, e, f, g = I(),
                    h = O(g);
                if (0 === h.min_i && h.max_i == g.length - 1) q();
                else {
                    for (d = h.max_i; d >= h.min_i; d--) {
                        for (f = a(c.find("tr").not(c.find("table tr")).get(d)), e = 0; e < g[d].length; e++)
                            if (0 === e || g[d][e] != g[d][e - 1]) {
                                var i = a(g[d][e]);
                                if (parseInt(i.attr("rowspan"), 10) > 1) {
                                    var j = parseInt(i.attr("rowspan"), 10) - 1;
                                    1 == j ? i.removeAttr("rowspan") : i.attr("rowspan", j)
                                }
                                if (d < g.length - 1 && g[d][e] == g[d + 1][e] && (0 === d || g[d][e] != g[d - 1][e])) {
                                    for (var k = g[d][e], l = e; l > 0 && g[d][l] == g[d][l - 1];) l--;
                                    0 === l ? a(c.find("tr").not(c.find("table tr")).get(d + 1)).prepend(k) : a(g[d + 1][l - 1]).after(k)
                                }
                            }
                        var m = f.parent();
                        f.remove(), 0 === m.find("tr").length && m.remove(), g = I(c)
                    }
                    A(0, g.length - 1, 0, g[0].length - 1, c), h.min_i > 0 ? b.selection.setAtEnd(g[h.min_i - 1][0]) : b.selection.setAtEnd(g[0][0]), b.selection.restore(), b.popups.hide("table.edit")
                }
            }
        }

        function v(c) {
            var e = ta();
            if (e.length > 0) {
                var f, g = I(),
                    h = O(g);
                f = "before" == c ? h.min_j : h.max_j;
                var i, j = 100 / g[0].length,
                    k = 100 / (g[0].length + 1);
                e.find("th, td").each(function() {
                    i = a(this), i.data("old-width", i.outerWidth() / e.outerWidth() * 100)
                }), e.find("tr").not(e.find("table tr")).each(function(b) {
                    for (var d, e = a(this), h = 0, i = 0; h - 1 < f;) {
                        if (!(d = e.find("> th, > td").get(i))) {
                            d = null;
                            break
                        }
                        d == g[b][h] ? (h += parseInt(a(d).attr("colspan"), 10) || 1, i++) : (h += parseInt(a(g[b][h]).attr("colspan"), 10) || 1, "after" == c && (d = 0 === i ? -1 : e.find("> th, > td").get(i - 1)))
                    }
                    var l = a(d);
                    if ("after" == c && h - 1 > f || "before" == c && f > 0 && g[b][f] == g[b][f - 1]) {
                        if (0 === b || b > 0 && g[b][f] != g[b - 1][f]) {
                            var m = parseInt(l.attr("colspan"), 10) + 1;
                            l.attr("colspan", m), l.css("width", (l.data("old-width") * k / j + k).toFixed(4) + "%"), l.removeData("old-width")
                        }
                    } else {
                        var n;
                        n = e.find("th").length > 0 ? '<th style="width: ' + k.toFixed(4) + '%;"><br></th>' : '<td style="width: ' + k.toFixed(4) + '%;"><br></td>', -1 == d ? e.prepend(n) : null == d ? e.append(n) : "before" == c ? l.before(n) : "after" == c && l.after(n)
                    }
                }), e.find("th, td").each(function() {
                    i = a(this), i.data("old-width") && (i.css("width", (i.data("old-width") * k / j).toFixed(4) + "%"), i.removeData("old-width"))
                }), b.popups.isVisible("table.edit") && d()
            }
        }

        function w() {
            var c = ta();
            if (c.length > 0) {
                var d, e, f, g = I(),
                    h = O(g);
                if (0 === h.min_j && h.max_j == g[0].length - 1) q();
                else {
                    var i = 100 / g[0].length,
                        j = 100 / (g[0].length - h.max_j + h.min_j - 1);
                    for (c.find("th, td").each(function() {
                            f = a(this), f.hasClass("fr-selected-cell") || f.data("old-width", f.outerWidth() / c.outerWidth() * 100)
                        }), e = h.max_j; e >= h.min_j; e--)
                        for (d = 0; d < g.length; d++)
                            if (0 === d || g[d][e] != g[d - 1][e])
                                if (f = a(g[d][e]), (parseInt(f.attr("colspan"), 10) || 1) > 1) {
                                    var k = parseInt(f.attr("colspan"), 10) - 1;
                                    1 == k ? f.removeAttr("colspan") : f.attr("colspan", k), f.css("width", ((f.data("old-width") - ka(e, g)) * j / i).toFixed(4) + "%"), f.removeData("old-width")
                                } else {
                                    var l = a(f.parent().get(0));
                                    f.remove(), 0 === l.find("> th, > td").length && (0 === l.prev().length || 0 === l.next().length || l.prev().find("> th[rowspan], > td[rowspan]").length < l.prev().find("> th, > td").length) && l.remove()
                                }
                    A(0, g.length - 1, 0, g[0].length - 1, c), h.min_j > 0 ? b.selection.setAtEnd(g[h.min_i][h.min_j - 1]) : b.selection.setAtEnd(g[h.min_i][0]), b.selection.restore(), b.popups.hide("table.edit"), c.find("th, td").each(function() {
                        f = a(this), f.data("old-width") && (f.css("width", (f.data("old-width") * j / i).toFixed(4) + "%"), f.removeData("old-width"))
                    })
                }
            }
        }

        function x(a, b, c) {
            var d, e, f, g, h, i = 0,
                j = I(c);
            for (b = Math.min(b, j[0].length - 1), e = a; e <= b; e++)
                if (!(e > a && j[0][e] == j[0][e - 1]) && (g = parseInt(j[0][e].getAttribute("colspan"), 10) || 1) > 1 && j[0][e] == j[0][e + 1])
                    for (i = g - 1, d = 1; d < j.length; d++)
                        if (j[d][e] != j[d - 1][e]) {
                            for (f = e; f < e + g; f++)
                                if ((h = parseInt(j[d][f].getAttribute("colspan"), 10) || 1) > 1 && j[d][f] == j[d][f + 1]) i = Math.min(i, h - 1), f += i;
                                else if (!(i = Math.max(0, i - 1))) break;
                            if (!i) break
                        }
            i && z(j, i, "colspan", 0, j.length - 1, a, b)
        }

        function y(a, b, c) {
            var d, e, f, g, h, i = 0,
                j = I(c);
            for (b = Math.min(b, j.length - 1), d = a; d <= b; d++)
                if (!(d > a && j[d][0] == j[d - 1][0]) && (g = parseInt(j[d][0].getAttribute("rowspan"), 10) || 1) > 1 && j[d][0] == j[d + 1][0])
                    for (i = g - 1, e = 1; e < j[0].length; e++)
                        if (j[d][e] != j[d][e - 1]) {
                            for (f = d; f < d + g; f++)
                                if ((h = parseInt(j[f][e].getAttribute("rowspan"), 10) || 1) > 1 && j[f][e] == j[f + 1][e]) i = Math.min(i, h - 1), f += i;
                                else if (!(i = Math.max(0, i - 1))) break;
                            if (!i) break
                        }
            i && z(j, i, "rowspan", a, b, 0, j[0].length - 1)
        }

        function z(a, b, c, d, e, f, g) {
            var h, i, j;
            for (h = d; h <= e; h++)
                for (i = f; i <= g; i++) h > d && a[h][i] == a[h - 1][i] || i > f && a[h][i] == a[h][i - 1] || (j = parseInt(a[h][i].getAttribute(c), 10) || 1) > 1 && (j - b > 1 ? a[h][i].setAttribute(c, j - b) : a[h][i].removeAttribute(c))
        }

        function A(a, b, c, d, e) {
            y(a, b, e), x(c, d, e)
        }

        function B() {
            if (sa().length > 1 && (0 === b.$el.find("th.fr-selected-cell").length || 0 === b.$el.find("td.fr-selected-cell").length)) {
                L();
                var c, e, f = I(),
                    g = O(f),
                    h = b.$el.find(".fr-selected-cell"),
                    i = a(h[0]),
                    j = i.parent(),
                    k = j.find(".fr-selected-cell"),
                    l = i.closest("table"),
                    m = i.html(),
                    n = 0;
                for (c = 0; c < k.length; c++) n += a(k[c]).outerWidth();
                for (i.css("width", (n / l.outerWidth() * 100).toFixed(4) + "%"), g.min_j < g.max_j && i.attr("colspan", g.max_j - g.min_j + 1), g.min_i < g.max_i && i.attr("rowspan", g.max_i - g.min_i + 1), c = 1; c < h.length; c++) e = a(h[c]), "<br>" != e.html() && "" !== e.html() && (m += "<br>" + e.html()), e.remove();
                i.html(m), b.selection.setAtEnd(i.get(0)), b.selection.restore(), b.toolbar.enable(), y(g.min_i, g.max_i, l);
                var o = l.find("tr:empty");
                for (c = o.length - 1; c >= 0; c--) a(o[c]).remove();
                x(g.min_j, g.max_j, l), d()
            }
        }

        function C() {
            if (1 == sa().length) {
                var c = b.$el.find(".fr-selected-cell"),
                    d = c.parent(),
                    e = c.closest("table"),
                    f = parseInt(c.attr("rowspan"), 10),
                    g = I(),
                    h = J(c.get(0), g),
                    i = c.clone().html("<br>");
                if (f > 1) {
                    var j = Math.ceil(f / 2);
                    j > 1 ? c.attr("rowspan", j) : c.removeAttr("rowspan"), f - j > 1 ? i.attr("rowspan", f - j) : i.removeAttr("rowspan");
                    for (var k = h.row + j, l = 0 === h.col ? h.col : h.col - 1; l >= 0 && (g[k][l] == g[k][l - 1] || k > 0 && g[k][l] == g[k - 1][l]);) l--; - 1 == l ? a(e.find("tr").not(e.find("table tr")).get(k)).prepend(i) : a(g[k][l]).after(i)
                } else {
                    var m, n = a("<tr>").append(i);
                    for (m = 0; m < g[0].length; m++)
                        if (0 === m || g[h.row][m] != g[h.row][m - 1]) {
                            var o = a(g[h.row][m]);
                            o.is(c) || o.attr("rowspan", (parseInt(o.attr("rowspan"), 10) || 1) + 1)
                        }
                    d.after(n)
                }
                M(), b.popups.hide("table.edit")
            }
        }

        function D() {
            if (1 == sa().length) {
                var c = b.$el.find(".fr-selected-cell"),
                    d = parseInt(c.attr("colspan"), 10) || 1,
                    e = c.parent().outerWidth(),
                    f = c.outerWidth(),
                    g = c.clone().html("<br>"),
                    h = I(),
                    i = J(c.get(0), h);
                if (d > 1) {
                    var j = Math.ceil(d / 2);
                    f = la(i.col, i.col + j - 1, h) / e * 100;
                    var k = la(i.col + j, i.col + d - 1, h) / e * 100;
                    j > 1 ? c.attr("colspan", j) : c.removeAttr("colspan"), d - j > 1 ? g.attr("colspan", d - j) : g.removeAttr("colspan"), c.css("width", f.toFixed(4) + "%"), g.css("width", k.toFixed(4) + "%")
                } else {
                    var l;
                    for (l = 0; l < h.length; l++)
                        if (0 === l || h[l][i.col] != h[l - 1][i.col]) {
                            var m = a(h[l][i.col]);
                            if (!m.is(c)) {
                                var n = (parseInt(m.attr("colspan"), 10) || 1) + 1;
                                m.attr("colspan", n)
                            }
                        }
                    f = f / e * 100 / 2, c.css("width", f.toFixed(4) + "%"), g.css("width", f.toFixed(4) + "%")
                }
                c.after(g), M(), b.popups.hide("table.edit")
            }
        }

        function E(a) {
            "REMOVE" != a ? b.$el.find(".fr-selected-cell").css("background-color", b.helpers.HEXtoRGB(a)) : b.$el.find(".fr-selected-cell").css("background-color", "")
        }

        function F(a) {
            b.$el.find(".fr-selected-cell").css("vertical-align", a)
        }

        function G(a) {
            b.$el.find(".fr-selected-cell").css("text-align", a)
        }

        function H(a, b, c, d) {
            if (b.length > 0) {
                if (!c) {
                    var e = Object.keys(d);
                    e.splice(e.indexOf(a), 1), b.removeClass(e.join(" "))
                }
                b.toggleClass(a)
            }
        }

        function I(b) {
            b = b || null;
            var c = [];
            if (null == b && sa().length > 0 && (b = ta()), b) return b.find("tr").not(b.find("table tr")).each(function(b, d) {
                var e = a(d),
                    f = 0;
                e.find("> th, > td").each(function(d, e) {
                    for (var g = a(e), h = parseInt(g.attr("colspan"), 10) || 1, i = parseInt(g.attr("rowspan"), 10) || 1, j = b; j < b + i; j++)
                        for (var k = f; k < f + h; k++) c[j] || (c[j] = []), c[j][k] ? f++ : c[j][k] = e;
                    f += h
                })
            }), c
        }

        function J(a, b) {
            for (var c = 0; c < b.length; c++)
                for (var d = 0; d < b[c].length; d++)
                    if (b[c][d] == a) return {
                        row: c,
                        col: d
                    }
        }

        function K(a, b, c) {
            for (var d = a + 1, e = b + 1; d < c.length;) {
                if (c[d][b] != c[a][b]) {
                    d--;
                    break
                }
                d++
            }
            for (d == c.length && d--; e < c[a].length;) {
                if (c[a][e] != c[a][b]) {
                    e--;
                    break
                }
                e++
            }
            return e == c[a].length && e--, {
                row: d,
                col: e
            }
        }

        function L() {
            b.el.querySelector(".fr-cell-fixed") && b.el.querySelector(".fr-cell-fixed").classList.remove("fr-cell-fixed"), b.el.querySelector(".fr-cell-handler") && b.el.querySelector(".fr-cell-handler").classList.remove("fr-cell-handler")
        }

        function M() {
            var c = b.$el.find(".fr-selected-cell");
            c.length > 0 && c.each(function() {
                var b = a(this);
                b.removeClass("fr-selected-cell"), "" === b.attr("class") && b.removeAttr("class")
            }), L()
        }

        function N() {
            setTimeout(function() {
                b.selection.clear(), b.$el.addClass("fr-no-selection"), b.$el.blur()
            }, 0)
        }

        function O(a) {
            var c = b.$el.find(".fr-selected-cell");
            if (c.length > 0) {
                var d, e = a.length,
                    f = 0,
                    g = a[0].length,
                    h = 0;
                for (d = 0; d < c.length; d++) {
                    var i = J(c[d], a),
                        j = K(i.row, i.col, a);
                    e = Math.min(i.row, e), f = Math.max(j.row, f), g = Math.min(i.col, g), h = Math.max(j.col, h)
                }
                return {
                    min_i: e,
                    max_i: f,
                    min_j: g,
                    max_j: h
                }
            }
            return null
        }

        function P(b, c, d, e, f) {
            var g, h, i, j, k = b,
                l = c,
                m = d,
                n = e;
            for (g = k; g <= l; g++)((parseInt(a(f[g][m]).attr("rowspan"), 10) || 1) > 1 || (parseInt(a(f[g][m]).attr("colspan"), 10) || 1) > 1) && (i = J(f[g][m], f), j = K(i.row, i.col, f), k = Math.min(i.row, k), l = Math.max(j.row, l), m = Math.min(i.col, m), n = Math.max(j.col, n)), ((parseInt(a(f[g][n]).attr("rowspan"), 10) || 1) > 1 || (parseInt(a(f[g][n]).attr("colspan"), 10) || 1) > 1) && (i = J(f[g][n], f), j = K(i.row, i.col, f), k = Math.min(i.row, k), l = Math.max(j.row, l), m = Math.min(i.col, m), n = Math.max(j.col, n));
            for (h = m; h <= n; h++)((parseInt(a(f[k][h]).attr("rowspan"), 10) || 1) > 1 || (parseInt(a(f[k][h]).attr("colspan"), 10) || 1) > 1) && (i = J(f[k][h], f), j = K(i.row, i.col, f), k = Math.min(i.row, k), l = Math.max(j.row, l), m = Math.min(i.col, m), n = Math.max(j.col, n)), ((parseInt(a(f[l][h]).attr("rowspan"), 10) || 1) > 1 || (parseInt(a(f[l][h]).attr("colspan"), 10) || 1) > 1) && (i = J(f[l][h], f), j = K(i.row, i.col, f), k = Math.min(i.row, k), l = Math.max(j.row, l), m = Math.min(i.col, m), n = Math.max(j.col, n));
            return k == b && l == c && m == d && n == e ? {
                min_i: b,
                max_i: c,
                min_j: d,
                max_j: e
            } : P(k, l, m, n, f)
        }

        function Q(b) {
            var c = O(b),
                d = a(b[c.min_i][c.min_j]),
                e = a(b[c.min_i][c.max_j]),
                f = a(b[c.max_i][c.min_j]);
            return {
                left: d.offset().left,
                right: e.offset().left + e.outerWidth(),
                top: d.offset().top,
                bottom: f.offset().top + f.outerHeight()
            }
        }

        function R(c, d) {
            if (a(c).is(d)) M(), b.edit.on(), a(c).addClass("fr-selected-cell");
            else {
                N(), b.edit.off();
                var e = I(),
                    f = J(c, e),
                    g = J(d, e),
                    h = P(Math.min(f.row, g.row), Math.max(f.row, g.row), Math.min(f.col, g.col), Math.max(f.col, g.col), e);
                M(), c.classList.add("fr-cell-fixed"), d.classList.add("fr-cell-handler");
                for (var i = h.min_i; i <= h.max_i; i++)
                    for (var j = h.min_j; j <= h.max_j; j++) a(e[i][j]).addClass("fr-selected-cell")
            }
        }

        function S(c) {
            var d = null,
                e = a(c.target);
            return "TD" == c.target.tagName || "TH" == c.target.tagName ? d = c.target : e.closest("td").length > 0 ? d = e.closest("td").get(0) : e.closest("th").length > 0 && (d = e.closest("th").get(0)), 0 === b.$el.find(d).length ? null : d
        }

        function T() {
            M(), b.popups.hide("table.edit")
        }

        function U(c) {
            var d = S(c);
            if (sa().length > 0 && !d && T(), !b.edit.isDisabled() || b.popups.isVisible("table.edit"))
                if (1 != c.which || 1 == c.which && b.helpers.isMac() && c.ctrlKey)(3 == c.which || 1 == c.which && b.helpers.isMac() && c.ctrlKey) && d && T();
                else if (Aa = !0, d) {
                sa().length > 0 && !c.shiftKey && T(), c.stopPropagation(), b.events.trigger("image.hideResizer"), b.events.trigger("video.hideResizer"), za = !0;
                var e = d.tagName.toLowerCase();
                c.shiftKey && b.$el.find(e + ".fr-selected-cell").length > 0 ? a(b.$el.find(e + ".fr-selected-cell").closest("table")).is(a(d).closest("table")) ? R(Ba, d) : N() : ((b.keys.ctrlKey(c) || c.shiftKey) && (sa().length > 1 || 0 === a(d).find(b.selection.element()).length && !a(d).is(b.selection.element())) && N(), Ba = d, R(Ba, Ba))
            }
        }

        function V(c) {
            if (za || b.$tb.is(c.target) || b.$tb.is(a(c.target).closest(b.$tb.get(0))) || (sa().length > 0 && b.toolbar.enable(), M()), !(1 != c.which || 1 == c.which && b.helpers.isMac() && c.ctrlKey)) {
                if (Aa = !1, za) {
                    za = !1;
                    S(c) || 1 != sa().length ? sa().length > 0 && (b.selection.isCollapsed() ? d() : M()) : M()
                }
                if (Da) {
                    Da = !1, xa.removeClass("fr-moving"), b.$el.removeClass("fr-no-selection"), b.edit.on();
                    var e = parseFloat(xa.css("left")) + b.opts.tableResizerOffset;
                    b.opts.iframe && (e -= b.$iframe.offset().left), xa.data("release-position", e), xa.removeData("max-left"), xa.removeData("max-right"), ja(c), ba()
                }
            }
        }

        function W(c) {
            if (!0 === za) {
                if (a(c.currentTarget).closest("table").is(ta())) {
                    if ("TD" == c.currentTarget.tagName && 0 === b.$el.find("th.fr-selected-cell").length) return void R(Ba, c.currentTarget);
                    if ("TH" == c.currentTarget.tagName && 0 === b.$el.find("td.fr-selected-cell").length) return void R(Ba, c.currentTarget)
                }
                N()
            }
        }

        function X(c, d) {
            for (var e = c; e && "TABLE" != e.tagName && e.parentNode != b.el;) e = e.parentNode;
            if (e && "TABLE" == e.tagName) {
                var f = I(a(e));
                "up" == d ? Z(J(c, f), e, f) : "down" == d && $(J(c, f), e, f)
            }
        }

        function Y(a, c, d, e) {
            for (var f, g = c; g != b.el && "TD" != g.tagName && "TH" != g.tagName && ("up" == e ? f = g.previousElementSibling : "down" == e && (f = g.nextElementSibling), !f);) g = g.parentNode;
            "TD" == g.tagName || "TH" == g.tagName ? X(g, e) : f && ("up" == e && b.selection.setAtEnd(f), "down" == e && b.selection.setAtStart(f))
        }

        function Z(a, c, d) {
            a.row > 0 ? b.selection.setAtEnd(d[a.row - 1][a.col]) : Y(a, c, d, "up")
        }

        function $(a, c, d) {
            var e = parseInt(d[a.row][a.col].getAttribute("rowspan"), 10) || 1;
            a.row < d.length - e ? b.selection.setAtStart(d[a.row + e][a.col]) : Y(a, c, d, "down")
        }

        function _(c) {
            var d = c.which,
                e = b.selection.blocks();
            if (e.length && (e = e[0], "TD" == e.tagName || "TH" == e.tagName)) {
                for (var f = e; f && "TABLE" != f.tagName && f.parentNode != b.el;) f = f.parentNode;
                if (f && "TABLE" == f.tagName && (a.FE.KEYCODE.ARROW_LEFT == d || a.FE.KEYCODE.ARROW_UP == d || a.FE.KEYCODE.ARROW_RIGHT == d || a.FE.KEYCODE.ARROW_DOWN == d) && (sa().length > 0 && T(), b.browser.webkit && (a.FE.KEYCODE.ARROW_UP == d || a.FE.KEYCODE.ARROW_DOWN == d))) {
                    var g = b.selection.ranges(0).startContainer;
                    if (g.nodeType == Node.TEXT_NODE && (a.FE.KEYCODE.ARROW_UP == d && g.previousSibling || a.FE.KEYCODE.ARROW_DOWN == d && g.nextSibling)) return;
                    c.preventDefault(), c.stopPropagation();
                    var h = I(a(f)),
                        i = J(e, h);
                    return a.FE.KEYCODE.ARROW_UP == d ? Z(i, f, h) : a.FE.KEYCODE.ARROW_DOWN == d && $(i, f, h), b.selection.restore(), !1
                }
            }
        }

        function aa() {
            b.shared.$table_resizer || (b.shared.$table_resizer = a('<div class="fr-table-resizer"><div></div></div>')), xa = b.shared.$table_resizer, b.events.$on(xa, "mousedown", function(a) {
                return !b.core.sameInstance(xa) || (sa().length > 0 && T(), 1 == a.which ? (b.selection.save(), Da = !0, xa.addClass("fr-moving"), N(), b.edit.off(), xa.find("div").css("opacity", 1), !1) : void 0)
            }), b.events.$on(xa, "mousemove", function(a) {
                if (!b.core.sameInstance(xa)) return !0;
                Da && (b.opts.iframe && (a.pageX -= b.$iframe.offset().left), ma(a))
            }), b.events.on("shared.destroy", function() {
                xa.html("").removeData().remove(), xa = null
            }, !0), b.events.on("destroy", function() {
                b.$el.find(".fr-selected-cell").removeClass("fr-selected-cell"), xa.hide().appendTo(a("body:first"))
            }, !0)
        }

        function ba() {
            xa && (xa.find("div").css("opacity", 0), xa.css("top", 0), xa.css("left", 0), xa.css("height", 0), xa.find("div").css("height", 0), xa.hide())
        }

        function ca() {
            ya && ya.removeClass("fr-visible").css("left", "-9999px")
        }

        function da(c, d) {
            var e = a(d),
                f = e.closest("table"),
                g = f.parent();
            if (d && "TD" != d.tagName && "TH" != d.tagName && (e.closest("td").length > 0 ? d = e.closest("td") : e.closest("th").length > 0 && (d = e.closest("th"))), !d || "TD" != d.tagName && "TH" != d.tagName) xa && e.get(0) != xa.get(0) && e.parent().get(0) != xa.get(0) && b.core.sameInstance(xa) && ba();
            else {
                if (e = a(d), 0 === b.$el.find(e).length) return !1;
                var h = e.offset().left - 1,
                    i = h + e.outerWidth();
                if (Math.abs(c.pageX - h) <= b.opts.tableResizerOffset || Math.abs(i - c.pageX) <= b.opts.tableResizerOffset) {
                    var j, k, l, m, n, o = I(f),
                        p = J(d, o),
                        q = K(p.row, p.col, o),
                        r = f.offset().top,
                        s = f.outerHeight() - 1;
                    "rtl" != b.opts.direction ? c.pageX - h <= b.opts.tableResizerOffset ? (l = h, p.col > 0 ? (m = h - ka(p.col - 1, o) + b.opts.tableResizingLimit, n = h + ka(p.col, o) - b.opts.tableResizingLimit, j = p.col - 1, k = p.col) : (j = null, k = 0, m = f.offset().left - 1 - parseInt(f.css("margin-left"), 10), n = f.offset().left - 1 + f.width() - o[0].length * b.opts.tableResizingLimit)) : i - c.pageX <= b.opts.tableResizerOffset && (l = i, q.col < o[q.row].length && o[q.row][q.col + 1] ? (m = i - ka(q.col, o) + b.opts.tableResizingLimit, n = i + ka(q.col + 1, o) - b.opts.tableResizingLimit, j = q.col, k = q.col + 1) : (j = q.col, k = null, m = f.offset().left - 1 + o[0].length * b.opts.tableResizingLimit, n = g.offset().left - 1 + g.width() + parseFloat(g.css("padding-left")))) : i - c.pageX <= b.opts.tableResizerOffset ? (l = i, p.col > 0 ? (m = i - ka(p.col, o) + b.opts.tableResizingLimit, n = i + ka(p.col - 1, o) - b.opts.tableResizingLimit, j = p.col, k = p.col - 1) : (j = null, k = 0, m = f.offset().left + o[0].length * b.opts.tableResizingLimit, n = g.offset().left - 1 + g.width() + parseFloat(g.css("padding-left")))) : c.pageX - h <= b.opts.tableResizerOffset && (l = h, q.col < o[q.row].length && o[q.row][q.col + 1] ? (m = h - ka(q.col + 1, o) + b.opts.tableResizingLimit, n = h + ka(q.col, o) - b.opts.tableResizingLimit, j = q.col + 1, k = q.col) : (j = q.col, k = null, m = g.offset().left + parseFloat(g.css("padding-left")), n = f.offset().left - 1 + f.width() - o[0].length * b.opts.tableResizingLimit)), xa || aa(), xa.data("table", f), xa.data("first", j), xa.data("second", k), xa.data("instance", b), b.$wp.append(xa);
                    var t = l - b.win.pageXOffset - b.opts.tableResizerOffset,
                        u = r - b.win.pageYOffset;
                    b.opts.iframe && (t += b.$iframe.offset().left - b.helpers.scrollLeft(), u += b.$iframe.offset().top - b.helpers.scrollTop(), m += b.$iframe.offset().left, n += b.$iframe.offset().left), xa.data("max-left", m), xa.data("max-right", n), xa.data("origin", l - b.win.pageXOffset), xa.css("top", u), xa.css("left", t), xa.css("height", s), xa.find("div").css("height", s), xa.css("padding-left", b.opts.tableResizerOffset), xa.css("padding-right", b.opts.tableResizerOffset), xa.show()
                } else b.core.sameInstance(xa) && ba()
            }
        }

        function ea(c, d) {
            if (b.$box.find(".fr-line-breaker").is(":visible")) return !1;
            ya || pa(), b.$box.append(ya), ya.data("instance", b);
            var e = a(d),
                f = e.find("tr:first"),
                g = c.pageX,
                h = 0,
                i = 0;
            b.opts.iframe && (h += b.$iframe.offset().left - b.helpers.scrollLeft(), i += b.$iframe.offset().top - b.helpers.scrollTop());
            var j;
            f.find("th, td").each(function() {
                var c = a(this);
                return c.offset().left <= g && g < c.offset().left + c.outerWidth() / 2 ? (j = parseInt(ya.find("a").css("width"), 10), ya.css("top", i + c.offset().top - b.win.pageYOffset - j - 5), ya.css("left", h + c.offset().left - b.win.pageXOffset - j / 2), ya.data("selected-cell", c), ya.data("position", "before"), ya.addClass("fr-visible"), !1) : c.offset().left + c.outerWidth() / 2 <= g && g < c.offset().left + c.outerWidth() ? (j = parseInt(ya.find("a").css("width"), 10), ya.css("top", i + c.offset().top - b.win.pageYOffset - j - 5), ya.css("left", h + c.offset().left + c.outerWidth() - b.win.pageXOffset - j / 2), ya.data("selected-cell", c), ya.data("position", "after"), ya.addClass("fr-visible"), !1) : void 0
            })
        }

        function fa(c, d) {
            if (b.$box.find(".fr-line-breaker").is(":visible")) return !1;
            ya || pa(), b.$box.append(ya), ya.data("instance", b);
            var e = a(d),
                f = c.pageY,
                g = 0,
                h = 0;
            b.opts.iframe && (g += b.$iframe.offset().left - b.helpers.scrollLeft(), h += b.$iframe.offset().top - b.helpers.scrollTop());
            var i;
            e.find("tr").each(function() {
                var c = a(this);
                return c.offset().top <= f && f < c.offset().top + c.outerHeight() / 2 ? (i = parseInt(ya.find("a").css("width"), 10), ya.css("top", h + c.offset().top - b.win.pageYOffset - i / 2), ya.css("left", g + c.offset().left - b.win.pageXOffset - i - 5), ya.data("selected-cell", c.find("td:first")), ya.data("position", "above"), ya.addClass("fr-visible"), !1) : c.offset().top + c.outerHeight() / 2 <= f && f < c.offset().top + c.outerHeight() ? (i = parseInt(ya.find("a").css("width"), 10), ya.css("top", h + c.offset().top + c.outerHeight() - b.win.pageYOffset - i / 2), ya.css("left", g + c.offset().left - b.win.pageXOffset - i - 5), ya.data("selected-cell", c.find("td:first")), ya.data("position", "below"), ya.addClass("fr-visible"), !1) : void 0
            })
        }

        function ga(c, d) {
            if (0 === sa().length) {
                var e, f, g;
                if (d && ("HTML" == d.tagName || "BODY" == d.tagName || b.node.isElement(d)))
                    for (e = 1; e <= b.opts.tableInsertHelperOffset; e++) {
                        if (f = b.doc.elementFromPoint(c.pageX - b.win.pageXOffset, c.pageY - b.win.pageYOffset + e), a(f).hasClass("fr-tooltip")) return !0;
                        if (f && ("TH" == f.tagName || "TD" == f.tagName || "TABLE" == f.tagName) && (a(f).parents(".fr-wrapper").length || b.opts.iframe)) return ea(c, a(f).closest("table")), !0;
                        if (g = b.doc.elementFromPoint(c.pageX - b.win.pageXOffset + e, c.pageY - b.win.pageYOffset), a(g).hasClass("fr-tooltip")) return !0;
                        if (g && ("TH" == g.tagName || "TD" == g.tagName || "TABLE" == g.tagName) && (a(g).parents(".fr-wrapper").length || b.opts.iframe)) return fa(c, a(g).closest("table")), !0
                    }
                b.core.sameInstance(ya) && ca()
            }
        }

        function ha(a) {
            Ca = null;
            var c = b.doc.elementFromPoint(a.pageX - b.win.pageXOffset, a.pageY - b.win.pageYOffset);
            b.opts.tableResizer && (!b.popups.areVisible() || b.popups.areVisible() && b.popups.isVisible("table.edit")) && da(a, c), !b.opts.tableInsertHelper || b.popups.areVisible() || b.$tb.hasClass("fr-inline") && b.$tb.is(":visible") || ga(a, c)
        }

        function ia() {
            if (Da) {
                var a = xa.data("table"),
                    c = a.offset().top - b.win.pageYOffset;
                b.opts.iframe && (c += b.$iframe.offset().top - b.helpers.scrollTop()), xa.css("top", c)
            }
        }

        function ja() {
            var c = xa.data("origin"),
                d = xa.data("release-position");
            if (c !== d) {
                var e = xa.data("first"),
                    f = xa.data("second"),
                    g = xa.data("table"),
                    h = g.outerWidth();
                if (b.undo.canDo() || b.undo.saveStep(), null !== e && null !== f) {
                    var i, j, k, l = I(g),
                        m = [],
                        n = [],
                        o = [],
                        p = [];
                    for (i = 0; i < l.length; i++) j = a(l[i][e]), k = a(l[i][f]), m[i] = j.outerWidth(), o[i] = k.outerWidth(), n[i] = m[i] / h * 100, p[i] = o[i] / h * 100;
                    for (i = 0; i < l.length; i++) {
                        j = a(l[i][e]), k = a(l[i][f]);
                        var q = (n[i] * (m[i] + d - c) / m[i]).toFixed(4);
                        j.css("width", q + "%"), k.css("width", (n[i] + p[i] - q).toFixed(4) + "%")
                    }
                } else {
                    var r, s = g.parent(),
                        t = h / s.width() * 100,
                        u = (parseInt(g.css("margin-left"), 10) || 0) / s.width() * 100,
                        v = (parseInt(g.css("margin-right"), 10) || 0) / s.width() * 100;
                    "rtl" == b.opts.direction && 0 === f || "rtl" != b.opts.direction && 0 !== f ? (r = (h + d - c) / h * t, g.css("margin-right", "calc(100% - " + Math.round(r).toFixed(4) + "% - " + Math.round(u).toFixed(4) + "%)")) : ("rtl" == b.opts.direction && 0 !== f || "rtl" != b.opts.direction && 0 === f) && (r = (h - d + c) / h * t, g.css("margin-left", "calc(100% - " + Math.round(r).toFixed(4) + "% - " + Math.round(v).toFixed(4) + "%)")), g.css("width", Math.round(r).toFixed(4) + "%")
                }
                b.selection.restore(), b.undo.saveStep()
            }
            xa.removeData("origin"), xa.removeData("release-position"), xa.removeData("first"), xa.removeData("second"), xa.removeData("table")
        }

        function ka(b, c) {
            var d, e = a(c[0][b]).outerWidth();
            for (d = 1; d < c.length; d++) e = Math.min(e, a(c[d][b]).outerWidth());
            return e
        }

        function la(a, b, c) {
            var d, e = 0;
            for (d = a; d <= b; d++) e += ka(d, c);
            return e
        }

        function ma(a) {
            if (sa().length > 1 && Aa && N(), !1 === Aa && !1 === za && !1 === Da) Ca && clearTimeout(Ca), b.edit.isDisabled() && !b.popups.isVisible("table.edit") || (Ca = setTimeout(ha, 30, a));
            else if (Da) {
                var c = a.pageX - b.win.pageXOffset;
                b.opts.iframe && (c += b.$iframe.offset().left);
                var d = xa.data("max-left"),
                    e = xa.data("max-right");
                c >= d && c <= e ? xa.css("left", c - b.opts.tableResizerOffset) : c < d && parseFloat(xa.css("left"), 10) > d - b.opts.tableResizerOffset ? xa.css("left", d - b.opts.tableResizerOffset) : c > e && parseFloat(xa.css("left"), 10) < e - b.opts.tableResizerOffset && xa.css("left", e - b.opts.tableResizerOffset)
            } else Aa && ca()
        }

        function na(c) {
            b.node.isEmpty(c.get(0)) ? c.prepend(a.FE.MARKERS) : c.prepend(a.FE.START_MARKER).append(a.FE.END_MARKER)
        }

        function oa(c) {
            if (c.which == a.FE.KEYCODE.TAB) {
                var d;
                if (sa().length > 0) d = b.$el.find(".fr-selected-cell:last");
                else {
                    var e = b.selection.element();
                    "TD" == e.tagName || "TH" == e.tagName ? d = a(e) : e != b.el && (a(e).parentsUntil(b.$el, "td").length > 0 ? d = a(e).parents("td:first") : a(e).parentsUntil(b.$el, "th").length > 0 && (d = a(e).parents("th:first")))
                }
                if (d) return c.preventDefault(), a(b.selection.element()).parents("ol, ul").length > 0 || (T(), c.shiftKey ? d.prev().length > 0 ? na(d.prev()) : d.closest("tr").length > 0 && d.closest("tr").prev().length > 0 ? na(d.closest("tr").prev().find("td:last")) : d.closest("tbody").length > 0 && d.closest("table").find("thead tr").length > 0 && na(d.closest("table").find("thead tr th:last")) : d.next().length > 0 ? na(d.next()) : d.closest("tr").length > 0 && d.closest("tr").next().length > 0 ? na(d.closest("tr").next().find("td:first")) : d.closest("thead").length > 0 && d.closest("table").find("tbody tr").length > 0 ? na(d.closest("table").find("tbody tr td:first")) : (d.addClass("fr-selected-cell"), t("below"), M(), na(d.closest("tr").next().find("td:first"))), b.selection.restore(), !1)
            }
        }

        function pa() {
            b.shared.$ti_helper || (b.shared.$ti_helper = a('<div class="fr-insert-helper"><a class="fr-floating-btn" role="button" tabIndex="-1" title="' + b.language.translate("Insert") + '"><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M22,16.75 L16.75,16.75 L16.75,22 L15.25,22.000 L15.25,16.75 L10,16.75 L10,15.25 L15.25,15.25 L15.25,10 L16.75,10 L16.75,15.25 L22,15.25 L22,16.75 Z"/></svg></a></div>'), b.events.bindClick(b.shared.$ti_helper, "a", function() {
                var a = ya.data("selected-cell"),
                    c = ya.data("position"),
                    d = ya.data("instance") || b;
                "before" == c ? (a.addClass("fr-selected-cell"), d.table.insertColumn(c), a.removeClass("fr-selected-cell")) : "after" == c ? (a.addClass("fr-selected-cell"), d.table.insertColumn(c), a.removeClass("fr-selected-cell")) : "above" == c ? (a.addClass("fr-selected-cell"), d.table.insertRow(c), a.removeClass("fr-selected-cell")) : "below" == c && (a.addClass("fr-selected-cell"), d.table.insertRow(c), a.removeClass("fr-selected-cell")), ca()
            }), b.events.on("shared.destroy", function() {
                b.shared.$ti_helper.html("").removeData().remove(), b.shared.$ti_helper = null
            }, !0), b.events.$on(b.shared.$ti_helper, "mousemove", function(a) {
                a.stopPropagation()
            }, !0), b.events.$on(a(b.o_win), "scroll", function() {
                ca()
            }, !0), b.events.$on(b.$wp, "scroll", function() {
                ca()
            }, !0)), ya = b.shared.$ti_helper, b.events.on("destroy", function() {
                ya = null
            }), b.tooltip.bind(b.$box, ".fr-insert-helper > a.fr-floating-btn")
        }

        function qa() {
            Ba = null, clearTimeout(Ca)
        }

        function ra() {
            sa().length > 0 ? d() : (b.popups.hide("table.insert"), b.toolbar.showInline())
        }

        function sa() {
            return b.el.querySelectorAll(".fr-selected-cell")
        }

        function ta() {
            var c = sa();
            if (c.length) {
                for (var d = c[0]; d && "TABLE" != d.tagName && d.parentNode != b.el;) d = d.parentNode;
                return a(d && "TABLE" == d.tagName ? d : [])
            }
            return a([])
        }

        function ua(c) {
            if (c.altKey && c.which == a.FE.KEYCODE.SPACE) {
                var e, f = b.selection.element();
                if ("TD" == f.tagName || "TH" == f.tagName ? e = f : a(f).closest("td").length > 0 ? e = a(f).closest("td").get(0) : a(f).closest("th").length > 0 && (e = a(f).closest("th").get(0)), e) return c.preventDefault(), R(e, e), d(), !1
            }
        }

        function va(c) {
            var d = sa();
            if (d.length > 0) {
                var e, f, g = I(),
                    h = c.which;
                1 == d.length ? (e = d[0], f = e) : (e = b.el.querySelector(".fr-cell-fixed"), f = b.el.querySelector(".fr-cell-handler"));
                var i = J(f, g);
                if (a.FE.KEYCODE.ARROW_RIGHT == h) {
                    if (i.col < g[0].length - 1) return R(e, g[i.row][i.col + 1]), !1
                } else if (a.FE.KEYCODE.ARROW_DOWN == h) {
                    if (i.row < g.length - 1) return R(e, g[i.row + 1][i.col]), !1
                } else if (a.FE.KEYCODE.ARROW_LEFT == h) {
                    if (i.col > 0) return R(e, g[i.row][i.col - 1]), !1
                } else if (a.FE.KEYCODE.ARROW_UP == h && i.row > 0) return R(e, g[i.row - 1][i.col]), !1
            }
        }

        function wa() {
            if (!b.$wp) return !1;
            if (!b.helpers.isMobile()) {
                Aa = !1, za = !1, Da = !1, b.events.$on(b.$el, "mousedown", U), b.popups.onShow("image.edit", function() {
                    M(), Aa = !1, za = !1
                }), b.popups.onShow("link.edit", function() {
                    M(), Aa = !1, za = !1
                }), b.events.on("commands.mousedown", function(a) {
                    a.parents(".fr-toolbar").length > 0 && M()
                }), b.events.$on(b.$el, "mouseenter", "th, td", W), b.events.$on(b.$win, "mouseup", V), b.opts.iframe && b.events.$on(a(b.o_win), "mouseup", V), b.events.$on(b.$win, "mousemove", ma), b.events.$on(a(b.o_win), "scroll", ia), b.events.on("contentChanged", function() {
                    sa().length > 0 && (d(), b.$el.find("img").on("load.selected-cells", function() {
                        a(this).off("load.selected-cells"), sa().length > 0 && d()
                    }))
                }), b.events.$on(a(b.o_win), "resize", function() {
                    M()
                }), b.events.on("toolbar.esc", function() {
                    if (sa().length > 0) return b.events.disableBlur(), b.events.focus(), !1
                }, !0), b.events.$on(b.$el, "keydown", function(a) {
                    a.shiftKey ? !1 === va(a) && setTimeout(function() {
                        d()
                    }, 0) : _(a)
                }), b.events.on("keydown", function(c) {
                    if (!1 === oa(c)) return !1;
                    var d = sa();
                    if (d.length > 0) {
                        if (d.length > 0 && b.keys.ctrlKey(c) && c.which == a.FE.KEYCODE.A) return M(), b.popups.isVisible("table.edit") && b.popups.hide("table.edit"), d = [], !0;
                        if (c.which == a.FE.KEYCODE.ESC && b.popups.isVisible("table.edit")) return M(), b.popups.hide("table.edit"), c.preventDefault(), c.stopPropagation(), c.stopImmediatePropagation(), d = [], !1;
                        if (d.length > 1 && c.which == a.FE.KEYCODE.BACKSPACE) {
                            b.undo.saveStep();
                            for (var e = 0; e < d.length; e++) a(d[e]).html("<br>"), e == d.length - 1 && a(d[e]).prepend(a.FE.MARKERS);
                            return b.selection.restore(), b.undo.saveStep(), d = [], !1
                        }
                        if (d.length > 1 && c.which != a.FE.KEYCODE.F10 && !b.keys.isBrowserAction(c)) return c.preventDefault(), d = [], !1
                    } else if (d = [], !1 === ua(c)) return !1
                }, !0);
                var c = [];
                b.events.on("html.beforeGet", function() {
                    c = sa();
                    for (var a = 0; a < c.length; a++) c[a].className = (c[a].className || "").replace(/fr-selected-cell/g, "")
                }), b.events.on("html.afterGet", function() {
                    for (var a = 0; a < c.length; a++) c[a].className = (c[a].className ? c[a].className.trim() + " " : "") + "fr-selected-cell";
                    c = []
                }), g(!0), k(!0)
            }
            b.events.on("destroy", qa)
        }
        var xa, ya, za, Aa, Ba, Ca, Da;
        return {
            _init: wa,
            insert: p,
            remove: q,
            insertRow: t,
            deleteRow: u,
            insertColumn: v,
            deleteColumn: w,
            mergeCells: B,
            splitCellVertically: D,
            splitCellHorizontally: C,
            addHeader: r,
            removeHeader: s,
            setBackground: E,
            showInsertPopup: c,
            showEditPopup: d,
            showColorsPopup: e,
            back: ra,
            verticalAlign: F,
            horizontalAlign: G,
            applyStyle: H,
            selectedTable: ta,
            selectedCells: sa
        }
    }, a.FE.DefineIcon("insertTable", {
        NAME: "table"
    }), a.FE.RegisterCommand("insertTable", {
        title: "Insert Table",
        undo: !1,
        focus: !0,
        refreshOnCallback: !1,
        popup: !0,
        callback: function() {
            this.popups.isVisible("table.insert") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(), this.selection.restore()), this.popups.hide("table.insert")) : this.table.showInsertPopup()
        },
        plugin: "table"
    }), a.FE.RegisterCommand("tableInsert", {
        callback: function(a, b, c) {
            this.table.insert(b, c), this.popups.hide("table.insert")
        }
    }), a.FE.DefineIcon("tableHeader", {
        NAME: "header"
    }), a.FE.RegisterCommand("tableHeader", {
        title: "Table Header",
        focus: !1,
        toggle: !0,
        callback: function() {
            this.popups.get("table.edit").find('.fr-command[data-cmd="tableHeader"]').hasClass("fr-active") ? this.table.removeHeader() : this.table.addHeader()
        },
        refresh: function(a) {
            var b = this.table.selectedTable();
            b.length > 0 && (0 === b.find("th").length ? a.removeClass("fr-active").attr("aria-pressed", !1) : a.addClass("fr-active").attr("aria-pressed", !0))
        }
    }), a.FE.DefineIcon("tableRows", {
        NAME: "bars"
    }), a.FE.RegisterCommand("tableRows", {
        type: "dropdown",
        focus: !1,
        title: "Row",
        options: {
            above: "Insert row above",
            below: "Insert row below",
            delete: "Delete row"
        },
        html: function() {
            var b = '<ul class="fr-dropdown-list" role="presentation">',
                c = a.FE.COMMANDS.tableRows.options;
            for (var d in c) c.hasOwnProperty(d) && (b += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableRows" data-param1="' + d + '" title="' + this.language.translate(c[d]) + '">' + this.language.translate(c[d]) + "</a></li>");
            return b += "</ul>"
        },
        callback: function(a, b) {
            "above" == b || "below" == b ? this.table.insertRow(b) : this.table.deleteRow()
        }
    }), a.FE.DefineIcon("tableColumns", {
        NAME: "bars fa-rotate-90"
    }), a.FE.RegisterCommand("tableColumns", {
        type: "dropdown",
        focus: !1,
        title: "Column",
        options: {
            before: "Insert column before",
            after: "Insert column after",
            delete: "Delete column"
        },
        html: function() {
            var b = '<ul class="fr-dropdown-list" role="presentation">',
                c = a.FE.COMMANDS.tableColumns.options;
            for (var d in c) c.hasOwnProperty(d) && (b += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableColumns" data-param1="' + d + '" title="' + this.language.translate(c[d]) + '">' + this.language.translate(c[d]) + "</a></li>");
            return b += "</ul>"
        },
        callback: function(a, b) {
            "before" == b || "after" == b ? this.table.insertColumn(b) : this.table.deleteColumn()
        }
    }), a.FE.DefineIcon("tableCells", {
        NAME: "square-o"
    }), a.FE.RegisterCommand("tableCells", {
        type: "dropdown",
        focus: !1,
        title: "Cell",
        options: {
            merge: "Merge cells",
            "vertical-split": "Vertical split",
            "horizontal-split": "Horizontal split"
        },
        html: function() {
            var b = '<ul class="fr-dropdown-list" role="presentation">',
                c = a.FE.COMMANDS.tableCells.options;
            for (var d in c) c.hasOwnProperty(d) && (b += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableCells" data-param1="' + d + '" title="' + this.language.translate(c[d]) + '">' + this.language.translate(c[d]) + "</a></li>");
            return b += "</ul>"
        },
        callback: function(a, b) {
            "merge" == b ? this.table.mergeCells() : "vertical-split" == b ? this.table.splitCellVertically() : this.table.splitCellHorizontally()
        },
        refreshOnShow: function(a, b) {
            this.$el.find(".fr-selected-cell").length > 1 ? (b.find('a[data-param1="vertical-split"]').addClass("fr-disabled").attr("aria-disabled", !0), b.find('a[data-param1="horizontal-split"]').addClass("fr-disabled").attr("aria-disabled", !0), b.find('a[data-param1="merge"]').removeClass("fr-disabled").attr("aria-disabled", !1)) : (b.find('a[data-param1="merge"]').addClass("fr-disabled").attr("aria-disabled", !0), b.find('a[data-param1="vertical-split"]').removeClass("fr-disabled").attr("aria-disabled", !1), b.find('a[data-param1="horizontal-split"]').removeClass("fr-disabled").attr("aria-disabled", !1))
        }
    }), a.FE.DefineIcon("tableRemove", {
        NAME: "trash"
    }), a.FE.RegisterCommand("tableRemove", {
        title: "Remove Table",
        focus: !1,
        callback: function() {
            this.table.remove()
        }
    }), a.FE.DefineIcon("tableStyle", {
        NAME: "paint-brush"
    }), a.FE.RegisterCommand("tableStyle", {
        title: "Table Style",
        type: "dropdown",
        focus: !1,
        html: function() {
            var a = '<ul class="fr-dropdown-list" role="presentation">',
                b = this.opts.tableStyles;
            for (var c in b) b.hasOwnProperty(c) && (a += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableStyle" data-param1="' + c + '" title="' + this.language.translate(b[c]) + '">' + this.language.translate(b[c]) + "</a></li>");
            return a += "</ul>"
        },
        callback: function(a, b) {
            this.table.applyStyle(b, this.$el.find(".fr-selected-cell").closest("table"), this.opts.tableMultipleStyles, this.opts.tableStyles)
        },
        refreshOnShow: function(b, c) {
            var d = this.$el.find(".fr-selected-cell").closest("table");
            d && c.find(".fr-command").each(function() {
                var b = a(this).data("param1"),
                    c = d.hasClass(b);
                a(this).toggleClass("fr-active", c).attr("aria-selected", c)
            })
        }
    }), a.FE.DefineIcon("tableCellBackground", {
        NAME: "tint"
    }), a.FE.RegisterCommand("tableCellBackground", {
        title: "Cell Background",
        focus: !1,
        popup: !0,
        callback: function() {
            this.table.showColorsPopup()
        }
    }), a.FE.RegisterCommand("tableCellBackgroundColor", {
        undo: !0,
        focus: !1,
        callback: function(a, b) {
            this.table.setBackground(b)
        }
    }), a.FE.DefineIcon("tableBack", {
        NAME: "arrow-left"
    }), a.FE.RegisterCommand("tableBack", {
        title: "Back",
        undo: !1,
        focus: !1,
        back: !0,
        callback: function() {
            this.table.back()
        },
        refresh: function(a) {
            0 !== this.table.selectedCells().length || this.opts.toolbarInline ? (a.removeClass("fr-hidden"), a.next(".fr-separator").removeClass("fr-hidden")) : (a.addClass("fr-hidden"), a.next(".fr-separator").addClass("fr-hidden"))
        }
    }), a.FE.DefineIcon("tableCellVerticalAlign", {
        NAME: "arrows-v"
    }), a.FE.RegisterCommand("tableCellVerticalAlign", {
        type: "dropdown",
        focus: !1,
        title: "Vertical Align",
        options: {
            Top: "Align Top",
            Middle: "Align Middle",
            Bottom: "Align Bottom"
        },
        html: function() {
            var b = '<ul class="fr-dropdown-list" role="presentation">',
                c = a.FE.COMMANDS.tableCellVerticalAlign.options;
            for (var d in c) c.hasOwnProperty(d) && (b += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableCellVerticalAlign" data-param1="' + d.toLowerCase() + '" title="' + this.language.translate(c[d]) + '">' + this.language.translate(d) + "</a></li>");
            return b += "</ul>"
        },
        callback: function(a, b) {
            this.table.verticalAlign(b)
        },
        refreshOnShow: function(a, b) {
            b.find('.fr-command[data-param1="' + this.$el.find(".fr-selected-cell").css("vertical-align") + '"]').addClass("fr-active").attr("aria-selected", !0)
        }
    }), a.FE.DefineIcon("tableCellHorizontalAlign", {
        NAME: "align-left"
    }), a.FE.DefineIcon("align-left", {
        NAME: "align-left"
    }), a.FE.DefineIcon("align-right", {
        NAME: "align-right"
    }), a.FE.DefineIcon("align-center", {
        NAME: "align-center"
    }), a.FE.DefineIcon("align-justify", {
        NAME: "align-justify"
    }), a.FE.RegisterCommand("tableCellHorizontalAlign", {
        type: "dropdown",
        focus: !1,
        title: "Horizontal Align",
        options: {
            left: "Align Left",
            center: "Align Center",
            right: "Align Right",
            justify: "Align Justify"
        },
        html: function() {
            var b = '<ul class="fr-dropdown-list" role="presentation">',
                c = a.FE.COMMANDS.tableCellHorizontalAlign.options;
            for (var d in c) c.hasOwnProperty(d) && (b += '<li role="presentation"><a class="fr-command fr-title" tabIndex="-1" role="option" data-cmd="tableCellHorizontalAlign" data-param1="' + d + '" title="' + this.language.translate(c[d]) + '">' + this.icon.create("align-" + d) + '<span class="fr-sr-only">' + this.language.translate(c[d]) + "</span></a></li>");
            return b += "</ul>"
        },
        callback: function(a, b) {
            this.table.horizontalAlign(b)
        },
        refresh: function(b) {
            var c = this.table.selectedCells();
            c.length && b.find("> *:first").replaceWith(this.icon.create("align-" + this.helpers.getAlignment(a(c[0]))))
        },
        refreshOnShow: function(a, b) {
            b.find('.fr-command[data-param1="' + this.helpers.getAlignment(this.$el.find(".fr-selected-cell:first")) + '"]').addClass("fr-active").attr("aria-selected", !0)
        }
    }), a.FE.DefineIcon("tableCellStyle", {
        NAME: "magic"
    }), a.FE.RegisterCommand("tableCellStyle", {
        title: "Cell Style",
        type: "dropdown",
        focus: !1,
        html: function() {
            var a = '<ul class="fr-dropdown-list" role="presentation">',
                b = this.opts.tableCellStyles;
            for (var c in b) b.hasOwnProperty(c) && (a += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableCellStyle" data-param1="' + c + '" title="' + this.language.translate(b[c]) + '">' + this.language.translate(b[c]) + "</a></li>");
            return a += "</ul>"
        },
        callback: function(a, b) {
            this.table.applyStyle(b, this.$el.find(".fr-selected-cell"), this.opts.tableCellMultipleStyles, this.opts.tableCellStyles)
        },
        refreshOnShow: function(b, c) {
            var d = this.$el.find(".fr-selected-cell:first");
            d && c.find(".fr-command").each(function() {
                var b = a(this).data("param1"),
                    c = d.hasClass(b);
                a(this).toggleClass("fr-active", c).attr("aria-selected", c)
            })
        }
    }), a.FE.DefineIcon("tableColorRemove", {
        NAME: "eraser"
    })
});