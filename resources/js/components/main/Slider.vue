<template>
    <hooper :settings="hooperSettings">
        <slide v-for="(slide, indx) in slides" :key="indx" :index="indx">
            {{ slide }}
        </slide>
    </hooper>
</template>

<script>
import { Hooper, Slide } from 'hooper';
import 'hooper/dist/hooper.css';
export default {
    components: { Hooper, Slide },
    data() {
        return {
            hooperSettings: {
                itemsToShow: 3,
                centerMode: true,
                rtl: true,
                breakpoints: {
                    800: {
                        centerMode: false,
                        itemsToShow: 3
                    },
                    1000: {
                        itemsToShow: 6,
                        pagination: 'fraction'
                    }
                }
            }
        };
    }
};
</script>