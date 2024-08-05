<script lang="ts">
    import { type Card } from "../game-state";
    import { dndzone } from "svelte-dnd-action";
    import CardC from "./CardC.svelte";
    export let area: Card[];
    export let name: string;
    export let col: number = 6;

    function handle(e) {
        area = e.detail.items;
    }
</script>

<div>
    {name}
    <div
        use:dndzone={{ items: area }}
        on:consider={handle}
        on:finalize={handle}
        class="grid min-h-[8.5rem] min-w-[6rem] gap-x-1"
        style="grid-template-columns: repeat({col}, minmax(0, 1fr))"
    >
        {#each area as card, i (card.id)}
            <!-- {#if Math.floor(i / 6) == Math.floor(area.length / 6)}
                <CardC {card} extraClasses="!h-[4.25rem]" />
            {:else}
                <CardC {card} />
            {/if} -->
            <CardC {card} />
        {/each}
    </div>
</div>
