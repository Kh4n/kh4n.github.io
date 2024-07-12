<script lang="ts">
    import { type Card } from "../game-state";
    import { dndzone } from "svelte-dnd-action";
    import CardC from "./CardC.svelte";

    export let deck: Card[];
    export let name: string;

    // TODO: mega inefficient
    function comparator(a: Card, b: Card) {
        let aIn = deck.find((v) => v.id === a.id);
        let bIn = deck.find((v) => v.id === b.id);
        if (aIn && bIn) return 0;
        if (aIn && !bIn) return -1;
        if (!aIn && bIn) return 1;
        return 0;
    }

    function handle(e) {
        deck = e.detail.items.sort(comparator);
    }
    function consider(e) {
        deck = e.detail.items.sort(comparator);
    }
</script>

<div>
    {name}
    <div
        use:dndzone={{ items: deck }}
        on:consider={consider}
        on:finalize={handle}
        class="flex h-40 w-28 rounded shadow-inner"
    >
        {#each deck as c, i (c.id)}
            {#if i === deck.length - 1}
                <CardC card={c} />
            {:else if i === deck.length - 2}
                <CardC
                    card={c}
                    extraClasses="w-2 overflow-hidden border-r-0 rounded-r-none"
                />
            {:else}
                <div />
            {/if}
        {/each}
    </div>
</div>
