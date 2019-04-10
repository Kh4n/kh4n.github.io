//This is an automatically generated file. For more info, visit https://github.com/Kh4n/SAP_parser

parser = (function() {
  "use strict";

  function peg$subclass(child, parent) {
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function peg$SyntaxError(message, expected, found, location) {
    this.message  = message;
    this.expected = expected;
    this.found    = found;
    this.location = location;
    this.name     = "SyntaxError";

    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, peg$SyntaxError);
    }
  }

  peg$subclass(peg$SyntaxError, Error);

  peg$SyntaxError.buildMessage = function(expected, found) {
    var DESCRIBE_EXPECTATION_FNS = {
          literal: function(expectation) {
            return "\"" + literalEscape(expectation.text) + "\"";
          },

          "class": function(expectation) {
            var escapedParts = "",
                i;

            for (i = 0; i < expectation.parts.length; i++) {
              escapedParts += expectation.parts[i] instanceof Array
                ? classEscape(expectation.parts[i][0]) + "-" + classEscape(expectation.parts[i][1])
                : classEscape(expectation.parts[i]);
            }

            return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
          },

          any: function(expectation) {
            return "any character";
          },

          end: function(expectation) {
            return "end of input";
          },

          other: function(expectation) {
            return expectation.description;
          }
        };

    function hex(ch) {
      return ch.charCodeAt(0).toString(16).toUpperCase();
    }

    function literalEscape(s) {
      return s
        .replace(/\\/g, '\\\\')
        .replace(/"/g,  '\\"')
        .replace(/\0/g, '\\0')
        .replace(/\t/g, '\\t')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/[\x00-\x0F]/g,          function(ch) { return '\\x0' + hex(ch); })
        .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return '\\x'  + hex(ch); });
    }

    function classEscape(s) {
      return s
        .replace(/\\/g, '\\\\')
        .replace(/\]/g, '\\]')
        .replace(/\^/g, '\\^')
        .replace(/-/g,  '\\-')
        .replace(/\0/g, '\\0')
        .replace(/\t/g, '\\t')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/[\x00-\x0F]/g,          function(ch) { return '\\x0' + hex(ch); })
        .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return '\\x'  + hex(ch); });
    }

    function describeExpectation(expectation) {
      return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
    }

    function describeExpected(expected) {
      var descriptions = new Array(expected.length),
          i, j;

      for (i = 0; i < expected.length; i++) {
        descriptions[i] = describeExpectation(expected[i]);
      }

      descriptions.sort();

      if (descriptions.length > 0) {
        for (i = 1, j = 1; i < descriptions.length; i++) {
          if (descriptions[i - 1] !== descriptions[i]) {
            descriptions[j] = descriptions[i];
            j++;
          }
        }
        descriptions.length = j;
      }

      switch (descriptions.length) {
        case 1:
          return descriptions[0];

        case 2:
          return descriptions[0] + " or " + descriptions[1];

        default:
          return descriptions.slice(0, -1).join(", ")
            + ", or "
            + descriptions[descriptions.length - 1];
      }
    }

    function describeFound(found) {
      return found ? "\"" + literalEscape(found) + "\"" : "end of input";
    }

    return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
  };

  function peg$parse(input, options) {
    options = options !== void 0 ? options : {};

    var peg$FAILED = {},

        peg$startRuleFunctions = { start: peg$parsestart },
        peg$startRuleFunction  = peg$parsestart,

        peg$c0 = function(d, is) {return d + is.join('');},
        peg$c1 = "/",
        peg$c2 = peg$literalExpectation("/", false),
        peg$c3 = function(p, pr) {return pr;},
        peg$c4 = function(p, ps) {
              if (ps.length == 0)
                return p;
              return `@DIV{${p};${ps.join('')}}`;
            },
        peg$c5 = "^",
        peg$c6 = peg$literalExpectation("^", false),
        peg$c7 = function(p, ps) {
              if (ps.length == 0)
                return p;
              return `${p}@Sup{${ps.join('')}}`;
            },
        peg$c8 = function(i, d) {return i + d;},
        peg$c9 = "(",
        peg$c10 = peg$literalExpectation("(", false),
        peg$c11 = ")",
        peg$c12 = peg$literalExpectation(")", false),
        peg$c13 = function(e) {return '(' + e + ')';},
        peg$c14 = function(p, e) {return p + '(' + e + ')';},
        peg$c15 = function(p, i, e) {return `${p}@Sup{${i}}(${e})`;},
        peg$c16 = "!",
        peg$c17 = peg$literalExpectation("!", false),
        peg$c18 = function(n) {return n + '!'},
        peg$c19 = "-",
        peg$c20 = peg$literalExpectation("-", false),
        peg$c21 = /^[0-9]/,
        peg$c22 = peg$classExpectation([["0", "9"]], false, false),
        peg$c23 = ".",
        peg$c24 = peg$literalExpectation(".", false),
        peg$c25 = function(s, dec, ifrac) {return '.' + ifrac.join('');},
        peg$c26 = function(s, dec, frac) {return (s||'') + dec.join('') + (frac||'');},
        peg$c27 = /^[*+\-]/,
        peg$c28 = peg$classExpectation(["*", "+", "-"], false, false),
        peg$c29 = "=",
        peg$c30 = peg$literalExpectation("=", false),
        peg$c31 = "<=",
        peg$c32 = peg$literalExpectation("<=", false),
        peg$c33 = function() {return "&le;";},
        peg$c34 = ">=",
        peg$c35 = peg$literalExpectation(">=", false),
        peg$c36 = function() {return "&ge;";},
        peg$c37 = "sqrt",
        peg$c38 = peg$literalExpectation("sqrt", false),
        peg$c39 = function() {return "@RT";},
        peg$c40 = "log",
        peg$c41 = peg$literalExpectation("log", false),
        peg$c42 = "ln",
        peg$c43 = peg$literalExpectation("ln", false),
        peg$c44 = "sin",
        peg$c45 = peg$literalExpectation("sin", false),
        peg$c46 = "cos",
        peg$c47 = peg$literalExpectation("cos", false),
        peg$c48 = "tan",
        peg$c49 = peg$literalExpectation("tan", false),
        peg$c50 = "csc",
        peg$c51 = peg$literalExpectation("csc", false),
        peg$c52 = "sec",
        peg$c53 = peg$literalExpectation("sec", false),
        peg$c54 = "cot",
        peg$c55 = peg$literalExpectation("cot", false),
        peg$c56 = "arcsin",
        peg$c57 = peg$literalExpectation("arcsin", false),
        peg$c58 = "arccos",
        peg$c59 = peg$literalExpectation("arccos", false),
        peg$c60 = "arctan",
        peg$c61 = peg$literalExpectation("arctan", false),
        peg$c62 = "arccsc",
        peg$c63 = peg$literalExpectation("arccsc", false),
        peg$c64 = "arcsec",
        peg$c65 = peg$literalExpectation("arcsec", false),
        peg$c66 = "arccot",
        peg$c67 = peg$literalExpectation("arccot", false),
        peg$c68 = "pi",
        peg$c69 = peg$literalExpectation("pi", true),
        peg$c70 = "\u03C0",
        peg$c71 = peg$literalExpectation("\u03C0", false),
        peg$c72 = function() {return "&pi;";},
        peg$c73 = /^[a-z]/,
        peg$c74 = peg$classExpectation([["a", "z"]], false, false),
        peg$c75 = /^[A-Z]/,
        peg$c76 = peg$classExpectation([["A", "Z"]], false, false),
        peg$c77 = "\u03B8",
        peg$c78 = peg$literalExpectation("\u03B8", false),
        peg$c79 = function() {return "&theta;";},

        peg$currPos          = 0,
        peg$savedPos         = 0,
        peg$posDetailsCache  = [{ line: 1, column: 1 }],
        peg$maxFailPos       = 0,
        peg$maxFailExpected  = [],
        peg$silentFails      = 0,

        peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function text() {
      return input.substring(peg$savedPos, peg$currPos);
    }

    function location() {
      return peg$computeLocation(peg$savedPos, peg$currPos);
    }

    function expected(description, location) {
      location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos)

      throw peg$buildStructuredError(
        [peg$otherExpectation(description)],
        input.substring(peg$savedPos, peg$currPos),
        location
      );
    }

    function error(message, location) {
      location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos)

      throw peg$buildSimpleError(message, location);
    }

    function peg$literalExpectation(text, ignoreCase) {
      return { type: "literal", text: text, ignoreCase: ignoreCase };
    }

    function peg$classExpectation(parts, inverted, ignoreCase) {
      return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
    }

    function peg$anyExpectation() {
      return { type: "any" };
    }

    function peg$endExpectation() {
      return { type: "end" };
    }

    function peg$otherExpectation(description) {
      return { type: "other", description: description };
    }

    function peg$computePosDetails(pos) {
      var details = peg$posDetailsCache[pos], p;

      if (details) {
        return details;
      } else {
        p = pos - 1;
        while (!peg$posDetailsCache[p]) {
          p--;
        }

        details = peg$posDetailsCache[p];
        details = {
          line:   details.line,
          column: details.column
        };

        while (p < pos) {
          if (input.charCodeAt(p) === 10) {
            details.line++;
            details.column = 1;
          } else {
            details.column++;
          }

          p++;
        }

        peg$posDetailsCache[pos] = details;
        return details;
      }
    }

    function peg$computeLocation(startPos, endPos) {
      var startPosDetails = peg$computePosDetails(startPos),
          endPosDetails   = peg$computePosDetails(endPos);

      return {
        start: {
          offset: startPos,
          line:   startPosDetails.line,
          column: startPosDetails.column
        },
        end: {
          offset: endPos,
          line:   endPosDetails.line,
          column: endPosDetails.column
        }
      };
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) { return; }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildSimpleError(message, location) {
      return new peg$SyntaxError(message, null, null, location);
    }

    function peg$buildStructuredError(expected, found, location) {
      return new peg$SyntaxError(
        peg$SyntaxError.buildMessage(expected, found),
        expected,
        found,
        location
      );
    }

    function peg$parsestart() {
      var s0;

      s0 = peg$parseexpr();

      return s0;
    }

    function peg$parseexpr() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parsedivexpr();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parseinfixopexpr();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parseinfixopexpr();
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c0(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsedivexpr() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parseexpon();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 47) {
          s4 = peg$c1;
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c2); }
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parsedivexpr();
          if (s5 === peg$FAILED) {
            s5 = peg$parseexpon();
          }
          if (s5 !== peg$FAILED) {
            peg$savedPos = s3;
            s4 = peg$c3(s1, s5);
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 47) {
            s4 = peg$c1;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c2); }
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsedivexpr();
            if (s5 === peg$FAILED) {
              s5 = peg$parseexpon();
            }
            if (s5 !== peg$FAILED) {
              peg$savedPos = s3;
              s4 = peg$c3(s1, s5);
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c4(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseexpon() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parseprimary();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 94) {
          s4 = peg$c5;
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c6); }
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parseexpon();
          if (s5 === peg$FAILED) {
            s5 = peg$parseprimary();
          }
          if (s5 !== peg$FAILED) {
            peg$savedPos = s3;
            s4 = peg$c3(s1, s5);
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 94) {
            s4 = peg$c5;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c6); }
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parseexpon();
            if (s5 === peg$FAILED) {
              s5 = peg$parseprimary();
            }
            if (s5 !== peg$FAILED) {
              peg$savedPos = s3;
              s4 = peg$c3(s1, s5);
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c7(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseinfixopexpr() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parseinfixop();
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parseinfixop();
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsedivexpr();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c8(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseprimary() {
      var s0;

      s0 = peg$parsepostfixop();
      if (s0 === peg$FAILED) {
        s0 = peg$parseparenexpr();
        if (s0 === peg$FAILED) {
          s0 = peg$parseprefixopexpr();
          if (s0 === peg$FAILED) {
            s0 = peg$parseconstant();
            if (s0 === peg$FAILED) {
              s0 = peg$parseinteger();
              if (s0 === peg$FAILED) {
                s0 = peg$parsevariable();
              }
            }
          }
        }
      }

      return s0;
    }

    function peg$parseparenexpr() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 40) {
        s1 = peg$c9;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c10); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseexpr();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 41) {
            s3 = peg$c11;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c12); }
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c13(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseprefixopexpr() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      s1 = peg$parseprefixop();
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 40) {
          s2 = peg$c9;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c10); }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseexpr();
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 41) {
              s4 = peg$c11;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c12); }
            }
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c14(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parseprefixop();
        if (s1 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 94) {
            s2 = peg$c5;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c6); }
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parseinteger();
            if (s3 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 40) {
                s4 = peg$c9;
                peg$currPos++;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c10); }
              }
              if (s4 !== peg$FAILED) {
                s5 = peg$parseexpr();
                if (s5 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s6 = peg$c11;
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c12); }
                  }
                  if (s6 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c15(s1, s3, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      }

      return s0;
    }

    function peg$parsepostfixop() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parseprefixopexpr();
      if (s1 === peg$FAILED) {
        s1 = peg$parseparenexpr();
        if (s1 === peg$FAILED) {
          s1 = peg$parseconstant();
          if (s1 === peg$FAILED) {
            s1 = peg$parseinteger();
            if (s1 === peg$FAILED) {
              s1 = peg$parsevariable();
            }
          }
        }
      }
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 33) {
          s2 = peg$c16;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c17); }
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c18(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseinteger() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 45) {
        s1 = peg$c19;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c20); }
      }
      if (s1 === peg$FAILED) {
        s1 = null;
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (peg$c21.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c22); }
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            if (peg$c21.test(input.charAt(peg$currPos))) {
              s3 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c22); }
            }
          }
        } else {
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 46) {
            s4 = peg$c23;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c24); }
          }
          if (s4 !== peg$FAILED) {
            s5 = [];
            if (peg$c21.test(input.charAt(peg$currPos))) {
              s6 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s6 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c22); }
            }
            if (s6 !== peg$FAILED) {
              while (s6 !== peg$FAILED) {
                s5.push(s6);
                if (peg$c21.test(input.charAt(peg$currPos))) {
                  s6 = input.charAt(peg$currPos);
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c22); }
                }
              }
            } else {
              s5 = peg$FAILED;
            }
            if (s5 !== peg$FAILED) {
              peg$savedPos = s3;
              s4 = peg$c25(s1, s2, s5);
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c26(s1, s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseinfixop() {
      var s0, s1;

      if (peg$c27.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c28); }
      }
      if (s0 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 61) {
          s0 = peg$c29;
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c30); }
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 2) === peg$c31) {
            s1 = peg$c31;
            peg$currPos += 2;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c32); }
          }
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c33();
          }
          s0 = s1;
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c34) {
              s1 = peg$c34;
              peg$currPos += 2;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c35); }
            }
            if (s1 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c36();
            }
            s0 = s1;
          }
        }
      }

      return s0;
    }

    function peg$parseprefixop() {
      var s0, s1;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 4) === peg$c37) {
        s1 = peg$c37;
        peg$currPos += 4;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c38); }
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c39();
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        if (input.substr(peg$currPos, 3) === peg$c40) {
          s0 = peg$c40;
          peg$currPos += 3;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c41); }
        }
        if (s0 === peg$FAILED) {
          if (input.substr(peg$currPos, 2) === peg$c42) {
            s0 = peg$c42;
            peg$currPos += 2;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c43); }
          }
          if (s0 === peg$FAILED) {
            if (input.substr(peg$currPos, 3) === peg$c44) {
              s0 = peg$c44;
              peg$currPos += 3;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c45); }
            }
            if (s0 === peg$FAILED) {
              if (input.substr(peg$currPos, 3) === peg$c46) {
                s0 = peg$c46;
                peg$currPos += 3;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c47); }
              }
              if (s0 === peg$FAILED) {
                if (input.substr(peg$currPos, 3) === peg$c48) {
                  s0 = peg$c48;
                  peg$currPos += 3;
                } else {
                  s0 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c49); }
                }
                if (s0 === peg$FAILED) {
                  if (input.substr(peg$currPos, 3) === peg$c50) {
                    s0 = peg$c50;
                    peg$currPos += 3;
                  } else {
                    s0 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c51); }
                  }
                  if (s0 === peg$FAILED) {
                    if (input.substr(peg$currPos, 3) === peg$c52) {
                      s0 = peg$c52;
                      peg$currPos += 3;
                    } else {
                      s0 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c53); }
                    }
                    if (s0 === peg$FAILED) {
                      if (input.substr(peg$currPos, 3) === peg$c54) {
                        s0 = peg$c54;
                        peg$currPos += 3;
                      } else {
                        s0 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c55); }
                      }
                      if (s0 === peg$FAILED) {
                        if (input.substr(peg$currPos, 6) === peg$c56) {
                          s0 = peg$c56;
                          peg$currPos += 6;
                        } else {
                          s0 = peg$FAILED;
                          if (peg$silentFails === 0) { peg$fail(peg$c57); }
                        }
                        if (s0 === peg$FAILED) {
                          if (input.substr(peg$currPos, 6) === peg$c58) {
                            s0 = peg$c58;
                            peg$currPos += 6;
                          } else {
                            s0 = peg$FAILED;
                            if (peg$silentFails === 0) { peg$fail(peg$c59); }
                          }
                          if (s0 === peg$FAILED) {
                            if (input.substr(peg$currPos, 6) === peg$c60) {
                              s0 = peg$c60;
                              peg$currPos += 6;
                            } else {
                              s0 = peg$FAILED;
                              if (peg$silentFails === 0) { peg$fail(peg$c61); }
                            }
                            if (s0 === peg$FAILED) {
                              if (input.substr(peg$currPos, 6) === peg$c62) {
                                s0 = peg$c62;
                                peg$currPos += 6;
                              } else {
                                s0 = peg$FAILED;
                                if (peg$silentFails === 0) { peg$fail(peg$c63); }
                              }
                              if (s0 === peg$FAILED) {
                                if (input.substr(peg$currPos, 6) === peg$c64) {
                                  s0 = peg$c64;
                                  peg$currPos += 6;
                                } else {
                                  s0 = peg$FAILED;
                                  if (peg$silentFails === 0) { peg$fail(peg$c65); }
                                }
                                if (s0 === peg$FAILED) {
                                  if (input.substr(peg$currPos, 6) === peg$c66) {
                                    s0 = peg$c66;
                                    peg$currPos += 6;
                                  } else {
                                    s0 = peg$FAILED;
                                    if (peg$silentFails === 0) { peg$fail(peg$c67); }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      return s0;
    }

    function peg$parseconstant() {
      var s0, s1;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2).toLowerCase() === peg$c68) {
        s1 = input.substr(peg$currPos, 2);
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c69); }
      }
      if (s1 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 960) {
          s1 = peg$c70;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c71); }
        }
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c72();
      }
      s0 = s1;

      return s0;
    }

    function peg$parsevariable() {
      var s0, s1;

      if (peg$c73.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c74); }
      }
      if (s0 === peg$FAILED) {
        if (peg$c75.test(input.charAt(peg$currPos))) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c76); }
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 952) {
            s1 = peg$c77;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c78); }
          }
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c79();
          }
          s0 = s1;
        }
      }

      return s0;
    }

    peg$result = peg$startRuleFunction();

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail(peg$endExpectation());
      }

      throw peg$buildStructuredError(
        peg$maxFailExpected,
        peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
        peg$maxFailPos < input.length
          ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
          : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
      );
    }
  }

  return {
    SyntaxError: peg$SyntaxError,
    parse:       peg$parse
  };
})();
