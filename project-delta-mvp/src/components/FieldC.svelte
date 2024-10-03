<script lang="ts">
    import RealityC from "./RealityC.svelte";
    import StackC from "./StackC.svelte";
    import type { Card, PlayArea } from "../game-state";
    import AreaC from "./AreaC.svelte";

    export let playArea: PlayArea;
    export let hand: Card[];
</script>

<div class="flex flex-col gap-1">
    <div class="flex flex-row gap-1">
        <div class="min-w-2/3 rounded border border-black p-1">
            <AreaC
                name="Combat"
                dragType="player"
                bind:area={playArea.combatArea}
            />
        </div>
        <div class="min-w-1/3 rounded border border-black p-1">
            <StackC
                name="Memory"
                dragType="player"
                bind:deck={playArea.memDiscard}
            />
        </div>
    </div>
    <div class="flex flex-row gap-1">
        <div class="flex flex-col gap-1">
            <div class="rounded border border-black p-1">
                <RealityC dragType="player" bind:area={playArea.reality} />
            </div>
            <div class="rounded border border-black p-1">
                <AreaC name="Hand" dragType="player" bind:area={hand} />
            </div>
        </div>
        <div class="flex h-fit flex-col gap-1 rounded border border-black p-1">
            <div class="flex flex-row gap-1">
                <StackC
                    name="Channeled"
                    dragType="player"
                    bind:deck={playArea.channeled}
                />
                <StackC
                    name="Void"
                    dragType="player"
                    bind:deck={playArea.voidPile}
                />
            </div>
            <div class="flex flex-row gap-1">
                <StackC
                    name="Random"
                    dragType="player"
                    bind:deck={playArea.randomZone}
                />
                <StackC
                    name="Deck"
                    dragType="player"
                    bind:deck={playArea.deck}
                />
            </div>
        </div>
    </div>
</div>
