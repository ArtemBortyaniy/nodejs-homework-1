const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  const allContacts = await fs.readFile(contactsPath);
  return JSON.parse(allContacts) || [];
}

async function getContactById(contactId) {
  const allContacts = await listContacts();

  const index = allContacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  return allContacts[index];
}

async function removeContact(contactId) {
  const allContacts = await listContacts();

  const index = allContacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    console.log("Контакт не знайдено");
    return null;
  }

  const removeContact = allContacts.splice(index, 1);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return removeContact;
}

async function addContact(data) {
  const allContacts = await listContacts();

  const newContact = {
    id: nanoid(),
    ...data,
  };

  allContacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
