import { Magic } from '@magic-sdk/admin';

const Lightrail = require('lightrail-client');
import * as uuid from 'uuid';

Lightrail.configure({
  apiKey: 'eyJ2ZXIiOjMsInZhdiI6MSwiYWxnIjoiSFMyNTYiLCJ0eXAiOiJKV1QifQ.eyJnIjp7Imd1aSI6InVzZXItYjhkNjUzMTlkZjY0NGRlOTk0YjlhNTIwZjE1YTFmZGUtVEVTVCIsImdtaSI6InVzZXItYjhkNjUzMTlkZjY0NGRlOTk0YjlhNTIwZjE1YTFmZGUtVEVTVCIsInRtaSI6InVzZXItYjhkNjUzMTlkZjY0NGRlOTk0YjlhNTIwZjE1YTFmZGUtVEVTVCJ9LCJhdWQiOiJBUElfS0VZIiwiaXNzIjoiU0VSVklDRVNfVjEiLCJpYXQiOjE1OTAwMTk4MjYuMDIxLCJqdGkiOiJiYWRnZS1iZjNjMTJiOTQyZTI0ZmQ2OTg2MTMyMTlhZWY2ZjAxMCIsInBhcmVudEp0aSI6ImJhZGdlLTJhZjk1YTFhOWMyOTQ4Y2ZiMWQ4NmFmYjY3YTBkMjYwIiwic2NvcGVzIjpbXSwicm9sZXMiOlsiYWNjb3VudE1hbmFnZXIiLCJjb250YWN0TWFuYWdlciIsImN1c3RvbWVyU2VydmljZU1hbmFnZXIiLCJjdXN0b21lclNlcnZpY2VSZXByZXNlbnRhdGl2ZSIsInBvaW50T2ZTYWxlIiwicHJvZ3JhbU1hbmFnZXIiLCJwcm9tb3RlciIsInJlcG9ydGVyIiwic2VjdXJpdHlNYW5hZ2VyIiwidGVhbUFkbWluIiwid2ViUG9ydGFsIl19.nQSNzEufo3i6r4cXjJjoIDnLf3MM1g7gSJyyH-gP3ZU'
})

export default async function members(event) {
  //  START MAGIC AUTH
  const magic = new Magic('sk_test_C9795F33831A21B8');
  const magicToken = event.headers.authorization.substring(7);

  // Authorize the request
  const metadata = await magic.users.getMetadataByToken(magicToken);
  console.log('members.js', metadata);
  //  END MAGIC AUTH
  // START LIGHTRAIL
  // Create 
  try {
    const contact = await Lightrail.contacts.listContacts({
      email: {
        eq: metadata.email,
      },
    });
    console.log('try contact', contact)
  } catch {
    const newContact = {
      id: uuid.v4().substring(0, 24),
      email: metadata.email,
    };
    const contact = await Lightrail.contacts.createContact(newContact);
    console.log('catch contact', contact)
  } finally {
    contactId = contact.id || 'exampleID123'
    console.log('finally contactId ', contactId)
  }

  const contactValuesList = await Lightrail.contacts.listContactsValues(contact)
  return {
    statusCode: 200,
    body: JSON.stringify({ contactId: contactId, email: metadata.email }),
  };
}
