<script lang="ts">
    import { onMount } from "svelte";
    import { getCards } from "./card-data";
    import FieldC from "./components/FieldC.svelte";
    import FieldOppC from "./components/FieldOppC.svelte";
    import { Card, type GameState, type PlayArea } from "./game-state";
    import { type DataConnection, Peer } from "peerjs";
    import { createStateChange, createTurnOrder, type NetMessage } from "./net";
    import ColumnC from "./components/ColumnC.svelte";

    let state: GameState = {
        player: {
            reality: [],
            channeled: [],
            combatArea: [],
            deck: [],
            memDiscard: [],
            randomZone: [],
            voidPile: [],
        },

        opponent: {
            reality: [],
            channeled: [],
            combatArea: [],
            deck: [],
            memDiscard: [],
            randomZone: [],
            voidPile: [],
        },
        dream: [],
    };
    let hand: Card[] = [];

    let hasMounted = false;
    onMount(async function () {
        let cards = await getCards();
        console.log(cards);
        state.player.deck = cards.slice(0, 12);
        state.player.deck.forEach((e) => (e.state = "Facedown"));
        hasMounted = true;
    });

    $: stateChange(state);

    function stateChange(state: GameState) {
        if (!hasMounted || !connected || connection === undefined || !ourTurn) {
            return;
        }
        connection.send(createStateChange(state));
    }

    let connected = false;
    let playerId: string = undefined;
    let opponentId: string = undefined;
    let turnOrder = createTurnOrder();
    let ourTurn: boolean = false;
    let peer = new Peer();
    let connection: DataConnection = undefined;

    // connected = true;
    // playerId = "";

    peer.on("open", function (id) {
        playerId = id;
    });
    function setupConn(conn: DataConnection) {
        console.log("connected");

        connection = conn;
        conn.on("data", function (data: NetMessage) {
            console.log("Received", data);
            switch (data.type) {
                case "turn_order": {
                    ourTurn = turnOrder.flip > data.flip;
                    break;
                }
                case "state_change": {
                    state.player = data.state.opponent;
                    state.opponent = data.state.player;
                    break;
                }
                case "end_turn": {
                    ourTurn = true;
                }
            }
        });
        conn.on("open", function () {
            conn.send(turnOrder);
        });
        connected = true;
    }
    peer.on("connection", setupConn);

    function endTurn() {
        ourTurn = false;
        connection.send({ type: "end_turn" } as NetMessage);
    }
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
        <button class="absolute right-2 top-2" on:click={endTurn}
            >End Turn</button
        >
    {:else}
        <button class="absolute right-2 top-2" disabled>
            Waiting for other player
        </button>
    {/if}
    <div
        class="flex h-screen max-h-screen min-w-[65rem] flex-row gap-2 p-1 pl-24 pt-24 {ourTurn
            ? ''
            : 'pointer-events-none'}"
    >
        <div class="rounded border border-black">
            <ColumnC name="Dream" dragType="player" bind:area={state.dream} />
        </div>
        <div class="flex flex-col gap-1">
            <div class="shrink-0 border-b border-black pb-1">
                <FieldOppC bind:playArea={state.opponent} />
            </div>
            <div class="shrink-0">
                <FieldC bind:playArea={state.player} bind:hand />
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
