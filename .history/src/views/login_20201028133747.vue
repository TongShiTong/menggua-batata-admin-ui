<template>
	<div class="login">
		<el-form class="login-form" ref="loginFormRef" :model="loginForm" :rules="loginRules">
			<h3 class="title">番薯生活后台管理系统</h3>
			<el-form-item prop="username">
				<el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号" prefix-icon="el-icon-user">

				</el-input>
			</el-form-item>
			<el-form-item prop="password">
				<el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码" prefix-icon="el-icon-key">

				</el-input>
			</el-form-item>
			<el-form-item style="width:100%;">
				<el-button size="medium" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
					<span v-if="!loading">登 录</span>
					<span v-else>登 录 中...</span>
				</el-button>
			</el-form-item>
		</el-form>
		<div class="el-login-footer">
			<span>Copyright © 2019-2020 menggua.com All Rights Reserved.</span>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				loginForm: {
					username: '',
					password: ''
				},
				loginRules: {
					username: [{
						required: true,
						trigger: "blur",
						message: "请输入用户名"
					}],
					password: [{
						required: true,
						trigger: "blur",
						message: "请输入密码"
					}, {
						min: 6,
						max: 36,
						message: '密码字符个数为6~36之间',
						trigger: 'blur'
					}]
				},
				loading: false,
			}
		},
		methods: {
			handleLogin() {
				this.$refs.loginFormRef.validate(async valid => {
					if (!valid)  return this.$message.warning('请输入用户名密码！')
					const {
						data: res
					} = await this.$http.post('/user/login', this.loginForm);
					if (res.code == 8001) {
						window.sessionStorage.setItem("token",res.result);
						this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
					}
					if (res.code == 5006) {
						this.$message({
							message: '用户名密码错误，请重试！',
							type: 'error'
						});
					}
					if (res.code == 5007) {
						this.$message({
							message: '用户名密码错误，请重试！',
							type: 'error'
						});
					}
				});
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss">
	$bg:#283443;
	$light_gray:#fff;
	$cursor: #fff;

	.login {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		background-color: $bg;
		overflow: hidden;
	}

	.title {
		margin: 0px auto 30px auto;
		text-align: center;
		color: #707070;
	}

	.login-form {
		border-radius: 6px;
		background: #ffffff;
		width: 400px;
		padding: 25px 25px 5px 25px;

		.el-input {
			height: 38px;

			input {
				height: 38px;
			}
		}

		.input-icon {
			height: 20px;
			width: 0px;
			margin-left: 0px;
		}
	}

	.login-tip {
		font-size: 13px;
		text-align: center;
		color: #bfbfbf;
	}

	.login-code {
		width: 33%;
		height: 38px;
		float: right;

		img {
			cursor: pointer;
			vertical-align: middle;
		}
	}

	.el-login-footer {
		height: 40px;
		line-height: 40px;
		position: fixed;
		bottom: 0;
		width: 100%;
		text-align: center;
		color: #fff;
		font-family: Arial;
		font-size: 12px;
		letter-spacing: 1px;
	}
</style>
