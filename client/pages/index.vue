<template>
  <div class="container my-5">
    <h1>CREATE A POST</h1>
    <form @submit.prevent="createPost">
      <div class="form-group">
        <label for="title">Enter a post title</label>
        <input
          id="title"
          type="text"
          class="form-control from-control-lg"
          v-model.trim.lazy="newTitle"
        />
        <button type="submit" class="btn btn-primary my-3">Submit</button>
      </div>
    </form>
    <div class="row row-cols-2 row-cols-lg-3 g-2 g-lg-3">
      <PostCard v-for="post of posts" :key="post.id" :info="post" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Posts',
  data: () => ({
    posts: [],
    newTitle: '',
  }),
  async created() {
    const posts = await this.$axios.get('http://localhost:4002/posts')
    this.posts = Object.values(posts.data)
  },
  methods: {
    async createPost() {
      if (!this.newTitle) return

      const post = await this.$axios.post('/api/posts', {
        title: this.newTitle,
      })
      
      this.posts.push({...post.data, comments: []})
      this.newTitle = ''
    },
  },
}
</script>
