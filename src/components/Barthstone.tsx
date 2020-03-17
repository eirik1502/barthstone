import React, { useEffect, useState } from "react"
import cards from "../game_data/cards"
import { RawPlayer } from "../game_logic/gameTypes"
import Game from "./Game"
import { BarthstoneProvider } from "../game_logic/api/core"
import { range } from "../utils/utils"
import { dealTwoDecksOfSize } from "../game_data/cardDealer"
import { heartstoneCards } from "../game_data/hearthstoneCards"

const Barthstone: React.FC = () => {
  const [players, setPlayers] = useState<RawPlayer[]>([])

  useEffect(() => {
    heartstoneCards().then(cards => {
      const decks = dealTwoDecksOfSize(cards, 10)

      setPlayers([
        {
          name: "Jonathan",
          deck: decks[0],
        },
        {
          name: "Anna",
          deck: decks[1],
        },
      ])
    })
  }, [])

  return players.length === 2 ? (
    <BarthstoneProvider>
      <Game players={[players[0], players[1]]} />
    </BarthstoneProvider>
  ) : (
    <h1>Loading cards...</h1>
  )
}

export default Barthstone
