<template>
  <div v-if="editor.isActive('table')" class="flex gap-1.5 p-1.5">
    <template v-for="tool in toolbar" :key="tool.type">
      <button
        v-if="!tool.divide"
        type="button"
        class="rounded-md bg-white p-1.5 shadow ring-1 hover:bg-slate-50"
        :class="tool.type && editor.isActive(tool.type) ? 'ring-blue-500' : 'ring-black/5'"
        @click="tool.action"
      >
        <EditorIcon :name="typeof tool.icon === 'function' ? tool.icon() : tool.icon" class="size-4" />
      </button>

      <div v-if="tool.divide" class="border-r" />
    </template>
  </div>
</template>

<script setup>
const props = defineProps({ editor: Object });

const toolbar = ref([
  {
    icon: 'insert-column-left',
    title: 'Add Column Left',
    action: () => props.editor.chain().focus().addColumnBefore().run()
  },
  {
    icon: 'insert-column-right',
    title: 'Add Column Right',
    action: () => props.editor.chain().focus().addColumnAfter().run()
  },
  {
    icon: 'delete-column',
    title: 'Delete Column',
    action: () => props.editor.chain().focus().deleteColumn().run()
  },

  {
    divide: true
  },

  {
    icon: 'insert-row-top',
    title: 'Add Row Top',
    action: () => props.editor.chain().focus().addRowBefore().run()
  },
  {
    icon: 'insert-row-bottom',
    title: 'Add Row Bottom',
    action: () => props.editor.chain().focus().addRowAfter().run()
  },
  {
    icon: 'delete-row',
    title: 'Delete Row',
    action: () => props.editor.chain().focus().deleteRow().run()
  },

  {
    divide: true
  },

  {
    icon: 'merge-cells',
    title: 'Merge or Split',
    action: () => props.editor.chain().focus().mergeOrSplit().run()
  }
]);
</script>
