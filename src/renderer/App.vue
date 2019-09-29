<template>
  <div id="app">
    <router-view></router-view>
    <update></update>
  </div>
</template>

<script>
  import Update from './components/settings/Update';
  import env from './common/Environment';
  import axios from 'axios';
  import { now } from 'moment';
  export default {
    name: 'erctokendesktop',
    components: { Update },
    data() {
        return{
          updateAvailable : false,
          refreshing : false,
          error : false,
          env : env,
          expired : false
        }
      },
      mounted(){
        this.expired = false;
		// TODO: Uncomment this promise to check for update
		
      },
      methods : {
        checkForUpdate : async function(){
          return new Promise((resolve,reject) => {
            this.refreshing = true;
            this.updateAvailable = false;
			// TODO: Create new repo
			axios.get('https://api.github.com/repos/XXXX/Bancacy-Desktop-Wallet-Version-Checker/releases/latest?' + now())
              .then(response => {
                  if (response.data.tag_name != undefined) {
                      
                      this.expired = false;
                      this.error = false;
                      //alert(response.data.tag_name)
                      if(response.data.tag_name == "v0.0.0"){
                          this.expired = true;
                      }
                      resolve();
                  }
                  }).catch(error => {
                    
                    this.error = true;
                    console.log(error);
                    this.expired = false;
                    reject()
                  });
          });
        },
      }
    }
</script>

<style>
  @import url('~@/assets/css/tailwind.css');
  @import url('~@/assets/css/all.css');
</style>
