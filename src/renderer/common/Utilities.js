import moment from 'moment';
import env from './Environment';
import Web3 from 'web3';
class Utilities {
  web3 = () => {
    return new Web3(new Web3.providers.HttpProvider('https://' + (env.MAINNET ? 'MAINNET' : 'ropsten') + '.infura.io/v3/' + env.infuraApiKey));
  };

	format = (number, decimals = 5) => {
		number = Math.floor(number * Math.pow(10, decimals)) / Math.pow(10, decimals);

		const parts = number.toString().split(".");
    
    if(decimals == 5) {
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, "");
    } else {
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

		return parts.join(".");
	}
  newer = (timestamp) => {
    return moment().unix() > timestamp;
  }
  formatTime = (timestamp) => { 
    return moment.unix(timestamp).fromNow();
  }

  getTimestamp = (datetime) => {
    return moment.utc(datetime).unix();
  }

  weiToEth = (number) => {
    return number / Math.pow(10, 18);
  }

	ethToWei = (number) => {
		number = number * Math.pow(10, 18);
		
    if(/\d+\.?\d*e[\+\-]*\d+/i.test(number)) {
      let zero = '0',
      parts = String(number).toLowerCase().split('e'),
      e = parts.pop(),
      l = Math.abs(e),
      sign = e/l,
      coeff_array = parts[0].split('.');
      
      if(sign === -1) {
          number = zero + '.' + new Array(l).join(zero) + coeff_array.join('');
      }
      else {
          let dec = coeff_array[1];
          if(dec) l = l - dec.length;
          number = coeff_array.join('') + new Array(l+1).join(zero);
      }
    }
    
    return number;
	}

}

const utils = new Utilities();

export default utils;