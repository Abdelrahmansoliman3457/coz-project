<template>
  <div class="col-lg-4 col-md-6 mb-3">
    <section class="bg-white d-block">
      <NuxtLink :to="`/auctionDetails/${auction.id}`">
        <div class="d-flex gap-2 mb-3">
          <div class="radios-div">
            <img
              :src="auction.icon || '@/assets/imgs/img_avatar.png'"
              class="img-auc"
              alt="image"
            />
          </div>
          <div>
            <div class="fs15">{{ auction.name }}</div>
            <div class="gray">{{ auction.statusText }}</div>
          </div>
        </div>
      </NuxtLink>
      <div class="time-row" v-if="status == 'current'">
        <div class="right-text fs13">{{ $t("main.aucEnd") }}</div>
        <!-- <div class="time-main">{{ ALLTime }}</div> -->
        <div class="time-details">
          <span>{{ minuteText }}</span
          >{{ $t("main.min") }} : <span>{{ hourText }}</span
          >{{ $t("main.hour") }} : <span>{{ dayText }}</span
          >{{ $t("main.day") }}
        </div>
      </div>
      <div class="chat-row" v-if="status == 'finished'">
        <div class="right-text fs13">{{ auction.OfferPriceSelectedText }}</div>

        <div
          class="chat-option second"
          @click="navigateTo('/chat?id=' + auction.id)"
          v-if="auction.chatButton"
        >
          <i class="pi pi-comment"></i> {{ $t("main.chat") }}
        </div>
        <div class="chat-option gray pointer-none" v-if="!auction.chatButton">
          <i class="pi pi-comment"></i> {{ $t("main.chat") }}
        </div>
      </div>

      <div class="chat-row justify-content-end" v-if="status == 'closed'">
        <div class="chat-option gray">
          <i class="pi pi-comment"></i> {{ $t("main.chat") }}
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
/******************* Props *******************/
const props = defineProps({
  auction: {
    type: Object,
  },

  status: {
    type: String,
  },
});

// reactive states
const timeStart = ref(null);
const timeEnd = ref(null);
const ALLTime = ref(null);

const dayText = ref(null);
const hourText = ref(null);
const minuteText = ref(null);

const auctionType = ref(null);

// functions
function getDuration(timeStart, timeEnd) {
  const start = new Date();
  const end = new Date(timeEnd);
  const startMain = new Date(timeStart);

  let diff;
  if (props.auction.isRunning) {
    diff = end - start; // Difference in milliseconds
  }

  if (props.auction.isComing) {
    diff = startMain - start; // Difference in milliseconds
  }

  // Calculate days, hours, and minutes
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  dayText.value = days;
  hourText.value = hours;
  minuteText.value = minutes;

  return { days, hours, minutes };
}

// onmounted
onMounted(() => {
  timeStart.value = props.auction.startedAt;
  timeEnd.value = props.auction.endedAt;
  auctionType.value = props.auction.type;
  setInterval(() => {
    //   this.calculateTimeRemaining();
    getDuration(timeStart.value, timeEnd.value);
  }, 1000);
});
</script>

<style lang="scss" scoped></style>
