<template>
    <Dropdown v-if="!loading" v-model="selectedCountry" @click="focusEle" :emptyFilterMessage="$t('nav.search_no_results')" filter :options="countriesStore" optionLabel="name" class="main-icon selectedCountry" @change="$emit('changeCountry', selectedCountry)">
        <template #value="slotProps">
            <div v-if="slotProps.value" class="selected">
                <img v-if="slotProps.value.image" :alt="slotProps.value.label" :src="slotProps.value.image"
                    class="option-img" />
                <div>{{ slotProps.value.country_code }}</div>
                <i class="pi pi-angle-down ic"></i>
            </div>
            <span v-else>
                {{ slotProps.placeholder }}
            </span>
        </template>
        <template #option="slotProps">
            <div class="option">
                <img v-if="slotProps.option.image" alt="img" class="option-img" :src="slotProps.option.image" />
                <div>{{ slotProps.option.name }}</div>
                <div>
                    {{ slotProps.option.country_code }}
                </div>
            </div>
        </template>
    </Dropdown>
    <div v-else class="selectedCountry main-icon">
        <div  class="spinner-border spinner-border-sm" role="status"></div>
    </div>
</template>

<script setup>
import { defineEmits, onMounted } from 'vue'
/*************** imports **************** */

// Auth Store
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
const { countriesStore  } =
    storeToRefs(authStore);
/*************** Plugins **************** */

/*************** DATA **************** */



const emit = defineEmits(['changeCountry'])

// countries
const selectedCountry = ref(null);
const selectedCountryCode = ref(null);
const loading = ref(true);

// const countries = ref(countries)

/*************** Computed **************** */

/*************** Props **************** */

const props = defineProps({
    countryCode: {
        type: String,
    }
})


/*************** Methods **************** */
function focusEle(){
    setTimeout(() => {
        document.querySelector('.p-dropdown-filter').focus()
    }, 100);
}

function setCountry(){
    // دي  دولتي
    let myCountry = countriesStore.value.find(obj => obj['country_code'] == selectedCountryCode.value)
    // دي الدولة الي انا عاوزها لو فشل يجيب دولتي
    let firstchoise = countriesStore.value.find(obj => obj['country_code'] == '1')
        
    selectedCountry.value = countriesStore.value.find(obj => obj['country_code'] == props.countryCode) || myCountry || firstchoise || countriesStore.value[0] ;
        
}

const getCountry = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/')
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      
      
      selectedCountryCode.value = data.country_calling_code.substring(1) // or data.country for the country code
      console.log(selectedCountryCode.value);
      
      
    } catch (err) {
     console.log(err);
     
    } finally{
        loading.value = false
        

      


        setTimeout(() => {
            
            setCountry()
            emit('changeCountry', selectedCountry.value)
        }, 100);
            
     
       
        
    }
}


/*************** Mounted **************** */
onMounted( () => {

    if(props.isEdit){
        return false
    } else {
        setTimeout(() => {
            
            getCountry()
        }, 500);

    }


    

   
 
});

</script>

<style lang="scss" scoped></style>