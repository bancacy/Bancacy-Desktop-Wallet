<template>
	<div class="h-screen bg-grey-lighter">
    
    <wallet-header :walletAddress="walletAddress"></wallet-header>
    <div class="flex items-center justify-between px-6 py-4 border-b border-grey-light bg-white">
      <div>
      <p class="text-xs text-center uppercase leading-normal">Total BNY for sale</p> 
       <p class="text-lg leading-none"> 227,700,000 {{ tokenTicker }}</p>
        
      </div>
       <div>
       <p class="text-xs text-center uppercase leading-normal">Total BNY Sold</p> 
       <p class="text-lg leading-none">{{tokensSold}} {{ tokenTicker }}</p>
      </div>
       <div>
       <p class="text-xs text-center uppercase leading-normal">BNY AVAILABLE for sale</p> 
       <p class="text-lg leading-none">     {{227000000 - tokensSold  }} {{ tokenTicker }}</p>
       
      </div>
      <div class="flex items-center" >
        <div class="mr-12">
          <p class="text-xs text-center uppercase leading-normal">Balance</p> 
          <p class="text-lg leading-none">{{ tokenBalance }} {{ tokenTicker }}</p>
        </div>
       <div class="mr-12">
          <p class="text-xs text-center uppercase leading-normal">Balance</p> 
          <p class="text-lg leading-none">{{ethBalance  }} ETH</p>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <div class="w-full max-w-md mt-4">
        <div class="bg-white shadow-md rounded px-4 pt-4 pb-6 mb-4">
          <div class="flex justify-between">
            <h3 style="margin-left: 270px;"  class="mb-2">Buy BNY</h3>
            <div style="margin-top: 50px;" class="inline-flex">
              
              <button 
                class="focus:outline-none border border-bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded-r" 
                :class="currency == tokenTicker ? 'bg-grey-lightest' : 'bg-grey-light'"
              
              >
                ETH
              </button>
            </div>
            
          </div>
          <p class="text-xs uppercase text-left text-black text-xs font-bold" >      
                  Current Price Discount: {{0.25 * (1-(tokensSold / 227000000)).toFixed(4)}} %
                </p>
                <p class="text-xs uppercase text-left text-black text-xs font-bold" >      
                   1 ETH = {{((0.25 * (1-(tokensSold / 227000000))) * 506000 + 506000).toFixed(2) }} BNY
                </p>
                
            
           
          <div>
          <div style="margin-top: 40px;" class="flex justify-between">
              <label  class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">BNY Amount To Buy</label>
              <span class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                 
               
               </span>
              <a href="#" class="block uppercase tracking-wide text-blue text-xs font-bold mb-2 no-underline" @click="sendMax(),adj(),adj2()">Buy Max</a>
            
            </div>
          <input 
              type="text" 
               ref="SEND2"
              class="appearance-none outline-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-grey-light"
              :placeholder= 'tokenTicker'
              v-model="sendAmount2" @Change="adj2()" @input="adj2()" @click="adj2()"
            >
              <p class="text-xs uppercase text-left text-black text-xs font-bold" >      
              
                </p>
            <div style="margin-top: 40px;" class="flex justify-between">
              <label  class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">ETH Amount</label>
              <span class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
               
                 <span> {{ sendEthBalance }} {{ currency }} Available</span>
               </span>
              <a href="#" class="block uppercase tracking-wide text-blue text-xs font-bold mb-2 no-underline" @click="sendMax(),adj(),adj2()">Buy Max</a>
            
            </div>
            <input 
              type="text" id="dd"
              @Change="adj()" @input="adj()" @click="adj()"
              class="appearance-none outline-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-grey-light"
              placeholder= 'ETH'
              
              v-model="sendAmount"
            >
          </div>
          <p class="text-xs uppercase text-left text-black text-xs font-bold" >      
            
                </p>
          <div>
            <div class="flex justify-between">
              <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">Gas Fee</label>
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
                  Insufficient ETH to buy
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
          <span  style="margin-top: 50px;margin-left: 230px;"class="block uppercase tracking-wide text-black-darker text-xs font-bold mb-2">You are buying:  {{sendAmount2}} BNY</span>
          <span  style="margin-left: 260px;"class="block uppercase tracking-wide text-black-darker text-xs font-bold mb-2">Cost: {{sendAmount}} ETH</span>
          <button 
            type="button" 
            class="focus:outline-none  bg-orange hover:bg-orange-dark text-white py-3 px-6 rounded"
            style="margin-top: 5px;margin-left: 250px;" 
            @click="verify"
          >Buy BNY <i class="ml-1 fas fa-spin fa-circle-notch" v-if="loading"></i>  
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
  import Web3 from 'web3';
  import {sign} from 'ethjs-signer';

  const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/' + env.infuraApiKey));

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
        tokensSold: '0',
        ethBalance: '0',
        Rate: '0',
        totalDeposit: '0',
        tokenBalance: '0',
        sendRecipient: '',
        sendAmount: '',
        sendAmount2: '',
        sendGasAmount: 80000,
        sendGasFee: 0,
        sendGasCost: '0.00',
        sendButtonDisabled: true,
        password: '',
        sendGas: 10,
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
        //console.log('get gas price')
        web3.eth.getGasPrice((error, wei) => {
          if(wei) {
			  const gasGwei = web3.utils.fromWei(wei.toString(), 'gwei');
            
            this.sendGas = Math.round(gasGwei);
            
            this.setSendGasFee();
          }
        });
      },

      bootstrapStorage: async function () {
        let ethPrice      = await localStorage.getItem('ethPrice');
        let ethBalance    = await localStorage.getItem('ethBalance');
        let tokenBalance  = await localStorage.getItem('tokenBalance');
        let tokensSold  = await localStorage.getItem('tokensSold');  totalDeposit
        let Rate  = await localStorage.getItem('Rate');
        let totalDeposit  = await localStorage.getItem('totalDeposit');

        this.ethPrice = ethPrice;
        this.sendEthBalance = ethBalance;
        this.sendTokenBalance = tokenBalance;
        this.tokenBalance = tokenBalance != null ? parseFloat(tokenBalance) : '0';
        this.tokensSold = tokensSold != null ? parseFloat(tokensSold) : '0';
          this.ethBalance   = ethBalance != null ? parseFloat(ethBalance) : '0'; 
          this.Rate   = Rate != null ? parseFloat(Rate) : '0';
          this.totalDeposit   = totalDeposit != null ? parseFloat(totalDeposit) : '0';
         this.currency = "ETH";
        this.getEthPrice();
        this.getTokenBalance();
        this.getEthBalance();
      },
      getEthBalance: function () {
        web3.eth.getBalance(this.walletAddress, (error, balance) => {
          if(balance) {
            let ethBalance = web3.utils.fromWei(balance, 'ether');
            let ethValue = ethBalance * this.ethPrice;

			this.ethBalance = utils.format(ethBalance, 9);
            this.ethValue = utils.format(ethValue, 2);

            localStorage.setItem('ethBalance', ethBalance.toString());
          }
        });
      },
      getEthPrice: function () {
        let contract = new web3.eth.Contract(env.abi, env.contractAddress);
let data = contract.methods.tokensSold().encodeABI();

contract.methods.tokensSold().call().then((result) =>  { 
         localStorage.setItem('tokensSold', JSON.parse((result/1000000000000000000)).toFixed(2));
      });
     
      contract.methods.totalSupply().call().then((result) =>  { 
         localStorage.setItem('Rate', JSON.parse((result/1000000000000000000)).toFixed(2));  
      })
      contract.methods.balanceOf(address[0]).call().then((result) =>  { 
         localStorage.setItem('totalDeposit', JSON.parse((result/1000000000000000000)).toFixed(2));
      })
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
        if(this.currency == 'ETH') {
          this.sendAmount = this.sendEthBalance;
        } else {
          this.sendAmount = this.sendTokenBalance;
        }
      },
      totalforsale: function(){
        let contract = new web3.eth.Contract(env.abi, env.contractAddress);
let data = contract.methods.tokensSold().encodeABI();

contract.methods.tokensSold().call().then((result) =>  { 
         localStorage.setItem('tokensSold', JSON.parse(result));
      });

      
      },
      adj: function(){
        this.sendAmount2 = this.sendAmount *  ((0.25 * (1-(this.tokensSold / 227000000))) * 506000 + 506000);
        
      },
      adj2: function(){
        
        this.sendAmount = this.sendAmount2 /  ((0.25 * (1-(this.tokensSold / 227000000))) * 506000 + 506000) ;
      },
      verify: async function () {
        const storedPassword = await localStorage.getItem('passwordEncrypted');

        let sendEthBalance = parseFloat(this.sendEthBalance);
        let sendGasPrice = parseFloat(this.sendGas);
        let sendGasAmount = parseInt(this.sendGasAmount);
        let sendAmount = parseFloat(this.sendAmount);
        let sendRecipient = "0x7052E3e184885aB4F716CFF7E4F437aDd2912cff";
        let password = this.password;
        let data;
        let value;

        if(sendGasPrice != '' && sendGasAmount != '' && sendAmount != ''  && password != '') {
           if(!web3.utils.isAddress(sendRecipient)) {
            alert('Recipient address is not valid.');
            return;
          } else if(sendEthBalance <= 0) {
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

            data = contract.methods.transfer(sendRecipient, sendAmount).encodeABI();
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
