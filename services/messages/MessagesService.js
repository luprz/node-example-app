'use stric'

class MessagesService {
  // Return  message in json format
  static call(action, id, name = 'sin nombre') {
    let message = null;
    (id === 0)
      ? message = `Estas en ${action}, señor ${name}`
      : message = `Esta en ${action} ${id}, senor ${name}`
    return messageFormat(message);
  }
}

const messageFormat = (message) => {
  return {
    message: message,
    date: new Date()
  }
}

module.exports = MessagesService;