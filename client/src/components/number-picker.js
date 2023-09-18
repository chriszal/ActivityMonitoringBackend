import { useState } from 'react';
import { Button, TextField, Box, SvgIcon } from '@mui/material';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import MinusIcon from '@heroicons/react/24/solid/MinusIcon';

const NumberPicker = () => {
    const [count, setCount] = useState(1);

    const decrement = () => {
        if (count > 1) setCount(prev => prev - 1);
    };

    const increment = () => {
        if (count < 100) setCount(prev => prev + 1);
    };

    return (
        <Box flexDirection="column" display="flex" alignItems="center" justifyContent="center" width="100%">
            <Box display="flex" alignItems="center" mb={2}>
                <Button onClick={decrement}>
                    <SvgIcon><MinusIcon /></SvgIcon>
                </Button>
                <TextField
                    value={count}
                    onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        if (val >= 1 && val <= 100) {
                            setCount(val);
                        }
                    }}
                    style={{ width: '60px' }}
                    inputProps={{ style: { textAlign: 'center' } }} 
                />
                <Button onClick={increment}>
                    <SvgIcon><PlusIcon /></SvgIcon>
                </Button>
            </Box>
            <Box mt={1} display="flex" justifyContent="flex-end" width="100%">
                <Button 
                    variant="text" 
                    onClick={() => {
                        // Handle the cancel action here
                    }}
                >
                    Cancel
                </Button>

                <Button 
                    variant="contained" 
                    color="primary" 
                    style={{ marginLeft: '10px' }}
                    onClick={() => {
                        // Handle the generation of participants here
                    }}
                >
                    Generate
                </Button>
            </Box>
        </Box>
    );
};

export default NumberPicker;
