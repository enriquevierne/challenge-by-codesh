<script setup lang="ts">
import { ref } from "vue";
import { EditRadioStation, type RadioStation } from "../../types/radio.types";
import {
    CheckIcon,
    PencilIcon,
    PlayIcon,
    SatelliteIcon,
    SquareIcon,
    TrashIcon,
    XIcon,
} from "lucide-vue-next";
import { useRadioStation } from "../stores/radioStore";

const props = defineProps<{
    station: RadioStation;
}>();

const formEdit = ref<EditRadioStation>({
    changeuuid: props.station.changeuuid,
    name: props.station.name,
    country: props.station.country,
    state: props.station.state,
});

const editMode = ref<boolean>(false);

const musicStore = useRadioStation();

const toggleMusic = (station: { name: string }) => {
    musicStore.toggleMusic(station);
};

const updateStation = (uuid: string, formEdit: Partial<RadioStation>) => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    const updatedFavorites = favorites.map((item: RadioStation) =>
        item.changeuuid === uuid ? { ...item, ...formEdit } : item
    );

    musicStore.favorites = updatedFavorites;

    editMode.value = false;
};
</script>
<template>
    <li class="flex items-center justify-between w-full rounded-lg bg-zinc-500">
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
                <p class="font-bold md:text-3xl">{{ station.name }}</p>
                <p class="font-semibold md:md:text-xl text-zinc-800">
                    {{ station.country }}, {{ station.state }}
                </p>
            </div>
            <div v-else class="grid grid-cols-3 text-blue-800">
                <span>Edit Form</span>
                <div
                    class="flex flex-col items-start col-span-3 gap-1 text-left w-fit">
                    <input
                        type="text"
                        class="font-bold bg-transparent border-0 md:text-3xl rounded-xl focus:ring-0 focus:outline-none"
                        v-model="formEdit.name" />
                </div>
                <div class="flex items-center w-full gap-4">
                    <div class="flex flex-col items-start gap-1 text-left">
                        <input
                            type="text"
                            class="font-semibold bg-transparent border-0 md:md:text-xl rounded-xl focus:ring-0 focus:outline-none"
                            v-model="formEdit.country" />
                    </div>
                    <div class="flex flex-col items-start gap-1 text-left">
                        <input
                            type="text"
                            class="font-semibold bg-transparent border-0 md:md:text-xl rounded-xl focus:ring-0 focus:outline-none"
                            v-model="formEdit.state" />
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-col items-center gap-6 p-4 md:flex-row">
            <button type="button">
                <PencilIcon
                    v-if="!editMode"
                    @click="
                        () => {
                            editMode = true;

                            console.log(station.changeuuid);
                        }
                    "
                    class="size-8 fill-zinc-950" />
                <CheckIcon
                    @click="updateStation(station.changeuuid, formEdit)"
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
