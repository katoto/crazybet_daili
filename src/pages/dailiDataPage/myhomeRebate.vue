<template>
    <div id="app">
        <p> myhomeRebate </p>
        <ul>
            <li>标1题</li>
            <li>标2题</li>
            <li>标3题</li>
            <li>标4题</li>
            <li>标a题</li>
            <li>标b题</li>
            <li>栏目</li>
        </ul>
        <table>
            <tbody>
                <tr>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                </tr>
                <tr>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                </tr>
                <tr>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                </tr>
                <tr>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                </tr>
                <tr>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                </tr>
                <tr>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                </tr>
                <tr>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                </tr>
                <tr>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                title: ''
            }
        },
        watch: {},
        methods: {},
        computed: {},
        mounted(){

        }
    }
</script>
<style>
    tbody{
        width: 300px;
        height: 200px;
        border: 1px solid #ff2101;
        overflow: scroll;
        display: block;
        position: relative;
    }
    table{
        margin: 100px;
    }
    tr td{
        border: 1px solid #000;
        padding:10px ;
    }
    tr{
        margin-top: 10px;
    }
    tbody tr td:first-child{
        background-color: rebeccapurple;
        position: fixed;
        left: 56px;
    }
</style>
