import NotFound from "@/pages/NotFound.vue";
import Login from "@/pages/Login.vue";
// import Dashboard from "@/pages/Dashboard.vue";
import Trainings from "@/pages/Trainings.vue";
import Training from "@/pages/Training.vue";
import Unit from "@/pages/Unit.vue";
import Lesson from "@/pages/Lesson.vue";
import Step from "@/pages/Step.vue";

const paths = [
  {
    path: "*",
    meta: {
      public: true
    },
    redirect: {
      path: "/404"
    }
  },
  {
    path: "/404",
    meta: {
      public: true
    },
    name: "NotFound",
    component: NotFound
  },
  // {
  //   path: '/403',
  //   meta: {
  //     public: true,
  //   },
  //   name: 'AccessDenied',
  //   component: () => import(
  //     /* webpackChunkName: "routes" */
  //     /* webpackMode: "lazy-once" */
  //     `@/pages/Deny.vue`
  //   )
  // },
  // {
  //   path: '/500',
  //   meta: {
  //     public: true,
  //   },
  //   name: 'ServerError',
  //   component: () => import(
  //     /* webpackChunkName: "routes" */
  //     /* webpackMode: "lazy-once" */
  //     `@/pages/Error.vue`
  //   )
  // },
  {
    path: "/",
    meta: {
      public: true
    },
    name: "Login",
    component: Login
  },
  {
    path: "/dashboard",
    meta: { breadcrumb: true },
    name: "Dashboard",
    component: Trainings
  },
  {
    path: "/training/:trainingId",
    meta: { breadcrumb: true },
    name: "Training",
    component: Training
  },
  {
    path: "/unit/:unitId",
    meta: { breadcrumb: true },
    name: "Unit",
    component: Unit
  },
  {
    path: "/lesson/:lessonId",
    meta: { breadcrumb: true },
    name: "Lesson",
    component: Lesson
  },
  {
    path: "/step/:stepId",
    meta: { breadcrumb: true },
    name: "Step",
    component: Step
  },
  {
    path: "/option/:optionId",
    meta: { breadcrumb: true },
    name: "Option",
    component: Option
  }
];

export default paths;
