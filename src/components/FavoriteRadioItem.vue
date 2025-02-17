<script setup lang="ts">
import { ref } from "vue";
import type { RadioStation } from "../../types/radio.types";
import { PencilIcon, PlayIcon, SquareIcon, TrashIcon } from "lucide-vue-next";
import { useRadioStation } from "../stores/radioStore";

const props = defineProps<{
    station: RadioStation;
}>();

const musicStore = useRadioStation();

const toggleMusic = (station: { name: string }) => {
    musicStore.toggleMusic(station);
};
</script>
<template>
    <li class="flex items-center justify-between rounded-lg bg-zinc-500">
        <div class="flex items-center gap-6 p-4 px-6">
            <div class="flex items-center p-4 rounded-full bg-zinc-700">
                <button
                    type="button"
                    v-if="musicStore.selectedMusic != station.name"
                    @click="toggleMusic(station)">
                    <PlayIcon class="stroke-0 size-14 fill-zinc-950" />
                </button>
                <button type="button" v-else @click="toggleMusic(station)">
                    <SquareIcon class="stroke-0 size-14 fill-zinc-950" />
                </button>
            </div>
            <div>
                <p class="text-3xl font-bold">{{ station.name }}</p>
                <p class="text-xl font-semibold text-zinc-800">
                    {{ station.country }}, {{ station.state }}
                </p>
            </div>
        </div>
        <div class="flex items-center gap-6 p-4">
            <button type="button">
                <PencilIcon class="size-8 fill-zinc-950" />
            </button>
            <button type="button" @click="musicStore.removeFavorite(station)">
                <TrashIcon class="size-8 fill-zinc-950" />
            </button>
        </div>
    </li>
</template>
