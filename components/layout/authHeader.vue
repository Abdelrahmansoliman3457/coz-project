<template>
    <div class="home-header">
        <div class="logo-main">
            <img src="@/assets/images/logo.png" class="img" alt="logo" />
        </div>
        <div class="header-links">
            <ul class="links" :class="{ active: active }">
                <div class="logo-main enable-mobile">
            <img src="@/assets/images/logoReg.png" class="img" alt="logo" />
        </div>
                <li>
                    <NuxtLink to="/" class="home-link">Home</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/about" class="home-link">About</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/services" class="home-link">Services</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/contact" class="home-link">Contact</NuxtLink>
                </li>
                <li>
                    <NuxtLink @click="loginModal = !loginModal , active = false" class="home-link">Login</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/auth/register" @click="active = false" class="home-link">Register</NuxtLink>
                </li>

            </ul>
        </div>
        <div class="nav-ic side-open" @click="activeFun">
            <i class="pi pi-bars"></i>
        </div>
    </div>

    <div class="overlay" :class="{ active: active }" @click="activeFun"></div>

    <Dialog v-model:visible="loginModal" class="without-close no-pad topright auth-modal" position="topright"
        :draggable="true" :style="{ width: '28vw' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <div class="modal-header">
            <div class="d-flex align-items-center gap-2">
                <div class="logo-coz">
                    <img src="@/assets/images/coz-main.png" alt="img">
                </div>
                <div class="text">Login to your account</div>
            </div>
            <div class="close-modal pointer-click">
                <i class="pi pi-times" @click="loginModal = false"></i>
            </div>
        </div>
        <div class="modal-body">
            <form @submit.prevent="login">
                <div class="email-cont mb-2 d-flex align-items-center gap-2"
                    v-if="showActive == 'password' || showActive == 'otp'">
                    <div class="icon-check no-shrink">
                        <i class="pi pi-check"></i>
                    </div>
                    <div class="text fs13">{{ email || 'solimainabdelrahman589@gmail.com' }}</div>
                </div>
                <div class="input-g" v-show="showActive == 'email'">
                    <label class="main-label">Email address</label>
                    <div class="main-input">
                        <i class="pi pi-envelope input-icon"></i>
                        <input type="text" class="input-me validInputs" data-valid="Email address" name="email"
                            v-model="email" placeholder="Enter Email address" />
                    </div>
                </div>
                <div class="otp-cont mb-3" v-show="showActive == 'otp'">
                    <label class="main-label">OTP</label>
                    <v-otp-input ref="otpInput" dir="ltr" v-model:value="bindModal"
                        class="justify-content-between gap-mob gap-2" input-classes="otp-input" separator="" :num-inputs="6"
                        :should-auto-focus="true" input-type="numeric" />
                </div>
                <div class="pass-cont" v-show="showActive == 'password'">
                    <div class="input-g">
                        <label class="main-label">Password</label>
                        <div class="main-input">
                            <i class="pi pi-lock input-icon"></i>
                            <input type="password" class="input-me validInputs" data-valid="Password" name="password"
                                v-model="password" placeholder="Enter your password" />
                        </div>
                    </div>
                    <div class="d-flex align-items-center gap-2 justify-content-between">
                        <div class="input-g-def">
                            <div class="d-flex gap-2 align-items-center">
                                <input type="checkbox" @change="togglePassword" id="pass" class="mainRadio"
                                    name="virtualBrochureTerms">
                                <label class="fs14 mb-0" for="pass">show password</label>
                            </div>
                        </div>

                        <div class="forget fs13 pointer-click">Forget Password?</div>

                    </div>
                </div>
                <div class="d-flex align-items-center gap-2 justify-content-between mb-3" v-if="showActive == 'otp'">
                    <button :disabled="disabledBtn" @click="resendCode" type="button"
                        class="c-main resend pointer-click transparent-btn ">Resend Otp</button>
                    <div class="timer c-main " dir="rtl" v-if="disabledBtn">{{ counterText }}</div>
                </div>

                <div class="btn-cont mb-3 mt-3" v-show="showActive == 'password'">
                    <button class="main-btn w-100 transparent" @click="showActiveFunc('otp')" type="button">Enter
                        Otp instead</button>
                </div>
                <div class="btn-cont mb-3">
                    <button class="main-btn  w-100 transparent" @click="showActiveFunc('password')"
                        v-show="showActive == 'otp'" type="button">Proceed
                        with password instead</button>
                </div>
                <div class="btn-cont mb-2" v-show="showActive == 'otp' || showActive == 'password'">
                    <button class="main-btn up up-xl w-100" :disabled="loading" type="submit">
                        <div v-if="!loading">Login</div>
                        <div v-else class="loader-spin"></div>
                    </button>
                </div>
                <div class="btn-cont">
                    <button class="main-btn w-100 transparent" @click="showActiveFunc('password')"
                        v-show="showActive == 'email'" type="button">Proceed with password</button>
                </div>
                <div class="text-center" v-show="showActive == 'email'">or</div>
                <div class="btn-cont mb-2" v-show="showActive == 'email'">
                    <button class="main-btn up up-xl w-100" @click="showActiveFunc('otp')" type="button">Enter
                        Otp</button>
                </div>
            </form>
        </div>
    </Dialog>


</template>

<script setup>
/******************* Import *******************/
import VOtpInput from "vue3-otp-input";

// toastNotify
const { toastNotify } = toastMsg();
/******** data ****************/
const loginModal = ref(false);
const showActive = ref('email');
const loading = ref(false);


// counter
const counterNum = ref(30);
const counterText = ref('');

// disabledBtn
const disabledBtn = ref(false);
const active = ref(false);


/*************** Methods **************** */

const activeFun = () => {
  active.value = !active.value;
};


function login() {
    loading.value = true
    setTimeout(() => {
        loading.value = false
        navigateTo('/customer/home')
    }, 1000);

}



// togglePassword
const togglePassword = (e) => {
    let icon = e.currentTarget;
    let input = icon.closest(".pass-cont").querySelector(".input-me");
    input.type === "password"
        ? input.setAttribute("type", "text")
        : input.setAttribute("type", "password");

};

const showActiveFunc = (val) => {
    showActive.value = val;
    if (val == 'otp') {
        if (disabledBtn.value == false && counterNum.value == 30) {
            codeCounter();
        }
        setTimeout(() => {
            document.querySelector('.otp-input').focus();
        }, 500);
    }
}

// resendCode Function
const resendCode = async () => {
    disabledBtn.value = true;
    toastNotify('code has been sent successfully', 'success');
    counterNum.value = 30;
    codeCounter();
    document.querySelector('.otp-input').focus();
    //   const fd = new FormData();

    //   // fd.append('phone', user.value.phone);
    //   if(forgetPassword.value == 'true'){
    //     fd.append('loginKey',userForgetPass.value?.email || userForgetPass.value?.phone);
    //   }else if(needActive.value == true){
    //     fd.append('loginKey', needActiveMail.value || needActivePhone.value);
    //   }
    //   else{
    //     fd.append("loginKey", authUser.value.phone || authUser.value.email);
    //   }
    // fd.append("loginKey", authUser.value.phone || authUser.value.phone.email);

    //   await axios.patch(`send-code`, fd).then(res => {
    //     if (res.data.key == "success") {
    //       // successToast(res.data.message);
    //       toastNotify(res.data.message, 'success');
    //       counterNum.value = 60;
    //       codeCounter();
    //     } else {
    //       // errorToast(res.data.message);
    //       toastNotify(res.data.message, 'error');
    //     }
    //   }).catch(error => {

    //     toastNotify(error.response.data.message , 'error')
    //     disabledBtn.value = false;
    //   } 
    //   );
}


// counter
let counter;
function codeCounter() {
    disabledBtn.value = true;

    counter = setInterval(function () {
        counterNum.value--;
        if (counterNum.value < 60) {
            counterText.value = `${counterNum.value} : 00`;
        }

        if (counterNum.value > 60) {
            counterText.value = `00 : ${counterNum.value}`;
        }

        if (counterNum.value < 10) {
            counterText.value = `0${counterNum.value} : 00`;
        }

        if (counterNum.value == 0) {
            clearInterval(counter);
            disabledBtn.value = false;
        }
    }, 1000);
}



/*************** Watch **************** */


/******************* Computed *******************/



/*************** Mounted **************** */

onMounted(async () => {

});

</script>

<style lang="scss" scoped></style>