(function (document) {

    var langArr =
        [
            {
                slug: "the-focus-keyword-doesn-t-appear-in-the-url",
                en: "The focus keyword doesn't appear in the URL",
                se: "The focus keyword doesn't appear in the URL"
            },
            {
                slug: "the-focus-keyword-appears-in-the-url",
                en: "The focus keyword appears in the URL",
                se: "The focus keyword appears in the URL"
            },
            {
                slug: "the-focus-keyword-doesn-t-appear-in-the-title",
                en: "The focus keyword doesn't appear in the title",
                se: "The focus keyword doesn't appear in the title"
            },
            {
                slug: "the-focus-keyword-appears-in-the-title",
                en: "The focus keyword appears in the title",
                se: "The focus keyword appears in the title"
            },
            {
                slug: "the-length-of-title-is-too-short",
                en: "The length of title is too short (shorter than 35 characters)",
                se: "The length of title is too short (shorter than 35 characters)"
            },
            {
                slug: "the-length-of-title-is-too-long",
                en: "The length of title is too long (longer than 65 characters)",
                se: "The length of title is too long (longer than 65 characters)"
            },
            {
                slug: "the-length-of-title-is-good",
                en: "The length of title is good (between 35 characters and 65 characters)",
                se: "The length of title is good (between 35 characters and 65 characters)"
            },
            {
                slug: "the-focus-keyword-doesn-t-appear-in-the-description",
                en: "The focus keyword doesn't appear in the description",
                se: "The focus keyword doesn't appear in the description"
            },
            {
                slug: "the-focus-keyword-appears-in-the-description",
                en: "The focus keyword appears in the description",
                se: "The focus keyword appears in the description"
            },
            {
                slug: "meta-description-is-too-long",
                en: "The length of meta description is too long",
                se: "The length of meta description is too long"
            },
            {
                slug: "the-length-of-description-is-good",
                en: "The length of meta description is good",
                se: "The length of meta description is good"
            },
            {
                slug: "the-focus-keyword-doesn-t-appear-in-the-content",
                en: "The focus keyword doesn't appear in the content",
                se: "The focus keyword doesn't appear in the content"
            },
            {
                slug: "the-focus-keyword-appears-in-the-content",
                en: "The focus keyword appears in the content",
                se: "The focus keyword appears in the content"
            },
            {
                slug: "content-is-too-short",
                en: "The length of content is too short",
                se: "The length of content is too short"
            },
            {
                slug: "the-length-of-content-is-good",
                en: "The length of content is good",
                se: "The length of content is good"
            },
            {
                slug: "the-density-of-focus-keyword-is-too-low",
                en: "The density of focus keyword is too low",
                se: "The density of focus keyword is too low"
            },
            {
                slug: "the-density-of-focus-keyword-is-good",
                en: "The density of focus keyword is good",
                se: "The density of focus keyword is good"
            }
        ]

    var Utils = {
        stripHtml: function (str) {
            return str.replace(/(<([^>]+)>)/ig, "");
        },
        slug: function (str) {
            str = str.replace(/[^a-zA-Z0-9\s]/g, "");
            str = str.toLowerCase();
            str = str.replace(/\s/g, '-');
            return str;
        },
        countWords: function (str) {
            str = str.replace(/(^\s*)|(\s*$)/gi, "");//exclude  start and end white-space
            str = str.replace(/[ ]{2,}/gi, " ");//2 or more space to 1
            str = str.replace(/\n /, "\n"); // exclude newline with a start spacing
            return str.split(' ').length;
        },
        occurrences: function (str, subStr, allowOverlapping) {
            str += "";
            subStr += "";

            if (subStr.length <= 0)
                return (str.length + 1);

            var n = 0,
                pos = 0,
                step = allowOverlapping ? 1 : subStr.length;

            while (true) {
                pos = str.indexOf(subStr, pos);
                if (pos >= 0) {
                    ++n;
                    pos += step;
                } else break;
            }
            return n;
        },
        getTranslatedText: function (slug, langCode) {
            var retVal = langArr.filter(function (obj) {
                return obj.slug === slug;
            });
            return retVal && retVal.length > 0 ? retVal[0][langCode] : "";
        }
    }

    var EvaluatedResult = function (matched, message) {
        this.matched = matched;
        this.message = message;
    }

    var Post = function (title, description, content) {
        this.title = "";
        this.description = "";
        this.content = "";
        this.url = "";

        this.stats = {
            length: {
                title: 0,
                url: 0,
                description: 0,
                content: 0
            },
            wordNumber: 0
        };

        this.calculateDensity = function (keyword) {
            var occurrences = Utils.occurrences(this.content, keyword);
            return occurrences / this.stats.wordNumber;
        }

        var processData = function (_post) {
            _post.title = title;
            _post.content = Utils.stripHtml(content);
            _post.description = description;
            _post.url = Utils.slug(title);

            _post.stats.length = {
                title: _post.title.length,
                url: _post.url.length,
                description: _post.description.length,
                content: _post.content.length
            }

            _post.stats.wordNumber = Utils.countWords(_post.content);
        }

        processData(this);
    }

    window.SeoEval = window.SeoEval || {};

    SeoEval = {
        keyword: "",
        postData: {},
        langCode: "en",
        init: function (langCode, keyword, title, description, content) {
            this.keyword = keyword;
            this.postData = new Post(title, description, content);
            this.langCode = langCode;
        },
        rules: {
            urlContainsFocusKeyword: function () {
                var result = new EvaluatedResult(false, Utils.getTranslatedText("the-focus-keyword-doesn-t-appear-in-the-url", SeoEval.langCode));
                var slugOfKeyword = Utils.slug(SeoEval.keyword);

                if (SeoEval.postData.url.indexOf(slugOfKeyword) > -1) {
                    result.matched = true;
                    result.message = Utils.getTranslatedText("the-focus-keyword-appears-in-the-url", SeoEval.langCode);
                }

                return result;
            },
            titleContainsFocusKeyword: function () {
                var result = new EvaluatedResult(false, Utils.getTranslatedText("the-focus-keyword-doesn-t-appear-in-the-title", SeoEval.langCode));

                if (SeoEval.postData.title.indexOf(SeoEval.keyword) > -1) {
                    result.matched = true;
                    result.message = Utils.getTranslatedText("the-focus-keyword-appears-in-the-title", SeoEval.langCode);
                }

                return result;
            },
            titleMatchesRecommendedLength: function () {
                if (SeoEval.postData.stats.length.title < 35) {
                    return new EvaluatedResult(false, Utils.getTranslatedText("the-length-of-title-is-too-short", SeoEval.langCode));
                }

                if (SeoEval.postData.stats.length.title > 65) {
                    return new EvaluatedResult(false, Utils.getTranslatedText("the-length-of-title-is-too-long", SeoEval.langCode));
                }

                return new EvaluatedResult(true, Utils.getTranslatedText("the-length-of-title-is-good", SeoEval.langCode));
            },
            descriptionContainsFocusKeyword: function () {
                var result = new EvaluatedResult(false, Utils.getTranslatedText("the-focus-keyword-doesn-t-appear-in-the-description", SeoEval.langCode));

                if (SeoEval.postData.description.indexOf(SeoEval.keyword) > -1) {
                    result.matched = true;
                    result.message = Utils.getTranslatedText("the-focus-keyword-appears-in-the-description", SeoEval.langCode);
                }

                return result;
            },
            descriptionMatchesRecommendedLength: function () {
                var result = new EvaluatedResult(false, Utils.getTranslatedText("meta-description-is-too-long", SeoEval.langCode));

                if (SeoEval.postData.stats.length.description < 160) {
                    result.matched = true;
                    result.message = Utils.getTranslatedText("the-length-of-description-is-good", SeoEval.langCode);
                }

                return result;
            },
            contentContainsFocusKeyword: function () {
                var result = new EvaluatedResult(false, Utils.getTranslatedText("the-focus-keyword-doesn-t-appear-in-the-content", SeoEval.langCode));

                if (SeoEval.postData.content.indexOf(SeoEval.keyword) > -1) {
                    result.matched = true;
                    result.message = Utils.getTranslatedText("the-focus-keyword-appears-in-the-content", SeoEval.langCode);
                }

                return result;
            },
            contentMatchesRecommendedLength: function () {
                var result = new EvaluatedResult(false, Utils.getTranslatedText("content-is-too-short", SeoEval.langCode));

                if (SeoEval.postData.stats.wordNumber >= 300) {
                    result.matched = true;
                    result.message = Utils.getTranslatedText("the-length-of-content-is-good", SeoEval.langCode);
                }

                return result;
            },
            contentMatchesKeywordDensity: function () {
                var result = new EvaluatedResult(false, Utils.getTranslatedText("the-density-of-focus-keyword-is-too-low", SeoEval.langCode));

                var density = Utils.occurrences(SeoEval.postData.content, SeoEval.keyword) / SeoEval.postData.stats.wordNumber;

                console.log("Density: " + density);

                if (density > 0.005) {
                    result.matched = true;
                    result.message = Utils.getTranslatedText("the-density-of-focus-keyword-is-good", SeoEval.langCode);
                }

                return result;
            }
        }
    }

})(window.document);


var keyword = "keyword";
var title = "More than one focus keyword we should know";
var description = "You could also use this to optimize for two synonyms keyword";
var content = "In Yoast SEO premium we have a new feature which enables you to optimize for more than one focus keyword. You could use this in optimizing for two related keywords, allowing you to rank in Google on different keywords. You could also use this to optimize for two synonyms. Optimizing a post for two or three synonyms simultaneously while still requiring a 1% keyword density as a minimum, would lead to over-optimization and thus angry Pandas. This was one of the reasons to lower our “required” keyword density to 0.5%. We are actually working on some new functionality now, allowing you to treat synonyms and multiple keywords differently in our Content SEO analysis. As that has multiple implications that’ll take a while to get right. In Yoast SEO premium we have a new feature which enables you to optimize for more than one focus keyword. You could use this in optimizing for two related keywords, allowing you to rank in Google on different keywords. You could also use this to optimize for two synonyms. Optimizing a post for two or three synonyms simultaneously while still requiring a 1% keyword density as a minimum, would lead to over-optimization and thus angry Pandas. This was one of the reasons to lower our “required” keyword density to 0.5%. We are actually working on some new functionality now, allowing you to treat synonyms and multiple keywords differently in our Content SEO analysis. As that has multiple implications that’ll take a while to get right. In Yoast SEO premium we have a new feature which enables you to optimize for more than one focus keyword. You could use this in optimizing for two related keywords, allowing you to rank in Google on different keywords. You could also use this to optimize for two synonyms. Optimizing a post for two or three synonyms simultaneously while still requiring a 1% keyword density as a minimum, would lead to over-optimization and thus angry Pandas. This was one of the reasons to lower our “required” keyword density to 0.5%. We are actually working on some new functionality now, allowing you to treat synonyms and multiple keywords differently in our Content SEO analysis. As that has multiple implications that’ll take a while to get right.";

SeoEval.init("en", keyword, title, description, content);

console.log(keyword);
console.log(title);
console.log(description);
console.log(content);
console.log(SeoEval.postData.url);

console.log(SeoEval.rules.urlContainsFocusKeyword());
console.log(SeoEval.rules.titleContainsFocusKeyword());
console.log(SeoEval.rules.titleMatchesRecommendedLength());
console.log(SeoEval.rules.descriptionContainsFocusKeyword());
console.log(SeoEval.rules.descriptionMatchesRecommendedLength());
console.log(SeoEval.rules.contentContainsFocusKeyword());
console.log(SeoEval.rules.contentMatchesRecommendedLength());
console.log(SeoEval.rules.contentMatchesKeywordDensity());