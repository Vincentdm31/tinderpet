<template>
  <div class="gradient d-flex fx-col fx-center vcenter h100">
    <div class="flip-card">
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <img
            src="img_avatar.png"
            alt="Avatar"
            style="width: 300px; height: 300px"
          />
        </div>
        <div class="flip-card-back">
          <h1>John Doe</h1>
          <p>Architect & Engineer</p>
          <p>We love that guy</p>
        </div>
      </div>
    </div>
    <h1 class="mt-0 txt-white" style="font-size: 10rem">Tinderpet</h1>
    <img src="../assets/flamme.png" class="responsive-media my-5" />
    <router-link
      class="
        btn
        gradient
        txt-white
        font-s5
        mt-5
        rounded-1
        bd-solid bd-white bd-1
      "
      to="/pets"
      >START
    </router-link>
  </div>
</template>
<style lang="scss">
.btn {
  transition: transform ease 0.3s;
  &:hover {
    transform: scale(1.1);
  }
}
/* The flip card container - set the width and height to whatever you want. We have added the border property to demonstrate that the flip itself goes out of the box on hover (remove perspective if you don't want the 3D effect */
.flip-card {
  background-color: transparent;
  width: 300px;
  height: 200px;
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
}

/* This container is needed to position the front and back side */
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s ease;
  transform-style: preserve-3d;
}

/* Do an horizontal flip when you move the mouse over the flip box container */
.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

/* Position the front and back side */
.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

/* Style the front side (fallback if image is missing) */
.flip-card-front {
  background-color: rgb(82, 1, 1);
  color: black;
}

/* Style the back side */
.flip-card-back {
  background-color: dodgerblue;
  color: white;
  transform: rotateY(180deg);
}
</style>
