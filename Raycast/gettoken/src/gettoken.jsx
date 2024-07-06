import { Detail, List, Action, ActionPanel } from '@raycast/api';
import fetch from 'node-fetch';
import { useState, useEffect } from 'react';
import { environments, encryptedPass, encryptedFetchRUL, encryptedTels, encryptedBbrName, encryptedAuthorization, encryptedConfigVerifyUrl } from './config';

// 解密函数
const decodeBase64 = (encoded) => Buffer.from(encoded, 'base64').toString('utf-8');

// 解密配置项
const pass = Object.fromEntries(Object.entries(encryptedPass).map(([key, value]) => [key, decodeBase64(value)]));
const fetchRUL = Object.fromEntries(Object.entries(encryptedFetchRUL).map(([key, value]) => [key, decodeBase64(value)]));
const tels = Object.fromEntries(Object.entries(encryptedTels).map(([key, value]) => [key, decodeBase64(value)]));
const Authorization = decodeBase64(encryptedAuthorization);
const ConfigVerifyUrl = decodeBase64(encryptedConfigVerifyUrl);
const bbrName = decodeBase64(encryptedBbrName);


export default function Command(props) {
    let arg = props?.arguments ?? {}
    let tel = arg.tel ?? ''
    if (!tel) return <Detail markdown="请输入电话号码" />
    const number = tels[tel] ?? tel

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let verifyUrl = ConfigVerifyUrl.replace('{{}}', number);
        const fetchUrls = environments.map(env => `${fetchRUL[env]}${verifyUrl}&code=${pass[env]}`);
        const Promises = fetchUrls.map(url => fetch(url, {
            method: 'POST',
            headers: {
                "Accept": "application/json, text/plain, */*",
                'Content-Type': 'application/json',
                "Authorization": `Basic ${Authorization}`
            },
            body: ""
        }).then(response => response.json()));
        Promise.all(Promises).then(responses => {
            // console.log('gettoken.jsx responses -> ', responses)
            const allData = responses.map(response => response.data);
            setData(allData);
            setIsLoading(false);
        }).catch((err) => {
            console.log('gettoken.jsx err -> ', err)
            setIsLoading(false);
        })
    }, []);

    return (<List isLoading={isLoading}>
        {data.map((envData, index) => {
            let info = envData ?? {};
            let access_token = info?.access_token ?? '';
            let envKey = environments[index];
            let number = tels[tel];

            if (!access_token) return <Detail markdown="没有token" key={envKey} />;

            const list = [
                {
                    title: `MPC-${envKey}`,
                    url: `${fetchRUL[envKey]}${bbrName}-mpc/index.html#/home?token=${access_token}&${number}`
                },
                {
                    title: `Tower-${envKey}`,
                    url: `${fetchRUL[envKey]}${bbrName}-tower/index.html#/home/index?token=${access_token}&${number}`
                },
                {
                    title: `Davis-${envKey}`,
                    url: `${fetchRUL[envKey]}${bbrName}-davis/index.html#/home?token=${access_token}&${number}`
                },
                {
                    title: `Dealer-${envKey}`,
                    url: `${fetchRUL[envKey]}${bbrName}-dealer/index.html#/home/index?token=${access_token}&${number}`
                }
            ]
            return (
                <List.Section title={`Environment: ${envKey}`} key={envKey}>
                    {list.map((item) => {
                        let title = item.title;
                        let url = item.url;
                        let urls = url.split('#');
                        let LocalUrl = 'http://localhost:8080/#' + urls[1];

                        return (
                            <List.Item
                                key={title}
                                title={title}
                                subtitle={url}
                                actions={
                                    <ActionPanel>
                                        <Action.OpenInBrowser title="Open in Browser" url={url} />
                                        <Action.OpenInBrowser title="Open in Local Server" url={LocalUrl} />
                                    </ActionPanel>
                                }
                            />
                        );
                    })}
                </List.Section>
            );
        })}
    </List>);
}

