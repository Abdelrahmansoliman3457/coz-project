<template>
  <section class="navBar" :class="{ move: active }">
    <div class="top-nav">
      <div class="">
        <div class="inner">
          <div class="d-flex">
            <img src="@/assets/images/logoReg.png" class="dash-logo" alt="logo">
          </div>
          <div class="left">
     
            <NuxtLink to="/notifications" @click="active = false" class="notif-icon" data-number="12">
              <img src="@/assets/images/bell.png" class="bell-image" alt="bell">
              <span class="count">10</span>
            </NuxtLink>

            <NuxtLink to="/customer/profile" class="account flex-profile-btn align-items-center">
              <div class="d-flex gap-2 align-items-center">
                <img src="@/assets/images/user.jpg" alt="img" class="profile-img" />
                <div class="info disable-mobile">
                  <div class="fs15">Acwa Power</div>
                  <span class="c-gray fs11">Power Enegry</span>
                </div>
              </div>
              <div class="icon-pro disable-mobile">
                <i class="pi pi-angle-down"></i>
              </div>
            </NuxtLink>
            <button class="navbar-btn enable-mobile px-2" @click="activeFun">
              <i class="pi pi-bars"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- ************** End Navbar ************** -->

  <div class="nav-overlay" id="navOverlay" :class="{ active: active }" @click="activeFun"></div>
</template>

<script setup>

/******************* Plugins Or Composables *******************/

/******************* Data *******************/
// Active Sidebar
const active = ref(false);
/******************* Props And Inject *******************/

/******************* Methods *******************/

// Toggle Sidebar
function activeFun() {
  active.value = !active.value;
  document.getElementById("sidebar").classList.toggle("active");
  document.getElementById("allContent").classList.toggle("move");
}

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/
</script>

<style scoped></style>
