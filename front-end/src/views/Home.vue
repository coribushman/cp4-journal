<template>
<div class="wrapper">
  <div class="journal">
    <div class="tag" v-for="tag in tags" :key="tag.id">
      <div v-bind:style="{'background-color':'#' + tag.color}">{{tag.title}}</div>
    </div>

    <div class="entry" v-for="entry in entries" :key="entry.id">

      <div class="normalEntry" v-if="editedEntry.id !== entry.id">
      <div class="image">
        <img :src="entry.image">
      </div>
      <div class="info">
        <h1>Title: {{entry.title}}</h1>
        <p>Text: {{entry.text}}</p>
        <br>
        <p>Date: {{entry.date}}</p>
        <br>
          <p v-if="tagDict[entry.id] != undefined">Tag: {{tagDict[entry.id].title}}</p>
          <p v-else>Tag: </p>

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
        <textarea name="date" rows="1" cols="8" v-model="editedEntry.date" placeholder="date"></textarea>
        <p></p>
        <input v-model="editedEntry.image" placeholder="image url">
        <p></p>
        <select v-model="editedEntry.tagID">
          <option v-for="tag in tags" v-bind:value="tag.id" v-bind:key="tag.id" :selected="tag.id === editedEntry.tagID">
            {{ tag.title }}
          </option>
        </select>
        <button @click="updateEntry()">Update</button>
      </div>

    </div>
  </div>
</div>
</template>

<script>
  import axios from 'axios';
  // import Vue from 'vue';
  export default {
  name: 'Home',
  data() {
    return{
      tags: [],
      entries: [],
      // id: null,
      // title: null,
      // text: null,
      // date: null,
      // image: null,
      editedEntry: {},
      tagDict: {},
    }
  },
  created() {
    // this.getEntries();
    // console.log("getEntries");
    // this.getTags();
    // console.log("getTags");
    this.getData();
  },
  methods: {
    async getData() {
      try {
        let response = await axios.get("/api/tags");
        this.tags = response.data;
        // console.log(this.tags);
        response = await axios.get("/api/entries");
        this.entries = response.data;
        // console.log(this.entries);
        for (let entryIndex in this.entries) {
          let entry = this.entries[entryIndex];
          for (let tagIndex in this.tags) {
            let tag = this.tags[tagIndex]
            if (entry.tagID == tag.id) {
              // Vue.set(entry, "tag", tag);
              // entry = Object.assign({}, entry, {id: tag. title: tag.title})
              console.log("entry:" + entry);
              console.log("entryID:" + entry.id);
              this.tagDict[entry.id] = tag;
            }
          }
          // console.log("1");
          // entry.tag = {title: "title", color: "green", id: 27};
          // console.log(entry);
        }



        return true;
      } catch (error) {
        //console.log(error);
      }
    },
    // async getTags() {
    //   try {
    //     let response = await axios.get("/api/tags");
    //     this.tags = response.data;
    //     return true;
    //   } catch (error) {
    //     //console.log(error);
    //   }
    // },
    // async getEntries() {
    //   try {
    //     let response = await axios.get("/api/entries");
    //     this.entries = response.data;
    //     return true;
    //   } catch (error) {
    //     //console.log(error);
    //   }
    // },
    async deleteEntry(entryToRemove) {
      try {
        await axios.delete("/api/entries/" + entryToRemove.id);
        this.getData();
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
      this.editedEntry.tagID = entry.tagID;
      this.getData();
    },
    async updateEntry() {
      try {
        await axios.put("/api/entries/" + this.editedEntry.id, {
          id: this.editedEntry.id,
          title: this.editedEntry.title,
          text: this.editedEntry.text,
          date: this.editedEntry.date,
          image: this.editedEntry.image,
          tagID: this.editedEntry.tagID,
        });
        this.editedEntry = {};
        this.getData();
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

.tag {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 10px;
  padding: 5px;
  border: 1px solid black;
}
</style>
