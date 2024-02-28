import * as React from 'react';
import {ButtonGroup, Button} from '@mui/material';
import {ethers} from "ethers";

let provider;
let signer;

const signMessage = async () => {
    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();

    console.log("signer", signer);
    console.log("address", signer.address);
    try {
        const result = await signer.signMessage("Signing message with MetaMask");
        console.log(result);
    } catch (error) {
        console.log(error);
    }
};

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
