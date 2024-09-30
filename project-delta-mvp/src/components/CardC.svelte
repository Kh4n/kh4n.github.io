<script lang="ts">
    import { type Card } from "../game-state";
    import { SHADOW_ITEM_MARKER_PROPERTY_NAME } from "svelte-dnd-action";

    export let card: Card;
    export let extraClasses: string = "";
    export let disableHover: boolean = false;

    let isHovering: boolean = false;

    export const baseStyle =
        "text-sm flex flex-col justify-center items-center h-[6rem] w-[8.5rem] rounded border border-black bg-white relative";
    const hoverStyle =
        "pt-2 -mb-[6rem] -ml-[2.75rem] -mt-[6rem] z-20 min-w-[14rem] min-h-[18rem] object-cover";
    const shadowStyle = "!visible opacity-100 shadow shadow-red-500";
    $: isShadow = card[SHADOW_ITEM_MARKER_PROPERTY_NAME];
    $: style = `${baseStyle} ${
        disableHover || isShadow || !isHovering ? "" : hoverStyle
    } ${isShadow ? shadowStyle : ""} ${extraClasses}`;

    function mouseEnter() {
        isHovering = true;
    }
    function mouseLeave() {
        isHovering = false;
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div class={style}>
    {#if isHovering}
        <div class="absolute top-2">
            {card.name}
        </div>
        <div class="h-5" />
        <div class="items-center p-2 text-xs">
            {card.rulesText}
        </div>
        <div class="absolute left-1 top-1 flex flex-col">
            <div>
                {card.cost}
            </div>
            <div>
                {card.speed}
            </div>
        </div>
        {#if !Number.isNaN(card.offense)}
            <div class="absolute bottom-1 left-1 flex flex-col">
                {card.offense}
            </div>
        {/if}
        {#if !Number.isNaN(card.defense)}
            <div class="absolute bottom-1 right-1 flex flex-col">
                {card.defense}
            </div>
        {/if}
    {:else}
        {card.name}
        <div class="absolute left-1 top-1">
            {card.cost}
        </div>
    {/if}
    <div
        class="absolute h-[6rem] w-[8.5rem]"
        on:mouseover={mouseEnter}
        on:mouseleave={mouseLeave}
        on:drag={mouseLeave}
    />
</div>
