<template>
  <div class="editor">
    <b-container :fluid="true" v-if="editor">
      <b-tabs v-model="activeDocumentIndex">
        <b-tab
          v-for="(doc, index) in documents"
          :key="doc.name"
          no-body
          :title="doc.name"
          :active="index == activeDocumentIndex"
        />
      </b-tabs>

      <editor-content class="editor__content" :editor="editor" />
    </b-container>
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import {
  HardBreak,
  Heading,
  Bold,
  Code,
  Italic,
  Strike,
  Underline,
  Blockquote,
  Table,
  TableHeader,
  TableRow,
  TableCell
} from "tiptap-extensions";
import Realtime from "./extensions/Realtime.js";
import { schema } from "./schema";
import * as Y from "yjs";
import { ySyncPluginKey } from "y-prosemirror";

class MyEditor extends Editor {
  createSchema() {
    return schema;
  }
}

console.log(schema);

export default {
  name: "CollaborationEditor",
  components: {
    EditorContent
    // EditorMenuBar
  },
  data() {
    return {
      editor: null,
      documents: [
        { name: "Final Reflections", submitted: false },
        { name: "Collaborative Report", submitted: true }
      ],
      activeDocumentIndex: null
    };
  },
  watch: {
    activeDocumentIndex: function(val) {
      if (this.editor) this.editor.destroy();
      this.editor = new MyEditor({
        extensions: [
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new Blockquote(),
          new Table(),
          new TableHeader(),
          new TableRow(),
          new TableCell(),
          new Realtime("test", this.documents[val].name)
        ]
      });
      if (this.documents[val].submitted) {
        this.editor.view.dispatch(
          this.editor.view.state.tr.setMeta(ySyncPluginKey, {
            snapshot: null,
            prevSnapshot: Y.emptySnapshot
          })
        );
      }
    }
  },
  methods: {},
  mounted() {
    this.activeDocumentIndex = 0;
  },
  beforeDestroy() {
    this.editor && this.editor.destroy();
  }
};
</script>

<style lang="scss">
@import "./yjs.scss";
@import "./editor.scss";
@import "./version.scss";
</style>
