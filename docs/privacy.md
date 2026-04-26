# Vincent ADHD Privacy

## Privacy model

Vincent ADHD is local-first and privacy-first.

Default behavior:

- answers are processed in the browser
- answers stay in browser memory only
- answers are not sent to Vincent servers
- answers are not stored in a database

Optional behavior:

- if the user enables `Save progress on this device`, Vincent stores the current screening state in `localStorage`
- the user can clear saved local data at any time

## Export behavior

Copy, download, and print actions are user-controlled:

- copy writes the local report to the clipboard
- download generates a Markdown file in the browser
- print uses the browser print dialog, including save-as-PDF if available

Vincent does not automatically transmit exported content anywhere.

## Tracking limitations

Assessment pages must not include third-party tracking that captures answers or free text.

Disallowed examples:

- Meta Pixel
- TikTok Pixel
- Google Ads enhanced conversions
- Hotjar
- FullStory
- Microsoft Clarity session replay

## Plain-language privacy copy

Required product copy:

"Your answers are processed in your browser. They are not sent to Vincent servers. If you choose to save progress, answers are stored locally on this device and can be cleared at any time."
