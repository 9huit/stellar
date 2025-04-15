<style scoped>
  .rating > label {
    margin-right: 4px;
  }

  .rating:not(:checked) > input {
    display: none;
  }

  .rating:not(:checked) > label {
    float: right;
    cursor: pointer;
    font-size: 24px;
  }

  .rating:not(:checked) > label > svg {
    fill: #666;
    transition:
      fill 0.3s ease,
      transform 0.3s ease;
  }

  .rating > input:checked ~ label > svg {
    fill: #ff0000;
    transform: scale(1.1);
  }

  .rating:not(:checked) > label:hover ~ label > svg,
  .rating:not(:checked) > label:hover > svg {
    fill: #ff1a1a;
    transform: scale(1.05);
  }

  #heart1:checked ~ label > svg {
    fill: #ff0000;
  }

  #heart1:hover ~ label > svg,
  #heart1:hover > svg {
    fill: #e60000 !important;
  }
</style>

<template>
  <div class="rating" >
    <input type="radio" id="heart1" name="rate" value="1" />
    <label for="heart1" title="Ужасно">
      <svg viewBox="0 0 24 24" height="1em" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        ></path>
      </svg>
    </label>
  </div>
</template>
