(function (document) {
    var Q = function (selector) {
        return new Library(selector);
    }

    var Library = function (selector) {
        var elements = document.querySelectorAll(selector);

        this.length = elements.length;
        this.credit = {
            version: "0.0.1",
            author: ".||."
        };

        for (var i = 0; i < this.length; i++) {
            this[i] = elements[i];
        }

        return this;
    }

    Q.fn = Library.prototype =
        {
            hide: function () {
                var len = this.length;
                while (len--) {
                    this[len].style.display = 'none';
                }
                return this;
            },
            show: function () {
                var len = this.length;
                while (len--) {
                    this[len].style.display = 'block';
                }
                return this;
            },
            addClass: function (className) {
                var len = this.length;
                while (len--) {
                    this[len].className += " " + className;
                }
            },
            removeClass: function (className) {
                var len = this.length;
                while (len--) {
                    var regex = new RegExp('(\\s|^)' + className + '(\\s|$)');
                    this.instance.className.replace(regex, '');
                }
            }
        };

    if (!window.Q) {
        window.Q = Q;
    }

})(window.document);



var ZooUtil = ZooUtil || {
    createElement: function (name, attrs) {
        var el = document.createElement(name);
        for (var name in attrs) {
            var value = attrs[name];
            el.setAttribute(name, value);
        }
        return el;
    }
}