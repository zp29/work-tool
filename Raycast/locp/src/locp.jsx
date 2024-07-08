import { List, Action, ActionPanel, showToast, Toast } from '@raycast/api';
import { useEffect, useState } from 'react';
import { networkInterfaces } from 'os';

export default function Command() {
    const [urls, setUrls] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            const nets = networkInterfaces();
            const results = new Set();

            for (const name of Object.keys(nets)) {
                for (const net of nets[name]) {
                    if (net.family === 'IPv4' && !net.internal) {
                        results.add(net.address);
                    }
                }
            }

            const localIps = Array.from(results);
            const urlList = [
                "http://localhost:8080",
                "http://127.0.0.1:8080",
                ...localIps.map(ip => `http://${ip}:8080`)
            ];

            setUrls(urlList);
        } catch (error) {
            showToast(Toast.Style.Failure, "Error", error.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <List isLoading={isLoading}>
            {urls.map((url, index) => (
                <List.Item
                    key={index}
                    title={url}
                    actions={
                        <ActionPanel>
                            <Action.CopyToClipboard title="Copy URL" content={url} />
                            <Action.OpenInBrowser title="Open URL" url={url} />
                        </ActionPanel>
                    }
                />
            ))}
        </List>
    );
}
