<template>
    <div :class="{'has-logo':showLogo}">
        <logo v-if="showLogo" :collapse="isCollapse" />
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu  router
                :default-active="activeMenu"
                :collapse="isCollapse"
                :background-color="variables.menuBg"
                :text-color="variables.menuText"
                :unique-opened="true"
                :active-text-color="settings.theme"
                :collapse-transition="false"
                mode="vertical"
            >
                <sidebar-item
                    v-for="(route, index) in permission_routes"
                    :key="route.path  + index"
                    :item="route"
                    :base-path="route.path"
                />
                <el-menu-item index="/signup">
                  <i class="el-icon-user"></i>
                  <span slot="title">报名管理</span>
                </el-menu-item>
                <el-menu-item index="/user">
                  <i class="el-icon-user"></i>
                  <span slot="title">用户管理</span>
                </el-menu-item>
				<el-menu-item index="/pattern">
				  <i class="el-icon-office-building"></i>
				  <span slot="title">模式管理</span>
				</el-menu-item>
				<el-menu-item index="/tasks">
				  <i class="el-icon-reading"></i>
				  <span slot="title">任务管理</span>
				</el-menu-item>
				<el-menu-item index="/salesPerformance">
				  <i class="el-icon-collection-tag"></i>
				  <span slot="title">业绩管理</span>
				</el-menu-item>
				<el-menu-item index="/remuneration">
				  <i class="el-icon-bank-card"></i>
				  <span slot="title">薪酬管理</span>
				</el-menu-item>
				<el-menu-item index="/message">
				  <i class="el-icon-chat-dot-square"></i>
				  <span slot="title">消息推送</span>
				</el-menu-item>
                <el-menu-item index="/permission">
                  <i class="el-icon-lock"></i>
                  <span slot="title">权限管理</span>
                </el-menu-item>
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/assets/styles/variables.scss";

export default {
    components: { SidebarItem, Logo },
    computed: {
        ...mapState(["settings"]),
        ...mapGetters(["permission_routes", "sidebar"]),
        activeMenu() {
            const route = this.$route;
            const { meta, path } = route;
            // if set path, the sidebar will highlight the path you set
            if (meta.activeMenu) {
                return meta.activeMenu;
            }
            return path;
        },
        showLogo() {
            return this.$store.state.settings.sidebarLogo;
        },
        variables() {
            return variables;
        },
        isCollapse() {
            return !this.sidebar.opened;
        }
    }
};
</script>
