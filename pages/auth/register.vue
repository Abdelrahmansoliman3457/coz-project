<template>
    <form class="mt-4 reg-height" @submit.prevent="register">
        <div class="register colomn-flex h-100">
            <div class="all-steps">
                <div class="single-step" :class="{ 'current': stepNumber == 1, 'active': stepNumber > 1 }"
                    @click="showStep(1)">
                    <div class="flex-step">
                        <div class="big-circle">
                            <div class="small-circle"></div>
                            <i class="pi pi-check"></i>
                        </div>
                        <div class="line-main"></div>
                    </div>
                    <div class="text c-gray">step 1</div>
                    <div class="step-name">User Information</div>
                    <div class="step-status pending">pending</div>
                    <div class="step-status completed">completed</div>
                    <div class="step-status in-progress">In Progress</div>
                </div>
                <div class="single-step" :class="{ 'current': stepNumber == 2, 'active': stepNumber > 2 }"
                    @click="showStep(2)">
                    <div class="flex-step">
                        <div class="big-circle">
                            <div class="small-circle"></div>
                            <i class="pi pi-check"></i>
                        </div>
                        <div class="line-main"></div>
                    </div>
                    <div class="text c-gray">step 2</div>
                    <div class="step-name">Project Information</div>
                    <div class="step-status pending">pending</div>
                    <div class="step-status completed">completed</div>
                    <div class="step-status in-progress">In Progress</div>
                </div>
                <div class="single-step" :class="{ 'current': stepNumber == 3, 'active': stepNumber > 3 }"
                    @click="showStep(3)">
                    <div class="flex-step">
                        <div class="big-circle">
                            <div class="small-circle"></div>
                            <i class="pi pi-check"></i>
                        </div>
                    </div>
                    <div class="text c-gray">step 3</div>
                    <div class="step-name">Project Scope</div>
                    <div class="step-status pending">pending</div>
                    <div class="step-status completed">completed</div>
                    <div class="step-status in-progress">In Progress</div>
                </div>
            </div>

            <div class="step-one" v-show="stepNumber == 1">
                <div class="input-g">
                    <label class="main-label">Name</label>
                    <div class="main-input">
                        <input type="text" class="input-me validInputs" data-valid="Email address" name="email"
                            v-model="email" placeholder="Enter  Name" />
                    </div>
                </div>
                <div class="input-g">
                    <label class="main-label requiredInputLabel">Email Address</label>
                    <div class="main-input">
                        <input type="text" class="input-me validInputs" data-valid="Email address" name="email"
                            v-model="email" placeholder="Enter Email Address" />
                    </div>
                </div>
                <div class="input-g">
                    <label class="main-label requiredInputLabel">Company Name</label>
                    <div class="main-input">
                        <input type="text" class="input-me validInputs" data-valid="Email address" name="email"
                            v-model="email" placeholder="Enter Company Name" />
                    </div>
                </div>
                <div class="input-g">
                    <label class="main-label requiredInputLabel">Position in the Company</label>
                    <div class="main-input">
                        <input type="text" class="input-me validInputs" data-valid="Email address" name="email"
                            v-model="email" placeholder="Enter Position in the Company" />
                    </div>
                </div>





            </div>
            <div class="step-two" v-show="stepNumber == 2">
                <div class="input-g">
                    <label class="main-label requiredInputLabel">Project Name</label>
                    <div class="main-input">
                        <input type="text" class="input-me validInputs" data-valid="Email address" name="email"
                            v-model="email" placeholder="Enter project name" />
                    </div>
                </div>
                <div class="input-g">
                    <label class="main-label requiredInputLabel">Project Location Site</label>
                    <div class="main-input" @click="mapModal = true">
                        <input type="text" class="input-me validInputs" data-valid="Project Location Site" name="email"
                            v-model="sendedAddress" placeholder="select location" />
                        <div class="drop-icon main-icon">
                            <i class="pi pi-map-marker px-2"></i>
                            locate
                        </div>
                    </div>
                </div>
                <div class="input-g">
                    <label for="" class="main-label ">Is the Project development completed?</label>
                    <div class="main-input">
                        <Dropdown v-model="userType" placeholder="Is the Project development completed?"
                            :options="userTypes" filter optionLabel="name"
                            class="input-me">
                            <template #value="slotProps">
                                <div v-if="slotProps.value" class="selected">
                                    {{ slotProps.value.name }}
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                            <template #option="slotProps">
                                <div class="option">
                                    {{ slotProps.option.name }}
                                </div>
                            </template>
                        </Dropdown>
                        <div class="drop-icon main-icon">
                            <i class="pi pi-angle-down"></i>
                        </div>
                    </div>
                </div>




            </div>
            <div class="step-three mt-4" v-show="stepNumber == 3">


                <div class="input-g">
                    <label for="" class="main-label">What is the Field in which your project is developed / will be
                        developed?</label>
                    <div class="main-input">
                        <Dropdown v-model="userType"
                            placeholder="What is the Field in which your project is developed / will be developed?"
                            :options="userTypes" filter optionLabel="name" class="input-me">
                            <template #value="slotProps">
                                <div v-if="slotProps.value" class="selected">
                                    {{ slotProps.value.name }}
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                            <template #option="slotProps">
                                <div class="option">
                                    {{ slotProps.option.name }}
                                </div>
                            </template>
                        </Dropdown>
                        <div class="drop-icon main-icon">
                            <i class="pi pi-angle-down"></i>
                        </div>
                    </div>
                </div>
                <div class="input-g">
                    <label for="" class="main-label">How would you best describe the type of climate mitigation resulted
                        from the
                        project?</label>
                    <div class="main-input">
                        <Dropdown v-model="userType"
                            placeholder="How would you best describe the type of climate mitigation resulted from the project?"
                            :options="userTypes" optionLabel="name" class="input-me">
                            <template #value="slotProps">
                                <div v-if="slotProps.value" class="selected">
                                    {{ slotProps.value.name }}
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                            <template #option="slotProps">
                                <div class="option">
                                    {{ slotProps.option.name }}
                                </div>
                            </template>
                        </Dropdown>
                        <div class="drop-icon main-icon">
                            <i class="pi pi-angle-down"></i>
                        </div>
                    </div>
                </div>
                <div class="input-g">
                    <label for="" class="main-label">Is the project being undertaken based on regulatory requirements
                        ?*</label>
                    <div class="main-input">
                        <Dropdown v-model="userType"
                            placeholder="Is the project being undertaken based on regulatory requirements ?*"
                            :options="userTypes"  optionLabel="name"
                            class="input-me">
                            <template #value="slotProps">
                                <div v-if="slotProps.value" class="selected">
                                    {{ slotProps.value.name }}
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                            <template #option="slotProps">
                                <div class="option">
                                    {{ slotProps.option.name }}
                                </div>
                            </template>
                        </Dropdown>
                        <div class="drop-icon main-icon">
                            <i class="pi pi-angle-down"></i>
                        </div>
                    </div>
                </div>
                <div class="input-g">
                    <label for="" class="main-label">Does the finance of carbon credit necessary for project existence
                        and
                        sustainability?</label>
                    <div class="main-input">
                        <Dropdown v-model="userType"
                            placeholder="Does the finance of carbon credit necessary for project existence and sustainability?"
                            :options="userTypes" optionLabel="name" class="input-me">
                            <template #value="slotProps">
                                <div v-if="slotProps.value" class="selected">
                                    {{ slotProps.value.name }}
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                            <template #option="slotProps">
                                <div class="option">
                                    {{ slotProps.option.name }}
                                </div>
                            </template>
                        </Dropdown>
                        <div class="drop-icon main-icon">
                            <i class="pi pi-angle-down"></i>
                        </div>
                    </div>
                </div>
                <div class="input-g">
                    <label for="" class="main-label">Was the project registered before?</label>
                    <div class="main-input">
                        <Dropdown v-model="userType" placeholder="Was the project registered before?"
                            :options="userTypes"  optionLabel="name"
                            class="input-me">
                            <template #value="slotProps">
                                <div v-if="slotProps.value" class="selected">
                                    {{ slotProps.value.name }}
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                            <template #option="slotProps">
                                <div class="option">
                                    {{ slotProps.option.name }}
                                </div>
                            </template>
                        </Dropdown>
                        <div class="drop-icon main-icon">
                            <i class="pi pi-angle-down"></i>
                        </div>
                    </div>
                </div>





            </div>



            <div class="mt-4 mb-4" v-show="stepNumber == 1">
                <button class="main-btn w-100 up mb-4" @click="showStep(2)" type="button">Next Step</button>
            </div>
            <div class="mt-4 mb-4" v-show="stepNumber == 2">
                <button class="main-btn w-100 up mb-4" @click="showStep(3)" type="button">Next Step</button>
            </div>
            <div class="mt-4 mb-4" v-show="stepNumber == 3">
                <button class="main-btn w-100 up mb-4" type="submit">Submit</button>
            </div>
        </div>
    </form>


    <!--*** map Modal ***-->
    <Dialog v-model:visible="mapModal" modal class="no_line " :style="{ width: '55vw' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <div class="text-center mb-3 fs20 fontBold">Choose Location</div>
        <div class="py-2 px-4 d-flex flex-column align-items-center justify-content-center gap-3">
            <FormMapComp @getLocation="getMyLoc" :currentLocation="true" />
        </div>
    </Dialog>
</template>

<script setup>
// router
const router = useRouter();

// steps
const stepNumber = ref(1);


//map refs
const mapModal = ref(false)
const sendedLat = ref(null);
const sendedLng = ref(null);
const sendedAddress = ref("");



// methods
const getMyLoc = (lat, lng, address) => {
    sendedLat.value = lat
    sendedLng.value = lng
    sendedAddress.value = address
    mapModal.value = false
};

const showStep = (step) => {
    stepNumber.value = step;
};


const register = () => {
    return navigateTo("/auth/success-page", { external: true });
}


/*************** Mounted **************** */

onMounted(async () => {

});


definePageMeta({
    layout: "auth",
});

</script>

<style lang="scss" scoped></style>