<template>
    <div>
        <div class="d-flex flex-column align-items-center">
            <Input class="w-25 " names="名前" placeholders="ex) 田中" v-model="value.name" :valids="valid.nameHasError"
                :passwords="false" :confirms="false" />
        </div>
        <div class="d-flex flex-column align-items-center input-group">
            <Input class="w-50" names="E-mail" placeholders="ex) kream@kream.co.kr" v-model="value.email"
                :valids="valid.emailHasError" :passwords="false" :confirms="true" />
        </div>
        <div class="d-flex flex-column align-items-center">
            <!-- Boolean 값만 넣어주고 싶다면 true, false로만 -->
            <Input class="w-50" names="暗証番号" placeholders="英語, 数字, 特殊文字 組み合わせ 8-16字" v-model="value.password" :passwords="true"
                :valids="valid.passwordHasError" :confirms="false" />
        </div>
        <div class="d-flex flex-column align-items-center">
            <Input class="w-50" names="暗証番号再確認" v-model="value.password_confirmation" :passwords="true"
                :valids="valid.passworConfirmdHasError" :confirms="false" />
        </div>
        <div class="d-flex flex-column align-items-center">
            <Input class="w-50" names="電話番号" placeholders="ex) 010-0000-1111" v-model="value.tel" :passwords="false"
                :valids="valid.telHasError" :confirms="false" />
        </div>
        <div>
            <button class="btn btn-outline-primary" type="button" @click="signup()">作成</button>
        </div>
    </div>
</template>

<script>
import Input from "../components/signup/Input.vue";
import { useStore, mapActions } from "vuex";

export default {
    data() {
        return {
            value: {
                name: "",
                email: "",
                password: "",
                password_confirmation: "",
                tel: "",
            },
            valid: {
                nameHasError: false,
                emailHasError: false,
                passwordHasError: false,
                passworConfirmdHasError: false,
                telHasError: false,
            },
        };
    },
    components: {
        Input,
    },
    methods: {
        checkName() {
            const validateName = /^[가-힣]{2,6}$/;
            if (validateName.test(this.value.name)) {
                this.valid.nameHasError = true;
                return;
            }
            this.valid.nameHasError = false;
        },
        checkEmail() {
            const validateEmail =
                /^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/;

            if (validateEmail.test(this.value.email)) {
                this.valid.emailHasError = true;
                return;
            }
            this.valid.emailHasError = false;
        },
        checkPassword() {
            const validatePassword =
                /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
            if (validatePassword.test(this.value.password)) {
                this.valid.passwordHasError = true;
                return;
            }
            this.valid.passwordHasError = false;
        },
        checkPasswordConfirm() {
            if (this.value.password === this.value.password_confirmation) {
                this.valid.passworConfirmdHasError = true;
                return;
            }
            this.valid.passworConfirmdHasError = false;
        },
        checkTel() {
            const validateTel = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

            if (validateTel.test(this.value.tel)) {
                this.valid.telHasError = true;
                return;
            }
            this.valid.telHasError = false;
        },
        async signup() {
            const store = useStore();
            if (this.valid.nameHasError || this.valid.emailHasError || this.valid.passwordHasError || this.valid.passworConfirmdHasError || this.valid.telHasError) {
                try {
                    await this.$store.dispatch("auth/signup", this.value);
                    this.$router.push({ name: "login" });
                } catch (err) {
                    console.log(err);
                }
            } else {
                alert('빈칸을 채워주세요.')
                return;
            }
        },
    },
    watch: {
        "value.name": function () {
            this.checkName();
        },
        "value.email": function () {
            this.checkEmail();
        },
        "value.password": function () {
            this.checkPassword();
        },
        "value.password_confirmation": function () {
            this.checkPasswordConfirm();
        },
        "value.tel": function () {
            this.value.tel = this.value.tel
                .replace(/[^0-9]/g, "")
                .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
                .replace(/(\-{1,2})$/g, "");
            this.checkTel();
        },
    },
};
</script>
