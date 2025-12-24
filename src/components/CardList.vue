<template>
    <div class="card-list">
        <!-- 4 x 4 静态卡牌布局 -->
        <TransitionGroup name="fade" tag="div" class="card-grid">
            <GameCard
                v-for="card in cards"
                :key="card.id"
                :card="card"
                @flip="game.flipCard(card.id)"
            />
        </TransitionGroup>

        <div class="btn-group">
            <button @click="game.resetGame()">重置游戏</button>
            <button @click="shuffleCards()">洗牌</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { generateCards, sleep } from "../utils/tools";
import { createGameController } from "../core/gameController";
import type { Card } from "../types/types";
import GameCard from "./GameCard.vue";

// const symbols = ["A", "B", "C", "D", "E", "F", "G", "H"];
// const symbols = ["♠", "♥", "♦", "♣", "★", "☀", "☂", "☃"];
// const symbols = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"];
const symbols = ["🍎", "🍌", "🍇", "🍉", "🍓", "🍒", "🥝", "🍍"];
const cards = ref<Card[]>([]);
let game: ReturnType<typeof createGameController>;

// 模拟洗牌过程
async function shuffleCards() {
    const shuffleTimes = 4; // 洗牌次数
    const waitTime = 500; // 每次变化的等待时间（毫秒）
    for (let i = 0; i < shuffleTimes; i++) {
        cards.value = generateCards(4, symbols);
        await sleep(waitTime);
    }
    initGame();
}
function initGame() {
    cards.value = generateCards(4, symbols);
    game = createGameController(cards.value, {
        onFlip(card: Card) {
            // 翻牌事件
            console.log("Card flipped:", card);
        },
        onMatch(pair: [Card, Card]) {
            // 匹配成功
            console.log("Match found:", pair);
        },
        onFail() {
            // 匹配失败
        },
        onReset() {
            // 游戏重置
        },
        onWin() {
            console.log("You win!");
            alert("恭喜你，游戏胜利！");
        },
    });
}
onMounted(() => {
    initGame();
});
</script>

<style lang="scss" scoped>
/* 1. 声明过渡效果 */
.fade-move,
.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. 声明进入和离开的状态 */
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: scaleY(0.01) translate(30px, 0);
}

/* 3. 确保离开的项目被移除出了布局流
      以便正确地计算移动时的动画效果。 */
.fade-leave-active {
    position: absolute;
}
</style>
