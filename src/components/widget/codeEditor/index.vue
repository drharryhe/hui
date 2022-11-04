<template>
  <div ref="monacoRef"
       style="text-align: left"
       :style="style">
  </div>
</template>

<script lang="js">
import {ref} from 'vue'
import * as monaco from 'monaco-editor'
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution'
//@ts-ignore
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
//@ts-ignore
import TsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
//@ts-ignore
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import {useStoreSetting} from '@/store/setting';
import {mapState} from "pinia";

export default {
  name: "code-editor-panel",
  props: {
    language: {
      type: String,
      default: "bar",
    },
    style: {
      type: String,
      required: true,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    fontSize: {
      type: Number,
      default: 16,
    },
    value: {
      type: String,
      default: 'console.log("hello world")',
    },
  },
  data() {
    return {
      editorInstance: null,
      defaultOptions: {
        language: this.language,
        value: "console.log('hello world')",
        automaticLayout: true,
        minimap: {
          enabled: false
        },
        readOnly: this.readOnly, // 只读
        fontSize: this.fontSize, // 字体大小
        scrollBeyondLastLine: false, // 取消代码后面一大段空白
        overviewRulerBorder: false, // 不要滚动条的边
        foldingStrategy: 'indentation', // 代码可分小段折叠
        tabCompletion: 'on',
        cursorSmoothCaretAnimation: true,
        formatOnPaste: true,
        mouseWheelZoom: true,
        folding: true, //代码折叠
        autoClosingBrackets: 'always',
        autoClosingOvertype: 'always',
        autoClosingQuotes: 'always',
      },
    };
  },
  computed: {
    ...mapState(useStoreSetting, ['dark'])
  },
  methods: {
    layout() {
      this.editorInstance.layout();
    },
    undo() {
      this.editorInstance.trigger("anyString", "undo");
      this.onValueChange();
    },
    redo() {
      this.editorInstance.trigger("anyString", "redo");
      this.onValueChange();
    },
    getOptions() {
      let props = {value: this.value};
      this.language !== undefined && (props.language = this.language);
      return Object.assign({}, this.defaultOptions, this.options, props);
    },
    onValueChange() {
      this.$emit("input", this.editorInstance.getValue());
      this.$emit("change", this.editorInstance.getValue());
    },
    initEditor() {
      this.MonacoEnvironment = {
        getWorker(_, label) {
          if (label === 'typescript' || label === 'javascript') return new TsWorker()
          if (label === 'json') return new JsonWorker()
          return new EditorWorker()
        },
      };

      this.editorInstance = monaco.editor.create(
          this.monacoRef,
          this.getOptions()
      );
    },
    changeTheme(dark) {
      if (dark) {
        monaco.editor.setTheme('vs-dark')
      } else {
        monaco.editor.setTheme('vs')
      }
    },
    initBarLanguage() {
      // let keywords=[
      //   'rule', 'desc',"namespace", 'var','feature', 'sequence', 'by', 'with','repeat','true','false','null',
      // ];

      monaco.languages.register({id: 'bar'});
      monaco.languages.setMonarchTokensProvider("bar", {
        //将defaultToken设置为invalid，可以查看尚未标记的内容
        defaultToken: "invalid",
        tokenizer: {
          root: [
            [/[{}()\[\]]/, '@brackets'],
            [/\b\d*\.\d+([eE][\-+]?\d+)?\b/, "number.float"],
            [/\b0[xX][0-9a-fA-F]+\b/, "number.hex"],
            [/\b\d+\b/, "number"],

            [/\b(rule|desc|namespace|var|feature|sequence|with|by|ref|repeat)\b/, "keyword"],

            [/\b(and|or|not)\b/, "my-built-in-function"],

            [/([a-zA-Z0-9_]+)\s*(\(.*\))/, "@rematch", "@matchfunc"],

            [/'([^'\\]|\\.)*$/, "string.invalid"],
            [/'/, {token: "string.quote", bracket: "@open", next: "@string"}],
            {include: "@whitespace"},
          ],
          matchfunc: [
            [/([a-zA-Z0-9_]+)/, {token: "my-function", next: "@popall"}],
          ],
          string: [
            [/".*"/, "string"],
            [/\\./, "string.escape.invalid"],
          ],
          comment: [[/\/\/.*$/, "comment"]],
          whitespace: [
            [/[ \t\r\n]+/, "white"],
            [/#.*$/, "comment"],
          ],
        },
        //语言大小写不敏感吗
        ignoreCase: false,
      });
      monaco.languages.setLanguageConfiguration("bar", {
        brackets: [
          ["{", "}"],
          ["[", "]"],
          ["(", ")"],
        ],
        autoClosingPairs: [
          {open: "{", close: "}"},
          {open: "[", close: "]"},
          {open: "(", close: ")"},
          {open: '"', close: '"', notIn: ["string"]},
          // { open: "'", close: "'", notIn: ["string", "comment"] },
          // { open: "`", close: "`", notIn: ["string", "comment"] },
          // { open: "/**", close: " */", notIn: ["string"] },
        ],
      });
      monaco.languages.registerCompletionItemProvider("bar", {
        provideCompletionItems: () => {
          let suggestions = [
            // {
            //   label: "if",
            //   kind: monaco.languages.CompletionItemKind.Snippet,
            //   insertText: ["if ${0:condition} {", "\t", "}"].join("\n"),
            //   insertTextRules:
            //   monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            //   detail: "if 声明",
            // },
            // {
            //   label: "ifelse",
            //   kind: monaco.languages.CompletionItemKind.Snippet,
            //   insertText: [
            //     "if ${0:condition} {",
            //     "\t",
            //     "} else {",
            //     "\t",
            //     "}",
            //   ].join("\n"),
            //   insertTextRules:
            //   monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            //   detail: "if-else 声明",
            // },
          ]
          return {suggestions: suggestions};
        },
      });
      monaco.languages.registerHoverProvider("bar", {
        provideHover: function (document, position, token) {
          console.log(document.getWordAtPosition(position));
          if (document.getWordAtPosition(position) != null) {
            const word = document.getWordAtPosition(position).word;
            if (word === "if") {
              return {
                contents: [
                  {value: "**if**"},
                  {
                    value: [
                      "这是",
                      "if",
                      "的一些介绍",
                    ].join("\n\n"),
                  },
                ],
              };
            }
          }
        },
      });
    }
  },
  mounted() {
    this.initEditor();
    window.addEventListener("resize", this.layout);
    this.changeTheme(this.dark)
    if (this.language === 'bar') {
      this.initBarLanguage()
    }
    // this.editorInstance.updateOptions({
    //   readOnly: true,
    // });
  },
  watch: {
    dark(val) {
      this.changeTheme(val)
    },
    value() {
      if (this.value !== this.editorInstance.getValue()) {
        this.editorInstance.setValue(this.value);
      }
    },
  },
  setup() {
    const monacoRef = ref()
    return {
      monacoRef,
    }
  }
}
</script>

<style scoped lang="scss">

</style>