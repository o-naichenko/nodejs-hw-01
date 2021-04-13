const fs = require('fs').promises
const path = require('path')

// contacts.js

const contactsPath = path.join(__dirname, './db/contacts.json')

// TODO: задокументировать каждую функцию
async function listContacts() {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath))
    console.table(contacts)
  } catch (error) {
    throw error
  }
}

async function getContactById(contactId) {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath))
    console.table(contacts.filter(({ id }) => id === contactId))
  } catch (error) {
    throw error
  }
}

async function removeContact(contactId) {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath))
    const remainingContacts = contacts.filter(({ id }) => id !== contactId)
    await fs.writeFile(contactsPath, JSON.stringify(remainingContacts))
    listContacts()
  } catch (error) {
    throw error
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath))
    const newContactId = contacts[contacts.length - 1]?.id + 1 || 0
    const newContact = {
      name,
      email,
      phone,
      id: newContactId,
    }
    const newContactsArray = [...contacts, newContact]
    fs.writeFile(contactsPath, JSON.stringify(newContactsArray))
    listContacts()
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
