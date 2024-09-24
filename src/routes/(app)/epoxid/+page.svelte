<script lang="ts">
  export let data;
</script>

{#each data.categoryList as item}
  <div class="flex gap-4">
    <a href={`/epoxid/${item.CategoryId}`}>{item.CategoryName}</a>
  </div>
{/each}
