<template>
    <div class="col-lg-6 col-6 mx-auto">
        <div class="no-data">
            <img v-if="showImg" src="@/assets/imgs/empty.png" class="no-data-img" alt="no data image">
            <span class="no-data-text c-black">{{ $t('main.nodata') }}</span>
        </div>
    </div>
</template>

<script setup>
/*************** Plugins **************** */

/*************** DATA **************** */

/*************** Computed **************** */

/*************** Props **************** */
const props = defineProps({
    text: {
        type: String,
    },
    showImg: {
        type: Boolean,
        default: true
    }
})

/*************** Methods **************** */

/*************** Mounted **************** */
</script>

<style lang="scss" scoped>
.no-data {
    background: #fff;
    padding-bottom: 30px;
    border-radius: 10px;
}
</style>