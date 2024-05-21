const { getTime, drive } = global.utils;
if (!global.temp.welcomeEvent)
	global.temp.welcomeEvent = {};

module.exports = {
	config: {
		name: "welcome",
		version: "1.0",
		author: "SISIR-SARKAR",//Command Modified By Aryan Chauhan don't change my author name
		category: "events"
	},

	langs: {
		vi: {
			session1: "sáng",
			session2: "trưa",
			session3: "chiều",
			session4: "tối",
			welcomeMessage: "Cảm ơn bạn đã mời tôi vào nhóm!\nPrefix bot: %1\nĐể xem danh sách lệnh hãy nhập: %1help",
			multiple1: "bạn",
			multiple2: "các bạn",
			defaultWelcomeMessage: "Xin chào {userName}.\nChào mừng bạn đến với {boxName}.\nChúc bạn có buổi {session} vui vẻ!"
		},
		en: {
			session1: "morning",
			session2: "noon",
			session3: "afternoon",
			session4: "evening",
			welcomeMessage: "┏⌨︎𒅌𒋨📝\n➤  SISIR𖣘𝘽𝙤𝙩࿐ \n┗━━━━━━━━━━━━❀\n\n╔══════════╗\n❍ SISIR𖣘𝘽𝙤𝙩࿐ 𝖧𝖺𝗌 𝖡𝖾𝖾𝗇 𝖢𝗈𝗇𝗇𝖾𝖼𝗍𝖾𝖽 𝖲𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒\n❍ 𝖳𝗁𝖺𝗇𝗄 𝖸𝗈𝗎 𝖥𝗈𝗋 𝖢𝗁𝗈𝗈𝗌𝗂𝗇𝗀 𝖮𝗎𝗋 SISIR𖣘𝘽𝙤𝙩࿐\n 𝖧𝖺𝗏𝖾 𝖠 𝖦𝗋𝖾𝖺𝗍 𝖣𝖺𝗒\n╚══════════╝",
			multiple1: "you",
			multiple2: "you guys",
			defaultWelcomeMessage: `┏(:̲̅:̲̅:̲̅[̲̅:♡:]̲̅:̲̅:̲̅:̲̅)


☠︎︎\n❣️   𝗪𝗘𝗟𝗖𝗢𝗠𝗘 𝗙𝗥𝗜𝗘𝗡𝗗\n┗━-᱾𝗅‖⎼✊⸺✊⎼‖𝗅᱾-
━━━❀\n\n𝖸𝗈𝗈 𝖡𝗎𝖽𝖽𝗒.𝖶𝗁𝖺𝗍'𝗌 𝖴𝗉'.𝖧𝗈𝗐 𝖠𝗋𝖾 𝖥𝗋𝗂𝖾𝗇𝖽\n╔════⚢︎𓅰══════╗\n➤   {userName}\n╚══════════╝\n➤ 𝖶𝖾𝗅𝖼𝗈𝗆𝖾 𝖳𝗈 𝖮𝗎𝗋 𝖦𝗋𝗈𝗎𝗉 𝖢𝗈𝗆𝗆𝗎𝗇𝗂𝗍𝗒\n➤ 【 {boxName} 】\n\n𝖧𝖺𝗏𝖾 𝖠 𝖶𝗈𝗇𝖿𝖾𝗋𝖥𝗎𝗅𝗅 𝖣𝖺𝗒\n➤ 🌸☺️\n\n❍ 𝗣𝗿𝗲𝗳𝗶𝘅:【 - 】\n❍ 𝗧𝗼 𝘀𝗲𝗲 𝗔𝗹𝗹 𝗮𝘃𝗮𝗹𝗮𝗯𝗹𝗲 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀 𝗧𝘆𝗽𝗲 【 -help 】\n\n➤  SISIR𖣘𝘽𝙤𝙩࿐`
		}
	},

	onStart: async ({ threadsData, message, event, api, getLang }) => {
		if (event.logMessageType == "log:subscribe")
			return async function () {
				const hours = getTime("HH");
				const { threadID } = event;
				const { nickNameBot } = global.GoatBot.config;
				const prefix = global.utils.getPrefix(threadID);
				const dataAddedParticipants = event.logMessageData.addedParticipants;
				// if new member is bot
				if (dataAddedParticipants.some((item) => item.userFbId == api.getCurrentUserID())) {
					if (nickNameBot)
						api.changeNickname(nickNameBot, threadID, api.getCurrentUserID());
					return message.send(getLang("welcomeMessage", prefix));
				}
				// if new member:
				if (!global.temp.welcomeEvent[threadID])
					global.temp.welcomeEvent[threadID] = {
						joinTimeout: null,
						dataAddedParticipants: []
					};

				// push new member to array
				global.temp.welcomeEvent[threadID].dataAddedParticipants.push(...dataAddedParticipants);
				// if timeout is set, clear it
				clearTimeout(global.temp.welcomeEvent[threadID].joinTimeout);

				// set new timeout
				global.temp.welcomeEvent[threadID].joinTimeout = setTimeout(async function () {
					const threadData = await threadsData.get(threadID);
					if (threadData.settings.sendWelcomeMessage == false)
						return;
					const dataAddedParticipants = global.temp.welcomeEvent[threadID].dataAddedParticipants;
					const dataBanned = threadData.data.banned_ban || [];
					const threadName = threadData.threadName;
					const userName = [],
						mentions = [];
					let multiple = false;

					if (dataAddedParticipants.length > 1)
						multiple = true;

					for (const user of dataAddedParticipants) {
						if (dataBanned.some((item) => item.id == user.userFbId))
							continue;
						userName.push(user.fullName);
						mentions.push({
							tag: user.fullName,
							id: user.userFbId
						});
					}
					// {userName}:   name of new member
					// {multiple}:
					// {boxName}:    name of group
					// {threadName}: name of group
					// {session}:    session of day
					if (userName.length == 0) return;
					let { welcomeMessage = getLang("defaultWelcomeMessage") } =
						threadData.data;
					const form = {
						mentions: welcomeMessage.match(/\{userNameTag\}/g) ? mentions : null
					};
					welcomeMessage = welcomeMessage
						.replace(/\{userName\}|\{userNameTag\}/g, userName.join(", "))
						.replace(/\{boxName\}|\{threadName\}/g, threadName)
						.replace(
							/\{multiple\}/g,
							multiple ? getLang("multiple2") : getLang("multiple1")
						)
						.replace(
							/\{session\}/g,
							hours <= 10
								? getLang("session1")
								: hours <= 12
									? getLang("session2")
									: hours <= 18
										? getLang("session3")
										: getLang("session4")
						);

					form.body = welcomeMessage;

					if (threadData.data.welcomeAttachment) {
						const files = threadData.data.welcomeAttachment;
						const attachments = files.reduce((acc, file) => {
							acc.push(drive.getFile(file, "stream"));
							return acc;
						}, []);
						form.attachment = (await Promise.allSettled(attachments))
							.filter(({ status }) => status == "fulfilled")
							.map(({ value }) => value);
					}
					message.send(form);
					delete global.temp.welcomeEvent[threadID];
				}, 1500);
			};
	}
};
