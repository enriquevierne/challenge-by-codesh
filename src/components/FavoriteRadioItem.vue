<script setup lang="ts">
import { ref } from "vue";
import type { RadioStation } from "../../types/radio.types";
import {
    CheckIcon,
    PencilIcon,
    PlayIcon,
    SquareIcon,
    TrashIcon,
    XIcon,
} from "lucide-vue-next";
import { useRadioStation } from "../stores/radioStore";

const props = defineProps<{
    station: RadioStation;
}>();

const formEdit = {
    changeuuid: props.station.changeuuid,
    name: props.station.name,
    country: props.station.country,
    state: props.station.state,
};

const editMode = ref<boolean>(false);

const musicStore = useRadioStation();

const toggleMusic = (station: { name: string }) => {
    musicStore.toggleMusic(station);
};

const editStation = () => {
    musicStore.updateFavorite(formEdit);
    editMode.value = false;
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
            <div v-if="!editMode">
                <p class="text-3xl font-bold">{{ station.name }}</p>
                <p class="text-xl font-semibold text-zinc-800">
                    {{ station.country }}, {{ station.state }}
                </p>
            </div>
            <div v-else class="grid grid-cols-3 gap-2">
                <div
                    class="flex flex-col items-start col-span-3 gap-1 text-left w-fit">
                    <label for="name">Name:</label>
                    <input
                        type="text"
                        class="p-2 text-xl bg-transparent border rounded"
                        v-model="formEdit.name" />
                </div>
                <div class="flex items-center gap-4">
                    <div
                        class="flex flex-col items-start gap-1 text-left w-fit">
                        <label for="name">Country:</label>
                        <input
                            type="text"
                            class="p-2 text-xl bg-transparent border rounded"
                            v-model="formEdit.country" />
                    </div>
                    <div
                        class="flex flex-col items-start gap-1 text-left w-fit">
                        <label for="name">State:</label>
                        <input
                            type="text"
                            class="p-2 text-xl bg-transparent border rounded"
                            v-model="formEdit.state" />
                    </div>
                </div>
            </div>
        </div>
        <div class="flex items-center gap-6 p-4">
            <button type="button">
                <PencilIcon
                    v-if="!editMode"
                    @click="editMode = true"
                    class="size-8 fill-zinc-950" />
                <CheckIcon
                    @click="editStation"
                    v-else
                    class="size-8 text-zinc-950" />
            </button>
            <button type="button">
                <TrashIcon
                    v-if="!editMode"
                    @click="musicStore.removeFavorite(station)"
                    class="size-8 fill-zinc-950" />
                <XIcon
                    v-else
                    @click="editMode = false"
                    class="size-8 text-zinc-950" />
            </button>
        </div>
    </li>
</template>
