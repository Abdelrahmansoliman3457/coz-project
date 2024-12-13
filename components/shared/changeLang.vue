<template>
    <div class="dropdown lang">
        <button type="button" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="pi pi-globe"></i>
            <span class="lang drop-text">{{ $t('nav.lang') }}</span>
            <i class="pi pi-angle-down"></i>
        </button>

        <ul class="dropdown-menu drop-lang left">
            <li>
                <a href="#" class="profile-item justify-content-center" @click="toggleLang('ar')">العربية</a>
            </li>
            <li>
                <a href="#" class="profile-item justify-content-center" @click="toggleLang('en')">English</a>
            </li>
        </ul>
    </div>
</template>

<script setup>
/******************* Plugins Or Composables *******************/
// i18n
import { useI18n } from 'vue-i18n';
const { locale, t } = useI18n({ useScope: 'global' });

/*************** DATA *****************/

// active Lang
const activeLang = ref('en');

/*************** Methods **************** */

// === getLocal
function getLocal() {
    const localLang = localStorage.getItem("lang");
    if (localLang) {
        locale.value = localLang;
        activeLang.value = localLang;
        document.querySelector("html").setAttribute("lang", localLang);
    }
}

// === toggleLang
function toggleLang(lang, btn) {
    localStorage.setItem("lang", lang);
    window.location.reload();
}

/*************** Watch **************** */

/******************* Computed *******************/

/*************** Mounted **************** */

onMounted(async () => {
    getLocal();
});

</script>

<style lang="scss" scoped></style>