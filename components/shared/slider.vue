<template>
    <!--**** Slider ****-->
    <div class="main_slider" :class="{ 'auction': is_auction }" v-if="!loading">

        <!--**** Slider Content ****-->
        <div v-if="sliders.length > 0">

            <Carousel ref="homeSlider" :dir="lang" :wrap-around="sliders.length > 1" :autoplay="3500"
                :transition="1500">

                <Slide v-for="slide in sliders" :key="slide.id">
                    <img :src="slide" v-if="details" :alt="slide.title" class="slider_img">
                    <img :src="slide.image" v-else :alt="slide.title" class="slider_img">
                </Slide>

                <template #addons>
                    <Pagination />
                </template>
            </Carousel>

        </div>

        <!--**** No Data ****-->
        <SharedNoData v-else :text="$t('noData.banners')" />
    </div>

    <!--**** Skeleton ****-->
    <div class="main_slider" v-if="loading">
        <Carousel ref="homeSlider" :dir="lang" :wrap-around="true" :autoplay="3000" :transition="1500">

            <Slide v-for="i in 2" :key="i">
                <Skeleton class="slider_img" />
                <img src="@/assets/imgs/logo.png" alt="" class="slider_logo">
            </Slide>

            <template #addons>
                <Pagination />
            </template>
        </Carousel>
    </div>
</template>

<script setup>
/******************* Plugins Or Composables *******************/
// I18n
import { useI18n } from 'vue-i18n';
const { locale } = useI18n({ useScope: 'global' });

/*************** Data *****************/

// homeSlider
const homeSlider = ref(null);
/*************** Computed *****************/
const lang = computed(() => {
    return locale.value === 'ar' ? 'rtl' : 'ltr';
});



/*************** Props **************** */
const props = defineProps({
    sliders: {
        type: Array,
        default: []
    },
    loading: {
        type: Boolean,
    },
    details: {
        type: Boolean,
    },
    is_auction: {
        type: String,
    }
});

/*************** Methods **************** */


/*************** Mounted **************** */
</script>

<style lang="scss" scoped>
.no-more .carousel__pagination{
    display: none;
}
</style>