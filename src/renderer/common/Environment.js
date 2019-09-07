// Token Information
const appVersion = "0.0.6";
const MAINNET = true;

const tokenName 	= 'Bancacy';
const tokenTicker 	= 'BNY';

const contractAddress = {
	bnyMainnet : '0x86149c67e57c749d0a12e6d6c2bf1b616619bb29',
	bnyTestnet : '0xc814302aeeF7260625511a1417054Ed287b934D7'
};
const abi               = JSON.parse('[{"constant":true,"inputs":[],"name":"passiveInvestorIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"BNY_AssetDesolidification","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_passiveIncomeID","type":"uint256"}],"name":"getPassiveInvestmentTerm","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokensForSale","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_passiveIncomeID","type":"uint256"}],"name":"getSimulatedDailyIncome","outputs":[{"internalType":"uint256","name":"_numberOfDaysHeld","type":"uint256"},{"internalType":"uint256","name":"_numberOfDaysOwed","type":"uint256"},{"internalType":"uint256","name":"_totalDailyPassiveIncome","type":"uint256"},{"internalType":"uint256","name":"_dailyPassiveIncome","type":"uint256"},{"internalType":"uint256","name":"_totalReward","type":"uint256"},{"internalType":"uint256","name":"_day","type":"uint256"},{"internalType":"bool","name":"_spent","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"minForPassive","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"fundsWallet","outputs":[{"internalType":"address payable","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokensPerWei","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"multiplicationForMidTerm","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"BNY_AssetSolidification","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"BNY_DATA","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_passiveIncomeID","type":"uint256"}],"name":"getPassiveIncomeDay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokensSold","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"makePassiveIncomeInvestment","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_unlockTime","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"term123","type":"uint256"}],"name":"makeInvestment","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"standard","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getBlockTimestamp","outputs":[{"internalType":"uint256","name":"blockTimestamp","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burnFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"interestRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_passiveIncomeID","type":"uint256"}],"name":"getPassiveInvestmentTimeStamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_investmentId","type":"uint256"}],"name":"releaseInvestment","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"Percent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getBalanceOf","outputs":[{"internalType":"uint256","name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"multiplicationForLongTerm","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"XBNY","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_ID","type":"uint256"}],"name":"getInvestmentTerm","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_investment","type":"uint256"},{"internalType":"uint256","name":"_term","type":"uint256"}],"name":"getInterestRate","outputs":[{"internalType":"uint256","name":"rate","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_tokensAmount","type":"uint256"}],"name":"getDiscountOnBuy","outputs":[{"internalType":"uint256","name":"discount","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_passiveIncomeID","type":"uint256"}],"name":"getPassiveDetails","outputs":[{"internalType":"address","name":"investorAddress2","type":"address"},{"internalType":"uint256","name":"investedAmount2","type":"uint256"},{"internalType":"uint256","name":"dailyPassiveIncome","type":"uint256"},{"internalType":"uint256","name":"investmentTimeStamp","type":"uint256"},{"internalType":"uint256","name":"investmentUnlocktime2","type":"uint256"},{"internalType":"uint256","name":"day","type":"uint256"},{"internalType":"bool","name":"spent2","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_passiveIncomeID","type":"uint256"}],"name":"getPassiveIncomeStatus","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"investorIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_ID","type":"uint256"}],"name":"getInvestmentStatus","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalInvestmentAfterInterest","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_passiveIncomeID","type":"uint256"}],"name":"getPassiveNumberOfDays","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_passiveIncomeID","type":"uint256"}],"name":"releasePassiveIncome","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"_fundsWallet","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_investor","type":"address"},{"indexed":false,"internalType":"uint256","name":"_investmentValue","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_ID","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_unlocktime","type":"uint256"},{"indexed":false,"internalType":"string","name":"_investmentTerm","type":"string"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_investor2","type":"address"},{"indexed":false,"internalType":"uint256","name":"_investmentValue2","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_ID2","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_unlocktime2","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_dailyIncome","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_investmentTime","type":"uint256"}],"name":"PassiveDeposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_acclaimer","type":"address"},{"indexed":true,"internalType":"uint256","name":"_amout","type":"uint256"}],"name":"Spent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_acclaimer2","type":"address"},{"indexed":true,"internalType":"uint256","name":"_amout2","type":"uint256"}],"name":"PassiveSpent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_owner","type":"address"},{"indexed":true,"internalType":"address","name":"_spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]');

// API Key Information
const infuraApiKey			= '4ebd9cfd400541638a68206ad8794c32';
const etherScanApiKey = 'X3T6YSG2RTJFUYTM6M55C5DTA22HDFF3MT';
const ethplorerApiKey		= '';
const coinlibApiKey			= '';

module.exports = {
	MAINNET,
	tokenName,
	appVersion,
	tokenTicker,
	contractAddress,
  	abi,
	infuraApiKey,
	etherScanApiKey,
	ethplorerApiKey,
	coinlibApiKey
};