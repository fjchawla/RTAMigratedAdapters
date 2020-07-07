//Adapter Constants
var adapterName = "ePayAdapter";


//Helpers Functions
/**
 * the below code comes from a HMAC-SHA512 encryption library found on the following link
 * http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/hmac-sha512.js
 * 
 * for more details, please refer to the google project
 * https://code.google.com/p/crypto-js/#HMAC
 */
/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
 */
var CryptoJS = CryptoJS || function (a, j) {
	var c = {}, b = c.lib = {}, f = function () { }, l = b.Base = { extend: function (a) { f.prototype = this; var d = new f; a && d.mixIn(a); d.hasOwnProperty("init") || (d.init = function () { d.$super.init.apply(this, arguments) }); d.init.prototype = d; d.$super = this; return d }, create: function () { var a = this.extend(); a.init.apply(a, arguments); return a }, init: function () { }, mixIn: function (a) { for (var d in a) a.hasOwnProperty(d) && (this[d] = a[d]); a.hasOwnProperty("toString") && (this.toString = a.toString) }, clone: function () { return this.init.prototype.extend(this) } },
	u = b.WordArray = l.extend({
		init: function (a, d) { a = this.words = a || []; this.sigBytes = d != j ? d : 4 * a.length }, toString: function (a) { return (a || m).stringify(this) }, concat: function (a) { var d = this.words, M = a.words, e = this.sigBytes; a = a.sigBytes; this.clamp(); if (e % 4) for (var b = 0; b < a; b++)d[e + b >>> 2] |= (M[b >>> 2] >>> 24 - 8 * (b % 4) & 255) << 24 - 8 * ((e + b) % 4); else if (65535 < M.length) for (b = 0; b < a; b += 4)d[e + b >>> 2] = M[b >>> 2]; else d.push.apply(d, M); this.sigBytes += a; return this }, clamp: function () {
			var D = this.words, d = this.sigBytes; D[d >>> 2] &= 4294967295 <<
			32 - 8 * (d % 4); D.length = a.ceil(d / 4)
		}, clone: function () { var a = l.clone.call(this); a.words = this.words.slice(0); return a }, random: function (D) { for (var d = [], b = 0; b < D; b += 4)d.push(4294967296 * a.random() | 0); return new u.init(d, D) }
	}), k = c.enc = {}, m = k.Hex = {
		stringify: function (a) { var d = a.words; a = a.sigBytes; for (var b = [], e = 0; e < a; e++) { var c = d[e >>> 2] >>> 24 - 8 * (e % 4) & 255; b.push((c >>> 4).toString(16)); b.push((c & 15).toString(16)) } return b.join("") }, parse: function (a) {
			for (var d = a.length, b = [], e = 0; e < d; e += 2)b[e >>> 3] |= parseInt(a.substr(e,
					2), 16) << 24 - 4 * (e % 8); return new u.init(b, d / 2)
		}
	}, y = k.Latin1 = { stringify: function (a) { var b = a.words; a = a.sigBytes; for (var c = [], e = 0; e < a; e++)c.push(String.fromCharCode(b[e >>> 2] >>> 24 - 8 * (e % 4) & 255)); return c.join("") }, parse: function (a) { for (var b = a.length, c = [], e = 0; e < b; e++)c[e >>> 2] |= (a.charCodeAt(e) & 255) << 24 - 8 * (e % 4); return new u.init(c, b) } }, z = k.Utf8 = { stringify: function (a) { try { return decodeURIComponent(escape(y.stringify(a))) } catch (b) { throw Error("Malformed UTF-8 data"); } }, parse: function (a) { return y.parse(unescape(encodeURIComponent(a))) } },
	x = b.BufferedBlockAlgorithm = l.extend({
		reset: function () { this._data = new u.init; this._nDataBytes = 0 }, _append: function (a) { "string" == typeof a && (a = z.parse(a)); this._data.concat(a); this._nDataBytes += a.sigBytes }, _process: function (b) { var d = this._data, c = d.words, e = d.sigBytes, l = this.blockSize, k = e / (4 * l), k = b ? a.ceil(k) : a.max((k | 0) - this._minBufferSize, 0); b = k * l; e = a.min(4 * b, e); if (b) { for (var x = 0; x < b; x += l)this._doProcessBlock(c, x); x = c.splice(0, b); d.sigBytes -= e } return new u.init(x, e) }, clone: function () {
			var a = l.clone.call(this);
			a._data = this._data.clone(); return a
		}, _minBufferSize: 0
	}); b.Hasher = x.extend({
		cfg: l.extend(), init: function (a) { this.cfg = this.cfg.extend(a); this.reset() }, reset: function () { x.reset.call(this); this._doReset() }, update: function (a) { this._append(a); this._process(); return this }, finalize: function (a) { a && this._append(a); return this._doFinalize() }, blockSize: 16, _createHelper: function (a) { return function (b, c) { return (new a.init(c)).finalize(b) } }, _createHmacHelper: function (a) {
			return function (b, c) {
				return (new ja.HMAC.init(a,
						c)).finalize(b)
			}
		}
	}); var ja = c.algo = {}; return c
}(Math);
(function (a) { var j = CryptoJS, c = j.lib, b = c.Base, f = c.WordArray, j = j.x64 = {}; j.Word = b.extend({ init: function (a, b) { this.high = a; this.low = b } }); j.WordArray = b.extend({ init: function (b, c) { b = this.words = b || []; this.sigBytes = c != a ? c : 8 * b.length }, toX32: function () { for (var a = this.words, b = a.length, c = [], m = 0; m < b; m++) { var y = a[m]; c.push(y.high); c.push(y.low) } return f.create(c, this.sigBytes) }, clone: function () { for (var a = b.clone.call(this), c = a.words = this.words.slice(0), k = c.length, f = 0; f < k; f++)c[f] = c[f].clone(); return a } }) })();
(function () {
	function a() { return f.create.apply(f, arguments) } for (var j = CryptoJS, c = j.lib.Hasher, b = j.x64, f = b.Word, l = b.WordArray, b = j.algo, u = [a(1116352408, 3609767458), a(1899447441, 602891725), a(3049323471, 3964484399), a(3921009573, 2173295548), a(961987163, 4081628472), a(1508970993, 3053834265), a(2453635748, 2937671579), a(2870763221, 3664609560), a(3624381080, 2734883394), a(310598401, 1164996542), a(607225278, 1323610764), a(1426881987, 3590304994), a(1925078388, 4068182383), a(2162078206, 991336113), a(2614888103, 633803317),
	                                                                                                                                                       a(3248222580, 3479774868), a(3835390401, 2666613458), a(4022224774, 944711139), a(264347078, 2341262773), a(604807628, 2007800933), a(770255983, 1495990901), a(1249150122, 1856431235), a(1555081692, 3175218132), a(1996064986, 2198950837), a(2554220882, 3999719339), a(2821834349, 766784016), a(2952996808, 2566594879), a(3210313671, 3203337956), a(3336571891, 1034457026), a(3584528711, 2466948901), a(113926993, 3758326383), a(338241895, 168717936), a(666307205, 1188179964), a(773529912, 1546045734), a(1294757372, 1522805485), a(1396182291,
	                                                                                                                                                    		   2643833823), a(1695183700, 2343527390), a(1986661051, 1014477480), a(2177026350, 1206759142), a(2456956037, 344077627), a(2730485921, 1290863460), a(2820302411, 3158454273), a(3259730800, 3505952657), a(3345764771, 106217008), a(3516065817, 3606008344), a(3600352804, 1432725776), a(4094571909, 1467031594), a(275423344, 851169720), a(430227734, 3100823752), a(506948616, 1363258195), a(659060556, 3750685593), a(883997877, 3785050280), a(958139571, 3318307427), a(1322822218, 3812723403), a(1537002063, 2003034995), a(1747873779, 3602036899),
	                                                                                                                                                    		   a(1955562222, 1575990012), a(2024104815, 1125592928), a(2227730452, 2716904306), a(2361852424, 442776044), a(2428436474, 593698344), a(2756734187, 3733110249), a(3204031479, 2999351573), a(3329325298, 3815920427), a(3391569614, 3928383900), a(3515267271, 566280711), a(3940187606, 3454069534), a(4118630271, 4000239992), a(116418474, 1914138554), a(174292421, 2731055270), a(289380356, 3203993006), a(460393269, 320620315), a(685471733, 587496836), a(852142971, 1086792851), a(1017036298, 365543100), a(1126000580, 2618297676), a(1288033470,
	                                                                                                                                                    				   3409855158), a(1501505948, 4234509866), a(1607167915, 987167468), a(1816402316, 1246189591)], k = [], m = 0; 80 > m; m++)k[m] = a(); b = b.SHA512 = c.extend({
	                                                                                                                                                    					   _doReset: function () { this._hash = new l.init([new f.init(1779033703, 4089235720), new f.init(3144134277, 2227873595), new f.init(1013904242, 4271175723), new f.init(2773480762, 1595750129), new f.init(1359893119, 2917565137), new f.init(2600822924, 725511199), new f.init(528734635, 4215389547), new f.init(1541459225, 327033209)]) }, _doProcessBlock: function (a, b) {
	                                                                                                                                                    						   for (var c = this._hash.words,
	                                                                                                                                                    								   f = c[0], j = c[1], d = c[2], l = c[3], e = c[4], m = c[5], N = c[6], c = c[7], aa = f.high, O = f.low, ba = j.high, P = j.low, ca = d.high, Q = d.low, da = l.high, R = l.low, ea = e.high, S = e.low, fa = m.high, T = m.low, ga = N.high, U = N.low, ha = c.high, V = c.low, r = aa, n = O, G = ba, E = P, H = ca, F = Q, Y = da, I = R, s = ea, p = S, W = fa, J = T, X = ga, K = U, Z = ha, L = V, t = 0; 80 > t; t++) {
	                                                                                                                                                    							   var A = k[t]; if (16 > t) var q = A.high = a[b + 2 * t] | 0, g = A.low = a[b + 2 * t + 1] | 0; else {
	                                                                                                                                                    								   var q = k[t - 15], g = q.high, v = q.low, q = (g >>> 1 | v << 31) ^ (g >>> 8 | v << 24) ^ g >>> 7, v = (v >>> 1 | g << 31) ^ (v >>> 8 | g << 24) ^ (v >>> 7 | g << 25), C = k[t - 2], g = C.high, h = C.low, C = (g >>> 19 |
	                                                                                                                                                    										   h << 13) ^ (g << 3 | h >>> 29) ^ g >>> 6, h = (h >>> 19 | g << 13) ^ (h << 3 | g >>> 29) ^ (h >>> 6 | g << 26), g = k[t - 7], $ = g.high, B = k[t - 16], w = B.high, B = B.low, g = v + g.low, q = q + $ + (g >>> 0 < v >>> 0 ? 1 : 0), g = g + h, q = q + C + (g >>> 0 < h >>> 0 ? 1 : 0), g = g + B, q = q + w + (g >>> 0 < B >>> 0 ? 1 : 0); A.high = q; A.low = g
	                                                                                                                                                    							   } var $ = s & W ^ ~s & X, B = p & J ^ ~p & K, A = r & G ^ r & H ^ G & H, ka = n & E ^ n & F ^ E & F, v = (r >>> 28 | n << 4) ^ (r << 30 | n >>> 2) ^ (r << 25 | n >>> 7), C = (n >>> 28 | r << 4) ^ (n << 30 | r >>> 2) ^ (n << 25 | r >>> 7), h = u[t], la = h.high, ia = h.low, h = L + ((p >>> 14 | s << 18) ^ (p >>> 18 | s << 14) ^ (p << 23 | s >>> 9)), w = Z + ((s >>> 14 | p << 18) ^ (s >>> 18 | p << 14) ^ (s << 23 | p >>> 9)) + (h >>>
	                                                                                                                                                    							   0 < L >>> 0 ? 1 : 0), h = h + B, w = w + $ + (h >>> 0 < B >>> 0 ? 1 : 0), h = h + ia, w = w + la + (h >>> 0 < ia >>> 0 ? 1 : 0), h = h + g, w = w + q + (h >>> 0 < g >>> 0 ? 1 : 0), g = C + ka, A = v + A + (g >>> 0 < C >>> 0 ? 1 : 0), Z = X, L = K, X = W, K = J, W = s, J = p, p = I + h | 0, s = Y + w + (p >>> 0 < I >>> 0 ? 1 : 0) | 0, Y = H, I = F, H = G, F = E, G = r, E = n, n = h + g | 0, r = w + A + (n >>> 0 < h >>> 0 ? 1 : 0) | 0
	                                                                                                                                                    						   } O = f.low = O + n; f.high = aa + r + (O >>> 0 < n >>> 0 ? 1 : 0); P = j.low = P + E; j.high = ba + G + (P >>> 0 < E >>> 0 ? 1 : 0); Q = d.low = Q + F; d.high = ca + H + (Q >>> 0 < F >>> 0 ? 1 : 0); R = l.low = R + I; l.high = da + Y + (R >>> 0 < I >>> 0 ? 1 : 0); S = e.low = S + p; e.high = ea + s + (S >>> 0 < p >>> 0 ? 1 : 0); T = m.low = T + J; m.high = fa + W + (T >>> 0 < J >>> 0 ? 1 :
	                                                                                                                                                    							   0); U = N.low = U + K; N.high = ga + X + (U >>> 0 < K >>> 0 ? 1 : 0); V = c.low = V + L; c.high = ha + Z + (V >>> 0 < L >>> 0 ? 1 : 0)
	                                                                                                                                                    					   }, _doFinalize: function () { var a = this._data, b = a.words, c = 8 * this._nDataBytes, f = 8 * a.sigBytes; b[f >>> 5] |= 128 << 24 - f % 32; b[(f + 128 >>> 10 << 5) + 30] = Math.floor(c / 4294967296); b[(f + 128 >>> 10 << 5) + 31] = c; a.sigBytes = 4 * b.length; this._process(); return this._hash.toX32() }, clone: function () { var a = c.clone.call(this); a._hash = this._hash.clone(); return a }, blockSize: 32
	                                                                                                                                                    				   }); j.SHA512 = c._createHelper(b); j.HmacSHA512 = c._createHmacHelper(b)
})();
(function () {
	var a = CryptoJS, j = a.enc.Utf8; a.algo.HMAC = a.lib.Base.extend({
		init: function (a, b) { a = this._hasher = new a.init; "string" == typeof b && (b = j.parse(b)); var f = a.blockSize, l = 4 * f; b.sigBytes > l && (b = a.finalize(b)); b.clamp(); for (var u = this._oKey = b.clone(), k = this._iKey = b.clone(), m = u.words, y = k.words, z = 0; z < f; z++)m[z] ^= 1549556828, y[z] ^= 909522486; u.sigBytes = k.sigBytes = l; this.reset() }, reset: function () { var a = this._hasher; a.reset(); a.update(this._iKey) }, update: function (a) { this._hasher.update(a); return this }, finalize: function (a) {
			var b =
				this._hasher; a = b.finalize(a); b.reset(); return b.finalize(this._oKey.clone().concat(a))
		}
	})
})();

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*  AES implementation in JavaScript                     (c) Chris Veness 2005-2014 / MIT License */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
//Base64 library
!function () { function t(t) { this.message = t } var r = "undefined" != typeof exports ? exports : this, e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="; t.prototype = new Error, t.prototype.name = "InvalidCharacterError", r.btoa || (r.btoa = function (r) { for (var o, n, a = String(r), i = 0, c = e, d = ""; a.charAt(0 | i) || (c = "=", i % 1); d += c.charAt(63 & o >> 8 - i % 1 * 8)) { if (n = a.charCodeAt(i += .75), n > 255) throw new t("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range."); o = o << 8 | n } return d }), r.atob || (r.atob = function (r) { var o = String(r).replace(/=+$/, ""); if (o.length % 4 == 1) throw new t("'atob' failed: The string to be decoded is not correctly encoded."); for (var n, a, i = 0, c = 0, d = ""; a = o.charAt(c++); ~a && (n = i % 4 ? 64 * n + a : a, i++ % 4) ? d += String.fromCharCode(255 & n >> (-2 * i & 6)) : 0)a = e.indexOf(a); return d }) }();
//AES library
"use strict"; var Aes = {}; if (Aes.cipher = function (e, r) { for (var o = 4, n = r.length / o - 1, t = [[], [], [], []], a = 0; 4 * o > a; a++)t[a % 4][Math.floor(a / 4)] = e[a]; t = Aes.addRoundKey(t, r, 0, o); for (var f = 1; n > f; f++)t = Aes.subBytes(t, o), t = Aes.shiftRows(t, o), t = Aes.mixColumns(t, o), t = Aes.addRoundKey(t, r, f, o); t = Aes.subBytes(t, o), t = Aes.shiftRows(t, o), t = Aes.addRoundKey(t, r, n, o); for (var s = new Array(4 * o), a = 0; 4 * o > a; a++)s[a] = t[a % 4][Math.floor(a / 4)]; return s }, Aes.keyExpansion = function (e) { for (var r = 4, o = e.length / 4, n = o + 6, t = new Array(r * (n + 1)), a = new Array(4), f = 0; o > f; f++) { var s = [e[4 * f], e[4 * f + 1], e[4 * f + 2], e[4 * f + 3]]; t[f] = s } for (var f = o; r * (n + 1) > f; f++) { t[f] = new Array(4); for (var i = 0; 4 > i; i++)a[i] = t[f - 1][i]; if (f % o == 0) { a = Aes.subWord(Aes.rotWord(a)); for (var i = 0; 4 > i; i++)a[i] ^= Aes.rCon[f / o][i] } else o > 6 && f % o == 4 && (a = Aes.subWord(a)); for (var i = 0; 4 > i; i++)t[f][i] = t[f - o][i] ^ a[i] } return t }, Aes.subBytes = function (e, r) { for (var o = 0; 4 > o; o++)for (var n = 0; r > n; n++)e[o][n] = Aes.sBox[e[o][n]]; return e }, Aes.shiftRows = function (e, r) { for (var o = new Array(4), n = 1; 4 > n; n++) { for (var t = 0; 4 > t; t++)o[t] = e[n][(t + n) % r]; for (var t = 0; 4 > t; t++)e[n][t] = o[t] } return e }, Aes.mixColumns = function (e) { for (var r = 0; 4 > r; r++) { for (var o = new Array(4), n = new Array(4), t = 0; 4 > t; t++)o[t] = e[t][r], n[t] = 128 & e[t][r] ? e[t][r] << 1 ^ 283 : e[t][r] << 1; e[0][r] = n[0] ^ o[1] ^ n[1] ^ o[2] ^ o[3], e[1][r] = o[0] ^ n[1] ^ o[2] ^ n[2] ^ o[3], e[2][r] = o[0] ^ o[1] ^ n[2] ^ o[3] ^ n[3], e[3][r] = o[0] ^ n[0] ^ o[1] ^ o[2] ^ n[3] } return e }, Aes.addRoundKey = function (e, r, o, n) { for (var t = 0; 4 > t; t++)for (var a = 0; n > a; a++)e[t][a] ^= r[4 * o + a][t]; return e }, Aes.subWord = function (e) { for (var r = 0; 4 > r; r++)e[r] = Aes.sBox[e[r]]; return e }, Aes.rotWord = function (e) { for (var r = e[0], o = 0; 3 > o; o++)e[o] = e[o + 1]; return e[3] = r, e }, Aes.sBox = [99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22], Aes.rCon = [[0, 0, 0, 0], [1, 0, 0, 0], [2, 0, 0, 0], [4, 0, 0, 0], [8, 0, 0, 0], [16, 0, 0, 0], [32, 0, 0, 0], [64, 0, 0, 0], [128, 0, 0, 0], [27, 0, 0, 0], [54, 0, 0, 0]], "undefined" != typeof module && module.exports && (module.exports = Aes), "function" == typeof define && define.amd && define([], function () { return Aes }), "undefined" != typeof module && module.exports) var Aes = require("./aes"); Aes.Ctr = {}, Aes.Ctr.encrypt = function (e, r, o) { var n = 16; if (128 != o && 192 != o && 256 != o) return ""; e = String(e).utf8Encode(), r = String(r).utf8Encode(); for (var t = o / 8, a = new Array(t), f = 0; t > f; f++)a[f] = isNaN(r.charCodeAt(f)) ? 0 : r.charCodeAt(f); var s = Aes.cipher(a, Aes.keyExpansion(a)); s = s.concat(s.slice(0, t - 16)); for (var i = new Array(n), d = (new Date).getTime(), u = d % 1e3, c = Math.floor(d / 1e3), A = Math.floor(65535 * Math.random()), f = 0; 2 > f; f++)i[f] = u >>> 8 * f & 255; for (var f = 0; 2 > f; f++)i[f + 2] = A >>> 8 * f & 255; for (var f = 0; 4 > f; f++)i[f + 4] = c >>> 8 * f & 255; for (var y = "", f = 0; 8 > f; f++)y += String.fromCharCode(i[f]); for (var p = Aes.keyExpansion(s), v = Math.ceil(e.length / n), h = new Array(v), l = 0; v > l; l++) { for (var g = 0; 4 > g; g++)i[15 - g] = l >>> 8 * g & 255; for (var g = 0; 4 > g; g++)i[15 - g - 4] = l / 4294967296 >>> 8 * g; for (var w = Aes.cipher(i, p), C = v - 1 > l ? n : (e.length - 1) % n + 1, m = new Array(C), f = 0; C > f; f++)m[f] = w[f] ^ e.charCodeAt(l * n + f), m[f] = String.fromCharCode(m[f]); h[l] = m.join("") } var b = y + h.join(""); return b = b.base64Encode() }, Aes.Ctr.decrypt = function (e, r, o) { var n = 16; if (128 != o && 192 != o && 256 != o) return ""; e = String(e).base64Decode(), r = String(r).utf8Encode(); for (var t = o / 8, a = new Array(t), f = 0; t > f; f++)a[f] = isNaN(r.charCodeAt(f)) ? 0 : r.charCodeAt(f); var s = Aes.cipher(a, Aes.keyExpansion(a)); s = s.concat(s.slice(0, t - 16)); for (var i = new Array(8), d = e.slice(0, 8), f = 0; 8 > f; f++)i[f] = d.charCodeAt(f); for (var u = Aes.keyExpansion(s), c = Math.ceil((e.length - 8) / n), A = new Array(c), y = 0; c > y; y++)A[y] = e.slice(8 + y * n, 8 + y * n + n); e = A; for (var p = new Array(e.length), y = 0; c > y; y++) { for (var v = 0; 4 > v; v++)i[15 - v] = y >>> 8 * v & 255; for (var v = 0; 4 > v; v++)i[15 - v - 4] = (y + 1) / 4294967296 - 1 >>> 8 * v & 255; for (var h = Aes.cipher(i, u), l = new Array(e[y].length), f = 0; f < e[y].length; f++)l[f] = h[f] ^ e[y].charCodeAt(f), l[f] = String.fromCharCode(l[f]); p[y] = l.join("") } var g = p.join(""); return g = g.utf8Decode() }, "undefined" == typeof String.prototype.utf8Encode && (String.prototype.utf8Encode = function () { return unescape(encodeURIComponent(this)) }), "undefined" == typeof String.prototype.utf8Decode && (String.prototype.utf8Decode = function () { try { return decodeURIComponent(escape(this)) } catch (e) { return this } }), "undefined" == typeof String.prototype.base64Encode && (String.prototype.base64Encode = function () { if ("undefined" != typeof btoa) return btoa(this); if ("undefined" != typeof Base64) return Base64.encode(this); throw new Error("No Base64 Encode") }), "undefined" == typeof String.prototype.base64Decode && (String.prototype.base64Decode = function () { if ("undefined" != typeof atob) return atob(this); if ("undefined" != typeof Base64) return Base64.decode(this); throw new Error("No Base64 Decode") }), "undefined" != typeof module && module.exports && (module.exports = Aes.Ctr), "function" == typeof define && define.amd && define(["Aes"], function () { return Aes.Ctr });
/* 
 * End AES implementation
 */
var ENCRYPTION_ENFORCED = MFP.Server.getPropertyValue("epay.Encryption.ENFORCE_ENCRYPTION");
if ('false' == ENCRYPTION_ENFORCED) ENCRYPTION_ENFORCED = false;
else ENCRYPTION_ENFORCED = true;
var ENCRYPTION_STRENGTH = MFP.Server.getPropertyValue("epay.Encryption.STRENGTH");
if ('256' == ENCRYPTION_STRENGTH) ENCRYPTION_STRENGTH = 256;
else ENCRYPTION_STRENGTH = 128;
var AMOUNT_VERIFICATION_ENFORCED = MFP.Server.getPropertyValue("epay.ENFORCE_AMOUNT_VERIFICATION");
if ('false' == AMOUNT_VERIFICATION_ENFORCED) AMOUNT_VERIFICATION_ENFORCED = false;
else AMOUNT_VERIFICATION_ENFORCED = true;
var REQ_RECENT_ACTIVITIES_TOKEN = MFP.Server.getPropertyValue("tokens.recentActivities");
var legacyAppsArray = new Array(); //Please configure apps that will use ePay4 in server configuration
if (MFP.Server.getPropertyValue("epay.LegacyApps.COUNT")) {
	for (var i = 0; i < MFP.Server.getPropertyValue("epay.LegacyApps.COUNT"); i++) {
		legacyAppsArray.push(MFP.Server.getPropertyValue("epay.LegacyApps.APP" + i));
	}
}
var arabic = /[\u0600-\u06FF]/;
var wsseSecurityHeader = '<soapenv:Header>' + '<wsse:Security xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" ' + 'xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">' + '<wsse:UsernameToken wsu:Id="UsernameToken-102"><wsse:Username>' + MFP.Server.getPropertyValue("tokens.tipcoService.username") + '</wsse:Username>' + '<wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">' + MFP.Server.getPropertyValue("tokens.tipcoService.password") + '</wsse:Password>' + '</wsse:UsernameToken></wsse:Security></soapenv:Header>';
var soapPrefix = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" ' + 'xmlns:sch="http://www.rta.ae/ActiveMatrix/ESB/ePayService/XMLSchema/Schema.xsd" ' + 'xmlns:com="http://www.rta.ae/ActiveMatrix/ESB/ePayService/XMLSchema/CommonTypesSchema.xsd">' + wsseSecurityHeader;
var soapSuffix = '</soapenv:Envelope>';

function unescapeXml(xmlText) {
	return xmlText.replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&');
}


function toString(param) {
	try {
		var isBoolean = function (arg) { return typeof arg === 'boolean'; }
		var isNumber = function (arg) { return typeof arg === 'number'; }
		var isString = function (arg) { return typeof arg === 'string'; }
		var isFunction = function (arg) { return typeof arg === 'function'; }
		var isObject = function (arg) { return typeof arg === 'object'; }
		var isUndefined = function (arg) { return typeof arg === 'undefined'; }

		if (isUndefined(param)) {
			return "undefined";
		} else if (isObject(param)) {
			return JSON.stringify(param);
		} else if (isString(param)) {
			return param;
		} else {
			//in case of numbers and boolean functions
			return param.toString();
		}
	} catch(e){
		return param;
	}
}

function adapterLogger(procudureName , type , suffix, msg ){
	var _msg = msg || "";
	try{
		var prefix= "|" + adapterName+" |" + procudureName +" |"+ suffix + " : " ;
		switch(type){
		case "error":
			MFP.Logger.error(prefix + _msg);
			break;
		case "warn":
			MFP.Logger.warn(prefix+_msg);
			break;
		case "info":
			MFP.Logger.info(prefix+ _msg);
			break;
		}
	}catch(e){
		MFP.Logger.error("| ePayAdapter |adapterLogger |Exception" + JSON.stringify(e));
	}
}


function handleError(msg,code){
	var msg= msg || "Internal Server Error";
	var code =code||500;

	adapterLogger("handleError","error", "Internal Error",JSON.stringify([msg,code]));
	var response = {
			"isSuccessful": false,
			"error": {
				"code": code,
				"message": msg,
				"adapter": "portalAdapter"
			}
	};
	adapterLogger("handleError","error", "Internal Error",JSON.stringify(response));
	return response;
}

function formatNum(num) {
	var r = "" + num;
	if (r.length < 2) {
		r = "0" + r;
	}
	return r;
}

function getSoapTimeStamp(d) {
	return d.getUTCFullYear() + '-' + formatNum(d.getUTCMonth() + 1) + '-' + formatNum(d.getUTCDate()) + 'T' + formatNum(d.getUTCHours()) + ':' + formatNum(d.getUTCMinutes()) + ':' + formatNum(d.getUTCSeconds()) + '+00:00';
}

function invokeWebService(body, headers) {
	try{
		var input = {
				method: 'post',
				returnedContentType: 'xml',
				returnedContentEncoding: 'utf-8',
				path: '/epayservice',
				headers: headers,
				body: {
					content: body.toString(),
					contentType: 'text/xml; charset=utf-8'
				}
		};
		return MFP.Server.invokeHttp(input);
	}
	catch(e){
		adapterLogger("invokeWebService","error", "Exception",toString(e));
	}
}


function testlogging() {
	try {
		var x = y * z;
	} catch (e) {
		//		var error = JSON.stringify(e);
		var error = e.messages || "testlogging Exception";
		return serverErrorHandler(error);
	}
}

function getResponseTokenDetails(token) {
	var request = soapPrefix + '<soapenv:Body><sch:getResponseTokenDetails><sch:responseToken>' + token + '</sch:responseToken><sch:spCode>' + MFP.Server.getPropertyValue("epay.DSGOptions.SPCODE") + '</sch:spCode><sch:servCode>' + MFP.Server.getPropertyValue("epay.DSGOptions.SERVCODE") + '</sch:servCode></sch:getResponseTokenDetails></soapenv:Body>' + soapSuffix;
	return invokeWebService(request, {
		SOAPAction: 'getResponseTokenDetails'
	});
}

function serverErrorHandler(error) {
	return {
		isSuccessful: false,
		errorCode: "99",
		errorMessage: error || "Server Error"
	};
}

//Adapter Procdures
function ePayQueryTransactionStatus(sptrn) {
	try{
		var request = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" ' + 'xmlns:epay="http://www.rta.ae/ActiveMatrix/ESB/ePayService/XMLSchema/ePayStatusSchema.xsd">' + wsseSecurityHeader + '<soapenv:Body><epay:getTransactionStatus><epay:spCode>' + MFP.Server.getPropertyValue("epay.DSGOptions.SPCODE") + '</epay:spCode><epay:servCode>' + MFP.Server.getPropertyValue("epay.DSGOptions.SERVCODE") + '</epay:servCode><epay:spTrn>' + sptrn + '</epay:spTrn></epay:getTransactionStatus></soapenv:Body></soapenv:Envelope>';
		var input = {
				method: 'post',
				returnedContentType: 'plain', //This is intentional to keep compatibility with old code that handles XML
				returnedContentEncoding: 'utf-8',
				path: '/epaystatus',
				headers: {
					SOAPAction: 'getTransactionStatus'
				},
				body: {
					content: request.toString(),
					contentType: 'text/xml; charset=utf-8'
				}
		};
		//	MFP.Logger.info("|ePayAdapter |ePayQueryTransactionStatus |Request: "  + JSON.stringify(request));
		adapterLogger("ePayQueryTransactionStatus","info", "Request",toString(request));
		var returnedData = MFP.Server.invokeHttp(input);
		if (returnedData.isSuccessful) {
			returnedData = unescapeXml(returnedData.text);
		}
		//MFP.Logger.info("|ePayAdapter |ePayQueryTransactionStatus |SPTRN: " + sptrn + " |response: " + JSON.stringify(returnedData));
		adapterLogger("ePayQueryTransactionStatus","info", "response",toString(returnedData));
		return returnedData;
	}
	catch(e){
		adapterLogger("ePayQueryTransactionStatus","error", "Exception",toString(e));
		return handleError();
	}
}

function verifyOptions(DSGOptions) {
	try{
		if (!(DSGOptions.SPTRN
				&& DSGOptions.AMOUNT
				&& 'AUTHENTICATED' in DSGOptions
				&& 'SERVICENAMEEN' in DSGOptions
				&& 'SERVICENAMEAR' in DSGOptions
				&& DSGOptions.SERVICEID
				&& DSGOptions.ACCOUNTID
				&& DSGOptions.BENIFICIARYTYPE
				&& DSGOptions.APPNAME
				&& DSGOptions.PROVIDER_APPNAME)) {
			//MFP.Logger.error("|Error-Adapter |ePayAdapter |verifyOptions |DSGOptions: First Condition :  " + JSON.stringify(DSGOptions));
			adapterLogger("verifyOptions","info", "DSGOptions: First Condition :  ",toString(DSGOptions));
			return false;
		}
		if ((DSGOptions.AUTHENTICATED == true || DSGOptions.AUTHENTICATED == 'YES')
				&& !(DSGOptions.USERNAME
						&& 'FULLNAMEEN' in DSGOptions //Property must exist but might be empty
						&& 'FULLNAMEAR' in DSGOptions
						&& DSGOptions.MOBILENO
						&& 'NATIONALITY' in DSGOptions
						/*&& 'EMIRATESID' in DSGOptions*/
				)) {
			//Logged in user
			//MFP.Logger.error("|Error-Adapter |ePayAdapter |verifyOptions |DSGOptions: Second Condition :  " + JSON.stringify(DSGOptions));
			adapterLogger("verifyOptions","info", "DSGOptions: Second Condition :  ",toString(DSGOptions));
			return false;
		}
		if (DSGOptions.BENIFICIARYTYPE == 'Corporate' && !(DSGOptions.COMPANYNAMEEN && DSGOptions.COMPANYNAMEAR && DSGOptions.TRADELICENSE
				/*&& DSGOptions.ISSUINGAUTHORITY*/
		)) {
			//MFP.Logger.error("|Error-Adapter |ePayAdapter |verifyOptions |DSGOptions: Third Condition" + JSON.stringify(DSGOptions));
			adapterLogger("verifyOptions","info", "DSGOptions: Third Condition :  ",toString(DSGOptions));
			return false;
		}
		return true;
	}
	catch(e){
		adapterLogger("verifyOptions","error", "Exception",toString(e));
		return handleError();
	}
}


function generateTransactionToken(DSGOptions) {
	try {
		DSGOptions.TIMESTAMP = getSoapTimeStamp(new Date());
		var request = soapPrefix + '<soapenv:Body><sch:generateTransactionToken><sch:transactionInfo><sch:spCode>' + MFP.Server.getPropertyValue("epay.DSGOptions.SPCODE") + '</sch:spCode><sch:servCode>' + MFP.Server.getPropertyValue("epay.DSGOptions.SERVCODE") + '</sch:servCode><sch:sptrn>' + DSGOptions.SPTRN + '</sch:sptrn><sch:amount currency="' + MFP.Server.getPropertyValue("epay.DSGOptions.CURRENCY") + '">' + DSGOptions.AMOUNT + '</sch:amount><sch:timestamp>' + DSGOptions.TIMESTAMP + '</sch:timestamp><sch:description>' + DSGOptions.SERVICENAMEEN + '</sch:description>' + '<sch:type>' + MFP.Server.getPropertyValue("epay.DSGOptions.TYPE") + '</sch:type>' + '<sch:versionCode>' + MFP.Server.getPropertyValue("epay.DSGOptions.VERSIONCODE") + '</sch:versionCode><sch:paymentChannel>' + MFP.Server.getPropertyValue("epay.DSGOptions.PYMTCHANNELCODE") + '</sch:paymentChannel></sch:transactionInfo>';
		if (DSGOptions.AUTHENTICATED) {
			//Validate name so we don't send garbage
			if (DSGOptions.FULLNAMEEN && arabic.test(DSGOptions.FULLNAMEEN)) {
				DSGOptions.FULLNAMEAR = DSGOptions.FULLNAMEEN;
				DSGOptions.FULLNAMEEN = null;
			}
			if (DSGOptions.FULLNAMEAR && !arabic.test(DSGOptions.FULLNAMEAR)) {
				DSGOptions.FULLNAMEAR = null;
			}
			request += '<sch:userInfo><sch:isAuthenticated>true</sch:isAuthenticated>' + '<sch:userId></sch:userId><sch:userName>' + DSGOptions.USERNAME + '</sch:userName>';
			if (DSGOptions.FULLNAMEEN) {
				request += '<sch:fullNameEn>' + DSGOptions.FULLNAMEEN + '</sch:fullNameEn>';
			}
			if (DSGOptions.FULLNAMEAR) {
				request += '<sch:fullNameAr>' + DSGOptions.FULLNAMEAR + '</sch:fullNameAr>';
			}
			request += '<sch:mobileNo>' + DSGOptions.MOBILENO + '</sch:mobileNo><sch:email>' + DSGOptions.USERNAME + '</sch:email>';
			if (DSGOptions.NATIONALITY && (DSGOptions.NATIONALITY.length == 3)) {
				request += '<sch:nationalityCode>' + DSGOptions.NATIONALITY + '</sch:nationalityCode>';
			}
			if (DSGOptions.EMIRATESID && DSGOptions.EMIRATESID.length == 15) {
				request += '<sch:emiratesId>' + DSGOptions.EMIRATESID + '</sch:emiratesId>';
			}
			request += '</sch:userInfo>';
		} else {
			request += '<sch:userInfo><sch:isAuthenticated>false</sch:isAuthenticated>' + '<sch:userId></sch:userId><sch:userName></sch:userName><sch:fullNameEn>' + '</sch:fullNameEn><sch:fullNameAr></sch:fullNameAr><sch:mobileNo>' + '</sch:mobileNo><sch:email></sch:email></sch:userInfo>';
		}
		request += '<sch:serviceInfos><sch:service><sch:serviceNameEn>' + DSGOptions.SERVICENAMEEN + '</sch:serviceNameEn><sch:serviceNameAr>' + DSGOptions.SERVICENAMEAR + '</sch:serviceNameAr><sch:serviceId>' + DSGOptions.SERVICEID + '</sch:serviceId><sch:gessServiceId></sch:gessServiceId>' + '<sch:beneficiaryInfos><sch:beneficiaryInfo><sch:accountId>' + DSGOptions.ACCOUNTID + '</sch:accountId><sch:txnAmount currency="' + MFP.Server.getPropertyValue("epay.DSGOptions.CURRENCY") + '">' + DSGOptions.AMOUNT + '</sch:txnAmount>';
		if (DSGOptions.AUTHENTICATED) {
			if (DSGOptions.FULLNAMEEN) {
				request += '<sch:fullNameEn>' + DSGOptions.FULLNAMEEN + '</sch:fullNameEn>';
			}
			if (DSGOptions.FULLNAMEAR) {
				request += '<sch:fullNameAr>' + DSGOptions.FULLNAMEAR + '</sch:fullNameAr>';
			}
			request += '<sch:mobileNo>' + DSGOptions.MOBILENO + '</sch:mobileNo><sch:email>' + DSGOptions.USERNAME + '</sch:email>';
		}
		if (DSGOptions.EMIRATESID && DSGOptions.EMIRATESID.length == 15) {
			request += '<sch:emiratesId>' + DSGOptions.EMIRATESID + '</sch:emiratesId>';
		}
		request += '<sch:type>' + DSGOptions.BENIFICIARYTYPE + '</sch:type>';
		if (DSGOptions.BENIFICIARYTYPE == 'Corporate') {
			request += '<sch:companyInfo><sch:companyNameEn>' + DSGOptions.COMPANYNAMEEN + '</sch:companyNameEn><sch:companyNameAr>' + DSGOptions.COMPANYNAMEAR + '</sch:companyNameAr><sch:tradeLicenseNumber>' + DSGOptions.TRADELICENSE + '</sch:tradeLicenseNumber>';
			if (DSGOptions.ISSUINGAUTHORITY) {
				request += '<sch:licenseIssuingAuthority>' + DSGOptions.ISSUINGAUTHORITY + '</sch:licenseIssuingAuthority>';
			}
			request += '</sch:companyInfo>';
		}
		request += '</sch:beneficiaryInfo></sch:beneficiaryInfos>' + '<sch:additionalParams><com:entry><com:key>AppName</com:key><com:value>' + DSGOptions.APPNAME + '</com:value></com:entry></sch:additionalParams></sch:service>' + '</sch:serviceInfos></sch:generateTransactionToken></soapenv:Body>' + soapSuffix;

		//MFP.Logger.info("|ePayAdapter |generateTransactionToken |Request: " + JSON.stringify(request));
		adapterLogger("generateTransactionToken","info", "Request",toString(request));
		var response = invokeWebService(request, {
			SOAPAction: 'generateTransactionToken'
		});
		//MFP.Logger.info("|ePayAdapter |generateTransactionToken |Response: " + JSON.stringify(response));
		adapterLogger("generateTransactionToken","info", "Request",toString(response));

		return response;
	} catch (e) {
		adapterLogger("generateTransactionToken","error", "Exception",toString(e));
		return handleError();

		/*var error = e.message || "generateTransactionToken Exception";
		MFP.Logger.error("|ePayAdapter |generateTransactionToken |Exception |Error: " + error);
		return serverErrorHandler(error);*/
	}
}

//Adapter Procdures

function updateStatusUsingToken(token, recentActivitiesToken) {
	try{
		if ((recentActivitiesToken == MFP.Server.getPropertyValue("tokens.recentActivities")) && token) {
			var responseTokenDetails = getResponseTokenDetails(token);
			//MFP.Logger.info("updateStatusUsingToken |response: " + JSON.stringify(responseTokenDetails));
			adapterLogger("generateTransactionToken","info", "response",toString(responseTokenDetails));
			if (responseTokenDetails && responseTokenDetails.isSuccessful && responseTokenDetails.Envelope && responseTokenDetails.Envelope.Body && responseTokenDetails.Envelope.Body.getResponseTokenDetailsResponse) {
				var responseData = responseTokenDetails.Envelope.Body.getResponseTokenDetailsResponse;
				var sptrn = responseData.sptrn;
				var status = '';
				var degTrn = responseData.degTrn;
				if (responseData.message) {
					status = responseData.message.code;
				}
				return MFP.Server.invokeProcedure({
					adapter: 'userProfile',
					procedure: 'updateUserRecentActivityTokenWithStatus',
					parameters: [token, sptrn, status, degTrn, recentActivitiesToken]
				});
			} else {
				return {
					isSuccessful: false,
					error: 'Error getting response token details'
				};
			}
		} else {
			var error = '';
			if (recentActivitiesToken != MFP.Server.getPropertyValue("tokens.recentActivities")) {
				error = 'Invalid adapter token ';
			}
			if (!token) {
				error += 'Invalid or empty response token';
			}
			return {
				isSuccessful: false,
				error: error
			};
		}
	}
	catch(e){
		adapterLogger("updateStatusUsingToken","error", "Exception",toString(e));
		return handleError();
	}
}

function createEPayRequest(DSGOptions) {
	try {
		//MFP.Logger.info("|ePayAdapter |createEPayRequest |DSGOptions : " + JSON.stringify(DSGOptions));
		adapterLogger("createEPayRequest","info", "DSGOptions",toString(DSGOptions));
		var isSuccessful = false;
		var decryptResult = '';
		//Step 1: Decrypt the EDATA to get the amount and SPTRN
		decryptResult = decryptAmount(DSGOptions);
		if (decryptResult && !decryptResult.isSuccessful) {
			return decryptResult;
		}
		DSGOptions = decryptResult.DSGOptions;
		//MFP.Logger.info("|ePayAdapter |createEPayRequest |Step 1 - Decrypted DSGOptions : " + JSON.stringify(DSGOptions));
		adapterLogger("createEPayRequest","info", "Step 1 - Decrypted DSGOptions :",toString(DSGOptions));
		//Step 2: Verify amount through backend
		var verifyAmountResult = verifyAmount(DSGOptions);
		//MFP.Logger.info("|ePayAdapter |createEPayRequest |Step 2: Payment Verification Response " + JSON.stringify(verifyAmountResult));
		adapterLogger("createEPayRequest","info", "Step 2: Payment Verification Response :",toString(verifyAmountResult));
		if (verifyAmountResult && 'isSuccessful' in verifyAmountResult && verifyAmountResult.isSuccessful == false) {
			//amount is not verified
			return verifyAmountResult;
		}

		if (!DSGOptions.PROVIDER_APPNAME) {
			DSGOptions.PROVIDER_APPNAME = DSGOptions.APPNAME;
		}
		//Verify mandatory DSGOptions
		if (!verifyOptions(DSGOptions)) {
			return {
				isSuccessful: false,
				response: 'Missing mandatory DSGOptions'
			};
		}

		if (DSGOptions.AUTHENTICATED && typeof DSGOptions.AUTHENTICATED !== "boolean") {
			if (DSGOptions.AUTHENTICATED && DSGOptions.AUTHENTICATED.toUpperCase() == 'YES') {
				DSGOptions.AUTHENTICATED = true;
			} else {
				DSGOptions.AUTHENTICATED = false;
			}
		}

		//		if (DSGOptions.AUTHENTICATED && DSGOptions.AUTHENTICATED.toUpperCase() == 'YES'){
		//			DSGOptions.AUTHENTICATED = true;
		//		}
		//		else { 
		//			DSGOptions.AUTHENTICATED = false;
		//		}

		var getTokenResponse = generateTransactionToken(DSGOptions);
		if (getTokenResponse && getTokenResponse.isSuccessful
				&& (getTokenResponse.legacyApp || (getTokenResponse.Envelope && getTokenResponse.Envelope.Body && getTokenResponse.Envelope.Body.generateTransactionTokenResponse))) {

			var response;
			if (getTokenResponse.legacyApp) {
				response = getTokenResponse;
			} else {
				response = getTokenResponse.Envelope.Body.generateTransactionTokenResponse;
			}

			//Token here
			if (response.uri) {
				DSGToken = response.uri;
				isSuccessful = true;
				// Record initial request in DB
				var user_id = this._getUserId();
				var appName = "";
				if (DSGOptions.PROVIDER_APPNAME) {
					appName = DSGOptions.PROVIDER_APPNAME;
				} else {
					appName = DSGOptions.APPNAME;
				}

				if ((user_id == 'Guest' || !user_id) && DSGOptions.AUTHENTICATED) {
					//Above condition means session is invalid but user details were sent as part of DSGOptions
					user_id = DSGOptions.USERNAME; //This will keep user ID in DB, but there is a risk of data manipulation
					try {
						var authUserIdentity = MFP.Server.getAuthenticatedUser("masterAuthRealm");
						var authUser2 = MFP.Server.getAuthenticatedUser("AMAdapterAuthRealm");
						var authUser3 = MFP.Server.getAuthenticatedUser("AdapterAuthRealm");
						//Above condition means session is invalid but user details were sent as part of DSGOptions
						MFP.Logger.info("|ePayAdapter |createEPayRequest |User session invalid but user details passed " + "|ePayAdapter: DSGOptions: " + " USERNAME: " + DSGOptions.USERNAME + " SPTRN: " + DSGOptions.SPTRN + " SERVICENAMEEN: " + DSGOptions.SERVICENAMEEN + " APPNAME: " + appName
								//Eldeeb: I didn't add more payment details for risk of exposing user data in logs
								+ "|ePayAdapter: Session Info: " + " ePayAdapter: getActiveUser(masterAuthRealm) returned: " + authUserIdentity + " ePayAdapter: getActiveUser(AMAdapterAuthRealm) returned: " + authUser2 + " ePayAdapter: getActiveUser(AdapterAuthRealm) returned: " + authUser3);
					} catch (e) {
						//MFP.Logger.info("|ePayAdapter |createEPayRequest |Catch Error in getActiveUser() " + e);
						adapterLogger("createEPayRequest","error", "exception",toString(e));
					}
				}

				MFP.Logger.info("|ePayAdapter |createEPayRequest |Transaction will be initiated ");

				var amount = DSGOptions.AMOUNT;
				amount = amount.toString();
				if (amount.indexOf('.') != -1) {
					amount = amount.substring(0, amount.indexOf('.'));
				}

				var transactionAddedToDB = false;
				var initialStatus = "initial";
				var invocationData = {
						adapter: 'userProfile',
						procedure: 'setUserRecentActivity',
						parameters: [user_id,
						             DSGOptions.SPTRN,
						             "EPay",
						             amount,
						             MFP.Server.getPropertyValue("epay.DSGOptions.PYMTCHANNELCODE"),
						             MFP.Server.getPropertyValue("epay.DSGOptions.SERVCODE"),
						             MFP.Server.getPropertyValue("epay.DSGOptions.SPCODE"),
						             MFP.Server.getPropertyValue("epay.DSGOptions.VERSIONCODE"),
						             initialStatus,
						             "",
						             DSGOptions.PROVIDER_APPNAME,
						             DSGOptions.SERVICEID,
						             DSGOptions.ACCOUNTID,
						             DSGOptions.BENIFICIARYTYPE,
						             "",
						             ""
						             ]
				};
				var addTransactionToDB = MFP.Server.invokeProcedure(invocationData, {
					onSuccess: function (e) {
						//MFP.Logger.info("|ePayAdapter |createEPayRequest |Step 3 - addTransactionToDB onSuccess : " + JSON.stringify(e));
						adapterLogger("createEPayRequest","info", "Step 3 - addTransactionToDB onSuccess : ",toString(e));
					},
					onFailure: function (e) {
						//MFP.Logger.info("|ePayAdapter |createEPayRequest |Step 3 - addTransactionToDB onFailure : " + JSON.stringify(e));
						adapterLogger("createEPayRequest","info", "Step 3 - addTransactionToDB onFailure : ",toString(e));
					},
				});

				//MFP.Logger.info("|ePayAdapter |createEPayRequest |Step 3 - addTransactionToDB: " + JSON.stringify(addTransactionToDB));
				 adapterLogger("createEPayRequest","info", "Step 3 - addTransactionToDB: ",toString(addTransactionToDB));
				if (addTransactionToDB.isSuccessful) {

					//MFP.Logger.info("|ePayAdapter |createEPayRequest |Step 3 - Transaction Initiated Successfully");
					 adapterLogger("createEPayRequest","info", "Step 3 - Transaction Initiated Successfully","");
					return {
						isSuccessful: true,
						token: DSGToken
					};
				} else {

					//MFP.Logger.error("|ePayAdapter |createEPayRequest |Step 3 - Transaction Initiation Failed");
					 adapterLogger("createEPayRequest","info", "Step 3 - Transaction Initiation Failed","");
					error = "Failed to initiate transaction";
					return {
						isSuccessful: false,
						error: error
					};
				}
			} else if (response.error) {

				//MFP.Logger.info("|ePayAdapter |createEPayRequest |Token Error " + response.error);
				 adapterLogger("createEPayRequest","info", "Token Error",toString(response.error));
				error = response.error;
				return {
					isSuccessful: false,
					error: error
				};
			}
		} else {
			if (typeof getTokenResponse === 'object') {
				try {
				//	MFP.Logger.info("|ePayAdapter |createEPayRequest |Token Error " + JSON.stringify(getTokenResponse));
					adapterLogger("createEPayRequest","info", "Token Error",toString(getTokenResponse));
				} catch (e) { }
			}
			error = getTokenResponse;
			isSuccessful = false;
			return {
				isSuccessful: false,
				error: getTokenResponse
			};
		}
	} catch (e) {
		//var error = e.message || "createEPayRequest Exception";
		//MFP.Logger.error("|ePayAdapter |createEPayRequest |Exception |Error: " + error);
		adapterLogger("getUserProfile","error", "Exception",toString(e));
		return serverErrorHandler(error);
	}
}

function verifyAmount(DSGOptions) {
	try{
		var encryptionPassword = false;
		try {
			encryptionPassword = MFP.Server.getPropertyValue("epay.Encryption.PASSWORD." + DSGOptions.APPNAME);
		} catch (e) { }
		//Read encrypted data if available
		var encryptedData = DSGOptions.EDATA;
		//Decrypt
		//TODO: Later we will remove encryptedData check, it is added for backward compatibility
		if (ENCRYPTION_ENFORCED && typeof encryptionPassword == 'string' && typeof encryptedData == 'string') {
			if (!(DSGOptions.SPTRN && DSGOptions.AMOUNT)) {
				MFP.Logger.info("|ePayAdapter |createEPayRequest |Amount or SPTRN Missed : " + JSON.stringify(DSGOptions));
				return {
					isSuccessful: false,
					error: 'Missing DSGOptions, check SPTRN and amount sent'
				};
			}
			var additionalData = (typeof DSGOptions.EDATA == 'string') ? DSGOptions.EDATA : '';
			var adapterName = "";
			if (DSGOptions.Services) {
				adapterName = 'PaymentDataVerification_RTA_' + DSGOptions.Services + '_Services';
			} else {
				adapterName = 'PaymentDataVerification_' + DSGOptions.APPNAME;
			}
			//MFP.Logger.info("|ePayAdapter |verifyAmount |Verification Adapter : " + adapterName);
			adapterLogger("ePayAdapter","info", "verifyAmount | Verification Adapter",toString(adapterName));
			var invocationData = {
					adapter: adapterName,
					procedure: 'verifyData',
					parameters: [REQ_RECENT_ACTIVITIES_TOKEN, DSGOptions.SPTRN, DSGOptions.AMOUNT, additionalData, 'EPAY', DSGOptions.SERVICEID, DSGOptions.PROVIDER_APPNAME]
			};
			//MFP.Logger.info("|ePayAdapter |verifyAmount |invocationData for verifyData " + JSON.stringify(invocationData));
			adapterLogger("ePayAdapter","info", "verifyAmount | invocationData for verifyData",toString(invocationData));
			var verification_response = MFP.Server.invokeProcedure(invocationData);
			if (verification_response && verification_response.isSuccessful && verification_response.dataVerified) {
				//MFP.Logger.info("|ePayAdapter |verifyAmount |Amount verified");
				adapterLogger("ePayAdapter","info", "verifyAmount ",toString("Amount verified"));
				return {
					isSuccessful: true
				};
			} else {
				if ("error" in verification_response) {
					var error = 'Amount Verification failed' + verification_response.error ? verification_response.error : '';
					//MFP.Logger.info("|ePayAdapter |verifyAmount |Amount Verification failed error " + error);
					adapterLogger("ePayAdapter","error", "verifyAmount ",toString(error));
					return {
						isSuccessful: false,
						error: error,
						description: "Error Returned from adapter : " + adapterName
					};
				} else {
					//MFP.Logger.info("|ePayAdapter |verifyAmount |Amount Verification failed response : " + JSON.stringify(verification_response));
					adapterLogger("ePayAdapter","error", "verifyAmount | Amount Verification failed response : ",toString(verification_response));
					return {
						isSuccessful: false,
						error: 'verification failed',
						description: "Error Returned from adapter : " + adapterName
					};
				}
			}
		}
		return {
			isSuccessful: true
		};
	}
	catch(e){
		adapterLogger("verifyAmount","error", "Exception",toString(e));
		return handleError();
	}
}

function decryptAmount(DSGOptions) {
	try {
		//Verify app name
		if (typeof DSGOptions.APPNAME != 'string') {
			return {
				isSuccessful: false,
				error: 'APPNAME missing'
			};
		} else if (DSGOptions.APPNAME != 'Smart_Dubai_Parking'
			&& DSGOptions.APPNAME != 'RTA_Corporate_Services'
				&& DSGOptions.APPNAME != 'RTA_Drivers_And_Vehicles'
					&& DSGOptions.APPNAME != 'RTA_Public_Transport') {
			return {
				isSuccessful: false,
				error: 'Invalid APPNAME, unsupported App'
			};
		}
		//Generate request token
		var DSGToken = '';
		var error = {};
		//Step 1: decrypt amount
		//Load password
		var encryptionPassword = false;
		try {
			encryptionPassword = MFP.Server.getPropertyValue("epay.Encryption.PASSWORD." + DSGOptions.APPNAME);
		} catch (e) { }
		//Read encrypted data if available
		var encryptedData = DSGOptions.EDATA;
		//Decrypt
		//TODO: Later we will remove encryptedData check, it is added for backward compatibility
		if (ENCRYPTION_ENFORCED && typeof encryptionPassword == 'string' && typeof encryptedData == 'string') {
			//As a safety measure, delete amount sent in DSGOptions
			delete DSGOptions.AMOUNT;
			if (typeof encryptedData == 'string') {
				var decryptedDataStr = '';
				try {
					decryptedDataStr = Aes.Ctr.decrypt(encryptedData, encryptionPassword, ENCRYPTION_STRENGTH); //Decrypting AES encrypted data
					if (typeof decryptedDataStr == 'string') {
						var decryptedData = JSON.parse(decryptedDataStr);
						//log the Decrypted data
						//MFP.Logger.info("|ePayAdapter |decryptAmount |Decrypted Data : " + JSON.stringify(decryptedData));
						adapterLogger("decryptAmount","info", "Decrypted Data : ",toString(decryptedData));
						//Here we check on expected parameters within EDATA
						if (typeof decryptedData.AMOUNT == 'number' || typeof decryptedData.AMOUNT == 'string') {
							if (DSGOptions.SPTRN == decryptedData.SPTRN) {
								//Now that we parsed decrypted data, lets fill DSGOptions
								DSGOptions.AMOUNT = decryptedData.AMOUNT;
								//We can also add other data that might be encrypted too
							//	MFP.Logger.info("|ePayAdapter |decryptAmount |Step 1 - Decryption successful : " + JSON.stringify(decryptedData));
								adapterLogger("decryptAmount","info", "Step 1 - Decryption successful : ",toString(DSGOptions));
								return {
									isSuccessful: true,
									DSGOptions: DSGOptions
								};
							} else {
								//MFP.Logger.info("|ePayAdapter |decryptAmount |Decryption successful but wrong SPTRN" + JSON.stringify(DSGOptions));
								adapterLogger("decryptAmount","info", "Decryption successful but wrong SPTRN",toString(DSGOptions));
								return {
									isSuccessful: false,
									error: 'Invalid EDATA, invalid or incomplete transaction data'
								};
							}
						} else {
						//	MFP.Logger.info("|ePayAdapter |decryptAmount |Decryption successful but wrong amount structure :" + decryptedData.AMOUNT);
							adapterLogger("decryptAmount","info", "Decryption successful but wrong amount structure :",toString(decryptedData.AMOUNT));
							return {
								isSuccessful: false,
								error: 'Invalid EDATA, incomplete structure'
							};
						}
					} else {
						//MFP.Logger.info("|ePayAdapter |decryptAmount |Decryption unsuccessful  :" + encryptedData);
						adapterLogger("decryptAmount","info", "Decryption unsuccessful  :",toString(encryptedData));
						//Possibly invalid encryption password
						return {
							isSuccessful: false,
							error: 'Invalid EDATA, data decryption failed!' + encryptedData
						};
					}
				} catch (e) {
					//MFP.Logger.info("|ePayAdapter |decryptAmount |Invalid EDATA structure  :" + e.toString());
					adapterLogger("decryptAmount","info", "Invalid EDATA structure  :",toString(e));
					return {
						isSuccessful: false,
						error: 'Invalid EDATA, Check EDATA structure ' + e.toString()
					};
				}
			} else {
				return {
					isSuccessful: false,
					error: 'Invalid EDATA, expecting a string'
				};
			}
		}
		return {
			isSuccessful: true,
			DSGOptions: DSGOptions
		};
	} catch (e) {
		//MFP.Logger.info("|ePayAdapter |decryptAmount |Catch Error  :" + e);
		adapterLogger("decryptAmount","error", "Exception",toString(e));
	
		return {
			isSuccessful: false
		};
	}
}


function getTransactionStatus(spCode, servCode, spTrn) {
	try {
		spCode = MFP.Server.getPropertyValue("epay.DSGOptions.SPCODE");
		servCode = MFP.Server.getPropertyValue("epay.DSGOptions.SERVCODE");
		var reqResult = ePayQueryTransactionStatus(spTrn);
		if (reqResult.isSuccessful == false) {
			//MFP.Logger.info("|ePayAdapter |getTransactionStatus |Can not recorded");
			adapterLogger("getTransactionStatus","info", "reqResult.isSuccessful",toString("Can not recorded"));
		} else {
			//MFP.Logger.info("|ePayAdapter |getTransactionStatus |Response :" + JSON.stringify(reqResult));
			adapterLogger("getTransactionStatus","info", "Response",toString(reqResult));
			var record = _recordProgress(reqResult, 1, spCode, servCode, spTrn);
			//MFP.Logger.info("|ePayAdapter |getTransactionStatus |_recordProgress |Response :" + JSON.stringify(record));
			adapterLogger("getTransactionStatus","info", "Response",toString(record));
		}
		return {
			result: reqResult
		};
	} catch (e) {
		//MFP.Logger.warn("|ePayAdapter |getTransactionStatus |ePayQueryTransactionStatus |Exception :" + e);
		adapterLogger("getTransactionStatus","error", "Exception",toString(e));
		return {
			isSuccessful: false
		};
	}
}

function getTransactionStatusWithoutRecording(spCode, servCode, spTrn) {
	try {
		spCode = MFP.Server.getPropertyValue("epay.DSGOptions.SPCODE");
		servCode = MFP.Server.getPropertyValue("epay.DSGOptions.SERVCODE");
		var reqResult = ePayQueryTransactionStatus(spTrn);
		if (reqResult.isSuccessful == false) {
			//MFP.Logger.info("|ePayAdapter |getTransactionStatusWithoutRecording |Failed");
			adapterLogger("getTransactionStatusWithoutRecording","info", "Failed",toString(reqResult));
		} else {
			//MFP.Logger.info("|ePayAdapter |getTransactionStatusWithoutRecording |Response :" + reqResult);
			adapterLogger("getTransactionStatusWithoutRecording","info", "Response",toString(reqResult));
		}
		return {
			result: reqResult
		};
	} catch (e) {
		adapterLogger("getTransactionStatusWithoutRecording","error", "Exception",toString(e));
		return {
			isSuccessful: false
		};
	}
}

function getTransactionStatusInternal(userId, spCode, servCode, spTrn, token) {
	try {
		if (token == REQ_RECENT_ACTIVITIES_TOKEN) {
			spCode = MFP.Server.getPropertyValue("epay.DSGOptions.SPCODE");
			servCode = MFP.Server.getPropertyValue("epay.DSGOptions.SERVCODE");
			var reqResult = ePayQueryTransactionStatus(spTrn);
			if (reqResult.isSuccessful == false) {
				//MFP.Logger.info("|ePayAdapter |getTransactionStatusInternal |Failed");
				adapterLogger("getTransactionStatusInternal","info", "Failed",toString(reqResult));
			} else {
				//MFP.Logger.info("|ePayAdapter |getTransactionStatusInternal |Response :" + reqResult);
				adapterLogger("getTransactionStatusInternal","info", "Response ",toString(reqResult));
			}
			return {
				result: reqResult
			};
		}
		return {
			isSuccessful: false,
			authRequired: true,
			errorCode: "401",
			errorMessage: "Not Authorized"
		};
	} catch (e) { 
		adapterLogger("getTransactionStatusInternal","error", "Exception",toString(e));
	}
}

function _recordProgress(reqResult, trials, spCode, servCode, spTrn) {
	//	try{
	//		var Fault = _extractXMLValue("faultcode", reqResult);
	//		MFP.Logger.info("|ePayAdapter |_recordProgress |Fault :" + Fault);
	//	}catch(e){
	//		MFP.Logger.info("|ePayAdapter |_recordProgress |Catch :" + e);
	//
	//	}

	if (!spTrn) {
	//	MFP.Logger.warn("|ePayAdapter |_recordProgress |SPTRN is NULL " + spTrn + "Can not Record");
		adapterLogger("_recordProgress","info", "SPTRN is NULL ",toString("Can not Record"));
		return;
	}

	if (reqResult) {
		var logged_user_id = this._getUserId();
		try {
			var SPTRN = spTrn;
			var AMOUNT = ""; // If it is passed as an empty value then it will reuse the old value that was recorded in initialization
			var PYMTCHANNELCODE = MFP.Server.getPropertyValue("epay.DSGOptions.PYMTCHANNELCODE");
			var SERVCODE = servCode;
			var SPCODE = spCode;
			var VERSIONCODE = MFP.Server.getPropertyValue("epay.DSGOptions.VERSIONCODE");
			var MSGCODE = _extractXMLValue("MESSAGECODE", reqResult);
			var DEGTRN = _extractXMLValue("DEGTRN", reqResult);
			var invocationData = {
					adapter: 'userProfile',
					procedure: 'updateUserRecentActivity',
					parameters: [logged_user_id, SPTRN, "EPay", AMOUNT, PYMTCHANNELCODE, SERVCODE, SPCODE, VERSIONCODE, MSGCODE, DEGTRN, REQ_RECENT_ACTIVITIES_TOKEN]
			};
			//			"Guest","ETFE103000000000095343614","EPay","","100","mGov","RTA3","2.1","","","bnZxJfbS"
			MFP.Logger.info("|ePayAdapter |_recordProgress |updateUserRecentActivity |invocationData :" + JSON.stringify(invocationData));
			return MFP.Server.invokeProcedure(invocationData, {
				onSuccess: function (response) {
					MFP.Logger.info("|ePayAdapter |_recordProgress |updateUserRecentActivity |onSuccess :" + JSON.stringify(response));
				},
				onFailure: function (response) {
					MFP.Logger.info("|ePayAdapter |_recordProgress |updateUserRecentActivity |onFailure :" + JSON.stringify(response));
					if (trials < 20) {
						_recordProgress(reqResult, (trials + 1), spCode, servCode, spTrn);
					}
				}
			});
		} catch (e) {
			//MFP.Logger.info("|ePayAdapter |_recordProgress |updateUserRecentActivity |Catch Error :" + e);
			adapterLogger("_recordProgress","error", "Exception",toString(e));
			if (trials < 20) {
				_recordProgress(reqResult, (trials + 1), spCode, servCode, spTrn);
			}
		}
	}
}

function _extractXMLValue(tag, data) {
	var res = "";
	if (data && data.indexOf(tag) != -1) {
		var dataParts1 = data.split("<" + tag + ">");
		if (dataParts1 && dataParts1.length >= 2) {
			var dataParts2 = dataParts1[1].split("<\/" + tag + ">");
			if (dataParts2 && dataParts2.length >= 1) {
				return dataParts2[0];
			}
		}
	}
	return res;
}

function _getUserId() {
	var logged_user_id = "Guest";
	try {
		var authUserIdentity = MFP.Server.getAuthenticatedUser("masterAuthRealm");
		if (authUserIdentity) {
			var authUserId = authUserIdentity.userId;
			if (authUserId) {
				logged_user_id = authUserId;
			}
		}
	} catch (e) {
		adapterLogger("_getUserId","error", "Exception",toString(e));
	}
	return logged_user_id;
}

function verifyOptionsForApplePay(DSGOptions) {
	try{
	if (!(DSGOptions.SPTRN && DSGOptions.AMOUNT && 'AUTHENTICATED' in DSGOptions && 'SERVICENAMEEN' in DSGOptions && 'SERVICENAMEAR' in DSGOptions && DSGOptions.SERVICEID && DSGOptions.BENIFICIARYTYPE && DSGOptions.APPNAME)) {
		//MFP.Logger.error("|Error-Adapter |ePayAdapter |verifyOptionsForApplePay |DSGOptions: First Condition :  " + JSON.stringify(DSGOptions));
		adapterLogger("verifyOptionsForApplePay","info", " First Condition :  ",toString(DSGOptions));
		return false;
	}
	if ((DSGOptions.AUTHENTICATED == true || DSGOptions.AUTHENTICATED == 'YES') && !(DSGOptions.USERNAME && DSGOptions.MOBILENO && DSGOptions.USERMAIL)) {
		//MFP.Logger.error("|Error-Adapter |ePayAdapter |verifyOptionsForApplePay |DSGOptions: Second Condition :  " + JSON.stringify(DSGOptions));
		adapterLogger("verifyOptionsForApplePay","info", "Second Condition :",toString(DSGOptions));
		return false;
	}
	if (DSGOptions.BENIFICIARYTYPE == 'Corporate' && !(DSGOptions.COMPANYNAMEEN && DSGOptions.COMPANYNAMEAR && DSGOptions.TRADELICENSE
			/*&& DSGOptions.ISSUINGAUTHORITY*/
	)) {
		//MFP.Logger.error("|Error-Adapter |ePayAdapter |verifyOptionsForApplePay |DSGOptions: Third Condition" + JSON.stringify(DSGOptions));
		adapterLogger("verifyOptionsForApplePay","info", "Third Condition :",toString(DSGOptions));
		return false;
	}
	return true;
	}
	catch(e){
		adapterLogger("verifyOptionsForApplePay","error", "Exception",toString(e));
		return handleError();
	}
}

function executeTransactionForApplePay(DSGOptions) {
	try {
		var spCode = "RTA3";
		var servCode = "mGov";
		var PYMTCHANNELCODE = "104";
		var type = "sale";
		var description = "";
		var version = "2.1";
		var paymentMode = "EPAY";
		var paymentType = "APPLE_PAY";
		MFP.Logger.info("|ePayAdapter |executeTransactionForApplePay |Transaction : " + JSON.stringify(DSGOptions));
		var isSuccessful = false;
		var decryptResult = '';
		//Step 1: decrypt amount
		decryptResult = decryptAmount(DSGOptions);
		if (decryptResult && !decryptResult.isSuccessful) {
			return decryptResult;
		}
		DSGOptions = decryptResult.DSGOptions;
		MFP.Logger.info("|ePayAdapter |executeTransactionForApplePay |Step 1 - Decrypting epay data : " + JSON.stringify(DSGOptions));
		//Step 2: Verify amount through backend
		var verifyAmountResult = verifyAmount(DSGOptions);
		MFP.Logger.info("|ePayAdapter |executeTransactionForApplePay |Step 2: Payment Verification Response " + JSON.stringify(verifyAmountResult));
		if (verifyAmountResult && 'isSuccessful' in verifyAmountResult && verifyAmountResult.isSuccessful == false) {
			//amount is not verified
			return verifyAmountResult;
		}
		//TODO: enable it after everyone has switched to the new version
		//Verify mandatory DSGOptions
		if (!verifyOptionsForApplePay(DSGOptions)) {
			MFP.Logger.info("|ePayAdapter |executeTransactionForApplePay |DSG Verification error : Missing mandatory DSGOptions" + JSON.stringify(DSGOptions));
			return {
				isSuccessful: false,
				response: 'Missing mandatory DSGOptions'
			};
		}
		MFP.Logger.info("|ePayAdapter |executeTransactionForApplePay |Transaction will be initiated ");
		var amount = DSGOptions.AMOUNT;
		amount = amount.toString();
		if (amount.indexOf('.') != -1) {
			amount = amount.substring(0, amount.indexOf('.'));
		}
		var appName = "";
		if (DSGOptions.PROVIDER_APPNAME) {
			appName = DSGOptions.PROVIDER_APPNAME;
		} else {
			appName = DSGOptions.APPNAME;
		}
		var user_id = this._getUserId();
		// Record the transaction to Common shell database 
		var initialStatus = "initial";
		var invocationData = {
				adapter: 'userProfile',
				procedure: 'setUserRecentActivity',
				parameters: [user_id,
				             DSGOptions.SPTRN,
				             "EPay",
				             amount,
				             PYMTCHANNELCODE,
				             servCode,
				             spCode,
				             version,
				             initialStatus,
				             "",
				             appName,
				             DSGOptions.SERVICEID,
				             DSGOptions.ACCOUNTID,
				             DSGOptions.BENIFICIARYTYPE,
				             "",
				             ""
				             ]
		};
		var addTransactionToDB = MFP.Server.invokeProcedure(invocationData, {
			onSuccess: function (e) {
				MFP.Logger.info("|ePayAdapter |executeTransactionForApplePay |Step 3 - addTransactionToDB onSuccess : " + JSON.stringify(e));
			},
			onFailure: function (e) {
				MFP.Logger.info("|ePayAdapter |executeTransactionForApplePay |Step 3 - addTransactionToDB onFailure : " + JSON.stringify(e));
			},
		});
		if (addTransactionToDB.isSuccessful) {
			var invocationData = {
					adapter: 'applePay',
					procedure: 'executeTransactionWithDSG',
					parameters: [DSGOptions]
			};
			var executeTransactionResponse = MFP.Server.invokeProcedure(invocationData, {
				onSuccess: function (e) {
					MFP.Logger.info("|ePayAdapter |executeTransactionForApplePay |executeTransactionResponse onSuccess : " + JSON.stringify(e));
				},
				onFailure: function (e) {
					MFP.Logger.info("|ePayAdapter |executeTransactionForApplePay |executeTransactionResponse onFailure : " + JSON.stringify(e));
				},
			});
			MFP.Logger.info("|ePayAdapter |executeTransactionForApplePay |executeTransactionResponse" + JSON.stringify(executeTransactionResponse));
			if (executeTransactionResponse && executeTransactionResponse.isSuccessful && executeTransactionResponse.Envelope && executeTransactionResponse.Envelope.Body && executeTransactionResponse.Envelope.Body.executeTransactionResponse
					//				(executeTransactionResponse.Envelope.Body.executeTransactionResponse.statusCode == "00" || executeTransactionResponse.Envelope.Body.executeTransactionResponse.statusCode == "02")
			) {
				var response = executeTransactionResponse.Envelope.Body.executeTransactionResponse;
				var status = response.statusCode;
				var degTrn = "";
				if (response.degTrn) {
					degTrn = response.degTrn;
				} else {
					MFP.Logger.info("|ePayAdapter |executeTransactionForApplePay |degTrn is empty");
				}
				if (status == "00") status = 0;
				var invocationData = {
						adapter: 'userProfile',
						procedure: 'setUserRecentActivity',
						parameters: [user_id,
						             DSGOptions.SPTRN,
						             "EPay",
						             amount,
						             PYMTCHANNELCODE,
						             servCode,
						             spCode,
						             version,
						             status,
						             degTrn,
						             appName,
						             DSGOptions.SERVICEID,
						             "",
						             DSGOptions.BENIFICIARYTYPE,
						             "",
						             ""
						             ]
				};
				var updateTransactionInDB = MFP.Server.invokeProcedure(invocationData, {
					onSuccess: function (e) {
						MFP.Logger.info("|ePayAdapter |executeTransactionForApplePay |Step 3 - updateTransactionInDB onSuccess : " + JSON.stringify(e));
					},
					onFailure: function (e) {
						MFP.Logger.info("|ePayAdapter |executeTransactionForApplePay |Step 3 - updateTransactionInDB onFailure : " + JSON.stringify(e));
					},
				});
				MFP.Logger.info("|ePayAdapter |executeTransactionForApplePay |Step 3 - updateTransactionInDB: " + JSON.stringify(updateTransactionInDB));
				if (updateTransactionInDB.isSuccessful) {
					MFP.Logger.info("|ePayAdapter |executeTransactionForApplePay |Step 3 - Transaction Updated Successfully");
					return {
						isSuccessful: true,
						executeTransactionResponse: executeTransactionResponse
					};
				} else {
					MFP.Logger.info("|ePayAdapter |executeTransactionForApplePay |Step 3 - Transaction Updated Failed");
					error = "Failed to Update transaction";
					return {
						isSuccessful: false,
						error: error
					};
				}
			} else {
				var error = executeTransactionResponse;
				if (executeTransactionResponse && executeTransactionResponse.isSuccessful && executeTransactionResponse.Envelope && executeTransactionResponse.Envelope.Body && executeTransactionResponse.Envelope.Body.executeTransactionResponse) {
					error = executeTransactionResponse.Envelope.Body.executeTransactionResponse;
					//			error={
					//			"statusDesc": executeTransactionResponse.Envelope.Body.executeTransactionResponse.statusDesc,
					//			"statusCode": executeTransactionResponse.Envelope.Body.executeTransactionResponse.statusCode,
					//			"errorMessage": executeTransactionResponse.Envelope.Body.executeTransactionResponse.errorMessage? executeTransactionResponse.Envelope.Body.executeTransactionResponse.errorMessage:""
					//			};
				}
				return {
					isSuccessful: false,
					error: error
				};
			}
		}
	} catch (e) {
		//MFP.Logger.info("|ePayAdapter |executeTransactionForApplePay |Catch >>>> " + e);
		adapterLogger("executeTransactionForApplePay","error", "Exception",toString(e));
		return {
			isSuccessful: false,
			error: e
		};
	}
}
