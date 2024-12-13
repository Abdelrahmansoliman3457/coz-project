<template>
  <div class="auth-layout-new">
    <div class="row w-100 m-0">
      <div class="col-lg-7 p-0">
        <div class="home-layout reg-page position-relative">
          <!-- home header -->
          <div class="container">
            <LayoutAuthHeader />
          </div>
          <div class="home container">
            <h6 class="fs22 c-white mt-5 mb-4 mansFont relative">Optimizing the best for you</h6>

            <h1 class="fsh1 c-white font-bold fontregBig">Eligibility <br>
              Assessment</h1>

              <div class="text-reg mt-4 mansFont">All it takes is 3 easy steps to fill out the form</div>
            <div class="centered-image def">
              <img src="@/assets/images/ball.png" alt="bg-img" class="home-bg">
            </div>
          </div>
          <!-- home footer -->
          <LayoutAuthFooter />
        </div>
      </div>
      <div class="col-lg-5 p-0">
        <div class="container h-100-vh main-pad-mob" style="padding-inline: 36px ">
          <div class="left-reg h-100">
            <div class="logo-reg mb-4">
              <img src="@/assets/images/logoReg.png" alt="">
            </div>
            <slot />
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
