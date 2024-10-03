<script lang="ts">
    import { type Card } from "../game-state";
    import { dndzone } from "svelte-dnd-action";
    import CardC from "./CardC.svelte";
    import { dragTransform } from "../common";
    import { placeAtEnd } from "../util";

    export let area: Card[];
    export let name: string;
    export let dragType: string;

    function handle(e) {
        area = placeAtEnd(area, e.detail.items);
    }

    function updateCard() {
        area = area;
    }
</script>

<div class="flex h-full flex-col">
    {name}
    <div
        use:dndzone={{
            items: area,
            type: dragType,
            transformDraggedElement: dragTransform,
            dropAnimationDisabled: true,
        }}
        on:consider={handle}
        on:finalize={handle}
        class="flex h-full min-w-[8.5rem] max-w-[8.5rem] flex-col gap-x-1"
    >
        {#each area as card (card.id)}
            <CardC {card} {updateCard} />
        {/each}
    </div>
</div>
