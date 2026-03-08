<template>
  <button
    class="filter-chip"
    :class="{ active: isActive }"
    @click="$emit('click')"
  >
    <span class="chip-label">{{ label }}</span>
    <span v-if="count !== undefined" class="chip-count">{{ count }}</span>
  </button>
</template>

<script>
export default {
  name: 'FilterChip',
  props: {
    label: {
      type: String,
      required: true
    },
    count: {
      type: Number,
      default: undefined
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click']
};
</script>

<style scoped>
.filter-chip {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: 20px;
  border: 1px solid var(--color-border);
  background: var(--color-bg);
  color: var(--color-text-primary);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-speed) ease;
  white-space: nowrap;
}

.filter-chip:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-subtle);
  border-color: var(--color-accent);
}

.filter-chip.active {
  background: var(--color-accent);
  color: var(--color-bg);
  border-color: var(--color-accent);
}

.chip-label {
  font-family: var(--font-body);
}

.chip-count {
  font-size: 0.85rem;
  opacity: 0.8;
  font-weight: 400;
}

.filter-chip.active .chip-count {
  opacity: 0.9;
}
</style>
