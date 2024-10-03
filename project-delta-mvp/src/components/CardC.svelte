<script lang="ts">
    import { type Card } from "../game-state";
    import { SHADOW_ITEM_MARKER_PROPERTY_NAME } from "svelte-dnd-action";

    export let card: Card;
    export let extraClasses: string = "";
    export let forceDisableHover: boolean = false;
    export let updateCard: () => void;

    $: isFacedown = card.state === "Facedown";
    $: isActive = card.state === "Active";
    $: disableHover = forceDisableHover || isFacedown;

    let isHovering: boolean = false;
    let isEditing: boolean = false;
    $: isExpanded = isHovering || isEditing;

    const borders = {
        "m": "rgb(22 163 74)",
        "a": "rgb(147 51 234)",
        "z": "rgb(220 38 38)",
        "e": "rgb(202 138 4)",
        "o": "rgb(37 99 235)",
    };
    const borderFallback = "border-color: rgb(0 0 0);";
    let borderStyle = borderFallback;
    if (/^[mazeo].*$/.test(card.source)) {
        borderStyle = `border-color: ${borders[card.source.charAt(0)]};`;
        if (borderStyle === undefined) {
            borderStyle = borderFallback;
        }
    } else if (/^<[mazeo][mazeo]>$/.test(card.source)) {
        let tl = borders[card.source.charAt(1)];
        let br = borders[card.source.charAt(2)];
        borderStyle = `border-color: ${tl} ${br} ${br} ${tl};`;
    }

    const linearGradient =
        "linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.65))";
    const backgroundSize =
        "background-size: cover; background-repeat: no-repeat";
    $: backgroundStyle = `background: ${linearGradient}, url('/img/${card.name}.png'), url('/_FALLBACK.png'); ${backgroundSize};`;
    $: isShadow = card[SHADOW_ITEM_MARKER_PROPERTY_NAME];
    $: style = `baseStyle ${
        disableHover || isShadow || !isExpanded ? "" : "hoverStyle"
    } ${isShadow ? "shadowStyle" : ""} ${isFacedown ? "card-facedown" : ""} ${
        isActive ? "activeStyle" : ""
    } ${isEditing ? "editingStyle" : ""} ${extraClasses}`;

    function mouseEnter() {
        isHovering = true;
    }
    function mouseLeave() {
        isHovering = false;
    }
    function activate(e: Event) {
        e.preventDefault();
        if (card.state !== "Facedown") {
            card.state = card.state === "Active" ? "Faceup" : "Active";
            updateCard();
        }
    }
    function flip(e: Event) {
        e.preventDefault();
        if (card.state !== "Active") {
            card.state = card.state === "Faceup" ? "Facedown" : "Faceup";
            updateCard();
        }
    }

    let waiting = false;
    let timeout = null;
    let delay = 250;
    function handleClickType(e: Event) {
        if (waiting) {
            clearTimeout(timeout);
            waiting = false;
            flip(e);
            return;
        }
        waiting = true;
        timeout = setTimeout(() => {
            waiting = false;
            isEditing = !isEditing;
        }, delay);
    }

    function changeOffense(inc: number) {
        card.offense += inc;
        updateCard();
    }
    function changeDefense(inc: number) {
        card.defense += inc;
        updateCard();
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
    class={style}
    on:contextmenu={activate}
    style="{isFacedown ? '' : backgroundStyle} {borderStyle}"
>
    {#if isExpanded && !isFacedown}
        <div class="absolute top-2 text-white">
            {card.name}
        </div>
        <div class="h-5" />
        <div class="items-center p-2 text-xs">
            {card.rulesText}
        </div>
        <div class="absolute left-1 top-1 flex flex-col">
            {#if Number.isInteger(card.cost)}
                <div>
                    {card.cost}
                </div>
            {/if}
            {#if Number.isInteger(card.speed)}
                <div>
                    {card.speed}
                </div>
            {/if}
        </div>
        {#if Number.isInteger(card.offense)}
            <div class="absolute bottom-1 left-1 flex flex-row">
                <div>
                    {card.offense}
                </div>
                {#if isEditing}
                    <div
                        class="ml-1 flex flex-col justify-evenly gap-0 text-[0.5rem] leading-[0.5rem]"
                    >
                        <div
                            on:click={() => changeOffense(1)}
                            class="hover:cursor-pointer"
                        >
                            ▲
                        </div>
                        <div
                            on:click={() => changeOffense(-1)}
                            class="hover:cursor-pointer"
                        >
                            ▼
                        </div>
                    </div>
                {/if}
            </div>
        {/if}
        {#if Number.isInteger(card.defense)}
            <div class="absolute bottom-1 right-1 flex flex-row">
                <div>
                    {card.defense}
                </div>
                {#if isEditing}
                    <div
                        class="ml-1 flex flex-col justify-evenly gap-0 text-[0.5rem] leading-[0.5rem]"
                    >
                        <div
                            on:click={() => changeDefense(1)}
                            class="hover:cursor-pointer"
                        >
                            ▲
                        </div>
                        <div
                            on:click={() => changeDefense(-1)}
                            class="hover:cursor-pointer"
                        >
                            ▼
                        </div>
                    </div>
                {/if}
            </div>
        {/if}
    {:else if !isFacedown}
        {card.name}
        {#if Number.isInteger(card.cost)}
            <div class="absolute left-1 top-1">
                {card.cost}
            </div>
        {/if}
        {#if Number.isInteger(card.offense)}
            <div class="absolute bottom-1 left-1 flex flex-col">
                {card.offense}
            </div>
        {/if}
        {#if Number.isInteger(card.defense)}
            <div class="absolute bottom-1 right-1 flex flex-col">
                {card.defense}
            </div>
        {/if}
    {/if}
    <div
        class="absolute z-30 h-[6rem] w-[8.5rem]"
        on:mouseover={mouseEnter}
        on:mouseleave={mouseLeave}
        on:drag={mouseLeave}
        on:click={handleClickType}
    />
</div>

<style lang="postcss">
    .card-facedown {
        background: repeating-linear-gradient(
            45deg,
            #606dbc,
            #606dbc 10px,
            #465298 10px,
            #465298 20px
        );
    }

    .baseStyle {
        @apply relative flex h-[6rem] w-[8.5rem] flex-col items-center justify-center rounded border-4 border-black bg-contain bg-no-repeat text-sm text-white;
    }
    .hoverStyle {
        @apply z-20 -mb-[6rem] -ml-[2.75rem] -mt-[6rem] min-h-[18rem] min-w-[14rem] bg-white object-cover pt-2;
    }
    .activeStyle {
        box-shadow: 0px 0px 23px 1px #18e068;
    }
    .shadowStyle {
        @apply !visible opacity-100 shadow shadow-red-500;
    }
    .editingStyle {
        box-shadow: 0px 0px 23px 1px #f4c402;
    }
</style>
