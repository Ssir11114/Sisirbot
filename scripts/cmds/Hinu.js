const axios = require('axios');

const ArYAN = [
  '.hinu',
  'ai',
  '/hinu',
  '&hinu',
  '$hinu',
  'hinu',
];

module.exports = {
  config: {
    name: 'hinu',
    version: '1.0.1',
    author: 'ArYAN',
    role: 0,
    category: 'ai',
    longDescription: {
      en: '🔎 𝗛𝗶𝗻𝘂 𝗔𝗶 is a large language model trained by OpenAI. It is designed to assist with a wide range of tasks.',
    },
    guide: {
      en: '.hinu <questions>\n\nFor Example:\n.hinu who are you?\n.hinu what is GPT?',
    },
  },

  langs: {
    en: {
      final: "",
      loading: "💭 𝗛𝗶𝗻𝘂 𝗔𝗶 𝗂𝗌 𝗍𝗁𝗂𝗇𝗄𝗂𝗇𝗀 𝗉𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍........"
    }
  },

  onStart: async function () {},

  onChat: async function ({ api, event, args, getLang, message }) {
    try {
      const prefix = ArYAN.find((p) => event.body && event.body.toLowerCase().startsWith(p));

      if (!prefix) {
        return;
      }

      const prompt = event.body.substring(prefix.length).trim();

      const loadingMessage = getLang("loading");
      const loadingReply = await message.reply(loadingMessage);
      
      const response = await axios.get(`https://aryan-apis.onrender.com/api/hinuai`, {
        params: {
          prompt: prompt
        }
      });

      if (response.status !== 200 || !response.data || !response.data.fullResponse) {
        throw new Error('Invalid or missing response from API');
      }

      const messageText = response.data.fullResponse; 

      const finalMsg = `${messageText}`;
      api.sendMessage(finalMsg, event.threadID, event.messageID); // Sending the message to the thread

      console.log('Sent answer to the user');
    } catch (error) {
      console.error(`Failed to get answer: ${error.message}`);
      api.sendMessage(
        `${error.message}.`,
        event.threadID
      );
    }
  },
};
