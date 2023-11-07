<template>
  <div class="main-component-flex-wrapper">
    <Slider :sliders="[
      {
        imageUrl:
          'http://news.samsungdisplay.com/wp-content/uploads/2018/08/8.jpg',
        url: 'https://www.npmjs.com/package/@tensorflow/tfjs-backend-webgpu',
      },
      {
        imageUrl:
          'https://cdn.pixabay.com/photo/2023/03/08/10/11/crocuses-7837426_1280.jpg',
        url: 'b',
      },
      {
        imageUrl:
          'https://starwalk.space/gallery/images/astrophotography/1920x1080.jpg',
        url: 'c',
      },
      {
        imageUrl: 'https://t1.daumcdn.net/cfile/tistory/240814485574155029',
        url: 'd',
      },
      {
        imageUrl:
          'https://www.visitbusan.net/uploadImgs/files/cntnts/20200811164909177_ttiel',
        url: 'e',
      },
    ]" />
    <Banner image-url="https://t3.ftcdn.net/jpg/03/97/98/32/240_F_397983283_6pfNPBZHtyzfeEUl8y3iMHNi17sylDvh.jpg" url="a" />
    <div class="flex-container">
      <div class="flex-left-container">
        <Subbanner imageUrl="https://as1.ftcdn.net/v2/jpg/02/96/24/80/1000_F_296248029_VLudqgNlbYlTkvFG8Q2P9msCEMke33zO.jpg" url="a"
          text="" />
      </div>
      <div class="flex-right-container">
        <div class="banner-container">
          <Subbanner imageUrl="https://as2.ftcdn.net/v2/jpg/06/00/97/57/1000_F_600975782_RRlDtJf3fMUQoHhrtDyIA6JOZrHNONdW.jpg" url="a"
            text="" />
          <Subbanner imageUrl="https://as2.ftcdn.net/v2/jpg/03/64/65/27/1000_F_364652725_eXiV1UAEYhrIhKoHxCj5z3TZTC5osK9M.jpg" url="a"
            text="" />
        </div>
        <div class="banner-container">
          <Subbanner imageUrl="https://img.etnews.com/news/article/2021/07/23/cms_temp_article_23153814137700.jpg" url="a"
            text="" />
          <Subbanner imageUrl="https://img.etnews.com/news/article/2021/07/23/cms_temp_article_23153814137700.jpg" url="a"
            text="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Slider from "../components/main/Slider.vue";
import Banner from "../components/main/Banner.vue";
import Subbanner from "../components/main/Subbanner.vue";

export default {
  data() {
    return {
      exmaple: {
        imageUrl: "https://google.com/~",
        url: "https://something/",
      },
    };
  },
  components: {
    Slider,
    Banner,
    Subbanner,
  },
};
</script>

<style>
.main-component-flex-wrapper {
  display: flex;
  flex-direction: column;
  /* padding-left: 10%; */
  /* padding-right: 10%; */
}

/* 전체를 차지하게 만듬 */
.flex-container {
  display: flex;
  /* width: 83vw; */
  flex-direction: row;
}

/* 왼쪽 반쪽 */
.flex-left-container {
  display: flex;
  min-width: 40%;
}

/* 오른쪽 반쪽 */
.flex-right-container {
  display: flex;
  min-width: 40%;
  flex-direction: column;
}

/* 서브배너 컴포넌트를 정렬해 줌 */
.banner-container {
  display: flex;
  flex-direction: row;
  gap: 20px;
}
</style>
