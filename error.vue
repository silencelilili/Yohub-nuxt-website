<template>
	<el-config-provider namespace="yh" size="large">
		<div>
			<el-result icon="error" title="链接不存在" :sub-title="`您当前访问的链接不存在，请检查您的访问地址是否正确（${errorCode}）`">
				<template #extra>
					<el-button type="primary" @click="router.push({ path: '/' })">回到首页</el-button>
				</template>
			</el-result>
		</div>
	</el-config-provider>
</template>
<script lang="ts" setup>
const route = useRoute()
const router = useRouter()
const errorCode = ref(route.query.code)
onMounted(() => {
	// switch (route.query.code) {
	//   case '401':
	//     ElMessage.error('no login')
	//     localStorage.removeItem('token')
	//     break;
	//   case '501':
	//     ElMessage.error('Unknown error' + route.query.message)
	//     break;
	//   default:
	//     ElMessage.error(route.query.code + '' + route.query.message)
	// }
})
</script>
