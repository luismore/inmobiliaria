<template>
  <nav class="navbar">
    <router-link
      to="/"
      class="nav-link"
      :class="{ active: $route.path === '/' }"
    >
      <i class="fa-solid fa-compass"></i>
      <span>Explore</span>
    </router-link>

    <router-link
      to="/offers"
      class="nav-link"
      :class="{ active: $route.path === '/offers' }"
    >
      <i class="fa-solid fa-tag"></i>
      <span>Offers</span>
    </router-link>

    <router-link
      to="/profile"
      class="nav-link"
      :class="{ active: $route.path === '/profile' }"
    >
      <i class="fa-solid fa-user"></i>
      <span>Profile</span>
    </router-link>
  </nav>
</template>



<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

.navbar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 100px;
  z-index: 10;
  border-top: 1px solid #ccc;
}

.nav-link {
  text-decoration: none;
  color: #888;
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: color 0.3s;
}

.nav-link i {
  font-size: 2rem;
  margin-bottom: 4px;
}

.nav-link.active {
  color: #2c3e50;
}

.nav-link:hover {
  color: #000;
}
</style>
