<template>
  
  <div class="sidebar-menu accordion" id="sidebar">
    <!-- <div class="sidebar-logo">
      <NuxtLink to="/" class="d-block"><img src="../../assets/imgs/logo.png" class="img-logo" alt="" /></NuxtLink>
      <i class="pi pi-times close-ic" @click="activeFun"></i>
    </div> -->
    <ul class="sidebar-anchors">

      <div class="top-side">

        <div class="flex-center">
          <button class="main-btn w-100 up" @click="addProjectOpen" type="button">Add New Project</button>
        </div>
        <hr>
        <li class="item">
          <NuxtLink to="/customer/home" class="box-item">
            <span class="icon-container">
              <img src="@/assets/images/Vector.png" alt="icon" class="img-1" />
            </span>
            <span class="hint">
              Dashboard
            </span>
          </NuxtLink>
        </li>
        <li class="item">
          <NuxtLink to="/" class="box-item">
            <span class="icon-container">
              <img src="@/assets/images/Vector (1).png" alt="icon" class="img-1" />
            </span>
            <span class="hint">
              All Projects
            </span>
          </NuxtLink>
          <i class="pi pi-angle-down"></i>
        </li>
      </div>


      <div class="down-centent">
        <div class="add-main mt-2 mb-2">
          <h5 class="relative fs22 mb-4">
            Plan for <br> Maximum <br> Benefits
          </h5>

          <div class="relative fs14 mb-4">
            Ready to unlock the full potential of your plan? Upgrade to Premium or Gold now for exclusive features and benefits.
          </div>

          <button class="main-btn transparent w-100 no-border">Try Now</button>
          <img src="@/assets/images/image.png" class="abs-add" alt="img">
        </div>
        <li class="item">
          <NuxtLink to="/" class="box-item">
            <span class="icon-container">
              <img src="@/assets/images/Vector (2).png" alt="icon" class="img-1" />
            </span>
            <span class="hint">
              Help Center
            </span>
          </NuxtLink>
          <i class="pi pi-angle-down"></i>
        </li>
  
  
        <li class="item">
          <NuxtLink @click="logout"  class="box-item pointer-click" :class="{pointerNone : loading}">
            <span class="icon-container">
              <img src="@/assets/images/log-out-img.png" alt="icon" class="img-1" />
            </span>
  
            <span class="hint c-red">
              {{ $t("sidebar.logout") }}
            </span>
          </NuxtLink>
          <!-- <i class="pi pi-angle-left"></i> -->
        </li>
      </div>
    </ul>
  </div>


  <Dialog v-model:visible="addprojectModal" modal class="without-close no-pad topright auth-modal"
        :draggable="true" :style="{ width: '40vw' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <div class="modal-header">
            <div class="d-flex align-items-center gap-2">
                <div class="text c-black">New Project</div>
            </div>
            <div class="close-modal pointer-click">
                <i class="pi pi-times" @click="addprojectModal = false"></i>
            </div>
        </div>
        <div class="modal-body">
            <form @submit.prevent="addProject">
          
                <div class="input-g" >
                    <label class="main-label">Project Name</label>
                    <div class="main-input">
                        <input type="text" class="input-me validInputs" data-valid="Project Name" name="email"
                            v-model="email" placeholder="Enter name of tha project" />
                    </div>
                </div>
                <div class="input-g" >
                    <label class="main-label">Project Description</label>
                    <div class="main-input">
                      <textarea class="input-me validInputs" rows="3" data-valid="Project Description" placeholder="Describe your project"></textarea>
                    </div>
                </div>
     
                <div class="btn-cont mb-2">
                    <button class="main-btn up up-xl w-100" :disabled="loading" type="submit">
                        <div v-if="!loading">Create</div>
                        <div v-else class="loader-spin"></div>
                    </button>
                </div>
      
            </form>
        </div>
  </Dialog>
  <Dialog v-model:visible="doneModal" modal class="without-close no-pad topright auth-modal"
        :draggable="true" :style="{ width: '30vw' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <div class="modal-header">
            <div class="d-flex align-items-center gap-2"></div>
            <div class="close-modal pointer-click">
                <i class="pi pi-times" @click="doneModal = false"></i>
            </div>
        </div>
        <div class="modal-body py-5">
            <div class="flex-center mb-4">
                <img src="@/assets/images/Frame 1984077982.png" class="sucess-img" alt="img">
              </div>
              <h5 class="c-black text-center">Project added successfully</h5>
        </div>
  </Dialog>
</template>

<script setup>

const route = useRoute();

const addprojectModal = ref(false)
const doneModal = ref(false)






/******************* Plugins Or Composables *******************/

/******************* Data *******************/
const loading = ref(false)
/******************* Props And Inject *******************/

/******************* Methods *******************/
const addProjectOpen = () => {
    addprojectModal.value = true
    document.querySelector('.sidebar-menu').classList.remove('active')
    document.querySelector('.nav-overlay').classList.remove('active')
}
// Toggle Sidebar
function activeFun() {
  document.getElementById("sidebar").classList.toggle("active");
  document.getElementById("navOverlay").classList.toggle("active");
}

// methods
function addProject(){
    loading.value = true
    setTimeout(() => {
        loading.value = false
        addprojectModal.value = false
        doneModal.value = true
    }, 1000);
}




/*************** Watch **************** */


/******************* Computed *******************/



/***************** methods*********** */
const logout = async () => {
  navigateTo("/");
};


/******************* Mounted *******************/
</script>

<style scoped></style>
