<template>
  <nav class="flex flex-col flex-no-shrink items-center justify-between p-2 w-64 bg-brand-light">
    <div class="flex text-white mx-4 my-4">
        <img id="logo" src="~@/assets/img/logo.png" class="self-center">
    </div>
    <div class="w-full flex-grow flex w-auto">
      <div class="text-sm flex-grow flex-row">
        <a href="#" class="block mt-2 text-brand-light border border-brand-dark rounded hover:text-white mr-1 no-underline hover:border-white px-2 py-2 bg-brand-dark" @click="navigate('Wallet')">
          <i class="fa fa-bars mr-1"></i>
          {{ tokenTicker }} Summary
        </a>
        <a href="#" class="block  mt-2 text-brand-light border border-brand-dark rounded hover:text-white mr-1 no-underline hover:border-white px-2 py-2 bg-brand-dark" @click="navigate('EthWallet')">
          <i class="fa fa-bars mr-1"></i>
          ETH Summary
        </a>
        <a href="#" class="block  mt-2 text-brand-light border border-brand-dark rounded hover:text-white mr-1 no-underline hover:border-white px-2 py-2 bg-brand-dark" @click="navigate('Receive')">
          <i class="fa fa-arrow-down mr-1"></i>
          My Address
        </a>
        <a href="#" class="block  mt-2 text-brand-light border border-brand-dark rounded hover:text-white mr-1 no-underline hover:border-white px-2 py-2 bg-brand-dark" @click="navigate('Send')">
          <i class="fa fa-arrow-up mr-1"></i>
          Send
        </a>
        <a href="#" class="block  mt-2 text-brand-light border border-brand-dark rounded hover:text-white mr-1 no-underline hover:border-white px-2 py-2 bg-brand-dark" @click="navigate('Invest')"> 
          <i class="fa fa-dollar-sign mr-1"></i>
          Invest
        </a>
        <a href="#" class="block  mt-2 text-brand-light border border-brand-dark rounded hover:text-white mr-1 no-underline hover:border-white px-2 py-2 bg-brand-dark" @click="navigate('BuyBNY')">
          <i class="fa fa-money-bill-alt mr-1"></i>
           Buy BNY
        </a>
        <a href="#" class="block  mt-2 text-brand-light border border-brand-dark rounded hover:text-white mr-1 no-underline hover:border-white px-2 py-2 bg-brand-dark" @click="navigate('PassiveIncome')"
       >
          <i class="fa fa-percent mr-1"></i>
           Passive Income
        </a>
        <a href="#" class="block  mt-2 text-brand-light border border-brand-dark rounded hover:text-white mr-1 no-underline hover:border-white px-2 py-2 bg-grey-dark">
          <i class="fa fa-exchange-alt mr-1"></i>
          Asset Solidification
        </a>
      </div>
    </div>
    <div class="flex justify-content">
      <a 
        href="#" 
        class="block text-sm px-4 py-2 mr-2  border border-brand-dark rounded text-brand-light hover:border-white hover:text-white no-underline bg-brand-dark" 
        @click="navigate('Settings')"
      >
        <i class="fa fa-cog mr-1"></i>
        Settings
      </a>
    </div>
    <div class="text-grey" v-if="!MAINNET">Testnet version</div>
  </nav>
</template>

<script>
  import env from './../common/Environment';

	export default {
		props: ['walletAddress'],

		data() {
			return {
        tokenTicker: env.tokenTicker,
        tokenName: env.tokenName,
        MAINNET : env.MAINNET
			}
		},

		methods: {
			navigate: function (destination) {
				this.$router.push({name: destination, params: {walletAddress: this.walletAddress}});
			}
		}
	}
</script>