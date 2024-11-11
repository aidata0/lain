export function saveMessagesLocally(messages) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('wiredProtocolMessages', JSON.stringify(messages));
  }
}

export function loadMessagesLocally() {
  if (typeof window !== 'undefined') {
    const messages = localStorage.getItem('wiredProtocolMessages');
    return messages ? JSON.parse(messages) : [];
  }
  return [];
}
