import React, { useState } from 'react';
import axios from 'axios';

const Transfer = () => {
    const [transfer, setTransfer] = useState({ from: '', to: '', amount: '' });
    const { from, to, amount } = transfer;

    const onChange = (e) => {
        if ([e.target.name === 'amount']) {
            setTransfer({
                ...transfer,
                [e.target.name]: Number(e.target.value),
            });
        }
        setTransfer({ ...transfer, [e.target.name]: e.target.value });
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const body = transfer;
            const res = await axios.patch(
                'http://localhost:5000/api/users/transfer',
                body,
                config
            );
            console.log(res);
        } catch (e) {
            console.log(e.response);
        }
        setTransfer({ from: '', to: '', amount: '' });
    };
    return (
        <div className="container">
            <h2 className="transfer-header">Transfer Money</h2>
            <form className="transfer-form" onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="From User"
                        name="from"
                        onChange={(e) => onChange(e)}
                        value={from}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="To User"
                        name="to"
                        onChange={(e) => onChange(e)}
                        value={to}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="number"
                        placeholder="Amount"
                        name="amount"
                        onChange={(e) => onChange(e)}
                        value={amount}
                    />
                </div>
                <div className="form-group">
                    <button type="submit">Transfer</button>
                </div>
            </form>
        </div>
    );
};

export default Transfer;
