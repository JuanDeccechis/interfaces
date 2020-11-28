import React from 'react';
import { List as ListMaterial } from '@material-ui/core';
import ListItem from './ListItem';
import Typography from '@material-ui/core/Typography';


export default function List({ data, title, type, classname }) {
  return (
    <div className={classname}>
      {title && 
      <Typography component="h2" variant="h3" className="section-title">
        {title}
      </Typography>
      }
      <ListMaterial
        component="ul"
        className="list"
      >
        {data.map(listCompleteItem =>
          <ListItem
            data={listCompleteItem}
            listType={type}
          />
        )}
      </ListMaterial>
    </div>
  );
}