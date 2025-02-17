<script setup lang="ts">
import { CheckIcon, Loader, MenuIcon } from "lucide-vue-next";
import { onMounted, ref } from "vue";
import axios from "axios";
import type { RadioStation } from "../../types/radio.types";

const allStations = ref<RadioStation[]>([]);
const originalStations = ref<RadioStation[]>([]);
const isLoading = ref(true);

const fetchStations = async () => {
    try {
        const response = await axios.get(
            "https://de1.api.radio-browser.info/json/stations/search?limit=50"
        );
        allStations.value = response.data;
        originalStations.value = [...allStations.value];
        isLoading.value = false;
    } catch (error) {
        console.error("Erro ao buscar estações:", error);
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
    fetchStations();
});
</script>
<template>
    <div class="w-1/3 h-screen p-4 max-w-96 bg-zinc-900">
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
            <div class="w-full">
                <div v-if="isLoading" class="m-auto w-fit">
                    <Loader class="text-blue-500 animate-spin size-10" />
                </div>
                <ul
                    class="flex flex-col w-full gap-2 *:rounded-xl *:bg-zinc-800 *:p-4 *:flex *:justify-between *:items-center overflow-y-scroll h-[80vh] scrollbar pr-2 rounded-lg">
                    <li
                        v-for="station in allStations"
                        :key="station.changeuuid">
                        <p class="w-4/5">{{ station.name }}</p>
                        <CheckIcon class="text-blue-500 size-8" />
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
