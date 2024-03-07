<template>
  <div class="divide-y" v-if="editor.isActive('image')">
    <div class="flex items-center gap-2 p-1.5">
      <EditorIcon name="image-alt" class="size-4 shrink-0" />

      <input
        type="text"
        v-model="imageAlt"
        class="w-full text-xs outline-0"
        placeholder="Enter Alt"
        @focusout="setImage()"
      />
    </div>

    <div class="flex justify-between gap-1.5 p-1.5">
      <template v-for="tool in toolbar" :key="tool.icon">
        <button
          v-if="!tool.divide"
          type="button"
          class="rounded-md bg-white p-1.5 shadow ring-1 hover:bg-slate-50"
          :class="editor.getAttributes('image').class === tool.action ? 'ring-blue-500' : 'ring-black/5'"
          @click="setImage(tool.action)"
        >
          <EditorIcon :name="tool.icon" class="size-4" />
        </button>

        <div v-if="tool.divide" class="border-r" />
      </template>
    </div>

    <div class="flex items-center gap-2 p-1.5">
      <input v-model="imageSize" type="range" min="20" max="100" class="range" @input="setImage()" />

      <span class="select-none text-xs text-black/50">{{ imageSize }}%</span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, watchEffect } from 'vue';
const props = defineProps({ editor: Object });

const imageFile = defineModel();
const imageSize = ref();
const imageAlt = ref();
const imageClass = ref();

const toolbar = ref([
  {
    icon: 'align-left',
    title: 'Align Left',
    action: 'mr-auto'
  },
  {
    icon: 'align-center',
    title: 'Align Center',
    action: 'mx-auto'
  },
  {
    icon: 'align-right',
    title: 'Align Right',
    action: 'ml-auto'
  },

  {
    divide: true
  },

  {
    icon: 'float-left',
    title: 'Float Left',
    action: 'float-left mr-4'
  },
  {
    icon: 'float-right',
    title: 'Float Right',
    action: 'float-right ml-4'
  }
]);

watchEffect(() => {
  if (props.editor) {
    imageSize.value = props.editor?.getAttributes('image').style?.replace(/\D/g, '');
    imageAlt.value = props.editor.getAttributes('image').alt;
    imageClass.value = props.editor.getAttributes('image').class;
  }
});

watch([imageFile], () => {
  if (imageFile.value) {
    const input = document.createElement('input');
    input.type = 'file';

    input.onchange = (event) => {
      const file = event.target.files[0];
      const body = new FormData();

      body.append('image', file);

      $fetch('/api/media/editor', { method: 'POST', body }).then((response) => {
        props.editor.commands.setImage({ src: response.url });
      });
    };

    input.click();

    imageFile.value = false;
  }
});

const setImage = (align = null) => {
  if (align) imageClass.value = align;

  props.editor.commands.setImage({
    src: props.editor.getAttributes('image').src,
    alt: imageAlt.value,
    style: `width: ${imageSize.value}%`,
    class: imageClass.value
  });
};
</script>

<style>
.range {
  @apply h-2 w-full appearance-none rounded border bg-white;

  &::-webkit-slider-thumb {
    @apply size-4 appearance-none rounded-full bg-white shadow shadow-black/20 ring-1 ring-black/5;
  }
}

.ProseMirror-selectednode {
  @apply ring-2 ring-blue-500/50 duration-200;
}
</style>
