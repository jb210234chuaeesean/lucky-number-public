<template>
  <router-view/>
</template>

<style>
html, body, img {
  overflow: hidden;
  overscroll-behavior: none;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-drag: none;
}

::-webkit-scrollbar {
  display: none;
}

.circle-spin-8 {
  --size: 60px;
  --color: white;
  --animation-timing-function: linear;
  --animation-duration: 1s;
  width: var(--size);
  height: var(--size);
  mask-image: radial-gradient(circle at 50% 50%, transparent calc(var(--size) / 3), white calc(var(--size) / 3));
  background-image: conic-gradient(transparent, transparent 135deg, white);
  border-radius: 50%;
  animation: var(--animation-timing-function) var(--animation-duration) infinite circle-spin-8-animation;
}

@keyframes circle-spin-8-animation {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
