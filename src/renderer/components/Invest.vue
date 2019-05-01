<template>
	<div class="h-screen bg-grey-lighter">
    
    <wallet-header :walletAddress="walletAddress"></wallet-header>

    <div class="flex justify-center">
      <div class="w-full max-w-md mt-4">
        <div class="bg-white shadow-md rounded px-4 pt-4 pb-6 mb-4">
          <div class="flex justify-between">
            <h3 class="mb-2">Invest {{ currency }}</h3>

            <div class="inline-flex">
              <button 
                class="focus:outline-none border border-bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded-l" 
                :class="currency == tokenTicker ? 'bg-grey-light' : 'bg-grey-lightest'"
                @click="setCurrency(tokenTicker)"
              >
                {{ tokenTicker }}
              </button>
              <button 
                class="focus:outline-none border border-bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded-r" 
                :class="currency == tokenTicker ? 'bg-grey-lightest' : 'bg-grey-light'"
                @click="setCurrency('ETH')"
              >
                ETH
              </button>
            </div>
          </div>
        <button 
            type="button" 
            class="focus:outline-none bg-orange hover:bg-orange-dark text-white py-3 px-6 rounded"
            ref="ShortTerm"
            style="margin-top: 50px;" 
            @click="ShortTerm" 
          >Short-Term <i class="ml-1 fas fa-spin fa-circle-notch" v-if="loading"></i>
          
        </button>
        
        <button 
            type="button" 
            class="focus:outline-none bg-orange hover:bg-orange-dark text-white py-3 px-6 rounded"
            ref="MidTerm"
            style="margin-top: 50px;margin-left:130px;" 
            @click="MidTerm"
          >Mid-Term <i class="ml-1 fas fa-spin fa-circle-notch" v-if="loading"></i>
        </button>
        <button            
            type="button" 
            class="focus:outline-none bg-orange hover:bg-orange-dark text-white py-3 px-6 rounded"
            ref="LongTerm"
            style="margin-top: 50px;margin-left:130px;" 
            @click="LongTerm"
          >Long-Term <i class="ml-1 fas fa-spin fa-circle-notch" v-if="loading"></i>
        </button>
        
          <div>
            <div class="flex justify-between">
              <label style="margin-top: 30px;" ref="WMQ" class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"  ></label>
              <span style="margin-top: 30px;" ref="IR" class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"></span>
            </div>
            <div class="flex">
              <div class="w-1/3">
                <input  ref="TermInput" style="visibility:hidden;" 
                  type="text" 
                  class="appearance-none outline-none block bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-grey-light"
                  @change= "updateOnInput()"     @input  =   "updateOnInput()" @click  =   "updateOnInput()" 
                >
              </div>
              <div class="w-1/3">
                <div class="inline-flex">
                  <button ref="TermUpInput" style="visibility:hidden;"  class="focus:outline-none bg-grey-lightest border bg-grey-lighter hover:bg-grey-lighter text-grey-darkest font-bold py-3 px-4 mr-1 rounded-l-lg" @click="subtractTerm()">
                    <i class="fas fa-chevron-circle-down"></i>
                  </button>
                  <button ref="TermDownInput" style="visibility:hidden;"  class="focus:outline-none bg-grey-lightest border bg-grey-lighter hover:bg-grey-lighter text-grey-darkest font-bold py-3 px-4 rounded-r-lg" @click="addTerm()">
                    <i class="fas fa-chevron-circle-up"></i>
                  </button>
                </div>
              </div>
              <div class="w-1/3">
                <p ref="netInterts"  class="text-xs uppercase text-right text-green text-xs font-bold" >
                  
                </p>
              </div>
            </div>
                
                  
               
              
            <div class="flex justify-between">
            
            
              <label  class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">Amount</label> 
              <span  class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                 <span  v-if="currency == tokenTicker">{{ sendTokenBalance }} {{ currency }} Available</span>
                 <span  v-else>{{ sendEthBalance }} {{ currency }} Available</span>
               </span>
              <a href="#"  class="block uppercase tracking-wide text-blue text-xs font-bold mb-2 no-underline" @click="sendMax()">Invest Max</a>
            </div>
            <input 
              type="text" 
              ref="AmountToken"
              @change= "updateOnInput()"     @input  =   "updateOnInput()" @click  =   "updateOnInput()" 
              class="appearance-none outline-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-grey-light"
              :placeholder="currency"
              v-model="sendAmount"
            >
          </div>
          <div>
            <div class="flex justify-between">
              <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">Investing Gas Fee</label>
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
                  Insufficient ETH to Invest
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
            style="margin-top: 5px;margin-left: 230px;" 
            @click="verify"
          >Send Investment <i class="ml-1 fas fa-spin fa-circle-notch" v-if="loading"></i>
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
        sendRecipient: '',
        sendAmount: '',
        sendGasAmount: 300000,
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

        this.ethPrice = ethPrice;
        this.sendEthBalance = ethBalance;
        this.sendTokenBalance = tokenBalance;

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
        if(this.currency == 'ETH') {
          this.sendAmount = this.sendEthBalance;
        } else {
          this.sendAmount = this.sendTokenBalance;
        }
       
      },
      addTerm: function () {
        this.$refs.TermInput.value ++;
        if(this.$refs.WMQ.textContent == "Weeks"){
          this.$refs.IR.textContent = "Interest rate : " + 0.008 * this.$refs.TermInput.value + "%";
          this.$refs.netInterts.textContent ="BNY earned : " + 0.008   * this.$refs.TermInput.value * this.$refs.AmountToken.value;
        }
          if(this.$refs.WMQ.textContent == "Months"){
          this.$refs.IR.textContent = "Interest rate : " + 0.04 * this.$refs.TermInput.value+"%";
          this.$refs.netInterts.textContent ="BNY earned : " + 0.04   * this.$refs.TermInput.value * this.$refs.AmountToken.value;
          }
          if(this.$refs.WMQ.textContent == "Quaters"){
          this.$refs.IR.textContent = "Interest rate : " + 0.16   * this.$refs.TermInput.value+"%";
          this.$refs.netInterts.textContent = "BNY earned : " + 0.16   * this.$refs.TermInput.value * this.$refs.AmountToken.value;
          }       
          
      },

      subtractTerm: function () {
        if(this.$refs.TermInput.value >0){
        this.$refs.TermInput.value --;
        }
         if(this.$refs.WMQ.textContent == "Weeks"){
          this.$refs.IR.textContent = "Interest rate : " + 0.008 * this.$refs.TermInput.value + "%";
          this.$refs.netInterts.textContent ="BNY earned : " + 0.008   * this.$refs.TermInput.value * this.$refs.AmountToken.value;
        }
          if(this.$refs.WMQ.textContent == "Months"){
          this.$refs.IR.textContent = "Interest rate : " + 0.085 * this.$refs.TermInput.value+"%";
          this.$refs.netInterts.textContent ="BNY earned : " + 0.085   * this.$refs.TermInput.value * this.$refs.AmountToken.value;
          }
          if(this.$refs.WMQ.textContent == "Quaters"){
          this.$refs.IR.textContent = "Interest rate : " + 0.16   * this.$refs.TermInput.value+"%";
          this.$refs.netInterts.textContent ="BNY earned : " + 0.16   * this.$refs.TermInput.value * this.$refs.AmountToken.value;
          }
        
      },
      ShortTerm: function () {  
          this.$refs.ShortTerm.style="background-color: #F00;margin-top: 50px;" 
          this.$refs.MidTerm.style="margin-left:130px;"
          this.$refs.LongTerm.style="margin-left:130px;"       
          this.$refs.WMQ.textContent = "Weeks";
          this.$refs.IR.textContent = "Interest rate : " + 0.008 * this.$refs.TermInput.value+"%";
          this.$refs.TermDownInput.style = "visibility:visble;";
          this.$refs.TermUpInput.style = "visibility:visble;";
          this.$refs.TermInput.style = "visibility:visble;";
          
          if(this.$refs.WMQ.textContent == "Weeks"){
         
          this.$refs.netInterts.textContent ="BNY earned : " + 0.008   * this.$refs.TermInput.value * this.$refs.AmountToken.value;
        }
          if(this.$refs.WMQ.textContent == "Months"){
          
          this.$refs.netInterts.textContent ="BNY earned : " + 0.085   * this.$refs.TermInput.value * this.$refs.AmountToken.value;
          }
          if(this.$refs.WMQ.textContent == "Quaters"){
         
          this.$refs.netInterts.textContent ="BNY earned : " + 0.16   * this.$refs.TermInput.value * this.$refs.AmountToken.value;
          }
      
      },
      MidTerm: function () {
          this.$refs.MidTerm.style="background-color: #F00;margin-left:130px;margin-top: 50px;"
          this.$refs.LongTerm.style="margin-left:130px;"
          this.$refs.ShortTerm.style="margin-top: 50px;"
          this.$refs.WMQ.textContent = "Months";
          this.$refs.IR.textContent = "Interest rate : " + 0.085 * this.$refs.TermInput.value+"%";
          this.$refs.TermDownInput.style = "visibility:visble;";
          this.$refs.TermUpInput.style = "visibility:visble;";
          this.$refs.TermInput.style = "visibility:visble;";
          if(this.$refs.WMQ.textContent == "Weeks"){
         
          this.$refs.netInterts.textContent ="BNY earned : " + 0.008   * this.$refs.TermInput.value * this.$refs.AmountToken.value;
        }
          if(this.$refs.WMQ.textContent == "Months"){
          
          this.$refs.netInterts.textContent ="BNY earned : " + 0.085   * this.$refs.TermInput.value * this.$refs.AmountToken.value;
          }
          if(this.$refs.WMQ.textContent == "Quaters"){
         
          this.$refs.netInterts.textContent ="BNY earned : " + 0.16   * this.$refs.TermInput.value * this.$refs.AmountToken.value;
          }
          
      },
      LongTerm: function () {

          this.$refs.LongTerm.style="background-color: #F00;margin-left:130px;margin-top: 50px;"
          this.$refs.MidTerm.style="margin-left:130px;"
          this.$refs.ShortTerm.style="margin-top: 50px;"       
          this.$refs.WMQ.textContent = "Quaters";
          this.$refs.IR.textContent = "Interest rate : " + 0.16 * this.$refs.TermInput.value+"%";
          this.$refs.TermDownInput.style = "visibility:visble;" ;
          this.$refs.TermUpInput.style = "visibility:visble;";
          this.$refs.TermInput.style = "visibility:visble;";
          if(this.$refs.WMQ.textContent == "Weeks"){
         
          this.$refs.netInterts.textContent ="BNY earned : " + 0.008   * this.$refs.TermInput.value * this.$refs.AmountToken.value;
        }
          if(this.$refs.WMQ.textContent == "Months"){
          
          this.$refs.netInterts.textContent ="BNY earned : " + 0.085   * this.$refs.TermInput.value * this.$refs.AmountToken.value;
          }
          if(this.$refs.WMQ.textContent == "Quaters"){
         
          this.$refs.netInterts.textContent ="BNY earned : " + 0.16   * this.$refs.TermInput.value * this.$refs.AmountToken.value;
          }
      },
      updateOnInput:function(){
         if(this.$refs.WMQ.textContent == "Weeks"){
         
          this.$refs.netInterts.textContent ="BNY earned : " + 0.008   * this.$refs.TermInput.value * this.$refs.AmountToken.value;
        }
          if(this.$refs.WMQ.textContent == "Months"){
          
          this.$refs.netInterts.textContent ="BNY earned : " + 0.085   * this.$refs.TermInput.value * this.$refs.AmountToken.value;
          }
          if(this.$refs.WMQ.textContent == "Quaters"){
         
          this.$refs.netInterts.textContent ="BNY earned : " + 0.16   * this.$refs.TermInput.value * this.$refs.AmountToken.value;
          }
      },
     
      verify: async function () {
        const storedPassword = await localStorage.getItem('passwordEncrypted');

        let sendEthBalance = parseFloat(this.sendEthBalance);
        let sendGasPrice = parseFloat(this.sendGas);
        let sendGasAmount = parseInt(this.sendGasAmount);
        let sendAmount = parseFloat(this.sendAmount);
        let sendRecipient = "0x0000000000000000000000000000000000000000";
        let password = this.password;
        let data;
        let value;

        if(sendGasPrice != '' && sendGasAmount != '' && sendAmount != '' &&  password != '') {
          
          if(sendEthBalance <= 0) {
            alert('Please deposit ETH to send BNY.');
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
            if(this.$refs.WMQ.textContent == "Weeks"){
            var  term123 = 1;
            var  unlockTime = this.$refs.TermInput.value  * 60 ;
            }
           if(this.$refs.WMQ.textContent == "Months"){
          var  term123 = 2 ;
          var  unlockTime = this.$refs.TermInput.value  * 604800 ;
           }
           if(this.$refs.WMQ.textContent == "Quaters"){
           var  term123 = 3;
            var unlockTime = this.$refs.TermInput.value  * 604800 ;
           }
         
         

       
        
            data = contract.methods.investment(unlockTime,sendAmount, term123).encodeABI();
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
            console.log(transaction.value);
            console.log(transaction.gas);
            console.log(transaction.gasPrice);
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
