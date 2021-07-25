<template>
  <div class="text-start">
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
  }),
  methods: {
    createComment() {
      if (!this.newComment) return
      try {
        this.$axios.post(`http://localhost:4001/api/posts/${this.post.id}/`, {})
        this.newComment = ''
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style></style>
