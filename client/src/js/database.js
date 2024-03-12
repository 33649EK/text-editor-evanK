import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const connectDb = await openDB('jate', 1);
  const tx = connectDb.transaction('jate', 'readwrite');
  const objStore = tx.objectStore('jate');
  const req = objStore.add({ content: content });
  const result = await req;
  console.log(`Result: ${result}`);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const connectDb = await openDB('jate', 1);
  const tx = connectDb.transaction('jate', 'readonly');
  const objStore = tx.objectStore('jate');
  const req = objStore.getAll();
  const result = await req;
  console.log('getResult:', result);
  return result;
};

initdb();
