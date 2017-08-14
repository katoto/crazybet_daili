<template>
    <div id="app">
        <p>我的后台统计页面 </p>
        <div class="page-datetime">
            <h1 class="page-title">Datetime Picker</h1>
            <div class="page-datetime-wrapper">
                <mt-button @click.native="open('picker4')" size="large">自定义模板</mt-button>
                <mt-button @click.native="open('picker5')" size="large">设定初始值</mt-button>
            </div>
            <mt-datetime-picker
                    ref="picker4"
                    type="date"
                    v-model="value4"
                    v-bind:startDate=pickerValue
                    v-bind:endDate=endDate
                    year-format="{value} 年"
                    month-format="{value} 月"
                    date-format="{value} 日"
                    @confirm="handleChange">
            </mt-datetime-picker>
            <mt-datetime-picker
                    ref="picker5"
                    type="time"
                    v-model="value5"
                    @confirm="handleChange">
            </mt-datetime-picker>
        </div>
        <div class="page-navbar">
            <div class="page-title">Navbar</div>
            <div class="page-part-contain">
                <mt-navbar class="page-part" v-model="selected">
                    <mt-tab-item id="1">选项一</mt-tab-item>
                    <mt-tab-item id="2">选项二</mt-tab-item>
                    <mt-tab-item id="5">选项三</mt-tab-item>
                    <mt-tab-item id="5">选项三</mt-tab-item>
                    <mt-tab-item id="5">选项三</mt-tab-item>
                    <mt-tab-item id="5">选项三</mt-tab-item>
                </mt-navbar>
            </div>
            <div>
                <mt-cell class="page-part" title="当前选中">{{ selected }}</mt-cell>
            </div>
            <mt-tab-container v-model="selected">
                <mt-tab-container-item id="1">0
                    <mt-cell v-for="n in numbers" :key="n" :title="'内容 ' + n" />
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                    <mt-cell v-for="n in numbers" :key="n" :title="'测试 ' + n" />
                </mt-tab-container-item>
                <mt-tab-container-item id="5">
                    <mt-cell v-for="n in numbers" :key="n" :title="'选项 ' + n" />
                </mt-tab-container-item>
            </mt-tab-container>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                numbers: [ 1, 2, 3, 4, 5 ],
                value4: '2016-12-11',
                value5: '04:32',
                visible4: false,
                pickerValue:new Date(new Date().getFullYear() - 1, 0, 1),
                endDate:new Date(new Date().getFullYear() +1, 0, 1),
                visible5: false,
                selected: '1'
            };
        },
        methods: {
            open(picker) {
                this.$refs[picker].open();
            },
            handleChange(value) {
                alert(value.toString())
                console.log(value)
            }
        }
    };
</script>
<style>
    .mint-navbar .mint-tab-item{
        color: #000;
    }
    .page-part-contain{
        display: block;
        width: 100%;
        overflow-x: scroll;
    }
    .mint-navbar{
        display: block;
        width: 300%;
        text-align: left;
    }
    .mint-navbar a{
        text-align: center;
        display: inline-block;
        width: 60px;
    }
</style>
