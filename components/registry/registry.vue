<template>
	<view class="registry">
		<view class="basic_registry" v-if="active === 0">
			<view class="registry_title1">注册基本信息</view>

			<view class="form-item">
				<text class="form-label">姓名</text>
				<view class="form-body">
					<input type="text" class="form-input" v-model="administrator" />
				</view>
			</view>
			<view class="form-item">
				<text class="form-label">当前位置</text>
				<view class="form-body">
					<input type="text" class="form-input" v-model="adress" />
				</view>
			</view>
			<view class="form-item">
				<text class="form-label">性别</text>
				<view class="form-item-sexRadio">
					<radio-group @change="sexChange">
						<label class="radio">
							<radio value="0" checked="true" style="transform:scale(0.7)" />男
						</label>
						<label class="radio">
							<radio value="1" style="transform:scale(0.7)" />女
						</label>
					</radio-group>
				</view>
			</view>
			<view class="next">
				<button type="default" class="next-btn1" @click="nextClick">下一步</button>
			</view>
		</view>

		<view class="contact_situation" v-if="active === 1">
			<view class="registry_title2">接触情况</view>
			<view class="switch_item">
				<view class="switch-item-text">到访或途经疫情严重地区</view>
				<switch style="transform:scale(0.7)" @change="switch1Change" />
			</view>
			<view class="switch_item">
				<view class="switch-item-text">接触疫情严重地区人员（14天内）</view>
				<switch style="transform:scale(0.7)" @change="switch2Change" />
			</view>
			<view class="switch_item">
				<view class="switch-item-text">接触境外人员（14天内）</view>
				<switch style="transform:scale(0.7)" @change="switch3Change" />
			</view>
			<view class="switch_item">
				<view class="switch-item-text">接触发热或呼吸道感染症状人员（14天内）</view>
				<switch style="transform:scale(0.7)" @change="switch4Change" />
			</view>
			<view class="switch_item">
				<view class="switch-item-text">家庭/小区/村有确诊或疑似病例</view>
				<switch style="transform:scale(0.7)" @change="switch5Change" />
			</view>
			<view class="previous">
				<button type="default" class="previous-btn" @click="previousClick">上一步</button>
			</view>
			<view class="next">
				<button type="default" class="next-btn2" @click="nextClick">下一步</button>
			</view>
		</view>

		<view class="health_situation" v-if="active === 2">
			<view class="registry_title2">健康情况</view>
			<view class="selector_item">
				<view class="selector-item-text">状态</view>
				<picker mode="selector" :range="stateLists" :value="healthState" @change="stateChange">
					<view class="selector-input">{{stateLists[index]}}</view>
				</picker>
			</view>
			<view class="switch_item">
				<view class="switch-item-text">咳嗽</view>
				<switch style="transform:scale(0.7)" />
			</view>
			<view class="form-item1">
				<text class="form-label">当前温度</text>
				<view class="form-item-tempRadio">
					<radio-group @change="tempChange">
						<label class="radio">
							<radio value="0" checked="true" style="transform:scale(0.7)" />正常温度：36℃~37℃
						</label>
						<label class="radio">
							<radio value="1" style="transform:scale(0.7)" />低烧：37.3℃~38℃
						</label>
						<label class="radio">
							<radio value="2" style="transform:scale(0.7)" />高烧：38.1℃~40℃
						</label>
						<label class="radio">
							<radio value="3" style="transform:scale(0.7)" />40℃以上
						</label>
					</radio-group>
				</view>
			</view>
			<view class="switch_item">
				<view class="switch-item-text">呼吸困难</view>
				<switch style="transform:scale(0.7)" @change="dyspneaChange" />
			</view>
			<view class="switch_item">
				<view class="switch-item-text">其他疑似症状</view>
				<switch style="transform:scale(0.7)" @change="ohterChange" />
			</view>
			<view class="previous">
				<button type="default" class="previous-btn" @click="previousClick">上一步</button>
			</view>
			<view class="next">
				<button type="submit" class="next-btn2" @click="fromSubmit">提交</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "registry",
		props: {
			activeIndex: {
				type: Number,
				default: 0
			},
			mobNumber: {
				type: String,
				default: ''
			},
			adminId: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				administrator: '',
				sexValue: 0,

				adress: '',
				describe1: 0,
				describe2: 0,
				describe3: 0,
				describe4: 0,
				describe5: 0,
				healthState: 0,
				cough: 0,
				temperature: 0,
				dyspnea: 0,
				ohter: 0,
				stateIndex: 0,

				index: 0,
				stateLists: ['良好', '患病'],
			};
		},
		computed: {
			active() {
				return this.activeIndex
			},
			numberMobile() {
				return this.mobNumber;
			},
			idEnter() {
				return this.adminId;
			}
		},
		methods: {
			sexChange(e) {
				this.sexValue = e.detail.value;
			},
			tempChange(e) {
				this.temperature = e.detail.value;
			},
			stateChange(e) {
				this.healthState = e.target.value;
				this.index = this.healthState;
			},
			previousClick() {
				this.$emit("stepPrevious");
			},
			nextClick() {
				this.$emit("stepNext");
			},
			switch1Change(e) {
				this.describe1 = Number(e.target.value);
			},
			switch2Change(e) {
				this.describe2 = Number(e.target.value);
			},
			switch3Change(e) {
				this.describe3 = Number(e.target.value);
			},
			switch4Change(e) {
				this.describe4 = Number(e.target.value);
			},
			switch5Change(e) {
				this.describe5 = Number(e.target.value);
			},
			dyspneaChange(e) {
				this.dyspnea = Number(e.target.value);
			},
			ohterChange(e) {
				this.ohter = Number(e.target.value);
			},
			fromSubmit() {
				uni.redirectTo({
					url: '../../pages/enter/enter'
				});
				console.log("111" + this.idEnter);
				//个人基础信息
				uni.request({
						url: 'http://localhost:8080/user/update',
						method: 'POST',
						header: {'accessToken': localStorage.getItem("accessToken")},
						data: {
							phone: this.numberMobile,
							name: this.administrator,
							sex: this.sexValue
						},
						success: (resp) => {
							const respData = resp.data;
							console.log(respData);
						}
					}),
					//健康信息
					uni.request({
						url: 'http://localhost:8080/healthCode/add',
						method: 'POST',
						header: {'accessToken': localStorage.getItem("accessToken")},
						data: {
							city: this.city,
							describe1: this.describe1,
							describe2: this.describe2,
							describe3: this.describe3,
							describe4: this.describe4,
							describe5: this.describe5,
							healthState: this.healthState,
							cough: this.cough,
							temperature: this.temperature,
							dyspnea: this.dyspnea,
							ohter: this.ohter,
						},
						success: (resp) => {
							const respData = resp.data;
							console.log(respData);
						}
					})
			}
		}
	}
</script>

<style>
	.registry_title1,
	.registry_title2,
	.registry_title3 {
		width: 100%;
		height: 100upx;
		color: gray;
		background-color: #f7f7f7;
		line-height: 100upx;
		padding-left: 30upx;
		font-size: 30upx;
	}

	.form-item {
		padding-left: 40upx;
		padding-top: 30upx;
		font-weight: 300;
	}

	.form-label {
		display: inline-block;
		font-size: 30upx;
		margin-bottom: 20upx;
		font-weight: 300;
	}

	.form-input {
		width: 75%;
		height: 65upx;
		border: 1upx #e5e1e1 solid;
		padding-left: 10upx;
	}

	.form-item-radio {
		height: 60upx;
	}

	.form-item-sexRadio label {
		margin-right: 25upx;
		margin-bottom: 25upx;
	}

	.form-item-tempRadio label {
		display: block;
		margin-right: 25upx;
		margin-top: 15upx;
	}

	.next-btn1,
	.next-btn2,
	.next-btn3,
	.previous-btn {
		width: 200upx;
		height: 90upx;
		margin-top: 120upx;
		background-color: #3CB400;
		color: white;
		/* 		position: absolute;
		right: 30upx; */
		line-height: 90upx;
	}

	//第二步
	.switch_item {
		width: 100%;
		height: 100upx;
		position: relative;
		line-height: 100upx;
		padding-left: 40upx;
		font-size: 30upx;
		font-weight: 300;
		border-bottom: 1upx #e5e1e1 solid;
	}

	.switch_item switch {
		position: absolute;
		top: 0upx;
		right: 20upx;
	}

	.selector_item {
		width: 100%;
		height: 100upx;
		padding-left: 40upx;
		line-height: 100upx;
		font-size: 30upx;
		font-weight: 300;
	}

	.selector-item-text {
		display: inline-block;
		padding-right: 50upx;
	}

	.selector_item picker {
		width: 200upx;
		display: inline-block;
	}

	.previous-btn {
		position: absolute;
		bottom: 80upx;
		left: 30upx;
	}

	.next-btn2 {
		position: absolute;
		bottom: 80upx;
		right: 30upx;
	}

	.form-item1 {
		padding-left: 40upx;
		padding-top: 30upx;
		font-weight: 300;
		padding-bottom: 30upx;
		border-bottom: 1upx #e5e1e1 solid;
	}
</style>
