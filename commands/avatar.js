const { SlashCommandBuilder } = require('@discordjs/builders')
const { EmbedBuilder } = require('discord.js')
const { avatar } = require('../config.json')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription(
			'Get the avatar URL of the selected user, or your own avatar.',
		)
		.setDescriptionLocalizations({
			uk: 'Отримайте URL-адресу аватара вибраного користувача або свій власний аватар.',
			ru: 'Получите URL-адрес аватара выбранного пользователя или свой собственный аватар.',
		})
		.addUserOption((option) =>
			option
				.setName('target')
				.setDescription("The user's avatar to show")
				.setDescriptionLocalizations({
					uk: 'Аватар користувача для показу',
					ru: 'Аватар пользователя для показа',
				}),
		),
	async execute(interaction) {
		const target = interaction.options.getUser('target')
		const locale = avatar[interaction.locale] || avatar['en']

		if (target && interaction.user.id != target.id) {
			const Embed = new EmbedBuilder()
				.setTitle(locale.Title + target.username)
				.setThumbnail(interaction.user.displayAvatarURL({ dynamic: false }))
				.setImage(target.displayAvatarURL({ size: 2048, dynamic: true }))
				.setDescription(
					`<@${interaction.user.id}>, ${locale.Option} <@${target.id}>`,
				)
				.setFields({
					name: '\u200B',
					value: `||${target.displayAvatarURL()}||`,
				})
			return await interaction.reply({
				embeds: [Embed],
			})
		} else {
			const Embed = new EmbedBuilder()

				.setTitle(locale.Title + interaction.user.username)
				.setThumbnail(interaction.user.displayAvatarURL({ dynamic: false }))
				.setImage(
					interaction.user.displayAvatarURL({ size: 2048, dynamic: true }),
				)
				.setDescription(`<@${interaction.user.id}>, ${locale.Description}`)
				.setFields({
					name: '\u200B',
					value: `||${interaction.user.displayAvatarURL()}||`,
				})

			return await interaction.reply({
				embeds: [Embed],
			})
		}
	},
}
