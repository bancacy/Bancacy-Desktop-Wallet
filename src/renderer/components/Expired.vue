<template>
	<div>
    <nav class="p-2 bg-brand-light">
      <div>
        <div>
          <img id="logo" src="~@/assets/img/logo.png">
        </div>
      </div>
    </nav>
    <div class="md:container p-4">
      <div class="bg-orange-lightest border-l-4 border-orange text-orange-dark p-4 mb-4">
        <span>
          {{ tokenName }} Wallet
        </span>
      </div>
      <div class="mt-4 w-full bg-grey-lighter rounded p-4 text-sm">
        <p class="font-bold mb-4">This wallet has reached the end of support. Please seek assitance via the Bancacy Community channels on Telegram or via Bancacy.</p>
      </div>
    </div>
	</div>
</template>

<script>
  import env from './../common/Environment';

  export default {
  	name: 'Create',
  	props: [],

  	data() {
  		return {
        tokenTicker: env.tokenTicker,
        tokenName: env.tokenName,
      }
  	}
  }
</script>