<template>
  <div class="tag-search-bar">
    <!-- Tags Display -->
    <div class="tags-container">
      <div
        v-for="(tag, index) in tags"
        :key="index"
        class="search-tag"
      >
        <span class="tag-text">{{ tag }}</span>
        <button
          class="tag-remove"
          @click="removeTag(index)"
          aria-label="Remove tag"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>

      <!-- Input for new tag -->
      <div class="input-wrapper">
        <input
          ref="searchInput"
          v-model="currentInput"
          type="text"
          class="tag-input"
          :placeholder="tags.length === 0 ? placeholder : ''"
          @keydown.enter="addTag"
          @keydown.backspace="handleBackspace"
          @keydown.down.prevent="autocomplete.navigateDown"
          @keydown.up.prevent="autocomplete.navigateUp"
          @keydown.esc="autocomplete.close"
          @focus="autocomplete.open"
          @blur="handleBlur"
        />
      </div>

      <!-- Reset Button -->
      <button
        v-if="tags.length > 0 || currentInput"
        class="reset-search-btn"
        @click="handleReset"
        title="Réinitialiser tous les filtres"
      >
        <i class="fas fa-undo"></i>
      </button>
    </div>

    <!-- Autocomplete Dropdown -->
    <transition name="dropdown">
      <ul v-if="autocomplete.showSuggestions.value" class="suggestions-list">
        <li
          v-for="(suggestion, index) in autocomplete.suggestions.value"
          :key="suggestion"
          class="suggestion-item"
          :class="{ active: index === autocomplete.selectedIndex.value }"
          @mousedown.prevent="selectSuggestion(suggestion)"
        >
          <i class="fas fa-search suggestion-icon"></i>
          <span class="suggestion-text">{{ suggestion }}</span>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue';
import { useAutocomplete } from '../../composables/useAutocomplete';

export default {
  name: 'TagSearchBar',
  props: {
    keywords: {
      type: Array,
      required: true
    },
    placeholder: {
      type: String,
      default: 'Ajouter des mots-clés...'
    },
    modelValue: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:modelValue', 'search', 'reset'],
  setup(props, { emit }) {
    const searchInput = ref(null);

    function normalizeTag(value) {
      if (!value || typeof value !== 'string') return '';
      return value.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    }

    const tags = ref(
      (props.modelValue || [])
        .map(normalizeTag)
        .filter(tag => tag.length > 0)
    );
    const currentInput = ref('');
    
    // Create autocomplete with reactive keywords
    const autocomplete = useAutocomplete(computed(() => props.keywords));

    // Sync autocomplete query with current input
    watch(currentInput, (newValue) => {
      autocomplete.query.value = newValue;
      if (newValue.trim().length >= 2) {
        autocomplete.open();
      } else {
        autocomplete.close();
      }
    });

    // Sync tags with parent
    watch(() => props.modelValue, (newVal) => {
      const normalizedArr = (newVal || []).map(normalizeTag).filter(t => t.length > 0);
      // Only update if actually different to avoid circular updates
      if (JSON.stringify(normalizedArr) !== JSON.stringify(tags.value)) {
        tags.value = normalizedArr;
      }
    }, { deep: true });

    watch(tags, (newTags) => {
      emit('update:modelValue', newTags);
      emit('search', newTags.join(', '));
    }, { deep: true });

    function addTag() {
      const value = normalizeTag(currentInput.value);
      if (value && !tags.value.includes(value)) {
        tags.value.push(value);
        currentInput.value = '';
        autocomplete.query.value = '';
        autocomplete.close();
        searchInput.value?.focus();
      }
    }

    function removeTag(index) {
      tags.value.splice(index, 1);
      searchInput.value?.focus();
    }

    function handleBackspace(event) {
      if (currentInput.value === '' && tags.value.length > 0) {
        event.preventDefault();
        tags.value.pop();
      }
    }

    function selectSuggestion(suggestion) {
      currentInput.value = suggestion;
      addTag();
    }

    function handleReset() {
      tags.value = [];
      currentInput.value = '';
      emit('reset');
      searchInput.value?.focus();
    }

    function handleBlur() {
      setTimeout(() => {
        autocomplete.close();
      }, 200);
    }

    return {
      searchInput,
      tags,
      currentInput,
      autocomplete,
      addTag,
      removeTag,
      handleBackspace,
      selectSuggestion,
      handleReset,
      handleBlur
    };
  }
};
</script>

<style scoped>
.tag-search-bar {
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs);
  border: 2px solid var(--color-border);
  border-radius: 24px;
  background: var(--color-bg);
  min-height: 48px;
  transition: border-color var(--transition-speed) var(--transition-ease-smooth);
}

.tags-container:focus-within {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
}

.dark-theme .tags-container:focus-within {
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.05);
}

.search-tag {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs) var(--spacing-sm);
  background: var(--color-accent);
  color: var(--color-bg);
  border-radius: 16px;
  font-size: 0.9rem;
  font-weight: 500;
  animation: tagAppear 0.2s ease;
}

@keyframes tagAppear {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.tag-text {
  user-select: none;
}

.tag-remove {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  color: var(--color-bg);
  transition: background var(--transition-speed) var(--transition-ease-smooth);
  padding: 0;
}

.tag-remove:hover {
  background: rgba(255, 255, 255, 0.2);
}

.tag-remove i {
  font-size: 0.7rem;
}

.input-wrapper {
  flex: 1;
  min-width: 120px;
}

.tag-input {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-size: 1rem;
  font-family: var(--font-body);
  color: var(--color-text-primary);
  padding: var(--spacing-xs);
}

.reset-search-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  color: var(--color-text-secondary);
  background: transparent;
  transition: all var(--transition-speed) var(--transition-ease-smooth);
  margin-right: var(--spacing-xs);
}

.reset-search-btn:hover {
  background: var(--color-border);
  color: var(--color-accent);
  transform: rotate(-30deg);
}

.tag-input::placeholder {
  color: var(--color-text-secondary);
}

/* Suggestions Dropdown */
.suggestions-list {
  position: absolute;
  top: calc(100% + var(--spacing-xs));
  left: 0;
  right: 0;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  box-shadow: var(--shadow-medium);
  list-style: none;
  padding: var(--spacing-xs) 0;
  margin: 0;
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
}

.suggestion-item {
  padding: var(--spacing-sm) var(--spacing-md);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  cursor: pointer;
  transition: background var(--transition-speed) var(--transition-ease-smooth);
}

.suggestion-item:hover,
.suggestion-item.active {
  background: var(--color-border);
}

.suggestion-icon {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
}

.suggestion-text {
  color: var(--color-text-primary);
  font-size: 0.95rem;
}

/* Dropdown Animation */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity var(--transition-speed) var(--transition-ease-smooth),
              transform var(--transition-speed) var(--transition-ease-smooth);
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
