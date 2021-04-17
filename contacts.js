const fs = require('fs').promises
const path = require('path')

// contacts.js

const contactsPath = path.join(__dirname, './db/contacts.json')

async function listContacts() {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath))
    return contacts
  } catch (error) {
    throw error
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts()
    const contact = contacts.find(({ id }) => id === contactId)
    if (contact) {
      return contact
    } else {
      console.error(`No contact with ID: ${contactId} found`)
    }
  } catch (error) {
    throw error
  }
}

async function removeContact(contactId) {
  try {
    if (await getContactById(contactId)) {
      const contacts = await listContacts()
      const remainingContacts = contacts.filter(({ id }) => id !== contactId)
      await fs.writeFile(contactsPath, JSON.stringify(remainingContacts))
      console.log(remainingContacts)
    }
    return
  } catch (error) {
    throw error
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts()
    const newContactId = contacts[contacts.length - 1]?.id + 1 || 0
    const newContact = {
      name,
      email,
      phone,
      id: newContactId,
    }
    const newContactsArray = [...contacts, newContact]
    fs.writeFile(contactsPath, JSON.stringify(newContactsArray))
    console.log(newContactsArray)
  } catch (error) {
    throw error
  }
}
module.exports = {
  addContact,
  getContactById,
  listContacts,
  removeContact,
}
