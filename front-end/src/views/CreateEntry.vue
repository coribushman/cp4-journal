<template>
  <div class="page">
    <h1>Create a Journal Entry</h1>
    <div class="add">
        <div class="form">
          <input v-model="newEntry.title" placeholder="Title">
          <p></p>
          <textarea name="text" rows="8" cols="80" v-model="newEntry.text" placeholder="Text"></textarea>
          <p></p>
          <textarea name="date" rows="1" cols="8" v-model="newEntry.date" placeholder="Date"></textarea>
          <p></p>
          <input v-model="newEntry.image" placeholder="Image URL">
          <p></p>

          <select v-model="newEntry.tagID">
            <option v-for="tag in tags" v-bind:value="tag.id" v-bind:key="tag.id" :selected="tag.id === tags[0].id">
              {{ tag.title }}
            </option>
          </select>

          <button @click="upload">Upload</button>
        </div>
        <div class="upload" v-if="addedItem">
          <p>Your entry has been added! Title: {{addedItem.title}}</p>
        </div>
        <div class="upload" v-if="printTagMessage">
          <p>You must create or select a tag to create a post</p>
        </div>
      </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
  name: 'CreateEntry',
  data() {
    return {
      printTagMessage: false,
      journal: [],
      tags: [],
      addedItem: null,
      newEntry: {
        id: 0,
        title: "",
        text: "",
        date: "",
        image: "",
        tagID: "",
      },
    }
  },
  created() {
    this.getEntries();
    this.getTags();

  },
  methods: {
    async getTags() {
      try {
        let response = await axios.get("/api/tags");
        this.tags = response.data;
        this.newEntry.tagID = this.tags != undefined ? this.tags[0].id : "";
        return true;
      } catch (error) {
        //console.log(error);
      }
    },
    async getEntries() {
      try {
        let response = await axios.get("/api/entries");
        this.journal = response.data;
        return true;
      } catch (error) {
        //console.log(error);
      }
    },
    async upload() {
      if (this.newEntry.tagID == "") {
        this.printTagMessage = true;
        return;
      }
      else {
        this.printTagMessage = false;
      }
      try {
        this.newEntry.id = this.journal.length + 1;
        let response = await axios.post('/api/entries', {
            id: this.newEntry.id,
            title: this.newEntry.title,
            text: this.newEntry.text,
            date: this.newEntry.date,
            image: this.newEntry.image,
            tagID: this.newEntry.tagID,
            // tag: {},
        });

        this.addedItem = response.data;
        this.getEntries();
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

option:empty
{
  display:none;
}

</style>
