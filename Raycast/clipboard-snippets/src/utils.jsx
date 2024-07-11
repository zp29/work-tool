import { Clipboard } from "@raycast/api";

const CLIPBOARD_PAGE_SIZE = 25;

export async function getClipboardHistory(page = 0) {
    const history = [];
    for (let i = 0; i < CLIPBOARD_PAGE_SIZE; i++) {
        try {
            let index = i + page * CLIPBOARD_PAGE_SIZE
            const item = await Clipboard.read({ offset: index });
            if (!item.text) break;
            history.push(item);
        } catch (error) {
            break;
        }
    }
    return history;
}

export async function getSnippets() {
    // 示例片段，可以从本地存储或其他源获取实际片段
    const snippets = [
        { content: "Snippet 1", type: "snippet" },
        { content: "Snippet 2", type: "snippet" },
    ];
    return snippets;
}
