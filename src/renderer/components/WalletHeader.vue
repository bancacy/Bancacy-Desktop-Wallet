<template>
  <nav class="flex items-center justify-between p-2 border-b border-grey bg-brand-light">
    <div class="flex items-center flex-no-shrink text-white mr-6">
        <img id="logo" src="~@/assets/img/logo.png">
    </div>
    <div class="w-full block flex-grow flex items-center w-auto">
      <div class="text-sm flex-grow">
        <a href="#" class="block inline-block mt-0 text-brand-light border border-brand-dark rounded hover:text-white mr-6 no-underline hover:border-white px-4 py-2 bg-brand-dark" @click="navigate('Wallet')">
          <i class="fa fa-bars"></i>
          {{ tokenTicker }} Summary
        </a>
        <a href="#" class="block inline-block mt-0 text-brand-light border border-brand-dark rounded hover:text-white mr-6 no-underline hover:border-white px-4 py-2 bg-brand-dark" @click="navigate('EthWallet')">
          <i class="fa fa-bars"></i>
          ETH Summary
        </a>
        <a href="#" class="block inline-block mt-0 text-brand-light border border-brand-dark rounded hover:text-white mr-6 no-underline hover:border-white px-4 py-2 bg-brand-dark" @click="navigate('Receive')">
          <i class="fa fa-arrow-down"></i>
          Receive
        </a>
        <a href="#" class="block inline-block mt-0 text-brand-light border border-brand-dark rounded hover:text-white mr-6 no-underline hover:border-white px-4 py-2 bg-brand-dark" @click="navigate('Send')">
          <i class="fa fa-arrow-up"></i>
          Send
        </a>
        <a href="#" class="block inline-block mt-0 text-brand-light border border-brand-dark rounded hover:text-white mr-6 no-underline hover:border-white px-4 py-2 bg-brand-dark" @click="navigate('Invest')"> 
          <i class="fa fa-dollar-sign"></i>
          Invest
        </a>
        <a href="#" class="block inline-block mt-0 text-brand-light border border-brand-dark rounded hover:text-white mr-6 no-underline hover:border-white px-4 py-2 bg-brand-dark" @click="navigate('BuyBNY')">
          <i class="fa fa-money-bill-alt"></i>
           Buy BNY
        </a>
        <a href="#" class="block inline-block mt-0 text-brand-light border border-brand-dark rounded hover:text-white mr-6 no-underline hover:border-white px-4 py-2 bg-brand-dark" @click="navigate('PassiveIncome')"style="margin-left: 0px;">
          <i class="fa fa-percent"></i>
           Pasive Income
        </a>
        <a href="#" class="block inline-block mt-0 text-brand-light border border-brand-dark rounded hover:text-white mr-6 no-underline hover:border-white px-4 py-2 bg-grey-dark" style="margin-top: 15px; color: #C0C0C0">
          <i class="fa fa-exchange-alt"></i>
          Asset Solidification
        </a>
      </div>
    </div>
    <div class="flex justify-content">
      <a 
        href="#" 
        class="inline-block text-sm px-4 py-2 mr-2 leading-none border border-brand-dark rounded text-brand-light hover:border-white hover:text-white no-underline bg-brand-dark" 
        @click="navigate('Settings')"style="margin-top:px;"
      >
        <i class="fa fa-cog"></i>
        
      </a>
    </div>
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
			}
		},

		methods: {
			navigate: function (destination) {
				this.$router.push({name: destination, params: {walletAddress: this.walletAddress}});
			}
		}
	}
</script>