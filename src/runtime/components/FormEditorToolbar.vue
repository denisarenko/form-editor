<template>
  <div v-if="editor" class="sticky top-0 z-[1] flex gap-2 rounded-t-[inherit] border-b bg-white p-2">
    <template v-for="tool in toolbar" :key="tool.type">
      <button
        v-if="!tool.divide"
        type="button"
        class="rounded-md bg-white p-1.5 shadow ring-1 hover:bg-slate-50 disabled:opacity-50"
        :class="tool.type && editor.isActive(tool.type, tool.attr) ? 'ring-blue-500' : 'ring-black/5'"
        :disabled="editSource && tool.type !== 'source'"
        @click="tool.action"
      >
        <EditorIcon :name="typeof tool.icon === 'function' ? tool.icon() : tool.icon" class="size-4" />
      </button>

      <div v-if="tool.divide" class="border-r" />
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({ editor: Object });

const setLink = defineModel('setLink');
const uploadImage = defineModel('uploadImage');
const editSource = defineModel('editSource');

const toolbar = ref([
  {
    type: 'heading',
    attr: { level: 2 },
    icon: 'h2',
    title: 'Heading 2',
    action: () => props.editor.chain().focus().toggleHeading({ level: 2 }).run()
  },
  {
    type: 'heading',
    attr: { level: 3 },
    icon: 'h3',
    title: 'Heading 3',
    action: () => props.editor.chain().focus().toggleHeading({ level: 3 }).run()
  },
  {
    type: 'heading',
    attr: { level: 4 },
    icon: 'h4',
    title: 'Heading 4',
    action: () => props.editor.chain().focus().toggleHeading({ level: 4 }).run()
  },
  {
    type: 'paragraph',
    icon: 'paragraph',
    title: 'Paragraph',
    action: () => props.editor.chain().focus().setParagraph().run()
  },

  {
    divide: true
  },

  {
    type: 'bold',
    icon: 'bold',
    title: 'Bold',
    action: () => props.editor.chain().focus().toggleBold().run()
  },
  {
    type: 'italic',
    icon: 'italic',
    title: 'Italic',
    action: () => props.editor.chain().focus().toggleItalic().run()
  },
  {
    type: 'strike',
    icon: 'strikethrough',
    title: 'Strike',
    action: () => props.editor.chain().focus().toggleStrike().run()
  },

  {
    divide: true
  },

  {
    type: 'link',
    icon: () => (!props.editor.isActive('link') ? 'link' : 'link-unlink'),
    title: 'Link',
    action: () => {
      if (!props.editor.isActive('link')) {
        setLink.value = true;
      } else {
        props.editor.chain().focus().unsetLink().run();
      }
    }
  },

  {
    type: 'blockquote',
    icon: 'quotes',
    title: 'Blockquote',
    action: () => props.editor.chain().focus().toggleBlockquote().run()
  },
  {
    type: 'bulletList',
    icon: 'list-unordered',
    title: 'Bullet List',
    action: () => props.editor.chain().focus().toggleBulletList().run()
  },
  {
    type: 'orderedList',
    icon: 'list-ordered',
    title: 'Ordered List',
    action: () => props.editor.chain().focus().toggleOrderedList().run()
  },

  {
    type: 'table',
    icon: () => (!props.editor.isActive('table') ? 'table-view' : 'table-view'),
    title: 'Table',
    action: () => {
      if (props.editor.isActive('table')) {
        props.editor.chain().focus().deleteTable().run();
      } else {
        props.editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
      }
    }
  },

  {
    icon: 'image',
    type: 'image',
    title: 'image',
    action: () => (uploadImage.value = true)
  },

  {
    divide: true
  },

  {
    icon: 'format-clear',
    title: 'Clear Format',
    action: () => props.editor.chain().focus().unsetAllMarks().run()
  },
  {
    icon: 'separator',
    title: 'Divide',
    action: () => props.editor.chain().focus().setHorizontalRule().run()
  },

  {
    icon: 'source-code',
    type: 'source',
    title: 'Source Code',
    action: () => (editSource.value = !editSource.value)
  }
]);
</script>
