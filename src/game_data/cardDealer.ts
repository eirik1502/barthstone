import { RawCard } from "../game_logic/gameTypes"

const pickRandomNoPutBack = (list: any[], count: number = 1) => {
  let rest: any[] = [...list]
  let picks: any[] = []
  for (let i = 0; i < count; i++) {
    const randIndex = Math.floor(Math.random() * rest.length)
    picks = [...picks, rest[randIndex]]
    rest = [
      ...rest.slice(0, randIndex),
      ...(randIndex !== rest.length - 1 ? rest.slice(randIndex + 1) : []),
    ]
  }
  return [picks, rest]
}

export const dealTwoDecksOfSize = (cards: RawCard[], size: number) => {
  const maxSize = Math.floor(cards.length / 2)
  const actualSize = Math.min(maxSize, size)
  const [deck1, restCards] = pickRandomNoPutBack(cards, actualSize)
  const [deck2, restCards2] = pickRandomNoPutBack(restCards, actualSize)
  return [deck1, deck2]
}
