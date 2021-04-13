<template>
  <div class="page">
    <h1>Create a Journal Tag</h1>
    <div class="add">
        <div class="form">
          <input v-model="newTag.title" placeholder="Title">
          <!-- <input type="color" v-model="newTag.color" placeholder="Color"> -->
          <input v-model="newTag.color" placeholder="Color (include '# for hexadecimal')">
          <button @click="upload">Upload</button>
        </div>
        <div class="upload" v-if="addedTag">
          <p>Your tag has been added! Title: {{addedTag.title}}</p>
        </div>
      </div>

      <hr>
      <h1>Current Journal Tags</h1>

      <div class="edit" v-if="Object.keys(editedTag).length !== 0">
        <input v-model="editedTag.title" placeholder="Title">
        <p></p>
        <input v-model="editedTag.color" placeholder="Color">
        <button @click="updateTag()">Update</button>
      </div>

      <div class="not-edit" v-else-if="Object.keys(editedTag).length === 0">
        <div class="tags" v-for="tag in tags" :key="tag.id">
          <p>{{tag.title}}</p>
          <div class="buttons">
            <button @click="deleteTag(tag)">Delete</button>
            <button @click="select(tag)">Edit</button>
          </div>
        </div>
      </div>

  </div>
</template>

<script>
  import axios from 'axios';
  export default {
  name: 'CreateTag',
  data() {
    return {
      tags: [],
      addedTag: null,
      editedTag: {},
      newTag: {
        id: 0,
        title: "",
        color: "",
        entries: [],
      },
    }
  },
  created() {
    this.getTags();
  },
  methods: {
    async deleteTag(tagToDelete) {
      try {
        await axios.delete("/api/tags/" + tagToDelete.id);
        this.getTags();
        return true;
      } catch (error) {
        //console.log(error);
      }
    },
    select(tag) {
      this.editedTag.id = tag.id;
      this.editedTag.title = tag.title;
      this.editedTag.color = tag.color;
      this.editedTag.entries = tag.entries;
      this.getTags();
    },
    async updateTag() {
      try {
        await axios.put("/api/tags/" + this.editedTag.id, {
          id: this.editedTag.id,
          title: this.editedTag.title,
          color: this.editedTag.color,
          enties: this.editedTag.entries,
        });
        this.editedTag = {};
        this.getTags();
        return true;
      } catch (error) {
        //console.log(error);
      }

    },
    async getTags() {
      try {
        let response = await axios.get("/api/tags");
        this.tags = response.data;
        return true;
      } catch (error) {
        //console.log(error);
      }
    },
    async upload() {
      try {
        this.newTag.id = this.tags.length + 1000;
        let response = await axios.post('/api/tags', {
            id: this.newTag.id,
            title: this.newTag.title,
            color: this.newTag.color,
            entries: this.newTag.entries,
        });
        this.addedTag = response.data;
        this.getTags();
      } catch (error) {
        //console.log(error);
      }

    },
  }
}
</script>

<style scoped>
.page {
  margin: 30px;
}

</style>
