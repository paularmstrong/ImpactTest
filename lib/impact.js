var fs = require('fs'),
    HTMLElement = require('fakes/html-element').FakeHTMLElement,
    FakeImage = require('fakes/image').FakeImage,
    FakeAudio = require('fakes/audio').FakeAudio,
    ig,
    empty = function () {};

global.Image = FakeImage;
global.window = new HTMLElement();
global.document = new HTMLElement();
global.Audio = FakeAudio;

function _testRequire(file, execute) {
    var resolvedFile = fs.readFileSync(config.impactRoot + file.replace(/\./g, '/') + '.js', 'utf8'),
        defined, requires, i;

    eval(resolvedFile);

    requires = ig.modules[file].requires;
    i = requires.length;

    while (i--) {
        if (!ig.modules.hasOwnProperty(requires[i])) {
            _testRequire(requires[i]);
        }
    }

    if (execute === false) {
        return;
    }

    defined = ig.modules[file].body;

    if (typeof defined === 'function') {
        try {
            defined();
        } catch (e) {
            throw 'Unable to execute file "' + file + '" with message "' + e.message + '"';
        }
    }
}

// Pulled from nodeunit
function wrapTest(setUp, tearDown, fn) {
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
}

// Pulled from nodeunit
function wrapGroup(setUp, tearDown, group) {
    var tests = {},
        keys = Object.keys(group),
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
}

function _setUp(callback) {
    ig.ready = true;
    ig.game = new ig.Game();
    ig.system = new ig.System('#foo', 60, 1, 1, 1);
    ig.system.canvas = new HTMLElement('canvas');
    ig.input = new ig.Input();
    ig.soundManager = new ig.SoundManager();
    ig.music = new ig.Music();

    // load all pending resources
	for (var i = 0; i < ig.resources.length; i++) {
		ig.resources[i].load();
	}

    callback();
}

function _tearDown(callback) {
    delete ig.game;
    delete ig.input;
    delete ig.system;
    delete ig.soundManager;
    ig.ready = false;

    callback();
}

_testRequire('impact.impact', false);
_testRequire('impact.system');

ig.merge(ig, {
    ready: false,
    module: function (name) {
		ig._current = { name: name, requires: [], loaded: true, body: null };
		ig.modules[name] = ig._current;
        return ig;
    },
    requires: function () {
        var i = arguments.length;

        while (i--) {
            ig._current.requires.push(arguments[i]);
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

    _testKeydown: function (keyCode) {
        var event = {
            target: { type: 'keydown' },
            type: 'keydown',
            keyCode: keyCode,
            preventDefault: empty,
            stopPropagation: empty
        };
        ig.input.keydown(event);
    },

    _testKeyup: function (keyCode) {
        var event = {
            target: { type: 'keyup' },
            type: 'keyup',
            keyCode: keyCode,
            preventDefault: empty,
            stopPropagation: empty
        };
        ig.input.keyup(event);
        ig.input.clearPressed();
    },

    _testMousedown: function (key, position) {
        var event = {
            target: { type: 'touchstart' },
            type: 'touchstart',
            button: key,
            pageX: position.x,
            pageY: position.y,
            touches: [{
                clientX: position.x,
                clientY: position.y
            }],
            preventDefault: empty,
            stopPropagation: empty
        };

        ig.input.keydown(event);
    },

    _testMouseup: function (key) {
        var event = {
            target: { type: 'touchend' },
            type: 'touchend',
            button: key,
            touches: [],
            preventDefault: empty,
            stopPropagation: empty
        };

        ig.input.keyup(event);
        ig.input.clearPressed();
    },

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
_testRequire('impact.input');
_testRequire('impact.map');
_testRequire('impact.collision-map');
_testRequire('impact.background-map');
_testRequire('impact.image');
_testRequire('impact.animation');
_testRequire('impact.font');
_testRequire('impact.sound');
_testRequire('impact.game');
ig.Game = ig.Game.extend({
    loadLevel: empty
});
_testRequire('impact.entity');

exports.ig = ig;
