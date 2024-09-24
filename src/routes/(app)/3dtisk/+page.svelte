<script lang="ts">
    export let data;
  </script>
  
  {#each data.categoryList as item}
    <ul>{item.CategoryName}</ul>
  {/each}
  