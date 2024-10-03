<script lang="ts">
    import { BATTLEFIELD_SIZE, type Card } from "../game-state";
    import CardC from "./CardC.svelte";
    import { dndzone } from "svelte-dnd-action";
    import { dragTransform } from "../common";

    export let area: Card[];
    export let dragType: string;

    const ordering = {
        "Unit": 0,
        "Item": 1,
        "Claim": 2,
    };
    function getOrder(c: Card) {
        if (ordering[c.type] === undefined) return 100;
        return ordering[c.type];
    }

    function comparator(a: Card, b: Card) {
        return getOrder(a) - getOrder(b);
    }

    function handle(e) {
        area = e.detail.items.sort(comparator);
    }

    function updateCard() {
        area = area;
    }

    $: dropDisabled = area.length >= BATTLEFIELD_SIZE;
</script>

<div>
    Reality
    <div
        use:dndzone={{
            items: area,
            dropFromOthersDisabled: dropDisabled,
            type: dragType,
            flipDurationMs: 200,
            transformDraggedElement: dragTransform,
            dropAnimationDisabled: true,
        }}
        on:consider={handle}
        on:finalize={handle}
        style="grid-template-columns: repeat(6, 8.5rem);"
        class="grid max-h-[13.25rem] min-h-[12rem] min-w-[51rem] gap-1"
    >
        {#each area as c, i (c.id)}
            <CardC card={c} {updateCard} />
        {/each}
    </div>
</div>
