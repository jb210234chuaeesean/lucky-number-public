<template>
    <div v-if="load" class="fixed top-0 min-h-screen w-full grid justify-items-center place-items-center">
        <div class="grid justify-items-center place-items-center p-8 rounded-2xl bg-black">
            <div class="circle-spin-8" />
        </div>
    </div>
</template>

<script>
export default {
    name: "contentLoading",
    props: ['show-loading'],
    computed: {
        load() {
            return this.showLoading
        }
    },
}
</script>