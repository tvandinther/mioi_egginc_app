(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{360:function(e,t,r){"use strict";r.d(t,"a",(function(){return c}));var n=r(0),a=r.n(n),o=r(361),i=r(12),l=r(32);function c(e){var t=Object(i.c)(),r={title:e.title||null,shortTitle:e.shortTitle||""};return Object(n.useEffect)((function(){var e=document.title,n=[e];return r.title&&n.push(r.title),document.title=n.join(" | "),t(Object(l.b)(r)),function(){return document.title=e}}),[]),a.a.createElement(o.a,null,e.children)}},361:function(e,t,r){"use strict";r.d(t,"a",(function(){return j}));var n=r(0),a=r.n(n),o=r(351),i=r(413),l=r(346),c=r(352),u=r(76),d=r(164),s=r(18),f=Object(d.a)((function(e){return{root:{marginTop:"8px"},card:{padding:8},paper:{padding:"8px 8px"},button:{margin:"10px 0px 10px 16px"}}}));function p(e){var t=f(),r=Object(s.g)();return a.a.createElement(o.a,{className:t.root},a.a.createElement(i.a,{className:t.card},a.a.createElement(u.a,{align:"center",variant:"h4"},"Something went wrong =/"),a.a.createElement("br",null),a.a.createElement(u.a,{variant:"h5"},"What do I do now?"),a.a.createElement(l.a,{className:t.paper},a.a.createElement("ol",{className:t.list},a.a.createElement("li",null,"Go back to the previous page and pretend like we never saw each other.",a.a.createElement("br",null),a.a.createElement(c.a,{variant:"outlined",className:t.button,onClick:function(){r.goBack()}},"Go Back")),a.a.createElement("li",null,"If you came back here, try to reset the bad data by emptying the app's cache.",a.a.createElement("br",null),a.a.createElement(c.a,{variant:"outlined",className:t.button,onClick:function(){window.localStorage.removeItem("persist:appSettings"),window.location.href=window.location.origin}},"Empty Cache")),a.a.createElement("li",null,"If you are still here, send me a report.",a.a.createElement("br",null),a.a.createElement(c.a,{variant:"outlined",className:t.button,onClick:function(){e.error.stack}},"Send Report"))))))}function m(e){return(m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function b(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function v(e,t){return(v=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function h(e,t){return!t||"object"!==m(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function y(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function g(e){return(g=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var j=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&v(e,t)}(l,e);var t,r,n,o,i=(t=l,function(){var e,r=g(t);if(y()){var n=g(this).constructor;e=Reflect.construct(r,arguments,n)}else e=r.apply(this,arguments);return h(this,e)});function l(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,l),(t=i.call(this,e)).state={error:null,errorInfo:null},t}return r=l,o=[{key:"getDerivedStateFromError",value:function(e){return{error:e}}}],(n=[{key:"componentDidCatch",value:function(){}},{key:"render",value:function(){return this.state.error?a.a.createElement(p,{error:this.state.error}):this.props.children}}])&&b(r.prototype,n),o&&b(r,o),l}(a.a.Component)},384:function(e,t,r){"use strict";r.d(t,"a",(function(){return h}));var n=r(312),a=r(416),o=r(0),i=r.n(o),l=r(61),c=r(164),u=r(12),d=r(415),s=r.n(d),f=r(59),p=r(24);function m(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var r=[],n=!0,a=!1,o=void 0;try{for(var i,l=e[Symbol.iterator]();!(n=(i=l.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(e){a=!0,o=e}finally{try{n||null==l.return||l.return()}finally{if(a)throw o}}return r}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return b(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return b(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function b(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var v=Object(c.a)((function(e){return{root:{display:"grid",gridTemplateColumns:"1fr auto",gridGap:10,alignItems:"center",justifyItems:"center"}}}));function h(e){var t=v(),r=Object(u.c)(),c=Object(u.d)((function(e){return e.settings.playerId})),d=(Object(u.d)((function(e){return e.playerData.userId})),Object(u.d)((function(e){return e.playerData.fetching}))),b=Object(u.d)((function(e){return e.playerData.error})),h=m(Object(o.useState)(!!c&&(b&&!d)),2),y=h[0],g=h[1],j=m(Object(o.useState)(c||""),2),O=j[0],E=j[1];Object(o.useEffect)((function(){E(c||"")}),[c]);var w=function(e){""!==O&&O!==c&&(r(Object(l.e)(O)),r(Object(l.d)(O)),p.a.event({category:"Player",action:"PlayerID Submitted"}))};return i.a.createElement("div",{className:t.root},i.a.createElement(a.a,{value:O,fullWidth:!0,error:y,helperText:"Found at the bottom of the 'Privacy & Data' in-game menu",label:"Player ID",onChange:function(e){E(e.target.value),g(!1)},onKeyUp:function(e){"Enter"===e.key&&w()}}),d&&i.a.createElement(f.a,null),!d&&i.a.createElement(n.a,{onClick:w,color:"primary",size:"medium",disabled:O===c},i.a.createElement(s.a,null)))}},415:function(e,t,r){"use strict";var n=r(14);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=n(r(0)),o=(0,n(r(39)).default)(a.default.createElement("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckCircle");t.default=o},416:function(e,t,r){"use strict";var n=r(1),a=r(2),o=r(0),i=(r(3),r(4)),l=r(434),c=r(435),u=r(451),d=r(450),s=r(376),f=r(5),p=r(6),m=r(111),b=r(106),v=o.forwardRef((function(e,t){var r=e.children,l=e.classes,c=e.className,u=e.color,d=void 0===u?"primary":u,f=e.component,v=void 0===f?"div":f,h=e.disabled,y=void 0!==h&&h,g=e.error,j=void 0!==g&&g,O=e.fullWidth,E=void 0!==O&&O,w=e.focused,S=e.hiddenLabel,C=void 0!==S&&S,P=e.margin,k=void 0===P?"none":P,x=e.required,I=void 0!==x&&x,F=e.size,N=e.variant,T=void 0===N?"standard":N,D=Object(a.a)(e,["children","classes","className","color","component","disabled","error","fullWidth","focused","hiddenLabel","margin","required","size","variant"]),R=o.useState((function(){var e=!1;return r&&o.Children.forEach(r,(function(t){if(Object(m.a)(t,["Input","Select"])){var r=Object(m.a)(t,["Select"])?t.props.input:t;r&&Object(s.a)(r.props)&&(e=!0)}})),e})),W=R[0],L=R[1],_=o.useState((function(){var e=!1;return r&&o.Children.forEach(r,(function(t){Object(m.a)(t,["Input","Select"])&&Object(s.b)(t.props,!0)&&(e=!0)})),e})),A=_[0],B=_[1],M=o.useState(!1),q=M[0],z=M[1],G=void 0!==w?w:q;y&&G&&z(!1);var V=o.useCallback((function(){B(!0)}),[]),H={adornedStart:W,setAdornedStart:L,color:d,disabled:y,error:j,filled:A,focused:G,fullWidth:E,hiddenLabel:C,margin:("small"===F?"dense":void 0)||k,onBlur:function(){z(!1)},onEmpty:o.useCallback((function(){B(!1)}),[]),onFilled:V,onFocus:function(){z(!0)},registerEffect:void 0,required:I,variant:T};return o.createElement(b.a.Provider,{value:H},o.createElement(v,Object(n.a)({className:Object(i.a)(l.root,c,"none"!==k&&l["margin".concat(Object(p.a)(k))],E&&l.fullWidth),ref:t},D),r))})),h=Object(f.a)({root:{display:"inline-flex",flexDirection:"column",position:"relative",minWidth:0,padding:0,margin:0,border:0,verticalAlign:"top"},marginNormal:{marginTop:16,marginBottom:8},marginDense:{marginTop:8,marginBottom:4},fullWidth:{width:"100%"}},{name:"MuiFormControl"})(v),y=r(436),g=r(446),j={standard:l.a,filled:c.a,outlined:u.a},O=o.forwardRef((function(e,t){var r=e.autoComplete,l=e.autoFocus,c=void 0!==l&&l,u=e.children,s=e.classes,f=e.className,p=e.color,m=void 0===p?"primary":p,b=e.defaultValue,v=e.disabled,O=void 0!==v&&v,E=e.error,w=void 0!==E&&E,S=e.FormHelperTextProps,C=e.fullWidth,P=void 0!==C&&C,k=e.helperText,x=e.hiddenLabel,I=e.id,F=e.InputLabelProps,N=e.inputProps,T=e.InputProps,D=e.inputRef,R=e.label,W=e.multiline,L=void 0!==W&&W,_=e.name,A=e.onBlur,B=e.onChange,M=e.onFocus,q=e.placeholder,z=e.required,G=void 0!==z&&z,V=e.rows,H=e.rowsMax,J=e.select,U=void 0!==J&&J,K=e.SelectProps,$=e.type,Q=e.value,X=e.variant,Y=void 0===X?"standard":X,Z=Object(a.a)(e,["autoComplete","autoFocus","children","classes","className","color","defaultValue","disabled","error","FormHelperTextProps","fullWidth","helperText","hiddenLabel","id","InputLabelProps","inputProps","InputProps","inputRef","label","multiline","name","onBlur","onChange","onFocus","placeholder","required","rows","rowsMax","select","SelectProps","type","value","variant"]);var ee={};"outlined"===Y&&(F&&void 0!==F.shrink&&(ee.notched=F.shrink),R&&(ee.label=o.createElement(o.Fragment,null,R,G&&" *"))),U&&(K&&K.native||(ee.id=void 0),ee["aria-describedby"]=void 0);var te=k&&I?"".concat(I,"-helper-text"):void 0,re=R&&I?"".concat(I,"-label"):void 0,ne=j[Y],ae=o.createElement(ne,Object(n.a)({"aria-describedby":te,autoComplete:r,autoFocus:c,defaultValue:b,fullWidth:P,multiline:L,name:_,rows:V,rowsMax:H,type:$,value:Q,id:I,inputRef:D,onBlur:A,onChange:B,onFocus:M,placeholder:q,inputProps:N},ee,T));return o.createElement(h,Object(n.a)({className:Object(i.a)(s.root,f),disabled:O,error:w,fullWidth:P,hiddenLabel:x,ref:t,required:G,color:m,variant:Y},Z),R&&o.createElement(d.a,Object(n.a)({htmlFor:I,id:re},F),R),U?o.createElement(g.a,Object(n.a)({"aria-describedby":te,id:I,labelId:re,value:Q,input:ae},K),u):ae,k&&o.createElement(y.a,Object(n.a)({id:te},S),k))}));t.a=Object(f.a)({root:{}},{name:"MuiTextField"})(O)}}]);