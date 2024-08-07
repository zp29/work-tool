import { List, Action, ActionPanel, Clipboard, showToast, Toast, Keyboard, Icon } from "@raycast/api";
import { useState, useEffect } from "react";
import { getClipboardHistory, getSnippets } from "./utils";


const ActionView = ({ items }) => {
    const [selectedAction, setSelectedAction] = useState<AvailableActions>("+");
    const [customAction, setCustomAction] = useState<string>("");
    const [isStrings, setIsStrings] = useState<boolean>(false);
  
    return (
      <Form
        actions={
          <ActionPanel>
            <Action
              title="Perform Action"
              icon={Icon.Calculator}
              onAction={async () => {
                let result = undefined;
                const first = isStrings ? items[0].text : Number(items[0].text);
                let rest = [];
  
                try {
                  rest = items.slice(1).map((item) => {
                    if (!isStrings) {
                      const number = Number(item.text);
                      if (isNaN(number)) {
                        throw new Error("Invalid number");
                      }
                      return number;
                    }
                    return item.text;
                  });
                } catch (error) {
                  await showToast({ title: "Error parsing numbers", style: Toast.Style.Failure });
                  return;
                }
  
                try {
                  console.log(first);
                  console.log(rest);
                  result = rest.reduce(actions[selectedAction]?.[0] || eval(`(${customAction})`), first);
  
                  if (actions[selectedAction]?.[1]) {
                    result = actions[selectedAction]?.[1](result, items.length);
                  }
                } catch (error) {
                  await showToast({
                    title: "Error performing action",
                    style: Toast.Style.Failure,
                  });
                  return;
                }
  
                console.log("Result", result);
                Clipboard.copy(result);
                await showToast({ title: "Result Copied to Clipboard", message: String(result) });
              }}
            />
          </ActionPanel>
        }
      >
        <Form.Dropdown
          id="action"
          title="Action"
          value={selectedAction}
          onChange={(value) => {
            setSelectedAction(value);
            if (value !== "custom") setIsStrings(false);
          }}
        >
          <Form.Dropdown.Item value="+" title="Add (+)" />
          <Form.Dropdown.Item value="*" title="Multiply (×)" />
          <Form.Dropdown.Item value="Average" title="Average" />
          <Form.Dropdown.Item value="custom" title="Custom Action" />
        </Form.Dropdown>
        {selectedAction === "custom" && (
          <>
            <Form.TextField
              id="custom-action"
              title="Custom Action (JS)"
              placeholder="Enter a valid JS reducer function (e.g. (a, b) => a + b)"
              value={customAction}
              onChange={(value) => setCustomAction(value)}
            />
            <Form.Checkbox
              id="is-strings"
              label="Are these strings?"
              value={isStrings}
              onChange={(value) => setIsStrings(value)}
            />
          </>
        )}
      </Form>
    );
  };

export default function Command() {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);

            const clipboardHistory = await getClipboardHistory(page);
            const snippets = await getSnippets();

            if (clipboardHistory.length < 25) {
                setHasMore(false);
            }

            setItems((prevItems) => [...prevItems, ...clipboardHistory, ...snippets]);
            setIsLoading(false);
        }

        fetchData();
    }, [page]);

    const handleLoadMore = () => {
        if (hasMore && !isLoading) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    return (
        <List
            isLoading={isLoading}
            searchBarPlaceholder="Search snippets and clipboard history..."
            onScroll={handleLoadMore}
        >
            {items.map((item, index) => (

                <List.Item
                    key={index}
                    title={item.text ?? "Empty: Probably a File"}
                    actions={
                        <ActionPanel>
                            <Action.Push
                                title="Choose Up To This Item"
                                icon={Icon.ArrowUp}
                                target={<ActionView items={items.slice(0, index + 1)} />}
                                />
                            <Action
                                title="Remove from List"
                                shortcut={Keyboard.Shortcut.Common.Remove}
                                style={Action.Style.Destructive}
                                icon={Icon.Trash}
                                onAction={async () => {
                                    setItems((items) => items.filter((_, i) => i !== index));
                                }}
                            />
                        </ActionPanel>
                    }
                />
            ))}
        </List>
    );
}
