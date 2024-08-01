<script lang="ts">
    import BattlefieldC from "./BattlefieldC.svelte";
    import StackC from "./StackC.svelte";
    import type { PlayArea } from "../game-state";
    import AreaC from "./AreaC.svelte";

    export let playArea: PlayArea;
</script>

<div class="flex flex-col gap-1">
    <div class="flex flex-row gap-1">
        <div class="min-w-2/3 rounded border border-black p-1">
            <AreaC name="Combat" bind:area={playArea.combatArea} />
        </div>
        <div class="min-w-1/3 rounded border border-black p-1">
            <StackC name="Memory" bind:deck={playArea.memDiscard} />
        </div>
    </div>
    <div class="flex flex-row gap-1">
        <div class="rounded border border-black p-1">
            <BattlefieldC bind:area={playArea.battleField} />
        </div>
        <div class="flex flex-col gap-1 rounded border border-black p-1">
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
    <div class="flex flex-row gap-1">
        <div class="rounded border border-black p-1">
            <AreaC name="Hand" bind:area={playArea.hand} />
        </div>
    </div>
</div>
