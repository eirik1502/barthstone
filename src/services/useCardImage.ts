import { CardId } from "../game_logic/gameTypes"
import { ReactNode, useEffect, useState } from "react"
import imageService from "./imageService"

export const useCardImage = (cardId: CardId) => {
  const [img, setImg] = useState<ReactNode | undefined>(undefined)

  useEffect(() => {
    imageService.addOnImgAddListener(cardId, img => setImg(img))
    return () => imageService.removeOnImgAddListener(cardId)
  }, [cardId])

  return img
}
