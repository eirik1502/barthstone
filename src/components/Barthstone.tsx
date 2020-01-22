import React, { useEffect, useState } from "react"
import cards from "../game_data/cards"
import { RawPlayer } from "../game_logic/gameTypes"
import Game from "./Game"
import { BarthstoneProvider } from "../game_logic/api/core"
import { range } from "../utils/utils"

const cardCount = cards.length
const halfCardCount = Math.floor(cardCount / 2)
const cardStack = [...cards]

const pickRandomCard = () => {
  const pickCardIndex = Math.floor(Math.random() * cardStack.length)
  const pickCard = cardStack[pickCardIndex]
  cardStack.splice(pickCardIndex, 1)
  return pickCard
}

const pickCardsAtRandom = (amount: number) => range(amount).map(i => pickRandomCard())

const player1: RawPlayer = {
  name: "Jonathan",
  deck: pickCardsAtRandom(halfCardCount),
}

const player2: RawPlayer = {
  name: "Anna",
  deck: pickCardsAtRandom(cardStack.length),
}

const Barthstone: React.FC = () => {
  return (
    <BarthstoneProvider>
      <Game players={[player1, player2]} />
    </BarthstoneProvider>
  )
}

export default Barthstone
