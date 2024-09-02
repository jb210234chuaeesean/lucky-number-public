<template>
  <div class="h-[100dvh] w-full grid md:grid-cols-4 justify-items-center place-items-center bg-orange-300">
    <div />
    <div class="w-full md:col-span-2 grid justify-items-center place-items-center bg-white p-4 rounded-2xl">
      <div class="py-4 flex w-full">
        <button
        @click="$router.push('/')"
          class="text-sm flex rounded-full px-3 py-2 hover:bg-gray-200 active:brightness-75 duration-200 ease-in-out mr-auto">
          <i class="fas fa-chevron-left my-auto mr-4" />
          <span class="my-auto">返回</span>
        </button>
        <h1 class="text-2xl" v-text="checker.number" />
        <button @click="dialog = true"
          class="text-sm text-white flex rounded-full px-3 py-2 bg-orange-500 hover:bg-orange-700 active:brightness-75 duration-200 ease-in-out ml-auto">
          <i class="fas fa-filter my-auto mr-4" />
          <span class="my-auto">查找条件</span>
        </button>
      </div>
      <div class="my-4 h-[60dvh] overflow-y-scroll w-full grid justify-items-center place-items-center">
        <div class="w-full grid justify-items-center place-items-center">
          <button
          @click="summarizeDialog = true"
            class="w-full my-2 mx-10 p-4 rounded-full bg-orange-200 text-orange-500 hover:brightness-95 active:brightness-75 duration-200 ease-in-out flex focus:outline-none"
            >
            <i class="fa-duotone fa-binary mr-auto my-auto" />
            查看结果
          </button>
        </div>
        <table>
          <tr>
            <th>公司</th>
            <th>号码</th>
            <th>日期</th>
            <th>获奖</th>
          </tr>
          <tr v-for="row in filteredTable" :key="row.id">
            <td>{{ row.company }}</td>
            <td>{{ row.date }}</td>
            <td>{{ row.number }}</td>
            <td>{{ row.place }}</td>
          </tr>
        </table>
      </div>
      <div class="mt-2 flex px-12">
        <span class="text-red-500 mx-auto">本网页仅作为数学教育用途，请勿将数据用于赌博等非法行为。</span>
      </div>
    </div>
    <div />
    <contentDialog :show-dialog="dialog" @exit-dialog="dialog = false">
      <div class="p-12 space-y-1 w-full grid justify-items-center place-items-center">
        <button @click="setItem(index)" v-for="(sec, index) in selections" :key="sec"
          class="w-full p-4 rounded-lg flex hover:brightness-[85%] active:scale-95 duration-200 ease-in-out"
          :class="{ 'bg-orange-500 text-white': sec.selected, 'bg-gray-100 text-black': !sec.selected }">
          <span class="mr-auto">{{ sec.name }}</span>
          <i v-if="sec.selected" class="fas fa-check my-auto" />
        </button>
      </div>
    </contentDialog>
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
    <contentDialog :show-dialog="summarizeDialog" @exit-dialog="summarizeDialog = false">
      <div class="w-full grid justify-items-center">
        <h1 class="text-3xl font-bold">总得奖数总结</h1>
        <div class="w-full text-orange-500 text-3xl">
          <h1>万能：{{ total.magnum }}</h1>
          <h1>大马彩：{{ total.damacai }}</h1>
          <h1>多多：{{ total.toto }}</h1>
          <h1>新加坡博彩：{{ total.singapore }}</h1>
        </div>
      </div>
    </contentDialog>
    <loading :show-loading="showLoading" />
  </div>
</template>

<script>
import axios from 'axios';
import contentDialog from '../components/dialog.vue';
import loading from '../components/loading.vue';
export default {
  name: 'QueryView',
  components: {
    contentDialog,
    loading
  },
  data: () => ({
    luckyNumber: null,
    tableContent: '',
    checker: {
      number: '0000',
      magnum: true,
      damacai: false,
      toto: true,
      singapore: true
    },
    filteredTable: [],
    processList: [],
    total: {},
    showLoading: true,
    dialog: false,
    warnDialog: false,
    warnText: '',
    summarizeDialog: false,
    selections: [
      {
        name: "万能",
        eng: "magnum",
        selected: true
      },
      {
        name: "大马彩",
        eng: "damacai",
        selected: true
      },
      {
        name: "多多中奖号码",
        eng: "toto",
        selected: true
      },
      {
        name: "新加坡中奖号码",
        eng: "singapore",
        selected: true
      }
    ],
  }),
  methods: {
    parseHTMLToList(html) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const table = doc.querySelector('table');
      if (table) {
        const rows = table.querySelectorAll('tr');
        const list = [];
        rows.forEach((row) => {
          const cells = row.querySelectorAll('td');
          const rowList = {
            img: '',
            company: '',
            number: '',
            date: '',
            place: ''
          };
          rowList.img = cells[0].innerHTML;
          rowList.date = cells[1].innerText;
          rowList.number = cells[2].innerText;
          rowList.place = cells[3].innerText;
          if (cells[0].innerHTML.includes('/images/logo_magnum.gif')) {
            rowList.company = 'Magnum';
          } else if (cells[0].innerHTML.includes('/images/logo_damacai.gif')) {
            rowList.company = 'Damacai';
          } else if (cells[0].innerHTML.includes('/images/logo_toto.gif')) {
            rowList.company = 'Toto';
          } else if (cells[0].innerHTML.includes('/images/logo_sg4d.gif')) {
            rowList.company = 'Singapore';
          }
          list.push(rowList);
        });
        this.processList = list;
      } else {
        return 'No table found';
      }
    },
    setItem(item) {
      this.selections[item].selected = !this.selections[item].selected
      if (!this.selections[0].selected && !this.selections[1].selected && !this.selections[2].selected && !this.selections[3].selected) {
        this.warnDialog = true
        this.warnText = '请至少选择一个彩票公司！'
        this.selections[item].selected = true
      }
      else {
        let magnumVal = this.selections[0].selected ? 1 : 0
        let damacaiVal = this.selections[1].selected ? 1 : 0
        let totoVal = this.selections[2].selected ? 1 : 0
        let singaporeVal = this.selections[3].selected ? 1 : 0
        setTimeout(() => {
          let pushLink = `/query?number=${this.checker.number}&magnum=${magnumVal}&damacai=${damacaiVal}&toto=${totoVal}&singapore=${singaporeVal}`
          sessionStorage.setItem('pushLink', pushLink)
          this.$router.push('/script/querychange')
        }, 500)
      }
    },
    filterData() {
      this.processList.forEach((row) => {
        if (this.checker.magnum && row.company === 'Magnum') {
          this.filteredTable.push(row);
        }
        if (this.checker.damacai && row.company === 'Damacai') {
          this.filteredTable.push(row);
        }
        if (this.checker.toto && row.company === 'Toto') {
          this.filteredTable.push(row);
        }
        if (this.checker.singapore && row.company === 'Singapore') {
          this.filteredTable.push(row);
        }
      });
    },
    calculateEachTotal() {
      const total = {
        magnum: 0,
        damacai: 0,
        toto: 0,
        singapore: 0
      };
      this.processList.forEach((row) => {
        if (row.company === 'Magnum') {
          total.magnum += 1;
        }
        if (row.company === 'Damacai') {
          total.damacai += 1;
        }
        if (row.company === 'Toto') {
          total.toto += 1;
        }
        if (row.company === 'Singapore') {
          total.singapore += 1;
        }
      });
      this.total = total;
    },
    extractTable(htmlString) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, 'text/html');
      const table = doc.querySelector('table');
      if (table) {
        return table.outerHTML;
      } else {
        return 'No table found';
      }
    }
  },
  mounted() {
    let number = this.$route.query.number
    let magnum = this.$route.query.magnum
    let damacai = this.$route.query.damacai
    let toto = this.$route.query.toto
    let singapore = this.$route.query.singapore


    if (number) {
      if (number.length === 4) {
        this.checker.number = number;
      }
    }
    if (magnum) {
      this.checker.magnum = magnum !== '0';
      this.selections[0].selected = magnum !== '0';
    }
    if (damacai) {
      this.checker.damacai = damacai !== '0';
      this.selections[1].selected = damacai !== '0';
    }
    if (toto) {
      this.checker.toto = toto !== '0';
      this.selections[2].selected = toto !== '0';
    }
    if (singapore) {
      this.checker.singapore = singapore !== '0';
      this.selections[3].selected = singapore !== '0';
    }
    axios.get('https://lucky-number-fetcher.vercel.app/query/' + this.checker.number).then((response) => {
      this.tableContent = this.extractTable(response.data);
      this.parseHTMLToList(response.data);
      this.calculateEachTotal();
      this.filterData();
      this.showLoading = false
    }).catch((error) => {
      this.showLoading = false
      console.error(error);
    });
  }
}
</script>

<style>
table {
  width: 100%;
  text-align: center;
}

tr,
td,
th {
  border: 1px solid black;
  padding: 8px;
  text-align: center;
}
</style>