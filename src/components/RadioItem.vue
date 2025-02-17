<script setup lang="ts">
import { CheckIcon } from "lucide-vue-next";
import type { RadioStation } from "../../types/radio.types";
import { useRadioStation } from "../stores/radioStore";

defineProps<{
    station: RadioStation;
}>();

const favoriteStore = useRadioStation();

const toggleFavorite = (station: RadioStation) => {
    favoriteStore.toggleFavorite(station);
};
</script>
<template>
    <li @click="toggleFavorite(station)" :key="station.changeuuid">
        <p class="w-4/5">{{ station.name }}</p>
        <CheckIcon
            v-if="
                favoriteStore.favorites.find(
                    ({ changeuuid }) => changeuuid == station.changeuuid
                )
            "
            class="text-blue-500 size-8" />
    </li>
</template>
