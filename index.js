require('dotenv').config()
const { Client, GatewayIntentBits } = require('discord.js')
const { Collection } = require('discord.js')
const fs = require('fs')

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildMessageTyping,
		GatewayIntentBits.DirectMessageReactions,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.DirectMessageTyping,
	],
})

client.commands = new Collection()
const commandFiles = fs
	.readdirSync('./commands')
	.filter((file) => file.endsWith('.js'))
for (const file of commandFiles) {
	const command = require(`./commands/${file}`)
	client.commands.set(command.data.name, command)
}
client.on('interactionCreate', async (interaction) => {
	if (!interaction.isCommand()) return
	const command = client.commands.get(interaction.commandName)

	if (!command) return
	try {
		await command.execute(interaction, client)
	} catch (error) {
		console.error(error)
		await interaction.reply({
			content: 'There was an error while executing this command!',
			ephemeral: true,
		})
	}
})

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`)
	client.user.setStatus('dnd')
})

client.login(process.env.TOKEN)
