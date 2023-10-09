<template>
    <form class="input-box form-floating">
        <h3 class="input-title" :class="{ 'title-danger': !valids && modelValue }">
            {{ names }}
        </h3>
        <div class="input-group mb-3">
            <span class="input-group-text">{{ names }}</span>
            <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" class="form-control"
                :type="passwords ? 'password' : 'text'" :placeholder="placeholders"
                :class="{ 'is-invalid': !valids && modelValue }" />
        </div>
        <p v-show="valids ? false : true && modelValue" class="title-danger">
            {{ names }}を正確に入力してください。
        </p>
    </form>
</template>

<script>
export default {
    props: {
        confirms: {
            type: Boolean,
            default: true
        },
        names: String,
        placeholders: String,
        // v-model을 사용할 때 필요
        modelValue: {
            type: String
        },
        valids: {
            type: Boolean
        },
        passwords: Boolean
    },
    // v-model을 사용할 때 필요
    emits: ['update:modelValue'],
}
</script>

<style>
.input-error {
    line-height: 16px;
    font-size: 11px;
    color: red;
}

.title-normal {
    color: black;
}

.title-danger {
    color: red;
}

.input-danger {
    border-bottom: 1px solid red !important;
}
</style>