import { RawCard } from "../game_logic/gameTypes"

const allCardsUrl = "http://localhost:3001/api/hearthstoneCards"

export const heartstoneCards = (): Promise<RawCard[]> =>
  fetch(allCardsUrl, {
    headers: {
      mode: "no-cors",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  })
    .then(res => res.json())
    .then((cards: any[]) => {
      const minionCards = cards.filter(card => card.type === "MINION")
      return minionCards.map(hsCard => ({
        id: hsCard.id,
        name: hsCard.name,
        image: `https://art.hearthstonejson.com/v1/256x/${hsCard.id}.jpg`,
        description: hsCard.text,
        cost: hsCard.cost,
        damage: hsCard.attack,
        defence: hsCard.health,
      }))
    })
