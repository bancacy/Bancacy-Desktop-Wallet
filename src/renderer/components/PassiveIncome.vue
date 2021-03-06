<template>
	<div class="min-h-screen flex flex-row  bg-green-darkest brand-bg-image">
    
    <wallet-header :walletAddress="walletAddress"></wallet-header>

    <div class="flex flex-grow justify-center">
      <div class="w-full max-w-md mt-4">
        <div class="bg-white shadow-md rounded px-4 pt-4 pb-6 mb-4">
          <div class="flex justify-between">
            <h3 class="mb-2">Passive Income Platform </h3>
          </div>
          <div>
            <div class="flex justify-between">
              <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">Amount</label>
              <span class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                 <span>{{ sendTokenBalance }} {{ tokenTicker }} Available</span>
               </span>
              <a href="#" class="block uppercase tracking-wide text-blue text-xs font-bold mb-2 no-underline" @click="sendMax()">Send Max</a>
            </div>
            <input 
              type="text" @click="Update" @input="Update" @Change="Update"
              class="appearance-none outline-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-grey-light"
              :placeholder="tokenTicker"
              v-model="sendAmount"
            >
          </div>
         

          <div v-if="sendAmount">

            <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">{{rateText}}</label>
            <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">{{dailyText}}</label>
            <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">{{totalText}}</label>
            <div>
            
        
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
            </div>
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
	</div>
</template>

<script>
  import WalletHeader from './WalletHeader';
  import axios from 'axios';
  import utils from './../common/Utilities';
  import env, {MAINNET} from './../common/Environment';
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
        ethPrice: 0,
        sendEthBalance: 0,
        sendTokenBalance: 0,
        sendRecipient: '',
        sendAmount: '',
        sendGasAmount: 210135,
        sendGasFee: 0,
        sendGasCost: '0.00',
        sendButtonDisabled: true,
        password: '',
        sendGas: 10,
        totalDeposit: '0',
        totalSupply: '0',
        loading: false,
        error: [],
        rateText : '',
        dailyText : '',
        totalText : ''
  		}
  	},

    mounted() {
      this.getGasPrice();
      this.bootstrapStorage();
      this.getData();
      this.Update();
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
        let totalDeposit  = await localStorage.getItem('totalDeposit');
        let totalSupply  = await localStorage.getItem('totalSupply');

        this.ethPrice = ethPrice;
        this.sendEthBalance = ethBalance;
        this.sendTokenBalance = tokenBalance;
        this.totalDeposit   = totalDeposit != null ? parseFloat(totalDeposit) : '0';
        this.totalSupply   = totalSupply != null ? parseFloat(totalSupply) : '0';

      },
      getData : function (){
        this.getTokenBalance();
        this.getEthBalance();
        this.getEthPrice();

        let contract = new web3.eth.Contract(env.abi, MAINNET ? env.contractAddress.bnyMainnet : env.contractAddress.bnyTestnet);
        
        contract.methods.totalSupply().call().then((result) =>  { 
          //localStorage.setItem('Rate', JSON.parse((result/1000000000000000000)).toFixed(2));
          let data = web3.utils.fromWei(web3.utils.toBN(result).toString(), 'ether'); 
          localStorage.setItem('totalSupply', data);
          this.totalSupply = data;
        })
        contract.methods.balanceOf(0x0).call().then((result) =>  { 
          let data = web3.utils.fromWei(web3.utils.toBN(result).toString(), 'ether'); 
          localStorage.setItem('totalDeposit', data);
          this.totalDeposit = data;
        })

      },
      getTokenBalance: function () {
        web3.eth.call({
          to: MAINNET ? env.contractAddress.bnyMainnet : env.contractAddress.bnyTestnet,
          data: '0x70a08231000000000000000000000000' + this.walletAddress.substring(2)
        }, (error, balance) => {
          if(balance) {
            
            let tokenBalance = web3.utils.fromWei(web3.utils.toBN(balance).toString(), 'ether'); 
            let tokenValue = tokenBalance * this.tokenPrice;

            this.tokenBalance = utils.format(tokenBalance, 2);
            this.tokenValue = utils.format(tokenValue, 2);

            localStorage.setItem('tokenBalance', tokenBalance.toString());
          }
        });
      },
      getEthBalance: function () {
        web3.eth.getBalance(this.walletAddress, (error, balance) => {
          if(balance) {
            let ethBalance = web3.utils.fromWei(balance, 'ether');
            let ethValue = ethBalance * this.ethPrice;

            this.ethBalance = utils.format(ethBalance, 9);
            this.sendEthBalance = this.ethBalance;
            this.ethValue = utils.format(ethValue, 2);

            localStorage.setItem('ethBalance', ethBalance.toString());
          }
        });
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
        this.sendGas ++;
        this.setSendGasFee();
      },

      subtractGwei: function () {
        if(this.sendGas > 0) {
          this.sendGas --;
          this.setSendGasFee();
        }
      },
      setSendGasFee: function () {
        let sendGasEth = web3.utils.fromWei(web3.utils.toWei(this.sendGas.toString(), 'gwei'), 'ether');

        this.sendGasFee = utils.format(sendGasEth * this.sendGasAmount);
        this.sendGasCost = utils.format(this.sendGasFee * this.ethPrice, 2);
      },

      sendMax: function () {
        this.sendAmount = this.sendTokenBalance;
        this.Update();
      },
      Update: function(){
        this.rateText = "INTEREST RATE : " +  (((1 - this.totalDeposit/this.totalSupply) * 0.128 ) *100).toLocaleString() +"%";
        this.dailyText = "DAILY TOKENS INCOME : " +  (((1 - this.totalDeposit/this.totalSupply) * 0.128 ) * this.sendAmount / 365).toLocaleString() +" BNY";
        this.totalText = "TOTAL TOKENS EAREND : " +  (((1 - this.totalDeposit/this.totalSupply) * 0.128 ) * this.sendAmount).toLocaleString()  +" BNY";
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
          } else if(sendAmount < 1200000) {
            alert('Minimum amount for Passive Income is 1,200,000.');
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
         
          let contract = new web3.eth.Contract(env.abi, MAINNET ? env.contractAddress.bnyMainnet : env.contractAddress.bnyTestnet);

          data = contract.methods.makePassiveIncomeInvestment(sendAmount).encodeABI();
          // Change the recipient to be the token contract address.
          sendRecipient = MAINNET ? env.contractAddress.bnyMainnet : env.contractAddress.bnyTestnet;
          value = 0;

          let balance = this.sendTokenBalance;
          // Form the transaction object.
          if(this.sendAmount <= parseFloat(balance)) {
            let transaction = {
              to: sendRecipient,
              value: value,
              gas: sendGasAmount,
              gasPrice: sendGasPrice,
              data: data
            };
            console.info("transaction",transaction);
            // Send the transaction.
            this.send(transaction, password);
          }
          else {
            this.loading = false;
            alert('You have insufficient funds.');
          }
        }
        else {
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
                   
                    let txs = localStorage.getItem('tokenPendingTxs');

                    txs = txs == null ? [] : JSON.parse(txs);
                    txs.push(pendingTx);

                    await localStorage.setItem("tokenPendingPSVS", JSON.stringify(txs));
                    await localStorage.setItem("tokenPendingTxs", JSON.stringify(txs));
                    
                    // Return to summary screen.
                   
                    this.$router.push({name: 'Wallet', params: {walletAddress: this.walletAddress}});
                   
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
