import React, { useEffect, useState } from "react"
import cards from "../game_data/cards"
import { RawPlayer } from "../game_logic/gameTypes"
import Game from "./Game"
import { BarthstoneProvider } from "../game_logic/api/core"

const player1: RawPlayer = {
  name: "Jonathan",
  deck: cards.slice(0, 6),
}

const player2: RawPlayer = {
  name: "Anna",
  deck: cards.slice(6, 10),
}

const Barthstone: React.FC = () => {
  return (
    <BarthstoneProvider>
      <Game players={[player1, player2]} />
    </BarthstoneProvider>
  )
}

export default Barthstone
