import { defineStore } from "pinia";
import type { EditRadioStation, RadioStation } from "../../types/radio.types";

export const useRadioStation = defineStore("radioStation", {
    state: () => ({
        favorites: JSON.parse(
            localStorage.getItem("favorites") || "[]"
        ) as RadioStation[],
        selectedMusic: "" as string,
        isPlaying: false as boolean,
    }),
    actions: {
        toggleMusic(station: { name: string }) {
            if (this.selectedMusic === station.name) {
                this.isPlaying = !this.isPlaying;
            } else {
                this.selectedMusic = station.name;
                this.isPlaying = true;
            }
        },

        addFavorite(station: RadioStation) {
            if (
                !this.favorites.some(
                    (s: RadioStation) => s.changeuuid === station.changeuuid
                )
            ) {
                this.favorites.push(station);
                this.saveFavorites();
            }
        },
        removeFavorite(station: RadioStation) {
            this.favorites = this.favorites.filter(
                (s: RadioStation) => s.changeuuid !== station.changeuuid
            );
            this.saveFavorites();
        },
        updateFavorite(station: EditRadioStation) {
            const index = this.favorites.findIndex(
                (station: EditRadioStation) =>
                    station.changeuuid === station.changeuuid
            );

            if (index !== -1) {
                this.favorites[index] = { ...station };
                this.saveFavorites();
            }
        },
        toggleFavorite(station: RadioStation) {
            if (
                this.favorites.some(
                    (s: RadioStation) => s.changeuuid === station.changeuuid
                )
            ) {
                this.removeFavorite(station);
            } else {
                this.addFavorite(station);
            }
        },
        saveFavorites() {
            localStorage.setItem("favorites", JSON.stringify(this.favorites));
        },
    },
});
