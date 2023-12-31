export default {
    state: {
        isCollapse: false ,//控制菜单是展开还是收起
        tabsList: [
            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home",
            }
        ]
    },
    
    mutations: {
        collapseMenu(state) {
           //修改菜单展开或者收起的方法
            state.isCollapse = !state.isCollapse
        },
        //更新面包屑数据
        selecMenu(state,val) {
            console.log(val,'val');
            //判断添加的数据是否为首页
            if(val.name !=='home') {
                //***findIndex返回索引位置，如果没有返回-1
                const index = state.tabsList.findIndex(item =>item.name === val.name)
                //如果不存在
                if(index === -1) {
                    state.tabsList.push(val)
                }
            }
        },
        closeTag(state,item) {
            const index = state.tabsList.findIndex(val => val.name === item.name)
            state.tabsList.splice(index,1)
        }
    }
}