<template>
    <div class="pages-titles">
        <div class="titles">
            <p class="pages-titls_title">{{ title }}</p><p class="pages-titls_title c-black" v-if="subTitle">/ {{ subTitle }}</p>
        </div>
        <NuxtLink :to="btnPath" class="main-btn up sm" v-if="haveBtn">{{ btnText }}</NuxtLink>
        <button class="delete-btn" v-if="isNotification"   @click="$emit('removeAllEmit')">
            <i class="pi pi-trash"></i>
            <div class="text">{{ btnText }}</div>
        </button>
    </div>
</template>


<script setup>
/******************* Import *******************/

/******************* Data *******************/

/******************* Props *******************/
const props = defineProps({
    title: {
        type: String,
    },
    subTitle: {
        type: String,
    },
    haveBtn: {
        type : Boolean,
        default: false
    },
    isNotification: {
        type : Boolean,
        default: false
    },
    btnText: {
        type : String,
    },
    btnPath: {
        type : String,
    },
});


/******************* Methods *******************/

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/

</script>

<style >

</style>