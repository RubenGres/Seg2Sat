import { n as noop, a as safe_not_equal, c as create_ssr_component, b as subscribe, d as each, e as escape, f as add_attribute, g as set_store_value, v as validate_component } from "../../chunks/index-445fd704.js";
import { b as base } from "../../chunks/paths-396f020f.js";
import "nanoid";
import "px-brush";
const COLOR_LIST = [
  { color: [219, 14, 154], label: "building" },
  { color: [147, 142, 123], label: "pervious surface" },
  { color: [248, 12, 0], label: "impervious surface" },
  { color: [169, 113, 1], label: "bare soil" },
  { color: [21, 83, 174], label: "water" },
  { color: [25, 74, 38], label: "coniferous" },
  { color: [70, 228, 131], label: "deciduous" },
  { color: [243, 166, 13], label: "brushwood" },
  { color: [102, 0, 130], label: "vineyard" },
  { color: [85, 255, 0], label: "herbaceous vegetation" },
  { color: [255, 243, 13], label: "agricultural land" },
  { color: [228, 223, 124], label: "plowed land" },
  { color: [61, 230, 235], label: "swimming pool" },
  { color: [255, 255, 255], label: "snow" },
  { color: [138, 179, 160], label: "clear cut" },
  { color: [107, 113, 79], label: "mixed" },
  { color: [197, 220, 66], label: "ligneous" },
  { color: [153, 153, 255], label: "greenhouse" },
  { color: [0, 0, 0], label: "other" }
];
const IMAGES_LIST = [
  "/samples/example0.png",
  "/samples/example1.png",
  "/samples/example2.png",
  "/samples/example3.png",
  "/samples/example4.png",
  "/samples/example5.png"
];
const PRESETS = [
  ["Aerial view, France. High resolution image, 4K, ultra detailed", "Realistic"],
  ["Aerial view, France. Colorful lego bricks", "Lego brick"],
  ["Aerial view, France. Black and white paper pencil drawing", "Pencil"],
  ["Aerial view, France. Oil on canvas painting", "Painting"]
];
const subscriber_queue = [];
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run, invalidate = noop) {
    const subscriber = [run, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function randomSeed() {
  return BigInt(13248873089935215e3 & ((1 << 63) - 1) * Math.random());
}
const drawingLayers = writable(/* @__PURE__ */ new Map());
const resultImage = writable();
const currentCanvas = writable();
const selectedImage = writable();
const selectedBrush = writable();
const selectedParams = writable({
  prompt: PRESETS[0][0],
  seed: randomSeed(),
  steps: 20
});
const generateMap = writable(false);
const saveResult = writable(false);
var TemplateGallery_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => "form.svelte-1gwcbp.svelte-1gwcbp{width:100%;overflow:hidden\n}.samples.svelte-1gwcbp.svelte-1gwcbp{display:flex;scroll-snap-type:x var(--tw-scroll-snap-strictness);--tw-scroll-snap-strictness:mandatory;flex-wrap:nowrap;gap:0.25rem;overflow-x:scroll;-ms-overflow-style:none;scrollbar-width:none\n}.samples.svelte-1gwcbp.svelte-1gwcbp::-webkit-scrollbar{display:none\n}input[type='radio'].svelte-1gwcbp.svelte-1gwcbp{position:absolute;display:none;height:0px;width:0px;opacity:0\n}input[type='radio'].svelte-1gwcbp.svelte-1gwcbp:disabled{opacity:0.5\n}input[type='radio'].svelte-1gwcbp:checked~label.svelte-1gwcbp{outline-style:solid;outline-width:2px;outline-color:#eab308\n}input[type='radio'].svelte-1gwcbp:disabled+label.svelte-1gwcbp{opacity:0.5\n}label.svelte-1gwcbp.svelte-1gwcbp{display:flex;cursor:pointer;outline-width:2px;outline-offset:-2px;outline-color:#eab308;transition-property:all;transition-duration:200ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1)\n}label.svelte-1gwcbp.svelte-1gwcbp:hover{outline-style:solid\n}img.svelte-1gwcbp.svelte-1gwcbp{max-height:6rem;max-width:none\n}")();
const css$5 = {
  code: "form.svelte-1gwcbp.svelte-1gwcbp{width:100%;overflow:hidden\n}.samples.svelte-1gwcbp.svelte-1gwcbp{display:flex;scroll-snap-type:x var(--tw-scroll-snap-strictness);--tw-scroll-snap-strictness:mandatory;flex-wrap:nowrap;gap:0.25rem;overflow-x:scroll;-ms-overflow-style:none;scrollbar-width:none\n}.samples.svelte-1gwcbp.svelte-1gwcbp::-webkit-scrollbar{display:none\n}input[type='radio'].svelte-1gwcbp.svelte-1gwcbp{position:absolute;display:none;height:0px;width:0px;opacity:0\n}input[type='radio'].svelte-1gwcbp.svelte-1gwcbp:disabled{opacity:0.5\n}input[type='radio'].svelte-1gwcbp:checked~label.svelte-1gwcbp{outline-style:solid;outline-width:2px;outline-color:#eab308\n}input[type='radio'].svelte-1gwcbp:disabled+label.svelte-1gwcbp{opacity:0.5\n}label.svelte-1gwcbp.svelte-1gwcbp{display:flex;cursor:pointer;outline-width:2px;outline-offset:-2px;outline-color:#eab308;transition-property:all;transition-duration:200ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1)\n}label.svelte-1gwcbp.svelte-1gwcbp:hover{outline-style:solid\n}img.svelte-1gwcbp.svelte-1gwcbp{max-height:6rem;max-width:none\n}",
  map: null
};
const TemplateGallery = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_selectedImage;
  let $generateMap, $$unsubscribe_generateMap;
  $$unsubscribe_selectedImage = subscribe(selectedImage, (value) => value);
  $$unsubscribe_generateMap = subscribe(generateMap, (value) => $generateMap = value);
  $$result.css.add(css$5);
  $$unsubscribe_selectedImage();
  $$unsubscribe_generateMap();
  return `<div><h4 class="${"font-bold mt-6 mb-2 my-6 leading-6"}">Select a Template</h4>
	<form class="${"svelte-1gwcbp"}"><div class="${"samples  svelte-1gwcbp"}">${each(IMAGES_LIST, (file_name, id) => {
    return `<div class="${"snap-always snap-start"}"><input type="${"radio"}" name="${"samples"}" id="${"sample-" + escape(id)}"${add_attribute("value", id, 0)} ${$generateMap === true ? "disabled" : ""} class="${"svelte-1gwcbp"}">
					<label for="${"sample-" + escape(id)}" class="${"svelte-1gwcbp"}"><img${add_attribute("src", base + file_name, 0)}${add_attribute("alt", file_name, 0)} class="${"svelte-1gwcbp"}"></label>
				</div>`;
  })}</div></form>
</div>`;
});
var BrushSelector_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".colors.svelte-1oy4poo.svelte-1oy4poo{display:grid;max-height:9rem;scroll-snap-type:y var(--tw-scroll-snap-strictness);--tw-scroll-snap-strictness:mandatory;grid-template-columns:repeat(2, minmax(0, 1fr));gap:0.5rem;overflow:scroll\n}@media(min-width: 530px){.colors.svelte-1oy4poo.svelte-1oy4poo{max-height:none;grid-template-columns:repeat(3, minmax(0, 1fr))\n    }}.colors.svelte-1oy4poo span.svelte-1oy4poo{margin-left:0.5rem\n}.colors.svelte-1oy4poo svg.svelte-1oy4poo{display:block\n}input[type='radio'].svelte-1oy4poo.svelte-1oy4poo{position:absolute;display:none;height:0px;width:0px;opacity:0\n}input[type='radio'].svelte-1oy4poo:checked~label.svelte-1oy4poo{outline-style:solid;outline-width:2px;outline-color:#eab308\n}label.svelte-1oy4poo.svelte-1oy4poo{display:flex;cursor:pointer;white-space:nowrap;outline-width:2px;outline-offset:-2px;outline-color:#eab308;transition-property:all;transition-duration:200ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1)\n}label.svelte-1oy4poo.svelte-1oy4poo:hover{outline-style:solid\n}.brush.svelte-1oy4poo.svelte-1oy4poo{display:flex\n}")();
const css$4 = {
  code: ".colors.svelte-1oy4poo.svelte-1oy4poo{display:grid;max-height:9rem;scroll-snap-type:y var(--tw-scroll-snap-strictness);--tw-scroll-snap-strictness:mandatory;grid-template-columns:repeat(2, minmax(0, 1fr));gap:0.5rem;overflow:scroll\n}@media(min-width: 530px){.colors.svelte-1oy4poo.svelte-1oy4poo{max-height:none;grid-template-columns:repeat(3, minmax(0, 1fr))\n    }}.colors.svelte-1oy4poo span.svelte-1oy4poo{margin-left:0.5rem\n}.colors.svelte-1oy4poo svg.svelte-1oy4poo{display:block\n}input[type='radio'].svelte-1oy4poo.svelte-1oy4poo{position:absolute;display:none;height:0px;width:0px;opacity:0\n}input[type='radio'].svelte-1oy4poo:checked~label.svelte-1oy4poo{outline-style:solid;outline-width:2px;outline-color:#eab308\n}label.svelte-1oy4poo.svelte-1oy4poo{display:flex;cursor:pointer;white-space:nowrap;outline-width:2px;outline-offset:-2px;outline-color:#eab308;transition-property:all;transition-duration:200ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1)\n}label.svelte-1oy4poo.svelte-1oy4poo:hover{outline-style:solid\n}.brush.svelte-1oy4poo.svelte-1oy4poo{display:flex\n}",
  map: null
};
const STARTCOLORID = 6;
const BrushSelector = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $selectedBrush, $$unsubscribe_selectedBrush;
  $$unsubscribe_selectedBrush = subscribe(selectedBrush, (value) => $selectedBrush = value);
  const { color, label } = COLOR_LIST[STARTCOLORID];
  let brushColor = `rgb(${color.join(",")})`;
  let brushSize = 40;
  set_store_value(selectedBrush, $selectedBrush = {
    color: brushColor,
    size: brushSize,
    label
  }, $selectedBrush);
  $$result.css.add(css$4);
  $$unsubscribe_selectedBrush();
  return `<form><h4 class="${"font-bold mt-6 mb-2 leading-6 my-3"}">Brush Type</h4>
	<div class="${"colors svelte-1oy4poo"}" name="${"colors"}">${each(COLOR_LIST, (color2, id) => {
    return `<div class="${"snap-always snap-start"}"><input name="${"color"}" ${id == STARTCOLORID ? "checked" : ""} type="${"radio"}" id="${"color-" + escape(id)}"${add_attribute("value", id, 0)} class="${"svelte-1oy4poo"}">
				<label for="${"color-" + escape(id)}" class="${"svelte-1oy4poo"}"><svg width="${"20"}" height="${"20"}" viewBox="${"0 0 20 20"}" class="${"svelte-1oy4poo"}"><rect x="${"0"}" y="${"0"}" width="${"20"}" height="${"20"}" fill="${"rgb(" + escape(color2.color.join(",")) + ")"}"></rect></svg>
					<span class="${"svelte-1oy4poo"}">${escape(color2.label)}</span></label>
			</div>`;
  })}</div>
	<h4 class="${"font-bold mt-6 mb-2 my-6 leading-6"}">Brush Size</h4>
	<div class="${"brush svelte-1oy4poo"}"><input value="${"10"}" min="${"1"}" max="${"150"}" step="${"1"}" name="${"brush"}" type="${"range"}">
		<label class="${"pl-2 svelte-1oy4poo"}" for="${"brush"}">${escape($selectedBrush.size)}</label></div>
</form>`;
});
var ParamsSelector_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => "@media(min-width: 530px){}select.svelte-uoay71.svelte-uoay71,button.svelte-uoay71.svelte-uoay71,input.svelte-uoay71.svelte-uoay71{border-radius:0.5rem;border-width:1px;--tw-border-opacity:1;border-color:rgb(209 213 219 / var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(249 250 251 / var(--tw-bg-opacity));padding:0.25rem;font-size:0.875rem;line-height:1.25rem;--tw-text-opacity:1;color:rgb(17 24 39 / var(--tw-text-opacity))\n}select.svelte-uoay71.svelte-uoay71:focus,button.svelte-uoay71.svelte-uoay71:focus,input.svelte-uoay71.svelte-uoay71:focus{--tw-border-opacity:1;border-color:rgb(59 130 246 / var(--tw-border-opacity));--tw-ring-opacity:1;--tw-ring-color:rgb(59 130 246 / var(--tw-ring-opacity))\n}select.svelte-uoay71.svelte-uoay71:disabled,button.svelte-uoay71.svelte-uoay71:disabled,input.svelte-uoay71.svelte-uoay71:disabled{opacity:0.5\n}@media(prefers-color-scheme: dark){select.svelte-uoay71.svelte-uoay71,button.svelte-uoay71.svelte-uoay71,input.svelte-uoay71.svelte-uoay71{--tw-border-opacity:1;border-color:rgb(75 85 99 / var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(55 65 81 / var(--tw-bg-opacity));--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))\n    }select.svelte-uoay71.svelte-uoay71::-moz-placeholder,button.svelte-uoay71.svelte-uoay71::-moz-placeholder,input.svelte-uoay71.svelte-uoay71::-moz-placeholder{--tw-placeholder-opacity:1;color:rgb(156 163 175 / var(--tw-placeholder-opacity))\n    }select.svelte-uoay71.svelte-uoay71::-moz-placeholder, button.svelte-uoay71.svelte-uoay71::-moz-placeholder, input.svelte-uoay71.svelte-uoay71::-moz-placeholder{--tw-placeholder-opacity:1;color:rgb(156 163 175 / var(--tw-placeholder-opacity))\n    }select.svelte-uoay71.svelte-uoay71::placeholder,button.svelte-uoay71.svelte-uoay71::placeholder,input.svelte-uoay71.svelte-uoay71::placeholder{--tw-placeholder-opacity:1;color:rgb(156 163 175 / var(--tw-placeholder-opacity))\n    }select.svelte-uoay71.svelte-uoay71:focus,button.svelte-uoay71.svelte-uoay71:focus,input.svelte-uoay71.svelte-uoay71:focus{--tw-border-opacity:1;border-color:rgb(59 130 246 / var(--tw-border-opacity));--tw-ring-opacity:1;--tw-ring-color:rgb(59 130 246 / var(--tw-ring-opacity))\n    }}input.svelte-uoay71:disabled+label.svelte-uoay71{opacity:0.5\n}input.svelte-uoay71.svelte-uoay71{padding-left:0.75rem\n}")();
const css$3 = {
  code: "@media(min-width: 530px){}select.svelte-uoay71.svelte-uoay71,button.svelte-uoay71.svelte-uoay71,input.svelte-uoay71.svelte-uoay71{border-radius:0.5rem;border-width:1px;--tw-border-opacity:1;border-color:rgb(209 213 219 / var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(249 250 251 / var(--tw-bg-opacity));padding:0.25rem;font-size:0.875rem;line-height:1.25rem;--tw-text-opacity:1;color:rgb(17 24 39 / var(--tw-text-opacity))\n}select.svelte-uoay71.svelte-uoay71:focus,button.svelte-uoay71.svelte-uoay71:focus,input.svelte-uoay71.svelte-uoay71:focus{--tw-border-opacity:1;border-color:rgb(59 130 246 / var(--tw-border-opacity));--tw-ring-opacity:1;--tw-ring-color:rgb(59 130 246 / var(--tw-ring-opacity))\n}select.svelte-uoay71.svelte-uoay71:disabled,button.svelte-uoay71.svelte-uoay71:disabled,input.svelte-uoay71.svelte-uoay71:disabled{opacity:0.5\n}@media(prefers-color-scheme: dark){select.svelte-uoay71.svelte-uoay71,button.svelte-uoay71.svelte-uoay71,input.svelte-uoay71.svelte-uoay71{--tw-border-opacity:1;border-color:rgb(75 85 99 / var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(55 65 81 / var(--tw-bg-opacity));--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))\n    }select.svelte-uoay71.svelte-uoay71::-moz-placeholder,button.svelte-uoay71.svelte-uoay71::-moz-placeholder,input.svelte-uoay71.svelte-uoay71::-moz-placeholder{--tw-placeholder-opacity:1;color:rgb(156 163 175 / var(--tw-placeholder-opacity))\n    }select.svelte-uoay71.svelte-uoay71::placeholder,button.svelte-uoay71.svelte-uoay71::placeholder,input.svelte-uoay71.svelte-uoay71::placeholder{--tw-placeholder-opacity:1;color:rgb(156 163 175 / var(--tw-placeholder-opacity))\n    }select.svelte-uoay71.svelte-uoay71:focus,button.svelte-uoay71.svelte-uoay71:focus,input.svelte-uoay71.svelte-uoay71:focus{--tw-border-opacity:1;border-color:rgb(59 130 246 / var(--tw-border-opacity));--tw-ring-opacity:1;--tw-ring-color:rgb(59 130 246 / var(--tw-ring-opacity))\n    }}input.svelte-uoay71:disabled+label.svelte-uoay71{opacity:0.5\n}input.svelte-uoay71.svelte-uoay71{padding-left:0.75rem\n}",
  map: null
};
const ParamsSelector = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $selectedParams, $$unsubscribe_selectedParams;
  let $generateMap, $$unsubscribe_generateMap;
  $$unsubscribe_selectedParams = subscribe(selectedParams, (value) => $selectedParams = value);
  $$unsubscribe_generateMap = subscribe(generateMap, (value) => $generateMap = value);
  let form;
  let seed = $selectedParams.seed;
  let sampleSteps = $selectedParams.steps;
  let prompt = $selectedParams.prompt;
  $$result.css.add(css$3);
  $$unsubscribe_selectedParams();
  $$unsubscribe_generateMap();
  return `<form${add_attribute("this", form, 0)}><h4 class="${"font-bold mt-6 mb-2 my-6 leading-6"}">Prompt</h4>
	<input name="${"prompt"}" placeholder="${"Aerial view of ..., France."}" ${$generateMap === true ? "disabled" : ""} style="${"width: 500px;"}" class="${"svelte-uoay71"}"${add_attribute("value", prompt, 0)}>
	<select name="${"presets"}" ${$generateMap === true ? "disabled" : ""} class="${"svelte-uoay71"}"><option disabled selected value="${"preset"}">preset</option>${each(PRESETS, (preset) => {
    return `<option${add_attribute("value", preset[0], 0)}>${escape(preset[1])}</option>\``;
  })}</select>

	<h4 class="${"font-bold mt-6 mb-2 my-6 leading-6"}">Random Seed</h4>
	<input type="${"Number"}" name="${"seed"}" placeholder="${"Integer Seed"}" ${$generateMap === true ? "disabled" : ""} class="${"svelte-uoay71"}"${add_attribute("value", seed, 0)}>
	<button ${$generateMap === true ? "disabled" : ""} class="${"svelte-uoay71"}">Random
	</button>
	<h4 class="${"font-bold mt-6 mb-2 my-6 leading-6"}">Sample Steps</h4>
	<div class="${"flex"}"><input type="${"range"}" name="${"steps"}" min="${"10"}" max="${"30"}" step="${"1"}" ${$generateMap === true ? "disabled" : ""} class="${"svelte-uoay71"}"${add_attribute("value", sampleSteps, 0)}>
		<label class="${"pl-2 svelte-uoay71"}" for="${"steps"}">${escape(sampleSteps)}</label></div>
</form>`;
});
const Undo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { classNames = "" } = $$props;
  if ($$props.classNames === void 0 && $$bindings.classNames && classNames !== void 0)
    $$bindings.classNames(classNames);
  return `<svg xmlns="${"http://www.w3.org/2000/svg"}" width="${"20"}" viewBox="${"0 0 512 512"}"${add_attribute("class", classNames, 0)}><path fill="${"white"}" stroke="${"black"}" stroke-width="${"30"}" d="${"M480 256c0 123.4-100.5 223.9-223.9 223.9c-48.84 0-95.17-15.58-134.2-44.86c-14.12-10.59-16.97-30.66-6.375-44.81c10.59-14.12 30.62-16.94 44.81-6.375c27.84 20.91 61 31.94 95.88 31.94C344.3 415.8 416 344.1 416 256s-71.69-159.8-159.8-159.8c-37.46 0-73.09 13.49-101.3 36.64l45.12 45.14c17.01 17.02 4.955 46.1-19.1 46.1H35.17C24.58 224.1 16 215.5 16 204.9V59.04c0-24.04 29.07-36.08 46.07-19.07l47.6 47.63C149.9 52.71 201.5 32.11 256.1 32.11C379.5 32.11 480 132.6 480 256z"}"></path></svg>`;
});
var DrawingCanvas_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".canvas.svelte-pr47cz{z-index:0;aspect-ratio:512/512;width:100%;max-width:100%;border-width:1px;--tw-border-opacity:1;border-color:rgb(107 114 128 / var(--tw-border-opacity))\n}@media(prefers-color-scheme: dark){.canvas.svelte-pr47cz{--tw-border-opacity:1;border-color:rgb(209 213 219 / var(--tw-border-opacity))\n		}}.brush.svelte-pr47cz{pointer-events:none;position:absolute;z-index:10;--tw-translate-x:-50%;--tw-translate-y:-50%;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))\n}.label.svelte-pr47cz{pointer-events:none;position:absolute;top:0px;left:0px;z-index:20;-webkit-user-select:none;-moz-user-select:none;user-select:none;padding-left:0.5rem;padding-right:0.5rem;font-size:1rem;line-height:1.5rem;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));color:white;font-weight:bolder;-webkit-text-stroke:1px black;-webkit-text-fill-color:white\n}")();
const css$2 = {
  code: ".canvas.svelte-pr47cz{z-index:0;aspect-ratio:512/512;width:100%;max-width:100%;border-width:1px;--tw-border-opacity:1;border-color:rgb(107 114 128 / var(--tw-border-opacity))\n}@media(prefers-color-scheme: dark){.canvas.svelte-pr47cz{--tw-border-opacity:1;border-color:rgb(209 213 219 / var(--tw-border-opacity))\n		}}.brush.svelte-pr47cz{pointer-events:none;position:absolute;z-index:10;--tw-translate-x:-50%;--tw-translate-y:-50%;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))\n}.label.svelte-pr47cz{pointer-events:none;position:absolute;top:0px;left:0px;z-index:20;-webkit-user-select:none;-moz-user-select:none;user-select:none;padding-left:0.5rem;padding-right:0.5rem;font-size:1rem;line-height:1.5rem;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));color:white;font-weight:bolder;-webkit-text-stroke:1px black;-webkit-text-fill-color:white\n}",
  map: null
};
function drawImage(ctx, img) {
  ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
}
const DrawingCanvas = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $drawingLayers, $$unsubscribe_drawingLayers;
  let $selectedImage, $$unsubscribe_selectedImage;
  let $selectedBrush, $$unsubscribe_selectedBrush;
  let $$unsubscribe_currentCanvas;
  $$unsubscribe_drawingLayers = subscribe(drawingLayers, (value) => $drawingLayers = value);
  $$unsubscribe_selectedImage = subscribe(selectedImage, (value) => $selectedImage = value);
  $$unsubscribe_selectedBrush = subscribe(selectedBrush, (value) => $selectedBrush = value);
  $$unsubscribe_currentCanvas = subscribe(currentCanvas, (value) => value);
  let canvas;
  let brush;
  let ctx;
  $$result.css.add(css$2);
  {
    {
      if ($selectedImage) {
        drawImage(ctx, $selectedImage);
        set_store_value(drawingLayers, $drawingLayers = /* @__PURE__ */ new Map(), $drawingLayers);
      }
    }
  }
  $$unsubscribe_drawingLayers();
  $$unsubscribe_selectedImage();
  $$unsubscribe_selectedBrush();
  $$unsubscribe_currentCanvas();
  return `<div><div class="${"relative overflow-clip"}"><canvas class="${"canvas svelte-pr47cz"}" width="${"512"}" height="${"512"}"${add_attribute("this", canvas, 0)}></canvas>
		<canvas class="${"brush svelte-pr47cz"}" width="${"10"}" height="${"10"}"${add_attribute("this", brush, 0)}></canvas>
		<span class="${"label svelte-pr47cz"}">${escape($selectedBrush == null ? void 0 : $selectedBrush.label)}</span>
		<button class="${"absolute bottom-0 left-0 p-3"}" ${$drawingLayers.size <= 0 ? "disabled" : ""}>${validate_component(Undo, "UndoIcon").$$render($$result, {}, {}, {})}</button></div>
</div>`;
});
var ResultCanvas_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".image.svelte-1t0h0rs{z-index:0;box-sizing:border-box;aspect-ratio:512/512;border-width:1px;--tw-border-opacity:1;border-color:rgb(107 114 128 / var(--tw-border-opacity))\n}@media(prefers-color-scheme: dark){.image.svelte-1t0h0rs{--tw-border-opacity:1;border-color:rgb(209 213 219 / var(--tw-border-opacity))\n    }}.loading.svelte-1t0h0rs{position:absolute;top:0px;left:0px;right:0px;bottom:0px;display:flex;flex-direction:column;align-items:center;justify-content:center\n}")();
const css$1 = {
  code: ".image.svelte-1t0h0rs{z-index:0;box-sizing:border-box;aspect-ratio:512/512;border-width:1px;--tw-border-opacity:1;border-color:rgb(107 114 128 / var(--tw-border-opacity))\n}@media(prefers-color-scheme: dark){.image.svelte-1t0h0rs{--tw-border-opacity:1;border-color:rgb(209 213 219 / var(--tw-border-opacity))\n    }}.loading.svelte-1t0h0rs{position:absolute;top:0px;left:0px;right:0px;bottom:0px;display:flex;flex-direction:column;align-items:center;justify-content:center\n}",
  map: null
};
let predictStatus = "";
async function saveImage(base64Image) {
  return new Promise((resolve, reject) => {
    try {
      const a = document.createElement("a");
      a.download = `sucess-${Date.now()}.png`;
      a.target = "_self";
      a.onclick = async (e) => {
        if (a.href) {
          URL.revokeObjectURL(a.href);
        }
        a.href = base64Image;
      };
      requestAnimationFrame(() => {
        console.log("Downloading image.");
        a.click();
        resolve(null);
      });
    } catch (err) {
      reject();
    }
  });
}
async function predict(base64Image, { prompt, steps, seed }) {
  const response = await fetch("/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: [base64Image, prompt, steps, seed.toString()]
    })
  });
  if (!response.ok) {
    throw new Error("Prediction request failed.");
  }
  const result = await response.text();
  return result;
}
const ResultCanvas = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $saveResult, $$unsubscribe_saveResult;
  let $resultImage, $$unsubscribe_resultImage;
  let $generateMap, $$unsubscribe_generateMap;
  let $selectedParams, $$unsubscribe_selectedParams;
  let $currentCanvas, $$unsubscribe_currentCanvas;
  $$unsubscribe_saveResult = subscribe(saveResult, (value) => $saveResult = value);
  $$unsubscribe_resultImage = subscribe(resultImage, (value) => $resultImage = value);
  $$unsubscribe_generateMap = subscribe(generateMap, (value) => $generateMap = value);
  $$unsubscribe_selectedParams = subscribe(selectedParams, (value) => $selectedParams = value);
  $$unsubscribe_currentCanvas = subscribe(currentCanvas, (value) => $currentCanvas = value);
  $$result.css.add(css$1);
  {
    (async () => {
      if ($generateMap) {
        const results = await predict($currentCanvas.toDataURL(), $selectedParams);
        set_store_value(resultImage, $resultImage = results, $resultImage);
        set_store_value(generateMap, $generateMap = false, $generateMap);
      }
    })();
  }
  {
    (async () => {
      if ($saveResult) {
        await saveImage($resultImage);
        set_store_value(saveResult, $saveResult = false, $saveResult);
      }
    })();
  }
  $$unsubscribe_saveResult();
  $$unsubscribe_resultImage();
  $$unsubscribe_generateMap();
  $$unsubscribe_selectedParams();
  $$unsubscribe_currentCanvas();
  return `<div class="${"relative overflow-clip flex flex-col justify-center items-center w-full h-full"}">${$resultImage ? `<img class="${"image " + escape($generateMap ? "opacity-30" : "") + " svelte-1t0h0rs"}" alt="${"Generative Map Result"}"${add_attribute("src", $resultImage, 0)} width="${"512"}" height="${"512"}">` : ``}
	${$generateMap ? `<div class="${"loading svelte-1t0h0rs"}"><svg xmlns="${"http://www.w3.org/2000/svg"}" fill="${"none"}" viewBox="${"0 0 24 24"}" class="${"animate-spin max-w-[3rem]"}"><path fill="${"currentColor"}" d="${"M20 12a8 8 0 0 1-8 8v4a12 12 0 0 0 12-12h-4Zm-2-5.3a8 8 0 0 1 2 5.3h4c0-3-1.1-5.8-3-8l-3 2.7Z"}"></path></svg>
			<span class="${"text-xs"}">${escape(predictStatus)}</span></div>` : ``}</div>

`;
});
var index_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".drawings.svelte-237ry5{display:grid;grid-template-columns:2fr 1.5fr;place-items:center\n}@media(min-width: 530px){.drawings.svelte-237ry5{grid-template-columns:repeat(2, minmax(0, 1fr))\n    }}button.svelte-237ry5{border-radius:0.5rem;border-width:1px;--tw-border-opacity:1;border-color:rgb(209 213 219 / var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(249 250 251 / var(--tw-bg-opacity));padding:0.25rem;font-size:0.875rem;line-height:1.25rem;--tw-text-opacity:1;color:rgb(17 24 39 / var(--tw-text-opacity))\n}button.svelte-237ry5:focus{--tw-border-opacity:1;border-color:rgb(59 130 246 / var(--tw-border-opacity));--tw-ring-opacity:1;--tw-ring-color:rgb(59 130 246 / var(--tw-ring-opacity))\n}button.svelte-237ry5:disabled{opacity:0.5\n}@media(prefers-color-scheme: dark){button.svelte-237ry5{--tw-border-opacity:1;border-color:rgb(75 85 99 / var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(55 65 81 / var(--tw-bg-opacity));--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))\n    }button.svelte-237ry5::-moz-placeholder{--tw-placeholder-opacity:1;color:rgb(156 163 175 / var(--tw-placeholder-opacity))\n    }button.svelte-237ry5::placeholder{--tw-placeholder-opacity:1;color:rgb(156 163 175 / var(--tw-placeholder-opacity))\n    }button.svelte-237ry5:focus{--tw-border-opacity:1;border-color:rgb(59 130 246 / var(--tw-border-opacity));--tw-ring-opacity:1;--tw-ring-color:rgb(59 130 246 / var(--tw-ring-opacity))\n    }}")();
const css = {
  code: ".drawings.svelte-237ry5{display:grid;grid-template-columns:2fr 1.5fr;place-items:center\n}@media(min-width: 530px){.drawings.svelte-237ry5{grid-template-columns:repeat(2, minmax(0, 1fr))\n    }}button.svelte-237ry5{border-radius:0.5rem;border-width:1px;--tw-border-opacity:1;border-color:rgb(209 213 219 / var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(249 250 251 / var(--tw-bg-opacity));padding:0.25rem;font-size:0.875rem;line-height:1.25rem;--tw-text-opacity:1;color:rgb(17 24 39 / var(--tw-text-opacity))\n}button.svelte-237ry5:focus{--tw-border-opacity:1;border-color:rgb(59 130 246 / var(--tw-border-opacity));--tw-ring-opacity:1;--tw-ring-color:rgb(59 130 246 / var(--tw-ring-opacity))\n}button.svelte-237ry5:disabled{opacity:0.5\n}@media(prefers-color-scheme: dark){button.svelte-237ry5{--tw-border-opacity:1;border-color:rgb(75 85 99 / var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(55 65 81 / var(--tw-bg-opacity));--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))\n    }button.svelte-237ry5::-moz-placeholder{--tw-placeholder-opacity:1;color:rgb(156 163 175 / var(--tw-placeholder-opacity))\n    }button.svelte-237ry5::placeholder{--tw-placeholder-opacity:1;color:rgb(156 163 175 / var(--tw-placeholder-opacity))\n    }button.svelte-237ry5:focus{--tw-border-opacity:1;border-color:rgb(59 130 246 / var(--tw-border-opacity));--tw-ring-opacity:1;--tw-ring-color:rgb(59 130 246 / var(--tw-ring-opacity))\n    }}",
  map: null
};
const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $generateMap, $$unsubscribe_generateMap;
  let $saveResult, $$unsubscribe_saveResult;
  let $resultImage, $$unsubscribe_resultImage;
  $$unsubscribe_generateMap = subscribe(generateMap, (value) => $generateMap = value);
  $$unsubscribe_saveResult = subscribe(saveResult, (value) => $saveResult = value);
  $$unsubscribe_resultImage = subscribe(resultImage, (value) => $resultImage = value);
  $$result.css.add(css);
  $$unsubscribe_generateMap();
  $$unsubscribe_saveResult();
  $$unsubscribe_resultImage();
  return `<div class="${"max-w-screen-md mx-auto px-3 py-5 relative z-0"}"><article class="${"prose dark:prose-invert"}"><h1>Drawing to Map</h1></article>
	${validate_component(BrushSelector, "BrushSelector").$$render($$result, {}, {}, {})}
	<div class="${"drawings py-3 -mx-3 svelte-237ry5"}">${validate_component(DrawingCanvas, "DrawingCanvas").$$render($$result, {}, {}, {})}
		${validate_component(ResultCanvas, "ResultCanvas").$$render($$result, {}, {}, {})}</div>

	<button ${$generateMap === true ? "disabled" : ""} class="${"svelte-237ry5"}">Generate Map
	</button>

	<button ${$saveResult === true || !$resultImage ? "disabled" : ""} class="${"svelte-237ry5"}">Save Result
	</button>

	${validate_component(TemplateGallery, "TemplateGallery").$$render($$result, {}, {}, {})}

	${validate_component(ParamsSelector, "ParamSelector").$$render($$result, {}, {}, {})}
</div>`;
});
export { Routes as default };
