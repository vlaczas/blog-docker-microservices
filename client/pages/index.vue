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
      <PostCard v-for="post in postsArr" :key="post.id" :info="post" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Posts',
  data: () => ({
    posts: {},
    newTitle: '',
  }),
  async created() {
    const posts = await this.$axios.get('/api/posts')
    this.posts = posts.data
  },
  computed: {
    postsArr() {
      return Object.values(this.posts)
    },
  },
  methods: {
    async createPost() {
      if (!this.newTitle) return

      const post = await this.$axios.post('/api/posts', {
        title: this.newTitle,
      })
      if (post) {
        const id = Date.now()
        const posts = {...this.posts}
        posts[id] = {id, title: this.newTitle}
        this.newTitle = ''
        this.posts = posts
      }
    },
  },
}
</script>
