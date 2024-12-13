<template>

    <div class=" d-flex gap-3 main-input w-100">
        <!-- {{ products[0].lat }} -->
        <GMapAutocomplete placeholder="search..." class="input-me" @place_changed="setPlace">
        </GMapAutocomplete>
        <button class="main-btn lg up" @click="getCurrentLocatoin" style="flex-shrink: 0;">
            current location
        </button>
    </div>
    <div style="width: 100%;">

        <GMapMap :center="center" :zoom="8" map-type-id="terrain" style="width: 100%; height: 400px">
            <GMapMarker @dragend="getPositionmarker($event)" :position="center" :draggable="true" />
            <template v-if="reset">

                <GMapMarker  :icon="{
                    url: 'https://i.ibb.co/5xqnLDW/Group-1000007290.png', // URL of the custom icon image
                    // Adjust size of the icon (optional)
                }" v-for="product in products" :key="product.id"
                    :position="{ lat: Number(product.lat), lng: Number(product.lng) }" :draggable="false" @click="selectedProduct = product.id   ">


                    <GMapInfoWindow v-if="selectedProduct == product.id">
                        <div>
                            <div class="pointer-click" @click="navigateTo('/product/' + product.id + '')">{{ product.name }}</div>
                        </div>
                    </GMapInfoWindow>
                </GMapMarker>
            </template>

        </GMapMap>

        <template  v-if="reset">
            <div class="card-main-map mt-4" v-for="product in products" :key="product.id">
                <ProductsCard v-if="selectedProduct == product.id" @sendtoparent="sendfavIndex" :classRow="true" @toggleFavId="toggleFavId" 
                         :product="product" />
            </div>
        </template>

    </div>
    <div class="d-flex justify-content-center align-items-center gap-3">
        <button class="main-btn mt-2  lg up"
            @click="$emit('getLocation', center.lat, center.lng, address)">Save</button>
    </div>


</template>

<script setup>
/*************** imports **************** */
const selectedProduct = ref(null)
/*************** Plugins **************** */


/*************** Props **************** */
const props = defineProps({
    currentLocation: {
        type: Boolean,
        default: false
    },
    reset: {
        type: Boolean,
    },
    sendedLng: {
        type: String,
    },
    sendedLat: {
        type: String,
    },
    sendedAddress: {
        type: String,
    },
    products: {
        type: Array,
    },

});
const currentLocationMain = ref(props.currentLocation)

/*************** DATA **************** */




//map refs
const address = ref(props.sendedAddress || '');
const center = ref({ lat: props.sendedLat || 24.7135517, lng: props.sendedLng || 46.6752957 });


/*************** Computed **************** */




/*************** Methods **************** */
// search places
function setPlace(e) {


    // sended data to backend
    address.value = e.formatted_address;

    // change marker pos
    if (e.geometry) {
        center.value.lat = e.geometry.location.lat();
        center.value.lng = e.geometry.location.lng();
    }
}
// get lat , lng , address from change marker position
function getPositionmarker(e) {
    center.value.lat = e.latLng.lat();
    center.value.lng = e.latLng.lng();
    getaddressfromlatlng();
}
// getaddress from latlng
function getaddressfromlatlng() {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: center.value }, (results, status) => {
        if (status === "OK") {
            if (results[0]) {
                address.value = results[0].formatted_address;

                document.querySelector(".pac-target-input").value =
                    results[0].formatted_address;

            } else {
                address.value = "No results found";
            }
        } else {
            address.value = "Geocoder failed due to: " + status;
        }
    });
}
// get current location
function getCurrentLocatoin() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                center.value.lat = position.coords.latitude;
                center.value.lng = position.coords.longitude;
                getaddressfromlatlng();
            },
            (error) => {
                console.error("Error getting location:", error);
            }
        );
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}


/*************** Mounted **************** */
onMounted(() => {
    // if(currentLocationMain.value){
    //     setTimeout(() => {

    //         getCurrentLocatoin()
    //     }, 500);
    // }

});

</script>

<style lang="scss" scoped></style>