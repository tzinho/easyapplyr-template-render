if(!self.define){let e,a={};const s=(s,n)=>(s=new URL(s+".js",n).href,a[s]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=a,document.head.appendChild(e)}else e=s,importScripts(s),a()})).then((()=>{let e=a[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,i)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(a[t])return;let c={};const r=e=>s(e,t),u={module:{uri:t},exports:c,require:r};a[t]=Promise.all(n.map((e=>u[e]||r(e)))).then((e=>(i(...e),c)))}}define(["./workbox-f1770938"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/Okva27TUmMDa4fRIjjA_4/_buildManifest.js",revision:"a53a810620d5caf5128415fb6d59a50c"},{url:"/_next/static/Okva27TUmMDa4fRIjjA_4/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/142-7bbab528e0284198.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/164f4fb6-774a5402dc0ec181.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/2616-047a0871f87f54d6.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/3324-2684d565cf5a3285.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/3561-24521ff82ee9cda0.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/3e344cd8-50ed9fb820412ea5.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/40-1b30e780821dc6ad.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/4635-efd945d1e21a6c90.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/468-54fc7f8ac9fd0a95.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/4844-dd1ddeb20c274c6b.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/4876-0d18e482134e9cf5.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/4bd1b696-c3ff31b370fed8b4.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/5203.7c54c202406d4620.js",revision:"7c54c202406d4620"},{url:"/_next/static/chunks/5484-0988d5642278260b.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/5581-b6e79628f077a8ab.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/587-be75029a263daf37.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/6218.ec4f3176909768d6.js",revision:"ec4f3176909768d6"},{url:"/_next/static/chunks/6457.ff1e277c4fc50778.js",revision:"ff1e277c4fc50778"},{url:"/_next/static/chunks/6837-ca68d6567a3e0fa6.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/7402-eb44bc8beae3493f.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/7455-ba8f70e0e51dca06.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/8018-c6e76003460ee470.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/8173-93c68b2eb0217ecb.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/8249-2bc217de194ef2be.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/8352-d568d27cc4e51154.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/841-00b37f0cfdb9005d.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/8695-6e83713322e08f3b.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/8900-30b929568da6a826.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/9839.4bf265eb51c73bfa.js",revision:"4bf265eb51c73bfa"},{url:"/_next/static/chunks/ad2866b8-e61efaab7b01bf9f.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/app/_not-found/page-ab1344deb358fd2d.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/app/api/trpc/%5Btrpc%5D/route-494239ac22367092.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/app/app/ia-interview/page-fbca2d69bfa0b4d2.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/app/app/jobs/page-7074fe58243029ab.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/app/app/layout-fb4e8b0c2421e667.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/app/app/library/page-abdaa189d3d58d0a.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/app/app/page-d8f5e443d48fb02f.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/app/app/resume/%5Bid%5D/certifications/page-3657a58c783ef3db.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/app/app/resume/%5Bid%5D/contact/page-37d065da2e44c22c.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/app/app/resume/%5Bid%5D/courseworks/page-8c25247100cad90a.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/app/app/resume/%5Bid%5D/educations/page-955d3775b2434005.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/app/app/resume/%5Bid%5D/experiences/page-0dd1b47703db380f.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/app/app/resume/%5Bid%5D/format/page-12b5e4aaf3219b15.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/app/app/resume/%5Bid%5D/languages/page-d8a1900c02c1d95b.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/app/app/resume/%5Bid%5D/layout-55414b942e68f85e.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/app/app/resume/%5Bid%5D/projects/page-6df55186ccf3f7b9.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/app/app/resume/%5Bid%5D/skills/page-ccbf3be81bf0b0b4.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/app/app/resume/%5Bid%5D/summary/page-163bc9c33527fab0.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/app/app/resume/layout-2310c2dfc4268614.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/app/app/settings/page-61d6a0f5dd25d208.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/app/layout-28759a1dcf876e4d.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/app/page-0394bc36de359070.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/app/s/%5Bid%5D/page-680f034cf5558786.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/bc98253f.f0ee411d584519ae.js",revision:"f0ee411d584519ae"},{url:"/_next/static/chunks/ccd63cfe-e470b6edb384003a.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/e37a0b60-0958e6073d3a81a8.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/framework-1ec85e83ffeb8a74.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/main-app-7176e53bc124fd37.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/main-ed3abfb1c168d4cd.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/pages/_app-c9ef09d97714d9a0.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/pages/_error-34df4b788d70a0b4.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-f3b1d71e375d4785.js",revision:"Okva27TUmMDa4fRIjjA_4"},{url:"/_next/static/css/009f110f373cf4a5.css",revision:"009f110f373cf4a5"},{url:"/_next/static/media/413bda3e3a1ca4ba-s.woff2",revision:"fa9e73cf65c3fe260bfba82164677fd7"},{url:"/_next/static/media/6184108e75fcccb4-s.woff2",revision:"7e47e5507657a6d7a0073c4b25245a5e"},{url:"/_next/static/media/e84eb01f035f4f4d-s.p.woff2",revision:"83c5b7dc6d58364f42763c15e86a7737"},{url:"/android-launchericon-144-144.png",revision:"1df6add0c19581015b9747c65b3899ce"},{url:"/android-launchericon-192-192.png",revision:"0b0dce4310ee3df2073229e0fd708b52"},{url:"/android-launchericon-48-48.png",revision:"2a24fd295078ea8556889a6d6979b06c"},{url:"/android-launchericon-512-512.png",revision:"31ddd4b6ad3d508ce048209e5e59129d"},{url:"/android-launchericon-72-72.png",revision:"4e13044150ee60e6327b2bf03263e6f6"},{url:"/android-launchericon-96-96.png",revision:"2518091489e4b198f2deeb0a0c659960"},{url:"/error.png",revision:"382897a2de9c348bd464bbd12669ae51"},{url:"/favicon.ico",revision:"f3c25005ddbc164f60f31b5aeb413ce5"},{url:"/manifest.json",revision:"5172b0d7613740a66271944e1fdb6474"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:a}})=>!(!e||a.startsWith("/api/auth/callback")||!a.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:a},sameOrigin:s})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&s&&!a.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:a},sameOrigin:s})=>"1"===e.headers.get("RSC")&&s&&!a.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:a})=>a&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
