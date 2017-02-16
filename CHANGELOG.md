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
  3. **Deprecated method:** `noConflict`.
* Button
  1. New options: `size`, `icon`.
  2. **Deprecated theme option:** `dark`.
* Input, Textarea
  1. New option: `theme`.
  2. Support the `placeholder` attribute for older IE.
* Textline
  1. New options: `theme`, `width`, `height`, `maxLine`.
  2. New method: `valArray`.
  3. **Deprecated option:** `skin`.
  4. **Deprecated method:** `lines`.
* Tooltips
  1. **Rewrite with all new options**.
