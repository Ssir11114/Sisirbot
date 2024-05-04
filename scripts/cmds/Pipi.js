const axios = require('axios');

module.exports = {
 config: {
 name: "pipi",
 aliases: ["gpt4"], 
 version: "1.0", 
 author: "Rizky Z (hadi)", 
 countDown: 6,
 role: 0,
 category: "MEDIA", 
 description: "bertanya dengan pipi ai", 
 usage: { en: "{pn} <question>" }
},

onStart: async function ({ message, args, api, event }) {
if (!args) return message.reply('Harap berikan pertanyaan!');

if (args) {
message.reaction("⌛", event.messageID);
 const arif = await message.reply('⌛ 𝙿𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝...');
 const id = event.senderID;
 const hadi = args.join(' ');
 const pipi = await axios.get(`https://deku-rest-api.replit.app/gpt4?prompt=${encodeURIComponent(hadi)}&uid=${id}`);
 const raffa = pipi.data.gpt4;

message.reaction("✔️", event.messageID);
api.editMessage(`🗨 𝐏𝐈𝐏𝐈 𝐀𝐈\n━━━━━━━━━\n${raffa}`, arif.messageID);
setTimeout(() => { 
api.unsendMessage(arif.messageID);
}, this.config.countDown * 360000);

} else if (error) {
 message.reaction("❕", event.messageID);
 return message.reply('⚠️ 𝚎𝚛𝚛𝚘𝚛!');
     }
}, 

onChat: async function ({ message, args, event, api }) {
if (event.messageReply && event.messageReply.senderID === global.botID) {
message.reaction("⌛", event.messageID);
 const rizky = await message.reply("⌛ 𝙿𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝...");
 const id = event.senderID;
 const hadi = args.join(' ');
 const pipi = await axios.get(`https://deku-rest-api.replit.app/gpt4?prompt=${encodeURIComponent(hadi)}&uid=${id}`);
 const raffa = pipi.data.gpt4;

message.reaction("✔️", event.messageID);
api.editMessage(`🗨 𝐏𝐈𝐏𝐈 𝐀𝐈\n━━━━━━━━━\n${raffa}`, rizky.messageID);
setTimeout(() => { 
api.unsendMessage(rizky.messageID);
}, this.config.countDown * 360000);
     }
   }
}
