<template>
	<div class="min-h-screen flex flex-row  bg-green-darkest brand-bg-image">

		<wallet-header :walletAddress="walletAddress"></wallet-header>

    <div class="flex p-4">
      <div class="flex flex-col w-1/4">
        <button-menu :walletAddress="walletAddress"></button-menu>
        <div class="mt-2 text-center text-xs align-text-bottom">
          App Version: {{ appVersion }}
        </div>
      </div>
      <div class="w-3/4 flex-no-grow pl-4">
        <div class="bg-white rounded border border-grey-light px-4 pt-2 pb-6 mb-4">
          <div class="text-grey-darker font-bold text-sm border-b border-grey-light pb-1">Settings</div>
          <p class="mt-4 text-xs">
            Use the buttons on the left to manage your app settings.
          </p>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
  import WalletHeader from './WalletHeader';
  import ButtonMenu from './settings/ButtonMenu';
    import env from './../common/Environment';
  export default {
  	name: 'Settings',
    components: { WalletHeader, ButtonMenu },
  	props: ['walletAddress'],

  	data() {
  		return {
            appVersion : env.appVersion
            }
  	},

  	methods: {
      navigate: function (destination) {
        this.$router.push({name: destination, params: {walletAddress: this.walletAddress}});
      }
  	}
  }
</script>
