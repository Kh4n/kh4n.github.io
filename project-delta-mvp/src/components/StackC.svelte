<script lang="ts">
    import { type Card } from "../game-state";
    import { dndzone } from "svelte-dnd-action";
    import CardC from "./CardC.svelte";
    import { dragTransform } from "../common";
    import { placeAtEnd } from "../util";

    export let deck: Card[];
    export let name: string;
    export let dragType: string;

    function handle(e) {
        deck = placeAtEnd(deck, e.detail.items);
    }

    function updateCard() {
        deck = deck;
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
                    {updateCard}
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
                    <CardC card={c} {updateCard} />
                {:else}
                    <div />
                {/if}
            {/each}
        </div>
    </div>
</div>
