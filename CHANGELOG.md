## 1.4.0 (March 1, 2017)

* Redesign homepage.
* Build with Gulp.
* Follow the CommonJS module specification.
* Rewrite CSS by Less.
* Generate documentations with JSDoc3.
* Provide 19 themes: blue(default), light-blue, cyan, teal, green, light-green, lime, yellow, amber, orange, brown, blue-gray, gray, deep-orange, red, pink, purple, deep-purple, indigo.
* bizui
  1. Exposed to global environment.
  2. New property: `theme`.
  3. Deprecated method: `noConflict`.
* Button
  1. New options: `customClass`, `size`, `icon`.
  2. Deprecated theme value of option: `dark`.
* Input, Textarea
  1. New options: `theme`, `customClass`.
  2. Support the `placeholder` attribute for older IE.
* Textline
  1. New options: `theme`, `customClass`, `width`, `height`, `maxLine`, `val`, `valArray`.
  2. New method: `valArray`.
  3. Deprecated option: `skin`.
  4. Deprecated method: `lines`.
* Tooltips
  1. Use `data-tooltip` attribute to mark target elements instead of `title`.
  2. New options: `action`, `element`, `theme`, `preventDefault`, `removeAll`, `removeSpecific`.
