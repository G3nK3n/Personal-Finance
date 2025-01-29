import { Box, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";

import ConfirmDelete from "./confirmDelete";
import EditsPotsModal from "./editPotsModal";

interface Pots {
    pots_id: number;
    category_id: number;
    target: number;
    total_amount: number;
    color: string;
    category_name: string;
    color_name: string;
}

interface DropDownEllipsisProps {
    anchorEl: null | HTMLElement;
    open: boolean;
    onClose: () => void;
    pot: Pots | null;
}


const DropDownEllipsis: React.FC<DropDownEllipsisProps> = ({ anchorEl, open, onClose, pot }) => {

    const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false)
    const [showEditPot, setShowEditPot] = useState<boolean>(false)

    const handleEdit = () => {
        if (pot) {
            setShowEditPot(!showEditPot)
        }
        onClose();
    };

    const handleDelete = () => {
        if (pot) {
            setShowConfirmDelete(!showConfirmDelete)
        }
        onClose();
    };

    return (
        <Box>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={onClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>

            {showConfirmDelete && (
                <ConfirmDelete setConfirm={setShowConfirmDelete} thePot={pot}/>
            )}

            {showEditPot && (
                <EditsPotsModal setEditPot={setShowEditPot} thePot={pot}/>
            )}


        </Box>
    );
};

export default DropDownEllipsis;
