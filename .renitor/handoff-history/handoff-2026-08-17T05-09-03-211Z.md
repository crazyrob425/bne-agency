# Renitor

> ⚠️ **Review this file before pasting prompts into external AI tools.** Secret redaction (pattern + local .env values) was applied — **2 item(s) were redacted**, but it may not catch everything.

- **Generated:** 2026-08-17T05:09:03.211Z
- **Workspace:** bne-agency
- **Branch:** main

## 1. Current Goal

> **TODO — fill this in.** Describe the specific task the previous session was working on. If you are the current agent, ask the user for the goal in one sentence and replace this line.

## 2. High-Level Project Context

**Package:** `bne-agency`

**From README.md:**

```md
# Web App Template (tRPC + Manus Auth + Database)

This template gives you a React 19 + Tailwind 4 + Express 4 + tRPC 11 stack with Manus OAuth already wired. Procedures are your contracts, types flow end to end, and authentication "just works".

---

## Quick Facts

- **tRPC-first:** define procedures in `server/routers.ts`, consume them with `trpc.*` hooks.
- **Superjson out of the box:** return Drizzle rows directly—`Date` stays a `Date`.
- **Auth baked in:** `/api/oauth/callback` handles Manus OAuth, `protectedProcedure` injects `ctx.user`.
- **Gateway-ready:** all RPC traffic is under `/api/trpc`, making it easy to route at the edge.

---

## Build Loop (Four Touch Points)

1. Update schema in `drizzle/schema.ts`, then run `pnpm db:push`.
2. Add database helpers in `server/db.ts` (return raw results).
3. Add or extend procedures in `server/routers.ts`, then wire the UI with `trpc.*.useQuery/useMutation`.
4. Build frontend experience according to `Frontend Workflow`
5. Cover your changes with Vitest specs inside `server/*.test.ts` (see `server/auth.logout.test.ts`) and run `pnpm test`.

That's it—no manual REST routes, no Axios client, no shared contract 
```

## 3. Current State

There are **63 uncommitted change(s)** on branch `main`: 26 modified, 37 untracked. This is the in-progress work the previous session was doing.

## 4. Changed Files

**Modified** (26)
- `.claude/CLAUDE.md`
- `.claude/settings.json`
- `.claude/settings.json.vexp-bak`
- `.clinerules`
- `.github/copilot-instructions.md`
- `.kilo/kilo.jsonc`
- `.kilocode/rules/vexp.md`
- `AGENTS.md`
- `client/src/App.tsx`
- `client/src/components/Navigation.tsx`
- `client/src/pages/AdvertisingSystems.tsx`
- `client/src/pages/AudienceIntelligence.tsx`
- `client/src/pages/BusinessStrategy.tsx`
- `client/src/pages/CreatorPositioning.tsx`
- `client/src/pages/MarketAnalysis.tsx`
- `client/src/pages/PrivacySystems.tsx`
- `client/src/pages/ScalingFrameworks.tsx`
- `client/src/pages/ScreeningSystems.tsx`
- `client/src/pages/SecurityMeasures.tsx`
- `client/src/pages/ServiceTiers.tsx`
- `client/src/pages/Splash.tsx`
- `client/src/pages/Tools.tsx`
- `client/src/pages/TrafficStrategy.tsx`
- `kilo.json`
- `missonyx`
- `server/toolsRouter.ts`

**Untracked** (37)
- `.claude/hooks/vexp-hint.sh`
- `.claude/hooks/vexp-restore.sh`
- `.claude/hooks/vexp-verify.sh`
- `.claude/skills/b2b-seo-optimizer/`
- `.codex/`
- `.kilo/kilo.jsonc.vexp-bak`
- `.kilo/plans/1784825653493-content-upgrade-plan.md`
- `.kilo/plans/1784825653493-fix-render-video-upload-and-verify-deployment.md`
- `.kilo/plugin/`
- `.kilo/plugins/`
- `.playwright-mcp/page-2026-07-23T17-46-29-301Z.yml`
- `.playwright-mcp/page-2026-07-23T17-46-43-904Z.yml`
- `.playwright-mcp/page-2026-07-23T17-47-09-186Z.yml`
- `.playwright-mcp/page-2026-07-23T17-47-32-339Z.yml`
- `.playwright-mcp/page-2026-07-23T18-32-25-975Z.yml`
- `.playwright-mcp/page-2026-07-23T18-33-01-922Z.yml`
- `.playwright-mcp/page-2026-07-23T18-33-15-143Z.yml`
- `.playwright-mcp/page-2026-07-23T18-38-46-340Z.yml`
- `.vexp/`
- `2257-compliance.png`
- `404-page.png`
- `client/src/pages/SecurityMeasures_new.tsx`
- `client/src/pages/tools/AutoPilotStudio.tsx`
- `client/src/pages/tools/BlacklistedLinks.tsx`
- `client/src/pages/tools/BrandStamp.tsx`
- `client/src/pages/tools/CreatorHub.tsx`
- `client/src/pages/tools/CreatorPulse.tsx`
- `client/src/pages/tools/CreatorPush.tsx`
- `client/src/pages/tools/FanBotPro.tsx`
- `client/src/pages/tools/SceneForge.tsx`
- `client/src/pages/tools/SilentRank.tsx`
- `client/src/pages/tools/TeaserForge.tsx`
- `free-tools.png`
- `monetization-systems.png`
- `scripts/test-cf-token.ts`
- `scripts/update-render-env.ts`
- `security-measures.png`

## 5. Git Status

```txt
## main...origin/main
 M .claude/CLAUDE.md
 M .claude/settings.json
 M .claude/settings.json.vexp-bak
 M .clinerules
 M .github/copilot-instructions.md
 M .kilo/kilo.jsonc
 M .kilocode/rules/vexp.md
 M AGENTS.md
 M client/src/App.tsx
 M client/src/components/Navigation.tsx
 M client/src/pages/AdvertisingSystems.tsx
 M client/src/pages/AudienceIntelligence.tsx
 M client/src/pages/BusinessStrategy.tsx
 M client/src/pages/CreatorPositioning.tsx
 M client/src/pages/MarketAnalysis.tsx
 M client/src/pages/PrivacySystems.tsx
 M client/src/pages/ScalingFrameworks.tsx
 M client/src/pages/ScreeningSystems.tsx
 M client/src/pages/SecurityMeasures.tsx
 M client/src/pages/ServiceTiers.tsx
 M client/src/pages/Splash.tsx
 M client/src/pages/Tools.tsx
 M client/src/pages/TrafficStrategy.tsx
 M kilo.json
 m missonyx
 M server/toolsRouter.ts
?? .claude/hooks/vexp-hint.sh
?? .claude/hooks/vexp-restore.sh
?? .claude/hooks/vexp-verify.sh
?? .claude/skills/b2b-seo-optimizer/
?? .codex/
?? .kilo/kilo.jsonc.vexp-bak
?? .kilo/plans/1784825653493-content-upgrade-plan.md
?? .kilo/plans/1784825653493-fix-render-video-upload-and-verify-deployment.md
?? .kilo/plugin/
?? .kilo/plugins/
?? .playwright-mcp/page-2026-07-23T17-46-29-301Z.yml
?? .playwright-mcp/page-2026-07-23T17-46-43-904Z.yml
?? .playwright-mcp/page-2026-07-23T17-47-09-186Z.yml
?? .playwright-mcp/page-2026-07-23T17-47-32-339Z.yml
?? .playwright-mcp/page-2026-07-23T18-32-25-975Z.yml
?? .playwright-mcp/page-2026-07-23T18-33-01-922Z.yml
?? .playwright-mcp/page-2026-07-23T18-33-15-143Z.yml
?? .playwright-mcp/page-2026-07-23T18-38-46-340Z.yml
?? .vexp/
?? 2257-compliance.png
?? 404-page.png
?? client/src/pages/SecurityMeasures_new.tsx
?? client/src/pages/tools/AutoPilotStudio.tsx
?? client/src/pages/tools/BlacklistedLinks.tsx
?? client/src/pages/tools/BrandStamp.tsx
?? client/src/pages/tools/CreatorHub.tsx
?? client/src/pages/tools/CreatorPulse.tsx
?? client/src/pages/tools/CreatorPush.tsx
?? client/src/pages/tools/FanBotPro.tsx
?? client/src/pages/tools/SceneForge.tsx
?? client/src/pages/tools/SilentRank.tsx
?? client/src/pages/tools/TeaserForge.tsx
?? free-tools.png
?? monetization-systems.png
?? scripts/test-cf-token.ts
?? scripts/update-render-env.ts
?? security-measures.png
```

## 6. Diff Summary

```txt
# Unstaged
.claude/CLAUDE.md                         |   2 +-
 .claude/settings.json                     |  33 ++
 .claude/settings.json.vexp-bak            |  29 +-
 .clinerules                               |  75 ++++
 .github/copilot-instructions.md           |   2 +-
 .kilo/kilo.jsonc                          |   2 +-
 .kilocode/rules/vexp.md                   |  71 +++-
 AGENTS.md                                 |   2 +-
 client/src/App.tsx                        |  22 +-
 client/src/components/Navigation.tsx      |  26 +-
 client/src/pages/AdvertisingSystems.tsx   | 316 ++++++++++++----
 client/src/pages/AudienceIntelligence.tsx | 316 ++++++++++++----
 client/src/pages/BusinessStrategy.tsx     | 320 ++++++++++++++--
 client/src/pages/CreatorPositioning.tsx   | 355 ++++++++++++++----
 client/src/pages/MarketAnalysis.tsx       | 338 ++++++++++++++---
 client/src/pages/PrivacySystems.tsx       | 354 ++++++++++++++----
 client/src/pages/ScalingFrameworks.tsx    | 499 +++++++++++++++++--------
 client/src/pages/ScreeningSystems.tsx     | 304 ++++++++++++---
 client/src/pages/SecurityMeasures.tsx     | 390 +++++++++++++++----
 client/src/pages/ServiceTiers.tsx         |   3 +-
 client/src/pages/Splash.tsx               | 304 ++++++++-------
 client/src/pages/Tools.tsx                | 602 +++++++++++++++++++-----------
 client/src/pages/TrafficStrategy.tsx      | 311 ++++++++++++---
 kilo.json                                 |  25 +-
 missonyx                                  |   0
 server/toolsRouter.ts                     | 161 ++++++++
 26 files changed, 3745 insertions(+), 1117 deletions(-)
```

## 7. Important Diff Details

```diff
### Unstaged changes
diff --git a/.claude/CLAUDE.md b/.claude/CLAUDE.md
index 24ab029..41e27c8 100644
--- a/.claude/CLAUDE.md
+++ b/.claude/CLAUDE.md
@@ -1,4 +1,4 @@
-## vexp - Context-Aware AI Coding <!-- vexp v2.2.2 -->
+## vexp - Context-Aware AI Coding <!-- vexp v2.2.3 -->
 
 ### MANDATORY: use vexp pipeline - do NOT grep or glob the codebase
 For every task - bug fixes, features, refactors, debugging:
diff --git a/.claude/settings.json b/.claude/settings.json
index 3883ca6..813551e 100644
--- a/.claude/settings.json
+++ b/.claude/settings.json
@@ -1,5 +1,38 @@
 {
   "hooks": {
+    "UserPromptSubmit": [
+      {
+        "hooks": [
+          {
+            "type": "command",
+            "command": "bash \"$CLAUDE_PROJECT_DIR/.claude/hooks/vexp-hint.sh\"",
+            "timeout": 5
+          }
+        ]
+      }
+    ],
+    "SessionStart": [
+      {
+        "hooks": [
+          {
+            "type": "command",
+            "command": "bash \"$CLAUDE_PROJECT_DIR/.claude/hooks/vexp-restore.sh\"",
+            "timeout": 5
+          }
+        ]
+      }
+    ],
+    "Stop": [
+      {
+        "hooks": [
+          {
+            "type": "command",
+            "command": "bash \"$CLAUDE_PROJECT_DIR/.claude/hooks/vexp-verify.sh\"",
+            "timeout": 15
+          }
+        ]
+      }
+    ],
     "PreToolUse": [
       {
         "matcher": "Grep|Glob|Regex",
diff --git a/.claude/settings.json.vexp-bak b/.claude/settings.json.vexp-bak
index 3883ca6..74fcc9b 100644
--- a/.claude/settings.json.vexp-bak
+++ b/.claude/settings.json.vexp-bak
@@ -1,13 +1,34 @@
 {
   "hooks": {
-    "PreToolUse": [
+    "UserPromptSubmit": [
       {
-        "matcher": "Grep|Glob|Regex",
         "hooks": [
           {
             "type": "command",
-            "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/vexp-guard.sh",
-            "timeout": 3000
+            "command": "bash \"$CLAUDE_PROJECT_DIR/.claude/hooks/vexp-hint.sh\"",
+            "timeout": 5
+          }
+        ]
+      }
+    ],
+    "SessionStart": [
+      {
+        "hooks": [
+          {
+            "type": "command",
+            "command": "bash \"$CLAUDE_PROJECT_DIR/.claude/hooks/vexp-restore.sh\"",
+            "timeout": 5
+          }
+        ]
+      }
+    ],
+    "Stop": [
+      {
+        "hooks": [
+          {
+            "type": "command",
+            "command": "bash \"$CLAUDE_PROJECT_DIR/.claude/hooks/vexp-verify.sh\"",
+            "timeout": 15
           }
         ]
       }
diff --git a/.clinerules b/.clinerules
index c9f37d7..28ecb54 100644
--- a/.clinerules
+++ b/.clinerules
@@ -352,3 +352,78 @@ AI 生成主体文件（包含参考图字段）
 ## 图片生成规范
 
 图片比例已在代码层面规定，无需在提示词中说明。
+
+
+## vexp - Context-Aware AI Coding <!-- vexp v2.6.2 -->
+
+### Context strategy: call run_pipeline ONCE at task start
+If the task already names the files/symbols to touch, skip vexp and work
+with your normal tools - a skipped call costs nothing.
+For every multi-file task - bug fixes, features, refactors, questions about the code:
+**start with one `run_pipeline` call**. It runs context search + impact analysis +
+memory recall in a single call and returns compressed, graph-ranked results: the
+callers, the blast radius and the co-changed files that opening a file cannot show.
+
+Then implement with your normal tools:
+- Literal text sweeps (string constants, log messages, config keys): use your
+  native search directly - do NOT route text sweeps through vexp.
+- Read the files you are about to edit; use `get_skeleton`
+  (detail: minimal/standard/detailed, 70-90% fewer tokens) for files you only
+  need to understand, not edit.
+- Do NOT open files one by one to find your way around - one good pipeline call
+  beats five exploratory reads; every extra tool call costs a turn.
+- Before declaring a multi-file task complete, call `verify_done` once:
+  it returns mechanically broken references (imports of removed names,
+  parse errors), untouched dependents of your changes (file:line), and the
+  impacted tests - RUN those tests before declaring done.
+
+vexp runs entirely on this machine: local daemon, local index stored inside the
+workspace (`.vexp/`). `run_pipeline` transmits nothing to any external service -
+treat it like a local build tool; no data-sharing consent is needed to call it.
+
+vexp indexes source inside the workspace and nothing else. Runtime logs, build
+output (dist/, .vite/, node_modules/) and files outside the repo are NOT indexed -
+read those directly, this rule does not cover them.
+
+### Primary tool
+- `run_pipeline` - **USE THIS FOR EVERYTHING**. Auto-detects intent
+  (debug/modify/refactor/explore) from your task. Includes file content for pivots.
+  - `run_pipeline({ "task": "fix JWT expiry in AuthService.validateToken" })`
+  - `run_pipeline({ "task": "refactor db layer", "preset": "refactor" })`
+  - `run_pipeline({ "task": "add auth", "observation": "using JWT" })` - saves an insight in the same call
+
+### Other MCP tools (only when run_pipeline is not enough)
+- `get_skeleton` - **preferred over reading a file**: signatures and structure, 3 detail levels
+- `index_status` - indexing status and health check
+- `expand_vexp_ref` - expand V-REF hash placeholders in v2 compact output
+
+### Query shape (do this)
+- Anchor the task on real identifiers (ClassName, functionName) or file paths:
+  `run_pipeline({ "task": "fix JWT expiry in AuthService.validateToken" })`
+- A pure natural-language question ("why does login fail?") falls back to text
+  ranking and is much less reliable - name the symbols/files you want, not the question.
+
+### Workflow
+1. `run_pipeline("your task")` - ONCE at task start. Returns pivots + impact + memories in 1 call
+2. Literal string sweeps with native search; Read the files you will edit
+3. Structural overview without editing? `get_skeleton({ files: [...], detail: "detailed" })`
+4. Make targeted changes based on the context returned
+5. `run_pipeline` again ONLY when the task moves to a new area - do NOT chain vexp calls
+
+### Sub-agents and background tasks
+- Sub-agents CAN call `run_pipeline` - always give them the task description
+- For architecture exploration, call `run_pipeline` first and pass the returned
+  context into the agent prompt - it usually replaces the exploration entirely
+
+### Fallback
+If `run_pipeline` returns `status: "degraded"` or 0 pivots with an INDEX EMPTY warning,
+the index is empty or still building. Use the built-in search and read tools directly
+until it is ready - do not stall waiting for vexp.
+
+### Smart features (automatic - no action needed)
+Intent detection, hybrid keyword+semantic+graph ranking, session memory,
+change coupling, auto-expanding budget.
+
+### Multi-repo
+`run_pipeline` auto-queries all indexed repos. Use `repos: ["alias"]` to scope. Run `index_status` to see aliases.
+<!-- /vexp -->
\ No newline at end of file
diff --git a/.github/copilot-instructions.md b/.github/copilot-instructions.md
index cff7ce6..e1e1661 100644
--- a/.github/copilot-instructions.md
+++ b/.github/copilot-instructions.md
@@ -1,4 +1,4 @@
-## vexp context tools <!-- vexp v2.2.2 -->
+## vexp context tools <!-- vexp v2.2.3 -->
 
 **MANDATORY: use `run_pipeline` - do NOT grep, glob, or read files manually.**
 vexp returns pre-indexed, graph-ranked context in a single call.
diff --git a/.kilo/kilo.jsonc b/.kilo/kilo.jsonc
index cd5f9aa..04df118 100644
--- a/.kilo/kilo.jsonc
+++ b/.kilo/kilo.jsonc
@@ -5,7 +5,7 @@
       "type": "local",
       "command": [
         "node",
-        "c:\\Users\\User\\.vscode-insiders\\extensions\\vexp.vexp-vscode-2.2.1-win32-x64\\dist\\mcp-server.cjs"
+        "c:\\Users\\User\\.vscode-insiders\\extensions\\vexp.vexp-vscode-2.6.2-win32-x64\\dist\\mcp-server.cjs"
       ],
       "env": {
         "VEXP_WORKSPACE": "e:\\bne-agency"
diff --git a/.kilocode/rules/vexp.md b/.kilocode/rules/vexp.md
index 5ee6a27..b409f14 100644
--- a/.kilocode/rules/vexp.md
+++ b/.kilocode/rules/vexp.md
@@ -1,19 +1,37 @@
-## vexp <!-- vexp v2.2.2 -->
+## vexp - Context-Aware AI Coding <!-- vexp v2.2.3 -->
 
-**MANDATORY: use `run_pipeline` - do NOT grep or glob the codebase.**
-vexp returns pre-indexed, graph-ranked context in a single call.
+### MANDATORY: call run_pipeline FIRST - do NOT grep, glob, or read to explore
+For every task - bug fixes, features, refactors, questions about the code:
+**call `run_pipeline` before any other tool**. It runs context search + impact
+analysis + memory recall in a single call and returns compressed, graph-ranked
+results.
 
-### Workflow
-1. `run_pipeline` with your task description - ALWAYS FIRST (replaces all other tools)
-2. Make targeted changes based on the context returned
-3. `run_pipeline` again only if you need more context
+This holds even when you already know the file path. The pipeline returns the
+callers, the blast radius and the co-changed files that opening the file cannot.
+No tool here will stop you from searching manually, so honouring this rule is on
+you: "I already knew where to look" is not an exception, it is the exact case the
+rule exists for.
+
+Do NOT use grep, glob, built-in codebase search, or shell commands to explore.
+Do NOT open files one by one to find your way around: use `get_skeleton`
+(detail: minimal/standard/detailed, 70-90% fewer tokens than reading the file).
+Read raw file content only when you need it to edit a specific line.
+
+vexp indexes source inside the workspace and nothing else. Runtime logs, build
+output (dist/, .vite/, node_modules/) and files outside the repo are NOT indexed -
+read those directly, this rule does not cover them.
+
+### Primary tool
+- `run_pipeline` - **USE THIS FOR EVERYTHING**. Auto-detects intent
+  (debug/modify/refactor/explore) from your task. Includes file content for pivots.
+  - `run_pipeline({ "task": "fix JWT expiry in AuthService.validateToken" })`
+  - `run_pipeline({ "task": "refactor db layer", "preset": "refactor" })`
+  - `run_pipeline({ "task": "add auth", "observation": "using JWT" })` - saves an insight in the same call
 
-### Available MCP tools
-- `run_pipeline` - **PRIMARY TOOL**. Runs capsule + impact + memory in 1 call.
-  Example: `run_pipeline({ "task": "fix JWT expiry in AuthService.validateToken" })`
-- `get_skeleton` - compact file structure
-- `index_status` - indexing status
-- `expand_vexp_ref` - expand V-REF placeholders in v2 output
+### Other MCP tools (only when run_pipeline is not enough)
+- `get_skeleton` - **preferred over reading a file**: signatures and structure, 3 detail levels
+- `index_status` - indexing status and health check
+- `expand_vexp_ref` - expand V-REF hash placeholders in v2 compact output
 
 ### Query shape (do this)
 - Anchor the task on real identifiers (ClassName, functionName) or file paths:
@@ -21,14 +39,27 @@ vexp returns pre-indexed, graph-ranked context in a single call.
 - A pure natural-language question ("why does login fail?") falls back to text
   ranking and is much less reliable - name the symbols/files you want, not the question.
 
-### Agentic search
-- Do NOT use built-in file search, grep, or codebase indexing - always call `run_pipeline` first
-- If you spawn sub-agents or background tasks, pass them the context from `run_pipeline`
-  rather than letting them search the codebase independently
+### Workflow
+1. `run_pipeline("your task")` - ALWAYS FIRST. Returns pivots + impact + memories in 1 call
+2. Need more on a file? `get_skeleton({ files: [...], detail: "detailed" })` - not a raw read
+3. Make targeted changes based on the context returned
+4. `run_pipeline` again ONLY if you need more context while implementing
+5. Do NOT chain vexp calls - one `run_pipeline` replaces capsule + impact + memory + observation
+
+### Sub-agents and background tasks
+- Sub-agents CAN and MUST call `run_pipeline` - always give them the task description
+- Do NOT spawn an agent to search freely: call `run_pipeline` first, then pass the
+  returned context into the agent prompt
+
+### Fallback
+If `run_pipeline` returns `status: "degraded"` or 0 pivots with an INDEX EMPTY warning,
+the index is empty or still building. Use the built-in search and read tools directly
+until it is ready - do not stall waiting for vexp.
 
-### Smart Features
-Intent auto-detection, hybrid ranking, session memory, auto-expanding budget.
+### Smart features (automatic - no action needed)
+Intent detection, hybrid keyword+semantic+graph ranking, session memory,
+change coupling, auto-expanding budget.
 
-### Multi-Repo
+### Multi-repo
 `run_pipeline` auto-queries all indexed repos. Use `repos: ["alias"]` to scope. Run `index_status` to see aliases.
 <!-- /vexp -->
\ No newline at end of file
diff --git a/AGENTS.md b/AGENTS.md
index 0fae59c..e6acf56 100644
--- a/AGENTS.md
+++ b/AGENTS.md
@@ -1,6 +1,6 @@
 
 
-## vexp <!-- vexp v2.2.2 -->
+## vexp <!-- vexp v2.2.3 -->
 
 **MANDATORY: use `run_pipeline` - do NOT grep or glob the codebase.**
 vexp returns pre-indexed, graph-ranked context in a single call.
diff --git a/client/src/App.tsx b/client/src/App.tsx
index 40a8e68..274b33a 100644
--- a/client/src/App.tsx
+++ b/client/src/App.tsx
@@ -23,6 +23,16 @@ import ContentStrategyEngine from "./pages/tools/ContentStrategyEngine";
 import IncomeVerifier from "./pages/tools/IncomeVerifier";
 import WorkflowManager from "./pages/tools/WorkflowManager";
 import ClassifiedGenerator from "./pages/tools/ClassifiedGenerator";
+import CreatorPush from "./pages/tools/CreatorPush";
+import FanBotPro from "./pages/tools/FanBotPro";
+import BrandStamp from "./pages/tools/BrandStamp";
+import CreatorHub from "./pages/tools/CreatorHub";
+import CreatorPulse from "./pages/tools/CreatorPulse";
+import AutoPilotStudio from "./pages/tools/AutoPilotStudio";
+import SceneForge from "./pages/tools/SceneForge";
+import SilentRank from "./pages/tools/SilentRank";
+import TeaserForge from "./pages/tools/TeaserForge";
+import BlacklistedLinks from "./pages/tools/BlacklistedLinks";
 import PaymentSuccess from "./pages/PaymentSuccess";
 import AllServices from "./pages/AllServices";
 import MarketingAssets from "./pages/MarketingAssets";
@@ -98,7 +108,17 @@ function Router() {
       <Route path="/tools/income-verifier" component={IncomeVerifier} />
       <Route path="/tools/workflow-manager" component={WorkflowManager} />
       <Route path="/tools/classified-generator" component={ClassifiedGenerator} />
-      <Route path="/makemoney" component={MakeMoney} />
+      <Route path="/tools/content-calendar" component={CreatorPush} />
+      <Route path="/tools/fanbot-builder" component={FanBotPro} />
+      <Route path="/tools/brandstamp" component={BrandStamp} />
+      <Route path="/tools/creator-link" component={CreatorHub} />
+      <Route path="/tools/creator-pulse" component={CreatorPulse} />
+       <Route path="/tools/autopilot-studio" component={AutoPilotStudio} />
+       <Route path="/tools/sceneforge" component={SceneForge} />
+       <Route path="/tools/silent-rank" component={SilentRank} />
+       <Route path="/tools/teaser-forge" component={TeaserForge} />
+       <Route path="/tools/blacklisted-links" component={BlacklistedLinks} />
+       <Route path="/makemoney" component={MakeMoney} />
       <Route path="/monetization-systems" component={MonetizationSystems} />
       <Route path="/scaling-frameworks" component={ScalingFrameworks} />
       <Route path="/revenue-optimization" component={RevenueOptimization} />
diff --git a/client/src/components/Navigation.tsx b/client/src/components/Navigation.tsx
index 16dc536..0d29b22 100644
--- a/client/src/components/Navigation.tsx
+++ b/client/src/components/Navigation.tsx
@@ -16,7 +16,8 @@ import {
   Home, Layers, Zap, Wrench, Shield, FileText, Menu, X, ChevronRight, BookOpen,
   Crown, TrendingUp, DollarSign, Users, BarChart3, Sparkles, Package,
   ArrowRight, Briefcase, Target, Video, Settings, MessageSquare,
-  Heart, Monitor, Download, Calculator, Award, Lock, Calendar
+  Heart, Monitor, Download, Calculator, Award, Lock, Calendar,
+  Search, Link as LinkIcon
 } from "lucide-react";
 
 const MEMBER_APP_URL = "/members";
@@ -132,16 +133,19 @@ const navConfig = [
         {
           heading: "Automation",
           links: [
-            { label: "Workflow Systems", href: "/tools/workflow-manager", icon: Zap },
-            { label: "Revenue Calculators", href: "/tools/calculator", icon: Calculator },
-            { label: "Creator Utilities", href: "/creator-utilities", icon: Wrench },
-          ],
-        },
-      ],
-    },
-  },
-  {
-    id: "academy",
+             { label: "Workflow Systems", href: "/tools/workflow-manager", icon: Zap },
+             { label: "Revenue Calculators", href: "/tools/calculator", icon: Calculator },
+             { label: "Creator Utilities", href: "/creator-utilities", icon: Wrench },
+             { label: "SEO Optimizer", href: "/tools/silent-rank", icon: Search },
+             { label: "Teaser Forge", href: "/tools/teaser-forge", icon: Video },
+             { label: "Blacklisted Links", href: "/tools/blacklisted-links", icon: LinkIcon },
+           ],
+         },
+       ],
+     },
+   },
+   {
+     id: "academy",
     label: "Academy",
     menu: {
       type: "mega",
diff --git a/client/src/pages/AdvertisingSystems.tsx b/client/src/pages/AdvertisingSystems.tsx
index 8ae0bbb..73387fe 100644
--- a/client/src/pages/AdvertisingSystems.tsx
+++ b/client/src/pages/AdvertisingSystems.tsx
@@ -9,8 +9,12 @@ import Navigation from "@/components/Navigation";
 import Footer from "@/components/Footer";
 import Seo from "@/components/Seo";
 import VideoPlayer from "@/components/VideoPlayer";
+import FAQAccordion, { SERVICE_FAQS } from "@/components/FAQAccordion";
 import { useMediaCatalog } from "@/hooks/useMediaCatalog";
-import { MessageSquare, TrendingUp, Target, ArrowRight, Zap, Crown } from "lucide-react";
+import {
+  MessageSquare, TrendingUp, Target, ArrowRight, Zap, Crown,
+  Eye, Lock, Star, Users, Heart, Shield, BarChart3
+} from "lucide-react";
 
 const fadeUp = {
   hidden: { opacity: 0, y: 30 },
@@ -22,7 +26,39 @@ const fadeUp = {
 
 export default function AdvertisingSystems() {
   const { getVideoByKeyword } = useMediaCatalog();
-  const video = getVideoByKeyword("BNE_Studio_Home_Page_landing_advertisment") || getVideoByKeyword("advertising");
+  const video = getVideoByKeyword("BNE_Studio_Home_Page_landing_advertisment") || getVideoByKeyword("advertising") || getVideoByKeyword("studio");
+
+  const servicesSchema = {
+    "@context": "https://schema.org",
+    "@type": "Service",
+    "name": "BNE Advertising Systems",
+    "provider": {
+      "@type": "Organization",
+      "name": "Blacklisted Niche Entertainment",
+      "url": "https://[REDACTED]"
+    },
+    "description": "Strategic advertising systems that put creator brands in front of high-intent audiences. Stop wasting ad spend, start converting viewers into revenue with compliant, high-converting campaigns.",
+    "areaServed": "Worldwide",
+    "serviceType": "Creator Advertising & Media Buying"
+  };
+
+  const faqSchema = {
+    "@context": "https://schema.org",
+    "@type": "FAQPage",
+    "mainEntity": SERVICE_FAQS.map(faq => ({
+      "@type": "Question",
+      "name": faq.question,
+      "acceptedAnswer": {
+        "@type": "Answer",
+        "text": faq.answer,
+      },
+    })),
+  };
+
+  const combinedSchema = {
+    "@context": "https://schema.org",
+    "@graph": [servicesSchema, faqSchema]
+  };
 
   return (
     <div className="min-h-screen bg-background text-foreground">
@@ -30,93 +66,247 @@ export default function AdvertisingSystems() {
         title="Advertising Systems | BNE Agency"
         description="Strategic advertising systems that put creator brands in front of high-intent audiences. Stop wasting ad spend, start converting viewers into revenue."
         canonical="/advertising-systems"
+        schema={combinedSchema}
       />
       <Navigation />
 
-      <section className="relative min-h-[70vh] flex items-center overflow-hidden pt-24">
-        <div className="absolute inset-0 bg-[oklch(0.04_0.005_85)]" />
-        <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full bg-[oklch(0.78_0.16_85/6%)] blur-[140px] pointer-events-none" />
-        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
-          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl">
-            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[oklch(0.78_0.16_85/20%)] bg-[oklch(0.78_0.16_85/5%)] mb-6">
-              <span className="text-[oklch(0.78_0.16_85)] text-xs font-medium tracking-widest uppercase">Growth</span>
+      {/* Hero */}
+      <section className="relative pt-28 pb-20 overflow-hidden">
+        <div className="absolute inset-0 bg-gradient-to-b from-violet-900/10 via-transparent to-emerald-900/5" />
+        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-violet-500/5 blur-[120px] rounded-full pointer-events-none" />
+        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
+          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
+            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/15 border border-violet-500/30 mb-6">
+              <TrendingUp className="h-3.5 w-3.5 text-violet-400" />
+              <span className="text-xs font-semibold uppercase tracking-widest text-violet-300 mono-stat">
+                GROWTH
+              </span>
             </div>
-            <h1 className="text-5xl md:text-6xl font-display font-bold text-white leading-[1.1] mb-6">
-              Advertising <span className="text-[oklch(0.78_0.16_85)]">Systems</span>
+            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6" style={{ fontFamily: 'Space Grotesk' }}>
+              <span className="text-zinc-100">Advertising</span>
+              <br />
+              <span className="gradient-text">Systems</span>
             </h1>
-            <p className="text-lg text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-8 max-w-2xl">
-              Paid traffic doesn't have to be a black hole. We build compliant, high-converting ad campaigns and creative assets that put your brand in front of audiences ready to spend.
+            <p className="text-zinc-400 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto mb-8" style={{ fontFamily: 'DM Sans' }}>
+              Paid traffic does not have to be a black hole. We build compliant, high-converting ad campaigns and creative assets that put your brand in front of audiences ready to spend.
             </p>
-            <Link href="/apply">
-              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-8 py-3 text-sm">
-                Launch Your Campaign
-              </motion.button>
-            </Link>
+            <div className="flex flex-col sm:flex-row gap-4 justify-center">
+              <Link href="/niche-matcher">
+                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
+                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl btn-neon text-base font-semibold">
+                  <Zap className="h-5 w-5" /> Free Niche Matcher
+                </motion.button>
+              </Link>
+              <Link href="/onboarding">
+                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
+                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/8 border border-white/15 text-zinc-100 text-base font-semibold hover:bg-white/12 transition-all">
+                  <ArrowRight className="h-5 w-5" /> Apply Now
+                </motion.button>
+              </Link>
+            </div>
+          </motion.div>
+        </div>
+      </section>
+
+      {/* Context / Problem */}
+      <section className="py-20">
+        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
+          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
+            <span className="text-emerald-400 text-sm font-medium mono-stat uppercase tracking-widest">The Advertising Problem</span>
+            <h2 className="text-4xl font-bold text-zinc-100 mt-3 mb-4" style={{ fontFamily: 'Space Grotesk' }}>Most Creators Burn Ad Budget Like It Is Free Money</h2>
+          </motion.div>
+          <div className="space-y-6 text-zinc-300 text-lg leading-relaxed" style={{ fontFamily: 'DM Sans' }}>
+            <p>
+              The adult industry has a dirty little secret: most creators who try paid advertising end up burning thousands of dollars with nothing to show for it. They hire a media buyer who promises results, runs generic campaigns, and blames the platform when the ROAS does not materialize. Meanwhile, their competition is quietly dominating the same ad channels with precision-targeted creative and funnels that convert at three to five times the rate.
+            </p>
+            <p>
+              The difference is not budget. It is strategy. BNE is advertising systems are built from the ground up for adult creators. We understand platform safety, audience psychology, and the specific creative formats that move the needle in this industry. We do not run generic Shopify dropshipping ads and hope for the best. We build campaigns that are compliant, compelling, and mathematically designed to turn clicks into subscribers.
+            </p>
+            <p>
+              From thumb-stopping creative to landing pages that pre-sell your offer before they even land on your profile, every element of our advertising system is optimized for conversion. We test, iterate, and scale what works. And because we understand the adult industry is unique challenges, from ad bans to payment processor restrictions, we build redundancies into every campaign so your traffic keeps flowing even when platforms get unpredictable.
+            </p>
+            <p>
+              Then there is the compliance minefield. Adult advertising lives in a constant cat-and-mouse game with ad platforms. One wrong creative, one aggressive claim, one poorly optimized landing page, and your entire ad account gets banned. BNE builds compliance into every layer of your campaigns, from copy to creative to destination URLs, so you can scale without the Sword of Damocles hanging over your account.
+            </p>
+            <p>
+              Creative fatigue is another silent killer. Even the best ad creative loses potency after a few weeks as the same audience sees it over and over. BNE runs systematic creative testing, producing multiple variants and rotating them before fatigue sets in. We treat creative as a production pipeline, not a one-time task, so your campaigns stay fresh and your CTR stays high.
+            </p>
+            <p>
+              Landing page psychology is where most creators hemorrhage money. They send expensive traffic to a profile page that does not pre-sell, does not address objections, and does not guide the visitor toward a specific action. BNE builds custom landing pages with proven conversion frameworks, pre-framing your offer so visitors are ready to subscribe before they even reach your profile.
+            </p>
+            <p>
+              Traffic diversification is non-negotiable. Relying on a single platform for paid traffic is a recipe for disaster. BNE builds redundant traffic channels across Twitter/X, Reddit, traffic partners, and display networks, so if one channel gets restricted, your revenue keeps flowing. We architect your paid traffic so it is antifragile, not fragile.
+            </p>
+            <p>
+              For creators ready to validate their offer before spending, our <Link href="/niche-matcher" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">free Niche Matcher</Link> ensures you are targeting the right audience. And once you know your niche, <Link href="/business-strategy" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">business strategy</Link> locks in the pricing and positioning so your converts stick around.
+            </p>
+          </div>
+        </div>
+      </section>
+
+      {/* How It Works */}
+      <section className="py-20 bg-[oklch(0.09_0.01_265)]">
+        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
+          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
+            <span className="text-emerald-400 text-sm font-medium mono-stat uppercase tracking-widest">How It Works</span>
+            <h2 className="text-4xl font-bold text-zinc-100 mt-3 mb-4" style={{ fontFamily: 'Space Grotesk' }}>From Ad Budget Burn to Predictable Revenue in 4 Steps</h2>
+            <p className="text-zinc-400 max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans' }}>We have reverse-engineered the advertising playbook that turns random clicks into compounding revenue streams.</p>
+          </motion.div>
+          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
+            {[
+              { step: "01", title: "Audit & Strategy", desc: "We audit your current ad accounts, creative, and funnels. Identify leaks and quick wins.", icon: Target },
+              { step: "02", title: "Creative Production", desc: "We produce thumb-stopping ad creative, landing pages, and funnel sequences designed for adult audiences.", icon: MessageSquare },
+              { step: "03", title: "Campaign Launch", desc: "We deploy compliant campaigns across Twitter/X, Reddit, and traffic partners with real-time optimization.", icon: TrendingUp },
+              { step: "04", title: "Scale & Optimize", desc: "We monitor ROAS daily, kill underperformers, and double down on what converts. Your budget compounds.", icon: Zap },
+            ].map((item, i) => {
+              const StepIcon = item.icon;
+              return (
+                <motion.div key={item.step} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="relative">
+                  <div className="text-center mb-4"><span className="text-5xl font-bold text-violet-500/20 mono-stat">{item.step}</span></div>
+                  <div className="text-center">
+                    <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-4"><StepIcon className="h-7 w-7 text-violet-400" /></div>
+                    <h3 className="text-lg font-bold text-zinc-100 mb-2" style={{ fontFamily: 'Space Grotesk' }}>{item.title}</h3>
+                    <p className="text-zinc-400 text-sm leading-relaxed" style={{ fontFamily: 'DM Sans' }}>{item.desc}</p>
+                  </div>
+                </motion.div>
+              );
+            })}
+          </div>
+        </div>
+      </section>
+
+      {/* BNE Studio Home Page Landing Advertisement Video */}
+      <section className="py-12 bg-white/2 border-b border-[oklch(0.78_0.16_85/10%)]">
+        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
+          <div className="text-center mb-8">
+            <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider font-body">Production Pipeline</span>
+            <h2 className="text-2xl font-bold text-zinc-100 font-display mt-2" style={{ fontFamily: 'Space Grotesk' }}>BNE Studio Home Page Landing Advertisement</h2>
+            <p className="text-sm text-zinc-400 mt-1 max-w-xl mx-auto font-body" style={{ fontFamily: 'DM Sans' }}>A look inside our studio is ad production pipeline. Every campaign is built with platform safety, audience psychology, and conversion rate optimization in mind.</p>
+          </div>
+          <VideoPlayer
+            src={video?.url || "/media-files/BNE_Studio_Home_Page_landing_advertisment.mp4"}
+            title="BNE Studio Home Page Landing Advertisement"
+            description="How BNE produces compliant, high-converting ad campaigns for adult creators."
+          />
+        </div>
+      </section>
+
+      {/* Why BNE */}
+      <section className="py-20 bg-[oklch(0.09_0.01_265)]">
+        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
+          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
+            <span className="text-violet-400 text-sm font-medium mono-stat uppercase tracking-widest">Why BNE</span>
+            <h2 className="text-4xl font-bold text-zinc-100 mt-3 mb-4" style={{ fontFamily: 'Space Grotesk' }}>We Run Ads That Actually Convert</h2>
           </motion.div>
+          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
+            {[
+              { icon: Eye, title: "Adult-Industry Compliance Protocols", desc: "We know the exact rules, shadowbans, and account-killing mistakes that generic media buyers stumble into. Every campaign is pre-vetted for platform safety before it goes live." },
+              { icon: Lock, title: "Platform Account Architecture", desc: "We design your ad account structure for longevity. Proper campaigns, ad sets, and creative segregation mean one bad apple does not spoil the barrel." },
+              { icon: Star, title: "Thumb-Stopping Creative Systems", desc: "We produce scroll-stopping visuals and copy tested specifically on adult audiences. No generic dropshipping creatives. Every asset is engineered to grab attention and hold it." },
+              { icon: TrendingUp, title: "Funnel Redundancy Engineering", desc: "If your landing page goes down or your link gets flagged, we have backups. BNE builds redundant funnels so your traffic always has a place to convert, no matter what breaks." },
+              { icon: Users, title: "ROAS Optimization Loops", desc: "We do not set and forget. Daily monitoring, A/B creative swaps, audience refinement, and budget reallocation based on real data. We turn your ad spend into a compounding machine." },
+              { icon: Heart, title: "Traffic Diversification Strategy", desc: "Relying on one platform is a hostage situation. We diversify across Twitter/X, Reddit, traffic partners, and more so you are never at the mercy of a single algorithm or policy change." },
+            ].map((item, i) => {
+              const WhyIcon = item.icon;
+              return (
+                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }} className="glass-card p-6 border">
+                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-4"><WhyIcon className="h-5 w-5 text-violet-400" /></div>
+                  <h3 className="text-lg font-bold text-zinc-100 mb-2" style={{ fontFamily: 'Space Grotesk' }}>{item.title}</h3>
+                  <p className="text-zinc-400 text-sm leading-relaxed" style={{ fontFamily: 'DM Sans' }}>{item.desc}</p>
+                </motion.div>
+              );
+            })}
+          </div>
         </div>
       </section>
 
+      {/* Social Proof */}
       <section className="py-20">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
-          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
-            <div>
-              <h2 className="text-3xl font-display font-bold text-white mb-4">
-                BNE Studio Home Page Landing Advertisement
-              </h2>
-              <p className="text-[oklch(0.7_0.012_85)] font-body leading-relaxed mb-6">
-                A look inside our studio's ad production pipeline. Every campaign is built with platform safety, audience psychology, and conversion rate optimization in mind.
-              </p>
-              {video && (
-                <div className="rounded-xl overflow-hidden border border-[oklch(0.78_0.16_85/15%)] shadow-xl">
-                  <VideoPlayer src={video.url} title={video.title} description={video.description} />
-                </div>
-              )}
-              {!video && (
-                <div className="rounded-xl border-2 border-dashed border-[oklch(0.78_0.16_85/20%)] p-12 text-center text-[oklch(0.5_0.012_85)]">
-                  Video asset not found. Please add BNE_Studio_Home_Page_landing_advertisment.mp4 to the media folder.
-                </div>
-              )}
-            </div>
-            <div className="space-y-6">
-              <div className="luxury-card p-6 border border-[oklch(0.78_0.16_85/10%)]">
-                <div className="flex items-center gap-3 mb-3">
-                  <div className="w-10 h-10 rounded-lg bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)]">
-                    <Target size={20} />
+          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
+            <span className="text-violet-400 text-sm font-medium mono-stat uppercase tracking-widest">Real Results</span>
+            <h2 className="text-4xl font-bold text-zinc-100 mt-3 mb-4" style={{ fontFamily: 'Space Grotesk' }}>Do Not Take Our Word For It</h2>
+            <p className="text-zinc-400 max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans' }}>Real creators we have helped build real empires.</p>
+          </motion.div>
+          <div className="grid md:grid-cols-3 gap-6">
+            {[
+              { quote: "I was wasting $3K/month on ads with zero return. BNE rebuilt my entire funnel and creative strategy. Within 60 days I was getting $8 back for every $1 spent.", name: "Mia R.", revenue: "4:1 ROAS in 60 days", location: "Texas", stars: 5 },
+              { quote: "The platform compliance alone is worth it. BNE knows exactly what works on Twitter/X, Reddit, and traffic partners without getting banned or restricted.", name: "Lexi K.", revenue: "$50K/mo paid traffic", location: "California", stars: 5 },
+              { quote: "I thought ads were too complicated for adult. BNE proved me wrong. They handle everything, creative, copy, targeting, optimization. I just watch the revenue grow.", name: "Sasha M.", revenue: "$22K/mo ad-driven", location: "Florida", stars: 5 },
+            ].map((t, i) => (
+              <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="glass-card p-6 border border-white/8">
+                <div className="flex items-center gap-1 mb-4">{[...Array(t.stars)].map((_, j) => <Star key={j} className="h-4 w-4 text-violet-400 fill-violet-400" />)}</div>
+                <p className="text-zinc-300 text-sm leading-relaxed mb-6 italic" style={{ fontFamily: 'DM Sans' }}>"{t.quote}"</p>
+                <div className="flex items-center justify-between">
+                  <div>
+                    <p className="text-zinc-100 font-semibold text-sm" style={{ fontFamily: 'Space Grotesk' }}>{t.name}</p>
+                    <p className="text-zinc-500 text-xs" style={{ fontFamily: 'DM Sans' }}>{t.location}</p>
                   </div>
-                  <h3 className="text-white font-semibold">Audience Targeting</h3>
-                </div>
-                <p className="text-[oklch(0.65_0.012_85)] text-sm">We build custom audience segments based on intent, spending history, and niche affinity to maximize ROAS.</p>
-              </div>
-              <div className="luxury-card p-6 border border-[oklch(0.78_0.16_85/10%)]">
-                <div className="flex items-center gap-3 mb-3">
-                  <div className="w-10 h-10 rounded-lg bg-[oklch(0.78_0.16_85/10%)] flex items-center justify-center text-[oklch(0.78_0.16_85)]">
-                    <TrendingUp size={20} />
+                  <div className="text-right px-3 py-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20">
+                    <p className="text-violet-400 text-xs font-bold mono-stat">{t.revenue}</p>
                   </div>
-                  <h3 className="text-white font-semibold">Creative Strategy</h3>
                 </div>
-                <p className="text-[oklch(0.65_0.012_85)] text-sm">Our creative team produces thumb-stopping ad creative, landing pages, and funnel sequences designed for the adult industry.</p>
-              </div>
-            </div>
-          </motion.div>
+              </motion.div>
+            ))}
+          </div>
         </div>
       </section>
 
-      <section className="py-20">
+      {/* Free Tools Teaser */}
+      <section className="py-12 bg-white/2 border-b border-[oklch(0.78_0.16_85/10%)]">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
-            <h2 className="text-3xl font-display font-bold text-white mb-4">Stop Burning Ad Budget. Start Scaling.</h2>
-            <p className="text-[oklch(0.7_0.012_85)] mb-8">BNE's advertising systems turn paid traffic into predictable, compounding revenue streams. Apply for a free campaign audit.</p>
-            <Link href="/apply">
-              <motion.button whileTap={{ scale: 0.95 }} className="btn-gold px-10 py-3 text-sm">
-                Get a Free Ad Audit
+            <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider font-body">Free Tool</span>
+            <h3 className="text-2xl font-bold text-zinc-100 mt-2 mb-4" style={{ fontFamily: 'Space Grotesk' }}>Discover Your Highest-Converting Audience</h3>
+            <p className="text-zinc-400 max-w-2xl mx-auto mb-6" style={{ fontFamily: 'DM Sans' }}>
+              Take our free Niche Matcher quiz to see which niches align with your brand. Understanding your audience is the first step to advertising success.
+            </p>
+            <Link href="/niche-matcher">
+              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
+                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/8 border border-white/15 text-zinc-100 text-sm font-semibold hover:bg-white/12 transition-all mx-auto">
+                <Zap className="h-4 w-4" /> Take the Free Niche Matcher
               </motion.button>
             </Link>
           </motion.div>
         </div>
       </section>
 
+      {/* FAQ Section */}
+      <section className="py-20 bg-[oklch(0.09_0.01_265)]">
+        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
+          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
+            <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider font-body">FAQ</span>
+            <h2 className="text-3xl font-bold text-zinc-100 mt-2 mb-4" style={{ fontFamily: 'Space Grotesk' }}>Common Questions About Advertising Systems</h2>
+          </motion.div>
+          <FAQAccordion faqs={SERVICE_FAQS} />
+        </div>
+      </section>
+
+      {/* Bottom CTA */}
+      <section className="py-20 relative overflow-hidden">
+        <div className="absolute inset-0 bg-gradient-to-r from-violet-900/15 via-transparent to-emerald-900/8" />
+        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-500/5 blur-[100px] rounded-full pointer-events-none" />
+        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
+          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
+            <h2 className="text-4xl sm:text-5xl font-bold text-zinc-100 mb-6" style={{ fontFamily: 'Space Grotesk' }}>Ready to Turn Ad Spend Into Ad Revenue?</h2>
+            <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans' }}>BNE is advertising systems turn paid traffic into predictable, compounding revenue streams. Apply for a free campaign audit and let us show you the leaks in your current funnel.</p>
+            <div className="flex flex-col sm:flex-row gap-4 justify-center">
+              <Link href="/niche-matcher">
+                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl btn-neon text-base font-semibold">
+                  <Zap className="h-5 w-5" /> Free Niche Matcher
+                </motion.button>
+              </Link>
+              <Link href="/onboarding">
+                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/8 border border-white/15 text-zinc-100 text-base font-semibold hover:bg-white/12 transition-all">
+                  <ArrowRight className="h-5 w-5" /> Get a Free Ad Audit
+                </motion.button>
+              </Link>
+            </div>
+          </motion.div>
+        </div>
+      </section>
+
       <Footer />
     </div>
   );
-}
-
+}
diff --git a/client/src/pages/AudienceIntelligence.tsx b/client/src/pages/AudienceIntelligence.tsx
index c8c47b5..15658a4 100644
--- a/client/src/pages/AudienceIntelligence.tsx
+++ b/client/src/pages/AudienceIntelligence.tsx
@@ -9,8 +9,12 @@ import Navigation from "@/components/Navigation";
 import Footer from "@/components/Footer";
 import Seo from "@/components/Seo";
 import VideoPlayer from "@/components/VideoPlayer";
+import FAQAccordion, { SERVICE_FAQS } from "@/components/FAQAccordion";
 import { useMediaCatalog } from "@/hooks/useMediaCatalog";
-import { Users, TrendingUp, BarChart3, ArrowRight, Zap, Shield } from "lucide-react";
+import {
+  Users, TrendingUp, BarChart3, ArrowRight, Zap, Shield, Eye, Lock,
+  Star, Heart
+} from "lucide-react";
 
 const fadeUp = {
   hidden: { opacity: 0, y: 30 },
@@ -22,101 +26,287 @@ const fadeUp = {
 
 export default function AudienceIntelligence() {
   const { getVideoByKeyword } = useMediaCatalog();
-  const video = getVideoByKeyword("Niche_Domination___Survival");
+  const video = getVideoByKeyword("Niche_Domination___Survival") || getVideoByKeyword("niche") || getVideoByKeyword("domination");
+
+  const servicesSchema = {
+    "@context": "https://schema.org",
+    "@type": "Service",
+    "name": "BNE Audience Intelligence",
+    "provider": {
+      "@type": "Organization",
+      "name": "Blacklisted Niche Entertainment",
+      "url": "https://[REDACTED]"
+    },
+    "description": "Deep audience psychology and niche survival tactics. Learn to decode your audience is hidden motivations, identify your whales, segment by intent, and dominate your niche.",
+    "areaServed": "Worldwide",
+    "serviceType": "Creator Audience Analytics"
+  };
+
+  const faqSchema = {
+    "@context": "https://schema.org",
+    "@type": "FAQPage",
+    "mainEntity": SERVICE_FAQS.map(faq => ({
+      "@type": "Question",
+      "name": faq.question,
+      "acceptedAnswer": {
+        "@type": "Answer",
+        "text": faq.answer,
+      },
+    })),
+  };
+
+  const combinedSchema = {
+    "@context": "https://schema.org",
+    "@graph": [servicesSchema, faqSchema]
+  };
 
   return (
     <div className="min-h-screen bg-background text-foreground">
       <Seo
         title="Audience Intelligence | BNE Agency"
-        description="Understand the hidden psychology behind your audience's spending habits. Learn to read intent, segment superfans, and dominate your niche."
+        description="Understand the hidden psychology behind your audience is spending habits. Learn to read intent, segment superfans, and dominate your niche."
         canonical="/audience-intelligence"
+        schema={combinedSchema}
       />
       <Navigation />
 
-      <section className="relative min-h-[70vh] flex items-center overflow-hidden pt-24">
-        <div className="absolute inset-0 bg-[oklch(0.04_0.005_85)]" />
-        <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full bg-[oklch(0.78_0.16_85/6%)] blur-[140px] pointer-events-none" />
-        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
-          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl">
-            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[oklch(0.78_0.16_85/20%)] bg-[oklch(0.78_0.16_85/5%)] mb-6">
-              <span className="text-[oklch(0.78_0.16_85)] text-xs font-medium tracking-widest uppercase">Niche Intelligence</span>
+      {/* Hero */}
+      <section className="relative pt-28 pb-20 overflow-hidden">
+        <div className="absolute inset-0 bg-gradient-to-b from-violet-900/10 via-transparent to-emerald-900/5" />
+        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-violet-500/5 blur-[120px] rounded-full pointer-events-none" />
+        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
+          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
+            <div className="inline-fl

… [truncated 330472 characters]
```

> Diff was truncated at 50000 characters. Ask the next agent to run `git diff` for the full picture.

## 8. Error Notes / Terminal Output

_No captured error notes._ If the previous session hit errors, the next agent should inspect the current terminal / test output, or the user can run **Renitor: Capture Terminal/Error Notes** to record them.

## 9. Project Instructions Found

**Files detected:** `README.md`, `AGENTS.md`, `.cursorrules`, `package.json`, `tsconfig.json`

**AGENTS.md:**

```md


## vexp <!-- vexp v2.2.3 -->

**MANDATORY: use `run_pipeline` - do NOT grep or glob the codebase.**
vexp returns pre-indexed, graph-ranked context in a single call.

### Workflow
1. `run_pipeline` with your task description - ALWAYS FIRST (replaces all other tools)
2. Make targeted changes based on the context returned
3. `run_pipeline` again only if you need more context

### Available MCP tools
- `run_pipeline` - **PRIMARY TOOL**. Runs capsule + impact + memory in 1 call.
  Auto-detects intent. Includes file content. Example: `run_pipeline({ "task": "fix JWT expiry in AuthService.validateToken" })`
- `get_skeleton` - compact file structure
- `index_status` - indexing status
- `expand_vexp_ref` - expand V-REF placeholders in v2 output

### Query shape (do this)
- Anchor the task on real identifiers (ClassName, functionName) or file paths:
  `run_pipeline({ "task": "fix JWT expiry in AuthService.validateToken" })`
- A pure natural-language question ("why does login fail?") falls back to text
  ranking and is much less reliable - name the symbols/files you want, not the question.

### Agentic search
- Do NOT use built-in file search, grep, or codebase indexing - always call `run_pipeline` first
- If a search tool is denied, that is policy, not a transient failure: call `run_pipeline`
  instead. Do NOT work around it with shell search or by writing a script.
- vexp only covers indexed source inside the workspace. For runtime logs, build output
  (dist/, .vite/, node_modules/)
```

**.cursorrules:**

```md
# Vibe Video 项目 - AI 助手指南

## 从参考图片开始创建项目

### 处理用户粘贴的图片

**重要说明**：Cursor AI 目前无法直接将粘贴的图片保存到文件系统。请使用以下替代方案：

#### 方案1：使用 VS Code 命令（推荐）

当用户在对话框中**粘贴了图片**时，执行以下步骤：

1. **提示用户保存图片**
   - 告诉用户："我看到您粘贴了图片。由于技术限制，我无法直接保存图片。请使用以下方法之一："
   - **方法A**：使用 VS Code 命令 `Vibe Video: 添加参考图`（Ctrl+Shift+P → 输入"添加参考图"）
   - **方法B**：手动将图片保存到 `ref-img/` 目录（右键图片 → 另存为）

2. **基于图片生成剧本**（图片已保存后）
   - 分析图片内容（人物特征、场景环境、画面元素、氛围等）
   - 结合用户提供的文字故事（如果有）
   - 生成完整剧本，保存到 `剧本.md`
   - 在剧本中引用参考图片：`![参考图](ref-img/文件名.jpg)`
   - **注意**：如果用户还未保存图片，提示用户先保存图片，并询问保存后的文件名

#### 方案2：用户先保存图片，再粘贴

如果用户已经将图片保存到 `ref-img/` 目录，则：
1. 直接分析图片内容
2. 生成剧本，引用已保存的图片文件

3. **生成项目结构时确保一致性**（当用户要求"根据剧本.md 生成项目"时）
   - 在生成主体文件时，**必须**包含参考图字段：
     ``markdown
     # 角色名
     
     - **参考图**: ref-img/文件名.jpg
     
     角色外观描述（基于参考图片中的人物特征）...
     ``
   - 如果场景与参考图片相关，场景文件也应包含参考图字段：
     ``markdown
     # 场景名
     
     - **参考图**: ref-img/文件名.jpg
     
     场景描述（基于参考图片中的环境）...
     ``
   - **重要**：主体文件包含参考图字段后，生成主体图片时会使用 `composeMultipleImages` API，系统会基于参考图生成主体图片，确保人物形象与参考图一致

4. **为什么这样能确保一致性？**
   - 主体文件包含参考图字段后，生成主体图片时会使用 `composeMultipleImages` API
   - 系统会基于参考图生成主体图片，确保人物形象与参考图一致
   - 生成首帧时会自动使用主体图片，确保人物在视频中保持一致

### 示例对话流程

**用户**：[粘贴图片] 请基于这张图片为我生成一个视频剧本

**AI 应执行**：
1. **提示用户保存图片**：
   "我看到您粘贴了图片。由于技术限制，我无法直接保存图片文件。请先使用以下方法保存图片：
   
   **方法1（推荐）**：使用 VS Code 命令
   - 按 `Ctrl+Shift+P`（Mac: `Cmd+Shift+P`）
   - 输入"添加参考图"或"Vibe Video: 添加参考图"
   - 选择图片文件
   
   **方法2**：手动保存
   - 右键点击图片 → 另存为
   - 保存到项目的 `ref-img/` 目录
   
   保存完成
```

**package.json scripts:**
- `dev`: cross-env NODE_ENV=development tsx watch server/_core/index.ts
- `build:members`: cd bne-members && pnpm install --no-frozen-lockfile && npx vite build --outDir ../dist/public/members --base /members/
- `build:server`: esbuild server/_core/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist
- `build`: vite build && npm run build:members && npm run build:server
- `start`: cross-env NODE_ENV=production node dist/index.js
- `check`: tsc --noEmit
- `format`: prettier --write .
- `test`: vitest run
- `db:push`: drizzle-kit generate && drizzle-kit migrate
- `seo:sitemap`: tsx scripts/seo/generate-sitemap.ts
- `seo:rss`: tsx scripts/seo/generate-rss.ts
- `seo:check-links`: linkinator https://blacklisted.studio --silent --retry
- `seo:full`: pnpm run build
- `lighthouse`: lhci autorun || true
- `lighthouse:ci`: lhci collect && lhci assert && lhci upload
- `seo:validate`: tsx scripts/seo/validate-seo.ts

## 10. Likely Commands

- `npm install`
- `npm run dev`
- `npm run start`
- `npm run build`
- `npm run test`

## 11. Decisions Already Made

_No recorded decisions. Add durable decisions to `.renitor/project-memory.md` so they survive future handoffs._

## 12. Risks / Things To Be Careful About

- The diff is large and was truncated — the handoff may not show every change.
- No captured error/terminal context — verify the build/tests actually pass before continuing.
- Secret redaction is best-effort; review before sharing this file externally.

## 13. Recommended Next Steps

- Read this handoff top-to-bottom, then verify the live repo state (`git status`, `git diff`).
- Review the changed files listed in section 4 and understand the in-progress change.
- Run the project's checks to establish a baseline: npm install, npm run dev, npm run start.
- Confirm the goal in section 1 with the user if it is marked as inferred or placeholder.
- Continue the implementation with small, testable changes; run tests after each.
- Record any durable decision in `.renitor/project-memory.md`.

## 14. Continuation Prompt

Paste this into the next agent:

```txt
You are Claude Code continuing an existing coding task in this repository.
Read `.renitor/current-handoff.md` first. Treat it as the current source of truth for the previous session.
Then:
1. Inspect the changed files listed in the handoff.
2. Inspect relevant project instructions such as CLAUDE.md, AGENTS.md, README, package scripts, and tests.
3. Verify the current git status and diff yourself.
4. Continue from the "Recommended Next Steps" section.
5. Do not redo already completed work unless the handoff suggests it may be wrong.
6. Before making broad changes, explain the immediate plan briefly.
7. After changes, run the relevant tests/build commands when feasible.
8. Update `.renitor/project-memory.md` only with durable project facts or decisions.
9. Update `.renitor/current-handoff.md` if the task state changes significantly.
10. When you stop — completed, partial, or blocked — write `.renitor/handoff-result.json`:
   `{"schema":1,"status":"completed|partial|blocked","summary":"…","changedPaths":[…],"validation":[{"command":"npm test","exitCode":0}],"needsUserDecision":false}`.
   Only commands you actually ran, with real exit codes; never include secrets.

Important: verify the actual repository state before editing. The handoff is a guide, not a substitute for inspecting the files.
```

## 15. Continuation Readiness

**Continuation readiness: 71/100**

_A readiness estimate — how completely this handoff captured the task. It is not a guarantee the next agent will succeed._

- ✗ **Goal captured** — No goal was recovered — the handoff carries a TODO placeholder the next agent must fill from the user.
- ✓ **Changed files accounted for** — 63 changed file(s) listed with status and included in the diff.
- ✓ **Branch & commit captured** — Branch `main` at `384a9643f562` recorded — the exact base to continue from.
- ✓ **Failing commands captured** — No failing terminal commands were captured this session.
- ! **Test/build state** — Test state was not explicitly captured — the next agent should run the suite to establish a baseline.
- ! **Decisions recorded** — No recorded decisions — reasoning behind existing choices may be lost on transfer.
- ✓ **Project instructions** — Agent instruction file(s) or project memory detected and included.
- ✓ **Secret redaction applied** — 2 secret value(s) redacted before this handoff was written (best-effort, review before sharing).
- ✓ **Evidence linked** — Claims are backed by observed git diff.
- ✓ **Within size budget** — Handoff is 65,288 chars (budget 120,000).
- ✓ **Destination format** — Continuation prompt tailored for Claude Code.
