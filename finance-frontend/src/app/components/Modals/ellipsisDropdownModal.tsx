import { Box, Menu, MenuItem } from "@mui/material";
import React from "react";

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
    const handleEdit = () => {
        if (pot) {
            console.log("Edit Pot:", pot); // Add your edit logic here
        }
        onClose();
    };

    const handleDelete = () => {
        if (pot) {
            console.log("Delete Pot:", pot); // Add your delete logic here
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
        </Box>
    );
};

export default DropDownEllipsis;
