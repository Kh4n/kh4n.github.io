<script lang="ts">
    import { onMount } from "svelte";
    import { getCards } from "./card-data";
    import AreaC from "./components/AreaC.svelte";
    import FieldC from "./components/FieldC.svelte";
    import FieldOppC from "./components/FieldOppC.svelte";
    import { Card, type PlayArea } from "./game-state";
    import { type DataConnection, Peer } from "peerjs";
    import { createTurnOrder, type NetMessage } from "./net";

    let player: PlayArea = {
        reality: [],
        channeled: [],
        combatArea: [],
        deck: [],
        hand: [],
        memDiscard: [],
        randomZone: [],
        voidPile: [],
    };

    let opponent: PlayArea = {
        reality: [],
        channeled: [],
        combatArea: [],
        deck: [],
        hand: [],
        memDiscard: [],
        randomZone: [],
        voidPile: [],
    };
    let dream: Card[] = [];

    onMount(async function () {
        let cards = await getCards();
        console.log(cards);
        player.deck = cards.slice(0, 12);
    });

    let connected = false;
    let playerId: string = undefined;
    let opponentId: string = undefined;
    let turnOrder = createTurnOrder();
    let ourTurn: boolean = false;
    let peer = new Peer();

    connected = true;
    playerId = "";
    peer.on("open", function (id) {
        playerId = id;
    });
    function setupConn(conn: DataConnection) {
        console.log("connected");
        conn.on("data", function (data: NetMessage) {
            console.log("Received", data);
            switch (data.type) {
                case "turn_order": {
                    ourTurn = turnOrder.flip > data.flip;
                    break;
                }
            }
        });
        conn.on("open", function () {
            conn.send(turnOrder);
        });
        connected = true;
    }
    peer.on("connection", setupConn);
</script>

{#if playerId === undefined}
    <div>Waiting to initiate...</div>
{:else if !connected}
    <div>Send your ID to the other player:</div>
    <div class="w-fit rounded border border-black">{playerId}</div>
    <input bind:value={opponentId} />
    <button on:click={() => setupConn(peer.connect(opponentId))}>
        Connect!
    </button>
{:else}
    {#if ourTurn}
        <button class="absolute right-2 top-2">Send</button>
    {:else}
        <button class="absolute right-2 top-2" disabled>
            Waiting for other player
        </button>
    {/if}
    <div
        class="flex h-screen max-h-screen min-w-[65rem] flex-row gap-2 p-1 pl-24 pt-24"
    >
        <div class="rounded border border-black">
            <AreaC
                name="Dream"
                dragType="player"
                isDream={true}
                bind:area={dream}
                col={1}
            />
        </div>
        <div class="flex flex-col gap-1">
            <div class="shrink-0 border-b border-black pb-1">
                <FieldOppC bind:playArea={opponent} />
            </div>
            <div class="shrink-0">
                <FieldC bind:playArea={player} />
            </div>
        </div>
    </div>
{/if}

<style lang="postcss">
    :global(button) {
        @apply rounded border border-black bg-white px-2 py-0.5;
    }
    :global(button:hover) {
        @apply drop-shadow-md;
    }
    :global(button:active) {
        @apply ring-2 drop-shadow-md;
    }
    :global(input) {
        @apply rounded border border-black bg-white;
    }
</style>
