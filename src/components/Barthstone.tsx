import React, {useEffect, useState} from 'react'
import Hand from "./Hand";
import styled from "styled-components";
import {Card, GameCard, GameCardId, GamePlayer, nullGameCard, Player} from "../game_data/gameTypes"
import {range} from "../game_data/utils";
import {playerToGame} from "../game_data/convertTypes";
import {drawCard} from "../game_data/playerFuncs";
import Game from "./Game";
import cards from "../game_data/cards";

const player1: Player = {
    name: "Jonathan",
    deck: cards.slice(0, 6)
}

const player2: Player = {
    name: "Anna",
    deck: cards.slice(6, 10)
}

const Barthstone: React.FC = () => {
    
    return (
        <Game players={[player1, player2]}/>
    )
}

export default Barthstone