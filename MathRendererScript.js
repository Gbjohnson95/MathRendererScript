$(document).ready(function () {
    var newhtml = document.body.innerHTML;
    var fullEquations = newhtml.match(/[$]{2}(.*?)[$]{2}/g);
    if (fullEquations !== null) {
        for (var i = 0; i < fullEquations.length; i++) {
            var cleanedTex = fullEquations[i].replace(/[$]{2}/g, "");
            newhtml = newhtml.replace(fullEquations[i], '<span class="latex" id="fullLatex">' + cleanedTex + "</span>");
        }
    }
    var inlineEquations = newhtml.match(/[$]{1}(.*?)[$]{1}/g);
    if (inlineEquations !== null) {
        for (var i = 0; i < inlineEquations.length; i++) {
            var cleanedTex = inlineEquations[i].replace(/^[$]/, "");
            cleanedTex = cleanedTex.replace(/[$]$/, "");
            newhtml = newhtml.replace(inlineEquations[i], '<span class="latex" id="inlineLatex">' + cleanedTex + "</span>");
        }
    }
    document.body.innerHTML = newhtml;
    TeXHandler($(".latex"));

    function TeXHandler(elems) {
        if (!window.katex) {
            loadKaTeX(elems);
        } else {
            $(elems).each(function () {
                var tex = $(this).html();
                tex = tex.replace(/amp;/g, "");
                $(this).css({
                    "padding-bottom": "1.5rem;",
                    "padding-top": "1.5rem;",
                    "text-align": "left",
                    "font-size": "1.2em"
                });
                if ($(this).attr("id") == "fullLatex") {
                    katex.render(tex, this, {
                        displayMode: true
                    });
                } else if ($(this).attr("id") == "inlineLatex") {
                    katex.render(tex, this);
                }
            });
        }
    }

    function loadKaTeX(elems) {
        $.getScript("https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.js", function () {
            $("head").append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css" />');
            TeXHandler(elems);
        });
    }
});
