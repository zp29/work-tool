import { Detail, List, Action, ActionPanel, showToast, Toast } from '@raycast/api';
import fetch from 'node-fetch';
import { useState, useEffect } from 'react';
import { environments, encryptedPass, encryptedFetchRUL, encryptedTels, encryptedAuthorization, encryptedConfigVerifyUrl } from './config';
process.env.HTTP_PROXY = '';
process.env.HTTPS_PROXY = '';
process.env.http_proxy = '';
process.env.https_proxy = '';

// 解密函数
const decodeBase64 = (encoded) => Buffer.from(encoded, 'base64').toString('utf-8');

// 解密配置项
const pass = Object.fromEntries(Object.entries(encryptedPass).map(([key, value]) => [key, decodeBase64(value)]));
const fetchRUL = Object.fromEntries(Object.entries(encryptedFetchRUL).map(([key, value]) => [key, decodeBase64(value)]));
const tels = Object.fromEntries(Object.entries(encryptedTels).map(([key, value]) => [key, decodeBase64(value)]));
const Authorization = decodeBase64(encryptedAuthorization);
const ConfigVerifyUrl = decodeBase64(encryptedConfigVerifyUrl);
// const bbrName = decodeBase64(encryptedBbrName);


export default function Command(props) {
    console.log('gettoken.jsx props -> ', props)
    let arg = props?.arguments ?? {}
    let tel = arg.tel ?? ''
    let propsEnv = arg.env ?? ''
    let FilterEnvironments = propsEnv ? environments.filter(env => env == propsEnv) : environments;
    const number = tels[tel] ?? tel
    console.log('gettoken.jsx props -> ', props)
    console.log('gettoken.jsx number -> ', number)
    console.log('gettoken.jsx propsEnv -> ', propsEnv)
    if (!number) return <Detail markdown="请输入电话号码" />

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let verifyUrl = ConfigVerifyUrl.replace('{{}}', number);
        const fetchUrls = FilterEnvironments.map(env => `${fetchRUL[env]}${verifyUrl}&code=${pass[env]}`);
        const Promises = fetchUrls.map(url => fetch(url, {
            method: 'POST',
            timeout: 5000, // 增加超时时间为5秒
            headers: {
                "Accept": "application/json, text/plain, */*",
                'Content-Type': 'application/json',
                "Authorization": `Basic ${Authorization}`,
                'Cookie': 'JSESSIONID=jELvocG9iq9P7MKDFr-ynugK1xpswCcqNWTGsVkL; rememberMe=""; rememberUserCode=""'
            },
            body:''
        }).then((response) => response.json()));
        Promise.all(Promises).then(responses => {
            console.log('gettoken.jsx responses -> ', responses)
            let allData = responses.map(response => response?.data);
            let messages = responses.map(response => response?.message); 
            let message = messages.join('\n')
            allData = allData.filter(Boolean);
            if (allData.length == 0) {
                showToast({ title: "No Data", message , style: Toast.Style.Failure });
                return
            }
            showToast({ title: "Success", message , style: Toast.Style.Success });
            setData(allData);
            setIsLoading(false);
        }).catch((err) => {
            showToast({ title: "Fetch Error", message: err.code , style: Toast.Style.Failure });
            setIsLoading(false);
        })
    }, []);

    return (<List isLoading={isLoading}>
        {data.map((envData, index) => {
            let info = envData ?? {};
            // console.log('getNumber.jsx info -> ', info)
            let nickname = info?.user_info?.nickname ?? '';
            let access_token = info?.access_token ?? '';
            let envKey = FilterEnvironments[index];
            let number = tels[tel];

            if (!access_token) return <Detail markdown="没有token" key={envKey} />;

            const list = [
                {
                    value: `${number}`,
                    title: `${nickname}-Number`
                },
                {
                    value: `${access_token}`,
                    title: `${nickname}-Token`
                },
            ]
            return (
                <List.Section title={`Environment: ${envKey}`} key={envKey}>
                    {list.map((item) => {
                        let title = item.title;
                        let value = item.value;

                        return (
                            <List.Item
                                key={title}
                                title={title}
                                subtitle={value}
                                actions={
                                    <ActionPanel>
                                        <Action.CopyToClipboard title="Copy to Clipboard" content={value} />
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

