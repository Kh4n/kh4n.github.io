<script lang="ts">
    import { type Card } from "../game-state";
    import {
        dndzone,
        SHADOW_ITEM_MARKER_PROPERTY_NAME,
    } from "svelte-dnd-action";
    import CardC from "./CardC.svelte";
    import { dragTransform } from "../common";

    export let deck: Card[];
    export let name: string;
    export let dragType: string;

    function placeAtEnd(orig: Card[], updated: Card[]) {
        for (let i = 0; i < updated.length - 1; ++i) {
            let cur = updated[i];
            let ind = orig.findIndex((v) => v.id === cur.id);
            if (ind === -1) {
                let tmp = updated[updated.length - 1];
                updated[updated.length - 1] = cur;
                updated[i] = tmp;
                return updated;
            }
        }
        return updated;
    }

    function handle(e) {
        deck = placeAtEnd(deck, e.detail.items);
    }
</script>

<div>
    {name}
    <div class="flex w-[9rem] rounded shadow-inner">
        {#if deck.length > 1}
            <div>
                <CardC
                    card={deck[deck.length - 2]}
                    extraClasses={"-mr-[8rem] -z-10 relative pointer-events-none"}
                />
            </div>
        {/if}
        <div
            use:dndzone={{
                items: deck,
                type: dragType,
                transformDraggedElement: dragTransform,
                dropAnimationDisabled: true,
            }}
            on:consider={handle}
            on:finalize={handle}
            class="flex h-[6rem] w-[8.5rem]"
        >
            {#each deck as c, i (c.id)}
                {#if i === deck.length - 1}
                    <CardC card={c} />
                {:else}
                    <div />
                {/if}
            {/each}
        </div>
    </div>
</div>
