<script setup lang="ts">
import { ref } from "vue";
import type { RadioStation } from "../../types/radio.types";
import {
    PencilIcon,
    PlayIcon,
    SearchIcon,
    SquareIcon,
    TrashIcon,
} from "lucide-vue-next";

const originalStations = ref([]);
const allStations = ref<RadioStation[]>([]);
const isPlaying = ref(false);

const filterStations = (search: string) => {
    if (search === "") {
        allStations.value = [...originalStations.value];
        return;
    }
    /* const searchLower = search.toLowerCase();
    allStations.value = originalStations.value.filter((station) => {
        return (
            station.name.toLowerCase().includes(searchLower) ||
            station.country.toLowerCase().includes(searchLower) ||
            station.language.toLowerCase().includes(searchLower)
        );
    }); */
};
</script>
<template>
    <div class="w-2/3 p-8 mx-auto space-y-4">
        <div class="flex flex-col gap-4">
            <div>
                <h1 class="text-4xl font-semibold text-center">
                    Radio Browser
                </h1>
            </div>
            <div class="flex items-center justify-between">
                <p class="w-1/2 pl-6 text-2xl">Favorite Radios</p>
                <div
                    class="flex items-center border-b-2 border-transparent w-fit focus-within:border-blue-600 focus-within:border-b-2">
                    <SearchIcon class="text-blue-600 size-8" />
                    <input
                        @input="(e: Event) => filterStations((e.target as HTMLInputElement).value)"
                        type="text"
                        class="w-40 pl-1 text-xl bg-transparent border-0 rounded-xl focus:ring-0 focus:outline-none"
                        placeholder="Search stations" />
                </div>
            </div>
        </div>
        <div class="bg-zinc-700 h-[80vh] rounded-lg text-zinc-950">
            <div class="flex items-center gap-4 border-b-2 border-zinc-500">
                <div class="flex items-center py-8 pl-14">
                    <PlayIcon
                        v-if="isPlaying"
                        class="stroke-0 size-14 fill-zinc-950"
                        39 />
                    <SquareIcon v-else class="stroke-0 size-14 fill-zinc-950" />
                </div>
                <p class="text-4xl font-bold uppercase">Nome da rádio atual</p>
                <div></div>
            </div>
            <ul class="flex flex-col gap-4 p-4">
                <li
                    class="flex items-center justify-between rounded-lg bg-zinc-500">
                    <div class="flex items-center gap-6 p-4 px-6">
                        <div
                            class="flex items-center p-4 rounded-full bg-zinc-700">
                            <button type="button" v-if="isPlaying">
                                <PlayIcon
                                    class="stroke-0 size-14 fill-zinc-950" />
                            </button>
                            <button type="button" v-else>
                                <SquareIcon
                                    class="stroke-0 size-14 fill-zinc-950" />
                            </button>
                        </div>
                        <div>
                            <p class="text-3xl font-bold">Sertanejo Brasil</p>
                            <p class="text-xl font-semibold text-zinc-800">
                                Brasil, RJ
                            </p>
                        </div>
                    </div>
                    <div class="flex items-center gap-6 p-4">
                        <button type="button">
                            <PencilIcon class="size-8 fill-zinc-950" />
                        </button>
                        <button type="button">
                            <TrashIcon class="size-8 fill-zinc-950" />
                        </button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
