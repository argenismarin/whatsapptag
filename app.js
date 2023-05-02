const qrcode = require("qrcode-terminal");
const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.initialize();

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("authenticated", () => {
  console.log("AUTHENTICATED");
});

client.on("ready", () => {
  console.log("Client is ready!");
});

//Replying Messages with image from url
client.on("message", async (message) => {
  const chat = await message.getChat();
  if (!chat.isGroup) {
    if (message.body.toLowerCase() === "hellooooo") {
      await chat.sendMessage("Identificate en esta mondá");
    }
  } else if (
    (message.body.split(" ").includes("!mondachikita") ||
      message.body.split(" ").includes("!mondaquera")) &&
    chat.isGroup
  ) {
    let text = "";
    let mentions = [];

    for (let participant of chat.participants) {
      const contact = await client.getContactById(participant.id._serialized);

      mentions.push(contact);
      text += `@${participant.id.user} `;
    }

    await chat.sendMessage(text, { mentions });
  }
});
