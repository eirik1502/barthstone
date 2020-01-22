import React from "react"
import styled from "styled-components"

const AttributeField = styled.div`
  width: 32px;
  height: 32px;
  background-color: #1c3bfb;
  border-radius: 32px;
  border: black solid 2px;
  font-size: 32px;
  text-align: center;
`

export const DefenceField = styled(AttributeField)`
  background-color: #1c3bfb;
`

export const DamageField = styled(AttributeField)`
  background-color: #fb1a18;
`
export const CostField = styled(AttributeField)`
  background-color: #00a06b;
`
