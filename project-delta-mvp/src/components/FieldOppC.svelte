<script lang="ts">
    import RealityC from "./RealityC.svelte";
    import StackC from "./StackC.svelte";
    import type { PlayArea } from "../game-state";
    import AreaC from "./AreaC.svelte";

    export let playArea: PlayArea;
</script>

<div class="flex flex-row gap-1">
    <div class="flex flex-col">
        <div class="max-w-fit rounded border border-black p-1">
            <RealityC bind:area={playArea.reality} />
        </div>
        <div class="flex min-w-fit flex-row">
            <div class="h-fit rounded border border-black p-1">
                <AreaC name="Combat" bind:area={playArea.combatArea} />
            </div>
            <div class="h-fit rounded border border-black p-1">
                <StackC name="Memory" bind:deck={playArea.memDiscard} />
            </div>
        </div>
    </div>
    <div class="h-fit rounded border border-black p-1">
        <div class="flex flex-row gap-1">
            <StackC name="Channeled" bind:deck={playArea.channeled} />
            <StackC name="Void" bind:deck={playArea.voidPile} />
        </div>
        <div class="flex flex-row gap-1">
            <StackC name="Random" bind:deck={playArea.randomZone} />
            <StackC name="Deck" bind:deck={playArea.deck} />
        </div>
    </div>
</div>
