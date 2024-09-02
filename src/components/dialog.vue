<template>
    <Transition name="fade">
    <div @click="exitDialog()" v-show="dialog" class="fixed top-0 w-full min-h-screen backdrop-brightness-75 grid md:grid-cols-4 justify-items-center place-items-center z-20">
        <div />
        <Transition name="slide-fade">
        <div @click.stop v-show="dialog" class="md:col-span-2 w-full grid justify-items-center place-items-center p-4 rounded-2xl bg-white">
            <div class="w-full flex p-4">
                <button @click.stop="exitDialog()" class="ml-auto group flex">
                    <i class="fa-duotone fa-circle-xmark fa-xl group-hover:opacity-75 duration-200 ease-in-out my-auto mx-auto" />
                </button>
            </div>
            <slot />
        </div>
        </Transition>
        <div />
    </div>
    </Transition>
</template>

<script>
export default {
    name: 'contentDialog',
    props: ['show-dialog'],
    computed: {
        dialog() {
            return this.showDialog
        }
    },
    methods: {
        exitDialog() {
            this.$emit('exit-dialog')
        }
    }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
}

.slide-fade-enter-active, .slide-fade-leave-active {
    transition: opacity 0.3s, transform 0.3s;
}

.slide-fade-enter-from, .slide-fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>