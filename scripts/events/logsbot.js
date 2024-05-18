const { getTime } = global.utils;

module.exports = {
  config: {
    name: "logsbot",
    isBot: true,
    version: "1.0",
    author: "MR.SANNY",//Command Modified By Aryan Chauhan don't change my author name
    envConfig: {
      allow: true
    },
    category: "events"
  },

  langs: {
    en: {
      title: "┏━━━━━━━━━━━━❀\n❍𝗡𝗘𝗪 𝗧𝗛𝗥𝗘𝗔𝗗❍\n┗━━━━━━━━━━━━❀",
      added: "\n\n✅ 𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗧𝗜𝗢𝗡 ➤ Bot 𝖧𝖺𝗌 𝖡𝖾𝖾𝗇 𝖠𝖽𝖽𝖾𝖽 𝖳𝗈 𝖭𝖾𝗐 𝖦𝗋𝗈𝗎𝗉\n\n😗 𝗔𝗗𝗗𝗘𝗗 𝗕𝗬\n➤【 %1 】",
      kicked: "\n\n❌ 𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗧𝗜𝗡 \n\n➤  Bot 𝖧𝖺𝗌 𝖡𝖾𝖾𝗇 𝖪𝗂𝖼𝗄𝖾𝖽\n\n⛔ 𝗞𝗜𝗖𝗞𝗘𝗗 𝗕𝗬 \n➤【 %1 】 ",
      footer: "\n\🍒 𝗨𝗦𝗘𝗥 𝗨𝗜𝗗\n➤  【 %1 】\n❣️ 𝗚𝗥𝗢𝗨𝗣 𝗡𝗔𝗠𝗘 \n➤【 %2 】\n💌 𝗚𝗥𝗢𝗨𝗣 𝗨𝗜𝗗 \n➤【 %3 】\n⏰ 𝗧𝗜𝗠𝗘 \n➤【 %4 】"
    }
  },

  onStart: async ({ usersData, threadsData, event, api, getLang }) => {
    if (
      (event.logMessageType == "log:subscribe" &&
        event.logMessageData.addedParticipants.some(
          (item) => item.userFbId == api.getCurrentUserID()
        )) ||
      (event.logMessageType == "log:unsubscribe" &&
        event.logMessageData.leftParticipantFbId == api.getCurrentUserID())
    ) {
      return async function () {
        let msg = getLang("title");
        const { author, threadID } = event;
        if (author == api.getCurrentUserID()) return;
        let threadName;
        const { config } = global.GoatBot;

        if (event.logMessageType == "log:subscribe") {
          if (
            !event.logMessageData.addedParticipants.some(
              (item) => item.userFbId == api.getCurrentUserID()
            )
          )
            return;
          threadName = (await api.getThreadInfo(threadID)).threadName;
          const authorName = await usersData.getName(author);
          msg += getLang("added", authorName);
        }

        if (
          event.logMessageData.leftParticipantFbId !=
          api.getCurrentUserID()
        )
          return;
        const authorName = await usersData.getName(author);
        const threadData = await threadsData.get(threadID);
        threadName = threadData.threadName;
        msg += getLang("kicked", authorName);

        const time = getTime("DD/MM/YYYY HH:mm:ss");
        msg += getLang("footer", author, threadName, threadID, time);

        for (const adminID of config.adminBot)
          api.sendMessage(msg, adminID);
      };
    }
  },
};
