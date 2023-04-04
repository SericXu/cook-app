<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import useUser from "./store/user";

const userStore = useUser()


onLaunch(async () => {

    const login = await uni.login({provider: 'weixin'})
    console.log('%c [ login ]-11', 'font-size:13px; background:pink; color:#bf2c9f;', login)
    const userInfo = await uni.getUserInfo()
    console.log('%c [ userInfo ]-13', 'font-size:13px; background:pink; color:#bf2c9f;', userInfo)

})
onShow(() => {
    console.log("App Show")
})
onHide(() => {
    console.log("App Hide")
})
</script>
<style></style>
