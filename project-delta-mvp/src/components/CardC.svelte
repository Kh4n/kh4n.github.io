<script lang="ts">
    import { type CardSpace } from "../game-state";

    export let card: CardSpace;
    export let blank: boolean = false;
    export let extraClasses: string = "";
</script>

<div class="h-40 max-w-[7rem] rounded border border-black {extraClasses}">
    {#if card !== undefined}
        <div>
            {#if !blank}
                {card.name}
                {card.cost}
                {card.source}
                {card.subtype}
                {card.speed}
                {card.stats.type}
                {card.rulesTxt}
                {card.faceDown}
            {/if}
        </div>
    {/if}
</div>
