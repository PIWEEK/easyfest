
<script>
    /** @type {import('./$types').PageData} */
    export let data;
  </script>
  
  <h1>{data.title}</h1>
  {@html data.content}
  
  
  <!-- to be replaced by the missing css toolkit -->
  <style>
    p {
      color: purple;
      font-family: 'Comic Sans MS', cursive;
      font-size: 2em;
    }
  </style>