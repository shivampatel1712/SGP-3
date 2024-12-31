const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;
const ZAP_API_KEY = 'ufpo1on2jubeor8p9ric7hr064';
const ZAP_BASE_URL = 'http://127.0.0.1:8080';

app.use(cors());

app.get('/scan', async (req, res) => {
    const targetUrl = req.query.url;

    if (!targetUrl) {
        return res.status(400).json({ error: 'Please provide a URL to scan.' });
    }

    try {
        // Start spidering
        console.log('Starting spider for:', targetUrl);
        const spiderResponse = await axios.get(`${ZAP_BASE_URL}/JSON/spider/action/scan/`, {
            params: { apikey: ZAP_API_KEY, url: targetUrl, maxDepth: 1 }
        });
        const spiderScanId = spiderResponse.data.scan;
        console.log('Spider scan started with Scan ID:', spiderScanId);

        if (!spiderScanId) {
            throw new Error('Failed to start spider scan.');
        }

        // Poll for spider completion
        let spiderStatus;
        do {
            const statusResponse = await axios.get(`${ZAP_BASE_URL}/JSON/spider/view/status/`, {
                params: { apikey: ZAP_API_KEY, scanId: spiderScanId }
            });
            spiderStatus = statusResponse.data.status;
            console.log(`Spider progress: ${spiderStatus}%`);
            await new Promise(resolve => setTimeout(resolve, 5000));
        } while (spiderStatus < 100);

        // Fetch spider results
        console.log('Spider scan completed.');
        const spiderResultsResponse = await axios.get(`${ZAP_BASE_URL}/JSON/spider/view/results/`, {
            params: { apikey: ZAP_API_KEY, scanId: spiderScanId }
        });
        console.log('Spider results:', spiderResultsResponse.data);

        // Start active scan
        console.log('Starting active scan for:', targetUrl);
        const scanResponse = await axios.get(`${ZAP_BASE_URL}/JSON/ascan/action/scan/`, {
            params: { apikey: ZAP_API_KEY, url: targetUrl, recurse: true }
        });
        const activeScanId = scanResponse.data.scan;
        console.log('Active scan started with Scan ID:', activeScanId);

        if (!activeScanId) {
            throw new Error('Failed to start active scan.');
        }

        // Poll for active scan completion
        let scanStatus;
        do {
            const statusResponse = await axios.get(`${ZAP_BASE_URL}/JSON/ascan/view/status/`, {
                params: { apikey: ZAP_API_KEY, scanId: activeScanId }
            });
            scanStatus = statusResponse.data.status;
            console.log(`Scan progress: ${scanStatus}%`);
            await new Promise(resolve => setTimeout(resolve, 5000));
        } while (scanStatus < 100);

        // Fetch the summary of alerts
        console.log('Active scan completed.');
        const summaryResponse = await axios.get(`${ZAP_BASE_URL}/JSON/alert/view/alertsSummary/`, {
            params: { apikey: ZAP_API_KEY, baseurl: targetUrl }
        });
        console.log('Alerts summary:', summaryResponse.data);

        res.json(summaryResponse.data);

    } catch (error) {
        console.error('Error interacting with ZAP API:', error.message || error);
        res.status(500).json({ error: 'Error interacting with ZAP API.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
