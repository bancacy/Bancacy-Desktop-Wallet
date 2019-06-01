<template>
	<div class="h-screen bg-grey-lighter">
    
    <wallet-header :walletAddress="walletAddress"></wallet-header>

    <div class="flex justify-center">
      <div class="w-full max-w-md mt-4">
        <div class="bg-white shadow-md rounded px-4 pt-4 pb-6 mb-4">
          <div class="flex justify-between">
            <h3 class="mb-2">Passive Income Platform </h3>
            
            <div class="inline-flex">
              <button 
                class="focus:outline-none border border-bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded-l" 
                :class="currency == tokenTicker ? 'bg-grey-light' : 'bg-grey-lightest'"
                @click="setCurrency(tokenTicker)"
              >
                {{ tokenTicker }}
              </button>
            
            </div>
          </div>
          
          <div>
            <div class="flex justify-between">
              <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">Amount</label>
              <span class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                 <span v-if="currency == tokenTicker">{{ sendTokenBalance }} {{ currency }} Available</span>
                 <span v-else>{{ sendEthBalance }} {{ currency }} Available</span>
               </span>
              <a href="#" class="block uppercase tracking-wide text-blue text-xs font-bold mb-2 no-underline" @click="sendMax()">Send Max</a>
            </div>
            <input 
              type="text" @click="Update" @input="Update" @Change="Update"
              class="appearance-none outline-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-grey-light"
              :placeholder="currency"
              v-model="sendAmount"
            >
          </div>
          <p> &nbsp;<p>
          <label ref="Rate" class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">INTEREST RATE : </label>
           <label ref="Daily" class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">Daily TOKENS Income : </label>
           <label ref="Total"class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">Total TOKENS Earend : </label>
          <div>
          
          <p> &nbsp;<p>
         
          
          <p> &nbsp;<p>
            <div class="flex justify-between">
              <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">Sending Gas Fee</label>
              <span class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">Estimated Gas Fee: {{ sendGasFee }} ETH (${{ sendGasCost }} USD)</span>
            </div>
            <div class="flex">
              <div class="w-1/3">
                <input 
                  type="text" 
                  class="appearance-none outline-none block bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-grey-light"
                  v-model="sendGas"
                >
              </div>
              <div class="w-1/3">
                <div class="inline-flex">
                  <button class="focus:outline-none bg-grey-lightest border bg-grey-lighter hover:bg-grey-lighter text-grey-darkest font-bold py-3 px-4 mr-1 rounded-l-lg" @click="subtractGwei()">
                    <i class="fas fa-chevron-circle-down"></i>
                  </button>
                  <button class="focus:outline-none bg-grey-lightest border bg-grey-lighter hover:bg-grey-lighter text-grey-darkest font-bold py-3 px-4 rounded-r-lg" @click="addGwei()">
                    <i class="fas fa-chevron-circle-up"></i>
                  </button>
                </div>
              </div>
              <div class="w-1/3">
                <p class="text-xs uppercase text-right text-red text-xs font-bold" v-if="sendEthBalance < sendGasFee">
                  Insufficient ETH to send
                </p>
              </div>
            </div>
          </div><p> &nbsp;<p><p> &nbsp;<p>
          <div>
            <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">Account Password</label>
            <input 
              type="password" 
              class="appearance-none outline-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3 leading-tightfocus:outline-none focus:border-grey-light"
              v-model="password"
              placeholder="Password" 
            >
          </div>
          
          <button 
            type="button" 
            class="focus:outline-none bg-orange hover:bg-orange-dark text-white py-3 px-6 rounded"
          
            @click="verify"
          >Send Passive Income <i class="ml-1 fas fa-spin fa-circle-notch" v-if="loading"></i>
          </button>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
  import WalletHeader from './WalletHeader';
  import axios from 'axios';
  import utils from './../common/Utilities';
  import env from './../common/Environment';
  import walletKeystore from './../common/Keystore';
  import {sign} from 'ethjs-signer';

  const web3 = utils.web3();

  export default {
  	name: 'Send',
    components: { WalletHeader },
  	props: ['walletAddress'],

  	data() {
  		return {
        tokenTicker: env.tokenTicker,
        tokenName: env.tokenName,
        currency: env.tokenTicker,
        ethPrice: 0,
        sendEthBalance: 0,
        sendTokenBalance: 0,
        sendRecipient: '',
        sendAmount: '',
        sendGasAmount: 180135,
        sendGasFee: 0,
        sendGasCost: '0.00',
        sendButtonDisabled: true,
        password: '',
        sendGas: 10,
        totalDeposit2: '0',
        totalsupply2: '0',
        loading: false,
        error: []
  		}
  	},

    mounted() {
      this.getGasPrice();
      this.bootstrapStorage();
    },

  	methods: {
      getGasPrice: function () {
        web3.eth.getGasPrice((error, wei) => {
          if(wei) {
            const gasGwei = web3.utils.fromWei(wei, 'gwei');
            
            this.sendGas = Math.round(gasGwei);
            
            this.setSendGasFee();
          }
        });
      },

      bootstrapStorage: async function () {
        let ethPrice      = await localStorage.getItem('ethPrice');
        let ethBalance    = await localStorage.getItem('ethBalance');
        let tokenBalance  = await localStorage.getItem('tokenBalance');
        let totalDeposit2  = await localStorage.getItem('totalDeposit2');
        let totalsupply2  = await localStorage.getItem('Rate2');

        this.ethPrice = ethPrice;
        this.sendEthBalance = ethBalance;
        this.sendTokenBalance = tokenBalance;
        this.totalDeposit2   = totalDeposit2 != null ? parseFloat(totalDeposit2) : '0';
          this.totalsupply2   = totalsupply2 != null ? parseFloat(totalsupply2) : '0';

        this.getEthPrice();
      },

      getEthPrice: function () {
        axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD')
          .then(response => {
            if(response.data.USD != undefined) {
              localStorage.setItem('ethPrice', JSON.parse(response.data.USD).toString());
              
              this.ethPrice = response.data.USD;
            }
          }).catch(error => {console.log(error)});
      },

      addGwei: function () {
        this.sendGas = this.sendGas + 1;
        this.setSendGasFee();
      },

      subtractGwei: function () {
        if(this.sendGas > 0) {
          this.sendGas = this.sendGas - 1;
          this.setSendGasFee();
        }
      },

      setCurrency: function (currency) {
        this.currency = currency;
        this.sendAmount = '';
      },

      setSendGasFee: function () {
        let sendGasEth = web3.utils.fromWei(web3.utils.toWei(this.sendGas.toString(), 'gwei'), 'ether');

        this.sendGasFee = utils.format(sendGasEth * this.sendGasAmount);
        this.sendGasCost = utils.format(this.sendGasFee * this.ethPrice, 2);
      },

      sendMax: function () {
        this.Update();
        if(this.currency == 'ETH') {
          this.sendAmount = this.sendEthBalance;
        } else {
          this.sendAmount = this.sendTokenBalance;
        }
       
      },
      Update: function(){
        this.$refs.Rate.textContent = "INTEREST RATE : " +  (((1 - this.totalDeposit2/this.totalsupply2) * 0.128 ) *100).toLocaleString() +"%";
        this.$refs.Daily.textContent = "DAILY TOKENS INCOME : " +  (((1 - this.totalDeposit2/this.totalsupply2) * 0.128 ) * this.sendAmount / 365).toLocaleString() +" BNY";
        this.$refs.Total.textContent = "TOTAL TOKENS EAREND : " +  (((1 - this.totalDeposit2/this.totalsupply2) * 0.128 ) * this.sendAmount).toLocaleString()  +" BNY";
      },

      verify: async function () {
        const storedPassword = await localStorage.getItem('passwordEncrypted');

        let sendEthBalance = parseFloat(this.sendEthBalance);
        let sendGasPrice = parseFloat(this.sendGas);
        let sendGasAmount = parseInt(this.sendGasAmount);
        let sendAmount = parseFloat(this.sendAmount);
        let sendRecipient = this.sendRecipient.trim();
        let password = this.password;
        let data;
        let value;

        if(sendGasPrice != '' && sendGasAmount != '' && sendAmount != ''  && password != '') {
          if(sendEthBalance <= 0) {
            alert('Please deposit ETH to send tokens.');
            return;
          } else if(sendGasPrice <= 0) {
            alert('Gas price is too low.');
            return;
          } else if(isNaN(sendGasPrice)) {
            alert('Gas must be a number.');
            return;
          } else if(sendGasAmount <= 0) {
            alert('Gas amount is too low.');
            return;
          } else if(sendAmount < 0) {
            alert('You must choose an amount to send.');
            return;
          } else if(sendAmount < 12000000) {
            alert('Minimum amount for Passive Income is 12,000,000.');
            return;
          } else if(web3.utils.sha3(password) != storedPassword) {
            alert('Invalid password.');
            return;
          }
          this.loading = true;
          // Format the gas price.
          sendGasPrice = sendGasPrice * 1.0e9;
          // Format the send amount.
         sendAmount = utils.ethToWei(sendAmount);
          // Set the data and value based on the currency.
          if(this.currency == 'ETH') {
             
            data = '0x';
            value = sendAmount;
          } else {
            let contract = new web3.eth.Contract(env.abi, env.contractAddress);

            data = contract.methods.passiveIncomeInvestment(sendAmount).encodeABI();
            // Change the recipient to be the token contract address.
            sendRecipient = env.contractAddress;
            value = 0;
          }

          let balance = this.currency == 'ETH' ? this.sendEthBalance : this.sendTokenBalance;
          // Form the transaction object.
          if(this.sendAmount <= parseFloat(balance)) {
            let transaction = {
              to: sendRecipient,
              value: value,
              gas: sendGasAmount,
              gasPrice: sendGasPrice,
              data: data
            };
            // Send the transaction.
            this.send(transaction, password);
          } else {
            this.loading = false;
            alert('You have insufficient funds.');
          }
        } else {
          this.loading = false;
          alert('You did not fill in all of the required fields.');
        }
      },

      send: function (transaction, password) {
        walletKeystore.load(password, (ks) => {
          ks.keyFromPassword(password, (error, pwDerivedKey) => {
            if(error) {
              this.loading = false;
              alert('Password key error.');
              return;
            } else {
              ks.generateNewAddress(pwDerivedKey, 1);
              // Broadcast Transaction
              web3.eth.getTransactionCount(this.walletAddress, (error, nonce) => {
                // Add nonce to the transaction object.
                transaction.nonce = nonce;
                // Sign the transaction and send.
                web3.eth.sendSignedTransaction(sign(transaction, '0x' + ks.exportPrivateKey(this.walletAddress, pwDerivedKey)), async (error, txHash) => {
                  if(txHash) {
                    // Set pending tx.
                    let pendingTx = {
                      key: txHash,
                      address: this.walletAddress
                    };
                    // Save to storage.
                    if(this.currency == 'ETH') {
                      let txs = await localStorage.getItem('ethPendingTxs');

                      txs = txs == null ? [] : JSON.parse(txs);
                      txs.push(pendingTx);

                      await localStorage.setItem("ethPendingTxs", JSON.stringify(txs));

                    } else {
                      let txs = localStorage.getItem('tokenPendingTxs');

                      txs = txs == null ? [] : JSON.parse(txs);
                      txs.push(pendingTx);

                      await localStorage.setItem("tokenPendingTxs", JSON.stringify(txs));
                    }
                    // Return to summary screen.
                    if(this.currency == 'ETH') {
                      this.$router.push({name: 'EthWallet', params: {walletAddress: this.walletAddress}});
                    } else {
                      this.$router.push({name: 'Wallet', params: {walletAddress: this.walletAddress}});
                    }
                  } else {
                    this.loading = false;
                    alert('There was a problem sending this transaction.');
                  }
                });
              });
            }
          });
        });
      }
  	}
  }
</script>
