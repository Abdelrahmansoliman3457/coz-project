<template>
  <div class="single-notification">
    <div class="d-flex gap-3">
      <div class="bel-noti delete-btn">
        <i class="pi pi-bell bell"></i>
      </div>
      <div class="noti-center">
        <div class="font-15 mb-2">{{ noti.message }}</div>
        <p>{{ noti.timeAdd }}</p>
      </div>
    </div>
    <button
      class="delete-btn"
      :disabled="loadingSpin"
      @click="removeSingleNotifications(noti.id)"
    >
      <div
        class="spinner-border spinner-border-sm"
        v-if="loadingSpin"
        role="status"
      ></div>
      <i class="pi pi-trash" v-else></i>
    </button>
  </div>
</template>

<script setup>
/******************* emits *******************/
const emit = defineEmits(["removeNotificationEmit"]);
/******************* Props *******************/
const props = defineProps({
  noti: {
    type: Object,
  },
});

/* refs */
const loadingSpin = ref(false);

function removeSingleNotifications(id) {
  loadingSpin.value = true;
  emit("removeNotificationEmit");
  setTimeout(() => {
    loadingSpin.value = false;
    console.log(id);
  }, 1000);
}
</script>

<style></style>
