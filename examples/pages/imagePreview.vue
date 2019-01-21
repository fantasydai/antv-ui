<template>
  <section class="wrap">
    <section class="btn-wrap">
      <d-button class="btn" @click="handleClick1">show single Picker</d-button>
      <d-button class="btn" @click="handleClick2">show multiple Picker</d-button>
      <d-button class="btn" @click="handleClick3">linkage Picker</d-button>
      <d-button class="btn" @click="handleClick4">Promise Picker</d-button>
    </section>
    <d-picker :visible="visible" v-model="visible" :data="data" :values="value" :title="title" :onChange="dataChange" :onConfirm="onConfirm"></d-picker>
    <d-picker :visible="visible1" :format="format" v-model="visible1" :data="data1" :values="value" :title="title" :onChange="dataChange" :onConfirm="onConfirm"></d-picker>
    <d-picker :visible="visible2" v-model="visible2" :cols="3" :data="data2" :values="value2" :title="title" :onChange="dataChange" :onConfirm="onConfirm"></d-picker>
    <d-picker :visible="visible3" v-model="visible3" :cols="3" :data="data2" :values="value2" :title="title" :onChange="dataChange" :onConfirm="onConfirmPromise"></d-picker>

  </section>
</template>
