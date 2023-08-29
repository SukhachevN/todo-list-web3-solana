import type { NextApiRequest, NextApiResponse } from 'next';

const generateAction = async (req: NextApiRequest, res: NextApiResponse) => {
    const input = JSON.parse(req.body).input;

    const response = await fetch(
        `https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1`,
        {
            headers: {
                'Content-Type': 'application/json',
                'x-use-cache': 'false',
            },
            method: 'POST',
            body: JSON.stringify({
                inputs: input,
            }),
        }
    );

    if (response.ok) {
        const buffer = await response.arrayBuffer();
        const base64 = bufferToBase64(buffer);
        res.status(200).json({ image: base64 });
    } else if (response.status === 503) {
        const json = await response.json();
        res.status(503).json(json);
    } else {
        await response.json();
        res.status(response.status).json({ error: response.statusText });
    }
};

const bufferToBase64 = (buffer: ArrayBuffer) => {
    let arr = new Uint8Array(buffer);
    const base64 = Buffer.from(arr).toString('base64');
    return `data:image/png;base64,${base64}`;
};

export default generateAction;
