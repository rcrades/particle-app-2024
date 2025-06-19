# AGENTS

This file is for Codex agents and other automated tools interacting with this repository.

For a human-friendly overview of the project, setup instructions, and usage details, see [README.md](README.md).

## Testing

After making any code changes, run the test suite:

```sh
npm test
```

All pull requests must pass these tests.

## Project notes

- The server entry point is `server.js`, which serves `index.html` and the JSON configuration files.
- Default parameters live in `defaults.json`. User preferences are stored in `user_preferences.json`.
- Frontend logic is handled in `script.js`.

