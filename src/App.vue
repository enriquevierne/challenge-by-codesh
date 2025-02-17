<script setup lang="ts">
import FavoriteRadioList from "./components/FavoriteRadioList.vue";
import Layout from "./components/Layout.vue";
import RadioList from "./components/RadioList.vue";
</script>

<template>
    <Layout>
        <div class="flex">
            <RadioList />
            <FavoriteRadioList />
        </div>
    </Layout>
</template>
