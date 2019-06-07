<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

  import env from './common/Environment';
  import axios from 'axios';
  import { now } from 'moment';
  export default {
    name: 'erctokendesktop',
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
        this.checkForUpdate().then((result,error) => {
          if(result){
          console.log("LOADED APP") 
          console.log("expired",this.expired)
          }
          if(error){
            console.log("error")
            console.log("expired",this.expired)
          }
          console.log("outexpirerd",this.expired)
          if(this.expired == true){
            this.$router.push({name: 'Expired'});
            //return false;
          }
        });
      },
      methods : {
        checkForUpdate : async function(){
          return new Promise((resolve,reject) => {
            this.refreshing = true;
            this.updateAvailable = false;
            axios.get('https://api.github.com/repos/lunamonkey/Refactor/releases/latest?' + now())
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
