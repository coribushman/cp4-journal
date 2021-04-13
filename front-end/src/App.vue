<template>
<div id="app">
  <div id="menu">
    <div class="empty"></div>
    <div id="home" class="menu-item">
      <router-link to="/">Home</router-link>
    </div>
    <div id="create" class="menu-item">
      <router-link to="/create">Create</router-link>
    </div>
  </div>
  <router-view/>
  <div class="footer">
    <a href='https://github.com/coribushman/cp3-journal'>Github</a>
  </div>
</div>
</template>

<script>
export default {

}
</script>

<style>

* {
  box-sizing: border-box;
  font-family: Optima;
  font-weight: 700;
}


#menu {
  display: flex;
  justify-content: right;
  background-color: #262626;
}

.empty {
  width: 80%;
}

.menu-item {
  margin: 30px;
  align-items: center;
}

#menu a {
  color: black;
  text-decoration: none;
  font-size: 30px;
  color: white;
}

.footer {
   display: flex;
   justify-content: center;
   align-items: center;
   position: fixed;
   bottom: 0;
   width: 100%;
   height: 2.5rem;
   background-color: #262626;
 }

 .footer a {
   color: white;
   text-decoration: none;
 }



</style>
