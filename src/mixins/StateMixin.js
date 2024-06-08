const StateMixin = {
    computed: {
        routeState() {
            return this.$route.state || {};
        }
    }
};

export default StateMixin;
