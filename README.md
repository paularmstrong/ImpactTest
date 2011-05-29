# ImpactTest

ImpactTest is a wrapper for [Nodeunit](https://github.com/caolan/nodeunit), providing a system for building unit tests in Node.js for your [Impact.js](http://impactjs.com) game.

## Usage

### Basic Tests

Here is an example test file:

    var ig = require('impact').ig;

    ig._testRequire('game.main');

    exports['test something'] = ig.test(function (test) {
        test.ok(true, 'this assertion will pass');
        test.done();
    });

    exports['test another thing'] = ig.test(function (test) {
        test.ok(false, 'this assertion will fail');
        test.done();
    });

### Groups, SetUp, and TearDown

Using `ig.testCase` will allow you to specify custom setUp and tearDown methods that will be run before and after each test case in the group.

    var ig = require('impact').ig;

    ig._testRequire('game.main');

    exports.MyGame = ig.testCase({
        setUp: function (callback) {
            this.foo = 'bar';
            callback();
        },

        tearDown: function (callback) {
            // do any cleanup here
            callback();
        },

        'my test': function (test) {
            test.equals(this.foo, 'bar');
            test.done();
        }
    });

### Assertions

For help writing tests and assertions, check the [Nodeunit README](https://github.com/caolan/nodeunit/blob/master/README.md).
