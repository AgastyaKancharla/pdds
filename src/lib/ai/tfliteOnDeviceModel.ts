/**
 * Generic on-device image classifier runner for this app's per-crop YOLOv8n-cls ->
 * TFLite models (Rice, Groundnut, Banana, Maize, Chilli, ...). Shared by every crop's
 * own wrapper module (e.g. groundnutOnDevice.ts) -- only the model URL and class name
 * order differ per crop.
 *
 * Runs entirely in the browser via @tensorflow/tfjs-tflite (WASM) -- no network call,
 * no third-party AI provider, works offline once the model + WASM runtime + vendored JS
 * are cached (see vite.config.ts's `on-device-model-assets` CacheFirst entry, which also
 * covers `/vendor/*.min.js` below).
 *
 * @tensorflow/tfjs-tflite's npm ESM entry point is broken for every bundler (it imports a
 * sibling file, `tflite_web_api_client`, that doesn't exist in the published package --
 * confirmed by trying to run it through Vite/esbuild, not just a suspicion). Its only
 * working distribution is the classic UMD bundle loaded via a <script> tag, which attaches
 * `tf`/`tflite` to `window`. So instead of `import`ing either package at runtime, this
 * module vendors their prebuilt UMD files under `public/vendor/` (copied once from
 * node_modules -- see the comment above VENDORED_TF_SRC below for how to refresh them) and
 * loads them as plain scripts, then reads the globals they attach. The npm packages are
 * still real devDependencies purely so TypeScript has their .d.ts files for `import type`;
 * nothing from them is ever imported as a runtime value.
 *
 * @tensorflow/tfjs-tflite is pinned to its exact peer-dependency version of
 * @tensorflow/tfjs-core (0.0.1-alpha.10 requires 4.9.0 precisely) -- do not bump either
 * package independently without re-checking that pin and re-copying both vendored files.
 */
import type * as TfNamespace from '@tensorflow/tfjs';
import type * as TfliteNamespace from '@tensorflow/tfjs-tflite';

export interface OnDeviceClassification {
  modelLabel: string;
  confidence: number;
}

const INPUT_SIZE = 224;

// Re-copy these from node_modules whenever the pinned tfjs/tfjs-tflite versions change:
//   cp node_modules/@tensorflow/tfjs/dist/tf.min.js public/vendor/tf.min.js
//   cp node_modules/@tensorflow/tfjs-tflite/dist/tf-tflite.min.js public/vendor/tf-tflite.min.js
const VENDORED_TF_SRC = '/vendor/tf.min.js';
const VENDORED_TFLITE_SRC = '/vendor/tf-tflite.min.js';

declare global {
  interface Window {
    tf?: typeof TfNamespace;
    tflite?: typeof TfliteNamespace;
  }
}

function loadScriptOnce(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}

let globalsPromise: Promise<{ tf: typeof TfNamespace; tflite: typeof TfliteNamespace }> | null = null;

function loadTfjsGlobals(): Promise<{ tf: typeof TfNamespace; tflite: typeof TfliteNamespace }> {
  if (!globalsPromise) {
    globalsPromise = (async () => {
      // tf-tflite.min.js expects the `tf` global to already exist when it runs.
      await loadScriptOnce(VENDORED_TF_SRC);
      await loadScriptOnce(VENDORED_TFLITE_SRC);
      if (!window.tf || !window.tflite) {
        throw new Error('TensorFlow.js globals did not attach to window after loading vendored scripts');
      }
      // Self-hosted, not the default CDN path -- this app is offline-first, and a remote
      // Google-hosted CDN would defeat that the moment a farmer has no signal.
      window.tflite.setWasmPath('/tflite-wasm/');
      return { tf: window.tf, tflite: window.tflite };
    })();
  }
  return globalsPromise;
}

const modelCache = new Map<string, Promise<TfliteNamespace.TFLiteModel>>();

function loadModel(modelUrl: string, tflite: typeof TfliteNamespace): Promise<TfliteNamespace.TFLiteModel> {
  let cached = modelCache.get(modelUrl);
  if (!cached) {
    cached = tflite.loadTFLiteModel(modelUrl);
    modelCache.set(modelUrl, cached);
  }
  return cached;
}

function loadImageElement(imageUri: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to decode image for on-device classification'));
    img.src = imageUri;
  });
}

/**
 * Runs a crop-specific TFLite classifier on a photo and returns every class's
 * confidence, highest first. `classNames` must be in the exact index order the model
 * was trained with (Ultralytics sorts class folder names alphabetically) -- verify this
 * against the exported model's embedded `metadata.json` (`names` field) before trusting
 * it, the way groundnutModelClassMap.ts documents doing for Groundnut.
 */
export async function classifyImageOnDevice(
  imageUri: string,
  modelUrl: string,
  classNames: string[]
): Promise<OnDeviceClassification[]> {
  const { tflite, tf } = await loadTfjsGlobals();
  const [model, imageElement] = await Promise.all([loadModel(modelUrl, tflite), loadImageElement(imageUri)]);

  const output = tf.tidy(() => {
    // Ultralytics' TFLite classification export keeps PyTorch's channel-first layout
    // (NCHW: [1, 3, 224, 224]), not TFLite's usual channel-last NHWC -- confirmed by
    // running this against the real exported model, which threw a shape-mismatch error
    // ('expect 1,3,224,224, got 1,224,224,3') until the transpose below was added.
    const input = tf.browser
      .fromPixels(imageElement)
      .resizeBilinear([INPUT_SIZE, INPUT_SIZE])
      .toFloat()
      .div(255)
      .expandDims(0)
      .transpose([0, 3, 1, 2]);
    return model.predict(input) as TfNamespace.Tensor;
  });

  try {
    const probs = await output.data();
    return classNames
      .map((modelLabel, i) => ({ modelLabel, confidence: probs[i] ?? 0 }))
      .sort((a, b) => b.confidence - a.confidence);
  } finally {
    output.dispose();
  }
}
