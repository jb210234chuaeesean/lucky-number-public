<script>
export default {
    name: "query-change",
    mounted() {
        let link = sessionStorage.getItem('pushLink')
        if (link) {
            sessionStorage.removeItem('pushLink')
            this.$router.push(link)
        }
    }
}
</script>