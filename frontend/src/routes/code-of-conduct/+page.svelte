
<script>
    /** @type {import('./$types').PageData} */
    export let data;
  </script>
  
  <h1>{data.title}</h1>
  <p>{@html data.content.code}</p>
  
  
  <!-- to be replaced by the missing css toolkit -->
  <style>
    p {
      color: purple;
      font-family: 'Comic Sans MS', cursive;
      font-size: 2em;
    }
  </style>