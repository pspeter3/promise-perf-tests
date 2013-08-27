# Promise implementation performance tests

This is a set of *basic* performance tests for promise implementations.  As is almost always the case, take these with the usual grains of salt.  That said, they should give a reasonable ballpark comparison of the performance characteristics of common, basic operations that most promise libraries provide.

Of course, performance is not the only thing to consider in a promise library.  Interoperability via a proposed standard, such as Promises/A, API convenience, safety, and even code size (for browser applications) are all important, application-specific considerations.

## Running the tests

Right now, the tests are runnable en masse via `npm test` in unix-like environments, and individually via node in other envs.

### Setup

1. Clone the repo
1. `npm install` to install the promise implementations to be tested
1. Run tests:
    * Run all tests: `npm test`
    * Run a single test with node: `node <test>`

# Implementation-specific notes

## when.js

[when.js](https://github.com/cujojs/when) uses synchronous resolutions, and no longer uses `Object.freeze()` as of v1.6.0, to avoid this unfortunate [v8-imposed performance penalty](http://stackoverflow.com/questions/8435080/any-performance-benefit-to-locking-down-javascript-objects).

## avow

[avow](https://github.com/briancavalier/avow) is an example [Promises/A+](http://promises-aplus.github.com/promises-spec/) implementation.  In its default configuration, it uses asynchronous resolutions and does not call `Object.freeze`.  However, it can be configured to use synchronous resolutions, and/or `Object.freeze`.  Performance tests are run using the default configuration.

## Q

[Q](https://github.com/kriskowal/q) uses asynchronous resolutions, and calls `Object.freeze` on its promises, and so it incurs the [v8-imposed performance penalty](http://stackoverflow.com/questions/8435080/any-performance-benefit-to-locking-down-javascript-objects).

## RSVP

[RSVP](https://github.com/tildeio/rsvp.js) uses asynchronous resolutions, and doesn't use `Object.freeze`.

**Removed because couldn't be made to work**

## deferred

[deferred](https://github.com/medikoo/deferred) uses synchronous resolutions, and doesn't use `Object.freeze`.

## laissez-faire

[lassez-faire](https://github.com/jkroso/Laissez-faire) uses synchronous resolutions, and doesn't use `Object.freeze`.

## jQuery Deferred

[jQuery](http://jquery.com) uses synchronous resolutions, and it doesn't use `Object.freeze`.

## Concurrent

[concurrent](http://github.com/pspeter3/concurrent) uses asynchronous resolutions, and doesn't use `Object.freeze`.

These tests use jQuery via [jquery-browserify](https://github.com/jmars/jquery-browserify), with [jsdom](https://github.com/tmpvar/jsdom) for support.  This approach was taken from the [Promises Test Suite](https://github.com/domenic/promise-tests), and currently, appears to be the only way to use jQuery 1.8.x in node.

jQuery Deferred is not intended to be fully Promises/A compliant in its forwarding behavior.  We've done our best to design the tests so that that does not affect the performance characteristics.  While this *does* affect the *computation results* of some tests, it can be ignored for most performance testing purposes.

# Test Environment

These tests were run on a MacBook Air Intel Core i7, 1.8Ghz, 4g RAM, 256g SSD, using Node.js v0.10.5 and the following library versions (`npm ls`):

```text
├── avow@2.0.1
├── concurrent@0.0.8
├─┬ deferred@0.6.5
│ ├── es5-ext@0.9.2
│ ├── event-emitter@0.2.2
│ └── next-tick@0.1.0
├── jquery-browserify@1.8.1
├─┬ jsdom@0.8.4
│ ├─┬ contextify@0.1.6
│ │ └── bindings@1.1.1
│ ├── cssom@0.2.5
│ ├── cssstyle@0.2.3
│ ├─┬ htmlparser2@3.2.3
│ │ ├── domelementtype@1.1.1
│ │ ├── domhandler@2.0.3
│ │ ├── domutils@1.1.2
│ │ └── readable-stream@1.0.17
│ ├── nwmatcher@1.3.1
│ ├─┬ request@2.27.0
│ │ ├── aws-sign@0.3.0
│ │ ├── cookie-jar@0.3.0
│ │ ├── forever-agent@0.5.0
│ │ ├─┬ form-data@0.1.1
│ │ │ ├── async@0.2.9
│ │ │ └─┬ combined-stream@0.0.4
│ │ │   └── delayed-stream@0.0.5
│ │ ├─┬ hawk@1.0.0
│ │ │ ├── boom@0.4.2
│ │ │ ├── cryptiles@0.2.2
│ │ │ ├── hoek@0.9.1
│ │ │ └── sntp@0.2.4
│ │ ├─┬ http-signature@0.10.0
│ │ │ ├── asn1@0.1.11
│ │ │ ├── assert-plus@0.1.2
│ │ │ └── ctype@0.5.2
│ │ ├── json-stringify-safe@5.0.0
│ │ ├── mime@1.2.11
│ │ ├── node-uuid@1.4.1
│ │ ├── oauth-sign@0.3.0
│ │ ├── qs@0.6.5
│ │ └── tunnel-agent@0.3.0
│ └── xmlhttprequest@1.6.0
├─┬ laissez-faire@0.12.4
│ └── next-tick@0.0.1
├── q@0.9.6
├── rsvp@2.0.2
└── when@2.3.0
```

# Test Results

Each test is sorted from best to worst time. Times are in milliseconds, and Diff is the percentage difference from the best time (computed via `((current - best) / best) * 100)`).

```text
==========================================================
Test: promise-fulfill x 10000
----------------------------------------------------------
Name      Time ms   Avg ms   Diff %
laissez           3   0.0003        -
concurrent       14   0.0014   366.67
deferred         19   0.0019   533.33
when             36   0.0036  1100.00
q                57   0.0057  1800.00
avow             75   0.0075  2400.00
jquery          336   0.0336 11100.00

==========================================================
Test: promise-reject x 10000
----------------------------------------------------------
Name      Time ms   Avg ms   Diff %
concurrent        6   0.0006        -
avow             55   0.0055   816.67
q                60   0.0060   900.00
when             89   0.0089  1383.33
laissez         118   0.0118  1866.67
deferred        157   0.0157  2516.67
jquery          328   0.0328  5366.67

==========================================================
Test: promise-sequence x 10000
----------------------------------------------------------
Name      Time ms   Avg ms   Diff %
laissez           8   0.0008        -
when            204   0.0204  2450.00
concurrent      207   0.0207  2487.50
avow            335   0.0335  4087.50
deferred        421   0.0421  5162.50
q               426   0.0426  5225.00
jquery         1167   0.1167 14487.50

==========================================================
Test: defer-create x 10000
----------------------------------------------------------
Name      Time ms   Avg ms   Diff %
laissez           1   0.0001        -
concurrent        1   0.0001        -
avow             23   0.0023  2200.00
when             36   0.0036  3500.00
q                47   0.0047  4600.00
deferred        106   0.0106 10500.00
jquery          365   0.0365 36400.00

==========================================================
Test: defer-fulfill x 10000
----------------------------------------------------------
Name      Time ms   Avg ms   Diff %
laissez          21   0.0021        -
concurrent       62   0.0062   195.24
when            103   0.0103   390.48
avow            142   0.0142   576.19
deferred        424   0.0424  1919.05
q               441   0.0441  2000.00
jquery          711   0.0711  3285.71

==========================================================
Test: defer-reject x 10000
----------------------------------------------------------
Name      Time ms   Avg ms   Diff %
avow             50   0.0050        -
concurrent       80   0.0080    60.00
when            160   0.0160   220.00
laissez         240   0.0240   380.00
q               378   0.0378   656.00
deferred        643   0.0643  1186.00
jquery          782   0.0782  1464.00

==========================================================
Test: defer-sequence x 10000
----------------------------------------------------------
Name      Time ms   Avg ms   Diff %
laissez           7   0.0007        -
concurrent      176   0.0176  2414.29
when            209   0.0209  2885.71
deferred        271   0.0271  3771.43
avow            352   0.0352  4928.57
q               465   0.0465  6542.86
jquery          774   0.0774 10957.14

==========================================================
Test: map x 10000
----------------------------------------------------------
Name      Time ms   Avg ms   Diff %
deferred         39   0.0039        -
concurrent      103   0.0103   164.10
when            385   0.0385   887.18

==========================================================
Test: reduce-small x 609
NOTE: in node v0.8.14, deferred.reduce causes a
stack overflow for an array length >= 610
----------------------------------------------------------
Name      Time ms   Avg ms   Diff %
concurrent       18   0.0296        -
when             29   0.0476    61.11

==========================================================
Test: reduce-large x 10000
NOTE: in node v0.8.14, deferred.reduce causes a
stack overflow for an array length >= 610
----------------------------------------------------------
Name      Time ms   Avg ms   Diff %
concurrent      371   0.0371        -
when            502   0.0502    35.31
```

