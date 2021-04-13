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
          <button @click="upload">Upload</button>
        </div>
        <div class="upload" v-if="addedItem">
          <p>Your entry has been added! Title: {{addedItem.title}}</p>
        </div>
      </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
  name: 'Create',
  data() {
    return {
      journal: [],
      addedItem: null,
      newEntry: {
        id: 0,
        title: "",
        text: "",
        date: "",
        image: ""
      },
    }
  },
  created() {
    this.getEntries();
  },
  methods: {
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
      try {
        this.newEntry.id = this.journal.length + 1;
        let response = await axios.post('/api/entries', {
            id: this.newEntry.id,
            title: this.newEntry.title,
            text: this.newEntry.text,
            date: this.newEntry.date,
            image: this.newEntry.image
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

</style>
