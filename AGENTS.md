<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:coding-practices-rules -->
# Write good and efficent code

- Don't overuse comments and only use them to explain things that might be not obvious to everyone.
- ABSOLUTLEY NEVER USE ANY EMOJIS! Emojis are a very big sign of a poorly built/sloppy app.

# Don't write long code

- Long and nested code or one of them overwhelms anyone that has to edit the code.
- Making long files is bad and inefficient, but making a file for every single thing is also bad. Usually split things into files but put code that is in the same group as other peices of code (eg: database_manager.tsx, UI_builder.tsx, etc) and make sure to absolutley NEVER USE MAGIC NUMBERS, but if there is a lot of stuff such as user credentials or anything like that put them in a struct.
