/*
 A JavaScript implementation of the SHA family of hashes, as
 defined in FIPS PUB 180-2 as well as the corresponding HMAC implementation
 as defined in FIPS PUB 198a

 Copyright Brian Turek 2008-2016
 Distributed under the BSD License
 See http://caligatio.github.com/jsSHA/ for more information

 Several functions taken from Paul Johnston
 */
!function(r){"use strict";var t="undefined"!=typeof module;t&&(r=global);var a="0123456789abcdef".split(""),n=[-2147483648,8388608,32768,128],e=[24,16,8,0],o=[1116352408,3609767458,1899447441,602891725,3049323471,3964484399,3921009573,2173295548,961987163,4081628472,1508970993,3053834265,2453635748,2937671579,2870763221,3664609560,3624381080,2734883394,310598401,1164996542,607225278,1323610764,1426881987,3590304994,1925078388,4068182383,2162078206,991336113,2614888103,633803317,3248222580,3479774868,3835390401,2666613458,4022224774,944711139,264347078,2341262773,604807628,2007800933,770255983,1495990901,1249150122,1856431235,1555081692,3175218132,1996064986,2198950837,2554220882,3999719339,2821834349,766784016,2952996808,2566594879,3210313671,3203337956,3336571891,1034457026,3584528711,2466948901,113926993,3758326383,338241895,168717936,666307205,1188179964,773529912,1546045734,1294757372,1522805485,1396182291,2643833823,1695183700,2343527390,1986661051,1014477480,2177026350,1206759142,2456956037,344077627,2730485921,1290863460,2820302411,3158454273,3259730800,3505952657,3345764771,106217008,3516065817,3606008344,3600352804,1432725776,4094571909,1467031594,275423344,851169720,430227734,3100823752,506948616,1363258195,659060556,3750685593,883997877,3785050280,958139571,3318307427,1322822218,3812723403,1537002063,2003034995,1747873779,3602036899,1955562222,1575990012,2024104815,1125592928,2227730452,2716904306,2361852424,442776044,2428436474,593698344,2756734187,3733110249,3204031479,2999351573,3329325298,3815920427,3391569614,3928383900,3515267271,566280711,3940187606,3454069534,4118630271,4000239992,116418474,1914138554,174292421,2731055270,289380356,3203993006,460393269,320620315,685471733,587496836,852142971,1086792851,1017036298,365543100,1126000580,2618297676,1288033470,3409855158,1501505948,4234509866,1607167915,987167468,1816402316,1246189591],h=[],s=function(r){return i(r,384)},u=function(r){return i(r,256)},f=function(r){return i(r,224)},i=function(r,t){var s,u,f,i,c,d,l,_,v,p,A,S,b,g,m,C,T,w,x,y,E,H,J,j,k,q,z,B,D,F,G,I,K,L,M,N,O,P,Q,R,U,V,W,X,Y=!1,Z=0,$=0,rt=0,tt=r.length;384==t?(s=3418070365,u=3238371032,f=1654270250,i=914150663,c=2438529370,d=812702999,l=355462360,_=4144912697,v=1731405415,p=4290775857,A=2394180231,S=1750603025,b=3675008525,g=1694076839,m=1203062813,C=3204075428):256==t?(s=573645204,u=4230739756,f=2673172387,i=3360449730,c=596883563,d=1867755857,l=2520282905,_=1497426621,v=2519219938,p=2827943907,A=3193839141,S=1401305490,b=721525244,g=746961066,m=246885852,C=2177182882):224==t?(s=2352822216,u=424955298,f=1944164710,i=2312950998,c=502970286,d=855612546,l=1738396948,_=1479516111,v=258812777,p=2077511080,A=2011393907,S=79989058,b=1067287976,g=1780299464,m=286451373,C=2446758561):(s=1779033703,u=4089235720,f=3144134277,i=2227873595,c=1013904242,d=4271175723,l=2773480762,_=1595750129,v=1359893119,p=2917565137,A=2600822924,S=725511199,b=528734635,g=4215389547,m=1541459225,C=327033209,t=512),T=0;do{for(h[0]=T,h[1]=h[2]=h[3]=h[4]=h[5]=h[6]=h[7]=h[8]=h[9]=h[10]=h[11]=h[12]=h[13]=h[14]=h[15]=h[16]=h[17]=h[18]=h[19]=h[20]=h[21]=h[22]=h[23]=h[24]=h[25]=h[26]=h[27]=h[28]=h[29]=h[30]=h[31]=h[32]=0,x=$;tt>Z&&128>x;++Z)w=r.charCodeAt(Z),128>w?h[x>>2]|=w<<e[3&x++]:2048>w?(h[x>>2]|=(192|w>>6)<<e[3&x++],h[x>>2]|=(128|63&w)<<e[3&x++]):55296>w||w>=57344?(h[x>>2]|=(224|w>>12)<<e[3&x++],h[x>>2]|=(128|w>>6&63)<<e[3&x++],h[x>>2]|=(128|63&w)<<e[3&x++]):(w=65536+((1023&w)<<10|1023&r.charCodeAt(++Z)),h[x>>2]|=(240|w>>18)<<e[3&x++],h[x>>2]|=(128|w>>12&63)<<e[3&x++],h[x>>2]|=(128|w>>6&63)<<e[3&x++],h[x>>2]|=(128|63&w)<<e[3&x++]);for(rt+=x-$,$=x-128,Z==tt&&(h[x>>2]|=n[3&x],++Z),T=h[32],Z>tt&&112>x&&(h[31]=rt<<3,Y=!0),y=32;160>y;y+=2)Q=h[y-30],R=h[y-29],E=(Q>>>1|R<<31)^(Q>>>8|R<<24)^Q>>>7,H=(R>>>1|Q<<31)^(R>>>8|Q<<24)^(R>>>7|Q<<25),Q=h[y-4],R=h[y-3],J=(Q>>>19|R<<13)^(R>>>29|Q<<3)^Q>>>6,j=(R>>>19|Q<<13)^(Q>>>29|R<<3)^(R>>>6|Q<<26),Q=h[y-32],R=h[y-31],U=h[y-14],V=h[y-13],k=(65535&V)+(65535&R)+(65535&H)+(65535&j),q=(V>>>16)+(R>>>16)+(H>>>16)+(j>>>16)+(k>>>16),z=(65535&U)+(65535&Q)+(65535&E)+(65535&J)+(q>>>16),B=(U>>>16)+(Q>>>16)+(E>>>16)+(J>>>16)+(z>>>16),h[y]=B<<16|65535&z,h[y+1]=q<<16|65535&k;var at=s,nt=u,et=f,ot=i,ht=c,st=d,ut=l,ft=_,it=v,ct=p,dt=A,lt=S,_t=b,vt=g,pt=m,At=C;for(M=et&ht,N=ot&st,y=0;160>y;y+=8)E=(at>>>28|nt<<4)^(nt>>>2|at<<30)^(nt>>>7|at<<25),H=(nt>>>28|at<<4)^(at>>>2|nt<<30)^(at>>>7|nt<<25),J=(it>>>14|ct<<18)^(it>>>18|ct<<14)^(ct>>>9|it<<23),j=(ct>>>14|it<<18)^(ct>>>18|it<<14)^(it>>>9|ct<<23),D=at&et,F=nt&ot,O=D^at&ht^M,P=F^nt&st^N,W=it&dt^~it&_t,X=ct&lt^~ct&vt,Q=h[y],R=h[y+1],U=o[y],V=o[y+1],k=(65535&V)+(65535&R)+(65535&X)+(65535&j)+(65535&At),q=(V>>>16)+(R>>>16)+(X>>>16)+(j>>>16)+(At>>>16)+(k>>>16),z=(65535&U)+(65535&Q)+(65535&W)+(65535&J)+(65535&pt)+(q>>>16),B=(U>>>16)+(Q>>>16)+(W>>>16)+(J>>>16)+(pt>>>16)+(z>>>16),Q=B<<16|65535&z,R=q<<16|65535&k,k=(65535&P)+(65535&H),q=(P>>>16)+(H>>>16)+(k>>>16),z=(65535&O)+(65535&E)+(q>>>16),B=(O>>>16)+(E>>>16)+(z>>>16),U=B<<16|65535&z,V=q<<16|65535&k,k=(65535&ft)+(65535&R),q=(ft>>>16)+(R>>>16)+(k>>>16),z=(65535&ut)+(65535&Q)+(q>>>16),B=(ut>>>16)+(Q>>>16)+(z>>>16),pt=B<<16|65535&z,At=q<<16|65535&k,k=(65535&V)+(65535&R),q=(V>>>16)+(R>>>16)+(k>>>16),z=(65535&U)+(65535&Q)+(q>>>16),B=(U>>>16)+(Q>>>16)+(z>>>16),ut=B<<16|65535&z,ft=q<<16|65535&k,E=(ut>>>28|ft<<4)^(ft>>>2|ut<<30)^(ft>>>7|ut<<25),H=(ft>>>28|ut<<4)^(ut>>>2|ft<<30)^(ut>>>7|ft<<25),J=(pt>>>14|At<<18)^(pt>>>18|At<<14)^(At>>>9|pt<<23),j=(At>>>14|pt<<18)^(At>>>18|pt<<14)^(pt>>>9|At<<23),G=ut&at,I=ft&nt,O=G^ut&et^D,P=I^ft&ot^F,W=pt&it^~pt&dt,X=At&ct^~At&lt,Q=h[y+2],R=h[y+3],U=o[y+2],V=o[y+3],k=(65535&V)+(65535&R)+(65535&X)+(65535&j)+(65535&vt),q=(V>>>16)+(R>>>16)+(X>>>16)+(j>>>16)+(vt>>>16)+(k>>>16),z=(65535&U)+(65535&Q)+(65535&W)+(65535&J)+(65535&_t)+(q>>>16),B=(U>>>16)+(Q>>>16)+(W>>>16)+(J>>>16)+(_t>>>16)+(z>>>16),Q=B<<16|65535&z,R=q<<16|65535&k,k=(65535&P)+(65535&H),q=(P>>>16)+(H>>>16)+(k>>>16),z=(65535&O)+(65535&E)+(q>>>16),B=(O>>>16)+(E>>>16)+(z>>>16),U=B<<16|65535&z,V=q<<16|65535&k,k=(65535&st)+(65535&R),q=(st>>>16)+(R>>>16)+(k>>>16),z=(65535&ht)+(65535&Q)+(q>>>16),B=(ht>>>16)+(Q>>>16)+(z>>>16),_t=B<<16|65535&z,vt=q<<16|65535&k,k=(65535&V)+(65535&R),q=(V>>>16)+(R>>>16)+(k>>>16),z=(65535&U)+(65535&Q)+(q>>>16),B=(U>>>16)+(Q>>>16)+(z>>>16),ht=B<<16|65535&z,st=q<<16|65535&k,E=(ht>>>28|st<<4)^(st>>>2|ht<<30)^(st>>>7|ht<<25),H=(st>>>28|ht<<4)^(ht>>>2|st<<30)^(ht>>>7|st<<25),J=(_t>>>14|vt<<18)^(_t>>>18|vt<<14)^(vt>>>9|_t<<23),j=(vt>>>14|_t<<18)^(vt>>>18|_t<<14)^(_t>>>9|vt<<23),K=ht&ut,L=st&ft,O=K^ht&at^G,P=L^st&nt^I,W=_t&pt^~_t&it,X=vt&At^~vt&ct,Q=h[y+4],R=h[y+5],U=o[y+4],V=o[y+5],k=(65535&V)+(65535&R)+(65535&X)+(65535&j)+(65535&lt),q=(V>>>16)+(R>>>16)+(X>>>16)+(j>>>16)+(lt>>>16)+(k>>>16),z=(65535&U)+(65535&Q)+(65535&W)+(65535&J)+(65535&dt)+(q>>>16),B=(U>>>16)+(Q>>>16)+(W>>>16)+(J>>>16)+(dt>>>16)+(z>>>16),Q=B<<16|65535&z,R=q<<16|65535&k,k=(65535&P)+(65535&H),q=(P>>>16)+(H>>>16)+(k>>>16),z=(65535&O)+(65535&E)+(q>>>16),B=(O>>>16)+(E>>>16)+(z>>>16),U=B<<16|65535&z,V=q<<16|65535&k,k=(65535&ot)+(65535&R),q=(ot>>>16)+(R>>>16)+(k>>>16),z=(65535&et)+(65535&Q)+(q>>>16),B=(et>>>16)+(Q>>>16)+(z>>>16),dt=B<<16|65535&z,lt=q<<16|65535&k,k=(65535&V)+(65535&R),q=(V>>>16)+(R>>>16)+(k>>>16),z=(65535&U)+(65535&Q)+(q>>>16),B=(U>>>16)+(Q>>>16)+(z>>>16),et=B<<16|65535&z,ot=q<<16|65535&k,E=(et>>>28|ot<<4)^(ot>>>2|et<<30)^(ot>>>7|et<<25),H=(ot>>>28|et<<4)^(et>>>2|ot<<30)^(et>>>7|ot<<25),J=(dt>>>14|lt<<18)^(dt>>>18|lt<<14)^(lt>>>9|dt<<23),j=(lt>>>14|dt<<18)^(lt>>>18|dt<<14)^(dt>>>9|lt<<23),M=et&ht,N=ot&st,O=M^et&ut^K,P=N^ot&ft^L,W=dt&_t^~dt&pt,X=lt&vt^~lt&At,Q=h[y+6],R=h[y+7],U=o[y+6],V=o[y+7],k=(65535&V)+(65535&R)+(65535&X)+(65535&j)+(65535&ct),q=(V>>>16)+(R>>>16)+(X>>>16)+(j>>>16)+(ct>>>16)+(k>>>16),z=(65535&U)+(65535&Q)+(65535&W)+(65535&J)+(65535&it)+(q>>>16),B=(U>>>16)+(Q>>>16)+(W>>>16)+(J>>>16)+(it>>>16)+(z>>>16),Q=B<<16|65535&z,R=q<<16|65535&k,k=(65535&P)+(65535&H),q=(P>>>16)+(H>>>16)+(k>>>16),z=(65535&O)+(65535&E)+(q>>>16),B=(O>>>16)+(E>>>16)+(z>>>16),U=B<<16|65535&z,V=q<<16|65535&k,k=(65535&nt)+(65535&R),q=(nt>>>16)+(R>>>16)+(k>>>16),z=(65535&at)+(65535&Q)+(q>>>16),B=(at>>>16)+(Q>>>16)+(z>>>16),it=B<<16|65535&z,ct=q<<16|65535&k,k=(65535&V)+(65535&R),q=(V>>>16)+(R>>>16)+(k>>>16),z=(65535&U)+(65535&Q)+(q>>>16),B=(U>>>16)+(Q>>>16)+(z>>>16),at=B<<16|65535&z,nt=q<<16|65535&k;k=(65535&u)+(65535&nt),q=(u>>>16)+(nt>>>16)+(k>>>16),z=(65535&s)+(65535&at)+(q>>>16),B=(s>>>16)+(at>>>16)+(z>>>16),s=B<<16|65535&z,u=q<<16|65535&k,k=(65535&i)+(65535&ot),q=(i>>>16)+(ot>>>16)+(k>>>16),z=(65535&f)+(65535&et)+(q>>>16),B=(f>>>16)+(et>>>16)+(z>>>16),f=B<<16|65535&z,i=q<<16|65535&k,k=(65535&d)+(65535&st),q=(d>>>16)+(st>>>16)+(k>>>16),z=(65535&c)+(65535&ht)+(q>>>16),B=(c>>>16)+(ht>>>16)+(z>>>16),c=B<<16|65535&z,d=q<<16|65535&k,k=(65535&_)+(65535&ft),q=(_>>>16)+(ft>>>16)+(k>>>16),z=(65535&l)+(65535&ut)+(q>>>16),B=(l>>>16)+(ut>>>16)+(z>>>16),l=B<<16|65535&z,_=q<<16|65535&k,k=(65535&p)+(65535&ct),q=(p>>>16)+(ct>>>16)+(k>>>16),z=(65535&v)+(65535&it)+(q>>>16),B=(v>>>16)+(it>>>16)+(z>>>16),v=B<<16|65535&z,p=q<<16|65535&k,k=(65535&S)+(65535&lt),q=(S>>>16)+(lt>>>16)+(k>>>16),z=(65535&A)+(65535&dt)+(q>>>16),B=(A>>>16)+(dt>>>16)+(z>>>16),A=B<<16|65535&z,S=q<<16|65535&k,k=(65535&g)+(65535&vt),q=(g>>>16)+(vt>>>16)+(k>>>16),z=(65535&b)+(65535&_t)+(q>>>16),B=(b>>>16)+(_t>>>16)+(z>>>16),b=B<<16|65535&z,g=q<<16|65535&k,k=(65535&C)+(65535&At),q=(C>>>16)+(At>>>16)+(k>>>16),z=(65535&m)+(65535&pt)+(q>>>16),B=(m>>>16)+(pt>>>16)+(z>>>16),m=B<<16|65535&z,C=q<<16|65535&k}while(!Y);var St=a[s>>28&15]+a[s>>24&15]+a[s>>20&15]+a[s>>16&15]+a[s>>12&15]+a[s>>8&15]+a[s>>4&15]+a[15&s]+a[u>>28&15]+a[u>>24&15]+a[u>>20&15]+a[u>>16&15]+a[u>>12&15]+a[u>>8&15]+a[u>>4&15]+a[15&u]+a[f>>28&15]+a[f>>24&15]+a[f>>20&15]+a[f>>16&15]+a[f>>12&15]+a[f>>8&15]+a[f>>4&15]+a[15&f]+a[i>>28&15]+a[i>>24&15]+a[i>>20&15]+a[i>>16&15]+a[i>>12&15]+a[i>>8&15]+a[i>>4&15]+a[15&i]+a[c>>28&15]+a[c>>24&15]+a[c>>20&15]+a[c>>16&15]+a[c>>12&15]+a[c>>8&15]+a[c>>4&15]+a[15&c]+a[d>>28&15]+a[d>>24&15]+a[d>>20&15]+a[d>>16&15]+a[d>>12&15]+a[d>>8&15]+a[d>>4&15]+a[15&d]+a[l>>28&15]+a[l>>24&15]+a[l>>20&15]+a[l>>16&15]+a[l>>12&15]+a[l>>8&15]+a[l>>4&15]+a[15&l];return 256>t||(St+=a[_>>28&15]+a[_>>24&15]+a[_>>20&15]+a[_>>16&15]+a[_>>12&15]+a[_>>8&15]+a[_>>4&15]+a[15&_]),384>t||(St+=a[v>>28&15]+a[v>>24&15]+a[v>>20&15]+a[v>>16&15]+a[v>>12&15]+a[v>>8&15]+a[v>>4&15]+a[15&v]+a[p>>28&15]+a[p>>24&15]+a[p>>20&15]+a[p>>16&15]+a[p>>12&15]+a[p>>8&15]+a[p>>4&15]+a[15&p]+a[A>>28&15]+a[A>>24&15]+a[A>>20&15]+a[A>>16&15]+a[A>>12&15]+a[A>>8&15]+a[A>>4&15]+a[15&A]+a[S>>28&15]+a[S>>24&15]+a[S>>20&15]+a[S>>16&15]+a[S>>12&15]+a[S>>8&15]+a[S>>4&15]+a[15&S]),512==t&&(St+=a[b>>28&15]+a[b>>24&15]+a[b>>20&15]+a[b>>16&15]+a[b>>12&15]+a[b>>8&15]+a[b>>4&15]+a[15&b]+a[g>>28&15]+a[g>>24&15]+a[g>>20&15]+a[g>>16&15]+a[g>>12&15]+a[g>>8&15]+a[g>>4&15]+a[15&g]+a[m>>28&15]+a[m>>24&15]+a[m>>20&15]+a[m>>16&15]+a[m>>12&15]+a[m>>8&15]+a[m>>4&15]+a[15&m]+a[C>>28&15]+a[C>>24&15]+a[C>>20&15]+a[C>>16&15]+a[C>>12&15]+a[C>>8&15]+a[C>>4&15]+a[15&C]),St};!r.JS_SHA512_TEST&&t?(i.sha512=i,i.sha384=s,i.sha512_256=u,i.sha512_224=f,module.exports=i):r&&(r.sha512=i,r.sha384=s,r.sha512_256=u,r.sha512_224=f)}(this);
var dateFormat = function () {
    var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
	timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
	timezoneClip = /[^-+\dA-Z]/g,
	pad = function (val, len) {
	    val = String(val);
	    len = len || 2;
	    while (val.length < len) val = "0" + val;
	    return val;
	};

    // Regexes and supporting functions are cached through closure
    return function (date, mask, utc) {
        var dF = dateFormat;

        // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
        if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
            mask = date;
            date = undefined;
        }

        // Passing date through Date applies Date.parse, if necessary
        date = date ? new Date(date) : new Date;
        if (isNaN(date)) throw SyntaxError("invalid date");

        mask = String(dF.masks[mask] || mask || dF.masks["default"]);

        // Allow setting the utc argument via the mask
        if (mask.slice(0, 4) == "UTC:") {
            mask = mask.slice(4);
            utc = true;
        }

        var _ = utc ? "getUTC" : "get",
				d = date[_ + "Date"](),
				D = date[_ + "Day"](),
				m = date[_ + "Month"](),
				y = date[_ + "FullYear"](),
				H = date[_ + "Hours"](),
				M = date[_ + "Minutes"](),
				s = date[_ + "Seconds"](),
				L = date[_ + "Milliseconds"](),
				o = utc ? 0 : date.getTimezoneOffset(),
						flags = {
						    d: d,
						    dd: pad(d),
						    ddd: dF.i18n.dayNames[D],
						    dddd: dF.i18n.dayNames[D + 7],
						    m: m + 1,
						    mm: pad(m + 1),
						    mmm: dF.i18n.monthNames[m],
						    mmmm: dF.i18n.monthNames[m + 12],
						    yy: String(y).slice(2),
						    yyyy: y,
						    h: H % 12 || 12,
						    hh: pad(H % 12 || 12),
						    H: H,
						    HH: pad(H),
						    M: M,
						    MM: pad(M),
						    s: s,
						    ss: pad(s),
						    l: pad(L, 3),
						    L: pad(L > 99 ? Math.round(L / 10) : L),
						    t: H < 12 ? "a" : "p",
						    tt: H < 12 ? "am" : "pm",
						    T: H < 12 ? "A" : "P",
						    TT: H < 12 ? "AM" : "PM",
						    Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
						    o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
						    S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
						};

        return mask.replace(token, function ($0) {
            return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
        });
    };
}();
//Some common format strings
dateFormat.masks = {
    "default": "ddd mmm dd yyyy HH:MM:ss",
    shortDate: "m/d/yy",
    mediumDate: "mmm d, yyyy",
    longDate: "mmmm d, yyyy",
    fullDate: "dddd, mmmm d, yyyy",
    shortTime: "h:MM TT",
    mediumTime: "h:MM:ss TT",
    longTime: "h:MM:ss TT Z",
    isoDate: "yyyy-mm-dd",
    isoTime: "HH:MM:ss",
    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

//Internationalization strings
dateFormat.i18n = {
    dayNames: [
               "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
               "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ],
    monthNames: [
                 "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
                 "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]
};

//For convenience...
Date.prototype.format = function (mask, utc) {
    return dateFormat(this, mask, utc);
};

function Log(text) {
    try {
        IsDebugging = true;
    } catch (e) {
        IsDebugging = "false";
    }
    // MFP.Logger.warn(""+IsDebugging);
    if (IsDebugging == "true")
        MFP.Logger.warn(text);
    else
        MFP.Logger.debug(text);
}

function urlencode(text) {
    return encodeURIComponent(text).replace(/!/g, '%21')
	.replace(/'/g, '%27')
	.replace(/\(/g, '%28')
	.replace(/\)/g, '%29')
	.replace(/\*/g, '%2A')
	.replace(/%20/g, '+');
}
function randomFixedInteger(length) {
    //return Math.floor(Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1));
    var text = "";
    var possible = "ABCDEF0123456789";

    for (var i = 0; i < 16; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

//var SECRET_KEY = "BF4A5142954BDF4B";// For Testing
//var happinessURL = "https://happinessmeterqa.dubai.gov.ae/HappinessMeter2/MobilePostDataService?";// For Testing
var SECRET_KEY = "D124C5D81A472969";// For Production
var happinessURL = "https://happinessmeter.dubai.gov.ae/HappinessMeter2/MobilePostDataService?";// For Production


var client_id = "rtabeatuser";
var application_type = "SMARTAPP";

function getAppNameForHappinessMeter(appName)   {
	var modifiedAppName=appName;
	switch(appName) {
	case "المواصلات العامة":
		modifiedAppName = "Public Transport";
		break;

	case "خدمات قطاع الأعمال":
		modifiedAppName = "Corporate Services";
		break;
	case "المركبات و السائقين":
		modifiedAppName = "Dubai Drive";
		break;
	}
	return modifiedAppName;
}
function handleError(msg,code){
	var msg= msg || "Internal Server Error";
	var code =code||500;

//	adapterLogger("handleError","error", "Internal Error",JSON.stringify([msg,code]));
	var response = {
			"isSuccessful": false,
			"error": {
				"code": code,
				"message": msg,
				"adapter": "happinessMeterAdapterV2"
			}
	};
//	adapterLogger("handleError","error", "Internal Error",JSON.stringify(response));
	return response;
}

function getHappinessMeterUrl(prams) {
	try{
	//Modify the arabic name
	if(prams&&prams.application)
	  prams.application.applicationID = getAppNameForHappinessMeter(prams.application.applicationID);
	MFP.Logger.warn("|happinessMeterAdapterV2 |getHappinessMeterUrl |Parameters: " + JSON.stringify(prams) );
    // prepare header object
    var d1 = new Date();
    d1 = d1.format("dd/mm/yyyy HH:MM:ss", true);
    var timestamp = d1.toString();
    prams.header.timestamp = timestamp;
    prams.header.serviceProvider = "RTA";
    
    var json = JSON.stringify(prams);
	MFP.Logger.warn("|happinessMeterAdapterV2 |getHappinessMeterUrl |json: " +json );

    var json_payload = urlencode(json);
    var lang = urlencode(prams.header.lang);
    var random = urlencode(randomFixedInteger(16));
    var signature = urlencode(sha512(json + "|" + SECRET_KEY));
    var nonce = urlencode(sha512(random + "|" + timestamp + "|" + SECRET_KEY));
    var clientId = urlencode(client_id);
    var timeStamp = urlencode(timestamp);

//    var url = happinessURL + encodeURI('json_payload=' + json_payload + '&client_id=' + clientId + '&signature=' + signature
//        + '&lang=' + lang + '&timestamp=' + timeStamp + '&random=' + random + '&nonce=' + nonce);
//    
    var url = happinessURL + 'json_payload=' + json_payload + '&client_id=' + clientId + '&signature=' + signature
            + '&lang=' + lang + '&timestamp=' + timeStamp + '&random=' + random + '&nonce=' + nonce;
	MFP.Logger.warn("|happinessMeterAdapterV2 |getHappinessMeterUrl |URL: " + url );

    return {
    	url:url
    };
	}catch(e){
		MFP.Logger.error("|happinessMeterAdapterV2 |adapterLogger |Exception" + JSON.stringify(e));
		return handleError();

	}
}