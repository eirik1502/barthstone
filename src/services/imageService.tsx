import { CardId } from "../game_logic/gameTypes"
import React, { ReactNode, useEffect, useState } from "react"

class ImageService {
  imgs: { [key: string]: ReactNode }
  count: number
  onImgAddListeners: { [key: string]: (img: ReactNode) => void }

  constructor() {
    this.imgs = {}
    this.count = 0
    this.onImgAddListeners = {}
  }

  numImgs = (): number => this.count

  addImg = (cardId: CardId, url: string) => {
    this.imgs[cardId] = <img src={url} alt={""} />
    this.count++
    new Image().src = url
    if (this.onImgAddListeners.hasOwnProperty(cardId)) {
      this.onImgAddListeners[cardId](this.getImg(cardId))
    }
  }

  hasImg = (cardId: CardId) => this.imgs.hasOwnProperty(cardId)

  getImg = (cardId: CardId) => {
    console.dir(this.imgs[cardId])

    return this.hasImg(cardId) ? this.imgs[cardId] : React.createElement("img")
  }

  addOnImgAddListener = (cardId: CardId, listener: (img: ReactNode) => void) => {
    this.onImgAddListeners[cardId] = listener
    if (this.hasImg(cardId)) {
      listener(this.getImg(cardId))
    }
  }
  removeOnImgAddListener = (cardId: CardId) => {
    delete this.onImgAddListeners[cardId]
  }
}
export default new ImageService()
