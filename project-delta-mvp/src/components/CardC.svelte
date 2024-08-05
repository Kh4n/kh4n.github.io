<script lang="ts">
    import { type CardSpace } from "../game-state";

    export let card: CardSpace;
    export let extraClasses: string = "";
</script>

<div class="h-[8.5rem] w-[6rem] rounded border border-black {extraClasses}">
    {card.name}
    {card.cost}
    <!-- {card.source}
    {card.subtype}
    {card.speed}
    {card.stats.type}
    {card.rulesTxt}
    {card.faceDown} -->
</div>
