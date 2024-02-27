import * as React from 'react';
import {ButtonGroup, Button} from '@mui/material';
export default function ContributeForm() {
    return (
        <div>
            <ButtonGroup variant="contained" aria-label="Basic button group">
                <Button value={1}>$1 USDc</Button>
                <Button value={10}>$10 USDc</Button>
                <Button value={25}>$25 USDc</Button>
                <Button value={50}>$50 USDc</Button>
                <Button value={100}>$100 USDc</Button>
            </ButtonGroup>
        </div>
    );
}