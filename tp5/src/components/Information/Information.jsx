import React from 'react';
import Typography from '@material-ui/core/Typography';

const Information = ({ titles, details }) => (
    <div className="container-information">
        <div>
            {titles && titles.map(title =>
                <Typography className="information-title" gutterBottom variant="body1">
                    {title}
                </Typography>
            )}
        </div>
        <div>
            {details && details.map(detail =>
                <Typography  className="informationText" gutterBottom variant="body1">
                    {detail}
                </Typography>
            )}
        </div>
    </div>
);
export default Information;