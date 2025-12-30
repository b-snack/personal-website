# View All messages
mongosh
use portfolio
db.messages.find().pretty()

## Delete specific msg
db.messages.deleteOne({ _id: ObjectId("PUT_ID_HERE") })

## Delete all msgs from a user
db.messages.deleteMany({ name: "Spammer" })

## Delete (general)
DELETE http://localhost:3001/api/messages/MESSAGE_ID