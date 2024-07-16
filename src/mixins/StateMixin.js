const StateMixin = {
    computed: {
        routeState() {
            return this.$route.state || {};
        }
    }
};
export default StateMixin;

// mixins/krsMixin.js
// export default {
//     data() {
//         return {
//             krsData: null
//         };
//     },
//     methods: {
//         setKRSData(data) {
//             this.krsData = data;
//         },
//         getKRSData() {
//             return this.krsData;
//         }
//     }
// };
