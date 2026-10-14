# Privacy and data handling (MVP)

This front-end prototype does not have a server account, database, or analytics integration. Lesson completion, bookmarks, farm records, discussion drafts and replies, mentoring interests, and support notes are stored in the current browser's `localStorage`.

**This is not suitable for storing sensitive personal or health information or operating a production program.** Data may remain visible to other users of the same device/browser; clearing browser storage can permanently remove it. The app exposes Export my data and Clear saved data actions under Support.

No post, mentorship request, or support note is sent to another person. The public FAO, WHO, and RAB references open third-party websites; those sites may have their own privacy practices. Google Fonts can contact Google's font servers when online, but the UI falls back to system fonts without connectivity.

Before deploying for participants, conduct a privacy and security assessment; add explicit consent, privacy notices, safe data retention, authenticated access and deletion processes, proper safeguarding for vulnerable populations, and safeguards for community content.
