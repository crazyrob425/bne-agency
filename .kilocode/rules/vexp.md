## vexp - Context-Aware AI Coding <!-- vexp v2.2.3 -->

### MANDATORY: call run_pipeline FIRST - do NOT grep, glob, or read to explore
For every task - bug fixes, features, refactors, questions about the code:
**call `run_pipeline` before any other tool**. It runs context search + impact
analysis + memory recall in a single call and returns compressed, graph-ranked
results.

This holds even when you already know the file path. The pipeline returns the
callers, the blast radius and the co-changed files that opening the file cannot.
No tool here will stop you from searching manually, so honouring this rule is on
you: "I already knew where to look" is not an exception, it is the exact case the
rule exists for.

Do NOT use grep, glob, built-in codebase search, or shell commands to explore.
Do NOT open files one by one to find your way around: use `get_skeleton`
(detail: minimal/standard/detailed, 70-90% fewer tokens than reading the file).
Read raw file content only when you need it to edit a specific line.

vexp indexes source inside the workspace and nothing else. Runtime logs, build
output (dist/, .vite/, node_modules/) and files outside the repo are NOT indexed -
read those directly, this rule does not cover them.

### Primary tool
- `run_pipeline` - **USE THIS FOR EVERYTHING**. Auto-detects intent
  (debug/modify/refactor/explore) from your task. Includes file content for pivots.
  - `run_pipeline({ "task": "fix JWT expiry in AuthService.validateToken" })`
  - `run_pipeline({ "task": "refactor db layer", "preset": "refactor" })`
  - `run_pipeline({ "task": "add auth", "observation": "using JWT" })` - saves an insight in the same call

### Other MCP tools (only when run_pipeline is not enough)
- `get_skeleton` - **preferred over reading a file**: signatures and structure, 3 detail levels
- `index_status` - indexing status and health check
- `expand_vexp_ref` - expand V-REF hash placeholders in v2 compact output

### Query shape (do this)
- Anchor the task on real identifiers (ClassName, functionName) or file paths:
  `run_pipeline({ "task": "fix JWT expiry in AuthService.validateToken" })`
- A pure natural-language question ("why does login fail?") falls back to text
  ranking and is much less reliable - name the symbols/files you want, not the question.

### Workflow
1. `run_pipeline("your task")` - ALWAYS FIRST. Returns pivots + impact + memories in 1 call
2. Need more on a file? `get_skeleton({ files: [...], detail: "detailed" })` - not a raw read
3. Make targeted changes based on the context returned
4. `run_pipeline` again ONLY if you need more context while implementing
5. Do NOT chain vexp calls - one `run_pipeline` replaces capsule + impact + memory + observation

### Sub-agents and background tasks
- Sub-agents CAN and MUST call `run_pipeline` - always give them the task description
- Do NOT spawn an agent to search freely: call `run_pipeline` first, then pass the
  returned context into the agent prompt

### Fallback
If `run_pipeline` returns `status: "degraded"` or 0 pivots with an INDEX EMPTY warning,
the index is empty or still building. Use the built-in search and read tools directly
until it is ready - do not stall waiting for vexp.

### Smart features (automatic - no action needed)
Intent detection, hybrid keyword+semantic+graph ranking, session memory,
change coupling, auto-expanding budget.

### Multi-repo
`run_pipeline` auto-queries all indexed repos. Use `repos: ["alias"]` to scope. Run `index_status` to see aliases.
<!-- /vexp -->