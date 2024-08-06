<script lang="ts">
    import { getCards } from "./card-data";
    import AreaC from "./components/AreaC.svelte";
    import FieldC from "./components/FieldC.svelte";
    import FieldOppC from "./components/FieldOppC.svelte";
    import { BATTLEFIELD_SIZE, Card, type PlayArea } from "./game-state";
    import { onMount } from "svelte";

    let cards: Card[] = [];
    let cardsOpp: Card[] = [];

    let player: PlayArea = {
        reality: [],
        channeled: [],
        combatArea: [],
        deck: [],
        hand: [],
        memDiscard: [],
        randomZone: [],
        voidPile: [],
    };

    let opponent: PlayArea = {
        reality: [],
        channeled: [],
        combatArea: [],
        deck: [],
        hand: [],
        memDiscard: [],
        randomZone: [],
        voidPile: [],
    };
    let dream: Card[] = [];

    onMount(async function () {
        let cards = await getCards();
        // console.log(cards);
        player.reality = cards.slice(0, 12);
        opponent.reality = cards.slice(12, 24);
    });
</script>

<div class="flex h-screen max-h-screen min-w-[65rem] flex-row gap-2 p-1">
    <div class="shrink-0 rounded border border-black">
        <AreaC name="Dream" bind:area={dream} col={1} />
    </div>
    <div class="flex flex-col gap-1">
        <div class="shrink-0 border-b border-black pb-1">
            <FieldOppC bind:playArea={opponent} />
        </div>
        <div class="shrink-0">
            <FieldC bind:playArea={player} />
        </div>
    </div>
</div>
