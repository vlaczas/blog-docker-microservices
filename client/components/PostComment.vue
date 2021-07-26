<template>
  <div class="text-start">
    <div>
      <transition-group name="list" tag="div">
        <div v-for="comment in comments" :key="comment.id" class="p-2 mb-2 border rounded-3">
          {{comment.content}}
        </div>
      </transition-group>     
        <form @submit.prevent="createComment">
          <div class="form-group">
            <label for="comment"> Leave a comment </label>
            <input
              type="text"
              id="comment"
              v-model.trim.lazy="newComment"
              class="form-control"
            />
            <button type="submit" class="btn btn-primary mt-3">Comment</button>
          </div>
        </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostComment',
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    newComment: '',
    comments: []
  }),
  created() {
    this.comments = [...this.post.comments];
  },
  methods: {
    async createComment() {
      if (!this.newComment) return
      try {
        const data = await this.$axios.post(`http://localhost:4001/api/posts/${this.post.id}/comments`, {content: this.newComment})
        this.comments.push({id: data.data.id, content: this.newComment})
        this.newComment = ''
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style>
.list-enter-active, .list-leave-active {
  transition: all 0.5s;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateX(50px);
}
</style>
