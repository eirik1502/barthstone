const express = require("express")
const fetch = require("node-fetch")
const cors = require("cors")

const app = express()
const port = 3001

const allCardsUrl = "https://api.hearthstonejson.com/v1/25770/enUS/cards.collectible.json"

app.use(cors())

app.get("/api/hearthstoneCards", (req, res) =>
  fetch(allCardsUrl)
    .then(r => r.json())
    .then(cards => res.json(cards)),
)

app.listen(port, () => console.log(`Server listening on port ${port}!`))
