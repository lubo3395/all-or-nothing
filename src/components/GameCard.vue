<template>
    <div class="game-card" :class="{ flipped: card.state === 'hidden' }" @click="flipCard">
        <div class="bg"></div>
        <div class="face">
            <span>{{ card.value }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Card } from "../types/types";
const props = defineProps<{
    card: Card;
}>();
const emits = defineEmits<{
    (e: "flip", payload: Card): void;
}>();
const flipCard = () => {
    emits("flip", {
        id: props.card.id,
        value: props.card.value,
        state: props.card.state,
    });
};
</script>

<style lang="scss" scoped></style>
