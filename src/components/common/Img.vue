<template>
  <img :src="imagesUrl + src" :height="height">
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: "no-image.png"
    },
    height: {
      type: String,
      default: ""
    }
  },
  data: () => {
    return {
      imagesUrl: "https://s3.amazonaws.com/edufami/trainings/"
    };
  }
};
</script>

