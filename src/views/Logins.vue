<template>
    <div v-if="needLogin">
        <div class="d-flex flex-column align-items-center">
            <Input class="w-50" names="E-mail" placeholders="ex) kream@kream.co.kr" v-model="data.value.email"
                :valids="data.valid.emailHasError" :passwords="false" />
        </div>
        <div class="d-flex flex-column align-items-center">
            <Input class="w-50" names="暗証番号" placeholders="英語, 数字, 特殊文字 組み合わせ 8-16字" v-model="data.value.password"
                :passwords="true" :valids="data.valid.passwordHasError" />
        </div>
        <div>
            <button class="btn btn-outline-primary" type="button" @click="login()">Login</button>
        </div>
        <div>
            <button class="btn btn-outline-primary" @click="goSignup()">Signup</button>
        </div>
    </div>
</template>

<script>
import Input from "../components/signup/Input.vue";
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
import { useRouter } from 'vue-router';

export default {
    components: {
        Input,
    },
    setup() {
        const store = useStore();
        const router = useRouter();

        const data = {
            value: {
                email: "",
                password: "",
            },
            valid: {
                emailHasError: true,
                passwordHasError: true,
            },
        };

        const needLogin = computed(() => {
            console.log(store.getters["auth/needLogin"]);
            return store.getters["auth/needLogin"];
        });

        function checkAll() {
            if (!data.valid.emailHasError || !data.valid.passwordHasError) {
                alert("다시 입력하시오.");
                return;
            }
            return true;
        }

        async function login() {
            try {
                await store.dispatch("auth/login", {
                    email: this.data.value.email,
                    password: this.data.value.password,
                });
                router.push({ name: 'main' });
            } catch (err) {
                console.log(err);
            }
        }

        function goSignup() {
            router.push({ name: "signup" });
        }

        return {
            data,
            needLogin,
            checkAll,
            login,
            goSignup
        };
    },
};
</script>
