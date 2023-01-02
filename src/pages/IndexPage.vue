<template>
  <q-page class="row items-center justify-evenly">
    <q-select
      v-model="locale"
      :options="localeOptions"
      label="Quasar Language"
      dense
      borderless
      emit-value
      map-options
      options-dense
      style="min-width: 150px"
    />
    <p>{{ $t('failed') }}</p>
    <p>{{ $t('success') }}</p>
    <p>
      <ul>
        <li v-for=" user in form.users" :key="user.name">{{user.name}}</li>
      </ul>
    </p>
    <example-component
      title="Example component"
      active
      :todos="todos"
      :meta="meta"
    ></example-component>
  </q-page>
</template>

<script setup lang="ts">
import { Todo, Meta } from 'components/models';
import ExampleComponent from 'components/ExampleComponent.vue';
import { ref, watch, onMounted, reactive } from 'vue';
import { getAction } from '../api';
import { useI18n } from 'vue-i18n';
const { locale } = useI18n({ useScope: 'global' });
const localeOptions = [
  { value: 'en-US', label: 'English' },
  { value: 'zh-CN', label: '中文' },
];

const form = reactive({
  users : [] as any[]
})

onMounted(async () => {
  // const response = await getAction('/users', '');
  getAction('/users', null).then(data=>{form.users = data.data}).catch(err=>{console.log(err);
  })
  // form.users = [...response.data];
  // console.log(users.data);
}),
  watch(locale, (val) => {
    console.log(val);
    localStorage.setItem('language', val as string);
  });

const todos = ref<Todo[]>([
  {
    id: 1,
    content: 'ct1',
  },
  {
    id: 2,
    content: 'ct2',
  },
  {
    id: 3,
    content: 'ct3',
  },
  {
    id: 4,
    content: 'ct4',
  },
  {
    id: 5,
    content: 'ct5',
  },
]);
const meta = ref<Meta>({
  totalCount: 1200,
});
</script>
