<template>
  <div>11</div>
</template>
<script lang="ts" setup>
import { constant } from "@/config";
import { reactive, onMounted } from "vue";
import { storage } from "@/utils";
import { useRouter } from "vue-router";
const router = useRouter();

const state = reactive({
  mobile: "",
  password: "",
  rememberPassword: false,
  loading: false,
});

onMounted(() => {
  init();
});

const init = () => {};

const onLogon = async () => {};
</script>
<style lang="scss" scoped></style>
