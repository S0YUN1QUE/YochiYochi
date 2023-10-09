<template>
  <div id="wrap">
    <div id="content">
      <div class="mx-36">
        <div id="inf">
          <p class="text-xl font-extrabold pl-3">会員情報</p>
          <ProfileLIstItem></ProfileLIstItem>
        </div>
        <div id="stat">
          <p class="text-xl font-extrabold pl-3">幼児学習統計</p>
          <StatListItem></StatListItem>
        </div>
        <div id="pur-his">
          <p class="text-xl font-extrabold pl-3">購入履歴</p>
          <PurhisListItem></PurhisListItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileLIstItem from "../components/profile/profile-list-item.vue";
import StatListItem from "../components/profile/stat-list-item.vue";
import PurhisListItem from "../components/profile/purhis-list-item.vue";

export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  components: {
    ProfileLIstItem,
    StatListItem,
    PurhisListItem,
  },
};
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
}

#content {
  border-radius: 10px;
  padding: 50px;
  margin-top: 50px;
  width: 85%;
  background-color: rgb(255, 255, 255);
  min-height: 720px;
}
</style>
