import React from 'react';
import S from '@sanity/desk-tool/structure-builder';

// build a custom sidebar
export default function Sidebar() {
  return S.list()
    .title(`Slick's Slices`)
    .items([
      // creat a new subitem
      S.listItem()
        .title('Home Page')
        .icon(() => <strong>🏠</strong>)
        .child(
          S.editor()
            .schemaType('storeSettings')
            // make a new document ID so we don't have a random strin of numbers
            .documentId('southPhilly')
        ),
      // add the rest of the items
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'storeSettings'
      ),
    ]);
}
