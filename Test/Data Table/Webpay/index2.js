const createItem = (e, t) => {
    const a = t.cloneNode(!0);
    a.classList.remove("hidden");
    const n = a.querySelector(".biller-item-title"),
        l = a.querySelector('[data-element="category"]'),
        r = a.querySelector(".biller-item-services-title");
    return n && (n.textContent = e.name || e.Name), l && (l.textContent = e.category), r && (r.textContent = e.payment_method), a
};

async function fetchPartners(e) {
    try {
        const t = await fetch(e);
        return await t.json()
    } catch (e) {
        return console.log("fetchPartners(): ", e.message), []
    }
}

function renderItems(e, t, a) {
    e.textContent = "", t.map((t => e.append(createItem(t, a)))), e.animate({
        opacity: [0, 1]
    }, 300)
}

(async function() {
    const e = document.querySelector(".biller-result-card"),
        t = document.querySelector(".biller-result.billers_collection-list"),
        a = $("#field-2"),
        n = $(".biller-list-item"),
        l = $("#pagination-area"),
        r = new RegExp("[^A-Za-z]"),
        o = $(".results-letter-index"),
        i = $(".biller-filter-reset-btn");
    let c = $(".alphabet-nav > .alphabet-nav_letter"),
        s = "",
        d = "",
        p = a.val(),
        u = await fetchPartners("https://gcashgit.github.io/GCash-webflow/Test/Data%20Table/Webpay/data.json"),
        m = [],
        f = $(window).width();

    function h() {
        const e = $(".biller-result.billers_collection-list > .biller-result-card").first().find(".biller-item-title ").text();
        r.test(e.charAt(0)) ? o.text("#") : o.text(e.charAt(0))
    }

    function b(e) {
        let a = '<svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20.5" cy="20.4922" r="19" stroke="#025AE9" stroke-width="2"/><path d="M19 24L23 20L19 16" stroke="#025AE9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        f >= 1280 ? l.pagination({
            ulClassName: "pagination-list-wrapper",
            dataSource: e,
            prevText: a,
            nextText: a,
            showNavigator: !0,
            formatNavigator: "Results: <%= rangeStart %> - <%= rangeEnd %> of <%= totalNumber %>",
            pageSize: 15,
            pageRange: 1,
            callback: function(e, a) {
                renderItems(t, e, h())
            }
        }) : f <= 1279 && 480 <= f ? l.pagination({
            ulClassName: "pagination-list-wrapper",
            dataSource: e,
            prevText: a,
            nextText: a,
            showNavigator: !0,
            formatNavigator: "Results: <%= rangeStart %> - <%= rangeEnd %> of <%= totalNumber %>",
            pageSize: 9,
            pageRange: 1,
            callback: function(e, a) {
                renderItems(t, e, h())
            }
        }) : f <= 479 && l.pagination({
            ulClassName: "pagination-list-wrapper",
            dataSource: e,
            prevText: a,
            nextText: a,
            showNavigator: !0,
            formatNavigator: "Results: <%= rangeStart %> - <%= rangeEnd %> of <%= totalNumber %>",
            pageSize: 5,
            pageRange: 1,
            callback: function(e, a) {
                renderItems(t, e, h())
            }
        })
    }

    function g(e, t) {
        if (r.test(t)) {
            for (let t = 0; t < e.length; t++)
                if (r.test(e[t].name.charAt(0))) return !0
        } else
            for (let a = 0; a < e.length; a++)
                if (e[a].name.toLowerCase().startsWith(t.toLowerCase())) return !0;
        return !1
    }

    function y(e) {
        c.each((function() {
            g(e, $(this).data("letter")) ? $(this).removeClass("disabled") : $(this).addClass("disabled")
        }))
    }

    function v(e, t = " ") {
        let a = $(".no-results-wrapper"),
            n = $(".no-results-wrapper > .no-results-label .result"),
            r = $(".results-wrapper"),
            o = $(".results-letter-index"),
            i = $(".biller-view-options");
        e ? (a.removeClass("disabled"), l.hide(), r.hide(), o.hide(), n.text(t), i.addClass("no-result")) : (a.addClass("disabled"), l.show(), r.show(), i.removeClass("no-result"), f < 479 && o.show())
    }

    function w() {
        s.length > 0 || d.length > 0 ? i.removeClass("no-filters") : i.addClass("no-filters")
    }
    t.style.opacity = "1", a.on("input", (function() {
        p = $(this).val().toLowerCase();
        let a = "";
        s.length > 0 && d.length > 0 ? r.test(d) ? (m = u.sort(((e, t) => e.name.localeCompare(t.name))).filter((e => e.category.toLowerCase() === s.toLowerCase())), y(m), m = u.sort(((e, t) => e.name.localeCompare(t.name))).filter((e => e.name.toLowerCase().includes(p) && e.category.toLowerCase() === s.toLowerCase() && r.test(e.name.charAt(0)))), l.pagination("destroy"), b(m)) : (m = u.sort(((e, t) => e.name.localeCompare(t.name))).filter((e => e.category.toLowerCase() === s.toLowerCase())), y(m), m = u.sort(((e, t) => e.name.localeCompare(t.name))).filter((e => e.name.toLowerCase().includes(p) && e.category.toLowerCase() === s.toLowerCase() && e.name.toLowerCase().startsWith(d))), l.pagination("destroy"), b(m)), v(!1), a = `Category: ${s}, Letter: ${d.toUpperCase()} and ${p}`) : s.length > 0 && 0 == d.length ? (m = u.sort(((e, t) => e.name.localeCompare(t.name))).filter((e => e.name.toLowerCase().includes(p) && e.category.toLowerCase() === s.toLowerCase())), l.pagination("destroy"), b(m), y(m), v(!1), a = `Category: ${s} and ${p}`) : 0 == s.length && d.length > 0 ? (m = u.sort(((e, t) => e.name.localeCompare(t.name))).filter((e => e.name.toLowerCase().includes(p))), y(m), r.test(d) ? (m = u.sort(((e, t) => e.name.localeCompare(t.name))).filter((e => e.name.toLowerCase().includes(p) && r.test(e.name.charAt(0)))), l.pagination("destroy"), b(m), v(!1)) : (m = u.sort(((e, t) => e.name.localeCompare(t.name))).filter((e => e.name.toLowerCase().includes(p) && e.name.toLowerCase().startsWith(d))), l.pagination("destroy"), b(m)), a = `Letter: ${d.toUpperCase()} and ${p}`) : (m = u.sort(((e, t) => e.name.localeCompare(t.name))).filter((e => e.name.toLowerCase().includes(p))), l.pagination("destroy"), b(m), y(m), v(!1), a = p), 0 == m.length && (b(m), y(m), v(!0, a))
    })), n.on("click", (function() {
        let e = "";
        $(".biller_dropdown-current").text($(this).children(".biller-label").text()), s = $(this).children(".biller-label").text(), "all categories" === s.toLowerCase() ? (m = u.sort(((e, t) => e.name.localeCompare(t.name))), y(m), m = u.sort(((e, t) => e.name.localeCompare(t.name))).filter((e => e.name.toLowerCase().startsWith(d))), l.pagination("destroy"), b(m), v(!1), s = "") : d.length > 0 ? (r.test(d) ? m = u.sort(((e, t) => e.name.localeCompare(t.name))).filter((e => e.category.toLowerCase() === s.toLowerCase() && r.test(e.name.charAt(0)))) : m = u.sort(((e, t) => e.name.localeCompare(t.name))).filter((e => e.category.toLowerCase() === s.toLowerCase() && e.name.toLowerCase().startsWith(d))), y(m), l.pagination("destroy"), b(m), v(!1), e = `Category: ${s} and Starting Letter: ${d}`) : (m = u.sort(((e, t) => e.name.localeCompare(t.name))).filter((e => e.category.toLowerCase() === s.toLowerCase())), y(m), l.pagination("destroy"), b(m), v(!1), e = `Category: ${s}`), 0 == m.length && (b(m), v(!0, e)), a.val(""), w()
    })), c.on("click", (function() {
        let e = "";
        d = $(this).data("letter"), "reset" !== d ? ($(".results-letter-index").removeClass("disabled"), $(".results-letter-index").text(d), s.length > 0 ? m = r.test(d) ? u.sort(((e, t) => e.name.localeCompare(t.name))).filter((e => e.category.toLowerCase() === s.toLowerCase() && r.test(e.name.charAt(0)))) : u.sort(((e, t) => e.name.localeCompare(t.name))).filter((e => e.category.toLowerCase() === s.toLowerCase() && e.name.toLowerCase().startsWith(d))) : m = r.test(d) ? u.sort(((e, t) => e.name.localeCompare(t.name))).filter((e => r.test(e.name.charAt(0)))) : u.sort(((e, t) => e.name.localeCompare(t.name))).filter((e => e.name.toLowerCase().startsWith(d))), l.pagination("destroy"), b(m), v(!1), e = `Category: ${s}, Starting Letter: ${d}`) : (d = "", m = s.length > 0 ? u.sort(((e, t) => e.name.localeCompare(t.name))).filter((e => e.category.toLowerCase() === s.toLowerCase())) : u.sort(((e, t) => e.name.localeCompare(t.name))), l.pagination("destroy"), b(m), v(!1), $(".results-letter-index").text(" "), e = `Category: ${s}`), 0 == m.length && (b(m), v(!0, e)), a.val(""), w()
    })), i.on("click", (function() {
        s = "", d = "", a.val(""), $(".results-letter-index").text(""), $(".results-letter-index").addClass("disabled"), $(".biller_dropdown-current").text("All Categories"), m = u.sort(((e, t) => e.name.localeCompare(t.name))), l.pagination("destroy"), b(m), w(), v(!1)
    })), $(".biller-list-item[data-label='All Categories']").trigger("click"), $(".alphabet-nav > .alphabet-nav_letter[data-letter='reset']").trigger("click")
})();
