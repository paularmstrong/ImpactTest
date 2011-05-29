FakeHTMLElement = function () {
    return this;
};
FakeHTMLElement.prototype = {
    _listeners: {},
    _children: [],
    location: {
        href: ''
    },
    screen: {
        availWidth: 0,
        availHeight: 0
    },
    addEventListener: function (event, callback) {
        this._listeners[event] = callback;
    },
    createElement: function (name) {
        return new FakeHTMLElement(name);
    },
    appendChild: function (child) {
        // this._children.push(child);
    },
    getElementById: function (id) {
        return new FakeHTMLElement(id);
    },
    getElementsByTagName: function (tag) {
        return [new FakeHTMLElement(tag)];
    },

    // canvas specific
    getContext: function (dimension) {
        return 'foo';
    }
};

global.navigator = {
    userAgent: 'Impact Test Runner'
};

exports.FakeHTMLElement = FakeHTMLElement;