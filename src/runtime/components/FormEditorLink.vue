<template>
  <div v-if="editor.isActive('link') || setLink" class="flex gap-1.5 p-1.5">
    <input type="url" v-model="linkHref" placeholder="Enter URL" class="px-2 outline-0" />

    <button
      type="button"
      v-if="linkHref && linkHref !== editor.getAttributes('link').href"
      class="rounded-md bg-white p-1.5 shadow ring-1 ring-black/5 hover:bg-slate-50"
      @click="setHref"
    >
      <EditorIcon name="check-line" class="size-4" />
    </button>

    <button
      type="button"
      v-if="linkHref"
      class="rounded-md bg-white p-1.5 shadow ring-1 ring-black/5 hover:bg-slate-50"
      @click="editor.chain().focus().unsetLink().run()"
    >
      <EditorIcon name="link-unlink" class="size-4" />
    </button>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
const props = defineProps({ editor: Object });

const linkHref = ref();

const setLink = defineModel();

const setHref = () => {
  props.editor.chain().focus().extendMarkRange('link').setLink({ href: linkHref.value }).run();

  setLink.value = false;
};

watchEffect(() => {
  if (props.editor) linkHref.value = props.editor.getAttributes('link').href || '';
});
</script>
