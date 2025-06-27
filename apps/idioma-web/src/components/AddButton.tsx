import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

interface AddButtonProps {
    onClick?: () => void;
    label?: string;         // Default to "Add"
    disabled?: boolean;
    color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
    variant?: 'text' | 'outlined' | 'contained';
    sx?: object;
}

export default function AddButton({
                                      onClick,
                                      label = 'Add',
                                      disabled = false,
                                      color = 'primary',
                                      variant = 'contained',
                                      sx = {},
                                  }: AddButtonProps) {
    return (
        <Button
            onClick={onClick}
            startIcon={<AddIcon />}
            color={color}
            variant={variant}
            disabled={disabled}
            sx={{
                textTransform: 'none',
                fontWeight: 'bold',
                borderRadius: 2,
                px: 3,
                py: 1.5,
                boxShadow: variant === 'contained' ? '0 3px 5px 2px rgba(33, 150, 243, .3)' : undefined,
                ...sx,
            }}
        >
            {label}
        </Button>
    );
}
