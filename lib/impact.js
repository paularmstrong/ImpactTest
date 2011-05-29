require.paths.push(__dirname + '/../config/');

var fs = require('fs'),
    config = require('config-impact').config,
    HTMLElement = require('fakes/html-element').FakeHTMLElement,
    ig,
    empty = function () {};

global.window = new HTMLElement();
global.document = new HTMLElement();

function _testRequire(file, execute) {
    var resolvedFile = fs.readFileSync(config.root + file.replace(/\./g, '/') + '.js', 'utf8'),
        defined;

    eval(resolvedFile);

    if (execute === false) {
        return;
    }

    defined = ig.modules[file].body;

    if (typeof defined === 'function') {
        try {
            defined();
        } catch (e) {
            throw 'Unable to execute file "' + file + '"';
        }
    }
}

/**
 * Added for browser compatibility
 */

var _keys = function (obj) {
    if (Object.keys) {
        return Object.keys(obj);
    }

    var keys = [],
        k;

    for (k in obj) {
        if (obj.hasOwnProperty(k)) {
            keys.push(k);
        }
    }
    return keys;
};

/**
 * Wraps a test function with setUp and tearDown functions.
 * Used by testCase.
 *
 * @param {Function} setUp
 * @param {Function} tearDown
 * @param {Function} fn
 * @api private
 */

var wrapTest = function (setUp, tearDown, fn) {
    return function (test) {
        var context = {},
            done = test.done;
        if (tearDown) {
            test.done = function (err) {
                try {
                    tearDown.call(context, function (err2) {
                        if (err && err2) {
                            test._assertion_list.push(
                                types.assertion({error: err})
                            );
                            return done(err2);
                        }
                        done(err || err2);
                    });
                } catch (e) {
                    done(e);
                }
            };
        }
        if (setUp) {
            setUp.call(context, function (err) {
                if (err) {
                    return test.done(err);
                }
                fn.call(context, test);
            });
        }
        else {
            fn.call(context, test);
        }
    };
};


/**
 * Wraps a group of tests with setUp and tearDown functions.
 * Used by testCase.
 *
 * @param {Function} setUp
 * @param {Function} tearDown
 * @param {Object} group
 * @api private
 */

var wrapGroup = function (setUp, tearDown, group) {
    var tests = {},
        keys = _keys(group),
        i = 0, l = keys.length,
        k;

    for (i; i < l; i++) {
        k = keys[i];
        if (typeof group[k] === 'function') {
            tests[k] = wrapTest(setUp, tearDown, group[k]);
        } else if (typeof group[k] === 'object') {
            tests[k] = wrapGroup(setUp, tearDown, group[k]);
        }
    }
    return tests;
};

function _setUp(callback) {
    callback();
}

function _tearDown(callback) {
    callback();
}


_testRequire('impact.impact', false);
_testRequire('impact.system');

ig.merge(ig, {
    module: function (name) {
		ig._current = { name: name, requires: [], loaded: true, body: null };
		ig.modules[name] = ig._current;
        return ig;
    },
    requires: function () {
        var i = arguments.length,
            module;

        while (i--) {
            module = arguments[i];
            ig._current.requires.push(module);
            if (!ig.modules.hasOwnProperty(module)) {
                // _testRequire(arguments[i]);
            }
        }

        return ig;
    },
    main: function (id, class, fps, width, height, scale, loader) {
        ig.system = new ig.System(id, fps, width, height, scale);
        ig.ready = true;
    },

    _loadScript: function (name, requiredFrom) {
        console.log(name, requiredFrom);
    },
    _testRequire: _testRequire,

    test: function (test) {
        return wrapTest(_setUp, _tearDown, test);
    },

    testCase: function (tests) {
        var setUp = tests.setUp,
            tearDown = tests.tearDown;

        delete tests.setUp;
        delete tests.tearDown;

        return wrapGroup(_setUp, tearDown, wrapGroup(setUp, _tearDown, tests));
    }
});

_testRequire('impact.timer');
_testRequire('impact.map');
_testRequire('impact.collision-map');
_testRequire('impact.background-map');
_testRequire('impact.image');
_testRequire('impact.font');
_testRequire('impact.game');
_testRequire('impact.entity');
_testRequire('impact.animation');

exports.ig = ig;