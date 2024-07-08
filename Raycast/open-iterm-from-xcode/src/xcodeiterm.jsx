import { Detail } from '@raycast/api';
import {runAppleScript} from 'run-applescript';


export default function Command() {

    runAppleScript(`
    tell application "Xcode"
        tell front document
        set proPath to path as string
        set defaultDelimiters to AppleScript's text item delimiters
        set AppleScript's text item delimiters to "/"
        set listAfterDelimiter to every text item of proPath
        set listAfterDelimiter to (reverse of rest of reverse of listAfterDelimiter)
        
        set restoredString to listAfterDelimiter as string
        set AppleScript's text item delimiters to defaultDelimiters
        set pathList to (quoted form of POSIX path of (restoredString))
        set command to "clear; cd " & pathList
        end tell
    end tell  

    tell application "System Events"
        -- some versions might identify as "iTerm2" instead of "iTerm"
        set isRunning to (exists (processes where name is "iTerm")) or (exists (processes where name is "iTerm2"))
    end tell

    tell application "iTerm"
        -- activate
        set hasNoWindows to ((count of windows) is 0)

        create window with default profile

        select first window
        activate
        
        tell the first window
        tell current session to write text command
        end tell
    end tell
    `).then(result => {
        console.log(result); // 输出结果
        // return <Detail markdown={`Output: ${result}`} />;
    }).catch(error => {
        console.log('xcodeiterm.jsx error -> ', error)
        // if (error) {
        //     return <Detail markdown={`Error: ${error}`} />;
        // }
    });
}
