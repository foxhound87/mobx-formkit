(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.MobxFormkitValidatorVINEJS = factory());
})(this, (function () { 'use strict';

	function delve(t,e,l,n,r){for(e=e.split?e.split("."):e,n=0;n<e.length;n++)t=t?t[e[n]]:r;return t===r?l:t}

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var dayjs_min$1 = {exports: {}};

	var dayjs_min = dayjs_min$1.exports;

	var hasRequiredDayjs_min;

	function requireDayjs_min () {
		if (hasRequiredDayjs_min) return dayjs_min$1.exports;
		hasRequiredDayjs_min = 1;
		(function (module, exports$1) {
			!function(t,e){module.exports=e();}(dayjs_min,(function(){var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",c="month",f="quarter",h="year",d="date",l="Invalid Date",$=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|YYYY|YY|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return "["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var r=String(t);return !r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},v={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return (e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return -t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,c),s=n-i<0,u=e.clone().add(r+(s?-1:1),c);return +(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return {M:c,y:h,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:f}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},g="en",D={};D[g]=M;var p="$isDayjsObject",S=function(t){return t instanceof _||!(!t||!t[p])},w=function t(e,n,r){var i;if(!e)return g;if("string"==typeof e){var s=e.toLowerCase();D[s]&&(i=s),n&&(D[s]=n,i=s);var u=e.split("-");if(!i&&u.length>1)return t(u[0])}else {var a=e.name;D[a]=e,i=a;}return !r&&i&&(g=i),i||!r&&g},O=function(t,e){if(S(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},b=v;b.l=w,b.i=S,b.w=function(t,e){return O(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=w(t.locale,null,true),this.parse(t),this.$x=this.$x||t.x||{},this[p]=true;}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(b.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match($);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.init();},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds();},m.$utils=function(){return b},m.isValid=function(){return !(this.$d.toString()===l)},m.isSame=function(t,e){var n=O(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return O(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<O(t)},m.$g=function(t,e,n){return b.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!b.u(e)||e,f=b.p(t),l=function(t,e){var i=b.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},$=function(t,e){return b.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,v="set"+(this.$u?"UTC":"");switch(f){case h:return r?l(1,0):l(31,11);case c:return r?l(1,M):l(0,M+1);case o:var g=this.$locale().weekStart||0,D=(y<g?y+7:y)-g;return l(r?m-D:m+(6-D),M);case a:case d:return $(v+"Hours",0);case u:return $(v+"Minutes",1);case s:return $(v+"Seconds",2);case i:return $(v+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,false)},m.$set=function(t,e){var n,o=b.p(t),f="set"+(this.$u?"UTC":""),l=(n={},n[a]=f+"Date",n[d]=f+"Date",n[c]=f+"Month",n[h]=f+"FullYear",n[u]=f+"Hours",n[s]=f+"Minutes",n[i]=f+"Seconds",n[r]=f+"Milliseconds",n)[o],$=o===a?this.$D+(e-this.$W):e;if(o===c||o===h){var y=this.clone().set(d,1);y.$d[l]($),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d;}else l&&this.$d[l]($);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[b.p(t)]()},m.add=function(r,f){var d,l=this;r=Number(r);var $=b.p(f),y=function(t){var e=O(l);return b.w(e.date(e.date()+Math.round(t*r)),l)};if($===c)return this.set(c,this.$M+r);if($===h)return this.set(h,this.$y+r);if($===a)return y(1);if($===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[$]||1,m=this.$d.getTime()+r*M;return b.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||l;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=b.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,c=n.months,f=n.meridiem,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].slice(0,s)},d=function(t){return b.s(s%12||12,t,"0")},$=f||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r};return r.replace(y,(function(t,r){return r||function(t){switch(t){case "YY":return String(e.$y).slice(-2);case "YYYY":return b.s(e.$y,4,"0");case "M":return a+1;case "MM":return b.s(a+1,2,"0");case "MMM":return h(n.monthsShort,a,c,3);case "MMMM":return h(c,a);case "D":return e.$D;case "DD":return b.s(e.$D,2,"0");case "d":return String(e.$W);case "dd":return h(n.weekdaysMin,e.$W,o,2);case "ddd":return h(n.weekdaysShort,e.$W,o,3);case "dddd":return o[e.$W];case "H":return String(s);case "HH":return b.s(s,2,"0");case "h":return d(1);case "hh":return d(2);case "a":return $(s,u,true);case "A":return $(s,u,false);case "m":return String(u);case "mm":return b.s(u,2,"0");case "s":return String(e.$s);case "ss":return b.s(e.$s,2,"0");case "SSS":return b.s(e.$ms,3,"0");case "Z":return i}return null}(t)||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,l){var $,y=this,M=b.p(d),m=O(r),v=(m.utcOffset()-this.utcOffset())*e,g=this-m,D=function(){return b.m(y,m)};switch(M){case h:$=D()/12;break;case c:$=D();break;case f:$=D()/3;break;case o:$=(g-v)/6048e5;break;case a:$=(g-v)/864e5;break;case u:$=g/n;break;case s:$=g/e;break;case i:$=g/t;break;default:$=g;}return l?$:b.a($)},m.daysInMonth=function(){return this.endOf(c).$D},m.$locale=function(){return D[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=w(t,e,true);return r&&(n.$L=r),n},m.clone=function(){return b.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),Y=_.prototype;return O.prototype=Y,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",c],["$y",h],["$D",d]].forEach((function(t){Y[t[1]]=function(e){return this.$g(e,t[0],t[1])};})),O.extend=function(t,e){return t.$i||(t(e,_,O),t.$i=true),O},O.locale=w,O.isDayjs=S,O.unix=function(t){return O(1e3*t)},O.en=D[g],O.Ls=D,O.p={},O})); 
		} (dayjs_min$1));
		return dayjs_min$1.exports;
	}

	var dayjs_minExports = requireDayjs_min();
	var dayjs = /*@__PURE__*/getDefaultExportFromCjs(dayjs_minExports);

	var isIP$1 = {exports: {}};

	var assertString = {exports: {}};

	var hasRequiredAssertString;

	function requireAssertString () {
		if (hasRequiredAssertString) return assertString.exports;
		hasRequiredAssertString = 1;
		(function (module, exports$1) {

			Object.defineProperty(exports$1, "__esModule", {
			  value: true
			});
			exports$1.default = assertString;
			function assertString(input) {
			  if (input === undefined || input === null) throw new TypeError("Expected a string but received a ".concat(input));
			  if (input.constructor.name !== 'String') throw new TypeError("Expected a string but received a ".concat(input.constructor.name));
			}
			module.exports = exports$1.default;
			module.exports.default = exports$1.default; 
		} (assertString, assertString.exports));
		return assertString.exports;
	}

	var hasRequiredIsIP;

	function requireIsIP () {
		if (hasRequiredIsIP) return isIP$1.exports;
		hasRequiredIsIP = 1;
		(function (module, exports$1) {

			Object.defineProperty(exports$1, "__esModule", {
			  value: true
			});
			exports$1.default = isIP;
			var _assertString = _interopRequireDefault(/*@__PURE__*/ requireAssertString());
			function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
			function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
			/**
			11.3.  Examples

			   The following addresses

			             fe80::1234 (on the 1st link of the node)
			             ff02::5678 (on the 5th link of the node)
			             ff08::9abc (on the 10th organization of the node)

			   would be represented as follows:

			             fe80::1234%1
			             ff02::5678%5
			             ff08::9abc%10

			   (Here we assume a natural translation from a zone index to the
			   <zone_id> part, where the Nth zone of any scope is translated into
			   "N".)

			   If we use interface names as <zone_id>, those addresses could also be
			   represented as follows:

			            fe80::1234%ne0
			            ff02::5678%pvc1.3
			            ff08::9abc%interface10

			   where the interface "ne0" belongs to the 1st link, "pvc1.3" belongs
			   to the 5th link, and "interface10" belongs to the 10th organization.
			 * * */
			var IPv4SegmentFormat = '(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])';
			var IPv4AddressFormat = "(".concat(IPv4SegmentFormat, "[.]){3}").concat(IPv4SegmentFormat);
			var IPv4AddressRegExp = new RegExp("^".concat(IPv4AddressFormat, "$"));
			var IPv6SegmentFormat = '(?:[0-9a-fA-F]{1,4})';
			var IPv6AddressRegExp = new RegExp('^(' + "(?:".concat(IPv6SegmentFormat, ":){7}(?:").concat(IPv6SegmentFormat, "|:)|") + "(?:".concat(IPv6SegmentFormat, ":){6}(?:").concat(IPv4AddressFormat, "|:").concat(IPv6SegmentFormat, "|:)|") + "(?:".concat(IPv6SegmentFormat, ":){5}(?::").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,2}|:)|") + "(?:".concat(IPv6SegmentFormat, ":){4}(?:(:").concat(IPv6SegmentFormat, "){0,1}:").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,3}|:)|") + "(?:".concat(IPv6SegmentFormat, ":){3}(?:(:").concat(IPv6SegmentFormat, "){0,2}:").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,4}|:)|") + "(?:".concat(IPv6SegmentFormat, ":){2}(?:(:").concat(IPv6SegmentFormat, "){0,3}:").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,5}|:)|") + "(?:".concat(IPv6SegmentFormat, ":){1}(?:(:").concat(IPv6SegmentFormat, "){0,4}:").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,6}|:)|") + "(?::((?::".concat(IPv6SegmentFormat, "){0,5}:").concat(IPv4AddressFormat, "|(?::").concat(IPv6SegmentFormat, "){1,7}|:))") + ')(%[0-9a-zA-Z.]{1,})?$');
			function isIP(ipAddress) {
			  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
			  (0, _assertString.default)(ipAddress);

			  // accessing 'arguments' for backwards compatibility: isIP(ipAddress [, version])
			  // eslint-disable-next-line prefer-rest-params
			  var version = (_typeof(options) === 'object' ? options.version : arguments[1]) || '';
			  if (!version) {
			    return isIP(ipAddress, {
			      version: 4
			    }) || isIP(ipAddress, {
			      version: 6
			    });
			  }
			  if (version.toString() === '4') {
			    return IPv4AddressRegExp.test(ipAddress);
			  }
			  if (version.toString() === '6') {
			    return IPv6AddressRegExp.test(ipAddress);
			  }
			  return false;
			}
			module.exports = exports$1.default;
			module.exports.default = exports$1.default; 
		} (isIP$1, isIP$1.exports));
		return isIP$1.exports;
	}

	var isIPExports = /*@__PURE__*/ requireIsIP();
	var isIP = /*@__PURE__*/getDefaultExportFromCjs(isIPExports);

	var isJWT$1 = {exports: {}};

	var isBase64 = {exports: {}};

	var merge = {exports: {}};

	var hasRequiredMerge;

	function requireMerge () {
		if (hasRequiredMerge) return merge.exports;
		hasRequiredMerge = 1;
		(function (module, exports$1) {

			Object.defineProperty(exports$1, "__esModule", {
			  value: true
			});
			exports$1.default = merge;
			function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
			function merge() {
			  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			  var defaults = arguments.length > 1 ? arguments[1] : undefined;
			  if (_typeof(obj) !== 'object' || obj === null) {
			    obj = {};
			  }
			  for (var key in defaults) {
			    if (typeof obj[key] === 'undefined') {
			      obj[key] = defaults[key];
			    }
			  }
			  return obj;
			}
			module.exports = exports$1.default;
			module.exports.default = exports$1.default; 
		} (merge, merge.exports));
		return merge.exports;
	}

	var hasRequiredIsBase64;

	function requireIsBase64 () {
		if (hasRequiredIsBase64) return isBase64.exports;
		hasRequiredIsBase64 = 1;
		(function (module, exports$1) {

			Object.defineProperty(exports$1, "__esModule", {
			  value: true
			});
			exports$1.default = isBase64;
			var _assertString = _interopRequireDefault(/*@__PURE__*/ requireAssertString());
			var _merge = _interopRequireDefault(/*@__PURE__*/ requireMerge());
			function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
			var base64WithPadding = /^[A-Za-z0-9+/]+={0,2}$/;
			var base64WithoutPadding = /^[A-Za-z0-9+/]+$/;
			var base64UrlWithPadding = /^[A-Za-z0-9_-]+={0,2}$/;
			var base64UrlWithoutPadding = /^[A-Za-z0-9_-]+$/;
			function isBase64(str, options) {
			  var _options;
			  (0, _assertString.default)(str);
			  options = (0, _merge.default)(options, {
			    urlSafe: false,
			    padding: !((_options = options) !== null && _options !== void 0 && _options.urlSafe)
			  });
			  if (str === '') return true;
			  if (options.padding && str.length % 4 !== 0) return false;
			  var regex;
			  if (options.urlSafe) {
			    regex = options.padding ? base64UrlWithPadding : base64UrlWithoutPadding;
			  } else {
			    regex = options.padding ? base64WithPadding : base64WithoutPadding;
			  }
			  return (!options.padding || str.length % 4 === 0) && regex.test(str);
			}
			module.exports = exports$1.default;
			module.exports.default = exports$1.default; 
		} (isBase64, isBase64.exports));
		return isBase64.exports;
	}

	var hasRequiredIsJWT;

	function requireIsJWT () {
		if (hasRequiredIsJWT) return isJWT$1.exports;
		hasRequiredIsJWT = 1;
		(function (module, exports$1) {

			Object.defineProperty(exports$1, "__esModule", {
			  value: true
			});
			exports$1.default = isJWT;
			var _assertString = _interopRequireDefault(/*@__PURE__*/ requireAssertString());
			var _isBase = _interopRequireDefault(/*@__PURE__*/ requireIsBase64());
			function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
			function isJWT(str) {
			  (0, _assertString.default)(str);
			  var dotSplit = str.split('.');
			  var len = dotSplit.length;
			  if (len !== 3) {
			    return false;
			  }
			  return dotSplit.reduce(function (acc, currElem) {
			    return acc && (0, _isBase.default)(currElem, {
			      urlSafe: true
			    });
			  }, true);
			}
			module.exports = exports$1.default;
			module.exports.default = exports$1.default; 
		} (isJWT$1, isJWT$1.exports));
		return isJWT$1.exports;
	}

	var isJWTExports = /*@__PURE__*/ requireIsJWT();
	var isJWT = /*@__PURE__*/getDefaultExportFromCjs(isJWTExports);

	var isURL$1 = {exports: {}};

	var checkHost = {exports: {}};

	var hasRequiredCheckHost;

	function requireCheckHost () {
		if (hasRequiredCheckHost) return checkHost.exports;
		hasRequiredCheckHost = 1;
		(function (module, exports$1) {

			Object.defineProperty(exports$1, "__esModule", {
			  value: true
			});
			exports$1.default = checkHost;
			function isRegExp(obj) {
			  return Object.prototype.toString.call(obj) === '[object RegExp]';
			}
			function checkHost(host, matches) {
			  for (var i = 0; i < matches.length; i++) {
			    var match = matches[i];
			    if (host === match || isRegExp(match) && match.test(host)) {
			      return true;
			    }
			  }
			  return false;
			}
			module.exports = exports$1.default;
			module.exports.default = exports$1.default; 
		} (checkHost, checkHost.exports));
		return checkHost.exports;
	}

	var includesString = {exports: {}};

	var hasRequiredIncludesString;

	function requireIncludesString () {
		if (hasRequiredIncludesString) return includesString.exports;
		hasRequiredIncludesString = 1;
		(function (module, exports$1) {

			Object.defineProperty(exports$1, "__esModule", {
			  value: true
			});
			exports$1.default = void 0;
			var includes = function includes(str, val) {
			  return str.indexOf(val) !== -1;
			};
			exports$1.default = includes;
			module.exports = exports$1.default;
			module.exports.default = exports$1.default; 
		} (includesString, includesString.exports));
		return includesString.exports;
	}

	var isFQDN = {exports: {}};

	var hasRequiredIsFQDN;

	function requireIsFQDN () {
		if (hasRequiredIsFQDN) return isFQDN.exports;
		hasRequiredIsFQDN = 1;
		(function (module, exports$1) {

			Object.defineProperty(exports$1, "__esModule", {
			  value: true
			});
			exports$1.default = isFQDN;
			var _assertString = _interopRequireDefault(/*@__PURE__*/ requireAssertString());
			var _merge = _interopRequireDefault(/*@__PURE__*/ requireMerge());
			function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
			var default_fqdn_options = {
			  require_tld: true,
			  allow_underscores: false,
			  allow_trailing_dot: false,
			  allow_numeric_tld: false,
			  allow_wildcard: false,
			  ignore_max_length: false
			};
			function isFQDN(str, options) {
			  (0, _assertString.default)(str);
			  options = (0, _merge.default)(options, default_fqdn_options);

			  /* Remove the optional trailing dot before checking validity */
			  if (options.allow_trailing_dot && str[str.length - 1] === '.') {
			    str = str.substring(0, str.length - 1);
			  }

			  /* Remove the optional wildcard before checking validity */
			  if (options.allow_wildcard === true && str.indexOf('*.') === 0) {
			    str = str.substring(2);
			  }
			  var parts = str.split('.');
			  var tld = parts[parts.length - 1];
			  if (options.require_tld) {
			    // disallow fqdns without tld
			    if (parts.length < 2) {
			      return false;
			    }
			    if (!options.allow_numeric_tld && !/^([a-z\u00A1-\u00A8\u00AA-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
			      return false;
			    }

			    // disallow spaces
			    if (/\s/.test(tld)) {
			      return false;
			    }
			  }

			  // reject numeric TLDs
			  if (!options.allow_numeric_tld && /^\d+$/.test(tld)) {
			    return false;
			  }
			  return parts.every(function (part) {
			    if (part.length > 63 && !options.ignore_max_length) {
			      return false;
			    }
			    if (!/^[a-z_\u00a1-\uffff0-9-]+$/i.test(part)) {
			      return false;
			    }

			    // disallow full-width chars
			    if (/[\uff01-\uff5e]/.test(part)) {
			      return false;
			    }

			    // disallow parts starting or ending with hyphen
			    if (/^-|-$/.test(part)) {
			      return false;
			    }
			    if (!options.allow_underscores && /_/.test(part)) {
			      return false;
			    }
			    return true;
			  });
			}
			module.exports = exports$1.default;
			module.exports.default = exports$1.default; 
		} (isFQDN, isFQDN.exports));
		return isFQDN.exports;
	}

	var hasRequiredIsURL;

	function requireIsURL () {
		if (hasRequiredIsURL) return isURL$1.exports;
		hasRequiredIsURL = 1;
		(function (module, exports$1) {

			Object.defineProperty(exports$1, "__esModule", {
			  value: true
			});
			exports$1.default = isURL;
			var _assertString = _interopRequireDefault(/*@__PURE__*/ requireAssertString());
			var _checkHost = _interopRequireDefault(/*@__PURE__*/ requireCheckHost());
			var _includesString = _interopRequireDefault(/*@__PURE__*/ requireIncludesString());
			var _isFQDN = _interopRequireDefault(/*@__PURE__*/ requireIsFQDN());
			var _isIP = _interopRequireDefault(/*@__PURE__*/ requireIsIP());
			var _merge = _interopRequireDefault(/*@__PURE__*/ requireMerge());
			function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
			function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
			function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
			function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
			function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
			function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = true, o = false; try { if (i = (t = t.call(r)).next, 0 === l) ; else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = true, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
			function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
			/*
			options for isURL method

			protocols - valid protocols can be modified with this option.
			require_tld - If set to false isURL will not check if the URL's host includes a top-level domain.
			require_protocol - if set to true isURL will return false if protocol is not present in the URL.
			require_host - if set to false isURL will not check if host is present in the URL.
			require_port - if set to true isURL will check if port is present in the URL.
			require_valid_protocol - isURL will check if the URL's protocol is present in the protocols option.
			allow_underscores - if set to true, the validator will allow underscores in the URL.
			host_whitelist - if set to an array of strings or regexp, and the domain matches none of the strings
			                 defined in it, the validation fails.
			host_blacklist - if set to an array of strings or regexp, and the domain matches any of the strings
			                 defined in it, the validation fails.
			allow_trailing_dot - if set to true, the validator will allow the domain to end with
			                     a `.` character.
			allow_protocol_relative_urls - if set to true protocol relative URLs will be allowed.
			allow_fragments - if set to false isURL will return false if fragments are present.
			allow_query_components - if set to false isURL will return false if query components are present.
			disallow_auth - if set to true, the validator will fail if the URL contains an authentication
			                component, e.g. `http://username:password@example.com`
			validate_length - if set to false isURL will skip string length validation. `max_allowed_length`
			                  will be ignored if this is set as `false`.
			max_allowed_length - if set, isURL will not allow URLs longer than the specified value (default is
			                     2084 that IE maximum URL length).

			*/

			var default_url_options = {
			  protocols: ['http', 'https', 'ftp'],
			  require_tld: true,
			  require_protocol: false,
			  require_host: true,
			  require_port: false,
			  require_valid_protocol: true,
			  allow_underscores: false,
			  allow_trailing_dot: false,
			  allow_protocol_relative_urls: false,
			  allow_fragments: true,
			  allow_query_components: true,
			  validate_length: true,
			  max_allowed_length: 2084
			};
			var wrapped_ipv6 = /^\[([^\]]+)\](?::([0-9]+))?$/;
			function isURL(url, options) {
			  (0, _assertString.default)(url);
			  if (!url || /[\s<>]/.test(url)) {
			    return false;
			  }
			  if (url.indexOf('mailto:') === 0) {
			    return false;
			  }
			  options = (0, _merge.default)(options, default_url_options);
			  if (options.validate_length && url.length > options.max_allowed_length) {
			    return false;
			  }
			  if (!options.allow_fragments && (0, _includesString.default)(url, '#')) {
			    return false;
			  }
			  if (!options.allow_query_components && ((0, _includesString.default)(url, '?') || (0, _includesString.default)(url, '&'))) {
			    return false;
			  }
			  var protocol, auth, host, hostname, port, port_str, split, ipv6;
			  split = url.split('#');
			  url = split.shift();
			  split = url.split('?');
			  url = split.shift();

			  // Replaced the 'split("://")' logic with a regex to match the protocol.
			  // This correctly identifies schemes like `javascript:` which don't use `//`.
			  // However, we need to be careful not to confuse authentication credentials (user:password@host)
			  // with protocols. A colon before an @ symbol might be part of auth, not a protocol separator.
			  var protocol_match = url.match(/^([a-z][a-z0-9+\-.]*):/i);
			  var had_explicit_protocol = false;
			  var cleanUpProtocol = function cleanUpProtocol(potential_protocol) {
			    had_explicit_protocol = true;
			    protocol = potential_protocol.toLowerCase();
			    if (options.require_valid_protocol && options.protocols.indexOf(protocol) === -1) {
			      // The identified protocol is not in the allowed list.
			      return false;
			    }

			    // Remove the protocol from the URL string.
			    return url.substring(protocol_match[0].length);
			  };
			  if (protocol_match) {
			    var potential_protocol = protocol_match[1];
			    var after_colon = url.substring(protocol_match[0].length);

			    // Check if what follows looks like authentication credentials (user:password@host)
			    // rather than a protocol. This happens when:
			    // 1. There's no `//` after the colon (protocols like `http://` have this)
			    // 2. There's an `@` symbol before any `/`
			    // 3. The part before `@` contains only valid auth characters (alphanumeric, -, _, ., %, :)
			    var starts_with_slashes = after_colon.slice(0, 2) === '//';
			    if (!starts_with_slashes) {
			      var first_slash_position = after_colon.indexOf('/');
			      var before_slash = first_slash_position === -1 ? after_colon : after_colon.substring(0, first_slash_position);
			      var at_position = before_slash.indexOf('@');
			      if (at_position !== -1) {
			        var before_at = before_slash.substring(0, at_position);
			        var valid_auth_regex = /^[a-zA-Z0-9\-_.%:]*$/;
			        var is_valid_auth = valid_auth_regex.test(before_at);

			        // Check if this contains URL-encoded content that could be malicious
			        // For example: javascript:%61%6c%65%72%74%28%31%29@example.com
			        // The encoded part decodes to: alert(1)
			        var has_encoded_content = /%[0-9a-fA-F]{2}/.test(before_at);
			        if (is_valid_auth && !has_encoded_content) {
			          // This looks like authentication (e.g., user:password@host), not a protocol
			          if (options.require_protocol) {
			            return false;
			          }

			          // Don't consume the colon; let the auth parsing handle it later
			        } else {
			          // This looks like a malicious protocol (e.g., javascript:alert();@host)
			          // or URL-encoded protocol handler (e.g., javascript:%61%6c%65%72%74%28%31%29@host)
			          url = cleanUpProtocol(potential_protocol);
			          if (url === false) {
			            return false;
			          }
			        }
			      } else {
			        // No @ symbol found. Check if this could be a port number instead of a protocol.
			        // If what's after the colon is numeric (or starts with a digit and contains only
			        // valid port characters until a path separator), it's likely hostname:port, not a protocol.
			        var looks_like_port = /^[0-9]/.test(after_colon);
			        if (looks_like_port) {
			          // This looks like hostname:port, not a protocol
			          if (options.require_protocol) {
			            return false;
			          }
			          // Don't consume anything; let it be parsed as hostname:port
			        } else {
			          // This is definitely a protocol
			          url = cleanUpProtocol(potential_protocol);
			          if (url === false) {
			            return false;
			          }
			        }
			      }
			    } else {
			      // Starts with '//', this is definitely a protocol like http://
			      url = cleanUpProtocol(potential_protocol);
			      if (url === false) {
			        return false;
			      }
			    }
			  } else if (options.require_protocol) {
			    return false;
			  }

			  // Handle leading '//' only as protocol-relative when there was NO explicit protocol.
			  // If there was an explicit protocol, '//' is the normal separator
			  // and should be stripped unconditionally.
			  if (url.slice(0, 2) === '//') {
			    if (!had_explicit_protocol && !options.allow_protocol_relative_urls) {
			      return false;
			    }
			    url = url.slice(2);
			  }
			  if (url === '') {
			    return false;
			  }
			  split = url.split('/');
			  url = split.shift();
			  if (url === '' && !options.require_host) {
			    return true;
			  }
			  split = url.split('@');
			  if (split.length > 1) {
			    if (options.disallow_auth) {
			      return false;
			    }
			    if (split[0] === '') {
			      return false;
			    }
			    auth = split.shift();
			    if (auth.indexOf(':') >= 0 && auth.split(':').length > 2) {
			      return false;
			    }
			    var _auth$split = auth.split(':'),
			      _auth$split2 = _slicedToArray(_auth$split, 2),
			      user = _auth$split2[0],
			      password = _auth$split2[1];
			    if (user === '' && password === '') {
			      return false;
			    }
			  }
			  hostname = split.join('@');
			  port_str = null;
			  ipv6 = null;
			  var ipv6_match = hostname.match(wrapped_ipv6);
			  if (ipv6_match) {
			    host = '';
			    ipv6 = ipv6_match[1];
			    port_str = ipv6_match[2] || null;
			  } else {
			    split = hostname.split(':');
			    host = split.shift();
			    if (split.length) {
			      port_str = split.join(':');
			    }
			  }
			  if (port_str !== null && port_str.length > 0) {
			    port = parseInt(port_str, 10);
			    if (!/^[0-9]+$/.test(port_str) || port <= 0 || port > 65535) {
			      return false;
			    }
			  } else if (options.require_port) {
			    return false;
			  }
			  if (options.host_whitelist) {
			    return (0, _checkHost.default)(host, options.host_whitelist);
			  }
			  if (host === '' && !options.require_host) {
			    return true;
			  }
			  if (!(0, _isIP.default)(host) && !(0, _isFQDN.default)(host, options) && (!ipv6 || !(0, _isIP.default)(ipv6, 6))) {
			    return false;
			  }
			  host = host || ipv6;
			  if (options.host_blacklist && (0, _checkHost.default)(host, options.host_blacklist)) {
			    return false;
			  }
			  return true;
			}
			module.exports = exports$1.default;
			module.exports.default = exports$1.default; 
		} (isURL$1, isURL$1.exports));
		return isURL$1.exports;
	}

	var isURLExports = /*@__PURE__*/ requireIsURL();
	var isURL = /*@__PURE__*/getDefaultExportFromCjs(isURLExports);

	var isSlug$1 = {exports: {}};

	var hasRequiredIsSlug;

	function requireIsSlug () {
		if (hasRequiredIsSlug) return isSlug$1.exports;
		hasRequiredIsSlug = 1;
		(function (module, exports$1) {

			Object.defineProperty(exports$1, "__esModule", {
			  value: true
			});
			exports$1.default = isSlug;
			var _assertString = _interopRequireDefault(/*@__PURE__*/ requireAssertString());
			function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
			var charsetRegex = /^[a-z0-9](?!.*[-_]{2,})(?:[a-z0-9_-]*[a-z0-9])?$/;
			function isSlug(str) {
			  (0, _assertString.default)(str);
			  return charsetRegex.test(str);
			}
			module.exports = exports$1.default;
			module.exports.default = exports$1.default; 
		} (isSlug$1, isSlug$1.exports));
		return isSlug$1.exports;
	}

	var isSlugExports = /*@__PURE__*/ requireIsSlug();
	var isSlug = /*@__PURE__*/getDefaultExportFromCjs(isSlugExports);

	var isIBAN$1 = {};

	var includesArray = {exports: {}};

	var hasRequiredIncludesArray;

	function requireIncludesArray () {
		if (hasRequiredIncludesArray) return includesArray.exports;
		hasRequiredIncludesArray = 1;
		(function (module, exports$1) {

			Object.defineProperty(exports$1, "__esModule", {
			  value: true
			});
			exports$1.default = void 0;
			var includes = function includes(arr, val) {
			  return arr.some(function (arrVal) {
			    return val === arrVal;
			  });
			};
			exports$1.default = includes;
			module.exports = exports$1.default;
			module.exports.default = exports$1.default; 
		} (includesArray, includesArray.exports));
		return includesArray.exports;
	}

	var hasRequiredIsIBAN;

	function requireIsIBAN () {
		if (hasRequiredIsIBAN) return isIBAN$1;
		hasRequiredIsIBAN = 1;

		Object.defineProperty(isIBAN$1, "__esModule", {
		  value: true
		});
		isIBAN$1.default = isIBAN;
		isIBAN$1.locales = void 0;
		var _assertString = _interopRequireDefault(/*@__PURE__*/ requireAssertString());
		var _includesArray = _interopRequireDefault(/*@__PURE__*/ requireIncludesArray());
		function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
		/**
		 * List of country codes with
		 * corresponding IBAN regular expression
		 * Reference: https://en.wikipedia.org/wiki/International_Bank_Account_Number
		 */
		var ibanRegexThroughCountryCode = {
		  AD: /^(AD[0-9]{2})\d{8}[A-Z0-9]{12}$/,
		  AE: /^(AE[0-9]{2})\d{3}\d{16}$/,
		  AL: /^(AL[0-9]{2})\d{8}[A-Z0-9]{16}$/,
		  AT: /^(AT[0-9]{2})\d{16}$/,
		  AZ: /^(AZ[0-9]{2})[A-Z0-9]{4}\d{20}$/,
		  BA: /^(BA[0-9]{2})\d{16}$/,
		  BE: /^(BE[0-9]{2})\d{12}$/,
		  BG: /^(BG[0-9]{2})[A-Z]{4}\d{6}[A-Z0-9]{8}$/,
		  BH: /^(BH[0-9]{2})[A-Z]{4}[A-Z0-9]{14}$/,
		  BR: /^(BR[0-9]{2})\d{23}[A-Z]{1}[A-Z0-9]{1}$/,
		  BY: /^(BY[0-9]{2})[A-Z0-9]{4}\d{20}$/,
		  CH: /^(CH[0-9]{2})\d{5}[A-Z0-9]{12}$/,
		  CR: /^(CR[0-9]{2})\d{18}$/,
		  CY: /^(CY[0-9]{2})\d{8}[A-Z0-9]{16}$/,
		  CZ: /^(CZ[0-9]{2})\d{20}$/,
		  DE: /^(DE[0-9]{2})\d{18}$/,
		  DK: /^(DK[0-9]{2})\d{14}$/,
		  DO: /^(DO[0-9]{2})[A-Z]{4}\d{20}$/,
		  DZ: /^(DZ\d{24})$/,
		  EE: /^(EE[0-9]{2})\d{16}$/,
		  EG: /^(EG[0-9]{2})\d{25}$/,
		  ES: /^(ES[0-9]{2})\d{20}$/,
		  FI: /^(FI[0-9]{2})\d{14}$/,
		  FO: /^(FO[0-9]{2})\d{14}$/,
		  FR: /^(FR[0-9]{2})\d{10}[A-Z0-9]{11}\d{2}$/,
		  GB: /^(GB[0-9]{2})[A-Z]{4}\d{14}$/,
		  GE: /^(GE[0-9]{2})[A-Z0-9]{2}\d{16}$/,
		  GI: /^(GI[0-9]{2})[A-Z]{4}[A-Z0-9]{15}$/,
		  GL: /^(GL[0-9]{2})\d{14}$/,
		  GR: /^(GR[0-9]{2})\d{7}[A-Z0-9]{16}$/,
		  GT: /^(GT[0-9]{2})[A-Z0-9]{4}[A-Z0-9]{20}$/,
		  HR: /^(HR[0-9]{2})\d{17}$/,
		  HU: /^(HU[0-9]{2})\d{24}$/,
		  IE: /^(IE[0-9]{2})[A-Z]{4}\d{14}$/,
		  IL: /^(IL[0-9]{2})\d{19}$/,
		  IQ: /^(IQ[0-9]{2})[A-Z]{4}\d{15}$/,
		  IR: /^(IR[0-9]{2})\d{22}$/,
		  IS: /^(IS[0-9]{2})\d{22}$/,
		  IT: /^(IT[0-9]{2})[A-Z]{1}\d{10}[A-Z0-9]{12}$/,
		  JO: /^(JO[0-9]{2})[A-Z]{4}\d{22}$/,
		  KW: /^(KW[0-9]{2})[A-Z]{4}[A-Z0-9]{22}$/,
		  KZ: /^(KZ[0-9]{2})\d{3}[A-Z0-9]{13}$/,
		  LB: /^(LB[0-9]{2})\d{4}[A-Z0-9]{20}$/,
		  LC: /^(LC[0-9]{2})[A-Z]{4}[A-Z0-9]{24}$/,
		  LI: /^(LI[0-9]{2})\d{5}[A-Z0-9]{12}$/,
		  LT: /^(LT[0-9]{2})\d{16}$/,
		  LU: /^(LU[0-9]{2})\d{3}[A-Z0-9]{13}$/,
		  LV: /^(LV[0-9]{2})[A-Z]{4}[A-Z0-9]{13}$/,
		  MA: /^(MA[0-9]{26})$/,
		  MC: /^(MC[0-9]{2})\d{10}[A-Z0-9]{11}\d{2}$/,
		  MD: /^(MD[0-9]{2})[A-Z0-9]{20}$/,
		  ME: /^(ME[0-9]{2})\d{18}$/,
		  MK: /^(MK[0-9]{2})\d{3}[A-Z0-9]{10}\d{2}$/,
		  MR: /^(MR[0-9]{2})\d{23}$/,
		  MT: /^(MT[0-9]{2})[A-Z]{4}\d{5}[A-Z0-9]{18}$/,
		  MU: /^(MU[0-9]{2})[A-Z]{4}\d{19}[A-Z]{3}$/,
		  MZ: /^(MZ[0-9]{2})\d{21}$/,
		  NL: /^(NL[0-9]{2})[A-Z]{4}\d{10}$/,
		  NO: /^(NO[0-9]{2})\d{11}$/,
		  PK: /^(PK[0-9]{2})[A-Z0-9]{4}\d{16}$/,
		  PL: /^(PL[0-9]{2})\d{24}$/,
		  PS: /^(PS[0-9]{2})[A-Z]{4}[A-Z0-9]{21}$/,
		  PT: /^(PT[0-9]{2})\d{21}$/,
		  QA: /^(QA[0-9]{2})[A-Z]{4}[A-Z0-9]{21}$/,
		  RO: /^(RO[0-9]{2})[A-Z]{4}[A-Z0-9]{16}$/,
		  RS: /^(RS[0-9]{2})\d{18}$/,
		  SA: /^(SA[0-9]{2})\d{2}[A-Z0-9]{18}$/,
		  SC: /^(SC[0-9]{2})[A-Z]{4}\d{20}[A-Z]{3}$/,
		  SE: /^(SE[0-9]{2})\d{20}$/,
		  SI: /^(SI[0-9]{2})\d{15}$/,
		  SK: /^(SK[0-9]{2})\d{20}$/,
		  SM: /^(SM[0-9]{2})[A-Z]{1}\d{10}[A-Z0-9]{12}$/,
		  SV: /^(SV[0-9]{2})[A-Z0-9]{4}\d{20}$/,
		  TL: /^(TL[0-9]{2})\d{19}$/,
		  TN: /^(TN[0-9]{2})\d{20}$/,
		  TR: /^(TR[0-9]{2})\d{5}[A-Z0-9]{17}$/,
		  UA: /^(UA[0-9]{2})\d{6}[A-Z0-9]{19}$/,
		  VA: /^(VA[0-9]{2})\d{18}$/,
		  VG: /^(VG[0-9]{2})[A-Z]{4}\d{16}$/,
		  XK: /^(XK[0-9]{2})\d{16}$/
		};

		/**
		 * Check if the country codes passed are valid using the
		 * ibanRegexThroughCountryCode as a reference
		 *
		 * @param {array} countryCodeArray
		 * @return {boolean}
		 */

		function hasOnlyValidCountryCodes(countryCodeArray) {
		  var countryCodeArrayFilteredWithObjectIbanCode = countryCodeArray.filter(function (countryCode) {
		    return !(countryCode in ibanRegexThroughCountryCode);
		  });
		  return countryCodeArrayFilteredWithObjectIbanCode.length === 0;
		}

		/**
		 * Check whether string has correct universal IBAN format
		 * The IBAN consists of up to 34 alphanumeric characters, as follows:
		 * Country Code using ISO 3166-1 alpha-2, two letters
		 * check digits, two digits and
		 * Basic Bank Account Number (BBAN), up to 30 alphanumeric characters.
		 * NOTE: Permitted IBAN characters are: digits [0-9] and the 26 latin alphabetic [A-Z]
		 *
		 * @param {string} str - string under validation
		 * @param {object} options - object to pass the countries to be either whitelisted or blacklisted
		 * @return {boolean}
		 */
		function hasValidIbanFormat(str, options) {
		  // Strip white spaces and hyphens
		  var strippedStr = str.replace(/[\s\-]+/gi, '').toUpperCase();
		  var isoCountryCode = strippedStr.slice(0, 2).toUpperCase();
		  var isoCountryCodeInIbanRegexCodeObject = isoCountryCode in ibanRegexThroughCountryCode;
		  if (options.whitelist) {
		    if (!hasOnlyValidCountryCodes(options.whitelist)) {
		      return false;
		    }
		    var isoCountryCodeInWhiteList = (0, _includesArray.default)(options.whitelist, isoCountryCode);
		    if (!isoCountryCodeInWhiteList) {
		      return false;
		    }
		  }
		  if (options.blacklist) {
		    var isoCountryCodeInBlackList = (0, _includesArray.default)(options.blacklist, isoCountryCode);
		    if (isoCountryCodeInBlackList) {
		      return false;
		    }
		  }
		  return isoCountryCodeInIbanRegexCodeObject && ibanRegexThroughCountryCode[isoCountryCode].test(strippedStr);
		}

		/**
		   * Check whether string has valid IBAN Checksum
		   * by performing basic mod-97 operation and
		   * the remainder should equal 1
		   * -- Start by rearranging the IBAN by moving the four initial characters to the end of the string
		   * -- Replace each letter in the string with two digits, A -> 10, B = 11, Z = 35
		   * -- Interpret the string as a decimal integer and
		   * -- compute the remainder on division by 97 (mod 97)
		   * Reference: https://en.wikipedia.org/wiki/International_Bank_Account_Number
		   *
		   * @param {string} str
		   * @return {boolean}
		   */
		function hasValidIbanChecksum(str) {
		  var strippedStr = str.replace(/[^A-Z0-9]+/gi, '').toUpperCase(); // Keep only digits and A-Z latin alphabetic
		  var rearranged = strippedStr.slice(4) + strippedStr.slice(0, 4);
		  var alphaCapsReplacedWithDigits = rearranged.replace(/[A-Z]/g, function (char) {
		    return char.charCodeAt(0) - 55;
		  });
		  var remainder = alphaCapsReplacedWithDigits.match(/\d{1,7}/g).reduce(function (acc, value) {
		    return Number(acc + value) % 97;
		  }, '');
		  return remainder === 1;
		}
		function isIBAN(str) {
		  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
		  (0, _assertString.default)(str);
		  return hasValidIbanFormat(str, options) && hasValidIbanChecksum(str);
		}
		isIBAN$1.locales = Object.keys(ibanRegexThroughCountryCode);
		return isIBAN$1;
	}

	var isIBANExports = /*@__PURE__*/ requireIsIBAN();
	var isIBAN = /*@__PURE__*/getDefaultExportFromCjs(isIBANExports);

	var isUUID$1 = {exports: {}};

	var hasRequiredIsUUID;

	function requireIsUUID () {
		if (hasRequiredIsUUID) return isUUID$1.exports;
		hasRequiredIsUUID = 1;
		(function (module, exports$1) {

			Object.defineProperty(exports$1, "__esModule", {
			  value: true
			});
			exports$1.default = isUUID;
			var _assertString = _interopRequireDefault(/*@__PURE__*/ requireAssertString());
			function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
			var uuid = {
			  1: /^[0-9A-F]{8}-[0-9A-F]{4}-1[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
			  2: /^[0-9A-F]{8}-[0-9A-F]{4}-2[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
			  3: /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
			  4: /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
			  5: /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
			  6: /^[0-9A-F]{8}-[0-9A-F]{4}-6[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
			  7: /^[0-9A-F]{8}-[0-9A-F]{4}-7[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
			  8: /^[0-9A-F]{8}-[0-9A-F]{4}-8[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
			  nil: /^00000000-0000-0000-0000-000000000000$/i,
			  max: /^ffffffff-ffff-ffff-ffff-ffffffffffff$/i,
			  loose: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
			  // From https://github.com/uuidjs/uuid/blob/main/src/regex.js
			  all: /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i
			};
			function isUUID(str, version) {
			  (0, _assertString.default)(str);
			  if (version === undefined || version === null) {
			    version = 'all';
			  }
			  return version in uuid ? uuid[version].test(str) : false;
			}
			module.exports = exports$1.default;
			module.exports.default = exports$1.default; 
		} (isUUID$1, isUUID$1.exports));
		return isUUID$1.exports;
	}

	var isUUIDExports = /*@__PURE__*/ requireIsUUID();
	var isUUID = /*@__PURE__*/getDefaultExportFromCjs(isUUIDExports);

	var isAscii$1 = {exports: {}};

	var hasRequiredIsAscii;

	function requireIsAscii () {
		if (hasRequiredIsAscii) return isAscii$1.exports;
		hasRequiredIsAscii = 1;
		(function (module, exports$1) {

			Object.defineProperty(exports$1, "__esModule", {
			  value: true
			});
			exports$1.default = isAscii;
			var _assertString = _interopRequireDefault(/*@__PURE__*/ requireAssertString());
			function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
			/* eslint-disable no-control-regex */
			var ascii = /^[\x00-\x7F]+$/;
			/* eslint-enable no-control-regex */

			function isAscii(str) {
			  (0, _assertString.default)(str);
			  return ascii.test(str);
			}
			module.exports = exports$1.default;
			module.exports.default = exports$1.default; 
		} (isAscii$1, isAscii$1.exports));
		return isAscii$1.exports;
	}

	var isAsciiExports = /*@__PURE__*/ requireIsAscii();
	var isAscii = /*@__PURE__*/getDefaultExportFromCjs(isAsciiExports);

	var isEmail$1 = {exports: {}};

	var isByteLength = {exports: {}};

	var hasRequiredIsByteLength;

	function requireIsByteLength () {
		if (hasRequiredIsByteLength) return isByteLength.exports;
		hasRequiredIsByteLength = 1;
		(function (module, exports$1) {

			Object.defineProperty(exports$1, "__esModule", {
			  value: true
			});
			exports$1.default = isByteLength;
			var _assertString = _interopRequireDefault(/*@__PURE__*/ requireAssertString());
			function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
			function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
			/* eslint-disable prefer-rest-params */
			function isByteLength(str, options) {
			  (0, _assertString.default)(str);
			  var min;
			  var max;
			  if (_typeof(options) === 'object') {
			    min = options.min || 0;
			    max = options.max;
			  } else {
			    // backwards compatibility: isByteLength(str, min [, max])
			    min = arguments[1];
			    max = arguments[2];
			  }
			  var len = encodeURI(str).split(/%..|./).length - 1;
			  return len >= min && (typeof max === 'undefined' || len <= max);
			}
			module.exports = exports$1.default;
			module.exports.default = exports$1.default; 
		} (isByteLength, isByteLength.exports));
		return isByteLength.exports;
	}

	var hasRequiredIsEmail;

	function requireIsEmail () {
		if (hasRequiredIsEmail) return isEmail$1.exports;
		hasRequiredIsEmail = 1;
		(function (module, exports$1) {

			Object.defineProperty(exports$1, "__esModule", {
			  value: true
			});
			exports$1.default = isEmail;
			var _assertString = _interopRequireDefault(/*@__PURE__*/ requireAssertString());
			var _checkHost = _interopRequireDefault(/*@__PURE__*/ requireCheckHost());
			var _isByteLength = _interopRequireDefault(/*@__PURE__*/ requireIsByteLength());
			var _isFQDN = _interopRequireDefault(/*@__PURE__*/ requireIsFQDN());
			var _isIP = _interopRequireDefault(/*@__PURE__*/ requireIsIP());
			var _merge = _interopRequireDefault(/*@__PURE__*/ requireMerge());
			function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
			var default_email_options = {
			  allow_display_name: false,
			  allow_underscores: false,
			  require_display_name: false,
			  allow_utf8_local_part: true,
			  require_tld: true,
			  blacklisted_chars: '',
			  ignore_max_length: false,
			  host_blacklist: [],
			  host_whitelist: []
			};

			/* eslint-disable max-len */
			/* eslint-disable no-control-regex */
			var splitNameAddress = /^([^\x00-\x1F\x7F-\x9F\cX]+)</i;
			var emailUserPart = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i;
			var gmailUserPart = /^[a-z\d]+$/;
			var quotedEmailUser = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i;
			var emailUserUtf8Part = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A1-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i;
			var quotedEmailUserUtf8 = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;
			var defaultMaxEmailLength = 254;
			/* eslint-enable max-len */
			/* eslint-enable no-control-regex */

			/**
			 * Validate display name according to the RFC2822: https://tools.ietf.org/html/rfc2822#appendix-A.1.2
			 * @param {String} display_name
			 */
			function validateDisplayName(display_name) {
			  var display_name_without_quotes = display_name.replace(/^"(.+)"$/, '$1');
			  // display name with only spaces is not valid
			  if (!display_name_without_quotes.trim()) {
			    return false;
			  }

			  // check whether display name contains illegal character
			  var contains_illegal = /[\.";<>]/.test(display_name_without_quotes);
			  if (contains_illegal) {
			    // if contains illegal characters,
			    // must to be enclosed in double-quotes, otherwise it's not a valid display name
			    if (display_name_without_quotes === display_name) {
			      return false;
			    }

			    // the quotes in display name must start with character symbol \
			    var all_start_with_back_slash = display_name_without_quotes.split('"').length === display_name_without_quotes.split('\\"').length;
			    if (!all_start_with_back_slash) {
			      return false;
			    }
			  }
			  return true;
			}
			function isEmail(str, options) {
			  (0, _assertString.default)(str);
			  options = (0, _merge.default)(options, default_email_options);
			  if (options.require_display_name || options.allow_display_name) {
			    var display_email = str.match(splitNameAddress);
			    if (display_email) {
			      var display_name = display_email[1];

			      // Remove display name and angle brackets to get email address
			      // Can be done in the regex but will introduce a ReDOS (See  #1597 for more info)
			      str = str.replace(display_name, '').replace(/(^<|>$)/g, '');

			      // sometimes need to trim the last space to get the display name
			      // because there may be a space between display name and email address
			      // eg. myname <address@gmail.com>
			      // the display name is `myname` instead of `myname `, so need to trim the last space
			      if (display_name.endsWith(' ')) {
			        display_name = display_name.slice(0, -1);
			      }
			      if (!validateDisplayName(display_name)) {
			        return false;
			      }
			    } else if (options.require_display_name) {
			      return false;
			    }
			  }
			  if (!options.ignore_max_length && str.length > defaultMaxEmailLength) {
			    return false;
			  }
			  var parts = str.split('@');
			  var domain = parts.pop();
			  var lower_domain = domain.toLowerCase();
			  if (options.host_blacklist.length > 0 && (0, _checkHost.default)(lower_domain, options.host_blacklist)) {
			    return false;
			  }
			  if (options.host_whitelist.length > 0 && !(0, _checkHost.default)(lower_domain, options.host_whitelist)) {
			    return false;
			  }
			  var user = parts.join('@');
			  if (options.domain_specific_validation && (lower_domain === 'gmail.com' || lower_domain === 'googlemail.com')) {
			    /*
			    Previously we removed dots for gmail addresses before validating.
			    This was removed because it allows `multiple..dots@gmail.com`
			    to be reported as valid, but it is not.
			    Gmail only normalizes single dots, removing them from here is pointless,
			    should be done in normalizeEmail
			    */
			    user = user.toLowerCase();

			    // Removing sub-address from username before gmail validation
			    var username = user.split('+')[0];

			    // Dots are not included in gmail length restriction
			    if (!(0, _isByteLength.default)(username.replace(/\./g, ''), {
			      min: 6,
			      max: 30
			    })) {
			      return false;
			    }
			    var _user_parts = username.split('.');
			    for (var i = 0; i < _user_parts.length; i++) {
			      if (!gmailUserPart.test(_user_parts[i])) {
			        return false;
			      }
			    }
			  }
			  if (options.ignore_max_length === false && (!(0, _isByteLength.default)(user, {
			    max: 64
			  }) || !(0, _isByteLength.default)(domain, {
			    max: 254
			  }))) {
			    return false;
			  }
			  if (!(0, _isFQDN.default)(domain, {
			    require_tld: options.require_tld,
			    ignore_max_length: options.ignore_max_length,
			    allow_underscores: options.allow_underscores
			  })) {
			    if (!options.allow_ip_domain) {
			      return false;
			    }
			    if (!(0, _isIP.default)(domain)) {
			      if (!domain.startsWith('[') || !domain.endsWith(']')) {
			        return false;
			      }
			      var noBracketdomain = domain.slice(1, -1);
			      if (noBracketdomain.length === 0 || !(0, _isIP.default)(noBracketdomain)) {
			        return false;
			      }
			    }
			  }
			  if (options.blacklisted_chars) {
			    if (user.search(new RegExp("[".concat(options.blacklisted_chars, "]+"), 'g')) !== -1) return false;
			  }
			  if (user[0] === '"' && user[user.length - 1] === '"') {
			    user = user.slice(1, user.length - 1);
			    return options.allow_utf8_local_part ? quotedEmailUserUtf8.test(user) : quotedEmailUser.test(user);
			  }
			  var pattern = options.allow_utf8_local_part ? emailUserUtf8Part : emailUserPart;
			  var user_parts = user.split('.');
			  for (var _i = 0; _i < user_parts.length; _i++) {
			    if (!pattern.test(user_parts[_i])) {
			      return false;
			    }
			  }
			  return true;
			}
			module.exports = exports$1.default;
			module.exports.default = exports$1.default; 
		} (isEmail$1, isEmail$1.exports));
		return isEmail$1.exports;
	}

	var isEmailExports = /*@__PURE__*/ requireIsEmail();
	var isEmail = /*@__PURE__*/getDefaultExportFromCjs(isEmailExports);

	var isAlpha$1 = {};

	var alpha = {};

	var hasRequiredAlpha;

	function requireAlpha () {
		if (hasRequiredAlpha) return alpha;
		hasRequiredAlpha = 1;

		Object.defineProperty(alpha, "__esModule", {
		  value: true
		});
		alpha.farsiLocales = alpha.englishLocales = alpha.dotDecimal = alpha.decimal = alpha.commaDecimal = alpha.bengaliLocales = alpha.arabicLocales = alpha.alphanumeric = alpha.alpha = void 0;
		var alpha$1 = alpha.alpha = {
		  'en-US': /^[A-Z]+$/i,
		  'az-AZ': /^[A-VXYZÇƏĞİıÖŞÜ]+$/i,
		  'bg-BG': /^[А-Я]+$/i,
		  'cs-CZ': /^[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]+$/i,
		  'da-DK': /^[A-ZÆØÅ]+$/i,
		  'de-DE': /^[A-ZÄÖÜß]+$/i,
		  'el-GR': /^[Α-ώ]+$/i,
		  'es-ES': /^[A-ZÁÉÍÑÓÚÜ]+$/i,
		  'fa-IR': /^[ابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی]+$/i,
		  'fi-FI': /^[A-ZÅÄÖ]+$/i,
		  'fr-FR': /^[A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]+$/i,
		  'it-IT': /^[A-ZÀÉÈÌÎÓÒÙ]+$/i,
		  'ja-JP': /^[ぁ-んァ-ヶｦ-ﾟ一-龠ー・。、]+$/i,
		  'nb-NO': /^[A-ZÆØÅ]+$/i,
		  'nl-NL': /^[A-ZÁÉËÏÓÖÜÚ]+$/i,
		  'nn-NO': /^[A-ZÆØÅ]+$/i,
		  'hu-HU': /^[A-ZÁÉÍÓÖŐÚÜŰ]+$/i,
		  'pl-PL': /^[A-ZĄĆĘŚŁŃÓŻŹ]+$/i,
		  'pt-PT': /^[A-ZÃÁÀÂÄÇÉÊËÍÏÕÓÔÖÚÜ]+$/i,
		  'ru-RU': /^[А-ЯЁ]+$/i,
		  'kk-KZ': /^[А-ЯЁ\u04D8\u04B0\u0406\u04A2\u0492\u04AE\u049A\u04E8\u04BA]+$/i,
		  'sl-SI': /^[A-ZČĆĐŠŽ]+$/i,
		  'sk-SK': /^[A-ZÁČĎÉÍŇÓŠŤÚÝŽĹŔĽÄÔ]+$/i,
		  'sr-RS@latin': /^[A-ZČĆŽŠĐ]+$/i,
		  'sr-RS': /^[А-ЯЂЈЉЊЋЏ]+$/i,
		  'sv-SE': /^[A-ZÅÄÖ]+$/i,
		  'th-TH': /^[ก-๐\s]+$/i,
		  'tr-TR': /^[A-ZÇĞİıÖŞÜ]+$/i,
		  'uk-UA': /^[А-ЩЬЮЯЄIЇҐі]+$/i,
		  'vi-VN': /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴĐÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸ]+$/i,
		  'ko-KR': /^[ㄱ-ㅎㅏ-ㅣ가-힣]*$/,
		  'ku-IQ': /^[ئابپتجچحخدرڕزژسشعغفڤقکگلڵمنوۆھەیێيطؤثآإأكضصةظذ]+$/i,
		  ar: /^[ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]+$/,
		  he: /^[א-ת]+$/,
		  fa: /^['آاءأؤئبپتثجچحخدذرزژسشصضطظعغفقکگلمنوهةی']+$/i,
		  bn: /^['ঀঁংঃঅআইঈউঊঋঌএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহ়ঽািীুূৃৄেৈোৌ্ৎৗড়ঢ়য়ৠৡৢৣৰৱ৲৳৴৵৶৷৸৹৺৻']+$/,
		  eo: /^[ABCĈD-GĜHĤIJĴK-PRSŜTUŬVZ]+$/i,
		  'hi-IN': /^[\u0900-\u0961]+[\u0972-\u097F]*$/i,
		  'si-LK': /^[\u0D80-\u0DFF]+$/,
		  'ta-IN': /^[\u0B80-\u0BFF]+$/i,
		  'te-IN': /^[\u0C00-\u0C7F]+$/i,
		  'kn-IN': /^[\u0C80-\u0CFF]+$/i,
		  'ml-IN': /^[\u0D00-\u0D7F]+$/i,
		  'gu-IN': /^[\u0A80-\u0AFF]+$/i,
		  'pa-IN': /^[\u0A00-\u0A7F]+$/i,
		  'or-IN': /^[\u0B00-\u0B7F]+$/i
		};
		var alphanumeric = alpha.alphanumeric = {
		  'en-US': /^[0-9A-Z]+$/i,
		  'az-AZ': /^[0-9A-VXYZÇƏĞİıÖŞÜ]+$/i,
		  'bg-BG': /^[0-9А-Я]+$/i,
		  'cs-CZ': /^[0-9A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]+$/i,
		  'da-DK': /^[0-9A-ZÆØÅ]+$/i,
		  'de-DE': /^[0-9A-ZÄÖÜß]+$/i,
		  'el-GR': /^[0-9Α-ω]+$/i,
		  'es-ES': /^[0-9A-ZÁÉÍÑÓÚÜ]+$/i,
		  'fi-FI': /^[0-9A-ZÅÄÖ]+$/i,
		  'fr-FR': /^[0-9A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]+$/i,
		  'it-IT': /^[0-9A-ZÀÉÈÌÎÓÒÙ]+$/i,
		  'ja-JP': /^[0-9０-９ぁ-んァ-ヶｦ-ﾟ一-龠ー・。、]+$/i,
		  'hu-HU': /^[0-9A-ZÁÉÍÓÖŐÚÜŰ]+$/i,
		  'nb-NO': /^[0-9A-ZÆØÅ]+$/i,
		  'nl-NL': /^[0-9A-ZÁÉËÏÓÖÜÚ]+$/i,
		  'nn-NO': /^[0-9A-ZÆØÅ]+$/i,
		  'pl-PL': /^[0-9A-ZĄĆĘŚŁŃÓŻŹ]+$/i,
		  'pt-PT': /^[0-9A-ZÃÁÀÂÄÇÉÊËÍÏÕÓÔÖÚÜ]+$/i,
		  'ru-RU': /^[0-9А-ЯЁ]+$/i,
		  'kk-KZ': /^[0-9А-ЯЁ\u04D8\u04B0\u0406\u04A2\u0492\u04AE\u049A\u04E8\u04BA]+$/i,
		  'sl-SI': /^[0-9A-ZČĆĐŠŽ]+$/i,
		  'sk-SK': /^[0-9A-ZÁČĎÉÍŇÓŠŤÚÝŽĹŔĽÄÔ]+$/i,
		  'sr-RS@latin': /^[0-9A-ZČĆŽŠĐ]+$/i,
		  'sr-RS': /^[0-9А-ЯЂЈЉЊЋЏ]+$/i,
		  'sv-SE': /^[0-9A-ZÅÄÖ]+$/i,
		  'th-TH': /^[ก-๙\s]+$/i,
		  'tr-TR': /^[0-9A-ZÇĞİıÖŞÜ]+$/i,
		  'uk-UA': /^[0-9А-ЩЬЮЯЄIЇҐі]+$/i,
		  'ko-KR': /^[0-9ㄱ-ㅎㅏ-ㅣ가-힣]*$/,
		  'ku-IQ': /^[٠١٢٣٤٥٦٧٨٩0-9ئابپتجچحخدرڕزژسشعغفڤقکگلڵمنوۆھەیێيطؤثآإأكضصةظذ]+$/i,
		  'vi-VN': /^[0-9A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴĐÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸ]+$/i,
		  ar: /^[٠١٢٣٤٥٦٧٨٩0-9ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]+$/,
		  he: /^[0-9א-ת]+$/,
		  fa: /^['0-9آاءأؤئبپتثجچحخدذرزژسشصضطظعغفقکگلمنوهةی۱۲۳۴۵۶۷۸۹۰']+$/i,
		  bn: /^['ঀঁংঃঅআইঈউঊঋঌএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহ়ঽািীুূৃৄেৈোৌ্ৎৗড়ঢ়য়ৠৡৢৣ০১২৩৪৫৬৭৮৯ৰৱ৲৳৴৵৶৷৸৹৺৻']+$/,
		  eo: /^[0-9ABCĈD-GĜHĤIJĴK-PRSŜTUŬVZ]+$/i,
		  'hi-IN': /^[\u0900-\u0963]+[\u0966-\u097F]*$/i,
		  'si-LK': /^[0-9\u0D80-\u0DFF]+$/,
		  'ta-IN': /^[0-9\u0B80-\u0BFF.]+$/i,
		  'te-IN': /^[0-9\u0C00-\u0C7F.]+$/i,
		  'kn-IN': /^[0-9\u0C80-\u0CFF.]+$/i,
		  'ml-IN': /^[0-9\u0D00-\u0D7F.]+$/i,
		  'gu-IN': /^[0-9\u0A80-\u0AFF.]+$/i,
		  'pa-IN': /^[0-9\u0A00-\u0A7F.]+$/i,
		  'or-IN': /^[0-9\u0B00-\u0B7F.]+$/i
		};
		var decimal = alpha.decimal = {
		  'en-US': '.',
		  ar: '٫'
		};
		var englishLocales = alpha.englishLocales = ['AU', 'GB', 'HK', 'IN', 'NZ', 'ZA', 'ZM'];
		for (var locale, i = 0; i < englishLocales.length; i++) {
		  locale = "en-".concat(englishLocales[i]);
		  alpha$1[locale] = alpha$1['en-US'];
		  alphanumeric[locale] = alphanumeric['en-US'];
		  decimal[locale] = decimal['en-US'];
		}

		// Source: http://www.localeplanet.com/java/
		var arabicLocales = alpha.arabicLocales = ['AE', 'BH', 'DZ', 'EG', 'IQ', 'JO', 'KW', 'LB', 'LY', 'MA', 'QM', 'QA', 'SA', 'SD', 'SY', 'TN', 'YE'];
		for (var _locale, _i = 0; _i < arabicLocales.length; _i++) {
		  _locale = "ar-".concat(arabicLocales[_i]);
		  alpha$1[_locale] = alpha$1.ar;
		  alphanumeric[_locale] = alphanumeric.ar;
		  decimal[_locale] = decimal.ar;
		}
		var farsiLocales = alpha.farsiLocales = ['IR', 'AF'];
		for (var _locale2, _i2 = 0; _i2 < farsiLocales.length; _i2++) {
		  _locale2 = "fa-".concat(farsiLocales[_i2]);
		  alphanumeric[_locale2] = alphanumeric.fa;
		  decimal[_locale2] = decimal.ar;
		}
		var bengaliLocales = alpha.bengaliLocales = ['BD', 'IN'];
		for (var _locale3, _i3 = 0; _i3 < bengaliLocales.length; _i3++) {
		  _locale3 = "bn-".concat(bengaliLocales[_i3]);
		  alpha$1[_locale3] = alpha$1.bn;
		  alphanumeric[_locale3] = alphanumeric.bn;
		  decimal[_locale3] = decimal['en-US'];
		}

		// Source: https://en.wikipedia.org/wiki/Decimal_mark
		var dotDecimal = alpha.dotDecimal = ['ar-EG', 'ar-LB', 'ar-LY'];
		var commaDecimal = alpha.commaDecimal = ['bg-BG', 'cs-CZ', 'da-DK', 'de-DE', 'el-GR', 'en-ZM', 'eo', 'es-ES', 'fr-CA', 'fr-FR', 'gu-IN', 'hi-IN', 'hu-HU', 'id-ID', 'it-IT', 'kk-KZ', 'kn-IN', 'ku-IQ', 'ml-IN', 'nb-NO', 'nl-NL', 'nn-NO', 'or-IN', 'pa-IN', 'pl-PL', 'pt-PT', 'ru-RU', 'si-LK', 'sl-SI', 'sr-RS', 'sr-RS@latin', 'sv-SE', 'ta-IN', 'te-IN', 'tr-TR', 'uk-UA', 'vi-VN'];
		for (var _i4 = 0; _i4 < dotDecimal.length; _i4++) {
		  decimal[dotDecimal[_i4]] = decimal['en-US'];
		}
		for (var _i5 = 0; _i5 < commaDecimal.length; _i5++) {
		  decimal[commaDecimal[_i5]] = ',';
		}
		alpha$1['fr-CA'] = alpha$1['fr-FR'];
		alphanumeric['fr-CA'] = alphanumeric['fr-FR'];
		alpha$1['pt-BR'] = alpha$1['pt-PT'];
		alphanumeric['pt-BR'] = alphanumeric['pt-PT'];
		decimal['pt-BR'] = decimal['pt-PT'];

		// see #862
		alpha$1['pl-Pl'] = alpha$1['pl-PL'];
		alphanumeric['pl-Pl'] = alphanumeric['pl-PL'];
		decimal['pl-Pl'] = decimal['pl-PL'];

		// see #1455
		alpha$1['fa-AF'] = alpha$1.fa;
		return alpha;
	}

	var hasRequiredIsAlpha;

	function requireIsAlpha () {
		if (hasRequiredIsAlpha) return isAlpha$1;
		hasRequiredIsAlpha = 1;

		Object.defineProperty(isAlpha$1, "__esModule", {
		  value: true
		});
		isAlpha$1.default = isAlpha;
		isAlpha$1.locales = void 0;
		var _assertString = _interopRequireDefault(/*@__PURE__*/ requireAssertString());
		var _alpha = /*@__PURE__*/ requireAlpha();
		function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
		function isAlpha(_str) {
		  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en-US';
		  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
		  (0, _assertString.default)(_str);
		  var str = _str;
		  var ignore = options.ignore;
		  if (ignore) {
		    if (ignore instanceof RegExp) {
		      str = str.replace(ignore, '');
		    } else if (typeof ignore === 'string') {
		      str = str.replace(new RegExp("[".concat(ignore.replace(/[-[\]{}()*+?.,\\^$|#\\s]/g, '\\$&'), "]"), 'g'), ''); // escape regex for ignore
		    } else {
		      throw new Error('ignore should be instance of a String or RegExp');
		    }
		  }
		  if (locale in _alpha.alpha) {
		    return _alpha.alpha[locale].test(str);
		  }
		  throw new Error("Invalid locale '".concat(locale, "'"));
		}
		isAlpha$1.locales = Object.keys(_alpha.alpha);
		return isAlpha$1;
	}

	var isAlphaExports = /*@__PURE__*/ requireIsAlpha();
	var isAlpha = /*@__PURE__*/getDefaultExportFromCjs(isAlphaExports);

	var isLatLong$1 = {exports: {}};

	var hasRequiredIsLatLong;

	function requireIsLatLong () {
		if (hasRequiredIsLatLong) return isLatLong$1.exports;
		hasRequiredIsLatLong = 1;
		(function (module, exports$1) {

			Object.defineProperty(exports$1, "__esModule", {
			  value: true
			});
			exports$1.default = isLatLong;
			var _assertString = _interopRequireDefault(/*@__PURE__*/ requireAssertString());
			var _merge = _interopRequireDefault(/*@__PURE__*/ requireMerge());
			var _includesString = _interopRequireDefault(/*@__PURE__*/ requireIncludesString());
			function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
			var lat = /^\(?[+-]?(90(\.0+)?|[1-8]?\d(\.\d+)?)$/;
			var long = /^\s?[+-]?(180(\.0+)?|1[0-7]\d(\.\d+)?|\d{1,2}(\.\d+)?)\)?$/;
			var latDMS = /^(([1-8]?\d)\D+([1-5]?\d|60)\D+([1-5]?\d|60)(\.\d+)?|90\D+0\D+0)\D+[NSns]?$/i;
			var longDMS = /^\s*([1-7]?\d{1,2}\D+([1-5]?\d|60)\D+([1-5]?\d|60)(\.\d+)?|180\D+0\D+0)\D+[EWew]?$/i;
			var defaultLatLongOptions = {
			  checkDMS: false
			};
			function isLatLong(str, options) {
			  (0, _assertString.default)(str);
			  options = (0, _merge.default)(options, defaultLatLongOptions);
			  if (!(0, _includesString.default)(str, ',')) return false;
			  var pair = str.split(',');
			  if (pair[0].startsWith('(') && !pair[1].endsWith(')') || pair[1].endsWith(')') && !pair[0].startsWith('(')) return false;
			  if (options.checkDMS) {
			    return latDMS.test(pair[0]) && longDMS.test(pair[1]);
			  }
			  return lat.test(pair[0]) && long.test(pair[1]);
			}
			module.exports = exports$1.default;
			module.exports.default = exports$1.default; 
		} (isLatLong$1, isLatLong$1.exports));
		return isLatLong$1.exports;
	}

	var isLatLongExports = /*@__PURE__*/ requireIsLatLong();
	var isLatLong = /*@__PURE__*/getDefaultExportFromCjs(isLatLongExports);

	var isDecimal$1 = {exports: {}};

	var hasRequiredIsDecimal;

	function requireIsDecimal () {
		if (hasRequiredIsDecimal) return isDecimal$1.exports;
		hasRequiredIsDecimal = 1;
		(function (module, exports$1) {

			Object.defineProperty(exports$1, "__esModule", {
			  value: true
			});
			exports$1.default = isDecimal;
			var _merge = _interopRequireDefault(/*@__PURE__*/ requireMerge());
			var _assertString = _interopRequireDefault(/*@__PURE__*/ requireAssertString());
			var _includesArray = _interopRequireDefault(/*@__PURE__*/ requireIncludesArray());
			var _alpha = /*@__PURE__*/ requireAlpha();
			function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
			function decimalRegExp(options) {
			  var regExp = new RegExp("^[-+]?([0-9]+)?(\\".concat(_alpha.decimal[options.locale], "[0-9]{").concat(options.decimal_digits, "})").concat(options.force_decimal ? '' : '?', "$"));
			  return regExp;
			}
			var default_decimal_options = {
			  force_decimal: false,
			  decimal_digits: '1,',
			  locale: 'en-US'
			};
			var blacklist = ['', '-', '+'];
			function isDecimal(str, options) {
			  (0, _assertString.default)(str);
			  options = (0, _merge.default)(options, default_decimal_options);
			  if (options.locale in _alpha.decimal) {
			    return !(0, _includesArray.default)(blacklist, str.replace(/ /g, '')) && decimalRegExp(options).test(str);
			  }
			  throw new Error("Invalid locale '".concat(options.locale, "'"));
			}
			module.exports = exports$1.default;
			module.exports.default = exports$1.default; 
		} (isDecimal$1, isDecimal$1.exports));
		return isDecimal$1.exports;
	}

	var isDecimalExports = /*@__PURE__*/ requireIsDecimal();
	var isDecimal = /*@__PURE__*/getDefaultExportFromCjs(isDecimalExports);

	var isHexColor$1 = {exports: {}};

	var hasRequiredIsHexColor;

	function requireIsHexColor () {
		if (hasRequiredIsHexColor) return isHexColor$1.exports;
		hasRequiredIsHexColor = 1;
		(function (module, exports$1) {

			Object.defineProperty(exports$1, "__esModule", {
			  value: true
			});
			exports$1.default = isHexColor;
			var _assertString = _interopRequireDefault(/*@__PURE__*/ requireAssertString());
			var _merge = _interopRequireDefault(/*@__PURE__*/ requireMerge());
			function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
			var hexcolor = /^#?([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i;
			var hexcolor_with_prefix = /^#([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i;
			var default_is_hexcolor_options = {
			  require_hashtag: false
			};
			function isHexColor(str, options) {
			  (0, _assertString.default)(str);
			  options = (0, _merge.default)(options, default_is_hexcolor_options);
			  var hexcolor_regex = options.require_hashtag ? hexcolor_with_prefix : hexcolor;
			  return hexcolor_regex.test(str);
			}
			module.exports = exports$1.default;
			module.exports.default = exports$1.default; 
		} (isHexColor$1, isHexColor$1.exports));
		return isHexColor$1.exports;
	}

	var isHexColorExports = /*@__PURE__*/ requireIsHexColor();
	var isHexColor = /*@__PURE__*/getDefaultExportFromCjs(isHexColorExports);

	var isCreditCard$1 = {exports: {}};

	var isLuhnNumber = {exports: {}};

	var hasRequiredIsLuhnNumber;

	function requireIsLuhnNumber () {
		if (hasRequiredIsLuhnNumber) return isLuhnNumber.exports;
		hasRequiredIsLuhnNumber = 1;
		(function (module, exports$1) {

			Object.defineProperty(exports$1, "__esModule", {
			  value: true
			});
			exports$1.default = isLuhnNumber;
			var _assertString = _interopRequireDefault(/*@__PURE__*/ requireAssertString());
			function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
			function isLuhnNumber(str) {
			  (0, _assertString.default)(str);
			  var sanitized = str.replace(/[- ]+/g, '');
			  var sum = 0;
			  var digit;
			  var tmpNum;
			  var shouldDouble;
			  for (var i = sanitized.length - 1; i >= 0; i--) {
			    digit = sanitized.substring(i, i + 1);
			    tmpNum = parseInt(digit, 10);
			    if (shouldDouble) {
			      tmpNum *= 2;
			      if (tmpNum >= 10) {
			        sum += tmpNum % 10 + 1;
			      } else {
			        sum += tmpNum;
			      }
			    } else {
			      sum += tmpNum;
			    }
			    shouldDouble = !shouldDouble;
			  }
			  return !!(sum % 10 === 0 ? sanitized : false);
			}
			module.exports = exports$1.default;
			module.exports.default = exports$1.default; 
		} (isLuhnNumber, isLuhnNumber.exports));
		return isLuhnNumber.exports;
	}

	var hasRequiredIsCreditCard;

	function requireIsCreditCard () {
		if (hasRequiredIsCreditCard) return isCreditCard$1.exports;
		hasRequiredIsCreditCard = 1;
		(function (module, exports$1) {

			Object.defineProperty(exports$1, "__esModule", {
			  value: true
			});
			exports$1.default = isCreditCard;
			var _assertString = _interopRequireDefault(/*@__PURE__*/ requireAssertString());
			var _isLuhnNumber = _interopRequireDefault(/*@__PURE__*/ requireIsLuhnNumber());
			function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
			var cards = {
			  amex: /^3[47][0-9]{13}$/,
			  dinersclub: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
			  discover: /^6(?:011|5[0-9][0-9])[0-9]{12,15}$/,
			  jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
			  mastercard: /^5[1-5][0-9]{2}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/,
			  // /^[25][1-7][0-9]{14}$/;
			  unionpay: /^(6[27][0-9]{14}|^(81[0-9]{14,17}))$/,
			  visa: /^(?:4[0-9]{12})(?:[0-9]{3,6})?$/
			};
			var allCards = function () {
			  var tmpCardsArray = [];
			  for (var cardProvider in cards) {
			    // istanbul ignore else
			    if (cards.hasOwnProperty(cardProvider)) {
			      tmpCardsArray.push(cards[cardProvider]);
			    }
			  }
			  return tmpCardsArray;
			}();
			function isCreditCard(card) {
			  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
			  (0, _assertString.default)(card);
			  var provider = options.provider;
			  var sanitized = card.replace(/[- ]+/g, '');
			  if (provider && provider.toLowerCase() in cards) {
			    // specific provider in the list
			    if (!cards[provider.toLowerCase()].test(sanitized)) {
			      return false;
			    }
			  } else if (provider && !(provider.toLowerCase() in cards)) {
			    /* specific provider not in the list */
			    throw new Error("".concat(provider, " is not a valid credit card provider."));
			  } else if (!allCards.some(function (cardProvider) {
			    return cardProvider.test(sanitized);
			  })) {
			    // no specific provider
			    return false;
			  }
			  return (0, _isLuhnNumber.default)(card);
			}
			module.exports = exports$1.default;
			module.exports.default = exports$1.default; 
		} (isCreditCard$1, isCreditCard$1.exports));
		return isCreditCard$1.exports;
	}

	var isCreditCardExports = /*@__PURE__*/ requireIsCreditCard();
	var isCreditCard = /*@__PURE__*/getDefaultExportFromCjs(isCreditCardExports);

	var isSameOrAfter$2 = {exports: {}};

	var isSameOrAfter$1 = isSameOrAfter$2.exports;

	var hasRequiredIsSameOrAfter;

	function requireIsSameOrAfter () {
		if (hasRequiredIsSameOrAfter) return isSameOrAfter$2.exports;
		hasRequiredIsSameOrAfter = 1;
		(function (module, exports$1) {
			!function(e,t){module.exports=t();}(isSameOrAfter$1,(function(){return function(e,t){t.prototype.isSameOrAfter=function(e,t){return this.isSame(e,t)||this.isAfter(e,t)};}})); 
		} (isSameOrAfter$2));
		return isSameOrAfter$2.exports;
	}

	var isSameOrAfterExports = requireIsSameOrAfter();
	var isSameOrAfter = /*@__PURE__*/getDefaultExportFromCjs(isSameOrAfterExports);

	var isSameOrBefore$2 = {exports: {}};

	var isSameOrBefore$1 = isSameOrBefore$2.exports;

	var hasRequiredIsSameOrBefore;

	function requireIsSameOrBefore () {
		if (hasRequiredIsSameOrBefore) return isSameOrBefore$2.exports;
		hasRequiredIsSameOrBefore = 1;
		(function (module, exports$1) {
			!function(e,i){module.exports=i();}(isSameOrBefore$1,(function(){return function(e,i){i.prototype.isSameOrBefore=function(e,i){return this.isSame(e,i)||this.isBefore(e,i)};}})); 
		} (isSameOrBefore$2));
		return isSameOrBefore$2.exports;
	}

	var isSameOrBeforeExports = requireIsSameOrBefore();
	var isSameOrBefore = /*@__PURE__*/getDefaultExportFromCjs(isSameOrBeforeExports);

	var isAlphanumeric$1 = {};

	var hasRequiredIsAlphanumeric;

	function requireIsAlphanumeric () {
		if (hasRequiredIsAlphanumeric) return isAlphanumeric$1;
		hasRequiredIsAlphanumeric = 1;

		Object.defineProperty(isAlphanumeric$1, "__esModule", {
		  value: true
		});
		isAlphanumeric$1.default = isAlphanumeric;
		isAlphanumeric$1.locales = void 0;
		var _assertString = _interopRequireDefault(/*@__PURE__*/ requireAssertString());
		var _alpha = /*@__PURE__*/ requireAlpha();
		function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
		function isAlphanumeric(_str) {
		  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en-US';
		  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
		  (0, _assertString.default)(_str);
		  var str = _str;
		  var ignore = options.ignore;
		  if (ignore) {
		    if (ignore instanceof RegExp) {
		      str = str.replace(ignore, '');
		    } else if (typeof ignore === 'string') {
		      str = str.replace(new RegExp("[".concat(ignore.replace(/[-[\]{}()*+?.,\\^$|#\\s]/g, '\\$&'), "]"), 'g'), ''); // escape regex for ignore
		    } else {
		      throw new Error('ignore should be instance of a String or RegExp');
		    }
		  }
		  if (locale in _alpha.alphanumeric) {
		    return _alpha.alphanumeric[locale].test(str);
		  }
		  throw new Error("Invalid locale '".concat(locale, "'"));
		}
		isAlphanumeric$1.locales = Object.keys(_alpha.alphanumeric);
		return isAlphanumeric$1;
	}

	var isAlphanumericExports = /*@__PURE__*/ requireIsAlphanumeric();
	var isAlphanumeric = /*@__PURE__*/getDefaultExportFromCjs(isAlphanumericExports);

	var isPassportNumber$1 = {};

	var hasRequiredIsPassportNumber;

	function requireIsPassportNumber () {
		if (hasRequiredIsPassportNumber) return isPassportNumber$1;
		hasRequiredIsPassportNumber = 1;

		Object.defineProperty(isPassportNumber$1, "__esModule", {
		  value: true
		});
		isPassportNumber$1.default = isPassportNumber;
		isPassportNumber$1.locales = void 0;
		var _assertString = _interopRequireDefault(/*@__PURE__*/ requireAssertString());
		function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
		/**
		 * Reference:
		 * https://en.wikipedia.org/ -- Wikipedia
		 * https://docs.microsoft.com/en-us/microsoft-365/compliance/eu-passport-number -- EU Passport Number
		 * https://countrycode.org/ -- Country Codes
		 */
		var passportRegexByCountryCode = {
		  AM: /^[A-Z]{2}\d{7}$/,
		  // ARMENIA
		  AR: /^[A-Z]{3}\d{6}$/,
		  // ARGENTINA
		  AT: /^[A-Z]\d{7}$/,
		  // AUSTRIA
		  AU: /^[A-Z]\d{7}$/,
		  // AUSTRALIA
		  AZ: /^[A-Z]{1}\d{8}$/,
		  // AZERBAIJAN
		  BE: /^[A-Z]{2}\d{6}$/,
		  // BELGIUM
		  BG: /^\d{9}$/,
		  // BULGARIA
		  BR: /^[A-Z]{2}\d{6}$/,
		  // BRAZIL
		  BY: /^[A-Z]{2}\d{7}$/,
		  // BELARUS
		  CA: /^[A-Z]{2}\d{6}$|^[A-Z]\d{6}[A-Z]{2}$/,
		  // CANADA
		  CH: /^[A-Z]\d{7}$/,
		  // SWITZERLAND
		  CN: /^G\d{8}$|^E(?![IO])[A-Z0-9]\d{7}$/,
		  // CHINA [G=Ordinary, E=Electronic] followed by 8-digits, or E followed by any UPPERCASE letter (except I and O) followed by 7 digits
		  CY: /^[A-Z](\d{6}|\d{8})$/,
		  // CYPRUS
		  CZ: /^\d{8}$/,
		  // CZECH REPUBLIC
		  DE: /^[CFGHJKLMNPRTVWXYZ0-9]{9}$/,
		  // GERMANY
		  DK: /^\d{9}$/,
		  // DENMARK
		  DZ: /^\d{9}$/,
		  // ALGERIA
		  EE: /^([A-Z]\d{7}|[A-Z]{2}\d{7})$/,
		  // ESTONIA (K followed by 7-digits), e-passports have 2 UPPERCASE followed by 7 digits
		  ES: /^[A-Z0-9]{2}([A-Z0-9]?)\d{6}$/,
		  // SPAIN
		  FI: /^[A-Z]{2}\d{7}$/,
		  // FINLAND
		  FR: /^\d{2}[A-Z]{2}\d{5}$/,
		  // FRANCE
		  GB: /^\d{9}$/,
		  // UNITED KINGDOM
		  GR: /^[A-Z]{2}\d{7}$/,
		  // GREECE
		  HR: /^\d{9}$/,
		  // CROATIA
		  HU: /^[A-Z]{2}(\d{6}|\d{7})$/,
		  // HUNGARY
		  IE: /^[A-Z0-9]{2}\d{7}$/,
		  // IRELAND
		  IN: /^[A-Z]{1}-?\d{7}$/,
		  // INDIA
		  ID: /^[A-C]\d{7}$/,
		  // INDONESIA
		  IR: /^[A-Z]\d{8}$/,
		  // IRAN
		  IS: /^(A)\d{7}$/,
		  // ICELAND
		  IT: /^[A-Z0-9]{2}\d{7}$/,
		  // ITALY
		  JM: /^[Aa]\d{7}$/,
		  // JAMAICA
		  JP: /^[A-Z]{2}\d{7}$/,
		  // JAPAN
		  KR: /^[MS]\d{8}$/,
		  // SOUTH KOREA, REPUBLIC OF KOREA, [S=PS Passports, M=PM Passports]
		  KZ: /^[a-zA-Z]\d{7}$/,
		  // KAZAKHSTAN
		  LI: /^[a-zA-Z]\d{5}$/,
		  // LIECHTENSTEIN
		  LT: /^[A-Z0-9]{8}$/,
		  // LITHUANIA
		  LU: /^[A-Z0-9]{8}$/,
		  // LUXEMBURG
		  LV: /^[A-Z0-9]{2}\d{7}$/,
		  // LATVIA
		  LY: /^[A-Z0-9]{8}$/,
		  // LIBYA
		  MT: /^\d{7}$/,
		  // MALTA
		  MZ: /^([A-Z]{2}\d{7})|(\d{2}[A-Z]{2}\d{5})$/,
		  // MOZAMBIQUE
		  MY: /^[AHK]\d{8}$/,
		  // MALAYSIA
		  MX: /^[A-Z]\d{8}$/,
		  // MEXICO
		  NL: /^[A-Z]{2}[A-Z0-9]{6}\d$/,
		  // NETHERLANDS
		  NZ: /^([Ll]([Aa]|[Dd]|[Ff]|[Hh])|[Ee]([Aa]|[Pp])|[Nn])\d{6}$/,
		  // NEW ZEALAND
		  PH: /^([A-Z](\d{6}|\d{7}[A-Z]))|([A-Z]{2}(\d{6}|\d{7}))$/,
		  // PHILIPPINES
		  PK: /^[A-Z]{2}\d{7}$/,
		  // PAKISTAN
		  PL: /^[A-Z]{2}\d{7}$/,
		  // POLAND
		  PT: /^[A-Z]\d{6}$/,
		  // PORTUGAL
		  RO: /^\d{8,9}$/,
		  // ROMANIA
		  RU: /^\d{9}$/,
		  // RUSSIAN FEDERATION
		  SE: /^\d{8}$/,
		  // SWEDEN
		  SL: /^(P)[A-Z]\d{7}$/,
		  // SLOVENIA
		  SK: /^[0-9A-Z]\d{7}$/,
		  // SLOVAKIA
		  TH: /^[A-Z]{1,2}\d{6,7}$/,
		  // THAILAND
		  TR: /^[A-Z]\d{8}$/,
		  // TURKEY
		  UA: /^[A-Z]{2}\d{6}$/,
		  // UKRAINE
		  US: /^\d{9}$|^[A-Z]\d{8}$/,
		  // UNITED STATES
		  ZA: /^[TAMD]\d{8}$/ // SOUTH AFRICA
		};
		isPassportNumber$1.locales = Object.keys(passportRegexByCountryCode);

		/**
		 * Check if str is a valid passport number
		 * relative to provided ISO Country Code.
		 *
		 * @param {string} str
		 * @param {string} countryCode
		 * @return {boolean}
		 */
		function isPassportNumber(str, countryCode) {
		  (0, _assertString.default)(str);
		  /** Remove All Whitespaces, Convert to UPPERCASE */
		  var normalizedStr = str.replace(/\s/g, '').toUpperCase();
		  return countryCode.toUpperCase() in passportRegexByCountryCode && passportRegexByCountryCode[countryCode].test(normalizedStr);
		}
		return isPassportNumber$1;
	}

	var isPassportNumberExports = /*@__PURE__*/ requireIsPassportNumber();
	var isPassportNumber = /*@__PURE__*/getDefaultExportFromCjs(isPassportNumberExports);

	var isVAT$1 = {};

	var algorithms = {};

	var hasRequiredAlgorithms;

	function requireAlgorithms () {
		if (hasRequiredAlgorithms) return algorithms;
		hasRequiredAlgorithms = 1;

		Object.defineProperty(algorithms, "__esModule", {
		  value: true
		});
		algorithms.iso7064Check = iso7064Check;
		algorithms.luhnCheck = luhnCheck;
		algorithms.reverseMultiplyAndSum = reverseMultiplyAndSum;
		algorithms.verhoeffCheck = verhoeffCheck;
		/**
		 * Algorithmic validation functions
		 * May be used as is or implemented in the workflow of other validators.
		 */

		/*
		 * ISO 7064 validation function
		 * Called with a string of numbers (incl. check digit)
		 * to validate according to ISO 7064 (MOD 11, 10).
		 */
		function iso7064Check(str) {
		  var checkvalue = 10;
		  for (var i = 0; i < str.length - 1; i++) {
		    checkvalue = (parseInt(str[i], 10) + checkvalue) % 10 === 0 ? 10 * 2 % 11 : (parseInt(str[i], 10) + checkvalue) % 10 * 2 % 11;
		  }
		  checkvalue = checkvalue === 1 ? 0 : 11 - checkvalue;
		  return checkvalue === parseInt(str[10], 10);
		}

		/*
		 * Luhn (mod 10) validation function
		 * Called with a string of numbers (incl. check digit)
		 * to validate according to the Luhn algorithm.
		 */
		function luhnCheck(str) {
		  var checksum = 0;
		  var second = false;
		  for (var i = str.length - 1; i >= 0; i--) {
		    if (second) {
		      var product = parseInt(str[i], 10) * 2;
		      if (product > 9) {
		        // sum digits of product and add to checksum
		        checksum += product.toString().split('').map(function (a) {
		          return parseInt(a, 10);
		        }).reduce(function (a, b) {
		          return a + b;
		        }, 0);
		      } else {
		        checksum += product;
		      }
		    } else {
		      checksum += parseInt(str[i], 10);
		    }
		    second = !second;
		  }
		  return checksum % 10 === 0;
		}

		/*
		 * Reverse TIN multiplication and summation helper function
		 * Called with an array of single-digit integers and a base multiplier
		 * to calculate the sum of the digits multiplied in reverse.
		 * Normally used in variations of MOD 11 algorithmic checks.
		 */
		function reverseMultiplyAndSum(digits, base) {
		  var total = 0;
		  for (var i = 0; i < digits.length; i++) {
		    total += digits[i] * (base - i);
		  }
		  return total;
		}

		/*
		 * Verhoeff validation helper function
		 * Called with a string of numbers
		 * to validate according to the Verhoeff algorithm.
		 */
		function verhoeffCheck(str) {
		  var d_table = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 0, 6, 7, 8, 9, 5], [2, 3, 4, 0, 1, 7, 8, 9, 5, 6], [3, 4, 0, 1, 2, 8, 9, 5, 6, 7], [4, 0, 1, 2, 3, 9, 5, 6, 7, 8], [5, 9, 8, 7, 6, 0, 4, 3, 2, 1], [6, 5, 9, 8, 7, 1, 0, 4, 3, 2], [7, 6, 5, 9, 8, 2, 1, 0, 4, 3], [8, 7, 6, 5, 9, 3, 2, 1, 0, 4], [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]];
		  var p_table = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 5, 7, 6, 2, 8, 3, 0, 9, 4], [5, 8, 0, 3, 7, 9, 6, 1, 4, 2], [8, 9, 1, 6, 0, 4, 3, 5, 2, 7], [9, 4, 5, 3, 1, 2, 6, 8, 7, 0], [4, 2, 8, 6, 5, 7, 3, 9, 0, 1], [2, 7, 9, 3, 8, 0, 6, 4, 1, 5], [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]];

		  // Copy (to prevent replacement) and reverse
		  var str_copy = str.split('').reverse().join('');
		  var checksum = 0;
		  for (var i = 0; i < str_copy.length; i++) {
		    checksum = d_table[checksum][p_table[i % 8][parseInt(str_copy[i], 10)]];
		  }
		  return checksum === 0;
		}
		return algorithms;
	}

	var hasRequiredIsVAT;

	function requireIsVAT () {
		if (hasRequiredIsVAT) return isVAT$1;
		hasRequiredIsVAT = 1;

		function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
		Object.defineProperty(isVAT$1, "__esModule", {
		  value: true
		});
		isVAT$1.default = isVAT;
		isVAT$1.vatMatchers = void 0;
		var _assertString = _interopRequireDefault(/*@__PURE__*/ requireAssertString());
		var algorithms = _interopRequireWildcard(/*@__PURE__*/ requireAlgorithms());
		function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
		function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
		var AU = function AU(str) {
		  var match = str.match(/^(AU)?(\d{11})$/);
		  if (!match) {
		    return false;
		  }
		  // @see {@link https://abr.business.gov.au/Help/AbnFormat}
		  var weights = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
		  str = str.replace(/^AU/, '');
		  var ABN = (parseInt(str.slice(0, 1), 10) - 1).toString() + str.slice(1);
		  var total = 0;
		  for (var i = 0; i < 11; i++) {
		    total += weights[i] * ABN.charAt(i);
		  }
		  return total !== 0 && total % 89 === 0;
		};
		var CH = function CH(str) {
		  // @see {@link https://www.ech.ch/de/ech/ech-0097/5.2.0}
		  var hasValidCheckNumber = function hasValidCheckNumber(digits) {
		    var lastDigit = digits.pop(); // used as check number
		    var weights = [5, 4, 3, 2, 7, 6, 5, 4];
		    var calculatedCheckNumber = (11 - digits.reduce(function (acc, el, idx) {
		      return acc + el * weights[idx];
		    }, 0) % 11) % 11;
		    return lastDigit === calculatedCheckNumber;
		  };

		  // @see {@link https://www.estv.admin.ch/estv/de/home/mehrwertsteuer/uid/mwst-uid-nummer.html}
		  return /^(CHE[- ]?)?(\d{9}|(\d{3}\.\d{3}\.\d{3})|(\d{3} \d{3} \d{3})) ?(TVA|MWST|IVA)?$/.test(str) && hasValidCheckNumber(str.match(/\d/g).map(function (el) {
		    return +el;
		  }));
		};
		var PT = function PT(str) {
		  var match = str.match(/^(PT)?(\d{9})$/);
		  if (!match) {
		    return false;
		  }
		  var tin = match[2];
		  var checksum = 11 - algorithms.reverseMultiplyAndSum(tin.split('').slice(0, 8).map(function (a) {
		    return parseInt(a, 10);
		  }), 9) % 11;
		  if (checksum > 9) {
		    return parseInt(tin[8], 10) === 0;
		  }
		  return checksum === parseInt(tin[8], 10);
		};
		var vatMatchers = isVAT$1.vatMatchers = {
		  /**
		   * European Union VAT identification numbers
		   */
		  AT: function AT(str) {
		    return /^(AT)?U\d{8}$/.test(str);
		  },
		  BE: function BE(str) {
		    return /^(BE)?\d{10}$/.test(str);
		  },
		  BG: function BG(str) {
		    return /^(BG)?\d{9,10}$/.test(str);
		  },
		  HR: function HR(str) {
		    return /^(HR)?\d{11}$/.test(str);
		  },
		  CY: function CY(str) {
		    return /^(CY)?\w{9}$/.test(str);
		  },
		  CZ: function CZ(str) {
		    return /^(CZ)?\d{8,10}$/.test(str);
		  },
		  DK: function DK(str) {
		    return /^(DK)?\d{8}$/.test(str);
		  },
		  EE: function EE(str) {
		    return /^(EE)?\d{9}$/.test(str);
		  },
		  FI: function FI(str) {
		    return /^(FI)?\d{8}$/.test(str);
		  },
		  FR: function FR(str) {
		    return /^(FR)([A-Z0-9]{2}\d{9})$/.test(str);
		  },
		  DE: function DE(str) {
		    return /^(DE)?\d{9}$/.test(str);
		  },
		  EL: function EL(str) {
		    return /^(EL)?\d{9}$/.test(str);
		  },
		  HU: function HU(str) {
		    return /^(HU)?\d{8}$/.test(str);
		  },
		  IE: function IE(str) {
		    return /^(IE)?\d{7}\w{1}(W)?$/.test(str);
		  },
		  IT: function IT(str) {
		    return /^(IT)?\d{11}$/.test(str);
		  },
		  LV: function LV(str) {
		    return /^(LV)?\d{11}$/.test(str);
		  },
		  LT: function LT(str) {
		    return /^(LT)?\d{9,12}$/.test(str);
		  },
		  LU: function LU(str) {
		    return /^(LU)?\d{8}$/.test(str);
		  },
		  MT: function MT(str) {
		    return /^(MT)?\d{8}$/.test(str);
		  },
		  NL: function NL(str) {
		    return /^(NL)?\d{9}B\d{2}$/.test(str);
		  },
		  PL: function PL(str) {
		    return /^(PL)?(\d{10}|(\d{3}-\d{3}-\d{2}-\d{2})|(\d{3}-\d{2}-\d{2}-\d{3}))$/.test(str);
		  },
		  PT: PT,
		  RO: function RO(str) {
		    return /^(RO)?\d{2,10}$/.test(str);
		  },
		  SK: function SK(str) {
		    return /^(SK)?\d{10}$/.test(str);
		  },
		  SI: function SI(str) {
		    return /^(SI)?\d{8}$/.test(str);
		  },
		  ES: function ES(str) {
		    return /^(ES)?\w\d{7}[A-Z]$/.test(str);
		  },
		  SE: function SE(str) {
		    return /^(SE)?\d{12}$/.test(str);
		  },
		  /**
		   * VAT numbers of non-EU countries
		   */
		  AL: function AL(str) {
		    return /^(AL)?\w{9}[A-Z]$/.test(str);
		  },
		  MK: function MK(str) {
		    return /^(MK)?\d{13}$/.test(str);
		  },
		  AU: AU,
		  BY: function BY(str) {
		    return /^(УНП )?\d{9}$/.test(str);
		  },
		  CA: function CA(str) {
		    return /^(CA)?\d{9}$/.test(str);
		  },
		  IS: function IS(str) {
		    return /^(IS)?\d{5,6}$/.test(str);
		  },
		  IN: function IN(str) {
		    return /^(IN)?\d{15}$/.test(str);
		  },
		  ID: function ID(str) {
		    return /^(ID)?(\d{15}|(\d{2}.\d{3}.\d{3}.\d{1}-\d{3}.\d{3}))$/.test(str);
		  },
		  IL: function IL(str) {
		    return /^(IL)?\d{9}$/.test(str);
		  },
		  KZ: function KZ(str) {
		    return /^(KZ)?\d{12}$/.test(str);
		  },
		  NZ: function NZ(str) {
		    return /^(NZ)?\d{9}$/.test(str);
		  },
		  NG: function NG(str) {
		    return /^(NG)?(\d{12}|(\d{8}-\d{4}))$/.test(str);
		  },
		  NO: function NO(str) {
		    return /^(NO)?\d{9}MVA$/.test(str);
		  },
		  PH: function PH(str) {
		    return /^(PH)?(\d{12}|\d{3} \d{3} \d{3} \d{3})$/.test(str);
		  },
		  RU: function RU(str) {
		    return /^(RU)?(\d{10}|\d{12})$/.test(str);
		  },
		  SM: function SM(str) {
		    return /^(SM)?\d{5}$/.test(str);
		  },
		  SA: function SA(str) {
		    return /^(SA)?\d{15}$/.test(str);
		  },
		  RS: function RS(str) {
		    return /^(RS)?\d{9}$/.test(str);
		  },
		  CH: CH,
		  TR: function TR(str) {
		    return /^(TR)?\d{10}$/.test(str);
		  },
		  UA: function UA(str) {
		    return /^(UA)?\d{12}$/.test(str);
		  },
		  GB: function GB(str) {
		    return /^GB((\d{3} \d{4} ([0-8][0-9]|9[0-6]))|(\d{9} \d{3})|(((GD[0-4])|(HA[5-9]))[0-9]{2}))$/.test(str);
		  },
		  UZ: function UZ(str) {
		    return /^(UZ)?\d{9}$/.test(str);
		  },
		  /**
		   * VAT numbers of Latin American countries
		   */
		  AR: function AR(str) {
		    return /^(AR)?\d{11}$/.test(str);
		  },
		  BO: function BO(str) {
		    return /^(BO)?\d{7}$/.test(str);
		  },
		  BR: function BR(str) {
		    return /^(BR)?((\d{2}.\d{3}.\d{3}\/\d{4}-\d{2})|(\d{3}.\d{3}.\d{3}-\d{2}))$/.test(str);
		  },
		  CL: function CL(str) {
		    return /^(CL)?\d{8}-\d{1}$/.test(str);
		  },
		  CO: function CO(str) {
		    return /^(CO)?\d{10}$/.test(str);
		  },
		  CR: function CR(str) {
		    return /^(CR)?\d{9,12}$/.test(str);
		  },
		  EC: function EC(str) {
		    return /^(EC)?\d{13}$/.test(str);
		  },
		  SV: function SV(str) {
		    return /^(SV)?\d{4}-\d{6}-\d{3}-\d{1}$/.test(str);
		  },
		  GT: function GT(str) {
		    return /^(GT)?\d{7}-\d{1}$/.test(str);
		  },
		  HN: function HN(str) {
		    return /^(HN)?$/.test(str);
		  },
		  MX: function MX(str) {
		    return /^(MX)?\w{3,4}\d{6}\w{3}$/.test(str);
		  },
		  NI: function NI(str) {
		    return /^(NI)?\d{3}-\d{6}-\d{4}\w{1}$/.test(str);
		  },
		  PA: function PA(str) {
		    return /^(PA)?$/.test(str);
		  },
		  PY: function PY(str) {
		    return /^(PY)?\d{6,8}-\d{1}$/.test(str);
		  },
		  PE: function PE(str) {
		    return /^(PE)?\d{11}$/.test(str);
		  },
		  DO: function DO(str) {
		    return /^(DO)?(\d{11}|(\d{3}-\d{7}-\d{1})|[1,4,5]{1}\d{8}|([1,4,5]{1})-\d{2}-\d{5}-\d{1})$/.test(str);
		  },
		  UY: function UY(str) {
		    return /^(UY)?\d{12}$/.test(str);
		  },
		  VE: function VE(str) {
		    return /^(VE)?[J,G,V,E]{1}-(\d{9}|(\d{8}-\d{1}))$/.test(str);
		  }
		};
		function isVAT(str, countryCode) {
		  (0, _assertString.default)(str);
		  (0, _assertString.default)(countryCode);
		  if (countryCode in vatMatchers) {
		    return vatMatchers[countryCode](str);
		  }
		  throw new Error("Invalid country code: '".concat(countryCode, "'"));
		}
		return isVAT$1;
	}

	var isVATExports = /*@__PURE__*/ requireIsVAT();
	var isVAT = /*@__PURE__*/getDefaultExportFromCjs(isVATExports);

	var customParseFormat$2 = {exports: {}};

	var customParseFormat$1 = customParseFormat$2.exports;

	var hasRequiredCustomParseFormat;

	function requireCustomParseFormat () {
		if (hasRequiredCustomParseFormat) return customParseFormat$2.exports;
		hasRequiredCustomParseFormat = 1;
		(function (module, exports$1) {
			!function(e,t){module.exports=t();}(customParseFormat$1,(function(){var e={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},t=/(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,n=/\d/,r=/\d\d/,i=/\d\d?/,o=/\d*[^-_:/,()\s\d]+/,s={},a=function(e){return (e=+e)+(e>68?1900:2e3)};var f=function(e){return function(t){this[e]=+t;}},h=[/[+-]\d\d:?(\d\d)?|Z/,function(e){(this.zone||(this.zone={})).offset=function(e){if(!e)return 0;if("Z"===e)return 0;var t=e.match(/([+-]|\d\d)/g),n=60*t[1]+(+t[2]||0);return 0===n?0:"+"===t[0]?-n:n}(e);}],u=function(e){var t=s[e];return t&&(t.indexOf?t:t.s.concat(t.f))},d=function(e,t){var n,r=s.meridiem;if(r){for(var i=1;i<=24;i+=1)if(e.indexOf(r(i,0,t))>-1){n=i>12;break}}else n=e===(t?"pm":"PM");return n},c={A:[o,function(e){this.afternoon=d(e,false);}],a:[o,function(e){this.afternoon=d(e,true);}],Q:[n,function(e){this.month=3*(e-1)+1;}],S:[n,function(e){this.milliseconds=100*+e;}],SS:[r,function(e){this.milliseconds=10*+e;}],SSS:[/\d{3}/,function(e){this.milliseconds=+e;}],s:[i,f("seconds")],ss:[i,f("seconds")],m:[i,f("minutes")],mm:[i,f("minutes")],H:[i,f("hours")],h:[i,f("hours")],HH:[i,f("hours")],hh:[i,f("hours")],D:[i,f("day")],DD:[r,f("day")],Do:[o,function(e){var t=s.ordinal,n=e.match(/\d+/);if(this.day=n[0],t)for(var r=1;r<=31;r+=1)t(r).replace(/\[|\]/g,"")===e&&(this.day=r);}],w:[i,f("week")],ww:[r,f("week")],M:[i,f("month")],MM:[r,f("month")],MMM:[o,function(e){var t=u("months"),n=(u("monthsShort")||t.map((function(e){return e.slice(0,3)}))).indexOf(e)+1;if(n<1)throw new Error;this.month=n%12||n;}],MMMM:[o,function(e){var t=u("months").indexOf(e)+1;if(t<1)throw new Error;this.month=t%12||t;}],Y:[/[+-]?\d+/,f("year")],YY:[r,function(e){this.year=a(e);}],YYYY:[/\d{4}/,f("year")],Z:h,ZZ:h};function l(n){var r,i;r=n,i=s&&s.formats;for(var o=(n=r.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,(function(t,n,r){var o=r&&r.toUpperCase();return n||i[r]||e[r]||i[o].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,(function(e,t,n){return t||n.slice(1)}))}))).match(t),a=o.length,f=0;f<a;f+=1){var h=o[f],u=c[h],d=u&&u[0],l=u&&u[1];o[f]=l?{regex:d,parser:l}:h.replace(/^\[|\]$/g,"");}return function(e){for(var t={},n=0,r=0;n<a;n+=1){var i=o[n];if("string"==typeof i)r+=i.length;else {var s=i.regex,f=i.parser,h=e.slice(r),u=s.exec(h)[0];f.call(t,u),e=e.replace(u,"");}}return function(e){var t=e.afternoon;if(void 0!==t){var n=e.hours;t?n<12&&(e.hours+=12):12===n&&(e.hours=0),delete e.afternoon;}}(t),t}}return function(e,t,n){n.p.customParseFormat=true,e&&e.parseTwoDigitYear&&(a=e.parseTwoDigitYear);var r=t.prototype,i=r.parse;r.parse=function(e){var t=e.date,r=e.utc,o=e.args;this.$u=r;var a=o[1];if("string"==typeof a){var f=true===o[2],h=true===o[3],u=f||h,d=o[2];h&&(d=o[2]),s=this.$locale(),!f&&d&&(s=n.Ls[d]),this.$d=function(e,t,n,r){try{if(["x","X"].indexOf(t)>-1)return new Date(("X"===t?1e3:1)*e);var i=l(t)(e),o=i.year,s=i.month,a=i.day,f=i.hours,h=i.minutes,u=i.seconds,d=i.milliseconds,c=i.zone,m=i.week,M=new Date,Y=a||(o||s?1:M.getDate()),p=o||M.getFullYear(),v=0;o&&!s||(v=s>0?s-1:M.getMonth());var D,w=f||0,g=h||0,y=u||0,L=d||0;return c?new Date(Date.UTC(p,v,Y,w,g,y,L+60*c.offset*1e3)):n?new Date(Date.UTC(p,v,Y,w,g,y,L)):(D=new Date(p,v,Y,w,g,y,L),m&&(D=r(D).week(m).toDate()),D)}catch(e){return new Date("")}}(t,a,r,n),this.init(),d&&true!==d&&(this.$L=this.locale(d).$L),u&&t!=this.format(a)&&(this.$d=new Date("")),s={};}else if(a instanceof Array)for(var c=a.length,m=1;m<=c;m+=1){o[1]=a[m-1];var M=n.apply(this,o);if(M.isValid()){this.$d=M.$d,this.$L=M.$L,this.init();break}m===c&&(this.$d=new Date(""));}else i.call(this,e);};}})); 
		} (customParseFormat$2));
		return customParseFormat$2.exports;
	}

	var customParseFormatExports = requireCustomParseFormat();
	var customParseFormat = /*@__PURE__*/getDefaultExportFromCjs(customParseFormatExports);

	var isPostalCode$1 = {};

	var hasRequiredIsPostalCode;

	function requireIsPostalCode () {
		if (hasRequiredIsPostalCode) return isPostalCode$1;
		hasRequiredIsPostalCode = 1;

		Object.defineProperty(isPostalCode$1, "__esModule", {
		  value: true
		});
		isPostalCode$1.default = isPostalCode;
		isPostalCode$1.locales = void 0;
		var _assertString = _interopRequireDefault(/*@__PURE__*/ requireAssertString());
		function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
		// common patterns
		var threeDigit = /^\d{3}$/;
		var fourDigit = /^\d{4}$/;
		var fiveDigit = /^\d{5}$/;
		var sixDigit = /^\d{6}$/;
		var patterns = {
		  AD: /^AD\d{3}$/,
		  AT: fourDigit,
		  AU: fourDigit,
		  AZ: /^AZ\d{4}$/,
		  BA: /^([7-8]\d{4}$)/,
		  BD: /^([1-8][0-9]{3}|9[0-4][0-9]{2})$/,
		  BE: fourDigit,
		  BG: fourDigit,
		  BR: /^\d{5}-?\d{3}$/,
		  BY: /^2[1-4]\d{4}$/,
		  CA: /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][\s\-]?\d[ABCEGHJ-NPRSTV-Z]\d$/i,
		  CH: fourDigit,
		  CN: /^(0[1-7]|1[012356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[1-5]|8[1345]|9[09])\d{4}$/,
		  CO: /^(05|08|11|13|15|17|18|19|20|23|25|27|41|44|47|50|52|54|63|66|68|70|73|76|81|85|86|88|91|94|95|97|99)(\d{4})$/,
		  CZ: /^\d{3}\s?\d{2}$/,
		  DE: fiveDigit,
		  DK: fourDigit,
		  DO: fiveDigit,
		  DZ: fiveDigit,
		  EE: fiveDigit,
		  ES: /^(5[0-2]{1}|[0-4]{1}\d{1})\d{3}$/,
		  FI: fiveDigit,
		  FR: /^(?:(?:0[1-9]|[1-8]\d|9[0-5])\d{3}|97[1-46]\d{2})$/,
		  GB: /^(gir\s?0aa|[a-z]{1,2}\d[\da-z]?\s?(\d[a-z]{2})?)$/i,
		  GR: /^\d{3}\s?\d{2}$/,
		  HR: /^([1-5]\d{4}$)/,
		  HT: /^HT\d{4}$/,
		  HU: fourDigit,
		  ID: fiveDigit,
		  IE: /^(?!.*(?:o))[A-Za-z]\d[\dw]\s\w{4}$/i,
		  IL: /^(\d{5}|\d{7})$/,
		  IN: /^((?!10|29|35|54|55|65|66|86|87|88|89)[1-9][0-9]{5})$/,
		  IR: /^(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}$/,
		  IS: threeDigit,
		  IT: fiveDigit,
		  JP: /^\d{3}\-\d{4}$/,
		  KE: fiveDigit,
		  KR: /^(\d{5}|\d{6})$/,
		  LI: /^(948[5-9]|949[0-7])$/,
		  LT: /^LT\-\d{5}$/,
		  LU: fourDigit,
		  LV: /^LV\-\d{4}$/,
		  LK: fiveDigit,
		  MC: /^980\d{2}$/,
		  MG: threeDigit,
		  MX: fiveDigit,
		  MT: /^[A-Za-z]{3}\s{0,1}\d{4}$/,
		  MY: fiveDigit,
		  NL: /^[1-9]\d{3}\s?(?!sa|sd|ss)[a-z]{2}$/i,
		  NO: fourDigit,
		  NP: /^(10|21|22|32|33|34|44|45|56|57)\d{3}$|^(977)$/i,
		  NZ: fourDigit,
		  // https://www.pakpost.gov.pk/postcodes.php
		  PK: fiveDigit,
		  PL: /^\d{2}\-\d{3}$/,
		  PR: /^00[679]\d{2}([ -]\d{4})?$/,
		  PT: /^\d{4}\-\d{3}?$/,
		  RO: sixDigit,
		  RU: sixDigit,
		  SA: fiveDigit,
		  SE: /^[1-9]\d{2}\s?\d{2}$/,
		  SG: sixDigit,
		  SI: fourDigit,
		  SK: /^\d{3}\s?\d{2}$/,
		  TH: fiveDigit,
		  TN: fourDigit,
		  TW: /^\d{3}(\d{2,3})?$/,
		  UA: fiveDigit,
		  US: /^\d{5}(-\d{4})?$/,
		  ZA: fourDigit,
		  ZM: fiveDigit
		};
		isPostalCode$1.locales = Object.keys(patterns);
		function isPostalCode(str, locale) {
		  (0, _assertString.default)(str);
		  if (locale in patterns) {
		    return patterns[locale].test(str);
		  } else if (locale === 'any') {
		    for (var key in patterns) {
		      // https://github.com/gotwarlost/istanbul/blob/master/ignoring-code-for-coverage.md#ignoring-code-for-coverage-purposes
		      // istanbul ignore else
		      if (patterns.hasOwnProperty(key)) {
		        var pattern = patterns[key];
		        if (pattern.test(str)) {
		          return true;
		        }
		      }
		    }
		    return false;
		  }
		  throw new Error("Invalid locale '".concat(locale, "'"));
		}
		return isPostalCode$1;
	}

	var isPostalCodeExports = /*@__PURE__*/ requireIsPostalCode();
	var isPostalCode = /*@__PURE__*/getDefaultExportFromCjs(isPostalCodeExports);

	var isMobilePhone$1 = {};

	var hasRequiredIsMobilePhone;

	function requireIsMobilePhone () {
		if (hasRequiredIsMobilePhone) return isMobilePhone$1;
		hasRequiredIsMobilePhone = 1;

		Object.defineProperty(isMobilePhone$1, "__esModule", {
		  value: true
		});
		isMobilePhone$1.default = isMobilePhone;
		isMobilePhone$1.locales = void 0;
		var _assertString = _interopRequireDefault(/*@__PURE__*/ requireAssertString());
		function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
		/* eslint-disable max-len */
		var phones = {
		  'am-AM': /^(\+?374|0)(33|4[134]|55|77|88|9[13-689])\d{6}$/,
		  'ar-AE': /^((\+?971)|0)?5[024568]\d{7}$/,
		  'ar-BH': /^(\+?973)?(3|6)\d{7}$/,
		  'ar-DZ': /^(\+?213|0)(5|6|7)\d{8}$/,
		  'ar-LB': /^(\+?961)?((3|81)\d{6}|7\d{7})$/,
		  'ar-EG': /^((\+?20)|0)?1[0125]\d{8}$/,
		  'ar-IQ': /^(\+?964|0)?7[0-9]\d{8}$/,
		  'ar-JO': /^(\+?962|0)?7[789]\d{7}$/,
		  'ar-KW': /^(\+?965)([569]\d{7}|41\d{6})$/,
		  'ar-LY': /^((\+?218)|0)?(9[1-6]\d{7}|[1-8]\d{7,9})$/,
		  'ar-MA': /^(?:(?:\+|00)212|0)[5-7]\d{8}$/,
		  'ar-OM': /^((\+|00)968)?([79][1-9])\d{6}$/,
		  'ar-PS': /^(\+?970|0)5[6|9](\d{7})$/,
		  'ar-SA': /^(!?(\+?966)|0)?5\d{8}$/,
		  'ar-SD': /^((\+?249)|0)?(9[012369]|1[012])\d{7}$/,
		  'ar-SY': /^(!?(\+?963)|0)?9\d{8}$/,
		  'ar-TN': /^(\+?216)?[2459]\d{7}$/,
		  'az-AZ': /^(\+994|0)(10|5[015]|7[07]|99)\d{7}$/,
		  'ar-QA': /^(\+?974|0)?([3567]\d{7})$/,
		  'bs-BA': /^((((\+|00)3876)|06))((([0-3]|[5-6])\d{6})|(4\d{7}))$/,
		  'be-BY': /^(\+?375)?(24|25|29|33|44)\d{7}$/,
		  'bg-BG': /^(\+?359|0)?8[789]\d{7}$/,
		  'bn-BD': /^(\+?880|0)1[13456789][0-9]{8}$/,
		  'ca-AD': /^(\+376)?[346]\d{5}$/,
		  'cs-CZ': /^(\+?420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
		  'da-DK': /^(\+?45)?\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}$/,
		  'de-DE': /^((\+49|0)1)(5[0-25-9]\d|6([23]|0\d?)|7([0-57-9]|6\d))\d{7,9}$/,
		  'de-AT': /^(\+43|0)\d{1,4}\d{3,12}$/,
		  'de-CH': /^(\+41|0)([1-9])\d{1,9}$/,
		  'de-LU': /^(\+352)?((6\d1)\d{6})$/,
		  'dv-MV': /^(\+?960)?(7[2-9]|9[1-9])\d{5}$/,
		  'el-GR': /^(\+?30|0)?6(8[5-9]|9(?![26])[0-9])\d{7}$/,
		  'el-CY': /^(\+?357?)?(9(9|7|6|5|4)\d{6})$/,
		  'en-AI': /^(\+?1|0)264(?:2(35|92)|4(?:6[1-2]|76|97)|5(?:3[6-9]|8[1-4])|7(?:2(4|9)|72))\d{4}$/,
		  'en-AU': /^(\+?61|0)4\d{8}$/,
		  'en-AG': /^(?:\+1|1)268(?:464|7(?:1[3-9]|[28]\d|3[0246]|64|7[0-689]))\d{4}$/,
		  'en-BM': /^(\+?1)?441(((3|7)\d{6}$)|(5[0-3][0-9]\d{4}$)|(59\d{5}$))/,
		  'en-BS': /^(\+?1[-\s]?|0)?\(?242\)?[-\s]?\d{3}[-\s]?\d{4}$/,
		  'en-GB': /^(\+?44|0)7[1-9]\d{8}$/,
		  'en-GG': /^(\+?44|0)1481\d{6}$/,
		  'en-GH': /^(\+233|0)(20|50|24|54|27|57|26|56|23|53|28|55|59)\d{7}$/,
		  'en-GY': /^(\+592|0)6\d{6}$/,
		  'en-HK': /^(\+?852[-\s]?)?[456789]\d{3}[-\s]?\d{4}$/,
		  'en-MO': /^(\+?853[-\s]?)?[6]\d{3}[-\s]?\d{4}$/,
		  'en-IE': /^(\+?353|0)8[356789]\d{7}$/,
		  'en-IN': /^(\+?91|0)?[6789]\d{9}$/,
		  'en-JM': /^(\+?876)?\d{7}$/,
		  'en-KE': /^(\+?254|0)(7|1)\d{8}$/,
		  'fr-CF': /^(\+?236| ?)(70|75|77|72|21|22)\d{6}$/,
		  'en-SS': /^(\+?211|0)(9[1257])\d{7}$/,
		  'en-KI': /^((\+686|686)?)?( )?((6|7)(2|3|8)[0-9]{6})$/,
		  'en-KN': /^(?:\+1|1)869(?:46\d|48[89]|55[6-8]|66\d|76[02-7])\d{4}$/,
		  'en-LS': /^(\+?266)(22|28|57|58|59|27|52)\d{6}$/,
		  'en-MT': /^(\+?356|0)?(99|79|77|21|27|22|25)[0-9]{6}$/,
		  'en-MU': /^(\+?230|0)?\d{8}$/,
		  'en-MW': /^(\+?265|0)(((77|88|31|99|98|21)\d{7})|(((111)|1)\d{6})|(32000\d{4}))$/,
		  'en-NA': /^(\+?264|0)(6|8)\d{7}$/,
		  'en-NG': /^(\+?234|0)?[789]\d{9}$/,
		  'en-NZ': /^(\+?64|0)[28]\d{7,9}$/,
		  'en-PG': /^(\+?675|0)?(7\d|8[18])\d{6}$/,
		  'en-PK': /^((00|\+)?92|0)3[0-6]\d{8}$/,
		  'en-PH': /^(09|\+639)\d{9}$/,
		  'en-RW': /^(\+?250|0)?[7]\d{8}$/,
		  'en-SG': /^(\+65)?[3689]\d{7}$/,
		  'en-SL': /^(\+?232|0)\d{8}$/,
		  'en-TZ': /^(\+?255|0)?[67]\d{8}$/,
		  'en-UG': /^(\+?256|0)?[7]\d{8}$/,
		  'en-US': /^((\+1|1)?( |-)?)?(\([2-9][0-9]{2}\)|[2-9][0-9]{2})( |-)?([2-9][0-9]{2}( |-)?[0-9]{4})$/,
		  'en-ZA': /^(\+?27|0)\d{9}$/,
		  'en-ZM': /^(\+?26)?0[79][567]\d{7}$/,
		  'en-ZW': /^(\+263)[0-9]{9}$/,
		  'en-BW': /^(\+?267)?(7[1-8]{1})\d{6}$/,
		  'es-AR': /^\+?549(11|[2368]\d)\d{8}$/,
		  'es-BO': /^(\+?591)?(6|7)\d{7}$/,
		  'es-CO': /^(\+?57)?3(0(0|1|2|4|5)|1\d|2[0-4]|5(0|1))\d{7}$/,
		  'es-CL': /^(\+?56|0)[2-9]\d{1}\d{7}$/,
		  'es-CR': /^(\+506)?[2-8]\d{7}$/,
		  'es-CU': /^(\+53|0053)?5\d{7}$/,
		  'es-DO': /^(\+?1)?8[024]9\d{7}$/,
		  'es-HN': /^(\+?504)?[9|8|3|2]\d{7}$/,
		  'es-EC': /^(\+?593|0)([2-7]|9[2-9])\d{7}$/,
		  'es-ES': /^(\+?34)?[6|7]\d{8}$/,
		  'es-GT': /^(\+?502)?[2|6|7]\d{7}$/,
		  'es-PE': /^(\+?51)?9\d{8}$/,
		  'es-MX': /^(\+?52)?(1|01)?\d{10,11}$/,
		  'es-NI': /^(\+?505)\d{7,8}$/,
		  'es-PA': /^(\+?507)\d{7,8}$/,
		  'es-PY': /^(\+?595|0)9[9876]\d{7}$/,
		  'es-SV': /^(\+?503)?[67]\d{7}$/,
		  'es-UY': /^(\+598|0)9[1-9][\d]{6}$/,
		  'es-VE': /^(\+?58)?(2|4)\d{9}$/,
		  'et-EE': /^(\+?372)?\s?(5|8[1-4])\s?([0-9]\s?){6,7}$/,
		  'fa-IR': /^(\+?98[\-\s]?|0)9[0-39]\d[\-\s]?\d{3}[\-\s]?\d{4}$/,
		  'fi-FI': /^(\+?358|0)\s?(4[0-6]|50)\s?(\d\s?){4,8}$/,
		  'fj-FJ': /^(\+?679)?\s?\d{3}\s?\d{4}$/,
		  'fo-FO': /^(\+?298)?\s?\d{2}\s?\d{2}\s?\d{2}$/,
		  'fr-BF': /^(\+226|0)[67]\d{7}$/,
		  'fr-BJ': /^(\+229)\d{8}$/,
		  'fr-CD': /^(\+?243|0)?(8|9)\d{8}$/,
		  'fr-CM': /^(\+?237)6[0-9]{8}$/,
		  'fr-DJ': /^(?:\+253)?77[6-8]\d{5}$/,
		  'fr-FR': /^(\+?33|0)[67]\d{8}$/,
		  'fr-GF': /^(\+?594|0|00594)[67]\d{8}$/,
		  'fr-GP': /^(\+?590|0|00590)[67]\d{8}$/,
		  'fr-MQ': /^(\+?596|0|00596)[67]\d{8}$/,
		  'fr-PF': /^(\+?689)?8[789]\d{6}$/,
		  'fr-RE': /^(\+?262|0|00262)[67]\d{8}$/,
		  'fr-WF': /^(\+681)?\d{6}$/,
		  'he-IL': /^(\+972|0)([23489]|5[012345689]|77)[1-9]\d{6}$/,
		  'hu-HU': /^(\+?36|06)(20|30|31|50|70)\d{7}$/,
		  'id-ID': /^(\+?62|0)8(1[123456789]|2[1238]|3[1238]|5[12356789]|7[78]|9[56789]|8[123456789])([\s?|\d]{5,11})$/,
		  'ir-IR': /^(\+98|0)?9\d{9}$/,
		  'it-IT': /^(\+?39)?\s?3\d{2} ?\d{6,7}$/,
		  'it-SM': /^((\+378)|(0549)|(\+390549)|(\+3780549))?6\d{5,9}$/,
		  'ja-JP': /^(\+81[ \-]?(\(0\))?|0)[6789]0[ \-]?\d{4}[ \-]?\d{4}$/,
		  'ka-GE': /^(\+?995)?(79\d{7}|5\d{8})$/,
		  'kk-KZ': /^(\+?7|8)?7\d{9}$/,
		  'kl-GL': /^(\+?299)?\s?\d{2}\s?\d{2}\s?\d{2}$/,
		  'ko-KR': /^((\+?82)[ \-]?)?0?1([0|1|6|7|8|9]{1})[ \-]?\d{3,4}[ \-]?\d{4}$/,
		  'ky-KG': /^(\+996\s?)?(22[0-9]|50[0-9]|55[0-9]|70[0-9]|75[0-9]|77[0-9]|880|990|995|996|997|998)\s?\d{3}\s?\d{3}$/,
		  'lt-LT': /^(\+370|8)\d{8}$/,
		  'lv-LV': /^(\+?371)2\d{7}$/,
		  'mg-MG': /^((\+?261|0)(2|3)\d)?\d{7}$/,
		  'mn-MN': /^(\+|00|011)?976(77|81|88|91|94|95|96|99)\d{6}$/,
		  'my-MM': /^(\+?959|09|9)(2[5-7]|3[1-2]|4[0-5]|6[6-9]|7[5-9]|9[6-9])[0-9]{7}$/,
		  'ms-MY': /^(\+?60|0)1(([0145](-|\s)?\d{7,8})|([236-9](-|\s)?\d{7}))$/,
		  'mz-MZ': /^(\+?258)?8[234567]\d{7}$/,
		  'nb-NO': /^(\+?47)?[49]\d{7}$/,
		  'ne-NP': /^(\+?977)?9[78]\d{8}$/,
		  'nl-BE': /^(\+?32|0)4\d{8}$/,
		  'nl-NL': /^(((\+|00)?31\(0\))|((\+|00)?31)|0)6{1}\d{8}$/,
		  'nl-AW': /^(\+)?297(56|59|64|73|74|99)\d{5}$/,
		  'nn-NO': /^(\+?47)?[49]\d{7}$/,
		  'pl-PL': /^(\+?48)? ?([5-8]\d|45) ?\d{3} ?\d{2} ?\d{2}$/,
		  'pt-BR': /^((\+?55\ ?[1-9]{2}\ ?)|(\+?55\ ?\([1-9]{2}\)\ ?)|(0[1-9]{2}\ ?)|(\([1-9]{2}\)\ ?)|([1-9]{2}\ ?))((\d{4}\-?\d{4})|(9[1-9]{1}\d{3}\-?\d{4}))$/,
		  'pt-PT': /^(\+?351)?9[1236]\d{7}$/,
		  'pt-AO': /^(\+?244)?9\d{8}$/,
		  'ro-MD': /^(\+?373|0)((6(0|1|2|6|7|8|9))|(7(6|7|8|9)))\d{6}$/,
		  'ro-RO': /^(\+?40|0)\s?7\d{2}(\/|\s|\.|-)?\d{3}(\s|\.|-)?\d{3}$/,
		  'ru-RU': /^(\+?7|8)?9\d{9}$/,
		  'si-LK': /^(?:0|94|\+94)?(7(0|1|2|4|5|6|7|8)( |-)?)\d{7}$/,
		  'sl-SI': /^(\+386\s?|0)(\d{1}\s?\d{3}\s?\d{2}\s?\d{2}|\d{2}\s?\d{3}\s?\d{3})$/,
		  'sk-SK': /^(\+?421)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
		  'so-SO': /^(\+?252|0)((6[0-9])\d{7}|(7[1-9])\d{7})$/,
		  'sq-AL': /^(\+355|0)6[2-9]\d{7}$/,
		  'sr-RS': /^(\+3816|06)[- \d]{5,9}$/,
		  'sv-SE': /^(\+?46|0)[\s\-]?7[\s\-]?[02369]([\s\-]?\d){7}$/,
		  'tg-TJ': /^(\+?992)?[5][5]\d{7}$/,
		  'th-TH': /^(\+66|66|0)\d{9}$/,
		  'tr-TR': /^(\+?90|0)?5\d{9}$/,
		  'tk-TM': /^(\+993|993|8)\d{8}$/,
		  'uk-UA': /^(\+?38)?0(50|6[36-8]|7[357]|9[1-9])\d{7}$/,
		  'uz-UZ': /^(\+?998)?(6[125-79]|7[1-69]|88|9\d)\d{7}$/,
		  'vi-VN': /^((\+?84)|0)((3([2-9]))|(5([25689]))|(7([0|6-9]))|(8([1-9]))|(9([0-9])))([0-9]{7})$/,
		  'zh-CN': /^((\+|00)86)?(1[3-9]|9[28])\d{9}$/,
		  'zh-TW': /^(\+?886\-?|0)?9\d{8}$/,
		  'dz-BT': /^(\+?975|0)?(17|16|77|02)\d{6}$/,
		  'ar-YE': /^(((\+|00)9677|0?7)[0137]\d{7}|((\+|00)967|0)[1-7]\d{6})$/,
		  'ar-EH': /^(\+?212|0)[\s\-]?(5288|5289)[\s\-]?\d{5}$/,
		  'fa-AF': /^(\+93|0)?(2{1}[0-8]{1}|[3-5]{1}[0-4]{1})(\d{7})$/,
		  'mk-MK': /^(\+?389|0)?((?:2[2-9]\d{6}|(?:3[1-4]|4[2-8])\d{6}|500\d{5}|5[2-9]\d{6}|7[0-9][2-9]\d{5}|8[1-9]\d{6}|800\d{5}|8009\d{4}))$/
		};
		/* eslint-enable max-len */

		// aliases
		phones['en-CA'] = phones['en-US'];
		phones['fr-CA'] = phones['en-CA'];
		phones['fr-BE'] = phones['nl-BE'];
		phones['zh-HK'] = phones['en-HK'];
		phones['zh-MO'] = phones['en-MO'];
		phones['ga-IE'] = phones['en-IE'];
		phones['fr-CH'] = phones['de-CH'];
		phones['it-CH'] = phones['fr-CH'];
		function isMobilePhone(str, locale, options) {
		  (0, _assertString.default)(str);
		  if (options && options.strictMode && !str.startsWith('+')) {
		    return false;
		  }
		  if (Array.isArray(locale)) {
		    return locale.some(function (key) {
		      // https://github.com/gotwarlost/istanbul/blob/master/ignoring-code-for-coverage.md#ignoring-code-for-coverage-purposes
		      // istanbul ignore else
		      if (phones.hasOwnProperty(key)) {
		        var phone = phones[key];
		        if (phone.test(str)) {
		          return true;
		        }
		      }
		      return false;
		    });
		  } else if (locale in phones) {
		    return phones[locale].test(str);
		    // alias falsey locale as 'any'
		  } else if (!locale || locale === 'any') {
		    for (var key in phones) {
		      // istanbul ignore else
		      if (phones.hasOwnProperty(key)) {
		        var phone = phones[key];
		        if (phone.test(str)) {
		          return true;
		        }
		      }
		    }
		    return false;
		  }
		  throw new Error("Invalid locale '".concat(locale, "'"));
		}
		isMobilePhone$1.locales = Object.keys(phones);
		return isMobilePhone$1;
	}

	var isMobilePhoneExports = /*@__PURE__*/ requireIsMobilePhone();
	var isMobilePhone = /*@__PURE__*/getDefaultExportFromCjs(isMobilePhoneExports);

	//#endregion
	//#region src/vine/helpers.ts
	/**
	* Values that are considered true in HTML form context.
	* Includes boolean true, number 1, string '1', 'true', and 'on' (for checkboxes).
	*/
	const BOOLEAN_POSITIVES = [
		"1",
		1,
		"true",
		true,
		"on"
	];
	/**
	* Values that are considered false in HTML form context.
	* Includes boolean false, number 0, string '0', and 'false'.
	*/
	const BOOLEAN_NEGATIVES = [
		"0",
		0,
		"false",
		false
	];
	/**
	* Default date formats used when no specific format is provided.
	* Supports date-only (YYYY-MM-DD) and datetime (YYYY-MM-DD HH:mm:ss) formats.
	*/
	const DEFAULT_DATE_FORMATS = ["YYYY-MM-DD", "YYYY-MM-DD HH:mm:ss"];
	/**
	* Regular expression for validating ULID (Universally Unique Lexicographically Sortable Identifier) format.
	* ULIDs are 26 characters long using Crockford's Base32 encoding.
	*/
	const ULID = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/;
	dayjs.extend(customParseFormat);
	dayjs.extend(isSameOrAfter);
	dayjs.extend(isSameOrBefore);
	/**
	* Collection of utility helpers used across the Vine validation library.
	* These helpers provide type-checking, coercion, and validation functions
	* that are optimized for HTML form data handling.
	*
	* @example
	* helpers.isString(value) // Type guard for strings
	* helpers.asBoolean(value) // Convert to boolean with HTML form semantics
	* helpers.isEmail(email) // Validate email addresses
	*/
	const helpers = {
		/**
		* Checks if a value exists (is not null and not undefined).
		* Useful for checking if optional form fields have been provided.
		*
		* @param value - The value to check
		* @returns True if value is not null and not undefined
		*
		* @example
		* helpers.exists('hello') // true
		* helpers.exists(0) // true
		* helpers.exists(null) // false
		* helpers.exists(undefined) // false
		*/
		exists(value) {
			return value !== null && value !== void 0;
		},
		/**
		* Checks if a value is missing (null or undefined).
		* The inverse of the exists method.
		*
		* @param value - The value to check
		* @returns True if value is null or undefined
		*
		* @example
		* helpers.isMissing(null) // true
		* helpers.isMissing(undefined) // true
		* helpers.isMissing('') // false
		* helpers.isMissing(0) // false
		*/
		isMissing(value) {
			return !this.exists(value);
		},
		/**
		* Checks if a value represents a truthy boolean in HTML form context.
		* Recognizes common HTML form representations of true values.
		*
		* Accepted truthy values:
		* - true (boolean)
		* - 1 (number)
		* - "1" (string)
		* - "true" (string)
		* - "on" (string, for checkboxes)
		*
		* @param value - The value to check
		* @returns True if value represents a truthy boolean
		*
		* @example
		* helpers.isTrue(true) // true
		* helpers.isTrue('on') // true (checkbox checked)
		* helpers.isTrue('1') // true (form input)
		* helpers.isTrue('yes') // false
		*/
		isTrue(value) {
			return BOOLEAN_POSITIVES.includes(value);
		},
		/**
		* Checks if a value represents a falsy boolean in HTML form context.
		* Recognizes common HTML form representations of false values.
		*
		* Accepted falsy values:
		* - false (boolean)
		* - 0 (number)
		* - "0" (string)
		* - "false" (string)
		*
		* @param value - The value to check
		* @returns True if value represents a falsy boolean
		*
		* @example
		* helpers.isFalse(false) // true
		* helpers.isFalse('0') // true (form input)
		* helpers.isFalse('false') // true (form input)
		* helpers.isFalse('no') // false
		*/
		isFalse(value) {
			return BOOLEAN_NEGATIVES.includes(value);
		},
		/**
		* Type guard that checks if a value is a string.
		* Narrows the TypeScript type to string when returning true.
		*
		* @param value - The value to check
		* @returns True if value is a string, with type narrowing
		*
		* @example
		* if (helpers.isString(value)) {
		*   // value is now typed as string
		*   console.log(value.toUpperCase())
		* }
		*/
		isString(value) {
			return typeof value === "string";
		},
		/**
		* Type guard that checks if a value is a plain JavaScript object.
		* Excludes null, arrays, and other non-plain objects.
		*
		* @template Value - The type of values in the object
		* @param value - The value to check
		* @returns True if value is a plain object, with type narrowing
		*
		* @example
		* helpers.isObject({}) // true
		* helpers.isObject([]) // false
		* helpers.isObject(null) // false
		* helpers.isObject(new Date()) // true (but not recommended for validation)
		*/
		isObject(value) {
			return !!(value && typeof value === "object" && !Array.isArray(value));
		},
		/**
		* Checks if an object contains all the specified keys.
		* Useful for validating object structure before processing.
		*
		* @param value - The object to check
		* @param keys - Array of key names that must exist
		* @returns True if all keys exist in the object
		*
		* @example
		* helpers.hasKeys({ name: 'John', age: 30 }, ['name']) // true
		* helpers.hasKeys({ name: 'John' }, ['name', 'age']) // false
		*/
		hasKeys(value, keys) {
			for (let key of keys) if (key in value === false) return false;
			return true;
		},
		/**
		* Type guard that checks if a value is an array.
		* Narrows the TypeScript type to array when returning true.
		*
		* @template Value - The type of elements in the array
		* @param value - The value to check
		* @returns True if value is an array, with type narrowing
		*
		* @example
		* if (helpers.isArray(value)) {
		*   // value is now typed as array
		*   console.log(value.length)
		* }
		*/
		isArray(value) {
			return Array.isArray(value);
		},
		/**
		* Checks if a value is numeric (number or string representing a number).
		* Useful for validating form inputs that should contain numeric values.
		*
		* @param value - The value to check
		* @returns True if value can be converted to a valid number
		*
		* @example
		* helpers.isNumeric(42) // true
		* helpers.isNumeric('42') // true
		* helpers.isNumeric('42.5') // true
		* helpers.isNumeric('abc') // false
		*/
		isNumeric(value) {
			return !Number.isNaN(Number(value));
		},
		/**
		* Converts a value to a number using JavaScript's Number() constructor.
		* Handles null values explicitly by returning NaN.
		*
		* @param value - The value to convert to a number
		* @returns The numeric representation, or NaN if conversion fails
		*
		* @example
		* helpers.asNumber('42') // 42
		* helpers.asNumber('42.5') // 42.5
		* helpers.asNumber(null) // NaN
		* helpers.asNumber('abc') // NaN
		*/
		asNumber(value) {
			return value === null ? NaN : Number(value);
		},
		/**
		* Converts a value to a boolean using HTML form semantics.
		* Returns null for values that cannot be reliably converted.
		*
		* Conversion rules:
		* - [true, 1, "1", "true", "on"] → true
		* - [false, 0, "0", "false"] → false
		* - Everything else → null
		*
		* @param value - The value to convert
		* @returns Boolean value, or null if conversion is ambiguous
		*
		* @example
		* helpers.asBoolean('true') // true
		* helpers.asBoolean('on') // true (checkbox checked)
		* helpers.asBoolean('false') // false
		* helpers.asBoolean('maybe') // null (ambiguous)
		*/
		asBoolean(value) {
			if (this.isTrue(value)) return true;
			if (this.isFalse(value)) return false;
			return null;
		},
		/**
		* Converts a value to a Day.js date object with flexible format support.
		* Handles timestamps, ISO dates, and custom formats with intelligent fallbacks.
		*
		* @param value - The value to convert to a date (string, number, Date, etc.)
		* @param format - Date format(s) to use for parsing. Can be:
		*   - Array of format strings (e.g., ['YYYY-MM-DD', 'DD/MM/YYYY'])
		*   - Single format string
		*   - Object with format and strict parsing options
		*   - Special values: 'x' for timestamps, 'iso8601' for ISO dates
		* @returns Object containing the parsed Day.js instance and normalized formats
		*
		* @example
		* // Parse with default formats
		* helpers.asDayJS('2023-12-25')
		* // { dateTime: dayjs('2023-12-25'), formats: ['YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss'] }
		*
		* // Parse timestamp
		* helpers.asDayJS('1703548800000', ['x'])
		* // { dateTime: dayjs(1703548800000), formats: ['x'] }
		*
		* // Parse with custom format
		* helpers.asDayJS('25/12/2023', ['DD/MM/YYYY'])
		* // { dateTime: dayjs('25/12/2023', 'DD/MM/YYYY'), formats: ['DD/MM/YYYY'] }
		*
		* // ISO date fallback
		* helpers.asDayJS('2023-12-25T10:30:00Z', ['iso8601'])
		* // { dateTime: dayjs('2023-12-25T10:30:00Z'), formats: ['iso8601'] }
		*/
		asDayJS(value, format) {
			let isTimestampAllowed = false;
			let isISOAllowed = false;
			let formats = format || DEFAULT_DATE_FORMATS;
			/**
			* DayJS mutates the formats property under the hood. Therefore
			* we have to create a shallow clone before passing formats.
			*
			* https://github.com/iamkun/dayjs/issues/2136
			*/
			if (Array.isArray(formats)) {
				formats = [...formats];
				isTimestampAllowed = formats.includes("x");
				isISOAllowed = formats.includes("iso8601");
			} else if (typeof formats !== "string") {
				formats = { ...formats };
				isTimestampAllowed = formats.format === "x";
				isISOAllowed = formats.format === "iso";
			}
			const valueAsNumber = isTimestampAllowed ? helpers.asNumber(value) : value;
			let dateTime;
			/**
			* The timestamp validation does not work with formats array.
			* Therefore we validate is separately without passing any
			* formats.
			*
			* Otherwise we parse the date with formats
			*/
			if (isTimestampAllowed && !Number.isNaN(valueAsNumber)) dateTime = dayjs(valueAsNumber);
			else dateTime = dayjs(value, formats, true);
			/**
			* If datetime is invalid and the ISO format is allowed,
			* then we reattempt to parse the date without formats
			*/
			if (!dateTime.isValid() && isISOAllowed) dateTime = dayjs(value);
			return {
				dateTime,
				formats
			};
		},
		/**
		* Compares two values with intelligent type coercion.
		* The input value is cast to match the type of the expected value
		* for HTML form-friendly comparisons.
		*
		* @param inputValue - The input value to compare
		* @param expectedValue - The expected value to compare against
		* @returns Object with comparison result and the casted input value
		*
		* @example
		* // Number comparison
		* helpers.compareValues('42', 42)
		* // { isEqual: true, casted: 42 }
		*
		* // Boolean comparison
		* helpers.compareValues('true', true)
		* // { isEqual: true, casted: true }
		*
		* // String comparison (no casting)
		* helpers.compareValues('hello', 'world')
		* // { isEqual: false, casted: 'hello' }
		*/
		compareValues(inputValue, expectedValue) {
			let input = inputValue;
			/**
			* Normalize the field value based on the expected value type
			*/
			if (typeof expectedValue === "boolean") input = this.asBoolean(inputValue);
			else if (typeof expectedValue === "number") input = this.asNumber(inputValue);
			/**
			* Perform comparison and return results
			*/
			return {
				isEqual: input === expectedValue,
				casted: input
			};
		},
		/** Validates email addresses using comprehensive rules */
		isEmail: isEmail.default,
		/** Validates URLs with protocol and domain checking */
		isURL: isURL.default,
		/** Validates alphabetic characters only */
		isAlpha: isAlpha.default,
		/** Validates alphanumeric characters only */
		isAlphaNumeric: isAlphanumeric.default,
		/** Validates IP addresses (IPv4 and IPv6) */
		isIP: isIP.default,
		/** Validates UUID strings in various formats */
		isUUID: isUUID.default,
		/** Validates ASCII character strings */
		isAscii: isAscii.default,
		/** Validates credit card numbers using Luhn algorithm */
		isCreditCard: isCreditCard.default,
		/** Validates International Bank Account Numbers */
		isIBAN: isIBAN.default,
		/** Validates JSON Web Tokens */
		isJWT: isJWT.default,
		/** Validates latitude/longitude coordinate pairs */
		isLatLong: isLatLong.default,
		/** Validates mobile phone numbers for various locales */
		isMobilePhone: isMobilePhone.default,
		/** Validates passport numbers for supported countries */
		isPassportNumber: isPassportNumber.default,
		/** Validates VAT numbers for supported countries */
		isVAT: isVAT.default,
		/** Validates postal codes for various countries */
		isPostalCode: isPostalCode.default,
		/** Validates URL slugs (lowercase, hyphenated strings) */
		isSlug: isSlug.default,
		/** Validates decimal numbers */
		isDecimal: isDecimal.default,
		/** Array of supported mobile phone locales/countries */
		mobileLocales: isMobilePhoneExports.locales,
		/** Array of supported postal code country codes */
		postalCountryCodes: isPostalCodeExports.locales,
		/** Array of supported passport country codes */
		passportCountryCodes: [
			"AM",
			"AR",
			"AT",
			"AU",
			"AZ",
			"BE",
			"BG",
			"BR",
			"BY",
			"CA",
			"CH",
			"CY",
			"CZ",
			"DE",
			"DK",
			"DZ",
			"ES",
			"FI",
			"FR",
			"GB",
			"GR",
			"HR",
			"HU",
			"IE",
			"IN",
			"ID",
			"IR",
			"IS",
			"IT",
			"JM",
			"JP",
			"KR",
			"KZ",
			"LI",
			"LT",
			"LU",
			"LV",
			"LY",
			"MT",
			"MZ",
			"MY",
			"MX",
			"NL",
			"NZ",
			"PH",
			"PK",
			"PL",
			"PT",
			"RO",
			"RU",
			"SE",
			"SL",
			"SK",
			"TH",
			"TR",
			"UA",
			"US"
		],
		/**
		* Validates if a value is a valid ULID (Universally Unique Lexicographically Sortable Identifier).
		* ULIDs are 26-character strings that are lexicographically sortable and URL-safe.
		*
		* @param value - The value to validate
		* @returns True if value is a valid ULID
		*
		* @example
		* helpers.isULID('01ARZ3NDEKTSV4RRFFQ69G5FAV') // true
		* helpers.isULID('invalid-ulid') // false
		* helpers.isULID('7ZZZZZZZZZZZZZZZZZZZZZZZZZ') // true (max valid ULID)
		* helpers.isULID('8AAAAAAAAAAAAAAAAAAAAAAAAA') // false (overflow)
		*/
		isULID(value) {
			if (typeof value !== "string") return false;
			if (value[0] > "7") return false;
			return ULID.test(value);
		},
		/**
		* Validates if a value is a valid hexadecimal color code.
		* Requires the '#' prefix and supports 3, 6, or 8 character hex codes.
		*
		* @param value - The string to validate as a hex color
		* @returns True if value is a valid hex color code
		*
		* @example
		* helpers.isHexColor('#FF0000') // true (red)
		* helpers.isHexColor('#f00') // true (short red)
		* helpers.isHexColor('#FF000080') // true (red with alpha)
		* helpers.isHexColor('FF0000') // false (missing #)
		* helpers.isHexColor('#GGGGGG') // false (invalid hex)
		*/
		isHexColor: (value) => {
			if (!value.startsWith("#")) return false;
			return isHexColor.default(value);
		},
		/**
		* Validates if a URL has valid DNS records (A or AAAA records).
		* This performs an actual DNS lookup to verify the domain exists.
		*
		* @param url - The URL to check for DNS records
		* @returns Promise resolving to true if DNS records exist
		*
		* @example
		* await helpers.isActiveURL('https://example.com') // true
		* await helpers.isActiveURL('https://nonexistent-domain-12345.com') // false
		*
		* This function requires network access and may be slow.
		* Consider caching results for better performance.
		*/
		isActiveURL: async (url) => {
			const { resolve4, resolve6 } = await import('node:dns/promises');
			try {
				const { hostname } = new URL(url);
				if ((await resolve6(hostname)).length) return true;
				else return (await resolve4(hostname)).length > 0;
			} catch {
				return false;
			}
		},
		/**
		* Checks if all elements in an array are unique.
		* For arrays of objects, you can specify one or more fields that must be unique.
		* Null and undefined values are ignored during uniqueness checks.
		*
		* @param dataSet - The array to check for uniqueness
		* @param fields - Optional field name(s) to check for uniqueness in object arrays
		*
		* @example
		* // Check uniqueness in primitive array
		* helpers.isDistinct([1, 2, 4, 5]) // true
		* helpers.isDistinct([1, 2, 2, 5]) // false
		*
		* @example
		* // Null and undefined values are ignored
		* helpers.isDistinct([1, null, 2, null, 4, 5]) // true
		*
		* @example
		* // Check uniqueness by single field in object array
		* helpers.isDistinct([
		*   { email: 'foo@bar.com', name: 'foo' },
		*   { email: 'baz@bar.com', name: 'baz' }
		* ], 'email') // true
		*
		* @example
		* // Check uniqueness by multiple fields (composite key)
		* helpers.isDistinct([
		*   { email: 'foo@bar.com', tenant_id: 1, name: 'foo' },
		*   { email: 'foo@bar.com', tenant_id: 2, name: 'baz' }
		* ], ['email', 'tenant_id']) // true (same email, different tenant)
		*/
		isDistinct: (dataSet, fields) => {
			const uniqueItems = /* @__PURE__ */ new Set();
			/**
			* Check for duplicates when no fields are provided
			*/
			if (!fields) {
				for (let item of dataSet) if (helpers.exists(item)) if (uniqueItems.has(item)) return false;
				else uniqueItems.add(item);
				return true;
			}
			/**
			* Checking for duplicates when one or more fields are mentioned
			*/
			const fieldsList = Array.isArray(fields) ? fields : [fields];
			for (let item of dataSet)
	 /**
			* Only process item, if it is an object and has all the fields
			* required for uniqueness check
			*/
			if (helpers.isObject(item) && helpers.hasKeys(item, fieldsList)) {
				const element = fieldsList.map((field) => item[field]).join("_");
				if (uniqueItems.has(element)) return false;
				else uniqueItems.add(element);
			}
			return true;
		},
		/**
		* Retrieves a nested value from the validation context.
		* Supports both dot notation for deep access and direct parent access.
		*
		* @param key - The key or dot-notation path to the value
		* @param field - The field context containing data and parent references
		* @returns The value at the specified path, or undefined if not found
		*
		* @example
		* // Dot notation for nested access
		* helpers.getNestedValue('user.profile.name', field)
		*
		* // Direct parent access
		* helpers.getNestedValue('confirmPassword', field)
		*
		* // Deep object access
		* helpers.getNestedValue('config.database.host', field)
		*/
		getNestedValue(key, field) {
			if (key.indexOf(".") > -1) return delve(field.data, key);
			return field.parent[key];
		},
		/**
		* Converts all properties of an object schema to optional.
		* This is useful when you want to make all fields in a schema optional
		* at once, such as for update operations where all fields are optional.
		*
		* @param props - The object with schema properties
		*
		* @example
		* const createUserSchema = {
		*   name: vine.string(),
		*   email: vine.string().email(),
		*   age: vine.number()
		* }
		*
		* // Make all fields optional for updates
		* const updateUserSchema = helpers.optional(createUserSchema)
		*/
		optional(props) {
			const result = {};
			for (const name of Object.keys(props)) {
				let field = props[name].clone();
				if ("optional" in field && typeof field.optional === "function") field = field.optional();
				result[name] = field;
			}
			return result;
		}
	};
	//#endregion
	//#region src/messages_provider/simple_messages_provider.ts
	/**
	* Default messages provider that performs message lookup using key-value pairs.
	* Provides internationalization and custom error message support for validation.
	* Supports field-specific messages, wildcard patterns, and placeholder interpolation.
	*
	* @example
	* const provider = new SimpleMessagesProvider({
	*   'required': 'The {{ field }} field is required',
	*   'email': 'The {{ field }} field must be a valid email',
	*   'user.email.required': 'Email address is required'
	* }, {
	*   'user.email': 'Email Address'
	* })
	*/
	var SimpleMessagesProvider = class {
		/** Collection of validation error message templates */
		#messages;
		/** Mapping of field paths to human-readable field names */
		#fields;
		/**
		* Creates a new SimpleMessagesProvider instance.
		*
		* @param messages - Map of validation rule names to error message templates
		* @param fields - Optional map of field paths to human-readable names
		*
		* @example
		* new SimpleMessagesProvider({
		*   'required': 'The {{ field }} field is required'
		* }, {
		*   'user_name': 'Username'
		* })
		*/
		constructor(messages, fields) {
			this.#messages = messages;
			this.#fields = fields || {};
		}
		/**
		* Interpolates placeholders within error messages using mustache-like syntax.
		* Supports nested property access using dot notation.
		*
		* @param message - The message template with placeholders
		* @param data - Data object containing values for interpolation
		* @returns Interpolated message string
		*
		* @example
		* interpolate('The {{ field }} must be at least {{ min }} characters', {
		*   field: 'username',
		*   min: 5
		* })
		* // Returns: "The username must be at least 5 characters"
		*/
		#interpolate(message, data) {
			if (!message.includes("{{")) return message;
			return message.replace(/(\\)?{{(.*?)}}/g, (_, __, key) => {
				const tokens = key.trim().split(".");
				let output = data;
				while (tokens.length) {
					if (output === null || typeof output !== "object") return;
					const token = tokens.shift();
					output = Object.hasOwn(output, token) ? output[token] : void 0;
				}
				return output;
			});
		}
		/**
		* Returns a validation error message for a given field and rule.
		* Uses a priority-based lookup system to find the most specific message.
		*
		* Priority order:
		* 1. Field-specific messages (e.g., 'user.email.required')
		* 2. Wildcard path messages (e.g., '*.email.required')
		* 3. Generic rule messages (e.g., 'required')
		* 4. Fallback to raw message
		*
		* @param rawMessage - The default raw message from the validation rule
		* @param rule - The name of the validation rule that failed
		* @param field - Context information about the field being validated
		* @param args - Additional arguments to interpolate into the message
		* @returns Formatted and interpolated error message
		*
		* @example
		* // With field-specific message
		* provider.getMessage('Required', 'required', fieldContext, {})
		* // Returns: "Email address is required" (if field-specific message exists)
		*
		* // With rule arguments
		* provider.getMessage('Min length', 'minLength', fieldContext, { min: 5 })
		* // Returns: "The username must be at least 5 characters"
		*/
		getMessage(rawMessage, rule, field, args) {
			const fieldName = this.#fields[field.getFieldPath()] || this.#fields[field.name] || field.name;
			/**
			* 1st priority: Field-specific messages (highest specificity)
			* Example: 'user.email.required'
			*/
			const fieldMessage = this.#messages[`${field.getFieldPath()}.${rule}`];
			if (fieldMessage) return this.#interpolate(fieldMessage, {
				field: fieldName,
				...args
			});
			/**
			* 2nd priority: Wildcard path messages (medium specificity)
			* Example: '*.email.required'
			*/
			const wildcardMessage = this.#messages[`${field.wildCardPath}.${rule}`];
			if (wildcardMessage) return this.#interpolate(wildcardMessage, {
				field: fieldName,
				...args
			});
			/**
			* 3rd priority: Generic rule messages (low specificity)
			* Example: 'required'
			*/
			const ruleMessage = this.#messages[rule];
			if (ruleMessage) return this.#interpolate(ruleMessage, {
				field: fieldName,
				...args
			});
			/**
			* Fallback: Use the raw message provided by the validation rule
			*/
			return this.#interpolate(rawMessage, {
				field: fieldName,
				...args
			});
		}
		/**
		* Serializes the messages provider to a JSON-compatible object.
		* Useful for debugging, logging, or transferring configuration.
		*
		* @returns Object containing messages and field mappings
		*
		* @example
		* const config = provider.toJSON()
		* console.log(config)
		* // { messages: { required: "..." }, fields: { user_name: "Username" } }
		*/
		toJSON() {
			return {
				messages: this.#messages,
				fields: this.#fields
			};
		}
	};
	//#endregion
	//#region src/errors/validation_error.ts
	/**
	* ValidationError is a specialized Error class that represents validation
	* failures. It contains structured error messages and HTTP status information
	* for easy integration with web frameworks.
	*
	* @example
	* try {
	*   await vine.validate({ schema, data })
	* } catch (error) {
	*   if (error instanceof ValidationError) {
	*     console.log(error.messages) // Structured validation errors
	*     console.log(error.status)   // HTTP 422
	*   }
	* }
	*/
	var ValidationError = class extends Error {
		/**
		* HTTP status code for the validation error (422 Unprocessable Entity)
		*/
		status = 422;
		/**
		* Internal error code for programmatic error handling
		*/
		code = "E_VALIDATION_ERROR";
		/**
		* Creates a new ValidationError with structured error messages.
		*
		* @param messages - Structured validation error messages
		* @param options - Optional error options for the base Error class
		*/
		constructor(messages, options) {
			super("Validation failure", options);
			this.messages = messages;
			const ErrorConstructor = this.constructor;
			if ("captureStackTrace" in Error) Error.captureStackTrace(this, ErrorConstructor);
		}
		/**
		* Returns the string tag for this object type.
		*
		* @returns The constructor name of this error
		*/
		get [Symbol.toStringTag]() {
			return this.constructor.name;
		}
		/**
		* Returns a string representation of the validation error.
		*
		* @returns Formatted error string with name, code, and message
		*/
		toString() {
			return `${this.name} [${this.code}]: ${this.message}`;
		}
	};
	/**
	* Factory constant for creating ValidationError instances.
	* This is the main export for creating validation errors in the Vine validation library.
	*
	* @example
	* throw new E_VALIDATION_ERROR(errors)
	*
	* @example
	* const error = new E_VALIDATION_ERROR({
	*   field: 'username',
	*   message: 'Username is required'
	* })
	*/
	const E_VALIDATION_ERROR = ValidationError;
	//#endregion
	//#region src/reporters/simple_error_reporter.ts
	/**
	* SimpleErrorReporter collects validation error messages as an array of objects.
	* It's the default error reporter used by Vine and provides a simple, structured
	* format for validation errors.
	*
	* Each error object contains:
	* - message: Human-readable error message
	* - field: The field path where validation failed
	* - rule: The validation rule that failed
	* - index: Array index (for array element errors)
	* - meta: Additional error metadata
	*
	* @example
	* const reporter = new SimpleErrorReporter()
	* // After validation errors are reported:
	* console.log(reporter.errors)
	* // [{ message: "Required", field: "email", rule: "required" }]
	*/
	var SimpleErrorReporter = class {
		/**
		* Flag indicating whether any validation errors have been reported
		*/
		hasErrors = false;
		/**
		* Collection of all reported validation errors
		*/
		errors = [];
		/**
		* Report a validation error by adding it to the errors collection.
		*
		* @param message - The human-readable error message
		* @param rule - The name of the validation rule that failed
		* @param field - The field context containing field path and metadata
		* @param meta - Optional additional metadata about the error
		*/
		report(message, rule, field, meta) {
			const error = {
				message,
				rule,
				field: field.getFieldPath()
			};
			if (meta) error.meta = meta;
			if (field.isArrayMember) error.index = field.name;
			this.hasErrors = true;
			this.errors.push(error);
		}
		/**
		* Creates and returns a ValidationError instance containing all reported errors.
		* This method is called by the validation engine when validation fails.
		*
		* @returns A ValidationError containing all collected error messages
		*/
		createError() {
			return new E_VALIDATION_ERROR(this.errors);
		}
	};

	//#region src/defaults.ts
	/**
	* Default error message templates used throughout the Vine validation library.
	* These messages support mustache-style interpolation for dynamic values like field names,
	* expected values, and validation parameters.
	*
	* Message templates use {{ }} syntax for variable interpolation:
	* - {{ field }} - The field name or custom field label
	* - {{ min }}, {{ max }} - Numeric constraints
	* - {{ expectedValue }} - Expected literal values
	* - {{ otherField }} - Related field names for comparisons
	*
	* @example
	* // Basic usage
	* 'The {{ field }} field is required' // → 'The username field is required'
	*
	* // With custom field names
	* fields = { 'user.email': 'Email Address' }
	* messages = { 'required': 'The {{ field }} is required' }
	* // → 'The Email Address is required'
	*
	* // With validation parameters
	* 'The {{ field }} must be at least {{ min }} characters'
	* // → 'The password must be at least 8 characters'
	*/
	const messages = {
		"required": "The {{ field }} field must be defined",
		"string": "The {{ field }} field must be a string",
		"email": "The {{ field }} field must be a valid email address",
		"mobile": "The {{ field }} field must be a valid mobile phone number",
		"creditCard": "The {{ field }} field must be a valid {{ providersList }} card number",
		"passport": "The {{ field }} field must be a valid passport number",
		"postalCode": "The {{ field }} field must be a valid postal code",
		"regex": "The {{ field }} field format is invalid",
		"ascii": "The {{ field }} field must only contain ASCII characters",
		"iban": "The {{ field }} field must be a valid IBAN number",
		"jwt": "The {{ field }} field must be a valid JWT token",
		"coordinates": "The {{ field }} field must contain latitude and longitude coordinates",
		"url": "The {{ field }} field must be a valid URL",
		"activeUrl": "The {{ field }} field must be a valid URL",
		"alpha": "The {{ field }} field must contain only letters",
		"alphaNumeric": "The {{ field }} field must contain only letters and numbers",
		"minLength": "The {{ field }} field must have at least {{ min }} characters",
		"maxLength": "The {{ field }} field must not be greater than {{ max }} characters",
		"fixedLength": "The {{ field }} field must be {{ size }} characters long",
		"confirmed": "The {{ originalField }} field and {{ otherField }} field must be the same",
		"endsWith": "The {{ field }} field must end with {{ substring }}",
		"startsWith": "The {{ field }} field must start with {{ substring }}",
		"sameAs": "The {{ field }} field and {{ otherField }} field must be the same",
		"notSameAs": "The {{ field }} field and {{ otherField }} field must be different",
		"in": "The selected {{ field }} is invalid",
		"notIn": "The selected {{ field }} is invalid",
		"ipAddress": "The {{ field }} field must be a valid IP address",
		"vat": "The {{ field }} field must be a valid VAT number",
		"uuid": "The {{ field }} field must be a valid UUID",
		"ulid": "The {{ field }} field must be a valid ULID",
		"hexCode": "The {{ field }} field must be a valid hex color code",
		"boolean": "The value must be a boolean",
		"number": "The {{ field }} field must be a number",
		"number.in": "The selected {{ field }} is not in {{ values }}",
		"min": "The {{ field }} field must be at least {{ min }}",
		"max": "The {{ field }} field must not be greater than {{ max }}",
		"range": "The {{ field }} field must be between {{ min }} and {{ max }}",
		"positive": "The {{ field }} field must be positive",
		"negative": "The {{ field }} field must be negative",
		"nonNegative": "The {{ field }} field must be positive or zero",
		"nonPositive": "The {{ field }} field must be negative or zero",
		"decimal": "The {{ field }} field must have {{ digits }} decimal places",
		"withoutDecimals": "The {{ field }} field must be an integer",
		"accepted": "The {{ field }} field must be accepted",
		"enum": "The selected {{ field }} is invalid",
		"literal": "The {{ field }} field must be {{ expectedValue }}",
		"object": "The {{ field }} field must be an object",
		"array": "The {{ field }} field must be an array",
		"array.minLength": "The {{ field }} field must have at least {{ min }} items",
		"array.maxLength": "The {{ field }} field must not have more than {{ max }} items",
		"array.fixedLength": "The {{ field }} field must contain {{ size }} items",
		"notEmpty": "The {{ field }} field must not be empty",
		"distinct": "The {{ field }} field has duplicate values",
		"record": "The {{ field }} field must be an object",
		"record.minLength": "The {{ field }} field must have at least {{ min }} items",
		"record.maxLength": "The {{ field }} field must not have more than {{ max }} items",
		"record.fixedLength": "The {{ field }} field must contain {{ size }} items",
		"tuple": "The {{ field }} field must be an array",
		"union": "Invalid value provided for {{ field }} field",
		"unionGroup": "Invalid value provided for {{ field }} field",
		"unionOfTypes": "Invalid value provided for {{ field }} field",
		"date": "The {{ field }} field must be a datetime value",
		"date.equals": "The {{ field }} field must be a date equal to {{ expectedValue }}",
		"date.after": "The {{ field }} field must be a date after {{ expectedValue }}",
		"date.before": "The {{ field }} field must be a date before {{ expectedValue }}",
		"date.afterOrEqual": "The {{ field }} field must be a date after or equal to {{ expectedValue }}",
		"date.beforeOrEqual": "The {{ field }} field must be a date before or equal to {{ expectedValue }}",
		"date.sameAs": "The {{ field }} field and {{ otherField }} field must be the same",
		"date.notSameAs": "The {{ field }} field and {{ otherField }} field must be different",
		"date.afterField": "The {{ field }} field must be a date after {{ otherField }}",
		"date.afterOrSameAs": "The {{ field }} field must be a date after or same as {{ otherField }}",
		"date.beforeField": "The {{ field }} field must be a date before {{ otherField }}",
		"date.beforeOrSameAs": "The {{ field }} field must be a date before or same as {{ otherField }}",
		"date.weekend": "The {{ field }} field is not a weekend",
		"date.weekday": "The {{ field }} field is not a weekday",
		"nativeFile": "The {{ field }} field must be a valid file",
		"nativeFile.minSize": "The {{ field }} field must be at least {{ min }} bytes in size",
		"nativeFile.maxSize": "The {{ field }} field must not exceed {{ max }} bytes in size",
		"nativeFile.mimeTypes": "The {{ field }} mime type is invalid"
	};
	/**
	* Default field name mappings for error message formatting.
	* Maps field paths to human-readable labels that appear in error messages.
	*
	* The empty string key ('') provides a fallback name for the root data object.
	*
	* @example
	* // Custom field mappings
	* const customFields = {
	*   'user.email': 'Email Address',
	*   'user.firstName': 'First Name',
	*   'user.lastName': 'Last Name',
	*   'billing.address': 'Billing Address'
	* }
	*
	* // Field paths use dot notation for nested objects
	* 'user.profile.bio' → 'Biography'
	* 'settings.notifications.email' → 'Email Notifications'
	*/
	const fields = { 
	/** Default name for the root data object */
	"": "data" };
	/**
	* Global transformation registry for schema types.
	* Allows registering global transforms that automatically apply to all schema instances of a given type.
	*
	* Currently supports:
	* - `date`: Transform all Date values after validation
	*
	* The transform function receives the validated value and returns a transformed version.
	* Type inference automatically updates the output type based on the transform return type.
	*
	* @example
	* // Transform all dates to ISO strings
	* globalTransforms.date = (value) => value.toISOString()
	*
	* @example
	* // Transform all dates to timestamps
	* globalTransforms.date = (value) => value.getTime()
	*/
	const globalTransforms = {};

	// index.ts
	var Macroable = class {
	  /**
	   * Set of instance properties that will be added to each instance during construction.
	   * Each entry contains a key and value pair representing the property name and its value.
	   */
	  static instanceMacros = /* @__PURE__ */ new Set();
	  /**
	   * Adds a macro (property or method) to the class prototype.
	   * Macros are standard properties that get added to the class prototype,
	   * making them available on all instances of the class.
	   *
	   * @param name - The name of the property or method to add
	   * @param value - The value to assign to the property or method
	   *
	   * @example
	   * ```ts
	   * // Add a property macro
	   * MyClass.macro('version', '1.0.0')
	   *
	   * // Add a method macro
	   * MyClass.macro('greet', function() {
	   *   return 'Hello!'
	   * })
	   *
	   * const instance = new MyClass()
	   * instance.version // "1.0.0"
	   * instance.greet() // "Hello!"
	   * ```
	   */
	  static macro(name, value) {
	    this.prototype[name] = value;
	  }
	  /**
	   * Adds an instance property that will be assigned to each instance during construction.
	   * Unlike macros which are added to the prototype, instance properties are unique to each instance.
	   *
	   * @param name - The name of the property to add to instances
	   * @param value - The value to assign to the property on each instance
	   *
	   * @example
	   * ```ts
	   * // Add an instance method
	   * MyClass.instanceProperty('save', function() {
	   *   console.log('Saving...', this.id)
	   * })
	   *
	   * const { save } = new MyClass()
	   * save()
	   * ```
	   */
	  static instanceProperty(name, value) {
	    const self = this;
	    if (!self.hasOwnProperty("instanceMacros")) {
	      const inheritedProperties = self.instanceMacros;
	      Object.defineProperty(self, "instanceMacros", {
	        value: new Set(inheritedProperties),
	        configurable: true,
	        enumerable: true,
	        writable: true
	      });
	    }
	    self.instanceMacros.add({ key: name, value });
	  }
	  /**
	   * Adds a getter property to the class prototype using Object.defineProperty.
	   * Getters are computed properties that are evaluated each time they are accessed,
	   * unless the singleton flag is enabled.
	   *
	   * @param name - The name of the getter property
	   * @param accumulator - Function that computes and returns the property value
	   * @param singleton - If true, the getter value is cached after first access
	   *
	   * @example
	   * ```ts
	   * // Add a regular getter
	   * MyClass.getter('timestamp', function() {
	   *   return Date.now()
	   * })
	   *
	   * // Add a singleton getter (cached after first access)
	   * MyClass.getter('config', function() {
	   *   return loadConfig()
	   * }, true)
	   *
	   * const instance = new MyClass()
	   * instance.timestamp // Computed each time
	   * instance.config // Computed once, then cached
	   * ```
	   */
	  static getter(name, accumulator, singleton = false) {
	    Object.defineProperty(this.prototype, name, {
	      get() {
	        const value = accumulator.call(this);
	        if (singleton) {
	          Object.defineProperty(this, name, {
	            configurable: false,
	            enumerable: false,
	            value,
	            writable: false
	          });
	        }
	        return value;
	      },
	      configurable: true,
	      enumerable: false
	    });
	  }
	  /**
	   * Constructor that applies all registered instance properties to the new instance.
	   * This method iterates through the instanceMacros set and assigns each property
	   * to the instance, binding functions to the instance context.
	   */
	  constructor() {
	    const self = this;
	    const Constructor = this.constructor;
	    Constructor.instanceMacros.forEach(({ key, value }) => {
	      if (typeof value === "function") {
	        const boundFn = value.bind(this);
	        for (const prop of Object.keys(value)) {
	          const propValue = value[prop];
	          if (typeof value === "function") {
	            boundFn[prop] = propValue.bind(this);
	          } else {
	            boundFn[prop] = propValue;
	          }
	        }
	        self[key] = boundFn;
	      } else {
	        self[key] = value;
	      }
	    });
	  }
	};

	const UPPERCASE = /[\p{Lu}]/u;
	const LOWERCASE = /[\p{Ll}]/u;
	const LEADING_CAPITAL = /^[\p{Lu}](?![\p{Lu}])/u;
	const SEPARATORS = /[_.\- ]+/;

	// The |$ alternative allows matching at end-of-string, capturing empty string
	// This enables NUMBERS_AND_IDENTIFIER to match digits at string end (e.g., "test123")
	const IDENTIFIER = /([\p{Alpha}\p{N}_]|$)/u;

	const LEADING_SEPARATORS = new RegExp('^' + SEPARATORS.source);
	const SEPARATORS_AND_IDENTIFIER = new RegExp(SEPARATORS.source + IDENTIFIER.source, 'gu');
	const NUMBERS_AND_IDENTIFIER = new RegExp(String.raw`\d+` + IDENTIFIER.source, 'gu');

	const preserveCamelCase = (string, toLowerCase, toUpperCase, preserveConsecutiveUppercase) => {
		let isLastCharLower = false;
		let isLastCharUpper = false;
		let isLastLastCharUpper = false;
		let isLastLastCharPreserved = false;

		for (let index = 0; index < string.length; index++) {
			const character = string[index];

			// Was the character 3 positions back inserted as a separator?
			// Prevents excessive separators by checking if we recently inserted one
			// index - 3 accounts for: current character, inserted separator, previous character
			// Default true for early positions activates the preserveConsecutiveUppercase guard
			isLastLastCharPreserved = index > 2 ? string[index - 3] === '-' : true;

			if (isLastCharLower && UPPERCASE.test(character)) {
				// FooBar → Foo-Bar (insert separator before uppercase)
				string = string.slice(0, index) + '-' + string.slice(index);
				isLastCharLower = false;
				isLastLastCharUpper = isLastCharUpper;
				isLastCharUpper = true;
				index++;
			} else if (
				isLastCharUpper
				&& isLastLastCharUpper
				&& LOWERCASE.test(character)
				&& (!isLastLastCharPreserved || preserveConsecutiveUppercase)
			) {
				// FOOBar → FOO-Bar
				string = string.slice(0, index - 1) + '-' + string.slice(index - 1);
				isLastLastCharUpper = isLastCharUpper;
				isLastCharUpper = false;
				isLastCharLower = true;
			} else {
				isLastCharLower
					= toLowerCase(character) === character
						&& toUpperCase(character) !== character;
				isLastLastCharUpper = isLastCharUpper;
				isLastCharUpper
					= toUpperCase(character) === character
						&& toLowerCase(character) !== character;
			}
		}

		return string;
	};

	const preserveConsecutiveUppercase = (input, toLowerCase) => input.replace(LEADING_CAPITAL, match => toLowerCase(match));

	const processWithCasePreservation = (input, toLowerCase, preserveConsecutiveUppercase) => {
		let result = '';
		let previousWasNumber = false;
		let previousWasUppercase = false;

		// Convert input to array for lookahead capability
		const characters = [...input];

		for (let index = 0; index < characters.length; index++) {
			const character = characters[index];
			const isUpperCase = UPPERCASE.test(character);
			const nextCharIsUpperCase = index + 1 < characters.length && UPPERCASE.test(characters[index + 1]);

			if (previousWasNumber && /[\p{Alpha}]/u.test(character)) {
				// Letter after number - preserve original case
				result += character;
				previousWasNumber = false;
				previousWasUppercase = isUpperCase;
			} else if (preserveConsecutiveUppercase && isUpperCase && (previousWasUppercase || nextCharIsUpperCase)) {
				// Part of consecutive uppercase sequence when preserveConsecutiveUppercase is true - keep it
				result += character;
				previousWasUppercase = true;
			} else if (/\d/.test(character)) {
				// Number - keep as-is and track it
				result += character;
				previousWasNumber = true;
				previousWasUppercase = false;
			} else if (SEPARATORS.test(character)) {
				// Separator - keep as-is and maintain previousWasNumber state
				result += character;
				previousWasUppercase = false;
			} else {
				// Regular character - lowercase it
				result += toLowerCase(character);
				previousWasNumber = false;
				previousWasUppercase = false;
			}
		}

		return result;
	};

	/**
	Core post-processing:
	- Collapses separators and uppercases the following identifier character.
	- Optionally uppercases the identifier following a numeric sequence.

	Two-pass strategy prevents conflicts:
	1. NUMBERS_AND_IDENTIFIER: handles digit-to-letter transitions
	2. SEPARATORS_AND_IDENTIFIER: handles separator-to-identifier transitions

	Example: "b2b_registration" with capitalizeAfterNumber: true
	- Pass 1: "2b" matches, next char is "_" (separator), so don't capitalize → "b2b_registration"
	- Pass 2: "_r" matches, replace with "R" → "b2bRegistration"
	*/
	const postProcess = (input, toUpperCase, {capitalizeAfterNumber}) => {
		const transformNumericIdentifier = capitalizeAfterNumber
			? (match, identifier, offset, string) => {
				const nextCharacter = string.charAt(offset + match.length);

				// If the numeric+identifier run is immediately followed by a separator,
				// treat it as a continued token and do not force a new word.
				if (SEPARATORS.test(nextCharacter)) {
					return match;
				}

				// Only uppercase the identifier part (not the digits) for efficiency
				return identifier ? match.slice(0, -identifier.length) + toUpperCase(identifier) : match;
			}
			// When false: numbers do not create a word boundary.
			: match => match;

		return input
			.replaceAll(NUMBERS_AND_IDENTIFIER, transformNumericIdentifier)
			.replaceAll(
				SEPARATORS_AND_IDENTIFIER,
				(_, identifier) => toUpperCase(identifier),
			);
	};

	function camelCase(input, options) {
		if (!(typeof input === 'string' || Array.isArray(input))) {
			throw new TypeError('Expected the input to be `string | string[]`');
		}

		options = {
			pascalCase: false,
			preserveConsecutiveUppercase: false,
			capitalizeAfterNumber: true,
			...options,
		};

		if (Array.isArray(input)) {
			input = input
				.map(element => element.trim())
				.filter(element => element.length > 0)
				.join('-');
		} else {
			input = input.trim();
		}

		if (input.length === 0) {
			return '';
		}

		// Preserve leading _ and $ as they have semantic meaning
		const leadingPrefix = input.match(/^[_$]*/)[0];
		input = input.slice(leadingPrefix.length);

		if (input.length === 0) {
			return leadingPrefix;
		}

		const toLowerCase = options.locale === false
			? string => string.toLowerCase()
			: string => string.toLocaleLowerCase(options.locale);

		const toUpperCase = options.locale === false
			? string => string.toUpperCase()
			: string => string.toLocaleUpperCase(options.locale);

		if (input.length === 1) {
			if (SEPARATORS.test(input)) {
				return leadingPrefix;
			}

			return leadingPrefix + (options.pascalCase
				? toUpperCase(input)
				: toLowerCase(input));
		}

		const hasUpperCase = input !== toLowerCase(input);

		if (hasUpperCase) {
			input = preserveCamelCase(
				input,
				toLowerCase,
				toUpperCase,
				options.preserveConsecutiveUppercase,
			);
		}

		// Strip leading separators eagerly so they do not affect word detection
		input = input.replace(LEADING_SEPARATORS, '');

		// Normalize base casing while preserving intended consecutive uppers
		if (options.capitalizeAfterNumber) {
			// Standard behavior - lowercase everything (or preserve consecutive uppercase)
			input = options.preserveConsecutiveUppercase
				? preserveConsecutiveUppercase(input, toLowerCase)
				: toLowerCase(input);
		} else {
			// Preserve case after numbers (processWithCasePreservation handles preserveConsecutiveUppercase internally)
			input = processWithCasePreservation(input, toLowerCase, options.preserveConsecutiveUppercase);
		}

		if (options.pascalCase && input.length > 0) {
			input = toUpperCase(input[0]) + input.slice(1);
		}

		return leadingPrefix + postProcess(input, toUpperCase, options);
	}

	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
	const DATA_URL_DEFAULT_MIME_TYPE = 'text/plain';
	const DATA_URL_DEFAULT_CHARSET = 'us-ascii';

	const testParameter = (name, filters) => filters.some(filter => filter instanceof RegExp ? filter.test(name) : filter === name);

	const supportedProtocols = new Set([
		'https:',
		'http:',
		'file:',
	]);

	const hasCustomProtocol = urlString => {
		try {
			const {protocol} = new URL(urlString);

			return protocol.endsWith(':')
				&& !protocol.includes('.')
				&& !supportedProtocols.has(protocol);
		} catch {
			return false;
		}
	};

	const normalizeDataURL = (urlString, {stripHash}) => {
		const match = /^data:(?<type>[^,]*?),(?<data>[^#]*?)(?:#(?<hash>.*))?$/.exec(urlString);

		if (!match) {
			throw new Error(`Invalid URL: ${urlString}`);
		}

		const {type, data, hash} = match.groups;
		const mediaType = type.split(';');

		const isBase64 = mediaType.at(-1) === 'base64';
		if (isBase64) {
			mediaType.pop();
		}

		// Lowercase MIME type
		const mimeType = mediaType.shift()?.toLowerCase() ?? '';
		const attributes = mediaType
			.map(attribute => {
				let [key, value = ''] = attribute.split('=').map(string => string.trim());

				// Lowercase `charset`
				if (key === 'charset') {
					value = value.toLowerCase();

					if (value === DATA_URL_DEFAULT_CHARSET) {
						return '';
					}
				}

				return `${key}${value ? `=${value}` : ''}`;
			})
			.filter(Boolean);

		const normalizedMediaType = [...attributes];

		if (isBase64) {
			normalizedMediaType.push('base64');
		}

		if (normalizedMediaType.length > 0 || (mimeType && mimeType !== DATA_URL_DEFAULT_MIME_TYPE)) {
			normalizedMediaType.unshift(mimeType);
		}

		const hashPart = stripHash || !hash ? '' : `#${hash}`;
		return `data:${normalizedMediaType.join(';')},${isBase64 ? data.trim() : data}${hashPart}`;
	};

	function normalizeUrl(urlString, options) {
		options = {
			defaultProtocol: 'http',
			normalizeProtocol: true,
			forceHttp: false,
			forceHttps: false,
			stripAuthentication: true,
			stripHash: false,
			stripTextFragment: true,
			stripWWW: true,
			removeQueryParameters: [/^utm_\w+/i],
			removeTrailingSlash: true,
			removeSingleSlash: true,
			removeDirectoryIndex: false,
			removeExplicitPort: false,
			sortQueryParameters: true,
			removePath: false,
			transformPath: false,
			...options,
		};

		// Legacy: Append `:` to the protocol if missing.
		if (typeof options.defaultProtocol === 'string' && !options.defaultProtocol.endsWith(':')) {
			options.defaultProtocol = `${options.defaultProtocol}:`;
		}

		urlString = urlString.trim();

		// Data URL
		if (/^data:/i.test(urlString)) {
			return normalizeDataURL(urlString, options);
		}

		if (hasCustomProtocol(urlString)) {
			return urlString;
		}

		const hasRelativeProtocol = urlString.startsWith('//');
		const isRelativeUrl = !hasRelativeProtocol && /^\.*\//.test(urlString);

		// Prepend protocol
		if (!isRelativeUrl) {
			urlString = urlString.replace(/^(?!(?:\w+:)?\/\/)|^\/\//, options.defaultProtocol);
		}

		const urlObject = new URL(urlString);

		if (options.forceHttp && options.forceHttps) {
			throw new Error('The `forceHttp` and `forceHttps` options cannot be used together');
		}

		if (options.forceHttp && urlObject.protocol === 'https:') {
			urlObject.protocol = 'http:';
		}

		if (options.forceHttps && urlObject.protocol === 'http:') {
			urlObject.protocol = 'https:';
		}

		// Remove auth
		if (options.stripAuthentication) {
			urlObject.username = '';
			urlObject.password = '';
		}

		// Remove hash
		if (options.stripHash) {
			urlObject.hash = '';
		} else if (options.stripTextFragment) {
			urlObject.hash = urlObject.hash.replace(/#?:~:text.*?$/i, '');
		}

		// Remove duplicate slashes if not preceded by a protocol
		// NOTE: This could be implemented using a single negative lookbehind
		// regex, but we avoid that to maintain compatibility with older js engines
		// which do not have support for that feature.
		if (urlObject.pathname) {
			// TODO: Replace everything below with `urlObject.pathname = urlObject.pathname.replace(/(?<!\b[a-z][a-z\d+\-.]{1,50}:)\/{2,}/g, '/');` when Safari supports negative lookbehind.

			// Split the string by occurrences of this protocol regex, and perform
			// duplicate-slash replacement on the strings between those occurrences
			// (if any).
			const protocolRegex = /\b[a-z][a-z\d+\-.]{1,50}:\/\//g;

			let lastIndex = 0;
			let result = '';
			for (;;) {
				const match = protocolRegex.exec(urlObject.pathname);
				if (!match) {
					break;
				}

				const protocol = match[0];
				const protocolAtIndex = match.index;
				const intermediate = urlObject.pathname.slice(lastIndex, protocolAtIndex);

				result += intermediate.replace(/\/{2,}/g, '/');
				result += protocol;
				lastIndex = protocolAtIndex + protocol.length;
			}

			const remnant = urlObject.pathname.slice(lastIndex, urlObject.pathname.length);
			result += remnant.replace(/\/{2,}/g, '/');

			urlObject.pathname = result;
		}

		// Decode URI octets
		if (urlObject.pathname) {
			try {
				urlObject.pathname = decodeURI(urlObject.pathname).replace(/\\/g, '%5C');
			} catch {}
		}

		// Remove directory index
		if (options.removeDirectoryIndex === true) {
			options.removeDirectoryIndex = [/^index\.[a-z]+$/];
		}

		if (Array.isArray(options.removeDirectoryIndex) && options.removeDirectoryIndex.length > 0) {
			const pathComponents = urlObject.pathname.split('/').filter(Boolean);
			const lastComponent = pathComponents.at(-1);

			if (lastComponent && testParameter(lastComponent, options.removeDirectoryIndex)) {
				pathComponents.pop();
				urlObject.pathname = pathComponents.length > 0 ? `/${pathComponents.join('/')}/` : '/';
			}
		}

		// Remove path
		if (options.removePath) {
			urlObject.pathname = '/';
		}

		// Transform path components
		if (options.transformPath && typeof options.transformPath === 'function') {
			const pathComponents = urlObject.pathname.split('/').filter(Boolean);
			const newComponents = options.transformPath(pathComponents);
			urlObject.pathname = newComponents?.length > 0 ? `/${newComponents.join('/')}` : '/';
		}

		if (urlObject.hostname) {
			// Remove trailing dot
			urlObject.hostname = urlObject.hostname.replace(/\.$/, '');

			// Remove `www.`
			if (options.stripWWW && /^www\.(?!www\.)[a-z\-\d]{1,63}\.[a-z.\-\d]{2,63}$/.test(urlObject.hostname)) {
				// Each label should be max 63 at length (min: 1).
				// Source: https://en.wikipedia.org/wiki/Hostname#Restrictions_on_valid_host_names
				// Each TLD should be up to 63 characters long (min: 2).
				// It is technically possible to have a single character TLD, but none currently exist.
				urlObject.hostname = urlObject.hostname.replace(/^www\./, '');
			}
		}

		// Remove query unwanted parameters
		if (Array.isArray(options.removeQueryParameters)) {
			// eslint-disable-next-line unicorn/no-useless-spread -- We are intentionally spreading to get a copy.
			for (const key of [...urlObject.searchParams.keys()]) {
				if (testParameter(key, options.removeQueryParameters)) {
					urlObject.searchParams.delete(key);
				}
			}
		}

		if (!Array.isArray(options.keepQueryParameters) && options.removeQueryParameters === true) {
			urlObject.search = '';
		}

		// Keep wanted query parameters
		if (Array.isArray(options.keepQueryParameters) && options.keepQueryParameters.length > 0) {
			// eslint-disable-next-line unicorn/no-useless-spread -- We are intentionally spreading to get a copy.
			for (const key of [...urlObject.searchParams.keys()]) {
				if (!testParameter(key, options.keepQueryParameters)) {
					urlObject.searchParams.delete(key);
				}
			}
		}

		// Sort query parameters
		if (options.sortQueryParameters) {
			const originalSearch = urlObject.search;
			urlObject.searchParams.sort();

			// Calling `.sort()` encodes the search parameters, so we need to decode them again.
			try {
				urlObject.search = decodeURIComponent(urlObject.search);
			} catch {}

			// Fix parameters that originally had no equals sign but got one added by URLSearchParams
			const partsWithoutEquals = originalSearch.slice(1).split('&').filter(p => p && !p.includes('='));
			for (const part of partsWithoutEquals) {
				const decoded = decodeURIComponent(part);
				// Only replace at word boundaries to avoid partial matches
				urlObject.search = urlObject.search.replace(`?${decoded}=`, `?${decoded}`).replace(`&${decoded}=`, `&${decoded}`);
			}
		}

		if (options.removeTrailingSlash) {
			urlObject.pathname = urlObject.pathname.replace(/\/$/, '');
		}

		// Remove an explicit port number, excluding a default port number, if applicable
		if (options.removeExplicitPort && urlObject.port) {
			urlObject.port = '';
		}

		const oldUrlString = urlString;

		// Take advantage of many of the Node `url` normalizations
		urlString = urlObject.toString();

		if (!options.removeSingleSlash && urlObject.pathname === '/' && !oldUrlString.endsWith('/') && urlObject.hash === '') {
			urlString = urlString.replace(/\/$/, '');
		}

		// Remove ending `/` unless removeSingleSlash is false
		if ((options.removeTrailingSlash || urlObject.pathname === '/') && urlObject.hash === '' && options.removeSingleSlash) {
			urlString = urlString.replace(/\/$/, '');
		}

		// Restore relative protocol, if applicable
		if (hasRelativeProtocol && !options.normalizeProtocol) {
			urlString = urlString.replace(/^http:\/\//, '//');
		}

		// Remove http/https
		if (options.stripProtocol) {
			urlString = urlString.replace(/^(?:https?:)?\/\//, '');
		}

		return urlString;
	}

	var _escape = {exports: {}};

	var hasRequired_escape;

	function require_escape () {
		if (hasRequired_escape) return _escape.exports;
		hasRequired_escape = 1;
		(function (module, exports$1) {

			Object.defineProperty(exports$1, "__esModule", {
			  value: true
			});
			exports$1.default = escape;
			var _assertString = _interopRequireDefault(/*@__PURE__*/ requireAssertString());
			function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
			function escape(str) {
			  (0, _assertString.default)(str);
			  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\//g, '&#x2F;').replace(/\\/g, '&#x5C;').replace(/`/g, '&#96;');
			}
			module.exports = exports$1.default;
			module.exports.default = exports$1.default; 
		} (_escape, _escape.exports));
		return _escape.exports;
	}

	var _escapeExports = /*@__PURE__*/ require_escape();
	var escapeValue = /*@__PURE__*/getDefaultExportFromCjs(_escapeExports);

	var normalizeEmail = {exports: {}};

	var hasRequiredNormalizeEmail;

	function requireNormalizeEmail () {
		if (hasRequiredNormalizeEmail) return normalizeEmail.exports;
		hasRequiredNormalizeEmail = 1;
		(function (module, exports$1) {

			Object.defineProperty(exports$1, "__esModule", {
			  value: true
			});
			exports$1.default = normalizeEmail;
			var _merge = _interopRequireDefault(/*@__PURE__*/ requireMerge());
			function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
			var default_normalize_email_options = {
			  // The following options apply to all email addresses
			  // Lowercases the local part of the email address.
			  // Please note this may violate RFC 5321 as per http://stackoverflow.com/a/9808332/192024).
			  // The domain is always lowercased, as per RFC 1035
			  all_lowercase: true,
			  // The following conversions are specific to GMail
			  // Lowercases the local part of the GMail address (known to be case-insensitive)
			  gmail_lowercase: true,
			  // Removes dots from the local part of the email address, as that's ignored by GMail
			  gmail_remove_dots: true,
			  // Removes the subaddress (e.g. "+foo") from the email address
			  gmail_remove_subaddress: true,
			  // Conversts the googlemail.com domain to gmail.com
			  gmail_convert_googlemaildotcom: true,
			  // The following conversions are specific to Outlook.com / Windows Live / Hotmail
			  // Lowercases the local part of the Outlook.com address (known to be case-insensitive)
			  outlookdotcom_lowercase: true,
			  // Removes the subaddress (e.g. "+foo") from the email address
			  outlookdotcom_remove_subaddress: true,
			  // The following conversions are specific to Yahoo
			  // Lowercases the local part of the Yahoo address (known to be case-insensitive)
			  yahoo_lowercase: true,
			  // Removes the subaddress (e.g. "-foo") from the email address
			  yahoo_remove_subaddress: true,
			  // The following conversions are specific to Yandex
			  // Lowercases the local part of the Yandex address (known to be case-insensitive)
			  yandex_lowercase: true,
			  // all yandex domains are equal, this explicitly sets the domain to 'yandex.ru'
			  yandex_convert_yandexru: true,
			  // The following conversions are specific to iCloud
			  // Lowercases the local part of the iCloud address (known to be case-insensitive)
			  icloud_lowercase: true,
			  // Removes the subaddress (e.g. "+foo") from the email address
			  icloud_remove_subaddress: true
			};

			// List of domains used by iCloud
			var icloud_domains = ['icloud.com', 'me.com'];

			// List of domains used by Outlook.com and its predecessors
			// This list is likely incomplete.
			// Partial reference:
			// https://blogs.office.com/2013/04/17/outlook-com-gets-two-step-verification-sign-in-by-alias-and-new-international-domains/
			var outlookdotcom_domains = ['hotmail.at', 'hotmail.be', 'hotmail.ca', 'hotmail.cl', 'hotmail.co.il', 'hotmail.co.nz', 'hotmail.co.th', 'hotmail.co.uk', 'hotmail.com', 'hotmail.com.ar', 'hotmail.com.au', 'hotmail.com.br', 'hotmail.com.gr', 'hotmail.com.mx', 'hotmail.com.pe', 'hotmail.com.tr', 'hotmail.com.vn', 'hotmail.cz', 'hotmail.de', 'hotmail.dk', 'hotmail.es', 'hotmail.fr', 'hotmail.hu', 'hotmail.id', 'hotmail.ie', 'hotmail.in', 'hotmail.it', 'hotmail.jp', 'hotmail.kr', 'hotmail.lv', 'hotmail.my', 'hotmail.ph', 'hotmail.pt', 'hotmail.sa', 'hotmail.sg', 'hotmail.sk', 'live.be', 'live.co.uk', 'live.com', 'live.com.ar', 'live.com.mx', 'live.de', 'live.es', 'live.eu', 'live.fr', 'live.it', 'live.nl', 'msn.com', 'outlook.at', 'outlook.be', 'outlook.cl', 'outlook.co.il', 'outlook.co.nz', 'outlook.co.th', 'outlook.com', 'outlook.com.ar', 'outlook.com.au', 'outlook.com.br', 'outlook.com.gr', 'outlook.com.pe', 'outlook.com.tr', 'outlook.com.vn', 'outlook.cz', 'outlook.de', 'outlook.dk', 'outlook.es', 'outlook.fr', 'outlook.hu', 'outlook.id', 'outlook.ie', 'outlook.in', 'outlook.it', 'outlook.jp', 'outlook.kr', 'outlook.lv', 'outlook.my', 'outlook.ph', 'outlook.pt', 'outlook.sa', 'outlook.sg', 'outlook.sk', 'passport.com'];

			// List of domains used by Yahoo Mail
			// This list is likely incomplete
			var yahoo_domains = ['rocketmail.com', 'yahoo.ca', 'yahoo.co.uk', 'yahoo.com', 'yahoo.de', 'yahoo.fr', 'yahoo.in', 'yahoo.it', 'ymail.com'];

			// List of domains used by yandex.ru
			var yandex_domains = ['yandex.ru', 'yandex.ua', 'yandex.kz', 'yandex.com', 'yandex.by', 'ya.ru'];

			// replace single dots, but not multiple consecutive dots
			function dotsReplacer(match) {
			  if (match.length > 1) {
			    return match;
			  }
			  return '';
			}
			function normalizeEmail(email, options) {
			  options = (0, _merge.default)(options, default_normalize_email_options);
			  var raw_parts = email.split('@');
			  var domain = raw_parts.pop();
			  var user = raw_parts.join('@');
			  var parts = [user, domain];

			  // The domain is always lowercased, as it's case-insensitive per RFC 1035
			  parts[1] = parts[1].toLowerCase();
			  if (parts[1] === 'gmail.com' || parts[1] === 'googlemail.com') {
			    // Address is GMail
			    if (options.gmail_remove_subaddress) {
			      parts[0] = parts[0].split('+')[0];
			    }
			    if (options.gmail_remove_dots) {
			      // this does not replace consecutive dots like example..email@gmail.com
			      parts[0] = parts[0].replace(/\.+/g, dotsReplacer);
			    }
			    if (!parts[0].length) {
			      return false;
			    }
			    if (options.all_lowercase || options.gmail_lowercase) {
			      parts[0] = parts[0].toLowerCase();
			    }
			    parts[1] = options.gmail_convert_googlemaildotcom ? 'gmail.com' : parts[1];
			  } else if (icloud_domains.indexOf(parts[1]) >= 0) {
			    // Address is iCloud
			    if (options.icloud_remove_subaddress) {
			      parts[0] = parts[0].split('+')[0];
			    }
			    if (!parts[0].length) {
			      return false;
			    }
			    if (options.all_lowercase || options.icloud_lowercase) {
			      parts[0] = parts[0].toLowerCase();
			    }
			  } else if (outlookdotcom_domains.indexOf(parts[1]) >= 0) {
			    // Address is Outlook.com
			    if (options.outlookdotcom_remove_subaddress) {
			      parts[0] = parts[0].split('+')[0];
			    }
			    if (!parts[0].length) {
			      return false;
			    }
			    if (options.all_lowercase || options.outlookdotcom_lowercase) {
			      parts[0] = parts[0].toLowerCase();
			    }
			  } else if (yahoo_domains.indexOf(parts[1]) >= 0) {
			    // Address is Yahoo
			    if (options.yahoo_remove_subaddress) {
			      var components = parts[0].split('-');
			      parts[0] = components.length > 1 ? components.slice(0, -1).join('-') : components[0];
			    }
			    if (!parts[0].length) {
			      return false;
			    }
			    if (options.all_lowercase || options.yahoo_lowercase) {
			      parts[0] = parts[0].toLowerCase();
			    }
			  } else if (yandex_domains.indexOf(parts[1]) >= 0) {
			    if (options.all_lowercase || options.yandex_lowercase) {
			      parts[0] = parts[0].toLowerCase();
			    }
			    parts[1] = options.yandex_convert_yandexru ? 'yandex.ru' : parts[1];
			  } else if (options.all_lowercase) {
			    // Any other address
			    parts[0] = parts[0].toLowerCase();
			  }
			  return parts.join('@');
			}
			module.exports = exports$1.default;
			module.exports.default = exports$1.default; 
		} (normalizeEmail, normalizeEmail.exports));
		return normalizeEmail.exports;
	}

	var normalizeEmailExports = /*@__PURE__*/ requireNormalizeEmail();
	var normalizeEmailValue = /*@__PURE__*/getDefaultExportFromCjs(normalizeEmailExports);

	var CompilerBuffer = class CompilerBuffer {
		#content = "";
		newLine = "\n";
		writeStatement(statement) {
			this.#content = `${this.#content}${this.newLine}${statement}`;
		}
		child() {
			return new CompilerBuffer();
		}
		toString() {
			return this.#content;
		}
		flush() {
			this.#content = "";
		}
	};
	function defineFieldVariables({ parseFnRefId, variableName, wildCardPath, isArrayMember, valueExpression, parentExpression, fieldNameExpression, parentValueExpression }) {
		const inValueExpression = parseFnRefId ? `refs['${parseFnRefId}'](${valueExpression}, {
      data: root,
      meta: meta,
      parent: ${parentValueExpression}
    })` : valueExpression;
		let fieldPathOutputExpression = "";
		if (parentExpression === "root" || parentExpression === "root_item") fieldPathOutputExpression = fieldNameExpression;
		else if (fieldNameExpression !== "''") fieldPathOutputExpression = `${parentExpression}.getFieldPath() + '.' + ${fieldNameExpression}`;
		return `const ${variableName} = defineValue(${inValueExpression}, {
  data: root,
  meta: meta,
  name: ${fieldNameExpression},
  wildCardPath: '${wildCardPath}',
  getFieldPath() {
    return ${fieldPathOutputExpression};
  },
  mutate: defineValue,
  report: report,
  isValid: true,
  isValidDataType: false,
  parent: ${parentValueExpression},
  isArrayMember: ${isArrayMember},
});`;
	}
	function validateLiteralField({ variableName, validatorFnId }) {
		const rule = `refs['${validatorFnId}']`;
		return `${variableName}.isValidDataType = ${`${rule}.validator(${variableName}.value, ${rule}.options, ${variableName});`}`;
	}
	var BaseNode = class {
		#node;
		#parentField;
		field;
		constructor(node, compiler, parent, parentField) {
			this.#parentField = parentField;
			this.#node = node;
			if (this.#parentField) this.field = this.#parentField;
			else {
				compiler.variablesCounter++;
				this.field = compiler.createFieldFor(node, parent);
			}
		}
		defineField(buffer) {
			if (!this.#parentField) buffer.writeStatement(defineFieldVariables({
				fieldNameExpression: this.field.fieldNameExpression,
				isArrayMember: this.field.isArrayMember,
				parentExpression: this.field.parentExpression,
				parentValueExpression: this.field.parentValueExpression,
				valueExpression: this.field.valueExpression,
				variableName: this.field.variableName,
				wildCardPath: this.field.wildCardPath,
				parseFnRefId: "parseFnId" in this.#node ? this.#node.parseFnId : void 0
			}));
		}
	};
	function defineArrayGuard({ variableName, guardedCodeSnippet }) {
		return `if (${variableName}.isValidDataType) {
${guardedCodeSnippet}
}`;
	}
	function defineIsValidGuard({ variableName, bail, guardedCodeSnippet }) {
		if (!bail) return guardedCodeSnippet;
		return `if (${variableName}.isValid) {
${guardedCodeSnippet}
}`;
	}
	function defineFieldNullOutput({ allowNull, conditional, variableName, outputExpression, transformFnRefId }) {
		if (!allowNull) return "";
		return `${conditional}(${variableName}.value === null) {
  ${outputExpression} = ${transformFnRefId ? `refs['${transformFnRefId}'](null, ${variableName});` : "null;"}
}`;
	}
	function wrapInConditional(conditions, wrappingCode) {
		const [first, second] = conditions;
		if (first && second) return `if (${first} && ${second}) {
  ${wrappingCode}
}`;
		if (first) return `if (${first}) {
  ${wrappingCode}
}`;
		if (second) return `if (${second}) {
  ${wrappingCode}
}`;
		return wrappingCode;
	}
	function emitValidationSnippet({ isAsync, implicit, ruleFnId }, variableName, bail, dropMissingCheck, existenceCheckExpression) {
		const rule = `refs['${ruleFnId}']`;
		const callable = `${rule}.validator(${variableName}.value, ${rule}.options, ${variableName});`;
		existenceCheckExpression = existenceCheckExpression || `${variableName}.isDefined`;
		return wrapInConditional([bail ? `${variableName}.isValid` : "", implicit || dropMissingCheck ? "" : existenceCheckExpression], isAsync ? `await ${callable}` : `${callable}`);
	}
	function defineFieldValidations({ bail, validations, variableName, dropMissingCheck, existenceCheckExpression }) {
		return `${validations.map((one) => emitValidationSnippet(one, variableName, bail, dropMissingCheck, existenceCheckExpression)).join("\n")}`;
	}
	function defineArrayInitialOutput({ variableName, outputExpression, outputValueExpression }) {
		return `const ${variableName}_out = ${outputValueExpression};
${outputExpression} = ${variableName}_out;`;
	}
	function defineFieldExistenceValidations({ allowNull, isOptional, variableName }) {
		if (isOptional === false) if (allowNull === false) return `ensureExists(${variableName});`;
		else return `ensureIsDefined(${variableName});`;
		return "";
	}
	function validateArrayField({ variableName }) {
		return `${variableName}.isValidDataType = ensureIsArray(${variableName});`;
	}
	var TupleNodeCompiler = class extends BaseNode {
		#node;
		#buffer;
		#compiler;
		constructor(node, buffer, compiler, parent, parentField) {
			super(node, compiler, parent, parentField);
			this.#node = node;
			this.#buffer = buffer;
			this.#compiler = compiler;
		}
		#compileTupleChildren() {
			const buffer = this.#buffer.child();
			const parent = {
				type: "tuple",
				fieldPathExpression: this.field.fieldPathExpression,
				outputExpression: this.field.outputExpression,
				variableName: this.field.variableName,
				wildCardPath: this.field.wildCardPath
			};
			this.#node.properties.forEach((child) => {
				this.#compiler.compileNode(child, buffer, parent);
			});
			return buffer.toString();
		}
		compile() {
			this.defineField(this.#buffer);
			this.#buffer.writeStatement(defineFieldExistenceValidations({
				allowNull: this.#node.allowNull,
				isOptional: this.#node.isOptional,
				variableName: this.field.variableName
			}));
			this.#buffer.writeStatement(validateArrayField({ variableName: this.field.variableName }));
			this.#buffer.writeStatement(defineFieldValidations({
				variableName: this.field.variableName,
				validations: this.#node.validations,
				bail: this.#node.bail,
				dropMissingCheck: false,
				existenceCheckExpression: `${this.field.variableName}.isValidDataType`
			}));
			const isArrayValidBlock = defineArrayGuard({
				variableName: this.field.variableName,
				guardedCodeSnippet: `${this.#buffer.newLine}${defineIsValidGuard({
				variableName: this.field.variableName,
				bail: this.#node.bail,
				guardedCodeSnippet: `${defineArrayInitialOutput({
					variableName: this.field.variableName,
					outputExpression: this.field.outputExpression,
					outputValueExpression: this.#node.allowUnknownProperties ? `copyProperties(${this.field.variableName}.value)` : `[]`
				})}${this.#buffer.newLine}${this.#compileTupleChildren()}`
			})}`
			});
			this.#buffer.writeStatement(`${isArrayValidBlock}${this.#buffer.newLine}${defineFieldNullOutput({
			allowNull: this.#node.allowNull,
			outputExpression: this.field.outputExpression,
			variableName: this.field.variableName,
			conditional: "else if"
		})}`);
		}
	};
	function defineArrayLoop({ variableName, loopCodeSnippet, startingIndex }) {
		startingIndex = startingIndex || 0;
		return `const ${variableName}_items_size = ${variableName}.value.length;
for (let ${variableName}_i = ${startingIndex}; ${variableName}_i < ${variableName}_items_size; ${variableName}_i++) {
${loopCodeSnippet}
}`;
	}
	var ArrayNodeCompiler = class extends BaseNode {
		#node;
		#buffer;
		#compiler;
		constructor(node, buffer, compiler, parent, parentField) {
			super(node, compiler, parent, parentField);
			this.#node = node;
			this.#buffer = buffer;
			this.#compiler = compiler;
		}
		#compileArrayElements() {
			const arrayElementsBuffer = this.#buffer.child();
			this.#compiler.compileNode(this.#node.each, arrayElementsBuffer, {
				type: "array",
				fieldPathExpression: this.field.fieldPathExpression,
				outputExpression: this.field.outputExpression,
				variableName: this.field.variableName,
				wildCardPath: this.field.wildCardPath
			});
			const buffer = this.#buffer.child();
			buffer.writeStatement(defineArrayLoop({
				variableName: this.field.variableName,
				startingIndex: 0,
				loopCodeSnippet: arrayElementsBuffer.toString()
			}));
			arrayElementsBuffer.flush();
			return buffer.toString();
		}
		compile() {
			this.defineField(this.#buffer);
			this.#buffer.writeStatement(defineFieldExistenceValidations({
				allowNull: this.#node.allowNull,
				isOptional: this.#node.isOptional,
				variableName: this.field.variableName
			}));
			this.#buffer.writeStatement(validateArrayField({ variableName: this.field.variableName }));
			this.#buffer.writeStatement(defineFieldValidations({
				variableName: this.field.variableName,
				validations: this.#node.validations,
				bail: this.#node.bail,
				dropMissingCheck: false,
				existenceCheckExpression: `${this.field.variableName}.isValidDataType`
			}));
			const isArrayValidBlock = defineArrayGuard({
				variableName: this.field.variableName,
				guardedCodeSnippet: `${this.#buffer.newLine}${defineIsValidGuard({
				variableName: this.field.variableName,
				bail: this.#node.bail,
				guardedCodeSnippet: `${defineArrayInitialOutput({
					variableName: this.field.variableName,
					outputExpression: this.field.outputExpression,
					outputValueExpression: `[]`
				})}${this.#buffer.newLine}${this.#compileArrayElements()}`
			})}`
			});
			this.#buffer.writeStatement(`${isArrayValidBlock}${this.#buffer.newLine}${defineFieldNullOutput({
			allowNull: this.#node.allowNull,
			outputExpression: this.field.outputExpression,
			variableName: this.field.variableName,
			conditional: "else if"
		})}`);
		}
	};
	function callParseFunction({ parseFnRefId, variableName }) {
		if (parseFnRefId) return `${variableName}.value = refs['${parseFnRefId}'](${variableName}.value);`;
		return "";
	}
	function defineElseCondition({ variableName, conditionalFnRefId }) {
		return `else {
refs['${conditionalFnRefId}'](${variableName}.value, ${variableName});
}`;
	}
	function defineConditionalGuard({ conditional, variableName, conditionalFnRefId, guardedCodeSnippet }) {
		return `${conditional}(refs['${conditionalFnRefId}'](${variableName}.value, ${variableName})) {
${guardedCodeSnippet}
}`;
	}
	var UnionNodeCompiler = class extends BaseNode {
		#compiler;
		#node;
		#buffer;
		#parent;
		constructor(node, buffer, compiler, parent, parentField) {
			super(node, compiler, parent, parentField);
			this.#node = node;
			this.#buffer = buffer;
			this.#parent = parent;
			this.#compiler = compiler;
		}
		#compileUnionChildren() {
			const childrenBuffer = this.#buffer.child();
			this.#node.conditions.forEach((child, index) => {
				const conditionalBuffer = this.#buffer.child();
				if ("parseFnId" in child.schema) conditionalBuffer.writeStatement(callParseFunction({
					parseFnRefId: child.schema.parseFnId,
					variableName: this.field.variableName
				}));
				this.#compiler.compileNode(child.schema, conditionalBuffer, this.#parent, this.field);
				childrenBuffer.writeStatement(defineConditionalGuard({
					conditional: index === 0 ? "if" : "else if",
					variableName: this.field.variableName,
					conditionalFnRefId: child.conditionalFnRefId,
					guardedCodeSnippet: conditionalBuffer.toString()
				}));
				conditionalBuffer.flush();
			});
			if (this.#node.elseConditionalFnRefId && this.#node.conditions.length) childrenBuffer.writeStatement(defineElseCondition({
				variableName: this.field.variableName,
				conditionalFnRefId: this.#node.elseConditionalFnRefId
			}));
			return childrenBuffer.toString();
		}
		compile() {
			this.defineField(this.#buffer);
			this.#buffer.writeStatement(this.#compileUnionChildren());
		}
	};
	function defineRecordLoop({ variableName, loopCodeSnippet }) {
		return `const ${variableName}_keys = Object.keys(${variableName}.value);
const ${variableName}_keys_size = ${variableName}_keys.length;
for (let ${variableName}_key_i = 0; ${variableName}_key_i < ${variableName}_keys_size; ${variableName}_key_i++) {
const ${variableName}_i = ${variableName}_keys[${variableName}_key_i];
${loopCodeSnippet}
}`;
	}
	function defineObjectGuard({ variableName, guardedCodeSnippet }) {
		return `if (${variableName}.isValidDataType) {
${guardedCodeSnippet}
}`;
	}
	function defineObjectInitialOutput({ variableName, outputExpression, outputValueExpression }) {
		return `const ${variableName}_out = ${outputValueExpression};
${outputExpression} = ${variableName}_out;`;
	}
	function validateObjectField({ variableName }) {
		return `${variableName}.isValidDataType = ensureIsObject(${variableName});`;
	}
	var RecordNodeCompiler = class extends BaseNode {
		#node;
		#buffer;
		#compiler;
		constructor(node, buffer, compiler, parent, parentField) {
			super(node, compiler, parent, parentField);
			this.#node = node;
			this.#buffer = buffer;
			this.#compiler = compiler;
		}
		#compileRecordElements() {
			const buffer = this.#buffer.child();
			const recordElementsBuffer = this.#buffer.child();
			this.#compiler.compileNode(this.#node.each, recordElementsBuffer, {
				type: "record",
				fieldPathExpression: this.field.fieldPathExpression,
				outputExpression: this.field.outputExpression,
				variableName: this.field.variableName,
				wildCardPath: this.field.wildCardPath
			});
			buffer.writeStatement(defineRecordLoop({
				variableName: this.field.variableName,
				loopCodeSnippet: recordElementsBuffer.toString()
			}));
			recordElementsBuffer.flush();
			return buffer.toString();
		}
		compile() {
			this.defineField(this.#buffer);
			this.#buffer.writeStatement(defineFieldExistenceValidations({
				allowNull: this.#node.allowNull,
				isOptional: this.#node.isOptional,
				variableName: this.field.variableName
			}));
			this.#buffer.writeStatement(validateObjectField({ variableName: this.field.variableName }));
			this.#buffer.writeStatement(defineFieldValidations({
				variableName: this.field.variableName,
				validations: this.#node.validations,
				bail: this.#node.bail,
				dropMissingCheck: false,
				existenceCheckExpression: `${this.field.variableName}.isValidDataType`
			}));
			const isObjectValidBlock = defineIsValidGuard({
				variableName: this.field.variableName,
				bail: this.#node.bail,
				guardedCodeSnippet: `${defineObjectInitialOutput({
				variableName: this.field.variableName,
				outputExpression: this.field.outputExpression,
				outputValueExpression: `{}`
			})}${this.#compileRecordElements()}`
			});
			const isValueAnObjectBlock = defineObjectGuard({
				variableName: this.field.variableName,
				guardedCodeSnippet: `${this.#buffer.newLine}${isObjectValidBlock}`
			});
			this.#buffer.writeStatement(`${isValueAnObjectBlock}${this.#buffer.newLine}${defineFieldNullOutput({
			allowNull: this.#node.allowNull,
			outputExpression: this.field.outputExpression,
			variableName: this.field.variableName,
			conditional: "else if"
		})}`);
		}
	};
	function arrayToString(arr) {
		return `[${arr.map((str) => `"${str}"`).join(", ")}]`;
	}
	function defineMoveProperties({ variableName, fieldsToIgnore, allowUnknownProperties }) {
		if (!allowUnknownProperties) return "";
		return `moveProperties(${variableName}.value, ${variableName}_out, ${arrayToString(fieldsToIgnore)});`;
	}
	var ObjectNodeCompiler = class extends BaseNode {
		#node;
		#buffer;
		#compiler;
		constructor(node, buffer, compiler, parent, parentField) {
			super(node, compiler, parent, parentField);
			this.#node = node;
			this.#buffer = buffer;
			this.#compiler = compiler;
		}
		#getFieldNames(node) {
			let fieldNames = node.properties.map((child) => child.fieldName);
			const groupsFieldNames = node.groups.flatMap((group) => this.#getGroupFieldNames(group));
			return fieldNames.concat(groupsFieldNames);
		}
		#getGroupFieldNames(group) {
			return group.conditions.flatMap((condition) => {
				return this.#getFieldNames(condition.schema);
			});
		}
		#compileObjectChildren() {
			const buffer = this.#buffer.child();
			const parent = {
				type: "object",
				fieldPathExpression: this.field.fieldPathExpression,
				outputExpression: this.field.outputExpression,
				variableName: this.field.variableName,
				wildCardPath: this.field.wildCardPath
			};
			this.#node.properties.forEach((child) => this.#compiler.compileNode(child, buffer, parent));
			return buffer.toString();
		}
		#compileObjectGroups() {
			const buffer = this.#buffer.child();
			const parent = {
				type: "object",
				fieldPathExpression: this.field.fieldPathExpression,
				outputExpression: this.field.outputExpression,
				variableName: this.field.variableName,
				wildCardPath: this.field.wildCardPath
			};
			this.#node.groups.forEach((group) => this.#compileObjectGroup(group, buffer, parent));
			return buffer.toString();
		}
		#compileObjectGroup(group, buffer, parent) {
			group.conditions.forEach((condition, index) => {
				const guardBuffer = buffer.child();
				condition.schema.properties.forEach((child) => {
					this.#compiler.compileNode(child, guardBuffer, parent);
				});
				condition.schema.groups.forEach((child) => {
					this.#compileObjectGroup(child, guardBuffer, parent);
				});
				buffer.writeStatement(defineConditionalGuard({
					variableName: this.field.variableName,
					conditional: index === 0 ? "if" : "else if",
					conditionalFnRefId: condition.conditionalFnRefId,
					guardedCodeSnippet: guardBuffer.toString()
				}));
			});
			if (group.elseConditionalFnRefId && group.conditions.length) buffer.writeStatement(defineElseCondition({
				variableName: this.field.variableName,
				conditionalFnRefId: group.elseConditionalFnRefId
			}));
		}
		compile() {
			this.defineField(this.#buffer);
			this.#buffer.writeStatement(defineFieldExistenceValidations({
				allowNull: this.#node.allowNull,
				isOptional: this.#node.isOptional,
				variableName: this.field.variableName
			}));
			this.#buffer.writeStatement(validateObjectField({ variableName: this.field.variableName }));
			this.#buffer.writeStatement(defineFieldValidations({
				variableName: this.field.variableName,
				validations: this.#node.validations,
				bail: this.#node.bail,
				dropMissingCheck: false,
				existenceCheckExpression: `${this.field.variableName}.isValidDataType`
			}));
			const isObjectValidBlock = defineIsValidGuard({
				variableName: this.field.variableName,
				bail: this.#node.bail,
				guardedCodeSnippet: `${defineObjectInitialOutput({
				variableName: this.field.variableName,
				outputExpression: this.field.outputExpression,
				outputValueExpression: "{}"
			})}${this.#buffer.newLine}${this.#compileObjectChildren()}${this.#buffer.newLine}${this.#compileObjectGroups()}${this.#buffer.newLine}${defineMoveProperties({
				variableName: this.field.variableName,
				allowUnknownProperties: this.#node.allowUnknownProperties,
				fieldsToIgnore: this.#node.allowUnknownProperties ? this.#getFieldNames(this.#node) : []
			})}`
			});
			const isValueAnObject = defineObjectGuard({
				variableName: this.field.variableName,
				guardedCodeSnippet: `${isObjectValidBlock}`
			});
			this.#buffer.writeStatement(`${isValueAnObject}${this.#buffer.newLine}${defineFieldNullOutput({
			variableName: this.field.variableName,
			allowNull: this.#node.allowNull,
			outputExpression: this.field.outputExpression,
			conditional: "else if"
		})}`);
		}
	};
	function createRootField(parent) {
		return {
			parentExpression: parent.variableName,
			parentValueExpression: parent.variableName,
			fieldNameExpression: `''`,
			fieldPathExpression: `''`,
			wildCardPath: "",
			variableName: `${parent.variableName}_item`,
			valueExpression: "root",
			outputExpression: parent.outputExpression,
			isArrayMember: false
		};
	}
	function defineFieldValueOutput({ variableName, outputExpression, transformFnRefId }) {
		return `if (${variableName}.isDefined && ${variableName}.isValid) {
  ${outputExpression} = ${transformFnRefId ? `refs['${transformFnRefId}'](${variableName}.value, ${variableName})` : `${variableName}.value`};
}`;
	}
	var LiteralNodeCompiler = class extends BaseNode {
		#node;
		#buffer;
		constructor(node, buffer, compiler, parent, parentField) {
			super(node, compiler, parent, parentField);
			this.#node = node;
			this.#buffer = buffer;
		}
		compile() {
			this.defineField(this.#buffer);
			this.#buffer.writeStatement(defineFieldExistenceValidations({
				allowNull: this.#node.allowNull,
				isOptional: this.#node.isOptional,
				variableName: this.field.variableName
			}));
			if (this.#node.dataTypeValidatorFnId) this.#buffer.writeStatement(validateLiteralField({
				variableName: this.field.variableName,
				validatorFnId: this.#node.dataTypeValidatorFnId
			}));
			this.#buffer.writeStatement(defineFieldValidations({
				variableName: this.field.variableName,
				validations: this.#node.validations,
				bail: this.#node.bail,
				existenceCheckExpression: this.#node.dataTypeValidatorFnId ? `${this.field.variableName}.isValidDataType` : void 0,
				dropMissingCheck: false
			}));
			this.#buffer.writeStatement(`${defineFieldValueOutput({
			variableName: this.field.variableName,
			outputExpression: this.field.outputExpression,
			transformFnRefId: this.#node.transformFnId
		})}${this.#buffer.newLine}${defineFieldNullOutput({
			variableName: this.field.variableName,
			allowNull: this.#node.allowNull,
			outputExpression: this.field.outputExpression,
			transformFnRefId: this.#node.transformFnId,
			conditional: "else if"
		})}`);
		}
	};
	function createArrayField(parent) {
		const wildCardPath = parent.wildCardPath !== "" ? `${parent.wildCardPath}.*` : `*`;
		return {
			parentExpression: parent.variableName,
			parentValueExpression: `${parent.variableName}.value`,
			fieldNameExpression: `${parent.variableName}_i`,
			fieldPathExpression: wildCardPath,
			wildCardPath,
			variableName: `${parent.variableName}_item`,
			valueExpression: `${parent.variableName}.value[${parent.variableName}_i]`,
			outputExpression: `${parent.variableName}_out[${parent.variableName}_i]`,
			isArrayMember: true
		};
	}
	function createTupleField(node, parent) {
		const wildCardPath = parent.wildCardPath !== "" ? `${parent.wildCardPath}.${node.fieldName}` : node.fieldName;
		return {
			parentExpression: parent.variableName,
			parentValueExpression: `${parent.variableName}.value`,
			fieldNameExpression: `${node.fieldName}`,
			fieldPathExpression: wildCardPath,
			wildCardPath,
			variableName: `${parent.variableName}_item_${node.fieldName}`,
			valueExpression: `${parent.variableName}.value[${node.fieldName}]`,
			outputExpression: `${parent.variableName}_out[${node.propertyName}]`,
			isArrayMember: true
		};
	}
	function reportErrors() {
		return `if(errorReporter.hasErrors) {
  throw errorReporter.createError();
}`;
	}
	const NUMBER_CHAR_RE = /\d/;
	const VALID_CHARS = /[A-Za-z0-9]+/;
	function isUppercase(char = "") {
		if (NUMBER_CHAR_RE.test(char)) return;
		return char !== char.toLowerCase();
	}
	function upperFirst(value) {
		return value ? value[0].toUpperCase() + value.slice(1) : "";
	}
	function lowerFirst(value) {
		return value ? value[0].toLowerCase() + value.slice(1) : "";
	}
	function splitByCase(value) {
		const parts = [];
		if (!value || typeof value !== "string") return parts;
		let buff = "";
		let previousUpper;
		let previousSplitter;
		for (const char of value) {
			const isSplitter = !VALID_CHARS.test(char);
			if (isSplitter === true) {
				parts.push(buff);
				buff = "";
				previousUpper = void 0;
				continue;
			}
			const isUpper = isUppercase(char);
			if (previousSplitter === false) {
				if (previousUpper === false && isUpper === true) {
					parts.push(buff);
					buff = char;
					previousUpper = isUpper;
					continue;
				}
				if (previousUpper === true && isUpper === false && buff.length > 1) {
					const lastChar = buff.at(-1);
					parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
					buff = lastChar + char;
					previousUpper = isUpper;
					continue;
				}
			}
			buff += char;
			previousUpper = isUpper;
			previousSplitter = isSplitter;
		}
		parts.push(buff);
		return parts;
	}
	function toVariableName(value) {
		const pascalCase = splitByCase(value).map((p) => upperFirst(p.toLowerCase())).join("");
		return /^[0-9]+/.test(pascalCase) ? `var_${pascalCase}` : lowerFirst(pascalCase);
	}
	function createObjectField(node, variablesCounter, parent) {
		const wildCardPath = parent.wildCardPath !== "" ? `${parent.wildCardPath}.${node.fieldName}` : node.fieldName;
		return {
			parentExpression: parent.variableName,
			parentValueExpression: `${parent.variableName}.value`,
			fieldNameExpression: `'${node.fieldName}'`,
			fieldPathExpression: wildCardPath,
			wildCardPath,
			variableName: `${toVariableName(node.propertyName)}_${variablesCounter}`,
			valueExpression: `${parent.variableName}.value['${node.fieldName}']`,
			outputExpression: `${parent.variableName}_out['${node.propertyName}']`,
			isArrayMember: false
		};
	}
	function createRecordField(parent) {
		const wildCardPath = parent.wildCardPath !== "" ? `${parent.wildCardPath}.*` : `*`;
		return {
			parentExpression: parent.variableName,
			parentValueExpression: `${parent.variableName}.value`,
			fieldNameExpression: `${parent.variableName}_i`,
			fieldPathExpression: wildCardPath,
			wildCardPath,
			variableName: `${parent.variableName}_item`,
			valueExpression: `${parent.variableName}.value[${parent.variableName}_i]`,
			outputExpression: `${parent.variableName}_out[${parent.variableName}_i]`,
			isArrayMember: false
		};
	}
	function defineInlineFunctions(options) {
		return `function report(message, rule, field, args) {
  field.isValid = false;
  errorReporter.report(messagesProvider.getMessage(message, rule, field, args), rule, field, args);
};
function defineValue(value, field) {
  ${options.convertEmptyStringsToNull ? `if (typeof value === 'string' && value.trim() === '') { value = null; }` : ""}
  field.value = value;
  field.isDefined = value !== undefined && value !== null;
  return field;
};
function ensureExists(field) {
  if (field.value === undefined || field.value === null) {
    field.report(REQUIRED, 'required', field);
    return false;
  }
  return true;
};
function ensureIsDefined(field) {
  if (field.value === undefined) {
    field.report(REQUIRED, 'required', field);
    return false;
  }
  return true;
};
function ensureIsObject(field) {
  if (!field.isDefined) {
    return false;
  }
  if (typeof field.value == 'object' && !Array.isArray(field.value)) {
    return true;
  }
  field.report(NOT_AN_OBJECT, 'object', field);
  return false;
};
function ensureIsArray(field) {
  if (!field.isDefined) {
    return false;
  }
  if (Array.isArray(field.value)) {
    return true;
  }
  field.report(NOT_AN_ARRAY, 'array', field);
  return false;
};
function copyProperties(val) {
  let k, out, tmp;

  if (Array.isArray(val)) {
    out = Array((k = val.length))
    while (k--) out[k] = (tmp = val[k]) && typeof tmp == 'object' ? copyProperties(tmp) : tmp
    return out
  }

  if (Object.prototype.toString.call(val) === '[object Object]') {
    out = {} // null
    for (k in val) {
      out[k] = (tmp = val[k]) && typeof tmp == 'object' ? copyProperties(tmp) : tmp
    }
    return out
  }
  return val
};
function moveProperties(source, destination, ignoreKeys) {
  for (let key in source) {
    if (!ignoreKeys.includes(key)) {
      const value = source[key]
      destination[key] = copyProperties(value)
    }
  }
};`;
	}
	function defineInlineErrorMessages(messages) {
		return `const REQUIRED = '${messages.required}';
const NOT_AN_OBJECT = '${messages.object}';
const NOT_AN_ARRAY = '${messages.array}';`;
	}
	const AsyncFunction = Object.getPrototypeOf(async function() {}).constructor;
	var Compiler = class {
		variablesCounter = 0;
		#rootNode;
		#options;
		#buffer = new CompilerBuffer();
		constructor(rootNode, options) {
			this.#rootNode = rootNode;
			this.#options = options || { convertEmptyStringsToNull: false };
		}
		#initiateJSOutput() {
			this.#buffer.writeStatement(defineInlineErrorMessages({
				required: "value is required",
				object: "value is not a valid object",
				array: "value is not a valid array",
				...this.#options.messages
			}));
			this.#buffer.writeStatement(defineInlineFunctions(this.#options));
			this.#buffer.writeStatement("let out;");
		}
		#finishJSOutput() {
			this.#buffer.writeStatement(reportErrors());
			this.#buffer.writeStatement("return out;");
		}
		#compileNodes() {
			this.compileNode(this.#rootNode.schema, this.#buffer, {
				type: "root",
				variableName: "root",
				outputExpression: "out",
				fieldPathExpression: "out",
				wildCardPath: ""
			});
		}
		#toAsyncFunction() {
			return new AsyncFunction("root", "meta", "refs", "messagesProvider", "errorReporter", this.#buffer.toString());
		}
		createFieldFor(node, parent) {
			switch (parent.type) {
				case "array": return createArrayField(parent);
				case "root": return createRootField(parent);
				case "object": return createObjectField(node, this.variablesCounter, parent);
				case "tuple": return createTupleField(node, parent);
				case "record": return createRecordField(parent);
			}
		}
		compileNode(node, buffer, parent, parentField) {
			switch (node.type) {
				case "literal": return new LiteralNodeCompiler(node, buffer, this, parent, parentField).compile();
				case "array": return new ArrayNodeCompiler(node, buffer, this, parent, parentField).compile();
				case "record": return new RecordNodeCompiler(node, buffer, this, parent, parentField).compile();
				case "object": return new ObjectNodeCompiler(node, buffer, this, parent, parentField).compile();
				case "tuple": return new TupleNodeCompiler(node, buffer, this, parent, parentField).compile();
				case "union": return new UnionNodeCompiler(node, buffer, this, parent, parentField).compile();
			}
		}
		compile() {
			this.#initiateJSOutput();
			this.#compileNodes();
			this.#finishJSOutput();
			const outputFunction = this.#toAsyncFunction();
			this.variablesCounter = 0;
			this.#buffer.flush();
			return outputFunction;
		}
	};
	function refsBuilder() {
		let counter = 0;
		const refs = {};
		return {
			toJSON() {
				return refs;
			},
			track(value) {
				counter++;
				const ref = `ref://${counter}`;
				refs[ref] = value;
				return ref;
			},
			trackValidation(validation) {
				return this.track(validation);
			},
			trackParser(fn) {
				return this.track(fn);
			},
			trackTransformer(fn) {
				return this.track(fn);
			},
			trackConditional(fn) {
				return this.track(fn);
			}
		};
	}

	//#region src/vine/create_rule.ts
	/**
	* Creates a reusable validation rule from a validator function.
	* The returned function can be applied to any schema type using the `schema.use()` method.
	* Automatically detects async functions and provides proper metadata.
	*
	* @template Options - The type of options the validator accepts
	* @param validator - The validation function to convert into a rule
	* @param metaData - Optional metadata about the validation rule
	* @param metaData.name - Custom name for the rule (defaults to function name)
	* @param metaData.implicit - Whether the rule runs on null/undefined values
	* @param metaData.isAsync - Whether the validator is async (auto-detected if not specified)
	* @param metaData.toJSONSchema - Optional function to modify the JSON Schema representation
	*
	* @example
	* // Simple validation rule
	* const isEven = createRule<{ strict?: boolean }>((value, options, field) => {
	*   const num = Number(value)
	*   if (num % 2 !== 0) {
	*     throw new Error('Value must be even')
	*   }
	*   return value
	* })
	*
	* // Usage with schema
	* vine.number().use(isEven({ strict: true }))
	*
	* @example
	* // Async validation rule
	* const checkUnique = createRule<{ table: string }>(async (value, { table }, field) => {
	*   const exists = await database.exists(table, value)
	*   if (exists) {
	*     throw new Error('Value must be unique')
	*   }
	*   return value
	* }, { name: 'unique', isAsync: true })
	*
	* // Usage
	* vine.string().use(checkUnique({ table: 'users' }))
	*/
	function createRule(validator, metaData) {
		const rule = {
			validator,
			name: metaData?.name ?? validator.name,
			isAsync: metaData?.isAsync || validator.constructor.name === "AsyncFunction",
			implicit: metaData?.implicit ?? false,
			toJSONSchema: metaData?.toJSONSchema
		};
		return function(...options) {
			return {
				rule,
				options: options[0]
			};
		};
	}
	/**
	* The symbol to define a unique name for the schema type.
	* Used internally to identify schema types for union type validation.
	*
	* @example
	* class MySchema {
	*   [UNIQUE_NAME] = 'mySchema'
	* }
	*/
	const UNIQUE_NAME = Symbol.for("schema_name");
	/**
	* The symbol to check if a value is of the given schema type.
	* Used by union schemas to determine which schema variant matches a value.
	*
	* @example
	* class StringSchema {
	*   [IS_OF_TYPE](value: unknown) {
	*     return typeof value === 'string'
	*   }
	* }
	*/
	const IS_OF_TYPE = Symbol.for("is_of_type");
	/**
	* The symbol for the compile method that transforms a schema into compiler nodes.
	* This method is called during schema compilation to generate validation functions.
	*
	* @example
	* class MySchema {
	*   [PARSE](propertyName: string, refs: RefsStore, options: ParserOptions) {
	*     return { type: 'literal', subtype: 'string' }
	*   }
	* }
	*/
	const PARSE = Symbol.for("parse");
	/**
	* The symbol to generate a validation rule from rule builder.
	* Used by rule builders to convert themselves into validation rules.
	*
	* @example
	* class MinLengthRule {
	*   [VALIDATION]() {
	*     return { rule: minLengthRule, options: this.length }
	*   }
	* }
	*/
	const VALIDATION = Symbol.for("to_validation");
	/**
	* The symbol for the subtype of a literal field.
	* Used to identify the specific subtype of literal schema types (string, number, etc.).
	*
	* @example
	* class StringSchema {
	*   [SUBTYPE] = 'string'
	* }
	*/
	const SUBTYPE = Symbol.for("subtype");
	//#endregion
	//#region src/schema/base/rules.ts
	/**
	* Validation rule that makes a field required when a specified condition is met.
	* This rule is implicit, meaning it runs even when the field value is undefined.
	*
	* @param checker - Callback function that returns true if the field should be required
	*
	* @example
	* vine.string().optional().use(requiredWhen((field) => {
	*   return field.data.role === 'admin'
	* }))
	*/
	const requiredWhen = createRule(function requiredWhen(_, checker, field) {
		const shouldBeRequired = checker(field);
		if (!field.isDefined && shouldBeRequired) field.report(messages.required, "required", field);
	}, { implicit: true });
	//#endregion
	//#region src/schema/base/conditional_rules.ts
	/**
	* Abstract base class providing conditional validation methods for making fields
	* required based on runtime conditions. This class is extended by schema types
	* that support conditional validation.
	*
	* @example
	* vine.string().optional().requiredWhen('role', '=', 'admin')
	*/
	var ConditionalValidations = class {
		requiredWhen(otherField, operator, expectedValue) {
			/**
			* The equality check if self implemented
			*/
			if (typeof otherField === "function") return this.use(requiredWhen(otherField));
			/**
			* Creating the checker function based upon the
			* operator used for the comparison
			*/
			let checker;
			switch (operator) {
				case "=":
					checker = (value) => value === expectedValue;
					break;
				case "!=":
					checker = (value) => value !== expectedValue;
					break;
				case "in":
					checker = (value) => expectedValue.includes(value);
					break;
				case "notIn":
					checker = (value) => !expectedValue.includes(value);
					break;
				case ">":
					checker = (value) => value > expectedValue;
					break;
				case "<":
					checker = (value) => value < expectedValue;
					break;
				case ">=":
					checker = (value) => value >= expectedValue;
					break;
				case "<=": checker = (value) => value <= expectedValue;
			}
			/**
			* Registering rule with custom implementation
			*/
			return this.use(requiredWhen((field) => {
				const otherFieldValue = helpers.getNestedValue(otherField, field);
				return checker(otherFieldValue);
			}));
		}
		/**
		* Marks the field as required when all specified fields exist (are not undefined or null).
		*
		* @param fields - Field name or array of field names to check for existence
		*
		* @example
		* vine.string().optional().requiredIfExists('email')
		*
		* @example
		* vine.string().optional().requiredIfExists(['firstName', 'lastName'])
		*/
		requiredIfExists(fields) {
			const fieldsToExist = Array.isArray(fields) ? fields : [fields];
			return this.use(requiredWhen((field) => {
				return fieldsToExist.every((otherField) => {
					return helpers.exists(helpers.getNestedValue(otherField, field));
				});
			}));
		}
		/**
		* Marks the field as required when any one of the specified fields exists (is not undefined or null).
		*
		* @param fields - Array of field names to check for existence
		*
		* @example
		* vine.string().optional().requiredIfAnyExists(['email', 'phone'])
		*/
		requiredIfAnyExists(fields) {
			return this.use(requiredWhen((field) => {
				return fields.some((otherField) => helpers.exists(helpers.getNestedValue(otherField, field)));
			}));
		}
		/**
		* Marks the field as required when all specified fields are missing (undefined or null).
		*
		* @param fields - Field name or array of field names to check for absence
		*
		* @example
		* vine.string().optional().requiredIfMissing('addressId')
		*
		* @example
		* vine.string().optional().requiredIfMissing(['street', 'city'])
		*/
		requiredIfMissing(fields) {
			const fieldsToExist = Array.isArray(fields) ? fields : [fields];
			return this.use(requiredWhen((field) => {
				return fieldsToExist.every((otherField) => helpers.isMissing(helpers.getNestedValue(otherField, field)));
			}));
		}
		/**
		* Marks the field as required when any one of the specified fields is missing (undefined or null).
		*
		* @param fields - Array of field names to check for absence
		*
		* @example
		* vine.string().optional().requiredIfAnyMissing(['street', 'city', 'zipCode'])
		*/
		requiredIfAnyMissing(fields) {
			return this.use(requiredWhen((field) => {
				return fields.some((otherField) => helpers.isMissing(helpers.getNestedValue(otherField, field)));
			}));
		}
	};
	//#endregion
	//#region src/schema/base/literal.ts
	/**
	* Modifies the schema type to allow null values
	*/
	var NullableModifier$1 = class NullableModifier$1 {
		allowNull = true;
		get isOptional() {
			return this.#parent.isOptional;
		}
		#parent;
		constructor(parent) {
			this.#parent = parent;
		}
		/**
		* Creates a fresh instance of the underlying schema type
		* and wraps it inside the nullable modifier
		*/
		clone() {
			return new NullableModifier$1(this.#parent.clone());
		}
		/**
		* Mark the field under validation as optional.
		* When combined with nullable, allows both null and undefined values.
		*
		* @returns A new OptionalModifier wrapping this nullable schema
		*/
		optional() {
			return new OptionalModifier$1(this);
		}
		/**
		* Apply a transformation to the final validated value.
		* The transformer receives the validated value and can convert it to any new datatype.
		*
		* @template TransformedOutput - The type of the transformed output
		* @param transformer - Function to transform the validated value
		* @returns A new TransformModifier wrapping this schema
		*
		* @example
		* vine.string().nullable().transform((value) => {
		*   return value ? value.toUpperCase() : null
		* })
		*/
		transform(transformer) {
			return new TransformModifier(transformer, this);
		}
		/**
		* Add meta to the field that can be retrieved once compiled.
		* It is also merged with the json-schema.
		*/
		meta(meta) {
			return new MetaModifier$1(this, meta);
		}
		toJSONSchema() {
			const schema = this.#parent.toJSONSchema?.() ?? {};
			if (schema.anyOf) {
				schema.anyOf.push({ type: "null" });
				return schema;
			}
			if (schema.enum) return { anyOf: [schema, { type: "null" }] };
			if (schema.type === void 0) {
				schema.type = "null";
				return schema;
			}
			if (typeof schema.type === "string") {
				schema.type = [schema.type, "null"];
				return schema;
			}
			if (Array.isArray(schema.type)) {
				schema.type.push("null");
				return schema;
			}
			return schema;
		}
		/**
		* Compiles to compiler node
		*/
		[PARSE](propertyName, refs, options) {
			const output = this.#parent[PARSE](propertyName, refs, options);
			output.allowNull = true;
			return output;
		}
	};
	/**
	* Adds meta data to the schema type.
	*/
	var MetaModifier$1 = class MetaModifier$1 {
		get isOptional() {
			return this.#parent.isOptional;
		}
		get allowNull() {
			return this.#parent.allowNull;
		}
		#parent;
		#meta;
		constructor(parent, meta) {
			this.#parent = parent;
			this.#meta = meta;
		}
		/**
		* Mark the field under validation as optional. An optional
		* field allows both null and undefined values.
		*/
		optional() {
			return new OptionalModifier$1(this);
		}
		/**
		* Apply a transformation to the final validated value.
		* The transformer receives the validated value and can convert it to any new datatype.
		*
		* @template TransformedOutput - The type of the transformed output
		* @param transformer - Function to transform the validated value
		* @returns A new TransformModifier wrapping this schema
		*
		* @example
		* vine.string().nullable().transform((value) => {
		*   return value ? value.toUpperCase() : null
		* })
		*/
		transform(transformer) {
			return new TransformModifier(transformer, this);
		}
		/**
		* Mark the field under validation to be null. The null value will
		* be written to the output as well.
		*
		* If `optional` and `nullable` are used together, then both undefined
		* and null values will be allowed.
		*/
		nullable() {
			return new NullableModifier$1(this);
		}
		/**
		* Creates a fresh instance of the underlying schema type
		* and wraps it inside the meta modifier
		*/
		clone() {
			return new MetaModifier$1(this.#parent.clone(), this.#meta);
		}
		toJSONSchema() {
			return {
				...this.#parent.toJSONSchema?.() ?? {},
				...this.#meta
			};
		}
		/**
		* Compiles to compiler node
		*/
		[PARSE](propertyName, refs, options) {
			const output = this.#parent[PARSE](propertyName, refs, options);
			output.allowNull = true;
			return output;
		}
	};
	/**
	* Modifies a literal schema type to allow undefined values in addition to the original type.
	* This modifier is used for form fields that may not be present in submitted data.
	*
	* @template Schema - The underlying literal schema type to make optional
	*
	* @example
	* const schema = vine.string().optional()
	* // Accepts: "hello", undefined
	* // Rejects: null (unless also nullable), 123
	*/
	var OptionalModifier$1 = class OptionalModifier$1 extends ConditionalValidations {
		isOptional = true;
		get allowNull() {
			return this.#parent.allowNull;
		}
		/** Reference to the parent schema being modified */
		#parent;
		/**
		* List of additional validations to apply to non-undefined values
		*/
		validations;
		/**
		* Creates a new optional modifier wrapping the given schema.
		*
		* @param parent - The schema to make optional
		* @param validations - Optional list of validations to apply
		*/
		constructor(parent, validations) {
			super();
			this.#parent = parent;
			this.validations = validations || [];
		}
		/**
		* Shallow clones the validations. Since there are no APIs to mutate
		* the validation options, we can safely copy them by reference.
		*
		* @returns Cloned array of validations
		*/
		cloneValidations() {
			return this.validations.map((validation) => {
				return {
					options: validation.options,
					rule: validation.rule
				};
			});
		}
		/**
		* Compiles validations into a format suitable for the validator compiler.
		*
		* @param refs - Reference store for tracking validation functions
		* @returns Compiled validation definitions
		*/
		compileValidations(refs) {
			return this.validations.map((validation) => {
				return {
					ruleFnId: refs.track({
						validator: validation.rule.validator,
						options: validation.options
					}),
					name: validation.rule.name,
					implicit: validation.rule.implicit,
					isAsync: validation.rule.isAsync
				};
			});
		}
		/**
		* Mark the field under validation to be null. The null value will
		* be written to the output as well.
		*
		* If `optional` and `nullable` are used together, then both undefined
		* and null values will be allowed.
		*/
		nullable() {
			return new NullableModifier$1(this);
		}
		/**
		* Apply transform on the final validated value. The transform method may
		* convert the value to any new datatype.
		*/
		transform(transformer) {
			return new TransformModifier(transformer, this);
		}
		/**
		* Push a validation to the validations chain.
		*/
		use(validation) {
			this.validations.push(VALIDATION in validation ? validation[VALIDATION]() : validation);
			return this;
		}
		/**
		* Creates a fresh instance of the underlying schema type
		* and wraps it inside the optional modifier
		*/
		clone() {
			return new OptionalModifier$1(this.#parent.clone(), this.cloneValidations());
		}
		/**
		* Add meta to the field that can be retrieved once compiled.
		* It is also merged with the json-schema.
		*/
		meta(meta) {
			return new MetaModifier$1(this, meta);
		}
		toJSONSchema() {
			return { ...this.#parent.toJSONSchema() };
		}
		/**
		* Compiles to compiler node
		*/
		[PARSE](propertyName, refs, options) {
			const output = this.#parent[PARSE](propertyName, refs, options);
			output.isOptional = true;
			output.validations = output.validations.concat(this.compileValidations(refs));
			return output;
		}
	};
	/**
	* Modifies a literal schema type to apply custom transformations to validated values.
	* This modifier allows converting validated values to any new datatype after validation.
	*
	* @template Schema - The underlying literal schema type to transform
	* @template Output - The type of the transformed output
	*
	* @example
	* const schema = vine.string().transform((value) => value.toUpperCase())
	* // Input: "hello" -> Output: "HELLO"
	*/
	var TransformModifier = class TransformModifier {
		get isOptional() {
			return this.#parent.isOptional;
		}
		get allowNull() {
			return this.#parent.allowNull;
		}
		/** Reference to the parent schema being transformed */
		#parent;
		/** The transformation function to apply */
		#transform;
		/**
		* Creates a new transform modifier wrapping the given schema.
		*
		* @param transform - The transformation function to apply to validated values
		* @param parent - The schema to apply transformations to
		*/
		constructor(transform, parent) {
			this.#transform = transform;
			this.#parent = parent;
		}
		/**
		* Creates a fresh instance of the underlying schema type
		* and wraps it inside the transform modifier.
		*
		* @returns A cloned instance of this transform modifier
		*/
		clone() {
			return new TransformModifier(this.#transform, this.#parent.clone());
		}
		/**
		* Mark the field under validation as optional. An optional
		* field allows both null and undefined values.
		*/
		optional() {
			return new OptionalModifier$1(this);
		}
		/**
		* Mark the field under validation to be null. The null value will
		* be written to the output as well.
		*
		* If `optional` and `nullable` are used together, then both undefined
		* and null values will be allowed.
		*/
		nullable() {
			return new NullableModifier$1(this);
		}
		/**
		* Add meta to the field that can be retrieved once compiled.
		* It is also merged with the json-schema.
		*/
		meta(meta) {
			return new MetaModifier$1(this, meta);
		}
		toJSONSchema() {
			return this.#parent.toJSONSchema();
		}
		/**
		* Compiles to compiler node
		*/
		[PARSE](propertyName, refs, options) {
			const output = this.#parent[PARSE](propertyName, refs, options);
			output.transformFnId = refs.trackTransformer(this.#transform);
			return output;
		}
	};
	/**
	* The base type for creating a custom literal type. Literal types
	* are schema types that have no children elements, such as strings,
	* numbers, booleans, and dates.
	*
	* @template Input - The expected input type for this schema
	* @template Output - The output type after validation and transformation
	* @template CamelCaseOutput - The output type with camelCase field names
	*
	* @example
	* class CustomLiteralType extends BaseLiteralType<string, string, string> {
	*   [SUBTYPE] = 'custom'
	*   clone() { return new CustomLiteralType() }
	* }
	*/
	var BaseLiteralType = class extends Macroable {
		/**
		* The validation to use for validating the schema data type.
		* Using a data type validator guards custom rules to only run when
		* the data type validation passes.
		*
		* @example
		* class StringSchema extends BaseLiteralType {
		*   dataTypeValidator = stringDataTypeRule
		* }
		*/
		dataTypeValidator;
		/**
		* Configuration options for this field including bail mode, nullability, and parsing
		*/
		options;
		/**
		* Array of validation rules to apply to the field value
		*/
		validations;
		/**
		* Creates a new BaseLiteralType instance with optional configuration.
		*
		* @param options - Field options like bail mode and nullability
		* @param validations - Initial set of validations to apply
		*/
		constructor(options, validations) {
			super();
			this.options = {
				bail: true,
				allowNull: false,
				isOptional: false,
				...options
			};
			this.validations = validations || [];
		}
		/**
		* Shallow clones the validations. Since there are no APIs to mutate
		* the validation options, we can safely copy them by reference.
		*
		* @returns Cloned array of validations
		*/
		cloneValidations() {
			return this.validations.map((validation) => {
				return {
					options: validation.options,
					rule: validation.rule
				};
			});
		}
		/**
		* Shallow clones the field options.
		*
		* @returns Cloned field options object
		*/
		cloneOptions() {
			return { ...this.options };
		}
		/**
		* Compiles a single validation rule into a compiler validation node.
		*
		* @param validation - The validation rule to compile
		* @param refs - Reference store for tracking validation functions
		* @returns Compiled validation node
		*/
		compileValidation(validation, refs) {
			return {
				ruleFnId: refs.track({
					validator: validation.rule.validator,
					options: validation.options
				}),
				name: validation.rule.name,
				implicit: validation.rule.implicit,
				isAsync: validation.rule.isAsync
			};
		}
		/**
		* Compiles all validation rules into compiler validation nodes.
		*
		* @param refs - Reference store for tracking validation functions
		* @returns Array of compiled validation nodes
		*/
		compileValidations(refs) {
			return this.validations.map((validation) => this.compileValidation(validation, refs));
		}
		toJSONSchema() {
			const schema = {};
			if (this.dataTypeValidator?.rule.toJSONSchema) this.dataTypeValidator.rule.toJSONSchema(schema, this.dataTypeValidator.options);
			for (const validation of this.validations) {
				if (!validation.rule.toJSONSchema) continue;
				validation.rule.toJSONSchema(schema, validation.options);
			}
			return schema;
		}
		/**
		* Define a method to parse the input value. The method
		* is invoked before any validation and hence you must
		* perform type-checking to know the value you are
		* working it.
		*/
		parse(callback) {
			this.options.parse = callback;
			return this;
		}
		/**
		* Adds a validation rule to the schema's validation chain.
		* Rules are executed in the order they are added.
		*
		* @param validation - The validation rule or rule builder to add
		* @returns This schema instance for method chaining
		*
		* @example
		* vine.string().use(minLength({ length: 3 }))
		* vine.number().use(customRule({ strict: true }))
		*/
		use(validation) {
			this.validations.push(VALIDATION in validation ? validation[VALIDATION]() : validation);
			return this;
		}
		/**
		* Enable/disable bail mode for this field.
		* In bail mode, field validations stop after the first error.
		*
		* @param state - Whether to enable bail mode
		* @returns This schema instance for method chaining
		*
		* @example
		* vine.string().bail(false) // Continue validation after first error
		* vine.number().bail(true)  // Stop after first error (default)
		*/
		bail(state) {
			this.options.bail = state;
			return this;
		}
		/**
		* Mark the field under validation as optional. An optional
		* field allows both null and undefined values.
		*/
		optional() {
			return new OptionalModifier$1(this);
		}
		/**
		* Mark the field under validation to be null. The null value will
		* be written to the output as well.
		*
		* If `optional` and `nullable` are used together, then both undefined
		* and null values will be allowed.
		*/
		nullable() {
			return new NullableModifier$1(this);
		}
		/**
		* Add meta to the field that can be retrieved once compiled.
		* It is also merged with the json-schema.
		*/
		meta(meta) {
			return new MetaModifier$1(this, meta);
		}
		/**
		* Apply transform on the final validated value. The transform method may
		* convert the value to any new datatype.
		*/
		transform(transformer) {
			return new TransformModifier(transformer, this);
		}
		/**
		* Compiles the literal schema type into a compiler node.
		* This method transforms the schema definition into a format
		* that the validation compiler can process.
		*
		* @param propertyName - Name of the property being compiled
		* @param refs - Reference store for the compiler
		* @param options - Parser options including camelCase conversion
		* @returns Compiled literal node with subtype information
		*/
		[PARSE](propertyName, refs, options) {
			return {
				type: "literal",
				subtype: this[SUBTYPE],
				fieldName: propertyName,
				...this.dataTypeValidator ? { dataTypeValidatorFnId: this.compileValidation(this.dataTypeValidator, refs).ruleFnId } : {},
				propertyName: options.toCamelCase ? camelCase(propertyName) : propertyName,
				bail: this.options.bail,
				allowNull: this.options.allowNull,
				isOptional: this.options.isOptional,
				parseFnId: this.options.parse ? refs.trackParser(this.options.parse) : void 0,
				validations: this.compileValidations(refs)
			};
		}
	};
	//#endregion
	//#region src/schema/any/main.ts
	/**
	* VineAny represents a schema type that accepts any value without validation.
	* It allows strings, numbers, booleans, arrays, objects, and any other type.
	* Use this when you want to accept any input but still want to apply custom validations.
	*
	* @example
	* const schema = vine.any()
	*
	* const result = await vine.validate({
	*   schema,
	*   data: 'any value, including objects and arrays'
	* })
	*/
	var VineAny = class VineAny extends BaseLiteralType {
		/**
		* Creates a new VineAny instance with optional configuration.
		*
		* @param options - Field options like bail mode and nullability
		* @param validations - Initial set of validations to apply
		*/
		constructor(options, validations) {
			super(options, validations);
		}
		/**
		* The subtype identifier for the literal schema field
		*/
		[SUBTYPE] = "any";
		/**
		* Clones the VineAny schema type. The applied options
		* and validations are copied to the new instance.
		*
		* @returns A cloned instance of this VineAny schema
		*/
		clone() {
			return new VineAny(this.cloneOptions(), this.cloneValidations());
		}
		/**
		* Converts the schema to JSON Schema format.
		* Returns a schema with an anyOf constraint covering multiple types.
		*/
		toJSONSchema() {
			const schema = { anyOf: [
				{ type: "string" },
				{ type: "number" },
				{ type: "boolean" },
				{ type: "array" },
				{ type: "object" }
			] };
			for (const validation of this.validations) {
				if (!validation.rule.toJSONSchema) continue;
				validation.rule.toJSONSchema(schema, validation.options);
			}
			return schema;
		}
	};
	//#endregion
	//#region src/schema/enum/rules.ts
	/**
	* Enum rule validates that a field's value is one of the pre-defined choices.
	*
	* The choices can be provided as a static array or as a function that returns
	* an array, allowing for dynamic choice lists based on the field context.
	*
	* @example
	* vine.string().use(enumRule({ choices: ['red', 'blue', 'green'] }))
	*
	* @example
	* vine.string().use(enumRule({
	*   choices: (field) => field.data.availableColors
	* }))
	*/
	const enumRule = createRule(function enumList(value, options, field) {
		const choices = typeof options.choices === "function" ? options.choices(field) : options.choices;
		/**
		* Report error when value is not part of the pre-defined
		* options
		*/
		if (!choices.includes(value)) field.report(messages.enum, "enum", field, { choices });
	}, { toJSONSchema: (schema, options) => {
		if (typeof options.choices === "function") return;
		schema.enum = options.choices;
	} });
	//#endregion
	//#region src/schema/enum/main.ts
	/**
	* VineEnum represents an enum data type that performs validation
	* against a pre-defined choices list. It ensures the input value
	* matches one of the allowed enum values exactly.
	*
	* @template Values - The readonly array of allowed enum values
	*
	* @example
	* const schema = vine.enum(['active', 'inactive', 'pending'] as const)
	*
	* const result = await vine.validate({
	*   schema,
	*   data: 'active' // Must be one of the defined values
	* })
	*/
	var VineEnum = class VineEnum extends BaseLiteralType {
		/**
		* Static collection of all available validation rules for enums
		*/
		static rules = { enum: enumRule };
		/**
		* The allowed enum values or a function that returns them dynamically
		*/
		#values;
		/**
		* The subtype identifier for the literal schema field
		*/
		[SUBTYPE] = "enum";
		/**
		* Returns the enum choices, either static values or function.
		*
		* @returns The enum values or generator function
		*/
		getChoices() {
			return this.#values;
		}
		/**
		* Creates a new VineEnum instance with the specified allowed values.
		*
		* @param values - Array of allowed values or function returning allowed values
		* @param options - Field options like bail mode and nullability
		* @param validations - Initial set of validations to apply
		*/
		constructor(values, options, validations) {
			super(options, validations || [enumRule({ choices: values })]);
			this.#values = values;
		}
		/**
		* Clones the VineEnum schema type. The applied options
		* and validations are copied to the new instance.
		*
		* @returns A cloned instance of this VineEnum schema
		*/
		clone() {
			return new VineEnum(this.#values, this.cloneOptions(), this.cloneValidations());
		}
	};
	//#endregion
	//#region src/schema/date/rules.ts
	/**
	* Validates the value to be a string or number formatted
	* as per the expected date-time format.
	*/
	const dateRule = createRule(function date(value, options, field) {
		if (!field.isDefined) return false;
		if (typeof value !== "string" && typeof value !== "number") {
			field.report(messages.date, "date", field);
			return false;
		}
		const { dateTime, formats } = helpers.asDayJS(value, options.formats);
		/**
		* Ensure post parsing the datetime instance is valid
		*/
		if (!dateTime.isValid()) {
			field.report(messages.date, "date", field);
			return false;
		}
		field.$value = dateTime;
		field.$formats = formats;
		field.mutate(globalTransforms.date ? globalTransforms.date(dateTime.toDate()) : dateTime.toDate(), field);
		return true;
	});
	/**
	* The equals rule compares the input value to be same
	* as the expected value.
	*
	* By default, the comparions of day, month and years are performed
	*/
	const equalsRule$1 = createRule(function equals(_, options, field) {
		const compare = options.compare || "day";
		const format = options.format || field.$formats;
		const dateTime = field.$value;
		const expectedValue = typeof options.expectedValue === "function" ? options.expectedValue(field) : options.expectedValue;
		const { dateTime: expectedDateTime } = helpers.asDayJS(expectedValue, format);
		if (!expectedDateTime.isValid()) throw new Error(`Invalid datetime value "${expectedValue}" provided to the equals rule`);
		/**
		* Ensure both the dates are the same
		*/
		if (!dateTime.isSame(expectedDateTime, compare)) field.report(messages["date.equals"], "date.equals", field, {
			expectedValue,
			compare
		});
	});
	/**
	* The after rule compares the input value to be after
	* the expected value.
	*
	* By default, the comparions of day, month and years are performed.
	*/
	const afterRule = createRule(function after(_, options, field) {
		const compare = options.compare || "day";
		const format = options.format || field.$formats;
		const dateTime = field.$value;
		const expectedValue = typeof options.expectedValue === "function" ? options.expectedValue(field) : options.expectedValue;
		const expectedDateTime = expectedValue === "today" ? dayjs() : expectedValue === "tomorrow" ? dayjs().add(1, "day") : helpers.asDayJS(expectedValue, format).dateTime;
		if (!expectedDateTime.isValid()) throw new Error(`Invalid datetime value "${expectedValue}" provided to the after rule`);
		/**
		* Ensure the input is after the expected value
		*/
		if (!dateTime.isAfter(expectedDateTime, compare)) field.report(messages["date.after"], "date.after", field, {
			expectedValue,
			compare
		});
	});
	/**
	* The after or equal rule compares the input value to be
	* after or equal to the expected value.
	*
	* By default, the comparions of day, month and years are performed.
	*/
	const afterOrEqualRule = createRule(function afterOrEqual(_, options, field) {
		const compare = options.compare || "day";
		const format = options.format || field.$formats;
		const dateTime = field.$value;
		const expectedValue = typeof options.expectedValue === "function" ? options.expectedValue(field) : options.expectedValue;
		const expectedDateTime = expectedValue === "today" ? dayjs() : expectedValue === "tomorrow" ? dayjs().add(1, "day") : helpers.asDayJS(expectedValue, format).dateTime;
		if (!expectedDateTime.isValid()) throw new Error(`Invalid datetime value "${expectedValue}" provided to the afterOrEqual rule`);
		/**
		* Ensure both the dates are the same or the input
		* is after than the expected value.
		*/
		if (!dateTime.isSameOrAfter(expectedDateTime, compare)) field.report(messages["date.afterOrEqual"], "date.afterOrEqual", field, {
			expectedValue,
			compare
		});
	});
	/**
	* The before rule compares the input value to be before
	* the expected value.
	*
	* By default, the comparions of day, month and years are performed.
	*/
	const beforeRule = createRule(function before(_, options, field) {
		const compare = options.compare || "day";
		const format = options.format || field.$formats;
		const dateTime = field.$value;
		const expectedValue = typeof options.expectedValue === "function" ? options.expectedValue(field) : options.expectedValue;
		const expectedDateTime = expectedValue === "today" ? dayjs() : expectedValue === "yesterday" ? dayjs().subtract(1, "day") : helpers.asDayJS(expectedValue, format).dateTime;
		if (!expectedDateTime.isValid()) throw new Error(`Invalid datetime value "${expectedValue}" provided to the before rule`);
		/**
		* Ensure the input is before the expected value
		*/
		if (!dateTime.isBefore(expectedDateTime, compare)) field.report(messages["date.before"], "date.before", field, {
			expectedValue,
			compare
		});
	});
	/**
	* The before or equal rule compares the input value to be
	* before or equal to the expected value.
	*
	* By default, the comparions of day, month and years are performed.
	*/
	const beforeOrEqualRule = createRule(function beforeOrEqual(_, options, field) {
		const compare = options.compare || "day";
		const format = options.format || field.$formats;
		const dateTime = field.$value;
		const expectedValue = typeof options.expectedValue === "function" ? options.expectedValue(field) : options.expectedValue;
		const expectedDateTime = expectedValue === "today" ? dayjs() : expectedValue === "yesterday" ? dayjs().subtract(1, "day") : helpers.asDayJS(expectedValue, format).dateTime;
		if (!expectedDateTime.isValid()) throw new Error(`Invalid datetime value "${expectedValue}" provided to the beforeOrEqual rule`);
		/**
		* Ensure the input is same or before the expected value
		*/
		if (!dateTime.isSameOrBefore(expectedDateTime, compare)) field.report(messages["date.beforeOrEqual"], "date.beforeOrEqual", field, {
			expectedValue,
			compare
		});
	});
	/**
	* The sameAs rule expects the input value to be same
	* as the value of the other field.
	*
	* By default, the comparions of day, month and years are performed
	*/
	const sameAsRule$1 = createRule(function sameAs(_, options, field) {
		const compare = options.compare || "day";
		const dateTime = field.$value;
		const format = options.format || field.$formats;
		const expectedValue = helpers.getNestedValue(options.otherField, field);
		const expectedDateTime = helpers.asDayJS(expectedValue, format).dateTime;
		/**
		* Skip validation when the other field is not a valid
		* datetime. We will let the `date` rule on that
		* other field to handle the invalid date.
		*/
		if (!expectedDateTime.isValid()) return;
		/**
		* Ensure both the dates are the same
		*/
		if (!dateTime.isSame(expectedDateTime, compare)) field.report(messages["date.sameAs"], "date.sameAs", field, {
			otherField: options.otherField,
			expectedValue,
			compare
		});
	});
	/**
	* The notSameAs rule expects the input value to be different
	* from the other field's value
	*
	* By default, the comparions of day, month and years are performed
	*/
	const notSameAsRule$1 = createRule(function notSameAs(_, options, field) {
		const compare = options.compare || "day";
		const dateTime = field.$value;
		const format = options.format || field.$formats;
		const expectedValue = helpers.getNestedValue(options.otherField, field);
		const expectedDateTime = helpers.asDayJS(expectedValue, format).dateTime;
		/**
		* Skip validation when the other field is not a valid
		* datetime. We will let the `date` rule on that
		* other field to handle the invalid date.
		*/
		if (!expectedDateTime.isValid()) return;
		/**
		* Ensure both the dates are different
		*/
		if (dateTime.isSame(expectedDateTime, compare)) field.report(messages["date.notSameAs"], "date.notSameAs", field, {
			otherField: options.otherField,
			expectedValue,
			compare
		});
	});
	/**
	* The afterField rule expects the input value to be after
	* the other field's value.
	*
	* By default, the comparions of day, month and years are performed
	*/
	const afterFieldRule = createRule(function afterField(_, options, field) {
		const compare = options.compare || "day";
		const dateTime = field.$value;
		const format = options.format || field.$formats;
		const expectedValue = helpers.getNestedValue(options.otherField, field);
		const expectedDateTime = helpers.asDayJS(expectedValue, format).dateTime;
		/**
		* Skip validation when the other field is not a valid
		* datetime. We will let the `date` rule on that
		* other field to handle the invalid date.
		*/
		if (!expectedDateTime.isValid()) return;
		/**
		* Ensure the input date is after the other field's value
		*/
		if (!dateTime.isAfter(expectedDateTime, compare)) field.report(messages["date.afterField"], "date.afterField", field, {
			otherField: options.otherField,
			expectedValue,
			compare
		});
	});
	/**
	* The afterOrSameAs rule expects the input value to be after
	* or same as the other field's value.
	*
	* By default, the comparions of day, month and years are performed
	*/
	const afterOrSameAsRule = createRule(function afterOrSameAs(_, options, field) {
		const compare = options.compare || "day";
		const dateTime = field.$value;
		const format = options.format || field.$formats;
		const expectedValue = helpers.getNestedValue(options.otherField, field);
		const expectedDateTime = helpers.asDayJS(expectedValue, format).dateTime;
		/**
		* Skip validation when the other field is not a valid
		* datetime. We will let the `date` rule on that
		* other field to handle the invalid date.
		*/
		if (!expectedDateTime.isValid()) return;
		/**
		* Ensure the input date is same as or after the other field's value
		*/
		if (!dateTime.isSameOrAfter(expectedDateTime, compare)) field.report(messages["date.afterOrSameAs"], "date.afterOrSameAs", field, {
			otherField: options.otherField,
			expectedValue,
			compare
		});
	});
	/**
	* The beforeField rule expects the input value to be before
	* the other field's value.
	*
	* By default, the comparions of day, month and years are performed
	*/
	const beforeFieldRule = createRule(function beforeField(_, options, field) {
		const compare = options.compare || "day";
		const dateTime = field.$value;
		const format = options.format || field.$formats;
		const expectedValue = helpers.getNestedValue(options.otherField, field);
		const expectedDateTime = helpers.asDayJS(expectedValue, format).dateTime;
		/**
		* Skip validation when the other field is not a valid
		* datetime. We will let the `date` rule on that
		* other field to handle the invalid date.
		*/
		if (!expectedDateTime.isValid()) return;
		/**
		* Ensure the input date is before the other field's value
		*/
		if (!dateTime.isBefore(expectedDateTime, compare)) field.report(messages["date.beforeField"], "date.beforeField", field, {
			otherField: options.otherField,
			expectedValue,
			compare
		});
	});
	/**
	* The beforeOrSameAs rule expects the input value to be before
	* or same as the other field's value.
	*
	* By default, the comparions of day, month and years are performed
	*/
	const beforeOrSameAsRule = createRule(function beforeOrSameAs(_, options, field) {
		const compare = options.compare || "day";
		const dateTime = field.$value;
		const format = options.format || field.$formats;
		const expectedValue = helpers.getNestedValue(options.otherField, field);
		const expectedDateTime = helpers.asDayJS(expectedValue, format).dateTime;
		/**
		* Skip validation when the other field is not a valid
		* datetime. We will let the `date` rule on that
		* other field to handle the invalid date.
		*/
		if (!expectedDateTime.isValid()) return;
		/**
		* Ensure the input date is before or same as the other field's value
		*/
		if (!dateTime.isSameOrBefore(expectedDateTime, compare)) field.report(messages["date.beforeOrSameAs"], "date.beforeOrSameAs", field, {
			otherField: options.otherField,
			expectedValue,
			compare
		});
	});
	/**
	* The weekend rule ensures the date falls on a weekend
	*/
	const weekendRule = createRule(function weekend(_, __, field) {
		const day = field.$value.day();
		if (day !== 0 && day !== 6) field.report(messages["date.weekend"], "date.weekend", field);
	});
	/**
	* The weekday rule ensures the date falls on a weekday
	*/
	const weekdayRule = createRule(function weekday(_, __, field) {
		const day = field.$value.day();
		if (day === 0 || day === 6) field.report(messages["date.weekday"], "date.weekday", field);
	});
	//#endregion
	//#region src/schema/date/main.ts
	/**
	* VineDate represents a Date object created by parsing a string or number value as a date.
	* It accepts various date formats and converts them to JavaScript Date objects,
	* with comprehensive validation rules for date comparisons and ranges.
	*
	* @example
	* const schema = vine.date()
	*   .after('today')
	*   .before('2025-12-31')
	*
	* const result = await vine.validate({
	*   schema,
	*   data: '2025-06-15'
	* })
	*/
	var VineDate = class VineDate extends BaseLiteralType {
		/**
		* Sets a global transformer function for all date values.
		* The transformer is applied to every validated date value.
		*
		* @param transformer - Function that transforms a Date object to a custom type
		*
		* @example
		* VineDate.transform((value) => value.toISOString())
		*/
		static transform(transformer) {
			globalTransforms.date = transformer;
		}
		/**
		* Static collection of all available validation rules for dates
		*/
		static rules = {
			equals: equalsRule$1,
			after: afterRule,
			afterOrEqual: afterOrEqualRule,
			before: beforeRule,
			beforeOrEqual: beforeOrEqualRule,
			sameAs: sameAsRule$1,
			notSameAs: notSameAsRule$1,
			afterField: afterFieldRule,
			afterOrSameAs: afterOrSameAsRule,
			beforeField: beforeFieldRule,
			beforeOrSameAs: beforeOrSameAsRule,
			weekend: weekendRule,
			weekday: weekdayRule
		};
		/**
		* Unique name identifier for union type resolution
		*/
		[UNIQUE_NAME] = "vine.date";
		/**
		* The subtype identifier for the literal schema field
		*/
		[SUBTYPE] = "date";
		/**
		* Type checker function to determine if a value can be parsed as a date.
		* Required for "unionOfTypes" functionality.
		*
		* @param value - The value to check
		* @returns True if the value can be parsed as a valid date
		*/
		[IS_OF_TYPE] = (value) => {
			if (typeof value !== "string") return false;
			return helpers.asDayJS(value, this.options.formats).dateTime.isValid();
		};
		/**
		* Creates a new VineDate instance with optional configuration.
		*
		* @param options - Field options including date formats and nullability
		* @param validations - Initial set of validations to apply
		*/
		constructor(options, validations) {
			super(options, validations || []);
			this.dataTypeValidator = dateRule(options || {});
		}
		/**
		* Validates the date to be equal to the expected value.
		* By default, compares day, month, and year.
		*
		* @param expectedValue - The expected date value or 'today'
		* @param options - Comparison options (compare unit and format)
		* @returns This date schema instance for method chaining
		*
		* @example
		* vine.date().equals('2025-01-01')
		* vine.date().equals('today')
		* vine.date().equals('2025-01-01', { compare: 'month' })
		*/
		equals(expectedValue, options) {
			return this.use(equalsRule$1({
				expectedValue,
				...options
			}));
		}
		/**
		* Validates the date to be after the expected value.
		* By default, compares day, month, and year.
		*
		* @param expectedValue - The expected date value, 'today', or 'tomorrow'
		* @param options - Comparison options (compare unit and format)
		* @returns This date schema instance for method chaining
		*
		* @example
		* vine.date().after('today')
		* vine.date().after('2025-01-01')
		* vine.date().after('tomorrow', { compare: 'hour' })
		*/
		after(expectedValue, options) {
			return this.use(afterRule({
				expectedValue,
				...options
			}));
		}
		/**
		* Validates the date to be after or equal to the expected value.
		* By default, compares day, month, and year.
		*
		* @param expectedValue - The expected date value, 'today', or 'tomorrow'
		* @param options - Comparison options (compare unit and format)
		* @returns This date schema instance for method chaining
		*
		* @example
		* vine.date().afterOrEqual('today')
		* vine.date().afterOrEqual('2025-01-01')
		*/
		afterOrEqual(expectedValue, options) {
			return this.use(afterOrEqualRule({
				expectedValue,
				...options
			}));
		}
		/**
		* Validates the date to be before the expected value.
		* By default, compares day, month, and year.
		*
		* @param expectedValue - The expected date value, 'today', or 'yesterday'
		* @param options - Comparison options (compare unit and format)
		* @returns This date schema instance for method chaining
		*
		* @example
		* vine.date().before('today')
		* vine.date().before('2025-12-31')
		* vine.date().before('yesterday')
		*/
		before(expectedValue, options) {
			return this.use(beforeRule({
				expectedValue,
				...options
			}));
		}
		/**
		* Validates the date to be before or equal to the expected value.
		* By default, compares day, month, and year.
		*
		* @param expectedValue - The expected date value, 'today', or 'yesterday'
		* @param options - Comparison options (compare unit and format)
		* @returns This date schema instance for method chaining
		*
		* @example
		* vine.date().beforeOrEqual('today')
		* vine.date().beforeOrEqual('2025-12-31')
		*/
		beforeOrEqual(expectedValue, options) {
			return this.use(beforeOrEqualRule({
				expectedValue,
				...options
			}));
		}
		/**
		* Validates the date to be equal to another field's value.
		* By default, compares day, month, and year.
		*
		* @param otherField - The name of the other field to compare with
		* @param options - Comparison options (compare unit and format)
		* @returns This date schema instance for method chaining
		*
		* @example
		* vine.date().sameAs('startDate')
		* vine.date().sameAs('birthDate', { compare: 'month' })
		*/
		sameAs(otherField, options) {
			return this.use(sameAsRule$1({
				otherField,
				...options
			}));
		}
		/**
		* Validates the date to be different from another field's value.
		* By default, compares day, month, and year.
		*
		* @param otherField - The name of the other field to compare with
		* @param options - Comparison options (compare unit and format)
		* @returns This date schema instance for method chaining
		*
		* @example
		* vine.date().notSameAs('endDate')
		* vine.date().notSameAs('previousDate')
		*/
		notSameAs(otherField, options) {
			return this.use(notSameAsRule$1({
				otherField,
				...options
			}));
		}
		/**
		* Validates the date to be after another field's value.
		* By default, compares day, month, and year.
		*
		* @param otherField - The name of the other field to compare with
		* @param options - Comparison options (compare unit and format)
		* @returns This date schema instance for method chaining
		*
		* @example
		* vine.date().afterField('startDate')
		* vine.date().afterField('createdAt', { compare: 'minute' })
		*/
		afterField(otherField, options) {
			return this.use(afterFieldRule({
				otherField,
				...options
			}));
		}
		/**
		* Validates the date to be after or equal to another field's value.
		* By default, compares day, month, and year.
		*
		* @param otherField - The name of the other field to compare with
		* @param options - Comparison options (compare unit and format)
		* @returns This date schema instance for method chaining
		*
		* @example
		* vine.date().afterOrSameAs('startDate')
		*/
		afterOrSameAs(otherField, options) {
			return this.use(afterOrSameAsRule({
				otherField,
				...options
			}));
		}
		/**
		* Validates the date to be before another field's value.
		* By default, compares day, month, and year.
		*
		* @param otherField - The name of the other field to compare with
		* @param options - Comparison options (compare unit and format)
		* @returns This date schema instance for method chaining
		*
		* @example
		* vine.date().beforeField('endDate')
		* vine.date().beforeField('expiresAt')
		*/
		beforeField(otherField, options) {
			return this.use(beforeFieldRule({
				otherField,
				...options
			}));
		}
		/**
		* Validates the date to be before or equal to another field's value.
		* By default, compares day, month, and year.
		*
		* @param otherField - The name of the other field to compare with
		* @param options - Comparison options (compare unit and format)
		* @returns This date schema instance for method chaining
		*
		* @example
		* vine.date().beforeOrSameAs('endDate')
		*/
		beforeOrSameAs(otherField, options) {
			return this.use(beforeOrSameAsRule({
				otherField,
				...options
			}));
		}
		/**
		* Validates the date to fall on a weekend (Saturday or Sunday).
		*
		* @returns This date schema instance for method chaining
		*
		* @example
		* vine.date().weekend()
		*/
		weekend() {
			return this.use(weekendRule());
		}
		/**
		* Validates the date to fall on a weekday (Monday to Friday).
		*
		* @returns This date schema instance for method chaining
		*
		* @example
		* vine.date().weekday()
		*/
		weekday() {
			return this.use(weekdayRule());
		}
		/**
		* Clones the VineDate schema type. The applied options
		* and validations are copied to the new instance.
		*
		* @returns A cloned instance of this VineDate schema
		*/
		clone() {
			return new VineDate(this.cloneOptions(), this.cloneValidations());
		}
	};
	//#endregion
	//#region src/schema/null/main.ts
	/**
	* VineNull represents a schema type that only accepts null values.
	* Typically used inside union types to explicitly allow null as a valid value.
	*
	* @example
	* const schema = vine.union([
	*   vine.string(),
	*   vine.null()
	* ])
	*
	* const result = await vine.validate({
	*   schema,
	*   data: null
	* })
	*/
	var VineNull = class VineNull {
		/**
		* The subtype identifier for the literal schema field
		*/
		[SUBTYPE] = "null";
		/**
		* Unique name identifier for union type resolution
		*/
		[UNIQUE_NAME] = "vine.null";
		/**
		* Type checker function to determine if a value is null.
		* Required for "unionOfTypes" functionality.
		*
		* @param value - The value to check
		* @returns True if the value is null
		*/
		[IS_OF_TYPE] = (value) => {
			return value === null;
		};
		/**
		* Field configuration options
		*/
		options;
		/**
		* Creates a new VineNull instance with optional configuration.
		*
		* @param options - Field options like bail mode (defaults allow null)
		*/
		constructor(options) {
			this.options = {
				bail: true,
				allowNull: true,
				isOptional: false,
				...options
			};
		}
		/**
		* Creates a shallow clone of the field options.
		*/
		cloneOptions() {
			return { ...this.options };
		}
		/**
		* Clones the VineNull schema type. The applied options
		* are copied to the new instance.
		*
		* @returns A cloned instance of this VineNull schema
		*/
		clone() {
			return new VineNull(this.cloneOptions());
		}
		/**
		* Converts the schema to JSON Schema format.
		* Returns a schema with type 'null'.
		*/
		toJSONSchema() {
			return { type: "null" };
		}
		/**
		* Compiles the schema type to a compiler node for validation.
		*
		* @param propertyName - The name of the property being validated
		* @param refs - Reference store for tracking parsers and validators
		* @param options - Parser options including camelCase conversion
		*/
		[PARSE](propertyName, refs, options) {
			return {
				type: "literal",
				subtype: this[SUBTYPE],
				fieldName: propertyName,
				propertyName: options.toCamelCase ? camelCase(propertyName) : propertyName,
				bail: this.options.bail,
				allowNull: this.options.allowNull,
				isOptional: this.options.isOptional,
				parseFnId: this.options.parse ? refs.trackParser(this.options.parse) : void 0,
				validations: []
			};
		}
	};
	//#endregion
	//#region src/schema/union/conditional.ts
	/**
	* Represents a union conditional type. A conditional is a predicate
	* function combined with a schema that is applied when the predicate
	* evaluates to true.
	*
	* Each conditional acts as a branch in the union, determining which
	* validation schema should be applied based on runtime conditions.
	*
	* @template Schema - The schema type to apply when condition is met
	*/
	var UnionConditional = class {
		/**
		* Schema to apply when conditional is true
		*/
		#schema;
		/**
		* Predicate function to evaluate
		*/
		#conditional;
		/**
		* Creates a new UnionConditional instance.
		*
		* @param conditional - Function that determines if this branch matches
		* @param schema - Schema to apply when the conditional returns true
		*/
		constructor(conditional, schema) {
			this.#schema = schema;
			this.#conditional = conditional;
		}
		/**
		* Transforms the conditional's schema into JSON Schema format.
		*/
		toJSONSchema() {
			return this.#schema.toJSONSchema?.();
		}
		/**
		* Compiles the conditional to a union conditional node.
		*
		* @param propertyName - The name of the property being validated
		* @param refs - Reference store for tracking validators and conditionals
		* @param options - Parser options including camelCase transformation
		*/
		[PARSE](propertyName, refs, options) {
			return {
				conditionalFnRefId: refs.trackConditional(this.#conditional),
				schema: this.#schema[PARSE](propertyName, refs, options)
			};
		}
	};
	//#endregion
	//#region src/schema/optional/main.ts
	/**
	* VineOptional represents an optional value inside a union or schema.
	* It allows both null and undefined values to pass validation.
	*
	* This type is typically used with unions to make certain branches
	* optional, or to explicitly mark a field as allowing undefined/null values.
	*
	* @template Output - The output type when the value is defined
	*
	* @example
	* const schema = vine.object({
	*   name: vine.string().optional()
	* })
	*
	* @example
	* const schema = vine.unionOfTypes([
	*   vine.string(),
	*   vine.optional()
	* ])
	*/
	var VineOptional = class VineOptional extends ConditionalValidations {
		/**
		* The subtype identifier for the literal schema field
		*/
		[SUBTYPE] = "optional";
		/**
		* Unique name identifier for union type resolution
		*/
		[UNIQUE_NAME] = "vine.optional";
		/**
		* Type checker function to determine if a value is optional (null or undefined).
		* Required for "unionOfTypes" functionality.
		*
		* @param value - The value to check
		*/
		[IS_OF_TYPE] = (value) => {
			return value === null || value === void 0;
		};
		/**
		* Field options controlling validation behavior
		*/
		options;
		/**
		* Set of validations to run on the field
		*/
		validations;
		/**
		* Creates a new VineOptional instance.
		*
		* @param options - Field options like bail mode and nullability
		* @param validations - Initial set of validations to apply
		*/
		constructor(options, validations) {
			super();
			this.options = {
				bail: true,
				allowNull: false,
				isOptional: true,
				...options
			};
			this.validations = validations || [];
		}
		/**
		* Shallow clones the validations. Since there are no APIs to mutate
		* the validation options, we can safely copy them by reference.
		*
		* @returns Array of cloned validation objects
		*/
		cloneValidations() {
			return this.validations.map((validation) => {
				return {
					options: validation.options,
					rule: validation.rule
				};
			});
		}
		/**
		* Shallow clones the field options.
		*
		* @returns Cloned field options object
		*/
		cloneOptions() {
			return { ...this.options };
		}
		/**
		* Compiles validations into a format suitable for the compiler.
		*
		* @param refs - Reference store for tracking validators
		*/
		compileValidations(refs) {
			return this.validations.map((validation) => {
				return {
					ruleFnId: refs.track({
						validator: validation.rule.validator,
						options: validation.options
					}),
					implicit: validation.rule.implicit,
					isAsync: validation.rule.isAsync
				};
			});
		}
		/**
		* Define a method to parse the input value. The method
		* is invoked before any validation and hence you must
		* perform type-checking to know the value you are working with.
		*
		* @param callback - Parser function to transform the input value
		*/
		parse(callback) {
			this.options.parse = callback;
			return this;
		}
		/**
		* Push a validation to the validations chain.
		*
		* @param validation - Validation rule or rule builder to add
		*/
		use(validation) {
			this.validations.push(VALIDATION in validation ? validation[VALIDATION]() : validation);
			return this;
		}
		/**
		* Enable/disable the bail mode. In bail mode, the field validations
		* are stopped after the first error.
		*
		* @param state - True to enable bail mode, false to disable
		*/
		bail(state) {
			this.options.bail = state;
			return this;
		}
		/**
		* Clones the VineOptional schema type. The applied options
		* and validations are copied to the new instance.
		*
		* @returns A cloned instance of this VineOptional schema
		*/
		clone() {
			return new VineOptional(this.cloneOptions(), this.cloneValidations());
		}
		/**
		* Mark the field under validation to be nullable. The null value will
		* be written to the output as well. When combined with optional,
		* both null and undefined values are allowed.
		*/
		nullable() {
			return new VineOptional({
				...this.options,
				allowNull: true
			});
		}
		/**
		* Transforms into JSON Schema format.
		*/
		toJSONSchema() {
			return {};
		}
		/**
		* Compiles the schema type to a compiler node.
		*
		* @param propertyName - The name of the property being validated
		* @param refs - Reference store for tracking validators and parsers
		* @param options - Parser options including camelCase transformation
		*/
		[PARSE](propertyName, refs, options) {
			return {
				type: "literal",
				subtype: this[SUBTYPE],
				fieldName: propertyName,
				propertyName: options.toCamelCase ? camelCase(propertyName) : propertyName,
				bail: this.options.bail,
				allowNull: this.options.allowNull,
				isOptional: this.options.isOptional,
				parseFnId: this.options.parse ? refs.trackParser(this.options.parse) : void 0,
				validations: this.compileValidations(refs)
			};
		}
	};
	//#endregion
	//#region src/schema/union/main.ts
	/**
	* Vine union represents a union data type. A union is a collection
	* of conditionals and each condition has an associated schema.
	*
	* Unions allow you to define validation logic where different schemas
	* are applied based on runtime conditions. Each conditional is evaluated
	* in order, and the first matching condition's schema is used for validation.
	*
	* @template Conditional - The union conditional type extending UnionConditional
	*
	* @example
	* const schema = vine.object({
	*   userType: vine.string(),
	*   data: vine.union([
	*     vine.union.if(
	*       (value) => value.userType === 'admin',
	*       vine.object({ permissions: vine.array(vine.string()) })
	*     ),
	*     vine.union.else(
	*       vine.object({ role: vine.string() })
	*     )
	*   ])
	* })
	*/
	var VineUnion = class VineUnion {
		/**
		* Array of conditional branches to evaluate
		*/
		#conditionals;
		/**
		* Callback to invoke when no conditional matches
		*/
		#otherwiseCallback = (_, field) => {
			field.report(messages.union, "union", field);
		};
		/**
		* Creates a new VineUnion instance with the specified conditionals.
		*
		* @param conditionals - Array of conditional branches to evaluate
		*/
		constructor(conditionals) {
			this.#conditionals = conditionals;
		}
		/**
		* Mark the field under validation as optional. An optional
		* field allows both null and undefined values.
		*/
		optional() {
			const optional = new VineOptional();
			return new VineUnion([new UnionConditional(optional[IS_OF_TYPE], optional), ...this.#conditionals]);
		}
		/**
		* Mark the field under validation to be null. The null value will
		* be written to the output as well.
		*
		* If `optional` and `nullable` are used together, then both undefined
		* and null values will be allowed.
		*/
		nullable() {
			const nullable = new VineNull();
			return new VineUnion([new UnionConditional(nullable[IS_OF_TYPE], nullable), ...this.#conditionals]);
		}
		/**
		* Define a fallback method to invoke when all of the union conditions
		* fail. You may use this method to report an error.
		*/
		otherwise(callback) {
			this.#otherwiseCallback = callback;
			return this;
		}
		/**
		* Transforms into JSONSchema.
		*/
		toJSONSchema() {
			return { anyOf: this.#conditionals.map((conditional) => conditional.toJSONSchema()).filter(Boolean) };
		}
		/**
		* Clones the VineUnion schema type.
		*/
		clone() {
			const cloned = new VineUnion(this.#conditionals);
			cloned.otherwise(this.#otherwiseCallback);
			return cloned;
		}
		/**
		* Compiles the union schema to a compiler node.
		*
		* @param propertyName - The name of the property being validated
		* @param refs - Reference store for tracking validators and conditionals
		* @param options - Parser options including camelCase transformation
		*/
		[PARSE](propertyName, refs, options) {
			return {
				type: "union",
				fieldName: propertyName,
				propertyName: options.toCamelCase ? camelCase(propertyName) : propertyName,
				elseConditionalFnRefId: refs.trackConditional(this.#otherwiseCallback),
				conditions: this.#conditionals.map((conditional) => conditional[PARSE](propertyName, refs, options))
			};
		}
	};
	//#endregion
	//#region src/schema/union/builder.ts
	/**
	* Create a new union schema type. A union is a collection of conditionals
	* and schema associated with it.
	*
	* Unions evaluate conditionals in order and apply the first matching schema.
	* Use `union.if()` to define conditional branches and `union.else()` for
	* the default fallback.
	*
	* @template Conditional - The union conditional type
	* @param conditionals - Array of conditional branches to evaluate
	*
	* @example
	* const schema = vine.union([
	*   vine.union.if(
	*     (value) => typeof value === 'string',
	*     vine.string()
	*   ),
	*   vine.union.if(
	*     (value) => typeof value === 'number',
	*     vine.number()
	*   )
	* ])
	*/
	function union(conditionals) {
		return new VineUnion(conditionals);
	}
	/**
	* Wrap a schema inside a conditional branch. The condition is evaluated
	* at runtime, and if it returns a truthy value, the associated schema
	* is used for validation.
	*
	* @template Schema - The schema type to apply when condition matches
	* @param conditon - Function that evaluates whether this branch should be used
	* @param schema - The schema to apply if the condition is true
	*
	* @example
	* vine.union.if(
	*   (value) => value.type === 'email',
	*   vine.object({ email: vine.string().email() })
	* )
	*/
	union.if = function unionIf(conditon, schema) {
		return new UnionConditional(conditon, schema);
	};
	/**
	* Wrap a schema inside an else (default) conditional. This branch
	* always matches and should be placed last in the union conditionals array.
	*
	* @template Schema - The schema type to apply as default
	* @param schema - The schema to apply when no other conditions match
	*
	* @example
	* vine.union([
	*   vine.union.if((value) => value.type === 'admin', adminSchema),
	*   vine.union.else(userSchema)
	* ])
	*/
	union.else = function unionElse(schema) {
		return new UnionConditional(() => true, schema);
	};
	//#endregion
	//#region src/schema/base/main.ts
	/**
	* Modifies the schema type to allow null values in addition to the
	* original schema type. This is useful for optional database fields
	* or API responses that may contain null values.
	*
	* @template Schema - The underlying schema type to modify
	*
	* @example
	* const schema = vine.string().nullable()
	* // Accepts: "hello", null
	* // Rejects: undefined, 123
	*/
	var NullableModifier = class NullableModifier {
		allowNull = true;
		get isOptional() {
			return this.#parent.isOptional;
		}
		/**
		* Reference to the parent schema being modified
		*/
		#parent;
		/**
		* Creates a new nullable modifier wrapping the given schema.
		*
		* @param parent - The schema to make nullable
		*/
		constructor(parent) {
			this.#parent = parent;
		}
		/**
		* Mark the field under validation as optional. An optional
		* field allows both null and undefined values.
		*
		* @returns A new OptionalModifier wrapping this nullable schema
		*/
		optional() {
			return new OptionalModifier(this);
		}
		/**
		* Add meta to the field that can be retrieved once compiled.
		* It is also merged with the json-schema.
		*/
		meta(meta) {
			return new MetaModifier(this, meta);
		}
		/**
		* Creates a fresh instance of the underlying schema type
		* and wraps it inside the nullable modifier.
		*
		* @returns A cloned instance of this nullable modifier
		*/
		clone() {
			return new NullableModifier(this.#parent.clone());
		}
		toJSONSchema() {
			const schema = this.#parent.toJSONSchema?.();
			if (!schema) return { type: "null" };
			if (schema.anyOf) {
				schema.anyOf.push({ type: "null" });
				return schema;
			}
			if (schema.type === void 0) {
				schema.type = "null";
				return schema;
			}
			if (typeof schema.type === "string") {
				schema.type = [schema.type, "null"];
				return schema;
			}
			if (Array.isArray(schema.type)) {
				schema.type.push("null");
				return schema;
			}
			return schema;
		}
		/**
		* Compiles to compiler node by delegating to the parent schema
		* and setting the allowNull flag.
		*
		* @param propertyName - Name of the property being compiled
		* @param refs - Reference store for the compiler
		* @param options - Parser options
		* @returns Compiled compiler node with null support
		*/
		[PARSE](propertyName, refs, options) {
			const output = this.#parent[PARSE](propertyName, refs, options);
			if (output.type !== "union") output.allowNull = true;
			return output;
		}
	};
	var MetaModifier = class MetaModifier {
		get allowNull() {
			return this.#parent.allowNull;
		}
		get isOptional() {
			return this.#parent.isOptional;
		}
		#parent;
		#meta;
		constructor(parent, meta) {
			this.#parent = parent;
			this.#meta = meta;
		}
		/**
		* Creates a fresh instance of the underlying schema type
		* and wraps it inside the meta modifier
		*/
		clone() {
			return new MetaModifier(this.#parent.clone(), this.#meta);
		}
		toJSONSchema() {
			return {
				...this.#parent.toJSONSchema?.() ?? {},
				...this.#meta
			};
		}
		/**
		* Compiles to compiler node by delegating to the parent schema
		* and setting the allowNull flag.
		*
		* @param propertyName - Name of the property being compiled
		* @param refs - Reference store for the compiler
		* @param options - Parser options
		* @returns Compiled compiler node with null support
		*/
		[PARSE](propertyName, refs, options) {
			return this.#parent[PARSE](propertyName, refs, options);
		}
	};
	/**
	* Modifies the schema type to allow undefined values in addition to the
	* original schema type. This is useful for form fields that may not be
	* present in the submitted data.
	*
	* @template Schema - The underlying schema type to modify
	*
	* @example
	* const schema = vine.string().optional()
	* // Accepts: "hello", undefined
	* // Rejects: null (unless also nullable), 123
	*/
	var OptionalModifier = class OptionalModifier extends ConditionalValidations {
		isOptional = true;
		get allowNull() {
			return this.#parent.allowNull;
		}
		/**
		* Reference to the parent schema being modified
		*/
		#parent;
		/**
		* List of validations to apply to non-undefined values
		*/
		validations;
		/**
		* Creates a new optional modifier wrapping the given schema.
		*
		* @param parent - The schema to make optional
		* @param validations - Optional list of validations to apply
		*/
		constructor(parent, validations) {
			super();
			this.#parent = parent;
			this.validations = validations || [];
		}
		/**
		* Shallow clones the validations. Since, there are no API's to mutate
		* the validation options, we can safely copy them by reference.
		*
		* @returns Cloned array of validations
		*/
		cloneValidations() {
			return this.validations.map((validation) => {
				return {
					options: validation.options,
					rule: validation.rule
				};
			});
		}
		/**
		* Compiles validations into a format suitable for the validator compiler.
		*
		* @param refs - Reference store for tracking validation functions
		* @returns Compiled validation definitions
		*/
		compileValidations(refs) {
			return this.validations.map((validation) => {
				return {
					ruleFnId: refs.track({
						validator: validation.rule.validator,
						options: validation.options
					}),
					name: validation.rule.name,
					implicit: validation.rule.implicit,
					isAsync: validation.rule.isAsync
				};
			});
		}
		/**
		* Mark the field under validation to be null. The null value will
		* be written to the output as well.
		*
		* If `optional` and `nullable` are used together, then both undefined
		* and null values will be allowed.
		*/
		nullable() {
			return new NullableModifier(this);
		}
		/**
		* Add meta to the field that can be retrieved once compiled.
		* It is also merged with the json-schema.
		*/
		meta(meta) {
			return new MetaModifier(this, meta);
		}
		/**
		* Push a validation to the validations chain.
		*/
		use(validation) {
			this.validations.push(VALIDATION in validation ? validation[VALIDATION]() : validation);
			return this;
		}
		/**
		* Creates a fresh instance of the underlying schema type
		* and wraps it inside the optional modifier
		*/
		clone() {
			return new OptionalModifier(this.#parent.clone(), this.cloneValidations());
		}
		toJSONSchema() {
			return { ...this.#parent.toJSONSchema() };
		}
		/**
		* Compiles to compiler node
		*/
		[PARSE](propertyName, refs, options) {
			const output = this.#parent[PARSE](propertyName, refs, options);
			if (output.type !== "union") {
				output.isOptional = true;
				output.validations = output.validations.concat(this.compileValidations(refs));
			}
			return output;
		}
	};
	/**
	* The BaseType class abstracts the repetitive parts of creating
	* a custom schema type. It provides common functionality like validation
	* chaining, optional/nullable modifiers, and compilation logic.
	*
	* @template Input - The expected input type for this schema
	* @template Output - The output type after validation and transformation
	* @template CamelCaseOutput - The output type with camelCase field names
	*
	* @example
	* class CustomStringType extends BaseType<string, string, string> {
	*   [PARSE](propertyName: string, refs: RefsStore, options: ParserOptions) {
	*     return { type: 'literal', name: propertyName, ... }
	*   }
	*   clone() { return new CustomStringType() }
	* }
	*/
	var BaseType = class extends Macroable {
		/**
		* The child class must implement the toJSONSchema method to
		* support converting into a JSON Schema.
		*
		* Otherwise it returns an empty schema which is considered as any.
		*
		* @returns JSON Schema
		*/
		toJSONSchema() {
			return {};
		}
		/**
		* Set of validations to run on the field value
		*/
		validations;
		/**
		* Configuration options for this field
		*/
		options;
		/**
		* Creates a new BaseType instance with optional configuration.
		*
		* @param options - Field options like bail mode and nullability
		* @param validations - Initial set of validations to apply
		*/
		constructor(options, validations) {
			super();
			this.options = options || {
				bail: true,
				allowNull: false,
				isOptional: false
			};
			this.validations = validations || [];
		}
		/**
		* Shallow clones the validations. Since, there are no API's to mutate
		* the validation options, we can safely copy them by reference.
		*/
		cloneValidations() {
			return this.validations.map((validation) => {
				return {
					options: validation.options,
					rule: validation.rule
				};
			});
		}
		/**
		* Shallow clones the options
		*/
		cloneOptions() {
			return { ...this.options };
		}
		/**
		* Compiles validations
		*/
		compileValidations(refs) {
			return this.validations.map((validation) => {
				return {
					ruleFnId: refs.track({
						validator: validation.rule.validator,
						options: validation.options
					}),
					name: validation.rule.name,
					implicit: validation.rule.implicit,
					isAsync: validation.rule.isAsync
				};
			});
		}
		/**
		* Define a method to parse the input value. The method
		* is invoked before any validation and hence you must
		* perform type-checking to know the value you are working with.
		*
		* @param callback - Parser function to transform the input value
		* @returns This schema instance for method chaining
		*
		* @example
		* vine.string().parse((value) => {
		*   return typeof value === 'string' ? value.trim() : value
		* })
		*/
		parse(callback) {
			this.options.parse = callback;
			return this;
		}
		/**
		* Push a validation to the validations chain.
		*
		* @param validation - Validation rule or rule builder to add
		* @returns This schema instance for method chaining
		*
		* @example
		* vine.string().use(vine.createRule((value) => {
		*   return value.length > 0
		* }))
		*/
		use(validation) {
			this.validations.push(VALIDATION in validation ? validation[VALIDATION]() : validation);
			return this;
		}
		/**
		* Enable/disable the bail mode. In bail mode, the field validations
		* are stopped after the first error.
		*
		* @param state - Whether to enable bail mode
		* @returns This schema instance for method chaining
		*/
		bail(state) {
			this.options.bail = state;
			return this;
		}
		/**
		* Mark the field under validation as optional. An optional
		* field allows both null and undefined values.
		*
		* @returns A new OptionalModifier wrapping this schema
		*/
		optional() {
			return new OptionalModifier(this);
		}
		/**
		* Mark the field under validation to be null. The null value will
		* be written to the output as well.
		*
		* If `optional` and `nullable` are used together, then both undefined
		* and null values will be allowed.
		*
		* @returns A new NullableModifier wrapping this schema
		*/
		nullable() {
			return new NullableModifier(this);
		}
		/**
		* Add meta to the field that can be retrieved once compiled.
		* It is also merged with the json-schema.
		*/
		meta(meta) {
			return new MetaModifier(this, meta);
		}
	};
	//#endregion
	//#region src/schema/tuple/main.ts
	/**
	* VineTuple represents a fixed-length array where each position has a specific schema type.
	* Unlike VineArray which uses the same schema for all elements, tuples allow different
	* types at different positions, similar to TypeScript tuples.
	*
	* @template Schema - Array of schema types for each tuple position
	* @template Input - Expected input type for the tuple
	* @template Output - Output type after validation and transformation
	* @template CamelCaseOutput - Output type with camelCase property names
	*
	* @example
	* const schema = vine.tuple([
	*   vine.string(),
	*   vine.number(),
	*   vine.boolean()
	* ])
	*
	* const result = await vine.validate({
	*   schema,
	*   data: ['hello', 42, true]
	* })
	*/
	var VineTuple = class VineTuple extends BaseType {
		/**
		* Array of schemas defining the type for each tuple position
		*/
		#schemas;
		/**
		* Whether to allow additional elements beyond the defined tuple length
		*/
		#allowUnknownProperties = false;
		/**
		* Unique name identifier for union type resolution
		*/
		[UNIQUE_NAME] = "vine.array";
		/**
		* Type checker function to determine if a value is an array.
		* Required for "unionOfTypes" functionality.
		*
		* @param value - The value to check
		* @returns True if the value is an array
		*/
		[IS_OF_TYPE] = (value) => {
			return Array.isArray(value);
		};
		/**
		* Creates a new VineTuple instance with position-specific schemas.
		*
		* @param schemas - Array of schemas defining validation for each tuple position
		* @param options - Field options like bail mode and nullability
		* @param validations - Initial set of validations to apply
		*/
		constructor(schemas, options, validations) {
			super(options, validations);
			this.#schemas = schemas;
		}
		/**
		* Allows additional elements beyond the defined tuple length to pass through validation.
		* By default, tuples enforce exact length matching. This method relaxes that constraint.
		*
		* @returns This tuple schema with unknown properties allowed
		*
		* @example
		* const schema = vine.tuple([
		*   vine.string(),
		*   vine.number()
		* ]).allowUnknownProperties()
		*
		* // Now ['hello', 42, 'extra'] will pass validation
		*/
		allowUnknownProperties() {
			this.#allowUnknownProperties = true;
			return this;
		}
		/**
		* Clones the VineTuple schema including all position schemas, validations, and options.
		*
		* @returns A cloned instance of this VineTuple schema
		*/
		clone() {
			const cloned = new VineTuple(this.#schemas.map((schema) => schema.clone()), this.cloneOptions(), this.cloneValidations());
			if (this.#allowUnknownProperties) cloned.allowUnknownProperties();
			return cloned;
		}
		/**
		* Converts the tuple schema to JSON Schema format.
		*
		* @returns JSON Schema representation of this tuple
		*/
		toJSONSchema() {
			const items = [];
			for (const item of this.#schemas) {
				if (!item.toJSONSchema) continue;
				items.push(item.toJSONSchema());
			}
			const schema = {
				type: "array",
				minItems: this.#schemas.length,
				maxItems: this.#schemas.length,
				additionalItems: false,
				items
			};
			for (const validation of this.validations) {
				if (!validation.rule.toJSONSchema) continue;
				validation.rule.toJSONSchema(schema, validation.options);
			}
			return schema;
		}
		/**
		* Compiles the tuple schema to a compiler node for validation.
		*
		* @param propertyName - Name of the property being compiled
		* @param refs - Reference store for the compiler
		* @param options - Parser options
		* @returns Compiled tuple node for validation
		*/
		[PARSE](propertyName, refs, options) {
			return {
				type: "tuple",
				fieldName: propertyName,
				propertyName: options.toCamelCase ? camelCase(propertyName) : propertyName,
				bail: this.options.bail,
				allowNull: this.options.allowNull,
				isOptional: this.options.isOptional,
				allowUnknownProperties: this.#allowUnknownProperties,
				parseFnId: this.options.parse ? refs.trackParser(this.options.parse) : void 0,
				validations: this.compileValidations(refs),
				properties: this.#schemas.map((schema, index) => schema[PARSE](String(index), refs, options))
			};
		}
	};
	//#endregion
	//#region src/schema/array/rules.ts
	/**
	* Enforce a minimum length on an array field.
	*
	* Validates that an array contains at least the specified number of elements.
	*
	* @example
	* vine.array(vine.string()).minLength(2)
	*/
	const minLengthRule$2 = createRule(function minLength(value, options, field) {
		/**
		* Value will always be an array if the field is valid.
		*/
		if (value.length < options.min) field.report(messages["array.minLength"], "array.minLength", field, options);
	}, { toJSONSchema: (schema, options) => {
		schema.minItems = options.min;
	} });
	/**
	* Enforce a maximum length on an array field.
	*
	* Validates that an array contains at most the specified number of elements.
	*
	* @example
	* vine.array(vine.string()).maxLength(10)
	*/
	const maxLengthRule$2 = createRule(function maxLength(value, options, field) {
		/**
		* Value will always be an array if the field is valid.
		*/
		if (value.length > options.max) field.report(messages["array.maxLength"], "array.maxLength", field, options);
	}, { toJSONSchema: (schema, options) => {
		schema.maxItems = options.max;
	} });
	/**
	* Enforce a fixed length on an array field.
	*
	* Validates that an array contains exactly the specified number of elements.
	*
	* @example
	* vine.array(vine.string()).fixedLength(5)
	*/
	const fixedLengthRule$2 = createRule(function fixedLength(value, options, field) {
		/**
		* Value will always be an array if the field is valid.
		*/
		if (value.length !== options.size) field.report(messages["array.fixedLength"], "array.fixedLength", field, options);
	}, { toJSONSchema: (schema, options) => {
		schema.minItems = options.size;
		schema.maxItems = options.size;
	} });
	/**
	* Ensure the array is not empty.
	*
	* Validates that an array contains at least one element.
	*
	* @example
	* vine.array(vine.string()).notEmpty()
	*/
	const notEmptyRule = createRule(function notEmpty(value, _, field) {
		/**
		* Value will always be an array if the field is valid.
		*/
		if (value.length <= 0) field.report(messages.notEmpty, "notEmpty", field);
	}, { toJSONSchema: (schema) => {
		schema.minItems = 1;
	} });
	/**
	* Ensure array elements are distinct/unique.
	*
	* For primitive arrays, validates that all elements are unique.
	* For object arrays, validates uniqueness based on specified field(s).
	*
	* @example
	* // Validate primitive array uniqueness
	* vine.array(vine.string()).distinct()
	*
	* @example
	* // Validate object array uniqueness by field
	* vine.array(vine.object({ id: vine.number() })).distinct('id')
	*
	* @example
	* // Validate object array uniqueness by multiple fields
	* vine.array(vine.object({
	*   name: vine.string(),
	*   email: vine.string()
	* })).distinct(['name', 'email'])
	*/
	const distinctRule = createRule(function distinct(value, options, field) {
		/**
		* Value will always be an array if the field is valid.
		*/
		if (!helpers.isDistinct(value, options.fields)) field.report(messages.distinct, "distinct", field, options);
	}, { toJSONSchema: (schema) => {
		schema.uniqueItems = true;
	} });
	/**
	* Removes empty strings, null and undefined values from the array.
	*
	* This rule mutates the array by filtering out falsy values and empty strings.
	* It does not fail validation but transforms the input by removing unwanted values.
	*
	* @example
	* vine.array(vine.string()).compact()
	* // Input: ['a', '', null, 'b', undefined]
	* // Output: ['a', 'b']
	*/
	const compactRule = createRule(function compact(value, _, field) {
		/**
		* Skip if the field is not valid.
		*/
		if (!field.isValid) return;
		field.mutate(value.filter((item) => helpers.exists(item) && item !== ""), field);
	});
	//#endregion
	//#region src/schema/array/main.ts
	/**
	* VineArray represents an array schema type in the validation pipeline.
	* It validates arrays and their elements using a nested schema, with support
	* for length constraints, uniqueness checks, and element filtering.
	*
	* @template Schema - The schema type for validating array elements
	*
	* @example
	* const schema = vine.array(vine.string().email())
	*   .minLength(1)
	*   .maxLength(10)
	*   .distinct()
	*
	* const result = await vine.validate({
	*   schema,
	*   data: ['user1@example.com', 'user2@example.com']
	* })
	*/
	var VineArray = class VineArray extends BaseType {
		/**
		* Static collection of all available validation rules for arrays
		*/
		static rules = {
			compact: compactRule,
			notEmpty: notEmptyRule,
			distinct: distinctRule,
			minLength: minLengthRule$2,
			maxLength: maxLengthRule$2,
			fixedLength: fixedLengthRule$2
		};
		/**
		* The schema used to validate each element in the array
		*/
		#schema;
		/**
		* Unique name identifier for union type resolution
		*/
		[UNIQUE_NAME] = "vine.array";
		/**
		* Type checker function to determine if a value is an array.
		* Required for "unionOfTypes" functionality.
		*
		* @param value - The value to check
		* @returns True if the value is an array
		*/
		[IS_OF_TYPE] = (value) => {
			return Array.isArray(value);
		};
		/**
		* Creates a new VineArray instance with element schema and optional configuration.
		*
		* @param schema - The schema to validate each array element
		* @param options - Field options like bail mode and nullability
		* @param validations - Initial set of validations to apply
		*/
		constructor(schema, options, validations) {
			super(options, validations);
			this.#schema = schema;
		}
		/**
		* Enforce a minimum length on an array field.
		*
		* @param expectedLength - The minimum required number of elements
		* @returns This array schema instance for method chaining
		*/
		minLength(expectedLength) {
			return this.use(minLengthRule$2({ min: expectedLength }));
		}
		/**
		* Enforce a maximum length on an array field.
		*
		* @param expectedLength - The maximum allowed number of elements
		* @returns This array schema instance for method chaining
		*/
		maxLength(expectedLength) {
			return this.use(maxLengthRule$2({ max: expectedLength }));
		}
		/**
		* Enforce a fixed length on an array field.
		*
		* @param expectedLength - The exact required number of elements
		* @returns This array schema instance for method chaining
		*/
		fixedLength(expectedLength) {
			return this.use(fixedLengthRule$2({ size: expectedLength }));
		}
		/**
		* Ensure the array is not empty.
		*
		* @returns This array schema instance for method chaining
		*/
		notEmpty() {
			return this.use(notEmptyRule());
		}
		/**
		* Ensure array elements are distinct/unique.
		*
		* @param fields - Optional field names to check for uniqueness in object arrays
		* @returns This array schema instance for method chaining
		*/
		distinct(fields) {
			return this.use(distinctRule({ fields }));
		}
		/**
		* Removes empty strings, null and undefined values from the array.
		*
		* @returns This array schema instance for method chaining
		*/
		compact() {
			return this.use(compactRule());
		}
		/**
		* Clones the VineArray schema type. The applied options
		* and validations are copied to the new instance.
		*
		* @returns A cloned instance of this VineArray schema
		*/
		clone() {
			return new VineArray(this.#schema.clone(), this.cloneOptions(), this.cloneValidations());
		}
		/**
		* Transforms into JSONSchema.
		*/
		toJSONSchema() {
			const schema = {
				type: "array",
				items: this.#schema.toJSONSchema?.() ?? {}
			};
			for (const validation of this.validations) {
				if (!validation.rule.toJSONSchema) continue;
				validation.rule.toJSONSchema(schema, validation.options);
			}
			return schema;
		}
		/**
		* Compiles to array data type for the validation compiler.
		*
		* @param propertyName - Name of the property being compiled
		* @param refs - Reference store for the compiler
		* @param options - Parser options
		* @returns Compiled array node for validation
		*/
		[PARSE](propertyName, refs, options) {
			return {
				type: "array",
				fieldName: propertyName,
				propertyName: options.toCamelCase ? camelCase(propertyName) : propertyName,
				bail: this.options.bail,
				allowNull: this.options.allowNull,
				isOptional: this.options.isOptional,
				each: this.#schema[PARSE]("*", refs, options),
				parseFnId: this.options.parse ? refs.trackParser(this.options.parse) : void 0,
				validations: this.compileValidations(refs)
			};
		}
	};
	//#endregion
	//#region src/schema/object/main.ts
	/**
	* Converts schema properties to camelCase during validation.
	* This is a wrapper around VineObject that automatically converts
	* property names from snake_case to camelCase in the output.
	*
	* @template Schema - The underlying VineObject schema type
	*
	* @example
	* const schema = vine.object({
	*   first_name: vine.string(),
	*   last_name: vine.string()
	* }).camelCase()
	*
	* // Output will have: { firstName: string, lastName: string }
	*/
	var VineCamelCaseObject = class VineCamelCaseObject extends BaseType {
		/**
		* Reference to the underlying object schema
		*/
		#schema;
		/**
		* Unique name identifier for union type resolution
		*/
		[UNIQUE_NAME] = "types.object";
		/**
		* Type checker function to determine if a value is an object.
		* Required for "unionOfTypes" functionality.
		*
		* @param value - The value to check
		* @returns True if the value is a non-null object and not an array
		*/
		[IS_OF_TYPE] = (value) => {
			return value !== null && typeof value === "object" && !Array.isArray(value);
		};
		/**
		* Creates a new VineCamelCaseObject instance wrapping the given schema.
		*
		* @param schema - The VineObject schema to wrap with camelCase conversion
		*/
		constructor(schema) {
			super();
			this.#schema = schema;
		}
		/**
		* Clone object with camelCase conversion preserved.
		*
		* @returns A cloned instance of this VineCamelCaseObject schema
		*/
		clone() {
			return new VineCamelCaseObject(this.#schema.clone());
		}
		/**
		* Converts the object schema to JSON Schema format.
		*
		* @returns JSON Schema representation of this object
		*/
		toJSONSchema() {
			return this.#schema.toJSONSchema();
		}
		/**
		* Compiles the schema type to a compiler node with camelCase enabled.
		*
		* @param propertyName - Name of the property being compiled
		* @param refs - Reference store for the compiler
		* @param options - Parser options
		* @returns Compiled object node with camelCase conversion
		*/
		[PARSE](propertyName, refs, options) {
			options.toCamelCase = true;
			return this.#schema[PARSE](propertyName, refs, options);
		}
	};
	/**
	* VineObject represents an object value in the validation schema.
	* It validates objects with predefined properties, supports conditional
	* groups, and provides control over unknown properties.
	*
	* @template Properties - Record of property names to their schema types
	* @template Input - The expected input type for this object
	* @template Output - The output type after validation and transformation
	* @template CamelCaseOutput - The output type with camelCase property names
	*
	* @example
	* const schema = vine.object({
	*   name: vine.string(),
	*   email: vine.string().email(),
	*   age: vine.number().min(0)
	* })
	*
	* const result = await vine.validate({
	*   schema,
	*   data: { name: 'John', email: 'john@example.com', age: 30 }
	* })
	*/
	var VineObject = class VineObject extends BaseType {
		/**
		* Object properties mapping property names to their validation schemas
		*/
		#properties;
		/**
		* Object groups to merge based on conditionals.
		* These allow adding properties dynamically based on conditions.
		*/
		#groups = [];
		/**
		* Whether or not to allow unknown properties that are not defined
		* in the schema. When false, unknown properties cause validation errors.
		*/
		#allowUnknownProperties = false;
		/**
		* Unique name identifier for union type resolution
		*/
		[UNIQUE_NAME] = "vine.object";
		/**
		* Type checker function to determine if a value is an object.
		* Required for "unionOfTypes" functionality.
		*
		* @param value - The value to check
		* @returns True if the value is a non-null object and not an array
		*/
		[IS_OF_TYPE] = (value) => {
			return value !== null && typeof value === "object" && !Array.isArray(value);
		};
		/**
		* Creates a new VineObject instance with property schemas and optional configuration.
		*
		* @param properties - Record of property names to their validation schemas
		* @param options - Field options like bail mode and nullability
		* @param validations - Initial set of validations to apply
		* @throws Error if properties is not provided
		*/
		constructor(properties, options, validations) {
			if (!properties) throw new Error("Missing properties for \"vine.object\". Use an empty object if you do not want to validate any specific fields");
			super(options, validations);
			this.#properties = properties;
		}
		/**
		* Returns a cloned copy of all object properties with their validation schemas.
		* Note: Object groups are not included to keep implementations simple.
		*
		* @returns Cloned properties record
		*
		* @example
		* const properties = schema.getProperties()
		*/
		getProperties() {
			return Object.keys(this.#properties).reduce((result, key) => {
				result[key] = this.#properties[key].clone();
				return result;
			}, {});
		}
		/**
		* Returns a cloned subset of object properties containing only the specified keys.
		*
		* @param keys - Array of property keys to include
		* @returns Picked properties record
		*
		* @example
		* const userSchema = vine.object({
		*   name: vine.string(),
		*   email: vine.string().email(),
		*   password: vine.string()
		* })
		*
		* const publicFields = userSchema.pick(['name', 'email'])
		*/
		pick(keys) {
			const result = {};
			for (const key of keys) result[key] = this.#properties[key].clone();
			return result;
		}
		/**
		* Returns a cloned copy of object properties excluding the specified keys.
		*
		* @param keys - Array of property keys to exclude
		* @returns Omitted properties record
		*
		* @example
		* const userSchema = vine.object({
		*   name: vine.string(),
		*   email: vine.string().email(),
		*   password: vine.string()
		* })
		*
		* const withoutPassword = userSchema.omit(['password'])
		*/
		omit(keys) {
			const result = {};
			for (const key of Object.keys(this.#properties)) if (!keys.includes(key)) result[key] = this.#properties[key].clone();
			return result;
		}
		/**
		* Allows unknown properties to pass through validation and be included in the output.
		* By default, objects with properties not defined in the schema will fail validation.
		*
		* @returns This object schema with unknown properties allowed
		*
		* @example
		* const schema = vine.object({
		*   name: vine.string()
		* }).allowUnknownProperties()
		*
		* // Now { name: 'John', extra: 'value' } will pass validation
		*/
		allowUnknownProperties() {
			this.#allowUnknownProperties = true;
			return this;
		}
		/**
		* Merges conditional property groups into the object schema. Groups allow
		* adding properties dynamically based on runtime conditions.
		*
		* @param group - The conditional group to merge
		* @returns This object schema with the group merged
		*
		* @example
		* const schema = vine.object({
		*   type: vine.string()
		* }).merge(
		*   vine.group([
		*     vine.group.if('type', 'user', { name: vine.string() }),
		*     vine.group.if('type', 'admin', { permissions: vine.array(vine.string()) })
		*   ])
		* )
		*/
		merge(group) {
			this.#groups.push(group);
			return this;
		}
		/**
		* Clones the VineObject schema including all properties, validations, groups, and options.
		*
		* @returns A cloned instance of this VineObject schema
		*/
		clone() {
			const cloned = new VineObject(this.getProperties(), this.cloneOptions(), this.cloneValidations());
			this.#groups.forEach((group) => cloned.merge(group));
			if (this.#allowUnknownProperties) cloned.allowUnknownProperties();
			return cloned;
		}
		/**
		* Converts object property names to camelCase in the validation output.
		* Useful when accepting snake_case input but wanting camelCase output.
		*
		* @returns A VineCamelCaseObject wrapper for this schema
		*
		* @example
		* const schema = vine.object({
		*   first_name: vine.string(),
		*   last_name: vine.string()
		* }).toCamelCase()
		*
		* // Output: { firstName: string, lastName: string }
		*/
		toCamelCase() {
			return new VineCamelCaseObject(this);
		}
		/**
		* Converts the object schema to JSON Schema format.
		*
		* @returns JSON Schema representation of this object
		*/
		toJSONSchema() {
			const properties = {};
			const required = [];
			for (const [key, property] of Object.entries(this.getProperties())) {
				if (!property.toJSONSchema) continue;
				properties[key] = property.toJSONSchema();
				if (property.isOptional !== true && property.allowNull !== true) required.push(key);
			}
			const schema = {
				type: "object",
				properties,
				required,
				additionalProperties: this.#allowUnknownProperties
			};
			for (const validation of this.validations) {
				if (!validation.rule.toJSONSchema) continue;
				validation.rule.toJSONSchema(schema, validation.options);
			}
			if (this.#groups.length > 0) return { anyOf: [...this.#groups.map((group) => group.toJSONSchema()), schema] };
			return schema;
		}
		/**
		* Creates a new object schema with all properties (or specified properties) marked as optional.
		* This is useful for update/PATCH operations where not all fields are required.
		*
		* @param keys - Optional array of property keys to make optional. If omitted, all properties become optional.
		* @returns A new VineObject schema with optional properties
		*
		* @example
		* // Make all properties optional
		* const updateSchema = createSchema.partial()
		*
		* @example
		* // Make only specific properties optional
		* const userSchema = vine.object({
		*   name: vine.string(),
		*   email: vine.string().email(),
		*   age: vine.number()
		* })
		*
		* const updateUserSchema = userSchema.partial(['name', 'age'])
		* // email remains required, name and age become optional
		*/
		partial(keys) {
			/**
			* Groups cannot be optional standalone, hence they cannot be marked
			* as optional when merged inside an object. Same is true for
			* unknownProperties.
			*/
			if (this.#groups.length > 0 || this.#allowUnknownProperties) throw new Error("toOptional cannot be used on schemas that have groups or allowUnknownProperties enabled");
			const properties = {};
			for (const key of Object.keys(this.#properties)) {
				let field = this.#properties[key].clone();
				if ((!keys || keys.includes(key)) && "optional" in field && typeof field.optional === "function") field = field.optional();
				properties[key] = field;
			}
			return new VineObject(properties, this.cloneOptions(), this.cloneValidations());
		}
		/**
		* Compiles the schema type to a compiler node for validation.
		*
		* @param propertyName - Name of the property being compiled
		* @param refs - Reference store for the compiler
		* @param options - Parser options
		* @returns Compiled object node for validation
		*/
		[PARSE](propertyName, refs, options) {
			return {
				type: "object",
				fieldName: propertyName,
				propertyName: options.toCamelCase ? camelCase(propertyName) : propertyName,
				bail: this.options.bail,
				allowNull: this.options.allowNull,
				isOptional: this.options.isOptional,
				parseFnId: this.options.parse ? refs.trackParser(this.options.parse) : void 0,
				allowUnknownProperties: this.#allowUnknownProperties,
				validations: this.compileValidations(refs),
				properties: Object.keys(this.#properties).map((property) => {
					return this.#properties[property][PARSE](property, refs, options);
				}),
				groups: this.#groups.map((group) => {
					return group[PARSE](refs, options);
				})
			};
		}
	};
	//#endregion
	//#region src/schema/record/rules.ts
	/**
	* Enforce a minimum number of properties on a record field.
	*
	* Validates that a record (object) contains at least the specified number of key-value pairs.
	*
	* @example
	* vine.record(vine.string()).minLength(2)
	*/
	const minLengthRule$1 = createRule(function minLength(value, options, field) {
		/**
		* Value will always be an object if the field is valid.
		*/
		if (Object.keys(value).length < options.min) field.report(messages["record.minLength"], "record.minLength", field, options);
	}, { toJSONSchema: (schema, options) => {
		schema.minProperties = options.min;
	} });
	/**
	* Enforce a maximum number of properties on a record field.
	*
	* Validates that a record (object) contains at most the specified number of key-value pairs.
	*
	* @example
	* vine.record(vine.string()).maxLength(10)
	*/
	const maxLengthRule$1 = createRule(function maxLength(value, options, field) {
		/**
		* Value will always be an object if the field is valid.
		*/
		if (Object.keys(value).length > options.max) field.report(messages["record.maxLength"], "record.maxLength", field, options);
	}, { toJSONSchema: (schema, options) => {
		schema.maxProperties = options.max;
	} });
	/**
	* Enforce an exact number of properties on a record field.
	*
	* Validates that a record (object) contains exactly the specified number of key-value pairs.
	*
	* @example
	* vine.record(vine.string()).fixedLength(5)
	*/
	const fixedLengthRule$1 = createRule(function fixedLength(value, options, field) {
		/**
		* Value will always be an object if the field is valid.
		*/
		if (Object.keys(value).length !== options.size) field.report(messages["record.fixedLength"], "record.fixedLength", field, options);
	}, { toJSONSchema: (schema, options) => {
		schema.minProperties = options.size;
		schema.maxProperties = options.size;
	} });
	/**
	* Register a custom callback to validate the record's keys.
	*
	* Allows implementing custom key validation logic, such as checking key patterns,
	* enforcing naming conventions, or validating key existence.
	*
	* @example
	* vine.record(vine.string()).validateKeys((keys, field) => {
	*   // Ensure all keys are lowercase
	*   if (!keys.every(key => key === key.toLowerCase())) {
	*     field.report('All keys must be lowercase', 'invalidKeys', field)
	*   }
	* })
	*
	* @example
	* // Validate that certain keys exist
	* vine.record(vine.string()).validateKeys((keys, field) => {
	*   if (!keys.includes('id')) {
	*     field.report('Record must contain an "id" key', 'missingId', field)
	*   }
	* })
	*/
	const validateKeysRule = createRule(function validateKeys(value, callback, field) {
		callback(Object.keys(value), field);
	});
	//#endregion
	//#region src/schema/record/main.ts
	/**
	* VineRecord represents an object with dynamic keys where all values share the same schema.
	* Unlike VineObject which has predefined properties, records allow any string key
	* but enforce consistent value types across all keys.
	*
	* @template Schema - The schema type for validating all record values
	*
	* @example
	* const schema = vine.record(vine.number())
	*
	* const result = await vine.validate({
	*   schema,
	*   data: { a: 1, b: 2, c: 3 }
	* })
	*
	* @example
	* // Record with complex value types
	* const schema = vine.record(
	*   vine.object({
	*     name: vine.string(),
	*     age: vine.number()
	*   })
	* )
	*/
	var VineRecord = class VineRecord extends BaseType {
		/**
		* Static collection of all available validation rules for records
		*/
		static rules = {
			maxLength: maxLengthRule$1,
			minLength: minLengthRule$1,
			fixedLength: fixedLengthRule$1,
			validateKeys: validateKeysRule
		};
		/**
		* The schema used to validate each value in the record
		*/
		#schema;
		/**
		* Unique name identifier for union type resolution
		*/
		[UNIQUE_NAME] = "vine.object";
		/**
		* Type checker function to determine if a value is an object.
		* Required for "unionOfTypes" functionality.
		*
		* @param value - The value to check
		* @returns True if the value is a non-null object and not an array
		*/
		[IS_OF_TYPE] = (value) => {
			return value !== null && typeof value === "object" && !Array.isArray(value);
		};
		/**
		* Creates a new VineRecord instance with value schema and optional configuration.
		*
		* @param schema - The schema to validate each record value
		* @param options - Field options like bail mode and nullability
		* @param validations - Initial set of validations to apply
		*/
		constructor(schema, options, validations) {
			super(options, validations);
			this.#schema = schema;
		}
		/**
		* Enforce a minimum number of properties on the record.
		*
		* @param expectedLength - The minimum required number of key-value pairs
		* @returns This record schema instance for method chaining
		*/
		minLength(expectedLength) {
			return this.use(minLengthRule$1({ min: expectedLength }));
		}
		/**
		* Enforce a maximum number of properties on the record.
		*
		* @param expectedLength - The maximum allowed number of key-value pairs
		* @returns This record schema instance for method chaining
		*/
		maxLength(expectedLength) {
			return this.use(maxLengthRule$1({ max: expectedLength }));
		}
		/**
		* Enforce an exact number of properties on the record.
		*
		* @param expectedLength - The exact required number of key-value pairs
		* @returns This record schema instance for method chaining
		*/
		fixedLength(expectedLength) {
			return this.use(fixedLengthRule$1({ size: expectedLength }));
		}
		/**
		* Register a custom callback to validate the record's keys.
		* Useful for enforcing key naming patterns or checking key existence.
		*
		* @param args - Arguments to pass to the validateKeys rule
		* @returns This record schema instance for method chaining
		*
		* @example
		* vine.record(vine.string()).validateKeys((keys, field) => {
		*   if (!keys.every(key => /^[a-z_]+$/.test(key))) {
		*     field.report('Keys must be lowercase with underscores', 'invalidKeys', field)
		*   }
		* })
		*/
		validateKeys(...args) {
			return this.use(validateKeysRule(...args));
		}
		/**
		* Clones the VineRecord schema including the value schema, options, and validations.
		*
		* @returns A cloned instance of this VineRecord schema
		*/
		clone() {
			return new VineRecord(this.#schema.clone(), this.cloneOptions(), this.cloneValidations());
		}
		/**
		* Converts the record schema to JSON Schema format.
		*
		* @returns JSON Schema representation of this record
		*/
		toJSONSchema() {
			const schema = {
				type: "object",
				additionalProperties: {}
			};
			schema.additionalProperties = this.#schema.toJSONSchema?.() ?? {};
			for (const validation of this.validations) {
				if (!validation.rule.toJSONSchema) continue;
				validation.rule.toJSONSchema(schema, validation.options);
			}
			return schema;
		}
		/**
		* Compiles the record schema to a compiler node for validation.
		*
		* @param propertyName - Name of the property being compiled
		* @param refs - Reference store for the compiler
		* @param options - Parser options
		* @returns Compiled record node for validation
		*/
		[PARSE](propertyName, refs, options) {
			return {
				type: "record",
				fieldName: propertyName,
				propertyName: options.toCamelCase ? camelCase(propertyName) : propertyName,
				bail: this.options.bail,
				allowNull: this.options.allowNull,
				isOptional: this.options.isOptional,
				each: this.#schema[PARSE]("*", refs, options),
				parseFnId: this.options.parse ? refs.trackParser(this.options.parse) : void 0,
				validations: this.compileValidations(refs)
			};
		}
	};
	//#endregion
	//#region src/schema/string/rules.ts
	/**
	* Validates the value to be a string.
	* Reports an error if the value is not of type string.
	*
	* @example
	* vine.string()
	*/
	const stringRule = createRule(function string(value, _, field) {
		if (!field.isDefined) return false;
		if (typeof value === "string") return true;
		field.report(messages.string, "string", field);
		return false;
	}, { toJSONSchema: (schema) => {
		schema.type = "string";
	} });
	/**
	* Validates the value to be a valid email address.
	* Supports various email validation options including domain-specific rules.
	*
	* @example
	* vine.string().email()
	* vine.string().email({ allow_ip_domain: true })
	*/
	const emailRule = createRule(function email(value, options, field) {
		if (!helpers.isEmail(value, options)) field.report(messages.email, "email", field);
	}, { toJSONSchema: (schema) => {
		schema.format = "email";
	} });
	/**
	* Validates the value to be a valid mobile phone number for specified locales.
	* Supports locale-specific mobile number formats and strict mode validation.
	*
	* @example
	* vine.string().mobile()
	* vine.string().mobile({ locale: ['en-US', 'en-GB'] })
	* vine.string().mobile({ locale: ['en-US'], strictMode: true })
	*/
	const mobileRule = createRule(function mobile(value, options, field) {
		const normalizedOptions = options && typeof options === "function" ? options(field) : options;
		const locales = normalizedOptions?.locale || "any";
		if (!helpers.isMobilePhone(value, locales, normalizedOptions)) field.report(messages.mobile, "mobile", field);
	});
	/**
	* Validates the value to be a valid IP address (IPv4 or IPv6).
	* Optionally restricts to a specific IP version.
	*
	* @example
	* vine.string().ipAddress()
	* vine.string().ipAddress({ version: 4 })
	* vine.string().ipAddress({ version: 6 })
	*/
	const ipAddressRule = createRule(function ipAddress(value, options, field) {
		if (!helpers.isIP(value, options?.version)) field.report(messages.ipAddress, "ipAddress", field);
	}, { toJSONSchema: (schema, options) => {
		schema.format = options?.version === 6 ? "ipv6" : "ipv4";
	} });
	/**
	* Validates the value against a custom regular expression pattern.
	* The value must match the provided regular expression.
	*
	* @example
	* vine.string().regex(/^[A-Z]{3}\d{3}$/)
	* vine.string().regex(/^\d{4}-\d{2}-\d{2}$/)
	*/
	const regexRule = createRule(function regex(value, expression, field) {
		if (!expression.test(value)) field.report(messages.regex, "regex", field);
	}, { toJSONSchema: (schema, options) => {
		schema.pattern = options.source;
	} });
	/**
	* Validates the value to be a valid hexadecimal color code.
	* Accepts formats like #FFF, #FFFFFF, or #FFFFFFFF.
	*
	* @example
	* vine.string().hexCode()
	*/
	const hexCodeRule = createRule(function hexCode(value, _, field) {
		if (!helpers.isHexColor(value)) field.report(messages.hexCode, "hexCode", field);
	}, { toJSONSchema: (schema) => {
		schema.pattern = "^#?([0-9a-f]{6}|[0-9a-f]{3}|[0-9a-f]{8})$";
	} });
	/**
	* Validates the value to be a valid URL.
	* Supports various URL validation options including protocol requirements.
	*
	* @example
	* vine.string().url()
	* vine.string().url({ require_protocol: true })
	* vine.string().url({ protocols: ['https'] })
	*/
	const urlRule = createRule(function url(value, options, field) {
		if (!helpers.isURL(value, options)) field.report(messages.url, "url", field);
	}, { toJSONSchema: (schema) => {
		schema.format = "uri";
	} });
	/**
	* Validates the value to be an active URL by making an HTTP request.
	* Checks if the URL is reachable and returns a successful response.
	*
	* @example
	* vine.string().activeUrl()
	*/
	const activeUrlRule = createRule(async function activeUrl(value, _, field) {
		if (!await helpers.isActiveURL(value)) field.report(messages.activeUrl, "activeUrl", field);
	});
	/**
	* Validates the value to contain only alphabetic characters.
	* Supports options to allow spaces, dashes, and underscores.
	*
	* @example
	* vine.string().alpha()
	* vine.string().alpha({ allowSpaces: true })
	* vine.string().alpha({ allowDashes: true, allowUnderscores: true })
	*/
	const alphaRule = createRule(function alpha(value, options, field) {
		let characterSet = "a-zA-Z";
		if (options) {
			if (options.allowSpaces) characterSet += "\\s";
			if (options.allowDashes) characterSet += "-";
			if (options.allowUnderscores) characterSet += "_";
		}
		if (!new RegExp(`^[${characterSet}]+$`).test(value)) field.report(messages.alpha, "alpha", field);
	}, { toJSONSchema: (schema, options) => {
		let characterSet = "a-zA-Z";
		if (options) {
			if (options.allowSpaces) characterSet += "\\s";
			if (options.allowDashes) characterSet += "-";
			if (options.allowUnderscores) characterSet += "_";
		}
		schema.pattern = `^[${characterSet}]+$`;
	} });
	/**
	* Validates the value to contain only alphanumeric characters (letters and numbers).
	* Supports options to allow spaces, dashes, and underscores.
	*
	* @example
	* vine.string().alphaNumeric()
	* vine.string().alphaNumeric({ allowSpaces: true })
	* vine.string().alphaNumeric({ allowDashes: true, allowUnderscores: true })
	*/
	const alphaNumericRule = createRule(function alphaNumeric(value, options, field) {
		let characterSet = "a-zA-Z0-9";
		if (options) {
			if (options.allowSpaces) characterSet += "\\s";
			if (options.allowDashes) characterSet += "-";
			if (options.allowUnderscores) characterSet += "_";
		}
		if (!new RegExp(`^[${characterSet}]+$`).test(value)) field.report(messages.alphaNumeric, "alphaNumeric", field);
	}, { toJSONSchema: (schema, options) => {
		let characterSet = "a-zA-Z0-9";
		if (options) {
			if (options.allowSpaces) characterSet += "\\s";
			if (options.allowDashes) characterSet += "-";
			if (options.allowUnderscores) characterSet += "_";
		}
		schema.pattern = `^[${characterSet}]+$`;
	} });
	/**
	* Enforces a minimum length on a string field.
	* The string must have at least the specified number of characters.
	*
	* @example
	* vine.string().minLength(5)
	*/
	const minLengthRule = createRule(function minLength(value, options, field) {
		if (value.length < options.min) field.report(messages.minLength, "minLength", field, options);
	}, { toJSONSchema: (schema, options) => {
		schema.minLength = options.min;
	} });
	/**
	* Enforces a maximum length on a string field.
	* The string must not exceed the specified number of characters.
	*
	* @example
	* vine.string().maxLength(100)
	*/
	const maxLengthRule = createRule(function maxLength(value, options, field) {
		if (value.length > options.max) field.report(messages.maxLength, "maxLength", field, options);
	}, { toJSONSchema: (schema, options) => {
		schema.maxLength = options.max;
	} });
	/**
	* Enforces a fixed length on a string field.
	* The string must have exactly the specified number of characters.
	*
	* @example
	* vine.string().fixedLength(10)
	*/
	const fixedLengthRule = createRule(function fixedLength(value, options, field) {
		if (value.length !== options.size) field.report(messages.fixedLength, "fixedLength", field, options);
	}, { toJSONSchema: (schema, options) => {
		schema.minLength = options.size;
		schema.maxLength = options.size;
	} });
	/**
	* Ensures the value ends with the specified substring.
	* The comparison is case-sensitive.
	*
	* @example
	* vine.string().endsWith('.com')
	* vine.string().endsWith('_test')
	*/
	const endsWithRule = createRule(function endsWith(value, options, field) {
		if (!value.endsWith(options.substring)) field.report(messages.endsWith, "endsWith", field, options);
	});
	/**
	* Ensures the value starts with the specified substring.
	* The comparison is case-sensitive.
	*
	* @example
	* vine.string().startsWith('https://')
	* vine.string().startsWith('prefix_')
	*/
	const startsWithRule = createRule(function startsWith(value, options, field) {
		if (!value.startsWith(options.substring)) field.report(messages.startsWith, "startsWith", field, options);
	});
	/**
	* Ensures the field's value under validation is the same as the other field's value.
	* Useful for confirmation fields like password verification.
	*
	* @example
	* vine.string().sameAs('password')
	* vine.string().sameAs('email')
	*/
	const sameAsRule = createRule(function sameAs(value, options, field) {
		/**
		* Performing validation and reporting error
		*/
		if (helpers.getNestedValue(options.otherField, field) !== value) {
			field.report(messages.sameAs, "sameAs", field, options);
			return;
		}
	});
	/**
	* Ensures the field's value under validation is different from another field's value.
	* Useful for ensuring new values differ from old ones (e.g., new password vs old password).
	*
	* @example
	* vine.string().notSameAs('oldPassword')
	* vine.string().notSameAs('previousEmail')
	*/
	const notSameAsRule = createRule(function notSameAs(value, options, field) {
		/**
		* Performing validation and reporting error
		*/
		if (helpers.getNestedValue(options.otherField, field) === value) {
			field.report(messages.notSameAs, "notSameAs", field, options);
			return;
		}
	});
	/**
	* Ensures the field under validation is confirmed by having another field with the same name
	* (with "_confirmation" suffix by default). The values of both fields must match.
	*
	* @example
	* vine.string().confirmed()
	* vine.string().confirmed({ as: 'passwordConfirm' })
	*/
	const confirmedRule = createRule(function confirmed(value, options, field) {
		const normalizedOptions = options ?? {};
		const otherField = normalizedOptions.as ?? normalizedOptions.confirmationField ?? `${field.name}_confirmation`;
		const input = field.parent[otherField];
		/**
		* Performing validation and reporting error
		*/
		if (input !== value) {
			field.report(messages.confirmed, "confirmed", {
				...field,
				name: otherField,
				wildCardPath: `${field.wildCardPath.replace(String(field.name), otherField)}`,
				isDefined: true,
				isValid: false,
				value: input,
				getFieldPath() {
					return `${field.getFieldPath().replace(String(field.name), otherField)}`;
				}
			}, {
				otherField,
				originalField: field.name
			});
			return;
		}
	});
	/**
	* Ensures the field's value under validation is one of the pre-defined choices.
	* Accepts a static array of choices or a function that returns choices dynamically.
	*
	* @example
	* vine.string().in(['red', 'green', 'blue'])
	* vine.string().in((field) => getUserRoles(field.meta.userId))
	*/
	const inRule$1 = createRule(function inList(value, options, field) {
		/**
		* Performing validation and reporting error
		*/
		if (!(typeof options.choices === "function" ? options.choices(field) : options.choices).includes(value)) {
			field.report(messages.in, "in", field, options);
			return;
		}
	});
	/**
	* Ensures the field's value under validation is not in the pre-defined list.
	* Accepts a static array or a function that returns disallowed values dynamically.
	*
	* @example
	* vine.string().notIn(['admin', 'root', 'system'])
	* vine.string().notIn((field) => getBlacklistedUsernames())
	*/
	const notInRule = createRule(function notIn(value, options, field) {
		/**
		* Performing validation and reporting error
		*/
		if ((typeof options.list === "function" ? options.list(field) : options.list).includes(value)) {
			field.report(messages.notIn, "notIn", field, options);
			return;
		}
	});
	/**
	* Validates the value to be a valid credit card number.
	* Optionally restricts validation to specific card providers.
	*
	* @example
	* vine.string().creditCard()
	* vine.string().creditCard({ provider: ['visa', 'mastercard'] })
	* vine.string().creditCard({ provider: ['amex', 'discover'] })
	*/
	const creditCardRule = createRule(function creditCard(value, options, field) {
		const providers = options ? typeof options === "function" ? options(field)?.provider || [] : options.provider : [];
		if (!providers.length) {
			if (!helpers.isCreditCard(value)) field.report(messages.creditCard, "creditCard", field, { providersList: "credit" });
		} else if (!providers.find((provider) => helpers.isCreditCard(value, { provider }))) field.report(messages.creditCard, "creditCard", field, {
			providers,
			providersList: providers.join("/")
		});
	});
	/**
	* Validates the value to be a valid passport number for specified countries.
	* Requires country codes to determine the expected passport format.
	*
	* @example
	* vine.string().passport({ countryCode: ['US', 'GB', 'CA'] })
	* vine.string().passport({ countryCode: ['FR', 'DE'] })
	*/
	const passportRule = createRule(function passport(value, options, field) {
		const countryCodes = typeof options === "function" ? options(field).countryCode : options.countryCode;
		if (!countryCodes.find((countryCode) => helpers.isPassportNumber(value, countryCode))) field.report(messages.passport, "passport", field, { countryCodes });
	});
	/**
	* Validates the value to be a valid VAT (Value Added Tax) number for specified countries.
	* Requires country codes to determine the expected VAT format.
	*
	* @example
	* vine.string().vat({ countryCode: ['FR', 'CH', 'VE'] })
	* vine.string().vat({ countryCode: ['GB', 'DE'] })
	*/
	const vatRule = createRule(function vat(value, options, field) {
		const countryCodes = typeof options === "function" ? options(field).countryCode : options.countryCode;
		if (!countryCodes.find((countryCode) => helpers.isVAT(value, countryCode))) field.report(messages.vat, "vat", field, { countryCodes });
	});
	/**
	* Validates the value to be a valid postal code.
	* Optionally restricts validation to specific country codes.
	*
	* @example
	* vine.string().postalCode()
	* vine.string().postalCode({ countryCode: ['US', 'GB', 'CA'] })
	* vine.string().postalCode({ countryCode: ['FR', 'DE'] })
	*/
	const postalCodeRule = createRule(function postalCode(value, options, field) {
		const countryCodes = options ? typeof options === "function" ? options(field)?.countryCode || [] : options.countryCode : [];
		if (!countryCodes.length) {
			if (!helpers.isPostalCode(value, "any")) field.report(messages.postalCode, "postalCode", field);
		} else if (!countryCodes.find((countryCode) => helpers.isPostalCode(value, countryCode))) field.report(messages.postalCode, "postalCode", field, { countryCodes });
	});
	/**
	* Validates the value to be a valid UUID (Universally Unique Identifier).
	* Optionally restricts validation to specific UUID versions.
	*
	* @example
	* vine.string().uuid()
	* vine.string().uuid({ version: [4] })
	* vine.string().uuid({ version: [1, 4, 5] })
	*/
	const uuidRule = createRule(function uuid(value, options, field) {
		if (!options || !options.version) {
			if (!helpers.isUUID(value)) field.report(messages.uuid, "uuid", field);
		} else if (!options.version.find((version) => helpers.isUUID(value, version))) field.report(messages.uuid, "uuid", field, options);
	}, { toJSONSchema: (schema) => {
		schema.format = "uuid";
	} });
	/**
	* Validates the value to be a valid ULID (Universally Unique Lexicographically Sortable Identifier).
	* ULIDs are 26 characters long and sortable by time.
	*
	* @example
	* vine.string().ulid()
	*/
	const ulidRule = createRule(function ulid(value, _, field) {
		if (!helpers.isULID(value)) field.report(messages.ulid, "ulid", field);
	}, { toJSONSchema: (schema) => {
		schema.pattern = "^[0-7][0-9A-HJKMNP-TV-Z]{25}$";
	} });
	/**
	* Validates the value contains only ASCII characters (codes 0-127).
	* Rejects any characters outside the standard ASCII range.
	*
	* @example
	* vine.string().ascii()
	*/
	const asciiRule = createRule(function ascii(value, _, field) {
		if (!helpers.isAscii(value)) field.report(messages.ascii, "ascii", field);
	});
	/**
	* Validates the value to be a valid IBAN (International Bank Account Number).
	* Validates format, check digits, and country-specific patterns.
	*
	* @example
	* vine.string().iban()
	*/
	const ibanRule = createRule(function iban(value, _, field) {
		if (!helpers.isIBAN(value)) field.report(messages.iban, "iban", field);
	});
	/**
	* Validates the value to be a valid JWT (JSON Web Token).
	* Validates the token structure but does not verify the signature.
	*
	* @example
	* vine.string().jwt()
	*/
	const jwtRule = createRule(function jwt(value, _, field) {
		if (!helpers.isJWT(value)) field.report(messages.jwt, "jwt", field);
	});
	/**
	* Ensures the value is a string containing valid latitude and longitude coordinates.
	* Accepts format like "40.7128,-74.0060" (latitude,longitude).
	*
	* @example
	* vine.string().coordinates()
	*/
	const coordinatesRule = createRule(function coordinates(value, _, field) {
		if (!helpers.isLatLong(value)) field.report(messages.coordinates, "coordinates", field);
	});
	/**
	* Trims leading and trailing whitespace from the string value.
	* Mutates the field value by removing whitespace characters.
	*
	* @example
	* vine.string().trim()
	*/
	const trimRule = createRule(function trim(value, _, field) {
		if (!field.isValid) return;
		field.mutate(value.trim(), field);
	});
	/**
	* Normalizes the email address by applying transformations.
	* Supports options like lowercasing and removing dots from Gmail addresses.
	*
	* @example
	* vine.string().email().normalizeEmail()
	* vine.string().email().normalizeEmail({ gmail_remove_dots: true })
	*/
	const normalizeEmailRule = createRule(function normalizeEmail(value, options, field) {
		if (!field.isValid) return;
		field.mutate(normalizeEmailValue.default(value, options), field);
	});
	/**
	* Converts the field value to UPPERCASE using locale-aware conversion.
	* Mutates the field value to uppercase.
	*
	* @example
	* vine.string().toUpperCase()
	* vine.string().toUpperCase('tr-TR')
	*/
	const toUpperCaseRule = createRule(function toUpperCase(value, locales, field) {
		if (!field.isValid) return;
		field.mutate(value.toLocaleUpperCase(locales), field);
	});
	/**
	* Converts the field value to lowercase using locale-aware conversion.
	* Mutates the field value to lowercase.
	*
	* @example
	* vine.string().toLowerCase()
	* vine.string().toLowerCase('tr-TR')
	*/
	const toLowerCaseRule = createRule(function toLowerCase(value, locales, field) {
		if (!field.isValid) return;
		field.mutate(value.toLocaleLowerCase(locales), field);
	});
	/**
	* Converts the field value to camelCase.
	* Transforms strings like "hello_world" to "helloWorld".
	*
	* @example
	* vine.string().toCamelCase()
	*/
	const toCamelCaseRule = createRule(function toCamelCase(value, _, field) {
		if (!field.isValid) return;
		field.mutate(camelCase(value), field);
	});
	/**
	* Escapes HTML entities in the string to prevent XSS attacks.
	* Converts characters like <, >, &, ", ' to their HTML entity equivalents.
	*
	* @example
	* vine.string().escape()
	*/
	const escapeRule = createRule(function escape(value, _, field) {
		if (!field.isValid) return;
		field.mutate(escapeValue.default(value), field);
	});
	/**
	* Normalizes a URL by applying standardization rules.
	* Supports options like removing trailing slashes, sorting query parameters, and stripping default ports.
	*
	* @example
	* vine.string().url().normalizeUrl()
	* vine.string().url().normalizeUrl({ stripWWW: true })
	* vine.string().url().normalizeUrl({ sortQueryParameters: true })
	*/
	const normalizeUrlRule = createRule(function normalizeUrlValue(value, options, field) {
		if (!field.isValid) return;
		field.mutate(normalizeUrl(value, options), field);
	});
	//#endregion
	//#region src/schema/string/main.ts
	/**
	* VineString represents a string value in the validation schema.
	* It provides comprehensive string validation with built-in rules
	* for common patterns like email, URL, UUID, and more.
	*
	* @example
	* const schema = vine.string()
	*   .email()
	*   .minLength(5)
	*   .maxLength(100)
	*
	* const result = await vine.validate({
	*   schema,
	*   data: 'user@example.com'
	* })
	*/
	var VineString = class VineString extends BaseLiteralType {
		/**
		* Static collection of all available validation rules for strings
		*/
		static rules = {
			in: inRule$1,
			jwt: jwtRule,
			url: urlRule,
			iban: ibanRule,
			uuid: uuidRule,
			ulid: ulidRule,
			trim: trimRule,
			email: emailRule,
			alpha: alphaRule,
			ascii: asciiRule,
			notIn: notInRule,
			regex: regexRule,
			escape: escapeRule,
			sameAs: sameAsRule,
			mobile: mobileRule,
			string: stringRule,
			hexCode: hexCodeRule,
			passport: passportRule,
			endsWith: endsWithRule,
			confirmed: confirmedRule,
			activeUrl: activeUrlRule,
			minLength: minLengthRule,
			notSameAs: notSameAsRule,
			maxLength: maxLengthRule,
			vat: vatRule,
			ipAddress: ipAddressRule,
			creditCard: creditCardRule,
			postalCode: postalCodeRule,
			startsWith: startsWithRule,
			toUpperCase: toUpperCaseRule,
			toLowerCase: toLowerCaseRule,
			toCamelCase: toCamelCaseRule,
			fixedLength: fixedLengthRule,
			coordinates: coordinatesRule,
			normalizeUrl: normalizeUrlRule,
			alphaNumeric: alphaNumericRule,
			normalizeEmail: normalizeEmailRule
		};
		/**
		* The subtype identifier for the literal schema field
		*/
		[SUBTYPE] = "string";
		/**
		* Unique name identifier for union type resolution
		*/
		[UNIQUE_NAME] = "vine.string";
		/**
		* Type checker function to determine if a value is a string.
		* Required for "unionOfTypes" functionality.
		*
		* @param value - The value to check
		* @returns True if the value is a string
		*/
		[IS_OF_TYPE] = (value) => {
			return typeof value === "string";
		};
		/**
		* Creates a new VineString instance with optional configuration.
		*
		* @param options - Field options like bail mode and nullability
		* @param validations - Initial set of validations to apply
		*/
		constructor(options, validations) {
			super(options, validations || []);
			this.dataTypeValidator = stringRule();
		}
		/**
		* Validates the value to be a valid URL.
		*
		* @param args - Optional URL validation options
		* @returns This string schema instance for method chaining
		*/
		url(...args) {
			return this.use(urlRule(...args));
		}
		/**
		* Validates the value to be an active URL by making an HTTP request.
		*
		* @returns This string schema instance for method chaining
		*/
		activeUrl() {
			return this.use(activeUrlRule());
		}
		/**
		* Validates the value to be a valid email address.
		*
		* @param args - Optional email validation options
		* @returns This string schema instance for method chaining
		*/
		email(...args) {
			return this.use(emailRule(...args));
		}
		/**
		* Validates the value to be a valid mobile phone number for specified locales.
		*
		* @param options - Optional mobile validation options including locale and strictMode
		* @returns This string schema instance for method chaining
		*
		* @example
		* vine.string().mobile({ locale: ['en-US', 'en-GB'] })
		*/
		mobile(...args) {
			return this.use(mobileRule(...args));
		}
		/**
		* Validates the value to be a valid VAT (Value Added Tax) number for specified countries.
		*
		* @param options - VAT validation options including country codes
		* @returns This string schema instance for method chaining
		*
		* @example
		* vine.string().vat({ countryCode: ['FR', 'CH', 'VE'] })
		*/
		vat(...args) {
			return this.use(vatRule(...args));
		}
		/**
		* Validates the value to be a valid IP address (IPv4 or IPv6).
		*
		* @param version - Optional IP version (4 for IPv4, 6 for IPv6). Omit to allow both.
		* @returns This string schema instance for method chaining
		*
		* @example
		* vine.string().ipAddress()     // Allows IPv4 and IPv6
		* vine.string().ipAddress(4)    // Only IPv4
		* vine.string().ipAddress(6)    // Only IPv6
		*/
		ipAddress(version) {
			return this.use(ipAddressRule(version ? { version } : void 0));
		}
		/**
		* Validates the value to be a valid hexadecimal color code.
		*
		* @returns This string schema instance for method chaining
		*
		* @example
		* vine.string().hexCode()  // Accepts #FFF, #FFFFFF, etc.
		*/
		hexCode() {
			return this.use(hexCodeRule());
		}
		/**
		* Validates the value against a custom regular expression pattern.
		*
		* @param expression - The regular expression to match against
		* @returns This string schema instance for method chaining
		*
		* @example
		* vine.string().regex(/^[A-Z]{3}\d{3}$/)  // Matches ABC123 pattern
		*/
		regex(expression) {
			return this.use(regexRule(expression));
		}
		/**
		* Validates the value to contain only alphabetic characters.
		*
		* @param options - Options to allow spaces, underscores, or dashes
		* @returns This string schema instance for method chaining
		*
		* @example
		* vine.string().alpha()
		* vine.string().alpha({ allowSpaces: true })
		* vine.string().alpha({ allowSpaces: true, allowDashes: true })
		*/
		alpha(options) {
			return this.use(alphaRule(options));
		}
		/**
		* Validates the value to contain only alphanumeric characters (letters and numbers).
		*
		* @param options - Options to allow spaces, underscores, or dashes
		* @returns This string schema instance for method chaining
		*
		* @example
		* vine.string().alphaNumeric()
		* vine.string().alphaNumeric({ allowSpaces: true, allowUnderscores: true })
		*/
		alphaNumeric(options) {
			return this.use(alphaNumericRule(options));
		}
		/**
		* Enforce a minimum length on a string field.
		*
		* @param expectedLength - The minimum required length
		* @returns This string schema instance for method chaining
		*/
		minLength(expectedLength) {
			return this.use(minLengthRule({ min: expectedLength }));
		}
		/**
		* Enforce a maximum length on a string field.
		*
		* @param expectedLength - The maximum allowed length
		* @returns This string schema instance for method chaining
		*/
		maxLength(expectedLength) {
			return this.use(maxLengthRule({ max: expectedLength }));
		}
		/**
		* Enforce a fixed length on a string field.
		*
		* @param expectedLength - The exact required length
		* @returns This string schema instance for method chaining
		*/
		fixedLength(expectedLength) {
			return this.use(fixedLengthRule({ size: expectedLength }));
		}
		/**
		* Ensures the field is confirmed by having another field with "_confirmation" suffix
		* (or a custom suffix). Useful for password confirmation fields.
		*
		* @param options - Optional configuration for the confirmation field name
		* @returns This string schema instance for method chaining
		*
		* @example
		* // Validates that "password_confirmation" field matches "password"
		* vine.string().confirmed()
		*
		* @example
		* // Custom confirmation field name
		* vine.string().confirmed({ as: 'passwordConfirm' })
		*/
		confirmed(options) {
			return this.use(confirmedRule(options));
		}
		/**
		* Trims leading and trailing whitespace from the string value.
		*
		* @returns This string schema instance for method chaining
		*
		* @example
		* vine.string().trim()  // "  hello  " becomes "hello"
		*/
		trim() {
			return this.use(trimRule());
		}
		/**
		* Normalizes the email address by applying transformations like
		* lowercasing and removing dots from Gmail addresses.
		*
		* @param options - Email normalization options
		* @returns This string schema instance for method chaining
		*
		* @example
		* vine.string().email().normalizeEmail({ gmail_remove_dots: true })
		*/
		normalizeEmail(options) {
			return this.use(normalizeEmailRule(options));
		}
		/**
		* Converts the field value to UPPERCASE.
		*
		* @returns This string schema instance for method chaining
		*
		* @example
		* vine.string().toUpperCase()  // "hello" becomes "HELLO"
		*/
		toUpperCase() {
			return this.use(toUpperCaseRule());
		}
		/**
		* Converts the field value to lowercase.
		*
		* @returns This string schema instance for method chaining
		*
		* @example
		* vine.string().toLowerCase()  // "HELLO" becomes "hello"
		*/
		toLowerCase() {
			return this.use(toLowerCaseRule());
		}
		/**
		* Converts the field value to camelCase.
		*
		* @returns This string schema instance for method chaining
		*
		* @example
		* vine.string().toCamelCase()  // "hello_world" becomes "helloWorld"
		*/
		toCamelCase() {
			return this.use(toCamelCaseRule());
		}
		/**
		* Escapes HTML entities in the string to prevent XSS attacks.
		*
		* @returns This string schema instance for method chaining
		*
		* @example
		* vine.string().escape()  // "<script>" becomes "&lt;script&gt;"
		*/
		escape() {
			return this.use(escapeRule());
		}
		/**
		* Normalizes a URL by applying standardization rules like removing trailing slashes,
		* sorting query parameters, and stripping default ports.
		*
		* @param options - URL normalization options
		* @returns This string schema instance for method chaining
		*
		* @example
		* vine.string().url().normalizeUrl({ stripWWW: true })
		*/
		normalizeUrl(...args) {
			return this.use(normalizeUrlRule(...args));
		}
		/**
		* Ensures the value starts with a specified substring.
		*
		* @param substring - The required starting substring
		* @returns This string schema instance for method chaining
		*
		* @example
		* vine.string().startsWith('https://')
		*/
		startsWith(substring) {
			return this.use(startsWithRule({ substring }));
		}
		/**
		* Ensures the value ends with a specified substring.
		*
		* @param substring - The required ending substring
		* @returns This string schema instance for method chaining
		*
		* @example
		* vine.string().endsWith('.com')
		*/
		endsWith(substring) {
			return this.use(endsWithRule({ substring }));
		}
		/**
		* Ensures the value matches the value of another field in the data.
		*
		* @param otherField - The name of the field to compare with
		* @returns This string schema instance for method chaining
		*
		* @example
		* vine.string().sameAs('password')
		*/
		sameAs(otherField) {
			return this.use(sameAsRule({ otherField }));
		}
		/**
		* Ensures the value does not match the value of another field in the data.
		*
		* @param otherField - The name of the field to compare with
		* @returns This string schema instance for method chaining
		*
		* @example
		* vine.string().notSameAs('oldPassword')
		*/
		notSameAs(otherField) {
			return this.use(notSameAsRule({ otherField }));
		}
		/**
		* Ensures the field's value is one of the predefined choices.
		*
		* @param choices - Array of allowed values or function returning allowed values
		* @returns This string schema instance for method chaining
		*
		* @example
		* vine.string().in(['red', 'green', 'blue'])
		*
		* @example
		* // Dynamic choices based on metadata
		* vine.string().in((field) => getUserRoles(field.meta.userId))
		*/
		in(choices) {
			return this.use(inRule$1({ choices }));
		}
		/**
		* Ensures the field's value is not in the predefined list.
		*
		* @param list - Array of disallowed values or function returning disallowed values
		* @returns This string schema instance for method chaining
		*
		* @example
		* vine.string().notIn(['admin', 'root', 'system'])
		*/
		notIn(list) {
			return this.use(notInRule({ list }));
		}
		/**
		* Validates the value to be a valid credit card number for specified providers.
		*
		* @param options - Credit card validation options including accepted providers
		* @returns This string schema instance for method chaining
		*
		* @example
		* vine.string().creditCard({ provider: ['visa', 'mastercard'] })
		*/
		creditCard(...args) {
			return this.use(creditCardRule(...args));
		}
		/**
		* Validates the value to be a valid passport number for specified countries.
		*
		* @param options - Passport validation options including country codes
		* @returns This string schema instance for method chaining
		*
		* @example
		* vine.string().passport({ countryCode: ['US', 'GB', 'CA'] })
		*/
		passport(...args) {
			return this.use(passportRule(...args));
		}
		/**
		* Validates the value to be a valid postal code for specified countries.
		*
		* @param options - Postal code validation options including country codes
		* @returns This string schema instance for method chaining
		*
		* @example
		* vine.string().postalCode({ countryCode: ['US', 'GB', 'CA'] })
		*/
		postalCode(...args) {
			return this.use(postalCodeRule(...args));
		}
		/**
		* Validates the value to be a valid UUID (Universally Unique Identifier).
		*
		* @param options - Optional UUID validation options including version
		* @returns This string schema instance for method chaining
		*
		* @example
		* vine.string().uuid()
		* vine.string().uuid({ version: 4 })
		*/
		uuid(...args) {
			return this.use(uuidRule(...args));
		}
		/**
		* Validates the value to be a valid ULID (Universally Unique Lexicographically Sortable Identifier).
		*
		* @returns This string schema instance for method chaining
		*
		* @example
		* vine.string().ulid()
		*/
		ulid() {
			return this.use(ulidRule());
		}
		/**
		* Validates the value contains only ASCII characters.
		*
		* @returns This string schema instance for method chaining
		*
		* @example
		* vine.string().ascii()
		*/
		ascii() {
			return this.use(asciiRule());
		}
		/**
		* Validates the value to be a valid IBAN (International Bank Account Number).
		*
		* @returns This string schema instance for method chaining
		*
		* @example
		* vine.string().iban()
		*/
		iban() {
			return this.use(ibanRule());
		}
		/**
		* Validates the value to be a valid JWT (JSON Web Token).
		*
		* @returns This string schema instance for method chaining
		*
		* @example
		* vine.string().jwt()
		*/
		jwt() {
			return this.use(jwtRule());
		}
		/**
		* Validates the value to be a string containing latitude and longitude coordinates.
		*
		* @returns This string schema instance for method chaining
		*
		* @example
		* vine.string().coordinates()  // Accepts "40.7128,-74.0060"
		*/
		coordinates() {
			return this.use(coordinatesRule());
		}
		/**
		* Clones the VineString schema type. The applied options
		* and validations are copied to the new instance.
		*
		* @returns A cloned instance of this VineString schema
		*/
		clone() {
			return new VineString(this.cloneOptions(), this.cloneValidations());
		}
	};
	//#endregion
	//#region src/schema/number/rules.ts
	/**
	* Enforces the value to be a number or a string representation of a number.
	* Converts string numbers to actual numbers and validates against NaN and Infinity.
	*
	* @example
	* vine.number()
	* vine.number({ strict: true })
	*/
	const numberRule = createRule(function number(value, options, field) {
		if (!field.isDefined) return false;
		const valueAsNumber = options.strict ? value : helpers.asNumber(value);
		if (typeof valueAsNumber !== "number" || Number.isNaN(valueAsNumber) || valueAsNumber === Number.POSITIVE_INFINITY || valueAsNumber === Number.NEGATIVE_INFINITY) {
			field.report(messages.number, "number", field);
			return false;
		}
		field.mutate(valueAsNumber, field);
		return true;
	}, { toJSONSchema: (schema) => {
		schema.type = "number";
	} });
	/**
	* Enforces a minimum value on a number field.
	* The number must be greater than or equal to the specified minimum.
	*
	* @example
	* vine.number().min(0)
	* vine.number().min(18)
	*/
	const minRule = createRule(function min(value, options, field) {
		if (value < options.min) field.report(messages.min, "min", field, options);
	}, { toJSONSchema: (schema, options) => {
		schema.minimum = options.min;
	} });
	/**
	* Enforces a maximum value on a number field.
	* The number must be less than or equal to the specified maximum.
	*
	* @example
	* vine.number().max(100)
	* vine.number().max(65)
	*/
	const maxRule = createRule(function max(value, options, field) {
		if (value > options.max) field.report(messages.max, "max", field, options);
	}, { toJSONSchema: (schema, options) => {
		schema.maximum = options.max;
	} });
	/**
	* Enforces the value to be within a range of minimum and maximum values.
	* The number must be between min and max (inclusive).
	*
	* @example
	* vine.number().range([1, 100])
	* vine.number().range([18, 65])
	*/
	const rangeRule = createRule(function range(value, options, field) {
		if (value < options.min || value > options.max) field.report(messages.range, "range", field, options);
	}, { toJSONSchema: (schema, options) => {
		schema.minimum = options.min;
		schema.maximum = options.max;
	} });
	/**
	* Enforces the value to be a positive number (greater than 0).
	* Zero is considered neutral and will fail this validation.
	*
	* @example
	* vine.number().positive()
	*/
	const positiveRule = createRule(function positive(value, _, field) {
		if (value > 0) return;
		field.report(messages.positive, "positive", field);
	}, { toJSONSchema: (schema) => {
		schema.minimum = 0;
	} });
	/**
	* Enforces the value to be a negative number (less than 0).
	* Zero is considered neutral and will fail this validation.
	*
	* @example
	* vine.number().negative()
	*/
	const negativeRule = createRule(function negative(value, _, field) {
		if (value < 0) return;
		field.report(messages.negative, "negative", field);
	}, { toJSONSchema: (schema) => {
		schema.exclusiveMaximum = 0;
	} });
	/**
	* Enforces the value to be a non-negative number (greater than or equal to 0).
	* Accepts zero and all positive numbers.
	*
	* @example
	* vine.number().nonNegative()
	*/
	const nonNegativeRule = createRule(function nonNegative(value, _, field) {
		if (value >= 0) return;
		field.report(messages.nonNegative, "nonNegative", field);
	});
	/**
	* Enforces the value to be a non-positive number (less than or equal to 0).
	* Accepts zero and all negative numbers.
	*
	* @example
	* vine.number().nonPositive()
	*/
	const nonPositiveRule = createRule(function nonPositive(value, _, field) {
		if (value <= 0) return;
		field.report(messages.nonPositive, "nonPositive", field);
	});
	/**
	* Enforces the value to have a fixed number or range of decimal places.
	* Validates the precision of the decimal number.
	*
	* @example
	* vine.number().decimal(2)
	* vine.number().decimal([0, 2])
	*/
	const decimalRule = createRule(function decimal(value, options, field) {
		if (!helpers.isDecimal(String(value), {
			force_decimal: options.range[0] !== 0,
			decimal_digits: options.range.join(",")
		})) field.report(messages.decimal, "decimal", field, { digits: options.range.join("-") });
	});
	/**
	* Enforces the value to be an integer without decimal places.
	* The number must be a whole number.
	*
	* @example
	* vine.number().withoutDecimals()
	*/
	const withoutDecimalsRule = createRule(function withoutDecimals(value, _, field) {
		if (!Number.isInteger(value)) field.report(messages.withoutDecimals, "withoutDecimals", field);
	}, { toJSONSchema: (schema) => {
		schema.type = "integer";
	} });
	/**
	* Enforces the value to be one of the specified allowed values.
	* The number must match one of the values in the provided list.
	*
	* @example
	* vine.number().in([1, 2, 3, 5, 8, 13])
	* vine.number().in([10, 20, 30])
	*/
	const inRule = createRule(function inValues(value, options, field) {
		if (!options.values.includes(value)) field.report(messages["number.in"], "in", field, options);
	}, { toJSONSchema: (schema, options) => {
		schema.enum = options.values;
	} });
	//#endregion
	//#region src/schema/number/main.ts
	/**
	* VineNumber represents a numeric value in the validation schema.
	* It accepts both string and number inputs and converts them to numbers,
	* with comprehensive validation for ranges, decimals, and sign constraints.
	*
	* @example
	* const schema = vine.number()
	*   .min(0)
	*   .max(100)
	*   .decimal([0, 2])
	*
	* const result = await vine.validate({
	*   schema,
	*   data: "42.5"
	* })
	*/
	var VineNumber = class VineNumber extends BaseLiteralType {
		/**
		* Static collection of all available validation rules for numbers
		*/
		static rules = {
			in: inRule,
			max: maxRule,
			min: minRule,
			range: rangeRule,
			number: numberRule,
			decimal: decimalRule,
			negative: negativeRule,
			positive: positiveRule,
			nonNegativeRule,
			nonPositiveRule,
			withoutDecimals: withoutDecimalsRule
		};
		/**
		* The subtype identifier for the literal schema field
		*/
		[SUBTYPE] = "number";
		/**
		* Unique name identifier for union type resolution
		*/
		[UNIQUE_NAME] = "vine.number";
		/**
		* Type checker function to determine if a value can be converted to a number.
		* Required for "unionOfTypes" functionality.
		*
		* @param value - The value to check
		* @returns True if the value can be converted to a valid number
		*/
		[IS_OF_TYPE] = (value) => {
			const valueAsNumber = helpers.asNumber(value);
			return !Number.isNaN(valueAsNumber);
		};
		/**
		* Creates a new VineNumber instance with optional configuration.
		*
		* @param options - Field options like bail mode, nullability and strict mode
		* @param validations - Initial set of validations to apply
		*/
		constructor(options, validations) {
			super(options, validations || []);
			this.dataTypeValidator = numberRule(options || {});
		}
		/**
		* Enforce a minimum value for the number input.
		*
		* @param value - The minimum allowed value
		* @returns This number schema instance for method chaining
		*/
		min(value) {
			return this.use(minRule({ min: value }));
		}
		/**
		* Enforce a maximum value for the number input.
		*
		* @param value - The maximum allowed value
		* @returns This number schema instance for method chaining
		*/
		max(value) {
			return this.use(maxRule({ max: value }));
		}
		/**
		* Enforce value to be within the range of minimum and maximum values.
		*
		* @param value - Tuple containing [min, max] values
		* @returns This number schema instance for method chaining
		*/
		range(value) {
			return this.use(rangeRule({
				min: value[0],
				max: value[1]
			}));
		}
		/**
		* Enforces the value to be a positive number (greater than 0).
		*
		* @returns This number schema instance for method chaining
		*
		* @example
		* vine.number().positive()  // Accepts 1, 100.5, etc. Rejects 0, -1
		*/
		positive() {
			return this.use(positiveRule());
		}
		/**
		* Enforces the value to be a negative number (less than 0).
		*
		* @returns This number schema instance for method chaining
		*
		* @example
		* vine.number().negative()  // Accepts -1, -100.5, etc. Rejects 0, 1
		*/
		negative() {
			return this.use(negativeRule());
		}
		/**
		* Enforces the value to be a non-negative number (greater than or equal to 0).
		*
		* @returns This number schema instance for method chaining
		*
		* @example
		* vine.number().nonNegative()  // Accepts 0, 1, 100.5, etc. Rejects -1
		*/
		nonNegative() {
			return this.use(nonNegativeRule());
		}
		/**
		* Enforces the value to be a non-positive number (less than or equal to 0).
		*
		* @returns This number schema instance for method chaining
		*
		* @example
		* vine.number().nonPositive()  // Accepts 0, -1, -100.5, etc. Rejects 1
		*/
		nonPositive() {
			return this.use(nonPositiveRule());
		}
		/**
		* Enforces the value to have a fixed number or range of decimal places.
		*
		* @param range - Exact number of decimal places or [min, max] range
		* @returns This number schema instance for method chaining
		*
		* @example
		* vine.number().decimal(2)       // Accepts 1.23, rejects 1.2 or 1.234
		* vine.number().decimal([0, 2])  // Accepts 1, 1.2, 1.23
		*/
		decimal(range) {
			return this.use(decimalRule({ range: Array.isArray(range) ? range : [range] }));
		}
		/**
		* Enforces the value to be an integer without decimal places.
		*
		* @returns This number schema instance for method chaining
		*
		* @example
		* vine.number().withoutDecimals()  // Accepts 42, -10, rejects 42.5
		*/
		withoutDecimals() {
			return this.use(withoutDecimalsRule());
		}
		/**
		* Clones the VineNumber schema type. The applied options
		* and validations are copied to the new instance.
		*
		* @returns A cloned instance of this VineNumber schema
		*/
		clone() {
			return new VineNumber(this.cloneOptions(), this.cloneValidations());
		}
		/**
		* Enforces the value to be one of the specified allowed values.
		*
		* @param values - Array of allowed numeric values
		* @returns This number schema instance for method chaining
		*
		* @example
		* vine.number().in([1, 2, 3, 5, 8, 13])  // Only Fibonacci numbers allowed
		*/
		in(values) {
			return this.use(inRule({ values }));
		}
	};
	//#endregion
	//#region src/schema/boolean/rules.ts
	/**
	* Validates the value to be a boolean
	*/
	const booleanRule = createRule(function boolean(value, options, field) {
		const valueAsBoolean = options.strict === true ? value : helpers.asBoolean(value);
		if (typeof valueAsBoolean !== "boolean") {
			field.report(messages.boolean, "boolean", field);
			return;
		}
		field.mutate(valueAsBoolean, field);
	}, { toJSONSchema: (schema, { strict = false }) => {
		if (strict) schema.type = "boolean";
		else schema.enum = [...BOOLEAN_POSITIVES, ...BOOLEAN_NEGATIVES];
	} });
	//#endregion
	//#region src/schema/boolean/main.ts
	/**
	* VineBoolean represents a boolean value in the validation schema.
	* It accepts boolean, string, and number inputs and converts them to booleans,
	* with support for both strict and loose type checking.
	*
	* @example
	* const schema = vine.boolean()
	*
	* const result = await vine.validate({
	*   schema,
	*   data: "true" // Will be converted to true
	* })
	*/
	var VineBoolean = class VineBoolean extends BaseLiteralType {
		/**
		* Static collection of all available validation rules for booleans
		*/
		static rules = { boolean: booleanRule };
		/**
		* The subtype identifier for the literal schema field
		*/
		[SUBTYPE] = "boolean";
		/**
		* Unique name identifier for union type resolution
		*/
		[UNIQUE_NAME] = "vine.boolean";
		/**
		* Type checker function to determine if a value can be converted to a boolean.
		* Required for "unionOfTypes" functionality.
		*
		* @param value - The value to check
		* @returns True if the value can be converted to a boolean
		*/
		[IS_OF_TYPE] = (value) => {
			return typeof (this.options.strict === true ? value : helpers.asBoolean(value)) === "boolean";
		};
		/**
		* Creates a new VineBoolean instance with optional configuration.
		*
		* @param options - Field options like bail mode, nullability and strict mode
		* @param validations - Initial set of validations to apply
		*/
		constructor(options, validations) {
			super(options, validations || [booleanRule(options || {})]);
		}
		/**
		* Clones the VineBoolean schema type. The applied options
		* and validations are copied to the new instance.
		*
		* @returns A cloned instance of this VineBoolean schema
		*/
		clone() {
			return new VineBoolean(this.cloneOptions(), this.cloneValidations());
		}
	};
	//#endregion
	//#region src/schema/literal/rules.ts
	/**
	* Validates that two values are equal, considering HTML form serialization behavior.
	* Compares values using normalized comparison that handles type coercion.
	*
	* @example
	* vine.literal('admin')
	* vine.literal(42)
	* vine.literal(true)
	*/
	const equalsRule = createRule(function equals(value, options, field) {
		const comparedValue = helpers.compareValues(value, options.expectedValue);
		/**
		* Performing validation and reporting error
		*/
		if (!comparedValue.isEqual) {
			field.report(messages.literal, "literal", field, options);
			return;
		}
		/**
		* Mutating input with normalized value
		*/
		field.mutate(comparedValue.casted, field);
	});
	//#endregion
	//#region src/schema/literal/main.ts
	/**
	* VineLiteral represents a schema type that matches an exact literal value.
	* It validates that the input exactly matches the specified literal value,
	* supporting string, number, boolean, and null literals.
	*
	* @example
	* const schema = vine.literal('admin')
	*
	* const result = await vine.validate({
	*   schema,
	*   data: 'admin'
	* })
	*/
	var VineLiteral = class VineLiteral extends BaseLiteralType {
		/**
		* Static collection of all available validation rules for literals
		*/
		static rules = { equals: equalsRule };
		/**
		* The literal value that must be matched
		*/
		#value;
		/**
		* The subtype identifier for the literal schema field
		*/
		[SUBTYPE] = "literal";
		/**
		* Type checker function to determine if a value matches the literal value.
		* Required for "unionOfTypes" functionality.
		*
		* @param value - The value to check
		* @returns True if the value matches the literal value
		*/
		[IS_OF_TYPE] = (value) => {
			return helpers.compareValues(value, this.#value).isEqual;
		};
		/**
		* Creates a new VineLiteral instance with the specified literal value.
		*
		* @param value - The exact literal value to match
		* @param options - Field options like bail mode and nullability
		* @param validations - Initial set of validations to apply
		*/
		constructor(value, options, validations) {
			super(options, validations || [equalsRule({ expectedValue: value })]);
			this.#value = value;
			this[UNIQUE_NAME] = `vine.literal.${this.#value}`;
		}
		/**
		* Clones the VineLiteral schema type. The applied options
		* and validations are copied to the new instance.
		*
		* @returns A cloned instance of this VineLiteral schema
		*/
		clone() {
			return new VineLiteral(this.#value, this.cloneOptions(), this.cloneValidations());
		}
		/**
		* Converts the schema to JSON Schema format.
		* Generates an enum constraint with the literal value.
		*/
		toJSONSchema() {
			const schema = super.toJSONSchema();
			if (typeof this.#value === "string") {
				schema.type = "string";
				schema.enum = [this.#value];
			}
			if (typeof this.#value === "boolean") {
				schema.type = "boolean";
				schema.enum = [this.#value];
			}
			if (typeof this.#value === "number") {
				schema.type = "number";
				schema.enum = [this.#value];
			}
			return schema;
		}
	};
	//#endregion
	//#region src/schema/accepted/rules.ts
	/**
	* Array of accepted values for checkbox/acceptance validation
	*/
	const ACCEPTED_VALUES = [
		"on",
		"1",
		"yes",
		"true",
		true,
		1
	];
	/**
	* Validates that the value is present and has one of the accepted values.
	* This rule is used for checkbox and acceptance field validation.
	*
	* Accepted values are:
	* - "on" (HTML checkbox default when checked)
	* - "1" (string)
	* - "yes" (string)
	* - "true" (string)
	* - true (boolean)
	* - 1 (number)
	*
	* @example
	* vine.accepted()
	*
	* @example
	* vine.string().use(acceptedRule())
	*/
	const acceptedRule = createRule(function accepted(value, _, field) {
		if (!ACCEPTED_VALUES.includes(value)) field.report(messages.accepted, "accepted", field);
	});
	//#endregion
	//#region src/schema/accepted/main.ts
	/**
	* VineAccepted represents a checkbox or acceptance field that must be
	* checked or have an accepted value. This is commonly used for terms
	* of service acceptance, privacy policy agreements, etc.
	*
	* Accepted values are: 'on', '1', 'yes', 'true', true, or 1
	* The output is always normalized to the boolean value `true`.
	*
	* @example
	* const schema = vine.object({
	*   termsAccepted: vine.accepted(),
	*   newsletter: vine.accepted().optional()
	* })
	*
	* @example
	* // HTML form checkbox
	* // <input type="checkbox" name="terms" />
	* // When checked, sends "on" which is accepted
	*/
	var VineAccepted = class VineAccepted extends BaseLiteralType {
		/**
		* Static collection of all available validation rules for accepted fields
		*/
		static rules = { accepted: acceptedRule };
		/**
		* The subtype identifier for the literal schema field
		*/
		[SUBTYPE] = "checkbox";
		/**
		* Creates a new VineAccepted instance.
		*
		* @param options - Field options like bail mode and nullability
		* @param validations - Initial set of validations to apply
		*/
		constructor(options, validations) {
			super(options, validations || [acceptedRule()]);
		}
		/**
		* Clones the VineAccepted schema type. The applied options
		* and validations are copied to the new instance.
		*
		* @returns A cloned instance of this VineAccepted schema
		*/
		clone() {
			return new VineAccepted(this.cloneOptions(), this.cloneValidations());
		}
	};
	//#endregion
	//#region src/schema/object/group.ts
	/**
	* ObjectGroup represents a collection of conditional property sets that can be
	* merged into an object based on runtime conditions. This enables dynamic schema
	* composition where different properties are validated based on conditional logic.
	*
	* @template Conditional - The type of conditional used in this group
	*
	* @example
	* const schema = vine.object({
	*   type: vine.string()
	* }).merge(
	*   vine.group([
	*     vine.group.if((value) => value.type === 'user', {
	*       username: vine.string()
	*     }),
	*     vine.group.if((value) => value.type === 'admin', {
	*       permissions: vine.array(vine.string())
	*     })
	*   ])
	* )
	*/
	var ObjectGroup = class ObjectGroup {
		/**
		* Array of conditional property sets to evaluate
		*/
		#conditionals;
		/**
		* Callback invoked when no conditional matches. Defaults to reporting an error.
		*/
		#otherwiseCallback = (_, field) => {
			field.report(messages.unionGroup, "unionGroup", field);
		};
		/**
		* Creates a new ObjectGroup with the specified conditionals.
		*
		* @param conditionals - Array of conditional property sets to evaluate
		*/
		constructor(conditionals) {
			this.#conditionals = conditionals;
		}
		/**
		* Converts the object group to JSON Schema format using anyOf.
		*
		* @returns JSON Schema representation of this group
		*/
		toJSONSchema() {
			return { anyOf: this.#conditionals.map((conditional) => conditional.toJSONSchema()) };
		}
		/**
		* Clones the ObjectGroup including all conditionals and the otherwise callback.
		*
		* @returns A cloned instance of this ObjectGroup
		*/
		clone() {
			const cloned = new ObjectGroup(this.#conditionals);
			cloned.otherwise(this.#otherwiseCallback);
			return cloned;
		}
		/**
		* Defines a fallback callback to invoke when none of the group conditions match.
		* By default, this reports a validation error. Use this method to customize
		* the error handling behavior.
		*
		* @param callback - Callback to invoke when no condition matches
		* @returns This group instance for method chaining
		*
		* @example
		* vine.group([
		*   vine.group.if((value) => value.type === 'user', { username: vine.string() }),
		*   vine.group.if((value) => value.type === 'admin', { role: vine.string() })
		* ]).otherwise((value, field) => {
		*   field.report('Invalid type specified', 'invalidType', field)
		* })
		*/
		otherwise(callback) {
			this.#otherwiseCallback = callback;
			return this;
		}
		/**
		* Compiles the group to a compiler node for validation.
		*
		* @param refs - Reference store for the compiler
		* @param options - Parser options
		* @returns Compiled object group node
		*/
		[PARSE](refs, options) {
			return {
				type: "group",
				elseConditionalFnRefId: refs.trackConditional(this.#otherwiseCallback),
				conditions: this.#conditionals.map((conditional) => conditional[PARSE](refs, options))
			};
		}
	};
	//#endregion
	//#region src/schema/object/conditional.ts
	/**
	* GroupConditional represents a subset of object properties that are conditionally
	* validated and merged based on a runtime condition. This allows schemas to have
	* different required fields depending on the values in the object being validated.
	*
	* @template Properties - Record of property names to their schema types
	* @template Input - Expected input type for these properties
	* @template Output - Output type after validation and transformation
	* @template CamelCaseOutput - Output type with camelCase property names
	*
	* @example
	* vine.group.if(
	*   (value) => value.shipping_required === true,
	*   {
	*     shipping_address: vine.string(),
	*     shipping_method: vine.string()
	*   }
	* )
	*/
	var GroupConditional = class {
		/**
		* Properties to validate and merge when the conditional evaluates to true
		*/
		#properties;
		/**
		* Conditional function that determines whether to validate these properties
		*/
		#conditional;
		/**
		* Creates a new GroupConditional with a condition and properties.
		*
		* @param conditional - Function that returns truthy value when properties should be validated
		* @param properties - Properties to validate and merge when condition is true
		*/
		constructor(conditional, properties) {
			this.#properties = properties;
			this.#conditional = conditional;
		}
		/**
		* Converts the conditional properties to JSON Schema format.
		*
		* @returns JSON Schema representation of this conditional's properties
		*/
		toJSONSchema() {
			const properties = {};
			const required = [];
			for (const [key, property] of Object.entries(this.#properties)) {
				properties[key] = property.toJSONSchema();
				if (!("isOptional" in property) || property.isOptional !== true) required.push(key);
			}
			return {
				type: "object",
				properties,
				required
			};
		}
		/**
		* Compiles the conditional to a compiler node for validation.
		*
		* @param refs - Reference store for the compiler
		* @param options - Parser options
		* @returns Compiled conditional node
		*/
		[PARSE](refs, options) {
			return {
				schema: {
					type: "sub_object",
					properties: Object.keys(this.#properties).map((property) => {
						return this.#properties[property][PARSE](property, refs, options);
					}),
					groups: []
				},
				conditionalFnRefId: refs.trackConditional(this.#conditional)
			};
		}
	};
	//#endregion
	//#region src/schema/object/group_builder.ts
	/**
	* Creates an object group that conditionally merges properties into an existing object
	* based on runtime validation logic. Groups enable dynamic schema composition where
	* different properties are required based on conditional rules.
	*
	* @param conditionals - Array of conditional property sets to evaluate
	* @returns ObjectGroup instance that can be merged into a VineObject
	*
	* @example
	* const schema = vine.object({
	*   account_type: vine.string()
	* }).merge(
	*   vine.group([
	*     vine.group.if((value) => value.account_type === 'personal', {
	*       first_name: vine.string(),
	*       last_name: vine.string()
	*     }),
	*     vine.group.if((value) => value.account_type === 'business', {
	*       company_name: vine.string(),
	*       tax_id: vine.string()
	*     })
	*   ])
	* )
	*/
	function group(conditionals) {
		return new ObjectGroup(conditionals);
	}
	/**
	* Wraps object properties inside a conditional statement that evaluates at validation time.
	* Properties are only validated and merged if the condition returns a truthy value.
	*
	* @param conditon - Callback function that receives the object value and field context
	* @param properties - Properties to merge when the condition is truthy
	* @returns GroupConditional instance for use in vine.group()
	*
	* @example
	* vine.group([
	*   vine.group.if(
	*     (value) => value.type === 'admin',
	*     {
	*       permissions: vine.array(vine.string()),
	*       access_level: vine.number()
	*     }
	*   ),
	*   vine.group.if(
	*     (value) => value.type === 'user',
	*     {
	*       username: vine.string()
	*     }
	*   )
	* ])
	*/
	group.if = function groupIf(conditon, properties) {
		return new GroupConditional(conditon, properties);
	};
	/**
	* Wraps object properties inside an "else" condition that always evaluates to true.
	* Use this as a fallback when no other conditions in the group match.
	*
	* @param properties - Properties to merge when no other condition matches
	* @returns GroupConditional instance that always matches
	*
	* @example
	* vine.group([
	*   vine.group.if((value) => value.role === 'admin', {
	*     admin_key: vine.string()
	*   }),
	*   vine.group.else({
	*     user_key: vine.string()
	*   })
	* ])
	*/
	group.else = function groupElse(properties) {
		return new GroupConditional(() => true, properties);
	};
	//#endregion
	//#region src/schema/enum/native_enum.ts
	/**
	* VineNativeEnum represents an enum data type that performs validation
	* against a pre-defined choices list.
	*
	* The choices list is derived from TypeScript enum data type or an
	* object with string or number values. This allows you to validate
	* against native TypeScript enums.
	*
	* @template Values - The enum-like type containing allowed values
	*
	* @example
	* enum Status {
	*   Active = 'active',
	*   Inactive = 'inactive'
	* }
	*
	* const schema = vine.nativeEnum(Status)
	*
	* @example
	* const Colors = {
	*   RED: 'red',
	*   BLUE: 'blue',
	*   GREEN: 'green'
	* } as const
	*
	* const schema = vine.nativeEnum(Colors)
	*/
	var VineNativeEnum = class VineNativeEnum extends BaseLiteralType {
		/**
		* Static collection of all available validation rules for native enums
		*/
		static rules = { enum: enumRule };
		/**
		* The enum-like object containing allowed values
		*/
		#values;
		/**
		* The subtype identifier for the literal schema field
		*/
		[SUBTYPE] = "enum";
		/**
		* Creates a new VineNativeEnum instance with the specified enum values.
		*
		* @param values - The enum or enum-like object containing allowed values
		* @param options - Field options like bail mode and nullability
		* @param validations - Initial set of validations to apply
		*/
		constructor(values, options, validations) {
			super(options, validations || [enumRule({ choices: Object.values(values) })]);
			this.#values = values;
		}
		/**
		* Clones the VineNativeEnum schema type. The applied options
		* and validations are copied to the new instance.
		*
		* @returns A cloned instance of this VineNativeEnum schema
		*/
		clone() {
			return new VineNativeEnum(this.#values, this.cloneOptions(), this.cloneValidations());
		}
	};
	//#endregion
	//#region src/schema/native_file/rules.ts
	/**
	* Validates that the value is an instance of the platform native File class.
	* This is the primary type validator for native file fields.
	*
	* @example
	* vine.string().use(isNativeFileRule())
	*/
	const isNativeFileRule = createRule(function file(value, _, field) {
		if (!field.isDefined) return false;
		if (value instanceof File === false) {
			field.report(messages.nativeFile, "nativeFile", field);
			return false;
		}
		return true;
	});
	/**
	* Validates that the file size is at least the specified minimum size in bytes.
	*
	* @example
	* vine.file().use(minSizeRule({ min: 1024 })) // At least 1KB
	*
	* @example
	* vine.file().minSize(1024) // Shorthand method
	*/
	const minSizeRule = createRule(function minSize(value, options, field) {
		if (value.size < options.min) {
			field.report(messages["nativeFile.minSize"], "nativeFile.minSize", field, options);
			return false;
		}
		return true;
	});
	/**
	* Validates that the file size does not exceed the specified maximum size in bytes.
	*
	* @example
	* vine.file().use(maxSizeRule({ max: 2097152 })) // Max 2MB
	*
	* @example
	* vine.file().maxSize(2097152) // Shorthand method
	*/
	const maxSizeRule = createRule(function minSize(value, options, field) {
		if (value.size > options.max) field.report(messages["nativeFile.maxSize"], "nativeFile.maxSize", field, options);
	});
	/**
	* Validates that the file's MIME type is one of the allowed types.
	*
	* @example
	* vine.file().use(mimeTypesRule({
	*   mimeTypes: ['image/jpeg', 'image/png']
	* }))
	*
	* @example
	* vine.file().mimeTypes(['image/jpeg', 'image/png']) // Shorthand method
	*/
	const mimeTypesRule = createRule((value, options, field) => {
		const mimeType = value.type;
		if (!options.mimeTypes.includes(mimeType)) field.report(messages["nativeFile.mimeTypes"], "nativeFile.mimeTypes", field, options);
	});
	//#endregion
	//#region src/schema/native_file/main.ts
	/**
	* VineNativeFile represents a platform native File class instance.
	* This type is used to validate file uploads in browser environments
	* where the File API is available.
	*
	* The file is validated based on type, size, and MIME type constraints.
	* Unlike MultipartFile (used in Node.js), this works with the browser's
	* native File object from file input elements.
	*
	* @example
	* const schema = vine.object({
	*   avatar: vine.file().maxSize('2mb').mimeTypes(['image/jpeg', 'image/png']),
	*   document: vine.file().minSize('1kb').maxSize('10mb')
	* })
	*
	* @example
	* // From HTML file input
	* // <input type="file" name="avatar" />
	* const file = event.target.files[0] // This is a native File instance
	*/
	var VineNativeFile = class VineNativeFile extends BaseLiteralType {
		/**
		* Static collection of all available validation rules for native files
		*/
		static rules = {
			maxSize: maxSizeRule,
			mimeTypes: mimeTypesRule,
			minSize: minSizeRule
		};
		/**
		* The subtype identifier for the literal schema field
		*/
		[SUBTYPE] = "nativeFile";
		/**
		* Unique name identifier for union type resolution
		*/
		[UNIQUE_NAME] = "vine.nativeFile";
		/**
		* Type checker function to determine if a value is a native file.
		* Required for "unionOfTypes" functionality.
		*
		* @param value - The value to check
		*/
		[IS_OF_TYPE] = (value) => {
			return value instanceof File;
		};
		/**
		* Creates a new VineNativeFile instance.
		*
		* @param options - Field options like bail mode and nullability
		* @param validations - Initial set of validations to apply
		*/
		constructor(options, validations) {
			super(options, validations || []);
			this.dataTypeValidator = isNativeFileRule();
		}
		/**
		* Clones the VineNativeFile schema type. The applied options
		* and validations are copied to the new instance.
		*
		* @returns A cloned instance of this VineNativeFile schema
		*/
		clone() {
			return new VineNativeFile(this.cloneOptions(), this.cloneValidations());
		}
		/**
		* Enforce the file size to be at least the provided minimum size.
		*
		* @param size - Minimum file size in bytes
		*
		* @example
		* vine.file().minSize(1024) // At least 1KB
		*/
		minSize(size) {
			return this.use(minSizeRule({ min: size }));
		}
		/**
		* Limit the maximum file size.
		*
		* @param size - Maximum file size in bytes
		*
		* @example
		* vine.file().maxSize(2097152) // Max 2MB
		*/
		maxSize(size) {
			return this.use(maxSizeRule({ max: size }));
		}
		/**
		* Enforce the file type to be one of the specified MIME types.
		*
		* @param types - Array of allowed MIME types
		*
		* @example
		* vine.file().mimeTypes(['image/jpeg', 'image/png', 'image/gif'])
		*
		* @example
		* vine.file().mimeTypes(['application/pdf'])
		*/
		mimeTypes(types) {
			return this.use(mimeTypesRule({ mimeTypes: types }));
		}
	};
	//#endregion
	//#region src/schema/union_of_types/main.ts
	/**
	* Vine union of types represents a union data type that automatically
	* determines which schema to apply based on the value's type.
	*
	* Unlike regular unions that require explicit conditionals, unionOfTypes
	* uses each schema's IS_OF_TYPE method to automatically detect the
	* appropriate schema based on the input value's type.
	*
	* @template Schema - The schema types that make up this union
	*
	* @example
	* const schema = vine.unionOfTypes([
	*   vine.string(),
	*   vine.number(),
	*   vine.boolean()
	* ])
	*
	* @example
	* const schema = vine.unionOfTypes([
	*   vine.object({ type: vine.literal('user'), name: vine.string() }),
	*   vine.object({ type: vine.literal('admin'), permissions: vine.array(vine.string()) })
	* ])
	*/
	var VineUnionOfTypes = class VineUnionOfTypes {
		/**
		* Array of schemas to match against
		*/
		#schemas;
		/**
		* Callback to invoke when no schema type matches
		*/
		#otherwiseCallback = (_, field) => {
			field.report(messages.unionOfTypes, "unionOfTypes", field);
		};
		/**
		* Creates a new VineUnionOfTypes instance with the specified schemas.
		*
		* @param schemas - Array of schemas to match against input values
		*/
		constructor(schemas) {
			this.#schemas = schemas;
		}
		/**
		* Define a fallback method to invoke when all of the union conditions
		* fail. You may use this method to report an error.
		*/
		otherwise(callback) {
			this.#otherwiseCallback = callback;
			return this;
		}
		/**
		* Clones the VineUnionOfTypes schema type.
		*/
		clone() {
			const cloned = new VineUnionOfTypes(this.#schemas.map((schema) => schema.clone()));
			cloned.otherwise(this.#otherwiseCallback);
			return cloned;
		}
		/**
		* Mark the field under validation as optional. An optional
		* field allows both null and undefined values.
		*/
		optional() {
			return new VineUnionOfTypes([new VineOptional(), ...this.#schemas]);
		}
		/**
		* Mark the field under validation to be null. The null value will
		* be written to the output as well.
		*
		* If `optional` and `nullable` are used together, then both undefined
		* and null values will be allowed.
		*/
		nullable() {
			return new VineUnionOfTypes([new VineNull(), ...this.#schemas]);
		}
		/**
		* Transforms into JSONSchema.
		*/
		toJSONSchema() {
			return { anyOf: this.#schemas.map((schema) => schema.toJSONSchema?.()).filter(Boolean) };
		}
		/**
		* Compiles the union of types schema to a compiler node.
		*
		* Creates conditional branches for each schema using their IS_OF_TYPE
		* methods to determine which schema matches the input value.
		*
		* @param propertyName - The name of the property being validated
		* @param refs - Reference store for tracking validators and conditionals
		* @param options - Parser options including camelCase transformation
		*/
		[PARSE](propertyName, refs, options) {
			return {
				type: "union",
				fieldName: propertyName,
				propertyName: options.toCamelCase ? camelCase(propertyName) : propertyName,
				elseConditionalFnRefId: refs.trackConditional(this.#otherwiseCallback),
				conditions: this.#schemas.map((schema) => {
					return {
						conditionalFnRefId: refs.trackConditional((value, field) => {
							return schema[IS_OF_TYPE](value, field);
						}),
						schema: schema[PARSE](propertyName, refs, options)
					};
				})
			};
		}
	};
	//#endregion
	//#region src/schema/builder.ts
	/**
	* SchemaBuilder exposes methods to construct Vine validation schemas.
	* It provides a fluent API for creating all supported schema types
	* and can be extended with custom methods using macros.
	*
	* @example
	* const builder = new SchemaBuilder()
	* const schema = builder.object({
	*   name: builder.string(),
	*   age: builder.number().min(0),
	*   email: builder.string().email()
	* })
	*/
	var SchemaBuilder = class extends Macroable {
		/**
		* Define a sub-object as a conditional union group.
		* Groups allow creating conditional validations based on discriminator fields.
		*
		* @example
		* vine.group([
		*   vine.group.if(vine.string(), vine.object({ name: vine.string() }))
		* ])
		*/
		group = group;
		/**
		* Define a union of multiple schema types.
		* Union schemas attempt to validate against each schema until one succeeds.
		*
		* @example
		* vine.union([
		*   vine.string(),
		*   vine.number()
		* ])
		*/
		union = union;
		/**
		* Define a string value schema with comprehensive validation rules.
		*
		* @returns A VineString schema instance
		*
		* @example
		* vine.string().email().minLength(5)
		*/
		string() {
			return new VineString();
		}
		/**
		* Define a boolean value schema with optional strict mode.
		*
		* @param options - Configuration options for boolean validation
		* @returns A VineBoolean schema instance
		*
		* @example
		* vine.boolean({ strict: true }) // Only accepts true/false
		*/
		boolean(options) {
			return new VineBoolean(options);
		}
		/**
		* Validate a checkbox or acceptance field to be checked/accepted.
		*
		* @returns A VineAccepted schema instance
		*
		* @example
		* vine.accepted() // Validates terms acceptance
		*/
		accepted() {
			return new VineAccepted();
		}
		/**
		* Define a number value schema with optional strict mode.
		*
		* @param options - Configuration options for number validation
		* @returns A VineNumber schema instance
		*
		* @example
		* vine.number().min(0).max(100)
		*/
		number(options) {
			return new VineNumber(options);
		}
		/**
		* Define a datetime value schema with optional parsing options.
		*
		* @param options - Configuration options for date validation
		* @returns A VineDate schema instance
		*
		* @example
		* vine.date({ formats: ['YYYY-MM-DD'] })
		*/
		date(options) {
			return new VineDate(options);
		}
		/**
		* Define a schema type that validates input matches a specific literal value.
		* Useful for validating exact strings, numbers, or boolean values.
		*
		* @template Value - The literal value type to validate against
		* @param value - The exact value that input must match
		* @returns A VineLiteral schema instance
		*
		* @example
		* vine.literal('hello') // Only accepts "hello"
		* vine.literal(42)      // Only accepts 42
		* vine.literal(true)    // Only accepts true
		*/
		literal(value) {
			return new VineLiteral(value);
		}
		/**
		* Define an optional value that can be undefined.
		* Chain the "nullable" method to also allow null values in the output.
		*
		* @returns A VineOptional schema instance
		*
		* @example
		* vine.optional() // Accepts undefined
		* vine.optional().nullable() // Accepts undefined or null
		*/
		optional() {
			return new VineOptional();
		}
		/**
		* Define a schema that only accepts null values.
		*
		* @returns A VineNull schema instance
		*
		* @example
		* vine.null() // Only accepts null
		*/
		null() {
			return new VineNull();
		}
		/**
		* Define an object schema with known properties and their validation schemas.
		* You may call "allowUnknownProperties" to merge unknown properties into the output.
		*
		* @template Properties - Record of property names to their schema types
		* @param properties - Object defining the schema for each property
		* @returns A VineObject schema instance
		*
		* @example
		* vine.object({
		*   name: vine.string().minLength(2),
		*   age: vine.number().min(0),
		*   email: vine.string().email().optional()
		* })
		*/
		object(properties) {
			return new VineObject(properties);
		}
		/**
		* Define an array schema that validates each element against a given schema.
		* All elements in the array must conform to the same schema type.
		*
		* @template Schema - The schema type for validating array elements
		* @param schema - The schema to validate each array element against
		* @returns A VineArray schema instance
		*
		* @example
		* vine.array(vine.string()) // Array of strings
		* vine.array(vine.object({ id: vine.number() })) // Array of objects
		*/
		array(schema) {
			return new VineArray(schema);
		}
		/**
		* Define a tuple schema with fixed length where each element
		* can have its own validation schema.
		*
		* @template Schema - Array of schema types for each tuple position
		* @param schemas - Array of schemas for each tuple element
		* @returns A VineTuple schema instance
		*
		* @example
		* vine.tuple([
		*   vine.string(),   // First element must be string
		*   vine.number(),   // Second element must be number
		*   vine.boolean()   // Third element must be boolean
		* ])
		*/
		tuple(schemas) {
			return new VineTuple(schemas);
		}
		/**
		* Define a record (dictionary) schema with unknown string keys
		* and values that conform to a specific schema type.
		*
		* @template Schema - The schema type for validating record values
		* @param schema - The schema to validate each record value against
		* @returns A VineRecord schema instance
		*
		* @example
		* vine.record(vine.string()) // { [key: string]: string }
		* vine.record(vine.number()) // { [key: string]: number }
		*/
		record(schema) {
			return new VineRecord(schema);
		}
		enum(values) {
			if (Array.isArray(values) || typeof values === "function") return new VineEnum(values);
			return new VineNativeEnum(values);
		}
		/**
		* Define a schema that accepts any value without validation.
		* Use sparingly as it bypasses type safety and validation.
		*
		* @returns A VineAny schema instance
		*
		* @example
		* vine.any() // Accepts any value: string, number, object, etc.
		*/
		any() {
			return new VineAny();
		}
		/**
		* Define a union of unique schema types with intelligent type discrimination.
		* Unlike regular unions, this validates against the most specific matching schema
		* using runtime type checking.
		*
		* @template Schema - The schema types in the union
		* @param schemas - Array of distinct schema types for the union
		* @returns A VineUnionOfTypes schema instance
		* @throws {Error} When schemas are not compatible or duplicated
		*
		* @example
		* vine.unionOfTypes([
		*   vine.string(),
		*   vine.number(),
		*   vine.boolean()
		* ])
		*
		* // For objects with discriminator fields
		* vine.unionOfTypes([
		*   vine.object({ type: vine.literal('user'), name: vine.string() }),
		*   vine.object({ type: vine.literal('admin'), permissions: vine.array(vine.string()) })
		* ])
		*/
		unionOfTypes(schemas) {
			const schemasInUse = /* @__PURE__ */ new Set();
			schemas.forEach((schema) => {
				if (!schema[IS_OF_TYPE] || !schema[UNIQUE_NAME]) throw new Error(`Cannot use "${schema.constructor.name}". The schema type is not compatible for use with "vine.unionOfTypes"`);
				if (schemasInUse.has(schema[UNIQUE_NAME])) throw new Error(`Cannot use duplicate schema "${schema[UNIQUE_NAME]}". "vine.unionOfTypes" needs distinct schema types only`);
				schemasInUse.add(schema[UNIQUE_NAME]);
			});
			schemasInUse.clear();
			return new VineUnionOfTypes(schemas);
		}
		/**
		* Define a schema that validates native File instances.
		* Useful for file upload validation in web applications.
		*
		* @returns A VineNativeFile schema instance
		*
		* @example
		* vine.nativeFile()
		*   .maxSize(1024 * 1024)
		*   .mimeTypes(['image/png', 'image/jpeg'])
		*/
		nativeFile() {
			return new VineNativeFile();
		}
	};
	//#endregion
	//#region src/vine/validator.ts
	/**
	* Error messages to share with the compiler.
	* Maps core validation types to their default error messages.
	*/
	const COMPILER_ERROR_MESSAGES = {
		required: messages.required,
		array: messages.array,
		object: messages.object
	};
	/**
	* Reusable empty object to avoid creating new instances for default options.
	*/
	const EMPTY_OBJECT = {};
	/**
	* Vine Validator exposes the API to validate data using a pre-compiled
	* schema. This class provides high-performance validation by compiling
	* schemas once and reusing them for multiple validations.
	*
	* @template Schema - The schema type being validated
	* @template MetaData - The metadata type passed to validation
	*
	* @example
	* const validator = vine.compile(schema)
	* const result = await validator.validate(data)
	*/
	var VineValidator = class {
		/**
		* Reference to the compiled schema containing the validation tree
		* and references for reuse during validation
		*/
		#compiled;
		/**
		* JSON Schema is only computed when asked.
		* We cache it in validator for reusability.
		*/
		#jsonSchema;
		/**
		* Messages provider instance used for internationalization
		* and custom error message formatting
		*/
		"messagesProvider";
		/**
		* Error reporter factory function used for formatting
		* and collecting validation errors
		*/
		"errorReporter";
		/**
		* Parses schema to compiler nodes for optimization and compilation.
		* This internal method converts the schema into an AST representation
		* that can be efficiently compiled into validation functions.
		*
		* @param schema - The schema to parse
		*/
		#parse(schema) {
			const refs = refsBuilder();
			return {
				compilerNode: {
					type: "root",
					schema: schema[PARSE]("", refs, { toCamelCase: false })
				},
				refs: refs.toJSON()
			};
		}
		/**
		* Creates a new VineValidator instance with a compiled schema.
		*
		* @param schema - The schema to compile for validation
		* @param options - Configuration options for the validator
		* @param options.convertEmptyStringsToNull - Whether to convert empty strings to null
		* @param options.metaDataValidator - Optional metadata validator function
		* @param options.messagesProvider - Messages provider for error formatting
		* @param options.errorReporter - Error reporter factory function
		*/
		"constructor"(schema, options) {
			this.schema = schema;
			this.options = options;
			/**
			* Compile the schema to a re-usable function
			*/
			const { compilerNode, refs } = this.#parse(schema);
			this.#compiled = {
				schema: compilerNode,
				refs
			};
			const metaDataValidator = options.metaDataValidator;
			const validateFn = new Compiler(compilerNode, {
				convertEmptyStringsToNull: options.convertEmptyStringsToNull,
				messages: COMPILER_ERROR_MESSAGES
			}).compile();
			/**
			* Assign error reporter and messages provider to public
			* properties so that they can be overridden at the
			* validator level.
			*/
			this.errorReporter = options.errorReporter;
			this.messagesProvider = options.messagesProvider;
			/**
			* Creating specialized functions with and without the
			* metadata validator to optimize the runtime
			* performance.
			*/
			if (metaDataValidator) this.validate = (data, validateOptions) => {
				let normalizedOptions = validateOptions ?? EMPTY_OBJECT;
				const meta = normalizedOptions.meta ?? {};
				const errorReporter = normalizedOptions.errorReporter ?? this.errorReporter;
				const messagesProvider = normalizedOptions.messagesProvider ?? this.messagesProvider;
				metaDataValidator(meta);
				return validateFn(data, meta, refs, messagesProvider, errorReporter());
			};
			else this.validate = (data, validateOptions) => {
				let normalizedOptions = validateOptions ?? EMPTY_OBJECT;
				const meta = normalizedOptions.meta ?? {};
				const errorReporter = normalizedOptions.errorReporter ?? this.errorReporter;
				return validateFn(data, meta, refs, normalizedOptions.messagesProvider ?? this.messagesProvider, errorReporter());
			};
		}
		/**
		* Performs validation without throwing a ValidationError exception.
		* Instead, returns a tuple where the first element is the error (if any)
		* and the second is the validated data (if successful).
		*
		* @param data - The data to validate
		* @param options - Optional validation options including metadata, custom error reporter, and messages provider
		*
		* @example
		* const [error, result] = await validator.tryValidate(data)
		* if (error) {
		*   console.log(error.messages)
		* } else {
		*   console.log(result)
		* }
		*
		* @example
		* // With metadata
		* const [error, result] = await validator.tryValidate(data, {
		*   meta: { userId: '123' }
		* })
		*
		* @example
		* // With custom error reporter
		* const [error, result] = await validator.tryValidate(data, {
		*   meta: { userId: auth.user.id },
		*   errorReporter: () => new CustomErrorReporter(),
		*   messagesProvider: customMessagesProvider
		* })
		*/
		async "tryValidate"(data, ...[options]) {
			try {
				return [null, await this.validate(data, options)];
			} catch (error) {
				if (error instanceof ValidationError) return [error, null];
				throw error;
			}
		}
		/**
		* Returns the compiled schema and refs as a JSON-serializable object.
		* Useful for caching compiled schemas or debugging validation logic.
		*
		* @example
		* const compiled = validator.toJSON()
		* console.log(compiled.schema)
		* console.log(compiled.refs)
		*/
		"toJSON"() {
			const { schema, refs } = this.#compiled;
			return {
				schema: structuredClone(schema),
				refs
			};
		}
		/**
		* Converts the validator's schema to JSON Schema Draft 7 format.
		* The result is cached for subsequent calls.
		*
		* @example
		* const jsonSchema = validator.toJSONSchema()
		* console.log(JSON.stringify(jsonSchema, null, 2))
		*/
		"toJSONSchema"() {
			if (!this.#jsonSchema) this.#jsonSchema = this.schema.toJSONSchema();
			return this.#jsonSchema;
		}
		/**
		* Standard Schema V1 compliance implementation.
		* Provides interoperability with other validation libraries through the
		* Standard Schema specification.
		*
		* @see https://github.com/standard-schema/standard-schema
		*/
		"~standard" = {
			version: 1,
			vendor: "vinejs",
			jsonSchema: {
				input: () => {
					return this.toJSONSchema();
				},
				output: () => {
					throw new Error("Vine.js does not support creating validators using JSON Schema.");
				}
			},
			validate: async (data) => {
				const [error, result] = await this.tryValidate(data, {});
				if (result) return { value: result };
				return { issues: error?.messages.map((message) => {
					return {
						...message,
						path: message.field
					};
				}) };
			}
		};
	};
	//#endregion
	//#region src/vine/main.ts
	/**
	* Main Vine class that provides a fluent API for creating validation schemas
	* and validating user input with type-safety using pre-compiled schemas.
	*
	* @example
	* const vine = new Vine()
	* const schema = vine.object({
	*   name: vine.string(),
	*   age: vine.number()
	* })
	* const result = await vine.validate({ schema, data: { name: 'John', age: 30 } })
	*/
	var Vine = class extends SchemaBuilder {
		/**
		* Messages provider to use on the validator for internationalization
		* and custom error message formatting
		*/
		messagesProvider = new SimpleMessagesProvider(messages, fields);
		/**
		* Error reporter factory function to use on the validator for
		* formatting validation errors
		*/
		errorReporter = () => new SimpleErrorReporter();
		/**
		* Control whether or not to convert empty strings to null during validation.
		* Useful for HTML form handling where empty inputs are submitted as empty strings
		*/
		convertEmptyStringsToNull = false;
		/**
		* Collection of helper functions to perform type-checking or cast types
		* while keeping HTML forms serialization behavior in mind
		*/
		helpers = helpers;
		/**
		* Utility function to convert a validation function to a Vine schema rule
		*/
		createRule = createRule;
		/**
		* Pre-compiles a schema into a validation function for better performance
		* when validating multiple data sets against the same schema.
		*
		* @param schema - The validation schema to compile
		*
		* @deprecated Instead use "create"
		*
		* @example
		* const schema = vine.object({
		*   name: vine.string(),
		*   age: vine.number()
		* })
		*
		* const validate = vine.compile(schema)
		* await validate.validate({ name: 'John', age: 30 })
		*/
		compile(schema) {
			return new VineValidator(schema, {
				convertEmptyStringsToNull: this.convertEmptyStringsToNull,
				messagesProvider: this.messagesProvider,
				errorReporter: this.errorReporter
			});
		}
		/**
		* Internal implementation that handles both schema and properties overloads.
		*/
		create(schemaOrProperties) {
			const validatorOptions = {
				convertEmptyStringsToNull: this.convertEmptyStringsToNull,
				messagesProvider: this.messagesProvider,
				errorReporter: this.errorReporter
			};
			if (PARSE in schemaOrProperties) return new VineValidator(schemaOrProperties, validatorOptions);
			return new VineValidator(new VineObject(schemaOrProperties), validatorOptions);
		}
		/**
		* Define a callback to validate the metadata given to the validator
		* at runtime. Useful for passing additional context like user IDs or permissions
		* that can be used within custom validation rules.
		*
		* @param callback - Optional validator function for metadata validation
		*
		* @example
		* // Without metadata validation
		* const validate = vine.withMetaData<{ userId: string }>().create({
		*   title: vine.string(),
		*   description: vine.string()
		* })
		*
		* await validate.validate(data, { meta: { userId: '123' } })
		*
		* @example
		* // With metadata validation
		* const validate = vine
		*   .withMetaData<{ userId: string }>((meta) => {
		*     if (!meta.userId) {
		*       throw new Error('userId is required in metadata')
		*     }
		*   })
		*   .create(schema)
		*
		* await validate.validate(data, { meta: { userId: '123' } })
		*/
		withMetaData(callback) {
			return {
				compile: (schema) => {
					return new VineValidator(schema, {
						convertEmptyStringsToNull: this.convertEmptyStringsToNull,
						messagesProvider: this.messagesProvider,
						errorReporter: this.errorReporter,
						metaDataValidator: callback
					});
				},
				create: (schemaOrProperties) => {
					const validatorOptions = {
						convertEmptyStringsToNull: this.convertEmptyStringsToNull,
						messagesProvider: this.messagesProvider,
						errorReporter: this.errorReporter,
						metaDataValidator: callback
					};
					if (PARSE in schemaOrProperties) return new VineValidator(schemaOrProperties, validatorOptions);
					return new VineValidator(new VineObject(schemaOrProperties), validatorOptions);
				}
			};
		}
		/**
		* Validate data against a schema. Optionally, you can define
		* error messages, fields, a custom messages provider,
		* or an error reporter.
		*
		* @param options - Configuration object containing schema, data, and validation options
		* @returns Promise resolving to validated and typed data
		* @throws {ValidationError} When validation fails
		*
		* @example
		* await vine.validate({ schema, data })
		* await vine.validate({ schema, data, messages, fields })
		*
		* await vine.validate({ schema, data, messages, fields }, {
		*   errorReporter
		* })
		*/
		validate(options) {
			return this.compile(options.schema).validate(options.data, options);
		}
		/**
		* Validate data against a schema without throwing the
		* "ValidationError" exception. Instead the validation
		* errors are returned within the return value.
		*
		* @param options - Configuration object containing schema, data, and validation options
		* @returns Promise resolving to tuple of [error, null] or [null, validatedData]
		*
		* @example
		* await vine.tryValidate({ schema, data })
		* await vine.tryValidate({ schema, data, messages, fields })
		*
		* await vine.tryValidate({ schema, data, messages, fields }, {
		*   errorReporter
		* })
		*/
		tryValidate(options) {
			return this.compile(options.schema).tryValidate(options.data, options);
		}
	};
	//#endregion
	//#region index.ts
	const vine = new Vine();

	class VINEJS {
	    promises = [];
	    config;
	    state;
	    extend;
	    validator;
	    schema;
	    compiled;
	    constructor({ config, state = null, promises = [], }) {
	        this.state = state;
	        this.promises = promises;
	        this.config = config;
	        this.extend = config?.extend;
	        this.validator = config.package ?? vine;
	        this.schema = config.schema;
	        this.compiled = this.validator.compile(this.schema);
	        this.extendValidator();
	    }
	    extendValidator() {
	        if (typeof this.extend === "function") {
	            this.extend({
	                validator: this.validator,
	                form: this.state.form,
	            });
	        }
	    }
	    // VineJS emits dot-notation paths (e.g. 'members.0.name') which match
	    // the MRF field.path convention.
	    validate(field) {
	        const validationPromise = this.compiled
	            .validate(field.state.form.flatMapValues)
	            .then(() => field.setValidationAsyncData(true))
	            .catch((error) => this.handleAsyncFail(field, error))
	            .then(() => this.executeAsyncValidation(field));
	        this.promises.push(validationPromise);
	    }
	    handleAsyncFail(field, error) {
	        const messages = error?.messages ?? [];
	        if (!messages.length)
	            return;
	        const fieldError = messages.find((item) => item.field === field.path);
	        if (fieldError) {
	            field.setValidationAsyncData(false, fieldError.message);
	        }
	    }
	    executeAsyncValidation(field) {
	        if (field.validationAsyncData.valid === false) {
	            field.invalidate(field.validationAsyncData.message ?? undefined, false, true);
	        }
	    }
	}
	var VINEJS_default = (config) => ({
	    class: (VINEJS),
	    config,
	});

	return VINEJS_default;

}));
//# sourceMappingURL=MobxFormkitValidatorVINEJS.umd.js.map
