import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/calculate', (req: Request, res: Response) => {
    const { num1, num2, operator } = req.body;
    let result: number | undefined;

    const parsedNum1 = parseFloat(num1);
    const parsedNum2 = parseFloat(num2);

    switch (operator) {
        case '+':
            result = parsedNum1 + parsedNum2;
            break;
        case '-':
            result = parsedNum1 - parsedNum2;
            break;
        case '*':
            result = parsedNum1 * parsedNum2;
            break;
        case '/':
            if (parsedNum2 === 0) {
                return res.status(400).json({ error: 'Division by zero is not allowed.' });
            }
            result = parsedNum1 / parsedNum2;
            break;
        default:
            return res.status(400).json({ error: 'Invalid operator.' });
    }

    res.json({ result });
});

export default router;