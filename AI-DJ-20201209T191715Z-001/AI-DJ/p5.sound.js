/** [p5.sound]  Version: 0.3.12 - 2020-01-06 */ ! function(n) {
    var i = {};

    function o(t) {
        if (i[t]) return i[t].exports;
        var e = i[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return n[t].call(e.exports, e, e.exports, o), e.l = !0, e.exports
    }
    o.m = n, o.c = i, o.d = function(t, e, n) {
        o.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: n
        })
    }, o.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, o.t = function(e, t) {
        if (1 & t && (e = o(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (o.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var i in e) o.d(n, i, function(t) {
                return e[t]
            }.bind(null, i));
        return n
    }, o.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        } : function() {
            return t
        };
        return o.d(e, "a", e), e
    }, o.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, o.p = "", o(o.s = 31)
}([function(t, e, n) {
    var i;
    void 0 === (i = function() {
        "use strict";

        function c(t, e) {
            this.isUndef(t) || 1 === t ? this.input = this.context.createGain() : 1 < t && (this.input = new Array(t)), this.isUndef(e) || 1 === e ? this.output = this.context.createGain() : 1 < e && (this.output = new Array(t))
        }
        var e;
        return c.prototype.set = function(t, e, n) {
            if (this.isObject(t)) n = e;
            else if (this.isString(t)) {
                var i = {};
                i[t] = e, t = i
            }
            t: for (var o in t) {
                e = t[o];
                var r = this;
                if (-1 !== o.indexOf(".")) {
                    for (var s = o.split("."), a = 0; a < s.length - 1; a++)
                        if ((r = r[s[a]]) instanceof c) {
                            s.splice(0, a + 1);
                            var u = s.join(".");
                            r.set(u, e);
                            continue t
                        } o = s[s.length - 1]
                }
                var p = r[o];
                this.isUndef(p) || (c.Signal && p instanceof c.Signal || c.Param && p instanceof c.Param ? p.value !== e && (this.isUndef(n) ? p.value = e : p.rampTo(e, n)) : p instanceof AudioParam ? p.value !== e && (p.value = e) : p instanceof c ? p.set(e) : p !== e && (r[o] = e))
            }
            return this
        }, c.prototype.get = function(t) {
            this.isUndef(t) ? t = this._collectDefaults(this.constructor) : this.isString(t) && (t = [t]);
            for (var e = {}, n = 0; n < t.length; n++) {
                var i = t[n],
                    o = this,
                    r = e;
                if (-1 !== i.indexOf(".")) {
                    for (var s = i.split("."), a = 0; a < s.length - 1; a++) {
                        var u = s[a];
                        r[u] = r[u] || {}, r = r[u], o = o[u]
                    }
                    i = s[s.length - 1]
                }
                var p = o[i];
                this.isObject(t[i]) ? r[i] = p.get() : c.Signal && p instanceof c.Signal ? r[i] = p.value : c.Param && p instanceof c.Param ? r[i] = p.value : p instanceof AudioParam ? r[i] = p.value : p instanceof c ? r[i] = p.get() : this.isFunction(p) || this.isUndef(p) || (r[i] = p)
            }
            return e
        }, c.prototype._collectDefaults = function(t) {
            var e = [];
            if (this.isUndef(t.defaults) || (e = Object.keys(t.defaults)), !this.isUndef(t._super))
                for (var n = this._collectDefaults(t._super), i = 0; i < n.length; i++) - 1 === e.indexOf(n[i]) && e.push(n[i]);
            return e
        }, c.prototype.toString = function() {
            for (var t in c) {
                var e = t[0].match(/^[A-Z]$/),
                    n = c[t] === this.constructor;
                if (this.isFunction(c[t]) && e && n) return t
            }
            return "Tone"
        }, Object.defineProperty(c.prototype, "numberOfInputs", {
            get: function() {
                return this.input ? this.isArray(this.input) ? this.input.length : 1 : 0
            }
        }), Object.defineProperty(c.prototype, "numberOfOutputs", {
            get: function() {
                return this.output ? this.isArray(this.output) ? this.output.length : 1 : 0
            }
        }), c.prototype.dispose = function() {
            return this.isUndef(this.input) || (this.input instanceof AudioNode && this.input.disconnect(), this.input = null), this.isUndef(this.output) || (this.output instanceof AudioNode && this.output.disconnect(), this.output = null), this
        }, c.prototype.connect = function(t, e, n) {
            return Array.isArray(this.output) ? (e = this.defaultArg(e, 0), this.output[e].connect(t, 0, n)) : this.output.connect(t, e, n), this
        }, c.prototype.disconnect = function(t, e, n) {
            this.isArray(this.output) ? this.isNumber(t) ? this.output[t].disconnect() : (e = this.defaultArg(e, 0), this.output[e].disconnect(t, 0, n)) : this.output.disconnect.apply(this.output, arguments)
        }, c.prototype.connectSeries = function() {
            if (1 < arguments.length)
                for (var t = arguments[0], e = 1; e < arguments.length; e++) {
                    var n = arguments[e];
                    t.connect(n), t = n
                }
            return this
        }, c.prototype.chain = function() {
            if (0 < arguments.length)
                for (var t = this, e = 0; e < arguments.length; e++) {
                    var n = arguments[e];
                    t.connect(n), t = n
                }
            return this
        }, c.prototype.fan = function() {
            if (0 < arguments.length)
                for (var t = 0; t < arguments.length; t++) this.connect(arguments[t]);
            return this
        }, AudioNode.prototype.chain = c.prototype.chain, AudioNode.prototype.fan = c.prototype.fan, c.prototype.defaultArg = function(t, e) {
            if (this.isObject(t) && this.isObject(e)) {
                var n = {};
                for (var i in t) n[i] = this.defaultArg(e[i], t[i]);
                for (var o in e) n[o] = this.defaultArg(t[o], e[o]);
                return n
            }
            return this.isUndef(t) ? e : t
        }, c.prototype.optionsObject = function(t, e, n) {
            var i = {};
            if (1 === t.length && this.isObject(t[0])) i = t[0];
            else
                for (var o = 0; o < e.length; o++) i[e[o]] = t[o];
            return this.isUndef(n) ? i : this.defaultArg(i, n)
        }, c.prototype.isUndef = function(t) {
            return void 0 === t
        }, c.prototype.isFunction = function(t) {
            return "function" == typeof t
        }, c.prototype.isNumber = function(t) {
            return "number" == typeof t
        }, c.prototype.isObject = function(t) {
            return "[object Object]" === Object.prototype.toString.call(t) && t.constructor === Object
        }, c.prototype.isBoolean = function(t) {
            return "boolean" == typeof t
        }, c.prototype.isArray = function(t) {
            return Array.isArray(t)
        }, c.prototype.isString = function(t) {
            return "string" == typeof t
        }, c.noOp = function() {}, c.prototype._readOnly = function(t) {
            if (Array.isArray(t))
                for (var e = 0; e < t.length; e++) this._readOnly(t[e]);
            else Object.defineProperty(this, t, {
                writable: !1,
                enumerable: !0
            })
        }, c.prototype._writable = function(t) {
            if (Array.isArray(t))
                for (var e = 0; e < t.length; e++) this._writable(t[e]);
            else Object.defineProperty(this, t, {
                writable: !0
            })
        }, c.State = {
            Started: "started",
            Stopped: "stopped",
            Paused: "paused"
        }, c.prototype.equalPowerScale = function(t) {
            var e = .5 * Math.PI;
            return Math.sin(t * e)
        }, c.prototype.dbToGain = function(t) {
            return Math.pow(2, t / 6)
        }, c.prototype.gainToDb = function(t) {
            return Math.log(t) / Math.LN10 * 20
        }, c.prototype.intervalToFrequencyRatio = function(t) {
            return Math.pow(2, t / 12)
        }, c.prototype.now = function() {
            return c.context.now()
        }, c.now = function() {
            return c.context.now()
        }, c.extend = function(t, e) {
            function n() {}
            c.prototype.isUndef(e) && (e = c), n.prototype = e.prototype, t.prototype = new n, (t.prototype.constructor = t)._super = e
        }, Object.defineProperty(c, "context", {
            get: function() {
                return e
            },
            set: function(t) {
                e = c.Context && t instanceof c.Context ? t : new c.Context(t), c.Context && c.Context.emit("init", e)
            }
        }), Object.defineProperty(c.prototype, "context", {
            get: function() {
                return c.context
            }
        }), c.setContext = function(t) {
            c.context = t
        }, Object.defineProperty(c.prototype, "blockTime", {
            get: function() {
                return 128 / this.context.sampleRate
            }
        }), Object.defineProperty(c.prototype, "sampleTime", {
            get: function() {
                return 1 / this.context.sampleRate
            }
        }), Object.defineProperty(c, "supported", {
            get: function() {
                var t = window.hasOwnProperty("AudioContext") || window.hasOwnProperty("webkitAudioContext"),
                    e = window.hasOwnProperty("Promise"),
                    n = window.hasOwnProperty("Worker");
                return t && e && n
            }
        }), c.version = "r10", window.TONE_SILENCE_VERSION_LOGGING, c
    }.call(e, n, e, t)) || (t.exports = i)
}, function(t, e, n) {
    "use strict";
    var i, o;
    i = [n(17)], void 0 === (o = function(t) {
        var r = new function() {
            this.input = t.createGain(), this.output = t.createGain(), this.limiter = t.createDynamicsCompressor(), this.limiter.threshold.value = -3, this.limiter.ratio.value = 20, this.limiter.knee.value = 1, this.audiocontext = t, this.output.disconnect(), this.input.connect(this.limiter), this.limiter.connect(this.output), this.meter = t.createGain(), this.fftMeter = t.createGain(), this.output.connect(this.meter), this.output.connect(this.fftMeter), this.output.connect(this.audiocontext.destination), this.soundArray = [], this.parts = [], this.extensions = []
        };
        return p5.prototype.getMasterVolume = function() {
            return r.output.gain.value
        }, p5.prototype.masterVolume = function(t, e, n) {
            if ("number" == typeof t) {
                e = e || 0, n = n || 0;
                var i = r.audiocontext.currentTime,
                    o = r.output.gain.value;
                r.output.gain.cancelScheduledValues(i + n), r.output.gain.linearRampToValueAtTime(o, i + n), r.output.gain.linearRampToValueAtTime(t, i + n + e)
            } else {
                if (!t) return r.output.gain;
                t.connect(r.output.gain)
            }
        }, p5.prototype.soundOut = p5.soundOut = r, p5.soundOut._silentNode = r.audiocontext.createGain(), p5.soundOut._silentNode.gain.value = 0, p5.soundOut._silentNode.connect(r.audiocontext.destination), r
    }.apply(e, i)) || (t.exports = o)
}, function(t, e, n) {
    var i, o;
    i = [n(0), n(5), n(8), n(22), n(9)], void 0 === (o = function(e) {
        "use strict";
        return e.Signal = function() {
            var t = this.optionsObject(arguments, ["value", "units"], e.Signal.defaults);
            this.output = this._gain = this.context.createGain(), t.param = this._gain.gain, e.Param.call(this, t), this.input = this._param = this._gain.gain, this.context.getConstant(1).chain(this._gain)
        }, e.extend(e.Signal, e.Param), e.Signal.defaults = {
            value: 0,
            units: e.Type.Default,
            convert: !0
        }, e.Signal.prototype.connect = e.SignalBase.prototype.connect, e.Signal.prototype.dispose = function() {
            return e.Param.prototype.dispose.call(this), this._param = null, this._gain.disconnect(), this._gain = null, this
        }, e.Signal
    }.apply(e, i)) || (t.exports = o)
}, function(t, e, n) {
    var i, o;
    i = [n(0), n(2), n(9)], void 0 === (o = function(e) {
        "use strict";
        return e.Multiply = function(t) {
            this.createInsOuts(2, 0), this._mult = this.input[0] = this.output = new e.Gain, this._param = this.input[1] = this.output.gain, this._param.value = this.defaultArg(t, 0)
        }, e.extend(e.Multiply, e.Signal), e.Multiply.prototype.dispose = function() {
            return e.prototype.dispose.call(this), this._mult.dispose(), this._mult = null, this._param = null, this
        }, e.Multiply
    }.apply(e, i)) || (t.exports = o)
}, function(t, e, n) {
    "use strict";
    var i;
    void 0 === (i = function(t) {
        var r = n(1),
            e = n(51);
        return p5.Effect = function() {
            this.ac = r.audiocontext, this.input = this.ac.createGain(), this.output = this.ac.createGain(), this._drywet = new e(1), this.wet = this.ac.createGain(), this.input.connect(this._drywet.a), this.wet.connect(this._drywet.b), this._drywet.connect(this.output), this.connect(), r.soundArray.push(this)
        }, p5.Effect.prototype.amp = function(t, e, n) {
            e = e || 0, n = n || 0;
            var i = r.audiocontext.currentTime,
                o = this.output.gain.value;
            this.output.gain.cancelScheduledValues(i), this.output.gain.linearRampToValueAtTime(o, i + n + .001), this.output.gain.linearRampToValueAtTime(t, i + n + e + .001)
        }, p5.Effect.prototype.chain = function() {
            if (0 < arguments.length) {
                this.connect(arguments[0]);
                for (var t = 1; t < arguments.length; t += 1) arguments[t - 1].connect(arguments[t])
            }
            return this
        }, p5.Effect.prototype.drywet = function(t) {
            return void 0 !== t && (this._drywet.fade.value = t), this._drywet.fade.value
        }, p5.Effect.prototype.connect = function(t) {
            var e = t || p5.soundOut.input;
            this.output.connect(e.input ? e.input : e)
        }, p5.Effect.prototype.disconnect = function() {
            this.output && this.output.disconnect()
        }, p5.Effect.prototype.dispose = function() {
            var t = r.soundArray.indexOf(this);
            r.soundArray.splice(t, 1), this.input && (this.input.disconnect(), delete this.input), this.output && (this.output.disconnect(), delete this.output), this._drywet && (this._drywet.disconnect(), delete this._drywet), this.wet && (this.wet.disconnect(), delete this.wet), this.ac = void 0
        }, p5.Effect
    }.call(e, n, e, t)) || (t.exports = i)
}, function(t, e, n) {
    var i, o;
    i = [n(0), n(19)], void 0 === (o = function(t) {
        "use strict";
        return t.WaveShaper = function(t, e) {
            this._shaper = this.input = this.output = this.context.createWaveShaper(), this._curve = null, Array.isArray(t) ? this.curve = t : isFinite(t) || this.isUndef(t) ? this._curve = new Float32Array(this.defaultArg(t, 1024)) : this.isFunction(t) && (this._curve = new Float32Array(this.defaultArg(e, 1024)), this.setMap(t))
        }, t.extend(t.WaveShaper, t.SignalBase), t.WaveShaper.prototype.setMap = function(t) {
            for (var e = 0, n = this._curve.length; e < n; e++) {
                var i = e / (n - 1) * 2 - 1;
                this._curve[e] = t(i, e)
            }
            return this._shaper.curve = this._curve, this
        }, Object.defineProperty(t.WaveShaper.prototype, "curve", {
            get: function() {
                return this._shaper.curve
            },
            set: function(t) {
                this._curve = new Float32Array(t), this._shaper.curve = this._curve
            }
        }), Object.defineProperty(t.WaveShaper.prototype, "oversample", {
            get: function() {
                return this._shaper.oversample
            },
            set: function(t) {
                if (-1 === ["none", "2x", "4x"].indexOf(t)) throw new RangeError("Tone.WaveShaper: oversampling must be either 'none', '2x', or '4x'");
                this._shaper.oversample = t
            }
        }), t.WaveShaper.prototype.dispose = function() {
            return t.prototype.dispose.call(this), this._shaper.disconnect(), this._shaper = null, this._curve = null, this
        }, t.WaveShaper
    }.apply(e, i)) || (t.exports = o)
}, function(t, e, o) {
    "use strict";
    var n;

    function a(t) {
        return (a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    void 0 === (n = function(t) {
        var u = o(1),
            i = o(10);
        p5.prototype.sampleRate = function() {
            return u.audiocontext.sampleRate
        }, p5.prototype.freqToMidi = function(t) {
            var e = Math.log(t / 440) / Math.log(2);
            return Math.round(12 * e) + 69
        };
        var n = p5.prototype.midiToFreq = function(t) {
            return 440 * Math.pow(2, (t - 69) / 12)
        };

        function p(t, e, n) {
            for (var i = n.length, o = 0; o < i; o++) t.setUint8(e + o, n.charCodeAt(o))
        }
        return p5.prototype.soundFormats = function() {
            u.extensions = [];
            for (var t = 0; t < arguments.length; t++) {
                if (arguments[t] = arguments[t].toLowerCase(), !(-1 < ["mp3", "wav", "ogg", "m4a", "aac"].indexOf(arguments[t]))) throw arguments[t] + " is not a valid sound format!";
                u.extensions.push(arguments[t])
            }
        }, p5.prototype.disposeSound = function() {
            for (var t = 0; t < u.soundArray.length; t++) u.soundArray[t].dispose()
        }, p5.prototype.registerMethod("remove", p5.prototype.disposeSound), p5.prototype._checkFileFormats = function(t) {
            var e;
            if ("string" == typeof t) {
                var n = (e = t).split(".").pop();
                if (-1 < ["mp3", "wav", "ogg", "m4a", "aac"].indexOf(n))
                    if (p5.prototype.isFileSupported(n)) e = e;
                    else
                        for (var i = e.split("."), o = i[i.length - 1], r = 0; r < u.extensions.length; r++) {
                            var s = u.extensions[r];
                            if (p5.prototype.isFileSupported(s)) {
                                o = "", 2 === i.length && (o += i[0]);
                                for (r = 1; r <= i.length - 2; r++) {
                                    o += "." + i[r]
                                }
                                e = o += ".", e = e += s;
                                break
                            }
                        } else
                            for (r = 0; r < u.extensions.length; r++) {
                                s = u.extensions[r];
                                if (p5.prototype.isFileSupported(s)) {
                                    e = e + "." + s;
                                    break
                                }
                            }
            } else if ("object" === a(t))
                for (r = 0; r < t.length; r++) {
                    s = t[r].split(".").pop();
                    if (p5.prototype.isFileSupported(s)) {
                        e = t[r];
                        break
                    }
                }
            return e
        }, p5.prototype._mathChain = function(t, e, n, i, o) {
            for (var r in t.mathOps) t.mathOps[r] instanceof o && (t.mathOps[r].dispose(), (n = r) < t.mathOps.length - 1 && (i = t.mathOps[r + 1]));
            return t.mathOps[n - 1].disconnect(), t.mathOps[n - 1].connect(e), e.connect(i), t.mathOps[n] = e, t
        }, {
            convertToWav: function(t) {
                var e, n = function(t, e) {
                        for (var n = t.length + e.length, i = new Float32Array(n), o = 0, r = 0; r < n;) i[r++] = t[o], i[r++] = e[o], o++;
                        return i
                    }(e = t.getChannelData(0), 1 < t.numberOfChannels ? t.getChannelData(1) : e),
                    i = new window.ArrayBuffer(44 + 2 * n.length),
                    o = new window.DataView(i);
                p(o, 0, "RIFF"), o.setUint32(4, 36 + 2 * n.length, !0), p(o, 8, "WAVE"), p(o, 12, "fmt "), o.setUint32(16, 16, !0), o.setUint16(20, 1, !0), o.setUint16(22, 2, !0), o.setUint32(24, u.audiocontext.sampleRate, !0), o.setUint32(28, 4 * u.audiocontext.sampleRate, !0), o.setUint16(32, 4, !0), o.setUint16(34, 16, !0), p(o, 36, "data"), o.setUint32(40, 2 * n.length, !0);
                for (var r = n.length, s = 44, a = 0; a < r; a++) o.setInt16(s, 32767 * n[a], !0), s += 2;
                return o
            },
            midiToFreq: n,
            noteToFreq: function(t) {
                if ("string" != typeof t) return t;
                var e = {
                    A: 21,
                    B: 23,
                    C: 24,
                    D: 26,
                    E: 28,
                    F: 29,
                    G: 31
                } [t[0].toUpperCase()];
                switch (e += 12 * (~~t.slice(-1) - 1), t[1]) {
                    case "#":
                        e += 1;
                        break;
                    case "b":
                        e -= 1
                }
                return n(e)
            },
            safeBufferSize: function(t) {
                var e = t,
                    n = new AudioWorkletNode(u.audiocontext, i.soundFileProcessor);
                return n instanceof ScriptProcessorNode && (e = n.bufferSize), n.disconnect(), n = null, e
            }
        }
    }.call(e, o, e, t)) || (t.exports = n)
}, function(t, e, n) {
    var i, o;
    i = [n(0), n(2), n(9)], void 0 === (o = function(e) {
        "use strict";
        return e.Add = function(t) {
            this.createInsOuts(2, 0), this._sum = this.input[0] = this.input[1] = this.output = new e.Gain, this._param = this.input[1] = new e.Signal(t), this._param.connect(this._sum)
        }, e.extend(e.Add, e.Signal), e.Add.prototype.dispose = function() {
            return e.prototype.dispose.call(this), this._sum.dispose(), this._sum = null, this._param.dispose(), this._param = null, this
        }, e.Add
    }.apply(e, i)) || (t.exports = o)
}, function(t, e, n) {
    var i, o;
    i = [n(0), n(20), n(45), n(46), n(12)], void 0 === (o = function(e) {
        return e.Type = {
            Default: "number",
            Time: "time",
            Frequency: "frequency",
            TransportTime: "transportTime",
            Ticks: "ticks",
            NormalRange: "normalRange",
            AudioRange: "audioRange",
            Decibels: "db",
            Interval: "interval",
            BPM: "bpm",
            Positive: "positive",
            Cents: "cents",
            Degrees: "degrees",
            MIDI: "midi",
            BarsBeatsSixteenths: "barsBeatsSixteenths",
            Samples: "samples",
            Hertz: "hertz",
            Note: "note",
            Milliseconds: "milliseconds",
            Seconds: "seconds",
            Notation: "notation"
        }, e.prototype.toSeconds = function(t) {
            return this.isNumber(t) ? t : this.isUndef(t) ? this.now() : this.isString(t) ? new e.Time(t).toSeconds() : t instanceof e.TimeBase ? t.toSeconds() : void 0
        }, e.prototype.toFrequency = function(t) {
            return this.isNumber(t) ? t : this.isString(t) || this.isUndef(t) ? new e.Frequency(t).valueOf() : t instanceof e.TimeBase ? t.toFrequency() : void 0
        }, e.prototype.toTicks = function(t) {
            return this.isNumber(t) || this.isString(t) ? new e.TransportTime(t).toTicks() : this.isUndef(t) ? e.Transport.ticks : t instanceof e.TimeBase ? t.toTicks() : void 0
        }, e
    }.apply(e, i)) || (t.exports = o)
}, function(t, e, n) {
    var i, o;
    i = [n(0), n(22), n(8)], void 0 === (o = function(n) {
        "use strict";
        return window.GainNode && !AudioContext.prototype.createGain && (AudioContext.prototype.createGain = AudioContext.prototype.createGainNode), n.Gain = function() {
            var t = this.optionsObject(arguments, ["gain", "units"], n.Gain.defaults);
            this.input = this.output = this._gainNode = this.context.createGain(), this.gain = new n.Param({
                param: this._gainNode.gain,
                units: t.units,
                value: t.gain,
                convert: t.convert
            }), this._readOnly("gain")
        }, n.extend(n.Gain), n.Gain.defaults = {
            gain: 1,
            convert: !0
        }, n.Gain.prototype.dispose = function() {
            n.Param.prototype.dispose.call(this), this._gainNode.disconnect(), this._gainNode = null, this._writable("gain"), this.gain.dispose(), this.gain = null
        }, n.prototype.createInsOuts = function(t, e) {
            1 === t ? this.input = new n.Gain : 1 < t && (this.input = new Array(t)), 1 === e ? this.output = new n.Gain : 1 < e && (this.output = new Array(t))
        }, n.Gain
    }.apply(e, i)) || (t.exports = o)
}, function(t, e) {
    t.exports = {
        recorderProcessor: "recorder-processor",
        soundFileProcessor: "sound-file-processor",
        amplitudeProcessor: "amplitude-processor"
    }
}, function(t, e, n) {
    "use strict";
    var i;
    void 0 === (i = function() {
        return function(t, e, n) {
            var i, o, r = new Error;
            return r.name = t, r.originalStack = r.stack + e, i = r.stack + e, r.failedPath = n, o = (o = i.split("\n")).filter(function(t) {
                return !t.match(/(p5.|native code|globalInit)/g)
            }), r.stack = o.join("\n"), r
        }
    }.call(e, n, e, t)) || (t.exports = i)
}, function(t, e, n) {
    var i, o;
    i = [n(0), n(18)], void 0 === (o = function(i) {
        function t(t, e, n) {
            if (t.input) Array.isArray(t.input) ? (i.prototype.isUndef(n) && (n = 0), this.connect(t.input[n])) : this.connect(t.input, e, n);
            else try {
                t instanceof AudioNode ? o.call(this, t, e, n) : o.call(this, t, e)
            } catch (e) {
                throw new Error("error connecting to node: " + t + "\n" + e)
            }
        }
        var o, r;
        return !window.hasOwnProperty("AudioContext") && window.hasOwnProperty("webkitAudioContext") && (window.AudioContext = window.webkitAudioContext), i.Context = function(t) {
            for (var e in i.Emitter.call(this), t = t || new window.AudioContext, this._context = t, this._context) this._defineProperty(this._context, e);
            this._latencyHint = "interactive", this._lookAhead = .1, this._updateInterval = this._lookAhead / 3, this._computedUpdateInterval = 0, this._worker = this._createWorker(), this._constants = {}
        }, i.extend(i.Context, i.Emitter), i.Emitter.mixin(i.Context), i.Context.prototype._defineProperty = function(e, n) {
            this.isUndef(this[n]) && Object.defineProperty(this, n, {
                get: function() {
                    return "function" == typeof e[n] ? e[n].bind(e) : e[n]
                },
                set: function(t) {
                    e[n] = t
                }
            })
        }, i.Context.prototype.now = function() {
            return this._context.currentTime
        }, i.Context.prototype._createWorker = function() {
            window.URL = window.URL || window.webkitURL;
            var t = new Blob(["var timeoutTime = " + (1e3 * this._updateInterval).toFixed(1) + ";self.onmessage = function(msg){\ttimeoutTime = parseInt(msg.data);};function tick(){\tsetTimeout(tick, timeoutTime);\tself.postMessage('tick');}tick();"]),
                e = URL.createObjectURL(t),
                n = new Worker(e);
            return n.addEventListener("message", function() {
                this.emit("tick")
            }.bind(this)), n.addEventListener("message", function() {
                var t = this.now();
                if (this.isNumber(this._lastUpdate)) {
                    var e = t - this._lastUpdate;
                    this._computedUpdateInterval = Math.max(e, .97 * this._computedUpdateInterval)
                }
                this._lastUpdate = t
            }.bind(this)), n
        }, i.Context.prototype.getConstant = function(t) {
            if (this._constants[t]) return this._constants[t];
            for (var e = this._context.createBuffer(1, 128, this._context.sampleRate), n = e.getChannelData(0), i = 0; i < n.length; i++) n[i] = t;
            var o = this._context.createBufferSource();
            return o.channelCount = 1, o.channelCountMode = "explicit", o.buffer = e, o.loop = !0, o.start(0), this._constants[t] = o
        }, Object.defineProperty(i.Context.prototype, "lag", {
            get: function() {
                var t = this._computedUpdateInterval - this._updateInterval;
                return Math.max(t, 0)
            }
        }), Object.defineProperty(i.Context.prototype, "lookAhead", {
            get: function() {
                return this._lookAhead
            },
            set: function(t) {
                this._lookAhead = t
            }
        }), Object.defineProperty(i.Context.prototype, "updateInterval", {
            get: function() {
                return this._updateInterval
            },
            set: function(t) {
                this._updateInterval = Math.max(t, i.prototype.blockTime), this._worker.postMessage(Math.max(1e3 * t, 1))
            }
        }), Object.defineProperty(i.Context.prototype, "latencyHint", {
            get: function() {
                return this._latencyHint
            },
            set: function(t) {
                var e = t;
                if (this._latencyHint = t, this.isString(t)) switch (t) {
                    case "interactive":
                        e = .1, this._context.latencyHint = t;
                        break;
                    case "playback":
                        e = .8, this._context.latencyHint = t;
                        break;
                    case "balanced":
                        e = .25, this._context.latencyHint = t;
                        break;
                    case "fastest":
                        e = .01
                }
                this.lookAhead = e, this.updateInterval = e / 3
            }
        }), i.supported && (o = AudioNode.prototype.connect, r = AudioNode.prototype.disconnect, AudioNode.prototype.connect !== t && (AudioNode.prototype.connect = t, AudioNode.prototype.disconnect = function(t, e, n) {
            if (t && t.input && Array.isArray(t.input)) i.prototype.isUndef(n) && (n = 0), this.disconnect(t.input[n], e, n);
            else if (t && t.input) this.disconnect(t.input, e, n);
            else try {
                r.apply(this, arguments)
            } catch (e) {
                throw new Error("error disconnecting node: " + t + "\n" + e)
            }
        }), i.context = new i.Context), i.Context
    }.apply(e, i)) || (t.exports = o)
}, function(t, e, n) {
    var i, o;
    i = [n(0), n(7), n(3), n(2)], void 0 === (o = function(n) {
        "use strict";
        return n.Scale = function(t, e) {
            this._outputMin = this.defaultArg(t, 0), this._outputMax = this.defaultArg(e, 1), this._scale = this.input = new n.Multiply(1), this._add = this.output = new n.Add(0), this._scale.connect(this._add), this._setRange()
        }, n.extend(n.Scale, n.SignalBase), Object.defineProperty(n.Scale.prototype, "min", {
            get: function() {
                return this._outputMin
            },
            set: function(t) {
                this._outputMin = t, this._setRange()
            }
        }), Object.defineProperty(n.Scale.prototype, "max", {
            get: function() {
                return this._outputMax
            },
            set: function(t) {
                this._outputMax = t, this._setRange()
            }
        }), n.Scale.prototype._setRange = function() {
            this._add.value = this._outputMin, this._scale.value = this._outputMax - this._outputMin
        }, n.Scale.prototype.dispose = function() {
            return n.prototype.dispose.call(this), this._add.dispose(), this._add = null, this._scale.dispose(), this._scale = null, this
        }, n.Scale
    }.apply(e, i)) || (t.exports = o)
}, function(t, e, n) {
    var i, o;
    i = [n(0), n(2), n(24)], void 0 === (o = function(u) {
        "use strict";
        return u.TimelineSignal = function() {
            var t = this.optionsObject(arguments, ["value", "units"], u.Signal.defaults);
            this._events = new u.Timeline(10), u.Signal.apply(this, t), t.param = this._param, u.Param.call(this, t), this._initial = this._fromUnits(this._param.value)
        }, u.extend(u.TimelineSignal, u.Param), u.TimelineSignal.Type = {
            Linear: "linear",
            Exponential: "exponential",
            Target: "target",
            Curve: "curve",
            Set: "set"
        }, Object.defineProperty(u.TimelineSignal.prototype, "value", {
            get: function() {
                var t = this.now(),
                    e = this.getValueAtTime(t);
                return this._toUnits(e)
            },
            set: function(t) {
                var e = this._fromUnits(t);
                this._initial = e, this.cancelScheduledValues(), this._param.value = e
            }
        }), u.TimelineSignal.prototype.setValueAtTime = function(t, e) {
            return t = this._fromUnits(t), e = this.toSeconds(e), this._events.add({
                type: u.TimelineSignal.Type.Set,
                value: t,
                time: e
            }), this._param.setValueAtTime(t, e), this
        }, u.TimelineSignal.prototype.linearRampToValueAtTime = function(t, e) {
            return t = this._fromUnits(t), e = this.toSeconds(e), this._events.add({
                type: u.TimelineSignal.Type.Linear,
                value: t,
                time: e
            }), this._param.linearRampToValueAtTime(t, e), this
        }, u.TimelineSignal.prototype.exponentialRampToValueAtTime = function(t, e) {
            e = this.toSeconds(e);
            var n = this._searchBefore(e);
            n && 0 === n.value && this.setValueAtTime(this._minOutput, n.time), t = this._fromUnits(t);
            var i = Math.max(t, this._minOutput);
            return this._events.add({
                type: u.TimelineSignal.Type.Exponential,
                value: i,
                time: e
            }), t < this._minOutput ? (this._param.exponentialRampToValueAtTime(this._minOutput, e - this.sampleTime), this.setValueAtTime(0, e)) : this._param.exponentialRampToValueAtTime(t, e), this
        }, u.TimelineSignal.prototype.setTargetAtTime = function(t, e, n) {
            return t = this._fromUnits(t), t = Math.max(this._minOutput, t), n = Math.max(this._minOutput, n), e = this.toSeconds(e), this._events.add({
                type: u.TimelineSignal.Type.Target,
                value: t,
                time: e,
                constant: n
            }), this._param.setTargetAtTime(t, e, n), this
        }, u.TimelineSignal.prototype.setValueCurveAtTime = function(t, e, n, i) {
            i = this.defaultArg(i, 1);
            for (var o = new Array(t.length), r = 0; r < o.length; r++) o[r] = this._fromUnits(t[r]) * i;
            e = this.toSeconds(e), n = this.toSeconds(n), this._events.add({
                type: u.TimelineSignal.Type.Curve,
                value: o,
                time: e,
                duration: n
            }), this._param.setValueAtTime(o[0], e);
            for (var s = 1; s < o.length; s++) {
                var a = e + s / (o.length - 1) * n;
                this._param.linearRampToValueAtTime(o[s], a)
            }
            return this
        }, u.TimelineSignal.prototype.cancelScheduledValues = function(t) {
            return t = this.toSeconds(t), this._events.cancel(t), this._param.cancelScheduledValues(t), this
        }, u.TimelineSignal.prototype.setRampPoint = function(t) {
            t = this.toSeconds(t);
            var e = this._toUnits(this.getValueAtTime(t)),
                n = this._searchBefore(t);
            if (n && n.time === t) this.cancelScheduledValues(t + this.sampleTime);
            else if (n && n.type === u.TimelineSignal.Type.Curve && n.time + n.duration > t) this.cancelScheduledValues(t), this.linearRampToValueAtTime(e, t);
            else {
                var i = this._searchAfter(t);
                i && (this.cancelScheduledValues(t), i.type === u.TimelineSignal.Type.Linear ? this.linearRampToValueAtTime(e, t) : i.type === u.TimelineSignal.Type.Exponential && this.exponentialRampToValueAtTime(e, t)), this.setValueAtTime(e, t)
            }
            return this
        }, u.TimelineSignal.prototype.linearRampToValueBetween = function(t, e, n) {
            return this.setRampPoint(e), this.linearRampToValueAtTime(t, n), this
        }, u.TimelineSignal.prototype.exponentialRampToValueBetween = function(t, e, n) {
            return this.setRampPoint(e), this.exponentialRampToValueAtTime(t, n), this
        }, u.TimelineSignal.prototype._searchBefore = function(t) {
            return this._events.get(t)
        }, u.TimelineSignal.prototype._searchAfter = function(t) {
            return this._events.getAfter(t)
        }, u.TimelineSignal.prototype.getValueAtTime = function(t) {
            t = this.toSeconds(t);
            var e = this._searchAfter(t),
                n = this._searchBefore(t),
                i = this._initial;
            if (null === n) i = this._initial;
            else if (n.type === u.TimelineSignal.Type.Target) {
                var o, r = this._events.getBefore(n.time);
                o = null === r ? this._initial : r.value, i = this._exponentialApproach(n.time, o, n.value, n.constant, t)
            } else i = n.type === u.TimelineSignal.Type.Curve ? this._curveInterpolate(n.time, n.value, n.duration, t) : null === e ? n.value : e.type === u.TimelineSignal.Type.Linear ? this._linearInterpolate(n.time, n.value, e.time, e.value, t) : e.type === u.TimelineSignal.Type.Exponential ? this._exponentialInterpolate(n.time, n.value, e.time, e.value, t) : n.value;
            return i
        }, u.TimelineSignal.prototype.connect = u.SignalBase.prototype.connect, u.TimelineSignal.prototype._exponentialApproach = function(t, e, n, i, o) {
            return n + (e - n) * Math.exp(-(o - t) / i)
        }, u.TimelineSignal.prototype._linearInterpolate = function(t, e, n, i, o) {
            return e + (o - t) / (n - t) * (i - e)
        }, u.TimelineSignal.prototype._exponentialInterpolate = function(t, e, n, i, o) {
            return (e = Math.max(this._minOutput, e)) * Math.pow(i / e, (o - t) / (n - t))
        }, u.TimelineSignal.prototype._curveInterpolate = function(t, e, n, i) {
            var o = e.length;
            if (t + n <= i) return e[o - 1];
            if (i <= t) return e[0];
            var r = (i - t) / n,
                s = Math.floor((o - 1) * r),
                a = Math.ceil((o - 1) * r),
                u = e[s],
                p = e[a];
            return a === s ? u : this._linearInterpolate(s, u, a, p, r * (o - 1))
        }, u.TimelineSignal.prototype.dispose = function() {
            u.Signal.prototype.dispose.call(this), u.Param.prototype.dispose.call(this), this._events.dispose(), this._events = null
        }, u.TimelineSignal
    }.apply(e, i)) || (t.exports = o)
}, function(t, e, n) {
    "use strict";
    var i;
    void 0 === (i = function(t) {
        var e = n(4);
        return p5.Filter = function(t) {
            e.call(this), this.biquad = this.ac.createBiquadFilter(), this.input.connect(this.biquad), this.biquad.connect(this.wet), t && this.setType(t), this._on = !0, this._untoggledType = this.biquad.type
        }, p5.Filter.prototype = Object.create(e.prototype), p5.Filter.prototype.process = function(t, e, n, i) {
            t.connect(this.input), this.set(e, n, i)
        }, p5.Filter.prototype.set = function(t, e, n) {
            t && this.freq(t, n), e && this.res(e, n)
        }, p5.Filter.prototype.freq = function(t, e) {
            var n = e || 0;
            return t <= 0 && (t = 1), "number" == typeof t ? (this.biquad.frequency.cancelScheduledValues(this.ac.currentTime + .01 + n), this.biquad.frequency.exponentialRampToValueAtTime(t, this.ac.currentTime + .02 + n)) : t && t.connect(this.biquad.frequency), this.biquad.frequency.value
        }, p5.Filter.prototype.res = function(t, e) {
            var n = e || 0;
            return "number" == typeof t ? (this.biquad.Q.value = t, this.biquad.Q.cancelScheduledValues(this.ac.currentTime + .01 + n), this.biquad.Q.linearRampToValueAtTime(t, this.ac.currentTime + .02 + n)) : t && t.connect(this.biquad.Q), this.biquad.Q.value
        }, p5.Filter.prototype.gain = function(t, e) {
            var n = e || 0;
            return "number" == typeof t ? (this.biquad.gain.value = t, this.biquad.gain.cancelScheduledValues(this.ac.currentTime + .01 + n), this.biquad.gain.linearRampToValueAtTime(t, this.ac.currentTime + .02 + n)) : t && t.connect(this.biquad.gain), this.biquad.gain.value
        }, p5.Filter.prototype.toggle = function() {
            return this._on = !this._on, !0 === this._on ? this.biquad.type = this._untoggledType : !1 === this._on && (this.biquad.type = "allpass"), this._on
        }, p5.Filter.prototype.setType = function(t) {
            this.biquad.type = t, this._untoggledType = this.biquad.type
        }, p5.Filter.prototype.dispose = function() {
            e.prototype.dispose.apply(this), this.biquad && (this.biquad.disconnect(), delete this.biquad)
        }, p5.LowPass = function() {
            p5.Filter.call(this, "lowpass")
        }, p5.LowPass.prototype = Object.create(p5.Filter.prototype), p5.HighPass = function() {
            p5.Filter.call(this, "highpass")
        }, p5.HighPass.prototype = Object.create(p5.Filter.prototype), p5.BandPass = function() {
            p5.Filter.call(this, "bandpass")
        }, p5.BandPass.prototype = Object.create(p5.Filter.prototype), p5.Filter
    }.call(e, n, e, t)) || (t.exports = i)
}, function(t, e, n) {
    var i, o;
    i = [n(0), n(7), n(25), n(2), n(9)], void 0 === (o = function(e) {
        "use strict";
        return e.Subtract = function(t) {
            this.createInsOuts(2, 0), this._sum = this.input[0] = this.output = new e.Gain, this._neg = new e.Negate, this._param = this.input[1] = new e.Signal(t), this._param.chain(this._neg, this._sum)
        }, e.extend(e.Subtract, e.Signal), e.Subtract.prototype.dispose = function() {
            return e.prototype.dispose.call(this), this._neg.dispose(), this._neg = null, this._sum.disconnect(), this._sum = null, this._param.dispose(), this._param = null, this
        }, e.Subtract
    }.apply(e, i)) || (t.exports = o)
}, function(i, o, r) {
    "use strict";
    (function(t) {
        var e, n;
        t.TONE_SILENCE_VERSION_LOGGING = !0, e = [r(35), r(12), r(0)], void 0 === (n = function(i, t, e) {
            var o = new window.AudioContext;
            return e.context.dispose(), e.setContext(o), p5.prototype.getAudioContext = function() {
                return o
            }, p5.prototype.userStartAudio = function(t, e) {
                var n = t;
                return t instanceof p5.Element ? n = t.elt : t instanceof Array && t[0] instanceof p5.Element && (n = t.map(function(t) {
                    return t.elt
                })), i(o, n, e)
            }, o
        }.apply(o, e)) || (i.exports = n)
    }).call(this, r(34))
}, function(t, e, n) {
    var i, o;
    i = [n(0)], void 0 === (o = function(s) {
        "use strict";
        return s.Emitter = function() {
            this._events = {}
        }, s.extend(s.Emitter), s.Emitter.prototype.on = function(t, e) {
            for (var n = t.split(/\W+/), i = 0; i < n.length; i++) {
                var o = n[i];
                this._events.hasOwnProperty(o) || (this._events[o] = []), this._events[o].push(e)
            }
            return this
        }, s.Emitter.prototype.off = function(t, e) {
            for (var n = t.split(/\W+/), i = 0; i < n.length; i++)
                if (t = n[i], this._events.hasOwnProperty(t))
                    if (s.prototype.isUndef(e)) this._events[t] = [];
                    else
                        for (var o = this._events[t], r = 0; r < o.length; r++) o[r] === e && o.splice(r, 1);
            return this
        }, s.Emitter.prototype.emit = function(t) {
            if (this._events) {
                var e = Array.apply(null, arguments).slice(1);
                if (this._events.hasOwnProperty(t))
                    for (var n = this._events[t], i = 0, o = n.length; i < o; i++) n[i].apply(this, e)
            }
            return this
        }, s.Emitter.mixin = function(t) {
            var e = ["on", "off", "emit"];
            t._events = {};
            for (var n = 0; n < e.length; n++) {
                var i = e[n],
                    o = s.Emitter.prototype[i];
                t[i] = o
            }
        }, s.Emitter.prototype.dispose = function() {
            return s.prototype.dispose.call(this), this._events = null, this
        }, s.Emitter
    }.apply(e, i)) || (t.exports = o)
}, function(t, e, n) {
    var i, o;
    i = [n(0)], void 0 === (o = function(i) {
        "use strict";
        return i.SignalBase = function() {}, i.extend(i.SignalBase), i.SignalBase.prototype.connect = function(t, e, n) {
            return i.Signal && i.Signal === t.constructor || i.Param && i.Param === t.constructor || i.TimelineSignal && i.TimelineSignal === t.constructor ? (t._param.cancelScheduledValues(0), t._param.value = 0, t.overridden = !0) : t instanceof AudioParam && (t.cancelScheduledValues(0), t.value = 0), i.prototype.connect.call(this, t, e, n), this
        }, i.SignalBase
    }.apply(e, i)) || (t.exports = o)
}, function(t, e, n) {
    var i, o;
    i = [n(0), n(21)], void 0 === (o = function(n) {
        return n.Time = function(t, e) {
            if (!(this instanceof n.Time)) return new n.Time(t, e);
            this._plusNow = !1, n.TimeBase.call(this, t, e)
        }, n.extend(n.Time, n.TimeBase), n.Time.prototype._unaryExpressions = Object.create(n.TimeBase.prototype._unaryExpressions), n.Time.prototype._unaryExpressions.quantize = {
            regexp: /^@/,
            method: function(t) {
                return n.Transport.nextSubdivision(t())
            }
        }, n.Time.prototype._unaryExpressions.now = {
            regexp: /^\+/,
            method: function(t) {
                return this._plusNow = !0, t()
            }
        }, n.Time.prototype.quantize = function(t, e) {
            return e = this.defaultArg(e, 1), this._expr = function(t, e, n) {
                return t = t(), e = e.toSeconds(), t + (Math.round(t / e) * e - t) * n
            }.bind(this, this._expr, new this.constructor(t), e), this
        }, n.Time.prototype.addNow = function() {
            return this._plusNow = !0, this
        }, n.Time.prototype._defaultExpr = function() {
            return this._plusNow = !0, this._noOp
        }, n.Time.prototype.copy = function(t) {
            return n.TimeBase.prototype.copy.call(this, t), this._plusNow = t._plusNow, this
        }, n.Time.prototype.toNotation = function() {
            var t = this.toSeconds(),
                e = this._toNotationHelper(t, ["1m", "2n", "4n", "8n", "16n", "32n", "64n", "128n"]),
                n = this._toNotationHelper(t, ["1m", "2n", "2t", "4n", "4t", "8n", "8t", "16n", "16t", "32n", "32t", "64n", "64t", "128n"]);
            return n.split("+").length < e.split("+").length ? n : e
        }, n.Time.prototype._toNotationHelper = function(t, e) {
            for (var n = this._notationToUnits(e[e.length - 1]), i = "", o = 0; o < e.length; o++) {
                var r = this._notationToUnits(e[o]),
                    s = t / r;
                if (1 - s % 1 < 1e-6 && (s += 1e-6), 0 < (s = Math.floor(s))) {
                    if (i += 1 === s ? e[o] : s.toString() + "*" + e[o], (t -= s * r) < n) break;
                    i += " + "
                }
            }
            return "" === i && (i = "0"), i
        }, n.Time.prototype._notationToUnits = function(t) {
            for (var e = this._primaryExpressions, n = [e.n, e.t, e.m], i = 0; i < n.length; i++) {
                var o = n[i],
                    r = t.match(o.regexp);
                if (r) return o.method.call(this, r[1])
            }
        }, n.Time.prototype.toBarsBeatsSixteenths = function() {
            var t = this._beatsToUnits(1),
                e = this.toSeconds() / t,
                n = Math.floor(e / this._timeSignature()),
                i = e % 1 * 4;
            return e = Math.floor(e) % this._timeSignature(), 3 < (i = i.toString()).length && (i = parseFloat(i).toFixed(3)), [n, e, i].join(":")
        }, n.Time.prototype.toTicks = function() {
            var t = this._beatsToUnits(1),
                e = this.valueOf() / t;
            return Math.floor(e * n.Transport.PPQ)
        }, n.Time.prototype.toSamples = function() {
            return this.toSeconds() * this.context.sampleRate
        }, n.Time.prototype.toFrequency = function() {
            return 1 / this.toSeconds()
        }, n.Time.prototype.toSeconds = function() {
            return this.valueOf()
        }, n.Time.prototype.toMilliseconds = function() {
            return 1e3 * this.toSeconds()
        }, n.Time.prototype.valueOf = function() {
            return this._expr() + (this._plusNow ? this.now() : 0)
        }, n.Time
    }.apply(e, i)) || (t.exports = o)
}, function(t, e, n) {
    var i, o;
    i = [n(0)], void 0 === (o = function(i) {
        return i.TimeBase = function(t, e) {
            if (!(this instanceof i.TimeBase)) return new i.TimeBase(t, e);
            if (this._expr = this._noOp, t instanceof i.TimeBase) this.copy(t);
            else if (!this.isUndef(e) || this.isNumber(t)) {
                e = this.defaultArg(e, this._defaultUnits);
                var n = this._primaryExpressions[e].method;
                this._expr = n.bind(this, t)
            } else this.isString(t) ? this.set(t) : this.isUndef(t) && (this._expr = this._defaultExpr())
        }, i.extend(i.TimeBase), i.TimeBase.prototype.set = function(t) {
            return this._expr = this._parseExprString(t), this
        }, i.TimeBase.prototype.clone = function() {
            var t = new this.constructor;
            return t.copy(this), t
        }, i.TimeBase.prototype.copy = function(t) {
            var e = t._expr();
            return this.set(e)
        }, i.TimeBase.prototype._primaryExpressions = {
            n: {
                regexp: /^(\d+)n/i,
                method: function(t) {
                    return 1 === (t = parseInt(t)) ? this._beatsToUnits(this._timeSignature()) : this._beatsToUnits(4 / t)
                }
            },
            t: {
                regexp: /^(\d+)t/i,
                method: function(t) {
                    return t = parseInt(t), this._beatsToUnits(8 / (3 * parseInt(t)))
                }
            },
            m: {
                regexp: /^(\d+)m/i,
                method: function(t) {
                    return this._beatsToUnits(parseInt(t) * this._timeSignature())
                }
            },
            i: {
                regexp: /^(\d+)i/i,
                method: function(t) {
                    return this._ticksToUnits(parseInt(t))
                }
            },
            hz: {
                regexp: /^(\d+(?:\.\d+)?)hz/i,
                method: function(t) {
                    return this._frequencyToUnits(parseFloat(t))
                }
            },
            tr: {
                regexp: /^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?/,
                method: function(t, e, n) {
                    var i = 0;
                    return t && "0" !== t && (i += this._beatsToUnits(this._timeSignature() * parseFloat(t))), e && "0" !== e && (i += this._beatsToUnits(parseFloat(e))), n && "0" !== n && (i += this._beatsToUnits(parseFloat(n) / 4)), i
                }
            },
            s: {
                regexp: /^(\d+(?:\.\d+)?s)/,
                method: function(t) {
                    return this._secondsToUnits(parseFloat(t))
                }
            },
            samples: {
                regexp: /^(\d+)samples/,
                method: function(t) {
                    return parseInt(t) / this.context.sampleRate
                }
            },
            default: {
                regexp: /^(\d+(?:\.\d+)?)/,
                method: function(t) {
                    return this._primaryExpressions[this._defaultUnits].method.call(this, t)
                }
            }
        }, i.TimeBase.prototype._binaryExpressions = {
            "+": {
                regexp: /^\+/,
                precedence: 2,
                method: function(t, e) {
                    return t() + e()
                }
            },
            "-": {
                regexp: /^\-/,
                precedence: 2,
                method: function(t, e) {
                    return t() - e()
                }
            },
            "*": {
                regexp: /^\*/,
                precedence: 1,
                method: function(t, e) {
                    return t() * e()
                }
            },
            "/": {
                regexp: /^\//,
                precedence: 1,
                method: function(t, e) {
                    return t() / e()
                }
            }
        }, i.TimeBase.prototype._unaryExpressions = {
            neg: {
                regexp: /^\-/,
                method: function(t) {
                    return -t()
                }
            }
        }, i.TimeBase.prototype._syntaxGlue = {
            "(": {
                regexp: /^\(/
            },
            ")": {
                regexp: /^\)/
            }
        }, i.TimeBase.prototype._tokenize = function(t) {
            for (var e = -1, n = []; 0 < t.length;) {
                var i = o(t = t.trim(), this);
                n.push(i), t = t.substr(i.value.length)
            }

            function o(t, e) {
                for (var n = ["_binaryExpressions", "_unaryExpressions", "_primaryExpressions", "_syntaxGlue"], i = 0; i < n.length; i++) {
                    var o = e[n[i]];
                    for (var r in o) {
                        var s = o[r],
                            a = s.regexp,
                            u = t.match(a);
                        if (null !== u) return {
                            method: s.method,
                            precedence: s.precedence,
                            regexp: s.regexp,
                            value: u[0]
                        }
                    }
                }
                throw new SyntaxError("Tone.TimeBase: Unexpected token " + t)
            }
            return {
                next: function() {
                    return n[++e]
                },
                peek: function() {
                    return n[e + 1]
                }
            }
        }, i.TimeBase.prototype._matchGroup = function(t, e, n) {
            if (!this.isUndef(t))
                for (var i in e) {
                    var o = e[i];
                    if (o.regexp.test(t.value)) {
                        if (this.isUndef(n)) return o;
                        if (o.precedence === n) return o
                    }
                }
            return !1
        }, i.TimeBase.prototype._parseBinary = function(t, e) {
            var n;
            this.isUndef(e) && (e = 2), n = e < 0 ? this._parseUnary(t) : this._parseBinary(t, e - 1);
            for (var i = t.peek(); i && this._matchGroup(i, this._binaryExpressions, e);) n = (i = t.next()).method.bind(this, n, this._parseBinary(t, e - 1)), i = t.peek();
            return n
        }, i.TimeBase.prototype._parseUnary = function(t) {
            var e, n;
            e = t.peek();
            var i = this._matchGroup(e, this._unaryExpressions);
            return i ? (e = t.next(), n = this._parseUnary(t), i.method.bind(this, n)) : this._parsePrimary(t)
        }, i.TimeBase.prototype._parsePrimary = function(t) {
            var e, n;
            if (e = t.peek(), this.isUndef(e)) throw new SyntaxError("Tone.TimeBase: Unexpected end of expression");
            if (this._matchGroup(e, this._primaryExpressions)) {
                var i = (e = t.next()).value.match(e.regexp);
                return e.method.bind(this, i[1], i[2], i[3])
            }
            if (e && "(" === e.value) {
                if (t.next(), n = this._parseBinary(t), !(e = t.next()) || ")" !== e.value) throw new SyntaxError("Expected )");
                return n
            }
            throw new SyntaxError("Tone.TimeBase: Cannot process token " + e.value)
        }, i.TimeBase.prototype._parseExprString = function(t) {
            this.isString(t) || (t = t.toString());
            var e = this._tokenize(t);
            return this._parseBinary(e)
        }, i.TimeBase.prototype._noOp = function() {
            return 0
        }, i.TimeBase.prototype._defaultExpr = function() {
            return this._noOp
        }, i.TimeBase.prototype._defaultUnits = "s", i.TimeBase.prototype._frequencyToUnits = function(t) {
            return 1 / t
        }, i.TimeBase.prototype._beatsToUnits = function(t) {
            return 60 / i.Transport.bpm.value * t
        }, i.TimeBase.prototype._secondsToUnits = function(t) {
            return t
        }, i.TimeBase.prototype._ticksToUnits = function(t) {
            return t * (this._beatsToUnits(1) / i.Transport.PPQ)
        }, i.TimeBase.prototype._timeSignature = function() {
            return i.Transport.timeSignature
        }, i.TimeBase.prototype._pushExpr = function(t, e, n) {
            return t instanceof i.TimeBase || (t = new this.constructor(t, n)), this._expr = this._binaryExpressions[e].method.bind(this, this._expr, t._expr), this
        }, i.TimeBase.prototype.add = function(t, e) {
            return this._pushExpr(t, "+", e)
        }, i.TimeBase.prototype.sub = function(t, e) {
            return this._pushExpr(t, "-", e)
        }, i.TimeBase.prototype.mult = function(t, e) {
            return this._pushExpr(t, "*", e)
        }, i.TimeBase.prototype.div = function(t, e) {
            return this._pushExpr(t, "/", e)
        }, i.TimeBase.prototype.valueOf = function() {
            return this._expr()
        }, i.TimeBase.prototype.dispose = function() {
            this._expr = null
        }, i.TimeBase
    }.apply(e, i)) || (t.exports = o)
}, function(t, e, n) {
    var i, o;
    i = [n(0), n(8)], void 0 === (o = function(i) {
        "use strict";
        return i.Param = function() {
            var t = this.optionsObject(arguments, ["param", "units", "convert"], i.Param.defaults);
            this._param = this.input = t.param, this.units = t.units, this.convert = t.convert, this.overridden = !1, this._lfo = null, this.isObject(t.lfo) ? this.value = t.lfo : this.isUndef(t.value) || (this.value = t.value)
        }, i.extend(i.Param), i.Param.defaults = {
            units: i.Type.Default,
            convert: !0,
            param: void 0
        }, Object.defineProperty(i.Param.prototype, "value", {
            get: function() {
                return this._toUnits(this._param.value)
            },
            set: function(t) {
                if (this.isObject(t)) {
                    if (this.isUndef(i.LFO)) throw new Error("Include 'Tone.LFO' to use an LFO as a Param value.");
                    this._lfo && this._lfo.dispose(), this._lfo = new i.LFO(t).start(), this._lfo.connect(this.input)
                } else {
                    var e = this._fromUnits(t);
                    this._param.cancelScheduledValues(0), this._param.value = e
                }
            }
        }), i.Param.prototype._fromUnits = function(t) {
            if (!this.convert && !this.isUndef(this.convert)) return t;
            switch (this.units) {
                case i.Type.Time:
                    return this.toSeconds(t);
                case i.Type.Frequency:
                    return this.toFrequency(t);
                case i.Type.Decibels:
                    return this.dbToGain(t);
                case i.Type.NormalRange:
                    return Math.min(Math.max(t, 0), 1);
                case i.Type.AudioRange:
                    return Math.min(Math.max(t, -1), 1);
                case i.Type.Positive:
                    return Math.max(t, 0);
                default:
                    return t
            }
        }, i.Param.prototype._toUnits = function(t) {
            if (!this.convert && !this.isUndef(this.convert)) return t;
            switch (this.units) {
                case i.Type.Decibels:
                    return this.gainToDb(t);
                default:
                    return t
            }
        }, i.Param.prototype._minOutput = 1e-5, i.Param.prototype.setValueAtTime = function(t, e) {
            return t = this._fromUnits(t), (e = this.toSeconds(e)) <= this.now() + this.blockTime ? this._param.value = t : this._param.setValueAtTime(t, e), this
        }, i.Param.prototype.setRampPoint = function(t) {
            t = this.defaultArg(t, this.now());
            var e = this._param.value;
            return 0 === e && (e = this._minOutput), this._param.setValueAtTime(e, t), this
        }, i.Param.prototype.linearRampToValueAtTime = function(t, e) {
            return t = this._fromUnits(t), this._param.linearRampToValueAtTime(t, this.toSeconds(e)), this
        }, i.Param.prototype.exponentialRampToValueAtTime = function(t, e) {
            return t = this._fromUnits(t), t = Math.max(this._minOutput, t), this._param.exponentialRampToValueAtTime(t, this.toSeconds(e)), this
        }, i.Param.prototype.exponentialRampToValue = function(t, e, n) {
            return n = this.toSeconds(n), this.setRampPoint(n), this.exponentialRampToValueAtTime(t, n + this.toSeconds(e)), this
        }, i.Param.prototype.linearRampToValue = function(t, e, n) {
            return n = this.toSeconds(n), this.setRampPoint(n), this.linearRampToValueAtTime(t, n + this.toSeconds(e)), this
        }, i.Param.prototype.setTargetAtTime = function(t, e, n) {
            return t = this._fromUnits(t), t = Math.max(this._minOutput, t), n = Math.max(this._minOutput, n), this._param.setTargetAtTime(t, this.toSeconds(e), n), this
        }, i.Param.prototype.setValueCurveAtTime = function(t, e, n) {
            for (var i = 0; i < t.length; i++) t[i] = this._fromUnits(t[i]);
            return this._param.setValueCurveAtTime(t, this.toSeconds(e), this.toSeconds(n)), this
        }, i.Param.prototype.cancelScheduledValues = function(t) {
            return this._param.cancelScheduledValues(this.toSeconds(t)), this
        }, i.Param.prototype.rampTo = function(t, e, n) {
            return e = this.defaultArg(e, 0), this.units === i.Type.Frequency || this.units === i.Type.BPM || this.units === i.Type.Decibels ? this.exponentialRampToValue(t, e, n) : this.linearRampToValue(t, e, n), this
        }, Object.defineProperty(i.Param.prototype, "lfo", {
            get: function() {
                return this._lfo
            }
        }), i.Param.prototype.dispose = function() {
            return i.prototype.dispose.call(this), this._param = null, this._lfo && (this._lfo.dispose(), this._lfo = null), this
        }, i.Param
    }.apply(e, i)) || (t.exports = o)
}, function(t, e, n) {
    "use strict";
    var i;
    void 0 === (i = function(t) {
        var s = n(1),
            o = n(7),
            r = n(3),
            p = n(13);
        p5.Oscillator = function(t, e) {
            if ("string" == typeof t) {
                var n = e;
                e = t, t = n
            }
            if ("number" == typeof e) {
                n = e;
                e = t, t = n
            }
            this.started = !1, this.phaseAmount = void 0, this.oscillator = s.audiocontext.createOscillator(), this.f = t || 440, this.oscillator.type = e || "sine", this.oscillator.frequency.setValueAtTime(this.f, s.audiocontext.currentTime), this.output = s.audiocontext.createGain(), this._freqMods = [], this.output.gain.value = .5, this.output.gain.setValueAtTime(.5, s.audiocontext.currentTime), this.oscillator.connect(this.output), this.panPosition = 0, this.connection = s.input, this.panner = new p5.Panner(this.output, this.connection, 1), this.mathOps = [this.output], s.soundArray.push(this)
        }, p5.Oscillator.prototype.start = function(t, e) {
            if (this.started) {
                var n = s.audiocontext.currentTime;
                this.stop(n)
            }
            if (!this.started) {
                var i = e || this.f,
                    o = this.oscillator.type;
                for (var r in this.oscillator && (this.oscillator.disconnect(), delete this.oscillator), this.oscillator = s.audiocontext.createOscillator(), this.oscillator.frequency.value = Math.abs(i), this.oscillator.type = o, this.oscillator.connect(this.output), t = t || 0, this.oscillator.start(t + s.audiocontext.currentTime), this.freqNode = this.oscillator.frequency, this._freqMods) void 0 !== this._freqMods[r].connect && this._freqMods[r].connect(this.oscillator.frequency);
                this.started = !0
            }
        }, p5.Oscillator.prototype.stop = function(t) {
            if (this.started) {
                var e = t || 0,
                    n = s.audiocontext.currentTime;
                this.oscillator.stop(e + n), this.started = !1
            }
        }, p5.Oscillator.prototype.amp = function(t, e, n) {
            if ("number" == typeof t) {
                e = e || 0, n = n || 0;
                var i = s.audiocontext.currentTime;
                this.output.gain.linearRampToValueAtTime(t, i + n + e)
            } else {
                if (!t) return this.output.gain;
                t.connect(this.output.gain)
            }
        }, p5.Oscillator.prototype.fade = p5.Oscillator.prototype.amp, p5.Oscillator.prototype.getAmp = function() {
            return this.output.gain.value
        }, p5.Oscillator.prototype.freq = function(t, e, n) {
            if ("number" != typeof t || isNaN(t)) {
                if (!t) return this.oscillator.frequency;
                t.output && (t = t.output), t.connect(this.oscillator.frequency), this._freqMods.push(t)
            } else {
                this.f = t;
                var i = s.audiocontext.currentTime;
                n = n || 0, e = e || 0;
                0 === e ? this.oscillator.frequency.setValueAtTime(t, n + i) : 0 < t ? this.oscillator.frequency.exponentialRampToValueAtTime(t, n + e + i) : this.oscillator.frequency.linearRampToValueAtTime(t, n + e + i), this.phaseAmount && this.phase(this.phaseAmount)
            }
        }, p5.Oscillator.prototype.getFreq = function() {
            return this.oscillator.frequency.value
        }, p5.Oscillator.prototype.setType = function(t) {
            this.oscillator.type = t
        }, p5.Oscillator.prototype.getType = function() {
            return this.oscillator.type
        }, p5.Oscillator.prototype.connect = function(t) {
            t ? t.hasOwnProperty("input") ? (this.panner.connect(t.input), this.connection = t.input) : (this.panner.connect(t), this.connection = t) : this.panner.connect(s.input)
        }, p5.Oscillator.prototype.disconnect = function() {
            this.output && this.output.disconnect(), this.panner && (this.panner.disconnect(), this.output && this.output.connect(this.panner)), this.oscMods = []
        }, p5.Oscillator.prototype.pan = function(t, e) {
            this.panPosition = t, this.panner.pan(t, e)
        }, p5.Oscillator.prototype.getPan = function() {
            return this.panPosition
        }, p5.Oscillator.prototype.dispose = function() {
            var t = s.soundArray.indexOf(this);
            if (s.soundArray.splice(t, 1), this.oscillator) {
                var e = s.audiocontext.currentTime;
                this.stop(e), this.disconnect(), this.panner = null, this.oscillator = null
            }
            this.osc2 && this.osc2.dispose()
        }, p5.Oscillator.prototype.phase = function(t) {
            var e = p5.prototype.map(t, 0, 1, 0, 1 / this.f),
                n = s.audiocontext.currentTime;
            this.phaseAmount = t, this.dNode || (this.dNode = s.audiocontext.createDelay(), this.oscillator.disconnect(), this.oscillator.connect(this.dNode), this.dNode.connect(this.output)), this.dNode.delayTime.setValueAtTime(e, n)
        };

        function c(t, e, n, i, o) {
            var r = t.oscillator;
            for (var s in t.mathOps) t.mathOps[s] instanceof o && (r.disconnect(), t.mathOps[s].dispose(), (n = s) < t.mathOps.length - 2 && (i = t.mathOps[s + 1]));
            return n === t.mathOps.length - 1 && t.mathOps.push(i), 0 < s && (r = t.mathOps[s - 1]), r.disconnect(), r.connect(e), e.connect(i), t.mathOps[n] = e, t
        }
        p5.Oscillator.prototype.add = function(t) {
            var e = new o(t),
                n = this.mathOps.length - 1,
                i = this.output;
            return c(this, e, n, i, o)
        }, p5.Oscillator.prototype.mult = function(t) {
            var e = new r(t),
                n = this.mathOps.length - 1,
                i = this.output;
            return c(this, e, n, i, r)
        }, p5.Oscillator.prototype.scale = function(t, e, n, i) {
            var o, r;
            r = 4 === arguments.length ? (o = p5.prototype.map(n, t, e, 0, 1) - .5, p5.prototype.map(i, t, e, 0, 1) - .5) : (o = t, e);
            var s = new p(o, r),
                a = this.mathOps.length - 1,
                u = this.output;
            return c(this, s, a, u, p)
        }, p5.SinOsc = function(t) {
            p5.Oscillator.call(this, t, "sine")
        }, p5.SinOsc.prototype = Object.create(p5.Oscillator.prototype), p5.TriOsc = function(t) {
            p5.Oscillator.call(this, t, "triangle")
        }, p5.TriOsc.prototype = Object.create(p5.Oscillator.prototype), p5.SawOsc = function(t) {
            p5.Oscillator.call(this, t, "sawtooth")
        }, p5.SawOsc.prototype = Object.create(p5.Oscillator.prototype), p5.SqrOsc = function(t) {
            p5.Oscillator.call(this, t, "square")
        }, p5.SqrOsc.prototype = Object.create(p5.Oscillator.prototype)
    }.call(e, n, e, t)) || (t.exports = i)
}, function(t, e, n) {
    var i, o;
    i = [n(0), n(8)], void 0 === (o = function(e) {
        "use strict";
        return e.Timeline = function() {
            var t = this.optionsObject(arguments, ["memory"], e.Timeline.defaults);
            this._timeline = [], this._toRemove = [], this._iterating = !1, this.memory = t.memory
        }, e.extend(e.Timeline), e.Timeline.defaults = {
            memory: 1 / 0
        }, Object.defineProperty(e.Timeline.prototype, "length", {
            get: function() {
                return this._timeline.length
            }
        }), e.Timeline.prototype.add = function(t) {
            if (this.isUndef(t.time)) throw new Error("Tone.Timeline: events must have a time attribute");
            if (this._timeline.length) {
                var e = this._search(t.time);
                this._timeline.splice(e + 1, 0, t)
            } else this._timeline.push(t);
            if (this.length > this.memory) {
                var n = this.length - this.memory;
                this._timeline.splice(0, n)
            }
            return this
        }, e.Timeline.prototype.remove = function(t) {
            if (this._iterating) this._toRemove.push(t);
            else {
                var e = this._timeline.indexOf(t); - 1 !== e && this._timeline.splice(e, 1)
            }
            return this
        }, e.Timeline.prototype.get = function(t) {
            var e = this._search(t);
            return -1 !== e ? this._timeline[e] : null
        }, e.Timeline.prototype.peek = function() {
            return this._timeline[0]
        }, e.Timeline.prototype.shift = function() {
            return this._timeline.shift()
        }, e.Timeline.prototype.getAfter = function(t) {
            var e = this._search(t);
            return e + 1 < this._timeline.length ? this._timeline[e + 1] : null
        }, e.Timeline.prototype.getBefore = function(t) {
            var e = this._timeline.length;
            if (0 < e && this._timeline[e - 1].time < t) return this._timeline[e - 1];
            var n = this._search(t);
            return 0 <= n - 1 ? this._timeline[n - 1] : null
        }, e.Timeline.prototype.cancel = function(t) {
            if (1 < this._timeline.length) {
                var e = this._search(t);
                if (0 <= e)
                    if (this._timeline[e].time === t) {
                        for (var n = e; 0 <= n && this._timeline[n].time === t; n--) e = n;
                        this._timeline = this._timeline.slice(0, e)
                    } else this._timeline = this._timeline.slice(0, e + 1);
                else this._timeline = []
            } else 1 === this._timeline.length && this._timeline[0].time >= t && (this._timeline = []);
            return this
        }, e.Timeline.prototype.cancelBefore = function(t) {
            if (this._timeline.length) {
                var e = this._search(t);
                0 <= e && (this._timeline = this._timeline.slice(e + 1))
            }
            return this
        }, e.Timeline.prototype._search = function(t) {
            var e = 0,
                n = this._timeline.length,
                i = n;
            if (0 < n && this._timeline[n - 1].time <= t) return n - 1;
            for (; e < i;) {
                var o = Math.floor(e + (i - e) / 2),
                    r = this._timeline[o],
                    s = this._timeline[o + 1];
                if (r.time === t) {
                    for (var a = o; a < this._timeline.length; a++) this._timeline[a].time === t && (o = a);
                    return o
                }
                if (r.time < t && s.time > t) return o;
                r.time > t ? i = o : r.time < t && (e = o + 1)
            }
            return -1
        }, e.Timeline.prototype._iterate = function(t, e, n) {
            this._iterating = !0, e = this.defaultArg(e, 0), n = this.defaultArg(n, this._timeline.length - 1);
            for (var i = e; i <= n; i++) t(this._timeline[i]);
            if (this._iterating = !1, 0 < this._toRemove.length) {
                for (var o = 0; o < this._toRemove.length; o++) {
                    var r = this._timeline.indexOf(this._toRemove[o]); - 1 !== r && this._timeline.splice(r, 1)
                }
                this._toRemove = []
            }
        }, e.Timeline.prototype.forEach = function(t) {
            return this._iterate(t), this
        }, e.Timeline.prototype.forEachBefore = function(t, e) {
            var n = this._search(t);
            return -1 !== n && this._iterate(e, 0, n), this
        }, e.Timeline.prototype.forEachAfter = function(t, e) {
            var n = this._search(t);
            return this._iterate(e, n + 1), this
        }, e.Timeline.prototype.forEachFrom = function(t, e) {
            for (var n = this._search(t); 0 <= n && this._timeline[n].time >= t;) n--;
            return this._iterate(e, n + 1), this
        }, e.Timeline.prototype.forEachAtTime = function(e, n) {
            var t = this._search(e);
            return -1 !== t && this._iterate(function(t) {
                t.time === e && n(t)
            }, 0, t), this
        }, e.Timeline.prototype.dispose = function() {
            e.prototype.dispose.call(this), this._timeline = null, this._toRemove = null
        }, e.Timeline
    }.apply(e, i)) || (t.exports = o)
}, function(t, e, n) {
    var i, o;
    i = [n(0), n(3), n(2)], void 0 === (o = function(t) {
        "use strict";
        return t.Negate = function() {
            this._multiply = this.input = this.output = new t.Multiply(-1)
        }, t.extend(t.Negate, t.SignalBase), t.Negate.prototype.dispose = function() {
            return t.prototype.dispose.call(this), this._multiply.dispose(), this._multiply = null, this
        }, t.Negate
    }.apply(e, i)) || (t.exports = o)
}, function(t, e, n) {
    var i, o;
    i = [n(0), n(2), n(3), n(5)], void 0 === (o = function(t) {
        "use strict";
        return t.GreaterThanZero = function() {
            this._thresh = this.output = new t.WaveShaper(function(t) {
                return t <= 0 ? 0 : 1
            }, 127), this._scale = this.input = new t.Multiply(1e4), this._scale.connect(this._thresh)
        }, t.extend(t.GreaterThanZero, t.SignalBase), t.GreaterThanZero.prototype.dispose = function() {
            return t.prototype.dispose.call(this), this._scale.dispose(), this._scale = null, this._thresh.dispose(), this._thresh = null, this
        }, t.GreaterThanZero
    }.apply(e, i)) || (t.exports = o)
}, function(t, e, n) {
    var i, o;
    i = [n(0), n(14), n(66), n(18), n(12)], void 0 === (o = function(o) {
        "use strict";
        return o.Clock = function() {
            o.Emitter.call(this);
            var t = this.optionsObject(arguments, ["callback", "frequency"], o.Clock.defaults);
            this.callback = t.callback, this._nextTick = 0, this._lastState = o.State.Stopped, this.frequency = new o.TimelineSignal(t.frequency, o.Type.Frequency), this._readOnly("frequency"), this.ticks = 0, this._state = new o.TimelineState(o.State.Stopped), this._boundLoop = this._loop.bind(this), this.context.on("tick", this._boundLoop)
        }, o.extend(o.Clock, o.Emitter), o.Clock.defaults = {
            callback: o.noOp,
            frequency: 1,
            lookAhead: "auto"
        }, Object.defineProperty(o.Clock.prototype, "state", {
            get: function() {
                return this._state.getValueAtTime(this.now())
            }
        }), o.Clock.prototype.start = function(t, e) {
            return t = this.toSeconds(t), this._state.getValueAtTime(t) !== o.State.Started && this._state.add({
                state: o.State.Started,
                time: t,
                offset: e
            }), this
        }, o.Clock.prototype.stop = function(t) {
            return t = this.toSeconds(t), this._state.cancel(t), this._state.setStateAtTime(o.State.Stopped, t), this
        }, o.Clock.prototype.pause = function(t) {
            return t = this.toSeconds(t), this._state.getValueAtTime(t) === o.State.Started && this._state.setStateAtTime(o.State.Paused, t), this
        }, o.Clock.prototype._loop = function() {
            for (var t = this.now() + this.context.lookAhead + this.context.updateInterval + 2 * this.context.lag; t > this._nextTick && this._state;) {
                var e = this._state.getValueAtTime(this._nextTick);
                if (e !== this._lastState) {
                    this._lastState = e;
                    var n = this._state.get(this._nextTick);
                    e === o.State.Started ? (this._nextTick = n.time, this.isUndef(n.offset) || (this.ticks = n.offset), this.emit("start", n.time, this.ticks)) : e === o.State.Stopped ? (this.ticks = 0, this.emit("stop", n.time)) : e === o.State.Paused && this.emit("pause", n.time)
                }
                var i = this._nextTick;
                this.frequency && (this._nextTick += 1 / this.frequency.getValueAtTime(this._nextTick), e === o.State.Started && (this.callback(i), this.ticks++))
            }
        }, o.Clock.prototype.getStateAtTime = function(t) {
            return t = this.toSeconds(t), this._state.getValueAtTime(t)
        }, o.Clock.prototype.dispose = function() {
            o.Emitter.prototype.dispose.call(this), this.context.off("tick", this._boundLoop), this._writable("frequency"), this.frequency.dispose(), this.frequency = null, this._boundLoop = null, this._nextTick = 1 / 0, this.callback = null, this._state.dispose(), this._state = null
        }, o.Clock
    }.apply(e, i)) || (t.exports = o)
}, function(t, e, i) {
    "use strict";
    var n;
    void 0 === (n = function(t) {
        var n = i(1),
            e = i(29),
            r = i(6).noteToFreq;
        p5.MonoSynth = function() {
            e.call(this), this.oscillator = new p5.Oscillator, this.env = new p5.Envelope, this.env.setRange(1, 0), this.env.setExp(!0), this.setADSR(.02, .25, .05, .35), this.oscillator.disconnect(), this.oscillator.connect(this.output), this.env.disconnect(), this.env.setInput(this.output.gain), this.oscillator.output.gain.value = 1, this.oscillator.start(), this.connect(), n.soundArray.push(this)
        }, p5.MonoSynth.prototype = Object.create(p5.AudioVoice.prototype), p5.MonoSynth.prototype.play = function(t, e, n, i) {
            this.triggerAttack(t, e, ~~n), this.triggerRelease(~~n + (i || .15))
        }, p5.MonoSynth.prototype.triggerAttack = function(t, e, n) {
            n = ~~n;
            var i = r(t),
                o = e || .1;
            this.oscillator.freq(i, 0, n), this.env.ramp(this.output.gain, n, o)
        }, p5.MonoSynth.prototype.triggerRelease = function(t) {
            t = t || 0;
            this.env.ramp(this.output.gain, t, 0)
        }, p5.MonoSynth.prototype.setADSR = function(t, e, n, i) {
            this.env.setADSR(t, e, n, i)
        }, Object.defineProperties(p5.MonoSynth.prototype, {
            attack: {
                get: function() {
                    return this.env.aTime
                },
                set: function(t) {
                    this.env.setADSR(t, this.env.dTime, this.env.sPercent, this.env.rTime)
                }
            },
            decay: {
                get: function() {
                    return this.env.dTime
                },
                set: function(t) {
                    this.env.setADSR(this.env.aTime, t, this.env.sPercent, this.env.rTime)
                }
            },
            sustain: {
                get: function() {
                    return this.env.sPercent
                },
                set: function(t) {
                    this.env.setADSR(this.env.aTime, this.env.dTime, t, this.env.rTime)
                }
            },
            release: {
                get: function() {
                    return this.env.rTime
                },
                set: function(t) {
                    this.env.setADSR(this.env.aTime, this.env.dTime, this.env.sPercent, t)
                }
            }
        }), p5.MonoSynth.prototype.amp = function(t, e) {
            var n = e || 0;
            return void 0 !== t && this.oscillator.amp(t, n), this.oscillator.amp().value
        }, p5.MonoSynth.prototype.connect = function(t) {
            var e = t || n.input;
            this.output.connect(e.input ? e.input : e)
        }, p5.MonoSynth.prototype.disconnect = function() {
            this.output && this.output.disconnect()
        }, p5.MonoSynth.prototype.dispose = function() {
            e.prototype.dispose.apply(this), this.env && this.env.dispose(), this.oscillator && this.oscillator.dispose()
        }
    }.call(e, i, e, t)) || (t.exports = n)
}, function(t, e, i) {
    "use strict";
    var n;
    void 0 === (n = function() {
        var n = i(1);
        return p5.AudioVoice = function() {
            this.ac = n.audiocontext, this.output = this.ac.createGain(), this.connect(), n.soundArray.push(this)
        }, p5.AudioVoice.prototype.play = function(t, e, n, i) {}, p5.AudioVoice.prototype.triggerAttack = function(t, e, n) {}, p5.AudioVoice.prototype.triggerRelease = function(t) {}, p5.AudioVoice.prototype.amp = function(t, e) {}, p5.AudioVoice.prototype.connect = function(t) {
            var e = t || n.input;
            this.output.connect(e.input ? e.input : e)
        }, p5.AudioVoice.prototype.disconnect = function() {
            this.output.disconnect()
        }, p5.AudioVoice.prototype.dispose = function() {
            this.output && (this.output.disconnect(), delete this.output)
        }, p5.AudioVoice
    }.call(e, i, e, t)) || (t.exports = n)
}, function(t, e, n) {
    "use strict";
    var i;
    void 0 === (i = function(t) {
        var c = n(1),
            h = n(14),
            l = n(6).noteToFreq;
        p5.PolySynth = function(t, e) {
            this.audiovoices = [], this.notes = {}, this._newest = 0, this._oldest = 0, this.maxVoices = e || 8, this.AudioVoice = void 0 === t ? p5.MonoSynth : t, this._voicesInUse = new h(0), this.output = c.audiocontext.createGain(), this.connect(), this._allocateVoices(), c.soundArray.push(this)
        }, p5.PolySynth.prototype._allocateVoices = function() {
            for (var t = 0; t < this.maxVoices; t++) this.audiovoices.push(new this.AudioVoice), this.audiovoices[t].disconnect(), this.audiovoices[t].connect(this.output)
        }, p5.PolySynth.prototype.play = function(t, e, n, i) {
            i = i || 1;
            this.noteAttack(t, e, n), this.noteRelease(t, n + i)
        }, p5.PolySynth.prototype.noteADSR = function(t, e, n, i, o, r) {
            var s = c.audiocontext.currentTime + (r = r || 0);
            this.audiovoices[this.notes[t].getValueAtTime(s)].setADSR(e, n, i, o)
        }, p5.PolySynth.prototype.setADSR = function(e, n, i, o) {
            this.audiovoices.forEach(function(t) {
                t.setADSR(e, n, i, o)
            })
        }, p5.PolySynth.prototype.noteAttack = function(t, e, n) {
            n = ~~n;
            var i, o = c.audiocontext.currentTime + n,
                r = l(t),
                s = e || .1;
            if (this.notes[r] && null !== this.notes[r].getValueAtTime(o) && this.noteRelease(r, 0), this._voicesInUse.getValueAtTime(o) < this.maxVoices) i = Math.max(~~this._voicesInUse.getValueAtTime(o), 0);
            else {
                i = this._oldest;
                var a = p5.prototype.freqToMidi(this.audiovoices[this._oldest].oscillator.freq().value);
                this.noteRelease(a), this._oldest = (this._oldest + 1) % (this.maxVoices - 1)
            }
            this.notes[r] = new h, this.notes[r].setValueAtTime(i, o);
            var u = null === this._voicesInUse._searchBefore(o) ? 0 : this._voicesInUse._searchBefore(o).value;
            if (this._voicesInUse.setValueAtTime(u + 1, o), this._updateAfter(o, 1), this._newest = i, "number" == typeof s) {
                var p = 1 / this._voicesInUse.getValueAtTime(o) * 2;
                s = p < s ? p : s
            }
            this.audiovoices[i].triggerAttack(r, s, n)
        }, p5.PolySynth.prototype._updateAfter = function(t, e) {
            if (null !== this._voicesInUse._searchAfter(t)) {
                this._voicesInUse._searchAfter(t).value += e;
                var n = this._voicesInUse._searchAfter(t).time;
                this._updateAfter(n, e)
            }
        }, p5.PolySynth.prototype.noteRelease = function(t, e) {
            var n = c.audiocontext.currentTime,
                i = e || 0,
                o = n + i;
            if (t) {
                var r = l(t);
                if (this.notes[r] && null !== this.notes[r].getValueAtTime(o)) {
                    var s = Math.max(~~this._voicesInUse.getValueAtTime(o).value, 1);
                    this._voicesInUse.setValueAtTime(s - 1, o), 0 < s && this._updateAfter(o, -1), this.audiovoices[this.notes[r].getValueAtTime(o)].triggerRelease(i), this.notes[r].dispose(), delete this.notes[r], this._newest = 0 === this._newest ? 0 : (this._newest - 1) % (this.maxVoices - 1)
                } else;
            } else
                for (var a in this.audiovoices.forEach(function(t) {
                        t.triggerRelease(i)
                    }), this._voicesInUse.setValueAtTime(0, o), this.notes) this.notes[a].dispose(), delete this.notes[a]
        }, p5.PolySynth.prototype.connect = function(t) {
            var e = t || c.input;
            this.output.connect(e.input ? e.input : e)
        }, p5.PolySynth.prototype.disconnect = function() {
            this.output && this.output.disconnect()
        }, p5.PolySynth.prototype.dispose = function() {
            this.audiovoices.forEach(function(t) {
                t.dispose()
            }), this.output && (this.output.disconnect(), delete this.output)
        }
    }.call(e, n, e, t)) || (t.exports = i)
}, function(t, e, n) {
    "use strict";
    var i;
    void 0 === (i = function(t) {
        n(32), n(33), n(17);
        var e = n(1);
        return n(6), n(11), n(36), n(40), n(41), n(42), n(43), n(44), n(23), n(47), n(48), n(49), n(50), n(15), n(59), n(61), n(62), n(63), n(64), n(65), n(67), n(68), n(69), n(70), n(71), n(72), n(28), n(30), n(73), n(29), n(28), n(30), e
    }.call(e, n, e, t)) || (t.exports = i)
}, function(t, e) {
    function c(t) {
        var i = this,
            o = {},
            r = -1;
        this.parameters.forEach(function(t, e) {
            var n = a[++r] || (a[r] = new Float32Array(i.bufferSize));
            n.fill(t.value), o[e] = n
        }), this.processor.realm.exec("self.sampleRate=sampleRate=" + this.context.sampleRate + ";self.currentTime=currentTime=" + this.context.currentTime);
        var e = s(t.inputBuffer),
            n = s(t.outputBuffer);
        this.instance.process([e], [n], o)
    }

    function s(t) {
        for (var e = [], n = 0; n < t.numberOfChannels; n++) e[n] = t.getChannelData(n);
        return e
    }

    function h(t) {
        return t.$$processors || (t.$$processors = {})
    }

    function n(t) {
        this.$$context = t
    }
    var l, a;
    a = [], "function" != typeof AudioWorkletNode && (self.AudioWorkletNode = function(t, e, n) {
        var i = h(t)[e],
            o = t.createScriptProcessor(void 0, 2, n && n.outputChannelCount ? n.outputChannelCount[0] : 2);
        if (o.parameters = new Map, i.properties)
            for (var r = 0; r < i.properties.length; r++) {
                var s = i.properties[r],
                    a = t.createGain().gain;
                a.value = s.defaultValue, o.parameters.set(s.name, a)
            }
        var u = new MessageChannel;
        l = u.port2;
        var p = new i.Processor(n || {});
        return l = null, o.port = u.port1, o.processor = i, o.instance = p, o.onaudioprocess = c, o
    }, Object.defineProperty((self.AudioContext || self.webkitAudioContext).prototype, "audioWorklet", {
        get: function() {
            return this.$$audioWorklet || (this.$$audioWorklet = new self.AudioWorklet(this))
        }
    }), self.AudioWorklet = (n.prototype.addModule = function(t, e) {
        var o = this;
        return fetch(t).then(function(t) {
            if (!t.ok) throw Error(t.status);
            return t.text()
        }).then(function(t) {
            var n = {
                    sampleRate: 0,
                    currentTime: 0,
                    AudioWorkletProcessor: function() {
                        this.port = l
                    },
                    registerProcessor: function(t, e) {
                        h(o.$$context)[t] = {
                            realm: i,
                            context: n,
                            Processor: e,
                            properties: e.parameterDescriptors || []
                        }
                    }
                },
                i = new function(t, e) {
                    var n = document.createElement("iframe");
                    n.style.cssText = "position:absolute;left:0;top:-999px;width:1px;height:1px;", e.appendChild(n);
                    var i = n.contentWindow,
                        o = i.document,
                        r = "var window,$hook";
                    for (var s in i) s in t || "eval" === s || (r += ",", r += s);
                    for (var a in t) r += ",", r += a, r += "=self.", r += a;
                    var u = o.createElement("script");
                    u.appendChild(o.createTextNode('function $hook(self,console) {"use strict";\n        ' + r + ";return function() {return eval(arguments[0])}}")), o.body.appendChild(u), this.exec = i.$hook(t, console)
                }(n.self = n, document.documentElement);
            return i.exec((e && e.transpile || String)(t)), null
        })
    }, n))
}, function(t, e, n) {
    "use strict";
    var i;
    void 0 === (i = function() {
        function n(t) {
            t && (t.setTargetAtTime || (t.setTargetAtTime = t.setTargetValueAtTime))
        }
        window, window.hasOwnProperty("webkitAudioContext") && !window.hasOwnProperty("AudioContext") && (window.AudioContext = window.webkitAudioContext, "function" != typeof AudioContext.prototype.createGain && (AudioContext.prototype.createGain = AudioContext.prototype.createGainNode), "function" != typeof AudioContext.prototype.createDelay && (AudioContext.prototype.createDelay = AudioContext.prototype.createDelayNode), "function" != typeof AudioContext.prototype.createScriptProcessor && (AudioContext.prototype.createScriptProcessor = AudioContext.prototype.createJavaScriptNode), "function" != typeof AudioContext.prototype.createPeriodicWave && (AudioContext.prototype.createPeriodicWave = AudioContext.prototype.createWaveTable), AudioContext.prototype.internal_createGain = AudioContext.prototype.createGain, AudioContext.prototype.createGain = function() {
            var t = this.internal_createGain();
            return n(t.gain), t
        }, AudioContext.prototype.internal_createDelay = AudioContext.prototype.createDelay, AudioContext.prototype.createDelay = function(t) {
            var e = t ? this.internal_createDelay(t) : this.internal_createDelay();
            return n(e.delayTime), e
        }, AudioContext.prototype.internal_createBufferSource = AudioContext.prototype.createBufferSource, AudioContext.prototype.createBufferSource = function() {
            var i = this.internal_createBufferSource();
            return i.start ? (i.internal_start = i.start, i.start = function(t, e, n) {
                void 0 !== n ? i.internal_start(t || 0, e, n) : i.internal_start(t || 0, e || 0)
            }) : i.start = function(t, e, n) {
                e || n ? this.noteGrainOn(t || 0, e, n) : this.noteOn(t || 0)
            }, i.stop ? (i.internal_stop = i.stop, i.stop = function(t) {
                i.internal_stop(t || 0)
            }) : i.stop = function(t) {
                this.noteOff(t || 0)
            }, n(i.playbackRate), i
        }, AudioContext.prototype.internal_createDynamicsCompressor = AudioContext.prototype.createDynamicsCompressor, AudioContext.prototype.createDynamicsCompressor = function() {
            var t = this.internal_createDynamicsCompressor();
            return n(t.threshold), n(t.knee), n(t.ratio), n(t.reduction), n(t.attack), n(t.release), t
        }, AudioContext.prototype.internal_createBiquadFilter = AudioContext.prototype.createBiquadFilter, AudioContext.prototype.createBiquadFilter = function() {
            var t = this.internal_createBiquadFilter();
            return n(t.frequency), n(t.detune), n(t.Q), n(t.gain), t
        }, "function" != typeof AudioContext.prototype.createOscillator && (AudioContext.prototype.internal_createOscillator = AudioContext.prototype.createOscillator, AudioContext.prototype.createOscillator = function() {
            var e = this.internal_createOscillator();
            return e.start ? (e.internal_start = e.start, e.start = function(t) {
                e.internal_start(t || 0)
            }) : e.start = function(t) {
                this.noteOn(t || 0)
            }, e.stop ? (e.internal_stop = e.stop, e.stop = function(t) {
                e.internal_stop(t || 0)
            }) : e.stop = function(t) {
                this.noteOff(t || 0)
            }, e.setPeriodicWave || (e.setPeriodicWave = e.setWaveTable), n(e.frequency), n(e.detune), e
        })), window.hasOwnProperty("webkitOfflineAudioContext") && !window.hasOwnProperty("OfflineAudioContext") && (window.OfflineAudioContext = window.webkitOfflineAudioContext), navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        var e = document.createElement("audio");
        p5.prototype.isSupported = function() {
            return !!e.canPlayType
        };
        p5.prototype.isFileSupported = function(t) {
            switch (t.toLowerCase()) {
                case "mp3":
                    return !!e.canPlayType && e.canPlayType("audio/mpeg;");
                case "wav":
                    return !!e.canPlayType && e.canPlayType('audio/wav; codecs="1"');
                case "ogg":
                    return !!e.canPlayType && e.canPlayType('audio/ogg; codecs="vorbis"');
                case "aac":
                case "m4a":
                case "mp4":
                    return !!e.canPlayType && (e.canPlayType("audio/x-m4a;") || e.canPlayType("audio/aac;"));
                case "aif":
                case "aiff":
                    return !!e.canPlayType && e.canPlayType("audio/x-aiff;");
                default:
                    return !1
            }
        }
    }.call(e, n, e, t)) || (t.exports = i)
}, function(t, e) {
    var n;
    n = function() {
        return this
    }();
    try {
        n = n || new Function("return this")()
    } catch (t) {
        "object" == typeof window && (n = window)
    }
    t.exports = n
}, function(t, e, n) {
    var i, o, r;
    o = [], void 0 === (r = "function" == typeof(i = function() {
        var s = function(t, e) {
            this._dragged = !1, this._element = t, this._bindedMove = this._moved.bind(this), this._bindedEnd = this._ended.bind(this, e), t.addEventListener("touchstart", this._bindedEnd), t.addEventListener("touchmove", this._bindedMove), t.addEventListener("touchend", this._bindedEnd), t.addEventListener("mouseup", this._bindedEnd)
        };

        function r(t) {
            return "running" === t.state
        }
        return s.prototype._moved = function(t) {
                this._dragged = !0
            }, s.prototype._ended = function(t) {
                this._dragged || function(t) {
                    var e = t.createBuffer(1, 1, t.sampleRate),
                        n = t.createBufferSource();
                    n.buffer = e, n.connect(t.destination), n.start(0), t.resume && t.resume()
                }(t), this._dragged = !1
            }, s.prototype.dispose = function() {
                this._element.removeEventListener("touchstart", this._bindedEnd), this._element.removeEventListener("touchmove", this._bindedMove), this._element.removeEventListener("touchend", this._bindedEnd), this._element.removeEventListener("mouseup", this._bindedEnd), this._bindedMove = null, this._bindedEnd = null, this._element = null
            },
            function(e, t, n) {
                var i = new Promise(function(t) {
                        ! function(e, n) {
                            r(e) ? n() : function t() {
                                r(e) ? n() : (requestAnimationFrame(t), e.resume && e.resume())
                            }()
                        }(e, t)
                    }),
                    o = [];
                return function t(e, n, i) {
                    if (Array.isArray(e) || NodeList && e instanceof NodeList)
                        for (var o = 0; o < e.length; o++) t(e[o], n, i);
                    else if ("string" == typeof e) t(document.querySelectorAll(e), n, i);
                    else if (e.jquery && "function" == typeof e.toArray) t(e.toArray(), n, i);
                    else if (Element && e instanceof Element) {
                        var r = new s(e, i);
                        n.push(r)
                    }
                }(t = t || document.body, o, e), i.then(function() {
                    for (var t = 0; t < o.length; t++) o[t].dispose();
                    o = null, n && n()
                }), i
            }
    }) ? i.apply(e, o) : i) || (t.exports = r)
}, function(t, e, n) {
    var i = n(1),
        o = [n(37).default, n(38).default, n(39).default],
        r = i.audiocontext,
        s = !1;
    p5.prototype.registerMethod("init", function() {
        if (!s) {
            this.preload || window.preload || (this.preload = function() {}), this._incrementPreload();
            var t = function() {
                s = !0, this._decrementPreload()
            }.bind(this);
            Promise.all(o.map(function(t) {
                var e = new Blob([t], {
                        type: "application/javascript"
                    }),
                    n = URL.createObjectURL(e);
                return r.audioWorklet.addModule(n)
            })).then(t)
        }
    })
}, function(t, e, n) {
    "use strict";
    n.r(e), e.default = 'function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called"); } return self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }\n\nfunction isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }\n\nfunction _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n// import dependencies via preval.require so that they\'re available as values at compile time\nvar processorNames = {\n  "recorderProcessor": "recorder-processor",\n  "soundFileProcessor": "sound-file-processor",\n  "amplitudeProcessor": "amplitude-processor"\n};\nvar RingBuffer = {\n  "default":\n  /*#__PURE__*/\n  function () {\n    /**\n     * @constructor\n     * @param  {number} length Buffer length in frames.\n     * @param  {number} channelCount Buffer channel count.\n     */\n    function RingBuffer(length, channelCount) {\n      _classCallCheck(this, RingBuffer);\n\n      this._readIndex = 0;\n      this._writeIndex = 0;\n      this._framesAvailable = 0;\n      this._channelCount = channelCount;\n      this._length = length;\n      this._channelData = [];\n\n      for (var i = 0; i < this._channelCount; ++i) {\n        this._channelData[i] = new Float32Array(length);\n      }\n    }\n    /**\n     * Getter for Available frames in buffer.\n     *\n     * @return {number} Available frames in buffer.\n     */\n\n\n    _createClass(RingBuffer, [{\n      key: "push",\n\n      /**\n       * Push a sequence of Float32Arrays to buffer.\n       *\n       * @param  {array} arraySequence A sequence of Float32Arrays.\n       */\n      value: function push(arraySequence) {\n        // The channel count of arraySequence and the length of each channel must\n        // match with this buffer obejct.\n        // Transfer data from the |arraySequence| storage to the internal buffer.\n        var sourceLength = arraySequence[0].length;\n\n        for (var i = 0; i < sourceLength; ++i) {\n          var writeIndex = (this._writeIndex + i) % this._length;\n\n          for (var channel = 0; channel < this._channelCount; ++channel) {\n            this._channelData[channel][writeIndex] = arraySequence[channel][i];\n          }\n        }\n\n        this._writeIndex += sourceLength;\n\n        if (this._writeIndex >= this._length) {\n          this._writeIndex = 0;\n        } // For excessive frames, the buffer will be overwritten.\n\n\n        this._framesAvailable += sourceLength;\n\n        if (this._framesAvailable > this._length) {\n          this._framesAvailable = this._length;\n        }\n      }\n      /**\n       * Pull data out of buffer and fill a given sequence of Float32Arrays.\n       *\n       * @param  {array} arraySequence An array of Float32Arrays.\n       */\n\n    }, {\n      key: "pull",\n      value: function pull(arraySequence) {\n        // The channel count of arraySequence and the length of each channel must\n        // match with this buffer obejct.\n        // If the FIFO is completely empty, do nothing.\n        if (this._framesAvailable === 0) {\n          return;\n        }\n\n        var destinationLength = arraySequence[0].length; // Transfer data from the internal buffer to the |arraySequence| storage.\n\n        for (var i = 0; i < destinationLength; ++i) {\n          var readIndex = (this._readIndex + i) % this._length;\n\n          for (var channel = 0; channel < this._channelCount; ++channel) {\n            arraySequence[channel][i] = this._channelData[channel][readIndex];\n          }\n        }\n\n        this._readIndex += destinationLength;\n\n        if (this._readIndex >= this._length) {\n          this._readIndex = 0;\n        }\n\n        this._framesAvailable -= destinationLength;\n\n        if (this._framesAvailable < 0) {\n          this._framesAvailable = 0;\n        }\n      }\n    }, {\n      key: "framesAvailable",\n      get: function get() {\n        return this._framesAvailable;\n      }\n    }]);\n\n    return RingBuffer;\n  }()\n}["default"];\n\nvar RecorderProcessor =\n/*#__PURE__*/\nfunction (_AudioWorkletProcesso) {\n  _inherits(RecorderProcessor, _AudioWorkletProcesso);\n\n  function RecorderProcessor(options) {\n    var _this;\n\n    _classCallCheck(this, RecorderProcessor);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(RecorderProcessor).call(this));\n    var processorOptions = options.processorOptions || {};\n    _this.numOutputChannels = options.outputChannelCount || 2;\n    _this.numInputChannels = processorOptions.numInputChannels || 2;\n    _this.bufferSize = processorOptions.bufferSize || 1024;\n    _this.recording = false;\n\n    _this.clear();\n\n    _this.port.onmessage = function (event) {\n      var data = event.data;\n\n      if (data.name === \'start\') {\n        _this.record(data.duration);\n      } else if (data.name === \'stop\') {\n        _this.stop();\n      }\n    };\n\n    return _this;\n  }\n\n  _createClass(RecorderProcessor, [{\n    key: "process",\n    value: function process(inputs) {\n      if (!this.recording) {\n        return true;\n      } else if (this.sampleLimit && this.recordedSamples >= this.sampleLimit) {\n        this.stop();\n        return true;\n      }\n\n      var input = inputs[0];\n      this.inputRingBuffer.push(input);\n\n      if (this.inputRingBuffer.framesAvailable >= this.bufferSize) {\n        this.inputRingBuffer.pull(this.inputRingBufferArraySequence);\n\n        for (var channel = 0; channel < this.numOutputChannels; ++channel) {\n          var inputChannelCopy = this.inputRingBufferArraySequence[channel].slice();\n\n          if (channel === 0) {\n            this.leftBuffers.push(inputChannelCopy);\n\n            if (this.numInputChannels === 1) {\n              this.rightBuffers.push(inputChannelCopy);\n            }\n          } else if (channel === 1 && this.numInputChannels > 1) {\n            this.rightBuffers.push(inputChannelCopy);\n          }\n        }\n\n        this.recordedSamples += this.bufferSize;\n      }\n\n      return true;\n    }\n  }, {\n    key: "record",\n    value: function record(duration) {\n      if (duration) {\n        this.sampleLimit = Math.round(duration * sampleRate);\n      }\n\n      this.recording = true;\n    }\n  }, {\n    key: "stop",\n    value: function stop() {\n      this.recording = false;\n      var buffers = this.getBuffers();\n      var leftBuffer = buffers[0].buffer;\n      var rightBuffer = buffers[1].buffer;\n      this.port.postMessage({\n        name: \'buffers\',\n        leftBuffer: leftBuffer,\n        rightBuffer: rightBuffer\n      }, [leftBuffer, rightBuffer]);\n      this.clear();\n    }\n  }, {\n    key: "getBuffers",\n    value: function getBuffers() {\n      var buffers = [];\n      buffers.push(this.mergeBuffers(this.leftBuffers));\n      buffers.push(this.mergeBuffers(this.rightBuffers));\n      return buffers;\n    }\n  }, {\n    key: "mergeBuffers",\n    value: function mergeBuffers(channelBuffer) {\n      var result = new Float32Array(this.recordedSamples);\n      var offset = 0;\n      var lng = channelBuffer.length;\n\n      for (var i = 0; i < lng; i++) {\n        var buffer = channelBuffer[i];\n        result.set(buffer, offset);\n        offset += buffer.length;\n      }\n\n      return result;\n    }\n  }, {\n    key: "clear",\n    value: function clear() {\n      var _this2 = this;\n\n      this.leftBuffers = [];\n      this.rightBuffers = [];\n      this.inputRingBuffer = new RingBuffer(this.bufferSize, this.numInputChannels);\n      this.inputRingBufferArraySequence = new Array(this.numInputChannels).fill(null).map(function () {\n        return new Float32Array(_this2.bufferSize);\n      });\n      this.recordedSamples = 0;\n      this.sampleLimit = null;\n    }\n  }]);\n\n  return RecorderProcessor;\n}(_wrapNativeSuper(AudioWorkletProcessor));\n\nregisterProcessor(processorNames.recorderProcessor, RecorderProcessor);'
}, function(t, e, n) {
    "use strict";
    n.r(e), e.default = 'function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called"); } return self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }\n\nfunction isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }\n\nfunction _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n// import dependencies via preval.require so that they\'re available as values at compile time\nvar processorNames = {\n  "recorderProcessor": "recorder-processor",\n  "soundFileProcessor": "sound-file-processor",\n  "amplitudeProcessor": "amplitude-processor"\n};\nvar RingBuffer = {\n  "default":\n  /*#__PURE__*/\n  function () {\n    /**\n     * @constructor\n     * @param  {number} length Buffer length in frames.\n     * @param  {number} channelCount Buffer channel count.\n     */\n    function RingBuffer(length, channelCount) {\n      _classCallCheck(this, RingBuffer);\n\n      this._readIndex = 0;\n      this._writeIndex = 0;\n      this._framesAvailable = 0;\n      this._channelCount = channelCount;\n      this._length = length;\n      this._channelData = [];\n\n      for (var i = 0; i < this._channelCount; ++i) {\n        this._channelData[i] = new Float32Array(length);\n      }\n    }\n    /**\n     * Getter for Available frames in buffer.\n     *\n     * @return {number} Available frames in buffer.\n     */\n\n\n    _createClass(RingBuffer, [{\n      key: "push",\n\n      /**\n       * Push a sequence of Float32Arrays to buffer.\n       *\n       * @param  {array} arraySequence A sequence of Float32Arrays.\n       */\n      value: function push(arraySequence) {\n        // The channel count of arraySequence and the length of each channel must\n        // match with this buffer obejct.\n        // Transfer data from the |arraySequence| storage to the internal buffer.\n        var sourceLength = arraySequence[0].length;\n\n        for (var i = 0; i < sourceLength; ++i) {\n          var writeIndex = (this._writeIndex + i) % this._length;\n\n          for (var channel = 0; channel < this._channelCount; ++channel) {\n            this._channelData[channel][writeIndex] = arraySequence[channel][i];\n          }\n        }\n\n        this._writeIndex += sourceLength;\n\n        if (this._writeIndex >= this._length) {\n          this._writeIndex = 0;\n        } // For excessive frames, the buffer will be overwritten.\n\n\n        this._framesAvailable += sourceLength;\n\n        if (this._framesAvailable > this._length) {\n          this._framesAvailable = this._length;\n        }\n      }\n      /**\n       * Pull data out of buffer and fill a given sequence of Float32Arrays.\n       *\n       * @param  {array} arraySequence An array of Float32Arrays.\n       */\n\n    }, {\n      key: "pull",\n      value: function pull(arraySequence) {\n        // The channel count of arraySequence and the length of each channel must\n        // match with this buffer obejct.\n        // If the FIFO is completely empty, do nothing.\n        if (this._framesAvailable === 0) {\n          return;\n        }\n\n        var destinationLength = arraySequence[0].length; // Transfer data from the internal buffer to the |arraySequence| storage.\n\n        for (var i = 0; i < destinationLength; ++i) {\n          var readIndex = (this._readIndex + i) % this._length;\n\n          for (var channel = 0; channel < this._channelCount; ++channel) {\n            arraySequence[channel][i] = this._channelData[channel][readIndex];\n          }\n        }\n\n        this._readIndex += destinationLength;\n\n        if (this._readIndex >= this._length) {\n          this._readIndex = 0;\n        }\n\n        this._framesAvailable -= destinationLength;\n\n        if (this._framesAvailable < 0) {\n          this._framesAvailable = 0;\n        }\n      }\n    }, {\n      key: "framesAvailable",\n      get: function get() {\n        return this._framesAvailable;\n      }\n    }]);\n\n    return RingBuffer;\n  }()\n}["default"];\n\nvar SoundFileProcessor =\n/*#__PURE__*/\nfunction (_AudioWorkletProcesso) {\n  _inherits(SoundFileProcessor, _AudioWorkletProcesso);\n\n  function SoundFileProcessor(options) {\n    var _this;\n\n    _classCallCheck(this, SoundFileProcessor);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(SoundFileProcessor).call(this));\n    var processorOptions = options.processorOptions || {};\n    _this.bufferSize = processorOptions.bufferSize || 256;\n    _this.inputRingBuffer = new RingBuffer(_this.bufferSize, 1);\n    _this.inputRingBufferArraySequence = [new Float32Array(_this.bufferSize)];\n    return _this;\n  }\n\n  _createClass(SoundFileProcessor, [{\n    key: "process",\n    value: function process(inputs) {\n      var input = inputs[0]; // we only care about the first input channel, because that contains the position data\n\n      this.inputRingBuffer.push([input[0]]);\n\n      if (this.inputRingBuffer.framesAvailable >= this.bufferSize) {\n        this.inputRingBuffer.pull(this.inputRingBufferArraySequence);\n        var inputChannel = this.inputRingBufferArraySequence[0];\n        var position = inputChannel[inputChannel.length - 1] || 0;\n        this.port.postMessage({\n          name: \'position\',\n          position: position\n        });\n      }\n\n      return true;\n    }\n  }]);\n\n  return SoundFileProcessor;\n}(_wrapNativeSuper(AudioWorkletProcessor));\n\nregisterProcessor(processorNames.soundFileProcessor, SoundFileProcessor);'
}, function(t, e, n) {
    "use strict";
    n.r(e), e.default = 'function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called"); } return self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }\n\nfunction isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }\n\nfunction _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n// import dependencies via preval.require so that they\'re available as values at compile time\nvar processorNames = {\n  "recorderProcessor": "recorder-processor",\n  "soundFileProcessor": "sound-file-processor",\n  "amplitudeProcessor": "amplitude-processor"\n};\nvar RingBuffer = {\n  "default":\n  /*#__PURE__*/\n  function () {\n    /**\n     * @constructor\n     * @param  {number} length Buffer length in frames.\n     * @param  {number} channelCount Buffer channel count.\n     */\n    function RingBuffer(length, channelCount) {\n      _classCallCheck(this, RingBuffer);\n\n      this._readIndex = 0;\n      this._writeIndex = 0;\n      this._framesAvailable = 0;\n      this._channelCount = channelCount;\n      this._length = length;\n      this._channelData = [];\n\n      for (var i = 0; i < this._channelCount; ++i) {\n        this._channelData[i] = new Float32Array(length);\n      }\n    }\n    /**\n     * Getter for Available frames in buffer.\n     *\n     * @return {number} Available frames in buffer.\n     */\n\n\n    _createClass(RingBuffer, [{\n      key: "push",\n\n      /**\n       * Push a sequence of Float32Arrays to buffer.\n       *\n       * @param  {array} arraySequence A sequence of Float32Arrays.\n       */\n      value: function push(arraySequence) {\n        // The channel count of arraySequence and the length of each channel must\n        // match with this buffer obejct.\n        // Transfer data from the |arraySequence| storage to the internal buffer.\n        var sourceLength = arraySequence[0].length;\n\n        for (var i = 0; i < sourceLength; ++i) {\n          var writeIndex = (this._writeIndex + i) % this._length;\n\n          for (var channel = 0; channel < this._channelCount; ++channel) {\n            this._channelData[channel][writeIndex] = arraySequence[channel][i];\n          }\n        }\n\n        this._writeIndex += sourceLength;\n\n        if (this._writeIndex >= this._length) {\n          this._writeIndex = 0;\n        } // For excessive frames, the buffer will be overwritten.\n\n\n        this._framesAvailable += sourceLength;\n\n        if (this._framesAvailable > this._length) {\n          this._framesAvailable = this._length;\n        }\n      }\n      /**\n       * Pull data out of buffer and fill a given sequence of Float32Arrays.\n       *\n       * @param  {array} arraySequence An array of Float32Arrays.\n       */\n\n    }, {\n      key: "pull",\n      value: function pull(arraySequence) {\n        // The channel count of arraySequence and the length of each channel must\n        // match with this buffer obejct.\n        // If the FIFO is completely empty, do nothing.\n        if (this._framesAvailable === 0) {\n          return;\n        }\n\n        var destinationLength = arraySequence[0].length; // Transfer data from the internal buffer to the |arraySequence| storage.\n\n        for (var i = 0; i < destinationLength; ++i) {\n          var readIndex = (this._readIndex + i) % this._length;\n\n          for (var channel = 0; channel < this._channelCount; ++channel) {\n            arraySequence[channel][i] = this._channelData[channel][readIndex];\n          }\n        }\n\n        this._readIndex += destinationLength;\n\n        if (this._readIndex >= this._length) {\n          this._readIndex = 0;\n        }\n\n        this._framesAvailable -= destinationLength;\n\n        if (this._framesAvailable < 0) {\n          this._framesAvailable = 0;\n        }\n      }\n    }, {\n      key: "framesAvailable",\n      get: function get() {\n        return this._framesAvailable;\n      }\n    }]);\n\n    return RingBuffer;\n  }()\n}["default"];\n\nvar AmplitudeProcessor =\n/*#__PURE__*/\nfunction (_AudioWorkletProcesso) {\n  _inherits(AmplitudeProcessor, _AudioWorkletProcesso);\n\n  function AmplitudeProcessor(options) {\n    var _this;\n\n    _classCallCheck(this, AmplitudeProcessor);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(AmplitudeProcessor).call(this));\n    var processorOptions = options.processorOptions || {};\n    _this.numOutputChannels = options.outputChannelCount || 1;\n    _this.numInputChannels = processorOptions.numInputChannels || 2;\n    _this.normalize = processorOptions.normalize || false;\n    _this.smoothing = processorOptions.smoothing || 0;\n    _this.bufferSize = processorOptions.bufferSize || 2048;\n    _this.inputRingBuffer = new RingBuffer(_this.bufferSize, _this.numInputChannels);\n    _this.outputRingBuffer = new RingBuffer(_this.bufferSize, _this.numOutputChannels);\n    _this.inputRingBufferArraySequence = new Array(_this.numInputChannels).fill(null).map(function () {\n      return new Float32Array(_this.bufferSize);\n    });\n    _this.stereoVol = [0, 0];\n    _this.stereoVolNorm = [0, 0];\n    _this.volMax = 0.001;\n\n    _this.port.onmessage = function (event) {\n      var data = event.data;\n\n      if (data.name === \'toggleNormalize\') {\n        _this.normalize = data.normalize;\n      } else if (data.name === \'smoothing\') {\n        _this.smoothing = Math.max(0, Math.min(1, data.smoothing));\n      }\n    };\n\n    return _this;\n  } // TO DO make this stereo / dependent on # of audio channels\n\n\n  _createClass(AmplitudeProcessor, [{\n    key: "process",\n    value: function process(inputs, outputs) {\n      var input = inputs[0];\n      var output = outputs[0];\n      var smoothing = this.smoothing;\n      this.inputRingBuffer.push(input);\n\n      if (this.inputRingBuffer.framesAvailable >= this.bufferSize) {\n        this.inputRingBuffer.pull(this.inputRingBufferArraySequence);\n\n        for (var channel = 0; channel < this.numInputChannels; ++channel) {\n          var inputBuffer = this.inputRingBufferArraySequence[channel];\n          var bufLength = inputBuffer.length;\n          var sum = 0;\n\n          for (var i = 0; i < bufLength; i++) {\n            var x = inputBuffer[i];\n\n            if (this.normalize) {\n              sum += Math.max(Math.min(x / this.volMax, 1), -1) * Math.max(Math.min(x / this.volMax, 1), -1);\n            } else {\n              sum += x * x;\n            }\n          } // ... then take the square root of the sum.\n\n\n          var rms = Math.sqrt(sum / bufLength);\n          this.stereoVol[channel] = Math.max(rms, this.stereoVol[channel] * smoothing);\n          this.volMax = Math.max(this.stereoVol[channel], this.volMax);\n        } // calculate stero normalized volume and add volume from all channels together\n\n\n        var volSum = 0;\n\n        for (var index = 0; index < this.stereoVol.length; index++) {\n          this.stereoVolNorm[index] = Math.max(Math.min(this.stereoVol[index] / this.volMax, 1), 0);\n          volSum += this.stereoVol[index];\n        } // volume is average of channels\n\n\n        var volume = volSum / this.stereoVol.length; // normalized value\n\n        var volNorm = Math.max(Math.min(volume / this.volMax, 1), 0);\n        this.port.postMessage({\n          name: \'amplitude\',\n          volume: volume,\n          volNorm: volNorm,\n          stereoVol: this.stereoVol,\n          stereoVolNorm: this.stereoVolNorm\n        }); // pass input through to output\n\n        this.outputRingBuffer.push(this.inputRingBufferArraySequence);\n      } // pull 128 frames out of the ring buffer\n      // if the ring buffer does not have enough frames, the output will be silent\n\n\n      this.outputRingBuffer.pull(output);\n      return true;\n    }\n  }]);\n\n  return AmplitudeProcessor;\n}(_wrapNativeSuper(AudioWorkletProcessor));\n\nregisterProcessor(processorNames.amplitudeProcessor, AmplitudeProcessor);'
}, function(t, e, n) {
    "use strict";
    var i;

    function o(t) {
        return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    void 0 === (i = function(t) {
        var a = n(1).audiocontext;
        void 0 !== a.createStereoPanner ? (p5.Panner = function(t, e) {
            this.stereoPanner = this.input = a.createStereoPanner(), t.connect(this.stereoPanner), this.stereoPanner.connect(e)
        }, p5.Panner.prototype.pan = function(t, e) {
            var n = e || 0,
                i = a.currentTime + n;
            this.stereoPanner.pan.linearRampToValueAtTime(t, i)
        }, p5.Panner.prototype.inputChannels = function() {}, p5.Panner.prototype.connect = function(t) {
            this.stereoPanner.connect(t)
        }, p5.Panner.prototype.disconnect = function() {
            this.stereoPanner && this.stereoPanner.disconnect()
        }) : (p5.Panner = function(t, e, n) {
            this.input = a.createGain(), t.connect(this.input), this.left = a.createGain(), this.right = a.createGain(), this.left.channelInterpretation = "discrete", this.right.channelInterpretation = "discrete", 1 < n ? (this.splitter = a.createChannelSplitter(2), this.input.connect(this.splitter), this.splitter.connect(this.left, 1), this.splitter.connect(this.right, 0)) : (this.input.connect(this.left), this.input.connect(this.right)), this.output = a.createChannelMerger(2), this.left.connect(this.output, 0, 1), this.right.connect(this.output, 0, 0), this.output.connect(e)
        }, p5.Panner.prototype.pan = function(t, e) {
            var n = e || 0,
                i = a.currentTime + n,
                o = (t + 1) / 2,
                r = Math.cos(o * Math.PI / 2),
                s = Math.sin(o * Math.PI / 2);
            this.left.gain.linearRampToValueAtTime(s, i), this.right.gain.linearRampToValueAtTime(r, i)
        }, p5.Panner.prototype.inputChannels = function(t) {
            1 === t ? (this.input.disconnect(), this.input.connect(this.left), this.input.connect(this.right)) : 2 === t && (o("undefined" === this.splitter) && (this.splitter = a.createChannelSplitter(2)), this.input.disconnect(), this.input.connect(this.splitter), this.splitter.connect(this.left, 1), this.splitter.connect(this.right, 0))
        }, p5.Panner.prototype.connect = function(t) {
            this.output.connect(t)
        }, p5.Panner.prototype.disconnect = function() {
            this.output && this.output.disconnect()
        })
    }.call(e, n, e, t)) || (t.exports = i)
}, function(t, e, o) {
    "use strict";
    var n;

    function l(t) {
        return (l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    void 0 === (n = function(t) {
        var a = o(11),
            u = o(1),
            p = u.audiocontext,
            e = o(6),
            n = e.midiToFreq,
            i = e.convertToWav,
            r = e.safeBufferSize,
            s = o(10);
        p5.SoundFile = function(t, e, n, i) {
            if (void 0 !== t) {
                if ("string" == typeof t || "string" == typeof t[0]) {
                    var o = p5.prototype._checkFileFormats(t);
                    this.url = o
                } else if ("object" === l(t) && !(window.File && window.FileReader && window.FileList && window.Blob)) throw "Unable to load file because the File API is not supported";
                t.file && (t = t.file), this.file = t
            }
            this._onended = function() {}, this._looping = !1, this._playing = !1, this._paused = !1, this._pauseTime = 0, this._cues = [], this._cueIDCounter = 0, this._lastPos = 0, this._counterNode = null, this._workletNode = null, this.bufferSourceNodes = [], this.bufferSourceNode = null, this.buffer = null, this.playbackRate = 1, this.input = u.audiocontext.createGain(), this.output = u.audiocontext.createGain(), this.reversed = !1, this.startTime = 0, this.endTime = null, this.pauseTime = 0, this.mode = "sustain", this.startMillis = null, this.panPosition = 0, this.panner = new p5.Panner(this.output, u.input, 2), (this.url || this.file) && this.load(e, n), u.soundArray.push(this), this._whileLoading = "function" == typeof i ? i : function() {}, this._clearOnEnd = function(t) {
                var e = t.target,
                    n = this;
                e._playing = !1, e.removeEventListener("ended", n._clearOnEnd), n._onended(n), n.bufferSourceNodes.map(function(t, e) {
                    return e
                }).reverse().forEach(function(t) {
                    !1 === n.bufferSourceNodes[t]._playing && n.bufferSourceNodes.splice(t, 1)
                }), 0 === n.bufferSourceNodes.length && (n._playing = !1)
            }.bind(this)
        }, p5.prototype.registerPreloadMethod("loadSound", p5.prototype), p5.prototype.loadSound = function(t, e, n, i) {
            -1 < window.location.origin.indexOf("file://") && "undefined" === window.cordova && window.alert("This sketch may require a server to load external files. Please see http://bit.ly/1qcInwS");
            var o = this;
            return new p5.SoundFile(t, function() {
                "function" == typeof e && e.apply(o, arguments), "function" == typeof o._decrementPreload && o._decrementPreload()
            }, n, i)
        }, p5.SoundFile.prototype.load = function(n, i) {
            var o = this,
                r = (new Error).stack;
            if (void 0 !== this.url && "" !== this.url) {
                var s = new XMLHttpRequest;
                s.addEventListener("progress", function(t) {
                    o._updateProgress(t)
                }, !1), s.open("GET", this.url, !0), s.responseType = "arraybuffer", s.onload = function() {
                    if (200 === s.status) {
                        if (!o.panner) return;
                        p.decodeAudioData(s.response, function(t) {
                            o.panner && (o.buffer = t, o.panner.inputChannels(t.numberOfChannels), n && n(o))
                        }, function() {
                            if (o.panner) {
                                var t = new a("decodeAudioData", r, o.url),
                                    e = "AudioContext error at decodeAudioData for " + o.url;
                                i && (t.msg = e, i(t))
                            }
                        })
                    } else {
                        if (!o.panner) return;
                        var t = new a("loadSound", r, o.url),
                            e = "Unable to load " + o.url + ". The request status was: " + s.status + " (" + s.statusText + ")";
                        i && (t.message = e, i(t))
                    }
                }, s.onerror = function() {
                    var t = new a("loadSound", r, o.url),
                        e = "There was no response from the server at " + o.url + ". Check the url and internet connectivity.";
                    i && (t.message = e, i(t))
                }, s.send()
            } else if (void 0 !== this.file) {
                var t = new FileReader;
                t.onload = function() {
                    o.panner && p.decodeAudioData(t.result, function(t) {
                        o.panner && (o.buffer = t, o.panner.inputChannels(t.numberOfChannels), n && n(o))
                    })
                }, t.onerror = function(t) {
                    o.panner && onerror && onerror(t)
                }, t.readAsArrayBuffer(this.file)
            }
        }, p5.SoundFile.prototype._updateProgress = function(t) {
            if (t.lengthComputable) {
                var e = t.loaded / t.total * .99;
                this._whileLoading(e, t)
            } else this._whileLoading("size unknown")
        }, p5.SoundFile.prototype.isLoaded = function() {
            return !!this.buffer
        }, p5.SoundFile.prototype.play = function(t, e, n, i, o) {
            if (this.output) {
                var r, s, a = t || 0;
                if (a < 0 && (a = 0), a += u.audiocontext.currentTime, void 0 !== e && this.rate(e), void 0 !== n && this.setVolume(n), !this.buffer) throw "not ready to play file, buffer has yet to load. Try preload()";
                if (this._pauseTime = 0, "restart" === this.mode && this.buffer && this.bufferSourceNode && (this.bufferSourceNode.stop(a), this._counterNode.stop(a)), "untildone" !== this.mode || !this.isPlaying()) {
                    if (this.bufferSourceNode = this._initSourceNode(), delete this._counterNode, this._counterNode = this._initCounterNode(), i) {
                        if (!(0 <= i && i < this.buffer.duration)) throw "start time out of range";
                        r = i
                    } else r = 0;
                    o = o && (o <= this.buffer.duration - r ? o : this.buffer.duration), this._paused ? (this.bufferSourceNode.start(a, this.pauseTime, o), this._counterNode.start(a, this.pauseTime, o)) : (this.bufferSourceNode.start(a, r, o), this._counterNode.start(a, r, o)), this._playing = !0, this._paused = !1, this.bufferSourceNodes.push(this.bufferSourceNode), this.bufferSourceNode._arrayIndex = this.bufferSourceNodes.length - 1, this.bufferSourceNode.addEventListener("ended", this._clearOnEnd), this.bufferSourceNode.loop = this._looping, this._counterNode.loop = this._looping, !0 === this._looping && (s = o || r - 1e-15, this.bufferSourceNode.loopStart = r, this.bufferSourceNode.loopEnd = s, this._counterNode.loopStart = r, this._counterNode.loopEnd = s)
                }
            }
        }, p5.SoundFile.prototype.playMode = function(t) {
            var e = t.toLowerCase();
            if ("restart" === e && this.buffer && this.bufferSourceNode)
                for (var n = 0; n < this.bufferSourceNodes.length - 1; n++) {
                    var i = u.audiocontext.currentTime;
                    this.bufferSourceNodes[n].stop(i)
                }
            if ("restart" !== e && "sustain" !== e && "untildone" !== e) throw 'Invalid play mode. Must be either "restart" or "sustain"';
            this.mode = e
        }, p5.SoundFile.prototype.pause = function(t) {
            var e = (t || 0) + u.audiocontext.currentTime;
            this.isPlaying() && this.buffer && this.bufferSourceNode ? (this._paused = !0, this._playing = !1, this.pauseTime = this.currentTime(), this.bufferSourceNode.stop(e), this._counterNode.stop(e), this._pauseTime = this.currentTime()) : this._pauseTime = 0
        }, p5.SoundFile.prototype.loop = function(t, e, n, i, o) {
            this._looping = !0, this.play(t, e, n, i, o)
        }, p5.SoundFile.prototype.setLoop = function(t) {
            if (!0 === t) this._looping = !0;
            else {
                if (!1 !== t) throw "Error: setLoop accepts either true or false";
                this._looping = !1
            }
            this.bufferSourceNode && (this.bufferSourceNode.loop = this._looping, this._counterNode.loop = this._looping)
        }, p5.SoundFile.prototype.isLooping = function() {
            return !!this.bufferSourceNode && (!0 === this._looping && !0 === this.isPlaying())
        }, p5.SoundFile.prototype.isPlaying = function() {
            return this._playing
        }, p5.SoundFile.prototype.isPaused = function() {
            return this._paused
        }, p5.SoundFile.prototype.stop = function(t) {
            var e = t || 0;
            if ("sustain" === this.mode || "untildone" === this.mode) this.stopAll(e), this._playing = !1, this.pauseTime = 0, this._paused = !1;
            else if (this.buffer && this.bufferSourceNode) {
                var n = u.audiocontext.currentTime,
                    i = e || 0;
                this.pauseTime = 0, this.bufferSourceNode.stop(n + i), this._counterNode.stop(n + i), this._playing = !1, this._paused = !1
            }
        }, p5.SoundFile.prototype.stopAll = function(t) {
            var e = u.audiocontext.currentTime,
                n = t || 0;
            if (this.buffer && this.bufferSourceNode) {
                for (var i in this.bufferSourceNodes) {
                    var o = this.bufferSourceNodes[i];
                    if (o) try {
                        o.stop(e + n)
                    } catch (t) {}
                }
                this._counterNode.stop(e + n), this._onended(this)
            }
        }, p5.SoundFile.prototype.setVolume = function(t, e, n) {
            if ("number" == typeof t) {
                var i = e || 0,
                    o = n || 0,
                    r = u.audiocontext.currentTime,
                    s = this.output.gain.value;
                this.output.gain.cancelScheduledValues(r + o), this.output.gain.linearRampToValueAtTime(s, r + o), this.output.gain.linearRampToValueAtTime(t, r + o + i)
            } else {
                if (!t) return this.output.gain;
                t.connect(this.output.gain)
            }
        }, p5.SoundFile.prototype.amp = p5.SoundFile.prototype.setVolume, p5.SoundFile.prototype.fade = p5.SoundFile.prototype.setVolume, p5.SoundFile.prototype.getVolume = function() {
            return this.output.gain.value
        }, p5.SoundFile.prototype.pan = function(t, e) {
            this.panPosition = t, this.panner.pan(t, e)
        }, p5.SoundFile.prototype.getPan = function() {
            return this.panPosition
        }, p5.SoundFile.prototype.rate = function(t) {
            var e = !1;
            if (void 0 === t) return this.playbackRate;
            if (0 === (this.playbackRate = t) ? t = 1e-13 : t < 0 && !this.reversed ? (t = Math.abs(t), e = !0) : 0 < t && this.reversed && (e = !0), this.bufferSourceNode) {
                var n = u.audiocontext.currentTime;
                this.bufferSourceNode.playbackRate.cancelScheduledValues(n), this.bufferSourceNode.playbackRate.linearRampToValueAtTime(Math.abs(t), n), this._counterNode.playbackRate.cancelScheduledValues(n), this._counterNode.playbackRate.linearRampToValueAtTime(Math.abs(t), n)
            }
            return e && this.reverseBuffer(), this.playbackRate
        }, p5.SoundFile.prototype.setPitch = function(t) {
            var e = n(t) / n(60);
            this.rate(e)
        }, p5.SoundFile.prototype.getPlaybackRate = function() {
            return this.playbackRate
        }, p5.SoundFile.prototype.duration = function() {
            return this.buffer ? this.buffer.duration : 0
        }, p5.SoundFile.prototype.currentTime = function() {
            return this.reversed ? Math.abs(this._lastPos - this.buffer.length) / p.sampleRate : this._lastPos / p.sampleRate
        }, p5.SoundFile.prototype.jump = function(t, e) {
            if (t < 0 || t > this.buffer.duration) throw "jump time out of range";
            if (e > this.buffer.duration - t) throw "end time out of range";
            var n = t || 0,
                i = e || void 0;
            this.isPlaying() && (this.stop(0), this.play(0, this.playbackRate, this.output.gain.value, n, i))
        }, p5.SoundFile.prototype.channels = function() {
            return this.buffer.numberOfChannels
        }, p5.SoundFile.prototype.sampleRate = function() {
            return this.buffer.sampleRate
        }, p5.SoundFile.prototype.frames = function() {
            return this.buffer.length
        }, p5.SoundFile.prototype.getPeaks = function(t) {
            if (!this.buffer) throw "Cannot load peaks yet, buffer is not loaded";
            if (t = t || 5 * window.width, this.buffer) {
                for (var e = this.buffer, n = e.length / t, i = ~~(n / 10) || 1, o = e.numberOfChannels, r = new Float32Array(Math.round(t)), s = 0; s < o; s++)
                    for (var a = e.getChannelData(s), u = 0; u < t; u++) {
                        for (var p = ~~(u * n), c = ~~(p + n), h = 0, l = p; l < c; l += i) {
                            var f = a[l];
                            h < f ? h = f : h < -f && (h = f)
                        }(0 === s || Math.abs(h) > r[u]) && (r[u] = h)
                    }
                return r
            }
        }, p5.SoundFile.prototype.reverseBuffer = function() {
            if (!this.buffer) throw "SoundFile is not done loading";
            var t = this._lastPos / p.sampleRate,
                e = this.getVolume();
            this.setVolume(0, .001);
            for (var n = this.buffer.numberOfChannels, i = 0; i < n; i++) this.buffer.getChannelData(i).reverse();
            this.reversed = !this.reversed, this.isPlaying() && t && this.jump(this.duration() - t), this.setVolume(e, .001)
        }, p5.SoundFile.prototype.onended = function(t) {
            return this._onended = t, this
        }, p5.SoundFile.prototype.add = function() {}, p5.SoundFile.prototype.dispose = function() {
            var t = u.audiocontext.currentTime,
                e = u.soundArray.indexOf(this);
            if (u.soundArray.splice(e, 1), this.stop(t), this.buffer && this.bufferSourceNode) {
                for (var n = 0; n < this.bufferSourceNodes.length - 1; n++)
                    if (null !== this.bufferSourceNodes[n]) {
                        this.bufferSourceNodes[n].disconnect();
                        try {
                            this.bufferSourceNodes[n].stop(t)
                        } catch (t) {}
                        this.bufferSourceNodes[n] = null
                    } if (this.isPlaying()) {
                    try {
                        this._counterNode.stop(t)
                    } catch (t) {}
                    this._counterNode = null
                }
            }
            this.output && (this.output.disconnect(), this.output = null), this.panner && (this.panner.disconnect(), this.panner = null)
        }, p5.SoundFile.prototype.connect = function(t) {
            t ? t.hasOwnProperty("input") ? this.panner.connect(t.input) : this.panner.connect(t) : this.panner.connect(u.input)
        }, p5.SoundFile.prototype.disconnect = function() {
            this.panner && this.panner.disconnect()
        }, p5.SoundFile.prototype.getLevel = function() {}, p5.SoundFile.prototype.setPath = function(t, e) {
            var n = p5.prototype._checkFileFormats(t);
            this.url = n, this.load(e)
        }, p5.SoundFile.prototype.setBuffer = function(t) {
            var e = t.length,
                n = t[0].length,
                i = p.createBuffer(e, n, p.sampleRate);
            t[0] instanceof Float32Array || (t[0] = new Float32Array(t[0]));
            for (var o = 0; o < e; o++) {
                i.getChannelData(o).set(t[o])
            }
            this.buffer = i, this.panner.inputChannels(e)
        };
        p5.SoundFile.prototype._initCounterNode = function() {
            var e = this,
                n = this,
                t = p.currentTime,
                i = p.createBufferSource(),
                o = r(256);
            return n._workletNode && (n._workletNode.disconnect(), delete n._workletNode), n._workletNode = new AudioWorkletNode(p, s.soundFileProcessor, {
                processorOptions: {
                    bufferSize: o
                }
            }), n._workletNode.port.onmessage = function(t) {
                if ("position" === t.data.name) {
                    if (0 === t.data.position) return;
                    e._lastPos = t.data.position, e._onTimeUpdate(n._lastPos)
                }
            }, i.buffer = function(t) {
                for (var e = t.length, n = p.createBuffer(1, t.length, p.sampleRate), i = n.getChannelData(0), o = 0; o < e; o++) i[o] = o;
                return n
            }(n.buffer), i.playbackRate.setValueAtTime(n.playbackRate, t), i.connect(n._workletNode), n._workletNode.connect(p5.soundOut._silentNode), i
        }, p5.SoundFile.prototype._initSourceNode = function() {
            var t = p.createBufferSource();
            return t.buffer = this.buffer, t.playbackRate.value = this.playbackRate, t.connect(this.output), t
        }, p5.SoundFile.prototype.processPeaks = function(r, t, e, n) {
            var i = this.buffer.length,
                o = this.buffer.sampleRate,
                s = this.buffer,
                a = [],
                u = t || .9,
                p = e || .22,
                c = n || 200,
                h = new window.OfflineAudioContext(1, i, o),
                l = h.createBufferSource();
            l.buffer = s;
            var f = h.createBiquadFilter();
            f.type = "lowpass", l.connect(f), f.connect(h.destination), l.start(0), h.startRendering(), h.oncomplete = function(t) {
                if (self.panner) {
                    for (var e = t.renderedBuffer, n = e.getChannelData(0); a = d(n, u), u -= .005, Object.keys(a).length < c && p <= u;);
                    var i = function(t, i) {
                        var o = [];
                        return t.forEach(function(e) {
                            try {
                                var n = Math.abs(60 / (e.interval / i));
                                if (n = m(n), !o.some(function(t) {
                                        if (t.tempo === n) return t.count += e.count
                                    })) {
                                    if (isNaN(n)) return;
                                    o.push({
                                        tempo: Math.round(n),
                                        count: e.count
                                    })
                                }
                            } catch (t) {
                                throw t
                            }
                        }), o
                    }(function(t) {
                        for (var e = [], n = Object.keys(t).sort(), i = 0; i < n.length; i++)
                            for (var o = 0; o < 10; o++) {
                                var r = t[n[i]],
                                    s = t[n[i + o]];
                                if (r && s) {
                                    var a = r.sampleIndex,
                                        u = s.sampleIndex - a;
                                    0 < u && r.intervals.push(u), e.some(function(t) {
                                        if (t.interval === u) return t.count++, t
                                    }) || e.push({
                                        interval: u,
                                        count: 1
                                    })
                                }
                            }
                        return e
                    }(a), e.sampleRate).sort(function(t, e) {
                        return e.count - t.count
                    }).splice(0, 5);
                    this.tempo = i[0].tempo;
                    var o = function(t, e, n, i) {
                        for (var o = [], r = Object.keys(t).sort(), s = 0; s < r.length; s++)
                            for (var a = r[s], u = t[a], p = 0; p < u.intervals.length; p++) {
                                var c = Math.round(Math.abs(60 / (u.intervals[p] / n)));
                                c = m(c), Math.abs(c - e) < i && o.push(u.sampleIndex / n)
                            }
                        return o = o.filter(function(t, e, n) {
                            if (.01 < n[e + 1] - t) return !0
                        })
                    }(a, i[0].tempo, e.sampleRate, 5);
                    r(o)
                }
            }
        };
        var c = function(t, e) {
            this.sampleIndex = e, this.amplitude = t, this.tempos = [], this.intervals = []
        };

        function d(t, e) {
            for (var n = {}, i = t.length, o = 0; o < i; o++) {
                if (t[o] > e) {
                    var r = t[o],
                        s = new c(r, o);
                    n[o] = s, o += 6e3
                }
                o++
            }
            return n
        }

        function m(t) {
            if (isFinite(t) && 0 !== t) {
                for (; t < 90;) t *= 2;
                for (; 180 < t && 90 < t;) t /= 2;
                return t
            }
        }

        function h(t, e, n, i) {
            this.callback = t, this.time = e, this.id = n, this.val = i
        }
        p5.SoundFile.prototype.addCue = function(t, e, n) {
            var i = this._cueIDCounter++,
                o = new h(e, t, i, n);
            return this._cues.push(o), i
        }, p5.SoundFile.prototype.removeCue = function(t) {
            for (var e = this._cues.length, n = 0; n < e; n++) {
                if (this._cues[n].id === t) {
                    this._cues.splice(n, 1);
                    break
                }
            }
            this._cues.length
        }, p5.SoundFile.prototype.clearCues = function() {
            this._cues = []
        }, p5.SoundFile.prototype._onTimeUpdate = function(t) {
            for (var e = t / this.buffer.sampleRate, n = this._cues.length, i = 0; i < n; i++) {
                var o = this._cues[i],
                    r = o.time,
                    s = o.val;
                ~~this._prevUpdateTime <= r && r <= e && o.callback(s)
            }
            this._prevUpdateTime = e
        }, p5.SoundFile.prototype.save = function(t) {
            p5.prototype.saveSound(this, t, "wav")
        }, p5.SoundFile.prototype.getBlob = function() {
            var t = i(this.buffer);
            return new Blob([t], {
                type: "audio/wav"
            })
        }
    }.call(e, o, e, t)) || (t.exports = n)
}, function(t, e, o) {
    "use strict";
    var n;
    void 0 === (n = function(t) {
        var n = o(1),
            e = o(6).safeBufferSize,
            i = o(10);
        p5.Amplitude = function(t) {
            this.bufferSize = e(2048), this.audiocontext = n.audiocontext, this._workletNode = new AudioWorkletNode(this.audiocontext, i.amplitudeProcessor, {
                outputChannelCount: [1],
                parameterData: {
                    smoothing: t || 0
                },
                processorOptions: {
                    normalize: !1,
                    smoothing: t || 0,
                    numInputChannels: 2,
                    bufferSize: this.bufferSize
                }
            }), this._workletNode.port.onmessage = function(t) {
                "amplitude" === t.data.name && (this.volume = t.data.volume, this.volNorm = t.data.volNorm, this.stereoVol = t.data.stereoVol, this.stereoVolNorm = t.data.stereoVolNorm)
            }.bind(this), this.input = this._workletNode, this.output = this.audiocontext.createGain(), this.volume = 0, this.volNorm = 0, this.stereoVol = [0, 0], this.stereoVolNorm = [0, 0], this.normalize = !1, this._workletNode.connect(this.output), this.output.gain.value = 0, this.output.connect(this.audiocontext.destination), n.meter.connect(this._workletNode), n.soundArray.push(this)
        }, p5.Amplitude.prototype.setInput = function(t, e) {
            n.meter.disconnect(), e && (this._workletNode.parameters.get("smoothing").value = e), null == t ? n.meter.connect(this._workletNode) : t instanceof p5.Signal ? t.output.connect(this._workletNode) : t ? (t.connect(this._workletNode), this._workletNode.disconnect(), this._workletNode.connect(this.output)) : n.meter.connect(this._workletNode)
        }, p5.Amplitude.prototype.connect = function(t) {
            t ? t.hasOwnProperty("input") ? this.output.connect(t.input) : this.output.connect(t) : this.output.connect(this.panner.connect(n.input))
        }, p5.Amplitude.prototype.disconnect = function() {
            this.output && this.output.disconnect()
        }, p5.Amplitude.prototype.getLevel = function(t) {
            return void 0 !== t ? this.normalize ? this.stereoVolNorm[t] : this.stereoVol[t] : this.normalize ? this.volNorm : this.volume
        }, p5.Amplitude.prototype.toggleNormalize = function(t) {
            this.normalize = "boolean" == typeof t ? t : !this.normalize, this._workletNode.port.postMessage({
                name: "toggleNormalize",
                normalize: this.normalize
            })
        }, p5.Amplitude.prototype.smooth = function(t) {
            0 <= t && t < 1 && this._workletNode.port.postMessage({
                name: "smoothing",
                smoothing: t
            })
        }, p5.Amplitude.prototype.dispose = function() {
            var t = n.soundArray.indexOf(this);
            n.soundArray.splice(t, 1), this.input && (this.input.disconnect(), delete this.input), this.output && (this.output.disconnect(), delete this.output), this._workletNode.disconnect(), delete this._workletNode
        }
    }.call(e, o, e, t)) || (t.exports = n)
}, function(t, e, o) {
    "use strict";
    var n;
    void 0 === (n = function(t) {
        var c = o(1);
        p5.FFT = function(t, e) {
            this.input = this.analyser = c.audiocontext.createAnalyser(), Object.defineProperties(this, {
                bins: {
                    get: function() {
                        return this.analyser.fftSize / 2
                    },
                    set: function(t) {
                        this.analyser.fftSize = 2 * t
                    },
                    configurable: !0,
                    enumerable: !0
                },
                smoothing: {
                    get: function() {
                        return this.analyser.smoothingTimeConstant
                    },
                    set: function(t) {
                        this.analyser.smoothingTimeConstant = t
                    },
                    configurable: !0,
                    enumerable: !0
                }
            }), this.smooth(t), this.bins = e || 1024, c.fftMeter.connect(this.analyser), this.freqDomain = new Uint8Array(this.analyser.frequencyBinCount), this.timeDomain = new Uint8Array(this.analyser.frequencyBinCount), this.bass = [20, 140], this.lowMid = [140, 400], this.mid = [400, 2600], this.highMid = [2600, 5200], this.treble = [5200, 14e3], c.soundArray.push(this)
        }, p5.FFT.prototype.setInput = function(t) {
            t ? (t.output ? t.output.connect(this.analyser) : t.connect && t.connect(this.analyser), c.fftMeter.disconnect()) : c.fftMeter.connect(this.analyser)
        }, p5.FFT.prototype.waveform = function() {
            for (var t, e, n = 0; n < arguments.length; n++) "number" == typeof arguments[n] && (t = arguments[n], this.analyser.fftSize = 2 * t), "string" == typeof arguments[n] && (e = arguments[n]);
            if (e && !p5.prototype._isSafari()) return s(this, this.timeDomain), this.analyser.getFloatTimeDomainData(this.timeDomain), this.timeDomain;
            a(this, this.timeDomain), this.analyser.getByteTimeDomainData(this.timeDomain);
            for (var i = new Array, o = 0; o < this.timeDomain.length; o++) {
                var r = p5.prototype.map(this.timeDomain[o], 0, 255, -1, 1);
                i.push(r)
            }
            return i
        }, p5.FFT.prototype.analyze = function() {
            for (var t, e = 0; e < arguments.length; e++) "number" == typeof arguments[e] && (this.bins = arguments[e], this.analyser.fftSize = 2 * this.bins), "string" == typeof arguments[e] && (t = arguments[e]);
            return t && "db" === t.toLowerCase() ? (n(this), this.analyser.getFloatFrequencyData(this.freqDomain), this.freqDomain) : (i(this, this.freqDomain), this.analyser.getByteFrequencyData(this.freqDomain), Array.apply([], this.freqDomain))
        }, p5.FFT.prototype.getEnergy = function(t, e) {
            var n = c.audiocontext.sampleRate / 2;
            if ("bass" === t ? (t = this.bass[0], e = this.bass[1]) : "lowMid" === t ? (t = this.lowMid[0], e = this.lowMid[1]) : "mid" === t ? (t = this.mid[0], e = this.mid[1]) : "highMid" === t ? (t = this.highMid[0], e = this.highMid[1]) : "treble" === t && (t = this.treble[0], e = this.treble[1]), "number" != typeof t) throw "invalid input for getEnergy()";
            if (e) {
                if (t && e) {
                    if (e < t) {
                        var i = e;
                        e = t, t = i
                    }
                    for (var o = Math.round(t / n * this.freqDomain.length), r = Math.round(e / n * this.freqDomain.length), s = 0, a = 0, u = o; u <= r; u++) s += this.freqDomain[u], a += 1;
                    return s / a
                }
                throw "invalid input for getEnergy()"
            }
            var p = Math.round(t / n * this.freqDomain.length);
            return this.freqDomain[p]
        }, p5.FFT.prototype.getFreq = function(t, e) {
            return this.getEnergy(t, e)
        }, p5.FFT.prototype.getCentroid = function() {
            for (var t = c.audiocontext.sampleRate / 2, e = 0, n = 0, i = 0; i < this.freqDomain.length; i++) e += i * this.freqDomain[i], n += this.freqDomain[i];
            var o = 0;
            return 0 !== n && (o = e / n), o * (t / this.freqDomain.length)
        }, p5.FFT.prototype.smooth = function(t) {
            return void 0 !== t && (this.smoothing = t), this.smoothing
        }, p5.FFT.prototype.dispose = function() {
            var t = c.soundArray.indexOf(this);
            c.soundArray.splice(t, 1), this.analyser && (this.analyser.disconnect(), delete this.analyser)
        }, p5.FFT.prototype.linAverages = function(t) {
            t = t || 16;
            for (var e = this.freqDomain, n = e.length, i = Math.floor(n / t), o = new Array(t), r = 0, s = 0; s < n; s++) o[r] = void 0 !== o[r] ? (o[r] + e[s]) / 2 : e[s], s % i == i - 1 && r++;
            return o
        }, p5.FFT.prototype.logAverages = function(t) {
            for (var e = c.audiocontext.sampleRate / 2, n = this.freqDomain, i = n.length, o = new Array(t.length), r = 0, s = 0; s < i; s++) {
                Math.round(s * e / this.freqDomain.length) > t[r].hi && r++, o[r] = void 0 !== o[r] ? (o[r] + n[s]) / 2 : n[s]
            }
            return o
        }, p5.FFT.prototype.getOctaveBands = function(t, e) {
            t = t || 3;
            var n = [],
                i = {
                    lo: (e = e || 15.625) / Math.pow(2, 1 / (2 * t)),
                    ctr: e,
                    hi: e * Math.pow(2, 1 / (2 * t))
                };
            n.push(i);
            for (var o = c.audiocontext.sampleRate / 2; i.hi < o;) {
                var r = {};
                r.lo = i.hi, r.ctr = i.ctr * Math.pow(2, 1 / t), r.hi = r.ctr * Math.pow(2, 1 / (2 * t)), n.push(r), i = r
            }
            return n
        };
        var n = function(t) {
                t.freqDomain instanceof Float32Array == !1 && (t.freqDomain = new Float32Array(t.analyser.frequencyBinCount))
            },
            i = function(t) {
                t.freqDomain instanceof Uint8Array == !1 && (t.freqDomain = new Uint8Array(t.analyser.frequencyBinCount))
            },
            s = function(t) {
                t.timeDomain instanceof Float32Array == !1 && (t.timeDomain = new Float32Array(t.analyser.frequencyBinCount))
            },
            a = function(t) {
                t.timeDomain instanceof Uint8Array == !1 && (t.timeDomain = new Uint8Array(t.analyser.frequencyBinCount))
            }
    }.call(e, o, e, t)) || (t.exports = n)
}, function(t, e, o) {
    "use strict";
    var n;
    void 0 === (n = function(t) {
        var e = o(2),
            n = o(7),
            i = o(3),
            a = o(13);
        p5.Signal = function(t) {
            return new e(t)
        }, e.prototype.fade = e.prototype.linearRampToValueAtTime, i.prototype.fade = e.prototype.fade, n.prototype.fade = e.prototype.fade, a.prototype.fade = e.prototype.fade, e.prototype.setInput = function(t) {
            t.connect(this)
        }, i.prototype.setInput = e.prototype.setInput, n.prototype.setInput = e.prototype.setInput, a.prototype.setInput = e.prototype.setInput, e.prototype.add = function(t) {
            var e = new n(t);
            return this.connect(e), e
        }, i.prototype.add = e.prototype.add, n.prototype.add = e.prototype.add, a.prototype.add = e.prototype.add, e.prototype.mult = function(t) {
            var e = new i(t);
            return this.connect(e), e
        }, i.prototype.mult = e.prototype.mult, n.prototype.mult = e.prototype.mult, a.prototype.mult = e.prototype.mult, e.prototype.scale = function(t, e, n, i) {
            var o, r;
            r = 4 === arguments.length ? (o = p5.prototype.map(n, t, e, 0, 1) - .5, p5.prototype.map(i, t, e, 0, 1) - .5) : (o = t, e);
            var s = new a(o, r);
            return this.connect(s), s
        }, i.prototype.scale = e.prototype.scale, n.prototype.scale = e.prototype.scale, a.prototype.scale = e.prototype.scale
    }.call(e, o, e, t)) || (t.exports = n)
}, function(t, e, n) {
    var i, o;
    i = [n(0), n(21)], void 0 === (o = function(o) {
        o.Frequency = function(t, e) {
            if (!(this instanceof o.Frequency)) return new o.Frequency(t, e);
            o.TimeBase.call(this, t, e)
        }, o.extend(o.Frequency, o.TimeBase), o.Frequency.prototype._primaryExpressions = Object.create(o.TimeBase.prototype._primaryExpressions), o.Frequency.prototype._primaryExpressions.midi = {
            regexp: /^(\d+(?:\.\d+)?midi)/,
            method: function(t) {
                return this.midiToFrequency(t)
            }
        }, o.Frequency.prototype._primaryExpressions.note = {
            regexp: /^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i,
            method: function(t, e) {
                var n = i[t.toLowerCase()] + 12 * (parseInt(e) + 1);
                return this.midiToFrequency(n)
            }
        }, o.Frequency.prototype._primaryExpressions.tr = {
            regexp: /^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?/,
            method: function(t, e, n) {
                var i = 1;
                return t && "0" !== t && (i *= this._beatsToUnits(this._timeSignature() * parseFloat(t))), e && "0" !== e && (i *= this._beatsToUnits(parseFloat(e))), n && "0" !== n && (i *= this._beatsToUnits(parseFloat(n) / 4)), i
            }
        }, o.Frequency.prototype.transpose = function(t) {
            return this._expr = function(t, e) {
                return t() * this.intervalToFrequencyRatio(e)
            }.bind(this, this._expr, t), this
        }, o.Frequency.prototype.harmonize = function(t) {
            return this._expr = function(t, e) {
                for (var n = t(), i = [], o = 0; o < e.length; o++) i[o] = n * this.intervalToFrequencyRatio(e[o]);
                return i
            }.bind(this, this._expr, t), this
        }, o.Frequency.prototype.toMidi = function() {
            return this.frequencyToMidi(this.valueOf())
        }, o.Frequency.prototype.toNote = function() {
            var t = this.valueOf(),
                e = Math.log(t / o.Frequency.A4) / Math.LN2,
                n = Math.round(12 * e) + 57,
                i = Math.floor(n / 12);
            return i < 0 && (n += -12 * i), r[n % 12] + i.toString()
        }, o.Frequency.prototype.toSeconds = function() {
            return 1 / this.valueOf()
        }, o.Frequency.prototype.toFrequency = function() {
            return this.valueOf()
        }, o.Frequency.prototype.toTicks = function() {
            var t = this._beatsToUnits(1),
                e = this.valueOf() / t;
            return Math.floor(e * o.Transport.PPQ)
        }, o.Frequency.prototype._frequencyToUnits = function(t) {
            return t
        }, o.Frequency.prototype._ticksToUnits = function(t) {
            return 1 / (60 * t / (o.Transport.bpm.value * o.Transport.PPQ))
        }, o.Frequency.prototype._beatsToUnits = function(t) {
            return 1 / o.TimeBase.prototype._beatsToUnits.call(this, t)
        }, o.Frequency.prototype._secondsToUnits = function(t) {
            return 1 / t
        }, o.Frequency.prototype._defaultUnits = "hz";
        var i = {
                cbb: -2,
                cb: -1,
                c: 0,
                "c#": 1,
                cx: 2,
                dbb: 0,
                db: 1,
                d: 2,
                "d#": 3,
                dx: 4,
                ebb: 2,
                eb: 3,
                e: 4,
                "e#": 5,
                ex: 6,
                fbb: 3,
                fb: 4,
                f: 5,
                "f#": 6,
                fx: 7,
                gbb: 5,
                gb: 6,
                g: 7,
                "g#": 8,
                gx: 9,
                abb: 7,
                ab: 8,
                a: 9,
                "a#": 10,
                ax: 11,
                bbb: 9,
                bb: 10,
                b: 11,
                "b#": 12,
                bx: 13
            },
            r = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
        return o.Frequency.A4 = 440, o.Frequency.prototype.midiToFrequency = function(t) {
            return o.Frequency.A4 * Math.pow(2, (t - 69) / 12)
        }, o.Frequency.prototype.frequencyToMidi = function(t) {
            return 69 + 12 * Math.log(t / o.Frequency.A4) / Math.LN2
        }, o.Frequency
    }.apply(e, i)) || (t.exports = o)
}, function(t, e, n) {
    var i, o;
    i = [n(0), n(20)], void 0 === (o = function(i) {
        return i.TransportTime = function(t, e) {
            if (!(this instanceof i.TransportTime)) return new i.TransportTime(t, e);
            i.Time.call(this, t, e)
        }, i.extend(i.TransportTime, i.Time), i.TransportTime.prototype._unaryExpressions = Object.create(i.Time.prototype._unaryExpressions), i.TransportTime.prototype._unaryExpressions.quantize = {
            regexp: /^@/,
            method: function(t) {
                var e = this._secondsToTicks(t()),
                    n = Math.ceil(i.Transport.ticks / e);
                return this._ticksToUnits(n * e)
            }
        }, i.TransportTime.prototype._secondsToTicks = function(t) {
            var e = t / this._beatsToUnits(1);
            return Math.round(e * i.Transport.PPQ)
        }, i.TransportTime.prototype.valueOf = function() {
            return this._secondsToTicks(this._expr()) + (this._plusNow ? i.Transport.ticks : 0)
        }, i.TransportTime.prototype.toTicks = function() {
            return this.valueOf()
        }, i.TransportTime.prototype.toSeconds = function() {
            return this._expr() + (this._plusNow ? i.Transport.seconds : 0)
        }, i.TransportTime.prototype.toFrequency = function() {
            return 1 / this.toSeconds()
        }, i.TransportTime
    }.apply(e, i)) || (t.exports = o)
}, function(t, e, n) {
    "use strict";
    var i;
    void 0 === (i = function(t) {
        var u = n(1),
            o = n(7),
            r = n(3),
            a = n(13),
            s = n(14);
        p5.Envelope = function(t, e, n, i, o, r) {
            this.aTime = t || .1, this.aLevel = e || 1, this.dTime = n || .5, this.dLevel = i || 0, this.rTime = o || 0, this.rLevel = r || 0, this._rampHighPercentage = .98, this._rampLowPercentage = .02, this.output = u.audiocontext.createGain(), this.control = new s, this._init(), this.control.connect(this.output), this.connection = null, this.mathOps = [this.control], this.isExponential = !1, this.sourceToClear = null, this.wasTriggered = !1, u.soundArray.push(this)
        }, p5.Envelope.prototype._init = function() {
            var t = u.audiocontext.currentTime;
            this.control.setTargetAtTime(1e-5, t, .001), this._setRampAD(this.aTime, this.dTime)
        }, p5.Envelope.prototype.set = function(t, e, n, i, o, r) {
            this.aTime = t, this.aLevel = e, this.dTime = n || 0, this.dLevel = i || 0, this.rTime = o || 0, this.rLevel = r || 0, this._setRampAD(t, n)
        }, p5.Envelope.prototype.setADSR = function(t, e, n, i) {
            this.aTime = t, this.dTime = e || 0, this.sPercent = n || 0, this.dLevel = void 0 !== n ? n * (this.aLevel - this.rLevel) + this.rLevel : 0, this.rTime = i || 0, this._setRampAD(t, e)
        }, p5.Envelope.prototype.setRange = function(t, e) {
            this.aLevel = t || 1, this.rLevel = e || 0
        }, p5.Envelope.prototype._setRampAD = function(t, e) {
            this._rampAttackTime = this.checkExpInput(t), this._rampDecayTime = this.checkExpInput(e);
            var n = 1;
            n = Math.log(1 / this.checkExpInput(1 - this._rampHighPercentage)), this._rampAttackTC = t / this.checkExpInput(n), n = Math.log(1 / this._rampLowPercentage), this._rampDecayTC = e / this.checkExpInput(n)
        }, p5.Envelope.prototype.setRampPercentages = function(t, e) {
            this._rampHighPercentage = this.checkExpInput(t), this._rampLowPercentage = this.checkExpInput(e);
            var n = 1;
            n = Math.log(1 / this.checkExpInput(1 - this._rampHighPercentage)), this._rampAttackTC = this._rampAttackTime / this.checkExpInput(n), n = Math.log(1 / this._rampLowPercentage), this._rampDecayTC = this._rampDecayTime / this.checkExpInput(n)
        }, p5.Envelope.prototype.setInput = function() {
            for (var t = 0; t < arguments.length; t++) this.connect(arguments[t])
        }, p5.Envelope.prototype.setExp = function(t) {
            this.isExponential = t
        }, p5.Envelope.prototype.checkExpInput = function(t) {
            return t <= 0 && (t = 1e-8), t
        }, p5.Envelope.prototype.play = function(t, e, n) {
            var i = e || 0;
            n = n || 0;
            t && this.connection !== t && this.connect(t), this.triggerAttack(t, i), this.triggerRelease(t, i + this.aTime + this.dTime + n)
        }, p5.Envelope.prototype.triggerAttack = function(t, e) {
            var n = u.audiocontext.currentTime + (e || 0);
            this.lastAttack = n, this.wasTriggered = !0, t && this.connection !== t && this.connect(t);
            var i = this.control.getValueAtTime(n);
            !0 === this.isExponential ? this.control.exponentialRampToValueAtTime(this.checkExpInput(i), n) : this.control.linearRampToValueAtTime(i, n), n += this.aTime, !0 === this.isExponential ? (this.control.exponentialRampToValueAtTime(this.checkExpInput(this.aLevel), n), i = this.checkExpInput(this.control.getValueAtTime(n)), this.control.cancelScheduledValues(n), this.control.exponentialRampToValueAtTime(i, n)) : (this.control.linearRampToValueAtTime(this.aLevel, n), i = this.control.getValueAtTime(n), this.control.cancelScheduledValues(n), this.control.linearRampToValueAtTime(i, n)), n += this.dTime, !0 === this.isExponential ? (this.control.exponentialRampToValueAtTime(this.checkExpInput(this.dLevel), n), i = this.checkExpInput(this.control.getValueAtTime(n)), this.control.cancelScheduledValues(n), this.control.exponentialRampToValueAtTime(i, n)) : (this.control.linearRampToValueAtTime(this.dLevel, n), i = this.control.getValueAtTime(n), this.control.cancelScheduledValues(n), this.control.linearRampToValueAtTime(i, n))
        }, p5.Envelope.prototype.triggerRelease = function(t, e) {
            if (this.wasTriggered) {
                var n = u.audiocontext.currentTime + (e || 0);
                t && this.connection !== t && this.connect(t);
                var i = this.control.getValueAtTime(n);
                !0 === this.isExponential ? this.control.exponentialRampToValueAtTime(this.checkExpInput(i), n) : this.control.linearRampToValueAtTime(i, n), n += this.rTime, !0 === this.isExponential ? (this.control.exponentialRampToValueAtTime(this.checkExpInput(this.rLevel), n), i = this.checkExpInput(this.control.getValueAtTime(n)), this.control.cancelScheduledValues(n), this.control.exponentialRampToValueAtTime(i, n)) : (this.control.linearRampToValueAtTime(this.rLevel, n), i = this.control.getValueAtTime(n), this.control.cancelScheduledValues(n), this.control.linearRampToValueAtTime(i, n)), this.wasTriggered = !1
            }
        }, p5.Envelope.prototype.ramp = function(t, e, n, i) {
            var o = u.audiocontext.currentTime + (e || 0),
                r = this.checkExpInput(n),
                s = void 0 !== i ? this.checkExpInput(i) : void 0;
            t && this.connection !== t && this.connect(t);
            var a = this.checkExpInput(this.control.getValueAtTime(o));
            a < r ? (this.control.setTargetAtTime(r, o, this._rampAttackTC), o += this._rampAttackTime) : r < a && (this.control.setTargetAtTime(r, o, this._rampDecayTC), o += this._rampDecayTime), void 0 !== s && (r < s ? this.control.setTargetAtTime(s, o, this._rampAttackTC) : s < r && this.control.setTargetAtTime(s, o, this._rampDecayTC))
        }, p5.Envelope.prototype.connect = function(t) {
            ((this.connection = t) instanceof p5.Oscillator || t instanceof p5.SoundFile || t instanceof p5.AudioIn || t instanceof p5.Reverb || t instanceof p5.Noise || t instanceof p5.Filter || t instanceof p5.Delay) && (t = t.output.gain), t instanceof AudioParam && t.setValueAtTime(0, u.audiocontext.currentTime), t instanceof p5.Signal && t.setValue(0), this.output.connect(t)
        }, p5.Envelope.prototype.disconnect = function() {
            this.output && this.output.disconnect()
        }, p5.Envelope.prototype.add = function(t) {
            var e = new o(t),
                n = this.mathOps.length,
                i = this.output;
            return p5.prototype._mathChain(this, e, n, i, o)
        }, p5.Envelope.prototype.mult = function(t) {
            var e = new r(t),
                n = this.mathOps.length,
                i = this.output;
            return p5.prototype._mathChain(this, e, n, i, r)
        }, p5.Envelope.prototype.scale = function(t, e, n, i) {
            var o = new a(t, e, n, i),
                r = this.mathOps.length,
                s = this.output;
            return p5.prototype._mathChain(this, o, r, s, a)
        }, p5.Envelope.prototype.dispose = function() {
            var t = u.soundArray.indexOf(this);
            u.soundArray.splice(t, 1), this.disconnect(), this.control && (this.control.dispose(), this.control = null);
            for (var e = 1; e < this.mathOps.length; e++) this.mathOps[e].dispose()
        }, p5.Env = function(t, e, n, i, o, r) {
            p5.Envelope.call(this, t, e, n, i, o, r)
        }, p5.Env.prototype = Object.create(p5.Envelope.prototype)
    }.call(e, n, e, t)) || (t.exports = i)
}, function(t, e, n) {
    "use strict";
    var i;
    void 0 === (i = function(t) {
        var s = n(1);

        function a() {
            for (var t = s.audiocontext, e = t.createBuffer(1, 2048, t.sampleRate), n = e.getChannelData(0), i = 0; i < 2048; i++) n[i] = 1;
            var o = t.createBufferSource();
            return o.buffer = e, o.loop = !0, o
        }
        n(23), p5.Pulse = function(t, e) {
            p5.Oscillator.call(this, t, "sawtooth"), this.w = e || 0, this.osc2 = new p5.SawOsc(t), this.dNode = s.audiocontext.createDelay(), this.dcOffset = a(), this.dcGain = s.audiocontext.createGain(), this.dcOffset.connect(this.dcGain), this.dcGain.connect(this.output), this.f = t || 440;
            var n = this.w / this.oscillator.frequency.value;
            this.dNode.delayTime.value = n, this.dcGain.gain.value = 1.7 * (.5 - this.w), this.osc2.disconnect(), this.osc2.panner.disconnect(), this.osc2.amp(-1), this.osc2.output.connect(this.dNode), this.dNode.connect(this.output), this.output.gain.value = 1, this.output.connect(this.panner)
        }, p5.Pulse.prototype = Object.create(p5.Oscillator.prototype), p5.Pulse.prototype.width = function(t) {
            if ("number" == typeof t) {
                if (t <= 1 && 0 <= t) {
                    this.w = t;
                    var e = this.w / this.oscillator.frequency.value;
                    this.dNode.delayTime.value = e
                }
                this.dcGain.gain.value = 1.7 * (.5 - this.w)
            } else {
                t.connect(this.dNode.delayTime);
                var n = new p5.SignalAdd(-.5);
                n.setInput(t), (n = (n = n.mult(-1)).mult(1.7)).connect(this.dcGain.gain)
            }
        }, p5.Pulse.prototype.start = function(t, e) {
            var n = s.audiocontext.currentTime,
                i = e || 0;
            if (!this.started) {
                var o = t || this.f,
                    r = this.oscillator.type;
                this.oscillator = s.audiocontext.createOscillator(), this.oscillator.frequency.setValueAtTime(o, n), this.oscillator.type = r, this.oscillator.connect(this.output), this.oscillator.start(i + n), this.osc2.oscillator = s.audiocontext.createOscillator(), this.osc2.oscillator.frequency.setValueAtTime(o, i + n), this.osc2.oscillator.type = r, this.osc2.oscillator.connect(this.osc2.output), this.osc2.start(i + n), this.freqNode = [this.oscillator.frequency, this.osc2.oscillator.frequency], this.dcOffset = a(), this.dcOffset.connect(this.dcGain), this.dcOffset.start(i + n), void 0 !== this.mods && void 0 !== this.mods.frequency && (this.mods.frequency.connect(this.freqNode[0]), this.mods.frequency.connect(this.freqNode[1])), this.started = !0, this.osc2.started = !0
            }
        }, p5.Pulse.prototype.stop = function(t) {
            if (this.started) {
                var e = t || 0,
                    n = s.audiocontext.currentTime;
                this.oscillator.stop(e + n), this.osc2.oscillator && this.osc2.oscillator.stop(e + n), this.dcOffset.stop(e + n), this.started = !1, this.osc2.started = !1
            }
        }, p5.Pulse.prototype.freq = function(t, e, n) {
            if ("number" == typeof t) {
                this.f = t;
                var i = s.audiocontext.currentTime,
                    o = (e = e || 0, n = n || 0, this.oscillator.frequency.value);
                this.oscillator.frequency.cancelScheduledValues(i), this.oscillator.frequency.setValueAtTime(o, i + n), this.oscillator.frequency.exponentialRampToValueAtTime(t, n + e + i), this.osc2.oscillator.frequency.cancelScheduledValues(i), this.osc2.oscillator.frequency.setValueAtTime(o, i + n), this.osc2.oscillator.frequency.exponentialRampToValueAtTime(t, n + e + i), this.freqMod && (this.freqMod.output.disconnect(), this.freqMod = null)
            } else t.output && (t.output.disconnect(), t.output.connect(this.oscillator.frequency), t.output.connect(this.osc2.oscillator.frequency), this.freqMod = t)
        }
    }.call(e, n, e, t)) || (t.exports = i)
}, function(t, e, r) {
    "use strict";
    var n;
    void 0 === (n = function(t) {
        var l = r(1);
        p5.Noise = function(t) {
            var e;
            p5.Oscillator.call(this), delete this.f, delete this.freq, delete this.oscillator, e = "brown" === t ? o : "pink" === t ? i : n, this.buffer = e
        }, p5.Noise.prototype = Object.create(p5.Oscillator.prototype);
        var n = function() {
                for (var t = 2 * l.audiocontext.sampleRate, e = l.audiocontext.createBuffer(1, t, l.audiocontext.sampleRate), n = e.getChannelData(0), i = 0; i < t; i++) n[i] = 2 * Math.random() - 1;
                return e.type = "white", e
            }(),
            i = function() {
                var t, e, n, i, o, r, s, a = 2 * l.audiocontext.sampleRate,
                    u = l.audiocontext.createBuffer(1, a, l.audiocontext.sampleRate),
                    p = u.getChannelData(0);
                t = e = n = i = o = r = s = 0;
                for (var c = 0; c < a; c++) {
                    var h = 2 * Math.random() - 1;
                    t = .99886 * t + .0555179 * h, e = .99332 * e + .0750759 * h, n = .969 * n + .153852 * h, i = .8665 * i + .3104856 * h, o = .55 * o + .5329522 * h, r = -.7616 * r - .016898 * h, p[c] = t + e + n + i + o + r + s + .5362 * h, p[c] *= .11, s = .115926 * h
                }
                return u.type = "pink", u
            }(),
            o = function() {
                for (var t = 2 * l.audiocontext.sampleRate, e = l.audiocontext.createBuffer(1, t, l.audiocontext.sampleRate), n = e.getChannelData(0), i = 0, o = 0; o < t; o++) {
                    var r = 2 * Math.random() - 1;
                    n[o] = (i + .02 * r) / 1.02, i = n[o], n[o] *= 3.5
                }
                return e.type = "brown", e
            }();
        p5.Noise.prototype.setType = function(t) {
            switch (t) {
                case "white":
                    this.buffer = n;
                    break;
                case "pink":
                    this.buffer = i;
                    break;
                case "brown":
                    this.buffer = o;
                    break;
                default:
                    this.buffer = n
            }
            if (this.started) {
                var e = l.audiocontext.currentTime;
                this.stop(e), this.start(e + .01)
            }
        }, p5.Noise.prototype.getType = function() {
            return this.buffer.type
        }, p5.Noise.prototype.start = function() {
            this.started && this.stop(), this.noise = l.audiocontext.createBufferSource(), this.noise.buffer = this.buffer, this.noise.loop = !0, this.noise.connect(this.output);
            var t = l.audiocontext.currentTime;
            this.noise.start(t), this.started = !0
        }, p5.Noise.prototype.stop = function() {
            var t = l.audiocontext.currentTime;
            this.noise && (this.noise.stop(t), this.started = !1)
        }, p5.Noise.prototype.dispose = function() {
            var t = l.audiocontext.currentTime,
                e = l.soundArray.indexOf(this);
            l.soundArray.splice(e, 1), this.noise && (this.noise.disconnect(), this.stop(t)), this.output && this.output.disconnect(), this.panner && this.panner.disconnect(), this.output = null, this.panner = null, this.buffer = null, this.noise = null
        }
    }.call(e, r, e, t)) || (t.exports = n)
}, function(t, e, n) {
    "use strict";
    var i;
    void 0 === (i = function(t) {
        var r = n(1);
        r.inputSources = [], p5.AudioIn = function(t) {
            this.input = r.audiocontext.createGain(), this.output = r.audiocontext.createGain(), this.stream = null, this.mediaStream = null, this.currentSource = null, this.enabled = !1, this.amplitude = new p5.Amplitude, this.output.connect(this.amplitude.input), window.MediaStreamTrack && window.navigator.mediaDevices && window.navigator.mediaDevices.getUserMedia || (t ? t() : window.alert("This browser does not support MediaStreamTrack and mediaDevices")), r.soundArray.push(this)
        }, p5.AudioIn.prototype.start = function(e, n) {
            var i = this;
            this.stream && this.stop();
            var t = r.inputSources[i.currentSource],
                o = {
                    audio: {
                        sampleRate: r.audiocontext.sampleRate,
                        echoCancellation: !1
                    }
                };
            r.inputSources[this.currentSource] && (o.audio.deviceId = t.deviceId), window.navigator.mediaDevices.getUserMedia(o).then(function(t) {
                i.stream = t, i.enabled = !0, i.mediaStream = r.audiocontext.createMediaStreamSource(t), i.mediaStream.connect(i.output), i.amplitude.setInput(i.output), e && e()
            }).catch(function(t) {
                n && n(t)
            })
        }, p5.AudioIn.prototype.stop = function() {
            this.stream && (this.stream.getTracks().forEach(function(t) {
                t.stop()
            }), this.mediaStream.disconnect(), delete this.mediaStream, delete this.stream)
        }, p5.AudioIn.prototype.connect = function(t) {
            t ? t.hasOwnProperty("input") ? this.output.connect(t.input) : t.hasOwnProperty("analyser") ? this.output.connect(t.analyser) : this.output.connect(t) : this.output.connect(r.input)
        }, p5.AudioIn.prototype.disconnect = function() {
            this.output && (this.output.disconnect(), this.output.connect(this.amplitude.input))
        }, p5.AudioIn.prototype.getLevel = function(t) {
            return t && (this.amplitude.smoothing = t), this.amplitude.getLevel()
        }, p5.AudioIn.prototype.amp = function(t, e) {
            if (e) {
                var n = e || 0,
                    i = this.output.gain.value;
                this.output.gain.cancelScheduledValues(r.audiocontext.currentTime), this.output.gain.setValueAtTime(i, r.audiocontext.currentTime), this.output.gain.linearRampToValueAtTime(t, n + r.audiocontext.currentTime)
            } else this.output.gain.cancelScheduledValues(r.audiocontext.currentTime), this.output.gain.setValueAtTime(t, r.audiocontext.currentTime)
        }, p5.AudioIn.prototype.getSources = function(i, o) {
            return new Promise(function(e, n) {
                window.navigator.mediaDevices.enumerateDevices().then(function(t) {
                    r.inputSources = t.filter(function(t) {
                        return "audioinput" === t.kind
                    }), e(r.inputSources), i && i(r.inputSources)
                }).catch(function(t) {
                    n(t), o && o(t)
                })
            })
        }, p5.AudioIn.prototype.setSource = function(t) {
            0 < r.inputSources.length && t < r.inputSources.length && (this.currentSource = t), this.stream && this.stream.active && this.start()
        }, p5.AudioIn.prototype.dispose = function() {
            var t = r.soundArray.indexOf(this);
            r.soundArray.splice(t, 1), this.stop(), this.output && this.output.disconnect(), this.amplitude && this.amplitude.disconnect(), delete this.amplitude, delete this.output
        }
    }.call(e, n, e, t)) || (t.exports = i)
}, function(t, e, n) {
    var i, o;
    i = [n(0), n(2), n(52), n(58), n(9)], void 0 === (o = function(e) {
        "use strict";
        return e.CrossFade = function(t) {
            this.createInsOuts(2, 1), this.a = this.input[0] = new e.Gain, this.b = this.input[1] = new e.Gain, this.fade = new e.Signal(this.defaultArg(t, .5), e.Type.NormalRange), this._equalPowerA = new e.EqualPowerGain, this._equalPowerB = new e.EqualPowerGain, this._invert = new e.Expr("1 - $0"), this.a.connect(this.output), this.b.connect(this.output), this.fade.chain(this._equalPowerB, this.b.gain), this.fade.chain(this._invert, this._equalPowerA, this.a.gain), this._readOnly("fade")
        }, e.extend(e.CrossFade), e.CrossFade.prototype.dispose = function() {
            return e.prototype.dispose.call(this), this._writable("fade"), this._equalPowerA.dispose(), this._equalPowerA = null, this._equalPowerB.dispose(), this._equalPowerB = null, this.fade.dispose(), this.fade = null, this._invert.dispose(), this._invert = null, this.a.dispose(), this.a = null, this.b.dispose(), this.b = null, this
        }, e.CrossFade
    }.apply(e, i)) || (t.exports = o)
}, function(t, e, n) {
    var i, o;
    i = [n(0), n(7), n(16), n(3), n(53), n(26), n(54), n(25), n(55), n(56), n(57)], void 0 === (o = function(u) {
        "use strict";

        function n(t, e, n) {
            var i = new t;
            return n._eval(e[0]).connect(i, 0, 0), n._eval(e[1]).connect(i, 0, 1), i
        }

        function i(t, e, n) {
            var i = new t;
            return n._eval(e[0]).connect(i, 0, 0), i
        }

        function o(t) {
            return t ? parseFloat(t) : void 0
        }

        function r(t) {
            return t && t.args ? parseFloat(t.args) : void 0
        }
        return u.Expr = function() {
            var t = this._replacements(Array.prototype.slice.call(arguments)),
                e = this._parseInputs(t);
            this._nodes = [], this.input = new Array(e);
            for (var n = 0; n < e; n++) this.input[n] = this.context.createGain();
            var i, o = this._parseTree(t);
            try {
                i = this._eval(o)
            } catch (e) {
                throw this._disposeNodes(), new Error("Tone.Expr: Could evaluate expression: " + t)
            }
            this.output = i
        }, u.extend(u.Expr, u.SignalBase), u.Expr._Expressions = {
            value: {
                signal: {
                    regexp: /^\d+\.\d+|^\d+/,
                    method: function(t) {
                        return new u.Signal(o(t))
                    }
                },
                input: {
                    regexp: /^\$\d/,
                    method: function(t, e) {
                        return e.input[o(t.substr(1))]
                    }
                }
            },
            glue: {
                "(": {
                    regexp: /^\(/
                },
                ")": {
                    regexp: /^\)/
                },
                ",": {
                    regexp: /^,/
                }
            },
            func: {
                abs: {
                    regexp: /^abs/,
                    method: i.bind(this, u.Abs)
                },
                mod: {
                    regexp: /^mod/,
                    method: function(t, e) {
                        var n = r(t[1]),
                            i = new u.Modulo(n);
                        return e._eval(t[0]).connect(i), i
                    }
                },
                pow: {
                    regexp: /^pow/,
                    method: function(t, e) {
                        var n = r(t[1]),
                            i = new u.Pow(n);
                        return e._eval(t[0]).connect(i), i
                    }
                },
                a2g: {
                    regexp: /^a2g/,
                    method: function(t, e) {
                        var n = new u.AudioToGain;
                        return e._eval(t[0]).connect(n), n
                    }
                }
            },
            binary: {
                "+": {
                    regexp: /^\+/,
                    precedence: 1,
                    method: n.bind(this, u.Add)
                },
                "-": {
                    regexp: /^\-/,
                    precedence: 1,
                    method: function(t, e) {
                        return 1 === t.length ? i(u.Negate, t, e) : n(u.Subtract, t, e)
                    }
                },
                "*": {
                    regexp: /^\*/,
                    precedence: 0,
                    method: n.bind(this, u.Multiply)
                }
            },
            unary: {
                "-": {
                    regexp: /^\-/,
                    method: i.bind(this, u.Negate)
                },
                "!": {
                    regexp: /^\!/,
                    method: i.bind(this, u.NOT)
                }
            }
        }, u.Expr.prototype._parseInputs = function(t) {
            var e = t.match(/\$\d/g),
                n = 0;
            if (null !== e)
                for (var i = 0; i < e.length; i++) {
                    var o = parseInt(e[i].substr(1)) + 1;
                    n = Math.max(n, o)
                }
            return n
        }, u.Expr.prototype._replacements = function(t) {
            for (var e = t.shift(), n = 0; n < t.length; n++) e = e.replace(/\%/i, t[n]);
            return e
        }, u.Expr.prototype._tokenize = function(t) {
            for (var e = -1, n = []; 0 < t.length;) {
                var i = o(t = t.trim());
                n.push(i), t = t.substr(i.value.length)
            }

            function o(t) {
                for (var e in u.Expr._Expressions) {
                    var n = u.Expr._Expressions[e];
                    for (var i in n) {
                        var o = n[i],
                            r = o.regexp,
                            s = t.match(r);
                        if (null !== s) return {
                            type: e,
                            value: s[0],
                            method: o.method
                        }
                    }
                }
                throw new SyntaxError("Tone.Expr: Unexpected token " + t)
            }
            return {
                next: function() {
                    return n[++e]
                },
                peek: function() {
                    return n[e + 1]
                }
            }
        }, u.Expr.prototype._parseTree = function(t) {
            var i = this._tokenize(t),
                s = this.isUndef.bind(this);

            function o(t, e) {
                return !s(t) && "glue" === t.type && t.value === e
            }

            function r(t, e, n) {
                var i = u.Expr._Expressions[e];
                if (!s(t))
                    for (var o in i) {
                        var r = i[o];
                        if (r.regexp.test(t.value)) {
                            if (s(n)) return !0;
                            if (r.precedence === n) return !0
                        }
                    }
                return !1
            }

            function a(t) {
                var e;
                s(t) && (t = 5), e = t < 0 ? function t() {
                    var e, n;
                    return r(e = i.peek(), "unary") ? (e = i.next(), n = t(), {
                        operator: e.value,
                        method: e.method,
                        args: [n]
                    }) : function() {
                        var t, e;
                        if (t = i.peek(), s(t)) throw new SyntaxError("Tone.Expr: Unexpected termination of expression");
                        if ("func" === t.type) return function(t) {
                            var e = [];
                            if (!o(i.next(), "(")) throw new SyntaxError('Tone.Expr: Expected ( in a function call "' + t.value + '"');
                            if (o(i.peek(), ")") || (e = function() {
                                    for (var t, e = []; t = a(), !s(t) && (e.push(t), o(i.peek(), ","));) i.next();
                                    return e
                                }()), o(i.next(), ")")) return {
                                method: t.method,
                                args: e,
                                name: name
                            };
                            throw new SyntaxError('Tone.Expr: Expected ) in a function call "' + t.value + '"')
                        }(t = i.next());
                        if ("value" === t.type) return {
                            method: (t = i.next()).method,
                            args: t.value
                        };
                        if (o(t, "(")) {
                            if (i.next(), e = a(), !o(t = i.next(), ")")) throw new SyntaxError("Expected )");
                            return e
                        }
                        throw new SyntaxError("Tone.Expr: Parse error, cannot process token " + t.value)
                    }()
                }() : a(t - 1);
                for (var n = i.peek(); r(n, "binary", t);) e = {
                    operator: (n = i.next()).value,
                    method: n.method,
                    args: [e, a(t - 1)]
                }, n = i.peek();
                return e
            }
            return a()
        }, u.Expr.prototype._eval = function(t) {
            if (!this.isUndef(t)) {
                var e = t.method(t.args, this);
                return this._nodes.push(e), e
            }
        }, u.Expr.prototype._disposeNodes = function() {
            for (var t = 0; t < this._nodes.length; t++) {
                var e = this._nodes[t];
                this.isFunction(e.dispose) ? e.dispose() : this.isFunction(e.disconnect) && e.disconnect(), e = null, this._nodes[t] = null
            }
            this._nodes = null
        }, u.Expr.prototype.dispose = function() {
            u.prototype.dispose.call(this), this._disposeNodes()
        }, u.Expr
    }.apply(e, i)) || (t.exports = o)
}, function(t, e, n) {
    var i, o;
    i = [n(0), n(26), n(16), n(2)], void 0 === (o = function(e) {
        "use strict";
        return e.GreaterThan = function(t) {
            this.createInsOuts(2, 0), this._param = this.input[0] = new e.Subtract(t), this.input[1] = this._param.input[1], this._gtz = this.output = new e.GreaterThanZero, this._param.connect(this._gtz)
        }, e.extend(e.GreaterThan, e.Signal), e.GreaterThan.prototype.dispose = function() {
            return e.prototype.dispose.call(this), this._param.dispose(), this._param = null, this._gtz.dispose(), this._gtz = null, this
        }, e.GreaterThan
    }.apply(e, i)) || (t.exports = o)
}, function(t, e, n) {
    var i, o;
    i = [n(0), n(5), n(19)], void 0 === (o = function(t) {
        "use strict";
        return t.Abs = function() {
            this._abs = this.input = this.output = new t.WaveShaper(function(t) {
                return 0 === t ? 0 : Math.abs(t)
            }, 127)
        }, t.extend(t.Abs, t.SignalBase), t.Abs.prototype.dispose = function() {
            return t.prototype.dispose.call(this), this._abs.dispose(), this._abs = null, this
        }, t.Abs
    }.apply(e, i)) || (t.exports = o)
}, function(t, e, n) {
    var i, o;
    i = [n(0), n(5), n(3), n(16)], void 0 === (o = function(e) {
        "use strict";
        return e.Modulo = function(t) {
            this.createInsOuts(1, 0), this._shaper = new e.WaveShaper(Math.pow(2, 16)), this._multiply = new e.Multiply, this._subtract = this.output = new e.Subtract, this._modSignal = new e.Signal(t), this.input.fan(this._shaper, this._subtract), this._modSignal.connect(this._multiply, 0, 0), this._shaper.connect(this._multiply, 0, 1), this._multiply.connect(this._subtract, 0, 1), this._setWaveShaper(t)
        }, e.extend(e.Modulo, e.SignalBase), e.Modulo.prototype._setWaveShaper = function(e) {
            this._shaper.setMap(function(t) {
                return Math.floor((t + 1e-4) / e)
            })
        }, Object.defineProperty(e.Modulo.prototype, "value", {
            get: function() {
                return this._modSignal.value
            },
            set: function(t) {
                this._modSignal.value = t, this._setWaveShaper(t)
            }
        }), e.Modulo.prototype.dispose = function() {
            return e.prototype.dispose.call(this), this._shaper.dispose(), this._shaper = null, this._multiply.dispose(), this._multiply = null, this._subtract.dispose(), this._subtract = null, this._modSignal.dispose(), this._modSignal = null, this
        }, e.Modulo
    }.apply(e, i)) || (t.exports = o)
}, function(t, e, n) {
    var i, o;
    i = [n(0), n(5)], void 0 === (o = function(e) {
        "use strict";
        return e.Pow = function(t) {
            this._exp = this.defaultArg(t, 1), this._expScaler = this.input = this.output = new e.WaveShaper(this._expFunc(this._exp), 8192)
        }, e.extend(e.Pow, e.SignalBase), Object.defineProperty(e.Pow.prototype, "value", {
            get: function() {
                return this._exp
            },
            set: function(t) {
                this._exp = t, this._expScaler.setMap(this._expFunc(this._exp))
            }
        }), e.Pow.prototype._expFunc = function(e) {
            return function(t) {
                return Math.pow(Math.abs(t), e)
            }
        }, e.Pow.prototype.dispose = function() {
            return e.prototype.dispose.call(this), this._expScaler.dispose(), this._expScaler = null, this
        }, e.Pow
    }.apply(e, i)) || (t.exports = o)
}, function(t, e, n) {
    var i, o;
    i = [n(0), n(5), n(2)], void 0 === (o = function(t) {
        "use strict";
        return t.AudioToGain = function() {
            this._norm = this.input = this.output = new t.WaveShaper(function(t) {
                return (t + 1) / 2
            })
        }, t.extend(t.AudioToGain, t.SignalBase), t.AudioToGain.prototype.dispose = function() {
            return t.prototype.dispose.call(this), this._norm.dispose(), this._norm = null, this
        }, t.AudioToGain
    }.apply(e, i)) || (t.exports = o)
}, function(t, e, n) {
    var i, o;
    i = [n(0), n(5)], void 0 === (o = function(t) {
        "use strict";
        return t.EqualPowerGain = function() {
            this._eqPower = this.input = this.output = new t.WaveShaper(function(t) {
                return Math.abs(t) < .001 ? 0 : this.equalPowerScale(t)
            }.bind(this), 4096)
        }, t.extend(t.EqualPowerGain, t.SignalBase), t.EqualPowerGain.prototype.dispose = function() {
            return t.prototype.dispose.call(this), this._eqPower.dispose(), this._eqPower = null, this
        }, t.EqualPowerGain
    }.apply(e, i)) || (t.exports = o)
}, function(t, e, i) {
    "use strict";
    var n;
    void 0 === (n = function(t) {
        var r = i(4),
            n = i(60);
        return p5.EQ = function(t) {
            var e, n, i;
            r.call(this), e = 3 === (t = 3 === t || 8 === t ? t : 3) ? Math.pow(2, 3) : 2, this.bands = [];
            for (var o = 0; o < t; o++) i = o === t - 1 ? (n = 21e3, .01) : 0 === o ? (n = 100, .1) : (n = 1 === o ? 3 === t ? 360 * e : 360 : this.bands[o - 1].freq() * e, 1), this.bands[o] = this._newBand(n, i), 0 < o ? this.bands[o - 1].connect(this.bands[o].biquad) : this.input.connect(this.bands[o].biquad);
            this.bands[t - 1].connect(this.output)
        }, p5.EQ.prototype = Object.create(r.prototype), p5.EQ.prototype.process = function(t) {
            t.connect(this.input)
        }, p5.EQ.prototype.set = function() {
            if (arguments.length === 2 * this.bands.length)
                for (var t = 0; t < arguments.length; t += 2) this.bands[t / 2].freq(arguments[t]), this.bands[t / 2].gain(arguments[t + 1])
        }, p5.EQ.prototype._newBand = function(t, e) {
            return new n(t, e)
        }, p5.EQ.prototype.dispose = function() {
            if (r.prototype.dispose.apply(this), this.bands) {
                for (; 0 < this.bands.length;) this.bands.pop().dispose();
                delete this.bands
            }
        }, p5.EQ
    }.call(e, i, e, t)) || (t.exports = n)
}, function(t, e, o) {
    "use strict";
    var n;
    void 0 === (n = function(t) {
        function e(t, e) {
            n.call(this, "peaking"), this.disconnect(), this.set(t, e), this.biquad.gain.value = 0, delete this.input, delete this.output, delete this._drywet, delete this.wet
        }
        var n = o(15),
            i = o(1);
        return (e.prototype = Object.create(n.prototype)).amp = function() {}, e.prototype.drywet = function() {}, e.prototype.connect = function(t) {
            var e = t || p5.soundOut.input;
            this.biquad ? this.biquad.connect(e.input ? e.input : e) : this.output.connect(e.input ? e.input : e)
        }, e.prototype.disconnect = function() {
            this.biquad && this.biquad.disconnect()
        }, e.prototype.dispose = function() {
            var t = i.soundArray.indexOf(this);
            i.soundArray.splice(t, 1), this.disconnect(), delete this.biquad
        }, e
    }.call(e, o, e, t)) || (t.exports = n)
}, function(t, e, n) {
    "use strict";
    var i;
    void 0 === (i = function(t) {
        n(1);
        var e = n(4);
        return p5.Panner3D = function() {
            e.call(this), this.panner = this.ac.createPanner(), this.panner.panningModel = "HRTF", this.panner.distanceModel = "linear", this.panner.connect(this.output), this.input.connect(this.panner)
        }, p5.Panner3D.prototype = Object.create(e.prototype), p5.Panner3D.prototype.process = function(t) {
            t.connect(this.input)
        }, p5.Panner3D.prototype.set = function(t, e, n, i) {
            return this.positionX(t, i), this.positionY(e, i), this.positionZ(n, i), [this.panner.positionX.value, this.panner.positionY.value, this.panner.positionZ.value]
        }, p5.Panner3D.prototype.positionX = function(t, e) {
            var n = e || 0;
            return "number" == typeof t ? (this.panner.positionX.value = t, this.panner.positionX.cancelScheduledValues(this.ac.currentTime + .01 + n), this.panner.positionX.linearRampToValueAtTime(t, this.ac.currentTime + .02 + n)) : t && t.connect(this.panner.positionX), this.panner.positionX.value
        }, p5.Panner3D.prototype.positionY = function(t, e) {
            var n = e || 0;
            return "number" == typeof t ? (this.panner.positionY.value = t, this.panner.positionY.cancelScheduledValues(this.ac.currentTime + .01 + n), this.panner.positionY.linearRampToValueAtTime(t, this.ac.currentTime + .02 + n)) : t && t.connect(this.panner.positionY), this.panner.positionY.value
        }, p5.Panner3D.prototype.positionZ = function(t, e) {
            var n = e || 0;
            return "number" == typeof t ? (this.panner.positionZ.value = t, this.panner.positionZ.cancelScheduledValues(this.ac.currentTime + .01 + n), this.panner.positionZ.linearRampToValueAtTime(t, this.ac.currentTime + .02 + n)) : t && t.connect(this.panner.positionZ), this.panner.positionZ.value
        }, p5.Panner3D.prototype.orient = function(t, e, n, i) {
            return this.orientX(t, i), this.orientY(e, i), this.orientZ(n, i), [this.panner.orientationX.value, this.panner.orientationY.value, this.panner.orientationZ.value]
        }, p5.Panner3D.prototype.orientX = function(t, e) {
            var n = e || 0;
            return "number" == typeof t ? (this.panner.orientationX.value = t, this.panner.orientationX.cancelScheduledValues(this.ac.currentTime + .01 + n), this.panner.orientationX.linearRampToValueAtTime(t, this.ac.currentTime + .02 + n)) : t && t.connect(this.panner.orientationX), this.panner.orientationX.value
        }, p5.Panner3D.prototype.orientY = function(t, e) {
            var n = e || 0;
            return "number" == typeof t ? (this.panner.orientationY.value = t, this.panner.orientationY.cancelScheduledValues(this.ac.currentTime + .01 + n), this.panner.orientationY.linearRampToValueAtTime(t, this.ac.currentTime + .02 + n)) : t && t.connect(this.panner.orientationY), this.panner.orientationY.value
        }, p5.Panner3D.prototype.orientZ = function(t, e) {
            var n = e || 0;
            return "number" == typeof t ? (this.panner.orientationZ.value = t, this.panner.orientationZ.cancelScheduledValues(this.ac.currentTime + .01 + n), this.panner.orientationZ.linearRampToValueAtTime(t, this.ac.currentTime + .02 + n)) : t && t.connect(this.panner.orientationZ), this.panner.orientationZ.value
        }, p5.Panner3D.prototype.setFalloff = function(t, e) {
            this.maxDist(t), this.rolloff(e)
        }, p5.Panner3D.prototype.maxDist = function(t) {
            return "number" == typeof t && (this.panner.maxDistance = t), this.panner.maxDistance
        }, p5.Panner3D.prototype.rolloff = function(t) {
            return "number" == typeof t && (this.panner.rolloffFactor = t), this.panner.rolloffFactor
        }, p5.Panner3D.dispose = function() {
            e.prototype.dispose.apply(this), this.panner && (this.panner.disconnect(), delete this.panner)
        }, p5.Panner3D
    }.call(e, n, e, t)) || (t.exports = i)
}, function(t, e, n) {
    "use strict";
    var i;
    void 0 === (i = function(t) {
        var e = n(1);
        n(4);
        return p5.Listener3D = function(t) {
            this.ac = e.audiocontext, this.listener = this.ac.listener
        }, p5.Listener3D.prototype.process = function(t) {
            t.connect(this.input)
        }, p5.Listener3D.prototype.position = function(t, e, n, i) {
            return this.positionX(t, i), this.positionY(e, i), this.positionZ(n, i), [this.listener.positionX.value, this.listener.positionY.value, this.listener.positionZ.value]
        }, p5.Listener3D.prototype.positionX = function(t, e) {
            var n = e || 0;
            return "number" == typeof t ? (this.listener.positionX.value = t, this.listener.positionX.cancelScheduledValues(this.ac.currentTime + .01 + n), this.listener.positionX.linearRampToValueAtTime(t, this.ac.currentTime + .02 + n)) : t && t.connect(this.listener.positionX), this.listener.positionX.value
        }, p5.Listener3D.prototype.positionY = function(t, e) {
            var n = e || 0;
            return "number" == typeof t ? (this.listener.positionY.value = t, this.listener.positionY.cancelScheduledValues(this.ac.currentTime + .01 + n), this.listener.positionY.linearRampToValueAtTime(t, this.ac.currentTime + .02 + n)) : t && t.connect(this.listener.positionY), this.listener.positionY.value
        }, p5.Listener3D.prototype.positionZ = function(t, e) {
            var n = e || 0;
            return "number" == typeof t ? (this.listener.positionZ.value = t, this.listener.positionZ.cancelScheduledValues(this.ac.currentTime + .01 + n), this.listener.positionZ.linearRampToValueAtTime(t, this.ac.currentTime + .02 + n)) : t && t.connect(this.listener.positionZ), this.listener.positionZ.value
        }, p5.Listener3D.prototype.orient = function(t, e, n, i, o, r, s) {
            return 3 === arguments.length || 4 === arguments.length ? (s = i, this.orientForward(t, e, n, s)) : 6 !== arguments.length && 7 !== arguments || (this.orientForward(t, e, n), this.orientUp(i, o, r, s)), [this.listener.forwardX.value, this.listener.forwardY.value, this.listener.forwardZ.value, this.listener.upX.value, this.listener.upY.value, this.listener.upZ.value]
        }, p5.Listener3D.prototype.orientForward = function(t, e, n, i) {
            return this.forwardX(t, i), this.forwardY(e, i), this.forwardZ(n, i), [this.listener.forwardX, this.listener.forwardY, this.listener.forwardZ]
        }, p5.Listener3D.prototype.orientUp = function(t, e, n, i) {
            return this.upX(t, i), this.upY(e, i), this.upZ(n, i), [this.listener.upX, this.listener.upY, this.listener.upZ]
        }, p5.Listener3D.prototype.forwardX = function(t, e) {
            var n = e || 0;
            return "number" == typeof t ? (this.listener.forwardX.value = t, this.listener.forwardX.cancelScheduledValues(this.ac.currentTime + .01 + n), this.listener.forwardX.linearRampToValueAtTime(t, this.ac.currentTime + .02 + n)) : t && t.connect(this.listener.forwardX), this.listener.forwardX.value
        }, p5.Listener3D.prototype.forwardY = function(t, e) {
            var n = e || 0;
            return "number" == typeof t ? (this.listener.forwardY.value = t, this.listener.forwardY.cancelScheduledValues(this.ac.currentTime + .01 + n), this.listener.forwardY.linearRampToValueAtTime(t, this.ac.currentTime + .02 + n)) : t && t.connect(this.listener.forwardY), this.listener.forwardY.value
        }, p5.Listener3D.prototype.forwardZ = function(t, e) {
            var n = e || 0;
            return "number" == typeof t ? (this.listener.forwardZ.value = t, this.listener.forwardZ.cancelScheduledValues(this.ac.currentTime + .01 + n), this.listener.forwardZ.linearRampToValueAtTime(t, this.ac.currentTime + .02 + n)) : t && t.connect(this.listener.forwardZ), this.listener.forwardZ.value
        }, p5.Listener3D.prototype.upX = function(t, e) {
            var n = e || 0;
            return "number" == typeof t ? (this.listener.upX.value = t, this.listener.upX.cancelScheduledValues(this.ac.currentTime + .01 + n), this.listener.upX.linearRampToValueAtTime(t, this.ac.currentTime + .02 + n)) : t && t.connect(this.listener.upX), this.listener.upX.value
        }, p5.Listener3D.prototype.upY = function(t, e) {
            var n = e || 0;
            return "number" == typeof t ? (this.listener.upY.value = t, this.listener.upY.cancelScheduledValues(this.ac.currentTime + .01 + n), this.listener.upY.linearRampToValueAtTime(t, this.ac.currentTime + .02 + n)) : t && t.connect(this.listener.upY), this.listener.upY.value
        }, p5.Listener3D.prototype.upZ = function(t, e) {
            var n = e || 0;
            return "number" == typeof t ? (this.listener.upZ.value = t, this.listener.upZ.cancelScheduledValues(this.ac.currentTime + .01 + n), this.listener.upZ.linearRampToValueAtTime(t, this.ac.currentTime + .02 + n)) : t && t.connect(this.listener.upZ), this.listener.upZ.value
        }, p5.Listener3D
    }.call(e, n, e, t)) || (t.exports = i)
}, function(t, e, i) {
    "use strict";
    var n;
    void 0 === (n = function(t) {
        var e = i(15),
            n = i(4);
        p5.Delay = function() {
            n.call(this), this._split = this.ac.createChannelSplitter(2), this._merge = this.ac.createChannelMerger(2), this._leftGain = this.ac.createGain(), this._rightGain = this.ac.createGain(), this.leftDelay = this.ac.createDelay(), this.rightDelay = this.ac.createDelay(), this._leftFilter = new e, this._rightFilter = new e, this._leftFilter.disconnect(), this._rightFilter.disconnect(), this._leftFilter.biquad.frequency.setValueAtTime(1200, this.ac.currentTime), this._rightFilter.biquad.frequency.setValueAtTime(1200, this.ac.currentTime), this._leftFilter.biquad.Q.setValueAtTime(.3, this.ac.currentTime), this._rightFilter.biquad.Q.setValueAtTime(.3, this.ac.currentTime), this.input.connect(this._split), this.leftDelay.connect(this._leftGain), this.rightDelay.connect(this._rightGain), this._leftGain.connect(this._leftFilter.input), this._rightGain.connect(this._rightFilter.input), this._merge.connect(this.wet), this._leftFilter.biquad.gain.setValueAtTime(1, this.ac.currentTime), this._rightFilter.biquad.gain.setValueAtTime(1, this.ac.currentTime), this.setType(0), this._maxDelay = this.leftDelay.delayTime.maxValue, this.feedback(.5)
        }, p5.Delay.prototype = Object.create(n.prototype), p5.Delay.prototype.process = function(t, e, n, i) {
            var o = n || 0,
                r = e || 0;
            if (1 <= o) throw new Error("Feedback value will force a positive feedback loop.");
            if (r >= this._maxDelay) throw new Error("Delay Time exceeds maximum delay time of " + this._maxDelay + " second.");
            t.connect(this.input), this.leftDelay.delayTime.setValueAtTime(r, this.ac.currentTime), this.rightDelay.delayTime.setValueAtTime(r, this.ac.currentTime), this._leftGain.gain.value = o, this._rightGain.gain.value = o, i && (this._leftFilter.freq(i), this._rightFilter.freq(i))
        }, p5.Delay.prototype.delayTime = function(t) {
            "number" != typeof t ? (t.connect(this.leftDelay.delayTime), t.connect(this.rightDelay.delayTime)) : (this.leftDelay.delayTime.cancelScheduledValues(this.ac.currentTime), this.rightDelay.delayTime.cancelScheduledValues(this.ac.currentTime), this.leftDelay.delayTime.linearRampToValueAtTime(t, this.ac.currentTime), this.rightDelay.delayTime.linearRampToValueAtTime(t, this.ac.currentTime))
        }, p5.Delay.prototype.feedback = function(t) {
            if (t && "number" != typeof t) t.connect(this._leftGain.gain), t.connect(this._rightGain.gain);
            else {
                if (1 <= t) throw new Error("Feedback value will force a positive feedback loop.");
                "number" == typeof t && (this._leftGain.gain.value = t, this._rightGain.gain.value = t)
            }
            return this._leftGain.gain.value
        }, p5.Delay.prototype.filter = function(t, e) {
            this._leftFilter.set(t, e), this._rightFilter.set(t, e)
        }, p5.Delay.prototype.setType = function(t) {
            switch (1 === t && (t = "pingPong"), this._split.disconnect(), this._leftFilter.disconnect(), this._rightFilter.disconnect(), this._split.connect(this.leftDelay, 0), this._split.connect(this.rightDelay, 1), t) {
                case "pingPong":
                    this._rightFilter.setType(this._leftFilter.biquad.type), this._leftFilter.output.connect(this._merge, 0, 0), this._rightFilter.output.connect(this._merge, 0, 1), this._leftFilter.output.connect(this.rightDelay), this._rightFilter.output.connect(this.leftDelay);
                    break;
                default:
                    this._leftFilter.output.connect(this._merge, 0, 0), this._rightFilter.output.connect(this._merge, 0, 1), this._leftFilter.output.connect(this.leftDelay), this._rightFilter.output.connect(this.rightDelay)
            }
        }, p5.Delay.prototype.dispose = function() {
            n.prototype.dispose.apply(this), this._split.disconnect(), this._leftFilter.dispose(), this._rightFilter.dispose(), this._merge.disconnect(), this._leftGain.disconnect(), this._rightGain.disconnect(), this.leftDelay.disconnect(), this.rightDelay.disconnect(), this._split = void 0, this._leftFilter = void 0, this._rightFilter = void 0, this._merge = void 0, this._leftGain = void 0, this._rightGain = void 0, this.leftDelay = void 0, this.rightDelay = void 0
        }
    }.call(e, i, e, t)) || (t.exports = n)
}, function(t, e, n) {
    "use strict";
    var i;
    void 0 === (i = function(t) {
        var p = n(11),
            e = n(4);
        p5.Reverb = function() {
            e.call(this), this._initConvolverNode(), this.input.gain.value = .5, this._seconds = 3, this._decay = 2, this._reverse = !1, this._buildImpulse()
        }, p5.Reverb.prototype = Object.create(e.prototype), p5.Reverb.prototype._initConvolverNode = function() {
            this.convolverNode = this.ac.createConvolver(), this.input.connect(this.convolverNode), this.convolverNode.connect(this.wet)
        }, p5.Reverb.prototype._teardownConvolverNode = function() {
            this.convolverNode && (this.convolverNode.disconnect(), delete this.convolverNode)
        }, p5.Reverb.prototype._setBuffer = function(t) {
            this._teardownConvolverNode(), this._initConvolverNode(), this.convolverNode.buffer = t
        }, p5.Reverb.prototype.process = function(t, e, n, i) {
            t.connect(this.input);
            var o = !1;
            e && (this._seconds = e, o = !0), n && (this._decay = n), i && (this._reverse = i), o && this._buildImpulse()
        }, p5.Reverb.prototype.set = function(t, e, n) {
            var i = !1;
            t && (this._seconds = t, i = !0), e && (this._decay = e), n && (this._reverse = n), i && this._buildImpulse()
        }, p5.Reverb.prototype._buildImpulse = function() {
            var t, e, n = this.ac.sampleRate,
                i = n * this._seconds,
                o = this._decay,
                r = this.ac.createBuffer(2, i, n),
                s = r.getChannelData(0),
                a = r.getChannelData(1);
            for (e = 0; e < i; e++) t = this._reverse ? i - e : e, s[e] = (2 * Math.random() - 1) * Math.pow(1 - t / i, o), a[e] = (2 * Math.random() - 1) * Math.pow(1 - t / i, o);
            this._setBuffer(r)
        }, p5.Reverb.prototype.dispose = function() {
            e.prototype.dispose.apply(this), this._teardownConvolverNode()
        }, p5.Convolver = function(t, e, n) {
            p5.Reverb.call(this), this._initConvolverNode(), this.input.gain.value = .5, t ? (this.impulses = [], this._loadBuffer(t, e, n)) : (this._seconds = 3, this._decay = 2, this._reverse = !1, this._buildImpulse())
        }, p5.Convolver.prototype = Object.create(p5.Reverb.prototype), p5.prototype.registerPreloadMethod("createConvolver", p5.prototype), p5.prototype.createConvolver = function(t, e, n) {
            -1 < window.location.origin.indexOf("file://") && "undefined" === window.cordova && alert("This sketch may require a server to load external files. Please see http://bit.ly/1qcInwS");
            var i = this,
                o = new p5.Convolver(t, function(t) {
                    "function" == typeof e && e(t), "function" == typeof i._decrementPreload && i._decrementPreload()
                }, n);
            return o.impulses = [], o
        }, p5.Convolver.prototype._loadBuffer = function(i, o, n) {
            i = p5.prototype._checkFileFormats(i);
            var r = this,
                s = (new Error).stack,
                a = p5.prototype.getAudioContext(),
                u = new XMLHttpRequest;
            u.open("GET", i, !0), u.responseType = "arraybuffer", u.onload = function() {
                if (200 === u.status) a.decodeAudioData(u.response, function(t) {
                    var e = {},
                        n = i.split("/");
                    e.name = n[n.length - 1], e.audioBuffer = t, r.impulses.push(e), r._setBuffer(e.audioBuffer), o && o(e)
                }, function() {
                    var t = new p("decodeAudioData", s, r.url),
                        e = "AudioContext error at decodeAudioData for " + r.url;
                    n && (t.msg = e, n(t))
                });
                else {
                    var t = new p("loadConvolver", s, r.url),
                        e = "Unable to load " + r.url + ". The request status was: " + u.status + " (" + u.statusText + ")";
                    n && (t.message = e, n(t))
                }
            }, u.onerror = function() {
                var t = new p("loadConvolver", s, r.url),
                    e = "There was no response from the server at " + r.url + ". Check the url and internet connectivity.";
                n && (t.message = e, n(t))
            }, u.send()
        }, p5.Convolver.prototype.set = null, p5.Convolver.prototype.process = function(t) {
            t.connect(this.input)
        }, p5.Convolver.prototype.impulses = [], p5.Convolver.prototype.addImpulse = function(t, e, n) {
            -1 < window.location.origin.indexOf("file://") && "undefined" === window.cordova && alert("This sketch may require a server to load external files. Please see http://bit.ly/1qcInwS"), this._loadBuffer(t, e, n)
        }, p5.Convolver.prototype.resetImpulse = function(t, e, n) {
            -1 < window.location.origin.indexOf("file://") && "undefined" === window.cordova && alert("This sketch may require a server to load external files. Please see http://bit.ly/1qcInwS"), this.impulses = [], this._loadBuffer(t, e, n)
        }, p5.Convolver.prototype.toggleImpulse = function(t) {
            if ("number" == typeof t && t < this.impulses.length && this._setBuffer(this.impulses[t].audioBuffer), "string" == typeof t)
                for (var e = 0; e < this.impulses.length; e++)
                    if (this.impulses[e].name === t) {
                        this._setBuffer(this.impulses[e].audioBuffer);
                        break
                    }
        }, p5.Convolver.prototype.dispose = function() {
            for (var t in p5.Reverb.prototype.dispose.apply(this), this.impulses) this.impulses[t] && (this.impulses[t] = null)
        }
    }.call(e, n, e, t)) || (t.exports = i)
}, function(t, e, n) {
    "use strict";
    var i;
    void 0 === (i = function(t) {
        var r = n(1),
            e = n(27);
        p5.Metro = function() {
            this.clock = new e({
                callback: this.ontick.bind(this)
            }), this.syncedParts = [], this.bpm = 120, this._init(), this.prevTick = 0, this.tatumTime = 0, this.tickCallback = function() {}
        }, p5.Metro.prototype.ontick = function(t) {
            var e = t - this.prevTick,
                i = t - r.audiocontext.currentTime;
            if (!(e - this.tatumTime <= -.02)) {
                this.prevTick = t;
                var o = this;
                this.syncedParts.forEach(function(t) {
                    t.isPlaying && (t.incrementStep(i), t.phrases.forEach(function(t) {
                        var e = t.sequence,
                            n = o.metroTicks % e.length;
                        0 !== e[n] && (o.metroTicks < e.length || !t.looping) && t.callback(i, e[n])
                    }))
                }), this.metroTicks += 1, this.tickCallback(i)
            }
        }, p5.Metro.prototype.setBPM = function(t, e) {
            var n = 60 / (t * this.tatums),
                i = r.audiocontext.currentTime;
            this.tatumTime = n;
            e = e || 0;
            this.clock.frequency.setValueAtTime(this.clock.frequency.value, i), this.clock.frequency.linearRampToValueAtTime(t, i + e), this.bpm = t
        }, p5.Metro.prototype.getBPM = function() {
            return this.clock.getRate() / this.tatums * 60
        }, p5.Metro.prototype._init = function() {
            this.metroTicks = 0
        }, p5.Metro.prototype.resetSync = function(t) {
            this.syncedParts = [t]
        }, p5.Metro.prototype.pushSync = function(t) {
            this.syncedParts.push(t)
        }, p5.Metro.prototype.start = function(t) {
            var e = t || 0,
                n = r.audiocontext.currentTime;
            this.clock.start(n + e), this.setBPM(this.bpm)
        }, p5.Metro.prototype.stop = function(t) {
            var e = t || 0,
                n = r.audiocontext.currentTime;
            this.clock.stop(n + e)
        }, p5.Metro.prototype.beatLength = function(t) {
            this.tatums = 1 / t / 4
        }
    }.call(e, n, e, t)) || (t.exports = i)
}, function(t, e, n) {
    var i, o;
    i = [n(0), n(24), n(8)], void 0 === (o = function(e) {
        "use strict";
        return e.TimelineState = function(t) {
            e.Timeline.call(this), this._initial = t
        }, e.extend(e.TimelineState, e.Timeline), e.TimelineState.prototype.getValueAtTime = function(t) {
            var e = this.get(t);
            return null !== e ? e.state : this._initial
        }, e.TimelineState.prototype.setStateAtTime = function(t, e) {
            this.add({
                state: t,
                time: e
            })
        }, e.TimelineState
    }.apply(e, i)) || (t.exports = o)
}, function(t, e, r) {
    "use strict";
    var n;
    void 0 === (n = function(t) {
        var i = r(1),
            o = 120;

        function n(t) {
            t.currentPart++, t.currentPart >= t.parts.length ? (t.scoreStep = 0, t.onended()) : (t.scoreStep = 0, t.parts[t.currentPart - 1].stop(), t.parts[t.currentPart].start())
        }
        p5.prototype.setBPM = function(t, e) {
            for (var n in o = t, i.parts) i.parts[n] && i.parts[n].setBPM(t, e)
        }, p5.Phrase = function(t, e, n) {
            this.phraseStep = 0, this.name = t, this.callback = e, this.sequence = n
        }, p5.Part = function(t, e) {
            this.length = t || 0, this.partStep = 0, this.phrases = [], this.isPlaying = !1, this.noLoop(), this.tatums = e || .0625, this.metro = new p5.Metro, this.metro._init(), this.metro.beatLength(this.tatums), this.metro.setBPM(o), i.parts.push(this), this.callback = function() {}
        }, p5.Part.prototype.setBPM = function(t, e) {
            this.metro.setBPM(t, e)
        }, p5.Part.prototype.getBPM = function() {
            return this.metro.getBPM()
        }, p5.Part.prototype.start = function(t) {
            if (!this.isPlaying) {
                this.isPlaying = !0, this.metro.resetSync(this);
                var e = t || 0;
                this.metro.start(e)
            }
        }, p5.Part.prototype.loop = function(t) {
            this.looping = !0, this.onended = function() {
                this.partStep = 0
            };
            var e = t || 0;
            this.start(e)
        }, p5.Part.prototype.noLoop = function() {
            this.looping = !1, this.onended = function() {
                this.stop()
            }
        }, p5.Part.prototype.stop = function(t) {
            this.partStep = 0, this.pause(t)
        }, p5.Part.prototype.pause = function(t) {
            this.isPlaying = !1;
            var e = t || 0;
            this.metro.stop(e)
        }, p5.Part.prototype.addPhrase = function(t, e, n) {
            var i;
            if (3 === arguments.length) i = new p5.Phrase(t, e, n);
            else {
                if (!(t instanceof p5.Phrase)) throw "invalid input. addPhrase accepts name, callback, array or a p5.Phrase";
                i = t
            }
            this.phrases.push(i), i.sequence.length > this.length && (this.length = i.sequence.length)
        }, p5.Part.prototype.removePhrase = function(t) {
            for (var e in this.phrases) this.phrases[e].name === t && this.phrases.splice(e, 1)
        }, p5.Part.prototype.getPhrase = function(t) {
            for (var e in this.phrases)
                if (this.phrases[e].name === t) return this.phrases[e]
        }, p5.Part.prototype.replaceSequence = function(t, e) {
            for (var n in this.phrases) this.phrases[n].name === t && (this.phrases[n].sequence = e)
        }, p5.Part.prototype.incrementStep = function(t) {
            this.partStep < this.length - 1 ? (this.callback(t), this.partStep += 1) : this.looping || this.partStep !== this.length - 1 || this.onended()
        }, p5.Part.prototype.onStep = function(t) {
            this.callback = t
        }, p5.Score = function() {
            this.parts = [], this.currentPart = 0;
            var t = this;
            for (var e in arguments) arguments[e] && this.parts[e] && (this.parts[e] = arguments[e], this.parts[e].nextPart = this.parts[e + 1], this.parts[e].onended = function() {
                t.resetPart(e), n(t)
            });
            this.looping = !1
        }, p5.Score.prototype.onended = function() {
            this.looping ? this.parts[0].start() : this.parts[this.parts.length - 1].onended = function() {
                this.stop(), this.resetParts()
            }, this.currentPart = 0
        }, p5.Score.prototype.start = function() {
            this.parts[this.currentPart].start(), this.scoreStep = 0
        }, p5.Score.prototype.stop = function() {
            this.parts[this.currentPart].stop(), this.currentPart = 0, this.scoreStep = 0
        }, p5.Score.prototype.pause = function() {
            this.parts[this.currentPart].stop()
        }, p5.Score.prototype.loop = function() {
            this.looping = !0, this.start()
        }, p5.Score.prototype.noLoop = function() {
            this.looping = !1
        }, p5.Score.prototype.resetParts = function() {
            var e = this;
            this.parts.forEach(function(t) {
                e.resetParts[t]
            })
        }, p5.Score.prototype.resetPart = function(t) {
            for (var e in this.parts[t].stop(), this.parts[t].partStep = 0, this.parts[t].phrases) this.parts[t] && (this.parts[t].phrases[e].phraseStep = 0)
        }, p5.Score.prototype.setBPM = function(t, e) {
            for (var n in this.parts) this.parts[n] && this.parts[n].setBPM(t, e)
        }
    }.call(e, r, e, t)) || (t.exports = n)
}, function(t, e, n) {
    "use strict";
    var i;
    void 0 === (i = function(t) {
        var r = n(1),
            i = n(27);
        return p5.SoundLoop = function(t, e) {
            this.callback = t, this.musicalTimeMode = "number" != typeof this._interval, this._interval = e || 1, this._timeSignature = 4, this._bpm = 60, this.isPlaying = !1, this.maxIterations = 1 / 0;
            var n = this;
            this.clock = new i({
                callback: function(t) {
                    var e = t - r.audiocontext.currentTime;
                    0 < e && n.iterations <= n.maxIterations && n.callback(e)
                },
                frequency: this._calcFreq()
            })
        }, p5.SoundLoop.prototype.start = function(t) {
            var e = t || 0,
                n = r.audiocontext.currentTime;
            this.isPlaying || (this.clock.start(n + e), this.isPlaying = !0)
        }, p5.SoundLoop.prototype.stop = function(t) {
            var e = t || 0,
                n = r.audiocontext.currentTime;
            this.isPlaying && (this.clock.stop(n + e), this.isPlaying = !1)
        }, p5.SoundLoop.prototype.pause = function(t) {
            var e = t || 0,
                n = r.audiocontext.currentTime;
            this.isPlaying && (this.clock.pause(n + e), this.isPlaying = !1)
        }, p5.SoundLoop.prototype.syncedStart = function(t, e) {
            var n = e || 0,
                i = r.audiocontext.currentTime;
            if (t.isPlaying) {
                if (t.isPlaying) {
                    var o = t.clock._nextTick - r.audiocontext.currentTime;
                    this.clock.start(i + o), this.isPlaying = !0
                }
            } else t.clock.start(i + n), t.isPlaying = !0, this.clock.start(i + n), this.isPlaying = !0
        }, p5.SoundLoop.prototype._update = function() {
            this.clock.frequency.value = this._calcFreq()
        }, p5.SoundLoop.prototype._calcFreq = function() {
            return "number" == typeof this._interval ? (this.musicalTimeMode = !1, 1 / this._interval) : "string" == typeof this._interval ? (this.musicalTimeMode = !0, this._bpm / 60 / this._convertNotation(this._interval) * (this._timeSignature / 4)) : void 0
        }, p5.SoundLoop.prototype._convertNotation = function(t) {
            var e = t.slice(-1);
            switch (t = Number(t.slice(0, -1)), e) {
                case "m":
                    return this._measure(t);
                case "n":
                    return this._note(t)
            }
        }, p5.SoundLoop.prototype._measure = function(t) {
            return t * this._timeSignature
        }, p5.SoundLoop.prototype._note = function(t) {
            return this._timeSignature / t
        }, Object.defineProperty(p5.SoundLoop.prototype, "bpm", {
            get: function() {
                return this._bpm
            },
            set: function(t) {
                this.musicalTimeMode, this._bpm = t, this._update()
            }
        }), Object.defineProperty(p5.SoundLoop.prototype, "timeSignature", {
            get: function() {
                return this._timeSignature
            },
            set: function(t) {
                this.musicalTimeMode, this._timeSignature = t, this._update()
            }
        }), Object.defineProperty(p5.SoundLoop.prototype, "interval", {
            get: function() {
                return this._interval
            },
            set: function(t) {
                this.musicalTimeMode = "Number" != typeof t, this._interval = t, this._update()
            }
        }), Object.defineProperty(p5.SoundLoop.prototype, "iterations", {
            get: function() {
                return this.clock.ticks
            }
        }), p5.SoundLoop
    }.call(e, n, e, t)) || (t.exports = i)
}, function(t, e, n) {
    var i;
    void 0 === (i = function(t) {
        "use strict";
        n(1);
        var e = n(4);
        n(11);
        return p5.Compressor = function() {
            e.call(this), this.compressor = this.ac.createDynamicsCompressor(), this.input.connect(this.compressor), this.compressor.connect(this.wet)
        }, p5.Compressor.prototype = Object.create(e.prototype), p5.Compressor.prototype.process = function(t, e, n, i, o, r) {
            t.connect(this.input), this.set(e, n, i, o, r)
        }, p5.Compressor.prototype.set = function(t, e, n, i, o) {
            void 0 !== t && this.attack(t), void 0 !== e && this.knee(e), void 0 !== n && this.ratio(n), void 0 !== i && this.threshold(i), void 0 !== o && this.release(o)
        }, p5.Compressor.prototype.attack = function(t, e) {
            var n = e || 0;
            return "number" == typeof t ? (this.compressor.attack.value = t, this.compressor.attack.cancelScheduledValues(this.ac.currentTime + .01 + n), this.compressor.attack.linearRampToValueAtTime(t, this.ac.currentTime + .02 + n)) : void 0 !== t && t.connect(this.compressor.attack), this.compressor.attack.value
        }, p5.Compressor.prototype.knee = function(t, e) {
            var n = e || 0;
            return "number" == typeof t ? (this.compressor.knee.value = t, this.compressor.knee.cancelScheduledValues(this.ac.currentTime + .01 + n), this.compressor.knee.linearRampToValueAtTime(t, this.ac.currentTime + .02 + n)) : void 0 !== t && t.connect(this.compressor.knee), this.compressor.knee.value
        }, p5.Compressor.prototype.ratio = function(t, e) {
            var n = e || 0;
            return "number" == typeof t ? (this.compressor.ratio.value = t, this.compressor.ratio.cancelScheduledValues(this.ac.currentTime + .01 + n), this.compressor.ratio.linearRampToValueAtTime(t, this.ac.currentTime + .02 + n)) : void 0 !== t && t.connect(this.compressor.ratio), this.compressor.ratio.value
        }, p5.Compressor.prototype.threshold = function(t, e) {
            var n = e || 0;
            return "number" == typeof t ? (this.compressor.threshold.value = t, this.compressor.threshold.cancelScheduledValues(this.ac.currentTime + .01 + n), this.compressor.threshold.linearRampToValueAtTime(t, this.ac.currentTime + .02 + n)) : void 0 !== t && t.connect(this.compressor.threshold), this.compressor.threshold.value
        }, p5.Compressor.prototype.release = function(t, e) {
            var n = e || 0;
            return "number" == typeof t ? (this.compressor.release.value = t, this.compressor.release.cancelScheduledValues(this.ac.currentTime + .01 + n), this.compressor.release.linearRampToValueAtTime(t, this.ac.currentTime + .02 + n)) : "undefined" != typeof number && t.connect(this.compressor.release), this.compressor.release.value
        }, p5.Compressor.prototype.reduction = function() {
            return this.compressor.reduction.value
        }, p5.Compressor.prototype.dispose = function() {
            e.prototype.dispose.apply(this), this.compressor && (this.compressor.disconnect(), delete this.compressor)
        }, p5.Compressor
    }.call(e, n, e, t)) || (t.exports = i)
}, function(t, e, a) {
    "use strict";
    var n;
    void 0 === (n = function(t) {
        var e = a(1),
            n = a(6),
            i = n.convertToWav,
            o = n.safeBufferSize,
            r = a(10),
            s = e.audiocontext;
        p5.SoundRecorder = function() {
            this.input = s.createGain(), this.output = s.createGain(), this._inputChannels = 2, this._outputChannels = 2;
            var t = o(1024);
            this._workletNode = new AudioWorkletNode(s, r.recorderProcessor, {
                outputChannelCount: [this._outputChannels],
                processorOptions: {
                    numInputChannels: this._inputChannels,
                    bufferSize: t
                }
            }), this._workletNode.port.onmessage = function(t) {
                if ("buffers" === t.data.name) {
                    var e = [new Float32Array(t.data.leftBuffer), new Float32Array(t.data.rightBuffer)];
                    this._callback(e)
                }
            }.bind(this), this._callback = function() {}, this._workletNode.connect(p5.soundOut._silentNode), this.setInput(), e.soundArray.push(this)
        }, p5.SoundRecorder.prototype.setInput = function(t) {
            this.input.disconnect(), this.input = null, this.input = s.createGain(), this.input.connect(this._workletNode), this.input.connect(this.output), t ? t.connect(this.input) : p5.soundOut.output.connect(this.input)
        }, p5.SoundRecorder.prototype.record = function(e, t, n) {
            this._workletNode.port.postMessage({
                name: "start",
                duration: t
            }), e && n ? this._callback = function(t) {
                e.setBuffer(t), n()
            } : e && (this._callback = function(t) {
                e.setBuffer(t)
            })
        }, p5.SoundRecorder.prototype.stop = function() {
            this._workletNode.port.postMessage({
                name: "stop"
            })
        }, p5.SoundRecorder.prototype.dispose = function() {
            var t = e.soundArray.indexOf(this);
            e.soundArray.splice(t, 1), this._callback = function() {}, this.input && this.input.disconnect(), this.input = null, this._workletNode = null
        }, p5.prototype.saveSound = function(t, e) {
            var n = i(t.buffer);
            p5.prototype.writeFile([n], e, "wav")
        }
    }.call(e, a, e, t)) || (t.exports = n)
}, function(t, e, n) {
    "use strict";
    var i;
    void 0 === (i = function() {
        p5.PeakDetect = function(t, e, n, i) {
            this.framesPerPeak = i || 20, this.framesSinceLastPeak = 0, this.decayRate = .95, this.threshold = n || .35, this.cutoff = 0, this.cutoffMult = 1.5, this.energy = 0, this.penergy = 0, this.currentValue = 0, this.isDetected = !1, this.f1 = t || 40, this.f2 = e || 2e4, this._onPeak = function() {}
        }, p5.PeakDetect.prototype.update = function(t) {
            var e = this.energy = t.getEnergy(this.f1, this.f2) / 255;
            e > this.cutoff && e > this.threshold && 0 < e - this.penergy ? (this._onPeak(), this.isDetected = !0, this.cutoff = e * this.cutoffMult, this.framesSinceLastPeak = 0) : (this.isDetected = !1, this.framesSinceLastPeak <= this.framesPerPeak ? this.framesSinceLastPeak++ : (this.cutoff *= this.decayRate, this.cutoff = Math.max(this.cutoff, this.threshold))), this.currentValue = e, this.penergy = e
        }, p5.PeakDetect.prototype.onPeak = function(t, e) {
            var n = this;
            n._onPeak = function() {
                t(n.energy, e)
            }
        }
    }.call(e, n, e, t)) || (t.exports = i)
}, function(t, e, n) {
    "use strict";
    var i;
    void 0 === (i = function(t) {
        var r = n(1);
        p5.Gain = function() {
            this.ac = r.audiocontext, this.input = this.ac.createGain(), this.output = this.ac.createGain(), this.input.gain.value = .5, this.input.connect(this.output), r.soundArray.push(this)
        }, p5.Gain.prototype.setInput = function(t) {
            t.connect(this.input)
        }, p5.Gain.prototype.connect = function(t) {
            var e = t || p5.soundOut.input;
            this.output.connect(e.input ? e.input : e)
        }, p5.Gain.prototype.disconnect = function() {
            this.output && this.output.disconnect()
        }, p5.Gain.prototype.amp = function(t, e, n) {
            e = e || 0, n = n || 0;
            var i = r.audiocontext.currentTime,
                o = this.output.gain.value;
            this.output.gain.cancelScheduledValues(i), this.output.gain.linearRampToValueAtTime(o, i + n), this.output.gain.linearRampToValueAtTime(t, i + n + e)
        }, p5.Gain.prototype.dispose = function() {
            var t = r.soundArray.indexOf(this);
            r.soundArray.splice(t, 1), this.output && (this.output.disconnect(), delete this.output), this.input && (this.input.disconnect(), delete this.input)
        }
    }.call(e, n, e, t)) || (t.exports = i)
}, function(t, e, n) {
    "use strict";
    var i;
    void 0 === (i = function(t) {
        var i = n(4);

        function o(t) {
            for (var e, n = "number" == typeof t ? t : 50, i = new Float32Array(44100), o = Math.PI / 180, r = 0; r < 44100; ++r) e = 2 * r / 44100 - 1, i[r] = (3 + n) * e * 20 * o / (Math.PI + n * Math.abs(e));
            return i
        }
        p5.Distortion = function(t, e) {
            if (i.call(this), void 0 === t && (t = .25), "number" != typeof t) throw new Error("amount must be a number");
            if (void 0 === e && (e = "2x"), "string" != typeof e) throw new Error("oversample must be a String");
            var n = p5.prototype.map(t, 0, 1, 0, 2e3);
            this.waveShaperNode = this.ac.createWaveShaper(), this.amount = n, this.waveShaperNode.curve = o(n), this.waveShaperNode.oversample = e, this.input.connect(this.waveShaperNode), this.waveShaperNode.connect(this.wet)
        }, p5.Distortion.prototype = Object.create(i.prototype), p5.Distortion.prototype.process = function(t, e, n) {
            t.connect(this.input), this.set(e, n)
        }, p5.Distortion.prototype.set = function(t, e) {
            if (t) {
                var n = p5.prototype.map(t, 0, 1, 0, 2e3);
                this.amount = n, this.waveShaperNode.curve = o(n)
            }
            e && (this.waveShaperNode.oversample = e)
        }, p5.Distortion.prototype.getAmount = function() {
            return this.amount
        }, p5.Distortion.prototype.getOversample = function() {
            return this.waveShaperNode.oversample
        }, p5.Distortion.prototype.dispose = function() {
            i.prototype.dispose.apply(this), this.waveShaperNode && (this.waveShaperNode.disconnect(), this.waveShaperNode = null)
        }
    }.call(e, n, e, t)) || (t.exports = i)
}]);
//# sourceMappingURL=p5.sound.min.js.map 