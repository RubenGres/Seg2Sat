export const manifest = {
	appDir: "_app",
	assets: new Set(["favicon.png","robots.txt","samples/default.jpg","samples/example0.png","samples/example1.png","samples/example2.png","samples/example3.png","samples/example4.png","samples/example5.png","samples/example6.jpg","svelte-welcome.png","svelte-welcome.webp"]),
	mimeTypes: {".png":"image/png",".txt":"text/plain",".jpg":"image/jpeg",".webp":"image/webp"},
	_: {
		entry: {"file":"start-f751e6ba.js","js":["start-f751e6ba.js","chunks/index-bcf2726a.js","chunks/paths-d3bcbd10.js"],"css":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js')
		],
		routes: [
			{
				type: 'page',
				id: "",
				pattern: /^\/$/,
				names: [],
				types: [],
				path: "/",
				shadow: null,
				a: [0,2],
				b: [1]
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
