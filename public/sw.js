if(!self.define){let e,s={};const a=(a,i)=>(a=new URL(a+".js",i).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,n)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const u=e=>a(e,c),r={module:{uri:c},exports:t,require:u};s[c]=Promise.all(i.map((e=>r[e]||u(e)))).then((e=>(n(...e),t)))}}define(["./workbox-f1770938"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/4UukpBfa93IiNFxjlMKIS/_buildManifest.js",revision:"e7c50d143b5cb7a2e6971f33703e7113"},{url:"/_next/static/4UukpBfa93IiNFxjlMKIS/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/2367-b7787723198bae4d.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/2616-047a0871f87f54d6.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/3234-fd81a1a363785a29.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/3561-24521ff82ee9cda0.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/3651-3003469bb84c3e62.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/3e344cd8-50ed9fb820412ea5.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/40-1b30e780821dc6ad.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/4635-efd945d1e21a6c90.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/4844-f707e9bd8ae0b96a.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/4876-0d18e482134e9cf5.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/4bd1b696-c3ff31b370fed8b4.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/5348-7ee7bc514346d84b.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/6228-99a40a69b9a6b006.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/6837-75413f3b99f3b816.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/714-77dec6ae1824f64d.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/7193-b05da8692e3efc35.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/7455-aa146930d09dfc60.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/8018-c6e76003460ee470.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/8173-93c68b2eb0217ecb.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/8249-2bc217de194ef2be.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/841-ea6417e38d53453e.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/8695-6ddec67db69f41a3.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/8876-f9a0eac8039d6384.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/9606-01c488dba832e9bc.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/app/_not-found/page-ab1344deb358fd2d.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/app/api/trpc/%5Btrpc%5D/route-db83397569c34ca6.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/app/app/ia-interview/page-e192a8148e995594.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/app/app/jobs/page-9f8605710a3cb95c.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/app/app/layout-19ef5e2d583ace74.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/app/app/library/page-906adb6fd7a0c2f7.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/app/app/page-9508e29bf7a8ce3a.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/app/app/resume/%5Bid%5D/certifications/page-18eeae7af4c8213d.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/app/app/resume/%5Bid%5D/contact/page-3a9a488253a1a0e1.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/app/app/resume/%5Bid%5D/courseworks/page-ffb6f447c340b9b5.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/app/app/resume/%5Bid%5D/educations/page-54df87741c14820c.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/app/app/resume/%5Bid%5D/experiences/page-47932bd5c89b219c.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/app/app/resume/%5Bid%5D/format/page-66b7207b44444441.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/app/app/resume/%5Bid%5D/languages/page-f5c22a9a687efa71.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/app/app/resume/%5Bid%5D/layout-6475f455d970069b.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/app/app/resume/%5Bid%5D/projects/page-d748cc584805e9ab.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/app/app/resume/%5Bid%5D/skills/page-ebe49f84d80dd451.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/app/app/resume/%5Bid%5D/summary/page-73660de6c8e6f117.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/app/app/resume/layout-625e547b5732c9d8.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/app/app/settings/page-43c4db1175c325b5.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/app/layout-caa247083052b509.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/app/page-6baf27c75a4ca24b.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/app/s/%5Bid%5D/page-680f034cf5558786.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/ccd63cfe-e470b6edb384003a.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/e37a0b60-0958e6073d3a81a8.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/framework-1ec85e83ffeb8a74.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/main-ad01021c500d86df.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/main-app-8cc51b23d64dcd1b.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/pages/_app-5f03510007f8ee45.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/pages/_error-8efa4fbf3acc0458.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-c3eda80bc51cc412.js",revision:"4UukpBfa93IiNFxjlMKIS"},{url:"/_next/static/css/e6aec029d1e853a9.css",revision:"e6aec029d1e853a9"},{url:"/_next/static/media/413bda3e3a1ca4ba-s.woff2",revision:"fa9e73cf65c3fe260bfba82164677fd7"},{url:"/_next/static/media/6184108e75fcccb4-s.woff2",revision:"7e47e5507657a6d7a0073c4b25245a5e"},{url:"/_next/static/media/e84eb01f035f4f4d-s.p.woff2",revision:"83c5b7dc6d58364f42763c15e86a7737"},{url:"/android-launchericon-144-144.png",revision:"1df6add0c19581015b9747c65b3899ce"},{url:"/android-launchericon-192-192.png",revision:"0b0dce4310ee3df2073229e0fd708b52"},{url:"/android-launchericon-48-48.png",revision:"2a24fd295078ea8556889a6d6979b06c"},{url:"/android-launchericon-512-512.png",revision:"31ddd4b6ad3d508ce048209e5e59129d"},{url:"/android-launchericon-72-72.png",revision:"4e13044150ee60e6327b2bf03263e6f6"},{url:"/android-launchericon-96-96.png",revision:"2518091489e4b198f2deeb0a0c659960"},{url:"/error.png",revision:"382897a2de9c348bd464bbd12669ae51"},{url:"/favicon.ico",revision:"f3c25005ddbc164f60f31b5aeb413ce5"},{url:"/manifest.json",revision:"474f27a82b1be4fcad0cca2776c9c4ec"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/callback")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
