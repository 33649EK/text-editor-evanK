import { openDB } from 'idb';

const v = 1;

const initdb = async () =>
  openDB('jate', v, {
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
  const connectDb = await openDB('jate', v);
  const tx = connectDb.transaction('jate', 'readwrite');
  const objStore = tx.objectStore('jate');
  const req = objStore.put({ id: 1, content: content });
  const result = await req;
  console.log(`Result: ${result}`);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const connectDb = await openDB('jate', v);
  const tx = connectDb.transaction('jate', 'readonly');
  const objStore = tx.objectStore('jate');
  const req = objStore.getAll();
  const result = await req;
  console.log(`Result: ${result}`);
};

initdb();
