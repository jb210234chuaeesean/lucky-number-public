<template>
  <div
    class="h-[100dvh] w-full grid sm:grid-cols-4 md:grid-cols-3 justify-items-center place-items-center bg-orange-300">
    <div />
    <div class="sm:col-span-2 md:col-span-1 grid justify-items-center place-items-center bg-white p-4 rounded-2xl">
      <h1 class="text-3xl font-bold">查询万字历年中奖数据</h1>
      <input v-model="luckyNumber" type="number" placeholder="输入正确的四位数号码"
        class="bg-gray-300 w-full m-4 focus:outline-none focus:bg-orange-100 focus:shadow-2xl focus:border-orange-400 rounded-full p-4 border-2 border-solid border-transparent hover:border-orange-400 hover:bg-transparent hover:shadow-2xl shadow-none bover:shadow-orange-400 duration-200 ease-in-out">
      <div class="space-y-1 w-full grid justify-items-center place-items-center">
        <button @click="setItem(index)" v-for="(sec, index) in selections" :key="sec"
          class="w-full p-4 rounded-lg flex hover:brightness-[85%] active:scale-95 duration-200 ease-in-out"
          :class="{ 'bg-orange-500 text-white': sec.selected, 'bg-gray-100 text-black': !sec.selected }">
          <span class="mr-auto">{{ sec.name }}</span>
          <i v-if="sec.selected" class="fas fa-check my-auto" />
        </button>
      </div>
      <button
      @click="search()"
        class="w-32 my-2 mx-10 p-4 rounded-full bg-orange-500 text-white hover:brightness-150 duration-200 ease-in-out flex focus:outline-none active:scale-95">
        <i class="fa-duotone fa-magnifying-glass my-auto mr-auto fa-xl" />
        <span>查询</span>
      </button>
      <div class="mt-2 flex px-12">
        <span class="text-red-500 mx-auto">本网页仅作为数学教育用途，请勿将数据用于赌博等非法行为。</span>
      </div>
    </div>
    <div />
    <contentDialog :show-dialog="warnDialog" @exit-dialog="warnDialog = false">
      <div class="w-full grid justify-items-center place-items-center">
        <i class="fa-duotone fa-circle-exclamation fa-4x text-orange-500" />
        <h1 class="my-2 text-2xl font-bold text-orange-500" v-text="warnText" />
        <button @click="warnDialog = false"
          class="mt-4 px-8 text-white bg-orange-500 hover:bg-orange-700 active:brightness-75 duration-200 ease-in-out px-4 py-2 rounded-full">
          <span>好的</span>
        </button>
      </div>
    </contentDialog>
  </div>
</template>

<script>
import contentDialog from '../components/dialog.vue';
export default {
  name: 'HomeView',
  components: {
    contentDialog,
  },
  data: () => ({
    luckyNumber: 0,
    warnDialog: false,
    warnText: "",
    selections: [
      {
        name: "万能",
        eng: "magnum",
        selected: false
      },
      {
        name: "大马彩",
        eng: "damacai",
        selected: false
      },
      {
        name: "多多中奖号码",
        eng: "toto",
        selected: false
      },
      {
        name: "新加坡中奖号码",
        eng: "singapore",
        selected: false
      }
    ],
  }),
  methods: {
    setItem(item) {
      this.selections[item].selected = !this.selections[item].selected
    },
    search() {
      if (!this.selections[0].selected && !this.selections[1].selected && !this.selections[2].selected && !this.selections[3].selected) {
        this.warnDialog = true
        this.warnText = '请选择至少一个查询项目！'
      } else {
        if (this.luckyNumber === null || this.luckyNumber.toString().length !== 4) {
          this.warnDialog = true
          this.warnText = '请输入正确的四位数号码'
        } else {
          let magnumVal = this.selections[0].selected ? 1 : 0
          let damacaiVal = this.selections[1].selected ? 1 : 0
          let totoVal = this.selections[2].selected ? 1 : 0
          let singaporeVal = this.selections[3].selected ? 1 : 0
          let pushLink = `/query?number=${this.luckyNumber}&magnum=${magnumVal}&damacai=${damacaiVal}&toto=${totoVal}&singapore=${singaporeVal}`
          sessionStorage.setItem('pushLink', pushLink)
          this.$router.push('/script/querychange')
        }
      }
    }
  }
}
</script>
