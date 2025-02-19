<script setup lang="ts">
import { Loader, MenuIcon } from "lucide-vue-next";
import { onMounted, ref } from "vue";
import axios from "axios";
import type { RadioStation } from "../../types/radio.types";
import RadioItem from "./RadioItem.vue";

const allStations = ref<RadioStation[]>([]);
const originalStations = ref<RadioStation[]>([]);
const isLoading = ref<boolean>(true);
const currentPage = ref<number>(1);
const itemsPerPage: number = 10;
const hasNextPage = ref<boolean>(true);

const fetchStations = async (page: number) => {
    if (page < 1) return;

    isLoading.value = true;
    currentPage.value = page;

    try {
        const response = await axios.get(
            `https://de1.api.radio-browser.info/json/stations/search?offset=${currentPage.value}&limit=${itemsPerPage}`
        );
        allStations.value = response.data;
        originalStations.value = [...allStations.value];
        isLoading.value = false;
        hasNextPage.value = response.data.length === itemsPerPage;
    } catch (error) {
        console.error("Erro ao buscar estações:", error);
        isLoading.value = false;
    }
};

const filterStations = (search: string) => {
    if (search === "") {
        allStations.value = [...originalStations.value];
        return;
    }
    const searchLower = search.toLowerCase();
    allStations.value = originalStations.value.filter((station) => {
        return (
            station.name.toLowerCase().includes(searchLower) ||
            station.country.toLowerCase().includes(searchLower) ||
            station.language.toLowerCase().includes(searchLower)
        );
    });
};

onMounted(() => {
    fetchStations(1);
});
</script>
<template>
    <div class="h-screen p-4 md:w-1/3 md:max-w-96 bg-zinc-900">
        <div class="flex flex-col w-full gap-4">
            <div class="flex items-center justify-end w-full">
                <MenuIcon class="text-blue-500 size-10" />
            </div>
            <div class="flex items-center justify-center px-6">
                <input
                    @input="(e: Event) => filterStations((e.target as HTMLInputElement).value)"
                    type="text"
                    class="w-full p-2 rounded-xl bg-zinc-700"
                    placeholder="Search here" />
            </div>
            <div class="flex flex-col justify-between w-full h-[85vh]">
                <div v-if="isLoading" class="m-auto w-fit">
                    <Loader class="text-blue-500 animate-spin size-10" />
                </div>
                <ul
                    class="flex flex-col w-full gap-2 *:rounded-xl *:bg-zinc-800 *:p-4 *:flex *:justify-between *:items-center overflow-y-scroll h-[75 vh] scrollbar pr-2 rounded-lg">
                    <RadioItem
                        v-if="!isLoading"
                        v-for="station in allStations"
                        :station="station" />
                </ul>
                <div
                    class="flex items-center justify-between p-4 rounded-xl bg-zinc-800">
                    <button
                        @click="fetchStations(currentPage - 1)"
                        :disabled="currentPage === 1"
                        class="disabled:text-neutral-600">
                        Anterior
                    </button>
                    <span>{{ currentPage }}</span>
                    <button
                        @click="fetchStations(currentPage + 1)"
                        :disabled="isLoading || !hasNextPage"
                        class="disabled:text-neutral-600">
                        Próximo
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
