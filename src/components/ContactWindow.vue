<template>
  <BaseWindow
    :active="active"
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: var(--accent-cyan);
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 10px;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid var(--accent-cyan);
  color: var(--text-primary);
  font-family: 'Share Tech Mono', monospace;
  border-radius: 3px;
}

.form-textarea {
  resize: vertical;
}

.submit-btn {
  padding: 12px;
  background: var(--accent-cyan);
  color: var(--bg-primary);
  border: none;
  font-family: 'Orbitron', monospace;
  font-weight: bold;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: 3px;
  transition: all 0.3s ease;
}

.submit-btn:hover:not(:disabled) {
  background: var(--accent-green);
  box-shadow: 0 0 10px var(--accent-cyan);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.contact-info {
  margin-top: 20px;
  padding: 15px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 5px;
  text-align: left;
}

.contact-info h4 {
  color: var(--accent-green);
  margin-bottom: 10px;
}
</style>