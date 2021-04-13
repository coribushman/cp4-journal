<template>
<div class="wrapper">
  <div class="journal">
    <div class="entry" v-for="entry in journal" :key="entry.id">

      <div class="normalEntry" v-if="editedEntry.id !== entry.id">
      <div class="image">
        <img :src="entry.image">
      </div>
      <div class="info">
        <h1>{{entry.title}}</h1>
        <p>{{entry.text}}</p>
        <br>
        <p>{{entry.date}}</p>
      </div>
      <div class="buttons">
        <button @click="deleteEntry(entry)">Delete</button>
        <button @click="select(entry)">Edit</button>
      </div>
      </div>

      <div class="edit" v-else-if="editedEntry.id == entry.id">
        <input v-model="editedEntry.title" placeholder="title">
        <p></p>
        <textarea name="text" rows="8" cols="80" v-model="editedEntry.text" placeholder="text"></textarea>
        <p></p>
        <textarea name="date" rows="1" cols="8" v-model="editedEntry.text" placeholder="date"></textarea>
        <p></p>
        <input v-model="editedEntry.image" placeholder="image url">
        <p></p>
        <button @click="updateEntry()">Update</button>
      </div>

    </div>
  </div>
</div>
</template>

<script>
  import axios from 'axios';
  export default {
  name: 'Home',
  data() {
    return{
      journal: [],
      id: null,
      title: null,
      text: null,
      date: null,
      image: null,
      editedEntry: {},
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
    async deleteEntry(entryToRemove) {
      try {
        await axios.delete("/api/entries/" + entryToRemove.id);
        this.getEntries();
        return true;
      } catch (error) {
        //console.log(error);
      }
    },
    select(entry) {
      this.editedEntry.id = entry.id;
      this.editedEntry.title = entry.title;
      this.editedEntry.text = entry.text;
      this.editedEntry.date = entry.date;
      this.editedEntry.image = entry.image;
      this.getEntries();
    },
    async updateEntry() {
      try {
        await axios.put("/api/entries/" + this.editedEntry.id, {
          id: this.editedEntry.id,
          title: this.editedEntry.title,
          text: this.editedEntry.text,
          date: this.editedEntry.date,
          image: this.editedEntry.image
        });
        this.editedEntry = {};
        this.getEntries();
        return true;
      } catch (error) {
        //console.log(error);
      }

    },
  }
}
</script>


<style scoped>
* {
  color: #262626
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.journal {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.entry {
  margin: 10px;
  margin-top: 50px;
  width: 600px;
  padding: 30px;
}

.entry img {
  width: 400px;
}

.info {
  margin: 10px;
  justify-content: spacee-between;
}

.info h1 {
  font-size: 25px;
  text-transform: capitalize;
}

.info p {
  margin: 0px;
  font-size: 15px;
}

.buttons {
  display: flex;
  justify-content: space-around;
  align-content: left;
  width: 200px;
}

button {
  height: 50px;
  background: #262626;
  color: white;
  border: none;
  padding: 20px;
}

.auto {
  margin-left: auto;
}

.edit textarea {
  width: 600px;
}
</style>
