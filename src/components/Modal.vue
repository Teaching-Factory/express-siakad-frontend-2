  <script>
export default {
    props: {
        show: {
            type: Boolean,
            required: true
        },
        title: {
            type: String,
            default: 'Modal Title'
        }
    },
    methods: {
        closeModal() {
            this.$emit('close');
        }
    }
};
</script>
<template>
    <div class="modal fade" :class="{ show: show, 'bounce-in': show }" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ title }}</h5>
                    <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.modal.show {
    display: block;
    /* background-color: rgba(0, 0, 0, 0.5); */
}

@keyframes bounce-in {
    0% {
        transform: scale(0.8);
        opacity: 0.5;
    }
    50% {
        transform: scale(1.05);
        opacity: 1;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

.modal.show.bounce-in .modal-dialog {
    animation: bounce-in 0.6s;
}
</style>