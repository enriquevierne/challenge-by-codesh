<script setup lang="ts">
import { CheckIcon, MenuIcon } from "lucide-vue-next";
import { onMounted, ref } from "vue";
import axios from "axios";
import type { RadioStation } from "../../types/radio.types";

const allStations = ref<RadioStation[]>([]);
const originalStations = ref<RadioStation[]>([]);
const isMenuOpen = ref(false);

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

const fetchStations = async () => {
    try {
        const response = await axios.get(
            "https://de1.api.radio-browser.info/json/stations/search?limit=50"
        );
        allStations.value = response.data;
        originalStations.value = [...allStations.value];
    } catch (error) {
        console.error("Erro ao buscar estações:", error);
    }
};

const filterStations = (search: string) => {
    console.log(search);

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
    <div
        v-if="isMenuOpen"
        class="w-1/3 h-screen p-4 max-w-96 bg-neutral-900 text-neutral-100">
        <div class="flex flex-col w-full gap-4">
            <div class="flex items-center justify-end w-full">
                <button type="button" @click="toggleMenu">
                    <MenuIcon class="text-blue-500 size-10" />
                </button>
            </div>
            <div class="flex items-center justify-center px-6">
                <input
                    @input="(e: Event) => filterStations((e.target as HTMLInputElement).value)"
                    type="text"
                    class="w-full p-2 rounded-xl bg-neutral-700"
                    placeholder="Search here" />
            </div>
            <div>
                <ul
                    class="flex flex-col w-full gap-2 *:rounded-xl *:bg-neutral-800 *:p-4 *:flex *:justify-between *:items-center overflow-y-scroll h-[80vh] scrollbar pr-2">
                    <li
                        v-for="station in allStations"
                        :key="station.changeuuid">
                        <p>{{ station.name }}</p>
                        <CheckIcon class="text-blue-500 size-6" />
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div v-else class="flex items-center w-full p-4">
        <button type="button" @click="toggleMenu">
            <MenuIcon class="text-blue-500 size-10" />
        </button>
    </div>
</template>
