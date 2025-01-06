import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import 'es-module-lexer';
import { v as NOOP_MIDDLEWARE_HEADER, w as decodeKey } from './chunks/astro/server_R7F9Mf6i.mjs';
import 'clsx';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/driespieters/Repositories/driespieters/","adapterName":"@astrojs/netlify","routes":[{"file":"terms-and-conditions/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/terms-and-conditions","isIndex":false,"type":"page","pattern":"^\\/terms-and-conditions\\/?$","segments":[[{"content":"terms-and-conditions","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/terms-and-conditions.astro","pathname":"/terms-and-conditions","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/Users/driespieters/Repositories/driespieters/src/components/Projects.astro",{"propagation":"in-tree","containsHead":false}],["/Users/driespieters/Repositories/driespieters/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/Users/driespieters/Repositories/driespieters/src/components/Services.astro",{"propagation":"in-tree","containsHead":false}],["/Users/driespieters/Repositories/driespieters/src/pages/terms-and-conditions.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:src/pages/terms-and-conditions@_@astro":"pages/terms-and-conditions.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_BFWqKyHk.mjs","/Users/driespieters/Repositories/driespieters/.astro/content-assets.mjs":"chunks/content-assets_Cr3Y13KP.mjs","/Users/driespieters/Repositories/driespieters/.astro/content-modules.mjs":"chunks/content-modules_Dz-S_Wwv.mjs","/Users/driespieters/Repositories/driespieters/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_CaiW9lgW.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_C-k6t2Z4.mjs","/Users/driespieters/Repositories/driespieters/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts":"_astro/Layout.astro_astro_type_script_index_0_lang.8-rFdlzL.js","/Users/driespieters/Repositories/driespieters/src/layouts/Layout.astro?astro&type=script&index=1&lang.ts":"_astro/Layout.astro_astro_type_script_index_1_lang.D0nhedfg.js","/Users/driespieters/Repositories/driespieters/src/components/Projects.astro?astro&type=script&index=0&lang.ts":"_astro/Projects.astro_astro_type_script_index_0_lang.Ca0jm8Q3.js","/Users/driespieters/Repositories/driespieters/src/components/Services.astro?astro&type=script&index=0&lang.ts":"_astro/Services.astro_astro_type_script_index_0_lang.nwfN3c79.js","/Users/driespieters/Repositories/driespieters/src/components/Footer.astro?astro&type=script&index=0&lang.ts":"_astro/Footer.astro_astro_type_script_index_0_lang.16oRyXe5.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/driespieters/Repositories/driespieters/src/layouts/Layout.astro?astro&type=script&index=1&lang.ts","document.documentElement.className=document.documentElement.className.replace(\"no-js\",\"js\");"],["/Users/driespieters/Repositories/driespieters/src/components/Footer.astro?astro&type=script&index=0&lang.ts","class i extends HTMLElement{interval=0;connectedCallback(){this.render(),this.interval=setInterval(()=>this.render(),1e3)}disconnectedCallback(){clearInterval(this.interval)}render(){const e=new Date,t={hour:\"2-digit\",minute:\"2-digit\",second:\"2-digit\",hour12:!1},n=new Intl.DateTimeFormat(\"nl-BE\",t).format(e);this.textContent=n}}customElements.define(\"current-time\",i);"]],"assets":["/_astro/shopify.DcikLiXb.svg","/_astro/driespieters.NUDpeXOF.jpg","/_astro/inter-vietnamese-wght-normal.CBcvBZtf.woff2","/_astro/inter-cyrillic-ext-wght-normal.B2xhLi22.woff2","/_astro/inter-cyrillic-wght-normal.CMZtQduZ.woff2","/_astro/inter-greek-wght-normal.CaVNZxsx.woff2","/_astro/inter-greek-ext-wght-normal.CGAr0uHJ.woff2","/_astro/inter-latin-wght-normal.C2S99t-D.woff2","/_astro/inter-latin-ext-wght-normal.CFHvXkgd.woff2","/_astro/hnst.BEfHFfgi.webp","/_astro/gimber_browser.DseCSQP1.png","/_astro/royco.CWgmqPnf.jpeg","/_astro/vbdck.DkXzHosM.webp","/_astro/refizz_browser.DrOqvpFo.png","/_astro/brukomtegel.D3NOQeLU.jpeg","/_astro/stoked_browser.CFk6vAvB.png","/_astro/royco_browser.B1soBw3_.png","/_astro/vbdck_browser.Cadbn83I.png","/_astro/index.DNMZJCee.css","/brukomtegel_browser.mp4","/favicon.svg","/gimber.mp4","/hnst.mp4","/refizz.mp4","/stokedboardshop.mov","/vbdck_browser.mp4","/_astro/Layout.astro_astro_type_script_index_0_lang.8-rFdlzL.js","/_astro/Projects.astro_astro_type_script_index_0_lang.Ca0jm8Q3.js","/_astro/Services.astro_astro_type_script_index_0_lang.nwfN3c79.js","/terms-and-conditions/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"NBH9W8OrlPJbGpe7oE7R+wwLFiTt48O02FpFRetWm6c="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
