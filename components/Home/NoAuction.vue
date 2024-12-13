<template>
  <div>
    <div class="no_auction section_style mb-4">
      <div
        class="row align-items-center flex-column-reverse flex-lg-row"
        :class="{ 'p-5': !Allauctions.sliders.length }"
      >
        <div
          class="col-lg-5"
          :class="{ 'margin-auto': !Allauctions.sliders.length }"
        >
          <div class="no_auction_content">
            <img src="@/assets/imgs/logo.png" class="logo_lg" alt="logo" />

            <h4 class="fw-semibold c-red fs15 text-center">
                {{ $t('main.noOwnAuctions') }}
            </h4>

            <h5
              class="text-center fs14 c-sec"
              v-if="Allauctions.tenderInstructions"
            >
            {{ $t('main.terms') }}
            </h5>

            <p
              v-html="Allauctions.tenderInstructions"
              v-if="Allauctions.tenderInstructions"
              class="text-center px-md-5"
            ></p>
          </div>
        </div>
        <div class="col-lg-7" v-if="Allauctions.sliders.length">
          <SharedSlider :sliders="Allauctions.sliders" />
        </div>
      </div>
    </div>

    <div class="section_style p-sm-4 p-3" v-if="Allauctions.tenderTerms">
      <p v-html="Allauctions.tenderTerms"></p>
    </div>
  </div>
</template>

<script setup>
/******************* Plugins Or Composables *******************/

/******************* Data *******************/
const sliders = ref([
  {
    id: 1,
    image:
      "https://foyr.com/learn/wp-content/uploads/2021/08/design-your-dream-home.jpg",
  },
  {
    id: 2,
    image:
      "https://villahomesrgv.com/wp-content/uploads/2022/10/What-to-Look-For-When-Building-a-Single-Family-Home-in-McAllen_Cover.jpg",
  },
  {
    id: 3,
    image:
      "https://anchoredtinyhomes.com/oak/files/images/projects/miller/miller-1090.jpg",
  },
]);

/******************* Props And Inject *******************/
// props
const props = defineProps({
  Allauctions: {
    type: Object,
  },
});

/******************* Methods *******************/

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/
</script>

<style scoped></style>
