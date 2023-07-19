
<script>
    import SvelteMarkdown from 'svelte-markdown'
    /** @type {import('./$types').PageData} */
    export let data;
  </script>
  
  <h1>{data.title}</h1>
  <SvelteMarkdown options={{mangle: false}} source={data.content}/>
  
  <!-- to be replaced by the missing css toolkit -->
  <style>
    p {
      color: purple;
      font-family: 'Comic Sans MS', cursive;
      font-size: 2em;
    }
  </style>