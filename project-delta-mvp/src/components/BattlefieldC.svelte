<script lang="ts">
    import { BATTLEFIELD_SIZE, type Card } from "../game-state";
    import CardC from "./CardC.svelte";
    import { dndzone } from "svelte-dnd-action";

    export let area: Card[];

    function handle(e) {
        area = e.detail.items;
    }

    $: dropDisabled = area.length >= BATTLEFIELD_SIZE;
</script>

<div>
    Battlefield
    <div
        use:dndzone={{ items: area, dropFromOthersDisabled: dropDisabled }}
        on:consider={handle}
        on:finalize={handle}
        class="grid min-h-[10rem] min-w-[20rem] grid-cols-6 gap-2"
    >
        {#each area as c (c.id)}
            <CardC card={c} />
        {/each}
    </div>
</div>
