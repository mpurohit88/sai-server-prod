(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{"9D57":function(e,t,a){},JcI3:function(e,t,a){"use strict";a("f3/d");var n=a("q1tI"),r=a.n(n);t.a=function(e){var t=e.linkList,a=e.headingText;return r.a.createElement(r.a.Fragment,null,r.a.createElement("h4",{className:"mb-4 border-bottom"},a),r.a.createElement("ul",{className:"list-unstyled"},t.map((function(e){return r.a.createElement("li",{className:"mb-1"},r.a.createElement("a",{className:"text-decoration-none text-dark",href:e.href},e.name))}))))}},MeWi:function(e,t,a){"use strict";var n=a("q1tI"),r=a.n(n);a("9D57");t.a=function(e){var t=e.headingText,a=e.linkText;return r.a.createElement("section",{className:"banner-background"},r.a.createElement("div",{className:"opacity"},r.a.createElement("div",{className:"container"},r.a.createElement("h1",{className:"font-weight-bold text-white h1"},t),r.a.createElement("ul",{className:"list-unstyled list-inline text-white col-md-12 pl-0"},r.a.createElement("li",{className:"list-inline-item"},r.a.createElement("a",{className:"text-decoration-none text-white",href:"/"},"Home")),r.a.createElement("li",{className:"list-inline-item"},"."),r.a.createElement("li",{className:"list-inline-item"},a)))))}},NqBK:function(e,t,a){"use strict";var n=a("q1tI"),r=a.n(n),l=a("0aDJ"),c=a("Wbzz");t.a=function(e){var t=e.tableData;return t&&t.length>0?r.a.createElement("table",{className:"table table-bordered table-hover"},r.a.createElement("thead",{className:"thead-dark"},r.a.createElement("tr",null,r.a.createElement("th",{width:"50%"},"Title"),r.a.createElement("th",null,"Published"),r.a.createElement("th",null,"Price"),r.a.createElement("th",{width:"20%"},"TOC Available"))),r.a.createElement("tbody",null,t.map((function(e){return r.a.createElement("tr",null,r.a.createElement("td",{width:"50%"},r.a.createElement(c.a,{className:"text-decoration-none",to:"/market-report-research/"+e.slug.toLowerCase()+"-"+e.report_type+e.report_sub_type},r.a.createElement("div",{width:"50%",className:"text-primary",dangerouslySetInnerHTML:{__html:e.title}})),r.a.createElement("br",null),e.description?r.a.createElement("div",{width:"50%",dangerouslySetInnerHTML:{__html:e.description.substring(0,e.description.indexOf("."))}}):""),r.a.createElement("td",{className:"text-center text-muted pt-3"},e.report_sub_type==Object(l.a)().report_release_type.Latest_Published_Reports?e.month:"Upcoming Report"),r.a.createElement("td",null,r.a.createElement("div",{className:"text-center mb-3 text-muted"},e.report_sub_type==Object(l.a)().report_release_type.Latest_Published_Reports?"Single User Price: $"+(e.single_user_price?e.single_user_price:""):"Direct Insights: $"+e.direct_insights),r.a.createElement("div",{className:"text-center text-muted"},"Corporate User Licence: $",(t=e.reg_cat_id,a=e.one_cntry,n=e.single_user_price,i=e.multiple_user_price,7!=t?i:300==a?500:3795==n?6795:7795))),r.a.createElement("td",{className:"text-center"},e.table_contents?r.a.createElement("i",{class:"fa fa-check-square-o","aria-hidden":"true"}):""));var t,a,n,i})))):r.a.createElement("div",{className:"h4 text-center"},"No reports available ")}},VWjl:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return f}));var n=a("q1tI"),r=a.n(n),l=(a("a1Th"),a("Btvt"),a("XfO3"),a("HEwt"),a("rGqo"),a("rE2o"),a("ioFf"),a("f3/d"),a("Vd3H"),a("dRSK"),a("3eXy")),c=a("NqBK"),i=a("MeWi"),s=a("JcI3");function o(e){return function(e){if(Array.isArray(e))return m(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return m(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return m(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var u=function(e){var t=e.slug,a=Object(l.e)(),n=Object(l.b)(),m=[].concat(o(Object(l.c)()),o(Object(l.d)()),o(Object(l.f)()),o(Object(l.g)())),u=a.find((function(e){return e.slug==t})),d=m.filter((function(e){return e.reg_cat_id==u.id})),f=d.filter((function(e){return e.month})).sort((function(e,t){return new Date(t.month)-new Date(e.month)})),h=d.filter((function(e){return!e.month}));return r.a.createElement(r.a.Fragment,null,r.a.createElement(i.a,{headingText:u.cat_name,linkText:u.cat_name}),r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-3"},r.a.createElement(s.a,{headingText:"Regions",linkList:a.map((function(e){return{name:e.cat_name,href:"/report/reg/"+e.slug}}))}),r.a.createElement(s.a,{headingText:"Industries",linkList:n.map((function(e){return{name:e.name,href:"/report/"+e.slug}}))})),r.a.createElement("div",{className:"col-md-9"},r.a.createElement(c.a,{tableData:[].concat(o(f),o(h))})))))},d=a("6Gdd");function f(e){var t=e.pageContext;return r.a.createElement(d.a,null,r.a.createElement(u,{slug:t.slug}))}}}]);
//# sourceMappingURL=component---src-templates-region-report-template-js-3d5a4d23057449f38a08.js.map