import React from 'react';
import { ListItem as ListItemMaterial, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Accordion from '@material-ui/core/Accordion';
import ListItemDetail from "./ListItemDetail";

export default function ListItem({ data, listType }) {

    const getFirstIcon = () => {
        switch (listType) {
            case "playlist":
                return <PlayArrowIcon />
            case "edit":
                return <DragIndicatorIcon />
            default:
                break;
        }
    }


    return (
        <Accordion className={`list-item ${listType}`}>
            <ListItemMaterial button>
                <AccordionSummary
                    expandIcon={<MoreHorizIcon />}
                    aria-controls="list-content"
                    id="list-header"
                >
                    <ListItemIcon>
                        {getFirstIcon()}
                    </ListItemIcon>
                    <ListItemText primary={data.title} />
                </AccordionSummary>
            </ListItemMaterial>
            <AccordionDetails className="accordion-details">
                <ListItemDetail listType={listType} />
            </AccordionDetails>
        </Accordion>
    );
}