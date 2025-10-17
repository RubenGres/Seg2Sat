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
  { color: [107, 113, 79], label: "mixed" }
];
const API = "https://zqz606ggn85ysase.us-east-1.aws.endpoints.huggingface.cloud";
const IMAGES_LIST = [
  "/samples/default.jpg",
  "/samples/example0.png",
  "/samples/example1.png",
  "/samples/example2.png",
  "/samples/example3.png",
  "/samples/example4.png",
  "/samples/example5.png",
  "/samples/example6.jpg"
];
const PRESETS = [
  ["High resolution satellite image, 4K, ultra detailed", "Realistic"],
  ["Colorful lego bricks", "Lego brick"],
  ["Black and white paper pencil drawing", "Pencil"],
  ["Oil on canvas painting", "Painting"]
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
  prompt: "Aerial view of rue des Lilas, Toulouse, Haute-Garonne, France",
  modifier: PRESETS[0][0],
  seed: randomSeed(),
  steps: 20
});
const generateMap = writable(false);
const saveResult = writable(false);
var TemplateGallery_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => "form.svelte-8h270x.svelte-8h270x{width:100%;overflow:hidden\n}.samples.svelte-8h270x.svelte-8h270x{display:flex;scroll-snap-type:x var(--tw-scroll-snap-strictness);--tw-scroll-snap-strictness:mandatory;flex-wrap:nowrap;gap:0.25rem;overflow-x:scroll;-ms-overflow-style:none;scrollbar-width:none\n}.samples.svelte-8h270x.svelte-8h270x::-webkit-scrollbar{display:none\n}input[type='radio'].svelte-8h270x.svelte-8h270x{position:absolute;display:none;height:0px;width:0px;opacity:0\n}input[type='radio'].svelte-8h270x.svelte-8h270x:disabled{opacity:0.5\n}input[type='radio'].svelte-8h270x:checked~label.svelte-8h270x{outline-style:solid;outline-width:2px;outline-color:#eab308\n}input[type='radio'].svelte-8h270x:disabled+label.svelte-8h270x{opacity:0.5\n}label.svelte-8h270x.svelte-8h270x{display:flex;cursor:pointer;outline-width:2px;outline-offset:-2px;outline-color:#eab308;transition-property:all;transition-duration:200ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1)\n}label.svelte-8h270x.svelte-8h270x:hover{outline-style:solid\n}img.svelte-8h270x.svelte-8h270x{max-height:6rem;max-width:none\n}.upload-label.svelte-8h270x.svelte-8h270x{display:block;width:100%;cursor:pointer;border-radius:0.5rem;border-width:2px;border-style:dashed;--tw-border-opacity:1;border-color:rgb(234 179 8 / var(--tw-border-opacity));padding-left:1rem;padding-right:1rem;padding-top:0.75rem;padding-bottom:0.75rem;text-align:center;transition-property:all;transition-duration:200ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1)\n}.upload-label.svelte-8h270x.svelte-8h270x:hover{--tw-border-opacity:1;border-color:rgb(202 138 4 / var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(254 252 232 / var(--tw-bg-opacity))\n}.upload-label.svelte-8h270x.svelte-8h270x:has(.file-input:disabled){cursor:not-allowed;opacity:0.5\n}.upload-label.svelte-8h270x.svelte-8h270x:has(.file-input:disabled):hover{background-color:transparent\n}.upload-text.svelte-8h270x.svelte-8h270x{font-size:0.875rem;line-height:1.25rem;font-weight:500;--tw-text-opacity:1;color:rgb(55 65 81 / var(--tw-text-opacity))\n}.file-input.svelte-8h270x.svelte-8h270x{display:none\n}")();
const css$5 = {
  code: "form.svelte-8h270x.svelte-8h270x{width:100%;overflow:hidden\n}.samples.svelte-8h270x.svelte-8h270x{display:flex;scroll-snap-type:x var(--tw-scroll-snap-strictness);--tw-scroll-snap-strictness:mandatory;flex-wrap:nowrap;gap:0.25rem;overflow-x:scroll;-ms-overflow-style:none;scrollbar-width:none\n}.samples.svelte-8h270x.svelte-8h270x::-webkit-scrollbar{display:none\n}input[type='radio'].svelte-8h270x.svelte-8h270x{position:absolute;display:none;height:0px;width:0px;opacity:0\n}input[type='radio'].svelte-8h270x.svelte-8h270x:disabled{opacity:0.5\n}input[type='radio'].svelte-8h270x:checked~label.svelte-8h270x{outline-style:solid;outline-width:2px;outline-color:#eab308\n}input[type='radio'].svelte-8h270x:disabled+label.svelte-8h270x{opacity:0.5\n}label.svelte-8h270x.svelte-8h270x{display:flex;cursor:pointer;outline-width:2px;outline-offset:-2px;outline-color:#eab308;transition-property:all;transition-duration:200ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1)\n}label.svelte-8h270x.svelte-8h270x:hover{outline-style:solid\n}img.svelte-8h270x.svelte-8h270x{max-height:6rem;max-width:none\n}.upload-label.svelte-8h270x.svelte-8h270x{display:block;width:100%;cursor:pointer;border-radius:0.5rem;border-width:2px;border-style:dashed;--tw-border-opacity:1;border-color:rgb(234 179 8 / var(--tw-border-opacity));padding-left:1rem;padding-right:1rem;padding-top:0.75rem;padding-bottom:0.75rem;text-align:center;transition-property:all;transition-duration:200ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1)\n}.upload-label.svelte-8h270x.svelte-8h270x:hover{--tw-border-opacity:1;border-color:rgb(202 138 4 / var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(254 252 232 / var(--tw-bg-opacity))\n}.upload-label.svelte-8h270x.svelte-8h270x:has(.file-input:disabled){cursor:not-allowed;opacity:0.5\n}.upload-label.svelte-8h270x.svelte-8h270x:has(.file-input:disabled):hover{background-color:transparent\n}.upload-text.svelte-8h270x.svelte-8h270x{font-size:0.875rem;line-height:1.25rem;font-weight:500;--tw-text-opacity:1;color:rgb(55 65 81 / var(--tw-text-opacity))\n}.file-input.svelte-8h270x.svelte-8h270x{display:none\n}",
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
	
	
	<div class="${"mb-4"}"><label for="${"image-upload"}" class="${"upload-label svelte-8h270x"}"><span class="${"upload-text svelte-8h270x"}">Upload Your Own Image</span>
			<input id="${"image-upload"}" type="${"file"}" accept="${"image/*"}" ${$generateMap === true ? "disabled" : ""} class="${"file-input svelte-8h270x"}"></label></div>

	<form class="${"svelte-8h270x"}"><div class="${"samples svelte-8h270x"}">${each(IMAGES_LIST, (file_name, id) => {
    return `<div class="${"snap-always snap-start"}"><input type="${"radio"}" name="${"samples"}" id="${"sample-" + escape(id)}"${add_attribute("value", id, 0)} ${$generateMap === true ? "disabled" : ""} class="${"svelte-8h270x"}">
					<label for="${"sample-" + escape(id)}" class="${"svelte-8h270x"}"><img${add_attribute("src", base + file_name, 0)}${add_attribute("alt", file_name, 0)} class="${"svelte-8h270x"}"></label>
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
var ParamsSelector_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => "@media(min-width: 530px){}select.svelte-7to72y.svelte-7to72y,button.svelte-7to72y.svelte-7to72y,input.svelte-7to72y.svelte-7to72y{border-radius:0.5rem;border-width:1px;--tw-border-opacity:1;border-color:rgb(209 213 219 / var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(249 250 251 / var(--tw-bg-opacity));padding:0.25rem;font-size:0.875rem;line-height:1.25rem;--tw-text-opacity:1;color:rgb(17 24 39 / var(--tw-text-opacity))\n}select.svelte-7to72y.svelte-7to72y:focus,button.svelte-7to72y.svelte-7to72y:focus,input.svelte-7to72y.svelte-7to72y:focus{--tw-border-opacity:1;border-color:rgb(59 130 246 / var(--tw-border-opacity));--tw-ring-opacity:1;--tw-ring-color:rgb(59 130 246 / var(--tw-ring-opacity))\n}select.svelte-7to72y.svelte-7to72y:disabled,button.svelte-7to72y.svelte-7to72y:disabled,input.svelte-7to72y.svelte-7to72y:disabled{opacity:0.5\n}@media(prefers-color-scheme: dark){select.svelte-7to72y.svelte-7to72y,button.svelte-7to72y.svelte-7to72y,input.svelte-7to72y.svelte-7to72y{--tw-border-opacity:1;border-color:rgb(209 213 219 / var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(249 250 251 / var(--tw-bg-opacity))\n    }select.svelte-7to72y.svelte-7to72y:focus,button.svelte-7to72y.svelte-7to72y:focus,input.svelte-7to72y.svelte-7to72y:focus{--tw-border-opacity:1;border-color:rgb(59 130 246 / var(--tw-border-opacity));--tw-ring-opacity:1;--tw-ring-color:rgb(59 130 246 / var(--tw-ring-opacity))\n    }}input.svelte-7to72y:disabled+label.svelte-7to72y{opacity:0.5\n}input.svelte-7to72y.svelte-7to72y{padding-left:0.75rem\n}")();
const css$3 = {
  code: "@media(min-width: 530px){}select.svelte-7to72y.svelte-7to72y,button.svelte-7to72y.svelte-7to72y,input.svelte-7to72y.svelte-7to72y{border-radius:0.5rem;border-width:1px;--tw-border-opacity:1;border-color:rgb(209 213 219 / var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(249 250 251 / var(--tw-bg-opacity));padding:0.25rem;font-size:0.875rem;line-height:1.25rem;--tw-text-opacity:1;color:rgb(17 24 39 / var(--tw-text-opacity))\n}select.svelte-7to72y.svelte-7to72y:focus,button.svelte-7to72y.svelte-7to72y:focus,input.svelte-7to72y.svelte-7to72y:focus{--tw-border-opacity:1;border-color:rgb(59 130 246 / var(--tw-border-opacity));--tw-ring-opacity:1;--tw-ring-color:rgb(59 130 246 / var(--tw-ring-opacity))\n}select.svelte-7to72y.svelte-7to72y:disabled,button.svelte-7to72y.svelte-7to72y:disabled,input.svelte-7to72y.svelte-7to72y:disabled{opacity:0.5\n}@media(prefers-color-scheme: dark){select.svelte-7to72y.svelte-7to72y,button.svelte-7to72y.svelte-7to72y,input.svelte-7to72y.svelte-7to72y{--tw-border-opacity:1;border-color:rgb(209 213 219 / var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(249 250 251 / var(--tw-bg-opacity))\n    }select.svelte-7to72y.svelte-7to72y:focus,button.svelte-7to72y.svelte-7to72y:focus,input.svelte-7to72y.svelte-7to72y:focus{--tw-border-opacity:1;border-color:rgb(59 130 246 / var(--tw-border-opacity));--tw-ring-opacity:1;--tw-ring-color:rgb(59 130 246 / var(--tw-ring-opacity))\n    }}input.svelte-7to72y:disabled+label.svelte-7to72y{opacity:0.5\n}input.svelte-7to72y.svelte-7to72y{padding-left:0.75rem\n}",
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
  let modifier = $selectedParams.modifier;
  $$result.css.add(css$3);
  $$unsubscribe_selectedParams();
  $$unsubscribe_generateMap();
  return `<form${add_attribute("this", form, 0)}><h4 class="${"font-bold mt-6 mb-2 my-6 leading-6"}">Prompt</h4>
	<input name="${"prompt"}" placeholder="${"Aerial view of ..., France."}" ${$generateMap === true ? "disabled" : ""} style="${"width: 500px;"}" class="${"svelte-7to72y"}"${add_attribute("value", prompt, 0)}>

	<h4 class="${"font-bold mt-6 mb-2 my-6 leading-6"}">Modifier</h4>
	<input name="${"modifier"}" placeholder="${"High resolution satellite image"}" ${$generateMap === true ? "disabled" : ""} style="${"width: 500px;"}" class="${"svelte-7to72y"}"${add_attribute("value", modifier, 0)}>
	<select name="${"presets"}" ${$generateMap === true ? "disabled" : ""} class="${"svelte-7to72y"}"><option disabled selected value="${"preset"}">preset</option>${each(PRESETS, (preset) => {
    return `<option${add_attribute("value", preset[0], 0)}>${escape(preset[1])}</option>\``;
  })}</select>

	<h4 class="${"font-bold mt-6 mb-2 my-6 leading-6"}">Random Seed</h4>
	<input type="${"Number"}" name="${"seed"}" placeholder="${"Integer Seed"}" ${$generateMap === true ? "disabled" : ""} class="${"svelte-7to72y"}"${add_attribute("value", seed, 0)}>
	<button ${$generateMap === true ? "disabled" : ""} class="${"svelte-7to72y"}">Random
	</button>
	<h4 class="${"font-bold mt-6 mb-2 my-6 leading-6"}">Sample Steps</h4>
	<div class="${"flex"}"><input type="${"range"}" name="${"steps"}" min="${"10"}" max="${"30"}" step="${"1"}" ${$generateMap === true ? "disabled" : ""} class="${"svelte-7to72y"}"${add_attribute("value", sampleSteps, 0)}>
		<label class="${"pl-2 svelte-7to72y"}" for="${"steps"}">${escape(sampleSteps)}</label></div>
</form>`;
});
const Undo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { classNames = "" } = $$props;
  if ($$props.classNames === void 0 && $$bindings.classNames && classNames !== void 0)
    $$bindings.classNames(classNames);
  return `<svg xmlns="${"http://www.w3.org/2000/svg"}" width="${"20"}" viewBox="${"0 0 512 512"}"${add_attribute("class", classNames, 0)}><path fill="${"white"}" stroke="${"black"}" stroke-width="${"30"}" d="${"M480 256c0 123.4-100.5 223.9-223.9 223.9c-48.84 0-95.17-15.58-134.2-44.86c-14.12-10.59-16.97-30.66-6.375-44.81c10.59-14.12 30.62-16.94 44.81-6.375c27.84 20.91 61 31.94 95.88 31.94C344.3 415.8 416 344.1 416 256s-71.69-159.8-159.8-159.8c-37.46 0-73.09 13.49-101.3 36.64l45.12 45.14c17.01 17.02 4.955 46.1-19.1 46.1H35.17C24.58 224.1 16 215.5 16 204.9V59.04c0-24.04 29.07-36.08 46.07-19.07l47.6 47.63C149.9 52.71 201.5 32.11 256.1 32.11C379.5 32.11 480 132.6 480 256z"}"></path></svg>`;
});
var DrawingCanvas_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".canvas.svelte-vhujxn{z-index:0;aspect-ratio:512/512;width:100%;max-width:100%;border-width:1px;--tw-border-opacity:1;border-color:rgb(107 114 128 / var(--tw-border-opacity))\n}.brush.svelte-vhujxn{pointer-events:none;position:absolute;z-index:10;--tw-translate-x:-50%;--tw-translate-y:-50%;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))\n}.label.svelte-vhujxn{pointer-events:none;position:absolute;top:0px;left:0px;z-index:20;-webkit-user-select:none;-moz-user-select:none;user-select:none;padding-left:0.5rem;padding-right:0.5rem;font-size:1rem;line-height:1.5rem;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));color:white;font-weight:bolder;-webkit-text-stroke:1px black;-webkit-text-fill-color:white\n}")();
const css$2 = {
  code: ".canvas.svelte-vhujxn{z-index:0;aspect-ratio:512/512;width:100%;max-width:100%;border-width:1px;--tw-border-opacity:1;border-color:rgb(107 114 128 / var(--tw-border-opacity))\n}.brush.svelte-vhujxn{pointer-events:none;position:absolute;z-index:10;--tw-translate-x:-50%;--tw-translate-y:-50%;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))\n}.label.svelte-vhujxn{pointer-events:none;position:absolute;top:0px;left:0px;z-index:20;-webkit-user-select:none;-moz-user-select:none;user-select:none;padding-left:0.5rem;padding-right:0.5rem;font-size:1rem;line-height:1.5rem;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));color:white;font-weight:bolder;-webkit-text-stroke:1px black;-webkit-text-fill-color:white\n}",
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
  return `<div><div class="${"relative overflow-clip"}"><canvas class="${"canvas svelte-vhujxn"}" width="${"512"}" height="${"512"}"${add_attribute("this", canvas, 0)}></canvas>
		<canvas class="${"brush svelte-vhujxn"}" width="${"10"}" height="${"10"}"${add_attribute("this", brush, 0)}></canvas>
		<span class="${"label svelte-vhujxn"}">${escape($selectedBrush == null ? void 0 : $selectedBrush.label)}</span>
		<button class="${"absolute bottom-0 left-0 p-3"}" ${$drawingLayers.size <= 0 ? "disabled" : ""}>${validate_component(Undo, "UndoIcon").$$render($$result, {}, {}, {})}</button></div>
</div>`;
});
var ResultCanvas_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".image.svelte-1t0h0rs{z-index:0;box-sizing:border-box;aspect-ratio:512/512;border-width:1px;--tw-border-opacity:1;border-color:rgb(107 114 128 / var(--tw-border-opacity))\n}@media(prefers-color-scheme: dark){.image.svelte-1t0h0rs{--tw-border-opacity:1;border-color:rgb(209 213 219 / var(--tw-border-opacity))\n    }}.loading.svelte-1t0h0rs{position:absolute;top:0px;left:0px;right:0px;bottom:0px;display:flex;flex-direction:column;align-items:center;justify-content:center\n}")();
const css$1 = {
  code: ".image.svelte-1t0h0rs{z-index:0;box-sizing:border-box;aspect-ratio:512/512;border-width:1px;--tw-border-opacity:1;border-color:rgb(107 114 128 / var(--tw-border-opacity))\n}@media(prefers-color-scheme: dark){.image.svelte-1t0h0rs{--tw-border-opacity:1;border-color:rgb(209 213 219 / var(--tw-border-opacity))\n    }}.loading.svelte-1t0h0rs{position:absolute;top:0px;left:0px;right:0px;bottom:0px;display:flex;flex-direction:column;align-items:center;justify-content:center\n}",
  map: null
};
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
  let predictStatus = "";
  async function predict(base64Image, { prompt, modifier, steps, seed }) {
    const apiUrl = API;
    const stepsString = typeof steps === "bigint" ? steps.toString() : steps;
    const seedString = typeof seed === "bigint" ? seed.toString() : seed;
    const payload = {
      inputs: prompt + ". " + modifier,
      prompt: prompt + ". " + modifier,
      image: base64Image,
      steps: stepsString,
      seed: seedString
    };
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "image/png"
      },
      body: JSON.stringify(payload)
    });
    console.log(response);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  }
  $$result.css.add(css$1);
  {
    (async () => {
      if ($generateMap) {
        predictStatus = "Generating...";
        const results = await predict($currentCanvas.toDataURL().split(",")[1], $selectedParams);
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
  return `<div class="${"relative overflow-clip flex flex-col justify-center items-center w-full h-full"}">${$resultImage ? `<img class="${"image " + escape($generateMap ? "opacity-30" : "") + " svelte-1t0h0rs"}" alt="${"Endpoint is starting, try again in a few minutes"}"${add_attribute("src", $resultImage, 0)} width="${"512"}" height="${"512"}">` : ``}
	${$generateMap ? `<div class="${"loading svelte-1t0h0rs"}"><svg xmlns="${"http://www.w3.org/2000/svg"}" fill="${"none"}" viewBox="${"0 0 24 24"}" class="${"animate-spin max-w-[3rem]"}"><path fill="${"currentColor"}" d="${"M20 12a8 8 0 0 1-8 8v4a12 12 0 0 0 12-12h-4Zm-2-5.3a8 8 0 0 1 2 5.3h4c0-3-1.1-5.8-3-8l-3 2.7Z"}"></path></svg>
			<span class="${"text-xs"}">${escape(predictStatus)}</span></div>` : ``}</div>

`;
});
var index_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".drawings.svelte-1sy339h{display:grid;grid-template-columns:2fr 1.5fr;place-items:center}@media(min-width: 530px){.drawings.svelte-1sy339h{grid-template-columns:repeat(2, minmax(0, 1fr))}}button.svelte-1sy339h{border-radius:0.5rem;border-width:1px;--tw-border-opacity:1;border-color:rgb(209 213 219 / var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(249 250 251 / var(--tw-bg-opacity));padding:0.25rem;font-size:0.875rem;line-height:1.25rem;--tw-text-opacity:1;color:rgb(17 24 39 / var(--tw-text-opacity))}button.svelte-1sy339h:focus{--tw-border-opacity:1;border-color:rgb(59 130 246 / var(--tw-border-opacity));--tw-ring-opacity:1;--tw-ring-color:rgb(59 130 246 / var(--tw-ring-opacity))}button.svelte-1sy339h:disabled{opacity:0.5}@media(prefers-color-scheme: dark){button.svelte-1sy339h{--tw-border-opacity:1;border-color:rgb(209 213 219 / var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(249 250 251 / var(--tw-bg-opacity))}button.svelte-1sy339h:focus{--tw-border-opacity:1;border-color:rgb(59 130 246 / var(--tw-border-opacity));--tw-ring-opacity:1;--tw-ring-color:rgb(59 130 246 / var(--tw-ring-opacity))}}.green.svelte-1sy339h{background-color:lightgreen;font-weight:bold;font-size:1.2em}")();
const css = {
  code: ".drawings.svelte-1sy339h{display:grid;grid-template-columns:2fr 1.5fr;place-items:center}@media(min-width: 530px){.drawings.svelte-1sy339h{grid-template-columns:repeat(2, minmax(0, 1fr))}}button.svelte-1sy339h{border-radius:0.5rem;border-width:1px;--tw-border-opacity:1;border-color:rgb(209 213 219 / var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(249 250 251 / var(--tw-bg-opacity));padding:0.25rem;font-size:0.875rem;line-height:1.25rem;--tw-text-opacity:1;color:rgb(17 24 39 / var(--tw-text-opacity))}button.svelte-1sy339h:focus{--tw-border-opacity:1;border-color:rgb(59 130 246 / var(--tw-border-opacity));--tw-ring-opacity:1;--tw-ring-color:rgb(59 130 246 / var(--tw-ring-opacity))}button.svelte-1sy339h:disabled{opacity:0.5}@media(prefers-color-scheme: dark){button.svelte-1sy339h{--tw-border-opacity:1;border-color:rgb(209 213 219 / var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(249 250 251 / var(--tw-bg-opacity))}button.svelte-1sy339h:focus{--tw-border-opacity:1;border-color:rgb(59 130 246 / var(--tw-border-opacity));--tw-ring-opacity:1;--tw-ring-color:rgb(59 130 246 / var(--tw-ring-opacity))}}.green.svelte-1sy339h{background-color:lightgreen;font-weight:bold;font-size:1.2em}",
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
  return `<div class="${"max-w-screen-md mx-auto px-3 py-5 relative z-0"}"><article class="${"prose"}"><h1>Drawing to Map</h1>
		<p>This space is for the ControlNet model <a href="${"https://github.com/RubenGres/Seg2Sat"}" target="${"_blank"}"><span>Seg2Sat</span></a></p>

		<p>If you don&#39;t get your result in a few seconds after query, wait 2minutes and come back. GPU time is expensive and the model is not always running</p></article>


	${validate_component(BrushSelector, "BrushSelector").$$render($$result, {}, {}, {})}
	<div class="${"drawings py-3 -mx-3 svelte-1sy339h"}">${validate_component(DrawingCanvas, "DrawingCanvas").$$render($$result, {}, {}, {})}
		${validate_component(ResultCanvas, "ResultCanvas").$$render($$result, {}, {}, {})}</div>

	<button ${$generateMap === true ? "disabled" : ""} class="${"green svelte-1sy339h"}">Generate Map
	</button>

	<button ${$saveResult === true || !$resultImage ? "disabled" : ""} class="${"svelte-1sy339h"}">Save Result
	</button>

	${validate_component(TemplateGallery, "TemplateGallery").$$render($$result, {}, {}, {})}

	${validate_component(ParamsSelector, "ParamSelector").$$render($$result, {}, {}, {})}
</div>`;
});
export { Routes as default };
