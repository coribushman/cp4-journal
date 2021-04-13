<template>
<div class="wrapper">
  <div class="journal">
    <div class="entry" v-for="entry in journal" :key="entry.id">

      <div class="normalEntry" v-if="!selectedEntry">
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
        <button @click="selectEntry(entry)">Edit</button>
      </div>
      </div>

      <div class="edit" v-else-if="selectedEntry.id === entry.id">
        <input v-model="selectedEntry.title" placeholder="New Title">
        <p></p>
        <textarea name="newText" rows="8" cols="80" v-model="selectedEntry.text" placeholder="New Text"></textarea>
        <p></p>
        <textarea name="newDate" rows="1" cols="8" v-model="selectedEntry.date" placeholder="New Date"></textarea>
        <p></p>
        <input v-model="selectedEntry.image" placeholder="New Image URL">
        <p></p>
        <button @click="updateEntry()">Update</button>
      </div>

    </div>
  </div>
</div>
</template>

<script>
  export default {
  name: 'JournalEntries',
  /* props: {
    journal: Array
  }, */
  data() {
    return{
      selectedEntry: null,
    }
  },
  computed: {
    journal() {
      return this.$root.$data.journal;
    }
  },
  methods: {
    deleteEntry(entryToRemove) {
      this.$root.$data.journal = this.$root.$data.journal.filter(entry =>
        entry !== entryToRemove);
      /* this.remove(this.$root.$data.journal, entry); */
      /* journal(); */
    },
    selectEntry(entry) {
      this.selectedEntry = entry;
    },
    updateEntry() {
      // this.$root.$data.journal.push(entry);
      this.selectedEntry = null;
    },
    remove(arr, value) {
      return arr.filter(function(ele){
          return ele != value;
      });
    }
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
