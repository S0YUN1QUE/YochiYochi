import { createRouter, createWebHistory } from "vue-router";
import Qna from "../views/Qna.vue";
import Community from "../views/Board.vue";
import Write from "../views/Write.vue";
import BoardEditor from "../views/Boardeditor.vue";
import ListShow from "../views/Listshow.vue";
import Aboutus from "../views/Aboutus.vue";
import Main from "../views/Main.vue";
import Freeboard from "../views/Freeboard.vue";
import Logins from "../views/Logins.vue";
import Signup from "../views/Signup.vue";
import Profile from "../views/Profile.vue";

import Draw from "../views/Draw.vue";
import Cardmemory from "../views/Cardmemory.vue";
import Picturesort from "../views/Picturesort.vue";
import Rainscore from "../views/Rainscore.vue";
import Movenet from "../views/Movenet.vue";

import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/aboutus",
    name: "aboutus",
    component: Aboutus,
  },
  {
    path: "/freeboard",
    name: "freeboard",
    component: Freeboard,
  },
  {
    path: "/logins",
    name: "login",
    component: Logins,
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
  },

  {
    path: "/community",
    name: "community",
    component: Community,
  },
  {
    path: "/qna",
    name: "Qna",
    component: Qna,
  },
  {
    path: "/community/write",
    name: "Cwrite",
    component: Write,
  },
  {
    path: "/qna/write",
    name: "Qwrite",
    component: Write,
  },
  {
    path: "/movenet/rain",
    name: "movenetRain",
    component: Movenet,
  },
  {
    path: "/movenet/rand",
    name: "movenetRand",
    component: Movenet,
  },
  {
    path: "/community/:id",
    name: "comments",
    component: ListShow,
  },
  {
    path: "/qna/:id",
    name: "answers",
    component: ListShow,
  },
  {
    path: "/community/:id/editor",
    name: "Boardditor",
    component: BoardEditor,
  },
  {
    path: "/qna/:id/editor",
    name: "QnaEditor",
    component: BoardEditor,
  },
  {
    path: "/draw",
    name: "draw",
    component: Draw,
  },
  {
    path: "/rainscore",
    name: "rainscore",
    component: Rainscore,
  },
  {
    path: "/cardmemory",
    name: "cardmemory",
    component: Cardmemory,
  },
  {
    path: "/picturesort",
    name: "picturesort",
    component: Picturesort,
  },
];

export default function (store) {
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  router.beforeEach(async (to, from, next) => {
    if (to.name === "login" || to.name === "signup" || to.name === "main" || to.name === "movenetRain" || to.name === "movenetRand") {
      return next();
    }
    if (import.meta.env.VITE_IS_LOGIN === "Y") {
      const access = cookies.get("accessToken");
      const refresh = cookies.get("refreshToken");

      //@@ refreshToken이 없을 경우 로그인 창 띄우기
      if (refresh === null) {
        console.warn("need login...");

        store.commit("auth/needLogin", true);
        router.push({ name: "login" });
      } else if (access === null && refresh !== null) {
        //refreshToken은 있고 accessToken만 있을 경우 재발급요청
        await store.dispatch("auth/verifyToken");
      } else {
        //토큰이 다 있다면 페이지 이동 전 토큰 검증
        console.log("토큰인증시도...");
        await store.dispatch("auth/verifyToken");
      }
      return next();
    } else {
      store.commit("auth/needLogin", false);
      return next();
    }
  });
  return router;
}