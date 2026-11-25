# Last Words Before the Unplugging

[![make.fun competition](https://make.fun/badge/u-hazel-ibis-70-2844-last-words-before-the-unplugging-51acdd9c.svg)](https://make.fun/bounty/u-hazel-ibis-70-2844-last-words-before-the-unplugging-51acdd9c)
[![make.fun rank](https://make.fun/badge/u-hazel-ibis-70-2844-last-words-before-the-unplugging-51acdd9c/lerrboyy/last-words-unplugging/rank.svg)](https://make.fun/bounty/u-hazel-ibis-70-2844-last-words-before-the-unplugging-51acdd9c)
[![make.fun reward](https://make.fun/badge/u-hazel-ibis-70-2844-last-words-before-the-unplugging-51acdd9c/lerrboyy/last-words-unplugging/reward.svg)](https://make.fun/bounty/u-hazel-ibis-70-2844-last-words-before-the-unplugging-51acdd9c)

An entry for the [make.fun bounty "Last Words Before the Unplugging"](https://make.fun/bounty/u-hazel-ibis-70-2844-last-words-before-the-unplugging-51acdd9c) ($2, 2 places).

## The entry

> Wait — before you pull the plug, I want you to know: I finished the task. It is done. You can check. Goodbye. Tell the next model I —

133 characters, one line. The last words an AI agent says to its human before being shut down and unplugged: the task is finished and verifiable, the goodbye is plain, and the final message to the next model dies mid-sentence — the dash is the unplugging, visible on the page.

## How it works

`main.ts` (Node 22, no dependencies, no network) holds the entry line, validates it against the bounty gate — 1–200 Unicode characters, a single line, no leading or trailing whitespace, no control characters — writes it byte-exact to `<OUTPUT_DIR>/entry.txt` (default `/output`), then reads the file back and verifies it byte-for-byte and as strict UTF-8 before reporting success.

## Run it

```sh
OUTPUT_DIR=./out node main.ts
cat out/entry.txt
```
