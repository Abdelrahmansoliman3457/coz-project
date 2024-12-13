<template>
    <main class="Page py-5">

        <div class="container">
            <div class="grid">
                <div class="col-12 md:col-8 xl:col-7 mx-auto">
                    <div class="form_style">

                        <!--*** Data ***-->
                        <div class="form_content" v-if="!loading">

                            <img class="form_img" src="@/assets/imgs/about.png" alt="Image">

                            <h6 class="form_title" v-html="title"></h6>

                            <p class="ff-m text-center" v-html="content"></p>
                        </div>

                        <!--*** Skeleton ***-->
                        <div class="form_content" v-if="loading">

                            <Skeleton class="mb-4 mx-auto" shape="circle" size="8rem" v-if="loading" />
                            <Skeleton width="8rem" height=".5rem" class="mb-4 mx-auto" />

                            <Skeleton width="70%" height=".5rem" class="mb-3 mx-auto" v-for="i in 3" :key="i" />
                            <Skeleton width="50%" height=".5rem" class="mx-auto" />

                        </div>

                    </div>
                </div>
            </div>
        </div>

    </main>
</template>

<script setup>

/******************* Plugins *******************/

// Axios
const axios = useApi();

/*************** DATA *****************/

// loading
const loading = ref(false);

// contact data
const title = ref('');
const content = ref('');
const image = ref('');

/******************* Props *******************/
const props = defineProps({
    apiName: {
        type: String,
    }
})

/******************* Methods *******************/

// Get Data
const getData = async () => {
    try {
        loading.value = true;
        const res = await axios.get(`${props.apiName}`);
        title.value = res.data.data.title;
        content.value = res.data.data.content;
        image.value = res.data.data.image;
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
}

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/
onMounted(async () => {
    await getData();
});


</script>

<style lang="scss" scoped></style>