<template>

    <div class="home-layout position-relative">
        <!-- home header -->
        <div class="container">
            <LayoutAuthHeader />
        </div>
        <slot />
        <!-- home footer -->
        <LayoutAuthFooter />
    </div>

</template>

<script setup>

</script>

<style lang="scss" scoped></style>