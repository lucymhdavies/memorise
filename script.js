
$(function () {
    registerHandlers();
});

function registerHandlers() {
    $(".nes-radio").change(toggleVisibility)
    $("#original").keyup(updateDifference)
    $("#original").change(updateDifference)
    $("#typed").keyup(updateDifference)
    $("#typed").change(updateDifference)
}

function toggleVisibility() {
    original = $("#original").get(0)
    typed = $("#typed").get(0)

    if ($("#show-original:checked").val() == "on") {
        original.type = "text"
    } else {
        original.type = "password"
    }

    if ($("#show-typed:checked").val() == "on") {
        typed.type = "text"
    } else {
        typed.type = "password"
    }
}

function updateDifference() {

    original = $("#original").val()
    typed = $("#typed").val()

    lev = levenshtein(original, typed)

    $("#progress").attr("max", original.length)
    $("#progress").attr("value", original.length - lev)

    if (lev != 0) {
        $("#typed").addClass("is-error")
        $("#progress").addClass("is-error")
        $("#typed").removeClass("is-success")
        $("#progress").removeClass("is-success")
    } else {
        $("#typed").addClass("is-success")
        $("#progress").addClass("is-success")
        $("#typed").removeClass("is-error")
        $("#progress").removeClass("is-error")
    }

    if (original.length == 0 && typed.length == 0) {
        $("#typed").removeClass("is-error")
        $("#progress").removeClass("is-error")
        $("#typed").removeClass("is-success")
        $("#progress").removeClass("is-success")
    }
}


// From https://rosettacode.org/wiki/Levenshtein_distance#JavaScript
// ES5 version
//
// GNU Free Documentation License 1.2
// https://www.gnu.org/licenses/old-licenses/fdl-1.2.html
function levenshtein(a, b) {
    var t = [], u, i, j, m = a.length, n = b.length;
    if (!m) { return n; }
    if (!n) { return m; }
    for (j = 0; j <= n; j++) { t[j] = j; }
    for (i = 1; i <= m; i++) {
        for (u = [i], j = 1; j <= n; j++) {
            u[j] = a[i - 1] === b[j - 1] ? t[j - 1] : Math.min(t[j - 1], t[j], u[j - 1]) + 1;
        } t = u;
    } return u[n];
}