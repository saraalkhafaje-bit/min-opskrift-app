<script setup>
import { ref } from 'vue'

const props = defineProps({
  item: { type: Object, required: true }
})

const emit = defineEmits(['remove', 'update-note'])

const isEditing = ref(false)
const showInstructions = ref(false)
const noteInput = ref(props.item.note)

function saveNote() {
  emit('update-note', props.item.id, noteInput.value)
  isEditing.value = false
}

function deleteNote() {
  noteInput.value = ''
  emit('update-note', props.item.id, '')
}
</script>

<template>
  <div class="favorite-item">
    <img :src="item.image" :alt="item.title" />
    
    <div class="content">
      <h3>{{ item.title }}</h3>
      
      <!-- Buttons for instructions and notes -->
      <div class="action-row">
        <button class="recipe-btn" @click="showInstructions = !showInstructions">
          {{ showInstructions ? 'Hide instructions' : 'View instructions' }}
        </button>
      </div>

      <!-- Instructions view (v-show: element stays in DOM, toggled via CSS display) -->
      <div v-show="showInstructions" class="instructions-box">
        <p>{{ item.instructions }}</p>
      </div>

      <!-- Note section (CRUD) -->
      <div class="note-section">
        <template v-if="isEditing">
          <div class="edit-box">
            <input type="text" v-model="noteInput" placeholder="Write a note..." />
            <button class="save-btn" @click="saveNote">Save</button>
          </div>
        </template>
        <template v-else>
          <p v-if="item.note" class="note-text"><strong>Note:</strong> {{ item.note }}</p>
          <p v-else class="no-note">No note yet.</p>
          
          <div class="note-buttons">
            <button class="edit-btn" @click="isEditing = true">
              {{ item.note ? 'Edit note' : 'Add note' }}
            </button>
            <button v-if="item.note" class="clear-note-btn" @click="deleteNote">Delete note</button>
          </div>
        </template>
      </div>
    </div>

    <button class="remove-btn" @click="emit('remove', item.id)">Remove</button>
  </div>
</template>

<style scoped>
.favorite-item { 
  display: flex; 
  align-items: flex-start; 
  gap: 15px; 
  background: #f8fafc; 
  border: 1px solid #e2e8f0; 
  padding: 14px; 
  border-radius: 8px; 
  margin-bottom: 12px; 
}
img { width: 70px; height: 70px; object-fit: cover; border-radius: 6px; }
.content { flex: 1; }
h3 { margin: 0 0 6px 0; font-size: 1.05rem; color: #1e293b; }

button { border: none; padding: 5px 10px; border-radius: 4px; font-size: 0.8rem; cursor: pointer; font-weight: 500; }

.action-row { margin-bottom: 8px; }
.recipe-btn { background-color: #e0e7ff; color: #3730a3; }
.recipe-btn:hover { background-color: #c7d2fe; }

.instructions-box {
  margin-bottom: 10px;
  background: white;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  font-size: 0.85rem;
  color: #334155;
  line-height: 1.4;
  white-space: pre-line;
}

.note-section { border-top: 1px solid #e2e8f0; padding-top: 8px; margin-top: 6px; }
.note-text { margin: 0 0 5px 0; font-size: 0.9rem; color: #475569; }
.no-note { color: #94a3b8; font-style: italic; font-size: 0.85rem; margin: 0 0 5px 0; }

.edit-box { display: flex; gap: 6px; }
.edit-box input { flex: 1; padding: 4px 8px; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 0.85rem; }

.note-buttons { display: flex; gap: 6px; }
.edit-btn { background-color: #e2e8f0; color: #334155; }
.save-btn { background-color: #3b82f6; color: white; }
.clear-note-btn { background-color: #f59e0b; color: white; }
.remove-btn { background-color: #ef4444; color: white; }
</style>