<template>
    <n-button type="info" size="large" @click="getData">获取数据</n-button>

    <!-- <div v-if="resultPartyList.length !== 0"> -->
    <n-button type="primary" size="medium" @click="exportCSVPartyList">CSV-部门源</n-button>
    <!-- </div> -->
    <!-- <div v-if="resultUserList.length !== 0"> -->
    <n-button type="primary" size="medium" @click="exportCSVUserList">CSV-成员源</n-button>
    <!-- </div> -->
    <!-- <div v-if="resultPartyList.length !== 0 && resultUserList.length !== 0"> -->
    <n-button type="primary" size="medium" @click="exportCSVConcatedList">CSV-合并</n-button>
    <!-- </div> -->
    {{ resultPartyList }}
    {{ resultUserList }}
</template>

<script lang="ts" setup>
import api from '@/api/index'
import { onMounted } from 'vue'
import { allDepartment } from './data'
import { exportCSV } from './utils'

interface UserResult {
    name?: string
    userid?: string
    depTree?: any
    depIdTree?: any
    depNameTree?: any
    positions?: any
    catch?: any
}

function getAccessToken() {
    /*
      corpid 企业id
      secret 应用秘钥
     */
    const corpid = 'ww9073030449f88d1e'
    const secret = 'wt4CmNaQqMwE7l0QkcTrZeOnmNt5iH-QGXcTO_ihVvE'
    return api.get(`/cgi-bin/gettoken?corpid=${corpid}&corpsecret=${secret}`)
}
function getTagInfo(access_token, tagid) {
    return api.get(`/cgi-bin/tag/get?access_token=${access_token}&tagid=${tagid}`)
}
function getUserInfo(access_token, userid): any {
    return api.get(`/cgi-bin/user/get?access_token=${access_token}&userid=${userid}`)
}
/* function getDepartmentList(access_token, departmentid?, no_fetch_child = 1): any {
    return api.get(
        `/cgi-bin/department/list?access_token=${access_token}&id=${departmentid}&no_fetch_child=${no_fetch_child}`
    )
} */
function getDepartmentMember(access_token, departmentid, fetch_child = 1): any {
    return api.get(
        `/cgi-bin/user/simplelist?access_token=${access_token}&department_id=${departmentid}&fetch_child=${fetch_child}`
    )
}
function getDepartmentList(id) {
    return allDepartment.find((dep) => dep.id == id)
}

function isInTargetDepartment(departmentObj, depTree) {
    const servicePartyList = [
        721,
        484,
        705,
        1042,
        674,
        1138,
        132,
        579,
        495,
        1013,
        472,
        1396,
        8691,
        267,
        3325,
        3330,
        5179,
        2878,
        2938,
        // 355, //地面服务部（生产）
    ]
    console.log(departmentObj.name, departmentObj.id, departmentObj.parentid)
    depTree.idTree.unshift(departmentObj.id)
    depTree.nameTree.unshift(departmentObj.name)
    // 符合服务领域 部门暂未取到根节点
    if (servicePartyList.includes(departmentObj.id)) return true
    if (departmentObj.parentid && departmentObj.parentid != '0') {
        const parentDepartmentObj: any = getDepartmentList(departmentObj.parentid)
        return isInTargetDepartment(parentDepartmentObj, depTree)
    }
    return false
}

const resultUserList: any = []
const resultPartyList: any = []

async function getData(): Promise<any> {
    const res1: any = await getAccessToken()
    const { access_token } = res1
    const 高级经理级: any = await getTagInfo(access_token, 3)
    const 总经理级: any = await getTagInfo(access_token, 2)
    const 公司领导: any = await getTagInfo(access_token, 14)
    const mergedPartyList = [...高级经理级.partylist, ...总经理级.partylist, ...公司领导.partylist]
    const mergedUserList = [...高级经理级.userlist, ...总经理级.userlist, ...公司领导.userlist]

    for (let i = 0; i < mergedPartyList.length; i++) {
        const depId = mergedPartyList[i]
        const userList = (await getDepartmentMember(access_token, depId)).userlist

        userList.forEach((userInfo) => {
            const userDepArr = userInfo.department
            const user: UserResult = {}
            const depTree = {
                idTree: [],
                nameTree: [],
            }
            const isTarget = userDepArr.some((depId) => {
                const partObj = getDepartmentList(depId)
                return isInTargetDepartment(partObj, depTree)
            })

            if (isTarget) {
                // user.depTree = depTree
                user.depIdTree = depTree.idTree
                user.depNameTree = depTree.nameTree
                user.catch = depTree.nameTree[0]
                user.positions = userInfo.positions
                user.name = userInfo.name
                user.userid = userInfo.userid
                resultPartyList.push(user)
            }
        })
    }

    for (let i = 0; i < mergedUserList.length; i++) {
        const user: UserResult = mergedUserList[i]

        const userInfo = await getUserInfo(access_token, user.userid)
        const userDepArr = userInfo.department
        const depTree = {
            idTree: [],
            nameTree: [],
        }
        const isTarget = userDepArr.some((depId) => {
            const partObj = getDepartmentList(depId)
            return isInTargetDepartment(partObj, depTree)
        })

        if (isTarget) {
            //user.depTree = depTree
            user.depIdTree = depTree.idTree
            user.depNameTree = depTree.nameTree
            user.catch = depTree.nameTree[0]
            user.positions = userInfo.positions
            resultUserList.push(user)
        }
    }

    console.log('resultPartyList', resultPartyList)
    console.log('resultUserList', resultUserList)
}

const mainTitle = ['员工号', '姓名', '职务', '部门树', '部门id树','命中部门']
const mainTitleForKey = ['userid', 'name', 'positions', 'depNameTree', 'depIdTree','catch']
function exportCSVPartyList() {
    return exportCSV(resultPartyList, mainTitle, mainTitleForKey, 'CSV-部门源')
}
function exportCSVUserList() {
    return exportCSV(resultUserList, mainTitle, mainTitleForKey, 'CSV-成员源')
}
function exportCSVConcatedList() {
    return exportCSV([...resultPartyList, ...resultUserList], mainTitle, mainTitleForKey, 'CSV合并')
}

// onMounted(() => {
//     getData()
// })
</script>

<style scoped></style>
