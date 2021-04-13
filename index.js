const contactsAPI = require('./contacts') // index.js
const argv = require('yargs').argv

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      contactsAPI.listContacts()
      break

    case 'get':
      contactsAPI.getContactById(id)
      break

    case 'add':
      contactsAPI.addContact(name, email, phone)
      break

    case 'remove':
      contactsAPI.removeContact(id)
      break

    default:
      console.warn('\x1B[31m Unknown action type!')
  }
}

invokeAction(argv)
