<template>
  <transition name="fade">
	<div class="absolute pin-r items-center justify-between  pin-b h-20 block w-1/2 bg-white bg-brand-light text-brand-dark p-5 border-l-4 border border-blue shadow-lg"
  :class="nightMode ? 'bg-brand' : 'bg-grey-lighter'"
  v-if="updateAvailable && !dismiss"
  >
		<div>
    <h4 class="text-brand-dark">An updated wallet is available</h4>
      <p>You are running version v{{env.appVersion}}. Version {{versionAvailable}} has been made available at Bancacy GitHub.</p>
      <p>Info: {{versionInfo}}</p>
    </div> 
      <div class="flex flex-row justify-start items-center mt-2">
        <button @click="open"
        class="focus:outline-none bg-green-dark hover:bg-green-darker text-white py-2 px-4 rounded"
        >Open download page (GitHub) <i class="fas fa-external-link-alt"></i></button>
        <button class="focus:outline-none bg-grey-dark hover:bg-grey-darker text-white py-2 px-4 rounded ml-4" v-on:click="dismiss=true">Ignore for now <i class="fas fa-chevron-down"></i></button>
      </div>
	  </div>
  </transition>
</template>
<script>
  import env from './../../common/Environment';

  import compareVersions from 'compare-versions'
  import axios from 'axios';
  import { setTimeout } from 'timers';

  export default {
  	name: 'Settings',
  	props: ['walletAddress'],

  	data() {
  		return {
            appVersion : env.appVersion,
            updateAvailable : false,
            refreshing : false,
            nightMode : true,
            env : env,
            dismiss : false,
            versionAvailable : "v0.0.0",
            versionInfo : ""
            }
  	},
    mounted () {
      // console.log("settings this.nightMode",this.nightMode) 
      this.checkForUpdate();
      
    },
  	methods: {
      checkForUpdate : function(){
        
        axios.get('https://api.github.com/repos/Bancacy/Bancacy-Desktop-Wallet/releases/latest')
          .then(response => {
              if (response.data.tag_name != undefined) {
                  console.log("response.data.tag_name",response.data.tag_name)
                  console.log("env.appVersion",env.appVersion)
                  console.log("compareVersions",compareVersions(env.appVersion,response.data.tag_name))
                  this.updateAvailable = (compareVersions(env.appVersion,response.data.tag_name) === -1)

                  this.versionAvailable = response.data.tag_name;
                  this.versionInfo = response.data.name;
              }
              setTimeout(() => {
                this.checkForUpdate();
              }, 60000);
          }).catch(error => {
            console.log(error)
          });
      },
      open: function (txHash) {
        const url = 'https://github.com/Bancacy/Bancacy-Desktop-Wallet/releases';

        this.$electron.shell.openExternal(url);
      }
  	}
  }
</script>