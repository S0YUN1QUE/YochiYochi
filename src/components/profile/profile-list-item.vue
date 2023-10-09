<template>
  <div class="">
    <div class="border-2 rounded-lg p-4 font-bold my-2">
      <div class="flex items-center mb-3">
        <img
          src="https://search.pstatic.net/common/?src=http%3A%2F%2Fshop1.phinf.naver.net%2F20200412_104%2F1586654601966PVGt0_JPEG%2F24016144406042678_1914325472.jpg&type=a340"
          alt="프로필 사진"
          class="rounded-full cursor-pointer"
          style="width: 100px"
        />
        <p class="ml-16">ニックネーム</p>
      </div>
      <div class="border"></div>
      <div class="flex my-2 mx-7">
        <p class="basis-1/6">名前</p>
        <p class="flex-1">キム・ウヒョン</p>
        <p class="basis-1/13 bg-sky-300 rounded-lg cursor-pointer px-1">修正</p>
      </div>
      <div class="border"></div>
      <div class="flex my-2 mx-7">
        <p class="basis-1/6">幼児情報</p>
        <p class="basis-3/12">名前: ばぶばぶ</p>
        <p class="basis-1/6">年齢: 17</p>
        <p class="flex-1">
          性別:
          <img
            v-if="sex"
            class="ml-2"
            src="https://cdn-icons-png.flaticon.com/512/1019/1019172.png"
            alt="남"
            style="width: 20px; display: inline"
          />
          <img
            v-if="!sex"
            class="ml-2"
            src="https://cdn-icons-png.flaticon.com/512/2159/2159168.png"
            alt="남"
            style="width: 20px; display: inline"
          />
        </p>
        <p class="basis-1/13 bg-sky-300 rounded-lg cursor-pointer px-1">修正</p>
      </div>
      <div class="border"></div>
      <div class="flex my-2 mx-7">
        <p class="basis-1/6">連絡先</p>
        <p class="flex-1">010101</p>
        <p class="basis-1/13 bg-sky-300 rounded-lg cursor-pointer px-1">修正</p>
      </div>
      <div class="border"></div>
      <div class="flex my-2 mx-7">
        <p class="basis-1/6">メール</p>
        <p class="flex-1">saranhamsida@naver.com</p>
        <p class="basis-1/13 bg-sky-300 rounded-lg cursor-pointer px-1">修正</p>
      </div>
      <div class="border"></div>
      <div class="flex my-2 mx-7">
        <p class="basis-1/6">アドレス</p>
        <p class="flex-1">대구광역시 도남중앙로8길 8</p>
        <p class="basis-1/13 bg-sky-300 rounded-lg cursor-pointer px-1">修正</p>
      </div>
      <div class="border"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sex: true,
      data: "",
    };
  },
};
</script>
