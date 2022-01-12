<template>
  <div id="nav"> 
  <div class="caramel"></div>
    <div class="title"><h1><i class="far fa-hand-scissors"></i>&nbsp;Trello <div class="logo"></div></h1></div>
    <!-- <router-link to="/">Home </router-link> |
    <router-link to="/trello">Trello</router-link> -->
  </div>
   <div class="twix" v-tilt></div>
   <router-view />
 
</template>


<style>
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  text-align: center;
  /* color: #2c3e50; */
  background: linear-gradient(0deg, rgba(255,252,222,1) 50%, rgba(244,193,98,1) 100%, rgba(255,252,222,1) 100%);
  min-width: min-content;

}

 .twix {
  background-image: url('./assets/twix-baton.png');
  width: 814px;
  height: 650px;
  background-repeat: no-repeat;
  position: absolute;
  top: 300px;
  right: 50px;
  z-index: 0;
}

body {
  margin: 0;
  padding: 0;
}

input {
  border: none;
  font-size: 15px;
  outline: none;
}
#nav {
  padding: 5px;
  background-color:transparent;
  padding: 0;
  margin: 0;
}

#nav {
  font-weight: bold;
  color: #000000;
}


.title h1 {
  font-family: 'Ubuntu', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  padding: 10px;
  display: flex;
  justify-content: center;
}

.caramel {
  background-image: url('./assets/caramalnav.png');
  background-size:auto;
  background-repeat: repeat-x;
  min-width: min-content;
  height: 80px;
}

.logo {
  background-image: url('./assets/logotwix.png');
  background-size: 100%;
  background-repeat: no-repeat;
  width: 100px;
  height: 60px;
}



</style>
