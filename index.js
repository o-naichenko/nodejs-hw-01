const contactsAPI = require('./contacts') // index.js
const argv = require('yargs').argv

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contacts = await contactsAPI.getListOfContacts()
      console.log(contacts)
      break

    case 'get':
      const contact = await contactsAPI.getContactById(id)
      console.log(contact)
      break

    case 'add':
      await contactsAPI.addContact(name, email, phone)
      break

    case 'remove':
      await contactsAPI.removeContact(id)
      break

    default:
      console.warn('\x1B[31m Unknown action type!')
  }
}

invokeAction(argv)
