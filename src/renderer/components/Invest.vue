<template>
	<div class="min-h-screen flex flex-row  bg-green-darkest brand-bg-image">
    
    <wallet-header :walletAddress="walletAddress"></wallet-header>

    <div class="flex flex-grow justify-center">
      <div class="w-full max-w-md mt-4">
        <div class="bg-white shadow-md rounded px-4 pt-4 pb-6 mb-4">
          <div class="flex justify-between">
            <h3 class="mb-2">Invest {{ currency }}</h3>

            <!-- <div class="inline-flex">
              <button 
                class="focus:outline-none border border-bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded-l" 
                :class="currency == tokenTicker ? 'bg-grey-light' : 'bg-grey-lightest'"
                @click="setCurrency(tokenTicker)"
              >
                {{ tokenTicker }}
              </button>
              
            </div> -->
          </div>

        <div class="flex flex-row justify-between items-center">

        <label class=" block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">Choose an investment period:</label>

        <button 
            type="button" 
            class="focus:outline-none hover:bg-orange-dark text-white py-3 px-6 rounded"
            :class="termSelected == terms.short ? 'bg-green' : 'bg-orange'"
            ref="ShortTerm"
            @click="selectTerm('short')" 
          >Short-Term
        </button>
        
        <button 
            type="button" 
            class="focus:outline-none hover:bg-orange-dark text-white py-3 px-6 rounded"
            :class="termSelected == terms.mid ? 'bg-green' : 'bg-orange'"
            @click="selectTerm('mid')"
          >Mid-Term
        </button>
        <button            
            type="button" 
            class="focus:outline-none bg-orange hover:bg-orange-dark text-white py-3 px-6 rounded"
            :class="termSelected == terms.long ? 'bg-green' : 'bg-orange'" 
            @click="selectTerm('long')"
          >Long-Term
        </button>
        
        </div>
          <div v-if="termSelected != ''">
            <div class="flex justify-between">
              <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">{{termSelected}}</label>
              <span class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">{{interestRateText}}</span>
            </div>
            <div class="flex">
              <div class="w-1/3">
                <input ref="TermInput" 
                  type="text" 
                  class="appearance-none outline-none block bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-grey-light"
                  @change="updateFormValues()"
                  @input="updateFormValues()"
                  @click="updateFormValues()"
                  v-model="termInput"
                >
              </div>
              <div class="w-1/3">
                <div class="inline-flex">
                  <button ref="TermUpInput" class="focus:outline-none bg-grey-lightest border bg-grey-lighter hover:bg-grey-lighter text-grey-darkest font-bold py-3 px-4 mr-1 rounded-l-lg" @click="subtractTerm()">
                    <i class="fas fa-chevron-circle-down"></i>
                  </button>
                  <button ref="TermDownInput" class="focus:outline-none bg-grey-lightest border bg-grey-lighter hover:bg-grey-lighter text-grey-darkest font-bold py-3 px-4 rounded-r-lg" @click="addTerm()">
                    <i class="fas fa-chevron-circle-up"></i>
                  </button>
                </div>
              </div>
              <div class="w-1/3">
                <p class="text-xs uppercase text-right text-green text-xs font-bold" >
                  {{earnings}}
                </p>
              </div>
            </div>
            <div class="flex justify-between">
              <label  class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">Amount</label> 
              <span  class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                 <span>{{ sendTokenBalance }} {{ currency }} Available</span>
               </span>
               
              <a href="#"  class="block uppercase tracking-wide text-blue text-xs font-bold mb-2 no-underline" @click="sendMax()">Invest Max</a>
            </div>
            <input 
              type="text"
              @change= "updateFormValues()"     @input  =   "updateFormValues()" @click  =   "updateFormValues()" 
              class="appearance-none outline-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-grey-light"
              :placeholder="currency"
              v-model="sendAmount"
            >
          </div>
          <div v-if="termSelected != ''">
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
          <div v-if="termSelected != ''">
            <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">Account Password</label>
            <input 
              type="password" 
              class="appearance-none outline-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3 leading-tightfocus:outline-none focus:border-grey-light"
              v-model="password"
              placeholder="Password" 
            >
          </div>
          <button  v-if="termSelected"  
            type="button"
            class="focus:outline-none bg-orange hover:bg-orange-dark text-white py-3 px-6 rounded"
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
        currency: env.tokenTicker,
        ethPrice: 0,
        sendEthBalance: 0,
        sendTokenBalance: 0,
        sendRecipient: '',
        sendAmount: '',
        sendGasAmount: 207836,
        sendGasFee: 0,
        sendGasCost: '0.00',
        sendButtonDisabled: true,
        password: '',
        sendGas: 10,
        loading: false,
        totalDeposit2: '0',
        totalsupply: '0',
        error: [],
        termSelected : '',
        terms : {
          short : 'Weeks',
          mid : 'Months',
          long : 'Quarters'
        },
        termInput : '',
        interestRateText : '',
        interestRate : 0,
        rates : {
          short : 0.0016,
          mid : 0.008,
          long : 0.032
        },
        earnings : ''
      
  		}
  	},
    
    mounted() {
      this.getGasPrice();
      this.bootstrapStorage();
      this.getEthPrice();
      this.getData();
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
        let totalDeposit2  = await localStorage.getItem('totalDeposit2');
        let totalsupply  = await localStorage.getItem('totalSupply');
         
        this.ethPrice = ethPrice;
        this.sendEthBalance = ethBalance;
        this.sendTokenBalance = tokenBalance;
        this.totalDeposit2   = totalDeposit2 != null ? parseFloat(totalDeposit2) : '0';
        this.totalsupply   = totalsupply != null ? parseFloat(totalsupply) : '0';
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
      getData : function(){
          let contract = new web3.eth.Contract(env.abi, MAINNET ? env.contractAddress.bnyMainnet : env.contractAddress.bnyTestnet);
          contract.methods.totalSupply().call().then((result) =>  { 
            localStorage.setItem('totalSupply', JSON.parse((result/1000000000000000000)).toFixed(2));  
          })
          contract.methods.balanceOf('0x0000000000000000000000000000000000000000').call().then((result) =>  { 
            localStorage.setItem('totalDeposit2', JSON.parse((result/1000000000000000000)).toFixed(2));
          })
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
        this.updateFormValues();
        this.sendAmount = parseInt(this.sendTokenBalance);
      },
      addTerm: function () {
        this.termInput++;
        this.updateFormValues();  
      },
      subtractTerm: function () {
        if(this.termInput >0){
          this.termInput --;
        }
        this.updateFormValues();
      },
      selectTerm: function (term) {  
        this.termSelected = this.terms[term];
        this.interestRate = this.rates[term];
        this.updateFormValues();
      },
      updateFormValues:function(){
        this.interestRateText = "Interest rate : " +  (((1 - this.totalDeposit2/this.totalsupply) * this.interestRate ) *100 * this.termInput).toLocaleString()+"%";
        this.earnings ="BNY earned : " +  (((1 - this.totalDeposit2/this.totalsupply) * this.interestRate )    * this.termInput * this.sendAmount).toLocaleString();
      },
      verify: async function () {
        const storedPassword = await localStorage.getItem('passwordEncrypted');

        let sendEthBalance = parseFloat(this.sendEthBalance);
        let sendGasPrice = parseFloat(this.sendGas);
        let sendGasAmount = parseInt(this.sendGasAmount);
        let sendAmount = parseFloat(this.sendAmount);
        let sendRecipient = MAINNET ? env.contractAddress.bnyMainnet : env.contractAddress.bnyTestnet;
        let password = this.password;
        let data;
        let value;

        //console.log("sendEthBalance",sendEthBalance);
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
          //console.log("sendAmount",sendAmount);
          let contract = new web3.eth.Contract(env.abi, MAINNET ? env.contractAddress.bnyMainnet : env.contractAddress.bnyTestnet);
          let  unlockTime;
          let  term123;
          if(this.termSelected == this.terms.short){
            term123 = 1;
            unlockTime = this.termInput  * 604800;
          }
          if(this.termSelected == this.terms.mid){
            term123 = 2 ;
            unlockTime = this.termInput  * 2419200;
          }
          if(this.termSelected == this.terms.long){
            term123 = 3;
            unlockTime = this.termInput  * 7257600;
          }
          //console.log("term123",term123)
          //console.log("unlockTime",unlockTime)
          //console.log("this.termInput",this.termInput)
          data = contract.methods.makeInvestment(unlockTime, sendAmount, term123).encodeABI();
          // Change the recipient to be the token contract address.
          //console.log("data",data)
          sendRecipient = MAINNET ? env.contractAddress.bnyMainnet : env.contractAddress.bnyTestnet;
          //console.log("sendRecipient",sendRecipient)
          value = 0;

          //console.log("value",value)
          let balance = this.sendTokenBalance;
          //console.log("balance",balance)
          // Form the transaction object.
          if(this.sendAmount <= parseFloat(balance)) {
            let transaction = {
              to: sendRecipient,
              value: value,
              gas: sendGasAmount,
              gasPrice: sendGasPrice,
              data: data
            };
            //console.log(transaction.value);
            //console.log(transaction.gas);
            //console.log(transaction.gasPrice);
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
                  
                    let txs = localStorage.getItem('tokenPendingTxs');

                    txs = txs == null ? [] : JSON.parse(txs);
                    txs.push(pendingTx);

                    await localStorage.setItem("tokenPendingTxs", JSON.stringify(txs));
                   
                    this.$router.push({name: 'Wallet', params: {walletAddress: this.walletAddress}});
                    
                  } 
                  else {
                  
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
