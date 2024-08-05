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
    Reality
    <div
        use:dndzone={{ items: area, dropFromOthersDisabled: dropDisabled }}
        on:consider={handle}
        on:finalize={handle}
        class="grid max-h-[13.25rem] min-h-[12rem] min-w-[20rem] grid-cols-6 gap-x-1 overflow-hidden"
    >
        {#each area as c, i (c.id)}
            <!-- {#if i >= 6 || area.length <= 6} -->
            <CardC card={c} />
            <!-- {:else}
                <CardC
                    card={c}
                    extraClasses="!h-[2rem] border-b-0 rounded-b-none"
                />
            {/if} -->
        {/each}
    </div>
    <!-- <div
        use:dndzone={{ items: area, dropFromOthersDisabled: dropDisabled }}
        on:consider={handle}
        on:finalize={handle}
        class="flex min-w-[6rem] flex-row"
    >
        {#each area as c, i (c.id)}
            <CardC card={c} extraClasses="" />
            {#if i >= 6}
                <div class="h-0 basis-full" />
            {/if}
        {/each}
    </div> -->
</div>
