<template>
	<div class="min-h-screen flex flex-row bg-green-darkest brand-bg-image">
    <wallet-header :walletAddress="walletAddress"></wallet-header>
    <div class="flex-grow">
      <div class="flex items-center justify-between px-6 py-4 border-b border-grey-light bg-white">
        <div>
          1 {{ tokenTicker }} = {{tokenPrice}} USD
        </div>
        <div class="flex items-center">
          <div class="mr-12">
            <p class="text-xs text-center uppercase leading-normal">Balance</p>
            <p class="leading-none font-robot text-xl">{{ (tokenBalance) }} {{ tokenTicker }}</p>
          </div>
          <div>
            <p class="text-xs text-center uppercase leading-normal">Value</p>
            <p class="leading-none font-robot text-xl">${{ tokenValue }} </p>
          </div>
        </div>
      </div>
      <div class="px-3 mt-3">
        <div class="rounded-lg bg-white shadow pb-2">
          <div class="flex justify-between py-3 border-b border-grey-light">
            <h3 class="pl-3 mt-1">{{ tokenTicker }} Transactions</h3>
            <button type="button" class="focus:outline-none bg-grey-lighter hover:bg-grey-light text-grey-darker py-2 px-4 rounded mr-3" @click="updateWallet()">
              <i class="fa fa-sync-alt text-md" :class="refreshing ? 'fa-spin' : ''"></i>
            </button>
          </div>

          <p v-if="completedTxs.length == 0" class="text-sm p-2">
            There are no transactions to show for this address.
          </p>

          <div class="overflow-y-scroll max-h-64" v-if="completedTxs.length > 0">
            <table class="w-full table-auto">
              <tr class="bg-grey-lighter border-b border-grey-light">
                <th class="py-4"></th>
                <th class="text-xs text-left font-semibold uppercase">Amount</th>
                <th class="text-xs text-left font-semibold uppercase">Date</th>
                <th class="text-xs text-left font-semibold uppercase">TxHash</th>
              </tr>
              <tr v-bind:key="pendingTx.key" class="border-b border-grey-lighter text-grey bg-white cursor-pointer" v-for="(pendingTx, index) in pendingTxs " :key="`PTX-${index}`" @click="open(pendingTx.key)">
                <td width="40" height="50" class="px-2" style="vertical-align: middle;">
                  <i class="pt-1 pl-1 fas fa-spin fa-circle-notch"></i>
                </td>
                <td>Pending</td>
                <td>
                  --
                </td>
                <td style="max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; padding-right: 25px;">
                  {{ pendingTx.key }}
                </td>
              </tr>
              <tr v-bind:key="transaction.key" class="border-b border-grey-lighter text-grey-darker bg-white cursor-pointer" v-for="(transaction, index) in completedTxs":key="`transaction-${index}`" @click="open(transaction.key)">
                <td width="40" height="50" class="px-2">
                  <span :style="transaction.from != walletAddress ? 'color: green' : 'color: red'">
                    <i class="text-lg pt-1 pl-1 far" :class="getTxIcon(transaction.from)"></i>
                  </span>
                </td>
                <td>
                  <span :style="transaction.from != walletAddress ? 'color: green' : 'color: red'">{{ utils.format(formatAmount(transaction.amount),10) }}</span>
                </td>
                <td>{{ formatTimestamp(transaction.timestamp) }}</td>
                <td style="max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; padding-right: 25px;">
                  {{ transaction.key }}
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div class="px-3 mt-3">
        <div class="rounded-lg bg-white shadow pb-2">
          <div class="flex justify-between py-3 border-b border-grey-light">
            <h3 class="pl-3 mt-1">{{ tokenTicker }} Investments</h3>
            <div>
            
              <input 
                type="password" 
                class="appearance-none outline-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-1 px-2 mb-1 leading-tightfocus:outline-none focus:border-grey-light"
                v-model="password"
                placeholder="Wallet Password" 
              >
              
            </div>
            <button type="button" class="focus:outline-none bg-grey-lighter hover:bg-grey-light text-grey-darker py-2 px-4 rounded mr-3" @click="updateWallet()">
              <i class="fa fa-sync-alt text-md" :class="refreshing ? 'fa-spin' : ''"></i>
            </button>
            
          </div>

          <p v-if="completedINVS.length == 0" class="text-sm p-2">
            There are no Investments to show for this address.
          </p>

          <div class="overflow-y-scroll max-h-64" v-if="completedINVS.length > 0">
            <table class="w-full table-auto">
              <tr class="bg-grey-lighter border-b border-grey-light">
                <th class="py-5"></th>
                <th class="text-xs text-left font-semibold uppercase">Amount</th>
                <th class="text-xs text-left font-semibold uppercase">Release-Date</th>
                <th class="text-xs text-left font-semibold uppercase">Date</th>
                <th class="text-xs text-left font-semibold uppercase">TxHash</th>
                <th class="text-xs text-left font-semibold uppercase">ClaimS</th>
                  
              </tr>
              <tr v-bind:key="pendingIN.key" class="border-b border-grey-lighter text-grey bg-white" v-for="(pendingIN,index) in pendingINVS" :key="`PIN-${index}`" @click="open(pendingIN.key)">
                <td width="40" height="50" class="px-2" style="vertical-align: middle;">
                  <i class="pt-1 pl-1 fas fa-spin fa-circle-notch"></i>
                </td>
                <td>Pending</td>
                <td>
                  --
                </td>
                <td style="max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; padding-right: 25px;">
                  {{ pendingIN.key }}
                </td>
              </tr>
              <tr v-v v-bind:key="transaction.key" class="border-b border-grey-lighter text-grey-darker bg-white" v-for="(transaction, index) in completedINVS" :key="`Tr-${index}`">
                <td width="40" height="50" class="px-2">
                  <span :style="transaction.investmentValue > 0 ? 'color: green' : 'color: blue'">
                    <i class="text-lg pt-1 pl-1 far" :class="getTxIcon(walletAddress)"></i>
                  </span>
                </td>
                <td>
                  <span :style="transaction.investmentValue > 0 ? 'color: green' : 'color: blue'">{{ formatAmount(transaction.amount) }}</span>
                </td>
                <td>{{formatTimestamp(transaction.UnlockTime) }}</td>
                <td>{{ formatTimestamp(transaction.timestamp) }}</td>
                <td class="cursor-pointer" style="max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; padding-right: 25px;"
                @click="open(transaction.key)"
                >
                  {{transaction.key}}
                  </td>
                  <td><button 
                      type="button"
                      class="focus:outline-none  text-white py-1 px-2 rounded"
                      :class="transaction.spent || !utils.newer(transaction.UnlockTime) ? 'bg-grey-dark cursor-not-allowed' : 'bg-orange hover:bg-orange-dark'"
                      :disabled="transaction.spent || !utils.newer(transaction.UnlockTime)"
                      @click="ClaimInvestment(transaction.ID)"
                      
                    >
                    {{!utils.newer(transaction.UnlockTime) && !transaction.spent ? "Waiting to mature" : transaction.spent ? "Already Claimed" : "CLAIM"}}
                  
                    </button></td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div class="px-3 mt-3 pb-4">
        <div class="rounded-lg bg-white shadow pb-2">
          <div class="flex justify-between py-3 border-b border-grey-light">
            <h3 class="pl-3 mt-1">Passive Income Platform</h3>
            <div>

              <input 
                type="password" 
                class="appearance-none outline-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-1 px-2 mb-1 leading-tightfocus:outline-none focus:border-grey-light"
                v-model="password"
                placeholder="Wallet Password" 
              >

            </div>
            <button type="button" class="focus:outline-none bg-grey-lighter hover:bg-grey-light text-grey-darker py-2 px-4 rounded mr-3" @click="updateWallet()">
              <i class="fa fa-sync-alt text-md" :class="refreshing ? 'fa-spin' : ''"></i>
            </button>
            
          </div>

          <p v-if="completedPSVS.length == 0" class="text-sm p-2">
            There are no Investments to show for this address.
          </p>

          <div class="overflow-y-scroll max-h-64" v-if="completedTxs.length > 0">
            <table class="w-full table-auto">
              <tr class="bg-grey-lighter border-b border-grey-light">
                <th class="py-5"></th>
                <th class="text-xs text-left font-semibold uppercase">Amount</th>
                <th class="text-xs text-left font-semibold uppercase">Unlock-Date   </th>
                <th class="text-xs text-left font-semibold uppercase">Date</th>
                <th class="text-xs text-left font-semibold uppercase">TxHash</th>
                <th class="text-xs text-left font-semibold uppercase">ClaimS</th>
                
              </tr>
              <tr v-bind:key="pendingPS.key" class="border-b border-grey-lighter text-grey bg-white" v-for="pendingPS in pendingPSVS">
                <td width="40" height="50" class="px-2" style="vertical-align: middle;">
                  <i class="pt-1 pl-1 fas fa-spin fa-circle-notch"></i>
                </td>
                <td>Pending</td>
                <td>
                  --
                </td>
                <td style="max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; padding-right: 25px;"
                @click="open(pendingPS.key)"
                >
                  {{ pendingPS.key }}
                </td>
              </tr>
              <tr v-bind:key="transaction2.key" class="border-b border-grey-lighter text-grey-darker bg-white" v-for="(transaction2, index) in completedPSVS" :key="`was-${index}`">
                <td width="40" height="50" class="px-2">
                  <span :style="transaction2.amount > 0 ? 'color: green' : 'color: blue'">
                    <i class="text-lg pt-1 pl-1 far" :class="getTxIcon(walletAddress)"></i>
                  </span>
                </td>
                <td>
                  <span :style="transaction2.amount > 0 ? 'color: green' : 'color: blue'">{{ formatAmount(transaction2.amount) }}</span>
                </td>
                <td>{{formatTimestamp(transaction2.UnlockTime2) }}</td>
                <td>{{ formatTimestamp(transaction2.timestamp) }}</td>
                <td class="cursor-pointer" style="max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; padding-right: 25px;"
                @click="open(transaction2.key)"
                >
                  {{ transaction2.key }}</td>
                  <td>
                    <button 
                    type="button"
                    class="focus:outline-none  text-white py-1 px-2 rounded"
                    :class="(transaction2.timeOwed) > 0 ? 'bg-grey-dark cursor-not-allowed' : 'bg-orange hover:bg-orange-dark'"
                    @click="ClaimPassiveIncome(transaction2.ID2)"
                    v-if="!transaction2.spent"
                  >{{parseInt(transaction2.timeOwed) > 0 ? "CLAIM" : "Wait for 1 day"}}
                  </button>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
  import walletKeystore from './../common/Keystore';
  import WalletHeader from './WalletHeader';
  import env, {MAINNET} from './../common/Environment';
  import utils from './../common/Utilities';
  import _ from 'lodash';
  import axios from 'axios';
  import Invest from './Invest';
  import {sign} from 'ethjs-signer';
  import moment, { months } from 'moment';
  const web3 = utils.web3();
  export default {
  	name: 'Wallet',
    components: { WalletHeader },
    props: [],
  	data() {
  		return {
        tokenTicker: env.tokenTicker,
        tokenName: env.tokenName,
        walletAddress: '',
  		tokenPrice: '0.00',
        tokenBalance: '0',
        tokenValue: '0.00',
        completedTxs: [],
        completedINVS: [],
        completedPSVS: [],
        pendingTxs: [],
        pendingINVS: [],
        pendingPSVS: [],
        password: '',
        refreshing: false,
        utils : utils,
        moment : moment
  		}
  	},
  	mounted() {
      //console.log(moment().unix())
      this.hasWalletAddress();
  	},
  	methods: {
      hasWalletAddress: async function () {
        const walletAddress = await localStorage.getItem('walletAddress');
        if(!walletAddress) {
          this.$router.push('Create');
        } else {
          this.walletAddress = JSON.parse(walletAddress).toString();
          this.getStorageValues();
        }
      },
      getStorageValues: async function () {
        let tokenPrice    = await localStorage.getItem('tokenPrice');
        let tokenBalance  = await localStorage.getItem('tokenBalance');
        let pendingTxs    = await localStorage.getItem('tokenPendingTxs');
        let completedTxs  = await localStorage.getItem('tokenCompletedTxs');
        let completedINVS  = await localStorage.getItem('tokenCompletedINVS');
        let pendingINVS    = await localStorage.getItem('tokenpendingINVS');
        let completedPSVS  = await localStorage.getItem('tokenCompletedPSVS');
        let pendingPSVS    = await localStorage.getItem('tokenpendingPSVS');
       
        this.tokenPrice   = tokenPrice != null ? parseFloat(tokenPrice) : '-.--';
        this.tokenBalance = tokenBalance != null ? parseFloat(tokenBalance) : '0';
        this.pendingTxs   = pendingTxs != null ? JSON.parse(pendingTxs) : [];
        this.completedTxs = completedTxs != null ? JSON.parse(completedTxs) : [];
        this.completedINVS = completedINVS != null ? JSON.parse(completedINVS) : [];
        this.pendingINVS   = pendingINVS != null ? JSON.parse(pendingINVS) : [];
        this.completedPSVS = completedPSVS != null ? JSON.parse(completedPSVS) : [];
        this.pendingPSVS   = pendingPSVS != null ? JSON.parse(pendingPSVS) : [];
        this.updateWallet();
      },
      
      updateWallet: function () {
        this.getTokenPrice();
        this.getTokenBalance();
        localStorage.removeItem("tokenCompletedPSVS")
        localStorage.removeItem("tokenCompletedINVS")
        this.completedPSVS = [];
        this.completedINVS = [];
        this.getCompletedTxs();
      },
	getTokenPrice: function () {
		fetch('https://api3.stex.com/public/ticker/1073')
		.then(response => response.json())
		.then(data => {
			console.log("fetch",data)
			if (data.data.bid != undefined) {
				var ETH_Value = parseFloat(data.data.bid).toFixed(8);
				var USD_Value = data.data.fiatsRate.USD;
				localStorage.setItem('tokenPrice', JSON.parse(ETH_Value * USD_Value).toString());
				this.tokenPrice = (ETH_Value * USD_Value).toFixed(8)
			}
		}).catch(error => {
			console.log(error)
			this.tokenPrice = "No response from STEX API."
		});
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
          if(error){
            console.error(error);
          }
        });
      },
      getCompletedTxs: function () {
        this.refreshing = true;
        let pendingTxs = [];
        let pendingINVS = [];
        let pendingPSVS = [];
        web3.eth.getBlockNumber()
          .then(async response => {
            let listPSVS = [];
            let listTxs = [];
            let listINVS = [];
            
            let fromBlock = 0;
            if(this.completedTxs.length != null) {
              fromBlock = response - 86000;
            }
            if(this.completedINVS.length != null) {
              fromBlock = response - 86000;
            }
            if(this.completedPSVS.length != null) {
              fromBlock = response - 86000;
            }
            
            let contract = new web3.eth.Contract(env.abi, MAINNET ? env.contractAddress.bnyMainnet : env.contractAddress.bnyTestnet);
            let INV = await contract.getPastEvents('Deposit', { filter: {_investor: this.walletAddress}, fromBlock: fromBlock, toBlock: 'latest'});
            if(INV.length > 0) {
              INV = _.uniqBy(INV, 'transactionHash');
              for(let s = 0; s < INV.length; s++) {
                listINVS.push(INV[s]);
              }
            }
            let PSV = await contract.getPastEvents('PassiveDeposit', { filter: {_investor2: this.walletAddress}, fromBlock: fromBlock, toBlock: 'latest'});
            if(PSV.length > 0) {
              PSV = _.uniqBy(PSV, 'transactionHash');
              for(let w = 0; w < PSV.length; w++) {
                listPSVS.push(PSV[w]);
              }
            }
            let toTxs = await contract.getPastEvents('Transfer', { filter: {_to: this.walletAddress}, fromBlock: fromBlock, toBlock: 'latest'});
            if(toTxs.length > 0) {
              toTxs = _.uniqBy(toTxs, 'transactionHash');
              for(let i = 0; i < toTxs.length; i++) {
                listTxs.push(toTxs[i]);
              }
            }
            let fromTxs = await contract.getPastEvents('Transfer', { filter: {_from: this.walletAddress}, fromBlock: fromBlock, toBlock: 'latest'});
            if(fromTxs.length > 0) {
              fromTxs = _.uniqBy(fromTxs, 'transactionHash');
              for(let j = 0; j < fromTxs.length; j++) {
                listTxs.push(fromTxs[j]);
              }
            }
            listTxs.sort((a, b) => {
              return parseInt(b.blockNumber) - parseInt(a.blockNumber);
            });
            listINVS.sort((a, b) => {
              return parseInt(b.blockNumber) - parseInt(a.blockNumber);
            });
            listPSVS.sort((a, b) => {
              return parseInt(b.blockNumber) - parseInt(a.blockNumber);
            });
            if(listTxs.length > 0) {
              let lastTxTimestamp = 0;
              let completedTx;
              if(this.completedTxs.length > 0) {
                lastTxTimestamp = parseInt(this.completedTxs[0].timestamp);
              }
              let tempPending = Object.values(this.pendingTxs);
              for(var p = 0; p < tempPending.length; p++) {
                pendingTxs.push(tempPending[p].key);
              }
              //log("listTxs",listTxs)
              for(let listTx of listTxs) {
                await web3.eth.getBlock(listTx.blockNumber)
                  .then(response => {
                    let timestamp = response.timestamp;
                    let transactionHash = listTx.transactionHash;
                    let transactionFrom = listTx.returnValues._from;
                    let transactionAmount = listTx.returnValues._value;
                    
                    if(pendingTxs.includes(listTx.transactionHash)) {
                      this.pendingTxs = this.pendingTxs.filter((tx) => {return tx.key != listTx.transactionHash});
                      localStorage.setItem('tokenPendingTxs', JSON.stringify(this.pendingTxs));
                    }
                    if(parseInt(timestamp) > lastTxTimestamp) {
                      completedTx = {
                        key: transactionHash,
                        timestamp: timestamp,
                        from: _.toLower(transactionFrom),
                        amount: transactionAmount
                      };
                      this.completedTxs = [completedTx].concat(this.completedTxs);
                      localStorage.setItem('tokenCompletedTxs', JSON.stringify(this.completedTxs));
                      this.refreshing = false;
                    } else {
                      this.refreshing = false;
                    }
                  }).catch(error => {console.log(error)});
              }
            } else {
              localStorage.setItem('tokenCompletedTxs', JSON.stringify(this.completedTxs));
              this.refreshing = false;
            } 
            if(listINVS.length > 0) {
              let lastINVTimestamp = 0;
              let completedIN;
              if(this.completedINVS.length > 0) {
                lastINVTimestamp = parseInt(this.completedINVS[0].timestamp);
              }
              let tempPending = Object.values(this.pendingINVS);
              for(var o = 0; o < tempPending.length; o++) {
                pendingINVS.push(tempPending[o].key);
              }
              console.log("listINVS",listINVS)
              for(let listIN of listINVS) {
                await web3.eth.getBlock(listIN.blockNumber)
                  .then(async response => {
                    let timestamp = response.timestamp;
                    let transactionHash = listIN.transactionHash;
                    let transactionFrom = listIN.returnValues._from;
                    let transactionAmount = listIN.returnValues._investmentValue;
                    let transactionID = listIN.returnValues._ID;
                    let transactionUnlock = listIN.returnValues._unlocktime;
                    if(pendingINVS.includes(listIN.transactionHash)) {
                      this.pendingINVS = this.pendingINVS.filter((tx) => {return tx.key != listIN.transactionHash});
                      localStorage.setItem('tokenPendingINVS', JSON.stringify(this.pendingINVS));
                    }
                    this.getInvestmentStatus(transactionID).then((spentInvestment) => {
                      
                      if(parseInt(timestamp) > lastINVTimestamp) {
                        completedIN = {
                          key: transactionHash,
                          timestamp: timestamp,
                          from: _.toLower(transactionFrom),
                          amount: transactionAmount,
                          UnlockTime: transactionUnlock,
                          ID: transactionID,
                          spent: spentInvestment,
                          ready : true
                        };
                        this.completedINVS = [completedIN].concat(this.completedINVS);
                        localStorage.setItem('tokenCompletedINVS', JSON.stringify(this.completedINVS));
                        this.refreshing = false;
                      } else {
                        this.refreshing = false;
                      }
                      
                    });
                    
                  }).catch(error => {console.log(error)});
              }
            }
          if(listPSVS.length > 0) {
              let lastPSVTimestamp = 0;
              let completedPS;
              if(this.completedPSVS.length > 0) {
                lastPSVTimestamp = parseInt(this.completedPSVS[0].timestamp);
              }
              let tempPending = Object.values(this.pendingPSVS);
              for(var o = 0; o < tempPending.length; o++) {
                pendingPSVS.push(tempPending[o].key);
              }
              console.log("listPSVS",listPSVS)
              for(let listPS of listPSVS) {
                 web3.eth.getBlock(listPS.blockNumber)
                  .then(response => {
                    let timestamp = response.timestamp;
                    let transactionHash = listPS.transactionHash;
                    let transactionFrom = listPS.returnValues._investor2;
                    let transactionAmount = listPS.returnValues._investmentValue2;
                    let transactionID2 = listPS.returnValues._ID2;
                    let transactionUnlock = listPS.returnValues._unlocktime2;
                    let transactionInvestmentTime = parseInt(listPS.returnValues._investmentTime);
                    console.log("transactionInvestmentTime",transactionInvestmentTime)
                    if(pendingPSVS.includes(listPS.transactionHash)) {
                      this.pendingPSVS = this.pendingPSVS.filter((tx) => {return tx.key != listPS.transactionHash});
                      localStorage.setItem('tokenPendingPSVS', JSON.stringify(this.pendingPSVS));
                    }
                    this.getPassiveIncomeStatus(transactionID2).then((spentInvestment) => {
                      this.getPassiveIncomeDay(transactionID2).then((day) => {
                        if(parseInt(timestamp) > lastPSVTimestamp) {
                          completedPS = {
                            key: transactionHash,
                            timestamp: timestamp,
                            from: _.toLower(transactionFrom),
                            amount: transactionAmount,
                            ID2: transactionID2,
                            UnlockTime2: transactionUnlock,
                            spent: spentInvestment,
                            day: day,
                            timeOwed: ((moment().unix() - transactionInvestmentTime) / (86400)) - (day-1)
                          };
                          //console.log("t-tit",moment().unix(),transactionInvestmentTime)
                          //console.log(moment().unix()-transactionInvestmentTime)
                          this.completedPSVS = [completedPS].concat(this.completedPSVS);
                          localStorage.setItem('tokenCompletedPSVS', JSON.stringify(this.completedPSVS));
                          this.refreshing = false;
                        } else {
                          this.refreshing = false;
                        }
                      });
                    });
                  }).catch(error => {console.log(error)});
              }
            }
          }).catch(error => {console.log(error)});
          
      },
      getInvestmentStatus :  function(investmentID){
        return new Promise((resolve, reject) => {
          let contract = new web3.eth.Contract(env.abi, MAINNET ? env.contractAddress.bnyMainnet : env.contractAddress.bnyTestnet);
          //alert("1")
          contract.methods.getInvestmentStatus(investmentID).call().then((result) =>  { 
            console.log("result",result)
            //console.log(investmentID)
            let data = result; 
            //alert(data)
            if(result){
              resolve(true);
              //console.log("Return true")
            }
            else{
              //console.log("Return false")
              resolve(false)
              
            }
            
          });
         });
        
      },
      getPassiveIncomeStatus :  function(investmentID){
        return new Promise((resolve, reject) => {
          let contract = new web3.eth.Contract(env.abi, MAINNET ? env.contractAddress.bnyMainnet : env.contractAddress.bnyTestnet);
          //alert("1")
          contract.methods.getPassiveIncomeStatus(investmentID).call().then((result) =>  { 
            //console.log("result",result)
            //console.log(investmentID)
            let data = result; 
            //alert(data)
            if(result){
              resolve(true);
              //console.log("Return true")
            }
            else{
              //console.log("Return false")
              resolve(false)
              
            }
            
          });
         });
        
      },
      getPassiveIncomeDay :  function(investmentID){
        return new Promise((resolve, reject) => {
          let contract = new web3.eth.Contract(env.abi, MAINNET ? env.contractAddress.bnyMainnet : env.contractAddress.bnyTestnet);
          //alert("1")
          contract.methods.getPassiveIncomeDay(investmentID).call().then((result) =>  { 
            //console.log("result",result)
            //console.log(investmentID)
            let data = result; 
            //alert(data)
            if(result){
              resolve(data);
              //console.log("Return true")
            }
            else{
              //console.log("Return false")
              resolve(data)
            }
            
          });
         });
        
      },
      
      formatTimestamp: function (timestamp) {
        return utils.formatTime(timestamp);
      },
      formatAmount: function (amount) {
		    amount = amount || 0;
        return web3.utils.fromWei(amount.toString());
      },
      getTxIcon: function (from) {
        return from == this.walletAddress ? 'fa-arrow-alt-circle-up' : 'fa-arrow-alt-circle-down'
      },
      open: function (txHash) {
        const url = 'https://' + (MAINNET ? '' : 'ropsten.') + 'etherscan.io/tx/' + txHash;
        this.$electron.shell.openExternal(url);
      },
      ClaimInvestment: function (ID) {
        let contract = new web3.eth.Contract(env.abi, MAINNET ? env.contractAddress.bnyMainnet : env.contractAddress.bnyTestnet);
        let data = contract.methods.releaseInvestment(ID).encodeABI();
        let pass = this.password;
        contract.methods.getInvestmentStatus(ID).call().then((result) =>  {      
          if(!result){
            const storedPassword =  localStorage.getItem('passwordEncrypted');
            
            if(pass != ''){
              if(web3.utils.sha3(pass) != storedPassword) {
                alert('Invalid password.');
                return
              }
              let transaction = {
                to: MAINNET ? env.contractAddress.bnyMainnet : env.contractAddress.bnyTestnet,
                from : this.walletAddress,
                value: 0,
                gas: 100000,
                gasPrice: 10 * 1.0e9,
                data: data
              };
              // Send the transaction.console.log(balance);
              localStorage.removeItem("tokenCompletedINVS")
              this.send(transaction,pass);
            }
          else{
            alert("Please enter your wallet password");
          }
        }
          else{
            alert("Investment already claimed");
          }
        });
      },
      ClaimPassiveIncome: function (ID) {
        
        let contract = new web3.eth.Contract(env.abi, MAINNET ? env.contractAddress.bnyMainnet : env.contractAddress.bnyTestnet);
        let data = contract.methods.releasePassiveIncome(ID).encodeABI();
        let pass = this.password;
        contract.methods.getPassiveIncomeStatus(ID).call().then((result) =>  { 
          //console.log("result",result)
          if(!result){
            const storedPassword =  localStorage.getItem('passwordEncrypted');
            
            if(pass != ''){      
              if(web3.utils.sha3(pass) != storedPassword) {
                alert('Invalid password.');
                return}
                let transaction = {
                  to: MAINNET ? env.contractAddress.bnyMainnet : env.contractAddress.bnyTestnet,
                  from : this.walletAddress,
                  value: 0,
                  gas: 80000,
                  gasPrice: 10 * 1.0e9,
                  data: data
              };
              
              // Send the transaction.console.log(balance);
              //console.info("transaction",transaction)
              localStorage.removeItem("tokenCompletedPSVS")
              this.send(transaction,pass);
            }
            else{
              alert("Please enter your wallet password");
            }
          }
          else{alert("Investment already claimed"); }
        });
      },
      send : function (transaction, password) {
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
                  //console.log(txHash);
                  if(txHash) { 
                    alert("Investment Claimed!");
                  
                  
                    // Set pending tx.
                    let pendingTx = {
                      key: txHash,
                      address: this.walletAddress
                    };
                  
                    //console.log("pendingTx",pendingTx)
                    // Return to summary screen.
                    this.updateWallet();
                    //this.$router.push({name: 'Wallet', params: {walletAddress: this.walletAddress}});
                    
                  } 
                  if(error) {
                  
                    this.loading = false;
                    alert('There was a problem claiming this transaction.');
                    //alert(error);
                  }
                });
              });
            }
          });
        });
      }
    }
    ,watch :{
      
    }
  }
</script>