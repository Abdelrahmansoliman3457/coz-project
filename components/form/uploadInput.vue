<template>
    <div class="d-flex flex-wrap gap-3">

        <div class='hidden-img' :class="{ small: multiple }" v-for="(img, i) in images" :key="img">
            <img :src='img.previewUrl' :class="`img${i} img`" :alt="img.name" />

            <span class='remove-img' @click="removeImage(i)">
                <i class="pi pi-times"></i>
            </span>
        </div>

        <!-- Input -->
        <div class="hidden-img photo">
            <input type="file" :multiple="multiple" @change="uploadImgs" class="hidden-input" accept="image/*">
            <img src="~/assets/imgs/icons/upload_ic.png" alt="">
            <span class="ff-Bb c-main fs11">{{ placeholder ? placeholder : $t('I3lan.form.addImage') }}</span>
        </div>

    </div>
</template>

<script setup>
/******************* Plugins *******************/

// i18n
import { useI18n } from 'vue-i18n';
const { t } = useI18n({ useScope: 'global' });

// toastNotify
const { toastNotify } = toastMsg();

/******************* Data *******************/
// images
const images = ref([]);

// showToast
const showToast = ref(false);

/******************* Provide && Inject *******************/
/******************* Emits *******************/
const emit = defineEmits(['update']);

/******************* Props *******************/
const props = defineProps({
    multiple: {
        type: Boolean,
        default: false
    },
    images: {
        type: Array,
        default: () => { return []; }
    },
    placeholder: {
        type: String
    }
});

/******************* Methods *******************/

// Upload Imgs
const uploadImgs = (event) => {
    showToast.value = false;
    if (!props.multiple) {
        images.value = [];
    }

    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {

            if(images.value.length < 6){
                images.value.push({
                    file: files[i],
                    previewUrl: e.target.result
                });
            } else{
                showToast.value = true;
            }
        };
        reader.readAsDataURL(files[i]);
    }

    emit('update', images.value);
}

// Remove Img
function removeImage(index) {
    images.value.splice(index, 1);
    emit('update', images.value);
    showToast.value = false;
}

/******************* Computed *******************/

/******************* Watch *******************/

watch(showToast, (newVal) => {
    if (newVal) {
        toastNotify(t("I3lan.form.maxImg"), "error");
    }
});

/******************* Mounted *******************/
onMounted(() => {
    images.value = props.images;
    emit('update', images.value);
});

</script>

<style></style>