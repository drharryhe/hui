<template>
    <div id="monaco" ref="monacoRef" class="justify-self-start justify-start" style="text-align: left"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as monaco from 'monaco-editor'
import 'monaco-editor/esm/vs/basic-languages/css/css.contribution'
import 'monaco-editor/esm/vs/basic-languages/xml/xml.contribution'
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import TsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

self.MonacoEnvironment = {
    getWorker(_: string, label: string) {
        if (label === 'typescript' || label === 'javascript') return new TsWorker()
        if (label === 'json') return new JsonWorker()
        if (label === 'css') return new CssWorker()
        if (label === 'html') return new HtmlWorker()
        return new EditorWorker()
    },
}

const monacoRef = ref()
const monacoInstance = ref<ReturnType<typeof monaco.editor.create>>()
onMounted(() => {
    monacoInstance.value = monaco.editor.create(monacoRef.value, {
        language: 'typescript',
        value: "console.log('hello world')",
    })
})
</script>

<style scoped>
#monaco {
    height: 1280px;
    width: 1920px;
}
</style>
