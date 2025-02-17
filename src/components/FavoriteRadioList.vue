<script setup lang="ts">
import { ref } from "vue";
import type { RadioStation } from "../../types/radio.types";
import { PlayIcon, SearchIcon, SquareIcon } from "lucide-vue-next";
import FavoriteRadioItem from "./FavoriteRadioItem.vue";
import { useRadioStation } from "../stores/radioStore";

const radioStationsStore = useRadioStation();
const allStations = ref<RadioStation[]>([...radioStationsStore.favorites]);

const filterStations = (search: string) => {
    if (search === "") {
        radioStationsStore.favorites = [...allStations.value];
        return;
    }
    const searchLower = search.toLowerCase();
    radioStationsStore.favorites = allStations.value.filter((station) => {
        return (
            station.name.toLowerCase().includes(searchLower) ||
            station.country.toLowerCase().includes(searchLower) ||
            station.language.toLowerCase().includes(searchLower)
        );
    });
};
</script>
<template>
    <div class="w-full p-8 mx-auto space-y-4 md:w-2/3">
        <div class="flex flex-col gap-4">
            <div>
                <h1 class="font-semibold text-center md:text-4xl">
                    Radio Browser
                </h1>
            </div>
            <div class="flex items-center justify-between">
                <p class="w-1/2 pl-6 md:text-2xl">Favorite Radios</p>
                <div
                    class="flex items-center border-b-2 border-transparent w-fit focus-within:border-blue-600 focus-within:border-b-2">
                    <SearchIcon class="text-blue-600 size-8" />
                    <input
                        @input="(e: Event) => filterStations((e.target as HTMLInputElement).value)"
                        type="text"
                        class="w-40 pl-1 bg-transparent border-0 md:text-xl rounded-xl focus:ring-0 focus:outline-none"
                        placeholder="Search stations" />
                </div>
            </div>
        </div>
        <div class="bg-zinc-900 h-[80vh] rounded-lg text-zinc-100">
            <div class="flex items-center gap-4 border-b-2 border-zinc-700">
                <div class="flex items-center py-8 pl-14">
                    <PlayIcon
                        v-if="!radioStationsStore.isPlaying"
                        class="stroke-0 size-14 fill-blue-700" />
                    <SquareIcon v-else class="stroke-0 size-14 fill-blue-700" />
                </div>
                <p class="font-bold uppercase md:text-4xl text-zinc-300">
                    {{ radioStationsStore.selectedMusic }}
                </p>
            </div>
            <ul
                class="flex flex-col gap-4 p-4 overflow-y-auto scrollbar h-[65vh]">
                <FavoriteRadioItem
                    v-for="station in radioStationsStore.favorites"
                    :station="station" />
            </ul>
        </div>
    </div>
</template>
