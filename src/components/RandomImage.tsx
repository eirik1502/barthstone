import React, { ReactElement, ReactNode, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { range } from "../utils/utils"

const imgSize = [128, 96]
const imgUrl = `https://source.unsplash.com/random/${imgSize[0]}x${imgSize[1]}/`

const RandomImage: React.FC = () => {
  return <img src={imgUrl} />
}

export default RandomImage
