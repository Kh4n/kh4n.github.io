<script lang="ts">
    import { type Card } from "../game-state";
    import { dndzone } from "svelte-dnd-action";
    import CardC from "./CardC.svelte";
    import { dragTransform } from "../common";

    export let area: Card[];
    export let name: string;
    export let col: number = 6;
    export let dragType: string;
    export let isDream: boolean = false;

    function handle(e) {
        area = e.detail.items;
    }
</script>

<div>
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
        class="grid {isDream
            ? 'min-h-[6rem]'
            : 'min-h-[6rem]'} min-w-[8.5rem] gap-x-1"
        style="grid-template-columns: repeat({col}, 8.5rem)"
    >
        {#each area as card, i (card.id)}
            <CardC {card} />
        {/each}
    </div>
</div>
