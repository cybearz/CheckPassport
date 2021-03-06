<template>
	<v-app-bar v-if="!isMobile"
		app
	>
		<v-btn
			class="px-0"
			plain
			:to="{ name: 'PageHome' }"
		>
			<v-icon size="40">
				mdi-passport
			</v-icon>
			<div class="text-h4">
				CheckPassport
			</div>
		</v-btn>

		<v-spacer />

		<v-btn
			plain
			:to="{ name: 'PagePosts' }"
		>
			Посты
		</v-btn>

		<v-btn
			v-if="isIconBtnVisible"
			plain
			:to="{ name: 'PageIconForm' }"
		>
			Иконка
		</v-btn>

		<v-btn
			outlined
			:to="{ name: 'PageProfile' }"
		>
			<v-icon
				:color="profile.avatar.color"
				left
			>
				{{ `mdi-${ profile.avatar.icon }` }}
			</v-icon>
			{{ login }}
		</v-btn>
	</v-app-bar>

	<!-- mobile -->

	<v-app-bar v-else
		app
	>
		<div class="text-uppercase text-h4">
			CheckPassport
		</div>

		<v-spacer />

		<v-dialog
			v-model="dialog"
			fullscreen
			hide-overlay
			transition="dialog-top-transition"
		>
			<template v-slot:activator="{ on }">
				<v-app-bar-nav-icon v-on="on">
					<v-icon size="40">
						mdi-menu
					</v-icon>
				</v-app-bar-nav-icon>
			</template>
			<v-card>
				<v-app-bar flat>
					<div class="text-uppercase text-h4">
						CheckPassport
					</div>

					<v-spacer />

					<v-app-bar-nav-icon @click="dialog = false">
						<v-icon size="40">
							mdi-close
						</v-icon>
					</v-app-bar-nav-icon>
				</v-app-bar>

				<v-list>
					<router-link
						style="text-decoration: none; color: inherit;"
						:to="{ name: 'PageHome' }"
					>
						<v-list-item @click="dialog = false">
							<v-list-item-icon>
								<v-icon>mdi-home</v-icon>
							</v-list-item-icon>
							<v-list-item-content>
								<v-list-item-title>Главная</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</router-link>

					<router-link
						style="text-decoration: none; color: inherit;"
						:to="{ name: 'PageProfile' }"
					>
						<v-list-item @click="dialog = false">
							<v-list-item-icon>
								<v-icon>mdi-account</v-icon>
							</v-list-item-icon>
							<v-list-item-content>
								<v-list-item-title>{{ login }}</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</router-link>

					<router-link
						style="text-decoration: none; color: inherit;"
						:to="{ name: 'PagePosts' }"
					>
						<v-list-item
							@click="dialog = false"
						>
							<v-list-item-icon>
								<v-icon>mdi-post</v-icon>
							</v-list-item-icon>
							<v-list-item-content>
								<v-list-item-title>Посты</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</router-link>

					<router-link
						style="text-decoration: none; color: inherit;"
						:to="{ name: 'PageIconForm' }"
					>
						<v-list-item
							v-if="isIconBtnVisible"
							@click="dialog = false"
						>
							<v-list-item-icon>
								<v-icon>mdi-sticker-emoji</v-icon>
							</v-list-item-icon>
							<v-list-item-content>
								<v-list-item-title>Иконка</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</router-link>
				</v-list>
			</v-card>
		</v-dialog>
	</v-app-bar>
</template>


<script>
import { getShortName } from "@/utils/getShortName"
import { cleanEmp } from "@/utils/api"

export default {
	name: "AppBar",

	props: {
		profile: {
			type: Object,
			default: cleanEmp,
		},
	},

	data() {
		return {
			dialog: false,
			isIconBtnVisible: true,
		}
	},

	computed: {
		isMobile() {
			return this.$vuetify.breakpoint.name === "xs"
		},

		login() {
			const fio = this.profile?.fio
			return fio ? getShortName(fio) : "Личный кабинет"
		},
	},

	watch: {
		$route(to) {
			this.isIconBtnVisible = (to.name !== "PageIconForm")
		},
	},

	mounted() {
		this.isIconBtnVisible = (this.$route.name !== "PageIconForm")
	},
}

</script>
