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
        class="grid min-h-[10rem] min-w-[10rem] gap-2"
        style="grid-template-columns: repeat({col}, minmax(0, 1fr))"
    >
        {#each area as card (card.id)}
            <CardC {card} />
        {/each}
    </div>
</div>
